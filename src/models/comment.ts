import IComment from '../interfaces/models/comment_interface';
import * as mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: {
    types: String,
    required: true,
  },
  postId: {
    types: String,
    required: true,
  },
  postTitle: {
    types: String,
    required: true,
  },
  userId: {
    types: String,
    required: true,
  },
  nameUser: {
    types: String,
    required: true,
  },
  votes: Array,
});

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
