/**
 * Module for Helper functions.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Check for open state.
 *
 * @param {string} state - current state.
 * @returns {boolean} - true when matching.
 */
export function isOpen (state) {
  if (state === 'opened') {
    return true
  }
}

/**
 * Check for closed state.
 *
 * @param {string} state - current state.
 * @returns {boolean} - true when matching.
 */
export function isClosed (state) {
  if (state === 'closed') {
    return true
  }
}
