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
   * Only keep relevant information coming from the request body.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  index (req, res, next) {
    req.body = {
      iid: req.body.object_attributes.iid,
      title: req.body.object_attributes.title,
      description: req.body.object_attributes.description,
      avatar: req.body.user.avatar_url,
      state: req.body.object_attributes.state,
      action: req.body.object_attributes.action
    }

    next()
  }

  /**
   * Make sure token from gitlab matches the hook-secret.
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
