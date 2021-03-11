/**
 * Module for Helper functions.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Check if document owner and current user are equal.
 *
 * @param {string} documentOwner - name of document owner.
 * @returns {boolean} - true when matching.
 */
export function isOpen (state) {
  if (state === 'opened') {
    return true
  }
}

/**
 * Check if document owner and current user are equal.
 *
 * @param {string} documentOwner - name of document owner.
 * @returns {boolean} - true when matching.
 */
 export function isClosed (state) {
  if (state === 'closed') {
    return true
  }
}
