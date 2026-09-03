import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },

        borrowDate: {
            type: Date,
            default: Date.now
        },

        dueDate: {
            type: Date,
            required: true
        },

        returnDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: ["borrowed", "returned"],
            default: "borrowed"
        },

        fine: {
            type: Number,
            default: 0
        }
    },

    {
        timestamps: true
    }
);

export const Transaction = mongoose.model(
    "Transaction",
    transactionSchema
);