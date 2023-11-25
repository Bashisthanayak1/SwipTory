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


//Mongoose :-------
//define a schema

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, }
})
// Define a Model based on the Schema
const UserModel = mongoose.model("userdetails", userSchema)



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
app.post("/Login", (req, res) => {
    const { username, password } = req.body;
    //checking in database if loggedin user exist or not by username;
    const Is_LoggedIn_User_Exists = UserModel.findOne({ username });
    if (!Is_LoggedIn_User_Exists) {
        return console.log('Not a user');
    } else {
        console.log('welcome user');
    }
})




app.listen(process.env.PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Server successfully running on ${process.env.PORT}`);
    } catch (error) {
        console.error(error);
    }
})