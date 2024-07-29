import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {type: String, required: true, trim: true, maxLength: 50},
    email: {type: String, required: true, trim: true, unique:true, lowercase: true, minLength: 3, maxLength: 30},
    password: {type: String, required: true, minLength: 6}
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel;