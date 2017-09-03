/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var index = exports.index = ['#000000', '#FFFFFF', '#880000', '#AAFFEE', '#CC44CC', '#00CC55', '#0000AA', '#EEEE77', '#DD8855', '#664400', '#FF7777', '#333333', '#777777', '#AAFF66', '#0088FF', '#BBBBBB'];

var map = exports.map = {
  black: index[0],
  white: index[1],
  red: index[2],
  cyan: index[3],
  violet: index[4],
  green: index[5],
  blue: index[6],
  yellow: index[7],
  orange: index[8],
  brown: index[9],
  lightred: index[10],
  grey_1: index[11],
  grey_2: index[12],
  lightgreen: index[13],
  lightblue: index[14],
  grey_3: index[15]
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uri = __webpack_require__(14);

var ValidationError = exports.ValidationError = function ValidationError (message, instance, schema, propertyPath, name, argument) {
  if (propertyPath) {
    this.property = propertyPath;
  }
  if (message) {
    this.message = message;
  }
  if (schema) {
    if (schema.id) {
      this.schema = schema.id;
    } else {
      this.schema = schema;
    }
  }
  if (instance) {
    this.instance = instance;
  }
  this.name = name;
  this.argument = argument;
  this.stack = this.toString();
};

ValidationError.prototype.toString = function toString() {
  return this.property + ' ' + this.message;
};

var ValidatorResult = exports.ValidatorResult = function ValidatorResult(instance, schema, options, ctx) {
  this.instance = instance;
  this.schema = schema;
  this.propertyPath = ctx.propertyPath;
  this.errors = [];
  this.throwError = options && options.throwError;
  this.disableFormat = options && options.disableFormat === true;
};

ValidatorResult.prototype.addError = function addError(detail) {
  var err;
  if (typeof detail == 'string') {
    err = new ValidationError(detail, this.instance, this.schema, this.propertyPath);
  } else {
    if (!detail) throw new Error('Missing error detail');
    if (!detail.message) throw new Error('Missing error message');
    if (!detail.name) throw new Error('Missing validator type');
    err = new ValidationError(detail.message, this.instance, this.schema, this.propertyPath, detail.name, detail.argument);
  }

  if (this.throwError) {
    throw err;
  }
  this.errors.push(err);
  return err;
};

ValidatorResult.prototype.importErrors = function importErrors(res) {
  if (typeof res == 'string' || (res && res.validatorType)) {
    this.addError(res);
  } else if (res && res.errors) {
    Array.prototype.push.apply(this.errors, res.errors);
  }
};

function stringizer (v,i){
  return i+': '+v.toString()+'\n';
}
ValidatorResult.prototype.toString = function toString(res) {
  return this.errors.map(stringizer).join('');
};

Object.defineProperty(ValidatorResult.prototype, "valid", { get: function() {
  return !this.errors.length;
} });

/**
 * Describes a problem with a Schema which prevents validation of an instance
 * @name SchemaError
 * @constructor
 */
var SchemaError = exports.SchemaError = function SchemaError (msg, schema) {
  this.message = msg;
  this.schema = schema;
  Error.call(this, msg);
  Error.captureStackTrace(this, SchemaError);
};
SchemaError.prototype = Object.create(Error.prototype,
  { constructor: {value: SchemaError, enumerable: false}
  , name: {value: 'SchemaError', enumerable: false}
  });

var SchemaContext = exports.SchemaContext = function SchemaContext (schema, options, propertyPath, base, schemas) {
  this.schema = schema;
  this.options = options;
  this.propertyPath = propertyPath;
  this.base = base;
  this.schemas = schemas;
};

SchemaContext.prototype.resolve = function resolve (target) {
  return uri.resolve(this.base, target);
};

SchemaContext.prototype.makeChild = function makeChild(schema, propertyName){
  var propertyPath = (propertyName===undefined) ? this.propertyPath : this.propertyPath+makeSuffix(propertyName);
  var base = uri.resolve(this.base, schema.id||'');
  var ctx = new SchemaContext(schema, this.options, propertyPath, base, Object.create(this.schemas));
  if(schema.id && !ctx.schemas[base]){
    ctx.schemas[base] = schema;
  }
  return ctx;
}

var FORMAT_REGEXPS = exports.FORMAT_REGEXPS = {
  'date-time': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
  'date': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
  'time': /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,

  'email': /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
  'ip-address': /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  'ipv6': /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
  'uri': /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,

  'color': /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,

  // hostname regex from: http://stackoverflow.com/a/1420225/5628
  'hostname': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
  'host-name': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,

  'alpha': /^[a-zA-Z]+$/,
  'alphanumeric': /^[a-zA-Z0-9]+$/,
  'utc-millisec': function (input) {
    return (typeof input === 'string') && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
  },
  'regex': function (input) {
    var result = true;
    try {
      new RegExp(input);
    } catch (e) {
      result = false;
    }
    return result;
  },
  'style': /\s*(.+?):\s*([^;]+);?/g,
  'phone': /^\+(?:[0-9] ?){6,14}[0-9]$/
};

FORMAT_REGEXPS.regexp = FORMAT_REGEXPS.regex;
FORMAT_REGEXPS.pattern = FORMAT_REGEXPS.regex;
FORMAT_REGEXPS.ipv4 = FORMAT_REGEXPS['ip-address'];

exports.isFormat = function isFormat (input, format, validator) {
  if (typeof input === 'string' && FORMAT_REGEXPS[format] !== undefined) {
    if (FORMAT_REGEXPS[format] instanceof RegExp) {
      return FORMAT_REGEXPS[format].test(input);
    }
    if (typeof FORMAT_REGEXPS[format] === 'function') {
      return FORMAT_REGEXPS[format](input);
    }
  } else if (validator && validator.customFormats &&
      typeof validator.customFormats[format] === 'function') {
    return validator.customFormats[format](input);
  }
  return true;
};

var makeSuffix = exports.makeSuffix = function makeSuffix (key) {
  key = key.toString();
  // This function could be capable of outputting valid a ECMAScript string, but the
  // resulting code for testing which form to use would be tens of thousands of characters long
  // That means this will use the name form for some illegal forms
  if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) {
    return '.' + key;
  }
  if (key.match(/^\d+$/)) {
    return '[' + key + ']';
  }
  return '[' + JSON.stringify(key) + ']';
};

exports.deepCompareStrict = function deepCompareStrict (a, b) {
  if (typeof a !== typeof b) {
    return false;
  }
  if (a instanceof Array) {
    if (!(b instanceof Array)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    return a.every(function (v, i) {
      return deepCompareStrict(a[i], b[i]);
    });
  }
  if (typeof a === 'object') {
    if (!a || !b) {
      return a === b;
    }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every(function (v) {
      return deepCompareStrict(a[v], b[v]);
    });
  }
  return a === b;
};

function deepMerger (target, dst, e, i) {
  if (typeof e === 'object') {
    dst[i] = deepMerge(target[i], e)
  } else {
    if (target.indexOf(e) === -1) {
      dst.push(e)
    }
  }
}

function copyist (src, dst, key) {
  dst[key] = src[key];
}

function copyistWithDeepMerge (target, src, dst, key) {
  if (typeof src[key] !== 'object' || !src[key]) {
    dst[key] = src[key];
  }
  else {
    if (!target[key]) {
      dst[key] = src[key];
    } else {
      dst[key] = deepMerge(target[key], src[key])
    }
  }
}

function deepMerge (target, src) {
  var array = Array.isArray(src);
  var dst = array && [] || {};

  if (array) {
    target = target || [];
    dst = dst.concat(target);
    src.forEach(deepMerger.bind(null, target, dst));
  } else {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach(copyist.bind(null, target, dst));
    }
    Object.keys(src).forEach(copyistWithDeepMerge.bind(null, target, src, dst));
  }

  return dst;
};

module.exports.deepMerge = deepMerge;

/**
 * Validates instance against the provided schema
 * Implements URI+JSON Pointer encoding, e.g. "%7e"="~0"=>"~", "~1"="%2f"=>"/"
 * @param o
 * @param s The path to walk o along
 * @return any
 */
exports.objectGetPath = function objectGetPath(o, s) {
  var parts = s.split('/').slice(1);
  var k;
  while (typeof (k=parts.shift()) == 'string') {
    var n = decodeURIComponent(k.replace(/~0/,'~').replace(/~1/g,'/'));
    if (!(n in o)) return;
    o = o[n];
  }
  return o;
};

function pathEncoder (v) {
  return '/'+encodeURIComponent(v).replace(/~/g,'%7E');
}
/**
 * Accept an Array of property names and return a JSON Pointer URI fragment
 * @param Array a
 * @return {String}
 */
