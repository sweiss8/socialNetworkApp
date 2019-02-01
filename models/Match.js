const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const MatchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Events'
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    team: {
        type: String 
    },
    opponent: {
        type: String,
        required: true
    },
    matchStats: [{
        result: {
            type: String //win or loss
        },
        userScore: {
            type: Number
        },
        opponentScore: {
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
    points: [{
        result: {
            type: String //win or loss
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
    ]
});

module.exports = Match = mongoose.model("Match", MatchSchema);