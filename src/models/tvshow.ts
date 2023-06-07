import { Schema, model, Types } from 'mongoose';

export interface ITVShow {
  _id: Types.ObjectId;
  title: string;
  genre: string;
  seasons: number;
  plot: string;
  episodes: {
    id: string;
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
    id: String,
    title: String,
    director: { type: Schema.Types.ObjectId, ref: 'Director' },
    season: Number
  }],
  actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
})
export const TVShow = model<ITVShow>('TVShow', tvShowSchema)
