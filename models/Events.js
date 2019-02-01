const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const EventsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    team: {
        type: String
    },
    type: {
        type: String, // Practice or Tournament
        required: true
    },
    locationorfield: {
        type: String,
        required: true
    },
    format: {
        type: String
    },
    division: {
        type: String,
        required: true
    },
    league: {
        type: String
    },
    eventStats: [{
        wins: {
            type: Number
        },
        losses: {
            type: Number
        },
        netrtg: {
            type: Number
        },
        epp: {
            type: Number
        },
        opp: {
            type: Number
        },
        tote: {
            type: Number
        },
        e1: {
            type: Number
        },
        e2: {
            type: Number
        },
        e3: {
            type: Number
        },
        e4: {
            type: Number
        },
        e5: {
            type: Number
        },
        eob: {
            type: Number
        },
        eib: {
            type: Number
        },
        eom: {
            type: Number
        },
        ebkr: {
            type: Number
        },
        toth: {
            type: Number
        },
        h1: {
            type: Number
        },
        h2: {
            type: Number
        },
        h3: {
            type: Number
        },
        h4: {
            type: Number
        },
        h5: {
            type: Number
        },
        hob: {
            type: Number
        },
        hib: {
            type: Number
        },
        hom: {
            type: Number
        },
        hbkr: {
            type: Number
        }
    }
    ],
    matches: [
        {
        type: Schema.Types.ObjectId,
        ref: "Match"
    }
    ]
});

module.exports = Events = mongoose.model('Events', EventsSchema);