exports.encodePath = function encodePointer(a){
	// ~ must be encoded explicitly because hacks
	// the slash is encoded by encodeURIComponent
	return a.map(pathEncoder).join('');
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openMainMenu = exports.loadMap = undefined;

var _requireMap = __webpack_require__(15);

var _requireMap2 = _interopRequireDefault(_requireMap);

var _localStorageHandler = __webpack_require__(5);

var localStorageHandler = _interopRequireWildcard(_localStorageHandler);

var _MainMenu = __webpack_require__(16);

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _MapController = __webpack_require__(11);

var _MapController2 = _interopRequireDefault(_MapController);

var _GameRenderer = __webpack_require__(9);

var _GameRenderer2 = _interopRequireDefault(_GameRenderer);

var _GameLogger = __webpack_require__(4);

var _GameLogger2 = _interopRequireDefault(_GameLogger);

var _contextmenu = __webpack_require__(17);

var contextmenu = _interopRequireWildcard(_contextmenu);

var _GameTypes = __webpack_require__(10);

var GameTypes = _interopRequireWildcard(_GameTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadMap = exports.loadMap = function loadMap() {};
var openMainMenu = exports.openMainMenu = function openMainMenu() {};
//HACK: These fields are initialized to prevent Flow from complaining...

function startGame(canvas, context) {
  contextmenu.setup();

  localStorageHandler.init();

  (0, _requireMap2.default)(function (data) {
    var isPlaying = false;
    var mainMenu = new _MainMenu2.default(context, data);

    var gameRenderer = new _GameRenderer2.default(context);
    var gameLogger = new _GameLogger2.default();
    var mapController = new _MapController2.default(gameRenderer, gameLogger, data.maps);

    document.addEventListener('keydown', function (event) {
      if (!event.defaultPrevented) {
        if (isPlaying) mapController.onKeyDown(event.key);else mainMenu.onKeyDown(event.key);
      }
    });

    exports.loadMap = loadMap = function loadMap(id) {
      isPlaying = true;
      mapController.switchToMap(id);
    };

    exports.openMainMenu = openMainMenu = function openMainMenu() {
      mapController.destroyCurrentMap(function () {
        isPlaying = false;
        mainMenu.rebuild(data);
        gameLogger.engine('Went back to main menu.');
      });
    };
  });
}

window.onload = function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  if (context) {
    context.translate(0.5, 0.5);
    startGame(canvas, context);
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _escapeHtml = __webpack_require__(20);

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameLogger = function () {
  function GameLogger() {
    _classCallCheck(this, GameLogger);

    var scriptLogsElement = document.getElementById('script-logs');
    if (scriptLogsElement != null) this.logPanel = scriptLogsElement;else throw 'Can\'t find element "script-logs" !';
  }

  _createClass(GameLogger, [{
    key: 'log',
    value: function log(message, type) {
      var elem = document.createElement('div');
      elem.className = 'clearfix';

      var logType = document.createElement('div');
      logType.className = 'log-type';
      logType.innerHTML = '[' + type + ']';
      elem.appendChild(logType);

      var logMessage = document.createElement('div');
      logMessage.className = 'log-message';
      logMessage.innerHTML = (0, _escapeHtml2.default)(message).replace('\n', '<br/>');
      elem.appendChild(logMessage);

      this.logPanel.appendChild(elem);
    }
  }, {
    key: 'debug',
    value: function debug(message) {
      this.log(message, 'debug');
    }
  }, {
    key: 'info',
    value: function info(message) {
      this.log(message, 'info');
    }
  }, {
    key: 'warning',
    value: function warning(message) {
      this.log(message, 'warning');
    }
  }, {
    key: 'error',
    value: function error(message) {
      this.log(message, 'error');
    }
  }, {
    key: 'uncaught',
    value: function uncaught(message) {
      this.log(message, 'uncaught');
    }
  }, {
    key: 'engine',
    value: function engine(message) {
      this.log(message, 'engine');
    }
  }]);

  return GameLogger;
}();

exports.default = GameLogger;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.getPlayedMaps = getPlayedMaps;
exports.setPlayedMaps = setPlayedMaps;
var playedMaps = void 0;

function init() {
  if (!localStorage['playedMaps']) {
    localStorage['playedMaps'] = '[]';
    playedMaps = [];
  } else playedMaps = JSON.parse(localStorage['playedMaps']);
}

function getPlayedMaps() {
  return playedMaps;
}

function setPlayedMaps(played) {
  playedMaps = played;
  localStorage['playedMaps'] = JSON.stringify(playedMaps);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAt = getAt;
exports.paint = paint;

var _CommonTypes = __webpack_require__(0);

var CommonTypes = _interopRequireWildcard(_CommonTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function generateAccessor(x, y) {
  var accessorX = Math.floor(x / 16);
  var accessorY = Math.floor(y / 16);
  return accessorX + ':' + accessorY;
}

function parseAccessor(accessor) {
  return {
    x: parseInt(accessor.substring(0, accessor.indexOf(':')), 10),
    y: parseInt(accessor.substring(accessor.indexOf(':') + 1), 10)
  };
}

function getAt(table, x, y, defaultValue) {
  var accessor = generateAccessor(x, y);
  if (table[accessor]) {
    var subdivision = table[accessor];
    var subdivisionX = (16 + x % 16) % 16;
    var subdivisionY = (16 + y % 16) % 16;
    return subdivision[subdivisionX][subdivisionY];
  } else {
    return defaultValue;
  }
}

function paintSubdivision(state, blocks, brush, defaultValue) {
  if (!state) {
    state = new Array(16);
    for (var _x = 0; _x < 16; _x++) {
      state[_x] = new Array(16);
      for (var _y = 0; _y < 16; _y++) {
        state[_x][_y] = defaultValue;
      }
    }
  }
  return state.map(function (arr, x) {
    return arr.map(function (value, y) {
      return blocks.some(function (coordinates) {
        return coordinates.x == x && coordinates.y == y;
      }) ? brush : value;
    });
  });
}

function divideSubdivisions(blocks) {
  var divided = {};
  blocks.forEach(function (_ref) {
    var x = _ref.x,
        y = _ref.y;

    var accessor = Math.floor(x / 16) + ':' + Math.floor(y / 16);
    var relativeCoordinates = {
      x: (16 + x % 16) % 16,
      y: (16 + y % 16) % 16
    };
    if (!divided[accessor]) divided[accessor] = [relativeCoordinates];else divided[accessor].push(relativeCoordinates);
  });
  return divided;
}

function paint(state, blocks, brush, defaultValue) {
  var bySubdivision = divideSubdivisions(blocks);
  var newState = {};
  Object.keys(state).forEach(function (key) {
    return newState[key] = state[key];
  });
  Object.keys(bySubdivision).forEach(function (key) {
    newState[key] = paintSubdivision(state[key], bySubdivision[key], brush, defaultValue);
    if (newState[key].every(function (arr) {
      return arr.every(function (elem) {
        return elem == defaultValue;
      });
    })) {
      delete newState[key];
    }
  });
  return newState;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = __webpack_require__(1);

var colors = _interopRequireWildcard(_colors);

var _CommonTypes = __webpack_require__(0);

var CommonTypes = _interopRequireWildcard(_CommonTypes);

var _MapTools = __webpack_require__(6);

var MapTools = _interopRequireWildcard(_MapTools);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
  function Ball(startPosition, startDirection) {
    _classCallCheck(this, Ball);

    this.position = startPosition;
    this.direction = startDirection;
    this.state = 'first_tick';
  }

  _createClass(Ball, [{
    key: 'render',
    value: function render(context) {
      context.strokeStyle = colors.map.red;
      context.strokeRect(this.position.x * 8, this.position.y * 8, 7, 7);
      if (this.explosionCoordinates != null) {
        context.strokeStyle = colors.map.yellow;
        context.strokeRect(this.explosionCoordinates.x * 8, this.explosionCoordinates.y * 8, 7, 7);
      }
    }
  }, {
    key: 'logicTick',
    value: function logicTick(map) {
      if (this.state == 'alive') {
        var next = this.getNextPosition();

        var collidesWall = MapTools.getAt(map.blocks, next.x, next.y, 'Empty') == 'Wall';

        if (collidesWall) {
          this.state = 'dead';
        } else {
          this.position = next;
        }
      } else if (this.state == 'first_tick') {
        this.state = 'alive';
      }
    }
  }, {
    key: 'getNextPosition',
    value: function getNextPosition() {
      switch (this.direction) {
        case 'up':
          return { x: this.position.x, y: this.position.y - 1 };
        case 'down':
          return { x: this.position.x, y: this.position.y + 1 };
        case 'left':
          return { x: this.position.x - 1, y: this.position.y };
        case 'right':
          return { x: this.position.x + 1, y: this.position.y };
        default:
          throw 'Unknown direction : ' + this.direction;
      }
    }
  }, {
    key: 'isDead',
    value: function isDead() {
      return this.state == 'dead';
    }
  }, {
    key: 'explodeAt',
    value: function explodeAt(coordinates) {
      this.state = 'exploding';
      this.explosionCoordinates = coordinates;
    }
  }]);

  return Ball;
}();

exports.default = Ball;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = __webpack_require__(1);

var colors = _interopRequireWildcard(_colors);

var _CommonTypes = __webpack_require__(0);

var CommonTypes = _interopRequireWildcard(_CommonTypes);

var _Ball = __webpack_require__(7);

var _Ball2 = _interopRequireDefault(_Ball);

var _MapTools = __webpack_require__(6);

var MapTools = _interopRequireWildcard(_MapTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var directionsMap = {
  'up': { x: 0, y: -1 },
  'down': { x: 0, y: 1 },
  'left': { x: -1, y: 0 },
  'right': { x: 1, y: 0 }
};

var Snake = function () {
  function Snake(startX, startY, spawnDirection) {
    _classCallCheck(this, Snake);

    this.occupied = [{ x: startX, y: startY }, { x: startX, y: startY }, { x: startX, y: startY }, { x: startX, y: startY }];
    this.direction = spawnDirection;
    this.nextDirection = spawnDirection;
    this.state = 'alive';
  }

  _createClass(Snake, [{
    key: 'onKeyDown',
    value: function onKeyDown(key) {
      switch (key) {
        case 'ArrowUp':
          if (this.direction != 'down') this.nextDirection = 'up';
          break;
        case 'ArrowDown':
          if (this.direction != 'up') this.nextDirection = 'down';
          break;
        case 'ArrowLeft':
          if (this.direction != 'right') this.nextDirection = 'left';
          break;
        case 'ArrowRight':
          if (this.direction != 'left') this.nextDirection = 'right';
          break;
      }
    }
  }, {
    key: 'render',
    value: function render(context) {
      context.strokeStyle = this.state == 'dead' ? colors.map.red : colors.map.green;
      this.occupied.forEach(function (position) {
        context.strokeRect(position.x * 8, position.y * 8, 7, 7);
      });
    }
  }, {
    key: 'logicTick',
    value: function logicTick(map, balls) {
      var _this = this;

      if (this.state == 'alive') {
        this.direction = this.nextDirection;

        var max = this.occupied[3];
        var next = { x: max.x + directionsMap[this.direction].x, y: max.y + directionsMap[this.direction].y };

        var walls = map.blocks;
        var collidesWall = MapTools.getAt(map.blocks, next.x, next.y, 'Empty') == 'Wall';

        var oppositeDirections = {
          'up': 'down',
          'down': 'up',
          'left': 'right',
          'right': 'left'
        };
        var nextOccupation = this.occupied.concat([next]).slice(1);
        var collidesBall = false;
        var shouldTickAnyway = true;

        balls.forEach(function (ball) {
          var goesThroughBall = ball.position.x == next.x && ball.position.y == next.y && ball.direction == oppositeDirections[_this.direction];
          if (goesThroughBall) {
            ball.explodeAt(next);
            collidesBall = true;
          } else {
            var ballNextPosition = ball.getNextPosition();
            var intersectsBall = nextOccupation.some(function (coordinates) {
              if (coordinates.x == ballNextPosition.x && coordinates.y == ballNextPosition.y) {
                ball.explodeAt(coordinates);
                return true;
              }
            });
            if (intersectsBall) {
              shouldTickAnyway = false;
              collidesBall = true;
            }
          }
        });
        // As it it's body contains only 4 blocks, the snake can't collide itself

        if (collidesBall && shouldTickAnyway) {
          this.occupied = nextOccupation;
        }

        if (collidesWall || collidesBall) {
          this.state = 'dead';
        } else {
          this.occupied = nextOccupation;
        }
      }
    }
  }, {
    key: 'computeTriggersOverlap',
    value: function computeTriggersOverlap(triggers) {
      var _this2 = this;

      var indices = [];
      triggers.forEach(function (trigger, id) {
        if (trigger.some(function (coordinates) {
          return _this2.occupied.some(function (occupied) {
            return coordinates.x == occupied.x && coordinates.y == occupied.y;
          });
        })) {
          indices.push(id);
        }
      });
      return indices;
    }
  }, {
    key: 'getHeadCoordinates',
    value: function getHeadCoordinates() {
      return this.occupied[3];
    }
  }, {
    key: 'isDead',
    value: function isDead() {
      return this.state == 'dead';
    }
  }]);

  return Snake;
}();

exports.default = Snake;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _renderer = __webpack_require__(12);

var renderer = _interopRequireWildcard(_renderer);

var _colors = __webpack_require__(1);

var colors = _interopRequireWildcard(_colors);

var _CommonTypes = __webpack_require__(0);

var _CommonTypes2 = _interopRequireDefault(_CommonTypes);

var _Snake = __webpack_require__(8);

var _Snake2 = _interopRequireDefault(_Snake);

var _Ball = __webpack_require__(7);

var _Ball2 = _interopRequireDefault(_Ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abc = true;

var GameRenderer = function () {
  function GameRenderer(context) {
    _classCallCheck(this, GameRenderer);

    this.context = context;
  }

  _createClass(GameRenderer, [{
    key: 'render',
    value: function render(map, offsetX, offsetY, snake, balls) {
      var _this = this;

      // canvas size : 320*240
      // (40*8)*(30*8)px
      // Scaled *2

      var width = this.context.canvas.width;
      var height = this.context.canvas.height;

      this.context.clearRect(-1, -1, width + 1, height + 1);
      this.context.lineWidth = 1;
      this.context.setTransform(2, 0, 0, 2, 0, 0);

      this.context.translate(-offsetX + 0.5, -offsetY + 0.5);

      renderer.renderMap(this.context, map);
      snake.render(this.context);
      balls.forEach(function (ball) {
        return ball.render(_this.context);
      });

      renderer.applyGlowEffect(this.context);
    }
  }]);

  return GameRenderer;
}();

exports.default = GameRenderer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jsInterpreter = __webpack_require__(13);

var _jsInterpreter2 = _interopRequireDefault(_jsInterpreter);

var _CommonTypes = __webpack_require__(0);

var CommonTypes = _interopRequireWildcard(_CommonTypes);

var _Snake = __webpack_require__(8);

var _Snake2 = _interopRequireDefault(_Snake);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsInterpreter = __webpack_require__(13);

var _jsInterpreter2 = _interopRequireDefault(_jsInterpreter);

var _CommonTypes = __webpack_require__(0);

var CommonTypes = _interopRequireWildcard(_CommonTypes);

var _localStorageHandler = __webpack_require__(5);

var localStorageHandler = _interopRequireWildcard(_localStorageHandler);

var _game = __webpack_require__(3);

var game = _interopRequireWildcard(_game);

var _GameRenderer = __webpack_require__(9);

var _GameRenderer2 = _interopRequireDefault(_GameRenderer);

var _GameLogger = __webpack_require__(4);

var _GameLogger2 = _interopRequireDefault(_GameLogger);

var _Snake = __webpack_require__(8);

var _Snake2 = _interopRequireDefault(_Snake);

var _Ball = __webpack_require__(7);

var _Ball2 = _interopRequireDefault(_Ball);

var _scriptSetup = __webpack_require__(19);

var scriptSetup = _interopRequireWildcard(_scriptSetup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapController = function () {
  function MapController(renderer, logger, maps) {
    _classCallCheck(this, MapController);

    this.renderer = renderer;
    this.logger = logger;
    this.maps = maps;
    this.tickIntervalID = null;
  }

  _createClass(MapController, [{
    key: 'switchToMap',
    value: function switchToMap(mapID) {
      var _this = this;

      this.logger.engine('Requested to load map "' + this.maps[mapID].name + '".');
      this.destroyCurrentMap(function () {
        if (localStorageHandler.getPlayedMaps().indexOf(mapID) == -1) localStorageHandler.setPlayedMaps([].concat(_toConsumableArray(localStorageHandler.getPlayedMaps()), [mapID]));

        _this.map = Object.assign({}, _this.maps[mapID]);
        _this.mapID = mapID;
        _this.state = 'exposition';
        _this.tickIntervalID = null;
        _this.onStartPlayingCallbacks = [];
        _this.delayed = [];
        _this.triggerOverlapListeners = [];

        _this.snake = new _Snake2.default(_this.map.spawnPoint.x, _this.map.spawnPoint.y, _this.map.spawnDirection);
        _this.balls = [];

        try {
          _this.interpreter = new _jsInterpreter2.default('');
        } catch (error) {
          _this.logger.uncaught('While initializing interpreter : \n' + error.message);
          return;
        }

        scriptSetup.setup(_this.logger, _this);

        try {
          _this.interpreter.appendCode(_this.map.script);
        } catch (error) {
          _this.logger.uncaught('While parsing script :\n' + error.message);
          return;
        }

        _this.delay(function () {
          _this.resumeInterpreter();
        }, 0);

        _this.startTicking();
        _this.logger.engine('Map loaded.');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var snakeHeadCoordinates = this.snake.getHeadCoordinates();
      this.renderer.render(this.map, Math.floor(snakeHeadCoordinates.x / 40) * 320, Math.floor(snakeHeadCoordinates.y / 30) * 240, this.snake, this.balls);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(key) {
      if (key == 'Escape') {
        game.openMainMenu();
      } else if (this.state == 'exposition') {
        this.state = 'playing';
        this.onStartPlayingCallbacks.forEach(function (callback) {
          return callback();
        });
        this.onStartPlayingCallbacks = [];
      } else if (this.state == 'playing') this.snake.onKeyDown(key);
    }
  }, {
    key: 'tick',
    value: function tick() {
      var _this2 = this;

      if (this.state != 'terminating') {
        var callbacks = [];
        this.delayed = this.delayed.filter(function (info) {
          if (info.remainingTicks-- <= 0) {
            callbacks.push(info.callback);
            return false;
          } else return true;
        });
        callbacks.forEach(function (callback) {
          return callback();
        });

        if (this.state == 'playing') this.snake.logicTick(this.map, this.balls);

        if (this.snake.isDead()) {
          this.switchToMap(this.mapID);
        } else {
          this.balls = this.balls.filter(function (ball) {
            ball.logicTick(_this2.map);
            return !ball.isDead();
          });

          var triggerListenersToCall = this.snake.computeTriggersOverlap(this.triggerOverlapListeners.map(function (trigger) {
            return trigger.coordinates;
          }));
          triggerListenersToCall.forEach(function (listenerID) {
            return _this2.triggerOverlapListeners[listenerID].callback();
          });
        }

        this.render();
      } else {
        if (this.tickIntervalID != null) clearInterval(this.tickIntervalID);
        this.tickIntervalID = null;
        this.onDestroy();
      }
    }
  }, {
    key: 'startTicking',
    value: function startTicking() {
      this.tickIntervalID = setInterval(this.tick.bind(this), 1000 / 3);
    }
  }, {
    key: 'stopTicking',
    value: function stopTicking() {
      if (this.tickIntervalID != null) clearInterval(this.tickIntervalID);
      this.tickIntervalID = null;
    }
  }, {
    key: 'isTicking',
    value: function isTicking() {
      return this.tickIntervalID !== null;
    }
  }, {
    key: 'resumeInterpreter',
    value: function resumeInterpreter() {
      try {
        this.interpreter.run();
      } catch (error) {
        this.logger.uncaught('While interpreting script : \n' + error.message);
      }
    }
  }, {
    key: 'bindOnStartPlaying',
    value: function bindOnStartPlaying(callback) {
      if (this.state == 'exposition') this.onStartPlayingCallbacks.push(callback);
    }
  }, {
    key: 'delay',
    value: function delay(callback, ticks) {
      this.delayed.push({
        remainingTicks: ticks,
        callback: callback
      });
    }
  }, {
    key: 'addTriggerListener',
    value: function addTriggerListener(blocks, callback) {
      var _this3 = this;

      var listenerID = this.triggerOverlapListeners.length + 1;
      this.triggerOverlapListeners[listenerID] = {
        coordinates: blocks,
        callback: callback
      };
      return function () {
        delete _this3.triggerOverlapListeners[listenerID];
      };
    }
  }, {
    key: 'spawnBall',
    value: function spawnBall(position, direction) {
      this.balls.push(new _Ball2.default(position, direction));
    }
  }, {
    key: 'destroyCurrentMap',
    value: function destroyCurrentMap(onDestroy) {
      if (this.isTicking()) {
        this.state = 'terminating';
        this.onDestroy = onDestroy;
      } else {
        onDestroy();
      }
    }
  }]);

  return MapController;
}();

exports.default = MapController;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMap = renderMap;
exports.applyGlowEffect = applyGlowEffect;

var _colors = __webpack_require__(1);

var colors = _interopRequireWildcard(_colors);

var _BoxBlur = __webpack_require__(18);

var BoxBlur = _interopRequireWildcard(_BoxBlur);

var _CommonTypes = __webpack_require__(0);

var CommonTypes = _interopRequireWildcard(_CommonTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function render(context, x, y, brush, editor) {
  switch (brush) {
    case 'Wall':
      context.strokeStyle = colors.map.white;
      context.strokeRect(x * 8, y * 8, 7, 7);
      break;
    case 'Spawnpoint':
      if (editor) {
        context.strokeStyle = colors.map.green;
        context.strokeRect(x * 8, y * 8, 7, 7);
      }
      break;
  }
}

function renderMap(context, map) {
  Object.keys(map.blocks).forEach(function (accessor) {
    var offset = {
      x: parseInt(accessor.substring(0, accessor.indexOf(':')), 10) * 16,
      y: parseInt(accessor.substring(accessor.indexOf(':') + 1), 10) * 16
    };
    map.blocks[accessor].forEach(function (arr, subdivisionX) {
      return arr.forEach(function (brush, subdivisionY) {
        render(context, offset.x + subdivisionX, offset.y + subdivisionY, brush, true);
      });
    });
  });
}

function applyGlowEffect(context) {
  var width = context.canvas.width;
  var height = context.canvas.height;
  var renderedPixels = context.getImageData(0, 0, width, height).data.subarray();
  var blurredImage = BoxBlur.boxBlurCanvasRGBA(context, 5, 2);

  var divider = 4;

  for (var i = 0; i < width * height; i++) {
    var index = 4 * i;

    var alpha = renderedPixels[index + 3] / 255;
    var invAlpha = 1 - alpha;
    var glowAlpha = blurredImage.data[index + 3] / 255;
    blurredImage.data[index] = renderedPixels[index] * alpha + blurredImage.data[index] * glowAlpha * invAlpha;
    blurredImage.data[index + 1] = renderedPixels[index + 1] * alpha + blurredImage.data[index + 1] * glowAlpha * invAlpha;
    blurredImage.data[index + 2] = renderedPixels[index + 2] * alpha + blurredImage.data[index + 2] * glowAlpha * invAlpha;
    blurredImage.data[index + 3] = 255;
  }

  context.putImageData(blurredImage, 0, 0);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["js-interpreter"] = factory();
	else
		root["js-interpreter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * JavaScript Interpreter
 *
 * Copyright 2013 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Interpreting JavaScript in JavaScript.
 * @author fraser@google.com (Neil Fraser)
 */


/**
 * Create a new interpreter.
 * @param {string|!Object} code Raw JavaScript text or AST.
 * @param {Function=} opt_initFunc Optional initialization function.  Used to
 *     define APIs.  When called it is passed the interpreter object and the
 *     global scope object.
 * @constructor
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var acorn = __webpack_require__(1);

var copy = __webpack_require__(2);

var Interpreter = function Interpreter(code, opt_initFunc) {
  if (typeof code == 'string') {
    code = acorn.parse(code, Interpreter.PARSE_OPTIONS);
  }
  this.ast = code;
  this.initFunc_ = opt_initFunc;
  this.paused_ = false;
  this.polyfills_ = [];
  // Predefine some common primitives for performance.
  this.UNDEFINED = new Interpreter.Primitive(undefined, this);
  this.NULL = new Interpreter.Primitive(null, this);
  this.NAN = new Interpreter.Primitive(NaN, this);
  this.TRUE = new Interpreter.Primitive(true, this);
  this.FALSE = new Interpreter.Primitive(false, this);
  this.NUMBER_ZERO = new Interpreter.Primitive(0, this);
  this.NUMBER_ONE = new Interpreter.Primitive(1, this);
  this.STRING_EMPTY = new Interpreter.Primitive('', this);
  // Create and initialize the global scope.
  this.global = this.createScope(this.ast, null);
  // Fix the parent properties now that the global scope exists.
  //this.UNDEFINED.parent = undefined;
  //this.NULL.parent = undefined;
  this.NAN.parent = this.NUMBER;
  this.TRUE.parent = this.BOOLEAN;
  this.FALSE.parent = this.BOOLEAN;
  this.NUMBER_ZERO.parent = this.NUMBER;
  this.NUMBER_ONE.parent = this.NUMBER;
  this.STRING_EMPTY.parent = this.STRING;
  // Run the polyfills.
  this.ast = acorn.parse(this.polyfills_.join('\n'), Interpreter.PARSE_OPTIONS);
  this.polyfills_ = undefined; // Allow polyfill strings to garbage collect.
  this.stripLocations_(this.ast, undefined, undefined);
  this.stateStack = [{
    node: this.ast,
    scope: this.global,
    thisExpression: this.global,
    done: false
  }];
  this.run();
  this.value = this.UNDEFINED;
  // Point at the main program.
  this.ast = code;
  this.stateStack = [{
    node: this.ast,
    scope: this.global,
    thisExpression: this.global,
    done: false
  }];
};

/**
 * @const {!Object} Configuration used for all Acorn parsing.
 */
Interpreter.PARSE_OPTIONS = {
  ecmaVersion: 5
};

/**
 * Property descriptor of readonly properties.
 */
Interpreter.READONLY_DESCRIPTOR = {
  configurable: true,
  enumerable: true,
  writable: false
};

/**
 * Property descriptor of non-enumerable properties.
 */
Interpreter.NONENUMERABLE_DESCRIPTOR = {
  configurable: true,
  enumerable: false,
  writable: true
};

/**
 * Property descriptor of readonly, non-enumerable properties.
 */
Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR = {
  configurable: true,
  enumerable: false,
  writable: false
};

/**
 * Add more code to the interpreter.
 * @param {string|!Object} code Raw JavaScript text or AST.
 */
Interpreter.prototype.appendCode = function (code) {
  var state = this.stateStack[0];
  if (!state || state.node.type != 'Program') {
    throw Error('Expecting original AST to start with a Program node.');
  }
  if (typeof code == 'string') {
    code = acorn.parse(code, Interpreter.PARSE_OPTIONS);
  }
  if (!code || code.type != 'Program') {
    throw Error('Expecting new AST to start with a Program node.');
  }
  this.populateScope_(code, state.scope);
  // Append the new program to the old one.
  for (var i = 0, node; node = code.body[i]; i++) {
    state.node.body.push(node);
  }
  state.done = false;
};

/**
 * Execute one step of the interpreter.
 * @return {boolean} True if a step was executed, false if no more instructions.
 */
Interpreter.prototype.step = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  if (!state || state.node.type == 'Program' && state.done) {
    return false;
  } else if (this.paused_) {
    return true;
  }
  this['step' + state.node.type]();
  if (!state.node.end) {
    // This is polyfill code.  Keep executing until we arrive at user code.
    return this.step();
  }
  return true;
};

/**
 * Execute the interpreter to program completion.  Vulnerable to infinite loops.
 * @return {boolean} True if a execution is asynchronously blocked,
 *     false if no more instructions.
 */
Interpreter.prototype.run = function () {
  while (!this.paused_ && this.step()) {}
  return this.paused_;
};

/**
 * Initialize the global scope with buitin properties and functions.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initGlobalScope = function (scope) {
  // Initialize uneditable global properties.
  this.setProperty(scope, 'Infinity', this.createPrimitive(Infinity), Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(scope, 'NaN', this.NAN, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(scope, 'undefined', this.UNDEFINED, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(scope, 'window', scope, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(scope, 'self', scope); // Editable.

  // Initialize global objects.
  this.initFunction(scope);
  this.initObject(scope);
  // Unable to set scope's parent prior (this.OBJECT did not exist).
  scope.parent = this.OBJECT;
  this.initArray(scope);
  this.initNumber(scope);
  this.initString(scope);
  this.initBoolean(scope);
  this.initDate(scope);
  this.initMath(scope);
  this.initRegExp(scope);
  this.initJSON(scope);
  this.initError(scope);

  // Initialize global functions.
  var thisInterpreter = this;
  var wrapper;
  wrapper = function wrapper(num) {
    num = num || thisInterpreter.UNDEFINED;
    return thisInterpreter.createPrimitive(isNaN(num.toNumber()));
  };
  this.setProperty(scope, 'isNaN', this.createNativeFunction(wrapper));

  wrapper = function wrapper(num) {
    num = num || thisInterpreter.UNDEFINED;
    return thisInterpreter.createPrimitive(isFinite(num.toNumber()));
  };
  this.setProperty(scope, 'isFinite', this.createNativeFunction(wrapper));

  this.setProperty(scope, 'parseFloat', this.getProperty(this.NUMBER, 'parseFloat'));

  this.setProperty(scope, 'parseInt', this.getProperty(this.NUMBER, 'parseInt'));

  var func = this.createObject(this.FUNCTION);
  func.eval = true;
  this.setProperty(func, 'length', this.NUMBER_ONE, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(scope, 'eval', func);

  var strFunctions = [[escape, 'escape'], [unescape, 'unescape'], [decodeURI, 'decodeURI'], [decodeURIComponent, 'decodeURIComponent'], [encodeURI, 'encodeURI'], [encodeURIComponent, 'encodeURIComponent']];
  for (var i = 0; i < strFunctions.length; i++) {
    wrapper = function (nativeFunc) {
      return function (str) {
        str = (str || thisInterpreter.UNDEFINED).toString();
        try {
          str = nativeFunc(str);
        } catch (e) {
          // decodeURI('%xy') will throw an error.  Catch and rethrow.
          thisInterpreter.throwException(thisInterpreter.URI_ERROR, e.message);
        }
        return thisInterpreter.createPrimitive(str);
      };
    }(strFunctions[i][0]);
    this.setProperty(scope, strFunctions[i][1], this.createNativeFunction(wrapper));
  }

  // Run any user-provided initialization.
  if (this.initFunc_) {
    this.initFunc_(this, scope);
  }
};

/**
 * Initialize the Function class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initFunction = function (scope) {
  var thisInterpreter = this;
  var wrapper;
  var identifierRegexp = /^[A-Za-z_$][\w$]*$/;
  // Function constructor.
  wrapper = function wrapper(var_args) {
    if (this.parent == thisInterpreter.FUNCTION) {
      // Called with new.
      var newFunc = this;
    } else {
      var newFunc = thisInterpreter.createObject(thisInterpreter.FUNCTION);
    }
    if (arguments.length) {
      var code = arguments[arguments.length - 1].toString();
    } else {
      var code = '';
    }
    var args = [];
    for (var i = 0; i < arguments.length - 1; i++) {
      var name = arguments[i].toString();
      if (!name.match(identifierRegexp)) {
        thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR, 'Invalid function argument: ' + name);
        return;
      }
      args.push(name);
    }
    args = args.join(', ');
    // Interestingly, the scope for constructed functions is the global scope,
    // even if they were constructed in some other scope.
    newFunc.parentScope = thisInterpreter.stateStack[0].scope;
    // Acorn needs to parse code in the context of a function or else 'return'
    // statements will be syntax errors.
    var ast = acorn.parse('$ = function(' + args + ') {' + code + '};', Interpreter.PARSE_OPTIONS);
    if (ast.body.length != 1) {
      // Function('a', 'return a + 6;}; {alert(1);');
      thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR, 'Invalid code in function body.');
      return;
    }
    newFunc.node = ast.body[0].expression.right;
    thisInterpreter.setProperty(newFunc, 'length', thisInterpreter.createPrimitive(newFunc.node.length), Interpreter.READONLY_DESCRIPTOR);
    return newFunc;
  };
  this.FUNCTION = this.createObject(null);
  this.setProperty(scope, 'Function', this.FUNCTION);
  // Manually setup type and prototype because createObj doesn't recognize
  // this object as a function (this.FUNCTION did not exist).
  this.FUNCTION.type = 'function';
  this.setProperty(this.FUNCTION, 'prototype', this.createObject(null));
  this.FUNCTION.nativeFunc = wrapper;

  var boxThis = function boxThis(value) {
    // In non-strict mode 'this' must be an object.
    if (value.isPrimitive && !thisInterpreter.getScope().strict) {
      if (value == thisInterpreter.UNDEFINED || value == thisInterpreter.NULL) {
        // 'Undefined' and 'null' are changed to global object.
        value = thisInterpreter.global;
      } else {
        // Primitives must be boxed in non-strict mode.
        var box = thisInterpreter.createObject(value.parent);
        box.data = value.data;
        value = box;
      }
    }
    return value;
  };

  wrapper = function wrapper(thisArg, args) {
    var state = thisInterpreter.stateStack[thisInterpreter.stateStack.length - 1];
    // Rewrite the current 'CallExpression' to apply a different function.
    state.func_ = this;
    // Assign the 'this' object.
    state.funcThis_ = boxThis(thisArg);
    // Bind any provided arguments.
    state.arguments_ = [];
    if (args) {
      if (thisInterpreter.isa(args, thisInterpreter.ARRAY)) {
        for (var i = 0; i < args.length; i++) {
          state.arguments_[i] = thisInterpreter.getProperty(args, i);
        }
      } else {
        thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'CreateListFromArrayLike called on non-object');
      }
    }
    state.doneArgs_ = true;
    state.doneExec_ = false;
  };
  this.setNativeFunctionPrototype(this.FUNCTION, 'apply', wrapper);

  wrapper = function wrapper(thisArg, var_args) {
    var state = thisInterpreter.stateStack[thisInterpreter.stateStack.length - 1];
    // Rewrite the current 'CallExpression' to call a different function.
    state.func_ = this;
    // Assign the 'this' object.
    state.funcThis_ = boxThis(thisArg);
    // Bind any provided arguments.
    state.arguments_ = [];
    for (var i = 1; i < arguments.length; i++) {
      state.arguments_.push(arguments[i]);
    }
    state.doneArgs_ = true;
    state.doneExec_ = false;
  };
  this.setNativeFunctionPrototype(this.FUNCTION, 'call', wrapper);

  this.polyfills_.push(
  // Polyfill copied from:
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind
  "Object.defineProperty(Function.prototype, 'bind', {configurable: true, value:", "function(oThis) {", "if (typeof this !== 'function') {", "throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');", "}", "var aArgs   = Array.prototype.slice.call(arguments, 1),", "fToBind = this,", "fNOP    = function() {},", "fBound  = function() {", "return fToBind.apply(this instanceof fNOP", "? this", ": oThis,", "aArgs.concat(Array.prototype.slice.call(arguments)));", "};", "if (this.prototype) {", "fNOP.prototype = this.prototype;", "}", "fBound.prototype = new fNOP();", "return fBound;", "}", "});", "");

  // Function has no parent to inherit from, so it needs its own mandatory
  // toString and valueOf functions.
  wrapper = function wrapper() {
    return thisInterpreter.createPrimitive(this.toString());
  };
  this.setNativeFunctionPrototype(this.FUNCTION, 'toString', wrapper);
  this.setProperty(this.FUNCTION, 'toString', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);
  wrapper = function wrapper() {
    return thisInterpreter.createPrimitive(this.valueOf());
  };
  this.setNativeFunctionPrototype(this.FUNCTION, 'valueOf', wrapper);
  this.setProperty(this.FUNCTION, 'valueOf', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);
};

/**
 * Initialize the Object class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initObject = function (scope) {
  var thisInterpreter = this;
  var wrapper;
  // Object constructor.
  wrapper = function wrapper(value) {
    if (!value || value == thisInterpreter.UNDEFINED || value == thisInterpreter.NULL) {
      // Create a new object.
      if (this.parent == thisInterpreter.OBJECT) {
        // Called with new.
        return this;
      } else {
        return thisInterpreter.createObject(thisInterpreter.OBJECT);
      }
    }
    if (value.isPrimitive) {
      // Wrap the value as an object.
      var obj = thisInterpreter.createObject(value.parent);
      obj.data = value.data;
      return obj;
    }
    // Return the provided object.
    return value;
  };
  this.OBJECT = this.createNativeFunction(wrapper);
  this.setProperty(scope, 'Object', this.OBJECT);

  // Static methods on Object.
  wrapper = function wrapper(obj) {
    var pseudoList = thisInterpreter.createObject(thisInterpreter.ARRAY);
    var i = 0;
    for (var key in obj.properties) {
      thisInterpreter.setProperty(pseudoList, i, thisInterpreter.createPrimitive(key));
      i++;
    }
    return pseudoList;
  };
  this.setProperty(this.OBJECT, 'getOwnPropertyNames', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj) {
    var pseudoList = thisInterpreter.createObject(thisInterpreter.ARRAY);
    var i = 0;
    for (var key in obj.properties) {
      if (obj.notEnumerable[key]) {
        continue;
      }
      thisInterpreter.setProperty(pseudoList, i, thisInterpreter.createPrimitive(key));
      i++;
    }
    return pseudoList;
  };
  this.setProperty(this.OBJECT, 'keys', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj, prop, descriptor) {
    prop = (prop || thisInterpreter.UNDEFINED).toString();
    if (!(descriptor instanceof Interpreter.Object)) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'Property description must be an object.');
      return;
    }
    if (!obj.properties[prop] && obj.preventExtensions) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'Can\'t define property ' + prop + ', object is not extensible');
      return;
    }
    var value = thisInterpreter.getProperty(descriptor, 'value');
    if (value == thisInterpreter.UNDEFINED) {
      value = null;
    }
    var get = thisInterpreter.getProperty(descriptor, 'get');
    var set = thisInterpreter.getProperty(descriptor, 'set');
    var nativeDescriptor = {
      configurable: thisInterpreter.pseudoToNative(
      /** @type !Interpreter.Primitive */
      thisInterpreter.getProperty(descriptor, 'configurable')),
      enumerable: thisInterpreter.pseudoToNative(
      /** @type !Interpreter.Primitive */
      thisInterpreter.getProperty(descriptor, 'enumerable')),
      writable: thisInterpreter.pseudoToNative(
      /** @type !Interpreter.Primitive */
      thisInterpreter.getProperty(descriptor, 'writable')),
      get: get == thisInterpreter.UNDEFINED ? undefined : get,
      set: set == thisInterpreter.UNDEFINED ? undefined : set
    };
    thisInterpreter.setProperty(obj, prop, value, nativeDescriptor);
    return obj;
  };
  this.setProperty(this.OBJECT, 'defineProperty', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  this.polyfills_.push("Object.defineProperty(Object.prototype, 'defineProperties', {configurable: true, value:", "function(obj, props) {", "var keys = Object.keys(props);", "for (var i = 0; i < keys.length; i++) {", "Object.defineProperty(obj, keys[i], props[keys[i]]);", "}", "return obj;", "}", "});", "");

  wrapper = function wrapper(obj, prop) {
    prop = (prop || thisInterpreter.UNDEFINED).toString();
    if (!(prop in obj.properties)) {
      return thisInterpreter.UNDEFINED;
    }
    var configurable = !obj.notConfigurable[prop];
    var enumerable = !obj.notEnumerable[prop];
    var writable = !obj.notWritable[prop];
    var getter = obj.getter[prop];
    var setter = obj.setter[prop];

    var descriptor = thisInterpreter.createObject(thisInterpreter.OBJECT);
    thisInterpreter.setProperty(descriptor, 'configurable', thisInterpreter.createPrimitive(configurable));
    thisInterpreter.setProperty(descriptor, 'enumerable', thisInterpreter.createPrimitive(enumerable));
    if (getter || setter) {
      thisInterpreter.setProperty(descriptor, 'getter', getter);
      thisInterpreter.setProperty(descriptor, 'setter', setter);
    } else {
      thisInterpreter.setProperty(descriptor, 'writable', thisInterpreter.createPrimitive(writable));
      thisInterpreter.setProperty(descriptor, 'value', thisInterpreter.getProperty(obj, prop));
    }
    return descriptor;
  };
  this.setProperty(this.OBJECT, 'getOwnPropertyDescriptor', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj) {
    if (obj.parent && obj.parent.properties && obj.parent.properties.prototype) {
      return obj.parent.properties.prototype;
    }
    return thisInterpreter.NULL;
  };
  this.setProperty(this.OBJECT, 'getPrototypeOf', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj) {
    return thisInterpreter.createPrimitive(!obj.preventExtensions);
  };
  this.setProperty(this.OBJECT, 'isExtensible', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(obj) {
    if (!obj.isPrimitive) {
      obj.preventExtensions = true;
    }
    return obj;
  };
  this.setProperty(this.OBJECT, 'preventExtensions', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  // Instance methods on Object.
  wrapper = function wrapper() {
    return thisInterpreter.createPrimitive(this.toString());
  };
  this.setNativeFunctionPrototype(this.OBJECT, 'toString', wrapper);

  wrapper = function wrapper() {
    return thisInterpreter.createPrimitive(this.toString());
  };
  this.setNativeFunctionPrototype(this.OBJECT, 'toLocaleString', wrapper);

  wrapper = function wrapper() {
    return thisInterpreter.createPrimitive(this.valueOf());
  };
  this.setNativeFunctionPrototype(this.OBJECT, 'valueOf', wrapper);

  wrapper = function wrapper(prop) {
    if (this == thisInterpreter.NULL || this == thisInterpreter.UNDEFINED) {
      thisInterpreter.throwException(thisInterpreter.TYPE_ERROR, 'Cannot convert undefined or null to object');
      return;
    }
    prop = (prop || thisInterpreter.UNDEFINED).toString();
    return prop in this.properties ? thisInterpreter.TRUE : thisInterpreter.FALSE;
  };
  this.setNativeFunctionPrototype(this.OBJECT, 'hasOwnProperty', wrapper);

  wrapper = function wrapper(prop) {
    prop = (prop || thisInterpreter.UNDEFINED).toString();
    var enumerable = prop in this.properties && !this.notEnumerable[prop];
    return thisInterpreter.createPrimitive(enumerable);
  };
  this.setNativeFunctionPrototype(this.OBJECT, 'propertyIsEnumerable', wrapper);

  wrapper = function wrapper(obj) {
    while (true) {
      if (obj.parent && obj.parent.properties && obj.parent.properties.prototype) {
        obj = obj.parent.properties.prototype;
        if (obj == this) {
          return thisInterpreter.createPrimitive(true);
        }
      } else {
        // No parent, reached the top.
        return thisInterpreter.createPrimitive(false);
      }
    }
  };
  this.setNativeFunctionPrototype(this.OBJECT, 'isPrototypeOf', wrapper);
};

/**
 * Initialize the Array class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initArray = function (scope) {
  var thisInterpreter = this;
  var getInt = function getInt(obj, def) {
    // Return an integer, or the default.
    var n = obj ? Math.floor(obj.toNumber()) : def;
    if (isNaN(n)) {
      n = def;
    }
    return n;
  };
  var strictComp = function strictComp(a, b) {
    // Strict === comparison.
    if (a.isPrimitive && b.isPrimitive) {
      return a.data === b.data;
    }
    return a === b;
  };
  var wrapper;
  // Array constructor.
  wrapper = function wrapper(var_args) {
    if (this.parent == thisInterpreter.ARRAY) {
      // Called with new.
      var newArray = this;
    } else {
      var newArray = thisInterpreter.createObject(thisInterpreter.ARRAY);
    }
    var first = arguments[0];
    if (arguments.length == 1 && first.type == 'number') {
      if (isNaN(thisInterpreter.arrayIndex(first))) {
        thisInterpreter.throwException(thisInterpreter.RANGE_ERROR, 'Invalid array length');
      }
      newArray.length = first.data;
    } else {
      for (var i = 0; i < arguments.length; i++) {
        newArray.properties[i] = arguments[i];
      }
      newArray.length = i;
    }
    return newArray;
  };
  this.ARRAY = this.createNativeFunction(wrapper);
  this.setProperty(scope, 'Array', this.ARRAY);

  // Static methods on Array.
  wrapper = function wrapper(obj) {
    return thisInterpreter.createPrimitive(thisInterpreter.isa(obj, thisInterpreter.ARRAY));
  };
  this.setProperty(this.ARRAY, 'isArray', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  // Instance methods on Array.
  wrapper = function wrapper() {
    if (this.length) {
      var value = this.properties[this.length - 1];
      delete this.properties[this.length - 1];
      this.length--;
    } else {
      var value = thisInterpreter.UNDEFINED;
    }
    return value;
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'pop', wrapper);

  wrapper = function wrapper(var_args) {
    for (var i = 0; i < arguments.length; i++) {
      this.properties[this.length] = arguments[i];
      this.length++;
    }
    return thisInterpreter.createPrimitive(this.length);
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'push', wrapper);

  wrapper = function wrapper() {
    if (this.length) {
      var value = this.properties[0];
      for (var i = 1; i < this.length; i++) {
        this.properties[i - 1] = this.properties[i];
      }
      this.length--;
      delete this.properties[this.length];
    } else {
      var value = thisInterpreter.UNDEFINED;
    }
    return value;
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'shift', wrapper);

  wrapper = function wrapper(var_args) {
    for (var i = this.length - 1; i >= 0; i--) {
      this.properties[i + arguments.length] = this.properties[i];
    }
    this.length += arguments.length;
    for (var i = 0; i < arguments.length; i++) {
      this.properties[i] = arguments[i];
    }
    return thisInterpreter.createPrimitive(this.length);
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'unshift', wrapper);

  wrapper = function wrapper() {
    for (var i = 0; i < this.length / 2; i++) {
      var tmp = this.properties[this.length - i - 1];
      this.properties[this.length - i - 1] = this.properties[i];
      this.properties[i] = tmp;
    }
    return this;
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'reverse', wrapper);

  wrapper = function wrapper(index, howmany, var_args) {
    index = getInt(index, 0);
    if (index < 0) {
      index = Math.max(this.length + index, 0);
    } else {
      index = Math.min(index, this.length);
    }
    howmany = getInt(howmany, Infinity);
    howmany = Math.min(howmany, this.length - index);
    var removed = thisInterpreter.createObject(thisInterpreter.ARRAY);
    // Remove specified elements.
    for (var i = index; i < index + howmany; i++) {
      removed.properties[removed.length++] = this.properties[i];
      this.properties[i] = this.properties[i + howmany];
    }
    // Move other element to fill the gap.
    for (var i = index + howmany; i < this.length - howmany; i++) {
      this.properties[i] = this.properties[i + howmany];
    }
    // Delete superfluous properties.
    for (var i = this.length - howmany; i < this.length; i++) {
      delete this.properties[i];
    }
    this.length -= howmany;
    // Insert specified items.
    for (var i = this.length - 1; i >= index; i--) {
      this.properties[i + arguments.length - 2] = this.properties[i];
    }
    this.length += arguments.length - 2;
    for (var i = 2; i < arguments.length; i++) {
      this.properties[index + i - 2] = arguments[i];
    }
    return removed;
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'splice', wrapper);

  wrapper = function wrapper(opt_begin, opt_end) {
    var list = thisInterpreter.createObject(thisInterpreter.ARRAY);
    var begin = getInt(opt_begin, 0);
    if (begin < 0) {
      begin = this.length + begin;
    }
    begin = Math.max(0, Math.min(begin, this.length));
    var end = getInt(opt_end, this.length);
    if (end < 0) {
      end = this.length + end;
    }
    end = Math.max(0, Math.min(end, this.length));
    var length = 0;
    for (var i = begin; i < end; i++) {
      var element = thisInterpreter.getProperty(this, i);
      thisInterpreter.setProperty(list, length++, element);
    }
    return list;
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'slice', wrapper);

  wrapper = function wrapper(opt_separator) {
    if (!opt_separator || opt_separator.data === undefined) {
      var sep = undefined;
    } else {
      var sep = opt_separator.toString();
    }
    var text = [];
    for (var i = 0; i < this.length; i++) {
      text[i] = this.properties[i];
    }
    return thisInterpreter.createPrimitive(text.join(sep));
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'join', wrapper);

  wrapper = function wrapper(var_args) {
    var list = thisInterpreter.createObject(thisInterpreter.ARRAY);
    var length = 0;
    // Start by copying the current array.
    for (var i = 0; i < this.length; i++) {
      var element = thisInterpreter.getProperty(this, i);
      thisInterpreter.setProperty(list, length++, element);
    }
    // Loop through all arguments and copy them in.
    for (var i = 0; i < arguments.length; i++) {
      var value = arguments[i];
      if (thisInterpreter.isa(value, thisInterpreter.ARRAY)) {
        for (var j = 0; j < value.length; j++) {
          var element = thisInterpreter.getProperty(value, j);
          thisInterpreter.setProperty(list, length++, element);
        }
      } else {
        thisInterpreter.setProperty(list, length++, value);
      }
    }
    return list;
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'concat', wrapper);

  wrapper = function wrapper(searchElement, opt_fromIndex) {
    searchElement = searchElement || thisInterpreter.UNDEFINED;
    var fromIndex = getInt(opt_fromIndex, 0);
    if (fromIndex < 0) {
      fromIndex = this.length + fromIndex;
    }
    fromIndex = Math.max(0, fromIndex);
    for (var i = fromIndex; i < this.length; i++) {
      var element = thisInterpreter.getProperty(this, i);
      if (strictComp(element, searchElement)) {
        return thisInterpreter.createPrimitive(i);
      }
    }
    return thisInterpreter.createPrimitive(-1);
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'indexOf', wrapper);

  wrapper = function wrapper(searchElement, opt_fromIndex) {
    searchElement = searchElement || thisInterpreter.UNDEFINED;
    var fromIndex = getInt(opt_fromIndex, this.length);
    if (fromIndex < 0) {
      fromIndex = this.length + fromIndex;
    }
    fromIndex = Math.min(fromIndex, this.length - 1);
    for (var i = fromIndex; i >= 0; i--) {
      var element = thisInterpreter.getProperty(this, i);
      if (strictComp(element, searchElement)) {
        return thisInterpreter.createPrimitive(i);
      }
    }
    return thisInterpreter.createPrimitive(-1);
  };
  this.setNativeFunctionPrototype(this.ARRAY, 'lastIndexOf', wrapper);

  this.polyfills_.push(
  // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  "Object.defineProperty(Array.prototype, 'every', {configurable: true, value:", "function(callbackfn, thisArg) {", "if (this == null || typeof callbackfn !== 'function') throw new TypeError;", "var T, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "k = 0;", "while (k < len) {", "if (k in O && !callbackfn.call(T, O[k], k, O)) return false;", "k++;", "}", "return true;", "}", "});",

  // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  "Object.defineProperty(Array.prototype, 'filter', {configurable: true, value:", "function(fun/*, thisArg*/) {", "if (this === void 0 || this === null || typeof fun !== 'function') throw new TypeError;", "var t = Object(this);", "var len = t.length >>> 0;", "var res = [];", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in t) {", "var val = t[i];", "if (fun.call(thisArg, val, i, t)) res.push(val);", "}", "}", "return res;", "}", "});",

  // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  "Object.defineProperty(Array.prototype, 'forEach', {configurable: true, value:", "function(callback, thisArg) {", "if (this == null || typeof callback !== 'function') throw new TypeError;", "var T, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "k = 0;", "while (k < len) {", "if (k in O) callback.call(T, O[k], k, O);", "k++;", "}", "}", "});",

  // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  "Object.defineProperty(Array.prototype, 'map', {configurable: true, value:", "function(callback, thisArg) {", "if (this == null || typeof callback !== 'function') new TypeError;", "var T, A, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "A = new Array(len);", "k = 0;", "while (k < len) {", "if (k in O) A[k] = callback.call(T, O[k], k, O);", "k++;", "}", "return A;", "}", "});",

  // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  "Object.defineProperty(Array.prototype, 'reduce', {configurable: true, value:", "function(callback /*, initialValue*/) {", "if (this == null || typeof callback !== 'function') throw new TypeError;", "var t = Object(this), len = t.length >>> 0, k = 0, value;", "if (arguments.length == 2) {", "value = arguments[1];", "} else {", "while (k < len && !(k in t)) k++;", "if (k >= len) {", "throw new TypeError('Reduce of empty array with no initial value');", "}", "value = t[k++];", "}", "for (; k < len; k++) {", "if (k in t) value = callback(value, t[k], k, t);", "}", "return value;", "}", "});",

  // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
  "Object.defineProperty(Array.prototype, 'reduceRight', {configurable: true, value:", "function(callback /*, initialValue*/) {", "if (null === this || 'undefined' === typeof this || 'function' !== typeof callback) throw new TypeError;", "var t = Object(this), len = t.length >>> 0, k = len - 1, value;", "if (arguments.length >= 2) {", "value = arguments[1];", "} else {", "while (k >= 0 && !(k in t)) k--;", "if (k < 0) {", "throw new TypeError('Reduce of empty array with no initial value');", "}", "value = t[k--];", "}", "for (; k >= 0; k--) {", "if (k in t) value = callback(value, t[k], k, t);", "}", "return value;", "}", "});",

  // Polyfill copied from:
  // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  "Object.defineProperty(Array.prototype, 'some', {configurable: true, value:", "function(fun/*, thisArg*/) {", "if (this == null || typeof fun !== 'function') throw new TypeError;", "var t = Object(this);", "var len = t.length >>> 0;", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in t && fun.call(thisArg, t[i], i, t)) {", "return true;", "}", "}", "return false;", "}", "});", "Object.defineProperty(Array.prototype, 'sort', {configurable: true, value:", "function(opt_comp) {", "for (var i = 0; i < this.length; i++) {", "var changes = 0;", "for (var j = 0; j < this.length - i - 1; j++) {", "if (opt_comp ?" + "opt_comp(this[j], this[j + 1]) > 0 : this[j] > this[j + 1]) {", "var swap = this[j];", "this[j] = this[j + 1];", "this[j + 1] = swap;", "changes++;", "}", "}", "if (changes <= 1) break;", "}", "return this;", "}", "});", "Object.defineProperty(Array.prototype, 'toLocaleString', {configurable: true, value:", "function() {", "var out = [];", "for (var i = 0; i < this.length; i++) {", "out[i] = (this[i] === null || this[i] === undefined) ? '' : this[i].toLocaleString();", "}", "return out.join(',');", "}", "});", "");
};

/**
 * Initialize the Number class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initNumber = function (scope) {
  var thisInterpreter = this;
  var wrapper;
  // Number constructor.
  wrapper = function wrapper(value) {
    value = value ? value.toNumber() : 0;
    if (this.parent != thisInterpreter.NUMBER) {
      // Called as Number().
      return thisInterpreter.createPrimitive(value);
    }
    // Called as new Number().
    this.data = value;
    return this;
  };
  this.NUMBER = this.createNativeFunction(wrapper);
  this.setProperty(scope, 'Number', this.NUMBER);

  var numConsts = ['MAX_VALUE', 'MIN_VALUE', 'NaN', 'NEGATIVE_INFINITY', 'POSITIVE_INFINITY'];
  for (var i = 0; i < numConsts.length; i++) {
    this.setProperty(this.NUMBER, numConsts[i], this.createPrimitive(Number[numConsts[i]]));
  }

  // Static methods on Number.
  wrapper = function wrapper(str) {
    str = str || thisInterpreter.UNDEFINED;
    return thisInterpreter.createPrimitive(parseFloat(str.toString()));
  };
  this.setProperty(this.NUMBER, 'parseFloat', this.createNativeFunction(wrapper));

  wrapper = function wrapper(str, radix) {
    str = str || thisInterpreter.UNDEFINED;
    radix = radix || thisInterpreter.UNDEFINED;
    return thisInterpreter.createPrimitive(parseInt(str.toString(), radix.toNumber()));
  };
  this.setProperty(this.NUMBER, 'parseInt', this.createNativeFunction(wrapper));

  // Instance methods on Number.
  wrapper = function wrapper(fractionDigits) {
    fractionDigits = fractionDigits ? fractionDigits.toNumber() : undefined;
    var n = this.toNumber();
    return thisInterpreter.createPrimitive(n.toExponential(fractionDigits));
  };
  this.setNativeFunctionPrototype(this.NUMBER, 'toExponential', wrapper);

  wrapper = function wrapper(digits) {
    digits = digits ? digits.toNumber() : undefined;
    var n = this.toNumber();
    return thisInterpreter.createPrimitive(n.toFixed(digits));
  };
  this.setNativeFunctionPrototype(this.NUMBER, 'toFixed', wrapper);

  wrapper = function wrapper(precision) {
    precision = precision ? precision.toNumber() : undefined;
    var n = this.toNumber();
    return thisInterpreter.createPrimitive(n.toPrecision(precision));
  };
  this.setNativeFunctionPrototype(this.NUMBER, 'toPrecision', wrapper);

  wrapper = function wrapper(radix) {
    radix = radix ? radix.toNumber() : 10;
    var n = this.toNumber();
    return thisInterpreter.createPrimitive(n.toString(radix));
  };
  this.setNativeFunctionPrototype(this.NUMBER, 'toString', wrapper);

  wrapper = function wrapper(locales, options) {
    locales = locales ? thisInterpreter.pseudoToNative(locales) : undefined;
    options = options ? thisInterpreter.pseudoToNative(options) : undefined;
    return thisInterpreter.createPrimitive(this.toNumber().toLocaleString(locales, options));
  };
  this.setNativeFunctionPrototype(this.NUMBER, 'toLocaleString', wrapper);
};

/**
 * Initialize the String class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initString = function (scope) {
  var thisInterpreter = this;
  var wrapper;
  // String constructor.
  wrapper = function wrapper(value) {
    value = value ? value.toString() : '';
    if (this.parent != thisInterpreter.STRING) {
      // Called as String().
      return thisInterpreter.createPrimitive(value);
    }
    // Called as new String().
    this.data = value;
    return this;
  };
  this.STRING = this.createNativeFunction(wrapper);
  this.setProperty(scope, 'String', this.STRING);

  // Static methods on String.
  wrapper = function wrapper(var_args) {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i] = arguments[i].toNumber();
    }
    return thisInterpreter.createPrimitive(String.fromCharCode.apply(String, arguments));
  };
  this.setProperty(this.STRING, 'fromCharCode', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  // Instance methods on String.
  // Methods with no arguments.
  var functions = ['toLowerCase', 'toUpperCase', 'toLocaleLowerCase', 'toLocaleUpperCase'];
  for (var i = 0; i < functions.length; i++) {
    wrapper = function (nativeFunc) {
      return function () {
        return thisInterpreter.createPrimitive(nativeFunc.apply(this));
      };
    }(String.prototype[functions[i]]);
    this.setNativeFunctionPrototype(this.STRING, functions[i], wrapper);
  }

  // Trim function may not exist in host browser.  Write them from scratch.
  wrapper = function wrapper() {
    var str = this.toString();
    return thisInterpreter.createPrimitive(str.replace(/^\s+|\s+$/g, ''));
  };
  this.setNativeFunctionPrototype(this.STRING, 'trim', wrapper);
  wrapper = function wrapper() {
    var str = this.toString();
    return thisInterpreter.createPrimitive(str.replace(/^\s+/g, ''));
  };
  this.setNativeFunctionPrototype(this.STRING, 'trimLeft', wrapper);
  wrapper = function wrapper() {
    var str = this.toString();
    return thisInterpreter.createPrimitive(str.replace(/\s+$/g, ''));
  };
  this.setNativeFunctionPrototype(this.STRING, 'trimRight', wrapper);

  // Methods with only numeric arguments.
  functions = ['charAt', 'charCodeAt', 'substring', 'slice', 'substr'];
  for (var i = 0; i < functions.length; i++) {
    wrapper = function (nativeFunc) {
      return function () {
        for (var j = 0; j < arguments.length; j++) {
          arguments[j] = arguments[j].toNumber();
        }
        return thisInterpreter.createPrimitive(nativeFunc.apply(this, arguments));
      };
    }(String.prototype[functions[i]]);
    this.setNativeFunctionPrototype(this.STRING, functions[i], wrapper);
  }

  wrapper = function wrapper(searchValue, fromIndex) {
    var str = this.toString();
    searchValue = (searchValue || thisInterpreter.UNDEFINED).toString();
    fromIndex = fromIndex ? fromIndex.toNumber() : undefined;
    return thisInterpreter.createPrimitive(str.indexOf(searchValue, fromIndex));
  };
  this.setNativeFunctionPrototype(this.STRING, 'indexOf', wrapper);

  wrapper = function wrapper(searchValue, fromIndex) {
    var str = this.toString();
    searchValue = (searchValue || thisInterpreter.UNDEFINED).toString();
    fromIndex = fromIndex ? fromIndex.toNumber() : undefined;
    return thisInterpreter.createPrimitive(str.lastIndexOf(searchValue, fromIndex));
  };
  this.setNativeFunctionPrototype(this.STRING, 'lastIndexOf', wrapper);

  wrapper = function wrapper(compareString, locales, options) {
    compareString = (compareString || thisInterpreter.UNDEFINED).toString();
    locales = locales ? thisInterpreter.pseudoToNative(locales) : undefined;
    options = options ? thisInterpreter.pseudoToNative(options) : undefined;
    return thisInterpreter.createPrimitive(this.toString().localeCompare(compareString, locales, options));
  };
  this.setNativeFunctionPrototype(this.STRING, 'localeCompare', wrapper);

  wrapper = function wrapper(separator, limit) {
    var str = this.toString();
    if (separator) {
      separator = thisInterpreter.isa(separator, thisInterpreter.REGEXP) ? separator.data : separator.toString();
    } else {
      // is this really necessary?
      separator = undefined;
    }
    limit = limit ? limit.toNumber() : undefined;
    var jsList = str.split(separator, limit);
    var pseudoList = thisInterpreter.createObject(thisInterpreter.ARRAY);
    for (var i = 0; i < jsList.length; i++) {
      thisInterpreter.setProperty(pseudoList, i, thisInterpreter.createPrimitive(jsList[i]));
    }
    return pseudoList;
  };
  this.setNativeFunctionPrototype(this.STRING, 'split', wrapper);

  wrapper = function wrapper(var_args) {
    var str = this.toString();
    for (var i = 0; i < arguments.length; i++) {
      str += arguments[i].toString();
    }
    return thisInterpreter.createPrimitive(str);
  };
  this.setNativeFunctionPrototype(this.STRING, 'concat', wrapper);

  wrapper = function wrapper(regexp) {
    var str = this.toString();
    regexp = regexp ? regexp.data : undefined;
    var match = str.match(regexp);
    if (match === null) {
      return thisInterpreter.NULL;
    }
    var pseudoList = thisInterpreter.createObject(thisInterpreter.ARRAY);
    for (var i = 0; i < match.length; i++) {
      thisInterpreter.setProperty(pseudoList, i, thisInterpreter.createPrimitive(match[i]));
    }
    return pseudoList;
  };
  this.setNativeFunctionPrototype(this.STRING, 'match', wrapper);

  wrapper = function wrapper(regexp) {
    var str = this.toString();
    regexp = regexp ? regexp.data : undefined;
    return thisInterpreter.createPrimitive(str.search(regexp));
  };
  this.setNativeFunctionPrototype(this.STRING, 'search', wrapper);

  wrapper = function wrapper(substr, newSubStr) {
    var str = this.toString();
    substr = (substr || thisInterpreter.UNDEFINED).valueOf();
    newSubStr = (newSubStr || thisInterpreter.UNDEFINED).toString();
    return thisInterpreter.createPrimitive(str.replace(substr, newSubStr));
  };
  this.setNativeFunctionPrototype(this.STRING, 'replace', wrapper);
};

/**
 * Initialize the Boolean class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initBoolean = function (scope) {
  var thisInterpreter = this;
  var wrapper;
  // Boolean constructor.
  wrapper = function wrapper(value) {
    value = value ? value.toBoolean() : false;
    if (this.parent != thisInterpreter.BOOLEAN) {
      // Called as Boolean().
      return thisInterpreter.createPrimitive(value);
    }
    // Called as new Boolean().
    this.data = value;
    return this;
  };
  this.BOOLEAN = this.createNativeFunction(wrapper);
  this.setProperty(scope, 'Boolean', this.BOOLEAN);
};

/**
 * Initialize the Date class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initDate = function (scope) {
  var thisInterpreter = this;
  var wrapper;
  // Date constructor.
  wrapper = function wrapper(a, b, c, d, e, f, h) {
    if (this.parent == thisInterpreter.DATE) {
      // Called with new.
      var newDate = this;
    } else {
      // Calling Date() as a function returns a string, no arguments are heeded.
      return thisInterpreter.createPrimitive(Date());
    }
    if (!arguments.length) {
      newDate.data = new Date();
    } else if (arguments.length == 1 && (a.type == 'string' || thisInterpreter.isa(a, thisInterpreter.STRING))) {
      newDate.data = new Date(a.toString());
    } else {
      var args = [null];
      for (var i = 0; i < arguments.length; i++) {
        args[i + 1] = arguments[i] ? arguments[i].toNumber() : undefined;
      }
      newDate.data = new (Function.prototype.bind.apply(Date, args))();
    }
    return newDate;
  };
  this.DATE = this.createNativeFunction(wrapper);
  this.setProperty(scope, 'Date', this.DATE);

  // Static methods on Date.
  wrapper = function wrapper() {
    return thisInterpreter.createPrimitive(new Date().getTime());
  };
  this.setProperty(this.DATE, 'now', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(dateString) {
    dateString = dateString ? dateString.toString() : undefined;
    return thisInterpreter.createPrimitive(Date.parse(dateString));
  };
  this.setProperty(this.DATE, 'parse', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(a, b, c, d, e, f, h) {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i] ? arguments[i].toNumber() : undefined;
    }
    return thisInterpreter.createPrimitive(Date.UTC.apply(Date, args));
  };
  this.setProperty(this.DATE, 'UTC', this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);

  // Instance methods on Date.
  var functions = ['getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getTimezoneOffset', 'getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'getYear', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear', 'toDateString', 'toISOString', 'toJSON', 'toGMTString', 'toLocaleDateString', 'toLocaleString', 'toLocaleTimeString', 'toTimeString', 'toUTCString'];
  for (var i = 0; i < functions.length; i++) {
    wrapper = function (nativeFunc) {
      return function (var_args) {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args[i] = thisInterpreter.pseudoToNative(arguments[i]);
        }
        return thisInterpreter.createPrimitive(this.data[nativeFunc].apply(this.data, args));
      };
    }(functions[i]);
    this.setNativeFunctionPrototype(this.DATE, functions[i], wrapper);
  }
};

/**
 * Initialize Math object.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initMath = function (scope) {
  var thisInterpreter = this;
  var myMath = this.createObject(this.OBJECT);
  this.setProperty(scope, 'Math', myMath);
  var mathConsts = ['E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'PI', 'SQRT1_2', 'SQRT2'];
  for (var i = 0; i < mathConsts.length; i++) {
    this.setProperty(myMath, mathConsts[i], this.createPrimitive(Math[mathConsts[i]]), Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  }
  var numFunctions = ['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'random', 'round', 'sin', 'sqrt', 'tan'];
  for (var i = 0; i < numFunctions.length; i++) {
    var wrapper = function (nativeFunc) {
      return function () {
        for (var j = 0; j < arguments.length; j++) {
          arguments[j] = arguments[j].toNumber();
        }
        return thisInterpreter.createPrimitive(nativeFunc.apply(Math, arguments));
      };
    }(Math[numFunctions[i]]);
    this.setProperty(myMath, numFunctions[i], this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);
  }
};

/**
 * Initialize Regular Expression object.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initRegExp = function (scope) {
  var thisInterpreter = this;
  var wrapper;
  // Regex constructor.
  wrapper = function wrapper(pattern, flags) {
    if (this.parent == thisInterpreter.REGEXP) {
      // Called with new.
      var rgx = this;
    } else {
      var rgx = thisInterpreter.createObject(thisInterpreter.REGEXP);
    }
    pattern = pattern ? pattern.toString() : '';
    flags = flags ? flags.toString() : '';
    return thisInterpreter.populateRegExp_(rgx, new RegExp(pattern, flags));
  };
  this.REGEXP = this.createNativeFunction(wrapper);
  this.setProperty(scope, 'RegExp', this.REGEXP);

  this.setProperty(this.REGEXP.properties.prototype, 'global', this.UNDEFINED, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.REGEXP.properties.prototype, 'ignoreCase', this.UNDEFINED, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.REGEXP.properties.prototype, 'multiline', this.UNDEFINED, Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.REGEXP.properties.prototype, 'source', this.createPrimitive('(?:)'), Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);

  wrapper = function wrapper(str) {
    str = str.toString();
    return thisInterpreter.createPrimitive(this.data.test(str));
  };
  this.setNativeFunctionPrototype(this.REGEXP, 'test', wrapper);

  wrapper = function wrapper(str) {
    str = str.toString();
    // Get lastIndex from wrapped regex, since this is settable.
    this.data.lastIndex = thisInterpreter.getProperty(this, 'lastIndex').toNumber();
    var match = this.data.exec(str);
    thisInterpreter.setProperty(this, 'lastIndex', thisInterpreter.createPrimitive(this.data.lastIndex));

    if (match) {
      var result = thisInterpreter.createObject(thisInterpreter.ARRAY);
      for (var i = 0; i < match.length; i++) {
        thisInterpreter.setProperty(result, i, thisInterpreter.createPrimitive(match[i]));
      }
      // match has additional properties.
      thisInterpreter.setProperty(result, 'index', thisInterpreter.createPrimitive(match.index));
      thisInterpreter.setProperty(result, 'input', thisInterpreter.createPrimitive(match.input));
      return result;
    }
    return thisInterpreter.NULL;
  };
  this.setNativeFunctionPrototype(this.REGEXP, 'exec', wrapper);
};

/**
 * Initialize JSON object.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initJSON = function (scope) {
  var thisInterpreter = this;
  var myJSON = thisInterpreter.createObject(this.OBJECT);
  this.setProperty(scope, 'JSON', myJSON);

  var wrapper = function wrapper(text) {
    try {
      var nativeObj = JSON.parse(text.toString());
    } catch (e) {
      thisInterpreter.throwException(thisInterpreter.SYNTAX_ERROR, e.message);
      return;
    }
    return thisInterpreter.nativeToPseudo(nativeObj);
  };
  this.setProperty(myJSON, 'parse', this.createNativeFunction(wrapper));

  wrapper = function wrapper(value) {
    var nativeObj = thisInterpreter.pseudoToNative(value);
    return thisInterpreter.createPrimitive(JSON.stringify(nativeObj));
  };
  this.setProperty(myJSON, 'stringify', this.createNativeFunction(wrapper));
};

/**
 * Initialize the Error class.
 * @param {!Interpreter.Object} scope Global scope.
 */
Interpreter.prototype.initError = function (scope) {
  var thisInterpreter = this;
  // Error constructor.
  this.ERROR = this.createNativeFunction(function (opt_message) {
    if (this.parent == thisInterpreter.ERROR) {
      // Called with new.
      var newError = this;
    } else {
      var newError = thisInterpreter.createObject(thisInterpreter.ERROR);
    }
    if (opt_message) {
      thisInterpreter.setProperty(newError, 'message', thisInterpreter.createPrimitive(String(opt_message)), Interpreter.NONENUMERABLE_DESCRIPTOR);
    }
    return newError;
  });
  this.setProperty(scope, 'Error', this.ERROR);
  this.setProperty(this.ERROR.properties.prototype, 'message', this.STRING_EMPTY, Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.setProperty(this.ERROR.properties.prototype, 'name', this.createPrimitive('Error'), Interpreter.NONENUMERABLE_DESCRIPTOR);

  var createErrorSubclass = function createErrorSubclass(name) {
    var constructor = thisInterpreter.createNativeFunction(function (opt_message) {
      if (thisInterpreter.isa(this.parent, thisInterpreter.ERROR)) {
        // Called with new.
        var newError = this;
      } else {
        var newError = thisInterpreter.createObject(constructor);
      }
      if (opt_message) {
        thisInterpreter.setProperty(newError, 'message', thisInterpreter.createPrimitive(String(opt_message)), Interpreter.NONENUMERABLE_DESCRIPTOR);
      }
      return newError;
    });
    thisInterpreter.setProperty(constructor, 'prototype', thisInterpreter.createObject(thisInterpreter.ERROR));
    thisInterpreter.setProperty(constructor.properties.prototype, 'name', thisInterpreter.createPrimitive(name), Interpreter.NONENUMERABLE_DESCRIPTOR);
    thisInterpreter.setProperty(scope, name, constructor);

    return constructor;
  };

  this.EVAL_ERROR = createErrorSubclass('EvalError');
  this.RANGE_ERROR = createErrorSubclass('RangeError');
  this.REFERENCE_ERROR = createErrorSubclass('ReferenceError');
  this.SYNTAX_ERROR = createErrorSubclass('SyntaxError');
  this.TYPE_ERROR = createErrorSubclass('TypeError');
  this.URI_ERROR = createErrorSubclass('URIError');
};

/**
 * Is an object of a certain class?
 * @param {Object} child Object to check.
 * @param {Object} parent Constructor of object.
 * @return {boolean} True if object is the class or inherits from it.
 *     False otherwise.
 */
Interpreter.prototype.isa = function (child, parent) {
  if (!child || !parent) {
    return false;
  }
  while (child.parent != parent) {
    if (!child.parent || !child.parent.properties.prototype) {
      return false;
    }
    child = child.parent.properties.prototype;
  }
  return true;
};

/**
 * Compares two objects against each other.
 * @param {!Object} a First object.
 * @param {!Object} b Second object.
 * @return {number} -1 if a is smaller, 0 if a == b, 1 if a is bigger,
 *     NaN if they are not comparable.
 */
Interpreter.prototype.comp = function (a, b) {
  if (a.isPrimitive && typeof a.data == 'number' && isNaN(a.data) || b.isPrimitive && typeof b.data == 'number' && isNaN(b.data)) {
    // NaN is not comparable to anything, including itself.
    return NaN;
  }
  if (a === b) {
    return 0;
  }
  var aValue = a.isPrimitive ? a.data : a.toString();
  var bValue = b.isPrimitive ? b.data : b.toString();
  if (aValue < bValue) {
    return -1;
  } else if (aValue > bValue) {
    return 1;
  } else if (!a.isPrimitive && !b.isPrimitive) {
    // Two objects that have equal values are still not equal.
    // e.g. [1, 2] != [1, 2]
    return NaN;
  } else if (aValue == bValue) {
    return 0;
  }
  return NaN;
};

/**
 * Is a value a legal integer for an array?
 * @param {*} n Value to check.
 * @return {number} Zero, or a positive integer if the value can be
 *     converted to such.  NaN otherwise.
 */
Interpreter.prototype.arrayIndex = function (n) {
  n = Number(n);
  if (!isFinite(n) || n != Math.floor(n) || n < 0) {
    return NaN;
  }
  return n;
};

/**
 * Class for a number, string, boolean, null, or undefined.
 * @param {number|string|boolean|null|undefined} data Primitive value.
 * @param {!Interpreter} interpreter The JS Interpreter to bind to.
 * @constructor
 */
Interpreter.Primitive = function (data, interpreter) {
  var type = typeof data === 'undefined' ? 'undefined' : _typeof(data);
  this.data = data;
  this.type = type;
  if (type == 'number') {
    this.parent = interpreter.NUMBER;
  } else if (type == 'string') {
    this.parent = interpreter.STRING;
  } else if (type == 'boolean') {
    this.parent = interpreter.BOOLEAN;
  }
};

/**
 * @type {number|string|boolean|null|undefined}
 */
Interpreter.Primitive.prototype.data = undefined;

/**
 * @type {string}
 */
Interpreter.Primitive.prototype.type = 'undefined';

/**
 * @type {Function}
 */
Interpreter.Primitive.prototype.parent = null;

/**
 * @type {boolean}
 */
Interpreter.Primitive.prototype.isPrimitive = true;

/**
 * Convert this primitive into a boolean.
 * @return {boolean} Boolean value.
 */
Interpreter.Primitive.prototype.toBoolean = function () {
  return Boolean(this.data);
};

/**
 * Convert this primitive into a number.
 * @return {number} Number value.
 */
Interpreter.Primitive.prototype.toNumber = function () {
  return Number(this.data);
};

/**
 * Convert this primitive into a string.
 * @return {string} String value.
 * @override
 */
Interpreter.Primitive.prototype.toString = function () {
  return String(this.data);
};

/**
 * Return the primitive value.
 * @return {number|string|boolean|null|undefined} Primitive value.
 * @override
 */
Interpreter.Primitive.prototype.valueOf = function () {
  return this.data;
};

/**
 * Create a new data object for a primitive.
 * @param {number|string|boolean|null|undefined|RegExp} data Data to
 *     encapsulate.
 * @return {!Interpreter.Primitive|!Interpreter.Object} New data object.
 */
Interpreter.prototype.createPrimitive = function (data) {
  // Reuse a predefined primitive constant if possible.
  if (data === undefined) {
    return this.UNDEFINED;
  } else if (data === null) {
    return this.NULL;
  } else if (data === true) {
    return this.TRUE;
  } else if (data === false) {
    return this.FALSE;
  } else if (data === 0) {
    return this.NUMBER_ZERO;
  } else if (data === 1) {
    return this.NUMBER_ONE;
  } else if (data === '') {
    return this.STRING_EMPTY;
  } else if (data instanceof RegExp) {
    return this.populateRegExp_(this.createObject(this.REGEXP), data);
  }
  return new Interpreter.Primitive(data, this);
};

/**
 * Class for an object.
 * @param {Interpreter.Object} parent Parent constructor function.
 * @constructor
 */
Interpreter.Object = function (parent) {
  this.notConfigurable = Object.create(null);
  this.notEnumerable = Object.create(null);
  this.notWritable = Object.create(null);
  this.getter = Object.create(null);
  this.setter = Object.create(null);
  this.properties = Object.create(null);
  this.parent = parent;
};

/**
 * @type {string}
 */
Interpreter.Object.prototype.type = 'object';

/**
 * @type {Interpreter.Object}
 */
Interpreter.Object.prototype.parent = null;

/**
 * @type {boolean}
 */
Interpreter.Object.prototype.isPrimitive = false;

/**
 * @type {number|string|boolean|undefined|!RegExp}
 */
Interpreter.Object.prototype.data = undefined;

/**
 * Convert this object into a boolean.
 * @return {boolean} Boolean value.
 */
Interpreter.Object.prototype.toBoolean = function () {
  return true;
};

/**
 * Convert this object into a number.
 * @return {number} Number value.
 */
Interpreter.Object.prototype.toNumber = function () {
  return Number(this.data === undefined ? this.toString() : this.data);
};

/**
 * Convert this object into a string.
 * @return {string} String value.
 * @override
 */
Interpreter.Object.prototype.toString = function () {
  return this.data === undefined ? '[' + this.type + ']' : String(this.data);
};

/**
 * Return the object value.
 * @return {*} Value.
 * @override
 */
Interpreter.Object.prototype.valueOf = function () {
  return this.data === undefined ? this : this.data;
};

/**
 * Create a new data object.
 * @param {Interpreter.Object} parent Parent constructor function.
 * @return {!Interpreter.Object} New data object.
 */
Interpreter.prototype.createObject = function (parent) {
  var obj = new Interpreter.Object(parent);
  // Functions have prototype objects.
  if (this.isa(obj, this.FUNCTION)) {
    obj.type = 'function';
    this.setProperty(obj, 'prototype', this.createObject(this.OBJECT || null));
  }
  // Arrays have length.
  if (this.isa(obj, this.ARRAY)) {
    obj.length = 0;
    obj.toString = function () {
      var strs = [];
      for (var i = 0; i < this.length; i++) {
        var value = this.properties[i];
        strs[i] = !value || value.isPrimitive && (value.data === null || value.data === undefined) ? '' : value.toString();
      }
      return strs.join(',');
    };
  }
  // Errors have a custom toString method.
  if (this.isa(obj, this.ERROR)) {
    var thisInterpreter = this;
    obj.toString = function () {
      var name = thisInterpreter.getProperty(this, 'name').toString();
      var message = thisInterpreter.getProperty(this, 'message').toString();
      return message ? name + ': ' + message : name;
    };
  }
  return obj;
};

/**
 * Initialize a pseudo regular expression object based on a native regular
 * expression object.
 * @param {!Interpreter.Object} pseudoRegexp The existing object to set.
 * @param {!RegExp} nativeRegexp The native regular expression.
 * @return {!Interpreter.Object} Newly populated regular expression object.
 * @private
 */
Interpreter.prototype.populateRegExp_ = function (pseudoRegexp, nativeRegexp) {
  pseudoRegexp.data = nativeRegexp;
  // lastIndex is settable, all others are read-only attributes
  this.setProperty(pseudoRegexp, 'lastIndex', this.createPrimitive(nativeRegexp.lastIndex), Interpreter.NONENUMERABLE_DESCRIPTOR);
  this.setProperty(pseudoRegexp, 'source', this.createPrimitive(nativeRegexp.source), Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(pseudoRegexp, 'global', this.createPrimitive(nativeRegexp.global), Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(pseudoRegexp, 'ignoreCase', this.createPrimitive(nativeRegexp.ignoreCase), Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  this.setProperty(pseudoRegexp, 'multiline', this.createPrimitive(nativeRegexp.multiline), Interpreter.READONLY_NONENUMERABLE_DESCRIPTOR);
  // Override a couple of Object's conversion functions.
  pseudoRegexp.toString = function () {
    return String(this.data);
  };
  pseudoRegexp.valueOf = function () {
    return this.data;
  };
  return pseudoRegexp;
};

/**
 * Create a new function.
 * @param {!Object} node AST node defining the function.
 * @param {!Object} scope Parent scope.
 * @return {!Interpreter.Object} New function.
 */
Interpreter.prototype.createFunction = function (node, scope) {
  var func = this.createObject(this.FUNCTION);
  func.parentScope = scope;
  func.node = node;
  this.setProperty(func, 'length', this.createPrimitive(func.node.params.length), Interpreter.READONLY_DESCRIPTOR);
  return func;
};

/**
 * Create a new native function.
 * @param {!Function} nativeFunc JavaScript function.
 * @return {!Interpreter.Object} New function.
 */
Interpreter.prototype.createNativeFunction = function (nativeFunc) {
  var func = this.createObject(this.FUNCTION);
  func.nativeFunc = nativeFunc;
  this.setProperty(func, 'length', this.createPrimitive(nativeFunc.length), Interpreter.READONLY_DESCRIPTOR);
  return func;
};

/**
 * Create a new native asynchronous function.
 * @param {!Function} asyncFunc JavaScript function.
 * @return {!Interpreter.Object} New function.
 */
Interpreter.prototype.createAsyncFunction = function (asyncFunc) {
  var func = this.createObject(this.FUNCTION);
  func.asyncFunc = asyncFunc;
  this.setProperty(func, 'length', this.createPrimitive(asyncFunc.length), Interpreter.READONLY_DESCRIPTOR);
  return func;
};

/**
 * Converts from a native JS object or value to a JS interpreter object.
 * Can handle JSON-style values.
 * @param {*} nativeObj The native JS object to be converted.
 * @return {!Interpreter.Object|!Interpreter.Primitive} The equivalent
 *     JS interpreter object.
 */
Interpreter.prototype.nativeToPseudo = function (nativeObj) {
  if (typeof nativeObj == 'boolean' || typeof nativeObj == 'number' || typeof nativeObj == 'string' || nativeObj === null || nativeObj === undefined || nativeObj instanceof RegExp) {
    return this.createPrimitive(nativeObj);
  }

  if (nativeObj instanceof Function) {
    var interpreter = this;
    var wrapper = function wrapper() {
      return interpreter.nativeToPseudo(nativeObj.apply(interpreter, Array.prototype.slice.call(arguments).map(function (i) {
        return interpreter.pseudoToNative(i);
      })));
    };
    return this.createNativeFunction(wrapper);
  }

  var pseudoObj;
  if (nativeObj instanceof Array) {
    // Array.
    pseudoObj = this.createObject(this.ARRAY);
    for (var i = 0; i < nativeObj.length; i++) {
      this.setProperty(pseudoObj, i, this.nativeToPseudo(nativeObj[i]));
    }
  } else {
    // Object.
    pseudoObj = this.createObject(this.OBJECT);
    for (var key in nativeObj) {
      this.setProperty(pseudoObj, key, this.nativeToPseudo(nativeObj[key]));
    }
  }
  return pseudoObj;
};

/**
 * Converts from a JS interpreter object to native JS object.
 * Can handle JSON-style values.
 * @param {!Interpreter.Object|!Interpreter.Primitive} pseudoObj The JS
 *     interpreter object to be converted.
 * @return {*} The equivalent native JS object or value.
 */
Interpreter.prototype.pseudoToNative = function (pseudoObj) {
  if (pseudoObj.isPrimitive || this.isa(pseudoObj, this.NUMBER) || this.isa(pseudoObj, this.STRING) || this.isa(pseudoObj, this.BOOLEAN)) {
    return pseudoObj.data;
  }
  var nativeObj;
  if (this.isa(pseudoObj, this.ARRAY)) {
    // Array.
    nativeObj = [];
    for (var i = 0; i < pseudoObj.length; i++) {
      nativeObj[i] = this.pseudoToNative(pseudoObj.properties[i]);
    }
  } else {
    // Object.
    nativeObj = {};
    for (var key in pseudoObj.properties) {
      nativeObj[key] = this.pseudoToNative(pseudoObj.properties[key]);
    }
  }
  return nativeObj;
};

/**
 * Fetch a property value from a data object.
 * @param {!Interpreter.Object|!Interpreter.Primitive} obj Data object.
 * @param {*} name Name of property.
 * @return {!Interpreter.Object|!Interpreter.Primitive|null} Property value
 *     (may be UNDEFINED), or null if an error was thrown and will be caught.
 */
Interpreter.prototype.getProperty = function (obj, name) {
  name = name.toString();
  if (obj == this.UNDEFINED || obj == this.NULL) {
    this.throwException(this.TYPE_ERROR, "Cannot read property '" + name + "' of " + obj);
    return null;
  }
  // Special cases for magic length property.
  if (this.isa(obj, this.STRING)) {
    if (name == 'length') {
      return this.createPrimitive(obj.data.length);
    }
    var n = this.arrayIndex(name);
    if (!isNaN(n) && n < obj.data.length) {
      return this.createPrimitive(obj.data[n]);
    }
  } else if (this.isa(obj, this.ARRAY) && name == 'length') {
    return this.createPrimitive(obj.length);
  }
  while (true) {
    if (obj.properties && name in obj.properties) {
      var getter = obj.getter[name];
      if (getter) {
        // Flag this function as being a getter and thus needing immediate
        // execution (rather than being the value of the property).
        getter.isGetter = true;
        return getter;
      }
      return obj.properties[name];
    }
    if (obj.parent && obj.parent.properties && obj.parent.properties.prototype) {
      obj = obj.parent.properties.prototype;
    } else {
      // No parent, reached the top.
      break;
    }
  }
  return this.UNDEFINED;
};

/**
 * Does the named property exist on a data object.
 * @param {!Interpreter.Object|!Interpreter.Primitive} obj Data object.
 * @param {*} name Name of property.
 * @return {boolean} True if property exists.
 */
Interpreter.prototype.hasProperty = function (obj, name) {
  name = name.toString();
  if (obj.isPrimitive) {
    throw TypeError('Primitive data type has no properties');
  }
  if (name == 'length' && (this.isa(obj, this.STRING) || this.isa(obj, this.ARRAY))) {
    return true;
  }
  if (this.isa(obj, this.STRING)) {
    var n = this.arrayIndex(name);
    if (!isNaN(n) && n < obj.data.length) {
      return true;
    }
  }
  while (true) {
    if (obj.properties && name in obj.properties) {
      return true;
    }
    if (obj.parent && obj.parent.properties && obj.parent.properties.prototype) {
      obj = obj.parent.properties.prototype;
    } else {
      // No parent, reached the top.
      break;
    }
  }
  return false;
};

/**
 * Set a property value on a data object.
 * @param {!Interpreter.Object} obj Data object.
 * @param {*} name Name of property.
 * @param {Interpreter.Object|Interpreter.Primitive} value
 *     New property value or null if getter/setter is described.
 * @param {Object=} opt_descriptor Optional descriptor object.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */
Interpreter.prototype.setProperty = function (obj, name, value, opt_descriptor) {
  name = name.toString();
  if (opt_descriptor && obj.notConfigurable[name]) {
    this.throwException(this.TYPE_ERROR, 'Cannot redefine property: ' + name);
  }
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) != 'object') {
    throw Error('Failure to wrap a value: ' + value);
  }
  if (obj == this.UNDEFINED || obj == this.NULL) {
    this.throwException(this.TYPE_ERROR, "Cannot set property '" + name + "' of " + obj);
  }
  if (opt_descriptor && (opt_descriptor.get || opt_descriptor.set) && (value || opt_descriptor.writable !== undefined)) {
    this.throwException(this.TYPE_ERROR, 'Invalid property descriptor. ' + 'Cannot both specify accessors and a value or writable attribute');
  }
  var strict = !this.stateStack || this.getScope().strict;
  if (obj.isPrimitive) {
    if (strict) {
      this.throwException(this.TYPE_ERROR, 'Can\'t create property \'' + name + '\' on \'' + obj.data + '\'');
    }
    return;
  }
  if (this.isa(obj, this.STRING)) {
    var n = this.arrayIndex(name);
    if (name == 'length' || !isNaN(n) && n < obj.data.length) {
      // Can't set length or letters on String objects.
      if (strict) {
        this.throwException(this.TYPE_ERROR, 'Cannot assign to read only ' + 'property \'' + name + '\' of String \'' + obj.data + '\'');
      }
      return;
    }
  }
  if (this.isa(obj, this.ARRAY)) {
    // Arrays have a magic length variable that is bound to the elements.
    var i;
    if (name == 'length') {
      // Delete elements if length is smaller.
      var newLength = this.arrayIndex(value.toNumber());
      if (isNaN(newLength)) {
        this.throwException(this.RANGE_ERROR, 'Invalid array length');
      }
      if (newLength < obj.length) {
        for (i in obj.properties) {
          i = this.arrayIndex(i);
          if (!isNaN(i) && newLength <= i) {
            delete obj.properties[i];
          }
        }
      }
      obj.length = newLength;
      return; // Don't set a real length property.
    } else if (!isNaN(i = this.arrayIndex(name))) {
      // Increase length if this index is larger.
      obj.length = Math.max(obj.length, i + 1);
    }
  }
  if (!obj.properties[name] && obj.preventExtensions) {
    if (strict) {
      this.throwException(this.TYPE_ERROR, 'Can\'t add property ' + name + ', object is not extensible');
    }
    return;
  }
  if (opt_descriptor) {
    // Define the property.
    obj.properties[name] = value;
    if (!opt_descriptor.configurable) {
      obj.notConfigurable[name] = true;
    }
    var getter = opt_descriptor.get;
    if (getter) {
      obj.getter[name] = getter;
    } else {
      delete obj.getter[name];
    }
    var setter = opt_descriptor.set;
    if (setter) {
      obj.setter[name] = setter;
    } else {
      delete obj.setter[name];
    }
    var enumerable = opt_descriptor.enumerable || false;
    if (enumerable) {
      delete obj.notEnumerable[name];
    } else {
      obj.notEnumerable[name] = true;
    }
    if (getter || setter) {
      delete obj.notWritable[name];
      obj.properties[name] = this.UNDEFINED;
    } else {
      var writable = opt_descriptor.writable || false;
      if (writable) {
        delete obj.notWritable[name];
      } else {
        obj.notWritable[name] = true;
      }
    }
  } else {
    // Set the property.
    // Determine if there is a setter anywhere in the parent chain.
    var parent = obj;
    while (true) {
      if (parent.setter && parent.setter[name]) {
        return parent.setter[name];
      }
      if (parent.parent && parent.parent.properties && parent.parent.properties.prototype) {
        parent = parent.parent.properties.prototype;
      } else {
        // No parent, reached the top.
        break;
      }
    }
    if (obj.getter && obj.getter[name]) {
      if (strict) {
        this.throwException(this.TYPE_ERROR, 'Cannot set property \'' + name + '\' of object \'' + obj + '\' which only has a getter');
      }
    } else {
      // No setter, simple assignment.
      if (!obj.notWritable[name]) {
        obj.properties[name] = value;
      } else if (strict) {
        this.throwException(this.TYPE_ERROR, 'Cannot assign to read only ' + 'property \'' + name + '\' of object \'' + obj + '\'');
      }
    }
  }
};

/**
 * Convenience method for adding a native function as a non-enumerable property
 * onto an object's prototype.
 * @param {!Interpreter.Object} obj Data object.
 * @param {*} name Name of property.
 * @param {!Function} wrapper Function object.
 */
Interpreter.prototype.setNativeFunctionPrototype = function (obj, name, wrapper) {
  this.setProperty(obj.properties.prototype, name, this.createNativeFunction(wrapper), Interpreter.NONENUMERABLE_DESCRIPTOR);
};

/**
 * Delete a property value on a data object.
 * @param {!Interpreter.Object} obj Data object.
 * @param {*} name Name of property.
 * @return {boolean} True if deleted, false if undeletable.
 */
Interpreter.prototype.deleteProperty = function (obj, name) {
  name = name.toString();
  if (obj.isPrimitive || obj.notWritable[name]) {
    return false;
  }
  if (name == 'length' && this.isa(obj, this.ARRAY)) {
    return false;
  }
  return delete obj.properties[name];
};

/**
 * Returns the current scope from the stateStack.
 * @return {!Interpreter.Object} Current scope dictionary.
 */
Interpreter.prototype.getScope = function () {
  for (var i = this.stateStack.length - 1; i >= 0; i--) {
    if (this.stateStack[i].scope) {
      return this.stateStack[i].scope;
    }
  }
  throw Error('No scope found.');
};

/**
 * Create a new scope dictionary.
 * @param {!Object} node AST node defining the scope container
 *     (e.g. a function).
 * @param {Interpreter.Object} parentScope Scope to link to.
 * @return {!Interpreter.Object} New scope.
 */
Interpreter.prototype.createScope = function (node, parentScope) {
  var scope = this.createObject(null);
  scope.parentScope = parentScope;
  if (!parentScope) {
    this.initGlobalScope(scope);
  }
  this.populateScope_(node, scope);

  // Determine if this scope starts with 'use strict'.
  scope.strict = false;
  if (parentScope && parentScope.strict) {
    scope.strict = true;
  } else {
    var firstNode = node.body && node.body[0];
    if (firstNode && firstNode.expression && firstNode.expression.type == 'Literal' && firstNode.expression.value == 'use strict') {
      scope.strict = true;
    }
  }
  return scope;
};

/**
 * Create a new special scope dictionary. Similar to createScope(), but
 * doesn't assume that the scope is for a function body. This is used for
 * the catch clause and with statement.
 * @param {!Interpreter.Object} parentScope Scope to link to.
 * @param {Interpreter.Object=} opt_scope Optional object to transform into
 *     scope.
 * @return {!Interpreter.Object} New scope.
 */
Interpreter.prototype.createSpecialScope = function (parentScope, opt_scope) {
  if (!parentScope) {
    throw Error('parentScope required');
  }
  var scope = opt_scope || this.createObject(null);
  scope.parentScope = parentScope;
  scope.strict = parentScope.strict;
  return scope;
};

/**
 * Retrieves a value from the scope chain.
 * @param {!Interpreter.Object|!Interpreter.Primitive} name Name of variable.
 * @return {!Interpreter.Object|!Interpreter.Primitive|null} The value
 *     or null if an error was thrown and will be caught.
 */
Interpreter.prototype.getValueFromScope = function (name) {
  var scope = this.getScope();
  var nameStr = name.toString();
  while (scope && scope != this.global) {
    if (nameStr in scope.properties) {
      return scope.properties[nameStr];
    }
    scope = scope.parentScope;
  }
  // The root scope is also an object which has inherited properties and
  // could also have getters.
  if (scope == this.global && this.hasProperty(scope, nameStr)) {
    return this.getProperty(scope, nameStr);
  }
  // Typeof operator is unique: it can safely look at non-defined variables.
  var prevNode = this.stateStack[this.stateStack.length - 1].node;
  if (prevNode.type == 'UnaryExpression' && prevNode.operator == 'typeof') {
    return this.UNDEFINED;
  }
  this.throwException(this.REFERENCE_ERROR, nameStr + ' is not defined');
  return null;
};

/**
 * Sets a value to the current scope.
 * @param {!Interpreter.Object|!Interpreter.Primitive} name Name of variable.
 * @param {!Interpreter.Object|!Interpreter.Primitive} value Value.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */
Interpreter.prototype.setValueToScope = function (name, value) {
  var scope = this.getScope();
  var nameStr = name.toString();
  while (scope && scope != this.global) {
    if (nameStr in scope.properties) {
      scope.properties[nameStr] = value;
      return undefined;
    }
    scope = scope.parentScope;
  }
  // The root scope is also an object which has readonly properties and
  // could also have setters.
  if (scope == this.global && (!scope.strict || this.hasProperty(scope, nameStr))) {
    return this.setProperty(scope, nameStr, value);
  }
  this.throwException(this.REFERENCE_ERROR, nameStr + ' is not defined');
};

/**
 * Create a new scope for the given node.
 * @param {!Object} node AST node (program or function).
 * @param {!Interpreter.Object} scope Scope dictionary to populate.
 * @private
 */
Interpreter.prototype.populateScope_ = function (node, scope) {
  if (node.type == 'VariableDeclaration') {
    for (var i = 0; i < node.declarations.length; i++) {
      this.setProperty(scope, node.declarations[i].id.name, this.UNDEFINED);
    }
  } else if (node.type == 'FunctionDeclaration') {
    this.setProperty(scope, node.id.name, this.createFunction(node, scope));
    return; // Do not recurse into function.
  } else if (node.type == 'FunctionExpression') {
    return; // Do not recurse into function.
  } else if (node.type == 'ExpressionStatement') {
    return; // Expressions can't contain variable/function declarations.
  }
  var nodeClass = node.constructor;
  for (var name in node) {
    var prop = node[name];
    if (prop && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) == 'object') {
      if (prop instanceof Array) {
        for (var i = 0; i < prop.length; i++) {
          if (prop[i] && prop[i].constructor == nodeClass) {
            this.populateScope_(prop[i], scope);
          }
        }
      } else {
        if (prop.constructor == nodeClass) {
          this.populateScope_(prop, scope);
        }
      }
    }
  }
};

/**
 * Remove start and end values from AST, or set start and end values to a
 * constant value.  Used to remove highlighting from polyfills and to set
 * highlighting in an eval to cover the entire eval expression.
 * @param {!Object} node AST node.
 * @param {number=} start Starting character of all nodes, or undefined.
 * @param {number=} end Ending character of all nodes, or undefined.
 * @private
 */
Interpreter.prototype.stripLocations_ = function (node, start, end) {
  if (start) {
    node.start = start;
  } else {
    delete node.start;
  }
  if (end) {
    node.end = end;
  } else {
    delete node.end;
  }
  for (var name in node) {
    if (node.hasOwnProperty(name)) {
      var prop = node[name];
      if (prop && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) == 'object') {
        this.stripLocations_(prop, start, end);
      }
    }
  }
};

/**
 * Gets a value from the scope chain or from an object property.
 * @param {!Interpreter.Object|!Interpreter.Primitive|!Array} left
 *     Name of variable or object/propname tuple.
 * @return {!Interpreter.Object|!Interpreter.Primitive|null} Value
 *     or null if an error was thrown and will be caught.
 */
Interpreter.prototype.getValue = function (left) {
  if (left instanceof Array) {
    var obj = left[0];
    var prop = left[1];
    return this.getProperty(obj, prop);
  } else {
    return this.getValueFromScope(left);
  }
};

/**
 * Sets a value to the scope chain or to an object property.
 * @param {!Interpreter.Object|!Interpreter.Primitive|!Array} left
 *     Name of variable or object/propname tuple.
 * @param {!Interpreter.Object|!Interpreter.Primitive} value Value.
 * @return {!Interpreter.Object|undefined} Returns a setter function if one
 *     needs to be called, otherwise undefined.
 */
Interpreter.prototype.setValue = function (left, value) {
  if (left instanceof Array) {
    var obj = left[0];
    var prop = left[1];
    return this.setProperty(obj, prop, value);
  } else {
    return this.setValueToScope(left, value);
  }
};

/**
 * Throw an exception in the interpreter that can be handled by a
 * interpreter try/catch statement.  If unhandled, a real exception will
 * be thrown.  Can be called with either an error class and a message, or
 * with an actual object to be thrown.
 * @param {!Interpreter.Object} errorClass Type of error (if message is
 *   provided) or the value to throw (if no message).
 * @param {string=} opt_message Message being thrown.
 */
Interpreter.prototype.throwException = function (errorClass, opt_message) {
  if (opt_message === undefined) {
    var error = errorClass; // This is a value to throw, not an error class.
  } else {
    var error = this.createObject(errorClass);
    this.setProperty(error, 'message', this.createPrimitive(opt_message), Interpreter.NONENUMERABLE_DESCRIPTOR);
  }
  this.executeException(error);
};

/**
 * Throw an exception in the interpreter that can be handled by a
 * interpreter try/catch statement.  If unhandled, a real exception will
 * be thrown.
 * @param {!Interpreter.Object} error Error object to execute.
 */
Interpreter.prototype.executeException = function (error) {
  // Search for a try statement.
  do {
    this.stateStack.pop();
    var state = this.stateStack[this.stateStack.length - 1];
    if (state.node.type == 'TryStatement') {
      state.throwValue = error;
      return;
    }
  } while (state && state.node.type != 'Program');

  // Throw a real error.
  var realError;
  if (this.isa(error, this.ERROR)) {
    var errorTable = {
      'EvalError': EvalError,
      'RangeError': RangeError,
      'ReferenceError': ReferenceError,
      'SyntaxError': SyntaxError,
      'TypeError': TypeError,
      'URIError': URIError
    };
    var name = this.getProperty(error, 'name').toString();
    var message = this.getProperty(error, 'message').valueOf();
    var type = errorTable[name] || Error;
    realError = type(message);
  } else {
    realError = error.toString();
  }
  throw realError;
};

/**
 * Push a call to a getter onto the statestack.
 * @param {!Interpreter.Object} func Function to execute.
 * @param {!Interpreter.Object|!Array} left
 *     Name of variable or object/propname tuple.
 * @private
 */
Interpreter.prototype.pushGetter_ = function (func, left) {
  // Normally 'this' will be specified as the object component (o.x).
  // Sometimes 'this' is explicitly provided (o).
  var funcThis = left instanceof Array ? left[0] : left;
  this.stateStack.push({
    node: { type: 'CallExpression' },
    doneCallee_: true,
    funcThis_: funcThis,
    func_: func,
    doneArgs_: true,
    arguments_: []
  });
};

/**
 * Push a call to a setter onto the statestack.
 * @param {!Interpreter.Object} func Function to execute.
 * @param {!Interpreter.Object|!Array} left
 *     Name of variable or object/propname tuple.
 * @param {!Interpreter.Object|Interpreter.Primitive} value Value to set.
 * @private
 */
Interpreter.prototype.pushSetter_ = function (func, left, value) {
  // Normally 'this' will be specified as the object component (o.x).
  // Sometimes 'this' is implicitly the global object (x).
  var funcThis = left instanceof Array ? left[0] : this.global;
  this.stateStack.push({
    node: { type: 'CallExpression' },
    doneCallee_: true,
    funcThis_: funcThis,
    func_: func,
    doneArgs_: true,
    arguments_: [value]
  });
};

/**
 * Take a snapshot from current stateStack. Restore by restoreStateSnapshot
 */
Interpreter.prototype.takeStateSnapshot = function () {
  return copy(this.stateStack);
};

/**
 * Restore a state snapshot
 */
Interpreter.prototype.restoreStateSnapshot = function (snapshot) {
  this.stateStack = copy(snapshot);
};

///////////////////////////////////////////////////////////////////////////////
// Functions to handle each node type.
///////////////////////////////////////////////////////////////////////////////

Interpreter.prototype['stepArrayExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  var n = state.n_ || 0;
  if (!state.array_) {
    state.array_ = this.createObject(this.ARRAY);
  } else if (state.value) {
    this.setProperty(state.array_, n - 1, state.value);
  }
  if (n < node.elements.length) {
    state.n_ = n + 1;
    if (node.elements[n]) {
      this.stateStack.push({ node: node.elements[n] });
    } else {
      // [0, 1, , 3][2] -> undefined
      // Missing elements are not defined, they aren't undefined.
      state.value = undefined;
    }
  } else {
    state.array_.length = state.n_ || 0;
    this.stateStack.pop();
    this.stateStack[this.stateStack.length - 1].value = state.array_;
  }
};

Interpreter.prototype['stepAssignmentExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.doneLeft_) {
    state.doneLeft_ = true;
    this.stateStack.push({ node: node.left, components: true });
    return;
  }
  if (!state.doneRight_) {
    if (!state.leftSide_) {
      state.leftSide_ = state.value;
    }
    if (state.doneGetter_) {
      state.leftValue_ = state.value;
    }
    if (!state.doneGetter_ && node.operator != '=') {
      state.leftValue_ = this.getValue(state.leftSide_);
      if (state.leftValue_.isGetter) {
        // Clear the getter flag and call the getter function.
        state.leftValue_.isGetter = false;
        state.doneGetter_ = true;
        var func = /** @type {!Interpreter.Object} */state.leftValue_;
        this.pushGetter_(func, state.leftSide_);
        return;
      }
    }
    state.doneRight_ = true;
    this.stateStack.push({ node: node.right });
    return;
  }
  if (state.doneSetter_) {
    // Return if setter function.
    // Setter method on property has completed.
    // Ignore its return value, and use the original set value instead.
    this.stateStack.pop();
    this.stateStack[this.stateStack.length - 1].value = state.doneSetter_;
    return;
  }
  var rightSide = state.value;
  var value;
  if (node.operator == '=') {
    value = rightSide;
  } else {
    var rightValue = rightSide;
    var leftNumber = state.leftValue_.toNumber();
    var rightNumber = rightValue.toNumber();
    if (node.operator == '+=') {
      var left, right;
      if (state.leftValue_.type == 'string' || rightValue.type == 'string') {
        left = state.leftValue_.toString();
        right = rightValue.toString();
      } else {
        left = leftNumber;
        right = rightNumber;
      }
      value = left + right;
    } else if (node.operator == '-=') {
      value = leftNumber - rightNumber;
    } else if (node.operator == '*=') {
      value = leftNumber * rightNumber;
    } else if (node.operator == '/=') {
      value = leftNumber / rightNumber;
    } else if (node.operator == '%=') {
      value = leftNumber % rightNumber;
    } else if (node.operator == '<<=') {
      value = leftNumber << rightNumber;
    } else if (node.operator == '>>=') {
      value = leftNumber >> rightNumber;
    } else if (node.operator == '>>>=') {
      value = leftNumber >>> rightNumber;
    } else if (node.operator == '&=') {
      value = leftNumber & rightNumber;
    } else if (node.operator == '^=') {
      value = leftNumber ^ rightNumber;
    } else if (node.operator == '|=') {
      value = leftNumber | rightNumber;
    } else {
      throw SyntaxError('Unknown assignment expression: ' + node.operator);
    }
    value = this.createPrimitive(value);
  }
  var setter = this.setValue(state.leftSide_, value);
  if (setter) {
    state.doneSetter_ = value;
    this.pushSetter_(setter, state.leftSide_, value);
    return;
  }
  // Return if no setter function.
  this.stateStack.pop();
  this.stateStack[this.stateStack.length - 1].value = value;
};

Interpreter.prototype['stepBinaryExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.doneLeft_) {
    state.doneLeft_ = true;
    this.stateStack.push({ node: node.left });
    return;
  }
  if (!state.doneRight_) {
    state.doneRight_ = true;
    state.leftValue_ = state.value;
    this.stateStack.push({ node: node.right });
    return;
  }
  this.stateStack.pop();
  var leftSide = state.leftValue_;
  var rightSide = state.value;
  var value;
  var comp = this.comp(leftSide, rightSide);
  if (node.operator == '==' || node.operator == '!=') {
    if (leftSide.isPrimitive && rightSide.isPrimitive) {
      value = leftSide.data == rightSide.data;
    } else {
      value = comp === 0;
    }
    if (node.operator == '!=') {
      value = !value;
    }
  } else if (node.operator == '===' || node.operator == '!==') {
    if (leftSide.isPrimitive && rightSide.isPrimitive) {
      value = leftSide.data === rightSide.data;
    } else {
      value = leftSide === rightSide;
    }
    if (node.operator == '!==') {
      value = !value;
    }
  } else if (node.operator == '>') {
    value = comp == 1;
  } else if (node.operator == '>=') {
    value = comp == 1 || comp === 0;
  } else if (node.operator == '<') {
    value = comp == -1;
  } else if (node.operator == '<=') {
    value = comp == -1 || comp === 0;
  } else if (node.operator == '+') {
    var leftValue = leftSide.isPrimitive ? leftSide.data : leftSide.toString();
    var rightValue = rightSide.isPrimitive ? rightSide.data : rightSide.toString();
    value = leftValue + rightValue;
  } else if (node.operator == 'in') {
    value = this.hasProperty(rightSide, leftSide);
  } else if (node.operator == 'instanceof') {
    if (!this.isa(rightSide, this.FUNCTION)) {
      this.throwException(this.TYPE_ERROR, 'Expecting a function in instanceof check');
    }
    value = this.isa(leftSide, rightSide);
  } else {
    var leftValue = leftSide.toNumber();
    var rightValue = rightSide.toNumber();
    if (node.operator == '-') {
      value = leftValue - rightValue;
    } else if (node.operator == '*') {
      value = leftValue * rightValue;
    } else if (node.operator == '/') {
      value = leftValue / rightValue;
    } else if (node.operator == '%') {
      value = leftValue % rightValue;
    } else if (node.operator == '&') {
      value = leftValue & rightValue;
    } else if (node.operator == '|') {
      value = leftValue | rightValue;
    } else if (node.operator == '^') {
      value = leftValue ^ rightValue;
    } else if (node.operator == '<<') {
      value = leftValue << rightValue;
    } else if (node.operator == '>>') {
      value = leftValue >> rightValue;
    } else if (node.operator == '>>>') {
      value = leftValue >>> rightValue;
    } else {
      throw SyntaxError('Unknown binary operator: ' + node.operator);
    }
  }
  this.stateStack[this.stateStack.length - 1].value = this.createPrimitive(value);
};

Interpreter.prototype['stepBlockStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  var n = state.n_ || 0;
  if (node.body[n]) {
    state.n_ = n + 1;
    this.stateStack.push({ node: node.body[n] });
  } else {
    this.stateStack.pop();
  }
};

Interpreter.prototype['stepBreakStatement'] = function () {
  var state = this.stateStack.pop();
  var node = state.node;
  var label = null;
  if (node.label) {
    label = node.label.name;
  }
  state = this.stateStack.pop();
  while (state && state.node.type != 'CallExpression' && state.node.type != 'NewExpression') {
    if (label ? label == state.label : state.isLoop || state.isSwitch) {
      return;
    }
    state = this.stateStack.pop();
  }
  // Syntax error, do not allow this error to be trapped.
  throw SyntaxError('Illegal break statement');
};

Interpreter.prototype['stepCallExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.doneCallee_) {
    state.doneCallee_ = true;
    this.stateStack.push({ node: node.callee, components: true });
    return;
  }
  if (!state.func_) {
    // Determine value of the function.
    if (state.value.type == 'function') {
      state.func_ = state.value;
    } else {
      if (state.value.length) {
        state.member_ = state.value[0];
      }
      state.func_ = this.getValue(state.value);
      if (!state.func_) {
        return; // Thrown error, but trapped.
      } else if (state.func_.type != 'function') {
        this.throwException(this.TYPE_ERROR, (state.func_ && state.func_.type) + ' is not a function');
        return;
      }
    }
    // Determine value of 'this' in function.
    if (state.node.type == 'NewExpression') {
      // Constructor, 'this' is new object.
      state.funcThis_ = this.createObject(state.func_);
      state.isConstructor_ = true;
    } else if (state.value.length) {
      // Method function, 'this' is object.
      state.funcThis_ = state.value[0];
    } else {
      // Global function, 'this' is global object (or 'undefined' if strict).
      state.funcThis_ = this.getScope().strict ? this.UNDEFINED : this.global;
    }
    state.arguments_ = [];
    state.n_ = 0;
  }
  if (!state.doneArgs_) {
    if (state.n_ != 0) {
      state.arguments_.push(state.value);
    }
    if (node.arguments[state.n_]) {
      this.stateStack.push({ node: node.arguments[state.n_] });
      state.n_++;
      return;
    }
    state.doneArgs_ = true;
  }
  if (!state.doneExec_) {
    state.doneExec_ = true;
    if (state.func_.node) {
      var scope = this.createScope(state.func_.node.body, state.func_.parentScope);
      // Add all arguments.
      for (var i = 0; i < state.func_.node.params.length; i++) {
        var paramName = this.createPrimitive(state.func_.node.params[i].name);
        var paramValue = state.arguments_.length > i ? state.arguments_[i] : this.UNDEFINED;
        this.setProperty(scope, paramName, paramValue);
      }
      // Build arguments variable.
      var argsList = this.createObject(this.ARRAY);
      for (var i = 0; i < state.arguments_.length; i++) {
        this.setProperty(argsList, this.createPrimitive(i), state.arguments_[i]);
      }
      this.setProperty(scope, 'arguments', argsList);
      var funcState = {
        node: state.func_.node.body,
        scope: scope,
        thisExpression: state.funcThis_
      };
      this.stateStack.push(funcState);
      state.value = this.UNDEFINED; // Default value if no explicit return.
    } else if (state.func_.nativeFunc) {
      state.value = state.func_.nativeFunc.apply(state.funcThis_, state.arguments_);
    } else if (state.func_.asyncFunc) {
      var thisInterpreter = this;
      var callback = function callback(value) {
        state.value = value || thisInterpreter.UNDEFINED;
        thisInterpreter.paused_ = false;
      };
      var argsWithCallback = state.arguments_.concat(callback);
      state.func_.asyncFunc.apply(state.funcThis_, argsWithCallback);
      this.paused_ = true;
      return;
    } else if (state.func_.eval) {
      var code = state.arguments_[0];
      if (!code) {
        // eval()
        state.value = this.UNDEFINED;
      } else if (!code.isPrimitive) {
        // JS does not parse String objects:
        // eval(new String('1 + 1')) -> '1 + 1'
        state.value = code;
      } else {
        var ast = acorn.parse(code.toString(), Interpreter.PARSE_OPTIONS);
        state = {
          node: {
            type: 'EvalProgram_',
            body: ast.body
          }
        };
        this.stripLocations_(state.node, node.start, node.end);
        // Update current scope with definitions in eval().
        var scope = this.getScope();
        this.populateScope_(ast, scope);
        this.stateStack.push(state);
      }
    } else {
      /* A child of a function is a function but is not callable.  For example:
      var F = function() {};
      F.prototype = escape;
      var f = new F();
      f();
      */
      this.throwException(this.TYPE_ERROR, 'function is not a function');
    }
  } else {
    // Execution complete.  Put the return value on the stack.
    this.stateStack.pop();
    if (state.isConstructor_ && state.value.type !== 'object') {
      this.stateStack[this.stateStack.length - 1].value = state.funcThis_;
    } else {
      this.stateStack[this.stateStack.length - 1].value = state.value;
    }
  }
};

Interpreter.prototype['stepCatchClause'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.done_) {
    state.done_ = true;
    var scope;
    if (node.param) {
      scope = this.createSpecialScope(this.getScope());
      // Add the argument.
      var paramName = this.createPrimitive(node.param.name);
      this.setProperty(scope, paramName, state.throwValue);
    }
    this.stateStack.push({ node: node.body, scope: scope });
  } else {
    this.stateStack.pop();
  }
};

Interpreter.prototype['stepConditionalExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var mode = state.mode_ || 0;
  if (mode == 0) {
    state.mode_ = 1;
    this.stateStack.push({ node: state.node.test });
    return;
  }
  if (mode == 1) {
    state.mode_ = 2;
    var value = state.value.toBoolean();
    if (value && state.node.consequent) {
      this.stateStack.push({ node: state.node.consequent });
      return; // Execute 'if' block.
    } else if (!value && state.node.alternate) {
      this.stateStack.push({ node: state.node.alternate });
      return; // Execute 'else' block.
    }
    // eval('1;if(false){2}') -> undefined
    this.value = this.UNDEFINED;
  }
  this.stateStack.pop();
  if (state.node.type == 'ConditionalExpression') {
    this.stateStack[this.stateStack.length - 1].value = state.value;
  }
};

Interpreter.prototype['stepContinueStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var label = null;
  if (state.node.label) {
    label = state.node.label.name;
  }
  while (state && state.node.type != 'CallExpression' && state.node.type != 'NewExpression') {
    if (state.isLoop) {
      if (!label || label == state.label) {
        return;
      }
    }
    this.stateStack.pop();
    state = this.stateStack[this.stateStack.length - 1];
  }
  // Syntax error, do not allow this error to be trapped.
  throw SyntaxError('Illegal continue statement');
};

Interpreter.prototype['stepDoWhileStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  if (state.node.type == 'DoWhileStatement' && state.test === undefined) {
    // First iteration of do/while executes without checking test.
    state.value = this.TRUE;
    state.test_ = true;
  }
  if (!state.test_) {
    state.test_ = true;
    this.stateStack.push({ node: state.node.test });
  } else {
    if (!state.value.toBoolean()) {
      // Done, exit loop.
      this.stateStack.pop();
    } else if (state.node.body) {
      // Execute the body.
      state.test_ = false;
      state.isLoop = true;
      this.stateStack.push({ node: state.node.body });
    }
  }
};

Interpreter.prototype['stepEmptyStatement'] = function () {
  this.stateStack.pop();
};

Interpreter.prototype['stepEvalProgram_'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  var n = state.n_ || 0;
  if (node.body[n]) {
    state.n_ = n + 1;
    this.stateStack.push({ node: node.body[n] });
  } else {
    this.stateStack.pop();
    this.stateStack[this.stateStack.length - 1].value = this.value;
  }
};

Interpreter.prototype['stepExpressionStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  if (!state.done_) {
    state.done_ = true;
    this.stateStack.push({ node: state.node.expression });
  } else {
    this.stateStack.pop();
    // Save this value to interpreter.value for use as a return value if
    // this code is inside an eval function.
    this.value = state.value;
  }
};

Interpreter.prototype['stepForInStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.doneVariable_) {
    state.doneVariable_ = true;
    var left = node.left;
    if (left.type == 'VariableDeclaration') {
      // Inline variable declaration: for (var x in y)
      left = left.declarations[0].id;
    }
    this.stateStack.push({ node: left, components: true });
    return;
  }
  if (!state.doneObject_) {
    state.doneObject_ = true;
    state.variable_ = state.value;
    this.stateStack.push({ node: node.right });
    return;
  }
  if (typeof state.iterator_ == 'undefined') {
    // First iteration.
    state.object_ = state.value;
    state.iterator_ = 0;
  }
  var name = null;
  done: do {
    var i = state.iterator_;
    for (var prop in state.object_.properties) {
      if (state.object_.notEnumerable[prop]) {
        continue;
      }
      if (i == 0) {
        // Found the i'th enumerable property.
        name = prop;
        break done;
      }
      i--;
    }
    state.object_ = state.object_.parent && state.object_.parent.properties.prototype;
    state.iterator_ = 0;
  } while (state.object_);

  if (name === null) {
    // Done, exit loop.
    this.stateStack.pop();
  } else {
    // Execute the body.
    if (!state.doneSetter_) {
      var value = this.createPrimitive(name);
      var setter = this.setValue(state.variable_, value);
      if (setter) {
        state.doneSetter_ = true;
        this.pushSetter_(setter, state.variable_, value);
        return;
      }
    }
    state.doneSetter_ = false;
    if (node.body) {
      state.isLoop = true;
      this.stateStack.push({ node: node.body });
    }
    state.iterator_++;
  }
};

Interpreter.prototype['stepForStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  var mode = state.mode_ || 0;
  if (mode == 0) {
    state.mode_ = 1;
    if (node.init) {
      this.stateStack.push({ node: node.init });
    }
  } else if (mode == 1) {
    state.mode_ = 2;
    if (node.test) {
      this.stateStack.push({ node: node.test });
    }
  } else if (mode == 2) {
    state.mode_ = 3;
    if (node.test && state.value && !state.value.toBoolean()) {
      // Done, exit loop.
      this.stateStack.pop();
    } else if (node.body) {
      // Execute the body.
      state.isLoop = true;
      this.stateStack.push({ node: node.body });
    }
  } else if (mode == 3) {
    state.mode_ = 1;
    if (node.update) {
      this.stateStack.push({ node: node.update });
    }
  }
};

Interpreter.prototype['stepFunctionDeclaration'] = function () {
  // This was found and handled when the scope was populated.
  this.stateStack.pop();
};

Interpreter.prototype['stepFunctionExpression'] = function () {
  var state = this.stateStack.pop();
  this.stateStack[this.stateStack.length - 1].value = this.createFunction(state.node, this.getScope());
};

Interpreter.prototype['stepIdentifier'] = function () {
  var state = this.stateStack.pop();
  var nameStr = state.node.name;
  var name = this.createPrimitive(nameStr);
  var value = state.components ? name : this.getValueFromScope(name);
  // An identifier could be a getter if it's a property on the global object.
  if (value && value.isGetter) {
    // Clear the getter flag and call the getter function.
    value.isGetter = false;
    var scope = this.getScope();
    while (!this.hasProperty(scope, nameStr)) {
      scope = scope.parentScope;
    }
    var func = /** @type {!Interpreter.Object} */value;
    this.pushGetter_(func, this.global);
  } else {
    this.stateStack[this.stateStack.length - 1].value = value;
  }
};

Interpreter.prototype['stepIfStatement'] = Interpreter.prototype['stepConditionalExpression'];

Interpreter.prototype['stepLabeledStatement'] = function () {
  // No need to hit this node again on the way back up the stack.
  var state = this.stateStack.pop();
  this.stateStack.push({ node: state.node.body,
    label: state.node.label.name });
};

Interpreter.prototype['stepLiteral'] = function () {
  var state = this.stateStack.pop();
  this.stateStack[this.stateStack.length - 1].value = this.createPrimitive(state.node.value);
};

Interpreter.prototype['stepLogicalExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (node.operator != '&&' && node.operator != '||') {
    throw SyntaxError('Unknown logical operator: ' + node.operator);
  }
  if (!state.doneLeft_) {
    state.doneLeft_ = true;
    this.stateStack.push({ node: node.left });
  } else if (!state.doneRight_) {
    if (node.operator == '&&' && !state.value.toBoolean() || node.operator == '||' && state.value.toBoolean()) {
      // Shortcut evaluation.
      this.stateStack.pop();
      this.stateStack[this.stateStack.length - 1].value = state.value;
    } else {
      state.doneRight_ = true;
      this.stateStack.push({ node: node.right });
    }
  } else {
    this.stateStack.pop();
    this.stateStack[this.stateStack.length - 1].value = state.value;
  }
};

Interpreter.prototype['stepMemberExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.doneObject_) {
    state.doneObject_ = true;
    this.stateStack.push({ node: node.object });
  } else if (!state.doneProperty_) {
    state.doneProperty_ = true;
    state.object_ = state.value;
    this.stateStack.push({
      node: node.property,
      components: !node.computed
    });
  } else {
    this.stateStack.pop();
    if (state.components) {
      this.stateStack[this.stateStack.length - 1].value = [state.object_, state.value];
    } else {
      var value = this.getProperty(state.object_, state.value);
      if (!value) {
        this.stateStack.push({});
        this.throwException(this.TYPE_ERROR, "Cannot read property '" + state.value + "' of " + state.object_.toString());
        return;
      }
      if (value.isGetter) {
        // Clear the getter flag and call the getter function.
        value.isGetter = false;
        var func = /** @type {!Interpreter.Object} */value;
        this.pushGetter_(func, state.object_);
      } else {
        this.stateStack[this.stateStack.length - 1].value = value;
      }
    }
  }
};

Interpreter.prototype['stepNewExpression'] = Interpreter.prototype['stepCallExpression'];

Interpreter.prototype['stepObjectExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  var valueToggle = state.valueToggle_;
  var n = state.n_ || 0;
  if (!state.object) {
    state.object = this.createObject(this.OBJECT);
    state.properties = Object.create(null);
  } else {
    if (valueToggle) {
      state.key_ = state.value;
    } else {
      if (!state.properties[state.key_]) {
        // Create temp object to collect value, getter, and/or setter.
        state.properties[state.key_] = {};
      }
      state.properties[state.key_][state.kind_] = state.value;
    }
  }
  if (node.properties[n]) {
    if (valueToggle) {
      state.n_ = n + 1;
      this.stateStack.push({ node: node.properties[n].value });
    } else {
      state.kind_ = node.properties[n].kind;
      this.stateStack.push({ node: node.properties[n].key, components: true });
    }
    state.valueToggle_ = !valueToggle;
  } else {
    for (var key in state.properties) {
      var kinds = state.properties[key];
      if ('get' in kinds || 'set' in kinds) {
        // Set a property with a getter or setter.
        var descriptor = {
          configurable: true,
          enumerable: true,
          get: kinds['get'],
          set: kinds['set']
        };
        this.setProperty(state.object, key, null, descriptor);
      } else {
        // Set a normal property with a value.
        this.setProperty(state.object, key, kinds['init']);
      }
    }
    this.stateStack.pop();
    this.stateStack[this.stateStack.length - 1].value = state.object;
  }
};

Interpreter.prototype['stepProgram'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  var n = state.n_ || 0;
  if (node.body[n]) {
    state.done = false;
    state.n_ = n + 1;
    this.stateStack.push({ node: node.body[n] });
  } else {
    state.done = true;
    // Don't pop the stateStack.
    // Leave the root scope on the tree in case the program is appended to.
  }
};

Interpreter.prototype['stepReturnStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (node.argument && !state.done_) {
    state.done_ = true;
    this.stateStack.push({ node: node.argument });
  } else {
    var value = state.value || this.UNDEFINED;
    var i = this.stateStack.length - 1;
    state = this.stateStack[i];
    while (state.node.type != 'CallExpression' && state.node.type != 'NewExpression') {
      if (state.node.type != 'TryStatement') {
        this.stateStack.splice(i, 1);
      }
      i--;
      if (i < 0) {
        // Syntax error, do not allow this error to be trapped.
        throw SyntaxError('Illegal return statement');
      }
      state = this.stateStack[i];
    }
    state.value = value;
  }
};

Interpreter.prototype['stepSequenceExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  var n = state.n_ || 0;
  if (node.expressions[n]) {
    state.n_ = n + 1;
    this.stateStack.push({ node: node.expressions[n] });
  } else {
    this.stateStack.pop();
    this.stateStack[this.stateStack.length - 1].value = state.value;
  }
};

Interpreter.prototype['stepSwitchStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];

  if (!state.test_) {
    state.test_ = true;
    this.stateStack.push({ node: state.node.discriminant });
    return;
  }
  if (!state.switchValue_) {
    // Preserve switch value between case tests.
    state.switchValue_ = state.value;
    state.checked_ = [];
  }

  var index = state.index_ || 0;
  var switchCase = state.node.cases[index];
  if (switchCase) {
    if (!state.done_ && !state.checked_[index] && switchCase.test) {
      state.checked_[index] = true;
      this.stateStack.push({ node: switchCase.test });
      return;
    }
    // Test on the default case will be null.
    if (state.done_ || !switchCase.test || this.comp(state.value, state.switchValue_) == 0) {
      state.done_ = true;
      var n = state.n_ || 0;
      if (switchCase.consequent[n]) {
        state.isSwitch = true;
        this.stateStack.push({ node: switchCase.consequent[n] });
        state.n_ = n + 1;
        return;
      }
    }
    state.n_ = 0;
    state.index_ = index + 1;
  } else {
    this.stateStack.pop();
  }
};

Interpreter.prototype['stepThisExpression'] = function () {
  this.stateStack.pop();
  for (var i = this.stateStack.length - 1; i >= 0; i--) {
    if (this.stateStack[i].thisExpression) {
      this.stateStack[this.stateStack.length - 1].value = this.stateStack[i].thisExpression;
      return;
    }
  }
  throw Error('No this expression found.');
};

Interpreter.prototype['stepThrowStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.done_) {
    state.done_ = true;
    this.stateStack.push({ node: node.argument });
  } else {
    this.throwException(state.value);
  }
};

