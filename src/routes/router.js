/**
 * Main router point for sub-routers.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as issueRouter } from './issue-router.js'
import { router as webhookRouter } from './webhook-router.js'

export const router = express.Router()

router.use('/', issueRouter)

router.use('/webhook/', webhookRouter)

router.use('*', (req, res, next) => {
  return next(createError(404, 'Not Found'))
})
