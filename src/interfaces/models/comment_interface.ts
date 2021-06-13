import { Document } from 'mongoose';

interface IComment extends Document {
  content: string;
  postId: string;
  postTitle: string;
  userId: string;
  nameUser: string;
  votes: string[];
}

export default IComment;
