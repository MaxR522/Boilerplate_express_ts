import IPost from '../interfaces/models/post_interface';
import * as mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      types: String,
      required: true,
      max: 255,
    },
    content: {
      types: String,
      default: '',
    },
    userId: {
      types: String,
      required: true,
    },
    author: {
      types: String,
      required: true,
    },
    likes: Array,
    comments: Array,
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
