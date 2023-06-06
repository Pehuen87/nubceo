import { Schema, model } from 'mongoose';

export interface IActor {
  name: string;
  surname: string;
  bio: string;
  avatar: string;
  movies: Schema.Types.ObjectId[];
  tvShowEpisodes: Schema.Types.ObjectId[];
}

const actorSchema = new Schema<IActor>({
    name: { type: String, required: true},
    surname: { type: String, required: true},
    bio: { type: String},
    avatar: { type: String},
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    tvShowEpisodes: [{type: Schema.Types.ObjectId, ref: 'TVShow'}],
})
export const Actor = model<IActor>('Actor', actorSchema)


