import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !email || !password){
            return res.status(400).json({ message : "All Fields are Important" });
        }

        const existing = await User.findOne({ email : email.toLowerCase()});

        if(existing){
            return res.status(400).json({ message : "User Already Exists" });
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({
            message : "User Created Successfully",
            user : {
                username : user.username,
                email : user.email,
                createdAt : user.createdAt,
            }
        })
    } catch (error){
        res.status(500).json({ message : "Internal Server Error", error : error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email : email.toLowerCase() });

        if(!user) return res.status(404).json({
                message: "User not found"
        });

            const isPasswordMatch = await user.comparePassword(password);

            if(!isPasswordMatch) return res.status(400).json({
                message: "Invalid Email and Password"
            })

            res.status(200).json({
                message : "User Logged in Successfully",
                user: {
                    id: user._id,
                    username : user.username,
                    email : user.email,
                    loggedIn : true
                }
            })
    } catch (error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


export {
    registerUser,
    loginUser
}