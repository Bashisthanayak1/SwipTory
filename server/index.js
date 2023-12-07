const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const SlideModel = require("./mongodb/slideSchema")
const UserModel = require("./mongodb/userSchema");


const app = express()
//middlewares ***************** ---- ******************
app.use(express.json())
//to get details from frontend
app.use(cors())
dotenv.config();
//***************** ---- ******************
const PORT = process.env.PORT || 8000

//------------------------------------------------->   USER API (START)  ------------------------------------------------->

// Register API- ************************
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

// Login API- ***************************
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


//------------------------------------------------------------------->  USER API (END)  ------------------------------------------------------> */

// AddSlideData API- ************************

// Api for storing slides data
app.post("/AddSlideData", async (req, res) => {
    try {
        const data = await req.body;
        console.log("data = await req.body:- ", data);

        const newslide = new SlideModel(data, { aslidelikearry: [] })
        newslide.save()
        res.json(data)

    } catch (error) {
        console.log('/AddSlideData- ', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})


// Getting CategoryData API- **************

//Api for storing food data
app.get("/FilterACategoryData", async (req, res) => {
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
        }
        else {
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
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

// Getting slide data using id API- ***********
app.get("/AutoSlider/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const data_backend = await SlideModel.find({ _id: _id })
        res.status(200).json(data_backend)

    } catch (error) {
        console.log('/AutoSlider/:id- ', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})


// -------------------------------------------------> API FOR LIKES (START) ------------------------------------------------------------------->

app.post("/storeLikes", async (req, res) => {
    try {
        // instead of slide id we nee user id to srore all user who liked the slide
        const { id, username_from_sl } = req.body;
        // console.log('id,username_from_sl:- ', id, username_from_sl);

        // Check if the user is already in aslidelikearry
        const matchingUser = await SlideModel.findOne({
            "aslidelikearry": { $elemMatch: { username: username_from_sl } }
        });

        if (matchingUser) {
            console.log('matchingUser:- yes matchingUser available');
            return res.status(400).json({
                message: "matchingUser saved in DB"
            });
        } else {
            //adding
            await SlideModel.updateOne({}, { $push: { "aslidelikearry": { username: username_from_sl } } });
            console.log('SlideModel - Id added successfully');
        }

        // ******++++++++++++***********
        const username = username_from_sl;

        // Find the user by username
        const user = await UserModel.findOne({ username: username });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check if the id is already in likedslide
        const is_slideID_AVL_in_myArray = user.likedslide.some(obj => obj.id === id);

        if (is_slideID_AVL_in_myArray) {
            console.log('is_slideID_AVL_in_myArray:- yes id available');
            return res.status(400).json({
                message: "slide_id already saved in userdetails DB"
            });
        } else {
            user.likedslide.push({ id: id });
            await user.save();
            console.log('UserModel - Id added successfully');
            return res.json({ foundInUserDetails: false, addedInUserDetails: true });
        }
    } catch (error) {
        console.log('/storeLikes- ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});




// delete liked slide id from DB , API- ************
app.delete("/delete", async (req, res) => {
    try {
        const { id, username_from_sl } = req.body;

        // Update the document to remove the object with the specified id from aslidelikearry
        await SlideModel.updateOne(
            {},
            { $pull: { "aslidelikearry": { username: username_from_sl } } }
        );


        //delete from user like array
        await UserModel.updateOne({ username: username_from_sl }, { $pull: { "likedslide": { id: id } } });

        res.status(200).json({
            message: "slide id is  deleted from likeslide db"
        });

    } catch (error) {
        console.log('/delete/:id:- ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Getting all likes slide's id  , API- **************

app.get("/getLikesArray", async (req, res) => {
    try {
        const likesarray = await SlideModel.find({}, { aslidelikearry: 1, _id: 0 });
        return res.send(likesarray);
    } catch (error) {
        console.log('/getAllLikes- ', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// -------------------------------------------------> API FOR LIKES (END) ------------------------------------------------->

//------------------------------------------------------------------->  USER BookMark (START)  ------------------------------------------------------> */

app.post("/saveBookmark", async (req, res) => {
    try {
        const { id, username_from_sl } = req.body;
        console.log("slide id and username getting from frontend:- ", id, username_from_sl);

        const username = username_from_sl;

        // Find the user by username
        const user = await UserModel.findOne({ username: username });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check if the id is already in bookmarkedslide
        const is_slideID_AVL_in_bookmarkedslide = user.bookmarkedslide.some(obj => obj.id === id);

        if (is_slideID_AVL_in_bookmarkedslide) {
            // Remove the object with the specified id from bookmarkedslide
            await UserModel.updateOne({ username: username }, { $pull: { "bookmarkedslide": { id: id } } });
            await user.save();
            console.log('is_slideID_AVL_in_bookmarkedslide: Yes, id removed from bookmarkedslide array');
            return res.status(200).json({ foundslideId: true, removedslideId: true });
        } else {
            user.bookmarkedslide.push({ id: id });
            await user.save();
            console.log('UserModel - bookmarkedslide added successfully');
            return res.status(200).json({ foundslideId: false, addedslideId: true });
        }

    } catch (error) {
        console.log('saveBookmark error:- ', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
});

// ******************* GET ALL BOOKMARKS FOR 
app.get("/getAllBookmarks/:id/:username", async (req, res) => {
    try {
        const { id, username } = req.params;

        // Find the user by username
        const user = await UserModel.findOne({ username: username });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check if the id  is present in bookmarkedslide
        const isObjectIdPresent = user.bookmarkedslide.some(obj => obj.id === id);

        if (isObjectIdPresent) {
            return res.status(200).json({
                message: "Object with id   is present in bookmarkedslide array",
                isObjectIdPresent: true
            });
        } else {
            return res.status(200).json({
                message: "Object with id is not present in bookmarkedslide array",
                isObjectIdPresent: false
            });
        }

    } catch (error) {
        console.log('getAllBookmarks error:- ', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
})


//------------------------------------------------------------------->  USER BookMark (END)  ------------------------------------------------------> */
app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Server successfully running on ${process.env.PORT}`);
    } catch (error) {
        console.error("app.listen error", error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})