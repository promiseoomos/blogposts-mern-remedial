import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username : {
        type : String,
        required: true,
        unique : true,
        lowercase : true,
        trim : true,
        minLength: 3,
        maxLength: 30
    },
    password : {
        type: String,
        required : true,
        minLength: 6,
        maxLength: 30
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase : true,
        trim: true
    }
}, { timestamps: true})

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10);
    // next(); 
})

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.pre("save", async function() {
    const user = this

    if(user){
        user.email = user.email.trim().toLowerCase();
    }

    if(!validator.isEmail(user.email)){
        return new Error("Invalid Email Address");
    }
})

export const User = mongoose.model("User", userSchema);