Interpreter.prototype['stepTryStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.doneBlock_) {
    state.doneBlock_ = true;
    this.stateStack.push({ node: node.block });
  } else if (state.throwValue && !state.doneHandler_ && node.handler) {
    state.doneHandler_ = true;
    this.stateStack.push({ node: node.handler, throwValue: state.throwValue });
    state.throwValue = null; // This error has been handled, don't rethrow.
  } else if (!state.doneFinalizer_ && node.finalizer) {
    state.doneFinalizer_ = true;
    this.stateStack.push({ node: node.finalizer });
  } else if (state.throwValue) {
    // There was no catch handler, or the catch/finally threw an error.
    // Throw the error up to a higher try.
    this.executeException(state.throwValue);
  } else {
    this.stateStack.pop();
  }
};

Interpreter.prototype['stepUnaryExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.done_) {
    state.done_ = true;
    var nextState = {
      node: node.argument,
      components: node.operator == 'delete'
    };
    this.stateStack.push(nextState);
    return;
  }
  this.stateStack.pop();
  var value = state.value;
  if (node.operator == '-') {
    value = -value.toNumber();
  } else if (node.operator == '+') {
    value = value.toNumber();
  } else if (node.operator == '!') {
    value = !value.toBoolean();
  } else if (node.operator == '~') {
    value = ~value.toNumber();
  } else if (node.operator == 'delete') {
    if (value.length) {
      var obj = value[0];
      var name = value[1];
    } else {
      var obj = this.getScope();
      var name = value;
    }
    value = this.deleteProperty(obj, name);
    if (!value && this.getScope().strict) {
      this.throwException(this.TYPE_ERROR, 'Cannot delete property \'' + name + '\' of \'' + obj + '\'');
      return;
    }
  } else if (node.operator == 'typeof') {
    value = value.type;
  } else if (node.operator == 'void') {
    value = undefined;
  } else {
    throw SyntaxError('Unknown unary operator: ' + node.operator);
  }
  this.stateStack[this.stateStack.length - 1].value = this.createPrimitive(value);
};

