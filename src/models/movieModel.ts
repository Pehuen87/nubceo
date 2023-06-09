import { Schema, model, Types } from 'mongoose';


export interface IMovie {
  _id: Types.ObjectId;
  id: string;
  title: string;
  genre: string;
  trailer: string;
  plot: string;
  director: Types.ObjectId;
  actors: Array<Types.ObjectId>;
}


const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  trailer: String,
  plot: String,
  director: { type: Schema.Types.ObjectId, ref: 'Director' },
  actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
})


// Define a virtual property "id" based on the "_id" field
movieSchema.virtual('id').get(function () {
  return this._id.toHexString();
});


// Ensure virtual fields are serialized when converting to JSON
movieSchema.set('toJSON', {
  virtuals: true,
});

const Movie = model<IMovie>('Movie', movieSchema)
export default Movie;

