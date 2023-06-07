import { Schema, model, Types } from 'mongoose';

export interface IActor {
  id: string;
  _id: Types.ObjectId;
  name: string;
  surname: string;
  bio: string;
  avatar: string;
  movies: Types.ObjectId[];
  tvShowEpisodes: Types.ObjectId[];
}

const actorSchema = new Schema<IActor>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  tvShowEpisodes: [{ type: Schema.Types.ObjectId, ref: 'TVShow' }],
})



// Define a virtual property "id" based on the "_id" field
actorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});


// Ensure virtual fields are serialized when converting to JSON
actorSchema.set('toJSON', {
  virtuals: true,
});


export const Actor = model<IActor>('Actor', actorSchema)


