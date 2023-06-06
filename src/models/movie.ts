import {Schema, model } from 'mongoose';

export interface IMovie {
  title: string;
  genre: string;
  trailer: string;
  plot: string;
  director: Schema.Types.ObjectId;
  actors: Schema.Types.ObjectId[];
}


const movieSchema = new Schema<IMovie>({
    title: { type: String, required: true},
    genre: { type: String, required: true},
    trailer: String,
    plot: String,
    director: {type: Schema.Types.ObjectId, ref: 'Director'},
    actors: [{type: Schema.Types.ObjectId, ref: 'Actor'}]
})
export const Movie = model<IMovie>('Movie', movieSchema)


