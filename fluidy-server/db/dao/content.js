
const interface = require('./interface');

function Content() {
  interface.call(this);
  this.table_name = 'content'
  this.schema = {
    idx: {
      type: 'increments',
      comment: "index field"
    },
    space_guid: {
      type: 'string',
      options: [50],
      index: ['index_space_guid'],
      unique: true,
    },
    content_guid: {
      type: 'string',
      options: [50],
      unique: true,
    },
    content_name: {
      type: 'string',
      options: [50]
    },
    content_type: {
      type:'string',
      options: [50]
    },
    content_options: {
      type: 'text'
    },
    email: {
      type:'string',
      options: [50]
    },
    created_time: {
      type: 'timestamp',
      options: [{
        precision: 6,
      }],
      index: ['idx_created_time'],
      default: fluidy.db.knex.fn.now()
    }
  }
}

Content.prototype = Object.create(interface.prototype);

module.exports = Content;
