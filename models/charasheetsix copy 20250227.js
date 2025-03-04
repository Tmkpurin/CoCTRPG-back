import { Schema, model, Types } from 'mongoose'

const skillSchema = new Schema(
  {
    occupation_point: { type: Number, default: 0 },
    interest_point: { type: Number, default: 0 },
    growth_point: { type: Number, default: 0 },
  },
  { _id: false },
)

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

    str: { type: Number, default: 0 },
    con: { type: Number, default: 0 },
    pow: { type: Number, default: 0 },
    dex: { type: Number, default: 0 },
    app: { type: Number, default: 0 },
    siz: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    edu: { type: Number, default: 0 },

    idea: { type: Number, default: 0 },
    know: { type: Number, default: 0 },
    luck: { type: Number, default: 0 },
    db: { type: String },
    hp: { type: Number, default: 0 },
    mp: { type: Number, default: 0 },
    san: { type: Number, default: 0 },

    skills: {
      spot_hidden: { type: skillSchema, default: {} },
      listen: { type: skillSchema, default: {} },
      library_use: { type: skillSchema, default: {} },
      track: { type: skillSchema, default: {} },
      navigate: { type: skillSchema, default: {} },

      martial_arts: { type: skillSchema, default: {} },
      dodge: { type: skillSchema, default: {} },
      throw: { type: skillSchema, default: {} },

      first_aid: { type: skillSchema, default: {} },
      psychoanalysis: { type: skillSchema, default: {} },
      medicine: { type: skillSchema, default: {} },

      psychology: { type: skillSchema, default: {} },
      fast_talk: { type: skillSchema, default: {} },
      credit_rating: { type: skillSchema, default: {} },
      bargain: { type: skillSchema, default: {} },
      persuade: { type: skillSchema, default: {} },

      jump: { type: skillSchema, default: {} },
      swim: { type: skillSchema, default: {} },
      sneak: { type: skillSchema, default: {} },
      climb: { type: skillSchema, default: {} },
      hide: { type: skillSchema, default: {} },
      conceal: { type: skillSchema, default: {} },

      own_language: { type: skillSchema, default: {} },
      other_language: { type: skillSchema, default: {} },
      accounting: { type: skillSchema, default: {} },
      history: { type: skillSchema, default: {} },

      drive_auto: { type: skillSchema, default: {} },
      drive: { type: skillSchema, default: {} },
      pilot: { type: skillSchema, default: {} },
      ride: { type: skillSchema, default: {} },

      opr_hvy_mch: { type: skillSchema, default: {} },
      locksmith: { type: skillSchema, default: {} },
      electr_repair: { type: skillSchema, default: {} },
      craft: { type: skillSchema, default: {} },
      mech_repair: { type: skillSchema, default: {} },
      art: { type: skillSchema, default: {} },
      photography: { type: skillSchema, default: {} },
      disguise: { type: skillSchema, default: {} },

      anthropology: { type: skillSchema, default: {} },
      chemistry: { type: skillSchema, default: {} },
      astronomy: { type: skillSchema, default: {} },
      biology: { type: skillSchema, default: {} },
      geology: { type: skillSchema, default: {} },
      archaeology: { type: skillSchema, default: {} },
      law: { type: skillSchema, default: {} },
      physics: { type: skillSchema, default: {} },
      occult: { type: skillSchema, default: {} },
      natural_history: { type: skillSchema, default: {} },
      electronics: { type: skillSchema, default: {} },
      computer_use: { type: skillSchema, default: {} },
      pharmacy: { type: skillSchema, default: {} },
    },

    spothidden: { type: Number, default: 0 },
    listen: { type: Number, default: 0 },
    libraryuse: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('charaSheetSixs', schema)
