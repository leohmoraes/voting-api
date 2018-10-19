import mongoose from 'mongoose';

const { Schema } = mongoose;

const VotingSchema = Schema({
    _id: Schema.Types.ObjectId,
    topic: {
        type: Schema.Types.String,
        required: true,
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ['created', 'pending', 'finished'],
        default: 'created',
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    dateStart: {
        type: Schema.Types.Date,
    },
    dateEnd: {
        type: Schema.Types.Date,
    },
    votersPercent: {
        type: Schema.Types.Number,
    },
    candidates: [{
        _id: Schema.Types.ObjectId,
        name: {
            type: Schema.Types.String,
            required: true,
        },
        description: Schema.Types.String,
    }],
    coefficients: [{
        _id: Schema.Types.ObjectId,
        name: {
            type: Schema.Types.String,
            required: true,
        },
        question: {
            type: Schema.Types.String,
            required: true,
        },
        value: {
            type: Schema.Types.Number,
        },
    }],
});

const Voting = mongoose.model('Voting', VotingSchema);

export default Voting;
