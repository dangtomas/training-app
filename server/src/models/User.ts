import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config({ path: '../.env' });

interface UserDocument extends Document {
    name: string,
    username: string,
    password: string,
    profilePicSrc: string,
    comparePassword: (other: string) => Promise<boolean>,
    createJWT: () => string;
}

const UserSchema = new Schema<UserDocument>({
    name: {type: String}, 
    username: { type: String, unique: true },
    password: { type: String, minlength: 4 },
    profilePicSrc: {type: String}
});

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: `${this.firstName} ${this.lastName}` },
      process.env.JWT_SECRET!,
    )
}
  
UserSchema.methods.comparePassword = async function (canditatePassword: string) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}

export default model("User", UserSchema);