import { Schema, model, Types } from 'mongoose';

export interface IDirector {
  _id: Types.ObjectId;
  id: string;
  name: string;
  surname: string;
  bio: string;
  avatar: string;
  movies: Types.ObjectId[];
  tvShowEpisodes: Types.ObjectId[];
}

const directorSchema = new Schema<IDirector>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  tvShowEpisodes: [{ type: Schema.Types.ObjectId, ref: 'TVShow' }],
})


// Define a virtual property "id" based on the "_id" field
directorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});


// Ensure virtual fields are serialized when converting to JSON
directorSchema.set('toJSON', {
  virtuals: true,
});

export const Director = model<IDirector>('Director', directorSchema)


