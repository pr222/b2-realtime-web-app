/**
 * Sub-router for Home.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { IssueController } from '../controllers/issue-controller.js'

export const router = express.Router()

const controller = new IssueController()

router.get('/', controller.index)
router.get('/closed', controller.closed)
router.post('/update/:act/:iid', controller.update)
