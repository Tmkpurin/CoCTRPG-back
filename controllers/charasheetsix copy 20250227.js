import { StatusCodes } from 'http-status-codes'
import Charasheetsix from '../models/charasheetsix.js'
import validator from 'validator'

export const create = async (req, res) => {
  try {
    console.log('使用者:', req.user) // 這是 passport 設定的 req.user
    console.log('收到的請求資料:', req.body) // 這是前端表單傳來的資料，會在 req.body 中
    // 確保資料結構符合 Schema

    // eslint-disable-next-line no-unused-vars
    const defaultSkill = { occupation_point: 0, interest_point: 0, growth_point: 0 }
    const skillNames = ['spot_hidden', 'listen', 'library_use', 'track', 'navigate']

    const skills = {}
    skillNames.forEach((skill) => {
      skills[skill] = {
        occupation_point: req.body.skills?.[skill]?.occupation_point ?? 0,
        interest_point: req.body.skills?.[skill]?.interest_point ?? 0,
        growth_point: req.body.skills?.[skill]?.growth_point ?? 0,
      }
    })

    const data = {
      user: req.user._id,
      version: req.version,
      investigator_name: req.body.investigator_name || '',
      occupation: req.body.occupation || '',
      colleges_degrees: req.body.colleges_degrees || '',
      birthplace: req.body.birthplace || '',
      mental_disorders: req.body.mental_disorders || '',
      sex: req.body.sex || '',
      age: req.body.age || '',
      image: req.file?.path || '',

      str: Number(req.body.str) || 0,
      con: Number(req.body.con) || 0,
      pow: Number(req.body.pow) || 0,
      dex: Number(req.body.dex) || 0,
      app: Number(req.body.app) || 0,
      siz: Number(req.body.siz) || 0,
      int: Number(req.body.int) || 0,
      edu: Number(req.body.edu) || 0,

      idea: Number(req.body.idea) || 0,
      know: Number(req.body.know) || 0,
      luck: Number(req.body.luck) || 0,
      db: req.body.db || '',
      hp: Number(req.body.hp) || 0,
      mp: Number(req.body.mp) || 0,
      san: Number(req.body.san) || 0,

      skills,

      spothidden: Number(req.body.spothidden) || 0,
      listen: Number(req.body.listen) || 0,
      libraryuse: Number(req.body.libraryuse) || 0,
    }

    console.log('存入的資料:', data)

    // 存入 MongoDB
    const result = await Charasheetsix.create(data)

    res.status(200).json({
      success: true,
      message: '資料新增成功',
      result,
    })
  } catch (error) {
    // console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.errors[key].message,
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'serverError',
      })
    }
  }
}

export const get = async (req, res) => {
  try {
    // 檢查 req.user 是否存在
    if (!req.user || !req.user._id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized: User not authenticated',
      })
    }

    // 使用 user._id 查詢 Charasheetsix 資料
    const result = await Charasheetsix.find({ user: req.user._id })
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'serverError',
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await Charasheetsix.find()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'serverError',
    })
  }
}

export const getId = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    const result = await Charasheetsix.findById(req.params.id).orFail(new Error('NOT FOUND'))
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'productIdInvalid',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'productNotFound',
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'serverError',
      })
    }
  }
}

export const edit = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    req.body.image = req.file?.path
    const result = await Charasheetsix.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    }).orFail(new Error('NOT FOUND'))

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'productIdInvalid',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'productNotFound',
      })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.errors[key].message,
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'serverError',
      })
    }
  }
}

export const remove = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    const result = await Charasheetsix.findByIdAndDelete(req.params.id).orFail(
      new Error('NOT FOUND'),
    )
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'productIdInvalid',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'productNotFound',
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'serverError',
      })
    }
  }
}
