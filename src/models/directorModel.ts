import { Schema, model, Types } from 'mongoose';

export interface IDirector {
  _id: Types.ObjectId;
  id: string;
  name: string;
  surname: string;
  bio: string;
  avatar: string;
}

const directorSchema = new Schema<IDirector>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String }
})


// Define a virtual property "id" based on the "_id" field
directorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});


// Ensure virtual fields are serialized when converting to JSON
directorSchema.set('toJSON', {
  virtuals: true,
});

const Director = model<IDirector>('Director', directorSchema)

export default Director;