Interpreter.prototype['stepUpdateExpression'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.doneLeft_) {
    state.doneLeft_ = true;
    this.stateStack.push({ node: node.argument, components: true });
    return;
  }
  if (!state.leftSide_) {
    state.leftSide_ = state.value;
  }
  if (state.doneGetter_) {
    state.leftValue_ = state.value;
  }
  if (!state.doneGetter_) {
    state.leftValue_ = this.getValue(state.leftSide_);
    if (!state.leftValue_) {
      return; // Thrown error, but trapped.
    }
    if (state.leftValue_.isGetter) {
      // Clear the getter flag and call the getter function.
      state.leftValue_.isGetter = false;
      state.doneGetter_ = true;
      var func = /** @type {!Interpreter.Object} */state.leftValue_;
      this.pushGetter_(func, state.leftSide_);
      return;
    }
  }
  if (state.doneSetter_) {
    // Return if setter function.
    // Setter method on property has completed.
    // Ignore its return value, and use the original set value instead.
    this.stateStack.pop();
    this.stateStack[this.stateStack.length - 1].value = state.doneSetter_;
    return;
  }
  var leftValue = state.leftValue_.toNumber();
  var changeValue;
  if (node.operator == '++') {
    changeValue = this.createPrimitive(leftValue + 1);
  } else if (node.operator == '--') {
    changeValue = this.createPrimitive(leftValue - 1);
  } else {
    throw SyntaxError('Unknown update expression: ' + node.operator);
  }
  var returnValue = node.prefix ? changeValue : this.createPrimitive(leftValue);
  var setter = this.setValue(state.leftSide_, changeValue);
  if (setter) {
    state.doneSetter_ = returnValue;
    this.pushSetter_(setter, state.leftSide_, changeValue);
    return;
  }
  // Return if no setter function.
  this.stateStack.pop();
  this.stateStack[this.stateStack.length - 1].value = returnValue;
};

