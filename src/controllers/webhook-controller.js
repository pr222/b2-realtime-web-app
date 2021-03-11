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
    req.body = {
      iid: req.body.object_attributes.iid,
      title: req.body.object_attributes.title,
      description: req.body.object_attributes.description,
      // avatar: req.body.user.avatar_url
    }

    // console.log('CONTROLLER-INDEX')
    // console.log(req.body)

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
    if (req.headers['x-gitlab-token'] !== process.env.HOOK_SECRET) {
      res.status(403).send('Incorrect Secret')
      return
    }

    next()
  }
}
