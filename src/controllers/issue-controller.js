/**
 * Issue controller.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import fetch from 'node-fetch'

/**
 * Encapsulation of a controller.
 */
export class IssueController {
  /**
   * Get all open issues and render index-page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async index (req, res, next) {
    try {
      const response = await fetch(`${process.env.PROJECT_URL}?state=opened`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PROJECT_SECRET}`
        }
      })

      const viewData = {
        issues: (await response.json())
          .map(issue => ({
            id: issue.id,
            iid: issue.iid,
            title: issue.title,
            description: issue.description,
            state: issue.state,
            avatar: issue.author.avatar_url
          }))
      }

      res.render('issues/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all closed issues and render closed-page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async closed (req, res, next) {
    try {
      const response = await fetch(`${process.env.PROJECT_URL}?state=closed`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PROJECT_SECRET}`
        }
      })

      const viewData = {
        issues: (await response.json())
          .map(issue => ({
            id: issue.id,
            iid: issue.iid,
            title: issue.title,
            description: issue.description,
            avatar: issue.author.avatar_url,
            state: issue.state
          }))
      }

      res.render('issues/closed', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Send socket message with a newly opended issue.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  create (req, res, next) {
    try {
      res.io.emit('issueEvent', {
        iid: req.body.iid,
        title: req.body.title,
        description: req.body.description,
        avatar: req.body.avatar,
        state: req.body.state,
        action: req.body.action
      })

      res.status(200).send('Hook accepted')
      return
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all closed issues and render closed-page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async update (req, res, next) {
    try {
      const response = await fetch(`${process.env.PROJECT_URL}/${req.params.iid}?state_event=${req.params.act}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.PROJECT_SECRET}`
        }
      })

      const issue = await response.json()

      res.io.emit('issueEvent', {
        iid: issue.iid,
        title: issue.title,
        description: issue.description,
        avatar: issue.author.avatar_url,
        state: issue.state,
        action: issue.action
      })

      res.redirect('../../')
    } catch (error) {
      next(error)
    }
  }
}
