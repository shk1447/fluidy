const auth = require('./auth.js');
const user = require('./user.js')
const space = require('./space.js');
const flow = require('./flow.js');
const docs = require('./docs.js');
const content = require('./content.js');

module.exports = {
    auth: auth,
    user: user,
    space: space,
    flow: flow,
    docs: docs,
    content: content
}
