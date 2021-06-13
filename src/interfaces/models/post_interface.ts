import { Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  content: string;
  thumbnail: string;
  images: string;
  user_id: string;
  author: string;
  tags: string[];
  likes: string[];
  comments: string[];

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export default IPost;
