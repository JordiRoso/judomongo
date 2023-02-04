import {Schema, model} from "mongoose";

const UserSchema = new Schema(
    {
        name:{
            type:String,
            requirend: false,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /.+\@.+\..+/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role:{
            type: String,
            enum: ["user","admin","super_admin"],
            default: "user",
        }
    },
    {
        timestamps: true,
    }
);

const User = model("users", UserSchema);

export default User;
