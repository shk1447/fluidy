
const interface = require('./interface');

function Node() {
  interface.call(this);
  this.table_name = 'node'
  this.schema = {
    idx: {
      type: 'increments',
      comment: "index field"
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
    parent: {
      type: 'string',
      options: [50],
    },
    type: {
      type: 'string',
      options: [50],
      default: 'Process'
    },
    meta: {
      type: 'text'
    },
    fields: {
      type: 'text'
    },
    space_name: {
      type: 'string',
      options: [50],
      index: ['index_space_name'],
    },
    created_time: {
      type: 'timestamp',
      options: {
        precision: 6
      },
      index: ['idx_created_time'],
      default: fluidy.db.knex.fn.now()
    }
  }
}

Node.prototype = Object.create(interface.prototype);

module.exports = Node;
