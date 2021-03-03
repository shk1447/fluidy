
const interface = require('./interface');

function User() {
    interface.call(this);
    this.table_name = 'user'
    this.schema = {
        idx : {
            type:'increments',
            comment:"index field"
        },
        email : {
            type :'string',
            length: 50,
            unique: true,
            index : ['index_emaii'],
        },
        pwd : {
            type :'string',
            length: 50
        },
        created_time: {
            type:'timestamp',
            length:6,
            index:['idx_created_time'],
            default : mrx.db.knex.fn.now()
        }
    }
}

User.prototype = Object.create(interface.prototype);

module.exports = User;
