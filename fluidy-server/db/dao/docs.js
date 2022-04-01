
const interface = require('./interface');

function Docs() {
  interface.call(this);
  this.table_name = 'docs'
  this.schema = {
    idx: {
      type: 'increments',
      comment: "index field"
    },
    space_name: {
      type: 'string',
      options: [50],
      index: ['index_project_name'],
    },
    id: {
      type: 'string',
      options: [50],
      unique: true,
    },
    code: {
      type: 'string',
      options: [50],
    },
    name: {
      type: 'string',
      options: [50],
    },
    meta: {
      type: 'text'
    },
    fields: {
      type: 'text'
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

Docs.prototype = Object.create(interface.prototype);

module.exports = Docs;
