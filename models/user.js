import { Schema, model, Types, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import UserRole from '../enums/UserRole.js'

// const charaListSchema = new Schema({
//   charaSheetSix: {
//     type: Types.ObjectId,
//     ref: 'charaSheetSixs',
//   },
// })
const schema = new Schema(
  {
    account: {
      type: String,
      required: [true, '使用者帳號必填'],
      minlength: [4, '使用者帳號太短'],
      maxlength: [20, '使用者帳號太長'],
      unique: true,
      validate: {
        validator(value) {
          return validator.isAlphanumeric(value)
        },
        message: '使用者帳號格式不符',
      },
    },
    password: {
      type: String,
      required: [true, '使用者密碼必填'],
    },
    email: {
      type: String,
      required: [true, '使用者信箱必填'],
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value)
        },
        message: '使用者信箱格式不符',
      },
    },
    tokens: {
      type: [String],
    },
    role: {
      type: Number,
      default: UserRole.USER,
    },
    // charaList: {
    //   type: [charaListSchema],
    // },

    schedule: {
      type: Types.ObjectId,
      ref: 'schedules',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

schema.pre('save', function (next) {
  const user = this
  console.log('modified', user.isModified('password'))
  if (user.isModified('password')) {
    if (user.password.length < 4) {
      const error = new Error.ValidationError()
      error.addError('password', new Error.ValidatorError({ message: '使用者密碼太短' }))
      next(error)
    } else if (user.password.length > 20) {
      const error = new Error.ValidationError()
      error.addError('password', new Error.ValidatorError({ message: '使用者密碼太長' }))
      next(error)
    } else {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  next()
})

export default model('users', schema)
