
const interface = require('./interface');

function Space() {
  interface.call(this);
  this.table_name = 'space'
  this.schema = {
    idx: {
      type: 'increments',
      comment: "index field"
    },
    space_guid: {
      type: 'string',
      options: [50],
      primary: true,
      notNullable: true
    },
    space_name: {
      type: 'string',
      options: [50],
      unique: true,
      index: ['index_space_name'],
    },
    email: {
      type: 'string',
      unique: true,
      options: [50]
    },
    role: {
      type: 'string',
      options: [10],
      default: 'viewer',
    },
    created_time: {
      type: 'timestamp',
      options: [{
        precision: 6
      }],
      index: ['idx_created_time'],
      default: fluidy.db.knex.fn.now()
    }
  }
}

Space.prototype = Object.create(interface.prototype);

module.exports = Space;
