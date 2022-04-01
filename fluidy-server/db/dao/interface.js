function dao_interface() { }

dao_interface.prototype.create = function () {
    return fluidy.db.knex.schema.hasTable(this.table_name).then((exists) => {
        if (!exists) {
            var schema = this.schema;
            var table_name = this.table_name;
            return fluidy.db.knex.schema.createTable(this.table_name, function (t) {
                var indexer = {};
                var unique_keys = [];
                _.each(schema, (d, i) => {
                    var column = t[d.type].apply(this, [i].concat(d.options));
                    if (d.default) column.defaultTo(d.default)
                    if (d.unique) unique_keys.push(i);
                    if (d.nullable) column.nullable();
                    if (d.notNullable) column.notNullable();

                    if (d.index && d.index.length > 0) {
                        _.each(d.index, (index_name, k) => {
                            if (indexer[table_name + '_' + index_name]) {
                                indexer[table_name + '_' + index_name].push(i)
                            } else {
                                indexer[table_name + '_' + index_name] = [i];
                            }
                        })
                    }
                })
                if (unique_keys.length > 0) t.unique(unique_keys);
                _.each(indexer, (d, i) => {
                    t.index(d, i);
                })
            })
        }
    }).catch((err) => {
        console.log("[" + this.table_name, ": initialize error] ", err)
    })
}
dao_interface.prototype.getTable = function () {
    return fluidy.db.knex(this.table_name);
}
dao_interface.prototype.drop = function () {
    return fluidy.db.knex.schema.dropTable(this.table_name);
}
dao_interface.prototype.select = function (condition, selector) {
    var obj = fluidy.db.knex(this.table_name);
    if (selector) obj = obj.select(fluidy.db.knex.raw(selector))
    else obj = obj.select('*')
    if (condition) obj = obj.where(condition);
    return obj;
}
dao_interface.prototype.insert = function (row) {
    return fluidy.db.knex(this.table_name).insert(row);
}
dao_interface.prototype.batchInsert = function (rows) {
    return fluidy.db.knex.batchInsert(this.table_name, rows, 30);
}
dao_interface.prototype.delete = function (condition) {
    return fluidy.db.knex(this.table_name).where(condition).del();
}
dao_interface.prototype.update = function (condition, row) {
    return fluidy.db.knex(this.table_name).where(condition).update(row);
}
dao_interface.prototype.initialize = function () {
    // 개별적으로 필요할경우 구현해주세요.
    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports = dao_interface;
