const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const fsPath = require('fs-path');

module.exports = {
  get: {
    /**
      * Content 리스트를 가져가기 위한 API
      * @route GET /content/load
      * @group Content - Operations about Content
      * @returns {object} 200 - An array of Content info
      * @returns {Error}  default - Unexpected error
    */
    load: function (req, res, next) {
      var content = new fluidy.db.dao.Content();
      content.select({ content_guid: req.query.content_guid }).first().then((row) => {
        var fields = JSON.parse(row.content_options).fields;
        var json_field = [];
        _.each(fields, (v, k) => {
          if (v.type == 'json') json_field.push(k);
        })
        fluidy.db.knex(req.query.content_guid).select('*').then((rows) => {
          rows = rows.map((row) => {
            if (json_field.length > 0) {
              json_field.forEach((k) => {
                row[k] = row[k].length > 0 ? JSON.parse(row[k]) : {}
              })
            }
            return row;
          })
          res.status(200).send(rows);
        })
      })
    },
    /**
      * Content의 옵션을 제공하는 API
      * @route GET /content/options
      * @group Content - Operations about Content
      * @returns {object} 200 - An array of Content info
      * @returns {Error}  default - Unexpected error
    */
    options: function (req, res, next) {
      res.status(200).send({
        table: {
          fields: {
            file: {},
            string: {},
            text: {}
          }
        }
      })
    }
  },
  post: {
    /**
      * Content를 생성하기 위한 API
      * @route GET /content/create
      * @group Content - Operations about Content
      * @returns {object} 200 - An array of Content info
      * @returns {Error}  default - Unexpected error
    */
    create: function (req, res, next) {
      var content = new fluidy.db.dao.Content();
      var hash = crypto.createHash('sha1');
      var data = hash.update(req.body.space_guid + req.body.content_name, 'utf-8');
      var content_guid = data.digest('hex');
      console.log(content_guid)

      if (req.body.content_type == 'flow') {
        req.body.content_options.fields['name'] = {
          name: 'NAME',
          type: 'string',
        };
        req.body.content_options.fields['type'] = {
          name: 'TYPE',
          type: 'select',
          options: {
            items: [
              { text: 'Process', value: 'Process' },
              { text: 'Decision', value: 'Decision' },
              { text: 'Document', value: 'Document' },
              { text: 'Terminal', value: 'Terminal' },
              { text: 'OtherProcess', value: 'OtherProcess' },
              { text: 'Database', value: 'Database' },
              { text: 'MultiDocuments', value: 'MultiDocuments' },
              { text: 'Edge', value: 'Edge' },
            ],
            default: 'Process'
          },
          disabled: true,
        };
        req.body.content_options.fields['meta'] = {
          name: 'META',
          type: 'json',
          disabled: true,
          options: {
            default: '{"position":{"x":200,"y":200}}'
          }
        };
      }


      var row = {
        space_guid: req.body.space_guid,
        content_guid: content_guid,
        content_name: req.body.content_name,
        content_type: req.body.content_type,
        content_options: JSON.stringify(req.body.content_options),
        email: req.session.passport.user.email
      };

      fluidy.db.knex.schema.createTable(content_guid, function (t) {
        t.increments('idx')
        var indexer = {};
        var unique_keys = [];
        _.each(req.body.content_options.fields, (d, i) => {
          var column_type;
          switch (d.type) {
            case 'text':
              column_type = 'text'
              break;
            case 'checkbox':
              column_type = 'boolean'
              break;
            case 'json':
              column_type = 'text'
              break;
            default:
              column_type = 'string'
              break;
          }
          var column = t[column_type].apply(this, [i]);
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
      }).then(() => {
        content.insert(row).then(() => {
          res.status(200).send({ message: '컨텐츠가 생성되었습니다.' })
        }).catch((err) => {
          res.status(500).send(err)
        })
      })
    },
    /**
      * Content를 수정하기 위한 API
      * @route GET /content/update
      * @group Content - Operations about Content
      * @returns {object} 200 - An array of Content info
      * @returns {Error}  default - Unexpected error
    */
    update: function (req, res, next) {
      var content = new fluidy.db.dao.Content();
      var row = {
        content_name: req.body.content_name,
        content_type: req.body.content_type,
        content_options: JSON.stringify(req.body.content_options)
      };
      function sym_diff(a, b) {
        var tmp = {}, res = { dropColumns: [], newColumns: [] };
        for (var i = 0; i < a.length; i++) {
          tmp[a[i]] = 2;
        }
        for (var i = 0; i < b.length; i++) {
          if (tmp[b[i]]) {
            delete tmp[b[i]];
          } else {
            tmp[b[i]] = 1;
          }
        }
        for (var k in tmp) {
          if (tmp[k] == 2) {
            res.dropColumns.push(k);
          } else {
            res.newColumns.push(k);
          }
        }
        return res;
      }
      content.select({ content_guid: req.body.content_guid }).then((rows) => {
        if (rows.length > 0) {
          var options = JSON.parse(rows[0].content_options);
          var old_columns = Object.keys(options.fields);
          var new_columns = Object.keys(req.body.content_options.fields);
          var alter_columns = sym_diff(old_columns, new_columns);

          fluidy.db.knex.schema.alterTable(req.body.content_guid, function (t) {
            alter_columns.dropColumns.forEach((column_name) => {
              t.dropColumn(column_name);
            })
            var indexer = {};
            alter_columns.newColumns.forEach((i) => {
              var d = req.body.content_options.fields[i];
              var column_type;
              switch (d.type) {
                case 'text':
                  column_type = 'text'
                  break;
                case 'checkbox':
                  column_type = 'boolean'
                  break;
                case 'json':
                  column_type = 'json'
                  break;
                default:
                  column_type = 'string'
                  break;
              }
              var column = t[column_type].apply(this, [i]);
              if (d.default) column.defaultTo(d.default)
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
            _.each(indexer, (d, i) => {
              t.index(d, i);
            })
          }).then(() => {
            content.update({ content_guid: req.body.content_guid }, row).then(() => {
              res.status(200).send()
            })
          })
        }
      })
    },
    /**
      * Content를 삭제하기 위한 API
      * @route GET /content/delete
      * @group Content - Operations about content
      * @returns {object} 200 - An array of content info
      * @returns {Error}  default - Unexpected error
    */
    delete: function (req, res, next) {
      var content = new fluidy.db.dao.Content();
      fluidy.db.knex.schema.dropTableIfExists(req.body.content_guid).then(() => {
        content.delete({ content_guid: req.body.content_guid }).then(() => {
          res.status(200).send()
        })
      })
    },
    /**
      * Content에 데이터를 추가하기 위한 API
      * @route GET /content/add
      * @group Content - Operations about Content
      * @returns {object} 200 - An array of Content info
      * @returns {Error}  default - Unexpected error
    */
    "data/add": function (req, res, next) {
      var content_guid = req.body.content_guid;
      delete req.body.content_guid;
      var content = new fluidy.db.dao.Content();
      content.select({ content_guid: content_guid }).first().then((row) => {
        var fields = JSON.parse(row.content_options).fields;
        var row = {};
        _.each(fields, (v, k) => {
          if (v.type == 'file') {
            var file_folder = './content/' + content_guid + '/';
            if (req.files && req.files[k]) {
              var write_path = path.resolve(process.env.root_path, file_folder + req.files[k].name);
              fsPath.writeFileSync(write_path, req.files[k].data)
              row[k] = req.files[k].name;
            } else {
              row[k] = req.body[k];
            }
          } else {
            row[k] = req.body[k];
          }
        })

        fluidy.db.knex(content_guid).insert(row).then(() => {
          res.status(200).send();
        })
      })
    },
    "data/update": function (req, res, next) {
      try {
        var content_guid = req.body.content_guid;
        delete req.body.content_guid;
        var content = new fluidy.db.dao.Content();
        content.select({ content_guid: content_guid }).first().then((row) => {
          var fields = JSON.parse(row.content_options).fields;
          fluidy.db.knex(content_guid).select('*').where({ idx: req.body.idx }).first().then((old_row) => {
            var row = {};
            _.each(fields, (v, k) => {
              if (v.type == 'file') {
                var file_folder = './content/' + content_guid + '/';
                if (req.files && req.files[k]) {
                  var write_path = path.resolve(process.env.root_path, file_folder + req.files[k].name);
                  fsPath.writeFileSync(write_path, req.files[k].data)
                  row[k] = req.files[k].name;
                } else {
                  if (req.body[k] == "") {
                    row[k] = req.body[k];
                    var del_path = path.resolve(process.env.root_path, file_folder + old_row[k]);
                    try {
                      fs.unlinkSync(del_path);
                    } catch (error) {

                    }
                  }
                }
              } else {
                if (req.body[k] != undefined) {
                  if (v.type == 'checkbox') {
                    row[k] = (req.body[k] == 'true');
                  } else if (v.type == 'select') {
                    row[k] = req.body[k];
                  } else if (v.type == 'json') {
                    row[k] = typeof req.body[k] == 'string' ? req.body[k] : JSON.stringify(req.body[k]);
                  } else {
                    row[k] = req.body[k];
                  }
                }
              }
            })
            console.log(row);
            fluidy.db.knex(content_guid).where({ idx: req.body.idx }).update(row).then(() => {
              res.status(200).send();
            })
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    "data/delete": function (req, res, next) {
      var content_guid = req.body.content_guid;
      delete req.body.content_guid;
      fluidy.db.knex(content_guid).where({ idx: req.body.idx }).del().then(() => {
        res.status(200).send();
      })
    },
    "data/load": function (req, res, next) {
      res.status(200).send();
    }
  }
}