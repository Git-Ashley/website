/* User session data is stored here (in memory) since there is no need for
 * data persistence and this web service kills itself when there are
 * no active users, so the in-memory store will not get too large.
 */

/* User: {
 *   username: string
 *   displayPicture: {
 *     value: string
 *   }
 * }
 */

// sid: string -> user: User
const Users = new Map();

module.exports = Users;