Interpreter.prototype['stepVariableDeclaration'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  var n = state.n_ || 0;
  var declarationNode = node.declarations[n];
  if (state.value && declarationNode) {
    // This setValue call never needs to deal with calling a setter function.
    this.setValue(this.createPrimitive(declarationNode.id.name), state.value);
    state.value = null;
    declarationNode = node.declarations[++n];
  }
  while (declarationNode) {
    // Skip any declarations that are not initialized.  They have already
    // been defined as undefined in populateScope_.
    if (declarationNode.init) {
      state.n_ = n;
      this.stateStack.push({ node: declarationNode.init });
      return;
    }
    declarationNode = node.declarations[++n];
  }
  this.stateStack.pop();
};

Interpreter.prototype['stepWithStatement'] = function () {
  var state = this.stateStack[this.stateStack.length - 1];
  var node = state.node;
  if (!state.doneObject_) {
    state.doneObject_ = true;
    this.stateStack.push({ node: node.object });
  } else if (!state.doneBody_) {
    state.doneBody_ = true;
    var scope = this.createSpecialScope(this.getScope(), state.value);
    this.stateStack.push({ node: node.body, scope: scope });
  } else {
    this.stateStack.pop();
  }
};

Interpreter.prototype['stepWhileStatement'] = Interpreter.prototype['stepDoWhileStatement'];

// Preserve top-level API functions from being pruned by JS compilers.
// Add others as needed.
if (typeof window !== 'undefined') {
  window.Interpreter = Interpreter;
}
Interpreter.prototype['appendCode'] = Interpreter.prototype.appendCode;
Interpreter.prototype['createAsyncFunction'] = Interpreter.prototype.createAsyncFunction;
Interpreter.prototype['step'] = Interpreter.prototype.step;
Interpreter.prototype['run'] = Interpreter.prototype.run;

module.exports = Interpreter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.acorn = global.acorn || {})));
}(this, (function (exports) { 'use strict';

// Reserved word lists for various dialects of the language

var reservedWords = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}

// And the keywords

var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"

var keywords = {
  5: ecma5AndLessKeywords,
  6: ecma5AndLessKeywords + " const class extends export import super"
}

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
// Generated by `bin/generate-identifier-regex.js`.

var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0-\u08b4\u08b6-\u08bd\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fd5\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ae\ua7b0-\ua7b7\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab65\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc"
var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08d4-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d01-\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1cf8\u1cf9\u1dc0-\u1df5\u1dfb-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f"

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]")
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]")

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range. They were
// generated by bin/generate-identifier-regex.js
var astralIdentifierStartCodes = [0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,785,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,54,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,25,391,63,32,0,449,56,264,8,2,36,18,0,50,29,881,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,65,0,32,6124,20,754,9486,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,60,67,1213,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,10591,541]
var astralIdentifierCodes = [509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,10,2,4,9,83,11,7,0,161,11,6,9,7,3,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,87,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,423,9,838,7,2,7,17,9,57,21,2,13,19882,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,2214,6,110,6,6,9,792487,239]

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i]
    if (pos > code) return false
    pos += set[i + 1]
    if (pos >= code) return true
  }
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code, astral) {
  if (code < 65) return code === 36
  if (code < 91) return true
  if (code < 97) return code === 95
  if (code < 123) return true
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code))
  if (astral === false) return false
  return isInAstralSet(code, astralIdentifierStartCodes)
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code, astral) {
  if (code < 48) return code === 36
  if (code < 58) return true
  if (code < 65) return false
  if (code < 91) return true
  if (code < 97) return code === 95
  if (code < 123) return true
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code))
  if (astral === false) return false
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
}

// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// The `startsExpr` property is used to check if the token ends a
// `yield` expression. It is set on all token types that either can
// directly start an expression (like a quotation mark) or can
// continue an expression (like the body of a string).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

var TokenType = function TokenType(label, conf) {
  if ( conf === void 0 ) conf = {};

  this.label = label
  this.keyword = conf.keyword
  this.beforeExpr = !!conf.beforeExpr
  this.startsExpr = !!conf.startsExpr
  this.isLoop = !!conf.isLoop
  this.isAssign = !!conf.isAssign
  this.prefix = !!conf.prefix
  this.postfix = !!conf.postfix
  this.binop = conf.binop || null
  this.updateContext = null
};

function binop(name, prec) {
  return new TokenType(name, {beforeExpr: true, binop: prec})
}
var beforeExpr = {beforeExpr: true};
var startsExpr = {startsExpr: true};
// Map keyword names to token types.

var keywordTypes = {}

// Succinct definitions of keyword token types
function kw(name, options) {
  if ( options === void 0 ) options = {};

  options.keyword = name
  return keywordTypes[name] = new TokenType(name, options)
}

var tt = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
  assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
  incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
  prefix: new TokenType("prefix", {beforeExpr: true, prefix: true, startsExpr: true}),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=", 6),
  relational: binop("</>", 7),
  bitShift: binop("<</>>", 8),
  plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", {beforeExpr: true}),

  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", {isLoop: true, beforeExpr: true}),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", {isLoop: true}),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", {isLoop: true}),
  _with: kw("with"),
  _new: kw("new", {beforeExpr: true, startsExpr: true}),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class"),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import"),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", {beforeExpr: true, binop: 7}),
  _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
  _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
  _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
  _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
}

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

var lineBreak = /\r\n?|\n|\u2028|\u2029/
var lineBreakG = new RegExp(lineBreak.source, "g")

function isNewLine(code) {
  return code === 10 || code === 13 || code === 0x2028 || code === 0x2029
}

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/

var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g

function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]"
}

// Checks if an object has a property.

function has(obj, propName) {
  return Object.prototype.hasOwnProperty.call(obj, propName)
}

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = function Position(line, col) {
  this.line = line
  this.column = col
};

Position.prototype.offset = function offset (n) {
  return new Position(this.line, this.column + n)
};

var SourceLocation = function SourceLocation(p, start, end) {
  this.start = start
  this.end = end
  if (p.sourceFile !== null) this.source = p.sourceFile
};

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    lineBreakG.lastIndex = cur
    var match = lineBreakG.exec(input)
    if (match && match.index < offset) {
      ++line
      cur = match.index + match[0].length
    } else {
      return new Position(line, offset - cur)
    }
  }
}

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

var defaultOptions = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must
  // be either 3, 5, 6 (2015), 7 (2016), or 8 (2017). This influences support
  // for strict mode, the set of reserved words, and support for
  // new syntax features. The default is 7.
  ecmaVersion: 7,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called
  // when a semicolon is automatically inserted. It will be passed
  // th position of the comma as an offset, and if `locations` is
  // enabled, it is given the location as a `{line, column}` object
  // as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // When enabled, hashbang directive in the beginning of file
  // is allowed and treated as a line comment.
  allowHashBang: false,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false,
  plugins: {}
}

// Interpret and default an options object

function getOptions(opts) {
  var options = {}

  for (var opt in defaultOptions)
    options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt]

  if (options.ecmaVersion >= 2015)
    options.ecmaVersion -= 2009

  if (options.allowReserved == null)
    options.allowReserved = options.ecmaVersion < 5

  if (isArray(options.onToken)) {
    var tokens = options.onToken
    options.onToken = function (token) { return tokens.push(token); }
  }
  if (isArray(options.onComment))
    options.onComment = pushComment(options, options.onComment)

  return options
}

function pushComment(options, array) {
  return function (block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? 'Block' : 'Line',
      value: text,
      start: start,
      end: end
    }
    if (options.locations)
      comment.loc = new SourceLocation(this, startLoc, endLoc)
    if (options.ranges)
      comment.range = [start, end]
    array.push(comment)
  }
}

// Registered plugins
var plugins = {}

function keywordRegexp(words) {
  return new RegExp("^(" + words.replace(/ /g, "|") + ")$")
}

var Parser = function Parser(options, input, startPos) {
  this.options = options = getOptions(options)
  this.sourceFile = options.sourceFile
  this.keywords = keywordRegexp(keywords[options.ecmaVersion >= 6 ? 6 : 5])
  var reserved = ""
  if (!options.allowReserved) {
    for (var v = options.ecmaVersion;; v--)
      if (reserved = reservedWords[v]) break
    if (options.sourceType == "module") reserved += " await"
  }
  this.reservedWords = keywordRegexp(reserved)
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict
  this.reservedWordsStrict = keywordRegexp(reservedStrict)
  this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + reservedWords.strictBind)
  this.input = String(input)

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  this.containsEsc = false

  // Load plugins
  this.loadPlugins(options.plugins)

  // Set up token state

  // The current position of the tokenizer in the input.
  if (startPos) {
    this.pos = startPos
    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length
  } else {
    this.pos = this.lineStart = 0
    this.curLine = 1
  }

  // Properties of the current token:
  // Its type
  this.type = tt.eof
  // For tokens that include more information than their type, the value
  this.value = null
  // Its start and end offset
  this.start = this.end = this.pos
  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  this.startLoc = this.endLoc = this.curPosition()

  // Position information for the previous token
  this.lastTokEndLoc = this.lastTokStartLoc = null
  this.lastTokStart = this.lastTokEnd = this.pos

  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.
  this.context = this.initialContext()
  this.exprAllowed = true

  // Figure out if it's a module code.
  this.inModule = options.sourceType === "module"
  this.strict = this.inModule || this.strictDirective(this.pos)

  // Used to signify the start of a potential arrow function
  this.potentialArrowAt = -1

  // Flags to track whether we are in a function, a generator, an async function.
  this.inFunction = this.inGenerator = this.inAsync = false
  // Positions to delayed-check that yield/await does not exist in default parameters.
  this.yieldPos = this.awaitPos = 0
  // Labels in scope.
  this.labels = []

  // If enabled, skip leading hashbang line.
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === '#!')
    this.skipLineComment(2)
};

// DEPRECATED Kept for backwards compatibility until 3.0 in case a plugin uses them
Parser.prototype.isKeyword = function isKeyword (word) { return this.keywords.test(word) };
Parser.prototype.isReservedWord = function isReservedWord (word) { return this.reservedWords.test(word) };

Parser.prototype.extend = function extend (name, f) {
  this[name] = f(this[name])
};

Parser.prototype.loadPlugins = function loadPlugins (pluginConfigs) {
    var this$1 = this;

  for (var name in pluginConfigs) {
    var plugin = plugins[name]
    if (!plugin) throw new Error("Plugin '" + name + "' not found")
    plugin(this$1, pluginConfigs[name])
  }
};

Parser.prototype.parse = function parse () {
  var node = this.options.program || this.startNode()
  this.nextToken()
  return this.parseTopLevel(node)
};

var pp = Parser.prototype

// ## Parser utilities

var literal = /^(?:'((?:[^\']|\.)*)'|"((?:[^\"]|\.)*)"|;)/
pp.strictDirective = function(start) {
  var this$1 = this;

  for (;;) {
    skipWhiteSpace.lastIndex = start
    start += skipWhiteSpace.exec(this$1.input)[0].length
    var match = literal.exec(this$1.input.slice(start))
    if (!match) return false
    if ((match[1] || match[2]) == "use strict") return true
    start += match[0].length
  }
}

// Predicate that tests whether the next token is of the given
// type, and if yes, consumes it as a side effect.

pp.eat = function(type) {
  if (this.type === type) {
    this.next()
    return true
  } else {
    return false
  }
}

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function(name) {
  return this.type === tt.name && this.value === name
}

// Consumes contextual keyword if possible.

pp.eatContextual = function(name) {
  return this.value === name && this.eat(tt.name)
}

// Asserts that following token is given contextual keyword.

pp.expectContextual = function(name) {
  if (!this.eatContextual(name)) this.unexpected()
}

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function() {
  return this.type === tt.eof ||
    this.type === tt.braceR ||
    lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
}

pp.insertSemicolon = function() {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon)
      this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc)
    return true
  }
}

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function() {
  if (!this.eat(tt.semi) && !this.insertSemicolon()) this.unexpected()
}

pp.afterTrailingComma = function(tokType, notNext) {
  if (this.type == tokType) {
    if (this.options.onTrailingComma)
      this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc)
    if (!notNext)
      this.next()
    return true
  }
}

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp.expect = function(type) {
  this.eat(type) || this.unexpected()
}

// Raise an unexpected token error.

pp.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token")
}

var DestructuringErrors = function DestructuringErrors() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = -1
};

pp.checkPatternErrors = function(refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) return
  if (refDestructuringErrors.trailingComma > -1)
    this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element")
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind
  if (parens > -1) this.raiseRecoverable(parens, "Parenthesized pattern")
}

pp.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
  var pos = refDestructuringErrors ? refDestructuringErrors.shorthandAssign : -1
  if (!andThrow) return pos >= 0
  if (pos > -1) this.raise(pos, "Shorthand property assignments are valid only in destructuring patterns")
}

pp.checkYieldAwaitInDefaultParams = function() {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
    this.raise(this.yieldPos, "Yield expression cannot be a default value")
  if (this.awaitPos)
    this.raise(this.awaitPos, "Await expression cannot be a default value")
}

pp.isSimpleAssignTarget = function(expr) {
  if (expr.type === "ParenthesizedExpression")
    return this.isSimpleAssignTarget(expr.expression)
  return expr.type === "Identifier" || expr.type === "MemberExpression"
}

var pp$1 = Parser.prototype

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp$1.parseTopLevel = function(node) {
  var this$1 = this;

  var exports = {}
  if (!node.body) node.body = []
  while (this.type !== tt.eof) {
    var stmt = this$1.parseStatement(true, true, exports)
    node.body.push(stmt)
  }
  this.next()
  if (this.options.ecmaVersion >= 6) {
    node.sourceType = this.options.sourceType
  }
  return this.finishNode(node, "Program")
}

var loopLabel = {kind: "loop"};
var switchLabel = {kind: "switch"};
pp$1.isLet = function() {
  if (this.type !== tt.name || this.options.ecmaVersion < 6 || this.value != "let") return false
  skipWhiteSpace.lastIndex = this.pos
  var skip = skipWhiteSpace.exec(this.input)
  var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next)
  if (nextCh === 91 || nextCh == 123) return true // '{' and '['
  if (isIdentifierStart(nextCh, true)) {
    for (var pos = next + 1; isIdentifierChar(this.input.charCodeAt(pos), true); ++pos) {}
    var ident = this.input.slice(next, pos)
    if (!this.isKeyword(ident)) return true
  }
  return false
}

// check 'async [no LineTerminator here] function'
// - 'async /*foo*/ function' is OK.
// - 'async /*\n*/ function' is invalid.
pp$1.isAsyncFunction = function() {
  if (this.type !== tt.name || this.options.ecmaVersion < 8 || this.value != "async")
    return false

  skipWhiteSpace.lastIndex = this.pos
  var skip = skipWhiteSpace.exec(this.input)
  var next = this.pos + skip[0].length
  return !lineBreak.test(this.input.slice(this.pos, next)) &&
    this.input.slice(next, next + 8) === "function" &&
    (next + 8 == this.input.length || !isIdentifierChar(this.input.charAt(next + 8)))
}

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp$1.parseStatement = function(declaration, topLevel, exports) {
  var starttype = this.type, node = this.startNode(), kind

  if (this.isLet()) {
    starttype = tt._var
    kind = "let"
  }

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
  case tt._break: case tt._continue: return this.parseBreakContinueStatement(node, starttype.keyword)
  case tt._debugger: return this.parseDebuggerStatement(node)
  case tt._do: return this.parseDoStatement(node)
  case tt._for: return this.parseForStatement(node)
  case tt._function:
    if (!declaration && this.options.ecmaVersion >= 6) this.unexpected()
    return this.parseFunctionStatement(node, false)
  case tt._class:
    if (!declaration) this.unexpected()
    return this.parseClass(node, true)
  case tt._if: return this.parseIfStatement(node)
  case tt._return: return this.parseReturnStatement(node)
  case tt._switch: return this.parseSwitchStatement(node)
  case tt._throw: return this.parseThrowStatement(node)
  case tt._try: return this.parseTryStatement(node)
  case tt._const: case tt._var:
    kind = kind || this.value
    if (!declaration && kind != "var") this.unexpected()
    return this.parseVarStatement(node, kind)
  case tt._while: return this.parseWhileStatement(node)
  case tt._with: return this.parseWithStatement(node)
  case tt.braceL: return this.parseBlock()
  case tt.semi: return this.parseEmptyStatement(node)
  case tt._export:
  case tt._import:
    if (!this.options.allowImportExportEverywhere) {
      if (!topLevel)
        this.raise(this.start, "'import' and 'export' may only appear at the top level")
      if (!this.inModule)
        this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")
    }
    return starttype === tt._import ? this.parseImport(node) : this.parseExport(node, exports)

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
  default:
    if (this.isAsyncFunction() && declaration) {
      this.next()
      return this.parseFunctionStatement(node, true)
    }

    var maybeName = this.value, expr = this.parseExpression()
    if (starttype === tt.name && expr.type === "Identifier" && this.eat(tt.colon))
      return this.parseLabeledStatement(node, maybeName, expr)
    else return this.parseExpressionStatement(node, expr)
  }
}

pp$1.parseBreakContinueStatement = function(node, keyword) {
  var this$1 = this;

  var isBreak = keyword == "break"
  this.next()
  if (this.eat(tt.semi) || this.insertSemicolon()) node.label = null
  else if (this.type !== tt.name) this.unexpected()
  else {
    node.label = this.parseIdent()
    this.semicolon()
  }

  // Verify that there is an actual destination to break or
  // continue to.
  for (var i = 0; i < this.labels.length; ++i) {
    var lab = this$1.labels[i]
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) break
      if (node.label && isBreak) break
    }
  }
  if (i === this.labels.length) this.raise(node.start, "Unsyntactic " + keyword)
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
}

pp$1.parseDebuggerStatement = function(node) {
  this.next()
  this.semicolon()
  return this.finishNode(node, "DebuggerStatement")
}

pp$1.parseDoStatement = function(node) {
  this.next()
  this.labels.push(loopLabel)
  node.body = this.parseStatement(false)
  this.labels.pop()
  this.expect(tt._while)
  node.test = this.parseParenExpression()
  if (this.options.ecmaVersion >= 6)
    this.eat(tt.semi)
  else
    this.semicolon()
  return this.finishNode(node, "DoWhileStatement")
}

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp$1.parseForStatement = function(node) {
  this.next()
  this.labels.push(loopLabel)
  this.expect(tt.parenL)
  if (this.type === tt.semi) return this.parseFor(node, null)
  var isLet = this.isLet()
  if (this.type === tt._var || this.type === tt._const || isLet) {
    var init$1 = this.startNode(), kind = isLet ? "let" : this.value
    this.next()
    this.parseVar(init$1, true, kind)
    this.finishNode(init$1, "VariableDeclaration")
    if ((this.type === tt._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init$1.declarations.length === 1 &&
        !(kind !== "var" && init$1.declarations[0].init))
      return this.parseForIn(node, init$1)
    return this.parseFor(node, init$1)
  }
  var refDestructuringErrors = new DestructuringErrors
  var init = this.parseExpression(true, refDestructuringErrors)
  if (this.type === tt._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
    this.toAssignable(init)
    this.checkLVal(init)
    this.checkPatternErrors(refDestructuringErrors, true)
    return this.parseForIn(node, init)
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true)
  }
  return this.parseFor(node, init)
}

pp$1.parseFunctionStatement = function(node, isAsync) {
  this.next()
  return this.parseFunction(node, true, false, isAsync)
}

pp$1.isFunction = function() {
  return this.type === tt._function || this.isAsyncFunction()
}

pp$1.parseIfStatement = function(node) {
  this.next()
  node.test = this.parseParenExpression()
  // allow function declarations in branches, but only in non-strict mode
  node.consequent = this.parseStatement(!this.strict && this.isFunction())
  node.alternate = this.eat(tt._else) ? this.parseStatement(!this.strict && this.isFunction()) : null
  return this.finishNode(node, "IfStatement")
}

pp$1.parseReturnStatement = function(node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction)
    this.raise(this.start, "'return' outside of function")
  this.next()

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.eat(tt.semi) || this.insertSemicolon()) node.argument = null
  else { node.argument = this.parseExpression(); this.semicolon() }
  return this.finishNode(node, "ReturnStatement")
}

pp$1.parseSwitchStatement = function(node) {
  var this$1 = this;

  this.next()
  node.discriminant = this.parseParenExpression()
  node.cases = []
  this.expect(tt.braceL)
  this.labels.push(switchLabel)

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  for (var cur, sawDefault = false; this.type != tt.braceR;) {
    if (this$1.type === tt._case || this$1.type === tt._default) {
      var isCase = this$1.type === tt._case
      if (cur) this$1.finishNode(cur, "SwitchCase")
      node.cases.push(cur = this$1.startNode())
      cur.consequent = []
      this$1.next()
      if (isCase) {
        cur.test = this$1.parseExpression()
      } else {
        if (sawDefault) this$1.raiseRecoverable(this$1.lastTokStart, "Multiple default clauses")
        sawDefault = true
        cur.test = null
      }
      this$1.expect(tt.colon)
    } else {
      if (!cur) this$1.unexpected()
      cur.consequent.push(this$1.parseStatement(true))
    }
  }
  if (cur) this.finishNode(cur, "SwitchCase")
  this.next() // Closing brace
  this.labels.pop()
  return this.finishNode(node, "SwitchStatement")
}

pp$1.parseThrowStatement = function(node) {
  this.next()
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
    this.raise(this.lastTokEnd, "Illegal newline after throw")
  node.argument = this.parseExpression()
  this.semicolon()
  return this.finishNode(node, "ThrowStatement")
}

// Reused empty array added for node fields that are always empty.

var empty = []

pp$1.parseTryStatement = function(node) {
  this.next()
  node.block = this.parseBlock()
  node.handler = null
  if (this.type === tt._catch) {
    var clause = this.startNode()
    this.next()
    this.expect(tt.parenL)
    clause.param = this.parseBindingAtom()
    this.checkLVal(clause.param, true)
    this.expect(tt.parenR)
    clause.body = this.parseBlock()
    node.handler = this.finishNode(clause, "CatchClause")
  }
  node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null
  if (!node.handler && !node.finalizer)
    this.raise(node.start, "Missing catch or finally clause")
  return this.finishNode(node, "TryStatement")
}

pp$1.parseVarStatement = function(node, kind) {
  this.next()
  this.parseVar(node, false, kind)
  this.semicolon()
  return this.finishNode(node, "VariableDeclaration")
}

pp$1.parseWhileStatement = function(node) {
  this.next()
  node.test = this.parseParenExpression()
  this.labels.push(loopLabel)
  node.body = this.parseStatement(false)
  this.labels.pop()
  return this.finishNode(node, "WhileStatement")
}

pp$1.parseWithStatement = function(node) {
  if (this.strict) this.raise(this.start, "'with' in strict mode")
  this.next()
  node.object = this.parseParenExpression()
  node.body = this.parseStatement(false)
  return this.finishNode(node, "WithStatement")
}

pp$1.parseEmptyStatement = function(node) {
  this.next()
  return this.finishNode(node, "EmptyStatement")
}

pp$1.parseLabeledStatement = function(node, maybeName, expr) {
  var this$1 = this;

  for (var i = 0; i < this.labels.length; ++i)
    if (this$1.labels[i].name === maybeName) this$1.raise(expr.start, "Label '" + maybeName + "' is already declared")
  var kind = this.type.isLoop ? "loop" : this.type === tt._switch ? "switch" : null
  for (var i$1 = this.labels.length - 1; i$1 >= 0; i$1--) {
    var label = this$1.labels[i$1]
    if (label.statementStart == node.start) {
      label.statementStart = this$1.start
      label.kind = kind
    } else break
  }
  this.labels.push({name: maybeName, kind: kind, statementStart: this.start})
  node.body = this.parseStatement(true)
  if (node.body.type == "ClassDeclaration" ||
      node.body.type == "VariableDeclaration" && (this.strict || node.body.kind != "var") ||
      node.body.type == "FunctionDeclaration" && (this.strict || node.body.generator))
    this.raiseRecoverable(node.body.start, "Invalid labeled declaration")
  this.labels.pop()
  node.label = expr
  return this.finishNode(node, "LabeledStatement")
}

pp$1.parseExpressionStatement = function(node, expr) {
  node.expression = expr
  this.semicolon()
  return this.finishNode(node, "ExpressionStatement")
}

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp$1.parseBlock = function() {
  var this$1 = this;

  var node = this.startNode()
  node.body = []
  this.expect(tt.braceL)
  while (!this.eat(tt.braceR)) {
    var stmt = this$1.parseStatement(true)
    node.body.push(stmt)
  }
  return this.finishNode(node, "BlockStatement")
}

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp$1.parseFor = function(node, init) {
  node.init = init
  this.expect(tt.semi)
  node.test = this.type === tt.semi ? null : this.parseExpression()
  this.expect(tt.semi)
  node.update = this.type === tt.parenR ? null : this.parseExpression()
  this.expect(tt.parenR)
  node.body = this.parseStatement(false)
  this.labels.pop()
  return this.finishNode(node, "ForStatement")
}

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp$1.parseForIn = function(node, init) {
  var type = this.type === tt._in ? "ForInStatement" : "ForOfStatement"
  this.next()
  node.left = init
  node.right = this.parseExpression()
  this.expect(tt.parenR)
  node.body = this.parseStatement(false)
  this.labels.pop()
  return this.finishNode(node, type)
}

// Parse a list of variable declarations.

pp$1.parseVar = function(node, isFor, kind) {
  var this$1 = this;

  node.declarations = []
  node.kind = kind
  for (;;) {
    var decl = this$1.startNode()
    this$1.parseVarId(decl)
    if (this$1.eat(tt.eq)) {
      decl.init = this$1.parseMaybeAssign(isFor)
    } else if (kind === "const" && !(this$1.type === tt._in || (this$1.options.ecmaVersion >= 6 && this$1.isContextual("of")))) {
      this$1.unexpected()
    } else if (decl.id.type != "Identifier" && !(isFor && (this$1.type === tt._in || this$1.isContextual("of")))) {
      this$1.raise(this$1.lastTokEnd, "Complex binding patterns require an initialization value")
    } else {
      decl.init = null
    }
    node.declarations.push(this$1.finishNode(decl, "VariableDeclarator"))
    if (!this$1.eat(tt.comma)) break
  }
  return node
}

pp$1.parseVarId = function(decl) {
  decl.id = this.parseBindingAtom()
  this.checkLVal(decl.id, true)
}

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseFunction = function(node, isStatement, allowExpressionBody, isAsync) {
  this.initFunction(node)
  if (this.options.ecmaVersion >= 6 && !isAsync)
    node.generator = this.eat(tt.star)
  if (this.options.ecmaVersion >= 8)
    node.async = !!isAsync

  if (isStatement == null)
    isStatement = this.type == tt.name
  if (isStatement)
    node.id = this.parseIdent()

  var oldInGen = this.inGenerator, oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction
  this.inGenerator = node.generator
  this.inAsync = node.async
  this.yieldPos = 0
  this.awaitPos = 0
  this.inFunction = true

  if (!isStatement && this.type === tt.name)
    node.id = this.parseIdent()
  this.parseFunctionParams(node)
  this.parseFunctionBody(node, allowExpressionBody)

  this.inGenerator = oldInGen
  this.inAsync = oldInAsync
  this.yieldPos = oldYieldPos
  this.awaitPos = oldAwaitPos
  this.inFunction = oldInFunc
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression")
}

pp$1.parseFunctionParams = function(node) {
  this.expect(tt.parenL)
  node.params = this.parseBindingList(tt.parenR, false, this.options.ecmaVersion >= 8, true)
  this.checkYieldAwaitInDefaultParams()
}

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseClass = function(node, isStatement) {
  var this$1 = this;

  this.next()
  if (isStatement == null) isStatement = this.type === tt.name
  this.parseClassId(node, isStatement)
  this.parseClassSuper(node)
  var classBody = this.startNode()
  var hadConstructor = false
  classBody.body = []
  this.expect(tt.braceL)
  while (!this.eat(tt.braceR)) {
    if (this$1.eat(tt.semi)) continue
    var method = this$1.startNode()
    var isGenerator = this$1.eat(tt.star)
    var isAsync = false
    var isMaybeStatic = this$1.type === tt.name && this$1.value === "static"
    this$1.parsePropertyName(method)
    method.static = isMaybeStatic && this$1.type !== tt.parenL
    if (method.static) {
      if (isGenerator) this$1.unexpected()
      isGenerator = this$1.eat(tt.star)
      this$1.parsePropertyName(method)
    }
    if (this$1.options.ecmaVersion >= 8 && !isGenerator && !method.computed &&
        method.key.type === "Identifier" && method.key.name === "async" && this$1.type !== tt.parenL &&
        !this$1.canInsertSemicolon()) {
      isAsync = true
      this$1.parsePropertyName(method)
    }
    method.kind = "method"
    var isGetSet = false
    if (!method.computed) {
      var key = method.key;
      if (!isGenerator && !isAsync && key.type === "Identifier" && this$1.type !== tt.parenL && (key.name === "get" || key.name === "set")) {
        isGetSet = true
        method.kind = key.name
        key = this$1.parsePropertyName(method)
      }
      if (!method.static && (key.type === "Identifier" && key.name === "constructor" ||
          key.type === "Literal" && key.value === "constructor")) {
        if (hadConstructor) this$1.raise(key.start, "Duplicate constructor in the same class")
        if (isGetSet) this$1.raise(key.start, "Constructor can't have get/set modifier")
        if (isGenerator) this$1.raise(key.start, "Constructor can't be a generator")
        if (isAsync) this$1.raise(key.start, "Constructor can't be an async method")
        method.kind = "constructor"
        hadConstructor = true
      }
    }
    this$1.parseClassMethod(classBody, method, isGenerator, isAsync)
    if (isGetSet) {
      var paramCount = method.kind === "get" ? 0 : 1
      if (method.value.params.length !== paramCount) {
        var start = method.value.start
        if (method.kind === "get")
          this$1.raiseRecoverable(start, "getter should have no params")
        else
          this$1.raiseRecoverable(start, "setter should have exactly one param")
      } else {
        if (method.kind === "set" && method.value.params[0].type === "RestElement")
          this$1.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params")
      }
    }
  }
  node.body = this.finishNode(classBody, "ClassBody")
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
}

pp$1.parseClassMethod = function(classBody, method, isGenerator, isAsync) {
  method.value = this.parseMethod(isGenerator, isAsync)
  classBody.body.push(this.finishNode(method, "MethodDefinition"))
}

pp$1.parseClassId = function(node, isStatement) {
  node.id = this.type === tt.name ? this.parseIdent() : isStatement ? this.unexpected() : null
}

pp$1.parseClassSuper = function(node) {
  node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null
}

// Parses module export declaration.

pp$1.parseExport = function(node, exports) {
  var this$1 = this;

  this.next()
  // export * from '...'
  if (this.eat(tt.star)) {
    this.expectContextual("from")
    node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected()
    this.semicolon()
    return this.finishNode(node, "ExportAllDeclaration")
  }
  if (this.eat(tt._default)) { // export default ...
    this.checkExport(exports, "default", this.lastTokStart)
    var isAsync
    if (this.type === tt._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode()
      this.next()
      if (isAsync) this.next()
      node.declaration = this.parseFunction(fNode, null, false, isAsync)
    } else if (this.type === tt._class) {
      var cNode = this.startNode()
      node.declaration = this.parseClass(cNode, null)
    } else {
      node.declaration = this.parseMaybeAssign()
      this.semicolon()
    }
    return this.finishNode(node, "ExportDefaultDeclaration")
  }
  // export var|const|let|function|class ...
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseStatement(true)
    if (node.declaration.type === "VariableDeclaration")
      this.checkVariableExport(exports, node.declaration.declarations)
    else
      this.checkExport(exports, node.declaration.id.name, node.declaration.id.start)
    node.specifiers = []
    node.source = null
  } else { // export { x, y as z } [from '...']
    node.declaration = null
    node.specifiers = this.parseExportSpecifiers(exports)
    if (this.eatContextual("from")) {
      node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected()
    } else {
      // check for keywords used as local names
      for (var i = 0; i < node.specifiers.length; i++) {
        if (this$1.keywords.test(node.specifiers[i].local.name) || this$1.reservedWords.test(node.specifiers[i].local.name)) {
          this$1.unexpected(node.specifiers[i].local.start)
        }
      }

      node.source = null
    }
    this.semicolon()
  }
  return this.finishNode(node, "ExportNamedDeclaration")
}

pp$1.checkExport = function(exports, name, pos) {
  if (!exports) return
  if (Object.prototype.hasOwnProperty.call(exports, name))
    this.raiseRecoverable(pos, "Duplicate export '" + name + "'")
  exports[name] = true
}

pp$1.checkPatternExport = function(exports, pat) {
  var this$1 = this;

  var type = pat.type
  if (type == "Identifier")
    this.checkExport(exports, pat.name, pat.start)
  else if (type == "ObjectPattern")
    for (var i = 0; i < pat.properties.length; ++i)
      this$1.checkPatternExport(exports, pat.properties[i].value)
  else if (type == "ArrayPattern")
    for (var i$1 = 0; i$1 < pat.elements.length; ++i$1) {
      var elt = pat.elements[i$1]
      if (elt) this$1.checkPatternExport(exports, elt)
    }
  else if (type == "AssignmentPattern")
    this.checkPatternExport(exports, pat.left)
  else if (type == "ParenthesizedExpression")
    this.checkPatternExport(exports, pat.expression)
}

pp$1.checkVariableExport = function(exports, decls) {
  var this$1 = this;

  if (!exports) return
  for (var i = 0; i < decls.length; i++)
    this$1.checkPatternExport(exports, decls[i].id)
}

pp$1.shouldParseExportStatement = function() {
  return this.type.keyword === "var"
    || this.type.keyword === "const"
    || this.type.keyword === "class"
    || this.type.keyword === "function"
    || this.isLet()
    || this.isAsyncFunction()
}

// Parses a comma-separated list of module exports.

pp$1.parseExportSpecifiers = function(exports) {
  var this$1 = this;

  var nodes = [], first = true
  // export { x, y as z } [from '...']
  this.expect(tt.braceL)
  while (!this.eat(tt.braceR)) {
    if (!first) {
      this$1.expect(tt.comma)
      if (this$1.afterTrailingComma(tt.braceR)) break
    } else first = false

    var node = this$1.startNode()
    node.local = this$1.parseIdent(true)
    node.exported = this$1.eatContextual("as") ? this$1.parseIdent(true) : node.local
    this$1.checkExport(exports, node.exported.name, node.exported.start)
    nodes.push(this$1.finishNode(node, "ExportSpecifier"))
  }
  return nodes
}

// Parses import declaration.

pp$1.parseImport = function(node) {
  this.next()
  // import '...'
  if (this.type === tt.string) {
    node.specifiers = empty
    node.source = this.parseExprAtom()
  } else {
    node.specifiers = this.parseImportSpecifiers()
    this.expectContextual("from")
    node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected()
  }
  this.semicolon()
  return this.finishNode(node, "ImportDeclaration")
}

// Parses a comma-separated list of module imports.

pp$1.parseImportSpecifiers = function() {
  var this$1 = this;

  var nodes = [], first = true
  if (this.type === tt.name) {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode()
    node.local = this.parseIdent()
    this.checkLVal(node.local, true)
    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"))
    if (!this.eat(tt.comma)) return nodes
  }
  if (this.type === tt.star) {
    var node$1 = this.startNode()
    this.next()
    this.expectContextual("as")
    node$1.local = this.parseIdent()
    this.checkLVal(node$1.local, true)
    nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"))
    return nodes
  }
  this.expect(tt.braceL)
  while (!this.eat(tt.braceR)) {
    if (!first) {
      this$1.expect(tt.comma)
      if (this$1.afterTrailingComma(tt.braceR)) break
    } else first = false

    var node$2 = this$1.startNode()
    node$2.imported = this$1.parseIdent(true)
    if (this$1.eatContextual("as")) {
      node$2.local = this$1.parseIdent()
    } else {
      node$2.local = node$2.imported
      if (this$1.isKeyword(node$2.local.name)) this$1.unexpected(node$2.local.start)
      if (this$1.reservedWordsStrict.test(node$2.local.name)) this$1.raiseRecoverable(node$2.local.start, "The keyword '" + node$2.local.name + "' is reserved")
    }
    this$1.checkLVal(node$2.local, true)
    nodes.push(this$1.finishNode(node$2, "ImportSpecifier"))
  }
  return nodes
}

