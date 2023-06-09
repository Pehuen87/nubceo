import { Schema, model, Types } from 'mongoose';

interface IActor {
  id: string;
  _id: Types.ObjectId;
  name: string;
  surname: string;
  bio: string;
  avatar: string;
}

const actorSchema = new Schema<IActor>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String }
})



// Define a virtual property "id" based on the "_id" field
actorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});


// Ensure virtual fields are serialized when converting to JSON
actorSchema.set('toJSON', {
  virtuals: true,
});


const Actor = model<IActor>('Actor', actorSchema);
export default Actor;


