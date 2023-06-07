import { Schema, model, Types } from 'mongoose';

export interface ITVShow {
  _id: Types.ObjectId;
  id: string;
  title: string;
  genre: string;
  seasons: number;
  plot: string;
  episodes: {
    episodeId: string;
    title: string;
    director: Types.ObjectId;
    season: number;
  }[];
  actors: Types.ObjectId[];
}


const tvShowSchema = new Schema<ITVShow>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  plot: String,
  episodes: [{
    episodeId: String,
    title: String,
    director: { type: Schema.Types.ObjectId, ref: 'Director' },
    season: Number
  }],
  actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
})

// Define a virtual property "id" based on the "_id" field
tvShowSchema.virtual('id').get(function () {
  return this._id.toHexString();
});


// Ensure virtual fields are serialized when converting to JSON
tvShowSchema.set('toJSON', {
  virtuals: true,
});

export const TVShow = model<ITVShow>('TVShow', tvShowSchema)
