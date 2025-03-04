import { Schema, model, Types } from 'mongoose'

const schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'users',
      required: [true, '使用者必填'],
    },
    title: { type: String },
    player: { type: String },
    chara: { type: String },
    time: { type: String },
    date: { type: Date },
  },
  {
    versionKey: false,
  },
)

export default model('schedules', schema)
