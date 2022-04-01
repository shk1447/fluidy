
const interface = require('./interface');

function User() {
    interface.call(this);
    this.table_name = 'user'
    this.schema = {
        idx: {
            type: 'increments',
            comment: "index field"
        },
        type: {
            type: 'string',
            options: [50],
            default: 'local'
        },
        email: {
            type: 'string',
            options: [50],
            unique: true,
            index: ['index_emaii'],
        },
        pwd: {
            type: 'string',
            options: [50]
        },
        company_name: {
            type: 'string',
            options: [50]
        },
        first_name: {
            type: 'string',
            options: [50]
        },
        last_name: {
            type: 'string',
            options: [50]
        },
        phone_number: {
            type: 'string',
            options: [50]
        },
        photo: {
            type: 'string',
            options: [150],
        },
        secret: {
            type: 'string',
            options: [100]
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

User.prototype = Object.create(interface.prototype);

module.exports = User;
