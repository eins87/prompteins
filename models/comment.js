import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: Schema.Types.ObjectId,
        ref: 'Prompt',
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
    },
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;