import { Router } from 'express'
import * as charasheetsix from '../controllers/charasheetsix.js'
import * as auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'

const router = new Router()

router.post('/', auth.jwt, upload, charasheetsix.create)
router.get('/', auth.jwt, charasheetsix.get)
router.get('/all', auth.jwt, auth.admin, charasheetsix.getAll)
router.get('/:id', charasheetsix.getId)
router.patch('/:id', auth.jwt, upload, charasheetsix.edit)
router.delete('/:id', auth.jwt, charasheetsix.remove)

export default router
