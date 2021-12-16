var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Bookings = Schema(
    {
        pumpId: {
            type: mongoose.Types.ObjectId,
            ref: "Pump"
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        vehicalData: {
            type: [
                {
                    number: {
                        type: String,
                        required: true
                    },
                    fillingType: {
                        type: String,
                        required: true,
                    }
                }
            ]
        },
        bookingDate: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Bookings", Bookings);
