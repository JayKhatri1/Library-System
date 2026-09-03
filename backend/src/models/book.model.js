import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        availableQuantity: {
            type: Number,
            required: true,
            min: 0
        }
    },

    {
        timestamps: true
    }
);

export const Book = mongoose.model("Book", bookSchema);