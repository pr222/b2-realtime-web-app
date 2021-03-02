/**
 * Issue controller.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

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
  index (req, res, next) {
    try {
      // Get all open issues and display the viewData
      res.render('issues/index')
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
  closed (req, res, next) {
    try {
      // Get all closed issues and display the viewData
      res.render('issues/closed')
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
      // Handle POST req from gitlab.

      // res.redirect('.')
    } catch (error) {
      // Flash-message
    }
  }
}
