import { Router } from 'express'
import * as schedule from '../controllers/schedule.js'
import * as auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'

const router = new Router()

router.post('/', auth.jwt, upload, schedule.create)
router.get('/', auth.jwt, schedule.get)
router.get('/all', auth.jwt, auth.admin, schedule.getAll)
router.get('/:id', schedule.getId)
router.patch('/:id', auth.jwt, upload, schedule.edit)
router.delete('/:id', auth.jwt, schedule.remove)

export default router
