import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  recipient: string;
  content: string;
}

const MessageSchema: Schema = new Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: String, required: true },
});

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
