import multer from 'multer'
// import { v2 as cloudinary } from 'cloudinary'
import pkg from 'cloudinary'
const { v2: cloudinary } = pkg
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { StatusCodes } from 'http-status-codes'

// 設定 cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const upload = multer({
  storage: new CloudinaryStorage({ cloudinary }),
  fileFilter(req, file, callback) {
    console.log(file) // 除錯用，正式環境可移除
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024, // 限制 1MB
  },
})

export default (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (error) {
      console.log(error)
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'uploadFailed',
      })
    } else {
      next()
    }
  })
}
