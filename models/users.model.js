var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const User = Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        full_name: {
            type: String,
            required: true,
        },
        mobile_number: {
            type: Number,
            required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", User);
