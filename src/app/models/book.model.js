import mongoose from 'mongoose';
import {TYPE_BOOK_LIST, TYPE_BOOK_PUBLIC} from '../condig'
const {Schema} = mongoose;

const bookSchema = new Schema(
    {

        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        cover: {
            type: String,
        },
        author: {
            type: String,
        },
        published_at: {
            type: Date,
        },
        type: {
            type: String,
            enum: TYPE_BOOK_LIST,
            default: TYPE_BOOK_PUBLIC
        },
        archived: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}},
);

bookSchema.index({ type: 1 });

export {bookSchema};
export default mongoose.model('book', bookSchema);
