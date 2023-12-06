const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const SlideModel = require("./mongodb/slideSchema")
const UserModel = require("./mongodb/userSchema");
const LikeModel = require('./mongodb/likeSchema');


const app = express()
//middlewares ***************** ---- ******************
app.use(express.json())
//to get details from frontend
app.use(cors())
dotenv.config();
//***************** ---- ******************
const PORT = process.env.PORT || 8000


// Register API- ********************************************************-Register API
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const IsRegisterUserExist = await UserModel.findOne({ username });
        console.log({ username, password });
        // checking if youser exists or not
        if (IsRegisterUserExist) {
            console.log('/register :- user already exists');
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create a new user document and save it
        const newuser = new UserModel({ username, password })
        newuser.save();
        console.log('/register: User saved successfully');
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log('/register- ', error);
        res.status(400).json({ message: 'Unable to register user' });
    }
})

// Login API- ********************************************************-Login API
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        //checking in database if loggedin user exist or not by username;
        const Is_LoggedIn_User_Exists = await UserModel.findOne({ username });
        const Is_Password_Correct = await UserModel.findOne({ password });

        console.log('Is_LoggedIn_User_Exists ', Is_LoggedIn_User_Exists);
        if (!Is_LoggedIn_User_Exists) {
            console.log('Not a user');
            return res.status(400).json({
                status: 'FAIL',
                message: 'User not exists'
            })
        }
        if (!Is_Password_Correct) {
            console.log('Incorrect Password');
            return res.status(400).json({
                status: 'FAIL',
                message: 'Incorrect Password'
            })
        }
        if (Is_LoggedIn_User_Exists && Is_Password_Correct) {
            console.log('welcome user');
            return res.status(200).json({
                status: 'sucess',
                message: 'Successfully loggedIn'
            })
        }
    } catch (error) {
        console.log('/login - ', error);
        return res.status(400).json({
            status: 'FAIL',
            message: 'Something went wrong'
        })
    }
})

// AddSlideData API- ********************************************************-AddSlideData API

// Api for storing slides data
app.post("/AddSlideData", async (req, res) => {
    try {
        const data = await req.body;
        console.log("data = await req.body:- ", data);

        const newslide = new SlideModel(data,{ aslidelikearry: [] })
        newslide.save()
        res.json(data)

    } catch (error) {
        console.log('/AddSlideData- ', error);
    }
})

// Getting CategoryData API- ********************************************************-Getting CategoryData API

//Api for storing food data
app.get("/CategoryData", async (req, res) => {
    try {
        //receiving the category we are searching via link
        const whichCategory = req.query.Acategory;
        if (whichCategory == "All") {
            const AllData = await SlideModel.find();
            console.log('AllData-- ', AllData);
            if (AllData) {
                res.status(200).json({
                    categorydata: (AllData)
                })
            } else { res.status(400).json({ message: "data not found" }) }
        } else {
            // finding data according to filters
            const Data = await SlideModel.find(
                {
                    "aslide.Select_category": whichCategory,
                },
                {
                    "aslide.Your_heading": 1,
                    "aslide.Story_Description": 1,
                    "aslide.Add_Image_URL": 1,
                    "aslide.Select_category": 1,
                }
            );

            if (Data) {
                // console.log('SlideModel.aslide.find({ Select_category: whichCategory }- ', Data);
                return res.status(200).json({
                    message: "data found",
                    categorydata: Data
                })
            } else { res.status(400).json({ message: "data not found" }) }
        }

    }
    catch (error) {
        console.log('/CategoryData- ', error);
    }
})

// Getting slide data using id API- ********************************************************-Getting slide data using id API
app.get("/AutoSlider/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const data_backend = await SlideModel.find({ _id: _id })
        res.status(200).json(data_backend)

    } catch (error) {
        console.log('/AutoSlider/:id- ', error);

    }
})

// Posting likes slides id , API- ********************************************************- Posting likes slides id , API

app.post("/storeLikes", async (req, res) => {
    try {
        const { id } = req.body;
        const isIdAvailable = await LikeModel.findOne({ slideid: id });
        if (isIdAvailable) {
            console.log('isIdAvailable:- yes id available');
            return res.status(400).json({
                message: "slide_id already saved in DB"
            })
        }

        const newlikeid = new LikeModel({ slideid: id });
        newlikeid.save();
        console.log('liked slide _id stored');
        res.status(200).json({ message: "likes slide id stored" })
    } catch (error) {
        console.log('/storeLikes- ', error);
    }
})
// Getting all likes slide's id  , API- ********************************************************-  Getting all likes slide's id  

app.get("/getAllLikes", async (req, res) => {
    try {
        const likesarray = await LikeModel.find();
        res.status(200).json({
            message: "All likes id are in this array",
            likesarray: likesarray
        })
    } catch (error) {
        console.log('/getAllLikes- ', error);
    }
})

// delete liked slide id from DB , API- ********************************************************-  Getting all likes slide's id 

app.delete("/delete/:id", async (req, res) => {
    try {
        const deleid = req.params.id;

        await LikeModel.findOneAndDelete({ slideid: deleid });

        res.status(200).json({
            message: "slide id is  deleted from likeslide db"
        });

        console.log(deleid);
    } catch (error) {
        console.log('/delete/:id:- ', error);
    }
});


// ********************************************************************

app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Server successfully running on ${process.env.PORT}`);
    } catch (error) {
        console.error("app.listen error", error);
    }
})