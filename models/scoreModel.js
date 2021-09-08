import mongoose from 'mongoose';
const { Schema } = mongoose;

const scoreSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const Score = mongoose.model('score', scoreSchema);
export default Score;
