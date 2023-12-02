const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const app = express()
//middlewares ***************** ---- ******************
app.use(express.json())
//to get details from frontend
app.use(cors())
dotenv.config();
//***************** ---- ******************
const PORT = process.env.PORT || 8000


//Mongoose :-------
//define a schema
//schema for register
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, }
})
//schema for slides array of objects
const slideSchema = new mongoose.Schema({
    Your_heading: { type: String, required: true },
    Story_Description: { type: String, required: true },
    Add_Image_URL: { type: String, required: true },
    Select_category: { type: String, required: true },
    slideIndex: Number,

})

// Define a Model based on the Schema for user registration
const UserModel = mongoose.model("userdetails", userSchema)
// Define a Model based on the Schema for slidedetails
const SlideModel = mongoose.model("SlideDetails", slideSchema);


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
        console.log('catch (error)- ', error);
        return res.status(400).json({
            status: 'FAIL',
            message: 'Something went wrong'
        })
    }
})

// Api for storing slides data
app.post("/slideData", async (req, res) => {
    try {
        const data = await req.body;
        SlideModel.insertMany(data).then(result => {
            console.log('Documents inserted:');
            return res.status(200).json({
                status: 'sucess',
                message: 'Successfully slide added'
            })
        }).catch(error => {
            console.error('Error inserting documents:', error);
        })
    } catch (error) {
        console.error(error)
    }
})

//Api for storing food data
app.get("/CategoryData", async (req, res) => {
    try {
        //receiving the category we are searching via link
        const whichCategory = req.query.Acategory;
        if (whichCategory == "All") {
            const AllData = await SlideModel.find();
            if (AllData) {
                res.status(200).json({
                    categorydata: AllData
                })
            }
        } else {
            const Data = await SlideModel.find({ Select_category: whichCategory },
                {
                    Your_heading: 1,
                    Story_Description: 1,
                    Add_Image_URL: 1,
                    Select_category: 1,
                    slideIndex: 1,
                })

            if (Data) {
                return res.status(200).json({
                    categorydata: Data
                })
            }
        }
    }
    catch (error) {
        console.error(error);
    }
})


app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Server successfully running on ${process.env.PORT}`);
    } catch (error) {
        console.error(error);
    }
})