var pp$2 = Parser.prototype

// Convert existing expression atom to assignable pattern
// if possible.

pp$2.toAssignable = function(node, isBinding) {
  var this$1 = this;

  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
      case "Identifier":
      if (this.inAsync && node.name === "await")
        this.raise(node.start, "Can not use 'await' as identifier inside an async function")
      break

    case "ObjectPattern":
    case "ArrayPattern":
      break

    case "ObjectExpression":
      node.type = "ObjectPattern"
      for (var i = 0; i < node.properties.length; i++) {
        var prop = node.properties[i]
        if (prop.kind !== "init") this$1.raise(prop.key.start, "Object pattern can't contain getter or setter")
        this$1.toAssignable(prop.value, isBinding)
      }
      break

    case "ArrayExpression":
      node.type = "ArrayPattern"
      this.toAssignableList(node.elements, isBinding)
      break

    case "AssignmentExpression":
      if (node.operator === "=") {
        node.type = "AssignmentPattern"
        delete node.operator
        this.toAssignable(node.left, isBinding)
        // falls through to AssignmentPattern
      } else {
        this.raise(node.left.end, "Only '=' operator can be used for specifying default value.")
        break
      }

    case "AssignmentPattern":
      break

    case "ParenthesizedExpression":
      node.expression = this.toAssignable(node.expression, isBinding)
      break

    case "MemberExpression":
      if (!isBinding) break

    default:
      this.raise(node.start, "Assigning to rvalue")
    }
  }
  return node
}

// Convert list of expression atoms to binding list.

pp$2.toAssignableList = function(exprList, isBinding) {
  var this$1 = this;

  var end = exprList.length
  if (end) {
    var last = exprList[end - 1]
    if (last && last.type == "RestElement") {
      --end
    } else if (last && last.type == "SpreadElement") {
      last.type = "RestElement"
      var arg = last.argument
      this.toAssignable(arg, isBinding)
      if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern")
        this.unexpected(arg.start)
      --end
    }

    if (isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
      this.unexpected(last.argument.start)
  }
  for (var i = 0; i < end; i++) {
    var elt = exprList[i]
    if (elt) this$1.toAssignable(elt, isBinding)
  }
  return exprList
}

// Parses spread element.

pp$2.parseSpread = function(refDestructuringErrors) {
  var node = this.startNode()
  this.next()
  node.argument = this.parseMaybeAssign(false, refDestructuringErrors)
  return this.finishNode(node, "SpreadElement")
}

pp$2.parseRest = function(allowNonIdent) {
  var node = this.startNode()
  this.next()

  // RestElement inside of a function parameter must be an identifier
  if (allowNonIdent) node.argument = this.type === tt.name ? this.parseIdent() : this.unexpected()
  else node.argument = this.type === tt.name || this.type === tt.bracketL ? this.parseBindingAtom() : this.unexpected()

  return this.finishNode(node, "RestElement")
}

// Parses lvalue (assignable) atom.

pp$2.parseBindingAtom = function() {
  if (this.options.ecmaVersion < 6) return this.parseIdent()
  switch (this.type) {
  case tt.name:
    return this.parseIdent()

  case tt.bracketL:
    var node = this.startNode()
    this.next()
    node.elements = this.parseBindingList(tt.bracketR, true, true)
    return this.finishNode(node, "ArrayPattern")

  case tt.braceL:
    return this.parseObj(true)

  default:
    this.unexpected()
  }
}

pp$2.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowNonIdent) {
  var this$1 = this;

  var elts = [], first = true
  while (!this.eat(close)) {
    if (first) first = false
    else this$1.expect(tt.comma)
    if (allowEmpty && this$1.type === tt.comma) {
      elts.push(null)
    } else if (allowTrailingComma && this$1.afterTrailingComma(close)) {
      break
    } else if (this$1.type === tt.ellipsis) {
      var rest = this$1.parseRest(allowNonIdent)
      this$1.parseBindingListItem(rest)
      elts.push(rest)
      if (this$1.type === tt.comma) this$1.raise(this$1.start, "Comma is not permitted after the rest element")
      this$1.expect(close)
      break
    } else {
      var elem = this$1.parseMaybeDefault(this$1.start, this$1.startLoc)
      this$1.parseBindingListItem(elem)
      elts.push(elem)
    }
  }
  return elts
}

pp$2.parseBindingListItem = function(param) {
  return param
}

// Parses assignment pattern around given atom if possible.

pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
  left = left || this.parseBindingAtom()
  if (this.options.ecmaVersion < 6 || !this.eat(tt.eq)) return left
  var node = this.startNodeAt(startPos, startLoc)
  node.left = left
  node.right = this.parseMaybeAssign()
  return this.finishNode(node, "AssignmentPattern")
}

// Verify that a node is an lval — something that can be assigned
// to.

pp$2.checkLVal = function(expr, isBinding, checkClashes) {
  var this$1 = this;

  switch (expr.type) {
  case "Identifier":
    if (this.strict && this.reservedWordsStrictBind.test(expr.name))
      this.raiseRecoverable(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode")
    if (checkClashes) {
      if (has(checkClashes, expr.name))
        this.raiseRecoverable(expr.start, "Argument name clash")
      checkClashes[expr.name] = true
    }
    break

  case "MemberExpression":
    if (isBinding) this.raiseRecoverable(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression")
    break

  case "ObjectPattern":
    for (var i = 0; i < expr.properties.length; i++)
      this$1.checkLVal(expr.properties[i].value, isBinding, checkClashes)
    break

  case "ArrayPattern":
    for (var i$1 = 0; i$1 < expr.elements.length; i$1++) {
      var elem = expr.elements[i$1]
      if (elem) this$1.checkLVal(elem, isBinding, checkClashes)
    }
    break

  case "AssignmentPattern":
    this.checkLVal(expr.left, isBinding, checkClashes)
    break

  case "RestElement":
    this.checkLVal(expr.argument, isBinding, checkClashes)
    break

  case "ParenthesizedExpression":
    this.checkLVal(expr.expression, isBinding, checkClashes)
    break

  default:
    this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " rvalue")
  }
}

// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

var pp$3 = Parser.prototype

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp$3.checkPropClash = function(prop, propHash) {
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
    return
  var key = prop.key;
  var name
  switch (key.type) {
  case "Identifier": name = key.name; break
  case "Literal": name = String(key.value); break
  default: return
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) this.raiseRecoverable(key.start, "Redefinition of __proto__ property")
      propHash.proto = true
    }
    return
  }
  name = "$" + name
  var other = propHash[name]
  if (other) {
    var isGetSet = kind !== "init"
    if ((this.strict || isGetSet) && other[kind] || !(isGetSet ^ other.init))
      this.raiseRecoverable(key.start, "Redefinition of property")
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    }
  }
  other[kind] = true
}

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function(s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initalization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp$3.parseExpression = function(noIn, refDestructuringErrors) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc
  var expr = this.parseMaybeAssign(noIn, refDestructuringErrors)
  if (this.type === tt.comma) {
    var node = this.startNodeAt(startPos, startLoc)
    node.expressions = [expr]
    while (this.eat(tt.comma)) node.expressions.push(this$1.parseMaybeAssign(noIn, refDestructuringErrors))
    return this.finishNode(node, "SequenceExpression")
  }
  return expr
}

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp$3.parseMaybeAssign = function(noIn, refDestructuringErrors, afterLeftParse) {
  if (this.inGenerator && this.isContextual("yield")) return this.parseYield()

  var ownDestructuringErrors = false, oldParenAssign = -1
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign
    refDestructuringErrors.parenthesizedAssign = -1
  } else {
    refDestructuringErrors = new DestructuringErrors
    ownDestructuringErrors = true
  }

  var startPos = this.start, startLoc = this.startLoc
  if (this.type == tt.parenL || this.type == tt.name)
    this.potentialArrowAt = this.start
  var left = this.parseMaybeConditional(noIn, refDestructuringErrors)
  if (afterLeftParse) left = afterLeftParse.call(this, left, startPos, startLoc)
  if (this.type.isAssign) {
    this.checkPatternErrors(refDestructuringErrors, true)
    if (!ownDestructuringErrors) DestructuringErrors.call(refDestructuringErrors)
    var node = this.startNodeAt(startPos, startLoc)
    node.operator = this.value
    node.left = this.type === tt.eq ? this.toAssignable(left) : left
    refDestructuringErrors.shorthandAssign = -1 // reset because shorthand default was used correctly
    this.checkLVal(left)
    this.next()
    node.right = this.parseMaybeAssign(noIn)
    return this.finishNode(node, "AssignmentExpression")
  } else {
    if (ownDestructuringErrors) this.checkExpressionErrors(refDestructuringErrors, true)
  }
  if (oldParenAssign > -1) refDestructuringErrors.parenthesizedAssign = oldParenAssign
  return left
}

// Parse a ternary conditional (`?:`) operator.

pp$3.parseMaybeConditional = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc
  var expr = this.parseExprOps(noIn, refDestructuringErrors)
  if (this.checkExpressionErrors(refDestructuringErrors)) return expr
  if (this.eat(tt.question)) {
    var node = this.startNodeAt(startPos, startLoc)
    node.test = expr
    node.consequent = this.parseMaybeAssign()
    this.expect(tt.colon)
    node.alternate = this.parseMaybeAssign(noIn)
    return this.finishNode(node, "ConditionalExpression")
  }
  return expr
}

// Start the precedence parser.

pp$3.parseExprOps = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc
  var expr = this.parseMaybeUnary(refDestructuringErrors, false)
  if (this.checkExpressionErrors(refDestructuringErrors)) return expr
  return this.parseExprOp(expr, startPos, startLoc, -1, noIn)
}

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
  var prec = this.type.binop
  if (prec != null && (!noIn || this.type !== tt._in)) {
    if (prec > minPrec) {
      var logical = this.type === tt.logicalOR || this.type === tt.logicalAND
      var op = this.value
      this.next()
      var startPos = this.start, startLoc = this.startLoc
      var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn)
      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical)
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn)
    }
  }
  return left
}

pp$3.buildBinary = function(startPos, startLoc, left, right, op, logical) {
  var node = this.startNodeAt(startPos, startLoc)
  node.left = left
  node.operator = op
  node.right = right
  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
}

// Parse unary operators, both prefix and postfix.

pp$3.parseMaybeUnary = function(refDestructuringErrors, sawUnary) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc, expr
  if (this.inAsync && this.isContextual("await")) {
    expr = this.parseAwait(refDestructuringErrors)
    sawUnary = true
  } else if (this.type.prefix) {
    var node = this.startNode(), update = this.type === tt.incDec
    node.operator = this.value
    node.prefix = true
    this.next()
    node.argument = this.parseMaybeUnary(null, true)
    this.checkExpressionErrors(refDestructuringErrors, true)
    if (update) this.checkLVal(node.argument)
    else if (this.strict && node.operator === "delete" &&
             node.argument.type === "Identifier")
      this.raiseRecoverable(node.start, "Deleting local variable in strict mode")
    else sawUnary = true
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression")
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors)
    if (this.checkExpressionErrors(refDestructuringErrors)) return expr
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this$1.startNodeAt(startPos, startLoc)
      node$1.operator = this$1.value
      node$1.prefix = false
      node$1.argument = expr
      this$1.checkLVal(expr)
      this$1.next()
      expr = this$1.finishNode(node$1, "UpdateExpression")
    }
  }

  if (!sawUnary && this.eat(tt.starstar))
    return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false)
  else
    return expr
}

// Parse call, dot, and `[]`-subscript expressions.

pp$3.parseExprSubscripts = function(refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc
  var expr = this.parseExprAtom(refDestructuringErrors)
  var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")"
  if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) return expr
  var result = this.parseSubscripts(expr, startPos, startLoc)
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) refDestructuringErrors.parenthesizedAssign = -1
    if (refDestructuringErrors.parenthesizedBind >= result.start) refDestructuringErrors.parenthesizedBind = -1
  }
  return result
}

pp$3.parseSubscripts = function(base, startPos, startLoc, noCalls) {
  var this$1 = this;

  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" &&
      this.lastTokEnd == base.end && !this.canInsertSemicolon()
  for (var computed;;) {
    if ((computed = this$1.eat(tt.bracketL)) || this$1.eat(tt.dot)) {
      var node = this$1.startNodeAt(startPos, startLoc)
      node.object = base
      node.property = computed ? this$1.parseExpression() : this$1.parseIdent(true)
      node.computed = !!computed
      if (computed) this$1.expect(tt.bracketR)
      base = this$1.finishNode(node, "MemberExpression")
    } else if (!noCalls && this$1.eat(tt.parenL)) {
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this$1.yieldPos, oldAwaitPos = this$1.awaitPos
      this$1.yieldPos = 0
      this$1.awaitPos = 0
      var exprList = this$1.parseExprList(tt.parenR, this$1.options.ecmaVersion >= 8, false, refDestructuringErrors)
      if (maybeAsyncArrow && !this$1.canInsertSemicolon() && this$1.eat(tt.arrow)) {
        this$1.checkPatternErrors(refDestructuringErrors, false)
        this$1.checkYieldAwaitInDefaultParams()
        this$1.yieldPos = oldYieldPos
        this$1.awaitPos = oldAwaitPos
        return this$1.parseArrowExpression(this$1.startNodeAt(startPos, startLoc), exprList, true)
      }
      this$1.checkExpressionErrors(refDestructuringErrors, true)
      this$1.yieldPos = oldYieldPos || this$1.yieldPos
      this$1.awaitPos = oldAwaitPos || this$1.awaitPos
      var node$1 = this$1.startNodeAt(startPos, startLoc)
      node$1.callee = base
      node$1.arguments = exprList
      base = this$1.finishNode(node$1, "CallExpression")
    } else if (this$1.type === tt.backQuote) {
      var node$2 = this$1.startNodeAt(startPos, startLoc)
      node$2.tag = base
      node$2.quasi = this$1.parseTemplate()
      base = this$1.finishNode(node$2, "TaggedTemplateExpression")
    } else {
      return base
    }
  }
}

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp$3.parseExprAtom = function(refDestructuringErrors) {
  var node, canBeArrow = this.potentialArrowAt == this.start
  switch (this.type) {
  case tt._super:
    if (!this.inFunction)
      this.raise(this.start, "'super' outside of function or class")

  case tt._this:
    var type = this.type === tt._this ? "ThisExpression" : "Super"
    node = this.startNode()
    this.next()
    return this.finishNode(node, type)

  case tt.name:
    var startPos = this.start, startLoc = this.startLoc
    var id = this.parseIdent(this.type !== tt.name)
    if (this.options.ecmaVersion >= 8 && id.name === "async" && !this.canInsertSemicolon() && this.eat(tt._function))
      return this.parseFunction(this.startNodeAt(startPos, startLoc), false, false, true)
    if (canBeArrow && !this.canInsertSemicolon()) {
      if (this.eat(tt.arrow))
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false)
      if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === tt.name) {
        id = this.parseIdent()
        if (this.canInsertSemicolon() || !this.eat(tt.arrow))
          this.unexpected()
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true)
      }
    }
    return id

  case tt.regexp:
    var value = this.value
    node = this.parseLiteral(value.value)
    node.regex = {pattern: value.pattern, flags: value.flags}
    return node

  case tt.num: case tt.string:
    return this.parseLiteral(this.value)

  case tt._null: case tt._true: case tt._false:
    node = this.startNode()
    node.value = this.type === tt._null ? null : this.type === tt._true
    node.raw = this.type.keyword
    this.next()
    return this.finishNode(node, "Literal")

  case tt.parenL:
    var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow)
    if (refDestructuringErrors) {
      if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
        refDestructuringErrors.parenthesizedAssign = start
      if (refDestructuringErrors.parenthesizedBind < 0)
        refDestructuringErrors.parenthesizedBind = start
    }
    return expr

  case tt.bracketL:
    node = this.startNode()
    this.next()
    node.elements = this.parseExprList(tt.bracketR, true, true, refDestructuringErrors)
    return this.finishNode(node, "ArrayExpression")

  case tt.braceL:
    return this.parseObj(false, refDestructuringErrors)

  case tt._function:
    node = this.startNode()
    this.next()
    return this.parseFunction(node, false)

  case tt._class:
    return this.parseClass(this.startNode(), false)

  case tt._new:
    return this.parseNew()

  case tt.backQuote:
    return this.parseTemplate()

  default:
    this.unexpected()
  }
}

pp$3.parseLiteral = function(value) {
  var node = this.startNode()
  node.value = value
  node.raw = this.input.slice(this.start, this.end)
  this.next()
  return this.finishNode(node, "Literal")
}

pp$3.parseParenExpression = function() {
  this.expect(tt.parenL)
  var val = this.parseExpression()
  this.expect(tt.parenR)
  return val
}

pp$3.parseParenAndDistinguishExpression = function(canBeArrow) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8
  if (this.options.ecmaVersion >= 6) {
    this.next()

    var innerStartPos = this.start, innerStartLoc = this.startLoc
    var exprList = [], first = true, lastIsComma = false
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart, innerParenStart
    this.yieldPos = 0
    this.awaitPos = 0
    while (this.type !== tt.parenR) {
      first ? first = false : this$1.expect(tt.comma)
      if (allowTrailingComma && this$1.afterTrailingComma(tt.parenR, true)) {
        lastIsComma = true
        break
      } else if (this$1.type === tt.ellipsis) {
        spreadStart = this$1.start
        exprList.push(this$1.parseParenItem(this$1.parseRest()))
        if (this$1.type === tt.comma) this$1.raise(this$1.start, "Comma is not permitted after the rest element")
        break
      } else {
        if (this$1.type === tt.parenL && !innerParenStart) {
          innerParenStart = this$1.start
        }
        exprList.push(this$1.parseMaybeAssign(false, refDestructuringErrors, this$1.parseParenItem))
      }
    }
    var innerEndPos = this.start, innerEndLoc = this.startLoc
    this.expect(tt.parenR)

    if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false)
      this.checkYieldAwaitInDefaultParams()
      if (innerParenStart) this.unexpected(innerParenStart)
      this.yieldPos = oldYieldPos
      this.awaitPos = oldAwaitPos
      return this.parseParenArrowList(startPos, startLoc, exprList)
    }

    if (!exprList.length || lastIsComma) this.unexpected(this.lastTokStart)
    if (spreadStart) this.unexpected(spreadStart)
    this.checkExpressionErrors(refDestructuringErrors, true)
    this.yieldPos = oldYieldPos || this.yieldPos
    this.awaitPos = oldAwaitPos || this.awaitPos

    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc)
      val.expressions = exprList
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc)
    } else {
      val = exprList[0]
    }
  } else {
    val = this.parseParenExpression()
  }

  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc)
    par.expression = val
    return this.finishNode(par, "ParenthesizedExpression")
  } else {
    return val
  }
}

pp$3.parseParenItem = function(item) {
  return item
}

pp$3.parseParenArrowList = function(startPos, startLoc, exprList) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList)
}

// New's precedence is slightly tricky. It must allow its argument to
// be a `[]` or dot subscript expression, but not a call — at least,
// not without wrapping it in parentheses. Thus, it uses the noCalls
// argument to parseSubscripts to prevent it from consuming the
// argument list.

var empty$1 = []

pp$3.parseNew = function() {
  var node = this.startNode()
  var meta = this.parseIdent(true)
  if (this.options.ecmaVersion >= 6 && this.eat(tt.dot)) {
    node.meta = meta
    node.property = this.parseIdent(true)
    if (node.property.name !== "target")
      this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target")
    if (!this.inFunction)
      this.raiseRecoverable(node.start, "new.target can only be used in functions")
    return this.finishNode(node, "MetaProperty")
  }
  var startPos = this.start, startLoc = this.startLoc
  node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true)
  if (this.eat(tt.parenL)) node.arguments = this.parseExprList(tt.parenR, this.options.ecmaVersion >= 8, false)
  else node.arguments = empty$1
  return this.finishNode(node, "NewExpression")
}

// Parse template expression.

pp$3.parseTemplateElement = function() {
  var elem = this.startNode()
  elem.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, '\n'),
    cooked: this.value
  }
  this.next()
  elem.tail = this.type === tt.backQuote
  return this.finishNode(elem, "TemplateElement")
}

pp$3.parseTemplate = function() {
  var this$1 = this;

  var node = this.startNode()
  this.next()
  node.expressions = []
  var curElt = this.parseTemplateElement()
  node.quasis = [curElt]
  while (!curElt.tail) {
    this$1.expect(tt.dollarBraceL)
    node.expressions.push(this$1.parseExpression())
    this$1.expect(tt.braceR)
    node.quasis.push(curElt = this$1.parseTemplateElement())
  }
  this.next()
  return this.finishNode(node, "TemplateLiteral")
}

// Parse an object literal or binding pattern.

pp$3.parseObj = function(isPattern, refDestructuringErrors) {
  var this$1 = this;

  var node = this.startNode(), first = true, propHash = {}
  node.properties = []
  this.next()
  while (!this.eat(tt.braceR)) {
    if (!first) {
      this$1.expect(tt.comma)
      if (this$1.afterTrailingComma(tt.braceR)) break
    } else first = false

    var prop = this$1.startNode(), isGenerator, isAsync, startPos, startLoc
    if (this$1.options.ecmaVersion >= 6) {
      prop.method = false
      prop.shorthand = false
      if (isPattern || refDestructuringErrors) {
        startPos = this$1.start
        startLoc = this$1.startLoc
      }
      if (!isPattern)
        isGenerator = this$1.eat(tt.star)
    }
    this$1.parsePropertyName(prop)
    if (!isPattern && this$1.options.ecmaVersion >= 8 && !isGenerator && !prop.computed &&
        prop.key.type === "Identifier" && prop.key.name === "async" && this$1.type !== tt.parenL &&
        this$1.type !== tt.colon && !this$1.canInsertSemicolon()) {
      isAsync = true
      this$1.parsePropertyName(prop, refDestructuringErrors)
    } else {
      isAsync = false
    }
    this$1.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors)
    this$1.checkPropClash(prop, propHash)
    node.properties.push(this$1.finishNode(prop, "Property"))
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
}

pp$3.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors) {
  if ((isGenerator || isAsync) && this.type === tt.colon)
    this.unexpected()

  if (this.eat(tt.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors)
    prop.kind = "init"
  } else if (this.options.ecmaVersion >= 6 && this.type === tt.parenL) {
    if (isPattern) this.unexpected()
    prop.kind = "init"
    prop.method = true
    prop.value = this.parseMethod(isGenerator, isAsync)
  } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
             (prop.key.name === "get" || prop.key.name === "set") &&
             (this.type != tt.comma && this.type != tt.braceR)) {
    if (isGenerator || isAsync || isPattern) this.unexpected()
    prop.kind = prop.key.name
    this.parsePropertyName(prop)
    prop.value = this.parseMethod(false)
    var paramCount = prop.kind === "get" ? 0 : 1
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start
      if (prop.kind === "get")
        this.raiseRecoverable(start, "getter should have no params")
      else
        this.raiseRecoverable(start, "setter should have exactly one param")
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
        this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params")
    }
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    if (this.keywords.test(prop.key.name) ||
        (this.strict ? this.reservedWordsStrict : this.reservedWords).test(prop.key.name) ||
        (this.inGenerator && prop.key.name == "yield") ||
        (this.inAsync && prop.key.name == "await"))
      this.raiseRecoverable(prop.key.start, "'" + prop.key.name + "' can not be used as shorthand property")
    prop.kind = "init"
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key)
    } else if (this.type === tt.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0)
        refDestructuringErrors.shorthandAssign = this.start
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key)
    } else {
      prop.value = prop.key
    }
    prop.shorthand = true
  } else this.unexpected()
}

pp$3.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(tt.bracketL)) {
      prop.computed = true
      prop.key = this.parseMaybeAssign()
      this.expect(tt.bracketR)
      return prop.key
    } else {
      prop.computed = false
    }
  }
  return prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent(true)
}

// Initialize empty function node.

pp$3.initFunction = function(node) {
  node.id = null
  if (this.options.ecmaVersion >= 6) {
    node.generator = false
    node.expression = false
  }
  if (this.options.ecmaVersion >= 8)
    node.async = false
}

// Parse object or class method.

pp$3.parseMethod = function(isGenerator, isAsync) {
  var node = this.startNode(), oldInGen = this.inGenerator, oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction

  this.initFunction(node)
  if (this.options.ecmaVersion >= 6)
    node.generator = isGenerator
  if (this.options.ecmaVersion >= 8)
    node.async = !!isAsync

  this.inGenerator = node.generator
  this.inAsync = node.async
  this.yieldPos = 0
  this.awaitPos = 0
  this.inFunction = true

  this.expect(tt.parenL)
  node.params = this.parseBindingList(tt.parenR, false, this.options.ecmaVersion >= 8)
  this.checkYieldAwaitInDefaultParams()
  this.parseFunctionBody(node, false)

  this.inGenerator = oldInGen
  this.inAsync = oldInAsync
  this.yieldPos = oldYieldPos
  this.awaitPos = oldAwaitPos
  this.inFunction = oldInFunc
  return this.finishNode(node, "FunctionExpression")
}

// Parse arrow function expression with given parameters.

pp$3.parseArrowExpression = function(node, params, isAsync) {
  var oldInGen = this.inGenerator, oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction

  this.initFunction(node)
  if (this.options.ecmaVersion >= 8)
    node.async = !!isAsync

  this.inGenerator = false
  this.inAsync = node.async
  this.yieldPos = 0
  this.awaitPos = 0
  this.inFunction = true

  node.params = this.toAssignableList(params, true)
  this.parseFunctionBody(node, true)

  this.inGenerator = oldInGen
  this.inAsync = oldInAsync
  this.yieldPos = oldYieldPos
  this.awaitPos = oldAwaitPos
  this.inFunction = oldInFunc
  return this.finishNode(node, "ArrowFunctionExpression")
}

// Parse function body and check parameters.

pp$3.parseFunctionBody = function(node, isArrowFunction) {
  var isExpression = isArrowFunction && this.type !== tt.braceL
  var oldStrict = this.strict, useStrict = false

  if (isExpression) {
    node.body = this.parseMaybeAssign()
    node.expression = true
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params)
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end)
      // If this is a strict mode function, verify that argument names
      // are not repeated, and it does not try to bind the words `eval`
      // or `arguments`.
      if (useStrict && nonSimple)
        this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list")
    }
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldLabels = this.labels
    this.labels = []
    if (useStrict) this.strict = true
    node.body = this.parseBlock(true)
    node.expression = false
    this.labels = oldLabels
  }

  if (oldStrict || useStrict) {
    this.strict = true
    if (node.id)
      this.checkLVal(node.id, true)
    this.checkParams(node)
    this.strict = oldStrict
  } else if (isArrowFunction || !this.isSimpleParamList(node.params)) {
    this.checkParams(node)
  }
}

pp$3.isSimpleParamList = function(params) {
  for (var i = 0; i < params.length; i++)
    if (params[i].type !== "Identifier") return false
  return true
}

// Checks function params for various disallowed patterns such as using "eval"
// or "arguments" and duplicate parameters.

pp$3.checkParams = function(node) {
  var this$1 = this;

  var nameHash = {}
  for (var i = 0; i < node.params.length; i++) this$1.checkLVal(node.params[i], true, nameHash)
}

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp$3.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var this$1 = this;

  var elts = [], first = true
  while (!this.eat(close)) {
    if (!first) {
      this$1.expect(tt.comma)
      if (allowTrailingComma && this$1.afterTrailingComma(close)) break
    } else first = false

    var elt
    if (allowEmpty && this$1.type === tt.comma)
      elt = null
    else if (this$1.type === tt.ellipsis) {
      elt = this$1.parseSpread(refDestructuringErrors)
      if (refDestructuringErrors && this$1.type === tt.comma && refDestructuringErrors.trailingComma < 0)
        refDestructuringErrors.trailingComma = this$1.start
    } else {
      elt = this$1.parseMaybeAssign(false, refDestructuringErrors)
    }
    elts.push(elt)
  }
  return elts
}

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp$3.parseIdent = function(liberal) {
  var node = this.startNode()
  if (liberal && this.options.allowReserved == "never") liberal = false
  if (this.type === tt.name) {
    if (!liberal && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(this.value) &&
        (this.options.ecmaVersion >= 6 ||
         this.input.slice(this.start, this.end).indexOf("\\") == -1))
      this.raiseRecoverable(this.start, "The keyword '" + this.value + "' is reserved")
    if (this.inGenerator && this.value === "yield")
      this.raiseRecoverable(this.start, "Can not use 'yield' as identifier inside a generator")
    if (this.inAsync && this.value === "await")
      this.raiseRecoverable(this.start, "Can not use 'await' as identifier inside an async function")
    node.name = this.value
  } else if (liberal && this.type.keyword) {
    node.name = this.type.keyword
  } else {
    this.unexpected()
  }
  this.next()
  return this.finishNode(node, "Identifier")
}

// Parses yield expression inside generator.

pp$3.parseYield = function() {
  if (!this.yieldPos) this.yieldPos = this.start

  var node = this.startNode()
  this.next()
  if (this.type == tt.semi || this.canInsertSemicolon() || (this.type != tt.star && !this.type.startsExpr)) {
    node.delegate = false
    node.argument = null
  } else {
    node.delegate = this.eat(tt.star)
    node.argument = this.parseMaybeAssign()
  }
  return this.finishNode(node, "YieldExpression")
}

pp$3.parseAwait = function() {
  if (!this.awaitPos) this.awaitPos = this.start

  var node = this.startNode()
  this.next()
  node.argument = this.parseMaybeUnary(null, true)
  return this.finishNode(node, "AwaitExpression")
}

var pp$4 = Parser.prototype

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp$4.raise = function(pos, message) {
  var loc = getLineInfo(this.input, pos)
  message += " (" + loc.line + ":" + loc.column + ")"
  var err = new SyntaxError(message)
  err.pos = pos; err.loc = loc; err.raisedAt = this.pos
  throw err
}

pp$4.raiseRecoverable = pp$4.raise

pp$4.curPosition = function() {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart)
  }
}

var Node = function Node(parser, pos, loc) {
  this.type = ""
  this.start = pos
  this.end = 0
  if (parser.options.locations)
    this.loc = new SourceLocation(parser, loc)
  if (parser.options.directSourceFile)
    this.sourceFile = parser.options.directSourceFile
  if (parser.options.ranges)
    this.range = [pos, 0]
};

// Start an AST node, attaching a start offset.

var pp$5 = Parser.prototype

pp$5.startNode = function() {
  return new Node(this, this.start, this.startLoc)
}

pp$5.startNodeAt = function(pos, loc) {
  return new Node(this, pos, loc)
}

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node, type, pos, loc) {
  node.type = type
  node.end = pos
  if (this.options.locations)
    node.loc.end = loc
  if (this.options.ranges)
    node.range[1] = pos
  return node
}

pp$5.finishNode = function(node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
}

// Finish node at given position

pp$5.finishNodeAt = function(node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc)
}

// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design

var TokContext = function TokContext(token, isExpr, preserveSpace, override) {
  this.token = token
  this.isExpr = !!isExpr
  this.preserveSpace = !!preserveSpace
  this.override = override
};

var types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", true),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function (p) { return p.readTmplToken(); }),
  f_expr: new TokContext("function", true)
}

var pp$6 = Parser.prototype

pp$6.initialContext = function() {
  return [types.b_stat]
}

pp$6.braceIsBlock = function(prevType) {
  if (prevType === tt.colon) {
    var parent = this.curContext()
    if (parent === types.b_stat || parent === types.b_expr)
      return !parent.isExpr
  }
  if (prevType === tt._return)
    return lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
  if (prevType === tt._else || prevType === tt.semi || prevType === tt.eof || prevType === tt.parenR)
    return true
  if (prevType == tt.braceL)
    return this.curContext() === types.b_stat
  return !this.exprAllowed
}

pp$6.updateContext = function(prevType) {
  var update, type = this.type
  if (type.keyword && prevType == tt.dot)
    this.exprAllowed = false
  else if (update = type.updateContext)
    update.call(this, prevType)
  else
    this.exprAllowed = type.beforeExpr
}

// Token-specific context update code

tt.parenR.updateContext = tt.braceR.updateContext = function() {
  if (this.context.length == 1) {
    this.exprAllowed = true
    return
  }
  var out = this.context.pop()
  if (out === types.b_stat && this.curContext() === types.f_expr) {
    this.context.pop()
    this.exprAllowed = false
  } else if (out === types.b_tmpl) {
    this.exprAllowed = true
  } else {
    this.exprAllowed = !out.isExpr
  }
}

tt.braceL.updateContext = function(prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr)
  this.exprAllowed = true
}

tt.dollarBraceL.updateContext = function() {
  this.context.push(types.b_tmpl)
  this.exprAllowed = true
}

tt.parenL.updateContext = function(prevType) {
  var statementParens = prevType === tt._if || prevType === tt._for || prevType === tt._with || prevType === tt._while
  this.context.push(statementParens ? types.p_stat : types.p_expr)
  this.exprAllowed = true
}

tt.incDec.updateContext = function() {
  // tokExprAllowed stays unchanged
}

tt._function.updateContext = function(prevType) {
  if (prevType.beforeExpr && prevType !== tt.semi && prevType !== tt._else &&
      !((prevType === tt.colon || prevType === tt.braceL) && this.curContext() === types.b_stat))
    this.context.push(types.f_expr)
  this.exprAllowed = false
}

tt.backQuote.updateContext = function() {
  if (this.curContext() === types.q_tmpl)
    this.context.pop()
  else
    this.context.push(types.q_tmpl)
  this.exprAllowed = false
}

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(p) {
  this.type = p.type
  this.value = p.value
  this.start = p.start
  this.end = p.end
  if (p.options.locations)
    this.loc = new SourceLocation(p, p.startLoc, p.endLoc)
  if (p.options.ranges)
    this.range = [p.start, p.end]
};

// ## Tokenizer

var pp$7 = Parser.prototype

// Are we running under Rhino?
var isRhino = typeof Packages == "object" && Object.prototype.toString.call(Packages) == "[object JavaPackage]"

// Move to the next token

pp$7.next = function() {
  if (this.options.onToken)
    this.options.onToken(new Token(this))

  this.lastTokEnd = this.end
  this.lastTokStart = this.start
  this.lastTokEndLoc = this.endLoc
  this.lastTokStartLoc = this.startLoc
  this.nextToken()
}

pp$7.getToken = function() {
  this.next()
  return new Token(this)
}

// If we're in an ES6 environment, make parsers iterable
if (typeof Symbol !== "undefined")
  pp$7[Symbol.iterator] = function () {
    var self = this
    return {next: function () {
      var token = self.getToken()
      return {
        done: token.type === tt.eof,
        value: token
      }
    }}
  }

// Toggle strict mode. Re-reads the next number or string to please
// pedantic tests (`"use strict"; 010;` should fail).

pp$7.curContext = function() {
  return this.context[this.context.length - 1]
}

// Read a single token, updating the parser object's token-related
// properties.

