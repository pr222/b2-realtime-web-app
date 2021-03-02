/**
 * Webhook controller.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Encapsulation of a controller.
 */
export class WebhookController {
  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  index (req, res, next) {
    // filter into req.body with what to extract from the data to send further from the hook into issues.
    next()
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  authorize (req, res, next) {
    // Check if token matches hook-secret
    next()
  }
}
