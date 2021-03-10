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
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async index (req, res, next) {
    try {
      // Get all open issues and display the viewData
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
      // console.log(req.session)
      res.render('issues/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async closed (req, res, next) {
    try {
      // Get all closed issues and display the viewData
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
            state: issue.state,
            avatar: issue.author.avatar_url
          }))
      }

      res.render('issues/closed', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  create (req, res, next) {
    try {
      console.log('ISSUECONTROLLER-CREATE')
      console.log(req.body)

      // Handle POST req from gitlab.
      res.io.emit('issueEvent', {
        iid: req.body.iid,
        title: req.body.title,
        description: req.body.description,
        avatar: req.body.avatar
      })

      res.status(200).send('Hook accepted')
      return
      // res.redirect('/')
    } catch (error) {
      next(error)
    }
  }
}