pp$7.nextToken = function() {
  var curContext = this.curContext()
  if (!curContext || !curContext.preserveSpace) this.skipSpace()

  this.start = this.pos
  if (this.options.locations) this.startLoc = this.curPosition()
  if (this.pos >= this.input.length) return this.finishToken(tt.eof)

  if (curContext.override) return curContext.override(this)
  else this.readToken(this.fullCharCodeAtPos())
}

pp$7.readToken = function(code) {
  // Identifier or keyword. '\uXXXX' sequences are allowed in
  // identifiers, so '\' also dispatches to that.
  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
    return this.readWord()

  return this.getTokenFromCode(code)
}

pp$7.fullCharCodeAtPos = function() {
  var code = this.input.charCodeAt(this.pos)
  if (code <= 0xd7ff || code >= 0xe000) return code
  var next = this.input.charCodeAt(this.pos + 1)
  return (code << 10) + next - 0x35fdc00
}

pp$7.skipBlockComment = function() {
  var this$1 = this;

  var startLoc = this.options.onComment && this.curPosition()
  var start = this.pos, end = this.input.indexOf("*/", this.pos += 2)
  if (end === -1) this.raise(this.pos - 2, "Unterminated comment")
  this.pos = end + 2
  if (this.options.locations) {
    lineBreakG.lastIndex = start
    var match
    while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
      ++this$1.curLine
      this$1.lineStart = match.index + match[0].length
    }
  }
  if (this.options.onComment)
    this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                           startLoc, this.curPosition())
}

pp$7.skipLineComment = function(startSkip) {
  var this$1 = this;

  var start = this.pos
  var startLoc = this.options.onComment && this.curPosition()
  var ch = this.input.charCodeAt(this.pos+=startSkip)
  while (this.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
    ++this$1.pos
    ch = this$1.input.charCodeAt(this$1.pos)
  }
  if (this.options.onComment)
    this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                           startLoc, this.curPosition())
}

// Called at the start of the parse and after every token. Skips
// whitespace and comments, and.

pp$7.skipSpace = function() {
  var this$1 = this;

  loop: while (this.pos < this.input.length) {
    var ch = this$1.input.charCodeAt(this$1.pos)
    switch (ch) {
      case 32: case 160: // ' '
        ++this$1.pos
        break
      case 13:
        if (this$1.input.charCodeAt(this$1.pos + 1) === 10) {
          ++this$1.pos
        }
      case 10: case 8232: case 8233:
        ++this$1.pos
        if (this$1.options.locations) {
          ++this$1.curLine
          this$1.lineStart = this$1.pos
        }
        break
      case 47: // '/'
        switch (this$1.input.charCodeAt(this$1.pos + 1)) {
          case 42: // '*'
            this$1.skipBlockComment()
            break
          case 47:
            this$1.skipLineComment(2)
            break
          default:
            break loop
        }
        break
      default:
        if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
          ++this$1.pos
        } else {
          break loop
        }
    }
  }
}

// Called at the end of every token. Sets `end`, `val`, and
// maintains `context` and `exprAllowed`, and skips the space after
// the token, so that the next one's `start` will point at the
// right position.

pp$7.finishToken = function(type, val) {
  this.end = this.pos
  if (this.options.locations) this.endLoc = this.curPosition()
  var prevType = this.type
  this.type = type
  this.value = val

  this.updateContext(prevType)
}

// ### Token reading

// This is the function that is called to fetch the next token. It
// is somewhat obscure, because it works in character codes rather
// than characters, and because operator parsing has been inlined
// into it.
//
// All in the name of speed.
//
pp$7.readToken_dot = function() {
  var next = this.input.charCodeAt(this.pos + 1)
  if (next >= 48 && next <= 57) return this.readNumber(true)
  var next2 = this.input.charCodeAt(this.pos + 2)
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
    this.pos += 3
    return this.finishToken(tt.ellipsis)
  } else {
    ++this.pos
    return this.finishToken(tt.dot)
  }
}

pp$7.readToken_slash = function() { // '/'
  var next = this.input.charCodeAt(this.pos + 1)
  if (this.exprAllowed) {++this.pos; return this.readRegexp()}
  if (next === 61) return this.finishOp(tt.assign, 2)
  return this.finishOp(tt.slash, 1)
}

pp$7.readToken_mult_modulo_exp = function(code) { // '%*'
  var next = this.input.charCodeAt(this.pos + 1)
  var size = 1
  var tokentype = code === 42 ? tt.star : tt.modulo

  // exponentiation operator ** and **=
  if (this.options.ecmaVersion >= 7 && next === 42) {
    ++size
    tokentype = tt.starstar
    next = this.input.charCodeAt(this.pos + 2)
  }

  if (next === 61) return this.finishOp(tt.assign, size + 1)
  return this.finishOp(tokentype, size)
}

pp$7.readToken_pipe_amp = function(code) { // '|&'
  var next = this.input.charCodeAt(this.pos + 1)
  if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2)
  if (next === 61) return this.finishOp(tt.assign, 2)
  return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1)
}

pp$7.readToken_caret = function() { // '^'
  var next = this.input.charCodeAt(this.pos + 1)
  if (next === 61) return this.finishOp(tt.assign, 2)
  return this.finishOp(tt.bitwiseXOR, 1)
}

pp$7.readToken_plus_min = function(code) { // '+-'
  var next = this.input.charCodeAt(this.pos + 1)
  if (next === code) {
    if (next == 45 && this.input.charCodeAt(this.pos + 2) == 62 &&
        lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) {
      // A `-->` line comment
      this.skipLineComment(3)
      this.skipSpace()
      return this.nextToken()
    }
    return this.finishOp(tt.incDec, 2)
  }
  if (next === 61) return this.finishOp(tt.assign, 2)
  return this.finishOp(tt.plusMin, 1)
}

pp$7.readToken_lt_gt = function(code) { // '<>'
  var next = this.input.charCodeAt(this.pos + 1)
  var size = 1
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2
    if (this.input.charCodeAt(this.pos + size) === 61) return this.finishOp(tt.assign, size + 1)
    return this.finishOp(tt.bitShift, size)
  }
  if (next == 33 && code == 60 && this.input.charCodeAt(this.pos + 2) == 45 &&
      this.input.charCodeAt(this.pos + 3) == 45) {
    if (this.inModule) this.unexpected()
    // `<!--`, an XML-style comment that should be interpreted as a line comment
    this.skipLineComment(4)
    this.skipSpace()
    return this.nextToken()
  }
  if (next === 61) size = 2
  return this.finishOp(tt.relational, size)
}

pp$7.readToken_eq_excl = function(code) { // '=!'
  var next = this.input.charCodeAt(this.pos + 1)
  if (next === 61) return this.finishOp(tt.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2)
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
    this.pos += 2
    return this.finishToken(tt.arrow)
  }
  return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1)
}

pp$7.getTokenFromCode = function(code) {
  switch (code) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
  case 46: // '.'
    return this.readToken_dot()

    // Punctuation tokens.
  case 40: ++this.pos; return this.finishToken(tt.parenL)
  case 41: ++this.pos; return this.finishToken(tt.parenR)
  case 59: ++this.pos; return this.finishToken(tt.semi)
  case 44: ++this.pos; return this.finishToken(tt.comma)
  case 91: ++this.pos; return this.finishToken(tt.bracketL)
  case 93: ++this.pos; return this.finishToken(tt.bracketR)
  case 123: ++this.pos; return this.finishToken(tt.braceL)
  case 125: ++this.pos; return this.finishToken(tt.braceR)
  case 58: ++this.pos; return this.finishToken(tt.colon)
  case 63: ++this.pos; return this.finishToken(tt.question)

  case 96: // '`'
    if (this.options.ecmaVersion < 6) break
    ++this.pos
    return this.finishToken(tt.backQuote)

  case 48: // '0'
    var next = this.input.charCodeAt(this.pos + 1)
    if (next === 120 || next === 88) return this.readRadixNumber(16) // '0x', '0X' - hex number
    if (this.options.ecmaVersion >= 6) {
      if (next === 111 || next === 79) return this.readRadixNumber(8) // '0o', '0O' - octal number
      if (next === 98 || next === 66) return this.readRadixNumber(2) // '0b', '0B' - binary number
    }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
  case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
    return this.readNumber(false)

    // Quotes produce strings.
  case 34: case 39: // '"', "'"
    return this.readString(code)

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

  case 47: // '/'
    return this.readToken_slash()

  case 37: case 42: // '%*'
    return this.readToken_mult_modulo_exp(code)

  case 124: case 38: // '|&'
    return this.readToken_pipe_amp(code)

  case 94: // '^'
    return this.readToken_caret()

  case 43: case 45: // '+-'
    return this.readToken_plus_min(code)

  case 60: case 62: // '<>'
    return this.readToken_lt_gt(code)

  case 61: case 33: // '=!'
    return this.readToken_eq_excl(code)

  case 126: // '~'
    return this.finishOp(tt.prefix, 1)
  }

  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'")
}

pp$7.finishOp = function(type, size) {
  var str = this.input.slice(this.pos, this.pos + size)
  this.pos += size
  return this.finishToken(type, str)
}

// Parse a regular expression. Some context-awareness is necessary,
// since a '/' inside a '[]' set does not end the expression.

function tryCreateRegexp(src, flags, throwErrorAt, parser) {
  try {
    return new RegExp(src, flags)
  } catch (e) {
    if (throwErrorAt !== undefined) {
      if (e instanceof SyntaxError) parser.raise(throwErrorAt, "Error parsing regular expression: " + e.message)
      throw e
    }
  }
}

var regexpUnicodeSupport = !!tryCreateRegexp("\uffff", "u")

pp$7.readRegexp = function() {
  var this$1 = this;

  var escaped, inClass, start = this.pos
  for (;;) {
    if (this$1.pos >= this$1.input.length) this$1.raise(start, "Unterminated regular expression")
    var ch = this$1.input.charAt(this$1.pos)
    if (lineBreak.test(ch)) this$1.raise(start, "Unterminated regular expression")
    if (!escaped) {
      if (ch === "[") inClass = true
      else if (ch === "]" && inClass) inClass = false
      else if (ch === "/" && !inClass) break
      escaped = ch === "\\"
    } else escaped = false
    ++this$1.pos
  }
  var content = this.input.slice(start, this.pos)
  ++this.pos
  // Need to use `readWord1` because '\uXXXX' sequences are allowed
  // here (don't ask).
  var mods = this.readWord1()
  var tmp = content, tmpFlags = ""
  if (mods) {
    var validFlags = /^[gim]*$/
    if (this.options.ecmaVersion >= 6) validFlags = /^[gimuy]*$/
    if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag")
    if (mods.indexOf("u") >= 0) {
      if (regexpUnicodeSupport) {
        tmpFlags = "u"
      } else {
        // Replace each astral symbol and every Unicode escape sequence that
        // possibly represents an astral symbol or a paired surrogate with a
        // single ASCII symbol to avoid throwing on regular expressions that
        // are only valid in combination with the `/u` flag.
        // Note: replacing with the ASCII symbol `x` might cause false
        // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
        // perfectly valid pattern that is equivalent to `[a-b]`, but it would
        // be replaced by `[x-b]` which throws an error.
        tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, function (_match, code, offset) {
          code = Number("0x" + code)
          if (code > 0x10FFFF) this$1.raise(start + offset + 3, "Code point out of bounds")
          return "x"
        })
        tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x")
        tmpFlags = tmpFlags.replace("u", "")
      }
    }
  }
  // Detect invalid regular expressions.
  var value = null
  // Rhino's regular expression parser is flaky and throws uncatchable exceptions,
  // so don't do detection if we are running under Rhino
  if (!isRhino) {
    tryCreateRegexp(tmp, tmpFlags, start, this)
    // Get a regular expression object for this pattern-flag pair, or `null` in
    // case the current environment doesn't support the flags it uses.
    value = tryCreateRegexp(content, mods)
  }
  return this.finishToken(tt.regexp, {pattern: content, flags: mods, value: value})
}

// Read an integer in the given radix. Return null if zero digits
// were read, the integer value otherwise. When `len` is given, this
// will return `null` unless the integer has exactly `len` digits.

pp$7.readInt = function(radix, len) {
  var this$1 = this;

  var start = this.pos, total = 0
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    var code = this$1.input.charCodeAt(this$1.pos), val
    if (code >= 97) val = code - 97 + 10 // a
    else if (code >= 65) val = code - 65 + 10 // A
    else if (code >= 48 && code <= 57) val = code - 48 // 0-9
    else val = Infinity
    if (val >= radix) break
    ++this$1.pos
    total = total * radix + val
  }
  if (this.pos === start || len != null && this.pos - start !== len) return null

  return total
}

pp$7.readRadixNumber = function(radix) {
  this.pos += 2 // 0x
  var val = this.readInt(radix)
  if (val == null) this.raise(this.start + 2, "Expected number in radix " + radix)
  if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number")
  return this.finishToken(tt.num, val)
}

// Read an integer, octal integer, or floating-point number.

pp$7.readNumber = function(startsWithDot) {
  var start = this.pos, isFloat = false, octal = this.input.charCodeAt(this.pos) === 48
  if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number")
  if (octal && this.pos == start + 1) octal = false
  var next = this.input.charCodeAt(this.pos)
  if (next === 46 && !octal) { // '.'
    ++this.pos
    this.readInt(10)
    isFloat = true
    next = this.input.charCodeAt(this.pos)
  }
  if ((next === 69 || next === 101) && !octal) { // 'eE'
    next = this.input.charCodeAt(++this.pos)
    if (next === 43 || next === 45) ++this.pos // '+-'
    if (this.readInt(10) === null) this.raise(start, "Invalid number")
    isFloat = true
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number")

  var str = this.input.slice(start, this.pos), val
  if (isFloat) val = parseFloat(str)
  else if (!octal || str.length === 1) val = parseInt(str, 10)
  else if (/[89]/.test(str) || this.strict) this.raise(start, "Invalid number")
  else val = parseInt(str, 8)
  return this.finishToken(tt.num, val)
}

// Read a string value, interpreting backslash-escapes.

pp$7.readCodePoint = function() {
  var ch = this.input.charCodeAt(this.pos), code

  if (ch === 123) {
    if (this.options.ecmaVersion < 6) this.unexpected()
    var codePos = ++this.pos
    code = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos)
    ++this.pos
    if (code > 0x10FFFF) this.raise(codePos, "Code point out of bounds")
  } else {
    code = this.readHexChar(4)
  }
  return code
}

function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code)
  code -= 0x10000
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

pp$7.readString = function(quote) {
  var this$1 = this;

  var out = "", chunkStart = ++this.pos
  for (;;) {
    if (this$1.pos >= this$1.input.length) this$1.raise(this$1.start, "Unterminated string constant")
    var ch = this$1.input.charCodeAt(this$1.pos)
    if (ch === quote) break
    if (ch === 92) { // '\'
      out += this$1.input.slice(chunkStart, this$1.pos)
      out += this$1.readEscapedChar(false)
      chunkStart = this$1.pos
    } else {
      if (isNewLine(ch)) this$1.raise(this$1.start, "Unterminated string constant")
      ++this$1.pos
    }
  }
  out += this.input.slice(chunkStart, this.pos++)
  return this.finishToken(tt.string, out)
}

// Reads template string tokens.

pp$7.readTmplToken = function() {
  var this$1 = this;

  var out = "", chunkStart = this.pos
  for (;;) {
    if (this$1.pos >= this$1.input.length) this$1.raise(this$1.start, "Unterminated template")
    var ch = this$1.input.charCodeAt(this$1.pos)
    if (ch === 96 || ch === 36 && this$1.input.charCodeAt(this$1.pos + 1) === 123) { // '`', '${'
      if (this$1.pos === this$1.start && this$1.type === tt.template) {
        if (ch === 36) {
          this$1.pos += 2
          return this$1.finishToken(tt.dollarBraceL)
        } else {
          ++this$1.pos
          return this$1.finishToken(tt.backQuote)
        }
      }
      out += this$1.input.slice(chunkStart, this$1.pos)
      return this$1.finishToken(tt.template, out)
    }
    if (ch === 92) { // '\'
      out += this$1.input.slice(chunkStart, this$1.pos)
      out += this$1.readEscapedChar(true)
      chunkStart = this$1.pos
    } else if (isNewLine(ch)) {
      out += this$1.input.slice(chunkStart, this$1.pos)
      ++this$1.pos
      switch (ch) {
        case 13:
          if (this$1.input.charCodeAt(this$1.pos) === 10) ++this$1.pos
        case 10:
          out += "\n"
          break
        default:
          out += String.fromCharCode(ch)
          break
      }
      if (this$1.options.locations) {
        ++this$1.curLine
        this$1.lineStart = this$1.pos
      }
      chunkStart = this$1.pos
    } else {
      ++this$1.pos
    }
  }
}

// Used to read escaped characters

pp$7.readEscapedChar = function(inTemplate) {
  var ch = this.input.charCodeAt(++this.pos)
  ++this.pos
  switch (ch) {
  case 110: return "\n" // 'n' -> '\n'
  case 114: return "\r" // 'r' -> '\r'
  case 120: return String.fromCharCode(this.readHexChar(2)) // 'x'
  case 117: return codePointToString(this.readCodePoint()) // 'u'
  case 116: return "\t" // 't' -> '\t'
  case 98: return "\b" // 'b' -> '\b'
  case 118: return "\u000b" // 'v' -> '\u000b'
  case 102: return "\f" // 'f' -> '\f'
  case 13: if (this.input.charCodeAt(this.pos) === 10) ++this.pos // '\r\n'
  case 10: // ' \n'
    if (this.options.locations) { this.lineStart = this.pos; ++this.curLine }
    return ""
  default:
    if (ch >= 48 && ch <= 55) {
      var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0]
      var octal = parseInt(octalStr, 8)
      if (octal > 255) {
        octalStr = octalStr.slice(0, -1)
        octal = parseInt(octalStr, 8)
      }
      if (octalStr !== "0" && (this.strict || inTemplate)) {
        this.raise(this.pos - 2, "Octal literal in strict mode")
      }
      this.pos += octalStr.length - 1
      return String.fromCharCode(octal)
    }
    return String.fromCharCode(ch)
  }
}

// Used to read character escape sequences ('\x', '\u', '\U').

pp$7.readHexChar = function(len) {
  var codePos = this.pos
  var n = this.readInt(16, len)
  if (n === null) this.raise(codePos, "Bad character escape sequence")
  return n
}

// Read an identifier, and return it as a string. Sets `this.containsEsc`
// to whether the word contained a '\u' escape.
//
// Incrementally adds only escaped chars, adding other chunks as-is
// as a micro-optimization.

pp$7.readWord1 = function() {
  var this$1 = this;

  this.containsEsc = false
  var word = "", first = true, chunkStart = this.pos
  var astral = this.options.ecmaVersion >= 6
  while (this.pos < this.input.length) {
    var ch = this$1.fullCharCodeAtPos()
    if (isIdentifierChar(ch, astral)) {
      this$1.pos += ch <= 0xffff ? 1 : 2
    } else if (ch === 92) { // "\"
      this$1.containsEsc = true
      word += this$1.input.slice(chunkStart, this$1.pos)
      var escStart = this$1.pos
      if (this$1.input.charCodeAt(++this$1.pos) != 117) // "u"
        this$1.raise(this$1.pos, "Expecting Unicode escape sequence \\uXXXX")
      ++this$1.pos
      var esc = this$1.readCodePoint()
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
        this$1.raise(escStart, "Invalid Unicode escape")
      word += codePointToString(esc)
      chunkStart = this$1.pos
    } else {
      break
    }
    first = false
  }
  return word + this.input.slice(chunkStart, this.pos)
}

// Read an identifier or keyword token. Will check for reserved
// words when necessary.

pp$7.readWord = function() {
  var word = this.readWord1()
  var type = tt.name
  if (this.keywords.test(word)) {
    if (this.containsEsc) this.raiseRecoverable(this.start, "Escape sequence in keyword " + word)
    type = keywordTypes[word]
  }
  return this.finishToken(type, word)
}

// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/ternjs/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/ternjs/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

var version = "4.0.11"

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

function parse(input, options) {
  return new Parser(options, input).parse()
}

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

