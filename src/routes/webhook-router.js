/**
 * Sub-router for Webhooks.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { WebhookController } from '../controllers/webhook-controller.js'
import { IssueController } from '../controllers/issue-controller.js'

export const router = express.Router()

const controller = new WebhookController()
const issueController = new IssueController()

router.post('/issues', controller.authorize, controller.index, issueController.create)
