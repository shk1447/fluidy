
const interface = require('./interface');

function Edge() {
  interface.call(this);
  this.table_name = 'edge'
  this.schema = {
    idx: {
      type: 'increments',
      comment: "index field"
    },
    process_id: {
      type: 'string',
      options: [50]
    },
    source: {
      type: 'string',
      options: [50]
    },
    target: {
      type: 'string',
      options: [50]
    },
    meta: {
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

Edge.prototype = Object.create(interface.prototype);

module.exports = Edge;
