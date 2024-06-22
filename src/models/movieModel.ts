import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  name: string;
  img: string;
  year: number;
  genre: string;
  rating: number;
}

const movieSchema: Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    genre: {
      type: Array,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
  },
  { versionKey: false }
);

const movieModel = mongoose.model<IMovie>('Movie', movieSchema);
export default movieModel;
