
const interface = require('./interface');

function Session() {
    interface.call(this);
    this.table_name = 'session'
    this.schema = {
        idx : {
            type:'increments',
            comment:"index field"
        },
        sid : {
            type :'string',
            unique:true,
            options: [255]
        },
        sess : {
            type :'text',
            notNullable:true
        },
        expired : {
            type :'dateTime',
            notNullable:true,
            index:['idx_expired']
        }
    }
}

Session.prototype = Object.create(interface.prototype);

module.exports = Session;
