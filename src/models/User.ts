import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserDocument extends Document {
    name: string,
    username: string,
    password: string,
    profilePicSrc: string,
    isAdmin: boolean,
    comparePassword: (other: string) => Promise<boolean>,
    createJWT: () => string;
}

const UserSchema = new Schema<UserDocument>({
    name: String, 
    username: { type: String, unique: true },
    password: { type: String, minlength: 4 },
    profilePicSrc: String,
    isAdmin: Boolean
});

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
})

UserSchema.methods.createJWT = function() {
    return jwt.sign(
      { userId: this._id, name: this.name, isAdmin: this.isAdmin },
      process.env.JWT_SECRET!,
    )
}
  
UserSchema.methods.comparePassword = async function (canditatePassword: string) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}

const modelExport = mongoose.models.User || model("User", UserSchema)

export default modelExport;