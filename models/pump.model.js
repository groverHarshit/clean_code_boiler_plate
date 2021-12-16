var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Pump = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String, default: 'Point'
            },
            coordinates: {
                type: [Number]
            }
        },
        address: {
            type: String,
            required: true,
        },
        filling_types: {
            type: [String],
        },
    },
    {
        timestamps: true
    }
);
Pump.index({ location: '2dsphere' });
module.exports = mongoose.model("Pump", Pump);
