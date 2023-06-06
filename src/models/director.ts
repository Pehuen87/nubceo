import { Schema, model } from 'mongoose';

export interface IDirector {
    name: string;
    surname: string;
    bio: string;
    avatar: string;
    movies: Schema.Types.ObjectId[];
    tvShowEpisodes: Schema.Types.ObjectId[];
  }

const directorSchema = new Schema<IDirector>({
    name: { type: String, required: true},
    surname: { type: String, required: true},
    bio: { type: String},
    avatar: { type: String},
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    tvShowEpisodes: [{type: Schema.Types.ObjectId, ref: 'TVShow'}],
})
export const Director = model<IDirector>('Director', directorSchema)


