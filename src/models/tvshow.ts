import {Schema, model } from 'mongoose';

export interface ITVShow {
  title: string;
  genre: string;
  seasons: number;
  plot: string;
  episodes: {
    id: string;
    title: string;
    director: Schema.Types.ObjectId;
    season: number;
  }[];
  actors: Schema.Types.ObjectId[];
}


const tvShowSchema = new Schema<ITVShow>({
    title: { type: String, required: true},
    genre: { type: String, required: true},
    plot: String,
    episodes: [{
      id: String,
      title: String,
      director: {type: Schema.Types.ObjectId, ref: 'Director'},
      season: Number
    }],
    actors: [{type: Schema.Types.ObjectId, ref: 'Actor'}]
})
export const TVShow = model<ITVShow>('TVShow', tvShowSchema)