function parseExpressionAt(input, pos, options) {
  var p = new Parser(options, input, pos)
  p.nextToken()
  return p.parseExpression()
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenizer` export provides an interface to the tokenizer.

function tokenizer(input, options) {
  return new Parser(options, input)
}

// This is a terrible kludge to support the existing, pre-ES6
// interface where the loose parser module retroactively adds exports
// to this module.
function addLooseExports(parse, Parser, plugins) {
  exports.parse_dammit = parse
  exports.LooseParser = Parser
  exports.pluginsLoose = plugins
}

exports.version = version;
exports.parse = parse;
exports.parseExpressionAt = parseExpressionAt;
exports.tokenizer = tokenizer;
exports.addLooseExports = addLooseExports;
exports.Parser = Parser;
exports.plugins = plugins;
exports.defaultOptions = defaultOptions;
exports.Position = Position;
exports.SourceLocation = SourceLocation;
exports.getLineInfo = getLineInfo;
exports.Node = Node;
exports.TokenType = TokenType;
exports.tokTypes = tt;
exports.keywordTypes = keywordTypes;
exports.TokContext = TokContext;
exports.tokContexts = types;
exports.isIdentifierChar = isIdentifierChar;
exports.isIdentifierStart = isIdentifierStart;
exports.Token = Token;
exports.isNewLine = isNewLine;
exports.lineBreak = lineBreak;
exports.lineBreakG = lineBreakG;

Object.defineProperty(exports, '__esModule', { value: true });

})));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var visited = [];

var copy = function copy(o) {
  var recursion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!recursion) {
    visited.length = 0;
  }

  var history = visited.find(function (e) {
    return e[0] === o;
  });

  if (history) {
    return history[1];
  }

  if (o instanceof Array) {
    var result = [];
    visited.push([o, result]);

    o.forEach(function (e) {
      return result.push(copy(e, true));
    });

    return result;
  }

  if (o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object') {
    var _result = {};

    try {
      _result = JSON.parse(JSON.stringify(o));
      visited.push([o, _result]);
    } catch (e) {
      visited.push([o, _result]);

      Object.entries(o).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        _result[k] = copy(v, true);
      });
    }

    _result.__proto__ = o.__proto__;
    return _result;
  }

  visited.push([o, o]);
  return o;
};

module.exports = copy;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(24);
var util = __webpack_require__(28);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(27);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requireMap;
function requireMap(callback) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function (event) {
    if (this.readyState === 4) {
      if (this.status === 200) {
        callback(JSON.parse(this.responseText));
      }
    }
  };
  req.open('GET', 'map.json', false);
  req.send();
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = __webpack_require__(1);

var colors = _interopRequireWildcard(_colors);

var _renderer = __webpack_require__(12);

var renderer = _interopRequireWildcard(_renderer);

var _CommonTypes = __webpack_require__(0);

var CommonTypes = _interopRequireWildcard(_CommonTypes);

var _localStorageHandler = __webpack_require__(5);

var localStorageHandler = _interopRequireWildcard(_localStorageHandler);

var _game = __webpack_require__(3);

var game = _interopRequireWildcard(_game);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainMenu = function () {
  function MainMenu(context, data) {
    _classCallCheck(this, MainMenu);

    this.context = context;

    this.rebuild(data);
  }

  _createClass(MainMenu, [{
    key: 'rebuild',
    value: function rebuild(data) {
      this.selectedMenu = 0;
      this.selectedSubMenu = 0;
      this.inSubMenu = false;

      var selectLevelSubmenus = data.maps.map(function (map, id) {
        return {
          title: map.name,
          disabled: id != 0 && localStorageHandler.getPlayedMaps().indexOf(id) == -1,
          onPressEnter: function onPressEnter() {
            game.loadMap(id);
          }
        };
      });

      this.menus = [{
        title: 'Play',
        explaination: 'Press enter to play.',
        onPressEnter: function onPressEnter() {
          game.loadMap(0);
        }
      }, {
        title: 'Select a level',
        submenus: selectLevelSubmenus,
        explaination: 'Press enter to play the selected level.'
      }, {
        title: 'How to play',
        explaination: 'Use the arrow keys to lead the snake, and press Escape to return to the main menu.'
      }];
      this.render();
    }
  }, {
    key: 'getSelectedMenu',
    value: function getSelectedMenu() {
      return this.menus[this.selectedMenu];
    }
  }, {
    key: 'getSelectedSubmenu',
    value: function getSelectedSubmenu() {
      var selectedMenu = this.getSelectedMenu();
      if (selectedMenu.submenus && this.selectedSubMenu < selectedMenu.submenus.length) {
        return selectedMenu.submenus[this.selectedSubMenu];
      } else {
        return null;
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(key) {
      var selectedMenu = this.getSelectedMenu();
      var selectedSubMenu = this.getSelectedSubmenu();
      switch (key) {
        case 'ArrowUp':
          if (this.inSubMenu) {
            if (selectedMenu.submenus) {
              var nextSelection = this.selectedSubMenu;
              for (var i = this.selectedSubMenu - 1; i >= 0; i--) {
                if (selectedMenu.submenus[i]) {
                  if (!selectedMenu.submenus[i].disabled) {
                    nextSelection = i;
                    break;
                  }
                }
              }
              this.selectedSubMenu = nextSelection;
            }
          } else this.selectedMenu = Math.max(this.selectedMenu - 1, 0);
          break;
        case 'ArrowDown':
          if (this.inSubMenu) {
            if (selectedMenu.submenus) {
              var _nextSelection = this.selectedSubMenu;
              for (var _i = this.selectedSubMenu + 1; _i < selectedMenu.submenus.length; _i++) {
                if (selectedMenu.submenus[_i]) {
                  if (!selectedMenu.submenus[_i].disabled) {
                    _nextSelection = _i;
                    break;
                  }
                }
              }
              this.selectedSubMenu = _nextSelection;
            }
          } else this.selectedMenu = Math.min(this.selectedMenu + 1, this.menus.length - 1);
          break;
        case 'ArrowLeft':
          this.inSubMenu = false;
          this.selectedSubMenu = 0;
          break;
        case 'ArrowRight':
          if (selectedMenu.submenus) this.inSubMenu = true;
          break;
        case 'Enter':
          if (this.inSubMenu) {
            if (selectedSubMenu && selectedSubMenu.onPressEnter) selectedSubMenu.onPressEnter();
          } else {
            if (selectedMenu.onPressEnter) selectedMenu.onPressEnter();
          }
      }
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      // canvas size : 320*240
      // (40*8)*(30*8)px
      // Scaled *2

      this.context.setTransform(2, 0, 0, 2, 0, 0);
      this.context.clearRect(-1, -1, 321, 241);

      this.context.fillStyle = colors.map.white;

      this.context.font = '24px Share Tech Mono';
      this.context.fillText('SNAKE', 0, 3 * 8);

      this.context.font = '16px Share Tech Mono';
      this.menus.forEach(function (menu, index) {
        _this.context.fillText(menu.title, 2 * 8, index * 16 + 6 * 8);
      });

      this.context.strokeStyle = colors.map.grey_3;
      this.context.beginPath();
      this.context.moveTo(320 / 2, 0);
      this.context.lineTo(320 / 2, 224);
      this.context.stroke();

      var selectedMenu = this.getSelectedMenu();

      if (selectedMenu.submenus) {
        selectedMenu.submenus.forEach(function (menu, index) {
          if (menu.disabled) _this.context.fillStyle = colors.map.grey_3;else _this.context.fillStyle = colors.map.white;
          _this.context.fillText(menu.title.substring(0, 14), 160 + 2 * 8, index * 16 + 6 * 8);
        });
      }

      this.context.fillStyle = colors.map.white;
      this.context.font = '10px Share Tech Mono';
      if (selectedMenu.explaination) {
        var _yOffset = selectedMenu.submenus ? selectedMenu.submenus.length * 16 + 10 * 8 : 6 * 8;
        var _charArray = [].concat(_toConsumableArray(selectedMenu.explaination));
        var _accumulator = '';
        _charArray.forEach(function (char, index) {
          _accumulator += char;
          if (index % 24 == 23 || index == _charArray.length - 1) {
            _this.context.fillText(_accumulator, 176, _yOffset + Math.floor(index / 24) * 8);
            _accumulator = '';
          }
        });
      }

      this.context.font = '16px Share Tech Mono';
      if (this.inSubMenu) {
        if (selectedMenu.submenus) {
          this.context.fillStyle = colors.map.green;
          this.context.fillText('-', 164, this.selectedSubMenu * 16 + 6 * 8);
        }
      } else {
        this.context.fillStyle = colors.map.green;
        this.context.fillText('-', 4, this.selectedMenu * 16 + 6 * 8);
      }

      this.context.fillStyle = colors.map.white;
      this.context.font = '10px Share Tech Mono';
      var yOffset = 25 * 8;
      var message = 'Use the arrow keys to navigate through menus.';
      var charArray = [].concat(_toConsumableArray(message));
      var accumulator = '';
      charArray.forEach(function (char, index) {
        accumulator += char;
        if (index % 24 == 23 || index == charArray.length - 1) {
          _this.context.fillText(accumulator, 16, yOffset + Math.floor(index / 24) * 8);
          accumulator = '';
        }
      });

      this.context.font = '8px Share Tech Mono';
      this.context.fillText('Copyright (c) 2017 Julien Marquet.', 16, 236);

      renderer.applyGlowEffect(this.context);
    }
  }]);

  return MainMenu;
}();

exports.default = MainMenu;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
function setup() {
  var contextmenu = document.getElementById('contextmenu');
  var showLogsButton = document.getElementById('show-logs-button');
  var panelRight = document.getElementById('panel-right');
  var canvasContainer = document.getElementById('canvas-container');
  if (contextmenu && showLogsButton && panelRight && canvasContainer) {
    contextmenu.style.display = 'none';

    contextmenu.addEventListener('mouseleave', function () {
      contextmenu.style.display = 'none';
    });
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
      contextmenu.style.display = 'block';
      contextmenu.style.left = event.pageX - 10 + 'px';
      contextmenu.style.top = event.pageY - 10 + 'px';
    });

    var logsShown = false;
    showLogsButton.addEventListener('click', function () {
      if (logsShown) {
        logsShown = false;
        panelRight.style.display = 'none';
        canvasContainer.style.right = '0';
      } else {
        logsShown = true;
        panelRight.style.display = 'block';
        canvasContainer.style.right = '750px';
      }
    });
    panelRight.style.display = 'none';
  } else {
    throw 'Can\'t find all the required elements in this page !';
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.boxBlurCanvasRGBA = boxBlurCanvasRGBA;


/*

Superfast Blur - a fast Box Blur For Canvas

Version: 	0.5
Author:		Mario Klingemann
Contact: 	mario@quasimondo.com
Website:	http://www.quasimondo.com/BoxBlurForCanvas
Twitter:	@quasimondo

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Or support me on flattr:
https://flattr.com/thing/140066/Superfast-Blur-a-pretty-fast-Box-Blur-Effect-for-CanvasJavascript

Copyright (c) 2011 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var mul_table = [1, 57, 41, 21, 203, 34, 97, 73, 227, 91, 149, 62, 105, 45, 39, 137, 241, 107, 3, 173, 39, 71, 65, 238, 219, 101, 187, 87, 81, 151, 141, 133, 249, 117, 221, 209, 197, 187, 177, 169, 5, 153, 73, 139, 133, 127, 243, 233, 223, 107, 103, 99, 191, 23, 177, 171, 165, 159, 77, 149, 9, 139, 135, 131, 253, 245, 119, 231, 224, 109, 211, 103, 25, 195, 189, 23, 45, 175, 171, 83, 81, 79, 155, 151, 147, 9, 141, 137, 67, 131, 129, 251, 123, 30, 235, 115, 113, 221, 217, 53, 13, 51, 50, 49, 193, 189, 185, 91, 179, 175, 43, 169, 83, 163, 5, 79, 155, 19, 75, 147, 145, 143, 35, 69, 17, 67, 33, 65, 255, 251, 247, 243, 239, 59, 29, 229, 113, 111, 219, 27, 213, 105, 207, 51, 201, 199, 49, 193, 191, 47, 93, 183, 181, 179, 11, 87, 43, 85, 167, 165, 163, 161, 159, 157, 155, 77, 19, 75, 37, 73, 145, 143, 141, 35, 138, 137, 135, 67, 33, 131, 129, 255, 63, 250, 247, 61, 121, 239, 237, 117, 29, 229, 227, 225, 111, 55, 109, 216, 213, 211, 209, 207, 205, 203, 201, 199, 197, 195, 193, 48, 190, 47, 93, 185, 183, 181, 179, 178, 176, 175, 173, 171, 85, 21, 167, 165, 41, 163, 161, 5, 79, 157, 78, 154, 153, 19, 75, 149, 74, 147, 73, 144, 143, 71, 141, 140, 139, 137, 17, 135, 134, 133, 66, 131, 65, 129, 1];

var shg_table = [0, 9, 10, 10, 14, 12, 14, 14, 16, 15, 16, 15, 16, 15, 15, 17, 18, 17, 12, 18, 16, 17, 17, 19, 19, 18, 19, 18, 18, 19, 19, 19, 20, 19, 20, 20, 20, 20, 20, 20, 15, 20, 19, 20, 20, 20, 21, 21, 21, 20, 20, 20, 21, 18, 21, 21, 21, 21, 20, 21, 17, 21, 21, 21, 22, 22, 21, 22, 22, 21, 22, 21, 19, 22, 22, 19, 20, 22, 22, 21, 21, 21, 22, 22, 22, 18, 22, 22, 21, 22, 22, 23, 22, 20, 23, 22, 22, 23, 23, 21, 19, 21, 21, 21, 23, 23, 23, 22, 23, 23, 21, 23, 22, 23, 18, 22, 23, 20, 22, 23, 23, 23, 21, 22, 20, 22, 21, 22, 24, 24, 24, 24, 24, 22, 21, 24, 23, 23, 24, 21, 24, 23, 24, 22, 24, 24, 22, 24, 24, 22, 23, 24, 24, 24, 20, 23, 22, 23, 24, 24, 24, 24, 24, 24, 24, 23, 21, 23, 22, 23, 24, 24, 24, 22, 24, 24, 24, 23, 22, 24, 24, 25, 23, 25, 25, 23, 24, 25, 25, 24, 22, 25, 25, 25, 24, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 23, 25, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 24, 22, 25, 25, 23, 25, 25, 20, 24, 25, 24, 25, 25, 22, 24, 25, 24, 25, 24, 25, 25, 24, 25, 25, 25, 25, 22, 25, 25, 25, 24, 25, 24, 25, 18];

function boxBlurCanvasRGBA(context, radius, iterations) {
	if (isNaN(radius) || radius < 1) throw 'Expected radius to be a number > 1.';

	radius |= 0;

	if (isNaN(iterations)) iterations = 1;
	iterations |= 0;
	if (iterations > 3) iterations = 3;
	if (iterations < 1) iterations = 1;

	var imageData;
	var width = context.canvas.width;
	var height = context.canvas.height;

	imageData = context.getImageData(0, 0, width, height);

	var pixels = imageData.data;

	var rsum, gsum, bsum, asum, x, y, i, p, p1, p2, yp, yi, yw, idx, pa;
	var wm = width - 1;
	var hm = height - 1;
	var wh = width * height;
	var rad1 = radius + 1;

	var mul_sum = mul_table[radius];
	var shg_sum = shg_table[radius];

	var r = [];
	var g = [];
	var b = [];
	var a = [];

	var vmin = [];
	var vmax = [];

	while (iterations-- > 0) {
		yw = yi = 0;

		for (y = 0; y < height; y++) {
			rsum = pixels[yw] * rad1;
			gsum = pixels[yw + 1] * rad1;
			bsum = pixels[yw + 2] * rad1;
			asum = pixels[yw + 3] * rad1;

			for (i = 1; i <= radius; i++) {
				p = yw + ((i > wm ? wm : i) << 2);
				rsum += pixels[p++];
				gsum += pixels[p++];
				bsum += pixels[p++];
				asum += pixels[p];
			}

			for (x = 0; x < width; x++) {
				r[yi] = rsum;
				g[yi] = gsum;
				b[yi] = bsum;
				a[yi] = asum;

				if (y == 0) {
					vmin[x] = ((p = x + rad1) < wm ? p : wm) << 2;
					vmax[x] = (p = x - radius) > 0 ? p << 2 : 0;
				}

				p1 = yw + vmin[x];
				p2 = yw + vmax[x];

				rsum += pixels[p1++] - pixels[p2++];
				gsum += pixels[p1++] - pixels[p2++];
				bsum += pixels[p1++] - pixels[p2++];
				asum += pixels[p1] - pixels[p2];

				yi++;
			}
			yw += width << 2;
		}

		for (x = 0; x < width; x++) {
			yp = x;
			rsum = r[yp] * rad1;
			gsum = g[yp] * rad1;
			bsum = b[yp] * rad1;
			asum = a[yp] * rad1;

			for (i = 1; i <= radius; i++) {
				yp += i > hm ? 0 : width;
				rsum += r[yp];
				gsum += g[yp];
				bsum += b[yp];
				asum += a[yp];
			}

			yi = x << 2;
			for (y = 0; y < height; y++) {

				pixels[yi + 3] = pa = asum * mul_sum >>> shg_sum;
				if (pa > 0) {
					pa = 255 / pa;
					pixels[yi] = (rsum * mul_sum >>> shg_sum) * pa;
					pixels[yi + 1] = (gsum * mul_sum >>> shg_sum) * pa;
					pixels[yi + 2] = (bsum * mul_sum >>> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				}
				if (x == 0) {
					vmin[y] = ((p = y + rad1) < hm ? p : hm) * width;
					vmax[y] = (p = y - radius) > 0 ? p * width : 0;
				}

				p1 = x + vmin[y];
				p2 = x + vmax[y];

				rsum += r[p1] - r[p2];
				gsum += g[p1] - g[p2];
				bsum += b[p1] - b[p2];
				asum += a[p1] - a[p2];

				yi += width << 2;
			}
		}
	}

	return imageData;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;

var _jsonschema = __webpack_require__(22);

var _MapTools = __webpack_require__(6);

var MapTools = _interopRequireWildcard(_MapTools);

var _CommonTypes = __webpack_require__(0);

var CommonTypes = _interopRequireWildcard(_CommonTypes);

var _GameLogger = __webpack_require__(4);

var _GameLogger2 = _interopRequireDefault(_GameLogger);

var _MapController = __webpack_require__(11);

var _MapController2 = _interopRequireDefault(_MapController);

var _game = __webpack_require__(3);

var game = _interopRequireWildcard(_game);

var _GameTypes = __webpack_require__(10);

var GameTypes = _interopRequireWildcard(_GameTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setup(logger, mapController) {
  function queueCall(func, args) {
    var scope = interpreter.createScope(func.node.body, func.parentScope);
    func.node.params.forEach(function (p, i) {
      interpreter.setProperty(scope, interpreter.createPrimitive(p.name), args[i]);
    });
    var argsList = interpreter.createObject(interpreter.ARRAY);
    args.forEach(function (arg, i) {
      interpreter.setProperty(argsList, interpreter.createPrimitive(i), arg);
    });
    interpreter.setProperty(scope, 'arguments', argsList);
    var last = func.node.body.body[func.node.body.body.length - 1];
    if (last.type == 'ReturnStatement') {
      last.type = 'ExpressionStatement';
      last.expression = last.argument;
      delete last.argument;
    }
    interpreter.stateStack.push({
      node: func.node.body,
      scope: scope,
      arguments: [interpreter.createPrimitive('Hello !')],
      value: undefined
    });
  }

  var interpreter = mapController.interpreter;
  var loggerObject = interpreter.createObject(interpreter.OBJECT);
  function exposeLogger(functionName, loggerFunction) {
    interpreter.setProperty(loggerObject, functionName, mapController.interpreter.createNativeFunction(function (message) {
      if (message && message.type == 'string') {
        loggerFunction(message.toString());
      } else {
        interpreter.throwException(interpreter.TYPE_ERROR, 'logger.' + functionName + '(message) expects message to be a string.');
      }
    }));
  }
  exposeLogger('debug', logger.debug.bind(logger));
  exposeLogger('info', logger.info.bind(logger));
  exposeLogger('error', logger.error.bind(logger));
  exposeLogger('warning', logger.warning.bind(logger));
  interpreter.setProperty(interpreter.global, 'logger', loggerObject);
  interpreter.setProperty(interpreter.global, 'delay', interpreter.createNativeFunction(function (callback, ticks) {
    var state = interpreter.stateStack[interpreter.stateStack.length - 1];
    if (callback && callback.type == 'function' && ticks && ticks.type == 'number') {
      mapController.delay(function () {
        queueCall(callback, []);
        mapController.resumeInterpreter();
      }, ticks.toNumber());
    } else {
      interpreter.throwException(interpreter.TYPE_ERROR, 'delay(callback, ticks) expects callback to be a function and ticks to be a number.');
    }
  }));
  interpreter.setProperty(interpreter.global, 'getMask', interpreter.createNativeFunction(function (maskName) {
    if (maskName && maskName.type == 'string') {
      var mask = mapController.map.masks.find(function (mask) {
        return mask.name == maskName;
      });
      if (mask) return interpreter.createPrimitive(mask.content);else {
        interpreter.throwException(interpreter.EVAL_ERROR, 'Can\'t find a mask named "' + maskName + '".');
      }
    } else {
      interpreter.throwException(interpreter.TYPE_ERROR, 'getMask(maskName) expects name to be a string.');
    }
  }));
  interpreter.setProperty(interpreter.global, 'getMarker', interpreter.createNativeFunction(function (markerName) {
    if (markerName && markerName.type == 'string') {
      var marker = mapController.map.markers.find(function (marker) {
        return marker.name == markerName.toString();
      });
      if (marker) return interpreter.createPrimitive(marker);else {
        interpreter.throwException(interpreter.EVAL_ERROR, 'Can\'t find a marker named "' + markerName.toString() + '".');
      }
    } else {
      interpreter.throwException(interpreter.TYPE_ERROR, 'getMarker(markerName) expects markerName to be a string.');
    }
  }));
  var positionSchema = {
    type: 'object',
    properties: {
      x: { type: 'number' },
      y: { type: 'number' }
    },
    required: ['x', 'y']
  };
  var blockArraySchema = {
    type: 'array',
    items: positionSchema
  };
  interpreter.setProperty(interpreter.global, 'paint', interpreter.createNativeFunction(function (blocks, brush) {
    if (blocks && blocks.type == 'object' && (0, _jsonschema.validate)(blocks.data.valueOf(), blockArraySchema).errors.length == 0 && brush && brush.type == 'string') {
      mapController.map.blocks = MapTools.paint(mapController.map.blocks, blocks.valueOf(), brush.toString());
    } else {
      interpreter.throwException(interpreter.TYPE_ERROR, 'paint(blocks, brush) expects blocks to be an array of coordinates and brush to be a string.');
    }
  }));
  interpreter.setProperty(interpreter.global, 'bindOnStartPlaying', interpreter.createNativeFunction(function (callback) {
    if (callback && callback.type == 'function') {
      mapController.bindOnStartPlaying(function () {
        queueCall(callback, []);
        mapController.resumeInterpreter();
      });
    } else {
      interpreter.throwException(interpreter.TYPE_ERROR, 'bindOnStartPlaying(callback) expects callback to be a function.');
    }
  }));
  interpreter.setProperty(interpreter.global, 'addTriggerListener', interpreter.createNativeFunction(function (positions, callback) {
    if (positions && callback && (0, _jsonschema.validate)(positions.data.valueOf(), blockArraySchema).errors.length == 0 && callback.type == 'function') {
      var remove = mapController.addTriggerListener(positions.data.valueOf(), function () {
        queueCall(callback, []);
        mapController.resumeInterpreter();
      });
      return interpreter.createNativeFunction(function () {
        return remove();
      });
    } else {
      interpreter.throwException(interpreter.TYPE_ERROR, 'attachTrigger(positions, callback) expects positions to be an array of coordinates and callback to be a function.');
    }
  }));
  var markerSchema = {
    type: 'object',
    properties: {
      position: positionSchema,
      direction: { enum: [null, 'up', 'down', 'left', 'right'] },
      name: { type: 'string' }
    }
  };
  interpreter.setProperty(interpreter.global, 'spawnBallAtMarker', interpreter.createNativeFunction(function (marker) {
    if (marker && marker.type == 'object' && (0, _jsonschema.validate)(marker.data.valueOf(), markerSchema).errors.length == 0) {
      marker = marker.data.valueOf();
      if (marker.direction != null) {
        mapController.spawnBall(marker.position, marker.direction);
      } else {
        interpreter.throwException(interpreter.TYPE_ERROR, 'spawnBallAtMarker(marker) expects marker to have a direction set (not "none").');
      }
    } else {
      interpreter.throwException(interpreter.TYPE_ERROR, 'spawnBallAtMarker(marker) expects marker to be a marker.');
    }
  }));
  interpreter.setProperty(interpreter.global, 'switchToMap', interpreter.createNativeFunction(function (mapName) {
    if (mapName && mapName.type == 'string') {
      var mapID = null;
      for (var i = 0; i < mapController.maps.length; i++) {
        if (mapController.maps[i].name == mapName.toString()) mapID = i;
      }
      if (mapID != null) {
        mapController.switchToMap(mapID);
      } else {
        interpreter.throwException(interpreter.EVAL_ERROR, 'Can\'t find a map named "' + mapName + '".');
      }
    } else {
      interpreter.throwException(interpreter.TYPE_ERROR, 'switchToMap(mapName) expects mapName to be a string.');
    }
  }));
  interpreter.setProperty(interpreter.global, 'openMainMenu', interpreter.createNativeFunction(function () {
    game.openMainMenu();
  }));

  // polyfills
  interpreter.appendCode('\n    function addTriggerOnceListener(blocks, callback) {\n      var detachListener = addTriggerListener(\n        blocks,\n        function() {\n          detachListener();\n          callback();\n        }\n      );\n    }\n  ');
  interpreter.run();
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(2);

/** @type ValidatorResult */
var ValidatorResult = helpers.ValidatorResult;
/** @type SchemaError */
var SchemaError = helpers.SchemaError;

var attribute = {};

attribute.ignoreProperties = {
  // informative properties
  'id': true,
  'default': true,
  'description': true,
  'title': true,
  // arguments to other properties
  'exclusiveMinimum': true,
  'exclusiveMaximum': true,
  'additionalItems': true,
  // special-handled properties
  '$schema': true,
  '$ref': true,
  'extends': true
};

/**
 * @name validators
 */
var validators = attribute.validators = {};

/**
 * Validates whether the instance if of a certain type
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */
validators.type = function validateType (instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var types = Array.isArray(schema.type) ? schema.type : [schema.type];
  if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
    var list = types.map(function (v) {
      return v.id && ('<' + v.id + '>') || (v+'');
    });
    result.addError({
      name: 'type',
      argument: list,
      message: "is not of a type(s) " + list,
    });
  }
  return result;
};

function testSchema(instance, options, ctx, callback, schema){
  var res = this.validateSchema(instance, schema, options, ctx);
  if (! res.valid && callback instanceof Function) {
    callback(res);
  }
  return res.valid;
}

/**
 * Validates whether the instance matches some of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */
validators.anyOf = function validateAnyOf (instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var inner = new ValidatorResult(instance, schema, options, ctx);
  if (!Array.isArray(schema.anyOf)){
    throw new SchemaError("anyOf must be an array");
  }
  if (!schema.anyOf.some(
    testSchema.bind(
      this, instance, options, ctx, function(res){inner.importErrors(res);}
      ))) {
    var list = schema.anyOf.map(function (v, i) {
      return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
    });
    if (options.nestedErrors) {
      result.importErrors(inner);
    }
    result.addError({
      name: 'anyOf',
      argument: list,
      message: "is not any of " + list.join(','),
    });
  }
  return result;
};

/**
 * Validates whether the instance matches every given schema
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */
validators.allOf = function validateAllOf (instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  if (!Array.isArray(schema.allOf)){
    throw new SchemaError("allOf must be an array");
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var self = this;
  schema.allOf.forEach(function(v, i){
    var valid = self.validateSchema(instance, v, options, ctx);
    if(!valid.valid){
      var msg = (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
      result.addError({
        name: 'allOf',
        argument: { id: msg, length: valid.errors.length, valid: valid },
        message: 'does not match allOf schema ' + msg + ' with ' + valid.errors.length + ' error[s]:',
      });
      result.importErrors(valid);
    }
  });
  return result;
};

/**
 * Validates whether the instance matches exactly one of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */
validators.oneOf = function validateOneOf (instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  if (!Array.isArray(schema.oneOf)){
    throw new SchemaError("oneOf must be an array");
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var inner = new ValidatorResult(instance, schema, options, ctx);
  var count = schema.oneOf.filter(
    testSchema.bind(
      this, instance, options, ctx, function(res) {inner.importErrors(res);}
      ) ).length;
  var list = schema.oneOf.map(function (v, i) {
    return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
  });
  if (count!==1) {
    if (options.nestedErrors) {
      result.importErrors(inner);
    }
    result.addError({
      name: 'oneOf',
      argument: list,
      message: "is not exactly one from " + list.join(','),
    });
  }
  return result;
};

/**
 * Validates properties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.properties = function validateProperties (instance, schema, options, ctx) {
  if(instance === undefined || !(instance instanceof Object)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var properties = schema.properties || {};
  for (var property in properties) {
    var prop = (instance || undefined) && instance[property];
    var res = this.validateSchema(prop, properties[property], options, ctx.makeChild(properties[property], property));
    if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
    result.importErrors(res);
  }
  return result;
};

/**
 * Test a specific property within in instance against the additionalProperties schema attribute
 * This ignores properties with definitions in the properties schema attribute, but no other attributes.
 * If too many more types of property-existance tests pop up they may need their own class of tests (like `type` has)
 * @private
 * @return {boolean}
 */
function testAdditionalProperty (instance, schema, options, ctx, property, result) {
  if (schema.properties && schema.properties[property] !== undefined) {
    return;
  }
  if (schema.additionalProperties === false) {
    result.addError({
      name: 'additionalProperties',
      argument: property,
      message: "additionalProperty " + JSON.stringify(property) + " exists in instance when not allowed",
    });
  } else {
    var additionalProperties = schema.additionalProperties || {};
    var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
    if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
    result.importErrors(res);
  }
}

/**
 * Validates patternProperties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.patternProperties = function validatePatternProperties (instance, schema, options, ctx) {
  if(instance === undefined) return;
  if(!this.types.object(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var patternProperties = schema.patternProperties || {};

  for (var property in instance) {
    var test = true;
    for (var pattern in patternProperties) {
      var expr = new RegExp(pattern);
      if (!expr.test(property)) {
        continue;
      }
      test = false;
      var res = this.validateSchema(instance[property], patternProperties[pattern], options, ctx.makeChild(patternProperties[pattern], property));
      if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
      result.importErrors(res);
    }
    if (test) {
      testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
    }
  }

  return result;
};

/**
 * Validates additionalProperties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.additionalProperties = function validateAdditionalProperties (instance, schema, options, ctx) {
  if(instance === undefined) return;
  if(!this.types.object(instance)) return;
  // if patternProperties is defined then we'll test when that one is called instead
  if (schema.patternProperties) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  for (var property in instance) {
    testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
  }
  return result;
};

/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.minProperties = function validateMinProperties (instance, schema, options, ctx) {
  if (!instance || typeof instance !== 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);
  if (!(keys.length >= schema.minProperties)) {
    result.addError({
      name: 'minProperties',
      argument: schema.minProperties,
      message: "does not meet minimum property length of " + schema.minProperties,
    })
  }
  return result;
};

/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.maxProperties = function validateMaxProperties (instance, schema, options, ctx) {
  if (!instance || typeof instance !== 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);
  if (!(keys.length <= schema.maxProperties)) {
    result.addError({
      name: 'maxProperties',
      argument: schema.maxProperties,
      message: "does not meet maximum property length of " + schema.maxProperties,
    });
  }
  return result;
};

/**
 * Validates items when instance is an array
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.items = function validateItems (instance, schema, options, ctx) {
  if (!Array.isArray(instance)) {
    return null;
  }
  var self = this;
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance === undefined || !schema.items) {
    return result;
  }
  instance.every(function (value, i) {
    var items = Array.isArray(schema.items) ? (schema.items[i] || schema.additionalItems) : schema.items;
    if (items === undefined) {
      return true;
    }
    if (items === false) {
      result.addError({
        name: 'items',
        message: "additionalItems not permitted",
      });
      return false;
    }
    var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
    if(res.instance !== result.instance[i]) result.instance[i] = res.instance;
    result.importErrors(res);
    return true;
  });
  return result;
};

/**
 * Validates minimum and exclusiveMinimum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.minimum = function validateMinimum (instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var valid = true;
  if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
    valid = instance > schema.minimum;
  } else {
    valid = instance >= schema.minimum;
  }
  if (!valid) {
    result.addError({
      name: 'minimum',
      argument: schema.minimum,
      message: "must have a minimum value of " + schema.minimum,
    });
  }
  return result;
};

/**
 * Validates maximum and exclusiveMaximum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.maximum = function validateMaximum (instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var valid;
  if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
    valid = instance < schema.maximum;
  } else {
    valid = instance <= schema.maximum;
  }
  if (!valid) {
    result.addError({
      name: 'maximum',
      argument: schema.maximum,
      message: "must have a maximum value of " + schema.maximum,
    });
  }
  return result;
};

/**
 * Validates divisibleBy when the type of the instance value is a number.
 * Of course, this is susceptible to floating point error since it compares the floating points
 * and not the JSON byte sequences to arbitrary precision.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.divisibleBy = function validateDivisibleBy (instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }

  if (schema.divisibleBy == 0) {
    throw new SchemaError("divisibleBy cannot be zero");
  }

  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance / schema.divisibleBy % 1) {
    result.addError({
      name: 'divisibleBy',
      argument: schema.divisibleBy,
      message: "is not divisible by (multiple of) " + JSON.stringify(schema.divisibleBy),
    });
  }
  return result;
};

/**
 * Validates divisibleBy when the type of the instance value is a number.
 * Of course, this is susceptible to floating point error since it compares the floating points
 * and not the JSON byte sequences to arbitrary precision.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.multipleOf = function validateMultipleOf (instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }

  if (schema.multipleOf == 0) {
    throw new SchemaError("multipleOf cannot be zero");
  }

  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance / schema.multipleOf % 1) {
    result.addError({
      name: 'multipleOf',
      argument:  schema.multipleOf,
      message: "is not a multiple of (divisible by) " + JSON.stringify(schema.multipleOf),
    });
  }
  return result;
};

/**
 * Validates whether the instance value is present.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.required = function validateRequired (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance === undefined && schema.required === true) {
    result.addError({
      name: 'required',
      message: "is required"
    });
  } else if (instance && typeof instance==='object' && Array.isArray(schema.required)) {
    schema.required.forEach(function(n){
      if(instance[n]===undefined){
        result.addError({
          name: 'required',
          argument: n,
          message: "requires property " + JSON.stringify(n),
        });
      }
    });
  }
  return result;
};

/**
 * Validates whether the instance value matches the regular expression, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.pattern = function validatePattern (instance, schema, options, ctx) {
  if (typeof instance !== 'string') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!instance.match(schema.pattern)) {
    result.addError({
      name: 'pattern',
      argument: schema.pattern,
      message: "does not match pattern " + JSON.stringify(schema.pattern),
    });
  }
  return result;
};

/**
 * Validates whether the instance value is of a certain defined format or a custom
 * format.
 * The following formats are supported for string types:
 *   - date-time
 *   - date
 *   - time
 *   - ip-address
 *   - ipv6
 *   - uri
 *   - color
 *   - host-name
 *   - alpha
 *   - alpha-numeric
 *   - utc-millisec
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {String|null}
 */
validators.format = function validateFormat (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) {
    result.addError({
      name: 'format',
      argument: schema.format,
      message: "does not conform to the " + JSON.stringify(schema.format) + " format",
    });
  }
  return result;
};

/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.minLength = function validateMinLength (instance, schema, options, ctx) {
  if (!(typeof instance === 'string')) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length >= schema.minLength)) {
    result.addError({
      name: 'minLength',
      argument: schema.minLength,
      message: "does not meet minimum length of " + schema.minLength,
    });
  }
  return result;
};

/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.maxLength = function validateMaxLength (instance, schema, options, ctx) {
  if (!(typeof instance === 'string')) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length <= schema.maxLength)) {
    result.addError({
      name: 'maxLength',
      argument: schema.maxLength,
      message: "does not meet maximum length of " + schema.maxLength,
    });
  }
  return result;
};

/**
 * Validates whether instance contains at least a minimum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.minItems = function validateMinItems (instance, schema, options, ctx) {
  if (!Array.isArray(instance)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length >= schema.minItems)) {
    result.addError({
      name: 'minItems',
      argument: schema.minItems,
      message: "does not meet minimum length of " + schema.minItems,
    });
  }
  return result;
};

/**
 * Validates whether instance contains no more than a maximum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */
validators.maxItems = function validateMaxItems (instance, schema, options, ctx) {
  if (!Array.isArray(instance)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length <= schema.maxItems)) {
    result.addError({
      name: 'maxItems',
      argument: schema.maxItems,
      message: "does not meet maximum length of " + schema.maxItems,
    });
  }
  return result;
};

/**
 * Validates that every item in an instance array is unique, when instance is an array
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */
validators.uniqueItems = function validateUniqueItems (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!Array.isArray(instance)) {
    return result;
  }
  function testArrays (v, i, a) {
    for (var j = i + 1; j < a.length; j++) if (helpers.deepCompareStrict(v, a[j])) {
      return false;
    }
    return true;
  }
  if (!instance.every(testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item",
    });
  }
  return result;
};

/**
 * Deep compares arrays for duplicates
 * @param v
 * @param i
 * @param a
 * @private
 * @return {boolean}
 */
function testArrays (v, i, a) {
  var j, len = a.length;
  for (j = i + 1, len; j < len; j++) {
    if (helpers.deepCompareStrict(v, a[j])) {
      return false;
    }
  }
  return true;
}

/**
 * Validates whether there are no duplicates, when the instance is an Array.
 * @param instance
 * @return {String|null}
 */
validators.uniqueItems = function validateUniqueItems (instance, schema, options, ctx) {
  if (!Array.isArray(instance)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!instance.every(testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item",
    });
  }
  return result;
};

/**
 * Validate for the presence of dependency properties, if the instance is an object.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */
validators.dependencies = function validateDependencies (instance, schema, options, ctx) {
  if (!instance || typeof instance != 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  for (var property in schema.dependencies) {
    if (instance[property] === undefined) {
      continue;
    }
    var dep = schema.dependencies[property];
    var childContext = ctx.makeChild(dep, property);
    if (typeof dep == 'string') {
      dep = [dep];
    }
    if (Array.isArray(dep)) {
      dep.forEach(function (prop) {
        if (instance[prop] === undefined) {
          result.addError({
            // FIXME there's two different "dependencies" errors here with slightly different outputs
            // Can we make these the same? Or should we create different error types?
            name: 'dependencies',
            argument: childContext.propertyPath,
            message: "property " + prop + " not found, required by " + childContext.propertyPath,
          });
        }
      });
    } else {
      var res = this.validateSchema(instance, dep, options, childContext);
      if(result.instance !== res.instance) result.instance = res.instance;
      if (res && res.errors.length) {
        result.addError({
          name: 'dependencies',
          argument: childContext.propertyPath,
          message: "does not meet dependency required by " + childContext.propertyPath,
        });
        result.importErrors(res);
      }
    }
  }
  return result;
};

/**
 * Validates whether the instance value is one of the enumerated values.
 *
 * @param instance
 * @param schema
 * @return {ValidatorResult|null}
 */
validators['enum'] = function validateEnum (instance, schema, options, ctx) {
  if (!Array.isArray(schema['enum'])) {
    throw new SchemaError("enum expects an array", schema);
  }
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!schema['enum'].some(helpers.deepCompareStrict.bind(null, instance))) {
    result.addError({
      name: 'enum',
      argument: schema['enum'],
      message: "is not one of enum values: " + schema['enum'].join(','),
    });
  }
  return result;
};

/**
 * Validates whether the instance if of a prohibited type.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */
validators.not = validators.disallow = function validateNot (instance, schema, options, ctx) {
  var self = this;
  if(instance===undefined) return null;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var notTypes = schema.not || schema.disallow;
  if(!notTypes) return null;
  if(!Array.isArray(notTypes)) notTypes=[notTypes];
  notTypes.forEach(function (type) {
    if (self.testType(instance, schema, options, ctx, type)) {
      var schemaId = type && type.id && ('<' + type.id + '>') || type;
      result.addError({
        name: 'not',
        argument: schemaId,
        message: "is of prohibited type " + schemaId,
      });
    }
  });
  return result;
};

module.exports = attribute;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Validator = module.exports.Validator = __webpack_require__(23);

module.exports.ValidatorResult = __webpack_require__(2).ValidatorResult;
module.exports.ValidationError = __webpack_require__(2).ValidationError;
module.exports.SchemaError = __webpack_require__(2).SchemaError;

module.exports.validate = function (instance, schema, options) {
  var v = new Validator();
  return v.validate(instance, schema, options);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urilib = __webpack_require__(14);

var attribute = __webpack_require__(21);
var helpers = __webpack_require__(2);
var ValidatorResult = helpers.ValidatorResult;
var SchemaError = helpers.SchemaError;
var SchemaContext = helpers.SchemaContext;

/**
 * Creates a new Validator object
 * @name Validator
 * @constructor
 */
var Validator = function Validator () {
  // Allow a validator instance to override global custom formats or to have their
  // own custom formats.
  this.customFormats = Object.create(Validator.prototype.customFormats);
  this.schemas = {};
  this.unresolvedRefs = [];

  // Use Object.create to make this extensible without Validator instances stepping on each other's toes.
  this.types = Object.create(types);
  this.attributes = Object.create(attribute.validators);
};

// Allow formats to be registered globally.
Validator.prototype.customFormats = {};

// Hint at the presence of a property
Validator.prototype.schemas = null;
Validator.prototype.types = null;
Validator.prototype.attributes = null;
Validator.prototype.unresolvedRefs = null;

/**
 * Adds a schema with a certain urn to the Validator instance.
 * @param schema
 * @param urn
 * @return {Object}
 */
Validator.prototype.addSchema = function addSchema (schema, uri) {
  if (!schema) {
    return null;
  }
  var ourUri = uri || schema.id;
  this.addSubSchema(ourUri, schema);
  if (ourUri) {
    this.schemas[ourUri] = schema;
  }
  return this.schemas[ourUri];
};

Validator.prototype.addSubSchema = function addSubSchema(baseuri, schema) {
  if(!schema || typeof schema!='object') return;
  // Mark all referenced schemas so we can tell later which schemas are referred to, but never defined
  if(schema.$ref){
    var resolvedUri = urilib.resolve(baseuri, schema.$ref);
    // Only mark unknown schemas as unresolved
    if (this.schemas[resolvedUri] === undefined) {
      this.schemas[resolvedUri] = null;
      this.unresolvedRefs.push(resolvedUri);
    }
    return;
  }
  var ourUri = schema.id && urilib.resolve(baseuri, schema.id);
  var ourBase = ourUri || baseuri;
  if (ourUri) {
    if(this.schemas[ourUri]){
      if(!helpers.deepCompareStrict(this.schemas[ourUri], schema)){
        throw new Error('Schema <'+schema+'> already exists with different definition');
      }
      return this.schemas[ourUri];
    }
    this.schemas[ourUri] = schema;
    var documentUri = ourUri.replace(/^([^#]*)#$/, '$1');
    this.schemas[documentUri] = schema;
  }
  this.addSubSchemaArray(ourBase, ((schema.items instanceof Array)?schema.items:[schema.items]));
  this.addSubSchemaArray(ourBase, ((schema.extends instanceof Array)?schema.extends:[schema.extends]));
  this.addSubSchema(ourBase, schema.additionalItems);
  this.addSubSchemaObject(ourBase, schema.properties);
  this.addSubSchema(ourBase, schema.additionalProperties);
  this.addSubSchemaObject(ourBase, schema.definitions);
  this.addSubSchemaObject(ourBase, schema.patternProperties);
  this.addSubSchemaObject(ourBase, schema.dependencies);
  this.addSubSchemaArray(ourBase, schema.disallow);
  this.addSubSchemaArray(ourBase, schema.allOf);
  this.addSubSchemaArray(ourBase, schema.anyOf);
  this.addSubSchemaArray(ourBase, schema.oneOf);
  this.addSubSchema(ourBase, schema.not);
  return this.schemas[ourUri];
};

Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
  if(!(schemas instanceof Array)) return;
  for(var i=0; i<schemas.length; i++){
    this.addSubSchema(baseuri, schemas[i]);
  }
};

Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
  if(!schemas || typeof schemas!='object') return;
  for(var p in schemas){
    this.addSubSchema(baseuri, schemas[p]);
  }
};



/**
 * Sets all the schemas of the Validator instance.
 * @param schemas
 */
Validator.prototype.setSchemas = function setSchemas (schemas) {
  this.schemas = schemas;
};

/**
 * Returns the schema of a certain urn
 * @param urn
 */
Validator.prototype.getSchema = function getSchema (urn) {
  return this.schemas[urn];
};

/**
 * Validates instance against the provided schema
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {Array}
 */
Validator.prototype.validate = function validate (instance, schema, options, ctx) {
  if (!options) {
    options = {};
  }
  var propertyName = options.propertyName || 'instance';
  // This will work so long as the function at uri.resolve() will resolve a relative URI to a relative URI
  var base = urilib.resolve(options.base||'/', schema.id||'');
  if(!ctx){
    ctx = new SchemaContext(schema, options, propertyName, base, Object.create(this.schemas));
    if (!ctx.schemas[base]) {
      ctx.schemas[base] = schema;
    }
  }
  if (schema) {
    var result = this.validateSchema(instance, schema, options, ctx);
    if (!result) {
      throw new Error('Result undefined');
    }
    return result;
  }
  throw new SchemaError('no schema specified', schema);
};

/**
* @param Object schema
* @return mixed schema uri or false
*/
function shouldResolve(schema) {
  var ref = (typeof schema === 'string') ? schema : schema.$ref;
  if (typeof ref=='string') return ref;
  return false;
}

/**
 * Validates an instance against the schema (the actual work horse)
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @private
 * @return {ValidatorResult}
 */
Validator.prototype.validateSchema = function validateSchema (instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!schema) {
    throw new Error("schema is undefined");
  }

  if (schema['extends']) {
    if (schema['extends'] instanceof Array) {
      var schemaobj = {schema: schema, ctx: ctx};
      schema['extends'].forEach(this.schemaTraverser.bind(this, schemaobj));
      schema = schemaobj.schema;
      schemaobj.schema = null;
      schemaobj.ctx = null;
      schemaobj = null;
    } else {
      schema = helpers.deepMerge(schema, this.superResolve(schema['extends'], ctx));
    }
  }

  var switchSchema;
  if (switchSchema = shouldResolve(schema)) {
    var resolved = this.resolve(schema, switchSchema, ctx);
    var subctx = new SchemaContext(resolved.subschema, options, ctx.propertyPath, resolved.switchSchema, ctx.schemas);
    return this.validateSchema(instance, resolved.subschema, options, subctx);
  }

  var skipAttributes = options && options.skipAttributes || [];
  // Validate each schema attribute against the instance
  for (var key in schema) {
    if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
      var validatorErr = null;
      var validator = this.attributes[key];
      if (validator) {
        validatorErr = validator.call(this, instance, schema, options, ctx);
      } else if (options.allowUnknownAttributes === false) {
        // This represents an error with the schema itself, not an invalid instance
        throw new SchemaError("Unsupported attribute: " + key, schema);
      }
      if (validatorErr) {
        result.importErrors(validatorErr);
      }
    }
  }

  if (typeof options.rewrite == 'function') {
    var value = options.rewrite.call(this, instance, schema, options, ctx);
    result.instance = value;
  }
  return result;
};

/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/
Validator.prototype.schemaTraverser = function schemaTraverser (schemaobj, s) {
  schemaobj.schema = helpers.deepMerge(schemaobj.schema, this.superResolve(s, schemaobj.ctx));
}

/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/
Validator.prototype.superResolve = function superResolve (schema, ctx) {
  var ref;
  if(ref = shouldResolve(schema)) {
    return this.resolve(schema, ref, ctx).subschema;
  }
  return schema;
}

/**
* @private
* @param Object schema
* @param Object switchSchema
* @param SchemaContext ctx
* @return Object resolved schemas {subschema:String, switchSchema: String}
* @thorws SchemaError
*/
Validator.prototype.resolve = function resolve (schema, switchSchema, ctx) {
  switchSchema = ctx.resolve(switchSchema);
  // First see if the schema exists under the provided URI
  if (ctx.schemas[switchSchema]) {
    return {subschema: ctx.schemas[switchSchema], switchSchema: switchSchema};
  }
  // Else try walking the property pointer
  var parsed = urilib.parse(switchSchema);
  var fragment = parsed && parsed.hash;
  var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
  if (!document || !ctx.schemas[document]) {
    throw new SchemaError("no such schema <" + switchSchema + ">", schema);
  }
  var subschema = helpers.objectGetPath(ctx.schemas[document], fragment.substr(1));
  if(subschema===undefined){
    throw new SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
  }
  return {subschema: subschema, switchSchema: switchSchema};
};

/**
 * Tests whether the instance if of a certain type.
 * @private
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @param type
 * @return {boolean}
 */
Validator.prototype.testType = function validateType (instance, schema, options, ctx, type) {
  if (typeof this.types[type] == 'function') {
    return this.types[type].call(this, instance);
  }
  if (type && typeof type == 'object') {
    var res = this.validateSchema(instance, type, options, ctx);
    return res === undefined || !(res && res.errors.length);
  }
  // Undefined or properties not on the list are acceptable, same as not being defined
  return true;
};

var types = Validator.prototype.types = {};
types.string = function testString (instance) {
  return typeof instance == 'string';
};
types.number = function testNumber (instance) {
  // isFinite returns false for NaN, Infinity, and -Infinity
  return typeof instance == 'number' && isFinite(instance);
};
types.integer = function testInteger (instance) {
  return (typeof instance == 'number') && instance % 1 === 0;
};
types.boolean = function testBoolean (instance) {
  return typeof instance == 'boolean';
};
types.array = function testArray (instance) {
  return instance instanceof Array;
};
types['null'] = function testNull (instance) {
  return instance === null;
};
types.date = function testDate (instance) {
  return instance instanceof Date;
};
types.any = function testAny (instance) {
  return true;
};
types.object = function testObject (instance) {
  // TODO: fix this - see #15
  return instance && (typeof instance) === 'object' && !(instance instanceof Array) && !(instance instanceof Date);
};

module.exports = Validator;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)(module), __webpack_require__(29)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(25);
exports.encode = exports.stringify = __webpack_require__(26);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
//# sourceMappingURL=game_bundle.js.map