import app from "./app.js";

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        if (Array.isArray(target[key]) && Array.isArray(source[key])) {
          target[key] = target[key].concat(source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return mergeDeep(target, ...sources);
  } else {
    target = target.concat(...source);
    return target;
  }
}
// 내부 컴포넌트 간의 커스텀 이벤트 전달을 위한 상수 정의
export default (function () {
  var handlers = {};
  var store_objs = {
    app: app
  };
  return {
    all:store_objs,
    getProperty: function (path) {
      var count = 0;
      var path_arr = path.split(".");
      var result = path_arr.reduce(function (d, index) {
        count++;

        return d[index];
      }, store_objs);
      return result;
    },
    setProperty: function (path, value, merge) {
      var count = 0;
      var path_arr = path.split(".");
      var result = path_arr.reduce(function (d, index) {
        count++;
        if (count === path_arr.length) {
          d[index] = merge ? mergeDeep(d[index], value) : value;
        }
        return d[index];
      }, store_objs);

      if (handlers[path]) {
        for (var i = 0; i < handlers[path].length; i++) {
          try {
            handlers[path][i].apply(null, [result]);
          } catch (err) {
            console.log(
              "common.store.set error: [" + path + "] " + err.toString()
            );
            console.log(err);
          }
        }
      }
      return result;
    },
    onProperty: function (path, callback) {
      handlers[path] = handlers[path] || [];
      handlers[path].push(callback);
    },
    offProperty: function (path, callback) {
      var handler = handlers[path];
      if (handler) {
        for (var i = 0; i < handler.length; i++) {
          if (handler[i] === callback) {
            handler.splice(i, 1);
            return;
          }
        }
      }
    },
  };
})();
