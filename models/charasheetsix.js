import { Schema, model, Types } from 'mongoose'

const schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'users',
      required: [true, '使用者必填'],
    },

    version: {
      type: String,
      enum: ['克蘇魯神話TRPG', '新克蘇魯神話TRPG'],
      required: true,
      default: '克蘇魯神話TRPG',
    },

    investigator_name: { type: String },
    occupation: { type: String },
    colleges_degrees: { type: String },
    birthplace: { type: String },
    mental_disorders: { type: String },
    sex: { type: String },
    age: { type: String },
    image: { type: String },

    str: { type: Number },
    con: { type: Number },
    pow: { type: Number },
    dex: { type: Number },
    app: { type: Number },
    siz: { type: Number },
    int: { type: Number },
    edu: { type: Number },

    idea: { type: Number },
    know: { type: Number },
    luck: { type: Number },
    db: { type: String },
    hp: { type: Number },
    mp: { type: Number },
    san: { type: Number },

    opspothidden: { type: Number },
    ipspothidden: { type: Number },
    gpspothidden: { type: Number },

    oplisten: { type: Number },
    iplisten: { type: Number },
    gplisten: { type: Number },

    oplibraryuse: { type: Number },
    iplibraryuse: { type: Number },
    gplibraryuse: { type: Number },

    background: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('charaSheetSixs', schema)
