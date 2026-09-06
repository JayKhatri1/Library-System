import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(

    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength: 30
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 65,
            select: false
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },

    {
        timestamps: true
    }

);

// Hash password before saving
userSchema.pre("save", async function () {

    // Don't hash password again when updating other fields
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});


// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (password) {
    if (!this.password) {
        return false;
    }

    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema)