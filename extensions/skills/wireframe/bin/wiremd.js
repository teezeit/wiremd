#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/extend@3.0.2/node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/.pnpm/extend@3.0.2/node_modules/extend/index.js"(exports2, module2) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module2.exports = function extend2() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend2(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// packages/core/src/cli/index.ts
var cli_exports = {};
__export(cli_exports, {
  checkFileSize: () => checkFileSize,
  generateOutput: () => generateOutput,
  main: () => main,
  parseArgs: () => parseArgs,
  showHelp: () => showHelp,
  showVersion: () => showVersion
});
module.exports = __toCommonJS(cli_exports);
var import_fs5 = require("fs");
var import_path3 = require("path");
var import_url = require("url");

// packages/core/src/parser/index.ts
var import_fs = require("fs");
var import_path = require("path");

// node_modules/.pnpm/bail@2.0.2/node_modules/bail/index.js
function bail(error) {
  if (error) {
    throw error;
  }
}

// node_modules/.pnpm/unified@11.0.5/node_modules/unified/lib/index.js
var import_extend = __toESM(require_extend(), 1);

// node_modules/.pnpm/devlop@1.1.0/node_modules/devlop/lib/default.js
function ok() {
}

// node_modules/.pnpm/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}

// node_modules/.pnpm/trough@2.2.0/node_modules/trough/lib/index.js
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index2 = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2];
        }
      }
      values = output;
      if (fn) {
        wrap(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception = (
        /** @type {Error} */
        error
      );
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result && result.then && typeof result.then === "function") {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}

// node_modules/.pnpm/unist-util-stringify-position@4.0.0/node_modules/unist-util-stringify-position/lib/index.js
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position(value.position);
  }
  if ("start" in value || "end" in value) {
    return position(value);
  }
  if ("line" in value || "column" in value) {
    return point(value);
  }
  return "";
}
function point(point3) {
  return index(point3 && point3.line) + ":" + index(point3 && point3.column);
}
function position(pos) {
  return point(pos && pos.start) + "-" + point(pos && pos.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}

// node_modules/.pnpm/vfile-message@4.0.3/node_modules/vfile-message/lib/index.js
var VFileMessage = class extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(causeOrReason, optionsOrParentOrPlace, origin) {
    super();
    if (typeof optionsOrParentOrPlace === "string") {
      origin = optionsOrParentOrPlace;
      optionsOrParentOrPlace = void 0;
    }
    let reason = "";
    let options = {};
    let legacyCause = false;
    if (optionsOrParentOrPlace) {
      if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) {
        options = { place: optionsOrParentOrPlace };
      } else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) {
        options = { place: optionsOrParentOrPlace };
      } else if ("type" in optionsOrParentOrPlace) {
        options = {
          ancestors: [optionsOrParentOrPlace],
          place: optionsOrParentOrPlace.position
        };
      } else {
        options = { ...optionsOrParentOrPlace };
      }
    }
    if (typeof causeOrReason === "string") {
      reason = causeOrReason;
    } else if (!options.cause && causeOrReason) {
      legacyCause = true;
      reason = causeOrReason.message;
      options.cause = causeOrReason;
    }
    if (!options.ruleId && !options.source && typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        options.ruleId = origin;
      } else {
        options.source = origin.slice(0, index2);
        options.ruleId = origin.slice(index2 + 1);
      }
    }
    if (!options.place && options.ancestors && options.ancestors) {
      const parent = options.ancestors[options.ancestors.length - 1];
      if (parent) {
        options.place = parent.position;
      }
    }
    const start = options.place && "start" in options.place ? options.place.start : options.place;
    this.ancestors = options.ancestors || void 0;
    this.cause = options.cause || void 0;
    this.column = start ? start.column : void 0;
    this.fatal = void 0;
    this.file = "";
    this.message = reason;
    this.line = start ? start.line : void 0;
    this.name = stringifyPosition(options.place) || "1:1";
    this.place = options.place || void 0;
    this.reason = this.message;
    this.ruleId = options.ruleId || void 0;
    this.source = options.source || void 0;
    this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
    this.actual = void 0;
    this.expected = void 0;
    this.note = void 0;
    this.url = void 0;
  }
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.column = void 0;
VFileMessage.prototype.line = void 0;
VFileMessage.prototype.ancestors = void 0;
VFileMessage.prototype.cause = void 0;
VFileMessage.prototype.fatal = void 0;
VFileMessage.prototype.place = void 0;
VFileMessage.prototype.ruleId = void 0;
VFileMessage.prototype.source = void 0;

// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minpath.js
var import_node_path = __toESM(require("node:path"), 1);

// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minproc.js
var import_node_process = __toESM(require("node:process"), 1);

// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minurl.js
var import_node_url = require("node:url");

// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minurl.shared.js
function isUrl(fileUrlOrPath) {
  return Boolean(
    fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && // @ts-expect-error: indexing is fine.
    fileUrlOrPath.auth === void 0
  );
}

// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/index.js
var order = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
var VFile = class {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (isUrl(value)) {
      options = { path: value };
    } else if (typeof value === "string" || isUint8Array(value)) {
      options = { value };
    } else {
      options = value;
    }
    this.cwd = "cwd" in options ? "" : import_node_process.default.cwd();
    this.data = {};
    this.history = [];
    this.messages = [];
    this.value;
    this.map;
    this.result;
    this.stored;
    let index2 = -1;
    while (++index2 < order.length) {
      const field2 = order[index2];
      if (field2 in options && options[field2] !== void 0 && options[field2] !== null) {
        this[field2] = field2 === "history" ? [...options[field2]] : options[field2];
      }
    }
    let field;
    for (field in options) {
      if (!order.includes(field)) {
        this[field] = options[field];
      }
    }
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path === "string" ? import_node_path.default.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(basename4) {
    assertNonEmpty(basename4, "basename");
    assertPart(basename4, "basename");
    this.path = import_node_path.default.join(this.dirname || "", basename4);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path === "string" ? import_node_path.default.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(dirname6) {
    assertPath(this.basename, "dirname");
    this.path = import_node_path.default.join(dirname6 || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path === "string" ? import_node_path.default.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(extname2) {
    assertPart(extname2, "extname");
    assertPath(this.dirname, "extname");
    if (extname2) {
      if (extname2.codePointAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname2.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = import_node_path.default.join(this.dirname, this.stem + (extname2 || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(path2) {
    if (isUrl(path2)) {
      path2 = (0, import_node_url.fileURLToPath)(path2);
    }
    assertNonEmpty(path2, "path");
    if (this.path !== path2) {
      this.history.push(path2);
    }
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path === "string" ? import_node_path.default.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = import_node_path.default.join(this.dirname || "", stem + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = true;
    throw message;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = void 0;
    return message;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = new VFileMessage(
      // @ts-expect-error: the overloads are fine.
      causeOrReason,
      optionsOrParentOrPlace,
      origin
    );
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    if (this.value === void 0) {
      return "";
    }
    if (typeof this.value === "string") {
      return this.value;
    }
    const decoder = new TextDecoder(encoding || void 0);
    return decoder.decode(this.value);
  }
};
function assertPart(part, name) {
  if (part && part.includes(import_node_path.default.sep)) {
    throw new Error(
      "`" + name + "` cannot be a path: did not expect `" + import_node_path.default.sep + "`"
    );
  }
}
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error("`" + name + "` cannot be empty");
  }
}
function assertPath(path2, name) {
  if (!path2) {
    throw new Error("Setting `" + name + "` requires `path` to be set too");
  }
}
function isUint8Array(value) {
  return Boolean(
    value && typeof value === "object" && "byteLength" in value && "byteOffset" in value
  );
}

// node_modules/.pnpm/unified@11.0.5/node_modules/unified/lib/callable-instance.js
var CallableInstance = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(property) {
    const self = this;
    const constr = self.constructor;
    const proto2 = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      constr.prototype
    );
    const value = proto2[property];
    const apply = function() {
      return value.apply(apply, arguments);
    };
    Object.setPrototypeOf(apply, proto2);
    return apply;
  }
);

// node_modules/.pnpm/unified@11.0.5/node_modules/unified/lib/index.js
var own = {}.hasOwnProperty;
var Processor = class _Processor extends CallableInstance {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy");
    this.Compiler = void 0;
    this.Parser = void 0;
    this.attachers = [];
    this.compiler = void 0;
    this.freezeIndex = -1;
    this.frozen = void 0;
    this.namespace = {};
    this.parser = void 0;
    this.transformers = trough();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const destination = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new _Processor()
    );
    let index2 = -1;
    while (++index2 < this.attachers.length) {
      const attacher = this.attachers[index2];
      destination.use(...attacher);
    }
    destination.data((0, import_extend.default)(true, {}, this.namespace));
    return destination;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(key, value) {
    if (typeof key === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", this.frozen);
        this.namespace[key] = value;
        return this;
      }
      return own.call(this.namespace, key) && this.namespace[key] || void 0;
    }
    if (key) {
      assertUnfrozen("data", this.frozen);
      this.namespace = key;
      return this;
    }
    return this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen) {
      return this;
    }
    const self = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    while (++this.freezeIndex < this.attachers.length) {
      const [attacher, ...options] = this.attachers[this.freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(self, ...options);
      if (typeof transformer === "function") {
        this.transformers.use(transformer);
      }
    }
    this.frozen = true;
    this.freezeIndex = Number.POSITIVE_INFINITY;
    return this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(file) {
    this.freeze();
    const realFile = vfile(file);
    const parser = this.parser || this.Parser;
    assertParser("parse", parser);
    return parser(String(realFile), realFile);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(file, done) {
    const self = this;
    this.freeze();
    assertParser("process", this.parser || this.Parser);
    assertCompiler("process", this.compiler || this.Compiler);
    return done ? executor(void 0, done) : new Promise(executor);
    function executor(resolve5, reject) {
      const realFile = vfile(file);
      const parseTree = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        self.parse(realFile)
      );
      self.run(parseTree, realFile, function(error, tree, file2) {
        if (error || !tree || !file2) {
          return realDone(error);
        }
        const compileTree = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          tree
        );
        const compileResult = self.stringify(compileTree, file2);
        if (looksLikeAValue(compileResult)) {
          file2.value = compileResult;
        } else {
          file2.result = compileResult;
        }
        realDone(
          error,
          /** @type {VFileWithOutput<CompileResult>} */
          file2
        );
      });
      function realDone(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve5) {
          resolve5(file2);
        } else {
          ok(done, "`done` is defined if `resolve` is not");
          done(void 0, file2);
        }
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(file) {
    let complete = false;
    let result;
    this.freeze();
    assertParser("processSync", this.parser || this.Parser);
    assertCompiler("processSync", this.compiler || this.Compiler);
    this.process(file, realDone);
    assertDone("processSync", "process", complete);
    ok(result, "we either bailed on an error or have a tree");
    return result;
    function realDone(error, file2) {
      complete = true;
      bail(error);
      result = file2;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(tree, file, done) {
    assertNode(tree);
    this.freeze();
    const transformers = this.transformers;
    if (!done && typeof file === "function") {
      done = file;
      file = void 0;
    }
    return done ? executor(void 0, done) : new Promise(executor);
    function executor(resolve5, reject) {
      ok(
        typeof file !== "function",
        "`file` can\u2019t be a `done` anymore, we checked"
      );
      const realFile = vfile(file);
      transformers.run(tree, realFile, realDone);
      function realDone(error, outputTree, file2) {
        const resultingTree = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          outputTree || tree
        );
        if (error) {
          reject(error);
        } else if (resolve5) {
          resolve5(resultingTree);
        } else {
          ok(done, "`done` is defined if `resolve` is not");
          done(void 0, resultingTree, file2);
        }
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(tree, file) {
    let complete = false;
    let result;
    this.run(tree, file, realDone);
    assertDone("runSync", "run", complete);
    ok(result, "we either bailed on an error or have a tree");
    return result;
    function realDone(error, tree2) {
      bail(error);
      result = tree2;
      complete = true;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(tree, file) {
    this.freeze();
    const realFile = vfile(file);
    const compiler2 = this.compiler || this.Compiler;
    assertCompiler("stringify", compiler2);
    assertNode(tree);
    return compiler2(tree, realFile);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(value, ...parameters) {
    const attachers = this.attachers;
    const namespace = this.namespace;
    assertUnfrozen("use", this.frozen);
    if (value === null || value === void 0) {
    } else if (typeof value === "function") {
      addPlugin(value, parameters);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value + "`");
    }
    return this;
    function add(value2) {
      if (typeof value2 === "function") {
        addPlugin(value2, []);
      } else if (typeof value2 === "object") {
        if (Array.isArray(value2)) {
          const [plugin, ...parameters2] = (
            /** @type {PluginTuple<Array<unknown>>} */
            value2
          );
          addPlugin(plugin, parameters2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value2 + "`");
      }
    }
    function addPreset(result) {
      if (!("plugins" in result) && !("settings" in result)) {
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      }
      addList(result.plugins);
      if (result.settings) {
        namespace.settings = (0, import_extend.default)(true, namespace.settings, result.settings);
      }
    }
    function addList(plugins) {
      let index2 = -1;
      if (plugins === null || plugins === void 0) {
      } else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2];
          add(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, parameters2) {
      let index2 = -1;
      let entryIndex = -1;
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entryIndex = index2;
          break;
        }
      }
      if (entryIndex === -1) {
        attachers.push([plugin, ...parameters2]);
      } else if (parameters2.length > 0) {
        let [primary, ...rest] = parameters2;
        const currentPrimary = attachers[entryIndex][1];
        if (isPlainObject(currentPrimary) && isPlainObject(primary)) {
          primary = (0, import_extend.default)(true, currentPrimary, primary);
        }
        attachers[entryIndex] = [plugin, primary, ...rest];
      }
    }
  }
};
var unified = new Processor().freeze();
function assertParser(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `parser`");
  }
}
function assertCompiler(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `compiler`");
  }
}
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
  }
}
function assertNode(node2) {
  if (!isPlainObject(node2) || typeof node2.type !== "string") {
    throw new TypeError("Expected node, got `" + node2 + "`");
  }
}
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name + "` finished async. Use `" + asyncName + "` instead"
    );
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(
    value && typeof value === "object" && "message" in value && "messages" in value
  );
}
function looksLikeAValue(value) {
  return typeof value === "string" || isUint8Array2(value);
}
function isUint8Array2(value) {
  return Boolean(
    value && typeof value === "object" && "byteLength" in value && "byteOffset" in value
  );
}

// node_modules/.pnpm/mdast-util-to-string@4.0.0/node_modules/mdast-util-to-string/lib/index.js
var emptyOptions = {};
function toString(value, options) {
  const settings = options || emptyOptions;
  const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
  const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;
  return one(value, includeImageAlt, includeHtml);
}
function one(value, includeImageAlt, includeHtml) {
  if (node(value)) {
    if ("value" in value) {
      return value.type === "html" && !includeHtml ? "" : value.value;
    }
    if (includeImageAlt && "alt" in value && value.alt) {
      return value.alt;
    }
    if ("children" in value) {
      return all(value.children, includeImageAlt, includeHtml);
    }
  }
  if (Array.isArray(value)) {
    return all(value, includeImageAlt, includeHtml);
  }
  return "";
}
function all(values, includeImageAlt, includeHtml) {
  const result = [];
  let index2 = -1;
  while (++index2 < values.length) {
    result[index2] = one(values[index2], includeImageAlt, includeHtml);
  }
  return result.join("");
}
function node(value) {
  return Boolean(value && typeof value === "object");
}

// node_modules/.pnpm/character-entities@2.0.2/node_modules/character-entities/index.js
var characterEntities = {
  AElig: "\xC6",
  AMP: "&",
  Aacute: "\xC1",
  Abreve: "\u0102",
  Acirc: "\xC2",
  Acy: "\u0410",
  Afr: "\u{1D504}",
  Agrave: "\xC0",
  Alpha: "\u0391",
  Amacr: "\u0100",
  And: "\u2A53",
  Aogon: "\u0104",
  Aopf: "\u{1D538}",
  ApplyFunction: "\u2061",
  Aring: "\xC5",
  Ascr: "\u{1D49C}",
  Assign: "\u2254",
  Atilde: "\xC3",
  Auml: "\xC4",
  Backslash: "\u2216",
  Barv: "\u2AE7",
  Barwed: "\u2306",
  Bcy: "\u0411",
  Because: "\u2235",
  Bernoullis: "\u212C",
  Beta: "\u0392",
  Bfr: "\u{1D505}",
  Bopf: "\u{1D539}",
  Breve: "\u02D8",
  Bscr: "\u212C",
  Bumpeq: "\u224E",
  CHcy: "\u0427",
  COPY: "\xA9",
  Cacute: "\u0106",
  Cap: "\u22D2",
  CapitalDifferentialD: "\u2145",
  Cayleys: "\u212D",
  Ccaron: "\u010C",
  Ccedil: "\xC7",
  Ccirc: "\u0108",
  Cconint: "\u2230",
  Cdot: "\u010A",
  Cedilla: "\xB8",
  CenterDot: "\xB7",
  Cfr: "\u212D",
  Chi: "\u03A7",
  CircleDot: "\u2299",
  CircleMinus: "\u2296",
  CirclePlus: "\u2295",
  CircleTimes: "\u2297",
  ClockwiseContourIntegral: "\u2232",
  CloseCurlyDoubleQuote: "\u201D",
  CloseCurlyQuote: "\u2019",
  Colon: "\u2237",
  Colone: "\u2A74",
  Congruent: "\u2261",
  Conint: "\u222F",
  ContourIntegral: "\u222E",
  Copf: "\u2102",
  Coproduct: "\u2210",
  CounterClockwiseContourIntegral: "\u2233",
  Cross: "\u2A2F",
  Cscr: "\u{1D49E}",
  Cup: "\u22D3",
  CupCap: "\u224D",
  DD: "\u2145",
  DDotrahd: "\u2911",
  DJcy: "\u0402",
  DScy: "\u0405",
  DZcy: "\u040F",
  Dagger: "\u2021",
  Darr: "\u21A1",
  Dashv: "\u2AE4",
  Dcaron: "\u010E",
  Dcy: "\u0414",
  Del: "\u2207",
  Delta: "\u0394",
  Dfr: "\u{1D507}",
  DiacriticalAcute: "\xB4",
  DiacriticalDot: "\u02D9",
  DiacriticalDoubleAcute: "\u02DD",
  DiacriticalGrave: "`",
  DiacriticalTilde: "\u02DC",
  Diamond: "\u22C4",
  DifferentialD: "\u2146",
  Dopf: "\u{1D53B}",
  Dot: "\xA8",
  DotDot: "\u20DC",
  DotEqual: "\u2250",
  DoubleContourIntegral: "\u222F",
  DoubleDot: "\xA8",
  DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0",
  DoubleLeftRightArrow: "\u21D4",
  DoubleLeftTee: "\u2AE4",
  DoubleLongLeftArrow: "\u27F8",
  DoubleLongLeftRightArrow: "\u27FA",
  DoubleLongRightArrow: "\u27F9",
  DoubleRightArrow: "\u21D2",
  DoubleRightTee: "\u22A8",
  DoubleUpArrow: "\u21D1",
  DoubleUpDownArrow: "\u21D5",
  DoubleVerticalBar: "\u2225",
  DownArrow: "\u2193",
  DownArrowBar: "\u2913",
  DownArrowUpArrow: "\u21F5",
  DownBreve: "\u0311",
  DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E",
  DownLeftVector: "\u21BD",
  DownLeftVectorBar: "\u2956",
  DownRightTeeVector: "\u295F",
  DownRightVector: "\u21C1",
  DownRightVectorBar: "\u2957",
  DownTee: "\u22A4",
  DownTeeArrow: "\u21A7",
  Downarrow: "\u21D3",
  Dscr: "\u{1D49F}",
  Dstrok: "\u0110",
  ENG: "\u014A",
  ETH: "\xD0",
  Eacute: "\xC9",
  Ecaron: "\u011A",
  Ecirc: "\xCA",
  Ecy: "\u042D",
  Edot: "\u0116",
  Efr: "\u{1D508}",
  Egrave: "\xC8",
  Element: "\u2208",
  Emacr: "\u0112",
  EmptySmallSquare: "\u25FB",
  EmptyVerySmallSquare: "\u25AB",
  Eogon: "\u0118",
  Eopf: "\u{1D53C}",
  Epsilon: "\u0395",
  Equal: "\u2A75",
  EqualTilde: "\u2242",
  Equilibrium: "\u21CC",
  Escr: "\u2130",
  Esim: "\u2A73",
  Eta: "\u0397",
  Euml: "\xCB",
  Exists: "\u2203",
  ExponentialE: "\u2147",
  Fcy: "\u0424",
  Ffr: "\u{1D509}",
  FilledSmallSquare: "\u25FC",
  FilledVerySmallSquare: "\u25AA",
  Fopf: "\u{1D53D}",
  ForAll: "\u2200",
  Fouriertrf: "\u2131",
  Fscr: "\u2131",
  GJcy: "\u0403",
  GT: ">",
  Gamma: "\u0393",
  Gammad: "\u03DC",
  Gbreve: "\u011E",
  Gcedil: "\u0122",
  Gcirc: "\u011C",
  Gcy: "\u0413",
  Gdot: "\u0120",
  Gfr: "\u{1D50A}",
  Gg: "\u22D9",
  Gopf: "\u{1D53E}",
  GreaterEqual: "\u2265",
  GreaterEqualLess: "\u22DB",
  GreaterFullEqual: "\u2267",
  GreaterGreater: "\u2AA2",
  GreaterLess: "\u2277",
  GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273",
  Gscr: "\u{1D4A2}",
  Gt: "\u226B",
  HARDcy: "\u042A",
  Hacek: "\u02C7",
  Hat: "^",
  Hcirc: "\u0124",
  Hfr: "\u210C",
  HilbertSpace: "\u210B",
  Hopf: "\u210D",
  HorizontalLine: "\u2500",
  Hscr: "\u210B",
  Hstrok: "\u0126",
  HumpDownHump: "\u224E",
  HumpEqual: "\u224F",
  IEcy: "\u0415",
  IJlig: "\u0132",
  IOcy: "\u0401",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Icy: "\u0418",
  Idot: "\u0130",
  Ifr: "\u2111",
  Igrave: "\xCC",
  Im: "\u2111",
  Imacr: "\u012A",
  ImaginaryI: "\u2148",
  Implies: "\u21D2",
  Int: "\u222C",
  Integral: "\u222B",
  Intersection: "\u22C2",
  InvisibleComma: "\u2063",
  InvisibleTimes: "\u2062",
  Iogon: "\u012E",
  Iopf: "\u{1D540}",
  Iota: "\u0399",
  Iscr: "\u2110",
  Itilde: "\u0128",
  Iukcy: "\u0406",
  Iuml: "\xCF",
  Jcirc: "\u0134",
  Jcy: "\u0419",
  Jfr: "\u{1D50D}",
  Jopf: "\u{1D541}",
  Jscr: "\u{1D4A5}",
  Jsercy: "\u0408",
  Jukcy: "\u0404",
  KHcy: "\u0425",
  KJcy: "\u040C",
  Kappa: "\u039A",
  Kcedil: "\u0136",
  Kcy: "\u041A",
  Kfr: "\u{1D50E}",
  Kopf: "\u{1D542}",
  Kscr: "\u{1D4A6}",
  LJcy: "\u0409",
  LT: "<",
  Lacute: "\u0139",
  Lambda: "\u039B",
  Lang: "\u27EA",
  Laplacetrf: "\u2112",
  Larr: "\u219E",
  Lcaron: "\u013D",
  Lcedil: "\u013B",
  Lcy: "\u041B",
  LeftAngleBracket: "\u27E8",
  LeftArrow: "\u2190",
  LeftArrowBar: "\u21E4",
  LeftArrowRightArrow: "\u21C6",
  LeftCeiling: "\u2308",
  LeftDoubleBracket: "\u27E6",
  LeftDownTeeVector: "\u2961",
  LeftDownVector: "\u21C3",
  LeftDownVectorBar: "\u2959",
  LeftFloor: "\u230A",
  LeftRightArrow: "\u2194",
  LeftRightVector: "\u294E",
  LeftTee: "\u22A3",
  LeftTeeArrow: "\u21A4",
  LeftTeeVector: "\u295A",
  LeftTriangle: "\u22B2",
  LeftTriangleBar: "\u29CF",
  LeftTriangleEqual: "\u22B4",
  LeftUpDownVector: "\u2951",
  LeftUpTeeVector: "\u2960",
  LeftUpVector: "\u21BF",
  LeftUpVectorBar: "\u2958",
  LeftVector: "\u21BC",
  LeftVectorBar: "\u2952",
  Leftarrow: "\u21D0",
  Leftrightarrow: "\u21D4",
  LessEqualGreater: "\u22DA",
  LessFullEqual: "\u2266",
  LessGreater: "\u2276",
  LessLess: "\u2AA1",
  LessSlantEqual: "\u2A7D",
  LessTilde: "\u2272",
  Lfr: "\u{1D50F}",
  Ll: "\u22D8",
  Lleftarrow: "\u21DA",
  Lmidot: "\u013F",
  LongLeftArrow: "\u27F5",
  LongLeftRightArrow: "\u27F7",
  LongRightArrow: "\u27F6",
  Longleftarrow: "\u27F8",
  Longleftrightarrow: "\u27FA",
  Longrightarrow: "\u27F9",
  Lopf: "\u{1D543}",
  LowerLeftArrow: "\u2199",
  LowerRightArrow: "\u2198",
  Lscr: "\u2112",
  Lsh: "\u21B0",
  Lstrok: "\u0141",
  Lt: "\u226A",
  Map: "\u2905",
  Mcy: "\u041C",
  MediumSpace: "\u205F",
  Mellintrf: "\u2133",
  Mfr: "\u{1D510}",
  MinusPlus: "\u2213",
  Mopf: "\u{1D544}",
  Mscr: "\u2133",
  Mu: "\u039C",
  NJcy: "\u040A",
  Nacute: "\u0143",
  Ncaron: "\u0147",
  Ncedil: "\u0145",
  Ncy: "\u041D",
  NegativeMediumSpace: "\u200B",
  NegativeThickSpace: "\u200B",
  NegativeThinSpace: "\u200B",
  NegativeVeryThinSpace: "\u200B",
  NestedGreaterGreater: "\u226B",
  NestedLessLess: "\u226A",
  NewLine: "\n",
  Nfr: "\u{1D511}",
  NoBreak: "\u2060",
  NonBreakingSpace: "\xA0",
  Nopf: "\u2115",
  Not: "\u2AEC",
  NotCongruent: "\u2262",
  NotCupCap: "\u226D",
  NotDoubleVerticalBar: "\u2226",
  NotElement: "\u2209",
  NotEqual: "\u2260",
  NotEqualTilde: "\u2242\u0338",
  NotExists: "\u2204",
  NotGreater: "\u226F",
  NotGreaterEqual: "\u2271",
  NotGreaterFullEqual: "\u2267\u0338",
  NotGreaterGreater: "\u226B\u0338",
  NotGreaterLess: "\u2279",
  NotGreaterSlantEqual: "\u2A7E\u0338",
  NotGreaterTilde: "\u2275",
  NotHumpDownHump: "\u224E\u0338",
  NotHumpEqual: "\u224F\u0338",
  NotLeftTriangle: "\u22EA",
  NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangleEqual: "\u22EC",
  NotLess: "\u226E",
  NotLessEqual: "\u2270",
  NotLessGreater: "\u2278",
  NotLessLess: "\u226A\u0338",
  NotLessSlantEqual: "\u2A7D\u0338",
  NotLessTilde: "\u2274",
  NotNestedGreaterGreater: "\u2AA2\u0338",
  NotNestedLessLess: "\u2AA1\u0338",
  NotPrecedes: "\u2280",
  NotPrecedesEqual: "\u2AAF\u0338",
  NotPrecedesSlantEqual: "\u22E0",
  NotReverseElement: "\u220C",
  NotRightTriangle: "\u22EB",
  NotRightTriangleBar: "\u29D0\u0338",
  NotRightTriangleEqual: "\u22ED",
  NotSquareSubset: "\u228F\u0338",
  NotSquareSubsetEqual: "\u22E2",
  NotSquareSuperset: "\u2290\u0338",
  NotSquareSupersetEqual: "\u22E3",
  NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288",
  NotSucceeds: "\u2281",
  NotSucceedsEqual: "\u2AB0\u0338",
  NotSucceedsSlantEqual: "\u22E1",
  NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2",
  NotSupersetEqual: "\u2289",
  NotTilde: "\u2241",
  NotTildeEqual: "\u2244",
  NotTildeFullEqual: "\u2247",
  NotTildeTilde: "\u2249",
  NotVerticalBar: "\u2224",
  Nscr: "\u{1D4A9}",
  Ntilde: "\xD1",
  Nu: "\u039D",
  OElig: "\u0152",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Ocy: "\u041E",
  Odblac: "\u0150",
  Ofr: "\u{1D512}",
  Ograve: "\xD2",
  Omacr: "\u014C",
  Omega: "\u03A9",
  Omicron: "\u039F",
  Oopf: "\u{1D546}",
  OpenCurlyDoubleQuote: "\u201C",
  OpenCurlyQuote: "\u2018",
  Or: "\u2A54",
  Oscr: "\u{1D4AA}",
  Oslash: "\xD8",
  Otilde: "\xD5",
  Otimes: "\u2A37",
  Ouml: "\xD6",
  OverBar: "\u203E",
  OverBrace: "\u23DE",
  OverBracket: "\u23B4",
  OverParenthesis: "\u23DC",
  PartialD: "\u2202",
  Pcy: "\u041F",
  Pfr: "\u{1D513}",
  Phi: "\u03A6",
  Pi: "\u03A0",
  PlusMinus: "\xB1",
  Poincareplane: "\u210C",
  Popf: "\u2119",
  Pr: "\u2ABB",
  Precedes: "\u227A",
  PrecedesEqual: "\u2AAF",
  PrecedesSlantEqual: "\u227C",
  PrecedesTilde: "\u227E",
  Prime: "\u2033",
  Product: "\u220F",
  Proportion: "\u2237",
  Proportional: "\u221D",
  Pscr: "\u{1D4AB}",
  Psi: "\u03A8",
  QUOT: '"',
  Qfr: "\u{1D514}",
  Qopf: "\u211A",
  Qscr: "\u{1D4AC}",
  RBarr: "\u2910",
  REG: "\xAE",
  Racute: "\u0154",
  Rang: "\u27EB",
  Rarr: "\u21A0",
  Rarrtl: "\u2916",
  Rcaron: "\u0158",
  Rcedil: "\u0156",
  Rcy: "\u0420",
  Re: "\u211C",
  ReverseElement: "\u220B",
  ReverseEquilibrium: "\u21CB",
  ReverseUpEquilibrium: "\u296F",
  Rfr: "\u211C",
  Rho: "\u03A1",
  RightAngleBracket: "\u27E9",
  RightArrow: "\u2192",
  RightArrowBar: "\u21E5",
  RightArrowLeftArrow: "\u21C4",
  RightCeiling: "\u2309",
  RightDoubleBracket: "\u27E7",
  RightDownTeeVector: "\u295D",
  RightDownVector: "\u21C2",
  RightDownVectorBar: "\u2955",
  RightFloor: "\u230B",
  RightTee: "\u22A2",
  RightTeeArrow: "\u21A6",
  RightTeeVector: "\u295B",
  RightTriangle: "\u22B3",
  RightTriangleBar: "\u29D0",
  RightTriangleEqual: "\u22B5",
  RightUpDownVector: "\u294F",
  RightUpTeeVector: "\u295C",
  RightUpVector: "\u21BE",
  RightUpVectorBar: "\u2954",
  RightVector: "\u21C0",
  RightVectorBar: "\u2953",
  Rightarrow: "\u21D2",
  Ropf: "\u211D",
  RoundImplies: "\u2970",
  Rrightarrow: "\u21DB",
  Rscr: "\u211B",
  Rsh: "\u21B1",
  RuleDelayed: "\u29F4",
  SHCHcy: "\u0429",
  SHcy: "\u0428",
  SOFTcy: "\u042C",
  Sacute: "\u015A",
  Sc: "\u2ABC",
  Scaron: "\u0160",
  Scedil: "\u015E",
  Scirc: "\u015C",
  Scy: "\u0421",
  Sfr: "\u{1D516}",
  ShortDownArrow: "\u2193",
  ShortLeftArrow: "\u2190",
  ShortRightArrow: "\u2192",
  ShortUpArrow: "\u2191",
  Sigma: "\u03A3",
  SmallCircle: "\u2218",
  Sopf: "\u{1D54A}",
  Sqrt: "\u221A",
  Square: "\u25A1",
  SquareIntersection: "\u2293",
  SquareSubset: "\u228F",
  SquareSubsetEqual: "\u2291",
  SquareSuperset: "\u2290",
  SquareSupersetEqual: "\u2292",
  SquareUnion: "\u2294",
  Sscr: "\u{1D4AE}",
  Star: "\u22C6",
  Sub: "\u22D0",
  Subset: "\u22D0",
  SubsetEqual: "\u2286",
  Succeeds: "\u227B",
  SucceedsEqual: "\u2AB0",
  SucceedsSlantEqual: "\u227D",
  SucceedsTilde: "\u227F",
  SuchThat: "\u220B",
  Sum: "\u2211",
  Sup: "\u22D1",
  Superset: "\u2283",
  SupersetEqual: "\u2287",
  Supset: "\u22D1",
  THORN: "\xDE",
  TRADE: "\u2122",
  TSHcy: "\u040B",
  TScy: "\u0426",
  Tab: "	",
  Tau: "\u03A4",
  Tcaron: "\u0164",
  Tcedil: "\u0162",
  Tcy: "\u0422",
  Tfr: "\u{1D517}",
  Therefore: "\u2234",
  Theta: "\u0398",
  ThickSpace: "\u205F\u200A",
  ThinSpace: "\u2009",
  Tilde: "\u223C",
  TildeEqual: "\u2243",
  TildeFullEqual: "\u2245",
  TildeTilde: "\u2248",
  Topf: "\u{1D54B}",
  TripleDot: "\u20DB",
  Tscr: "\u{1D4AF}",
  Tstrok: "\u0166",
  Uacute: "\xDA",
  Uarr: "\u219F",
  Uarrocir: "\u2949",
  Ubrcy: "\u040E",
  Ubreve: "\u016C",
  Ucirc: "\xDB",
  Ucy: "\u0423",
  Udblac: "\u0170",
  Ufr: "\u{1D518}",
  Ugrave: "\xD9",
  Umacr: "\u016A",
  UnderBar: "_",
  UnderBrace: "\u23DF",
  UnderBracket: "\u23B5",
  UnderParenthesis: "\u23DD",
  Union: "\u22C3",
  UnionPlus: "\u228E",
  Uogon: "\u0172",
  Uopf: "\u{1D54C}",
  UpArrow: "\u2191",
  UpArrowBar: "\u2912",
  UpArrowDownArrow: "\u21C5",
  UpDownArrow: "\u2195",
  UpEquilibrium: "\u296E",
  UpTee: "\u22A5",
  UpTeeArrow: "\u21A5",
  Uparrow: "\u21D1",
  Updownarrow: "\u21D5",
  UpperLeftArrow: "\u2196",
  UpperRightArrow: "\u2197",
  Upsi: "\u03D2",
  Upsilon: "\u03A5",
  Uring: "\u016E",
  Uscr: "\u{1D4B0}",
  Utilde: "\u0168",
  Uuml: "\xDC",
  VDash: "\u22AB",
  Vbar: "\u2AEB",
  Vcy: "\u0412",
  Vdash: "\u22A9",
  Vdashl: "\u2AE6",
  Vee: "\u22C1",
  Verbar: "\u2016",
  Vert: "\u2016",
  VerticalBar: "\u2223",
  VerticalLine: "|",
  VerticalSeparator: "\u2758",
  VerticalTilde: "\u2240",
  VeryThinSpace: "\u200A",
  Vfr: "\u{1D519}",
  Vopf: "\u{1D54D}",
  Vscr: "\u{1D4B1}",
  Vvdash: "\u22AA",
  Wcirc: "\u0174",
  Wedge: "\u22C0",
  Wfr: "\u{1D51A}",
  Wopf: "\u{1D54E}",
  Wscr: "\u{1D4B2}",
  Xfr: "\u{1D51B}",
  Xi: "\u039E",
  Xopf: "\u{1D54F}",
  Xscr: "\u{1D4B3}",
  YAcy: "\u042F",
  YIcy: "\u0407",
  YUcy: "\u042E",
  Yacute: "\xDD",
  Ycirc: "\u0176",
  Ycy: "\u042B",
  Yfr: "\u{1D51C}",
  Yopf: "\u{1D550}",
  Yscr: "\u{1D4B4}",
  Yuml: "\u0178",
  ZHcy: "\u0416",
  Zacute: "\u0179",
  Zcaron: "\u017D",
  Zcy: "\u0417",
  Zdot: "\u017B",
  ZeroWidthSpace: "\u200B",
  Zeta: "\u0396",
  Zfr: "\u2128",
  Zopf: "\u2124",
  Zscr: "\u{1D4B5}",
  aacute: "\xE1",
  abreve: "\u0103",
  ac: "\u223E",
  acE: "\u223E\u0333",
  acd: "\u223F",
  acirc: "\xE2",
  acute: "\xB4",
  acy: "\u0430",
  aelig: "\xE6",
  af: "\u2061",
  afr: "\u{1D51E}",
  agrave: "\xE0",
  alefsym: "\u2135",
  aleph: "\u2135",
  alpha: "\u03B1",
  amacr: "\u0101",
  amalg: "\u2A3F",
  amp: "&",
  and: "\u2227",
  andand: "\u2A55",
  andd: "\u2A5C",
  andslope: "\u2A58",
  andv: "\u2A5A",
  ang: "\u2220",
  ange: "\u29A4",
  angle: "\u2220",
  angmsd: "\u2221",
  angmsdaa: "\u29A8",
  angmsdab: "\u29A9",
  angmsdac: "\u29AA",
  angmsdad: "\u29AB",
  angmsdae: "\u29AC",
  angmsdaf: "\u29AD",
  angmsdag: "\u29AE",
  angmsdah: "\u29AF",
  angrt: "\u221F",
  angrtvb: "\u22BE",
  angrtvbd: "\u299D",
  angsph: "\u2222",
  angst: "\xC5",
  angzarr: "\u237C",
  aogon: "\u0105",
  aopf: "\u{1D552}",
  ap: "\u2248",
  apE: "\u2A70",
  apacir: "\u2A6F",
  ape: "\u224A",
  apid: "\u224B",
  apos: "'",
  approx: "\u2248",
  approxeq: "\u224A",
  aring: "\xE5",
  ascr: "\u{1D4B6}",
  ast: "*",
  asymp: "\u2248",
  asympeq: "\u224D",
  atilde: "\xE3",
  auml: "\xE4",
  awconint: "\u2233",
  awint: "\u2A11",
  bNot: "\u2AED",
  backcong: "\u224C",
  backepsilon: "\u03F6",
  backprime: "\u2035",
  backsim: "\u223D",
  backsimeq: "\u22CD",
  barvee: "\u22BD",
  barwed: "\u2305",
  barwedge: "\u2305",
  bbrk: "\u23B5",
  bbrktbrk: "\u23B6",
  bcong: "\u224C",
  bcy: "\u0431",
  bdquo: "\u201E",
  becaus: "\u2235",
  because: "\u2235",
  bemptyv: "\u29B0",
  bepsi: "\u03F6",
  bernou: "\u212C",
  beta: "\u03B2",
  beth: "\u2136",
  between: "\u226C",
  bfr: "\u{1D51F}",
  bigcap: "\u22C2",
  bigcirc: "\u25EF",
  bigcup: "\u22C3",
  bigodot: "\u2A00",
  bigoplus: "\u2A01",
  bigotimes: "\u2A02",
  bigsqcup: "\u2A06",
  bigstar: "\u2605",
  bigtriangledown: "\u25BD",
  bigtriangleup: "\u25B3",
  biguplus: "\u2A04",
  bigvee: "\u22C1",
  bigwedge: "\u22C0",
  bkarow: "\u290D",
  blacklozenge: "\u29EB",
  blacksquare: "\u25AA",
  blacktriangle: "\u25B4",
  blacktriangledown: "\u25BE",
  blacktriangleleft: "\u25C2",
  blacktriangleright: "\u25B8",
  blank: "\u2423",
  blk12: "\u2592",
  blk14: "\u2591",
  blk34: "\u2593",
  block: "\u2588",
  bne: "=\u20E5",
  bnequiv: "\u2261\u20E5",
  bnot: "\u2310",
  bopf: "\u{1D553}",
  bot: "\u22A5",
  bottom: "\u22A5",
  bowtie: "\u22C8",
  boxDL: "\u2557",
  boxDR: "\u2554",
  boxDl: "\u2556",
  boxDr: "\u2553",
  boxH: "\u2550",
  boxHD: "\u2566",
  boxHU: "\u2569",
  boxHd: "\u2564",
  boxHu: "\u2567",
  boxUL: "\u255D",
  boxUR: "\u255A",
  boxUl: "\u255C",
  boxUr: "\u2559",
  boxV: "\u2551",
  boxVH: "\u256C",
  boxVL: "\u2563",
  boxVR: "\u2560",
  boxVh: "\u256B",
  boxVl: "\u2562",
  boxVr: "\u255F",
  boxbox: "\u29C9",
  boxdL: "\u2555",
  boxdR: "\u2552",
  boxdl: "\u2510",
  boxdr: "\u250C",
  boxh: "\u2500",
  boxhD: "\u2565",
  boxhU: "\u2568",
  boxhd: "\u252C",
  boxhu: "\u2534",
  boxminus: "\u229F",
  boxplus: "\u229E",
  boxtimes: "\u22A0",
  boxuL: "\u255B",
  boxuR: "\u2558",
  boxul: "\u2518",
  boxur: "\u2514",
  boxv: "\u2502",
  boxvH: "\u256A",
  boxvL: "\u2561",
  boxvR: "\u255E",
  boxvh: "\u253C",
  boxvl: "\u2524",
  boxvr: "\u251C",
  bprime: "\u2035",
  breve: "\u02D8",
  brvbar: "\xA6",
  bscr: "\u{1D4B7}",
  bsemi: "\u204F",
  bsim: "\u223D",
  bsime: "\u22CD",
  bsol: "\\",
  bsolb: "\u29C5",
  bsolhsub: "\u27C8",
  bull: "\u2022",
  bullet: "\u2022",
  bump: "\u224E",
  bumpE: "\u2AAE",
  bumpe: "\u224F",
  bumpeq: "\u224F",
  cacute: "\u0107",
  cap: "\u2229",
  capand: "\u2A44",
  capbrcup: "\u2A49",
  capcap: "\u2A4B",
  capcup: "\u2A47",
  capdot: "\u2A40",
  caps: "\u2229\uFE00",
  caret: "\u2041",
  caron: "\u02C7",
  ccaps: "\u2A4D",
  ccaron: "\u010D",
  ccedil: "\xE7",
  ccirc: "\u0109",
  ccups: "\u2A4C",
  ccupssm: "\u2A50",
  cdot: "\u010B",
  cedil: "\xB8",
  cemptyv: "\u29B2",
  cent: "\xA2",
  centerdot: "\xB7",
  cfr: "\u{1D520}",
  chcy: "\u0447",
  check: "\u2713",
  checkmark: "\u2713",
  chi: "\u03C7",
  cir: "\u25CB",
  cirE: "\u29C3",
  circ: "\u02C6",
  circeq: "\u2257",
  circlearrowleft: "\u21BA",
  circlearrowright: "\u21BB",
  circledR: "\xAE",
  circledS: "\u24C8",
  circledast: "\u229B",
  circledcirc: "\u229A",
  circleddash: "\u229D",
  cire: "\u2257",
  cirfnint: "\u2A10",
  cirmid: "\u2AEF",
  cirscir: "\u29C2",
  clubs: "\u2663",
  clubsuit: "\u2663",
  colon: ":",
  colone: "\u2254",
  coloneq: "\u2254",
  comma: ",",
  commat: "@",
  comp: "\u2201",
  compfn: "\u2218",
  complement: "\u2201",
  complexes: "\u2102",
  cong: "\u2245",
  congdot: "\u2A6D",
  conint: "\u222E",
  copf: "\u{1D554}",
  coprod: "\u2210",
  copy: "\xA9",
  copysr: "\u2117",
  crarr: "\u21B5",
  cross: "\u2717",
  cscr: "\u{1D4B8}",
  csub: "\u2ACF",
  csube: "\u2AD1",
  csup: "\u2AD0",
  csupe: "\u2AD2",
  ctdot: "\u22EF",
  cudarrl: "\u2938",
  cudarrr: "\u2935",
  cuepr: "\u22DE",
  cuesc: "\u22DF",
  cularr: "\u21B6",
  cularrp: "\u293D",
  cup: "\u222A",
  cupbrcap: "\u2A48",
  cupcap: "\u2A46",
  cupcup: "\u2A4A",
  cupdot: "\u228D",
  cupor: "\u2A45",
  cups: "\u222A\uFE00",
  curarr: "\u21B7",
  curarrm: "\u293C",
  curlyeqprec: "\u22DE",
  curlyeqsucc: "\u22DF",
  curlyvee: "\u22CE",
  curlywedge: "\u22CF",
  curren: "\xA4",
  curvearrowleft: "\u21B6",
  curvearrowright: "\u21B7",
  cuvee: "\u22CE",
  cuwed: "\u22CF",
  cwconint: "\u2232",
  cwint: "\u2231",
  cylcty: "\u232D",
  dArr: "\u21D3",
  dHar: "\u2965",
  dagger: "\u2020",
  daleth: "\u2138",
  darr: "\u2193",
  dash: "\u2010",
  dashv: "\u22A3",
  dbkarow: "\u290F",
  dblac: "\u02DD",
  dcaron: "\u010F",
  dcy: "\u0434",
  dd: "\u2146",
  ddagger: "\u2021",
  ddarr: "\u21CA",
  ddotseq: "\u2A77",
  deg: "\xB0",
  delta: "\u03B4",
  demptyv: "\u29B1",
  dfisht: "\u297F",
  dfr: "\u{1D521}",
  dharl: "\u21C3",
  dharr: "\u21C2",
  diam: "\u22C4",
  diamond: "\u22C4",
  diamondsuit: "\u2666",
  diams: "\u2666",
  die: "\xA8",
  digamma: "\u03DD",
  disin: "\u22F2",
  div: "\xF7",
  divide: "\xF7",
  divideontimes: "\u22C7",
  divonx: "\u22C7",
  djcy: "\u0452",
  dlcorn: "\u231E",
  dlcrop: "\u230D",
  dollar: "$",
  dopf: "\u{1D555}",
  dot: "\u02D9",
  doteq: "\u2250",
  doteqdot: "\u2251",
  dotminus: "\u2238",
  dotplus: "\u2214",
  dotsquare: "\u22A1",
  doublebarwedge: "\u2306",
  downarrow: "\u2193",
  downdownarrows: "\u21CA",
  downharpoonleft: "\u21C3",
  downharpoonright: "\u21C2",
  drbkarow: "\u2910",
  drcorn: "\u231F",
  drcrop: "\u230C",
  dscr: "\u{1D4B9}",
  dscy: "\u0455",
  dsol: "\u29F6",
  dstrok: "\u0111",
  dtdot: "\u22F1",
  dtri: "\u25BF",
  dtrif: "\u25BE",
  duarr: "\u21F5",
  duhar: "\u296F",
  dwangle: "\u29A6",
  dzcy: "\u045F",
  dzigrarr: "\u27FF",
  eDDot: "\u2A77",
  eDot: "\u2251",
  eacute: "\xE9",
  easter: "\u2A6E",
  ecaron: "\u011B",
  ecir: "\u2256",
  ecirc: "\xEA",
  ecolon: "\u2255",
  ecy: "\u044D",
  edot: "\u0117",
  ee: "\u2147",
  efDot: "\u2252",
  efr: "\u{1D522}",
  eg: "\u2A9A",
  egrave: "\xE8",
  egs: "\u2A96",
  egsdot: "\u2A98",
  el: "\u2A99",
  elinters: "\u23E7",
  ell: "\u2113",
  els: "\u2A95",
  elsdot: "\u2A97",
  emacr: "\u0113",
  empty: "\u2205",
  emptyset: "\u2205",
  emptyv: "\u2205",
  emsp13: "\u2004",
  emsp14: "\u2005",
  emsp: "\u2003",
  eng: "\u014B",
  ensp: "\u2002",
  eogon: "\u0119",
  eopf: "\u{1D556}",
  epar: "\u22D5",
  eparsl: "\u29E3",
  eplus: "\u2A71",
  epsi: "\u03B5",
  epsilon: "\u03B5",
  epsiv: "\u03F5",
  eqcirc: "\u2256",
  eqcolon: "\u2255",
  eqsim: "\u2242",
  eqslantgtr: "\u2A96",
  eqslantless: "\u2A95",
  equals: "=",
  equest: "\u225F",
  equiv: "\u2261",
  equivDD: "\u2A78",
  eqvparsl: "\u29E5",
  erDot: "\u2253",
  erarr: "\u2971",
  escr: "\u212F",
  esdot: "\u2250",
  esim: "\u2242",
  eta: "\u03B7",
  eth: "\xF0",
  euml: "\xEB",
  euro: "\u20AC",
  excl: "!",
  exist: "\u2203",
  expectation: "\u2130",
  exponentiale: "\u2147",
  fallingdotseq: "\u2252",
  fcy: "\u0444",
  female: "\u2640",
  ffilig: "\uFB03",
  fflig: "\uFB00",
  ffllig: "\uFB04",
  ffr: "\u{1D523}",
  filig: "\uFB01",
  fjlig: "fj",
  flat: "\u266D",
  fllig: "\uFB02",
  fltns: "\u25B1",
  fnof: "\u0192",
  fopf: "\u{1D557}",
  forall: "\u2200",
  fork: "\u22D4",
  forkv: "\u2AD9",
  fpartint: "\u2A0D",
  frac12: "\xBD",
  frac13: "\u2153",
  frac14: "\xBC",
  frac15: "\u2155",
  frac16: "\u2159",
  frac18: "\u215B",
  frac23: "\u2154",
  frac25: "\u2156",
  frac34: "\xBE",
  frac35: "\u2157",
  frac38: "\u215C",
  frac45: "\u2158",
  frac56: "\u215A",
  frac58: "\u215D",
  frac78: "\u215E",
  frasl: "\u2044",
  frown: "\u2322",
  fscr: "\u{1D4BB}",
  gE: "\u2267",
  gEl: "\u2A8C",
  gacute: "\u01F5",
  gamma: "\u03B3",
  gammad: "\u03DD",
  gap: "\u2A86",
  gbreve: "\u011F",
  gcirc: "\u011D",
  gcy: "\u0433",
  gdot: "\u0121",
  ge: "\u2265",
  gel: "\u22DB",
  geq: "\u2265",
  geqq: "\u2267",
  geqslant: "\u2A7E",
  ges: "\u2A7E",
  gescc: "\u2AA9",
  gesdot: "\u2A80",
  gesdoto: "\u2A82",
  gesdotol: "\u2A84",
  gesl: "\u22DB\uFE00",
  gesles: "\u2A94",
  gfr: "\u{1D524}",
  gg: "\u226B",
  ggg: "\u22D9",
  gimel: "\u2137",
  gjcy: "\u0453",
  gl: "\u2277",
  glE: "\u2A92",
  gla: "\u2AA5",
  glj: "\u2AA4",
  gnE: "\u2269",
  gnap: "\u2A8A",
  gnapprox: "\u2A8A",
  gne: "\u2A88",
  gneq: "\u2A88",
  gneqq: "\u2269",
  gnsim: "\u22E7",
  gopf: "\u{1D558}",
  grave: "`",
  gscr: "\u210A",
  gsim: "\u2273",
  gsime: "\u2A8E",
  gsiml: "\u2A90",
  gt: ">",
  gtcc: "\u2AA7",
  gtcir: "\u2A7A",
  gtdot: "\u22D7",
  gtlPar: "\u2995",
  gtquest: "\u2A7C",
  gtrapprox: "\u2A86",
  gtrarr: "\u2978",
  gtrdot: "\u22D7",
  gtreqless: "\u22DB",
  gtreqqless: "\u2A8C",
  gtrless: "\u2277",
  gtrsim: "\u2273",
  gvertneqq: "\u2269\uFE00",
  gvnE: "\u2269\uFE00",
  hArr: "\u21D4",
  hairsp: "\u200A",
  half: "\xBD",
  hamilt: "\u210B",
  hardcy: "\u044A",
  harr: "\u2194",
  harrcir: "\u2948",
  harrw: "\u21AD",
  hbar: "\u210F",
  hcirc: "\u0125",
  hearts: "\u2665",
  heartsuit: "\u2665",
  hellip: "\u2026",
  hercon: "\u22B9",
  hfr: "\u{1D525}",
  hksearow: "\u2925",
  hkswarow: "\u2926",
  hoarr: "\u21FF",
  homtht: "\u223B",
  hookleftarrow: "\u21A9",
  hookrightarrow: "\u21AA",
  hopf: "\u{1D559}",
  horbar: "\u2015",
  hscr: "\u{1D4BD}",
  hslash: "\u210F",
  hstrok: "\u0127",
  hybull: "\u2043",
  hyphen: "\u2010",
  iacute: "\xED",
  ic: "\u2063",
  icirc: "\xEE",
  icy: "\u0438",
  iecy: "\u0435",
  iexcl: "\xA1",
  iff: "\u21D4",
  ifr: "\u{1D526}",
  igrave: "\xEC",
  ii: "\u2148",
  iiiint: "\u2A0C",
  iiint: "\u222D",
  iinfin: "\u29DC",
  iiota: "\u2129",
  ijlig: "\u0133",
  imacr: "\u012B",
  image: "\u2111",
  imagline: "\u2110",
  imagpart: "\u2111",
  imath: "\u0131",
  imof: "\u22B7",
  imped: "\u01B5",
  in: "\u2208",
  incare: "\u2105",
  infin: "\u221E",
  infintie: "\u29DD",
  inodot: "\u0131",
  int: "\u222B",
  intcal: "\u22BA",
  integers: "\u2124",
  intercal: "\u22BA",
  intlarhk: "\u2A17",
  intprod: "\u2A3C",
  iocy: "\u0451",
  iogon: "\u012F",
  iopf: "\u{1D55A}",
  iota: "\u03B9",
  iprod: "\u2A3C",
  iquest: "\xBF",
  iscr: "\u{1D4BE}",
  isin: "\u2208",
  isinE: "\u22F9",
  isindot: "\u22F5",
  isins: "\u22F4",
  isinsv: "\u22F3",
  isinv: "\u2208",
  it: "\u2062",
  itilde: "\u0129",
  iukcy: "\u0456",
  iuml: "\xEF",
  jcirc: "\u0135",
  jcy: "\u0439",
  jfr: "\u{1D527}",
  jmath: "\u0237",
  jopf: "\u{1D55B}",
  jscr: "\u{1D4BF}",
  jsercy: "\u0458",
  jukcy: "\u0454",
  kappa: "\u03BA",
  kappav: "\u03F0",
  kcedil: "\u0137",
  kcy: "\u043A",
  kfr: "\u{1D528}",
  kgreen: "\u0138",
  khcy: "\u0445",
  kjcy: "\u045C",
  kopf: "\u{1D55C}",
  kscr: "\u{1D4C0}",
  lAarr: "\u21DA",
  lArr: "\u21D0",
  lAtail: "\u291B",
  lBarr: "\u290E",
  lE: "\u2266",
  lEg: "\u2A8B",
  lHar: "\u2962",
  lacute: "\u013A",
  laemptyv: "\u29B4",
  lagran: "\u2112",
  lambda: "\u03BB",
  lang: "\u27E8",
  langd: "\u2991",
  langle: "\u27E8",
  lap: "\u2A85",
  laquo: "\xAB",
  larr: "\u2190",
  larrb: "\u21E4",
  larrbfs: "\u291F",
  larrfs: "\u291D",
  larrhk: "\u21A9",
  larrlp: "\u21AB",
  larrpl: "\u2939",
  larrsim: "\u2973",
  larrtl: "\u21A2",
  lat: "\u2AAB",
  latail: "\u2919",
  late: "\u2AAD",
  lates: "\u2AAD\uFE00",
  lbarr: "\u290C",
  lbbrk: "\u2772",
  lbrace: "{",
  lbrack: "[",
  lbrke: "\u298B",
  lbrksld: "\u298F",
  lbrkslu: "\u298D",
  lcaron: "\u013E",
  lcedil: "\u013C",
  lceil: "\u2308",
  lcub: "{",
  lcy: "\u043B",
  ldca: "\u2936",
  ldquo: "\u201C",
  ldquor: "\u201E",
  ldrdhar: "\u2967",
  ldrushar: "\u294B",
  ldsh: "\u21B2",
  le: "\u2264",
  leftarrow: "\u2190",
  leftarrowtail: "\u21A2",
  leftharpoondown: "\u21BD",
  leftharpoonup: "\u21BC",
  leftleftarrows: "\u21C7",
  leftrightarrow: "\u2194",
  leftrightarrows: "\u21C6",
  leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD",
  leftthreetimes: "\u22CB",
  leg: "\u22DA",
  leq: "\u2264",
  leqq: "\u2266",
  leqslant: "\u2A7D",
  les: "\u2A7D",
  lescc: "\u2AA8",
  lesdot: "\u2A7F",
  lesdoto: "\u2A81",
  lesdotor: "\u2A83",
  lesg: "\u22DA\uFE00",
  lesges: "\u2A93",
  lessapprox: "\u2A85",
  lessdot: "\u22D6",
  lesseqgtr: "\u22DA",
  lesseqqgtr: "\u2A8B",
  lessgtr: "\u2276",
  lesssim: "\u2272",
  lfisht: "\u297C",
  lfloor: "\u230A",
  lfr: "\u{1D529}",
  lg: "\u2276",
  lgE: "\u2A91",
  lhard: "\u21BD",
  lharu: "\u21BC",
  lharul: "\u296A",
  lhblk: "\u2584",
  ljcy: "\u0459",
  ll: "\u226A",
  llarr: "\u21C7",
  llcorner: "\u231E",
  llhard: "\u296B",
  lltri: "\u25FA",
  lmidot: "\u0140",
  lmoust: "\u23B0",
  lmoustache: "\u23B0",
  lnE: "\u2268",
  lnap: "\u2A89",
  lnapprox: "\u2A89",
  lne: "\u2A87",
  lneq: "\u2A87",
  lneqq: "\u2268",
  lnsim: "\u22E6",
  loang: "\u27EC",
  loarr: "\u21FD",
  lobrk: "\u27E6",
  longleftarrow: "\u27F5",
  longleftrightarrow: "\u27F7",
  longmapsto: "\u27FC",
  longrightarrow: "\u27F6",
  looparrowleft: "\u21AB",
  looparrowright: "\u21AC",
  lopar: "\u2985",
  lopf: "\u{1D55D}",
  loplus: "\u2A2D",
  lotimes: "\u2A34",
  lowast: "\u2217",
  lowbar: "_",
  loz: "\u25CA",
  lozenge: "\u25CA",
  lozf: "\u29EB",
  lpar: "(",
  lparlt: "\u2993",
  lrarr: "\u21C6",
  lrcorner: "\u231F",
  lrhar: "\u21CB",
  lrhard: "\u296D",
  lrm: "\u200E",
  lrtri: "\u22BF",
  lsaquo: "\u2039",
  lscr: "\u{1D4C1}",
  lsh: "\u21B0",
  lsim: "\u2272",
  lsime: "\u2A8D",
  lsimg: "\u2A8F",
  lsqb: "[",
  lsquo: "\u2018",
  lsquor: "\u201A",
  lstrok: "\u0142",
  lt: "<",
  ltcc: "\u2AA6",
  ltcir: "\u2A79",
  ltdot: "\u22D6",
  lthree: "\u22CB",
  ltimes: "\u22C9",
  ltlarr: "\u2976",
  ltquest: "\u2A7B",
  ltrPar: "\u2996",
  ltri: "\u25C3",
  ltrie: "\u22B4",
  ltrif: "\u25C2",
  lurdshar: "\u294A",
  luruhar: "\u2966",
  lvertneqq: "\u2268\uFE00",
  lvnE: "\u2268\uFE00",
  mDDot: "\u223A",
  macr: "\xAF",
  male: "\u2642",
  malt: "\u2720",
  maltese: "\u2720",
  map: "\u21A6",
  mapsto: "\u21A6",
  mapstodown: "\u21A7",
  mapstoleft: "\u21A4",
  mapstoup: "\u21A5",
  marker: "\u25AE",
  mcomma: "\u2A29",
  mcy: "\u043C",
  mdash: "\u2014",
  measuredangle: "\u2221",
  mfr: "\u{1D52A}",
  mho: "\u2127",
  micro: "\xB5",
  mid: "\u2223",
  midast: "*",
  midcir: "\u2AF0",
  middot: "\xB7",
  minus: "\u2212",
  minusb: "\u229F",
  minusd: "\u2238",
  minusdu: "\u2A2A",
  mlcp: "\u2ADB",
  mldr: "\u2026",
  mnplus: "\u2213",
  models: "\u22A7",
  mopf: "\u{1D55E}",
  mp: "\u2213",
  mscr: "\u{1D4C2}",
  mstpos: "\u223E",
  mu: "\u03BC",
  multimap: "\u22B8",
  mumap: "\u22B8",
  nGg: "\u22D9\u0338",
  nGt: "\u226B\u20D2",
  nGtv: "\u226B\u0338",
  nLeftarrow: "\u21CD",
  nLeftrightarrow: "\u21CE",
  nLl: "\u22D8\u0338",
  nLt: "\u226A\u20D2",
  nLtv: "\u226A\u0338",
  nRightarrow: "\u21CF",
  nVDash: "\u22AF",
  nVdash: "\u22AE",
  nabla: "\u2207",
  nacute: "\u0144",
  nang: "\u2220\u20D2",
  nap: "\u2249",
  napE: "\u2A70\u0338",
  napid: "\u224B\u0338",
  napos: "\u0149",
  napprox: "\u2249",
  natur: "\u266E",
  natural: "\u266E",
  naturals: "\u2115",
  nbsp: "\xA0",
  nbump: "\u224E\u0338",
  nbumpe: "\u224F\u0338",
  ncap: "\u2A43",
  ncaron: "\u0148",
  ncedil: "\u0146",
  ncong: "\u2247",
  ncongdot: "\u2A6D\u0338",
  ncup: "\u2A42",
  ncy: "\u043D",
  ndash: "\u2013",
  ne: "\u2260",
  neArr: "\u21D7",
  nearhk: "\u2924",
  nearr: "\u2197",
  nearrow: "\u2197",
  nedot: "\u2250\u0338",
  nequiv: "\u2262",
  nesear: "\u2928",
  nesim: "\u2242\u0338",
  nexist: "\u2204",
  nexists: "\u2204",
  nfr: "\u{1D52B}",
  ngE: "\u2267\u0338",
  nge: "\u2271",
  ngeq: "\u2271",
  ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338",
  nges: "\u2A7E\u0338",
  ngsim: "\u2275",
  ngt: "\u226F",
  ngtr: "\u226F",
  nhArr: "\u21CE",
  nharr: "\u21AE",
  nhpar: "\u2AF2",
  ni: "\u220B",
  nis: "\u22FC",
  nisd: "\u22FA",
  niv: "\u220B",
  njcy: "\u045A",
  nlArr: "\u21CD",
  nlE: "\u2266\u0338",
  nlarr: "\u219A",
  nldr: "\u2025",
  nle: "\u2270",
  nleftarrow: "\u219A",
  nleftrightarrow: "\u21AE",
  nleq: "\u2270",
  nleqq: "\u2266\u0338",
  nleqslant: "\u2A7D\u0338",
  nles: "\u2A7D\u0338",
  nless: "\u226E",
  nlsim: "\u2274",
  nlt: "\u226E",
  nltri: "\u22EA",
  nltrie: "\u22EC",
  nmid: "\u2224",
  nopf: "\u{1D55F}",
  not: "\xAC",
  notin: "\u2209",
  notinE: "\u22F9\u0338",
  notindot: "\u22F5\u0338",
  notinva: "\u2209",
  notinvb: "\u22F7",
  notinvc: "\u22F6",
  notni: "\u220C",
  notniva: "\u220C",
  notnivb: "\u22FE",
  notnivc: "\u22FD",
  npar: "\u2226",
  nparallel: "\u2226",
  nparsl: "\u2AFD\u20E5",
  npart: "\u2202\u0338",
  npolint: "\u2A14",
  npr: "\u2280",
  nprcue: "\u22E0",
  npre: "\u2AAF\u0338",
  nprec: "\u2280",
  npreceq: "\u2AAF\u0338",
  nrArr: "\u21CF",
  nrarr: "\u219B",
  nrarrc: "\u2933\u0338",
  nrarrw: "\u219D\u0338",
  nrightarrow: "\u219B",
  nrtri: "\u22EB",
  nrtrie: "\u22ED",
  nsc: "\u2281",
  nsccue: "\u22E1",
  nsce: "\u2AB0\u0338",
  nscr: "\u{1D4C3}",
  nshortmid: "\u2224",
  nshortparallel: "\u2226",
  nsim: "\u2241",
  nsime: "\u2244",
  nsimeq: "\u2244",
  nsmid: "\u2224",
  nspar: "\u2226",
  nsqsube: "\u22E2",
  nsqsupe: "\u22E3",
  nsub: "\u2284",
  nsubE: "\u2AC5\u0338",
  nsube: "\u2288",
  nsubset: "\u2282\u20D2",
  nsubseteq: "\u2288",
  nsubseteqq: "\u2AC5\u0338",
  nsucc: "\u2281",
  nsucceq: "\u2AB0\u0338",
  nsup: "\u2285",
  nsupE: "\u2AC6\u0338",
  nsupe: "\u2289",
  nsupset: "\u2283\u20D2",
  nsupseteq: "\u2289",
  nsupseteqq: "\u2AC6\u0338",
  ntgl: "\u2279",
  ntilde: "\xF1",
  ntlg: "\u2278",
  ntriangleleft: "\u22EA",
  ntrianglelefteq: "\u22EC",
  ntriangleright: "\u22EB",
  ntrianglerighteq: "\u22ED",
  nu: "\u03BD",
  num: "#",
  numero: "\u2116",
  numsp: "\u2007",
  nvDash: "\u22AD",
  nvHarr: "\u2904",
  nvap: "\u224D\u20D2",
  nvdash: "\u22AC",
  nvge: "\u2265\u20D2",
  nvgt: ">\u20D2",
  nvinfin: "\u29DE",
  nvlArr: "\u2902",
  nvle: "\u2264\u20D2",
  nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2",
  nvrArr: "\u2903",
  nvrtrie: "\u22B5\u20D2",
  nvsim: "\u223C\u20D2",
  nwArr: "\u21D6",
  nwarhk: "\u2923",
  nwarr: "\u2196",
  nwarrow: "\u2196",
  nwnear: "\u2927",
  oS: "\u24C8",
  oacute: "\xF3",
  oast: "\u229B",
  ocir: "\u229A",
  ocirc: "\xF4",
  ocy: "\u043E",
  odash: "\u229D",
  odblac: "\u0151",
  odiv: "\u2A38",
  odot: "\u2299",
  odsold: "\u29BC",
  oelig: "\u0153",
  ofcir: "\u29BF",
  ofr: "\u{1D52C}",
  ogon: "\u02DB",
  ograve: "\xF2",
  ogt: "\u29C1",
  ohbar: "\u29B5",
  ohm: "\u03A9",
  oint: "\u222E",
  olarr: "\u21BA",
  olcir: "\u29BE",
  olcross: "\u29BB",
  oline: "\u203E",
  olt: "\u29C0",
  omacr: "\u014D",
  omega: "\u03C9",
  omicron: "\u03BF",
  omid: "\u29B6",
  ominus: "\u2296",
  oopf: "\u{1D560}",
  opar: "\u29B7",
  operp: "\u29B9",
  oplus: "\u2295",
  or: "\u2228",
  orarr: "\u21BB",
  ord: "\u2A5D",
  order: "\u2134",
  orderof: "\u2134",
  ordf: "\xAA",
  ordm: "\xBA",
  origof: "\u22B6",
  oror: "\u2A56",
  orslope: "\u2A57",
  orv: "\u2A5B",
  oscr: "\u2134",
  oslash: "\xF8",
  osol: "\u2298",
  otilde: "\xF5",
  otimes: "\u2297",
  otimesas: "\u2A36",
  ouml: "\xF6",
  ovbar: "\u233D",
  par: "\u2225",
  para: "\xB6",
  parallel: "\u2225",
  parsim: "\u2AF3",
  parsl: "\u2AFD",
  part: "\u2202",
  pcy: "\u043F",
  percnt: "%",
  period: ".",
  permil: "\u2030",
  perp: "\u22A5",
  pertenk: "\u2031",
  pfr: "\u{1D52D}",
  phi: "\u03C6",
  phiv: "\u03D5",
  phmmat: "\u2133",
  phone: "\u260E",
  pi: "\u03C0",
  pitchfork: "\u22D4",
  piv: "\u03D6",
  planck: "\u210F",
  planckh: "\u210E",
  plankv: "\u210F",
  plus: "+",
  plusacir: "\u2A23",
  plusb: "\u229E",
  pluscir: "\u2A22",
  plusdo: "\u2214",
  plusdu: "\u2A25",
  pluse: "\u2A72",
  plusmn: "\xB1",
  plussim: "\u2A26",
  plustwo: "\u2A27",
  pm: "\xB1",
  pointint: "\u2A15",
  popf: "\u{1D561}",
  pound: "\xA3",
  pr: "\u227A",
  prE: "\u2AB3",
  prap: "\u2AB7",
  prcue: "\u227C",
  pre: "\u2AAF",
  prec: "\u227A",
  precapprox: "\u2AB7",
  preccurlyeq: "\u227C",
  preceq: "\u2AAF",
  precnapprox: "\u2AB9",
  precneqq: "\u2AB5",
  precnsim: "\u22E8",
  precsim: "\u227E",
  prime: "\u2032",
  primes: "\u2119",
  prnE: "\u2AB5",
  prnap: "\u2AB9",
  prnsim: "\u22E8",
  prod: "\u220F",
  profalar: "\u232E",
  profline: "\u2312",
  profsurf: "\u2313",
  prop: "\u221D",
  propto: "\u221D",
  prsim: "\u227E",
  prurel: "\u22B0",
  pscr: "\u{1D4C5}",
  psi: "\u03C8",
  puncsp: "\u2008",
  qfr: "\u{1D52E}",
  qint: "\u2A0C",
  qopf: "\u{1D562}",
  qprime: "\u2057",
  qscr: "\u{1D4C6}",
  quaternions: "\u210D",
  quatint: "\u2A16",
  quest: "?",
  questeq: "\u225F",
  quot: '"',
  rAarr: "\u21DB",
  rArr: "\u21D2",
  rAtail: "\u291C",
  rBarr: "\u290F",
  rHar: "\u2964",
  race: "\u223D\u0331",
  racute: "\u0155",
  radic: "\u221A",
  raemptyv: "\u29B3",
  rang: "\u27E9",
  rangd: "\u2992",
  range: "\u29A5",
  rangle: "\u27E9",
  raquo: "\xBB",
  rarr: "\u2192",
  rarrap: "\u2975",
  rarrb: "\u21E5",
  rarrbfs: "\u2920",
  rarrc: "\u2933",
  rarrfs: "\u291E",
  rarrhk: "\u21AA",
  rarrlp: "\u21AC",
  rarrpl: "\u2945",
  rarrsim: "\u2974",
  rarrtl: "\u21A3",
  rarrw: "\u219D",
  ratail: "\u291A",
  ratio: "\u2236",
  rationals: "\u211A",
  rbarr: "\u290D",
  rbbrk: "\u2773",
  rbrace: "}",
  rbrack: "]",
  rbrke: "\u298C",
  rbrksld: "\u298E",
  rbrkslu: "\u2990",
  rcaron: "\u0159",
  rcedil: "\u0157",
  rceil: "\u2309",
  rcub: "}",
  rcy: "\u0440",
  rdca: "\u2937",
  rdldhar: "\u2969",
  rdquo: "\u201D",
  rdquor: "\u201D",
  rdsh: "\u21B3",
  real: "\u211C",
  realine: "\u211B",
  realpart: "\u211C",
  reals: "\u211D",
  rect: "\u25AD",
  reg: "\xAE",
  rfisht: "\u297D",
  rfloor: "\u230B",
  rfr: "\u{1D52F}",
  rhard: "\u21C1",
  rharu: "\u21C0",
  rharul: "\u296C",
  rho: "\u03C1",
  rhov: "\u03F1",
  rightarrow: "\u2192",
  rightarrowtail: "\u21A3",
  rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0",
  rightleftarrows: "\u21C4",
  rightleftharpoons: "\u21CC",
  rightrightarrows: "\u21C9",
  rightsquigarrow: "\u219D",
  rightthreetimes: "\u22CC",
  ring: "\u02DA",
  risingdotseq: "\u2253",
  rlarr: "\u21C4",
  rlhar: "\u21CC",
  rlm: "\u200F",
  rmoust: "\u23B1",
  rmoustache: "\u23B1",
  rnmid: "\u2AEE",
  roang: "\u27ED",
  roarr: "\u21FE",
  robrk: "\u27E7",
  ropar: "\u2986",
  ropf: "\u{1D563}",
  roplus: "\u2A2E",
  rotimes: "\u2A35",
  rpar: ")",
  rpargt: "\u2994",
  rppolint: "\u2A12",
  rrarr: "\u21C9",
  rsaquo: "\u203A",
  rscr: "\u{1D4C7}",
  rsh: "\u21B1",
  rsqb: "]",
  rsquo: "\u2019",
  rsquor: "\u2019",
  rthree: "\u22CC",
  rtimes: "\u22CA",
  rtri: "\u25B9",
  rtrie: "\u22B5",
  rtrif: "\u25B8",
  rtriltri: "\u29CE",
  ruluhar: "\u2968",
  rx: "\u211E",
  sacute: "\u015B",
  sbquo: "\u201A",
  sc: "\u227B",
  scE: "\u2AB4",
  scap: "\u2AB8",
  scaron: "\u0161",
  sccue: "\u227D",
  sce: "\u2AB0",
  scedil: "\u015F",
  scirc: "\u015D",
  scnE: "\u2AB6",
  scnap: "\u2ABA",
  scnsim: "\u22E9",
  scpolint: "\u2A13",
  scsim: "\u227F",
  scy: "\u0441",
  sdot: "\u22C5",
  sdotb: "\u22A1",
  sdote: "\u2A66",
  seArr: "\u21D8",
  searhk: "\u2925",
  searr: "\u2198",
  searrow: "\u2198",
  sect: "\xA7",
  semi: ";",
  seswar: "\u2929",
  setminus: "\u2216",
  setmn: "\u2216",
  sext: "\u2736",
  sfr: "\u{1D530}",
  sfrown: "\u2322",
  sharp: "\u266F",
  shchcy: "\u0449",
  shcy: "\u0448",
  shortmid: "\u2223",
  shortparallel: "\u2225",
  shy: "\xAD",
  sigma: "\u03C3",
  sigmaf: "\u03C2",
  sigmav: "\u03C2",
  sim: "\u223C",
  simdot: "\u2A6A",
  sime: "\u2243",
  simeq: "\u2243",
  simg: "\u2A9E",
  simgE: "\u2AA0",
  siml: "\u2A9D",
  simlE: "\u2A9F",
  simne: "\u2246",
  simplus: "\u2A24",
  simrarr: "\u2972",
  slarr: "\u2190",
  smallsetminus: "\u2216",
  smashp: "\u2A33",
  smeparsl: "\u29E4",
  smid: "\u2223",
  smile: "\u2323",
  smt: "\u2AAA",
  smte: "\u2AAC",
  smtes: "\u2AAC\uFE00",
  softcy: "\u044C",
  sol: "/",
  solb: "\u29C4",
  solbar: "\u233F",
  sopf: "\u{1D564}",
  spades: "\u2660",
  spadesuit: "\u2660",
  spar: "\u2225",
  sqcap: "\u2293",
  sqcaps: "\u2293\uFE00",
  sqcup: "\u2294",
  sqcups: "\u2294\uFE00",
  sqsub: "\u228F",
  sqsube: "\u2291",
  sqsubset: "\u228F",
  sqsubseteq: "\u2291",
  sqsup: "\u2290",
  sqsupe: "\u2292",
  sqsupset: "\u2290",
  sqsupseteq: "\u2292",
  squ: "\u25A1",
  square: "\u25A1",
  squarf: "\u25AA",
  squf: "\u25AA",
  srarr: "\u2192",
  sscr: "\u{1D4C8}",
  ssetmn: "\u2216",
  ssmile: "\u2323",
  sstarf: "\u22C6",
  star: "\u2606",
  starf: "\u2605",
  straightepsilon: "\u03F5",
  straightphi: "\u03D5",
  strns: "\xAF",
  sub: "\u2282",
  subE: "\u2AC5",
  subdot: "\u2ABD",
  sube: "\u2286",
  subedot: "\u2AC3",
  submult: "\u2AC1",
  subnE: "\u2ACB",
  subne: "\u228A",
  subplus: "\u2ABF",
  subrarr: "\u2979",
  subset: "\u2282",
  subseteq: "\u2286",
  subseteqq: "\u2AC5",
  subsetneq: "\u228A",
  subsetneqq: "\u2ACB",
  subsim: "\u2AC7",
  subsub: "\u2AD5",
  subsup: "\u2AD3",
  succ: "\u227B",
  succapprox: "\u2AB8",
  succcurlyeq: "\u227D",
  succeq: "\u2AB0",
  succnapprox: "\u2ABA",
  succneqq: "\u2AB6",
  succnsim: "\u22E9",
  succsim: "\u227F",
  sum: "\u2211",
  sung: "\u266A",
  sup1: "\xB9",
  sup2: "\xB2",
  sup3: "\xB3",
  sup: "\u2283",
  supE: "\u2AC6",
  supdot: "\u2ABE",
  supdsub: "\u2AD8",
  supe: "\u2287",
  supedot: "\u2AC4",
  suphsol: "\u27C9",
  suphsub: "\u2AD7",
  suplarr: "\u297B",
  supmult: "\u2AC2",
  supnE: "\u2ACC",
  supne: "\u228B",
  supplus: "\u2AC0",
  supset: "\u2283",
  supseteq: "\u2287",
  supseteqq: "\u2AC6",
  supsetneq: "\u228B",
  supsetneqq: "\u2ACC",
  supsim: "\u2AC8",
  supsub: "\u2AD4",
  supsup: "\u2AD6",
  swArr: "\u21D9",
  swarhk: "\u2926",
  swarr: "\u2199",
  swarrow: "\u2199",
  swnwar: "\u292A",
  szlig: "\xDF",
  target: "\u2316",
  tau: "\u03C4",
  tbrk: "\u23B4",
  tcaron: "\u0165",
  tcedil: "\u0163",
  tcy: "\u0442",
  tdot: "\u20DB",
  telrec: "\u2315",
  tfr: "\u{1D531}",
  there4: "\u2234",
  therefore: "\u2234",
  theta: "\u03B8",
  thetasym: "\u03D1",
  thetav: "\u03D1",
  thickapprox: "\u2248",
  thicksim: "\u223C",
  thinsp: "\u2009",
  thkap: "\u2248",
  thksim: "\u223C",
  thorn: "\xFE",
  tilde: "\u02DC",
  times: "\xD7",
  timesb: "\u22A0",
  timesbar: "\u2A31",
  timesd: "\u2A30",
  tint: "\u222D",
  toea: "\u2928",
  top: "\u22A4",
  topbot: "\u2336",
  topcir: "\u2AF1",
  topf: "\u{1D565}",
  topfork: "\u2ADA",
  tosa: "\u2929",
  tprime: "\u2034",
  trade: "\u2122",
  triangle: "\u25B5",
  triangledown: "\u25BF",
  triangleleft: "\u25C3",
  trianglelefteq: "\u22B4",
  triangleq: "\u225C",
  triangleright: "\u25B9",
  trianglerighteq: "\u22B5",
  tridot: "\u25EC",
  trie: "\u225C",
  triminus: "\u2A3A",
  triplus: "\u2A39",
  trisb: "\u29CD",
  tritime: "\u2A3B",
  trpezium: "\u23E2",
  tscr: "\u{1D4C9}",
  tscy: "\u0446",
  tshcy: "\u045B",
  tstrok: "\u0167",
  twixt: "\u226C",
  twoheadleftarrow: "\u219E",
  twoheadrightarrow: "\u21A0",
  uArr: "\u21D1",
  uHar: "\u2963",
  uacute: "\xFA",
  uarr: "\u2191",
  ubrcy: "\u045E",
  ubreve: "\u016D",
  ucirc: "\xFB",
  ucy: "\u0443",
  udarr: "\u21C5",
  udblac: "\u0171",
  udhar: "\u296E",
  ufisht: "\u297E",
  ufr: "\u{1D532}",
  ugrave: "\xF9",
  uharl: "\u21BF",
  uharr: "\u21BE",
  uhblk: "\u2580",
  ulcorn: "\u231C",
  ulcorner: "\u231C",
  ulcrop: "\u230F",
  ultri: "\u25F8",
  umacr: "\u016B",
  uml: "\xA8",
  uogon: "\u0173",
  uopf: "\u{1D566}",
  uparrow: "\u2191",
  updownarrow: "\u2195",
  upharpoonleft: "\u21BF",
  upharpoonright: "\u21BE",
  uplus: "\u228E",
  upsi: "\u03C5",
  upsih: "\u03D2",
  upsilon: "\u03C5",
  upuparrows: "\u21C8",
  urcorn: "\u231D",
  urcorner: "\u231D",
  urcrop: "\u230E",
  uring: "\u016F",
  urtri: "\u25F9",
  uscr: "\u{1D4CA}",
  utdot: "\u22F0",
  utilde: "\u0169",
  utri: "\u25B5",
  utrif: "\u25B4",
  uuarr: "\u21C8",
  uuml: "\xFC",
  uwangle: "\u29A7",
  vArr: "\u21D5",
  vBar: "\u2AE8",
  vBarv: "\u2AE9",
  vDash: "\u22A8",
  vangrt: "\u299C",
  varepsilon: "\u03F5",
  varkappa: "\u03F0",
  varnothing: "\u2205",
  varphi: "\u03D5",
  varpi: "\u03D6",
  varpropto: "\u221D",
  varr: "\u2195",
  varrho: "\u03F1",
  varsigma: "\u03C2",
  varsubsetneq: "\u228A\uFE00",
  varsubsetneqq: "\u2ACB\uFE00",
  varsupsetneq: "\u228B\uFE00",
  varsupsetneqq: "\u2ACC\uFE00",
  vartheta: "\u03D1",
  vartriangleleft: "\u22B2",
  vartriangleright: "\u22B3",
  vcy: "\u0432",
  vdash: "\u22A2",
  vee: "\u2228",
  veebar: "\u22BB",
  veeeq: "\u225A",
  vellip: "\u22EE",
  verbar: "|",
  vert: "|",
  vfr: "\u{1D533}",
  vltri: "\u22B2",
  vnsub: "\u2282\u20D2",
  vnsup: "\u2283\u20D2",
  vopf: "\u{1D567}",
  vprop: "\u221D",
  vrtri: "\u22B3",
  vscr: "\u{1D4CB}",
  vsubnE: "\u2ACB\uFE00",
  vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00",
  vsupne: "\u228B\uFE00",
  vzigzag: "\u299A",
  wcirc: "\u0175",
  wedbar: "\u2A5F",
  wedge: "\u2227",
  wedgeq: "\u2259",
  weierp: "\u2118",
  wfr: "\u{1D534}",
  wopf: "\u{1D568}",
  wp: "\u2118",
  wr: "\u2240",
  wreath: "\u2240",
  wscr: "\u{1D4CC}",
  xcap: "\u22C2",
  xcirc: "\u25EF",
  xcup: "\u22C3",
  xdtri: "\u25BD",
  xfr: "\u{1D535}",
  xhArr: "\u27FA",
  xharr: "\u27F7",
  xi: "\u03BE",
  xlArr: "\u27F8",
  xlarr: "\u27F5",
  xmap: "\u27FC",
  xnis: "\u22FB",
  xodot: "\u2A00",
  xopf: "\u{1D569}",
  xoplus: "\u2A01",
  xotime: "\u2A02",
  xrArr: "\u27F9",
  xrarr: "\u27F6",
  xscr: "\u{1D4CD}",
  xsqcup: "\u2A06",
  xuplus: "\u2A04",
  xutri: "\u25B3",
  xvee: "\u22C1",
  xwedge: "\u22C0",
  yacute: "\xFD",
  yacy: "\u044F",
  ycirc: "\u0177",
  ycy: "\u044B",
  yen: "\xA5",
  yfr: "\u{1D536}",
  yicy: "\u0457",
  yopf: "\u{1D56A}",
  yscr: "\u{1D4CE}",
  yucy: "\u044E",
  yuml: "\xFF",
  zacute: "\u017A",
  zcaron: "\u017E",
  zcy: "\u0437",
  zdot: "\u017C",
  zeetrf: "\u2128",
  zeta: "\u03B6",
  zfr: "\u{1D537}",
  zhcy: "\u0436",
  zigrarr: "\u21DD",
  zopf: "\u{1D56B}",
  zscr: "\u{1D4CF}",
  zwj: "\u200D",
  zwnj: "\u200C"
};

// node_modules/.pnpm/decode-named-character-reference@1.3.0/node_modules/decode-named-character-reference/index.js
var own2 = {}.hasOwnProperty;
function decodeNamedCharacterReference(value) {
  return own2.call(characterEntities, value) ? characterEntities[value] : false;
}

// node_modules/.pnpm/micromark-util-chunked@2.0.1/node_modules/micromark-util-chunked/index.js
function splice(list4, start, remove, items) {
  const end = list4.length;
  let chunkStart = 0;
  let parameters;
  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }
  remove = remove > 0 ? remove : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    list4.splice(...parameters);
  } else {
    if (remove)
      list4.splice(start, remove);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start, 0);
      list4.splice(...parameters);
      chunkStart += 1e4;
      start += 1e4;
    }
  }
}
function push(list4, items) {
  if (list4.length > 0) {
    splice(list4, list4.length, 0, items);
    return list4;
  }
  return items;
}

// node_modules/.pnpm/micromark-util-combine-extensions@2.0.1/node_modules/micromark-util-combine-extensions/index.js
var hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
  const all2 = {};
  let index2 = -1;
  while (++index2 < extensions.length) {
    syntaxExtension(all2, extensions[index2]);
  }
  return all2;
}
function syntaxExtension(all2, extension2) {
  let hook;
  for (hook in extension2) {
    const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
    const left = maybe || (all2[hook] = {});
    const right = extension2[hook];
    let code4;
    if (right) {
      for (code4 in right) {
        if (!hasOwnProperty.call(left, code4))
          left[code4] = [];
        const value = right[code4];
        constructs(
          // @ts-expect-error Looks like a list.
          left[code4],
          Array.isArray(value) ? value : value ? [value] : []
        );
      }
    }
  }
}
function constructs(existing, list4) {
  let index2 = -1;
  const before = [];
  while (++index2 < list4.length) {
    ;
    (list4[index2].add === "after" ? existing : before).push(list4[index2]);
  }
  splice(existing, 0, 0, before);
}

// node_modules/.pnpm/micromark-util-decode-numeric-character-reference@2.0.2/node_modules/micromark-util-decode-numeric-character-reference/index.js
function decodeNumericCharacterReference(value, base) {
  const code4 = Number.parseInt(value, base);
  if (
    // C0 except for HT, LF, FF, CR, space.
    code4 < 9 || code4 === 11 || code4 > 13 && code4 < 32 || // Control character (DEL) of C0, and C1 controls.
    code4 > 126 && code4 < 160 || // Lone high surrogates and low surrogates.
    code4 > 55295 && code4 < 57344 || // Noncharacters.
    code4 > 64975 && code4 < 65008 || /* eslint-disable no-bitwise */
    (code4 & 65535) === 65535 || (code4 & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    code4 > 1114111
  ) {
    return "\uFFFD";
  }
  return String.fromCodePoint(code4);
}

// node_modules/.pnpm/micromark-util-normalize-identifier@2.0.1/node_modules/micromark-util-normalize-identifier/index.js
function normalizeIdentifier(value) {
  return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}

// node_modules/.pnpm/micromark-util-character@2.1.1/node_modules/micromark-util-character/index.js
var asciiAlpha = regexCheck(/[A-Za-z]/);
var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code4) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code4 !== null && (code4 < 32 || code4 === 127)
  );
}
var asciiDigit = regexCheck(/\d/);
var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code4) {
  return code4 !== null && code4 < -2;
}
function markdownLineEndingOrSpace(code4) {
  return code4 !== null && (code4 < 0 || code4 === 32);
}
function markdownSpace(code4) {
  return code4 === -2 || code4 === -1 || code4 === 32;
}
var unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
var unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
  return check;
  function check(code4) {
    return code4 !== null && code4 > -1 && regex.test(String.fromCharCode(code4));
  }
}

// node_modules/.pnpm/micromark-factory-space@2.0.1/node_modules/micromark-factory-space/index.js
function factorySpace(effects, ok3, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start;
  function start(code4) {
    if (markdownSpace(code4)) {
      effects.enter(type);
      return prefix(code4);
    }
    return ok3(code4);
  }
  function prefix(code4) {
    if (markdownSpace(code4) && size++ < limit) {
      effects.consume(code4);
      return prefix;
    }
    effects.exit(type);
    return ok3(code4);
  }
}

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/initialize/content.js
var content = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
  let previous3;
  return contentStart;
  function afterContentStartConstruct(code4) {
    if (code4 === null) {
      effects.consume(code4);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }
  function paragraphInitial(code4) {
    effects.enter("paragraph");
    return lineStart(code4);
  }
  function lineStart(code4) {
    const token = effects.enter("chunkText", {
      contentType: "text",
      previous: previous3
    });
    if (previous3) {
      previous3.next = token;
    }
    previous3 = token;
    return data(code4);
  }
  function data(code4) {
    if (code4 === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code4);
      return;
    }
    if (markdownLineEnding(code4)) {
      effects.consume(code4);
      effects.exit("chunkText");
      return lineStart;
    }
    effects.consume(code4);
    return data;
  }
}

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/initialize/document.js
var document = {
  tokenize: initializeDocument
};
var containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  const self = this;
  const stack = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start;
  function start(code4) {
    if (continued < stack.length) {
      const item = stack[continued];
      self.containerState = item[1];
      return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code4);
    }
    return checkNewContainers(code4);
  }
  function documentContinue(code4) {
    continued++;
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point3;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          point3 = self.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = {
          ...point3
        };
        index2++;
      }
      splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
      self.events.length = index2;
      return checkNewContainers(code4);
    }
    return start(code4);
  }
  function checkNewContainers(code4) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code4);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code4);
      }
      self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
    }
    self.containerState = {};
    return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code4);
  }
  function thereIsANewContainer(code4) {
    if (childFlow)
      closeFlow();
    exitContainers(continued);
    return documentContinued(code4);
  }
  function thereIsNoNewContainer(code4) {
    self.parser.lazy[self.now().line] = continued !== stack.length;
    lineStartOffset = self.now().offset;
    return flowStart(code4);
  }
  function documentContinued(code4) {
    self.containerState = {};
    return effects.attempt(containerConstruct, containerContinue, flowStart)(code4);
  }
  function containerContinue(code4) {
    continued++;
    stack.push([self.currentConstruct, self.containerState]);
    return documentContinued(code4);
  }
  function flowStart(code4) {
    if (code4 === null) {
      if (childFlow)
        closeFlow();
      exitContainers(0);
      effects.consume(code4);
      return;
    }
    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter("chunkFlow", {
      _tokenizer: childFlow,
      contentType: "flow",
      previous: childToken
    });
    return flowContinue(code4);
  }
  function flowContinue(code4) {
    if (code4 === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code4);
      return;
    }
    if (markdownLineEnding(code4)) {
      effects.consume(code4);
      writeToChild(effects.exit("chunkFlow"));
      continued = 0;
      self.interrupt = void 0;
      return start;
    }
    effects.consume(code4);
    return flowContinue;
  }
  function writeToChild(token, endOfFile) {
    const stream = self.sliceStream(token);
    if (endOfFile)
      stream.push(null);
    token.previous = childToken;
    if (childToken)
      childToken.next = token;
    childToken = token;
    childFlow.defineSkip(token.start);
    childFlow.write(stream);
    if (self.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (
          // The token starts before the line ending…
          childFlow.events[index2][1].start.offset < lineStartOffset && // …and either is not ended yet…
          (!childFlow.events[index2][1].end || // …or ends after it.
          childFlow.events[index2][1].end.offset > lineStartOffset)
        ) {
          return;
        }
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point3;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point3 = self.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = {
          ...point3
        };
        index2++;
      }
      splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
      self.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack.length;
    while (index2-- > size) {
      const entry = stack[index2];
      self.containerState = entry[1];
      entry[0].exit.call(self, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    childFlow.write([null]);
    childToken = void 0;
    childFlow = void 0;
    self.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok3, nok) {
  return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok3, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}

// node_modules/.pnpm/micromark-util-classify-character@2.0.1/node_modules/micromark-util-classify-character/index.js
function classifyCharacter(code4) {
  if (code4 === null || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4)) {
    return 1;
  }
  if (unicodePunctuation(code4)) {
    return 2;
  }
}

// node_modules/.pnpm/micromark-util-resolve-all@2.0.1/node_modules/micromark-util-resolve-all/index.js
function resolveAll(constructs2, events, context) {
  const called = [];
  let index2 = -1;
  while (++index2 < constructs2.length) {
    const resolve5 = constructs2[index2].resolveAll;
    if (resolve5 && !called.includes(resolve5)) {
      events = resolve5(events, context);
      called.push(resolve5);
    }
  }
  return events;
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/attention.js
var attention = {
  name: "attention",
  resolveAll: resolveAllAttention,
  tokenize: tokenizeAttention
};
function resolveAllAttention(events, context) {
  let index2 = -1;
  let open2;
  let group;
  let text6;
  let openingSequence;
  let closingSequence;
  let use;
  let nextEvents;
  let offset;
  while (++index2 < events.length) {
    if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
      open2 = index2;
      while (open2--) {
        if (events[open2][0] === "exit" && events[open2][1].type === "attentionSequence" && events[open2][1]._open && // If the markers are the same:
        context.sliceSerialize(events[open2][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
          if ((events[open2][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open2][1].end.offset - events[open2][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
            continue;
          }
          use = events[open2][1].end.offset - events[open2][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
          const start = {
            ...events[open2][1].end
          };
          const end = {
            ...events[index2][1].start
          };
          movePoint(start, -use);
          movePoint(end, use);
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start,
            end: {
              ...events[open2][1].end
            }
          };
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...events[index2][1].start
            },
            end
          };
          text6 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: {
              ...events[open2][1].end
            },
            end: {
              ...events[index2][1].start
            }
          };
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: {
              ...openingSequence.start
            },
            end: {
              ...closingSequence.end
            }
          };
          events[open2][1].end = {
            ...openingSequence.start
          };
          events[index2][1].start = {
            ...closingSequence.end
          };
          nextEvents = [];
          if (events[open2][1].end.offset - events[open2][1].start.offset) {
            nextEvents = push(nextEvents, [["enter", events[open2][1], context], ["exit", events[open2][1], context]]);
          }
          nextEvents = push(nextEvents, [["enter", group, context], ["enter", openingSequence, context], ["exit", openingSequence, context], ["enter", text6, context]]);
          nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open2 + 1, index2), context));
          nextEvents = push(nextEvents, [["exit", text6, context], ["enter", closingSequence, context], ["exit", closingSequence, context], ["exit", group, context]]);
          if (events[index2][1].end.offset - events[index2][1].start.offset) {
            offset = 2;
            nextEvents = push(nextEvents, [["enter", events[index2][1], context], ["exit", events[index2][1], context]]);
          } else {
            offset = 0;
          }
          splice(events, open2 - 1, index2 - open2 + 3, nextEvents);
          index2 = open2 + nextEvents.length - offset - 2;
          break;
        }
      }
    }
  }
  index2 = -1;
  while (++index2 < events.length) {
    if (events[index2][1].type === "attentionSequence") {
      events[index2][1].type = "data";
    }
  }
  return events;
}
function tokenizeAttention(effects, ok3) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
  const previous3 = this.previous;
  const before = classifyCharacter(previous3);
  let marker;
  return start;
  function start(code4) {
    marker = code4;
    effects.enter("attentionSequence");
    return inside(code4);
  }
  function inside(code4) {
    if (code4 === marker) {
      effects.consume(code4);
      return inside;
    }
    const token = effects.exit("attentionSequence");
    const after = classifyCharacter(code4);
    const open2 = !after || after === 2 && before || attentionMarkers2.includes(code4);
    const close = !before || before === 2 && after || attentionMarkers2.includes(previous3);
    token._open = Boolean(marker === 42 ? open2 : open2 && (before || !close));
    token._close = Boolean(marker === 42 ? close : close && (after || !open2));
    return ok3(code4);
  }
}
function movePoint(point3, offset) {
  point3.column += offset;
  point3.offset += offset;
  point3._bufferIndex += offset;
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/autolink.js
var autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok3, nok) {
  let size = 0;
  return start;
  function start(code4) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code4);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open2;
  }
  function open2(code4) {
    if (asciiAlpha(code4)) {
      effects.consume(code4);
      return schemeOrEmailAtext;
    }
    if (code4 === 64) {
      return nok(code4);
    }
    return emailAtext(code4);
  }
  function schemeOrEmailAtext(code4) {
    if (code4 === 43 || code4 === 45 || code4 === 46 || asciiAlphanumeric(code4)) {
      size = 1;
      return schemeInsideOrEmailAtext(code4);
    }
    return emailAtext(code4);
  }
  function schemeInsideOrEmailAtext(code4) {
    if (code4 === 58) {
      effects.consume(code4);
      size = 0;
      return urlInside;
    }
    if ((code4 === 43 || code4 === 45 || code4 === 46 || asciiAlphanumeric(code4)) && size++ < 32) {
      effects.consume(code4);
      return schemeInsideOrEmailAtext;
    }
    size = 0;
    return emailAtext(code4);
  }
  function urlInside(code4) {
    if (code4 === 62) {
      effects.exit("autolinkProtocol");
      effects.enter("autolinkMarker");
      effects.consume(code4);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok3;
    }
    if (code4 === null || code4 === 32 || code4 === 60 || asciiControl(code4)) {
      return nok(code4);
    }
    effects.consume(code4);
    return urlInside;
  }
  function emailAtext(code4) {
    if (code4 === 64) {
      effects.consume(code4);
      return emailAtSignOrDot;
    }
    if (asciiAtext(code4)) {
      effects.consume(code4);
      return emailAtext;
    }
    return nok(code4);
  }
  function emailAtSignOrDot(code4) {
    return asciiAlphanumeric(code4) ? emailLabel(code4) : nok(code4);
  }
  function emailLabel(code4) {
    if (code4 === 46) {
      effects.consume(code4);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code4 === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      effects.enter("autolinkMarker");
      effects.consume(code4);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok3;
    }
    return emailValue(code4);
  }
  function emailValue(code4) {
    if ((code4 === 45 || asciiAlphanumeric(code4)) && size++ < 63) {
      const next = code4 === 45 ? emailValue : emailLabel;
      effects.consume(code4);
      return next;
    }
    return nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/blank-line.js
var blankLine = {
  partial: true,
  tokenize: tokenizeBlankLine
};
function tokenizeBlankLine(effects, ok3, nok) {
  return start;
  function start(code4) {
    return markdownSpace(code4) ? factorySpace(effects, after, "linePrefix")(code4) : after(code4);
  }
  function after(code4) {
    return code4 === null || markdownLineEnding(code4) ? ok3(code4) : nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/block-quote.js
var blockQuote = {
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit,
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart
};
function tokenizeBlockQuoteStart(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code4) {
    if (code4 === 62) {
      const state = self.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code4);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code4);
  }
  function after(code4) {
    if (markdownSpace(code4)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code4);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok3;
    }
    effects.exit("blockQuotePrefix");
    return ok3(code4);
  }
}
function tokenizeBlockQuoteContinuation(effects, ok3, nok) {
  const self = this;
  return contStart;
  function contStart(code4) {
    if (markdownSpace(code4)) {
      return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4);
    }
    return contBefore(code4);
  }
  function contBefore(code4) {
    return effects.attempt(blockQuote, ok3, nok)(code4);
  }
}
function exit(effects) {
  effects.exit("blockQuote");
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/character-escape.js
var characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok3, nok) {
  return start;
  function start(code4) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code4);
    effects.exit("escapeMarker");
    return inside;
  }
  function inside(code4) {
    if (asciiPunctuation(code4)) {
      effects.enter("characterEscapeValue");
      effects.consume(code4);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok3;
    }
    return nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/character-reference.js
var characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok3, nok) {
  const self = this;
  let size = 0;
  let max;
  let test;
  return start;
  function start(code4) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code4);
    effects.exit("characterReferenceMarker");
    return open2;
  }
  function open2(code4) {
    if (code4 === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code4);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric;
    }
    effects.enter("characterReferenceValue");
    max = 31;
    test = asciiAlphanumeric;
    return value(code4);
  }
  function numeric(code4) {
    if (code4 === 88 || code4 === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code4);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max = 6;
      test = asciiHexDigit;
      return value;
    }
    effects.enter("characterReferenceValue");
    max = 7;
    test = asciiDigit;
    return value(code4);
  }
  function value(code4) {
    if (code4 === 59 && size) {
      const token = effects.exit("characterReferenceValue");
      if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
        return nok(code4);
      }
      effects.enter("characterReferenceMarker");
      effects.consume(code4);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok3;
    }
    if (test(code4) && size++ < max) {
      effects.consume(code4);
      return value;
    }
    return nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/code-fenced.js
var nonLazyContinuation = {
  partial: true,
  tokenize: tokenizeNonLazyContinuation
};
var codeFenced = {
  concrete: true,
  name: "codeFenced",
  tokenize: tokenizeCodeFenced
};
function tokenizeCodeFenced(effects, ok3, nok) {
  const self = this;
  const closeStart = {
    partial: true,
    tokenize: tokenizeCloseStart
  };
  let initialPrefix = 0;
  let sizeOpen = 0;
  let marker;
  return start;
  function start(code4) {
    return beforeSequenceOpen(code4);
  }
  function beforeSequenceOpen(code4) {
    const tail = self.events[self.events.length - 1];
    initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    marker = code4;
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    return sequenceOpen(code4);
  }
  function sequenceOpen(code4) {
    if (code4 === marker) {
      sizeOpen++;
      effects.consume(code4);
      return sequenceOpen;
    }
    if (sizeOpen < 3) {
      return nok(code4);
    }
    effects.exit("codeFencedFenceSequence");
    return markdownSpace(code4) ? factorySpace(effects, infoBefore, "whitespace")(code4) : infoBefore(code4);
  }
  function infoBefore(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("codeFencedFence");
      return self.interrupt ? ok3(code4) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code4);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code4);
  }
  function info(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return infoBefore(code4);
    }
    if (markdownSpace(code4)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, metaBefore, "whitespace")(code4);
    }
    if (code4 === 96 && code4 === marker) {
      return nok(code4);
    }
    effects.consume(code4);
    return info;
  }
  function metaBefore(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      return infoBefore(code4);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code4);
  }
  function meta(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return infoBefore(code4);
    }
    if (code4 === 96 && code4 === marker) {
      return nok(code4);
    }
    effects.consume(code4);
    return meta;
  }
  function atNonLazyBreak(code4) {
    return effects.attempt(closeStart, after, contentBefore)(code4);
  }
  function contentBefore(code4) {
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    return contentStart;
  }
  function contentStart(code4) {
    return initialPrefix > 0 && markdownSpace(code4) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code4) : beforeContentChunk(code4);
  }
  function beforeContentChunk(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code4);
    }
    effects.enter("codeFlowValue");
    return contentChunk(code4);
  }
  function contentChunk(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("codeFlowValue");
      return beforeContentChunk(code4);
    }
    effects.consume(code4);
    return contentChunk;
  }
  function after(code4) {
    effects.exit("codeFenced");
    return ok3(code4);
  }
  function tokenizeCloseStart(effects2, ok4, nok2) {
    let size = 0;
    return startBefore;
    function startBefore(code4) {
      effects2.enter("lineEnding");
      effects2.consume(code4);
      effects2.exit("lineEnding");
      return start2;
    }
    function start2(code4) {
      effects2.enter("codeFencedFence");
      return markdownSpace(code4) ? factorySpace(effects2, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4) : beforeSequenceClose(code4);
    }
    function beforeSequenceClose(code4) {
      if (code4 === marker) {
        effects2.enter("codeFencedFenceSequence");
        return sequenceClose(code4);
      }
      return nok2(code4);
    }
    function sequenceClose(code4) {
      if (code4 === marker) {
        size++;
        effects2.consume(code4);
        return sequenceClose;
      }
      if (size >= sizeOpen) {
        effects2.exit("codeFencedFenceSequence");
        return markdownSpace(code4) ? factorySpace(effects2, sequenceCloseAfter, "whitespace")(code4) : sequenceCloseAfter(code4);
      }
      return nok2(code4);
    }
    function sequenceCloseAfter(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects2.exit("codeFencedFence");
        return ok4(code4);
      }
      return nok2(code4);
    }
  }
}
function tokenizeNonLazyContinuation(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code4) {
    if (code4 === null) {
      return nok(code4);
    }
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    return lineStart;
  }
  function lineStart(code4) {
    return self.parser.lazy[self.now().line] ? nok(code4) : ok3(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/code-indented.js
var codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
};
var furtherStart = {
  partial: true,
  tokenize: tokenizeFurtherStart
};
function tokenizeCodeIndented(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code4) {
    effects.enter("codeIndented");
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code4);
  }
  function afterPrefix(code4) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code4) : nok(code4);
  }
  function atBreak(code4) {
    if (code4 === null) {
      return after(code4);
    }
    if (markdownLineEnding(code4)) {
      return effects.attempt(furtherStart, atBreak, after)(code4);
    }
    effects.enter("codeFlowValue");
    return inside(code4);
  }
  function inside(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("codeFlowValue");
      return atBreak(code4);
    }
    effects.consume(code4);
    return inside;
  }
  function after(code4) {
    effects.exit("codeIndented");
    return ok3(code4);
  }
}
function tokenizeFurtherStart(effects, ok3, nok) {
  const self = this;
  return furtherStart2;
  function furtherStart2(code4) {
    if (self.parser.lazy[self.now().line]) {
      return nok(code4);
    }
    if (markdownLineEnding(code4)) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return furtherStart2;
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code4);
  }
  function afterPrefix(code4) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok3(code4) : markdownLineEnding(code4) ? furtherStart2(code4) : nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/code-text.js
var codeText = {
  name: "codeText",
  previous,
  resolve: resolveCodeText,
  tokenize: tokenizeCodeText
};
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4;
  let headEnterIndex = 3;
  let index2;
  let enter;
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
    index2 = headEnterIndex;
    while (++index2 < tailExitIndex) {
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding";
        events[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }
  index2 = headEnterIndex - 1;
  tailExitIndex++;
  while (++index2 <= tailExitIndex) {
    if (enter === void 0) {
      if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
        enter = index2;
      }
    } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
      events[enter][1].type = "codeTextData";
      if (index2 !== enter + 2) {
        events[enter][1].end = events[index2 - 1][1].end;
        events.splice(enter + 2, index2 - enter - 2);
        tailExitIndex -= index2 - enter - 2;
        index2 = enter + 2;
      }
      enter = void 0;
    }
  }
  return events;
}
function previous(code4) {
  return code4 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok3, nok) {
  const self = this;
  let sizeOpen = 0;
  let size;
  let token;
  return start;
  function start(code4) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return sequenceOpen(code4);
  }
  function sequenceOpen(code4) {
    if (code4 === 96) {
      effects.consume(code4);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeTextSequence");
    return between(code4);
  }
  function between(code4) {
    if (code4 === null) {
      return nok(code4);
    }
    if (code4 === 32) {
      effects.enter("space");
      effects.consume(code4);
      effects.exit("space");
      return between;
    }
    if (code4 === 96) {
      token = effects.enter("codeTextSequence");
      size = 0;
      return sequenceClose(code4);
    }
    if (markdownLineEnding(code4)) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return between;
    }
    effects.enter("codeTextData");
    return data(code4);
  }
  function data(code4) {
    if (code4 === null || code4 === 32 || code4 === 96 || markdownLineEnding(code4)) {
      effects.exit("codeTextData");
      return between(code4);
    }
    effects.consume(code4);
    return data;
  }
  function sequenceClose(code4) {
    if (code4 === 96) {
      effects.consume(code4);
      size++;
      return sequenceClose;
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok3(code4);
    }
    token.type = "codeTextData";
    return data(code4);
  }
}

// node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var SpliceBuffer = class {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(initial) {
    this.left = initial ? [...initial] : [];
    this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(index2) {
    if (index2 < 0 || index2 >= this.left.length + this.right.length) {
      throw new RangeError("Cannot access index `" + index2 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    }
    if (index2 < this.left.length)
      return this.left[index2];
    return this.right[this.right.length - index2 + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    this.setCursor(0);
    return this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(start, end) {
    const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
    if (stop < this.left.length) {
      return this.left.slice(start, stop);
    }
    if (start > this.left.length) {
      return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
    }
    return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(start, deleteCount, items) {
    const count = deleteCount || 0;
    this.setCursor(Math.trunc(start));
    const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
    if (items)
      chunkedPush(this.left, items);
    return removed.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    this.setCursor(Number.POSITIVE_INFINITY);
    return this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(item) {
    this.setCursor(Number.POSITIVE_INFINITY);
    this.left.push(item);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(items) {
    this.setCursor(Number.POSITIVE_INFINITY);
    chunkedPush(this.left, items);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(item) {
    this.setCursor(0);
    this.right.push(item);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(items) {
    this.setCursor(0);
    chunkedPush(this.right, items.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0)
      return;
    if (n < this.left.length) {
      const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
      chunkedPush(this.right, removed.reverse());
    } else {
      const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
      chunkedPush(this.left, removed.reverse());
    }
  }
};
function chunkedPush(list4, right) {
  let chunkStart = 0;
  if (right.length < 1e4) {
    list4.push(...right);
  } else {
    while (chunkStart < right.length) {
      list4.push(...right.slice(chunkStart, chunkStart + 1e4));
      chunkStart += 1e4;
    }
  }
}

// node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/index.js
function subtokenize(eventsArray) {
  const jumps = {};
  let index2 = -1;
  let event;
  let lineIndex;
  let otherIndex;
  let otherEvent;
  let parameters;
  let subevents;
  let more;
  const events = new SpliceBuffer(eventsArray);
  while (++index2 < events.length) {
    while (index2 in jumps) {
      index2 = jumps[index2];
    }
    event = events.get(index2);
    if (index2 && event[1].type === "chunkFlow" && events.get(index2 - 1)[1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index2));
        index2 = jumps[index2];
        more = true;
      }
    } else if (event[1]._container) {
      otherIndex = index2;
      lineIndex = void 0;
      while (otherIndex--) {
        otherEvent = events.get(otherIndex);
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events.get(lineIndex)[1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {
        } else {
          break;
        }
      }
      if (lineIndex) {
        event[1].end = {
          ...events.get(lineIndex)[1].start
        };
        parameters = events.slice(lineIndex, index2);
        parameters.unshift(event);
        events.splice(lineIndex, index2 - lineIndex + 1, parameters);
      }
    }
  }
  splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
  return !more;
}
function subcontent(events, eventIndex) {
  const token = events.get(eventIndex)[1];
  const context = events.get(eventIndex)[2];
  let startPosition = eventIndex - 1;
  const startPositions = [];
  let tokenizer = token._tokenizer;
  if (!tokenizer) {
    tokenizer = context.parser[token.contentType](token.start);
    if (token._contentTypeTextTrailing) {
      tokenizer._contentTypeTextTrailing = true;
    }
  }
  const childEvents = tokenizer.events;
  const jumps = [];
  const gaps = {};
  let stream;
  let previous3;
  let index2 = -1;
  let current = token;
  let adjust = 0;
  let start = 0;
  const breaks = [start];
  while (current) {
    while (events.get(++startPosition)[1] !== current) {
    }
    startPositions.push(startPosition);
    if (!current._tokenizer) {
      stream = context.sliceStream(current);
      if (!current.next) {
        stream.push(null);
      }
      if (previous3) {
        tokenizer.defineSkip(current.start);
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer.write(stream);
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = void 0;
      }
    }
    previous3 = current;
    current = current.next;
  }
  current = token;
  while (++index2 < childEvents.length) {
    if (
      // Find a void token that includes a break.
      childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line
    ) {
      start = index2 + 1;
      breaks.push(start);
      current._tokenizer = void 0;
      current.previous = void 0;
      current = current.next;
    }
  }
  tokenizer.events = [];
  if (current) {
    current._tokenizer = void 0;
    current.previous = void 0;
  } else {
    breaks.pop();
  }
  index2 = breaks.length;
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
    const start2 = startPositions.pop();
    jumps.push([start2, start2 + slice.length - 1]);
    events.splice(start2, 2, slice);
  }
  jumps.reverse();
  index2 = -1;
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
    adjust += jumps[index2][1] - jumps[index2][0] - 1;
  }
  return gaps;
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/content.js
var content2 = {
  resolve: resolveContent,
  tokenize: tokenizeContent
};
var continuationConstruct = {
  partial: true,
  tokenize: tokenizeContinuation
};
function resolveContent(events) {
  subtokenize(events);
  return events;
}
function tokenizeContent(effects, ok3) {
  let previous3;
  return chunkStart;
  function chunkStart(code4) {
    effects.enter("content");
    previous3 = effects.enter("chunkContent", {
      contentType: "content"
    });
    return chunkInside(code4);
  }
  function chunkInside(code4) {
    if (code4 === null) {
      return contentEnd(code4);
    }
    if (markdownLineEnding(code4)) {
      return effects.check(continuationConstruct, contentContinue, contentEnd)(code4);
    }
    effects.consume(code4);
    return chunkInside;
  }
  function contentEnd(code4) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok3(code4);
  }
  function contentContinue(code4) {
    effects.consume(code4);
    effects.exit("chunkContent");
    previous3.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous3
    });
    previous3 = previous3.next;
    return chunkInside;
  }
}
function tokenizeContinuation(effects, ok3, nok) {
  const self = this;
  return startLookahead;
  function startLookahead(code4) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }
  function prefixed(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      return nok(code4);
    }
    const tail = self.events[self.events.length - 1];
    if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok3(code4);
    }
    return effects.interrupt(self.parser.constructs.flow, nok, ok3)(code4);
  }
}

// node_modules/.pnpm/micromark-factory-destination@2.0.1/node_modules/micromark-factory-destination/index.js
function factoryDestination(effects, ok3, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  const limit = max || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start;
  function start(code4) {
    if (code4 === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code4);
      effects.exit(literalMarkerType);
      return enclosedBefore;
    }
    if (code4 === null || code4 === 32 || code4 === 41 || asciiControl(code4)) {
      return nok(code4);
    }
    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return raw(code4);
  }
  function enclosedBefore(code4) {
    if (code4 === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code4);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok3;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return enclosed(code4);
  }
  function enclosed(code4) {
    if (code4 === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return enclosedBefore(code4);
    }
    if (code4 === null || code4 === 60 || markdownLineEnding(code4)) {
      return nok(code4);
    }
    effects.consume(code4);
    return code4 === 92 ? enclosedEscape : enclosed;
  }
  function enclosedEscape(code4) {
    if (code4 === 60 || code4 === 62 || code4 === 92) {
      effects.consume(code4);
      return enclosed;
    }
    return enclosed(code4);
  }
  function raw(code4) {
    if (!balance && (code4 === null || code4 === 41 || markdownLineEndingOrSpace(code4))) {
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok3(code4);
    }
    if (balance < limit && code4 === 40) {
      effects.consume(code4);
      balance++;
      return raw;
    }
    if (code4 === 41) {
      effects.consume(code4);
      balance--;
      return raw;
    }
    if (code4 === null || code4 === 32 || code4 === 40 || asciiControl(code4)) {
      return nok(code4);
    }
    effects.consume(code4);
    return code4 === 92 ? rawEscape : raw;
  }
  function rawEscape(code4) {
    if (code4 === 40 || code4 === 41 || code4 === 92) {
      effects.consume(code4);
      return raw;
    }
    return raw(code4);
  }
}

// node_modules/.pnpm/micromark-factory-label@2.0.1/node_modules/micromark-factory-label/index.js
function factoryLabel(effects, ok3, nok, type, markerType, stringType) {
  const self = this;
  let size = 0;
  let seen;
  return start;
  function start(code4) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code4);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }
  function atBreak(code4) {
    if (size > 999 || code4 === null || code4 === 91 || code4 === 93 && !seen || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    code4 === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) {
      return nok(code4);
    }
    if (code4 === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code4);
      effects.exit(markerType);
      effects.exit(type);
      return ok3;
    }
    if (markdownLineEnding(code4)) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return labelInside(code4);
  }
  function labelInside(code4) {
    if (code4 === null || code4 === 91 || code4 === 93 || markdownLineEnding(code4) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code4);
    }
    effects.consume(code4);
    if (!seen)
      seen = !markdownSpace(code4);
    return code4 === 92 ? labelEscape : labelInside;
  }
  function labelEscape(code4) {
    if (code4 === 91 || code4 === 92 || code4 === 93) {
      effects.consume(code4);
      size++;
      return labelInside;
    }
    return labelInside(code4);
  }
}

// node_modules/.pnpm/micromark-factory-title@2.0.1/node_modules/micromark-factory-title/index.js
function factoryTitle(effects, ok3, nok, type, markerType, stringType) {
  let marker;
  return start;
  function start(code4) {
    if (code4 === 34 || code4 === 39 || code4 === 40) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code4);
      effects.exit(markerType);
      marker = code4 === 40 ? 41 : code4;
      return begin;
    }
    return nok(code4);
  }
  function begin(code4) {
    if (code4 === marker) {
      effects.enter(markerType);
      effects.consume(code4);
      effects.exit(markerType);
      effects.exit(type);
      return ok3;
    }
    effects.enter(stringType);
    return atBreak(code4);
  }
  function atBreak(code4) {
    if (code4 === marker) {
      effects.exit(stringType);
      return begin(marker);
    }
    if (code4 === null) {
      return nok(code4);
    }
    if (markdownLineEnding(code4)) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return factorySpace(effects, atBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return inside(code4);
  }
  function inside(code4) {
    if (code4 === marker || code4 === null || markdownLineEnding(code4)) {
      effects.exit("chunkString");
      return atBreak(code4);
    }
    effects.consume(code4);
    return code4 === 92 ? escape : inside;
  }
  function escape(code4) {
    if (code4 === marker || code4 === 92) {
      effects.consume(code4);
      return inside;
    }
    return inside(code4);
  }
}

// node_modules/.pnpm/micromark-factory-whitespace@2.0.1/node_modules/micromark-factory-whitespace/index.js
function factoryWhitespace(effects, ok3) {
  let seen;
  return start;
  function start(code4) {
    if (markdownLineEnding(code4)) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      seen = true;
      return start;
    }
    if (markdownSpace(code4)) {
      return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code4);
    }
    return ok3(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/definition.js
var definition = {
  name: "definition",
  tokenize: tokenizeDefinition
};
var titleBefore = {
  partial: true,
  tokenize: tokenizeTitleBefore
};
function tokenizeDefinition(effects, ok3, nok) {
  const self = this;
  let identifier;
  return start;
  function start(code4) {
    effects.enter("definition");
    return before(code4);
  }
  function before(code4) {
    return factoryLabel.call(
      self,
      effects,
      labelAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(code4);
  }
  function labelAfter(code4) {
    identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
    if (code4 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code4);
      effects.exit("definitionMarker");
      return markerAfter;
    }
    return nok(code4);
  }
  function markerAfter(code4) {
    return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, destinationBefore)(code4) : destinationBefore(code4);
  }
  function destinationBefore(code4) {
    return factoryDestination(
      effects,
      destinationAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(code4);
  }
  function destinationAfter(code4) {
    return effects.attempt(titleBefore, after, after)(code4);
  }
  function after(code4) {
    return markdownSpace(code4) ? factorySpace(effects, afterWhitespace, "whitespace")(code4) : afterWhitespace(code4);
  }
  function afterWhitespace(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("definition");
      self.parser.defined.push(identifier);
      return ok3(code4);
    }
    return nok(code4);
  }
}
function tokenizeTitleBefore(effects, ok3, nok) {
  return titleBefore2;
  function titleBefore2(code4) {
    return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, beforeMarker)(code4) : nok(code4);
  }
  function beforeMarker(code4) {
    return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code4);
  }
  function titleAfter(code4) {
    return markdownSpace(code4) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code4) : titleAfterOptionalWhitespace(code4);
  }
  function titleAfterOptionalWhitespace(code4) {
    return code4 === null || markdownLineEnding(code4) ? ok3(code4) : nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok3, nok) {
  return start;
  function start(code4) {
    effects.enter("hardBreakEscape");
    effects.consume(code4);
    return after;
  }
  function after(code4) {
    if (markdownLineEnding(code4)) {
      effects.exit("hardBreakEscape");
      return ok3(code4);
    }
    return nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/heading-atx.js
var headingAtx = {
  name: "headingAtx",
  resolve: resolveHeadingAtx,
  tokenize: tokenizeHeadingAtx
};
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2;
  let contentStart = 3;
  let content3;
  let text6;
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }
  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content3 = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text6 = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: "text"
    };
    splice(events, contentStart, contentEnd - contentStart + 1, [["enter", content3, context], ["enter", text6, context], ["exit", text6, context], ["exit", content3, context]]);
  }
  return events;
}
function tokenizeHeadingAtx(effects, ok3, nok) {
  let size = 0;
  return start;
  function start(code4) {
    effects.enter("atxHeading");
    return before(code4);
  }
  function before(code4) {
    effects.enter("atxHeadingSequence");
    return sequenceOpen(code4);
  }
  function sequenceOpen(code4) {
    if (code4 === 35 && size++ < 6) {
      effects.consume(code4);
      return sequenceOpen;
    }
    if (code4 === null || markdownLineEndingOrSpace(code4)) {
      effects.exit("atxHeadingSequence");
      return atBreak(code4);
    }
    return nok(code4);
  }
  function atBreak(code4) {
    if (code4 === 35) {
      effects.enter("atxHeadingSequence");
      return sequenceFurther(code4);
    }
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("atxHeading");
      return ok3(code4);
    }
    if (markdownSpace(code4)) {
      return factorySpace(effects, atBreak, "whitespace")(code4);
    }
    effects.enter("atxHeadingText");
    return data(code4);
  }
  function sequenceFurther(code4) {
    if (code4 === 35) {
      effects.consume(code4);
      return sequenceFurther;
    }
    effects.exit("atxHeadingSequence");
    return atBreak(code4);
  }
  function data(code4) {
    if (code4 === null || code4 === 35 || markdownLineEndingOrSpace(code4)) {
      effects.exit("atxHeadingText");
      return atBreak(code4);
    }
    effects.consume(code4);
    return data;
  }
}

// node_modules/.pnpm/micromark-util-html-tag-name@2.0.1/node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];
var htmlRawNames = ["pre", "script", "style", "textarea"];

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/html-flow.js
var htmlFlow = {
  concrete: true,
  name: "htmlFlow",
  resolveTo: resolveToHtmlFlow,
  tokenize: tokenizeHtmlFlow
};
var blankLineBefore = {
  partial: true,
  tokenize: tokenizeBlankLineBefore
};
var nonLazyContinuationStart = {
  partial: true,
  tokenize: tokenizeNonLazyContinuationStart
};
function resolveToHtmlFlow(events) {
  let index2 = events.length;
  while (index2--) {
    if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
      break;
    }
  }
  if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
    events[index2][1].start = events[index2 - 2][1].start;
    events[index2 + 1][1].start = events[index2 - 2][1].start;
    events.splice(index2 - 2, 2);
  }
  return events;
}
function tokenizeHtmlFlow(effects, ok3, nok) {
  const self = this;
  let marker;
  let closingTag;
  let buffer;
  let index2;
  let markerB;
  return start;
  function start(code4) {
    return before(code4);
  }
  function before(code4) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code4);
    return open2;
  }
  function open2(code4) {
    if (code4 === 33) {
      effects.consume(code4);
      return declarationOpen;
    }
    if (code4 === 47) {
      effects.consume(code4);
      closingTag = true;
      return tagCloseStart;
    }
    if (code4 === 63) {
      effects.consume(code4);
      marker = 3;
      return self.interrupt ? ok3 : continuationDeclarationInside;
    }
    if (asciiAlpha(code4)) {
      effects.consume(code4);
      buffer = String.fromCharCode(code4);
      return tagName;
    }
    return nok(code4);
  }
  function declarationOpen(code4) {
    if (code4 === 45) {
      effects.consume(code4);
      marker = 2;
      return commentOpenInside;
    }
    if (code4 === 91) {
      effects.consume(code4);
      marker = 5;
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code4)) {
      effects.consume(code4);
      marker = 4;
      return self.interrupt ? ok3 : continuationDeclarationInside;
    }
    return nok(code4);
  }
  function commentOpenInside(code4) {
    if (code4 === 45) {
      effects.consume(code4);
      return self.interrupt ? ok3 : continuationDeclarationInside;
    }
    return nok(code4);
  }
  function cdataOpenInside(code4) {
    const value = "CDATA[";
    if (code4 === value.charCodeAt(index2++)) {
      effects.consume(code4);
      if (index2 === value.length) {
        return self.interrupt ? ok3 : continuation;
      }
      return cdataOpenInside;
    }
    return nok(code4);
  }
  function tagCloseStart(code4) {
    if (asciiAlpha(code4)) {
      effects.consume(code4);
      buffer = String.fromCharCode(code4);
      return tagName;
    }
    return nok(code4);
  }
  function tagName(code4) {
    if (code4 === null || code4 === 47 || code4 === 62 || markdownLineEndingOrSpace(code4)) {
      const slash = code4 === 47;
      const name = buffer.toLowerCase();
      if (!slash && !closingTag && htmlRawNames.includes(name)) {
        marker = 1;
        return self.interrupt ? ok3(code4) : continuation(code4);
      }
      if (htmlBlockNames.includes(buffer.toLowerCase())) {
        marker = 6;
        if (slash) {
          effects.consume(code4);
          return basicSelfClosing;
        }
        return self.interrupt ? ok3(code4) : continuation(code4);
      }
      marker = 7;
      return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code4) : closingTag ? completeClosingTagAfter(code4) : completeAttributeNameBefore(code4);
    }
    if (code4 === 45 || asciiAlphanumeric(code4)) {
      effects.consume(code4);
      buffer += String.fromCharCode(code4);
      return tagName;
    }
    return nok(code4);
  }
  function basicSelfClosing(code4) {
    if (code4 === 62) {
      effects.consume(code4);
      return self.interrupt ? ok3 : continuation;
    }
    return nok(code4);
  }
  function completeClosingTagAfter(code4) {
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return completeClosingTagAfter;
    }
    return completeEnd(code4);
  }
  function completeAttributeNameBefore(code4) {
    if (code4 === 47) {
      effects.consume(code4);
      return completeEnd;
    }
    if (code4 === 58 || code4 === 95 || asciiAlpha(code4)) {
      effects.consume(code4);
      return completeAttributeName;
    }
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return completeAttributeNameBefore;
    }
    return completeEnd(code4);
  }
  function completeAttributeName(code4) {
    if (code4 === 45 || code4 === 46 || code4 === 58 || code4 === 95 || asciiAlphanumeric(code4)) {
      effects.consume(code4);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code4);
  }
  function completeAttributeNameAfter(code4) {
    if (code4 === 61) {
      effects.consume(code4);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code4);
  }
  function completeAttributeValueBefore(code4) {
    if (code4 === null || code4 === 60 || code4 === 61 || code4 === 62 || code4 === 96) {
      return nok(code4);
    }
    if (code4 === 34 || code4 === 39) {
      effects.consume(code4);
      markerB = code4;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return completeAttributeValueBefore;
    }
    return completeAttributeValueUnquoted(code4);
  }
  function completeAttributeValueQuoted(code4) {
    if (code4 === markerB) {
      effects.consume(code4);
      markerB = null;
      return completeAttributeValueQuotedAfter;
    }
    if (code4 === null || markdownLineEnding(code4)) {
      return nok(code4);
    }
    effects.consume(code4);
    return completeAttributeValueQuoted;
  }
  function completeAttributeValueUnquoted(code4) {
    if (code4 === null || code4 === 34 || code4 === 39 || code4 === 47 || code4 === 60 || code4 === 61 || code4 === 62 || code4 === 96 || markdownLineEndingOrSpace(code4)) {
      return completeAttributeNameAfter(code4);
    }
    effects.consume(code4);
    return completeAttributeValueUnquoted;
  }
  function completeAttributeValueQuotedAfter(code4) {
    if (code4 === 47 || code4 === 62 || markdownSpace(code4)) {
      return completeAttributeNameBefore(code4);
    }
    return nok(code4);
  }
  function completeEnd(code4) {
    if (code4 === 62) {
      effects.consume(code4);
      return completeAfter;
    }
    return nok(code4);
  }
  function completeAfter(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      return continuation(code4);
    }
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return completeAfter;
    }
    return nok(code4);
  }
  function continuation(code4) {
    if (code4 === 45 && marker === 2) {
      effects.consume(code4);
      return continuationCommentInside;
    }
    if (code4 === 60 && marker === 1) {
      effects.consume(code4);
      return continuationRawTagOpen;
    }
    if (code4 === 62 && marker === 4) {
      effects.consume(code4);
      return continuationClose;
    }
    if (code4 === 63 && marker === 3) {
      effects.consume(code4);
      return continuationDeclarationInside;
    }
    if (code4 === 93 && marker === 5) {
      effects.consume(code4);
      return continuationCdataInside;
    }
    if (markdownLineEnding(code4) && (marker === 6 || marker === 7)) {
      effects.exit("htmlFlowData");
      return effects.check(blankLineBefore, continuationAfter, continuationStart)(code4);
    }
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("htmlFlowData");
      return continuationStart(code4);
    }
    effects.consume(code4);
    return continuation;
  }
  function continuationStart(code4) {
    return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code4);
  }
  function continuationStartNonLazy(code4) {
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    return continuationBefore;
  }
  function continuationBefore(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      return continuationStart(code4);
    }
    effects.enter("htmlFlowData");
    return continuation(code4);
  }
  function continuationCommentInside(code4) {
    if (code4 === 45) {
      effects.consume(code4);
      return continuationDeclarationInside;
    }
    return continuation(code4);
  }
  function continuationRawTagOpen(code4) {
    if (code4 === 47) {
      effects.consume(code4);
      buffer = "";
      return continuationRawEndTag;
    }
    return continuation(code4);
  }
  function continuationRawEndTag(code4) {
    if (code4 === 62) {
      const name = buffer.toLowerCase();
      if (htmlRawNames.includes(name)) {
        effects.consume(code4);
        return continuationClose;
      }
      return continuation(code4);
    }
    if (asciiAlpha(code4) && buffer.length < 8) {
      effects.consume(code4);
      buffer += String.fromCharCode(code4);
      return continuationRawEndTag;
    }
    return continuation(code4);
  }
  function continuationCdataInside(code4) {
    if (code4 === 93) {
      effects.consume(code4);
      return continuationDeclarationInside;
    }
    return continuation(code4);
  }
  function continuationDeclarationInside(code4) {
    if (code4 === 62) {
      effects.consume(code4);
      return continuationClose;
    }
    if (code4 === 45 && marker === 2) {
      effects.consume(code4);
      return continuationDeclarationInside;
    }
    return continuation(code4);
  }
  function continuationClose(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("htmlFlowData");
      return continuationAfter(code4);
    }
    effects.consume(code4);
    return continuationClose;
  }
  function continuationAfter(code4) {
    effects.exit("htmlFlow");
    return ok3(code4);
  }
}
function tokenizeNonLazyContinuationStart(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code4) {
    if (markdownLineEnding(code4)) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return after;
    }
    return nok(code4);
  }
  function after(code4) {
    return self.parser.lazy[self.now().line] ? nok(code4) : ok3(code4);
  }
}
function tokenizeBlankLineBefore(effects, ok3, nok) {
  return start;
  function start(code4) {
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    return effects.attempt(blankLine, ok3, nok);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/html-text.js
var htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok3, nok) {
  const self = this;
  let marker;
  let index2;
  let returnState;
  return start;
  function start(code4) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code4);
    return open2;
  }
  function open2(code4) {
    if (code4 === 33) {
      effects.consume(code4);
      return declarationOpen;
    }
    if (code4 === 47) {
      effects.consume(code4);
      return tagCloseStart;
    }
    if (code4 === 63) {
      effects.consume(code4);
      return instruction;
    }
    if (asciiAlpha(code4)) {
      effects.consume(code4);
      return tagOpen;
    }
    return nok(code4);
  }
  function declarationOpen(code4) {
    if (code4 === 45) {
      effects.consume(code4);
      return commentOpenInside;
    }
    if (code4 === 91) {
      effects.consume(code4);
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code4)) {
      effects.consume(code4);
      return declaration;
    }
    return nok(code4);
  }
  function commentOpenInside(code4) {
    if (code4 === 45) {
      effects.consume(code4);
      return commentEnd;
    }
    return nok(code4);
  }
  function comment2(code4) {
    if (code4 === null) {
      return nok(code4);
    }
    if (code4 === 45) {
      effects.consume(code4);
      return commentClose;
    }
    if (markdownLineEnding(code4)) {
      returnState = comment2;
      return lineEndingBefore(code4);
    }
    effects.consume(code4);
    return comment2;
  }
  function commentClose(code4) {
    if (code4 === 45) {
      effects.consume(code4);
      return commentEnd;
    }
    return comment2(code4);
  }
  function commentEnd(code4) {
    return code4 === 62 ? end(code4) : code4 === 45 ? commentClose(code4) : comment2(code4);
  }
  function cdataOpenInside(code4) {
    const value = "CDATA[";
    if (code4 === value.charCodeAt(index2++)) {
      effects.consume(code4);
      return index2 === value.length ? cdata : cdataOpenInside;
    }
    return nok(code4);
  }
  function cdata(code4) {
    if (code4 === null) {
      return nok(code4);
    }
    if (code4 === 93) {
      effects.consume(code4);
      return cdataClose;
    }
    if (markdownLineEnding(code4)) {
      returnState = cdata;
      return lineEndingBefore(code4);
    }
    effects.consume(code4);
    return cdata;
  }
  function cdataClose(code4) {
    if (code4 === 93) {
      effects.consume(code4);
      return cdataEnd;
    }
    return cdata(code4);
  }
  function cdataEnd(code4) {
    if (code4 === 62) {
      return end(code4);
    }
    if (code4 === 93) {
      effects.consume(code4);
      return cdataEnd;
    }
    return cdata(code4);
  }
  function declaration(code4) {
    if (code4 === null || code4 === 62) {
      return end(code4);
    }
    if (markdownLineEnding(code4)) {
      returnState = declaration;
      return lineEndingBefore(code4);
    }
    effects.consume(code4);
    return declaration;
  }
  function instruction(code4) {
    if (code4 === null) {
      return nok(code4);
    }
    if (code4 === 63) {
      effects.consume(code4);
      return instructionClose;
    }
    if (markdownLineEnding(code4)) {
      returnState = instruction;
      return lineEndingBefore(code4);
    }
    effects.consume(code4);
    return instruction;
  }
  function instructionClose(code4) {
    return code4 === 62 ? end(code4) : instruction(code4);
  }
  function tagCloseStart(code4) {
    if (asciiAlpha(code4)) {
      effects.consume(code4);
      return tagClose;
    }
    return nok(code4);
  }
  function tagClose(code4) {
    if (code4 === 45 || asciiAlphanumeric(code4)) {
      effects.consume(code4);
      return tagClose;
    }
    return tagCloseBetween(code4);
  }
  function tagCloseBetween(code4) {
    if (markdownLineEnding(code4)) {
      returnState = tagCloseBetween;
      return lineEndingBefore(code4);
    }
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return tagCloseBetween;
    }
    return end(code4);
  }
  function tagOpen(code4) {
    if (code4 === 45 || asciiAlphanumeric(code4)) {
      effects.consume(code4);
      return tagOpen;
    }
    if (code4 === 47 || code4 === 62 || markdownLineEndingOrSpace(code4)) {
      return tagOpenBetween(code4);
    }
    return nok(code4);
  }
  function tagOpenBetween(code4) {
    if (code4 === 47) {
      effects.consume(code4);
      return end;
    }
    if (code4 === 58 || code4 === 95 || asciiAlpha(code4)) {
      effects.consume(code4);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code4)) {
      returnState = tagOpenBetween;
      return lineEndingBefore(code4);
    }
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return tagOpenBetween;
    }
    return end(code4);
  }
  function tagOpenAttributeName(code4) {
    if (code4 === 45 || code4 === 46 || code4 === 58 || code4 === 95 || asciiAlphanumeric(code4)) {
      effects.consume(code4);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code4);
  }
  function tagOpenAttributeNameAfter(code4) {
    if (code4 === 61) {
      effects.consume(code4);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code4)) {
      returnState = tagOpenAttributeNameAfter;
      return lineEndingBefore(code4);
    }
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code4);
  }
  function tagOpenAttributeValueBefore(code4) {
    if (code4 === null || code4 === 60 || code4 === 61 || code4 === 62 || code4 === 96) {
      return nok(code4);
    }
    if (code4 === 34 || code4 === 39) {
      effects.consume(code4);
      marker = code4;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code4)) {
      returnState = tagOpenAttributeValueBefore;
      return lineEndingBefore(code4);
    }
    if (markdownSpace(code4)) {
      effects.consume(code4);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code4);
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuoted(code4) {
    if (code4 === marker) {
      effects.consume(code4);
      marker = void 0;
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code4 === null) {
      return nok(code4);
    }
    if (markdownLineEnding(code4)) {
      returnState = tagOpenAttributeValueQuoted;
      return lineEndingBefore(code4);
    }
    effects.consume(code4);
    return tagOpenAttributeValueQuoted;
  }
  function tagOpenAttributeValueUnquoted(code4) {
    if (code4 === null || code4 === 34 || code4 === 39 || code4 === 60 || code4 === 61 || code4 === 96) {
      return nok(code4);
    }
    if (code4 === 47 || code4 === 62 || markdownLineEndingOrSpace(code4)) {
      return tagOpenBetween(code4);
    }
    effects.consume(code4);
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuotedAfter(code4) {
    if (code4 === 47 || code4 === 62 || markdownLineEndingOrSpace(code4)) {
      return tagOpenBetween(code4);
    }
    return nok(code4);
  }
  function end(code4) {
    if (code4 === 62) {
      effects.consume(code4);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok3;
    }
    return nok(code4);
  }
  function lineEndingBefore(code4) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    return lineEndingAfter;
  }
  function lineEndingAfter(code4) {
    return markdownSpace(code4) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4) : lineEndingAfterPrefix(code4);
  }
  function lineEndingAfterPrefix(code4) {
    effects.enter("htmlTextData");
    return returnState(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/label-end.js
var labelEnd = {
  name: "labelEnd",
  resolveAll: resolveAllLabelEnd,
  resolveTo: resolveToLabelEnd,
  tokenize: tokenizeLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var referenceFullConstruct = {
  tokenize: tokenizeReferenceFull
};
var referenceCollapsedConstruct = {
  tokenize: tokenizeReferenceCollapsed
};
function resolveAllLabelEnd(events) {
  let index2 = -1;
  const newEvents = [];
  while (++index2 < events.length) {
    const token = events[index2][1];
    newEvents.push(events[index2]);
    if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
      const offset = token.type === "labelImage" ? 4 : 2;
      token.type = "data";
      index2 += offset;
    }
  }
  if (events.length !== newEvents.length) {
    splice(events, 0, events.length, newEvents);
  }
  return events;
}
function resolveToLabelEnd(events, context) {
  let index2 = events.length;
  let offset = 0;
  let token;
  let open2;
  let close;
  let media;
  while (index2--) {
    token = events[index2][1];
    if (open2) {
      if (token.type === "link" || token.type === "labelLink" && token._inactive) {
        break;
      }
      if (events[index2][0] === "enter" && token.type === "labelLink") {
        token._inactive = true;
      }
    } else if (close) {
      if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
        open2 = index2;
        if (token.type !== "labelLink") {
          offset = 2;
          break;
        }
      }
    } else if (token.type === "labelEnd") {
      close = index2;
    }
  }
  const group = {
    type: events[open2][1].type === "labelLink" ? "link" : "image",
    start: {
      ...events[open2][1].start
    },
    end: {
      ...events[events.length - 1][1].end
    }
  };
  const label = {
    type: "label",
    start: {
      ...events[open2][1].start
    },
    end: {
      ...events[close][1].end
    }
  };
  const text6 = {
    type: "labelText",
    start: {
      ...events[open2 + offset + 2][1].end
    },
    end: {
      ...events[close - 2][1].start
    }
  };
  media = [["enter", group, context], ["enter", label, context]];
  media = push(media, events.slice(open2 + 1, open2 + offset + 3));
  media = push(media, [["enter", text6, context]]);
  media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open2 + offset + 4, close - 3), context));
  media = push(media, [["exit", text6, context], events[close - 2], events[close - 1], ["exit", label, context]]);
  media = push(media, events.slice(close + 1));
  media = push(media, [["exit", group, context]]);
  splice(events, open2, events.length, media);
  return events;
}
function tokenizeLabelEnd(effects, ok3, nok) {
  const self = this;
  let index2 = self.events.length;
  let labelStart;
  let defined;
  while (index2--) {
    if ((self.events[index2][1].type === "labelImage" || self.events[index2][1].type === "labelLink") && !self.events[index2][1]._balanced) {
      labelStart = self.events[index2][1];
      break;
    }
  }
  return start;
  function start(code4) {
    if (!labelStart) {
      return nok(code4);
    }
    if (labelStart._inactive) {
      return labelEndNok(code4);
    }
    defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
      start: labelStart.end,
      end: self.now()
    })));
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code4);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return after;
  }
  function after(code4) {
    if (code4 === 40) {
      return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code4);
    }
    if (code4 === 91) {
      return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code4);
    }
    return defined ? labelEndOk(code4) : labelEndNok(code4);
  }
  function referenceNotFull(code4) {
    return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code4);
  }
  function labelEndOk(code4) {
    return ok3(code4);
  }
  function labelEndNok(code4) {
    labelStart._balanced = true;
    return nok(code4);
  }
}
function tokenizeResource(effects, ok3, nok) {
  return resourceStart;
  function resourceStart(code4) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code4);
    effects.exit("resourceMarker");
    return resourceBefore;
  }
  function resourceBefore(code4) {
    return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, resourceOpen)(code4) : resourceOpen(code4);
  }
  function resourceOpen(code4) {
    if (code4 === 41) {
      return resourceEnd(code4);
    }
    return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code4);
  }
  function resourceDestinationAfter(code4) {
    return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, resourceBetween)(code4) : resourceEnd(code4);
  }
  function resourceDestinationMissing(code4) {
    return nok(code4);
  }
  function resourceBetween(code4) {
    if (code4 === 34 || code4 === 39 || code4 === 40) {
      return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code4);
    }
    return resourceEnd(code4);
  }
  function resourceTitleAfter(code4) {
    return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, resourceEnd)(code4) : resourceEnd(code4);
  }
  function resourceEnd(code4) {
    if (code4 === 41) {
      effects.enter("resourceMarker");
      effects.consume(code4);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok3;
    }
    return nok(code4);
  }
}
function tokenizeReferenceFull(effects, ok3, nok) {
  const self = this;
  return referenceFull;
  function referenceFull(code4) {
    return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code4);
  }
  function referenceFullAfter(code4) {
    return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok3(code4) : nok(code4);
  }
  function referenceFullMissing(code4) {
    return nok(code4);
  }
}
function tokenizeReferenceCollapsed(effects, ok3, nok) {
  return referenceCollapsedStart;
  function referenceCollapsedStart(code4) {
    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code4);
    effects.exit("referenceMarker");
    return referenceCollapsedOpen;
  }
  function referenceCollapsedOpen(code4) {
    if (code4 === 93) {
      effects.enter("referenceMarker");
      effects.consume(code4);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok3;
    }
    return nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/label-start-image.js
var labelStartImage = {
  name: "labelStartImage",
  resolveAll: labelEnd.resolveAll,
  tokenize: tokenizeLabelStartImage
};
function tokenizeLabelStartImage(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code4) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code4);
    effects.exit("labelImageMarker");
    return open2;
  }
  function open2(code4) {
    if (code4 === 91) {
      effects.enter("labelMarker");
      effects.consume(code4);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code4);
  }
  function after(code4) {
    return code4 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code4) : ok3(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/label-start-link.js
var labelStartLink = {
  name: "labelStartLink",
  resolveAll: labelEnd.resolveAll,
  tokenize: tokenizeLabelStartLink
};
function tokenizeLabelStartLink(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code4) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code4);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }
  function after(code4) {
    return code4 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code4) : ok3(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/line-ending.js
var lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok3) {
  return start;
  function start(code4) {
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    return factorySpace(effects, ok3, "linePrefix");
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/thematic-break.js
var thematicBreak = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok3, nok) {
  let size = 0;
  let marker;
  return start;
  function start(code4) {
    effects.enter("thematicBreak");
    return before(code4);
  }
  function before(code4) {
    marker = code4;
    return atBreak(code4);
  }
  function atBreak(code4) {
    if (code4 === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code4);
    }
    if (size >= 3 && (code4 === null || markdownLineEnding(code4))) {
      effects.exit("thematicBreak");
      return ok3(code4);
    }
    return nok(code4);
  }
  function sequence(code4) {
    if (code4 === marker) {
      effects.consume(code4);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return markdownSpace(code4) ? factorySpace(effects, atBreak, "whitespace")(code4) : atBreak(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/list.js
var list = {
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd,
  name: "list",
  tokenize: tokenizeListStart
};
var listItemPrefixWhitespaceConstruct = {
  partial: true,
  tokenize: tokenizeListItemPrefixWhitespace
};
var indentConstruct = {
  partial: true,
  tokenize: tokenizeIndent
};
function tokenizeListStart(effects, ok3, nok) {
  const self = this;
  const tail = self.events[self.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start;
  function start(code4) {
    const kind = self.containerState.type || (code4 === 42 || code4 === 43 || code4 === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self.containerState.marker || code4 === self.containerState.marker : asciiDigit(code4)) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code4 === 42 || code4 === 45 ? effects.check(thematicBreak, nok, atMarker)(code4) : atMarker(code4);
      }
      if (!self.interrupt || code4 === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code4);
      }
    }
    return nok(code4);
  }
  function inside(code4) {
    if (asciiDigit(code4) && ++size < 10) {
      effects.consume(code4);
      return inside;
    }
    if ((!self.interrupt || size < 2) && (self.containerState.marker ? code4 === self.containerState.marker : code4 === 41 || code4 === 46)) {
      effects.exit("listItemValue");
      return atMarker(code4);
    }
    return nok(code4);
  }
  function atMarker(code4) {
    effects.enter("listItemMarker");
    effects.consume(code4);
    effects.exit("listItemMarker");
    self.containerState.marker = self.containerState.marker || code4;
    return effects.check(
      blankLine,
      // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank,
      effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix)
    );
  }
  function onBlank(code4) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code4);
  }
  function otherPrefix(code4) {
    if (markdownSpace(code4)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code4);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code4);
  }
  function endOfPrefix(code4) {
    self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok3(code4);
  }
}
function tokenizeListContinuation(effects, ok3, nok) {
  const self = this;
  self.containerState._closeFlow = void 0;
  return effects.check(blankLine, onBlank, notBlank);
  function onBlank(code4) {
    self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
    return factorySpace(effects, ok3, "listItemIndent", self.containerState.size + 1)(code4);
  }
  function notBlank(code4) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code4)) {
      self.containerState.furtherBlankLines = void 0;
      self.containerState.initialBlankLine = void 0;
      return notInCurrentItem(code4);
    }
    self.containerState.furtherBlankLines = void 0;
    self.containerState.initialBlankLine = void 0;
    return effects.attempt(indentConstruct, ok3, notInCurrentItem)(code4);
  }
  function notInCurrentItem(code4) {
    self.containerState._closeFlow = true;
    self.interrupt = void 0;
    return factorySpace(effects, effects.attempt(list, ok3, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4);
  }
}
function tokenizeIndent(effects, ok3, nok) {
  const self = this;
  return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
  function afterPrefix(code4) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok3(code4) : nok(code4);
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok3, nok) {
  const self = this;
  return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
  function afterPrefix(code4) {
    const tail = self.events[self.events.length - 1];
    return !markdownSpace(code4) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok3(code4) : nok(code4);
  }
}

// node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/setext-underline.js
var setextUnderline = {
  name: "setextUnderline",
  resolveTo: resolveToSetextUnderline,
  tokenize: tokenizeSetextUnderline
};
function resolveToSetextUnderline(events, context) {
  let index2 = events.length;
  let content3;
  let text6;
  let definition3;
  while (index2--) {
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content3 = index2;
        break;
      }
      if (events[index2][1].type === "paragraph") {
        text6 = index2;
      }
    } else {
      if (events[index2][1].type === "content") {
        events.splice(index2, 1);
      }
      if (!definition3 && events[index2][1].type === "definition") {
        definition3 = index2;
      }
    }
  }
  const heading3 = {
    type: "setextHeading",
    start: {
      ...events[content3][1].start
    },
    end: {
      ...events[events.length - 1][1].end
    }
  };
  events[text6][1].type = "setextHeadingText";
  if (definition3) {
    events.splice(text6, 0, ["enter", heading3, context]);
    events.splice(definition3 + 1, 0, ["exit", events[content3][1], context]);
    events[content3][1].end = {
      ...events[definition3][1].end
    };
  } else {
    events[content3][1] = heading3;
  }
  events.push(["exit", heading3, context]);
  return events;
}
function tokenizeSetextUnderline(effects, ok3, nok) {
  const self = this;
  let marker;
  return start;
  function start(code4) {
    let index2 = self.events.length;
    let paragraph3;
    while (index2--) {
      if (self.events[index2][1].type !== "lineEnding" && self.events[index2][1].type !== "linePrefix" && self.events[index2][1].type !== "content") {
        paragraph3 = self.events[index2][1].type === "paragraph";
        break;
      }
    }
    if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph3)) {
      effects.enter("setextHeadingLine");
      marker = code4;
      return before(code4);
    }
    return nok(code4);
  }
  function before(code4) {
    effects.enter("setextHeadingLineSequence");
    return inside(code4);
  }
  function inside(code4) {
    if (code4 === marker) {
      effects.consume(code4);
      return inside;
    }
    effects.exit("setextHeadingLineSequence");
    return markdownSpace(code4) ? factorySpace(effects, after, "lineSuffix")(code4) : after(code4);
  }
  function after(code4) {
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("setextHeadingLine");
      return ok3(code4);
    }
    return nok(code4);
  }
}

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/initialize/flow.js
var flow = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  const self = this;
  const initial = effects.attempt(
    // Try to parse a blank line.
    blankLine,
    atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content2, afterConstruct)), "linePrefix"))
  );
  return initial;
  function atBlankEnding(code4) {
    if (code4 === null) {
      effects.consume(code4);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code4);
    effects.exit("lineEndingBlank");
    self.currentConstruct = void 0;
    return initial;
  }
  function afterConstruct(code4) {
    if (code4 === null) {
      effects.consume(code4);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code4);
    effects.exit("lineEnding");
    self.currentConstruct = void 0;
    return initial;
  }
}

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/initialize/text.js
var resolver = {
  resolveAll: createResolver()
};
var string = initializeFactory("string");
var text = initializeFactory("text");
function initializeFactory(field) {
  return {
    resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
    tokenize: initializeText
  };
  function initializeText(effects) {
    const self = this;
    const constructs2 = this.parser.constructs[field];
    const text6 = effects.attempt(constructs2, start, notText);
    return start;
    function start(code4) {
      return atBreak(code4) ? text6(code4) : notText(code4);
    }
    function notText(code4) {
      if (code4 === null) {
        effects.consume(code4);
        return;
      }
      effects.enter("data");
      effects.consume(code4);
      return data;
    }
    function data(code4) {
      if (atBreak(code4)) {
        effects.exit("data");
        return text6(code4);
      }
      effects.consume(code4);
      return data;
    }
    function atBreak(code4) {
      if (code4 === null) {
        return true;
      }
      const list4 = constructs2[code4];
      let index2 = -1;
      if (list4) {
        while (++index2 < list4.length) {
          const item = list4[index2];
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1;
    let enter;
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === "data") {
          enter = index2;
          index2++;
        }
      } else if (!events[index2] || events[index2][1].type !== "data") {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      const data = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs2;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === "string") {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex)
            break;
          bufferIndex = -1;
        } else if (chunk === -2) {
          tabs2 = true;
          size++;
        } else if (chunk === -1) {
        } else {
          index2++;
          break;
        }
      }
      if (context._contentTypeTextTrailing && eventIndex === events.length) {
        size = 0;
      }
      if (size) {
        const token = {
          type: eventIndex === events.length || tabs2 || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex,
            _index: data.start._index + index2,
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size
          },
          end: {
            ...data.end
          }
        };
        data.end = {
          ...token.start
        };
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token);
        } else {
          events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/constructs.js
var constructs_exports = {};
__export(constructs_exports, {
  attentionMarkers: () => attentionMarkers,
  contentInitial: () => contentInitial,
  disable: () => disable,
  document: () => document2,
  flow: () => flow2,
  flowInitial: () => flowInitial,
  insideSpan: () => insideSpan,
  string: () => string2,
  text: () => text2
});
var document2 = {
  [42]: list,
  [43]: list,
  [45]: list,
  [48]: list,
  [49]: list,
  [50]: list,
  [51]: list,
  [52]: list,
  [53]: list,
  [54]: list,
  [55]: list,
  [56]: list,
  [57]: list,
  [62]: blockQuote
};
var contentInitial = {
  [91]: definition
};
var flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};
var flow2 = {
  [35]: headingAtx,
  [42]: thematicBreak,
  [45]: [setextUnderline, thematicBreak],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak,
  [96]: codeFenced,
  [126]: codeFenced
};
var string2 = {
  [38]: characterReference,
  [92]: characterEscape
};
var text2 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};
var insideSpan = {
  null: [attention, resolver]
};
var attentionMarkers = {
  null: [42, 95]
};
var disable = {
  null: []
};

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/create-tokenizer.js
function createTokenizer(parser, initialize, from) {
  let point3 = {
    _bufferIndex: -1,
    _index: 0,
    line: from && from.line || 1,
    column: from && from.column || 1,
    offset: from && from.offset || 0
  };
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  let consumed = true;
  const effects = {
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    consume,
    enter,
    exit: exit3,
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    code: null,
    containerState: {},
    defineSkip,
    events: [],
    now,
    parser,
    previous: null,
    sliceSerialize,
    sliceStream,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  let expectedCode;
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main2();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    const {
      _bufferIndex,
      _index,
      line,
      column,
      offset
    } = point3;
    return {
      _bufferIndex,
      _index,
      line,
      column,
      offset
    };
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main2() {
    let chunkIndex;
    while (point3._index < chunks.length) {
      const chunk = chunks[point3._index];
      if (typeof chunk === "string") {
        chunkIndex = point3._index;
        if (point3._bufferIndex < 0) {
          point3._bufferIndex = 0;
        }
        while (point3._index === chunkIndex && point3._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point3._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code4) {
    consumed = void 0;
    expectedCode = code4;
    state = state(code4);
  }
  function consume(code4) {
    if (markdownLineEnding(code4)) {
      point3.line++;
      point3.column = 1;
      point3.offset += code4 === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code4 !== -1) {
      point3.column++;
      point3.offset++;
    }
    if (point3._bufferIndex < 0) {
      point3._index++;
    } else {
      point3._bufferIndex++;
      if (point3._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
      // strings.
      /** @type {string} */
      chunks[point3._index].length) {
        point3._bufferIndex = -1;
        point3._index++;
      }
    }
    context.previous = code4;
    consumed = true;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit3(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs2) ? (
        /* c8 ignore next 1 */
        handleListOfConstructs(constructs2)
      ) : "tokenize" in constructs2 ? (
        // Looks like a construct.
        handleListOfConstructs([
          /** @type {Construct} */
          constructs2
        ])
      ) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map3) {
        return start;
        function start(code4) {
          const left = code4 !== null && map3[code4];
          const all2 = code4 !== null && map3.null;
          const list4 = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(left) ? left : left ? [left] : [],
            ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
          ];
          return handleListOfConstructs(list4)(code4);
        }
      }
      function handleListOfConstructs(list4) {
        listOfConstructs = list4;
        constructIndex = 0;
        if (list4.length === 0) {
          return bogusState;
        }
        return handleConstruct(list4[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code4) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok(code4);
          }
          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok3,
            nok
          )(code4);
        }
      }
      function ok3(code4) {
        consumed = true;
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code4) {
        consumed = true;
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      from: startEventsIndex,
      restore
    };
    function restore() {
      point3 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point3.line in columnStart && point3.column < 2) {
      point3.column = columnStart[point3.line];
      point3.offset += columnStart[point3.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      const head = view[0];
      if (typeof head === "string") {
        view[0] = head.slice(startBufferIndex);
      } else {
        view.shift();
      }
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/parse.js
function parse(options) {
  const settings = options || {};
  const constructs2 = (
    /** @type {FullNormalizedExtension} */
    combineExtensions([constructs_exports, ...settings.extensions || []])
  );
  const parser = {
    constructs: constructs2,
    content: create(content),
    defined: [],
    document: create(document),
    flow: create(flow),
    lazy: {},
    string: create(string),
    text: create(text)
  };
  return parser;
  function create(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/postprocess.js
function postprocess(events) {
  while (!subtokenize(events)) {
  }
  return events;
}

// node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/preprocess.js
var search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1;
  let buffer = "";
  let start = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end) {
    const chunks = [];
    let match;
    let next;
    let startPosition;
    let endPosition;
    let code4;
    value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
    startPosition = 0;
    buffer = "";
    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start = void 0;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match && match.index !== void 0 ? match.index : value.length;
      code4 = value.charCodeAt(endPosition);
      if (!match) {
        buffer = value.slice(startPosition);
        break;
      }
      if (code4 === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code4) {
          case 0: {
            chunks.push(65533);
            column++;
            break;
          }
          case 9: {
            next = Math.ceil(column / 4) * 4;
            chunks.push(-2);
            while (column++ < next)
              chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4);
            column = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn)
        chunks.push(-5);
      if (buffer)
        chunks.push(buffer);
      chunks.push(null);
    }
    return chunks;
  }
}

// node_modules/.pnpm/micromark-util-decode-string@2.0.1/node_modules/micromark-util-decode-string/index.js
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head = $2.charCodeAt(0);
  if (head === 35) {
    const head2 = $2.charCodeAt(1);
    const hex = head2 === 120 || head2 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}

// node_modules/.pnpm/mdast-util-from-markdown@2.0.3/node_modules/mdast-util-from-markdown/lib/index.js
var own3 = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
  if (encoding && typeof encoding === "object") {
    options = encoding;
    encoding = void 0;
  }
  return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
}
function compiler(options) {
  const config = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: opener(link3),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener(heading3),
      blockQuote: opener(blockQuote2),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener(codeFlow),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeIndented: opener(codeFlow, buffer),
      codeText: opener(codeText2, buffer),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener(definition3),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener(emphasis2),
      hardBreakEscape: opener(hardBreak2),
      hardBreakTrailing: opener(hardBreak2),
      htmlFlow: opener(html2, buffer),
      htmlFlowData: onenterdata,
      htmlText: opener(html2, buffer),
      htmlTextData: onenterdata,
      image: opener(image3),
      label: buffer,
      link: opener(link3),
      listItem: opener(listItem3),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener(list4, onenterlistordered),
      listUnordered: opener(list4),
      paragraph: opener(paragraph3),
      reference: onenterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener(heading3),
      strong: opener(strong2),
      thematicBreak: opener(thematicBreak3)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      characterReference: onexitcharacterreference,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    }
  };
  configure(config, (options || {}).mdastExtensions || []);
  const data = {};
  return compile;
  function compile(events) {
    let tree = {
      type: "root",
      children: []
    };
    const context = {
      stack: [tree],
      tokenStack: [],
      config,
      enter,
      exit: exit3,
      buffer,
      resume,
      data
    };
    const listStack = [];
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
        if (events[index2][0] === "enter") {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          index2 = prepareList(events, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      const handler = config[events[index2][0]];
      if (own3.call(handler, events[index2][1].type)) {
        handler[events[index2][1].type].call(Object.assign({
          sliceSerialize: events[index2][2].sliceSerialize
        }, context), events[index2][1]);
      }
    }
    if (context.tokenStack.length > 0) {
      const tail = context.tokenStack[context.tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(events.length > 0 ? events[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: point2(events.length > 0 ? events[events.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    };
    index2 = -1;
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree;
    }
    return tree;
  }
  function prepareList(events, start, length) {
    let index2 = start - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem4;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events[index2];
      switch (event[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          if (event[0] === "enter") {
            containerBalance++;
          } else {
            containerBalance--;
          }
          atMarker = void 0;
          break;
        }
        case "lineEndingBlank": {
          if (event[0] === "enter") {
            if (listItem4 && !atMarker && !containerBalance && !firstBlankLineIndex) {
              firstBlankLineIndex = index2;
            }
            atMarker = void 0;
          }
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace": {
          break;
        }
        default: {
          atMarker = void 0;
        }
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem4) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit")
                continue;
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
                listSpread = true;
              }
              tailEvent[1].type = "lineEnding";
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
            } else {
              break;
            }
          }
          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem4._spread = true;
          }
          listItem4.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
          events.splice(lineIndex || index2, 0, ["exit", listItem4, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === "listItemPrefix") {
          const item = {
            type: "listItem",
            _spread: false,
            start: Object.assign({}, event[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          listItem4 = item;
          events.splice(index2, 0, ["enter", item, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events[start][1]._spread = listSpread;
    return length;
  }
  function opener(create, and) {
    return open2;
    function open2(token) {
      enter.call(this, create(token), token);
      if (and)
        and.call(this, token);
    }
  }
  function buffer() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function enter(node2, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    const siblings = parent.children;
    siblings.push(node2);
    this.stack.push(node2);
    this.tokenStack.push([token, errorHandler || void 0]);
    node2.position = {
      start: point2(token.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and)
        and.call(this, token);
      exit3.call(this, token);
    }
  }
  function exit3(token, onExitError) {
    const node2 = this.stack.pop();
    const open2 = this.tokenStack.pop();
    if (!open2) {
      throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
        start: token.start,
        end: token.end
      }) + "): it\u2019s not open");
    } else if (open2[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open2[0]);
      } else {
        const handler = open2[1] || defaultOnError;
        handler.call(this, token, open2[0]);
      }
    }
    node2.position.end = point2(token.end);
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterlistordered() {
    this.data.expectingFirstListItemValue = true;
  }
  function onenterlistitemvalue(token) {
    if (this.data.expectingFirstListItemValue) {
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
      this.data.expectingFirstListItemValue = void 0;
    }
  }
  function onexitcodefencedfenceinfo() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.lang = data2;
  }
  function onexitcodefencedfencemeta() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.meta = data2;
  }
  function onexitcodefencedfence() {
    if (this.data.flowCodeInside)
      return;
    this.buffer();
    this.data.flowCodeInside = true;
  }
  function onexitcodefenced() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
    this.data.flowCodeInside = void 0;
  }
  function onexitcodeindented() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2.replace(/(\r?\n|\r)$/g, "");
  }
  function onexitdefinitionlabelstring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data2;
  }
  function onexitdefinitiondestinationstring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data2;
  }
  function onexitatxheadingsequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    if (!node2.depth) {
      const depth = this.sliceSerialize(token).length;
      node2.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    this.data.setextHeadingSlurpLineEnding = true;
  }
  function onexitsetextheadinglinesequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    node2.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
  }
  function onexitsetextheading() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function onenterdata(token) {
    const node2 = this.stack[this.stack.length - 1];
    const siblings = node2.children;
    let tail = siblings[siblings.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text6();
      tail.position = {
        start: point2(token.start),
        // @ts-expect-error: we’ll add `end` later.
        end: void 0
      };
      siblings.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point2(token.end);
  }
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const tail = context.children[context.children.length - 1];
      tail.position.end = point2(token.end);
      this.data.atHardBreak = void 0;
      return;
    }
    if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }
  function onexithardbreak() {
    this.data.atHardBreak = true;
  }
  function onexithtmlflow() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexithtmltext() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexitcodetext() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexitlink() {
    const node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const referenceType = this.data.referenceType || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    this.data.referenceType = void 0;
  }
  function onexitimage() {
    const node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const referenceType = this.data.referenceType || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    this.data.referenceType = void 0;
  }
  function onexitlabeltext(token) {
    const string3 = this.sliceSerialize(token);
    const ancestor = this.stack[this.stack.length - 2];
    ancestor.label = decodeString(string3);
    ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    const value = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    this.data.inReference = true;
    if (node2.type === "link") {
      const children = fragment.children;
      node2.children = children;
    } else {
      node2.alt = value;
    }
  }
  function onexitresourcedestinationstring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data2;
  }
  function onexitresourcetitlestring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data2;
  }
  function onexitresource() {
    this.data.inReference = void 0;
  }
  function onenterreference() {
    this.data.referenceType = "collapsed";
  }
  function onexitreferencestring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    this.data.referenceType = "full";
  }
  function onexitcharacterreferencemarker(token) {
    this.data.characterReferenceType = token.type;
  }
  function onexitcharacterreferencevalue(token) {
    const data2 = this.sliceSerialize(token);
    const type = this.data.characterReferenceType;
    let value;
    if (type) {
      value = decodeNumericCharacterReference(data2, type === "characterReferenceMarkerNumeric" ? 10 : 16);
      this.data.characterReferenceType = void 0;
    } else {
      const result = decodeNamedCharacterReference(data2);
      value = result;
    }
    const tail = this.stack[this.stack.length - 1];
    tail.value += value;
  }
  function onexitcharacterreference(token) {
    const tail = this.stack.pop();
    tail.position.end = point2(token.end);
  }
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = this.sliceSerialize(token);
  }
  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = "mailto:" + this.sliceSerialize(token);
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function definition3() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function emphasis2() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function heading3() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function hardBreak2() {
    return {
      type: "break"
    };
  }
  function html2() {
    return {
      type: "html",
      value: ""
    };
  }
  function image3() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function link3() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function list4(token) {
    return {
      type: "list",
      ordered: token.type === "listOrdered",
      start: null,
      spread: token._spread,
      children: []
    };
  }
  function listItem3(token) {
    return {
      type: "listItem",
      spread: token._spread,
      checked: null,
      children: []
    };
  }
  function paragraph3() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function strong2() {
    return {
      type: "strong",
      children: []
    };
  }
  function text6() {
    return {
      type: "text",
      value: ""
    };
  }
  function thematicBreak3() {
    return {
      type: "thematicBreak"
    };
  }
}
function point2(d) {
  return {
    line: d.line,
    column: d.column,
    offset: d.offset
  };
}
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value = extensions[index2];
    if (Array.isArray(value)) {
      configure(combined, value);
    } else {
      extension(combined, value);
    }
  }
}
function extension(combined, extension2) {
  let key;
  for (key in extension2) {
    if (own3.call(extension2, key)) {
      switch (key) {
        case "canContainEols": {
          const right = extension2[key];
          if (right) {
            combined[key].push(...right);
          }
          break;
        }
        case "transforms": {
          const right = extension2[key];
          if (right) {
            combined[key].push(...right);
          }
          break;
        }
        case "enter":
        case "exit": {
          const right = extension2[key];
          if (right) {
            Object.assign(combined[key], right);
          }
          break;
        }
      }
    }
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
      start: left.start,
      end: left.end
    }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is open");
  } else {
    throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is still open");
  }
}

// node_modules/.pnpm/remark-parse@11.0.0/node_modules/remark-parse/lib/index.js
function remarkParse(options) {
  const self = this;
  self.parser = parser;
  function parser(doc) {
    return fromMarkdown(doc, {
      ...self.data("settings"),
      ...options,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: self.data("micromarkExtensions") || [],
      mdastExtensions: self.data("fromMarkdownExtensions") || []
    });
  }
}

// node_modules/.pnpm/ccount@2.0.1/node_modules/ccount/index.js
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index2 = source.indexOf(character);
  while (index2 !== -1) {
    count++;
    index2 = source.indexOf(character, index2 + character.length);
  }
  return count;
}

// node_modules/.pnpm/escape-string-regexp@5.0.0/node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string3) {
  if (typeof string3 !== "string") {
    throw new TypeError("Expected a string");
  }
  return string3.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// node_modules/.pnpm/unist-util-is@6.0.1/node_modules/unist-util-is/lib/index.js
var convert = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(test) {
    if (test === null || test === void 0) {
      return ok2;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        propertiesFactory(
          /** @type {Props} */
          test
        )
      );
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory(tests) {
  const checks = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks[index2] = convert(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks.length) {
      if (checks[index3].apply(this, parameters))
        return true;
    }
    return false;
  }
}
function propertiesFactory(check) {
  const checkAsRecord = (
    /** @type {Record<string, unknown>} */
    check
  );
  return castFactory(all2);
  function all2(node2) {
    const nodeAsRecord = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      node2
    );
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node2) {
    return node2 && node2.type === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value, index2, parent) {
    return Boolean(
      looksLikeANode(value) && testFunction.call(
        this,
        value,
        typeof index2 === "number" ? index2 : void 0,
        parent || void 0
      )
    );
  }
}
function ok2() {
  return true;
}
function looksLikeANode(value) {
  return value !== null && typeof value === "object" && "type" in value;
}

// node_modules/.pnpm/unist-util-visit-parents@6.0.2/node_modules/unist-util-visit-parents/lib/color.node.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// node_modules/.pnpm/unist-util-visit-parents@6.0.2/node_modules/unist-util-visit-parents/lib/index.js
var empty = [];
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
function visitParents(tree, test, visitor, reverse) {
  let check;
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
  } else {
    check = test;
  }
  const is2 = convert(check);
  const step = reverse ? -1 : 1;
  factory(tree, void 0, [])();
  function factory(node2, index2, parents) {
    const value = (
      /** @type {Record<string, unknown>} */
      node2 && typeof node2 === "object" ? node2 : {}
    );
    if (typeof value.type === "string") {
      const name = (
        // `hast`
        typeof value.tagName === "string" ? value.tagName : (
          // `xast`
          typeof value.name === "string" ? value.name : void 0
        )
      );
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(node2.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = empty;
      let subresult;
      let offset;
      let grandparents;
      if (!test || is2(node2, index2, parents[parents.length - 1] || void 0)) {
        result = toResult(visitor(node2, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if ("children" in node2 && node2.children) {
        const nodeAsParent = (
          /** @type {UnistParent} */
          node2
        );
        if (nodeAsParent.children && result[0] !== SKIP) {
          offset = (reverse ? nodeAsParent.children.length : -1) + step;
          grandparents = parents.concat(nodeAsParent);
          while (offset > -1 && offset < nodeAsParent.children.length) {
            const child = nodeAsParent.children[offset];
            subresult = factory(child, offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
      }
      return result;
    }
  }
}
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return value === null || value === void 0 ? empty : [value];
}

// node_modules/.pnpm/mdast-util-find-and-replace@3.0.2/node_modules/mdast-util-find-and-replace/lib/index.js
function findAndReplace(tree, list4, options) {
  const settings = options || {};
  const ignored = convert(settings.ignore || []);
  const pairs = toPairs(list4);
  let pairIndex = -1;
  while (++pairIndex < pairs.length) {
    visitParents(tree, "text", visitor);
  }
  function visitor(node2, parents) {
    let index2 = -1;
    let grandparent;
    while (++index2 < parents.length) {
      const parent = parents[index2];
      const siblings = grandparent ? grandparent.children : void 0;
      if (ignored(
        parent,
        siblings ? siblings.indexOf(parent) : void 0,
        grandparent
      )) {
        return;
      }
      grandparent = parent;
    }
    if (grandparent) {
      return handler(node2, parents);
    }
  }
  function handler(node2, parents) {
    const parent = parents[parents.length - 1];
    const find = pairs[pairIndex][0];
    const replace2 = pairs[pairIndex][1];
    let start = 0;
    const siblings = parent.children;
    const index2 = siblings.indexOf(node2);
    let change = false;
    let nodes = [];
    find.lastIndex = 0;
    let match = find.exec(node2.value);
    while (match) {
      const position2 = match.index;
      const matchObject = {
        index: match.index,
        input: match.input,
        stack: [...parents, node2]
      };
      let value = replace2(...match, matchObject);
      if (typeof value === "string") {
        value = value.length > 0 ? { type: "text", value } : void 0;
      }
      if (value === false) {
        find.lastIndex = position2 + 1;
      } else {
        if (start !== position2) {
          nodes.push({
            type: "text",
            value: node2.value.slice(start, position2)
          });
        }
        if (Array.isArray(value)) {
          nodes.push(...value);
        } else if (value) {
          nodes.push(value);
        }
        start = position2 + match[0].length;
        change = true;
      }
      if (!find.global) {
        break;
      }
      match = find.exec(node2.value);
    }
    if (change) {
      if (start < node2.value.length) {
        nodes.push({ type: "text", value: node2.value.slice(start) });
      }
      parent.children.splice(index2, 1, ...nodes);
    } else {
      nodes = [node2];
    }
    return index2 + nodes.length;
  }
}
function toPairs(tupleOrList) {
  const result = [];
  if (!Array.isArray(tupleOrList)) {
    throw new TypeError("Expected find and replace tuple or list of tuples");
  }
  const list4 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
  let index2 = -1;
  while (++index2 < list4.length) {
    const tuple = list4[index2];
    result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
  }
  return result;
}
function toExpression(find) {
  return typeof find === "string" ? new RegExp(escapeStringRegexp(find), "g") : find;
}
function toFunction(replace2) {
  return typeof replace2 === "function" ? replace2 : function() {
    return replace2;
  };
}

// node_modules/.pnpm/mdast-util-gfm-autolink-literal@2.0.1/node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var inConstruct = "phrasing";
var notInConstruct = ["autolink", "link", "image", "label"];
function gfmAutolinkLiteralFromMarkdown() {
  return {
    transforms: [transformGfmAutolinkLiterals],
    enter: {
      literalAutolink: enterLiteralAutolink,
      literalAutolinkEmail: enterLiteralAutolinkValue,
      literalAutolinkHttp: enterLiteralAutolinkValue,
      literalAutolinkWww: enterLiteralAutolinkValue
    },
    exit: {
      literalAutolink: exitLiteralAutolink,
      literalAutolinkEmail: exitLiteralAutolinkEmail,
      literalAutolinkHttp: exitLiteralAutolinkHttp,
      literalAutolinkWww: exitLiteralAutolinkWww
    }
  };
}
function gfmAutolinkLiteralToMarkdown() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct,
        notInConstruct
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct,
        notInConstruct
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct,
        notInConstruct
      }
    ]
  };
}
function enterLiteralAutolink(token) {
  this.enter({ type: "link", title: null, url: "", children: [] }, token);
}
function enterLiteralAutolinkValue(token) {
  this.config.enter.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkHttp(token) {
  this.config.exit.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkWww(token) {
  this.config.exit.data.call(this, token);
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "link");
  node2.url = "http://" + this.sliceSerialize(token);
}
function exitLiteralAutolinkEmail(token) {
  this.config.exit.autolinkEmail.call(this, token);
}
function exitLiteralAutolink(token) {
  this.exit(token);
}
function transformGfmAutolinkLiterals(tree) {
  findAndReplace(
    tree,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
      [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function findUrl(_, protocol, domain2, path2, match) {
  let prefix = "";
  if (!previous2(match)) {
    return false;
  }
  if (/^w/i.test(protocol)) {
    domain2 = protocol + domain2;
    protocol = "";
    prefix = "http://";
  }
  if (!isCorrectDomain(domain2)) {
    return false;
  }
  const parts = splitUrl(domain2 + path2);
  if (!parts[0])
    return false;
  const result = {
    type: "link",
    title: null,
    url: prefix + protocol + parts[0],
    children: [{ type: "text", value: protocol + parts[0] }]
  };
  if (parts[1]) {
    return [result, { type: "text", value: parts[1] }];
  }
  return result;
}
function findEmail(_, atext, label, match) {
  if (
    // Not an expected previous character.
    !previous2(match, true) || // Label ends in not allowed character.
    /[-\d_]$/.test(label)
  ) {
    return false;
  }
  return {
    type: "link",
    title: null,
    url: "mailto:" + atext + "@" + label,
    children: [{ type: "text", value: atext + "@" + label }]
  };
}
function isCorrectDomain(domain2) {
  const parts = domain2.split(".");
  if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
    return false;
  }
  return true;
}
function splitUrl(url) {
  const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
  if (!trailExec) {
    return [url, void 0];
  }
  url = url.slice(0, trailExec.index);
  let trail2 = trailExec[0];
  let closingParenIndex = trail2.indexOf(")");
  const openingParens = ccount(url, "(");
  let closingParens = ccount(url, ")");
  while (closingParenIndex !== -1 && openingParens > closingParens) {
    url += trail2.slice(0, closingParenIndex + 1);
    trail2 = trail2.slice(closingParenIndex + 1);
    closingParenIndex = trail2.indexOf(")");
    closingParens++;
  }
  return [url, trail2];
}
function previous2(match, email) {
  const code4 = match.input.charCodeAt(match.index - 1);
  return (match.index === 0 || unicodeWhitespace(code4) || unicodePunctuation(code4)) && // If it’s an email, the previous character should not be a slash.
  (!email || code4 !== 47);
}

// node_modules/.pnpm/mdast-util-gfm-footnote@2.1.0/node_modules/mdast-util-gfm-footnote/lib/index.js
footnoteReference.peek = footnoteReferencePeek;
function enterFootnoteCallString() {
  this.buffer();
}
function enterFootnoteCall(token) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
}
function enterFootnoteDefinitionLabelString() {
  this.buffer();
}
function enterFootnoteDefinition(token) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    token
  );
}
function exitFootnoteCallString(token) {
  const label = this.resume();
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "footnoteReference");
  node2.identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase();
  node2.label = label;
}
function exitFootnoteCall(token) {
  this.exit(token);
}
function exitFootnoteDefinitionLabelString(token) {
  const label = this.resume();
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "footnoteDefinition");
  node2.identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase();
  node2.label = label;
}
function exitFootnoteDefinition(token) {
  this.exit(token);
}
function footnoteReferencePeek() {
  return "[";
}
function footnoteReference(node2, _, state, info) {
  const tracker = state.createTracker(info);
  let value = tracker.move("[^");
  const exit3 = state.enter("footnoteReference");
  const subexit = state.enter("reference");
  value += tracker.move(
    state.safe(state.associationId(node2), { after: "]", before: value })
  );
  subexit();
  exit3();
  value += tracker.move("]");
  return value;
}
function gfmFootnoteFromMarkdown() {
  return {
    enter: {
      gfmFootnoteCallString: enterFootnoteCallString,
      gfmFootnoteCall: enterFootnoteCall,
      gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
      gfmFootnoteDefinition: enterFootnoteDefinition
    },
    exit: {
      gfmFootnoteCallString: exitFootnoteCallString,
      gfmFootnoteCall: exitFootnoteCall,
      gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
      gfmFootnoteDefinition: exitFootnoteDefinition
    }
  };
}
function gfmFootnoteToMarkdown(options) {
  let firstLineBlank = false;
  if (options && options.firstLineBlank) {
    firstLineBlank = true;
  }
  return {
    handlers: { footnoteDefinition, footnoteReference },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function footnoteDefinition(node2, _, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move("[^");
    const exit3 = state.enter("footnoteDefinition");
    const subexit = state.enter("label");
    value += tracker.move(
      state.safe(state.associationId(node2), { before: value, after: "]" })
    );
    subexit();
    value += tracker.move("]:");
    if (node2.children && node2.children.length > 0) {
      tracker.shift(4);
      value += tracker.move(
        (firstLineBlank ? "\n" : " ") + state.indentLines(
          state.containerFlow(node2, tracker.current()),
          firstLineBlank ? mapAll : mapExceptFirst
        )
      );
    }
    exit3();
    return value;
  }
}
function mapExceptFirst(line, index2, blank) {
  return index2 === 0 ? line : mapAll(line, index2, blank);
}
function mapAll(line, index2, blank) {
  return (blank ? "" : "    ") + line;
}

// node_modules/.pnpm/mdast-util-gfm-strikethrough@2.0.0/node_modules/mdast-util-gfm-strikethrough/lib/index.js
var constructsWithoutStrikethrough = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
handleDelete.peek = peekDelete;
function gfmStrikethroughFromMarkdown() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: enterStrikethrough },
    exit: { strikethrough: exitStrikethrough }
  };
}
function gfmStrikethroughToMarkdown() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: constructsWithoutStrikethrough
      }
    ],
    handlers: { delete: handleDelete }
  };
}
function enterStrikethrough(token) {
  this.enter({ type: "delete", children: [] }, token);
}
function exitStrikethrough(token) {
  this.exit(token);
}
function handleDelete(node2, _, state, info) {
  const tracker = state.createTracker(info);
  const exit3 = state.enter("strikethrough");
  let value = tracker.move("~~");
  value += state.containerPhrasing(node2, {
    ...tracker.current(),
    before: value,
    after: "~"
  });
  value += tracker.move("~~");
  exit3();
  return value;
}
function peekDelete() {
  return "~";
}

// node_modules/.pnpm/markdown-table@3.0.4/node_modules/markdown-table/index.js
function defaultStringLength(value) {
  return value.length;
}
function markdownTable(table2, options) {
  const settings = options || {};
  const align = (settings.align || []).concat();
  const stringLength = settings.stringLength || defaultStringLength;
  const alignments = [];
  const cellMatrix = [];
  const sizeMatrix = [];
  const longestCellByColumn = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;
  while (++rowIndex < table2.length) {
    const row3 = [];
    const sizes2 = [];
    let columnIndex2 = -1;
    if (table2[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table2[rowIndex].length;
    }
    while (++columnIndex2 < table2[rowIndex].length) {
      const cell = serialize(table2[rowIndex][columnIndex2]);
      if (settings.alignDelimiters !== false) {
        const size = stringLength(cell);
        sizes2[columnIndex2] = size;
        if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
          longestCellByColumn[columnIndex2] = size;
        }
      }
      row3.push(cell);
    }
    cellMatrix[rowIndex] = row3;
    sizeMatrix[rowIndex] = sizes2;
  }
  let columnIndex = -1;
  if (typeof align === "object" && "length" in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code4 = toAlignment(align);
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code4;
    }
  }
  columnIndex = -1;
  const row2 = [];
  const sizes = [];
  while (++columnIndex < mostCellsPerRow) {
    const code4 = alignments[columnIndex];
    let before = "";
    let after = "";
    if (code4 === 99) {
      before = ":";
      after = ":";
    } else if (code4 === 108) {
      before = ":";
    } else if (code4 === 114) {
      after = ":";
    }
    let size = settings.alignDelimiters === false ? 1 : Math.max(
      1,
      longestCellByColumn[columnIndex] - before.length - after.length
    );
    const cell = before + "-".repeat(size) + after;
    if (settings.alignDelimiters !== false) {
      size = before.length + size + after.length;
      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }
      sizes[columnIndex] = size;
    }
    row2[columnIndex] = cell;
  }
  cellMatrix.splice(1, 0, row2);
  sizeMatrix.splice(1, 0, sizes);
  rowIndex = -1;
  const lines = [];
  while (++rowIndex < cellMatrix.length) {
    const row3 = cellMatrix[rowIndex];
    const sizes2 = sizeMatrix[rowIndex];
    columnIndex = -1;
    const line = [];
    while (++columnIndex < mostCellsPerRow) {
      const cell = row3[columnIndex] || "";
      let before = "";
      let after = "";
      if (settings.alignDelimiters !== false) {
        const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
        const code4 = alignments[columnIndex];
        if (code4 === 114) {
          before = " ".repeat(size);
        } else if (code4 === 99) {
          if (size % 2) {
            before = " ".repeat(size / 2 + 0.5);
            after = " ".repeat(size / 2 - 0.5);
          } else {
            before = " ".repeat(size / 2);
            after = before;
          }
        } else {
          after = " ".repeat(size);
        }
      }
      if (settings.delimiterStart !== false && !columnIndex) {
        line.push("|");
      }
      if (settings.padding !== false && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) {
        line.push(" ");
      }
      if (settings.alignDelimiters !== false) {
        line.push(before);
      }
      line.push(cell);
      if (settings.alignDelimiters !== false) {
        line.push(after);
      }
      if (settings.padding !== false) {
        line.push(" ");
      }
      if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
        line.push("|");
      }
    }
    lines.push(
      settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join("")
    );
  }
  return lines.join("\n");
}
function serialize(value) {
  return value === null || value === void 0 ? "" : String(value);
}
function toAlignment(value) {
  const code4 = typeof value === "string" ? value.codePointAt(0) : 0;
  return code4 === 67 || code4 === 99 ? 99 : code4 === 76 || code4 === 108 ? 108 : code4 === 82 || code4 === 114 ? 114 : 0;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function blockquote(node2, _, state, info) {
  const exit3 = state.enter("blockquote");
  const tracker = state.createTracker(info);
  tracker.move("> ");
  tracker.shift(2);
  const value = state.indentLines(
    state.containerFlow(node2, tracker.current()),
    map
  );
  exit3();
  return value;
}
function map(line, _, blank) {
  return ">" + (blank ? "" : " ") + line;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function patternInScope(stack, pattern) {
  return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
function listInScope(stack, list4, none) {
  if (typeof list4 === "string") {
    list4 = [list4];
  }
  if (!list4 || list4.length === 0) {
    return none;
  }
  let index2 = -1;
  while (++index2 < list4.length) {
    if (stack.includes(list4[index2])) {
      return true;
    }
  }
  return false;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/break.js
function hardBreak(_, _1, state, info) {
  let index2 = -1;
  while (++index2 < state.unsafe.length) {
    if (state.unsafe[index2].character === "\n" && patternInScope(state.stack, state.unsafe[index2])) {
      return /[ \t]/.test(info.before) ? "" : " ";
    }
  }
  return "\\\n";
}

// node_modules/.pnpm/longest-streak@3.1.0/node_modules/longest-streak/index.js
function longestStreak(value, substring) {
  const source = String(value);
  let index2 = source.indexOf(substring);
  let expected = index2;
  let count = 0;
  let max = 0;
  if (typeof substring !== "string") {
    throw new TypeError("Expected substring");
  }
  while (index2 !== -1) {
    if (index2 === expected) {
      if (++count > max) {
        max = count;
      }
    } else {
      count = 1;
    }
    expected = index2 + substring.length;
    index2 = source.indexOf(substring, expected);
  }
  return max;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function formatCodeAsIndented(node2, state) {
  return Boolean(
    state.options.fences === false && node2.value && // If there’s no info…
    !node2.lang && // And there’s a non-whitespace character…
    /[^ \r\n]/.test(node2.value) && // And the value doesn’t start or end in a blank…
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node2.value)
  );
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function checkFence(state) {
  const marker = state.options.fence || "`";
  if (marker !== "`" && marker !== "~") {
    throw new Error(
      "Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`"
    );
  }
  return marker;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/code.js
function code(node2, _, state, info) {
  const marker = checkFence(state);
  const raw = node2.value || "";
  const suffix = marker === "`" ? "GraveAccent" : "Tilde";
  if (formatCodeAsIndented(node2, state)) {
    const exit4 = state.enter("codeIndented");
    const value2 = state.indentLines(raw, map2);
    exit4();
    return value2;
  }
  const tracker = state.createTracker(info);
  const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
  const exit3 = state.enter("codeFenced");
  let value = tracker.move(sequence);
  if (node2.lang) {
    const subexit = state.enter(`codeFencedLang${suffix}`);
    value += tracker.move(
      state.safe(node2.lang, {
        before: value,
        after: " ",
        encode: ["`"],
        ...tracker.current()
      })
    );
    subexit();
  }
  if (node2.lang && node2.meta) {
    const subexit = state.enter(`codeFencedMeta${suffix}`);
    value += tracker.move(" ");
    value += tracker.move(
      state.safe(node2.meta, {
        before: value,
        after: "\n",
        encode: ["`"],
        ...tracker.current()
      })
    );
    subexit();
  }
  value += tracker.move("\n");
  if (raw) {
    value += tracker.move(raw + "\n");
  }
  value += tracker.move(sequence);
  exit3();
  return value;
}
function map2(line, _, blank) {
  return (blank ? "" : "    ") + line;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function checkQuote(state) {
  const marker = state.options.quote || '"';
  if (marker !== '"' && marker !== "'") {
    throw new Error(
      "Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`"
    );
  }
  return marker;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/definition.js
function definition2(node2, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const exit3 = state.enter("definition");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value = tracker.move("[");
  value += tracker.move(
    state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    })
  );
  value += tracker.move("]: ");
  subexit();
  if (
    // If there’s no url, or…
    !node2.url || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node2.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value += tracker.move("<");
    value += tracker.move(
      state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
    );
    value += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value += tracker.move(
      state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : "\n",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node2.title) {
    subexit = state.enter(`title${suffix}`);
    value += tracker.move(" " + quote);
    value += tracker.move(
      state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    );
    value += tracker.move(quote);
    subexit();
  }
  exit3();
  return value;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
function checkEmphasis(state) {
  const marker = state.options.emphasis || "*";
  if (marker !== "*" && marker !== "_") {
    throw new Error(
      "Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`"
    );
  }
  return marker;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function encodeCharacterReference(code4) {
  return "&#x" + code4.toString(16).toUpperCase() + ";";
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function encodeInfo(outside, inside, marker) {
  const outsideKind = classifyCharacter(outside);
  const insideKind = classifyCharacter(inside);
  if (outsideKind === void 0) {
    return insideKind === void 0 ? (
      // Letter inside:
      // we have to encode *both* letters for `_` as it is looser.
      // it already forms for `*` (and GFMs `~`).
      marker === "_" ? { inside: true, outside: true } : { inside: false, outside: false }
    ) : insideKind === 1 ? (
      // Whitespace inside: encode both (letter, whitespace).
      { inside: true, outside: true }
    ) : (
      // Punctuation inside: encode outer (letter)
      { inside: false, outside: true }
    );
  }
  if (outsideKind === 1) {
    return insideKind === void 0 ? (
      // Letter inside: already forms.
      { inside: false, outside: false }
    ) : insideKind === 1 ? (
      // Whitespace inside: encode both (whitespace).
      { inside: true, outside: true }
    ) : (
      // Punctuation inside: already forms.
      { inside: false, outside: false }
    );
  }
  return insideKind === void 0 ? (
    // Letter inside: already forms.
    { inside: false, outside: false }
  ) : insideKind === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: true, outside: false }
  ) : (
    // Punctuation inside: already forms.
    { inside: false, outside: false }
  );
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
emphasis.peek = emphasisPeek;
function emphasis(node2, _, state, info) {
  const marker = checkEmphasis(state);
  const exit3 = state.enter("emphasis");
  const tracker = state.createTracker(info);
  const before = tracker.move(marker);
  let between = tracker.move(
    state.containerPhrasing(node2, {
      after: marker,
      before,
      ...tracker.current()
    })
  );
  const betweenHead = between.charCodeAt(0);
  const open2 = encodeInfo(
    info.before.charCodeAt(info.before.length - 1),
    betweenHead,
    marker
  );
  if (open2.inside) {
    between = encodeCharacterReference(betweenHead) + between.slice(1);
  }
  const betweenTail = between.charCodeAt(between.length - 1);
  const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
  if (close.inside) {
    between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
  }
  const after = tracker.move(marker);
  exit3();
  state.attentionEncodeSurroundingInfo = {
    after: close.outside,
    before: open2.outside
  };
  return before + between + after;
}
function emphasisPeek(_, _1, state) {
  return state.options.emphasis || "*";
}

// node_modules/.pnpm/unist-util-visit@5.1.0/node_modules/unist-util-visit/lib/index.js
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  let reverse;
  let test;
  let visitor;
  if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
    test = void 0;
    visitor = testOrVisitor;
    reverse = visitorOrReverse;
  } else {
    test = testOrVisitor;
    visitor = visitorOrReverse;
    reverse = maybeReverse;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node2, parents) {
    const parent = parents[parents.length - 1];
    const index2 = parent ? parent.children.indexOf(node2) : void 0;
    return visitor(node2, index2, parent);
  }
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function formatHeadingAsSetext(node2, state) {
  let literalWithBreak = false;
  visit(node2, function(node3) {
    if ("value" in node3 && /\r?\n|\r/.test(node3.value) || node3.type === "break") {
      literalWithBreak = true;
      return EXIT;
    }
  });
  return Boolean(
    (!node2.depth || node2.depth < 3) && toString(node2) && (state.options.setext || literalWithBreak)
  );
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/heading.js
function heading(node2, _, state, info) {
  const rank = Math.max(Math.min(6, node2.depth || 1), 1);
  const tracker = state.createTracker(info);
  if (formatHeadingAsSetext(node2, state)) {
    const exit4 = state.enter("headingSetext");
    const subexit2 = state.enter("phrasing");
    const value2 = state.containerPhrasing(node2, {
      ...tracker.current(),
      before: "\n",
      after: "\n"
    });
    subexit2();
    exit4();
    return value2 + "\n" + (rank === 1 ? "=" : "-").repeat(
      // The whole size…
      value2.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(value2.lastIndexOf("\r"), value2.lastIndexOf("\n")) + 1)
    );
  }
  const sequence = "#".repeat(rank);
  const exit3 = state.enter("headingAtx");
  const subexit = state.enter("phrasing");
  tracker.move(sequence + " ");
  let value = state.containerPhrasing(node2, {
    before: "# ",
    after: "\n",
    ...tracker.current()
  });
  if (/^[\t ]/.test(value)) {
    value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
  }
  value = value ? sequence + " " + value : sequence;
  if (state.options.closeAtx) {
    value += " " + sequence;
  }
  subexit();
  exit3();
  return value;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/html.js
html.peek = htmlPeek;
function html(node2) {
  return node2.value || "";
}
function htmlPeek() {
  return "<";
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/image.js
image.peek = imagePeek;
function image(node2, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const exit3 = state.enter("image");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value = tracker.move("![");
  value += tracker.move(
    state.safe(node2.alt, { before: value, after: "]", ...tracker.current() })
  );
  value += tracker.move("](");
  subexit();
  if (
    // If there’s no url but there is a title…
    !node2.url && node2.title || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node2.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value += tracker.move("<");
    value += tracker.move(
      state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
    );
    value += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value += tracker.move(
      state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : ")",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node2.title) {
    subexit = state.enter(`title${suffix}`);
    value += tracker.move(" " + quote);
    value += tracker.move(
      state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    );
    value += tracker.move(quote);
    subexit();
  }
  value += tracker.move(")");
  exit3();
  return value;
}
function imagePeek() {
  return "!";
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
imageReference.peek = imageReferencePeek;
function imageReference(node2, _, state, info) {
  const type = node2.referenceType;
  const exit3 = state.enter("imageReference");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value = tracker.move("![");
  const alt = state.safe(node2.alt, {
    before: value,
    after: "]",
    ...tracker.current()
  });
  value += tracker.move(alt + "][");
  subexit();
  const stack = state.stack;
  state.stack = [];
  subexit = state.enter("reference");
  const reference = state.safe(state.associationId(node2), {
    before: value,
    after: "]",
    ...tracker.current()
  });
  subexit();
  state.stack = stack;
  exit3();
  if (type === "full" || !alt || alt !== reference) {
    value += tracker.move(reference + "]");
  } else if (type === "shortcut") {
    value = value.slice(0, -1);
  } else {
    value += tracker.move("]");
  }
  return value;
}
function imageReferencePeek() {
  return "!";
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
inlineCode.peek = inlineCodePeek;
function inlineCode(node2, _, state) {
  let value = node2.value || "";
  let sequence = "`";
  let index2 = -1;
  while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) {
    sequence += "`";
  }
  if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) {
    value = " " + value + " ";
  }
  while (++index2 < state.unsafe.length) {
    const pattern = state.unsafe[index2];
    const expression = state.compilePattern(pattern);
    let match;
    if (!pattern.atBreak)
      continue;
    while (match = expression.exec(value)) {
      let position2 = match.index;
      if (value.charCodeAt(position2) === 10 && value.charCodeAt(position2 - 1) === 13) {
        position2--;
      }
      value = value.slice(0, position2) + " " + value.slice(match.index + 1);
    }
  }
  return sequence + value + sequence;
}
function inlineCodePeek() {
  return "`";
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function formatLinkAsAutolink(node2, state) {
  const raw = toString(node2);
  return Boolean(
    !state.options.resourceLink && // If there’s a url…
    node2.url && // And there’s a no title…
    !node2.title && // And the content of `node` is a single text node…
    node2.children && node2.children.length === 1 && node2.children[0].type === "text" && // And if the url is the same as the content…
    (raw === node2.url || "mailto:" + raw === node2.url) && // And that starts w/ a protocol…
    /^[a-z][a-z+.-]+:/i.test(node2.url) && // And that doesn’t contain ASCII control codes (character escapes and
    // references don’t work), space, or angle brackets…
    !/[\0- <>\u007F]/.test(node2.url)
  );
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/link.js
link.peek = linkPeek;
function link(node2, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const tracker = state.createTracker(info);
  let exit3;
  let subexit;
  if (formatLinkAsAutolink(node2, state)) {
    const stack = state.stack;
    state.stack = [];
    exit3 = state.enter("autolink");
    let value2 = tracker.move("<");
    value2 += tracker.move(
      state.containerPhrasing(node2, {
        before: value2,
        after: ">",
        ...tracker.current()
      })
    );
    value2 += tracker.move(">");
    exit3();
    state.stack = stack;
    return value2;
  }
  exit3 = state.enter("link");
  subexit = state.enter("label");
  let value = tracker.move("[");
  value += tracker.move(
    state.containerPhrasing(node2, {
      before: value,
      after: "](",
      ...tracker.current()
    })
  );
  value += tracker.move("](");
  subexit();
  if (
    // If there’s no url but there is a title…
    !node2.url && node2.title || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node2.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value += tracker.move("<");
    value += tracker.move(
      state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
    );
    value += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value += tracker.move(
      state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : ")",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node2.title) {
    subexit = state.enter(`title${suffix}`);
    value += tracker.move(" " + quote);
    value += tracker.move(
      state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    );
    value += tracker.move(quote);
    subexit();
  }
  value += tracker.move(")");
  exit3();
  return value;
}
function linkPeek(node2, _, state) {
  return formatLinkAsAutolink(node2, state) ? "<" : "[";
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
linkReference.peek = linkReferencePeek;
function linkReference(node2, _, state, info) {
  const type = node2.referenceType;
  const exit3 = state.enter("linkReference");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value = tracker.move("[");
  const text6 = state.containerPhrasing(node2, {
    before: value,
    after: "]",
    ...tracker.current()
  });
  value += tracker.move(text6 + "][");
  subexit();
  const stack = state.stack;
  state.stack = [];
  subexit = state.enter("reference");
  const reference = state.safe(state.associationId(node2), {
    before: value,
    after: "]",
    ...tracker.current()
  });
  subexit();
  state.stack = stack;
  exit3();
  if (type === "full" || !text6 || text6 !== reference) {
    value += tracker.move(reference + "]");
  } else if (type === "shortcut") {
    value = value.slice(0, -1);
  } else {
    value += tracker.move("]");
  }
  return value;
}
function linkReferencePeek() {
  return "[";
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function checkBullet(state) {
  const marker = state.options.bullet || "*";
  if (marker !== "*" && marker !== "+" && marker !== "-") {
    throw new Error(
      "Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  }
  return marker;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function checkBulletOther(state) {
  const bullet = checkBullet(state);
  const bulletOther = state.options.bulletOther;
  if (!bulletOther) {
    return bullet === "*" ? "-" : "*";
  }
  if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") {
    throw new Error(
      "Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  }
  if (bulletOther === bullet) {
    throw new Error(
      "Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different"
    );
  }
  return bulletOther;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function checkBulletOrdered(state) {
  const marker = state.options.bulletOrdered || ".";
  if (marker !== "." && marker !== ")") {
    throw new Error(
      "Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  }
  return marker;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function checkRule(state) {
  const marker = state.options.rule || "*";
  if (marker !== "*" && marker !== "-" && marker !== "_") {
    throw new Error(
      "Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  }
  return marker;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/list.js
function list2(node2, parent, state, info) {
  const exit3 = state.enter("list");
  const bulletCurrent = state.bulletCurrent;
  let bullet = node2.ordered ? checkBulletOrdered(state) : checkBullet(state);
  const bulletOther = node2.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
  let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
  if (!node2.ordered) {
    const firstListItem = node2.children ? node2.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (bullet === "*" || bullet === "-") && // Empty first list item:
      firstListItem && (!firstListItem.children || !firstListItem.children[0]) && // Directly in two other list items:
      state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && // That are each the first child.
      state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0
    ) {
      useDifferentMarker = true;
    }
    if (checkRule(state) === bullet && firstListItem) {
      let index2 = -1;
      while (++index2 < node2.children.length) {
        const item = node2.children[index2];
        if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
          useDifferentMarker = true;
          break;
        }
      }
    }
  }
  if (useDifferentMarker) {
    bullet = bulletOther;
  }
  state.bulletCurrent = bullet;
  const value = state.containerFlow(node2, info);
  state.bulletLastUsed = bullet;
  state.bulletCurrent = bulletCurrent;
  exit3();
  return value;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function checkListItemIndent(state) {
  const style = state.options.listItemIndent || "one";
  if (style !== "tab" && style !== "one" && style !== "mixed") {
    throw new Error(
      "Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  }
  return style;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function listItem(node2, parent, state, info) {
  const listItemIndent = checkListItemIndent(state);
  let bullet = state.bulletCurrent || checkBullet(state);
  if (parent && parent.type === "list" && parent.ordered) {
    bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node2)) + bullet;
  }
  let size = bullet.length + 1;
  if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node2.spread)) {
    size = Math.ceil(size / 4) * 4;
  }
  const tracker = state.createTracker(info);
  tracker.move(bullet + " ".repeat(size - bullet.length));
  tracker.shift(size);
  const exit3 = state.enter("listItem");
  const value = state.indentLines(
    state.containerFlow(node2, tracker.current()),
    map3
  );
  exit3();
  return value;
  function map3(line, index2, blank) {
    if (index2) {
      return (blank ? "" : " ".repeat(size)) + line;
    }
    return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
  }
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
function paragraph(node2, _, state, info) {
  const exit3 = state.enter("paragraph");
  const subexit = state.enter("phrasing");
  const value = state.containerPhrasing(node2, info);
  subexit();
  exit3();
  return value;
}

// node_modules/.pnpm/mdast-util-phrasing@4.1.0/node_modules/mdast-util-phrasing/lib/index.js
var phrasing = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  convert([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/root.js
function root(node2, _, state, info) {
  const hasPhrasing = node2.children.some(function(d) {
    return phrasing(d);
  });
  const container2 = hasPhrasing ? state.containerPhrasing : state.containerFlow;
  return container2.call(state, node2, info);
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function checkStrong(state) {
  const marker = state.options.strong || "*";
  if (marker !== "*" && marker !== "_") {
    throw new Error(
      "Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`"
    );
  }
  return marker;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/strong.js
strong.peek = strongPeek;
function strong(node2, _, state, info) {
  const marker = checkStrong(state);
  const exit3 = state.enter("strong");
  const tracker = state.createTracker(info);
  const before = tracker.move(marker + marker);
  let between = tracker.move(
    state.containerPhrasing(node2, {
      after: marker,
      before,
      ...tracker.current()
    })
  );
  const betweenHead = between.charCodeAt(0);
  const open2 = encodeInfo(
    info.before.charCodeAt(info.before.length - 1),
    betweenHead,
    marker
  );
  if (open2.inside) {
    between = encodeCharacterReference(betweenHead) + between.slice(1);
  }
  const betweenTail = between.charCodeAt(between.length - 1);
  const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
  if (close.inside) {
    between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
  }
  const after = tracker.move(marker + marker);
  exit3();
  state.attentionEncodeSurroundingInfo = {
    after: close.outside,
    before: open2.outside
  };
  return before + between + after;
}
function strongPeek(_, _1, state) {
  return state.options.strong || "*";
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/text.js
function text3(node2, _, state, info) {
  return state.safe(node2.value, info);
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function checkRuleRepetition(state) {
  const repetition = state.options.ruleRepetition || 3;
  if (repetition < 3) {
    throw new Error(
      "Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more"
    );
  }
  return repetition;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function thematicBreak2(_, _1, state) {
  const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
  return state.options.ruleSpaces ? value.slice(0, -1) : value;
}

// node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/index.js
var handle = {
  blockquote,
  break: hardBreak,
  code,
  definition: definition2,
  emphasis,
  hardBreak,
  heading,
  html,
  image,
  imageReference,
  inlineCode,
  link,
  linkReference,
  list: list2,
  listItem,
  paragraph,
  root,
  strong,
  text: text3,
  thematicBreak: thematicBreak2
};

// node_modules/.pnpm/mdast-util-gfm-table@2.0.0/node_modules/mdast-util-gfm-table/lib/index.js
function gfmTableFromMarkdown() {
  return {
    enter: {
      table: enterTable,
      tableData: enterCell,
      tableHeader: enterCell,
      tableRow: enterRow
    },
    exit: {
      codeText: exitCodeText,
      table: exitTable,
      tableData: exit2,
      tableHeader: exit2,
      tableRow: exit2
    }
  };
}
function enterTable(token) {
  const align = token._align;
  ok(align, "expected `_align` on table");
  this.enter(
    {
      type: "table",
      align: align.map(function(d) {
        return d === "none" ? null : d;
      }),
      children: []
    },
    token
  );
  this.data.inTable = true;
}
function exitTable(token) {
  this.exit(token);
  this.data.inTable = void 0;
}
function enterRow(token) {
  this.enter({ type: "tableRow", children: [] }, token);
}
function exit2(token) {
  this.exit(token);
}
function enterCell(token) {
  this.enter({ type: "tableCell", children: [] }, token);
}
function exitCodeText(token) {
  let value = this.resume();
  if (this.data.inTable) {
    value = value.replace(/\\([\\|])/g, replace);
  }
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "inlineCode");
  node2.value = value;
  this.exit(token);
}
function replace($0, $1) {
  return $1 === "|" ? $1 : $0;
}
function gfmTableToMarkdown(options) {
  const settings = options || {};
  const padding = settings.tableCellPadding;
  const alignDelimiters = settings.tablePipeAlign;
  const stringLength = settings.stringLength;
  const around = padding ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: "\n", inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: true, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: true, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: true, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: inlineCodeWithTable,
      table: handleTable,
      tableCell: handleTableCell,
      tableRow: handleTableRow
    }
  };
  function handleTable(node2, _, state, info) {
    return serializeData(handleTableAsData(node2, state, info), node2.align);
  }
  function handleTableRow(node2, _, state, info) {
    const row2 = handleTableRowAsData(node2, state, info);
    const value = serializeData([row2]);
    return value.slice(0, value.indexOf("\n"));
  }
  function handleTableCell(node2, _, state, info) {
    const exit3 = state.enter("tableCell");
    const subexit = state.enter("phrasing");
    const value = state.containerPhrasing(node2, {
      ...info,
      before: around,
      after: around
    });
    subexit();
    exit3();
    return value;
  }
  function serializeData(matrix, align) {
    return markdownTable(matrix, {
      align,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength
    });
  }
  function handleTableAsData(node2, state, info) {
    const children = node2.children;
    let index2 = -1;
    const result = [];
    const subexit = state.enter("table");
    while (++index2 < children.length) {
      result[index2] = handleTableRowAsData(children[index2], state, info);
    }
    subexit();
    return result;
  }
  function handleTableRowAsData(node2, state, info) {
    const children = node2.children;
    let index2 = -1;
    const result = [];
    const subexit = state.enter("tableRow");
    while (++index2 < children.length) {
      result[index2] = handleTableCell(children[index2], node2, state, info);
    }
    subexit();
    return result;
  }
  function inlineCodeWithTable(node2, parent, state) {
    let value = handle.inlineCode(node2, parent, state);
    if (state.stack.includes("tableCell")) {
      value = value.replace(/\|/g, "\\$&");
    }
    return value;
  }
}

// node_modules/.pnpm/mdast-util-gfm-task-list-item@2.0.0/node_modules/mdast-util-gfm-task-list-item/lib/index.js
function gfmTaskListItemFromMarkdown() {
  return {
    exit: {
      taskListCheckValueChecked: exitCheck,
      taskListCheckValueUnchecked: exitCheck,
      paragraph: exitParagraphWithTaskListItem
    }
  };
}
function gfmTaskListItemToMarkdown() {
  return {
    unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }],
    handlers: { listItem: listItemWithTaskListItem }
  };
}
function exitCheck(token) {
  const node2 = this.stack[this.stack.length - 2];
  ok(node2.type === "listItem");
  node2.checked = token.type === "taskListCheckValueChecked";
}
function exitParagraphWithTaskListItem(token) {
  const parent = this.stack[this.stack.length - 2];
  if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "paragraph");
    const head = node2.children[0];
    if (head && head.type === "text") {
      const siblings = parent.children;
      let index2 = -1;
      let firstParaghraph;
      while (++index2 < siblings.length) {
        const sibling = siblings[index2];
        if (sibling.type === "paragraph") {
          firstParaghraph = sibling;
          break;
        }
      }
      if (firstParaghraph === node2) {
        head.value = head.value.slice(1);
        if (head.value.length === 0) {
          node2.children.shift();
        } else if (node2.position && head.position && typeof head.position.start.offset === "number") {
          head.position.start.column++;
          head.position.start.offset++;
          node2.position.start = Object.assign({}, head.position.start);
        }
      }
    }
  }
  this.exit(token);
}
function listItemWithTaskListItem(node2, parent, state, info) {
  const head = node2.children[0];
  const checkable = typeof node2.checked === "boolean" && head && head.type === "paragraph";
  const checkbox2 = "[" + (node2.checked ? "x" : " ") + "] ";
  const tracker = state.createTracker(info);
  if (checkable) {
    tracker.move(checkbox2);
  }
  let value = handle.listItem(node2, parent, state, {
    ...info,
    ...tracker.current()
  });
  if (checkable) {
    value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
  }
  return value;
  function check($0) {
    return $0 + checkbox2;
  }
}

// node_modules/.pnpm/mdast-util-gfm@3.1.0/node_modules/mdast-util-gfm/lib/index.js
function gfmFromMarkdown() {
  return [
    gfmAutolinkLiteralFromMarkdown(),
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown(),
    gfmTableFromMarkdown(),
    gfmTaskListItemFromMarkdown()
  ];
}
function gfmToMarkdown(options) {
  return {
    extensions: [
      gfmAutolinkLiteralToMarkdown(),
      gfmFootnoteToMarkdown(options),
      gfmStrikethroughToMarkdown(),
      gfmTableToMarkdown(options),
      gfmTaskListItemToMarkdown()
    ]
  };
}

// node_modules/.pnpm/micromark-extension-gfm-autolink-literal@2.1.0/node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var wwwPrefix = {
  tokenize: tokenizeWwwPrefix,
  partial: true
};
var domain = {
  tokenize: tokenizeDomain,
  partial: true
};
var path = {
  tokenize: tokenizePath,
  partial: true
};
var trail = {
  tokenize: tokenizeTrail,
  partial: true
};
var emailDomainDotTrail = {
  tokenize: tokenizeEmailDomainDotTrail,
  partial: true
};
var wwwAutolink = {
  name: "wwwAutolink",
  tokenize: tokenizeWwwAutolink,
  previous: previousWww
};
var protocolAutolink = {
  name: "protocolAutolink",
  tokenize: tokenizeProtocolAutolink,
  previous: previousProtocol
};
var emailAutolink = {
  name: "emailAutolink",
  tokenize: tokenizeEmailAutolink,
  previous: previousEmail
};
var text4 = {};
function gfmAutolinkLiteral() {
  return {
    text: text4
  };
}
var code2 = 48;
while (code2 < 123) {
  text4[code2] = emailAutolink;
  code2++;
  if (code2 === 58)
    code2 = 65;
  else if (code2 === 91)
    code2 = 97;
}
text4[43] = emailAutolink;
text4[45] = emailAutolink;
text4[46] = emailAutolink;
text4[95] = emailAutolink;
text4[72] = [emailAutolink, protocolAutolink];
text4[104] = [emailAutolink, protocolAutolink];
text4[87] = [emailAutolink, wwwAutolink];
text4[119] = [emailAutolink, wwwAutolink];
function tokenizeEmailAutolink(effects, ok3, nok) {
  const self = this;
  let dot;
  let data;
  return start;
  function start(code4) {
    if (!gfmAtext(code4) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) {
      return nok(code4);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkEmail");
    return atext(code4);
  }
  function atext(code4) {
    if (gfmAtext(code4)) {
      effects.consume(code4);
      return atext;
    }
    if (code4 === 64) {
      effects.consume(code4);
      return emailDomain;
    }
    return nok(code4);
  }
  function emailDomain(code4) {
    if (code4 === 46) {
      return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code4);
    }
    if (code4 === 45 || code4 === 95 || asciiAlphanumeric(code4)) {
      data = true;
      effects.consume(code4);
      return emailDomain;
    }
    return emailDomainAfter(code4);
  }
  function emailDomainDot(code4) {
    effects.consume(code4);
    dot = true;
    return emailDomain;
  }
  function emailDomainAfter(code4) {
    if (data && dot && asciiAlpha(self.previous)) {
      effects.exit("literalAutolinkEmail");
      effects.exit("literalAutolink");
      return ok3(code4);
    }
    return nok(code4);
  }
}
function tokenizeWwwAutolink(effects, ok3, nok) {
  const self = this;
  return wwwStart;
  function wwwStart(code4) {
    if (code4 !== 87 && code4 !== 119 || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) {
      return nok(code4);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkWww");
    return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code4);
  }
  function wwwAfter(code4) {
    effects.exit("literalAutolinkWww");
    effects.exit("literalAutolink");
    return ok3(code4);
  }
}
function tokenizeProtocolAutolink(effects, ok3, nok) {
  const self = this;
  let buffer = "";
  let seen = false;
  return protocolStart;
  function protocolStart(code4) {
    if ((code4 === 72 || code4 === 104) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkHttp");
      buffer += String.fromCodePoint(code4);
      effects.consume(code4);
      return protocolPrefixInside;
    }
    return nok(code4);
  }
  function protocolPrefixInside(code4) {
    if (asciiAlpha(code4) && buffer.length < 5) {
      buffer += String.fromCodePoint(code4);
      effects.consume(code4);
      return protocolPrefixInside;
    }
    if (code4 === 58) {
      const protocol = buffer.toLowerCase();
      if (protocol === "http" || protocol === "https") {
        effects.consume(code4);
        return protocolSlashesInside;
      }
    }
    return nok(code4);
  }
  function protocolSlashesInside(code4) {
    if (code4 === 47) {
      effects.consume(code4);
      if (seen) {
        return afterProtocol;
      }
      seen = true;
      return protocolSlashesInside;
    }
    return nok(code4);
  }
  function afterProtocol(code4) {
    return code4 === null || asciiControl(code4) || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4) || unicodePunctuation(code4) ? nok(code4) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code4);
  }
  function protocolAfter(code4) {
    effects.exit("literalAutolinkHttp");
    effects.exit("literalAutolink");
    return ok3(code4);
  }
}
function tokenizeWwwPrefix(effects, ok3, nok) {
  let size = 0;
  return wwwPrefixInside;
  function wwwPrefixInside(code4) {
    if ((code4 === 87 || code4 === 119) && size < 3) {
      size++;
      effects.consume(code4);
      return wwwPrefixInside;
    }
    if (code4 === 46 && size === 3) {
      effects.consume(code4);
      return wwwPrefixAfter;
    }
    return nok(code4);
  }
  function wwwPrefixAfter(code4) {
    return code4 === null ? nok(code4) : ok3(code4);
  }
}
function tokenizeDomain(effects, ok3, nok) {
  let underscoreInLastSegment;
  let underscoreInLastLastSegment;
  let seen;
  return domainInside;
  function domainInside(code4) {
    if (code4 === 46 || code4 === 95) {
      return effects.check(trail, domainAfter, domainAtPunctuation)(code4);
    }
    if (code4 === null || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4) || code4 !== 45 && unicodePunctuation(code4)) {
      return domainAfter(code4);
    }
    seen = true;
    effects.consume(code4);
    return domainInside;
  }
  function domainAtPunctuation(code4) {
    if (code4 === 95) {
      underscoreInLastSegment = true;
    } else {
      underscoreInLastLastSegment = underscoreInLastSegment;
      underscoreInLastSegment = void 0;
    }
    effects.consume(code4);
    return domainInside;
  }
  function domainAfter(code4) {
    if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
      return nok(code4);
    }
    return ok3(code4);
  }
}
function tokenizePath(effects, ok3) {
  let sizeOpen = 0;
  let sizeClose = 0;
  return pathInside;
  function pathInside(code4) {
    if (code4 === 40) {
      sizeOpen++;
      effects.consume(code4);
      return pathInside;
    }
    if (code4 === 41 && sizeClose < sizeOpen) {
      return pathAtPunctuation(code4);
    }
    if (code4 === 33 || code4 === 34 || code4 === 38 || code4 === 39 || code4 === 41 || code4 === 42 || code4 === 44 || code4 === 46 || code4 === 58 || code4 === 59 || code4 === 60 || code4 === 63 || code4 === 93 || code4 === 95 || code4 === 126) {
      return effects.check(trail, ok3, pathAtPunctuation)(code4);
    }
    if (code4 === null || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4)) {
      return ok3(code4);
    }
    effects.consume(code4);
    return pathInside;
  }
  function pathAtPunctuation(code4) {
    if (code4 === 41) {
      sizeClose++;
    }
    effects.consume(code4);
    return pathInside;
  }
}
function tokenizeTrail(effects, ok3, nok) {
  return trail2;
  function trail2(code4) {
    if (code4 === 33 || code4 === 34 || code4 === 39 || code4 === 41 || code4 === 42 || code4 === 44 || code4 === 46 || code4 === 58 || code4 === 59 || code4 === 63 || code4 === 95 || code4 === 126) {
      effects.consume(code4);
      return trail2;
    }
    if (code4 === 38) {
      effects.consume(code4);
      return trailCharacterReferenceStart;
    }
    if (code4 === 93) {
      effects.consume(code4);
      return trailBracketAfter;
    }
    if (
      // `<` is an end.
      code4 === 60 || // So is whitespace.
      code4 === null || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4)
    ) {
      return ok3(code4);
    }
    return nok(code4);
  }
  function trailBracketAfter(code4) {
    if (code4 === null || code4 === 40 || code4 === 91 || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4)) {
      return ok3(code4);
    }
    return trail2(code4);
  }
  function trailCharacterReferenceStart(code4) {
    return asciiAlpha(code4) ? trailCharacterReferenceInside(code4) : nok(code4);
  }
  function trailCharacterReferenceInside(code4) {
    if (code4 === 59) {
      effects.consume(code4);
      return trail2;
    }
    if (asciiAlpha(code4)) {
      effects.consume(code4);
      return trailCharacterReferenceInside;
    }
    return nok(code4);
  }
}
function tokenizeEmailDomainDotTrail(effects, ok3, nok) {
  return start;
  function start(code4) {
    effects.consume(code4);
    return after;
  }
  function after(code4) {
    return asciiAlphanumeric(code4) ? nok(code4) : ok3(code4);
  }
}
function previousWww(code4) {
  return code4 === null || code4 === 40 || code4 === 42 || code4 === 95 || code4 === 91 || code4 === 93 || code4 === 126 || markdownLineEndingOrSpace(code4);
}
function previousProtocol(code4) {
  return !asciiAlpha(code4);
}
function previousEmail(code4) {
  return !(code4 === 47 || gfmAtext(code4));
}
function gfmAtext(code4) {
  return code4 === 43 || code4 === 45 || code4 === 46 || code4 === 95 || asciiAlphanumeric(code4);
}
function previousUnbalanced(events) {
  let index2 = events.length;
  let result = false;
  while (index2--) {
    const token = events[index2][1];
    if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
      result = true;
      break;
    }
    if (token._gfmAutolinkLiteralWalkedInto) {
      result = false;
      break;
    }
  }
  if (events.length > 0 && !result) {
    events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
  }
  return result;
}

// node_modules/.pnpm/micromark-extension-gfm-footnote@2.1.0/node_modules/micromark-extension-gfm-footnote/lib/syntax.js
var indent = {
  tokenize: tokenizeIndent2,
  partial: true
};
function gfmFootnote() {
  return {
    document: {
      [91]: {
        name: "gfmFootnoteDefinition",
        tokenize: tokenizeDefinitionStart,
        continuation: {
          tokenize: tokenizeDefinitionContinuation
        },
        exit: gfmFootnoteDefinitionEnd
      }
    },
    text: {
      [91]: {
        name: "gfmFootnoteCall",
        tokenize: tokenizeGfmFootnoteCall
      },
      [93]: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: tokenizePotentialGfmFootnoteCall,
        resolveTo: resolveToPotentialGfmFootnoteCall
      }
    }
  };
}
function tokenizePotentialGfmFootnoteCall(effects, ok3, nok) {
  const self = this;
  let index2 = self.events.length;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let labelStart;
  while (index2--) {
    const token = self.events[index2][1];
    if (token.type === "labelImage") {
      labelStart = token;
      break;
    }
    if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
      break;
    }
  }
  return start;
  function start(code4) {
    if (!labelStart || !labelStart._balanced) {
      return nok(code4);
    }
    const id = normalizeIdentifier(self.sliceSerialize({
      start: labelStart.end,
      end: self.now()
    }));
    if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) {
      return nok(code4);
    }
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code4);
    effects.exit("gfmFootnoteCallLabelMarker");
    return ok3(code4);
  }
}
function resolveToPotentialGfmFootnoteCall(events, context) {
  let index2 = events.length;
  let labelStart;
  while (index2--) {
    if (events[index2][1].type === "labelImage" && events[index2][0] === "enter") {
      labelStart = events[index2][1];
      break;
    }
  }
  events[index2 + 1][1].type = "data";
  events[index2 + 3][1].type = "gfmFootnoteCallLabelMarker";
  const call = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, events[index2 + 3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const marker = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, events[index2 + 3][1].end),
    end: Object.assign({}, events[index2 + 3][1].end)
  };
  marker.end.column++;
  marker.end.offset++;
  marker.end._bufferIndex++;
  const string3 = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, marker.end),
    end: Object.assign({}, events[events.length - 1][1].start)
  };
  const chunk = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, string3.start),
    end: Object.assign({}, string3.end)
  };
  const replacement = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    events[index2 + 1],
    events[index2 + 2],
    ["enter", call, context],
    // The `[`
    events[index2 + 3],
    events[index2 + 4],
    // The `^`.
    ["enter", marker, context],
    ["exit", marker, context],
    // Everything in between.
    ["enter", string3, context],
    ["enter", chunk, context],
    ["exit", chunk, context],
    ["exit", string3, context],
    // The ending (`]`, properly parsed and labelled).
    events[events.length - 2],
    events[events.length - 1],
    ["exit", call, context]
  ];
  events.splice(index2, events.length - index2 + 1, ...replacement);
  return events;
}
function tokenizeGfmFootnoteCall(effects, ok3, nok) {
  const self = this;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let size = 0;
  let data;
  return start;
  function start(code4) {
    effects.enter("gfmFootnoteCall");
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code4);
    effects.exit("gfmFootnoteCallLabelMarker");
    return callStart;
  }
  function callStart(code4) {
    if (code4 !== 94)
      return nok(code4);
    effects.enter("gfmFootnoteCallMarker");
    effects.consume(code4);
    effects.exit("gfmFootnoteCallMarker");
    effects.enter("gfmFootnoteCallString");
    effects.enter("chunkString").contentType = "string";
    return callData;
  }
  function callData(code4) {
    if (
      // Too long.
      size > 999 || // Closing brace with nothing.
      code4 === 93 && !data || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      code4 === null || code4 === 91 || markdownLineEndingOrSpace(code4)
    ) {
      return nok(code4);
    }
    if (code4 === 93) {
      effects.exit("chunkString");
      const token = effects.exit("gfmFootnoteCallString");
      if (!defined.includes(normalizeIdentifier(self.sliceSerialize(token)))) {
        return nok(code4);
      }
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code4);
      effects.exit("gfmFootnoteCallLabelMarker");
      effects.exit("gfmFootnoteCall");
      return ok3;
    }
    if (!markdownLineEndingOrSpace(code4)) {
      data = true;
    }
    size++;
    effects.consume(code4);
    return code4 === 92 ? callEscape : callData;
  }
  function callEscape(code4) {
    if (code4 === 91 || code4 === 92 || code4 === 93) {
      effects.consume(code4);
      size++;
      return callData;
    }
    return callData(code4);
  }
}
function tokenizeDefinitionStart(effects, ok3, nok) {
  const self = this;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let identifier;
  let size = 0;
  let data;
  return start;
  function start(code4) {
    effects.enter("gfmFootnoteDefinition")._container = true;
    effects.enter("gfmFootnoteDefinitionLabel");
    effects.enter("gfmFootnoteDefinitionLabelMarker");
    effects.consume(code4);
    effects.exit("gfmFootnoteDefinitionLabelMarker");
    return labelAtMarker;
  }
  function labelAtMarker(code4) {
    if (code4 === 94) {
      effects.enter("gfmFootnoteDefinitionMarker");
      effects.consume(code4);
      effects.exit("gfmFootnoteDefinitionMarker");
      effects.enter("gfmFootnoteDefinitionLabelString");
      effects.enter("chunkString").contentType = "string";
      return labelInside;
    }
    return nok(code4);
  }
  function labelInside(code4) {
    if (
      // Too long.
      size > 999 || // Closing brace with nothing.
      code4 === 93 && !data || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      code4 === null || code4 === 91 || markdownLineEndingOrSpace(code4)
    ) {
      return nok(code4);
    }
    if (code4 === 93) {
      effects.exit("chunkString");
      const token = effects.exit("gfmFootnoteDefinitionLabelString");
      identifier = normalizeIdentifier(self.sliceSerialize(token));
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code4);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      effects.exit("gfmFootnoteDefinitionLabel");
      return labelAfter;
    }
    if (!markdownLineEndingOrSpace(code4)) {
      data = true;
    }
    size++;
    effects.consume(code4);
    return code4 === 92 ? labelEscape : labelInside;
  }
  function labelEscape(code4) {
    if (code4 === 91 || code4 === 92 || code4 === 93) {
      effects.consume(code4);
      size++;
      return labelInside;
    }
    return labelInside(code4);
  }
  function labelAfter(code4) {
    if (code4 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code4);
      effects.exit("definitionMarker");
      if (!defined.includes(identifier)) {
        defined.push(identifier);
      }
      return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
    }
    return nok(code4);
  }
  function whitespaceAfter(code4) {
    return ok3(code4);
  }
}
function tokenizeDefinitionContinuation(effects, ok3, nok) {
  return effects.check(blankLine, ok3, effects.attempt(indent, ok3, nok));
}
function gfmFootnoteDefinitionEnd(effects) {
  effects.exit("gfmFootnoteDefinition");
}
function tokenizeIndent2(effects, ok3, nok) {
  const self = this;
  return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 4 + 1);
  function afterPrefix(code4) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok3(code4) : nok(code4);
  }
}

// node_modules/.pnpm/micromark-extension-gfm-strikethrough@2.1.0/node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function gfmStrikethrough(options) {
  const options_ = options || {};
  let single = options_.singleTilde;
  const tokenizer = {
    name: "strikethrough",
    tokenize: tokenizeStrikethrough,
    resolveAll: resolveAllStrikethrough
  };
  if (single === null || single === void 0) {
    single = true;
  }
  return {
    text: {
      [126]: tokenizer
    },
    insideSpan: {
      null: [tokenizer]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function resolveAllStrikethrough(events, context) {
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][0] === "enter" && events[index2][1].type === "strikethroughSequenceTemporary" && events[index2][1]._close) {
        let open2 = index2;
        while (open2--) {
          if (events[open2][0] === "exit" && events[open2][1].type === "strikethroughSequenceTemporary" && events[open2][1]._open && // If the sizes are the same:
          events[index2][1].end.offset - events[index2][1].start.offset === events[open2][1].end.offset - events[open2][1].start.offset) {
            events[index2][1].type = "strikethroughSequence";
            events[open2][1].type = "strikethroughSequence";
            const strikethrough = {
              type: "strikethrough",
              start: Object.assign({}, events[open2][1].start),
              end: Object.assign({}, events[index2][1].end)
            };
            const text6 = {
              type: "strikethroughText",
              start: Object.assign({}, events[open2][1].end),
              end: Object.assign({}, events[index2][1].start)
            };
            const nextEvents = [["enter", strikethrough, context], ["enter", events[open2][1], context], ["exit", events[open2][1], context], ["enter", text6, context]];
            const insideSpan2 = context.parser.constructs.insideSpan.null;
            if (insideSpan2) {
              splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan2, events.slice(open2 + 1, index2), context));
            }
            splice(nextEvents, nextEvents.length, 0, [["exit", text6, context], ["enter", events[index2][1], context], ["exit", events[index2][1], context], ["exit", strikethrough, context]]);
            splice(events, open2 - 1, index2 - open2 + 3, nextEvents);
            index2 = open2 + nextEvents.length - 2;
            break;
          }
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "strikethroughSequenceTemporary") {
        events[index2][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeStrikethrough(effects, ok3, nok) {
    const previous3 = this.previous;
    const events = this.events;
    let size = 0;
    return start;
    function start(code4) {
      if (previous3 === 126 && events[events.length - 1][1].type !== "characterEscape") {
        return nok(code4);
      }
      effects.enter("strikethroughSequenceTemporary");
      return more(code4);
    }
    function more(code4) {
      const before = classifyCharacter(previous3);
      if (code4 === 126) {
        if (size > 1)
          return nok(code4);
        effects.consume(code4);
        size++;
        return more;
      }
      if (size < 2 && !single)
        return nok(code4);
      const token = effects.exit("strikethroughSequenceTemporary");
      const after = classifyCharacter(code4);
      token._open = !after || after === 2 && Boolean(before);
      token._close = !before || before === 2 && Boolean(after);
      return ok3(code4);
    }
  }
}

// node_modules/.pnpm/micromark-extension-gfm-table@2.1.1/node_modules/micromark-extension-gfm-table/lib/edit-map.js
var EditMap = class {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(index2, remove, add) {
    addImplementation(this, index2, remove, add);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(events) {
    this.map.sort(function(a, b) {
      return a[0] - b[0];
    });
    if (this.map.length === 0) {
      return;
    }
    let index2 = this.map.length;
    const vecs = [];
    while (index2 > 0) {
      index2 -= 1;
      vecs.push(events.slice(this.map[index2][0] + this.map[index2][1]), this.map[index2][2]);
      events.length = this.map[index2][0];
    }
    vecs.push(events.slice());
    events.length = 0;
    let slice = vecs.pop();
    while (slice) {
      for (const element of slice) {
        events.push(element);
      }
      slice = vecs.pop();
    }
    this.map.length = 0;
  }
};
function addImplementation(editMap, at, remove, add) {
  let index2 = 0;
  if (remove === 0 && add.length === 0) {
    return;
  }
  while (index2 < editMap.map.length) {
    if (editMap.map[index2][0] === at) {
      editMap.map[index2][1] += remove;
      editMap.map[index2][2].push(...add);
      return;
    }
    index2 += 1;
  }
  editMap.map.push([at, remove, add]);
}

// node_modules/.pnpm/micromark-extension-gfm-table@2.1.1/node_modules/micromark-extension-gfm-table/lib/infer.js
function gfmTableAlign(events, index2) {
  let inDelimiterRow = false;
  const align = [];
  while (index2 < events.length) {
    const event = events[index2];
    if (inDelimiterRow) {
      if (event[0] === "enter") {
        if (event[1].type === "tableContent") {
          align.push(events[index2 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
        }
      } else if (event[1].type === "tableContent") {
        if (events[index2 - 1][1].type === "tableDelimiterMarker") {
          const alignIndex = align.length - 1;
          align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
        }
      } else if (event[1].type === "tableDelimiterRow") {
        break;
      }
    } else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") {
      inDelimiterRow = true;
    }
    index2 += 1;
  }
  return align;
}

// node_modules/.pnpm/micromark-extension-gfm-table@2.1.1/node_modules/micromark-extension-gfm-table/lib/syntax.js
function gfmTable() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: tokenizeTable,
        resolveAll: resolveTable
      }
    }
  };
}
function tokenizeTable(effects, ok3, nok) {
  const self = this;
  let size = 0;
  let sizeB = 0;
  let seen;
  return start;
  function start(code4) {
    let index2 = self.events.length - 1;
    while (index2 > -1) {
      const type = self.events[index2][1].type;
      if (type === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      type === "linePrefix")
        index2--;
      else
        break;
    }
    const tail = index2 > -1 ? self.events[index2][1].type : null;
    const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
    if (next === bodyRowStart && self.parser.lazy[self.now().line]) {
      return nok(code4);
    }
    return next(code4);
  }
  function headRowBefore(code4) {
    effects.enter("tableHead");
    effects.enter("tableRow");
    return headRowStart(code4);
  }
  function headRowStart(code4) {
    if (code4 === 124) {
      return headRowBreak(code4);
    }
    seen = true;
    sizeB += 1;
    return headRowBreak(code4);
  }
  function headRowBreak(code4) {
    if (code4 === null) {
      return nok(code4);
    }
    if (markdownLineEnding(code4)) {
      if (sizeB > 1) {
        sizeB = 0;
        self.interrupt = true;
        effects.exit("tableRow");
        effects.enter("lineEnding");
        effects.consume(code4);
        effects.exit("lineEnding");
        return headDelimiterStart;
      }
      return nok(code4);
    }
    if (markdownSpace(code4)) {
      return factorySpace(effects, headRowBreak, "whitespace")(code4);
    }
    sizeB += 1;
    if (seen) {
      seen = false;
      size += 1;
    }
    if (code4 === 124) {
      effects.enter("tableCellDivider");
      effects.consume(code4);
      effects.exit("tableCellDivider");
      seen = true;
      return headRowBreak;
    }
    effects.enter("data");
    return headRowData(code4);
  }
  function headRowData(code4) {
    if (code4 === null || code4 === 124 || markdownLineEndingOrSpace(code4)) {
      effects.exit("data");
      return headRowBreak(code4);
    }
    effects.consume(code4);
    return code4 === 92 ? headRowEscape : headRowData;
  }
  function headRowEscape(code4) {
    if (code4 === 92 || code4 === 124) {
      effects.consume(code4);
      return headRowData;
    }
    return headRowData(code4);
  }
  function headDelimiterStart(code4) {
    self.interrupt = false;
    if (self.parser.lazy[self.now().line]) {
      return nok(code4);
    }
    effects.enter("tableDelimiterRow");
    seen = false;
    if (markdownSpace(code4)) {
      return factorySpace(effects, headDelimiterBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4);
    }
    return headDelimiterBefore(code4);
  }
  function headDelimiterBefore(code4) {
    if (code4 === 45 || code4 === 58) {
      return headDelimiterValueBefore(code4);
    }
    if (code4 === 124) {
      seen = true;
      effects.enter("tableCellDivider");
      effects.consume(code4);
      effects.exit("tableCellDivider");
      return headDelimiterCellBefore;
    }
    return headDelimiterNok(code4);
  }
  function headDelimiterCellBefore(code4) {
    if (markdownSpace(code4)) {
      return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code4);
    }
    return headDelimiterValueBefore(code4);
  }
  function headDelimiterValueBefore(code4) {
    if (code4 === 58) {
      sizeB += 1;
      seen = true;
      effects.enter("tableDelimiterMarker");
      effects.consume(code4);
      effects.exit("tableDelimiterMarker");
      return headDelimiterLeftAlignmentAfter;
    }
    if (code4 === 45) {
      sizeB += 1;
      return headDelimiterLeftAlignmentAfter(code4);
    }
    if (code4 === null || markdownLineEnding(code4)) {
      return headDelimiterCellAfter(code4);
    }
    return headDelimiterNok(code4);
  }
  function headDelimiterLeftAlignmentAfter(code4) {
    if (code4 === 45) {
      effects.enter("tableDelimiterFiller");
      return headDelimiterFiller(code4);
    }
    return headDelimiterNok(code4);
  }
  function headDelimiterFiller(code4) {
    if (code4 === 45) {
      effects.consume(code4);
      return headDelimiterFiller;
    }
    if (code4 === 58) {
      seen = true;
      effects.exit("tableDelimiterFiller");
      effects.enter("tableDelimiterMarker");
      effects.consume(code4);
      effects.exit("tableDelimiterMarker");
      return headDelimiterRightAlignmentAfter;
    }
    effects.exit("tableDelimiterFiller");
    return headDelimiterRightAlignmentAfter(code4);
  }
  function headDelimiterRightAlignmentAfter(code4) {
    if (markdownSpace(code4)) {
      return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code4);
    }
    return headDelimiterCellAfter(code4);
  }
  function headDelimiterCellAfter(code4) {
    if (code4 === 124) {
      return headDelimiterBefore(code4);
    }
    if (code4 === null || markdownLineEnding(code4)) {
      if (!seen || size !== sizeB) {
        return headDelimiterNok(code4);
      }
      effects.exit("tableDelimiterRow");
      effects.exit("tableHead");
      return ok3(code4);
    }
    return headDelimiterNok(code4);
  }
  function headDelimiterNok(code4) {
    return nok(code4);
  }
  function bodyRowStart(code4) {
    effects.enter("tableRow");
    return bodyRowBreak(code4);
  }
  function bodyRowBreak(code4) {
    if (code4 === 124) {
      effects.enter("tableCellDivider");
      effects.consume(code4);
      effects.exit("tableCellDivider");
      return bodyRowBreak;
    }
    if (code4 === null || markdownLineEnding(code4)) {
      effects.exit("tableRow");
      return ok3(code4);
    }
    if (markdownSpace(code4)) {
      return factorySpace(effects, bodyRowBreak, "whitespace")(code4);
    }
    effects.enter("data");
    return bodyRowData(code4);
  }
  function bodyRowData(code4) {
    if (code4 === null || code4 === 124 || markdownLineEndingOrSpace(code4)) {
      effects.exit("data");
      return bodyRowBreak(code4);
    }
    effects.consume(code4);
    return code4 === 92 ? bodyRowEscape : bodyRowData;
  }
  function bodyRowEscape(code4) {
    if (code4 === 92 || code4 === 124) {
      effects.consume(code4);
      return bodyRowData;
    }
    return bodyRowData(code4);
  }
}
function resolveTable(events, context) {
  let index2 = -1;
  let inFirstCellAwaitingPipe = true;
  let rowKind = 0;
  let lastCell = [0, 0, 0, 0];
  let cell = [0, 0, 0, 0];
  let afterHeadAwaitingFirstBodyRow = false;
  let lastTableEnd = 0;
  let currentTable;
  let currentBody;
  let currentCell;
  const map3 = new EditMap();
  while (++index2 < events.length) {
    const event = events[index2];
    const token = event[1];
    if (event[0] === "enter") {
      if (token.type === "tableHead") {
        afterHeadAwaitingFirstBodyRow = false;
        if (lastTableEnd !== 0) {
          flushTableEnd(map3, context, lastTableEnd, currentTable, currentBody);
          currentBody = void 0;
          lastTableEnd = 0;
        }
        currentTable = {
          type: "table",
          start: Object.assign({}, token.start),
          // Note: correct end is set later.
          end: Object.assign({}, token.end)
        };
        map3.add(index2, 0, [["enter", currentTable, context]]);
      } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
        inFirstCellAwaitingPipe = true;
        currentCell = void 0;
        lastCell = [0, 0, 0, 0];
        cell = [0, index2 + 1, 0, 0];
        if (afterHeadAwaitingFirstBodyRow) {
          afterHeadAwaitingFirstBodyRow = false;
          currentBody = {
            type: "tableBody",
            start: Object.assign({}, token.start),
            // Note: correct end is set later.
            end: Object.assign({}, token.end)
          };
          map3.add(index2, 0, [["enter", currentBody, context]]);
        }
        rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
      } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
        inFirstCellAwaitingPipe = false;
        if (cell[2] === 0) {
          if (lastCell[1] !== 0) {
            cell[0] = cell[1];
            currentCell = flushCell(map3, context, lastCell, rowKind, void 0, currentCell);
            lastCell = [0, 0, 0, 0];
          }
          cell[2] = index2;
        }
      } else if (token.type === "tableCellDivider") {
        if (inFirstCellAwaitingPipe) {
          inFirstCellAwaitingPipe = false;
        } else {
          if (lastCell[1] !== 0) {
            cell[0] = cell[1];
            currentCell = flushCell(map3, context, lastCell, rowKind, void 0, currentCell);
          }
          lastCell = cell;
          cell = [lastCell[1], index2, 0, 0];
        }
      }
    } else if (token.type === "tableHead") {
      afterHeadAwaitingFirstBodyRow = true;
      lastTableEnd = index2;
    } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
      lastTableEnd = index2;
      if (lastCell[1] !== 0) {
        cell[0] = cell[1];
        currentCell = flushCell(map3, context, lastCell, rowKind, index2, currentCell);
      } else if (cell[1] !== 0) {
        currentCell = flushCell(map3, context, cell, rowKind, index2, currentCell);
      }
      rowKind = 0;
    } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
      cell[3] = index2;
    }
  }
  if (lastTableEnd !== 0) {
    flushTableEnd(map3, context, lastTableEnd, currentTable, currentBody);
  }
  map3.consume(context.events);
  index2 = -1;
  while (++index2 < context.events.length) {
    const event = context.events[index2];
    if (event[0] === "enter" && event[1].type === "table") {
      event[1]._align = gfmTableAlign(context.events, index2);
    }
  }
  return events;
}
function flushCell(map3, context, range, rowKind, rowEnd, previousCell) {
  const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
  const valueName = "tableContent";
  if (range[0] !== 0) {
    previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
    map3.add(range[0], 0, [["exit", previousCell, context]]);
  }
  const now = getPoint(context.events, range[1]);
  previousCell = {
    type: groupName,
    start: Object.assign({}, now),
    // Note: correct end is set later.
    end: Object.assign({}, now)
  };
  map3.add(range[1], 0, [["enter", previousCell, context]]);
  if (range[2] !== 0) {
    const relatedStart = getPoint(context.events, range[2]);
    const relatedEnd = getPoint(context.events, range[3]);
    const valueToken = {
      type: valueName,
      start: Object.assign({}, relatedStart),
      end: Object.assign({}, relatedEnd)
    };
    map3.add(range[2], 0, [["enter", valueToken, context]]);
    if (rowKind !== 2) {
      const start = context.events[range[2]];
      const end = context.events[range[3]];
      start[1].end = Object.assign({}, end[1].end);
      start[1].type = "chunkText";
      start[1].contentType = "text";
      if (range[3] > range[2] + 1) {
        const a = range[2] + 1;
        const b = range[3] - range[2] - 1;
        map3.add(a, b, []);
      }
    }
    map3.add(range[3] + 1, 0, [["exit", valueToken, context]]);
  }
  if (rowEnd !== void 0) {
    previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
    map3.add(rowEnd, 0, [["exit", previousCell, context]]);
    previousCell = void 0;
  }
  return previousCell;
}
function flushTableEnd(map3, context, index2, table2, tableBody) {
  const exits = [];
  const related = getPoint(context.events, index2);
  if (tableBody) {
    tableBody.end = Object.assign({}, related);
    exits.push(["exit", tableBody, context]);
  }
  table2.end = Object.assign({}, related);
  exits.push(["exit", table2, context]);
  map3.add(index2 + 1, 0, exits);
}
function getPoint(events, index2) {
  const event = events[index2];
  const side = event[0] === "enter" ? "start" : "end";
  return event[1][side];
}

// node_modules/.pnpm/micromark-extension-gfm-task-list-item@2.1.0/node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var tasklistCheck = {
  name: "tasklistCheck",
  tokenize: tokenizeTasklistCheck
};
function gfmTaskListItem() {
  return {
    text: {
      [91]: tasklistCheck
    }
  };
}
function tokenizeTasklistCheck(effects, ok3, nok) {
  const self = this;
  return open2;
  function open2(code4) {
    if (
      // Exit if there’s stuff before.
      self.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !self._gfmTasklistFirstContentOfListItem
    ) {
      return nok(code4);
    }
    effects.enter("taskListCheck");
    effects.enter("taskListCheckMarker");
    effects.consume(code4);
    effects.exit("taskListCheckMarker");
    return inside;
  }
  function inside(code4) {
    if (markdownLineEndingOrSpace(code4)) {
      effects.enter("taskListCheckValueUnchecked");
      effects.consume(code4);
      effects.exit("taskListCheckValueUnchecked");
      return close;
    }
    if (code4 === 88 || code4 === 120) {
      effects.enter("taskListCheckValueChecked");
      effects.consume(code4);
      effects.exit("taskListCheckValueChecked");
      return close;
    }
    return nok(code4);
  }
  function close(code4) {
    if (code4 === 93) {
      effects.enter("taskListCheckMarker");
      effects.consume(code4);
      effects.exit("taskListCheckMarker");
      effects.exit("taskListCheck");
      return after;
    }
    return nok(code4);
  }
  function after(code4) {
    if (markdownLineEnding(code4)) {
      return ok3(code4);
    }
    if (markdownSpace(code4)) {
      return effects.check({
        tokenize: spaceThenNonSpace
      }, ok3, nok)(code4);
    }
    return nok(code4);
  }
}
function spaceThenNonSpace(effects, ok3, nok) {
  return factorySpace(effects, after, "whitespace");
  function after(code4) {
    return code4 === null ? nok(code4) : ok3(code4);
  }
}

// node_modules/.pnpm/micromark-extension-gfm@3.0.0/node_modules/micromark-extension-gfm/index.js
function gfm(options) {
  return combineExtensions([
    gfmAutolinkLiteral(),
    gfmFootnote(),
    gfmStrikethrough(options),
    gfmTable(),
    gfmTaskListItem()
  ]);
}

// node_modules/.pnpm/remark-gfm@4.0.1/node_modules/remark-gfm/lib/index.js
var emptyOptions2 = {};
function remarkGfm(options) {
  const self = (
    /** @type {Processor<Root>} */
    this
  );
  const settings = options || emptyOptions2;
  const data = self.data();
  const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
  micromarkExtensions.push(gfm(settings));
  fromMarkdownExtensions.push(gfmFromMarkdown());
  toMarkdownExtensions.push(gfmToMarkdown(settings));
}

// packages/core/src/nodes/button/html.ts
function renderButtonHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses(prefix, "button", props);
  const isDisabled = props.state === "disabled" || props.disabled;
  const isLoading = props.state === "loading" || props.loading;
  const disabled = isDisabled ? " disabled" : "";
  const loading = isLoading ? ` ${prefix}loading` : "";
  const contentHTML = node2.children ? node2.children.map((child) => renderNode(child, context)).join("") : escapeHtml(node2.content ?? "");
  const href = node2.href || props.href;
  if (href) {
    return `<a href="${escapeHtml(href)}" class="${classes}${loading}"${sourceLine(node2)}>${contentHTML}</a>`;
  }
  return `<button class="${classes}${loading}"${disabled}${sourceLine(node2)}>${contentHTML}</button>`;
}

// packages/core/src/renderer/react-renderer.ts
function nextRadioGroupName(context) {
  if (!context._radioGroupCounter) {
    context._radioGroupCounter = { value: 0 };
  }
  context._radioGroupCounter.value += 1;
  return `radio-group-${context._radioGroupCounter.value}`;
}
function applyRadioGroupName(children, context) {
  if (!children || children.length === 0)
    return children;
  const hasRadio = children.some((c) => c && c.type === "radio");
  if (!hasRadio)
    return children;
  const name = nextRadioGroupName(context);
  return children.map((c) => {
    if (!c || c.type !== "radio")
      return c;
    if (c.props && c.props.name)
      return c;
    return { ...c, props: { ...c.props || {}, name } };
  });
}
function repeatString(str, count) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += str;
  }
  return result;
}
function renderNode2(node2, context, indent2 = 0) {
  if (node2 == null)
    return "";
  const def = getNodeDefinition(node2.type);
  if (def?.render?.react) {
    return def.render.react(node2, context, indent2);
  }
  const indentStr = repeatString("  ", indent2);
  return `${indentStr}{/* Unknown node type: ${node2.type} */}`;
}
function buildClasses2(prefix, baseClass, props) {
  const classes = [`${prefix}${baseClass}`];
  if (props.classes && Array.isArray(props.classes)) {
    props.classes.forEach((cls) => {
      classes.push(`${prefix}${cls}`);
    });
  }
  if (props.variant) {
    classes.push(`${prefix}${baseClass}-${props.variant}`);
  }
  if (props.state) {
    classes.push(`${prefix}state-${props.state}`);
  }
  return classes.join(" ");
}
function escapeJSX(text6) {
  if (!text6)
    return "";
  return text6.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/{/g, "&#123;").replace(/}/g, "&#125;");
}

// packages/core/src/nodes/button/react.ts
function renderButtonReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses2(prefix, "button", props);
  const disabled = props.state === "disabled" || props.disabled;
  const classAttr = context.useClassName ? "className" : "class";
  const contentJSX = node2.children ? node2.children.map((child) => renderNode2(child, context, 0)).join("") : escapeJSX(node2.content ?? "");
  return `${indentStr}<button ${classAttr}="${classes}"${disabled ? " disabled" : ""}>
${indentStr}  ${contentJSX}
${indentStr}</button>`;
}

// packages/core/src/renderer/tailwind-renderer.ts
function nextRadioGroupName2(context) {
  if (!context._radioGroupCounter) {
    context._radioGroupCounter = { value: 0 };
  }
  context._radioGroupCounter.value += 1;
  return `radio-group-${context._radioGroupCounter.value}`;
}
function applyRadioGroupName2(children, context) {
  if (!children || children.length === 0)
    return children;
  const hasRadio = children.some((c) => c && c.type === "radio");
  if (!hasRadio)
    return children;
  const name = nextRadioGroupName2(context);
  return children.map((c) => {
    if (!c || c.type !== "radio")
      return c;
    if (c.props && c.props.name)
      return c;
    return { ...c, props: { ...c.props || {}, name } };
  });
}
function renderNode3(node2, context) {
  if (node2 == null)
    return "";
  const def = getNodeDefinition(node2.type);
  if (def?.render?.tailwind) {
    return def.render.tailwind(node2, context);
  }
  return `<!-- Unknown node type: ${node2.type} -->`;
}
function escapeHtml2(text6) {
  if (!text6)
    return "";
  return text6.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// packages/core/src/nodes/button/tailwind.ts
function renderButtonTailwind(node2, context) {
  let classes = "px-4 py-2 rounded-md font-medium transition-colors";
  const props = node2.props;
  const variant = props.variant;
  const nodeClasses = props.classes || [];
  const isPrimary = variant === "primary" || nodeClasses.includes("primary");
  const isSecondary = variant === "secondary" || nodeClasses.includes("secondary");
  const isDanger = variant === "danger" || nodeClasses.includes("danger");
  if (isPrimary) {
    classes += " bg-indigo-600 text-white hover:bg-indigo-700";
  } else if (isSecondary) {
    classes += " bg-gray-200 text-gray-900 hover:bg-gray-300";
  } else if (isDanger) {
    classes += " bg-red-600 text-white hover:bg-red-700";
  } else {
    classes += " bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300";
  }
  const isDisabled = props.state === "disabled" || props.disabled;
  const isLoading = props.state === "loading" || props.loading;
  if (isDisabled) {
    classes += " opacity-50 cursor-not-allowed";
  } else if (isLoading) {
    classes += " opacity-75 cursor-wait";
  }
  const disabled = isDisabled ? " disabled" : "";
  const contentHTML = node2.children ? node2.children.map((child) => renderNode3(child, context)).join("") : escapeHtml2(node2.content ?? "");
  return `<button class="${classes}"${disabled}>${contentHTML}</button>`;
}

// packages/core/src/nodes/button/index.ts
var button = {
  type: "button",
  render: {
    html: renderButtonHTML,
    react: renderButtonReact,
    tailwind: renderButtonTailwind
  }
};

// packages/core/src/nodes/container/html.ts
function renderContainerHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, `container-${node2.containerType}`, node2.props);
  const nodeClasses = node2.props?.classes || [];
  if (node2.containerType === "layout" && nodeClasses.includes("sidebar-main")) {
    return renderSidebarMainLayout(node2, context, classes);
  }
  const childrenHTML = renderChildrenList(node2.children || [], context);
  return `<div class="${classes}"${sourceLine(node2)}>
  ${childrenHTML}
</div>`;
}
function renderSidebarMainLayout(node2, context, classes) {
  const { classPrefix: prefix } = context;
  const children = node2.children || [];
  const sections = [];
  let current = null;
  for (const child of children) {
    if (child.type === "container" && (child.containerType === "sidebar" || child.containerType === "main")) {
      if (current)
        sections.push(current);
      sections.push({
        name: child.containerType,
        nodes: child.children || []
      });
      current = null;
    } else {
      const childClasses = child.props?.classes || [];
      if (child.type === "heading" && (childClasses.includes("sidebar") || childClasses.includes("main"))) {
        if (current)
          sections.push(current);
        current = { name: childClasses.includes("sidebar") ? "sidebar" : "main", nodes: [] };
      } else if (current) {
        current.nodes.push(child);
      }
    }
  }
  if (current)
    sections.push(current);
  const sectionsHTML = sections.map((s) => {
    const contentHTML = renderChildrenList(s.nodes, context);
    return `  <div class="${prefix}layout-${s.name}">
    ${contentHTML}
  </div>`;
  }).join("\n");
  return `<div class="${classes}">
${sectionsHTML}
</div>`;
}

// packages/core/src/nodes/container/react.ts
function renderContainerReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, `container-${node2.containerType}`, node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = (node2.children || []).map((child) => renderNode2(child, context, indent2 + 1)).join("\n");
  return `${indentStr}<div ${classAttr}="${classes}">
${childrenJSX}
${indentStr}</div>`;
}

// packages/core/src/nodes/container/tailwind.ts
function renderContainerTailwind(node2, context) {
  let classes = "";
  switch (node2.containerType) {
    case "hero":
      classes = "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-12 text-center my-8 shadow-lg";
      break;
    case "card":
      classes = "bg-white rounded-lg p-6 shadow-md border border-gray-200 my-4";
      break;
    case "modal":
      classes = "bg-white rounded-lg p-8 shadow-2xl max-w-md mx-auto my-8";
      break;
    case "footer":
      classes = "bg-gray-900 text-gray-300 p-8 rounded-lg mt-12";
      break;
    case "alert":
      classes = "border-l-4 p-4 my-4 rounded";
      if (node2.props.state === "error") {
        classes += " bg-red-50 border-red-500 text-red-900";
      } else if (node2.props.state === "success") {
        classes += " bg-green-50 border-green-500 text-green-900";
      } else if (node2.props.state === "warning") {
        classes += " bg-yellow-50 border-yellow-500 text-yellow-900";
      } else {
        classes += " bg-blue-50 border-blue-500 text-blue-900";
      }
      break;
    case "section":
      classes = "py-6 border-b border-gray-200 last:border-b-0";
      break;
    case "form-group":
      classes = "mb-4";
      break;
    case "button-group":
      classes = "flex flex-wrap gap-2 my-4";
      break;
    default:
      classes = "p-4 my-4";
  }
  const childrenHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("\n  ");
  return `<div class="${classes}">
  ${childrenHTML}
</div>`;
}

// packages/core/src/nodes/container/index.ts
var container = {
  type: "container",
  render: {
    html: renderContainerHTML,
    react: renderContainerReact,
    tailwind: renderContainerTailwind
  }
};

// packages/core/src/nodes/nav/html.ts
function renderNavHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "nav", node2.props);
  const childrenHTML = (node2.children || []).map((child) => renderNode(child, context)).join("\n    ");
  return `<nav class="${classes}"${sourceLine(node2)}>
  <div class="${prefix}nav-content">
    ${childrenHTML}
  </div>
</nav>`;
}

// packages/core/src/nodes/nav/react.ts
function renderNavReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "nav", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = (node2.children || []).map((child) => renderNode2(child, context, indent2 + 2)).join("\n");
  return `${indentStr}<nav ${classAttr}="${classes}">
${indentStr}  <div ${classAttr}="${prefix}nav-content">
${childrenJSX}
${indentStr}  </div>
${indentStr}</nav>`;
}

// packages/core/src/nodes/nav/tailwind.ts
function renderNavTailwind(node2, context) {
  const classes = "bg-white shadow-sm rounded-lg p-4 mb-8";
  const childrenHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("\n    ");
  return `<nav class="${classes}">
  <div class="flex items-center gap-6 flex-wrap">
    ${childrenHTML}
  </div>
</nav>`;
}

// packages/core/src/nodes/nav/index.ts
var nav = {
  type: "nav",
  render: { html: renderNavHTML, react: renderNavReact, tailwind: renderNavTailwind }
};

// packages/core/src/nodes/nav-item/html.ts
function renderNavItemHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const href = node2.href || "#";
  const isActive = Array.isArray(props.classes) && props.classes.includes("active");
  const ariaCurrent = isActive ? ' aria-current="page"' : "";
  const contentHTML = node2.children ? node2.children.map((child) => renderNode(child, context)).join("") : escapeHtml(node2.content ?? "");
  if (props.variant === "primary") {
    const classes2 = `${buildClasses(prefix, "button", props)} ${prefix}button-primary`;
    return `<a href="${href}"${ariaCurrent} class="${classes2.trim()}" style="text-decoration:none;color:inherit;">${contentHTML}</a>`;
  }
  const classes = buildClasses(prefix, "nav-item", props);
  return `<a href="${href}"${ariaCurrent} class="${classes}">${contentHTML}</a>`;
}

// packages/core/src/nodes/nav-item/react.ts
function renderNavItemReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses2(prefix, "nav-item", props);
  const href = node2.href || "#";
  const classAttr = context.useClassName ? "className" : "class";
  const isActive = Array.isArray(props.classes) && props.classes.includes("active");
  const ariaCurrent = isActive ? ' aria-current="page"' : "";
  const contentJSX = node2.children ? node2.children.map((child) => renderNode2(child, context, 0)).join("") : escapeJSX(node2.content ?? "");
  return `${indentStr}<a href="${href}"${ariaCurrent} ${classAttr}="${classes}">${contentJSX}</a>`;
}

// packages/core/src/nodes/nav-item/tailwind.ts
function renderNavItemTailwind(node2, context) {
  const props = node2.props;
  const classes = "text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium";
  const href = node2.href || "#";
  const isActive = Array.isArray(props.classes) && props.classes.includes("active");
  const ariaCurrent = isActive ? ' aria-current="page"' : "";
  const contentHTML = node2.children ? node2.children.map((child) => renderNode3(child, context)).join("") : escapeHtml2(node2.content ?? "");
  return `<a href="${href}"${ariaCurrent} class="${classes}">${contentHTML}</a>`;
}

// packages/core/src/nodes/nav-item/index.ts
var navItem = {
  type: "nav-item",
  render: { html: renderNavItemHTML, react: renderNavItemReact, tailwind: renderNavItemTailwind }
};

// packages/core/src/nodes/brand/html.ts
function renderBrandHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "brand", node2.props);
  const childrenHTML = (node2.children || []).map((child) => renderNode(child, context)).join("");
  return `<div class="${classes}">${childrenHTML}</div>`;
}

// packages/core/src/nodes/brand/react.ts
function renderBrandReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "brand", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = (node2.children || []).map((child) => renderNode2(child, context, 0)).join("");
  return `${indentStr}<div ${classAttr}="${classes}">${childrenJSX}</div>`;
}

// packages/core/src/nodes/brand/tailwind.ts
function renderBrandTailwind(node2, context) {
  const classes = "font-bold text-xl text-gray-900 mr-auto flex items-center gap-2";
  const childrenHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("");
  return `<div class="${classes}">${childrenHTML}</div>`;
}

// packages/core/src/nodes/brand/index.ts
var brand = {
  type: "brand",
  render: { html: renderBrandHTML, react: renderBrandReact, tailwind: renderBrandTailwind }
};

// packages/core/src/nodes/grid/html.ts
function renderGridHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "grid", node2.props);
  const columns = node2.columns || 3;
  const gridClass = `${classes} ${prefix}grid-${columns}`;
  const childrenHTML = renderChildrenList(node2.children || [], context);
  return `<div class="${gridClass}"${sourceLine(node2)} style="--grid-columns: ${columns}">
  ${childrenHTML}
</div>`;
}

// packages/core/src/nodes/grid/react.ts
function renderGridReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "grid", node2.props);
  const columns = node2.columns || 3;
  const gridClass = `${classes} ${prefix}grid-${columns}`;
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = (node2.children || []).map((child) => renderNode2(child, context, indent2 + 1)).join("\n");
  return `${indentStr}<div ${classAttr}="${gridClass}" style={{ '--grid-columns': ${columns} }${context.typescript ? " as React.CSSProperties" : ""}}>
${childrenJSX}
${indentStr}</div>`;
}

// packages/core/src/nodes/grid/tailwind.ts
function renderGridTailwind(node2, context) {
  const columns = node2.columns || 3;
  let gridClasses = "grid gap-6 my-8";
  if (columns === 2) {
    gridClasses += " grid-cols-1 md:grid-cols-2";
  } else if (columns === 3) {
    gridClasses += " grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  } else if (columns === 4) {
    gridClasses += " grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  } else {
    gridClasses += ` grid-cols-1 md:grid-cols-${Math.min(columns, 4)}`;
  }
  const childrenHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("\n  ");
  return `<div class="${gridClasses}">
  ${childrenHTML}
</div>`;
}

// packages/core/src/nodes/grid/index.ts
var grid = {
  type: "grid",
  render: { html: renderGridHTML, react: renderGridReact, tailwind: renderGridTailwind }
};

// packages/core/src/nodes/grid-item/html.ts
function renderGridItemHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const propsClasses = node2.props?.classes || [];
  const hasCard = propsClasses.includes("card");
  const extraClasses = hasCard ? [...propsClasses, "grid-item-card"] : propsClasses;
  const itemProps = { ...node2.props, classes: extraClasses };
  const classes = buildClasses(prefix, "grid-item", itemProps);
  const childrenHTML = renderChildrenList(node2.children || [], context);
  return `<div class="${classes}">
    ${childrenHTML}
  </div>`;
}

// packages/core/src/nodes/grid-item/react.ts
function renderGridItemReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "grid-item", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = (node2.children || []).map((child) => renderNode2(child, context, indent2 + 1)).join("\n");
  return `${indentStr}<div ${classAttr}="${classes}">
${childrenJSX}
${indentStr}</div>`;
}

// packages/core/src/nodes/grid-item/tailwind.ts
function renderGridItemTailwind(node2, context) {
  const classes = "bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow";
  const childrenHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("\n    ");
  return `<div class="${classes}">
    ${childrenHTML}
  </div>`;
}

// packages/core/src/nodes/grid-item/index.ts
var gridItem = {
  type: "grid-item",
  render: {
    html: renderGridItemHTML,
    react: renderGridItemReact,
    tailwind: renderGridItemTailwind
  }
};

// packages/core/src/nodes/row/html.ts
function renderRowHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "row", node2.props);
  const childrenHTML = renderChildrenList(node2.children || [], context);
  return `<div class="${classes}"${sourceLine(node2)}>
  ${childrenHTML}
</div>`;
}

// packages/core/src/nodes/row/react.ts
function renderRowReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "row", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = (node2.children || []).map((child) => renderNode2(child, context, indent2 + 1)).join("\n");
  return `${indentStr}<div ${classAttr}="${classes}">
${childrenJSX}
${indentStr}</div>`;
}

// packages/core/src/nodes/row/tailwind.ts
function renderRowTailwind(node2, context) {
  const propsClasses = node2.props?.classes || [];
  const classes = propsClasses.includes("right") ? "flex items-center gap-3 flex-wrap justify-end" : propsClasses.includes("center") ? "flex items-center gap-3 flex-wrap justify-center" : "flex items-center gap-3 flex-wrap";
  const childrenHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("\n  ");
  return `<div class="${classes}">
  ${childrenHTML}
</div>`;
}

// packages/core/src/nodes/row/index.ts
var row = {
  type: "row",
  render: { html: renderRowHTML, react: renderRowReact, tailwind: renderRowTailwind }
};

// packages/core/src/nodes/heading/html.ts
function renderHeadingHTML(node2, context) {
  if (!node2.content && !node2.children?.length)
    return "";
  const { classPrefix: prefix } = context;
  const level = node2.level || 1;
  const classes = buildClasses(prefix, `h${level}`, node2.props);
  const content3 = node2.content || "";
  const childrenHTML = node2.children ? node2.children.map((child) => renderNode(child, context)).join("") : escapeHtml(content3);
  return `<h${level} class="${classes}"${sourceLine(node2)}>${childrenHTML}</h${level}>`;
}

// packages/core/src/nodes/heading/react.ts
function renderHeadingReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const level = node2.level || 1;
  const classes = buildClasses2(prefix, `h${level}`, node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = node2.children ? node2.children.map((child) => renderNode2(child, context, 0)).join("") : escapeJSX(node2.content || "");
  const tag = `h${level}`;
  return `${indentStr}<${tag} ${classAttr}="${classes}">${childrenJSX}</${tag}>`;
}

// packages/core/src/nodes/heading/tailwind.ts
function renderHeadingTailwind(node2, context) {
  const level = node2.level || 1;
  let classes = "font-bold text-gray-900 my-4";
  switch (level) {
    case 1:
      classes = "text-4xl font-extrabold text-gray-900 mb-4 mt-8";
      break;
    case 2:
      classes = "text-3xl font-bold text-gray-900 mb-3 mt-6";
      break;
    case 3:
      classes = "text-2xl font-semibold text-gray-900 mb-2 mt-4";
      break;
    case 4:
      classes = "text-xl font-semibold text-gray-800 mb-2 mt-4";
      break;
    case 5:
      classes = "text-lg font-medium text-gray-800 mb-2 mt-3";
      break;
    case 6:
      classes = "text-base font-medium text-gray-700 mb-2 mt-2";
      break;
  }
  const childrenHTML = node2.children ? node2.children.map((child) => renderNode3(child, context)).join("") : escapeHtml2(node2.content || "");
  return `<h${level} class="${classes}">${childrenHTML}</h${level}>`;
}

// packages/core/src/nodes/heading/index.ts
var heading2 = {
  type: "heading",
  render: { html: renderHeadingHTML, react: renderHeadingReact, tailwind: renderHeadingTailwind }
};

// packages/core/src/nodes/paragraph/html.ts
function renderParagraphHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "paragraph", node2.props);
  let childrenHTML;
  if (node2.children) {
    childrenHTML = node2.children.map((child) => renderNode(child, context)).join("");
  } else if (node2.content) {
    const hasHtmlTags = /<[^>]+>/.test(node2.content);
    childrenHTML = hasHtmlTags ? node2.content : escapeHtml(node2.content);
  } else {
    childrenHTML = "";
  }
  return `<p class="${classes}"${sourceLine(node2)}>${childrenHTML}</p>`;
}

// packages/core/src/nodes/paragraph/react.ts
function renderParagraphReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "paragraph", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = node2.children ? node2.children.map((child) => renderNode2(child, context, 0)).join("") : node2.content ? escapeJSX(node2.content) : "";
  return `${indentStr}<p ${classAttr}="${classes}">${childrenJSX}</p>`;
}

// packages/core/src/nodes/paragraph/tailwind.ts
function renderParagraphTailwind(node2, context) {
  const classes = "text-gray-700 my-3";
  const childrenHTML = node2.children ? node2.children.map((child) => renderNode3(child, context)).join("") : node2.content ? escapeHtml2(node2.content) : "";
  return `<p class="${classes}">${childrenHTML}</p>`;
}

// packages/core/src/nodes/paragraph/index.ts
var paragraph2 = {
  type: "paragraph",
  render: {
    html: renderParagraphHTML,
    react: renderParagraphReact,
    tailwind: renderParagraphTailwind
  }
};

// packages/core/src/nodes/text/html.ts
function renderTextHTML(node2, _context) {
  const content3 = node2.content || "";
  const hasHtmlTags = /<[^>]+>/.test(content3);
  return hasHtmlTags ? content3 : escapeHtml(content3);
}

// packages/core/src/nodes/text/react.ts
function renderTextReact(node2, _context, _indent = 0) {
  return escapeJSX(node2.content || "");
}

// packages/core/src/nodes/text/tailwind.ts
function renderTextTailwind(node2, _context) {
  return escapeHtml2(node2.content || "");
}

// packages/core/src/nodes/text/index.ts
var text5 = {
  type: "text",
  render: { html: renderTextHTML, react: renderTextReact, tailwind: renderTextTailwind }
};

// packages/core/src/nodes/image/html.ts
function renderImageHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "image", node2.props);
  const src = node2.src || "";
  const alt = node2.alt || "";
  const width = node2.props.width ? ` width="${node2.props.width}"` : "";
  const height = node2.props.height ? ` height="${node2.props.height}"` : "";
  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="${classes}"${width}${height} />`;
}

// packages/core/src/nodes/image/react.ts
function renderImageReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "image", node2.props);
  const src = node2.src || "";
  const alt = node2.alt || "";
  const classAttr = context.useClassName ? "className" : "class";
  const attrs = [];
  if (node2.props.width)
    attrs.push(`width="${node2.props.width}"`);
  if (node2.props.height)
    attrs.push(`height="${node2.props.height}"`);
  return `${indentStr}<img src="${escapeJSX(src)}" alt="${escapeJSX(alt)}" ${classAttr}="${classes}" ${attrs.join(" ")} />`;
}

// packages/core/src/nodes/image/tailwind.ts
function renderImageTailwind(node2, _context) {
  const classes = "max-w-full h-auto rounded-lg shadow-md";
  const src = node2.src || "";
  const alt = node2.alt || "";
  const attrs = [];
  if (node2.props.width)
    attrs.push(`width="${node2.props.width}"`);
  if (node2.props.height)
    attrs.push(`height="${node2.props.height}"`);
  return `<img src="${escapeHtml2(src)}" alt="${escapeHtml2(alt)}" class="${classes}" ${attrs.join(" ")} />`;
}

// packages/core/src/nodes/image/index.ts
var image2 = {
  type: "image",
  render: { html: renderImageHTML, react: renderImageReact, tailwind: renderImageTailwind }
};

// packages/core/src/nodes/icon/_iconmap.ts
var ICON_MAP_FULL = {
  // Social media
  twitter: "\u{1D54F}",
  github: "\u2299",
  linkedin: "in",
  facebook: "f",
  instagram: "\u25C9",
  youtube: "\u25B6",
  // Common UI icons
  home: "\u{1F3E0}",
  user: "\u{1F464}",
  settings: "\u2699\uFE0F",
  search: "\u{1F50D}",
  star: "\u2B50",
  heart: "\u2764\uFE0F",
  mail: "\u2709\uFE0F",
  phone: "\u{1F4DE}",
  calendar: "\u{1F4C5}",
  clock: "\u{1F550}",
  location: "\u{1F4CD}",
  link: "\u{1F517}",
  download: "\u2B07\uFE0F",
  upload: "\u2B06\uFE0F",
  edit: "\u270F\uFE0F",
  delete: "\u{1F5D1}\uFE0F",
  plus: "\u2795",
  minus: "\u2796",
  check: "\u2713",
  close: "\u2715",
  menu: "\u2630",
  more: "\u22EF",
  info: "\u2139\uFE0F",
  warning: "\u26A0\uFE0F",
  error: "\u274C",
  success: "\u2705",
  // Arrows
  "arrow-up": "\u2191",
  "arrow-down": "\u2193",
  "arrow-left": "\u2190",
  "arrow-right": "\u2192",
  // Business/Finance
  chart: "\u{1F4CA}",
  dollar: "$",
  euro: "\u20AC",
  pound: "\xA3",
  // Tech
  code: "</>",
  database: "\u{1F5C4}\uFE0F",
  cloud: "\u2601\uFE0F",
  wifi: "\u{1F4F6}",
  // Communication
  chat: "\u{1F4AC}",
  video: "\u{1F3A5}",
  microphone: "\u{1F3A4}",
  bell: "\u{1F514}",
  // Files
  file: "\u{1F4C4}",
  folder: "\u{1F4C1}",
  image: "\u{1F5BC}\uFE0F",
  document: "\u{1F4C3}",
  pdf: "\u{1F4D1}",
  // Brand placeholders
  logo: "\u25C8",
  brand: "\u25C6",
  // Activities
  rocket: "\u{1F680}",
  bulb: "\u{1F4A1}",
  shield: "\u{1F6E1}\uFE0F",
  lock: "\u{1F512}",
  unlock: "\u{1F513}",
  key: "\u{1F511}",
  gift: "\u{1F381}",
  trophy: "\u{1F3C6}",
  flag: "\u{1F6A9}",
  bookmark: "\u{1F516}",
  tag: "\u{1F3F7}\uFE0F",
  cart: "\u{1F6D2}",
  "credit-card": "\u{1F4B3}",
  // Default
  default: "\u25CF"
};
var ICON_MAP_SMALL = {
  home: "\u{1F3E0}",
  user: "\u{1F464}",
  settings: "\u2699\uFE0F",
  search: "\u{1F50D}",
  star: "\u2B50",
  heart: "\u2764\uFE0F",
  mail: "\u2709\uFE0F",
  phone: "\u{1F4DE}",
  check: "\u2713",
  close: "\u2715",
  menu: "\u2630",
  more: "\u22EF",
  default: "\u25CF"
};
var SOCIAL_ICONS = ["twitter", "github", "linkedin", "facebook", "instagram", "youtube"];

// packages/core/src/nodes/icon/html.ts
function renderIconHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "icon", node2.props);
  const iconName = node2.props.name || "default";
  const iconContent = ICON_MAP_FULL[iconName] || ICON_MAP_FULL["default"];
  if (SOCIAL_ICONS.includes(iconName)) {
    return `<span class="${classes}" data-icon="${iconName}" aria-label="${iconName}" style="font-family: monospace; font-weight: bold; font-style: normal;">${iconContent}</span>`;
  }
  return `<span class="${classes}" data-icon="${iconName}" aria-label="${iconName}">${iconContent}</span>`;
}

// packages/core/src/nodes/icon/react.ts
function renderIconReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "icon", node2.props);
  const iconName = node2.props.name || "default";
  const classAttr = context.useClassName ? "className" : "class";
  const iconContent = ICON_MAP_SMALL[iconName] || ICON_MAP_SMALL["default"];
  return `${indentStr}<span ${classAttr}="${classes}" data-icon="${iconName}" aria-label="${iconName}">${iconContent}</span>`;
}

// packages/core/src/nodes/icon/tailwind.ts
function renderIconTailwind(node2, _context) {
  const classes = "inline-block align-middle";
  const iconName = node2.props.name || "default";
  const iconContent = ICON_MAP_SMALL[iconName] || ICON_MAP_SMALL["default"];
  return `<span class="${classes}" data-icon="${iconName}" aria-label="${iconName}">${iconContent}</span>`;
}

// packages/core/src/nodes/icon/index.ts
var icon = {
  type: "icon",
  render: { html: renderIconHTML, react: renderIconReact, tailwind: renderIconTailwind }
};

// packages/core/src/nodes/link/html.ts
function renderLinkHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "link", node2.props);
  const href = node2.href || "#";
  const title = node2.title ? ` title="${escapeHtml(node2.title)}"` : "";
  const childrenHTML = node2.children ? node2.children.map((child) => renderNode(child, context)).join("") : escapeHtml(node2.content || "");
  return `<a href="${escapeHtml(href)}" class="${classes}"${title}>${childrenHTML}</a>`;
}

// packages/core/src/nodes/link/react.ts
function renderLinkReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "link", node2.props);
  const href = node2.href || "#";
  const classAttr = context.useClassName ? "className" : "class";
  const attrs = [];
  if (node2.title)
    attrs.push(`title="${escapeJSX(node2.title)}"`);
  const childrenJSX = node2.children ? node2.children.map((child) => renderNode2(child, context, 0)).join("") : escapeJSX(node2.content || "");
  return `${indentStr}<a href="${escapeJSX(href)}" ${classAttr}="${classes}" ${attrs.join(" ")}>${childrenJSX}</a>`;
}

// packages/core/src/nodes/link/tailwind.ts
function renderLinkTailwind(node2, context) {
  const classes = "text-indigo-600 hover:text-indigo-800 underline";
  const href = node2.href || "#";
  const title = node2.title ? ` title="${escapeHtml2(node2.title)}"` : "";
  const childrenHTML = node2.children ? node2.children.map((child) => renderNode3(child, context)).join("") : escapeHtml2(node2.content || "");
  return `<a href="${escapeHtml2(href)}" class="${classes}"${title}>${childrenHTML}</a>`;
}

// packages/core/src/nodes/link/index.ts
var link2 = {
  type: "link",
  render: { html: renderLinkHTML, react: renderLinkReact, tailwind: renderLinkTailwind }
};

// packages/core/src/nodes/list/html.ts
function renderListHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "list", node2.props);
  const tag = node2.ordered ? "ol" : "ul";
  const children = applyRadioGroupName3(node2.children || [], context);
  const childrenHTML = children.map((child) => renderNode(child, context)).join("\n  ");
  return `<${tag} class="${classes}"${sourceLine(node2)}>
  ${childrenHTML}
</${tag}>`;
}

// packages/core/src/nodes/list/react.ts
function renderListReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "list", node2.props);
  const tag = node2.ordered ? "ol" : "ul";
  const classAttr = context.useClassName ? "className" : "class";
  const children = applyRadioGroupName(node2.children || [], context);
  const childrenJSX = children.map((child) => renderNode2(child, context, indent2 + 1)).join("\n");
  return `${indentStr}<${tag} ${classAttr}="${classes}">
${childrenJSX}
${indentStr}</${tag}>`;
}

// packages/core/src/nodes/list/tailwind.ts
function renderListTailwind(node2, context) {
  const classes = "my-4 pl-6 space-y-2";
  const tag = node2.ordered ? "ol" : "ul";
  const listStyle = node2.ordered ? " list-decimal" : " list-disc";
  const children = applyRadioGroupName2(node2.children || [], context);
  const childrenHTML = children.map((child) => renderNode3(child, context)).join("\n  ");
  return `<${tag} class="${classes}${listStyle}">
  ${childrenHTML}
</${tag}>`;
}

// packages/core/src/nodes/list/index.ts
var list3 = {
  type: "list",
  render: { html: renderListHTML, react: renderListReact, tailwind: renderListTailwind }
};

// packages/core/src/nodes/list-item/html.ts
function renderListItemHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "list-item", node2.props);
  let html2 = "";
  if (node2.content) {
    html2 = escapeHtml(node2.content);
  }
  if (node2.children) {
    html2 += node2.children.map((child) => renderNode(child, context)).join("");
  }
  return `<li class="${classes}">${html2}</li>`;
}

// packages/core/src/nodes/list-item/react.ts
function renderListItemReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "list-item", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = node2.children ? node2.children.map((child) => renderNode2(child, context, 0)).join("") : escapeJSX(node2.content || "");
  return `${indentStr}<li ${classAttr}="${classes}">${childrenJSX}</li>`;
}

// packages/core/src/nodes/list-item/tailwind.ts
function renderListItemTailwind(node2, context) {
  const classes = "text-gray-700";
  const childrenHTML = node2.children ? node2.children.map((child) => renderNode3(child, context)).join("") : escapeHtml2(node2.content || "");
  return `<li class="${classes}">${childrenHTML}</li>`;
}

// packages/core/src/nodes/list-item/index.ts
var listItem2 = {
  type: "list-item",
  render: {
    html: renderListItemHTML,
    react: renderListItemReact,
    tailwind: renderListItemTailwind
  }
};

// packages/core/src/nodes/table/html.ts
function renderTableHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "table", node2.props);
  const headerNode = node2.children?.find((child) => child.type === "table-header");
  const rowNodes = node2.children?.filter((child) => child.type === "table-row") || [];
  const headerHTML = headerNode ? renderNode(headerNode, context) : "";
  const rowsHTML = rowNodes.map((child) => renderNode(child, context)).join("\n    ");
  const bodyHTML = rowsHTML ? `
  <tbody>
    ${rowsHTML}
  </tbody>` : "";
  return `<table class="${classes}"${sourceLine(node2)}>
  ${headerHTML}${bodyHTML}
</table>`;
}

// packages/core/src/nodes/table/react.ts
function renderTableReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "table", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const headerNode = node2.children?.find((child) => child.type === "table-header");
  const rowNodes = node2.children?.filter((child) => child.type === "table-row") || [];
  const headerJSX = headerNode ? renderNode2(headerNode, context, indent2 + 1) : "";
  const rowsJSX = rowNodes.map((child) => renderNode2(child, context, indent2 + 2)).join("\n");
  const bodyJSX = rowsJSX ? `
${indentStr}  <tbody>
${rowsJSX}
${indentStr}  </tbody>` : "";
  return `${indentStr}<table ${classAttr}="${classes}">
${headerJSX}${bodyJSX}
${indentStr}</table>`;
}

// packages/core/src/nodes/table/tailwind.ts
function renderTableTailwind(node2, context) {
  const classes = "min-w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden my-6";
  const headerNode = node2.children?.find((child) => child.type === "table-header");
  const rowNodes = node2.children?.filter((child) => child.type === "table-row") || [];
  const headerHTML = headerNode ? renderNode3(headerNode, context) : "";
  const rowsHTML = rowNodes.map((child) => renderNode3(child, context)).join("\n    ");
  const bodyHTML = rowsHTML ? `
  <tbody class="divide-y divide-gray-200">
    ${rowsHTML}
  </tbody>` : "";
  return `<table class="${classes}">
  ${headerHTML}${bodyHTML}
</table>`;
}

// packages/core/src/nodes/table/index.ts
var table = {
  type: "table",
  render: { html: renderTableHTML, react: renderTableReact, tailwind: renderTableTailwind }
};

// packages/core/src/nodes/table-header/html.ts
function renderTableHeaderHTML(node2, context) {
  const cellsHTML = (node2.children || []).map((child) => renderNode(child, context)).join("\n    ");
  return `<thead>
    <tr>
      ${cellsHTML}
    </tr>
  </thead>`;
}

// packages/core/src/nodes/table-header/react.ts
function renderTableHeaderReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const cellsJSX = (node2.children || []).map((child) => renderNode2(child, context, indent2 + 2)).join("\n");
  return `${indentStr}  <thead>
${indentStr}    <tr>
${cellsJSX}
${indentStr}    </tr>
${indentStr}  </thead>`;
}

// packages/core/src/nodes/table-header/tailwind.ts
function renderTableHeaderTailwind(node2, context) {
  const cellsHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("\n    ");
  return `<thead class="bg-gray-50">
    <tr>
      ${cellsHTML}
    </tr>
  </thead>`;
}

// packages/core/src/nodes/table-header/index.ts
var tableHeader = {
  type: "table-header",
  render: {
    html: renderTableHeaderHTML,
    react: renderTableHeaderReact,
    tailwind: renderTableHeaderTailwind
  }
};

// packages/core/src/nodes/table-row/html.ts
function renderTableRowHTML(node2, context) {
  const cellsHTML = (node2.children || []).map((child) => renderNode(child, context)).join("\n    ");
  return `<tr>
    ${cellsHTML}
  </tr>`;
}

// packages/core/src/nodes/table-row/react.ts
function renderTableRowReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const cellsJSX = (node2.children || []).map((child) => renderNode2(child, context, indent2 + 1)).join("\n");
  return `${indentStr}    <tr>
${cellsJSX}
${indentStr}    </tr>`;
}

// packages/core/src/nodes/table-row/tailwind.ts
function renderTableRowTailwind(node2, context) {
  const cellsHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("\n    ");
  return `<tr class="hover:bg-gray-50">
    ${cellsHTML}
  </tr>`;
}

// packages/core/src/nodes/table-row/index.ts
var tableRow = {
  type: "table-row",
  render: {
    html: renderTableRowHTML,
    react: renderTableRowReact,
    tailwind: renderTableRowTailwind
  }
};

// packages/core/src/nodes/table-cell/html.ts
function renderTableCellHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const tag = node2.header ? "th" : "td";
  const align = node2.align || "left";
  const classes = buildClasses(prefix, `table-cell ${prefix}align-${align}`, {});
  const contentHTML = node2.children && node2.children.length > 0 ? node2.children.map((child) => renderNode(child, context)).join("") : escapeHtml(node2.content || "");
  return `<${tag} class="${classes}">${contentHTML}</${tag}>`;
}

// packages/core/src/nodes/table-cell/react.ts
function renderTableCellReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const tag = node2.header ? "th" : "td";
  const align = node2.align || "left";
  const classes = buildClasses2(prefix, `table-cell ${prefix}align-${align}`, {});
  const classAttr = context.useClassName ? "className" : "class";
  const contentJSX = node2.children && node2.children.length > 0 ? node2.children.map((child) => renderNode2(child, context, 0)).join("") : escapeJSX(node2.content || "");
  return `${indentStr}      <${tag} ${classAttr}="${classes}">${contentJSX}</${tag}>`;
}

// packages/core/src/nodes/table-cell/tailwind.ts
function renderTableCellTailwind(node2, context) {
  const tag = node2.header ? "th" : "td";
  const align = node2.align || "left";
  let classes = "px-6 py-3 text-gray-900";
  if (node2.header) {
    classes = "px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider";
  } else {
    if (align === "center")
      classes += " text-center";
    if (align === "right")
      classes += " text-right";
  }
  const contentHTML = node2.children && node2.children.length > 0 ? node2.children.map((child) => renderNode3(child, context)).join("") : escapeHtml2(node2.content || "");
  return `<${tag} class="${classes}">${contentHTML}</${tag}>`;
}

// packages/core/src/nodes/table-cell/index.ts
var tableCell = {
  type: "table-cell",
  render: {
    html: renderTableCellHTML,
    react: renderTableCellReact,
    tailwind: renderTableCellTailwind
  }
};

// packages/core/src/nodes/blockquote/html.ts
function renderBlockquoteHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "blockquote", node2.props);
  const childrenHTML = (node2.children || []).map((child) => renderNode(child, context)).join("\n  ");
  return `<blockquote class="${classes}"${sourceLine(node2)}>
  ${childrenHTML}
</blockquote>`;
}

// packages/core/src/nodes/blockquote/react.ts
function renderBlockquoteReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "blockquote", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  const childrenJSX = (node2.children || []).map((child) => renderNode2(child, context, indent2 + 1)).join("\n");
  return `${indentStr}<blockquote ${classAttr}="${classes}">
${childrenJSX}
${indentStr}</blockquote>`;
}

// packages/core/src/nodes/blockquote/tailwind.ts
function renderBlockquoteTailwind(node2, context) {
  const classes = "border-l-4 border-indigo-500 pl-4 my-4 text-gray-700 italic";
  const childrenHTML = (node2.children || []).map((child) => renderNode3(child, context)).join("\n  ");
  return `<blockquote class="${classes}">
  ${childrenHTML}
</blockquote>`;
}

// packages/core/src/nodes/blockquote/index.ts
var blockquote2 = {
  type: "blockquote",
  render: {
    html: renderBlockquoteHTML,
    react: renderBlockquoteReact,
    tailwind: renderBlockquoteTailwind
  }
};

// packages/core/src/nodes/code/html.ts
function renderCodeHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const inline = node2.inline !== false;
  if (inline) {
    const classes2 = buildClasses(prefix, "code-inline", {});
    return `<code class="${classes2}">${escapeHtml(node2.value)}</code>`;
  }
  const classes = buildClasses(prefix, "code-block", {});
  const lang = node2.lang ? ` data-lang="${escapeHtml(node2.lang)}"` : "";
  return `<pre class="${classes}"><code${lang}>${escapeHtml(node2.value)}</code></pre>`;
}

// packages/core/src/nodes/code/react.ts
function renderCodeReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const inline = node2.inline !== false;
  const classAttr = context.useClassName ? "className" : "class";
  if (inline) {
    const classes2 = buildClasses2(prefix, "code-inline", {});
    return `${indentStr}<code ${classAttr}="${classes2}">${escapeJSX(node2.value)}</code>`;
  }
  const classes = buildClasses2(prefix, "code-block", {});
  const dataLang = node2.lang ? ` data-lang="${escapeJSX(node2.lang)}"` : "";
  return `${indentStr}<pre ${classAttr}="${classes}"><code${dataLang}>${escapeJSX(node2.value)}</code></pre>`;
}

// packages/core/src/nodes/code/tailwind.ts
function renderCodeTailwind(node2, _context) {
  const inline = node2.inline !== false;
  if (inline) {
    const classes2 = "bg-gray-100 text-indigo-600 rounded px-2 py-1 font-mono text-sm";
    return `<code class="${classes2}">${escapeHtml2(node2.value)}</code>`;
  }
  const classes = "bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto";
  const dataLang = node2.lang ? ` data-lang="${escapeHtml2(node2.lang)}"` : "";
  return `<pre class="${classes}"><code class="font-mono text-sm"${dataLang}>${escapeHtml2(node2.value)}</code></pre>`;
}

// packages/core/src/nodes/code/index.ts
var code3 = {
  type: "code",
  render: { html: renderCodeHTML, react: renderCodeReact, tailwind: renderCodeTailwind }
};

// packages/core/src/nodes/input/html.ts
function renderInputHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses(prefix, "input", props);
  const type = props.inputType || props.type || "text";
  const required = props.required ? " required" : "";
  const disabled = props.disabled ? " disabled" : "";
  const placeholder = props.placeholder ? ` placeholder="${escapeHtml(props.placeholder)}"` : "";
  const value = props.value ? ` value="${escapeHtml(props.value)}"` : "";
  const style = props.width ? ` style="width: ${props.width}ch; max-width: ${props.width}ch;"` : "";
  return `<input type="${type}" class="${classes}"${placeholder}${value}${required}${disabled}${style} />`;
}

// packages/core/src/nodes/input/react.ts
function renderInputReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses2(prefix, "input", props);
  const type = props.inputType || props.type || "text";
  const classAttr = context.useClassName ? "className" : "class";
  const attrs = [];
  if (props.placeholder)
    attrs.push(`placeholder="${escapeJSX(props.placeholder)}"`);
  if (props.value)
    attrs.push(`defaultValue="${escapeJSX(props.value)}"`);
  if (props.required)
    attrs.push("required");
  if (props.disabled)
    attrs.push("disabled");
  return `${indentStr}<input type="${type}" ${classAttr}="${classes}" ${attrs.join(" ")} />`;
}

// packages/core/src/nodes/input/tailwind.ts
function renderInputTailwind(node2, _context) {
  const props = node2.props;
  const classes = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  const type = props.inputType || props.type || "text";
  const required = props.required ? " required" : "";
  const disabled = props.disabled ? " disabled" : "";
  const placeholder = props.placeholder ? ` placeholder="${escapeHtml2(props.placeholder)}"` : "";
  const value = props.value ? ` value="${escapeHtml2(props.value)}"` : "";
  return `<input type="${type}" class="${classes}"${placeholder}${value}${required}${disabled} />`;
}

// packages/core/src/nodes/input/index.ts
var input = {
  type: "input",
  render: { html: renderInputHTML, react: renderInputReact, tailwind: renderInputTailwind }
};

// packages/core/src/nodes/textarea/html.ts
function renderTextareaHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses(prefix, "textarea", props);
  const rows = props.rows || 4;
  const required = props.required ? " required" : "";
  const disabled = props.disabled ? " disabled" : "";
  const placeholder = props.placeholder ? ` placeholder="${escapeHtml(props.placeholder)}"` : "";
  const value = props.value || "";
  return `<textarea class="${classes}" rows="${rows}"${placeholder}${required}${disabled}>${escapeHtml(value)}</textarea>`;
}

// packages/core/src/nodes/textarea/react.ts
function renderTextareaReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses2(prefix, "textarea", props);
  const rows = props.rows || 4;
  const classAttr = context.useClassName ? "className" : "class";
  const attrs = [];
  if (props.placeholder)
    attrs.push(`placeholder="${escapeJSX(props.placeholder)}"`);
  if (props.required)
    attrs.push("required");
  if (props.disabled)
    attrs.push("disabled");
  const value = props.value || "";
  return `${indentStr}<textarea ${classAttr}="${classes}" rows={${rows}} ${attrs.join(" ")}>
${indentStr}  ${escapeJSX(value)}
${indentStr}</textarea>`;
}

// packages/core/src/nodes/textarea/tailwind.ts
function renderTextareaTailwind(node2, _context) {
  const props = node2.props;
  const classes = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical";
  const rows = props.rows || 4;
  const required = props.required ? " required" : "";
  const disabled = props.disabled ? " disabled" : "";
  const placeholder = props.placeholder ? ` placeholder="${escapeHtml2(props.placeholder)}"` : "";
  const value = props.value || "";
  return `<textarea class="${classes}" rows="${rows}"${placeholder}${required}${disabled}>${escapeHtml2(value)}</textarea>`;
}

// packages/core/src/nodes/textarea/index.ts
var textarea = {
  type: "textarea",
  render: {
    html: renderTextareaHTML,
    react: renderTextareaReact,
    tailwind: renderTextareaTailwind
  }
};

// packages/core/src/nodes/select/html.ts
function renderSelectHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses(prefix, "select", props);
  const required = props.required ? " required" : "";
  const disabled = props.disabled ? " disabled" : "";
  const multiple = props.multiple ? " multiple" : "";
  const optionsHTML = (node2.options || []).map((opt) => {
    const selected = opt.selected ? " selected" : "";
    return `<option value="${escapeHtml(opt.value)}"${selected}>${escapeHtml(opt.label)}</option>`;
  }).join("\n    ");
  const placeholder = props.placeholder;
  const placeholderOption = placeholder ? `<option value="" disabled selected>${escapeHtml(placeholder)}</option>
    ` : "";
  return `<select class="${classes}"${required}${disabled}${multiple}>
    ${placeholderOption}${optionsHTML}
  </select>`;
}

// packages/core/src/nodes/select/react.ts
function renderSelectReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses2(prefix, "select", props);
  const classAttr = context.useClassName ? "className" : "class";
  const attrs = [];
  if (props.required)
    attrs.push("required");
  if (props.disabled)
    attrs.push("disabled");
  if (props.multiple)
    attrs.push("multiple");
  const optionsJSX = (node2.options || []).map((opt) => {
    const selected = opt.selected ? " defaultSelected" : "";
    return `    <option value="${escapeJSX(opt.value)}"${selected}>${escapeJSX(opt.label)}</option>`;
  }).join("\n");
  const placeholder = props.placeholder;
  const placeholderOption = placeholder ? `    <option value="" disabled defaultSelected>${escapeJSX(placeholder)}</option>
` : "";
  return `${indentStr}<select ${classAttr}="${classes}" ${attrs.join(" ")}>
${placeholderOption}${optionsJSX}
${indentStr}</select>`;
}

// packages/core/src/nodes/select/tailwind.ts
function renderSelectTailwind(node2, _context) {
  const props = node2.props;
  const classes = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  const required = props.required ? " required" : "";
  const disabled = props.disabled ? " disabled" : "";
  const multiple = props.multiple ? " multiple" : "";
  const optionsHTML = (node2.options || []).map((opt) => {
    const selected = opt.selected ? " selected" : "";
    return `<option value="${escapeHtml2(opt.value)}"${selected}>${escapeHtml2(opt.label)}</option>`;
  }).join("\n    ");
  const placeholder = props.placeholder;
  const placeholderOption = placeholder ? `<option value="" disabled selected>${escapeHtml2(placeholder)}</option>
    ` : "";
  return `<select class="${classes}"${required}${disabled}${multiple}>
    ${placeholderOption}${optionsHTML}
  </select>`;
}

// packages/core/src/nodes/select/index.ts
var select = {
  type: "select",
  render: { html: renderSelectHTML, react: renderSelectReact, tailwind: renderSelectTailwind }
};

// packages/core/src/nodes/checkbox/html.ts
function renderCheckboxHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses(prefix, "checkbox", props);
  const checked = node2.checked ? " checked" : "";
  const disabled = props.disabled ? " disabled" : "";
  const value = props.value ? ` value="${escapeHtml(props.value)}"` : "";
  let labelHTML = escapeHtml(node2.label || "");
  let nestedHTML = "";
  if (node2.children) {
    const inlineChildren = [];
    const nestedChildren = [];
    for (const child of node2.children) {
      if (child.type === "list") {
        nestedChildren.push(child);
      } else {
        inlineChildren.push(child);
      }
    }
    if (inlineChildren.length > 0) {
      labelHTML = inlineChildren.map((child) => renderNode(child, context)).join("");
    }
    if (nestedChildren.length > 0) {
      nestedHTML = nestedChildren.map((child) => renderNode(child, context)).join("");
    }
  }
  return `<label class="${classes}">
    <input type="checkbox"${checked}${disabled}${value} />
    <span>${labelHTML}</span>
  </label>${nestedHTML}`;
}

// packages/core/src/nodes/checkbox/react.ts
function renderCheckboxReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses2(prefix, "checkbox", props);
  const checked = node2.checked;
  const classAttr = context.useClassName ? "className" : "class";
  const attrs = [];
  if (props.value)
    attrs.push(`value="${escapeJSX(props.value)}"`);
  if (props.disabled)
    attrs.push("disabled");
  const labelJSX = node2.children ? node2.children.map((child) => renderNode2(child, context, 0)).join("") : escapeJSX(node2.label || "");
  return `${indentStr}<label ${classAttr}="${classes}">
${indentStr}  <input type="checkbox"${checked ? " defaultChecked" : ""} ${attrs.join(" ")} />
${indentStr}  <span>${labelJSX}</span>
${indentStr}</label>`;
}

// packages/core/src/nodes/checkbox/tailwind.ts
function renderCheckboxTailwind(node2, context) {
  const props = node2.props;
  const classes = "flex items-center gap-2 cursor-pointer";
  const checked = node2.checked ? " checked" : "";
  const disabled = props.disabled ? " disabled" : "";
  const value = props.value ? ` value="${escapeHtml2(props.value)}"` : "";
  const labelHTML = node2.children ? node2.children.map((child) => renderNode3(child, context)).join("") : escapeHtml2(node2.label || "");
  return `<label class="${classes}">
    <input type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"${checked}${disabled}${value} />
    <span class="text-gray-900">${labelHTML}</span>
  </label>`;
}

// packages/core/src/nodes/checkbox/index.ts
var checkbox = {
  type: "checkbox",
  render: {
    html: renderCheckboxHTML,
    react: renderCheckboxReact,
    tailwind: renderCheckboxTailwind
  }
};

// packages/core/src/nodes/radio/html.ts
function renderRadioHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses(prefix, "radio", props);
  const checked = node2.selected ? " checked" : "";
  const disabled = props.disabled ? " disabled" : "";
  const name = props.name ? ` name="${escapeHtml(props.name)}"` : "";
  const value = props.value ? ` value="${escapeHtml(props.value)}"` : "";
  const labelHTML = escapeHtml(node2.label);
  const childrenHTML = node2.children ? node2.children.map((child) => renderNode(child, context)).join("") : "";
  return `<label class="${classes}">
    <input type="radio"${checked}${disabled}${name}${value} />
    <span>${labelHTML}</span>
  </label>${childrenHTML}`;
}

// packages/core/src/nodes/radio/react.ts
function renderRadioReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const classes = buildClasses2(prefix, "radio", props);
  const checked = node2.selected;
  const classAttr = context.useClassName ? "className" : "class";
  const attrs = [];
  if (props.name)
    attrs.push(`name="${escapeJSX(props.name)}"`);
  if (props.value)
    attrs.push(`value="${escapeJSX(props.value)}"`);
  if (props.disabled)
    attrs.push("disabled");
  return `${indentStr}<label ${classAttr}="${classes}">
${indentStr}  <input type="radio"${checked ? " defaultChecked" : ""} ${attrs.join(" ")} />
${indentStr}  <span>${escapeJSX(node2.label)}</span>
${indentStr}</label>`;
}

// packages/core/src/nodes/radio/tailwind.ts
function renderRadioTailwind(node2, _context) {
  const props = node2.props;
  const classes = "flex items-center gap-2 cursor-pointer";
  const checked = node2.selected ? " checked" : "";
  const disabled = props.disabled ? " disabled" : "";
  const name = props.name ? ` name="${escapeHtml2(props.name)}"` : "";
  const value = props.value ? ` value="${escapeHtml2(props.value)}"` : "";
  return `<label class="${classes}">
    <input type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"${checked}${disabled}${name}${value} />
    <span class="text-gray-900">${escapeHtml2(node2.label)}</span>
  </label>`;
}

// packages/core/src/nodes/radio/index.ts
var radio = {
  type: "radio",
  render: { html: renderRadioHTML, react: renderRadioReact, tailwind: renderRadioTailwind }
};

// packages/core/src/nodes/radio-group/html.ts
function renderRadioGroupHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const isInline = props.inline;
  const classes = buildClasses(prefix, "radio-group", props);
  const inlineClass = isInline ? ` ${prefix}radio-group-inline` : "";
  const groupName = node2.name || nextRadioGroupName3(context);
  const radios = (node2.children || []).map((child) => {
    if (child.type === "radio") {
      const childProps = child.props;
      if (childProps?.name)
        return renderNode(child, context);
      const modifiedChild = {
        ...child,
        props: { ...childProps || {}, name: groupName }
      };
      return renderNode(modifiedChild, context);
    }
    return renderNode(child, context);
  }).join("\n    ");
  return `<div class="${classes}${inlineClass}">
    ${radios}
</div>`;
}

// packages/core/src/nodes/radio-group/react.ts
function renderRadioGroupReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const props = node2.props;
  const isInline = props.inline;
  const classes = buildClasses2(prefix, "radio-group", props);
  const inlineClass = isInline ? ` ${prefix}radio-group-inline` : "";
  const classAttr = context.useClassName ? "className" : "class";
  const groupName = node2.name || nextRadioGroupName(context);
  const radios = (node2.children || []).map((child) => {
    if (child.type === "radio") {
      const childProps = child.props;
      if (childProps?.name)
        return renderNode2(child, context, indent2 + 1);
      const modifiedChild = {
        ...child,
        props: { ...childProps || {}, name: groupName }
      };
      return renderNode2(modifiedChild, context, indent2 + 1);
    }
    return renderNode2(child, context, indent2 + 1);
  }).join("\n");
  return `${indentStr}<div ${classAttr}="${classes}${inlineClass}">
${radios}
${indentStr}</div>`;
}

// packages/core/src/nodes/radio-group/tailwind.ts
function renderRadioGroupTailwind(node2, context) {
  const props = node2.props;
  const isInline = props.inline;
  const classes = isInline ? "flex flex-wrap gap-4" : "flex flex-col gap-2";
  const groupName = node2.name || nextRadioGroupName2(context);
  const radios = (node2.children || []).map((child) => {
    if (child.type === "radio") {
      const childProps = child.props;
      if (childProps?.name)
        return renderNode3(child, context);
      const modifiedChild = {
        ...child,
        props: { ...childProps || {}, name: groupName }
      };
      return renderNode3(modifiedChild, context);
    }
    return renderNode3(child, context);
  }).join("\n    ");
  return `<div class="${classes}">
    ${radios}
</div>`;
}

// packages/core/src/nodes/radio-group/index.ts
var radioGroup = {
  type: "radio-group",
  render: {
    html: renderRadioGroupHTML,
    react: renderRadioGroupReact,
    tailwind: renderRadioGroupTailwind
  }
};

// packages/core/src/nodes/badge/html.ts
function renderBadgeHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "badge", node2.props);
  return `<span class="${classes}">${escapeHtml(node2.content)}</span>`;
}

// packages/core/src/nodes/badge/react.ts
function renderBadgeReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "badge", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  return `${indentStr}<span ${classAttr}="${classes}">${escapeJSX(node2.content)}</span>`;
}

// packages/core/src/nodes/badge/tailwind.ts
function renderBadgeTailwind(node2, _context) {
  const props = node2.props;
  const variant = props.variant;
  const nodeClasses = props.classes || [];
  let classes = "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium";
  if (variant === "primary" || nodeClasses.includes("primary")) {
    classes += " bg-blue-100 text-blue-800";
  } else if (variant === "success" || nodeClasses.includes("success")) {
    classes += " bg-green-100 text-green-800";
  } else if (variant === "warning" || nodeClasses.includes("warning")) {
    classes += " bg-yellow-100 text-yellow-800";
  } else if (variant === "error" || nodeClasses.includes("error")) {
    classes += " bg-red-100 text-red-800";
  } else {
    classes += " bg-gray-100 text-gray-800";
  }
  return `<span class="${classes}">${escapeHtml2(node2.content)}</span>`;
}

// packages/core/src/nodes/badge/index.ts
var badge = {
  type: "badge",
  render: { html: renderBadgeHTML, react: renderBadgeReact, tailwind: renderBadgeTailwind }
};

// packages/core/src/nodes/separator/html.ts
function renderSeparatorHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "separator", node2.props);
  return `<hr class="${classes}" />`;
}

// packages/core/src/nodes/separator/react.ts
function renderSeparatorReact(node2, context, indent2 = 0) {
  const indentStr = repeatString("  ", indent2);
  const { classPrefix: prefix } = context;
  const classes = buildClasses2(prefix, "separator", node2.props);
  const classAttr = context.useClassName ? "className" : "class";
  return `${indentStr}<hr ${classAttr}="${classes}" />`;
}

// packages/core/src/nodes/separator/tailwind.ts
function renderSeparatorTailwind(_node, _context) {
  const classes = "border-t border-gray-300 my-8";
  return `<hr class="${classes}" />`;
}

// packages/core/src/nodes/separator/index.ts
var separator = {
  type: "separator",
  render: {
    html: renderSeparatorHTML,
    react: renderSeparatorReact,
    tailwind: renderSeparatorTailwind
  }
};

// packages/core/src/nodes/comment/html.ts
function renderCommentHTML(node2, context) {
  if (!context.showComments)
    return "";
  if (context._comments != null)
    return "";
  return `<span class="${context.classPrefix}comment">${escapeHtml(node2.text)}</span>`;
}

// packages/core/src/nodes/comment/react.ts
function renderCommentReact(_node, _context, _indent = 0) {
  return "";
}

// packages/core/src/nodes/comment/tailwind.ts
function renderCommentTailwind(_node, _context) {
  return "";
}

// packages/core/src/nodes/comment/index.ts
var comment = {
  type: "comment",
  render: {
    html: renderCommentHTML,
    react: renderCommentReact,
    tailwind: renderCommentTailwind
  }
};

// packages/core/src/nodes/breadcrumbs/html.ts
function renderBreadcrumbsHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const items = node2.children || [];
  const crumbsHTML = items.map((crumb, i) => {
    const isLast = i === items.length - 1;
    const label = escapeHtml(crumb.content || "");
    return isLast ? `<span class="${prefix}breadcrumb-item ${prefix}breadcrumb-current" aria-current="page">${label}</span>` : `<span class="${prefix}breadcrumb-item"><a href="#">${label}</a></span><span class="${prefix}breadcrumb-sep" aria-hidden="true">\u203A</span>`;
  }).join("");
  return `<nav class="${prefix}breadcrumbs"${sourceLine(node2)} aria-label="breadcrumb">${crumbsHTML}</nav>`;
}

// packages/core/src/nodes/breadcrumbs/index.ts
var breadcrumbs = {
  type: "breadcrumbs",
  render: { html: renderBreadcrumbsHTML }
};

// packages/core/src/nodes/tabs/html.ts
function renderTabsHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const classes = buildClasses(prefix, "tabs", node2.props);
  const tabs2 = node2.children || [];
  const renderedPanels = tabs2.map((tab2, i) => {
    const commentsBefore = context._comments?.length ?? 0;
    const panelChildren = renderChildrenList(tab2.children || [], context);
    const hasAnnotations = context.showComments && (context._comments?.length ?? 0) > commentsBefore;
    const hidden = tab2.active ? "" : " hidden";
    return {
      html: `<div class="${prefix}tab-panel" role="tabpanel" data-wmd-tab-panel="${i}"${hidden}>
    ${panelChildren}
  </div>`,
      hasAnnotations
    };
  });
  const headers = tabs2.map((tab2, i) => {
    const activeClass = tab2.active ? ` ${prefix}active` : "";
    const annotatedClass = renderedPanels[i].hasAnnotations ? ` ${prefix}tab-header-annotated` : "";
    return `<button type="button" role="tab" class="${prefix}tab-header${activeClass}${annotatedClass}" data-wmd-tab="${i}">${escapeHtml(tab2.label || "")}</button>`;
  }).join("");
  const panels = renderedPanels.map((r) => r.html).join("\n  ");
  return `<div class="${classes}"${sourceLine(node2)} data-wmd-tabs>
  <div class="${prefix}tab-headers" role="tablist">${headers}</div>
  <div class="${prefix}tab-panels">
  ${panels}
  </div>
</div>${getTabsScript(prefix)}`;
}
function getTabsScript(prefix) {
  return `<script>(function(){if(window.__wmdTabsInit)return;window.__wmdTabsInit=true;document.addEventListener('click',function(e){var btn=e.target.closest('.${prefix}tab-header');if(!btn)return;var root=btn.closest('[data-wmd-tabs]');if(!root)return;var idx=btn.getAttribute('data-wmd-tab');root.querySelectorAll('.${prefix}tab-header').forEach(function(b){b.classList.toggle('${prefix}active',b.getAttribute('data-wmd-tab')===idx);});root.querySelectorAll('[data-wmd-tab-panel]').forEach(function(p){if(p.getAttribute('data-wmd-tab-panel')===idx){p.removeAttribute('hidden');}else{p.setAttribute('hidden','');}});});})();</script>`;
}

// packages/core/src/nodes/tabs/index.ts
var tabs = {
  type: "tabs",
  render: { html: renderTabsHTML }
};

// packages/core/src/nodes/tab/html.ts
function renderTabHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const hidden = node2.active ? "" : " hidden";
  const childrenHTML = (node2.children || []).map((c) => renderNode(c, context)).join("");
  return `<div class="${prefix}tab-panel" role="tabpanel"${hidden}>${childrenHTML}</div>`;
}

// packages/core/src/nodes/tab/index.ts
var tab = {
  type: "tab",
  render: { html: renderTabHTML }
};

// packages/core/src/nodes/demo/html.ts
function renderDemoHTML(node2, context) {
  const { classPrefix: prefix } = context;
  const previewHTML = (node2.children || []).map((child) => renderNode(child, context)).join("\n");
  const codeHTML = escapeHtml(node2.raw || "");
  return `<div class="${prefix}demo">
  <div class="${prefix}demo-preview">${previewHTML}</div>
  <div class="${prefix}demo-code">
    <div class="${prefix}demo-code-toolbar">
      <button class="${prefix}demo-copy" onclick="(function(btn){var code=btn.closest('.${prefix}demo-code').querySelector('code');navigator.clipboard.writeText(code.textContent).then(function(){btn.textContent='Copied!';setTimeout(function(){btn.textContent='Copy'},1500)})})(this)">Copy</button>
    </div>
    <pre><code>${codeHTML}</code></pre>
  </div>
</div>`;
}

// packages/core/src/nodes/demo/index.ts
var demo = {
  type: "demo",
  render: { html: renderDemoHTML }
};

// packages/core/src/nodes/_registry.ts
var registry = {
  button,
  container,
  nav,
  "nav-item": navItem,
  brand,
  grid,
  "grid-item": gridItem,
  row,
  heading: heading2,
  paragraph: paragraph2,
  text: text5,
  image: image2,
  icon,
  link: link2,
  list: list3,
  "list-item": listItem2,
  table,
  "table-header": tableHeader,
  "table-row": tableRow,
  "table-cell": tableCell,
  blockquote: blockquote2,
  code: code3,
  input,
  textarea,
  select,
  checkbox,
  radio,
  "radio-group": radioGroup,
  badge,
  separator,
  comment,
  breadcrumbs,
  tabs,
  tab,
  demo
};
function getNodeDefinition(type) {
  return registry[type];
}

// packages/core/src/renderer/html-renderer.ts
function nextRadioGroupName3(context) {
  if (!context._radioGroupCounter) {
    context._radioGroupCounter = { value: 0 };
  }
  context._radioGroupCounter.value += 1;
  return `radio-group-${context._radioGroupCounter.value}`;
}
function applyRadioGroupName3(children, context) {
  if (!children || children.length === 0)
    return children;
  const hasRadio = children.some((c) => c && c.type === "radio");
  if (!hasRadio)
    return children;
  const name = nextRadioGroupName3(context);
  return children.map((c) => {
    if (!c || c.type !== "radio")
      return c;
    if (c.props && c.props.name)
      return c;
    return { ...c, props: { ...c.props || {}, name } };
  });
}
function renderNode(node2, context) {
  if (node2 == null)
    return "";
  const def = getNodeDefinition(node2.type);
  if (def?.render?.html) {
    return def.render.html(node2, context);
  }
  return `<!-- Unknown node type: ${node2.type} -->`;
}
function renderChildrenList(children, context) {
  const { classPrefix: prefix } = context;
  let result = "";
  const parentNextCommentId = context._nextCommentId ?? null;
  context._nextCommentId = null;
  for (const node2 of children) {
    if (node2.type === "comment") {
      if (context.showComments && context._comments != null) {
        const text6 = node2.text;
        if (context._nextCommentId != null) {
          const thread = context._comments.find((c) => c.id === context._nextCommentId);
          if (thread)
            thread.texts.push(text6);
        } else {
          const id = context._comments.length + 1;
          context._comments.push({ id, texts: [text6] });
          context._nextCommentId = id;
        }
      }
      continue;
    }
    const html2 = renderNode(node2, context);
    if (context.showComments && context._comments != null && context._nextCommentId != null) {
      const id = context._nextCommentId;
      context._nextCommentId = null;
      result += `<div class="${prefix}annotated" id="wmd-ann-${id}"><span class="${prefix}comment-badge">${id}</span>${html2}</div>
`;
    } else {
      result += html2 + "\n";
    }
  }
  context._nextCommentId = parentNextCommentId;
  return result.trim();
}
function renderCommentsPanel(comments, prefix) {
  const items = comments.map((c) => {
    const messages = c.texts.map((text6, i) => {
      const divider = i < c.texts.length - 1 ? `<div class="${prefix}comment-msg-divider"></div>` : "";
      return `<div class="${prefix}comment-msg">${escapeHtml(text6)}</div>${divider}`;
    }).join("");
    return `<div class="${prefix}comment-card"><div class="${prefix}comment-card-badge">${c.id}</div><div class="${prefix}comment-card-body">${messages}</div></div>`;
  }).join("\n  ");
  return `<aside class="${prefix}comments-panel">
  <div class="${prefix}comments-panel-header">
    <span>\u{1F4AC} Comments</span>
    <span class="${prefix}comments-panel-count">${comments.length}</span>
  </div>
  ${items}
</aside>`;
}
function sourceLine(node2) {
  const line = node2?.position?.start?.line;
  return line != null ? ` data-source-line="${line}"` : "";
}
function buildClasses(prefix, baseClass, props) {
  const classes = [`${prefix}${baseClass}`];
  if (props.classes && Array.isArray(props.classes)) {
    props.classes.forEach((cls) => {
      classes.push(`${prefix}${cls}`);
    });
  }
  if (props.variant) {
    classes.push(`${prefix}${baseClass}-${props.variant}`);
  }
  if (props.state) {
    classes.push(`${prefix}state-${props.state}`);
  }
  return classes.join(" ");
}
function escapeHtml(text6) {
  if (!text6)
    return "";
  return text6.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// packages/core/src/renderer/styles/_structural.ts
function getStructuralCSS(prefix) {
  const linkButtonReset = `a.${prefix}button { text-decoration: none; color: inherit; }
`;
  const tabsStructural = `
.${prefix}tab-headers { display: flex; gap: 0; border-bottom: 2px solid #e0e0e0; margin-bottom: 12px; }
.${prefix}tab-header { display: inline-block; padding: 8px 16px; border: none; border-bottom: 2px solid transparent; margin-bottom: -2px; font-size: 14px; font-weight: 500; color: #888; background: transparent; cursor: pointer; font-family: inherit; transition: color 0.15s; }
.${prefix}tab-header:hover { color: #333; }
.${prefix}tab-header.${prefix}active { border-bottom-color: currentColor; color: #333; font-weight: 600; }
.${prefix}tab-panel[hidden] { display: none; }
.${prefix}tab-panels { padding: 12px 0; }
`;
  const rowStructural = `
.${prefix}row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.${prefix}row > .${prefix}grid-item { flex: 0 1 auto; min-width: 0; }
.${prefix}row.${prefix}right { justify-content: flex-end; }
.${prefix}row.${prefix}center { justify-content: center; }
.${prefix}align-left { margin-right: auto; }
.${prefix}align-right { margin-left: auto; }
.${prefix}align-center { margin: auto; }
.${prefix}container-button-group > .${prefix}input,
.${prefix}container-button-group > .${prefix}select,
.${prefix}row > .${prefix}grid-item > .${prefix}input,
.${prefix}row > .${prefix}grid-item > .${prefix}select { display: inline-block; width: auto; }
`;
  const demoStructural = `
.${prefix}demo { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #d0d0d0; border-radius: 6px; overflow: hidden; margin: 1rem 0; }
.${prefix}demo-preview { padding: 1.5rem; border-right: 1px solid #d0d0d0; }
.${prefix}demo-code { background: #f6f8fa; overflow: auto; display: flex; flex-direction: column; }
.${prefix}demo-code-toolbar { display: flex; justify-content: flex-end; padding: 0.5rem 0.75rem 0; }
.${prefix}demo-copy { background: none; border: 1px solid #ccc; border-radius: 4px; padding: 2px 8px; font-size: 0.75em; color: #666; cursor: pointer; font-family: inherit; }
.${prefix}demo-copy:hover { background: #e8e8e8; color: #333; }
.${prefix}demo-code pre { margin: 0; padding: 0.75rem 1.5rem 1.25rem; font-size: 0.8em; font-family: 'Courier New', Courier, monospace; line-height: 1.6; white-space: pre; }
.${prefix}demo-code code { display: block; color: #444; }
`;
  const commentStructural = `
.${prefix}comment {
  display: block;
  background: #fffde7;
  border: 1px solid #f9a825;
  border-left: 4px solid #f9a825;
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 0.82em;
  color: #5d4037;
  font-style: italic;
  margin-bottom: 6px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.4;
  white-space: pre-wrap;
}
.${prefix}comment::before { content: '\u{1F4AC} '; font-style: normal; }
`;
  const commentPanelStructural = `
.${prefix}annotated { position: relative; outline: 2px solid #f9a825; outline-offset: 3px; border-radius: 3px; }
.${prefix}tab-header-annotated { position: relative; }
.${prefix}tab-header-annotated::after {
  content: ''; position: absolute; top: 4px; right: 4px;
  width: 7px; height: 7px; background: #f9a825; border-radius: 50%;
  pointer-events: none;
}
.${prefix}comment-badge {
  position: absolute; top: -10px; right: -10px;
  width: 20px; height: 20px; background: #f9a825; color: #fff;
  border-radius: 50%; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  z-index: 10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1; box-shadow: 0 1px 4px rgba(0,0,0,0.25); cursor: default;
}
/* body.wmd-root is (0,1,1); use two classes + element (0,2,1) to win regardless of order */
body.${prefix}root.${prefix}has-comments { padding-right: 276px; }
.${prefix}comments-panel {
  position: fixed; top: 0; right: 0; width: 260px; height: 100vh;
  overflow-y: auto; background: #fff; border-left: 1px solid #e0e0e0;
  box-shadow: -2px 0 12px rgba(0,0,0,0.08); padding: 16px 14px;
  z-index: 200; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  box-sizing: border-box;
}
.${prefix}comments-panel-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 14px; font-weight: 600; font-size: 0.82em; color: #333;
  border-bottom: 1px solid #f0f0f0; padding-bottom: 10px;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.${prefix}comments-panel-count {
  background: #f9a825; color: #fff; border-radius: 10px;
  padding: 1px 7px; font-size: 11px; font-weight: 700;
  letter-spacing: 0; text-transform: none;
}
.${prefix}comment-card {
  display: flex; gap: 10px; margin-bottom: 10px; padding: 10px;
  background: #fffde7; border: 1px solid #f9a825; border-radius: 6px;
}
.${prefix}comment-card-badge {
  flex-shrink: 0; width: 20px; height: 20px; background: #f9a825; color: #fff;
  border-radius: 50%; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1; margin-top: 2px;
}
.${prefix}comment-card-body { display: flex; flex-direction: column; min-width: 0; }
.${prefix}comment-msg { font-size: 0.82em; color: #5d4037; line-height: 1.45; font-style: italic; }
.${prefix}comment-msg-divider { height: 1px; background: #f0c040; margin: 6px 0; opacity: 0.6; }
`;
  return linkButtonReset + tabsStructural + rowStructural + demoStructural + commentStructural + commentPanelStructural;
}

// packages/core/src/renderer/styles/sketch.ts
function getSketchStyle(prefix) {
  return `
/* wiremd Sketch Style - Balsamiq-inspired hand-drawn mockups */
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body.${prefix}root {
  font-family: 'Kalam', 'Comic Sans MS', 'Marker Felt', 'Chalkboard', cursive, sans-serif;
  background-color: #fafafa;
  background-image: radial-gradient(circle, #c8c8c8 1px, transparent 1px);
  background-size: 20px 20px;
  color: #333;
  padding: 20px;
  margin: 0;
  line-height: 1.6;
}

/* Headings */
.${prefix}h1, .${prefix}h2, .${prefix}h3, .${prefix}h4, .${prefix}h5, .${prefix}h6 {
  font-weight: bold;
  margin: 1em 0 0.5em;
  line-height: 1.3;
}

.${prefix}h1 { font-size: 2em; text-decoration: underline; }
.${prefix}h2 { font-size: 1.75em; }
.${prefix}h3 { font-size: 1.5em; }
.${prefix}h4 { font-size: 1.25em; }
.${prefix}h5 { font-size: 1.1em; }
.${prefix}h6 { font-size: 1em; }

/* Paragraph */
.${prefix}paragraph {
  margin: 0.5em 0;
}

/* Buttons */
.${prefix}button {
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
  transform: rotate(-0.5deg);
  transition: all 0.1s;
}

.${prefix}button:hover {
  transform: rotate(-0.5deg) translateY(-2px);
  box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
}

.${prefix}button-primary, .${prefix}button.${prefix}primary {
  background: #87CEEB;
  border-color: #4682B4;
}

.${prefix}button-secondary, .${prefix}button.${prefix}secondary {
  background: #DDD;
  border-color: #999;
}

.${prefix}button-danger, .${prefix}button.${prefix}danger {
  background: #FFB6C1;
  border-color: #DC143C;
}

.${prefix}button[disabled], .${prefix}button.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.${prefix}button.${prefix}loading::after {
  content: '...';
  animation: loading 1s infinite;
}

/* Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 2px 10px;
  margin: 0 2px;
  border: 2px solid #000;
  border-radius: 12px;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  background: #f0f0f0;
  transform: rotate(-0.3deg);
}
.${prefix}badge-primary { background: #87CEEB; border-color: #4682B4; }
.${prefix}badge-success { background: #90EE90; border-color: #228B22; }
.${prefix}badge-warning { background: #FFE4B5; border-color: #DAA520; }
.${prefix}badge-error { background: #FFB6C1; border-color: #DC143C; }

/* Inputs */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 8px 12px;
  margin: 4px 0;
  font-family: inherit;
  font-size: 14px;
  background: #fff;
  border: 2px solid #666;
  border-radius: 4px;
  transform: rotate(0.3deg);
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: 2px solid #4682B4;
  outline-offset: 2px;
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f5f5f5;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 80px;
}

/* Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  cursor: pointer;
  user-select: none;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  font-size: 1.2em;
  line-height: 1;
  vertical-align: middle;
  margin: 0 0.2em;
}

/* Containers */
.${prefix}container-hero, .${prefix}container-card, .${prefix}container-modal {
  background: #fff;
  border: 3px solid #000;
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.15);
  transform: rotate(-0.3deg);
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE6CC 100%);
  text-align: center;
  padding: 48px 24px;
}

.${prefix}container-modal {
  position: relative;
  max-width: 500px;
  margin: 32px auto;
  border-width: 4px;
}

/* Radio Groups */
.${prefix}radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0;
}

.${prefix}radio-group-inline {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}

.${prefix}radio-group-inline .${prefix}radio {
  margin: 0;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  font-size: 1.2em;
  line-height: 1;
  vertical-align: middle;
  margin: 0 0.2em;
}

/* Navigation */
.${prefix}nav {
  background: #87CEEB;
  border: 3px solid #4682B4;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.${prefix}brand {
  font-weight: bold;
  font-size: 1.2em;
  margin-right: auto;
}

.${prefix}nav-item {
  display: inline-block;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 14px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 6px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.15);
  transform: rotate(0.3deg);
  transition: all 0.1s;
}

.${prefix}nav-item:hover {
  transform: rotate(0.3deg) translateY(-1px);
  box-shadow: 2px 3px 0 rgba(0,0,0,0.15);
  background: #f8f8f8;
}

.${prefix}nav-item.${prefix}active {
  background: #000;
  color: #fff;
  border-color: #000;
  transform: rotate(0.3deg);
}

.${prefix}nav .${prefix}button {
  margin: 0;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.9em;
}

.${prefix}breadcrumb-item a {
  color: #4682B4;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.${prefix}breadcrumb-current {
  font-weight: bold;
  color: #222;
}

.${prefix}breadcrumb-sep {
  color: #888;
  font-size: 1.1em;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #f0f8ff;
  border: 2px solid #4682B4;
  border-radius: 8px;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
}
.${prefix}container-sidebar .${prefix}button {
  display: block;
  width: 100%;
  text-align: left;
  margin: 0;
}
.${prefix}container-sidebar .${prefix}h4 {
  margin: 12px 0 4px;
  font-size: 0.85em;
  opacity: 0.6;
  text-transform: uppercase;
}
.${prefix}container-sidebar .${prefix}separator {
  margin: 8px 0;
}

/* Layout: sidebar-main */
.${prefix}container-layout.${prefix}sidebar-main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: start;
}
.${prefix}layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.${prefix}layout-sidebar .${prefix}container-sidebar { width: 100%; }
.${prefix}layout-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 2px 0; }
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main {
  min-width: 0;
}

/* Grid */
.${prefix}grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
  gap: 24px;
  margin: 24px 0;
  align-items: center;
}

.${prefix}grid-2 { grid-template-columns: repeat(2, 1fr); }
.${prefix}grid-3 { grid-template-columns: repeat(3, 1fr); }
.${prefix}grid-4 { grid-template-columns: repeat(4, 1fr); }

.${prefix}grid-item { min-width: 0; }

.${prefix}col-span-1 { grid-column: span 1; }
.${prefix}col-span-2 { grid-column: span 2; }
.${prefix}col-span-3 { grid-column: span 3; }
.${prefix}col-span-4 { grid-column: span 4; }

.${prefix}grid-item-card {
  background: #fff;
  border: 2px solid #666;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
  transform: rotate(0.5deg);
}
.${prefix}grid-item-card:nth-child(even) { transform: rotate(-0.5deg); }

/* Lists */
.${prefix}list {
  margin: 12px 0;
  padding-left: 24px;
}

.${prefix}list-item {
  margin: 4px 0;
}

/* Blockquote */
.${prefix}blockquote {
  border-left: 4px solid #666;
  padding-left: 16px;
  margin: 16px 0;
  font-style: italic;
  color: #555;
}

/* Code */
.${prefix}code-inline {
  background: #FFF3CD;
  border: 1px solid #FFC107;
  border-radius: 3px;
  padding: 2px 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.${prefix}code-block {
  background: #FFF3CD;
  border: 2px solid #FFC107;
  border-radius: 6px;
  padding: 12px;
  margin: 12px 0;
  overflow-x: auto;
}

.${prefix}code-block code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

/* Separator */
.${prefix}separator {
  border: none;
  border-top: 3px dashed #666;
  margin: 24px 0;
}

/* Table */
.${prefix}table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 3px solid #000;
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.${prefix}table th, .${prefix}table td {
  border: 2px solid #666;
  padding: 8px 12px;
  text-align: left;
}

.${prefix}table th {
  background: #DDD;
  font-weight: bold;
}

/* Table cell alignment - more specific to override th/td defaults */
.${prefix}table .${prefix}align-left {
  text-align: left !important;
}

.${prefix}table .${prefix}align-center {
  text-align: center !important;
}

.${prefix}table .${prefix}align-right {
  text-align: right !important;
}

/* State Containers */
.${prefix}container-loading-state {
  background: #fff;
  border: 2px solid #87CEEB;
  border-radius: 8px;
  padding: 32px;
  margin: 16px 0;
  text-align: center;
  position: relative;
}

.${prefix}container-loading-state::before {
  content: '\u27F3';
  display: block;
  font-size: 48px;
  margin-bottom: 16px;
  animation: spin 1.5s linear infinite;
  transform-origin: center;
}

.${prefix}container-empty-state {
  background: #f5f5f5;
  border: 2px dashed #999;
  border-radius: 8px;
  padding: 48px 32px;
  margin: 16px 0;
  text-align: center;
  color: #666;
}

.${prefix}container-empty-state::before {
  content: '\u{1F4ED}';
  display: block;
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.${prefix}container-error-state {
  background: #FFE6E6;
  border: 3px solid #DC143C;
  border-radius: 8px;
  padding: 32px;
  margin: 16px 0;
  text-align: center;
}

.${prefix}container-error-state::before {
  content: '\u26A0\uFE0F';
  display: block;
  font-size: 48px;
  margin-bottom: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .${prefix}grid {
    grid-template-columns: 1fr !important;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }

  .${prefix}nav-content {
    flex-direction: column;
    align-items: stretch;
  }

  .${prefix}brand {
    margin-right: 0;
  }
}

@keyframes loading {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Tabs */
.${prefix}tabs { margin: 12px 0; }
.${prefix}tab-headers { border-bottom-color: #666; }
.${prefix}tab-header { color: #666; }
.${prefix}tab-header:hover { color: #000; }
.${prefix}tab-header.${prefix}active { border-bottom-color: #000; color: #000; }
`;
}

// packages/core/src/renderer/styles/clean.ts
function getCleanStyle(prefix) {
  return `
/* wiremd Clean Style - Minimal modern wireframes */
* {
  box-sizing: border-box;
}

body.${prefix}root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #ffffff;
  color: #1a1a1a;
  padding: 40px;
  margin: 0;
  line-height: 1.6;
}

/* Headings */
.${prefix}h1, .${prefix}h2, .${prefix}h3, .${prefix}h4, .${prefix}h5, .${prefix}h6 {
  font-weight: 600;
  margin: 1.5em 0 0.75em;
  color: #000;
  letter-spacing: -0.02em;
}

.${prefix}h1 { font-size: 2.5em; border-bottom: 2px solid #e0e0e0; padding-bottom: 0.3em; }
.${prefix}h2 { font-size: 2em; }
.${prefix}h3 { font-size: 1.5em; }
.${prefix}h4 { font-size: 1.25em; }
.${prefix}h5 { font-size: 1.1em; }
.${prefix}h6 { font-size: 1em; }

/* Paragraph */
.${prefix}paragraph {
  margin: 0.75em 0;
  color: #4a4a4a;
}

/* Buttons */
.${prefix}button {
  display: inline-block;
  padding: 10px 20px;
  margin: 6px;
  background: #f5f5f5;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.${prefix}button:hover {
  background: #e8e8e8;
  border-color: #b0b0b0;
}

.${prefix}button-primary, .${prefix}button.${prefix}primary {
  background: #0066cc;
  color: #fff;
  border-color: #0052a3;
}

.${prefix}button-primary:hover, .${prefix}button.${prefix}primary:hover {
  background: #0052a3;
}

.${prefix}button-secondary, .${prefix}button.${prefix}secondary {
  background: #fff;
  border: 2px solid #d0d0d0;
}

.${prefix}button-danger, .${prefix}button.${prefix}danger {
  background: #dc3545;
  color: #fff;
  border-color: #c82333;
}

.${prefix}button[disabled], .${prefix}button.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: #e5e7eb;
  color: #374151;
}
.${prefix}badge-primary { background: #dbeafe; color: #1d4ed8; }
.${prefix}badge-success { background: #d1fae5; color: #065f46; }
.${prefix}badge-warning { background: #fef3c7; color: #92400e; }
.${prefix}badge-error { background: #fee2e2; color: #991b1b; }

/* Inputs */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 10px 12px;
  margin: 6px 0;
  font-family: inherit;
  font-size: 14px;
  background: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f5f5f5;
  border-color: #e0e0e0;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 100px;
}

/* Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0;
  cursor: pointer;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  margin: 0 4px;
  vertical-align: middle;
  color: #666;
}


/* Containers */
.${prefix}container-hero, .${prefix}container-card, .${prefix}container-modal {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 32px;
  margin: 24px 0;
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  text-align: center;
  padding: 60px 32px;
}

.${prefix}container-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.${prefix}container-modal {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

/* Radio Groups */
.${prefix}radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px 0;
}

.${prefix}radio-group-inline {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.${prefix}radio-group-inline .${prefix}radio {
  margin: 0;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  font-size: 1.1em;
  line-height: 1;
  vertical-align: middle;
  margin: 0 0.25em;
}

/* Navigation */
.${prefix}nav {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px 24px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.${prefix}brand {
  font-weight: 600;
  font-size: 1.25em;
  margin-right: auto;
}

.${prefix}nav-item {
  display: inline-block;
  color: #4a4a4a;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  transition: all 0.2s;
}

.${prefix}nav-item:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.${prefix}nav-item.${prefix}active {
  background: #343a40;
  color: #fff;
  border-color: #343a40;
  pointer-events: none;
  cursor: default;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.9em;
}

.${prefix}breadcrumb-item a {
  color: #495057;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.${prefix}breadcrumb-current {
  font-weight: 600;
  color: #212529;
}

.${prefix}breadcrumb-sep {
  color: #adb5bd;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #f0f8ff;
  border: 2px solid #4682B4;
  border-radius: 8px;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}container-sidebar .${prefix}separator { margin: 8px 0; }

/* Layout: sidebar-main */
.${prefix}container-layout.${prefix}sidebar-main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: start;
}
.${prefix}layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.${prefix}layout-sidebar .${prefix}container-sidebar { width: 100%; }
.${prefix}layout-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 2px 0; }
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }

/* Grid */
.${prefix}grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
  gap: 24px;
  margin: 32px 0;
  align-items: center;
}

.${prefix}grid-item { min-width: 0; }

.${prefix}col-span-1 { grid-column: span 1; }
.${prefix}col-span-2 { grid-column: span 2; }
.${prefix}col-span-3 { grid-column: span 3; }
.${prefix}col-span-4 { grid-column: span 4; }
.${prefix}col-span-5 { grid-column: span 5; }
.${prefix}col-span-6 { grid-column: span 6; }
.${prefix}col-span-7 { grid-column: span 7; }
.${prefix}col-span-8 { grid-column: span 8; }
.${prefix}col-span-9 { grid-column: span 9; }
.${prefix}col-span-10 { grid-column: span 10; }
.${prefix}col-span-11 { grid-column: span 11; }
.${prefix}col-span-12 { grid-column: span 12; }

.${prefix}grid-item-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
  transition: box-shadow 0.2s;
}
.${prefix}grid-item-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Lists */
.${prefix}list {
  margin: 16px 0;
  padding-left: 28px;
}

.${prefix}list-item {
  margin: 6px 0;
}

/* Blockquote */
.${prefix}blockquote {
  border-left: 3px solid #0066cc;
  padding-left: 20px;
  margin: 20px 0;
  color: #4a4a4a;
}

/* Code */
.${prefix}code-inline {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  padding: 2px 6px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 0.9em;
  color: #d63384;
}

.${prefix}code-block {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
  overflow-x: auto;
}

.${prefix}code-block code {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 0.9em;
  color: #1a1a1a;
}

/* Separator */
.${prefix}separator {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 32px 0;
}

/* State Containers */
.${prefix}container-loading-state {
  background: #f5f7fa;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 40px;
  margin: 24px 0;
  text-align: center;
  position: relative;
}

.${prefix}container-loading-state::before {
  content: '';
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 auto 20px;
  border: 3px solid #e0e0e0;
  border-top-color: #0066cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.${prefix}container-empty-state {
  background: #fafafa;
  border: 1px dashed #d0d0d0;
  border-radius: 8px;
  padding: 60px 40px;
  margin: 24px 0;
  text-align: center;
  color: #888;
}

.${prefix}container-empty-state::before {
  content: '\u{1F4ED}';
  display: block;
  font-size: 72px;
  margin-bottom: 20px;
  opacity: 0.4;
  filter: grayscale(30%);
}

.${prefix}container-error-state {
  background: #fff5f5;
  border: 1px solid #dc3545;
  border-radius: 8px;
  padding: 40px;
  margin: 24px 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);
}

.${prefix}container-error-state::before {
  content: '\u26A0\uFE0F';
  display: block;
  font-size: 48px;
  margin-bottom: 20px;
}

/* Required input indicator */
.${prefix}input[required], .${prefix}textarea[required], .${prefix}select[required] {
  border-left: 2px solid #f59e0b;
}

/* Table-cell alignment (scoped so flex margin: auto rules don't apply) */
td.${prefix}align-left, th.${prefix}align-left { text-align: left; }
td.${prefix}align-center, th.${prefix}align-center { text-align: center; }
td.${prefix}align-right, th.${prefix}align-right { text-align: right; }

/* Alert containers */
.${prefix}container-alert {
  border-left: 3px solid #3b82f6;
  background: #eff6ff;
  padding: 12px 16px;
  border-radius: 4px;
  margin: 16px 0;
  color: #1e3a8a;
}
.${prefix}container-alert.${prefix}success {
  border-left-color: #10b981;
  background: #d1fae5;
  color: #065f46;
}
.${prefix}container-alert.${prefix}warning {
  border-left-color: #f59e0b;
  background: #fef3c7;
  color: #92400e;
}
.${prefix}container-alert.${prefix}error {
  border-left-color: #ef4444;
  background: #fee2e2;
  color: #991b1b;
}

/* Button size variants */
.${prefix}button.${prefix}small { padding: 4px 10px; font-size: 0.875rem; }
.${prefix}button.${prefix}large { padding: 12px 24px; font-size: 1.125rem; }

/* Error state on inputs and other elements */
.${prefix}state-error {
  border-color: #ef4444;
  color: #b91c1c;
}

/* Responsive */
@media (max-width: 768px) {
  body.${prefix}root {
    padding: 20px;
  }

  .${prefix}grid {
    grid-template-columns: 1fr !important;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }

  .${prefix}nav-content {
    flex-direction: column;
    align-items: stretch;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}

// packages/core/src/renderer/styles/wireframe.ts
function getWireframeStyle(prefix) {
  return `
/* wiremd Wireframe Style - Traditional grayscale wireframes */
* {
  box-sizing: border-box;
}

body.${prefix}root {
  font-family: Arial, Helvetica, sans-serif;
  background: #f0f0f0;
  color: #000;
  padding: 30px;
  margin: 0;
  line-height: 1.5;
}

/* Headings */
.${prefix}h1, .${prefix}h2, .${prefix}h3, .${prefix}h4, .${prefix}h5, .${prefix}h6 {
  font-weight: bold;
  margin: 1.2em 0 0.6em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.${prefix}h1 { font-size: 2em; }
.${prefix}h2 { font-size: 1.75em; }
.${prefix}h3 { font-size: 1.5em; }
.${prefix}h4 { font-size: 1.25em; }
.${prefix}h5 { font-size: 1.1em; }
.${prefix}h6 { font-size: 1em; }

/* Paragraph */
.${prefix}paragraph {
  margin: 0.6em 0;
}

/* Buttons */
.${prefix}button {
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  background: repeating-linear-gradient(
    45deg,
    #ddd,
    #ddd 10px,
    #ccc 10px,
    #ccc 20px
  );
  border: 2px solid #000;
  border-radius: 0;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.${prefix}button-primary, .${prefix}button.${prefix}primary {
  background: repeating-linear-gradient(
    45deg,
    #888,
    #888 10px,
    #777 10px,
    #777 20px
  );
  color: #fff;
}

.${prefix}button-secondary, .${prefix}button.${prefix}secondary {
  background: #fff;
}

.${prefix}button-danger, .${prefix}button.${prefix}danger {
  background: repeating-linear-gradient(
    45deg,
    #666,
    #666 10px,
    #555 10px,
    #555 20px
  );
  color: #fff;
}

.${prefix}button[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 1px 8px;
  margin: 0 2px;
  border: 1px solid #666;
  border-radius: 10px;
  font-size: 11px;
  font-weight: bold;
  background: #e0e0e0;
  color: #333;
}
.${prefix}badge-primary { background: #c8d8e8; border-color: #4a6a8a; }
.${prefix}badge-success { background: #c8e8c8; border-color: #4a7a4a; }
.${prefix}badge-warning { background: #e8e0c0; border-color: #8a7a40; }
.${prefix}badge-error { background: #e8c8c8; border-color: #8a4a4a; }

/* Inputs */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 6px 10px;
  margin: 4px 0;
  font-family: inherit;
  font-size: 13px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 0;
}

.${prefix}input::placeholder, .${prefix}textarea::placeholder {
  color: #999;
  font-style: italic;
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f0f0f0;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 80px;
}

/* Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  cursor: pointer;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  cursor: pointer;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  font-size: 1em;
  line-height: 1;
  margin: 0 4px;
  vertical-align: middle;
}

/* Containers */
.${prefix}container-hero, .${prefix}container-card, .${prefix}container-modal {
  background: #fff;
  border: 3px solid #000;
  padding: 24px;
  margin: 16px 0;
}

.${prefix}container-hero {
  background: repeating-linear-gradient(
    0deg,
    #fafafa,
    #fafafa 2px,
    #fff 2px,
    #fff 4px
  );
  text-align: center;
  padding: 48px 24px;
}

.${prefix}container-modal {
  max-width: 500px;
  margin: 32px auto;
  border-width: 4px;
}

/* Navigation */
.${prefix}nav {
  background: repeating-linear-gradient(
    90deg,
    #e0e0e0,
    #e0e0e0 2px,
    #d0d0d0 2px,
    #d0d0d0 4px
  );
  border: 2px solid #000;
  padding: 12px 16px;
  margin: 16px 0;
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.${prefix}brand {
  font-weight: bold;
  font-size: 1.1em;
  text-transform: uppercase;
  margin-right: auto;
}

.${prefix}nav-item {
  display: inline-block;
  color: #000;
  text-decoration: none;
  font-weight: normal;
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #666;
  border-radius: 3px;
}

.${prefix}nav-item:hover {
  background: #f5f5f5;
  border-color: #000;
}

.${prefix}nav-item.${prefix}active {
  background: #000;
  color: #fff;
  border-color: #000;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.9em;
}

.${prefix}breadcrumb-item a {
  color: #555;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.${prefix}breadcrumb-current {
  font-weight: bold;
  color: #000;
}

.${prefix}breadcrumb-sep {
  color: #999;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #f5f5f5;
  border: 1px solid #aaa;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}container-sidebar .${prefix}separator { margin: 8px 0; }

/* Layout: sidebar-main */
.${prefix}container-layout.${prefix}sidebar-main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: start;
}
.${prefix}layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.${prefix}layout-sidebar .${prefix}container-sidebar { width: 100%; }
.${prefix}layout-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 2px 0; }
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }

/* Grid */
.${prefix}grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}

.${prefix}grid-item { min-width: 0; }

.${prefix}col-span-1 { grid-column: span 1; }
.${prefix}col-span-2 { grid-column: span 2; }
.${prefix}col-span-3 { grid-column: span 3; }
.${prefix}col-span-4 { grid-column: span 4; }

.${prefix}grid-item-card {
  background: #fff;
  border: 2px solid #000;
  padding: 16px;
}

/* Lists */
.${prefix}list {
  margin: 12px 0;
  padding-left: 24px;
}

.${prefix}list-item {
  margin: 4px 0;
}

/* Blockquote */
.${prefix}blockquote {
  border-left: 4px solid #000;
  padding-left: 16px;
  margin: 16px 0;
  background: #f5f5f5;
  padding: 12px 16px;
}

/* Code */
.${prefix}code-inline {
  background: #e0e0e0;
  border: 1px solid #000;
  padding: 2px 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.${prefix}code-block {
  background: #f0f0f0;
  border: 2px solid #000;
  padding: 12px;
  margin: 12px 0;
  overflow-x: auto;
}

.${prefix}code-block code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

/* Separator */
.${prefix}separator {
  border: none;
  border-top: 2px solid #000;
  margin: 24px 0;
}

/* State Containers */
.${prefix}container-loading-state {
  background: repeating-linear-gradient(
    0deg,
    #fff,
    #fff 2px,
    #f5f5f5 2px,
    #f5f5f5 4px
  );
  border: 2px solid #000;
  padding: 40px;
  margin: 16px 0;
  text-align: center;
  position: relative;
}

.${prefix}container-loading-state::before {
  content: '\u27F3';
  display: block;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  animation: spin 2s linear infinite;
}

.${prefix}container-empty-state {
  background: #fff;
  border: 2px dashed #666;
  padding: 60px 40px;
  margin: 16px 0;
  text-align: center;
  color: #666;
}

.${prefix}container-empty-state::before {
  content: '[EMPTY]';
  display: block;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  color: #999;
}

.${prefix}container-error-state {
  background: repeating-linear-gradient(
    45deg,
    #fff,
    #fff 10px,
    #f0f0f0 10px,
    #f0f0f0 20px
  );
  border: 3px solid #000;
  padding: 40px;
  margin: 16px 0;
  text-align: center;
}

.${prefix}container-error-state::before {
  content: '\u26A0';
  display: block;
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #000;
}

/* Responsive */
@media (max-width: 768px) {
  .${prefix}grid {
    grid-template-columns: 1fr !important;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}

// packages/core/src/renderer/styles/none.ts
function getNoneStyle(prefix) {
  return `
/* wiremd None Style - Minimal semantic styling */
* {
  box-sizing: border-box;
}

body.${prefix}root {
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

.${prefix}button {
  padding: 8px 16px;
  margin: 4px;
}

.${prefix}badge {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 2px;
  border-radius: 10px;
  font-size: 12px;
  background: #e0e0e0;
}
.${prefix}badge-primary { background: #c0d8f0; }
.${prefix}badge-success { background: #c0e8c0; }
.${prefix}badge-warning { background: #f0e0c0; }
.${prefix}badge-error { background: #f0c0c0; }

.${prefix}input, .${prefix}textarea, .${prefix}select {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 8px;
  margin: 4px 0;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.9em;
}

.${prefix}breadcrumb-item a {
  color: inherit;
  text-decoration: underline;
}

.${prefix}breadcrumb-current {
  font-weight: bold;
}

.${prefix}breadcrumb-sep {
  color: #999;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 8px;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 8px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}container-sidebar .${prefix}separator { margin: 4px 0; }

/* Layout: sidebar-main */
.${prefix}container-layout.${prefix}sidebar-main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: start;
}
.${prefix}layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.${prefix}layout-sidebar .${prefix}container-sidebar { width: 100%; }
.${prefix}layout-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 2px 0; }
.${prefix}layout-sidebar .${prefix}h4 { margin: 8px 0 4px; font-size: 0.85em; opacity: 0.6; text-transform: uppercase; }
.${prefix}layout-sidebar .${prefix}separator { margin: 4px 0; }
.${prefix}layout-main { min-width: 0; }

.${prefix}grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}

.${prefix}nav-content {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.${prefix}brand {
  margin-right: auto;
  font-weight: bold;
}

/* State Containers */
.${prefix}container-loading-state,
.${prefix}container-empty-state,
.${prefix}container-error-state {
  padding: 40px;
  margin: 20px 0;
  text-align: center;
}

@media (max-width: 768px) {
  .${prefix}grid {
    grid-template-columns: 1fr !important;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }
}
`;
}

// packages/core/src/renderer/styles/tailwind.ts
function getTailwindStyle(prefix) {
  return `
/* Tailwind-Inspired Style */
body {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #f9fafb;
  color: #111827;
  line-height: 1.5;
  margin: 0;
  padding: 20px;
}

/* Typography */
.${prefix}h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1rem 0;
  letter-spacing: -0.025em;
}

.${prefix}h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 1.5rem 0 1rem 0;
  letter-spacing: -0.025em;
}

.${prefix}h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 1.25rem 0 0.75rem 0;
}

.${prefix}h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4b5563;
  margin: 1rem 0 0.5rem 0;
}

.${prefix}paragraph {
  color: #6b7280;
  margin: 0.75rem 0;
  font-size: 1rem;
}

/* Buttons */
.${prefix}button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.15s ease;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  background: #e5e7eb;
  color: #374151;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.${prefix}button:hover {
  background: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.${prefix}button-primary, .${prefix}button.${prefix}button-primary {
  background: #6366f1;
  color: white;
}

.${prefix}button-primary:hover, .${prefix}button.${prefix}button-primary:hover {
  background: #4f46e5;
}

.${prefix}button:disabled, .${prefix}button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Button States */
.${prefix}state-loading {
  background: #e0e7ff !important;
  color: #6366f1 !important;
  position: relative;
  padding-left: 2.5rem;
}

.${prefix}state-loading::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid #6366f1;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.${prefix}state-error {
  background: #fef2f2 !important;
  color: #ef4444 !important;
  border: 1px solid #fca5a5;
}

.${prefix}state-success {
  background: #f0fdf4 !important;
  color: #22c55e !important;
  border: 1px solid #86efac;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

/* Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 0.125rem 0.625rem;
  margin: 0 0.125rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: #e5e7eb;
  color: #374151;
}
.${prefix}badge-primary { background: #dbeafe; color: #1d4ed8; }
.${prefix}badge-success { background: #d1fae5; color: #065f46; }
.${prefix}badge-warning { background: #fef3c7; color: #92400e; }
.${prefix}badge-error { background: #fee2e2; color: #991b1b; }

/* Forms */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  transition: all 0.15s ease;
  color: #111827;
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.${prefix}input::placeholder, .${prefix}textarea::placeholder {
  color: #9ca3af;
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f9fafb;
  border-color: #e5e7eb;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 6rem;
  font-family: inherit;
}

.${prefix}select {
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5rem;
  padding-right: 2.5rem;
}

/* Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: #6366f1;
}

/* Cards and Containers */
.${prefix}container-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin: 1rem 0;
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 1rem;
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.${prefix}container-hero .${prefix}h1,
.${prefix}container-hero .${prefix}h2,
.${prefix}container-hero .${prefix}h3,
.${prefix}container-hero .${prefix}paragraph {
  color: white;
}

.${prefix}container-modal {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  position: relative;
}

.${prefix}container-footer {
  background: #1f2937;
  color: #e5e7eb;
  padding: 2rem;
  margin-top: 3rem;
  border-radius: 0.75rem;
}

.${prefix}container-footer .${prefix}paragraph,
.${prefix}container-footer .${prefix}nav-item {
  color: #e5e7eb;
}

.${prefix}container-section {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.${prefix}container-section:last-child {
  border-bottom: none;
}

/* Alerts */
.${prefix}container-alert {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  border-left: 4px solid;
}

.${prefix}container-alert.${prefix}warning {
  background: #fef3c7;
  border-left-color: #f59e0b;
  color: #92400e;
}

.${prefix}container-alert.${prefix}error {
  background: #fee2e2;
  border-left-color: #ef4444;
  color: #991b1b;
}

.${prefix}container-alert.${prefix}success {
  background: #d1fae5;
  border-left-color: #10b981;
  color: #065f46;
}

/* Navigation */
.${prefix}nav {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.${prefix}nav-item {
  display: inline-block;
  color: #4b5563;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.15s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.${prefix}nav-item:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.${prefix}nav-item.${prefix}active {
  background: #7c3aed;
  color: #fff;
  border-color: #7c3aed;
}

.${prefix}brand {
  font-weight: 700;
  font-size: 1.125rem;
  color: #111827;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Lists */
.${prefix}list {
  margin: 1rem 0;
  padding: 0;
  list-style: none;
}

.${prefix}list-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
}

.${prefix}list-item:last-child {
  border-bottom: none;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.875rem;
}

.${prefix}breadcrumb-item a {
  color: #2563eb;
  text-decoration: none;
}

.${prefix}breadcrumb-item a:hover {
  text-decoration: underline;
}

.${prefix}breadcrumb-current {
  font-weight: 500;
  color: #111827;
}

.${prefix}breadcrumb-sep {
  color: #9ca3af;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #f9fafb;
  border-right: 1px solid #e5e7eb;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.75em; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #6b7280; }
.${prefix}container-sidebar .${prefix}separator { margin: 8px 0; }

/* Layout: sidebar-main */
.${prefix}container-layout.${prefix}sidebar-main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: start;
}
.${prefix}layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.${prefix}layout-sidebar .${prefix}container-sidebar { width: 100%; }
.${prefix}layout-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 2px 0; }
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.75em; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #6b7280; }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }

/* Grid */
.${prefix}grid {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
  align-items: center;
}

.${prefix}grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.${prefix}grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.${prefix}grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Tables */
.${prefix}table {
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin: 1rem 0;
  border-collapse: separate;
  border-spacing: 0;
}

.${prefix}table th {
  background: #f9fafb;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
}

.${prefix}table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;
  color: #4b5563;
}

.${prefix}table tr:last-child td {
  border-bottom: none;
}

/* Table cell alignment - more specific to override th/td defaults */
.${prefix}table .${prefix}align-left {
  text-align: left !important;
}

.${prefix}table .${prefix}align-center {
  text-align: center !important;
}

.${prefix}table .${prefix}align-right {
  text-align: right !important;
}

/* Icons */
.${prefix}icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  vertical-align: middle;
}


/* Utility classes */
.${prefix}separator {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}

.${prefix}image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.${prefix}code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace;
  font-size: 0.875rem;
  color: #6366f1;
}

.${prefix}blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #4b5563;
  font-style: italic;
}

/* Button group */
.${prefix}container-button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

/* Form group */
.${prefix}container-form-group {
  margin: 1rem 0;
}

/* State Containers */
.${prefix}container-loading-state {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.${prefix}container-loading-state::before {
  content: '';
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 1.5rem;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.${prefix}container-empty-state {
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 0.75rem;
  padding: 4rem 2rem;
  margin: 2rem 0;
  text-align: center;
  color: #6b7280;
}

.${prefix}container-empty-state::before {
  content: '\u{1F4ED}';
  display: block;
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.${prefix}container-error-state {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
  color: #991b1b;
}

.${prefix}container-error-state::before {
  content: '\u26A0\uFE0F';
  display: block;
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .${prefix}grid-2,
  .${prefix}grid-3,
  .${prefix}grid-4 {
    grid-template-columns: 1fr;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }

  .${prefix}nav-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .${prefix}brand {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}

// packages/core/src/renderer/styles/material.ts
function getMaterialStyle(prefix) {
  return `
/* Material Design Inspired Style */
body {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  background: #fafafa;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.5;
  margin: 0;
  padding: 20px;
}

/* Typography - Material Design Type Scale */
.${prefix}h1 {
  font-size: 2.125rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  margin: 0 0 1rem 0;
  letter-spacing: 0;
}

.${prefix}h2 {
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  margin: 1.5rem 0 1rem 0;
  letter-spacing: 0.0075em;
}

.${prefix}h3 {
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  margin: 1.25rem 0 0.75rem 0;
  letter-spacing: 0.0125em;
}

.${prefix}h4 {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  margin: 1rem 0 0.5rem 0;
  letter-spacing: 0.015em;
}

.${prefix}paragraph {
  color: rgba(0, 0, 0, 0.6);
  margin: 0.75rem 0;
  font-size: 1rem;
  letter-spacing: 0.00938em;
}

/* Material Buttons */
.${prefix}button {
  padding: 6px 16px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  background: transparent;
  color: #6200ee;
  position: relative;
  overflow: hidden;
}

.${prefix}button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(98, 0, 238, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.${prefix}button:hover::before {
  width: 300px;
  height: 300px;
}

.${prefix}button:hover {
  background: rgba(98, 0, 238, 0.04);
}

.${prefix}button-primary, .${prefix}button.${prefix}button-primary {
  background: #6200ee;
  color: white;
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
              0px 2px 2px 0px rgba(0,0,0,0.14),
              0px 1px 5px 0px rgba(0,0,0,0.12);
}

.${prefix}button-primary::before {
  background: rgba(255, 255, 255, 0.2);
}

.${prefix}button-primary:hover, .${prefix}button.${prefix}button-primary:hover {
  background: #6200ee;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
              0px 4px 5px 0px rgba(0,0,0,0.14),
              0px 1px 10px 0px rgba(0,0,0,0.12);
}

.${prefix}button:disabled, .${prefix}button[disabled] {
  color: rgba(0, 0, 0, 0.26);
  background: rgba(0, 0, 0, 0.12);
  cursor: not-allowed;
  box-shadow: none;
}

/* Button States */
.${prefix}state-loading {
  background: #e8eaf6 !important;
  color: #6200ee !important;
  position: relative;
  padding-left: 2.5rem;
}

.${prefix}state-loading::after {
  content: '';
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid #6200ee;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.${prefix}state-error {
  background: #b00020 !important;
  color: white !important;
}

.${prefix}state-success {
  background: #00c853 !important;
  color: white !important;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

/* Material Chips / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 2px 12px;
  margin: 0 2px;
  border-radius: 16px;
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0.01786em;
  background: #e0e0e0;
  color: rgba(0, 0, 0, 0.87);
}
.${prefix}badge-primary { background: #e8eaf6; color: #6200ee; }
.${prefix}badge-success { background: #e8f5e9; color: #1b5e20; }
.${prefix}badge-warning { background: #fff8e1; color: #e65100; }
.${prefix}badge-error { background: #fce4ec; color: #b00020; }

/* Material Form Inputs */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  font-size: 1rem;
  background: transparent;
  transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgba(0, 0, 0, 0.87);
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: none;
  border-bottom: 2px solid #6200ee;
  margin-bottom: -1px;
}

.${prefix}input::placeholder, .${prefix}textarea::placeholder {
  color: rgba(0, 0, 0, 0.42);
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  color: rgba(0, 0, 0, 0.38);
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.02);
  border-bottom-color: rgba(0, 0, 0, 0.26);
}

.${prefix}textarea {
  resize: vertical;
  min-height: 6rem;
  font-family: inherit;
  border: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 4px;
  padding: 12px;
}

.${prefix}textarea:focus {
  border: 2px solid #6200ee;
  margin: -1px;
}

.${prefix}select {
  cursor: pointer;
}

/* Checkboxes and Radios - Material Style */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6200ee;
}

/* Material Cards - Elevation System */
.${prefix}container-card {
  background: white;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 1px 3px 0px rgba(0,0,0,0.12);
  padding: 16px;
  margin: 16px 0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.${prefix}container-card:hover {
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2),
              0px 3px 4px 0px rgba(0,0,0,0.14),
              0px 1px 8px 0px rgba(0,0,0,0.12);
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #6200ee 0%, #3700b3 100%);
  color: white;
  border-radius: 4px;
  padding: 48px 24px;
  margin: 24px 0;
  text-align: center;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
              0px 6px 10px 0px rgba(0,0,0,0.14),
              0px 1px 18px 0px rgba(0,0,0,0.12);
}

.${prefix}container-hero .${prefix}h1,
.${prefix}container-hero .${prefix}h2,
.${prefix}container-hero .${prefix}h3,
.${prefix}container-hero .${prefix}paragraph {
  color: white;
}

.${prefix}container-modal {
  background: white;
  border-radius: 4px;
  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),
              0px 24px 38px 3px rgba(0,0,0,0.14),
              0px 9px 46px 8px rgba(0,0,0,0.12);
  padding: 24px;
  margin: 24px auto;
  max-width: 600px;
  position: relative;
}

.${prefix}container-footer {
  background: #212121;
  color: rgba(255, 255, 255, 0.87);
  padding: 24px;
  margin-top: 48px;
  border-radius: 4px;
}

.${prefix}container-footer .${prefix}paragraph,
.${prefix}container-footer .${prefix}nav-item {
  color: rgba(255, 255, 255, 0.87);
}

.${prefix}container-section {
  padding: 24px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.${prefix}container-section:last-child {
  border-bottom: none;
}

/* Material Alerts */
.${prefix}container-alert {
  padding: 12px 16px;
  border-radius: 4px;
  margin: 16px 0;
  display: flex;
  align-items: center;
}

.${prefix}container-alert.${prefix}warning {
  background: #fff3e0;
  color: #e65100;
}

.${prefix}container-alert.${prefix}error {
  background: #ffebee;
  color: #c62828;
}

.${prefix}container-alert.${prefix}success {
  background: #e8f5e9;
  color: #2e7d32;
}

/* Material Navigation - App Bar Style */
.${prefix}nav {
  background: #6200ee;
  color: white;
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
              0px 4px 5px 0px rgba(0,0,0,0.14),
              0px 1px 10px 0px rgba(0,0,0,0.12);
  margin-bottom: 24px;
  border-radius: 4px;
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
}

.${prefix}nav-item {
  display: inline-block;
  color: rgba(255, 255, 255, 0.87);
  text-decoration: none;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 0.875rem;
  font-weight: 500;
}

.${prefix}nav-item:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.${prefix}nav-item.${prefix}active {
  background: #1565c0;
  color: #fff;
  border-color: #1565c0;
}

.${prefix}brand {
  font-weight: 500;
  font-size: 1.25rem;
  color: white;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Material Lists */
.${prefix}list {
  margin: 16px 0;
  padding: 0;
  list-style: none;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 2px 1px -1px rgba(0,0,0,0.12);
}

.${prefix}list-item {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.${prefix}list-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.${prefix}list-item:last-child {
  border-bottom: none;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.875rem;
}

.${prefix}breadcrumb-item a {
  color: #1565c0;
  text-decoration: none;
}

.${prefix}breadcrumb-item a:hover {
  text-decoration: underline;
}

.${prefix}breadcrumb-current {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
}

.${prefix}breadcrumb-sep {
  color: rgba(0, 0, 0, 0.38);
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #fafafa;
  border-right: 1px solid #e0e0e0;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.75em; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,0.54); }
.${prefix}container-sidebar .${prefix}separator { margin: 8px 0; }

/* Layout: sidebar-main */
.${prefix}container-layout.${prefix}sidebar-main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: start;
}
.${prefix}layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.${prefix}layout-sidebar .${prefix}container-sidebar { width: 100%; }
.${prefix}layout-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 2px 0; }
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.75em; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,0.54); }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }

/* Material Grid */
.${prefix}grid {
  display: grid;
  gap: 16px;
  margin: 24px 0;
  align-items: center;
}

.${prefix}grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.${prefix}grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.${prefix}grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Material Tables */
.${prefix}table {
  width: 100%;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 2px 1px -1px rgba(0,0,0,0.12);
  margin: 16px 0;
}

.${prefix}table th {
  background: #fafafa;
  padding: 16px;
  text-align: left;
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.${prefix}table td {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.87);
}

.${prefix}table tr:last-child td {
  border-bottom: none;
}

.${prefix}table tr:hover {
  background: rgba(0, 0, 0, 0.04);
}

/* Table cell alignment - more specific to override th/td defaults */
.${prefix}table .${prefix}align-left {
  text-align: left !important;
}

.${prefix}table .${prefix}align-center {
  text-align: center !important;
}

.${prefix}table .${prefix}align-right {
  text-align: right !important;
}

/* Material Icons */
.${prefix}icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

/* Utility classes */
.${prefix}separator {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin: 24px 0;
}

.${prefix}image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 2px 1px -1px rgba(0,0,0,0.12);
}

.${prefix}code {
  background: rgba(98, 0, 238, 0.12);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Roboto Mono", monospace;
  font-size: 0.875rem;
  color: #6200ee;
}

.${prefix}blockquote {
  border-left: 4px solid #6200ee;
  padding-left: 16px;
  margin: 16px 0;
  color: rgba(0, 0, 0, 0.6);
  font-style: italic;
}

/* Button group */
.${prefix}container-button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
}

/* Form group */
.${prefix}container-form-group {
  margin: 16px 0;
}

/* State Containers */
.${prefix}container-loading-state {
  background: white;
  border-radius: 4px;
  padding: 48px 32px;
  margin: 24px 0;
  text-align: center;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
              0px 4px 5px 0px rgba(0,0,0,0.14),
              0px 1px 10px 0px rgba(0,0,0,0.12);
}

.${prefix}container-loading-state::before {
  content: '';
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 24px;
  border: 3px solid rgba(98, 0, 238, 0.2);
  border-top-color: #6200ee;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.${prefix}container-empty-state {
  background: #fafafa;
  border: 1px dashed rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 64px 32px;
  margin: 24px 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.38);
}

.${prefix}container-empty-state::before {
  content: '\u{1F4ED}';
  display: block;
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.3;
}

.${prefix}container-error-state {
  background: #ffebee;
  border-radius: 4px;
  padding: 48px 32px;
  margin: 24px 0;
  text-align: center;
  color: #c62828;
  box-shadow: 0px 1px 3px 0px rgba(198, 40, 40, 0.2);
}

.${prefix}container-error-state::before {
  content: '\u26A0\uFE0F';
  display: block;
  font-size: 48px;
  margin-bottom: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .${prefix}grid-2,
  .${prefix}grid-3,
  .${prefix}grid-4 {
    grid-template-columns: 1fr;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }

  .${prefix}nav-content {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 12px 0;
  }

  .${prefix}nav {
    height: auto;
  }

  .${prefix}brand {
    margin-right: 0;
    margin-bottom: 8px;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}

// packages/core/src/renderer/styles/brutal.ts
function getBrutalStyle(prefix) {
  return `
/* Neo-Brutalism Style */
body {
  font-family: "Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: #fffcf2;
  color: #000000;
  line-height: 1.4;
  margin: 0;
  padding: 20px;
}

/* Typography - Bold and Aggressive */
.${prefix}h1 {
  font-size: 3rem;
  font-weight: 900;
  color: #000000;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 3px 3px 0 #ffd93d;
}

.${prefix}h2 {
  font-size: 2.25rem;
  font-weight: 900;
  color: #000000;
  margin: 1.5rem 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.${prefix}h3 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #000000;
  margin: 1.25rem 0 0.75rem 0;
  text-transform: uppercase;
}

.${prefix}h4 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #000000;
  margin: 1rem 0 0.5rem 0;
  text-transform: uppercase;
}

.${prefix}paragraph {
  color: #000000;
  margin: 0.75rem 0;
  font-size: 1rem;
  font-weight: 500;
}

/* Brutal Buttons */
.${prefix}button {
  padding: 12px 24px;
  border: 3px solid #000000;
  border-radius: 0;
  font-weight: 900;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.1s ease;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  background: #ffffff;
  color: #000000;
  box-shadow: 4px 4px 0 #000000;
  position: relative;
}

.${prefix}button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.${prefix}button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000000;
}

.${prefix}button-primary, .${prefix}button.${prefix}button-primary {
  background: #ffd93d;
  color: #000000;
}

.${prefix}button-primary:hover, .${prefix}button.${prefix}button-primary:hover {
  background: #ffcc00;
}

.${prefix}button:disabled, .${prefix}button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 4px 4px 0 #000000 !important;
}

/* Button States */
.${prefix}state-loading {
  background: #bcf0da !important;
  color: #000000 !important;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.${prefix}state-error {
  background: #ff6b6b !important;
  color: #000000 !important;
}

.${prefix}state-success {
  background: #6bcf7f !important;
  color: #000000 !important;
}

/* Brutal Pills / Badges */
.${prefix}badge {
  display: inline-block;
  padding: 2px 10px;
  margin: 0 2px;
  border: 2px solid #000000;
  border-radius: 0;
  font-size: 12px;
  font-weight: 700;
  background: #ffffff;
  color: #000000;
  box-shadow: 2px 2px 0 #000000;
}
.${prefix}badge-primary { background: #c0d8f0; }
.${prefix}badge-success { background: #6bcf7f; }
.${prefix}badge-warning { background: #ffd700; }
.${prefix}badge-error { background: #ff6b6b; }

/* Brutal Forms */
.${prefix}input, .${prefix}textarea, .${prefix}select {
  width: 100%;
  padding: 12px;
  border: 3px solid #000000;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 600;
  background: #ffffff;
  color: #000000;
  box-shadow: 4px 4px 0 #000000;
  transition: all 0.1s ease;
}

.${prefix}input:focus, .${prefix}textarea:focus, .${prefix}select:focus {
  outline: none;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
  background: #ffd93d;
}

.${prefix}input::placeholder, .${prefix}textarea::placeholder {
  color: #666666;
  font-weight: 600;
}

.${prefix}input[disabled], .${prefix}input.${prefix}state-disabled,
.${prefix}textarea[disabled], .${prefix}textarea.${prefix}state-disabled,
.${prefix}select[disabled], .${prefix}select.${prefix}state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #e0e0e0;
  box-shadow: none;
  transform: none !important;
}

.${prefix}textarea {
  resize: vertical;
  min-height: 6rem;
  font-family: inherit;
}

.${prefix}select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='square'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px;
  padding-right: 40px;
}

/* Brutal Checkboxes and Radios */
.${prefix}checkbox, .${prefix}radio {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
  cursor: pointer;
  font-weight: 600;
}

.${prefix}checkbox input[type="checkbox"],
.${prefix}radio input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 3px solid #000000;
  accent-color: #ffd93d;
}

/* Brutal Cards and Containers */
.${prefix}container-card {
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 0;
  box-shadow: 8px 8px 0 #000000;
  padding: 24px;
  margin: 24px 0;
  transition: all 0.1s ease;
}

.${prefix}container-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 #000000;
}

.${prefix}container-hero {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%);
  color: #000000;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 48px 32px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 12px 12px 0 #000000;
  position: relative;
  overflow: hidden;
}

.${prefix}container-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.05) 10px,
    rgba(0, 0, 0, 0.05) 20px
  );
  pointer-events: none;
}

.${prefix}container-hero .${prefix}h1,
.${prefix}container-hero .${prefix}h2,
.${prefix}container-hero .${prefix}h3,
.${prefix}container-hero .${prefix}paragraph {
  color: #000000;
  position: relative;
}

.${prefix}container-modal {
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 0;
  box-shadow: 12px 12px 0 #000000;
  padding: 32px;
  margin: 32px auto;
  max-width: 600px;
  position: relative;
}

.${prefix}container-footer {
  background: #000000;
  color: #ffffff;
  padding: 32px;
  margin-top: 48px;
  border: 3px solid #000000;
  box-shadow: 8px 8px 0 #ffd93d;
}

.${prefix}container-footer .${prefix}paragraph,
.${prefix}container-footer .${prefix}nav-item {
  color: #ffffff;
  font-weight: 600;
}

.${prefix}container-section {
  padding: 24px 0;
  border-bottom: 3px solid #000000;
}

.${prefix}container-section:last-child {
  border-bottom: none;
}

/* Brutal Alerts */
.${prefix}container-alert {
  padding: 16px 20px;
  border: 3px solid #000000;
  border-radius: 0;
  margin: 20px 0;
  box-shadow: 6px 6px 0 #000000;
  font-weight: 600;
}

.${prefix}container-alert.${prefix}warning {
  background: #ffeb3b;
  color: #000000;
}

.${prefix}container-alert.${prefix}error {
  background: #ff6b6b;
  color: #000000;
}

.${prefix}container-alert.${prefix}success {
  background: #6bcf7f;
  color: #000000;
}

/* Brutal Navigation */
.${prefix}nav {
  background: #ffd93d;
  border: 3px solid #000000;
  padding: 16px 20px;
  box-shadow: 6px 6px 0 #000000;
  margin-bottom: 32px;
}

.${prefix}nav-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.${prefix}nav-item {
  display: inline-block;
  color: #000000;
  text-decoration: none;
  padding: 10px 20px;
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 0;
  box-shadow: 4px 4px 0 #000000;
  transition: all 0.1s ease;
  font-size: 0.875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.${prefix}nav-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
  background: #ffffff;
}

.${prefix}nav-item.${prefix}active {
  background: #000;
  color: #fff;
  border-color: #000;
  transform: translate(4px, 4px);
  box-shadow: none;
}

.${prefix}brand {
  font-weight: 900;
  font-size: 1.5rem;
  color: #000000;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

/* Brutal Lists */
.${prefix}list {
  margin: 20px 0;
  padding: 0;
  list-style: none;
  border: 3px solid #000000;
  background: #ffffff;
  box-shadow: 6px 6px 0 #000000;
}

.${prefix}list-item {
  padding: 16px 20px;
  border-bottom: 3px solid #000000;
  color: #000000;
  font-weight: 600;
  transition: all 0.1s ease;
}

.${prefix}list-item:hover {
  background: #ffd93d;
  padding-left: 28px;
}

.${prefix}list-item:last-child {
  border-bottom: none;
}

.${prefix}breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 0;
  font-size: 0.9em;
  font-weight: bold;
}

.${prefix}breadcrumb-item a {
  color: #000000;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.${prefix}breadcrumb-current {
  background: #000000;
  color: #ffffff;
  padding: 0 4px;
}

.${prefix}breadcrumb-sep {
  color: #000000;
  font-weight: bold;
}

/* Sidebar */
.${prefix}container-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
  padding: 12px;
  background: #fff;
  border: 3px solid #000;
  box-shadow: 4px 4px 0 #000;
}
.${prefix}container-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 0; }
.${prefix}container-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; font-weight: 900; text-transform: uppercase; }
.${prefix}container-sidebar .${prefix}separator { margin: 8px 0; }

/* Layout: sidebar-main */
.${prefix}container-layout.${prefix}sidebar-main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: start;
}
.${prefix}layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.${prefix}layout-sidebar .${prefix}container-sidebar { width: 100%; }
.${prefix}layout-sidebar .${prefix}button { display: block; width: 100%; text-align: left; margin: 2px 0; }
.${prefix}layout-sidebar .${prefix}h4 { margin: 12px 0 4px; font-size: 0.85em; font-weight: 900; text-transform: uppercase; }
.${prefix}layout-sidebar .${prefix}separator { margin: 8px 0; }
.${prefix}layout-main { min-width: 0; }

/* Brutal Grid */
.${prefix}grid {
  display: grid;
  gap: 24px;
  margin: 32px 0;
  align-items: center;
}

.${prefix}grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.${prefix}grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.${prefix}grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.${prefix}grid > * {
  border: 3px solid #000000;
  background: #ffffff;
  padding: 20px;
  box-shadow: 6px 6px 0 #000000;
}

/* Brutal Tables */
.${prefix}table {
  width: 100%;
  background: #ffffff;
  border: 3px solid #000000;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 8px 8px 0 #000000;
  margin: 20px 0;
}

.${prefix}table th {
  background: #ffd93d;
  padding: 16px;
  text-align: left;
  font-weight: 900;
  font-size: 0.875rem;
  color: #000000;
  border-bottom: 3px solid #000000;
  border-right: 3px solid #000000;
  text-transform: uppercase;
}

.${prefix}table th:last-child {
  border-right: none;
}

.${prefix}table td {
  padding: 16px;
  border-bottom: 3px solid #000000;
  border-right: 3px solid #000000;
  font-size: 0.875rem;
  font-weight: 600;
  color: #000000;
}

.${prefix}table td:last-child {
  border-right: none;
}

.${prefix}table tr:last-child td {
  border-bottom: none;
}

.${prefix}table tr:hover td {
  background: #bcf0da;
}

/* Table cell alignment - more specific to override th/td defaults */
.${prefix}table .${prefix}align-left {
  text-align: left !important;
}

.${prefix}table .${prefix}align-center {
  text-align: center !important;
}

.${prefix}table .${prefix}align-right {
  text-align: right !important;
}

/* Brutal Icons */
.${prefix}icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  font-weight: 900;
}

/* Utility classes */
.${prefix}separator {
  border: none;
  border-top: 3px solid #000000;
  margin: 32px 0;
}

.${prefix}image {
  max-width: 100%;
  height: auto;
  border: 3px solid #000000;
  box-shadow: 6px 6px 0 #000000;
}

.${prefix}code {
  background: #ffd93d;
  padding: 4px 8px;
  border: 2px solid #000000;
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: #000000;
}

.${prefix}blockquote {
  border-left: 6px solid #000000;
  padding-left: 20px;
  margin: 20px 0;
  color: #000000;
  font-weight: 600;
  font-style: normal;
  background: linear-gradient(to right, rgba(255, 217, 61, 0.2), transparent);
}

/* Button group */
.${prefix}container-button-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 20px 0;
}

/* Form group */
.${prefix}container-form-group {
  margin: 20px 0;
}

.${prefix}container-form-group .${prefix}input:not(:last-child),
.${prefix}container-form-group .${prefix}textarea:not(:last-child),
.${prefix}container-form-group .${prefix}select:not(:last-child) {
  margin-bottom: 16px;
}

/* State Containers */
.${prefix}container-loading-state {
  background: #ffffff;
  border: 3px solid #000000;
  padding: 56px 40px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 8px 8px 0 #000000;
  position: relative;
}

.${prefix}container-loading-state::before {
  content: '\u27F3';
  display: block;
  font-size: 64px;
  font-weight: 900;
  margin-bottom: 24px;
  animation: spin 1.5s ease-in-out infinite;
  color: #ffd93d;
  text-shadow: 3px 3px 0 #000000;
}

.${prefix}container-empty-state {
  background: #f5f5f5;
  border: 3px dashed #000000;
  padding: 72px 40px;
  margin: 32px 0;
  text-align: center;
  color: #666666;
  font-weight: 600;
}

.${prefix}container-empty-state::before {
  content: '[EMPTY]';
  display: block;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 0.3em;
  margin-bottom: 24px;
  color: #999999;
  text-transform: uppercase;
}

.${prefix}container-error-state {
  background: #ff6b6b;
  border: 3px solid #000000;
  padding: 56px 40px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 8px 8px 0 #000000;
  color: #000000;
  font-weight: 600;
}

.${prefix}container-error-state::before {
  content: '\u26A0';
  display: block;
  font-size: 72px;
  font-weight: 900;
  margin-bottom: 24px;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .${prefix}h1 {
    font-size: 2rem;
  }

  .${prefix}h2 {
    font-size: 1.75rem;
  }

  .${prefix}grid-2,
  .${prefix}grid-3,
  .${prefix}grid-4 {
    grid-template-columns: 1fr;
  }

  .${prefix}col-span-1,
  .${prefix}col-span-2,
  .${prefix}col-span-3,
  .${prefix}col-span-4 {
    grid-column: span 1;
  }

  .${prefix}nav-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .${prefix}brand {
    margin-right: 0;
    margin-bottom: 12px;
    font-size: 1.25rem;
  }

  .${prefix}container-card,
  .${prefix}container-modal {
    box-shadow: 6px 6px 0 #000000;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}

// packages/core/src/renderer/styles/index.ts
function getStyleCSS(style, prefix) {
  let themeCSS;
  switch (style) {
    case "sketch":
      themeCSS = getSketchStyle(prefix);
      break;
    case "clean":
      themeCSS = getCleanStyle(prefix);
      break;
    case "wireframe":
      themeCSS = getWireframeStyle(prefix);
      break;
    case "none":
      themeCSS = getNoneStyle(prefix);
      break;
    case "tailwind":
      themeCSS = getTailwindStyle(prefix);
      break;
    case "material":
      themeCSS = getMaterialStyle(prefix);
      break;
    case "brutal":
      themeCSS = getBrutalStyle(prefix);
      break;
    default:
      themeCSS = getSketchStyle(prefix);
  }
  return getStructuralCSS(prefix) + themeCSS;
}

// packages/core/src/renderer/index.ts
function renderToHTML(ast, options = {}) {
  const {
    style = "sketch",
    inlineStyles = true,
    pretty = true,
    classPrefix = "wmd-",
    showComments = true,
    cursorSync = false
  } = options;
  const collectedComments = [];
  const context = {
    style,
    classPrefix,
    inlineStyles,
    pretty,
    showComments,
    _comments: showComments ? collectedComments : void 0,
    _nextCommentId: null,
    _radioGroupCounter: { value: 0 }
  };
  const childrenHTML = renderChildrenList(ast.children, context);
  const panelHTML = showComments && collectedComments.length > 0 ? renderCommentsPanel(collectedComments, classPrefix) : "";
  const bodyClass = showComments && collectedComments.length > 0 ? `${classPrefix}root ${classPrefix}${style} ${classPrefix}has-comments` : `${classPrefix}root ${classPrefix}${style}`;
  const css = inlineStyles ? getStyleCSS(style, classPrefix) : "";
  const p = classPrefix;
  const cursorCSS = cursorSync ? `[data-cursor-active]{background:rgba(99,102,241,.08)!important;border-radius:4px;}` : "";
  const cursorScript = cursorSync ? `<script>(function(){function activateTab(panel){var root=panel.closest('[data-wmd-tabs]');if(!root)return;var idx=panel.getAttribute('data-wmd-tab-panel');root.querySelectorAll('[data-wmd-tab-panel]').forEach(function(x){x.getAttribute('data-wmd-tab-panel')===idx?x.removeAttribute('hidden'):x.setAttribute('hidden','');});root.querySelectorAll('[data-wmd-tab]').forEach(function(b){if(b.getAttribute('data-wmd-tab')===idx){b.classList.add('${p}active');}else{b.classList.remove('${p}active');b.removeAttribute('data-cursor-active');}});}window.addEventListener('message',function(e){if(!e.data)return;if(e.data.type==='wiremd-cursor-blur'){document.querySelectorAll('[data-cursor-active]').forEach(function(el){el.removeAttribute('data-cursor-active');});return;}if(e.data.type!=='wiremd-cursor')return;var line=e.data.line;document.querySelectorAll('[data-cursor-active]').forEach(function(el){el.removeAttribute('data-cursor-active');});var els=document.querySelectorAll('[data-source-line]');var best=null,bestLine=0;for(var i=0;i<els.length;i++){var l=parseInt(els[i].getAttribute('data-source-line'),10);if(l<=line&&l>bestLine){bestLine=l;best=els[i];}}if(best){best.setAttribute('data-cursor-active','');var panel=best.closest('[data-wmd-tab-panel]');if(panel)activateTab(panel);best.scrollIntoView({behavior:'smooth',block:'nearest'});}});})();</script>` : "";
  const styleBlock = css || cursorCSS ? `<style>
${css}${cursorCSS ? "\n" + cursorCSS : ""}
  </style>` : "";
  const html2 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>wiremd Mockup</title>
  ${styleBlock}
</head>
<body class="${bodyClass}">
  ${childrenHTML}
  ${panelHTML}
  ${cursorScript}
</body>
</html>`;
  return pretty ? html2 : html2.replace(/\n\s*/g, "");
}
function renderToJSON(ast, options = {}) {
  const { pretty = true } = options;
  return JSON.stringify(ast, null, pretty ? 2 : 0);
}

// packages/core/src/index.ts
var SYNTAX_VERSION = "0.1";

// packages/core/src/parser/_context.ts
function makeContext(siblings, startIndex, options, deps) {
  let cursor = startIndex;
  const ctx = {
    options,
    peekNext: () => {
      const next = siblings[cursor + 1];
      return next === void 0 ? null : next;
    },
    consumeNext: () => {
      cursor++;
    },
    transformChild: (mdast) => deps.transformNode(mdast, makeIsolatedContext(options, deps).ctx),
    transformChildren: (mdastList) => deps.processNodeList(mdastList, options),
    parseAttributes: deps.parseAttributes,
    extractTextContent: deps.extractTextContent,
    isHtmlCommentNode: deps.isHtmlCommentNode
  };
  return {
    ctx,
    getCursor: () => cursor
  };
}
function makeIsolatedContext(options, deps) {
  let cursor = 0;
  const ctx = {
    options,
    peekNext: () => null,
    consumeNext: () => {
      cursor++;
    },
    transformChild: (mdast) => deps.transformNode(mdast, ctx),
    transformChildren: (mdastList) => deps.processNodeList(mdastList, options),
    parseAttributes: deps.parseAttributes,
    extractTextContent: deps.extractTextContent,
    isHtmlCommentNode: deps.isHtmlCommentNode
  };
  return { ctx, getCursor: () => cursor };
}

// packages/core/src/parser/transformer.ts
function transformToWiremdAST(mdast, options = {}) {
  const meta = {
    version: SYNTAX_VERSION,
    viewport: "desktop",
    theme: "sketch"
  };
  return {
    type: "document",
    version: SYNTAX_VERSION,
    meta,
    children: processNodeList(mdast.children, options)
  };
}
var ctxDeps = {
  transformNode: (mdast, ctx) => transformNode(mdast, ctx),
  processNodeList: (mdastList, options) => processNodeList(mdastList, options),
  parseAttributes,
  extractTextContent,
  isHtmlCommentNode
};
function transformNode(node2, ctx) {
  switch (node2.type) {
    case "wiremdContainer":
      return transformContainer(node2, ctx);
    case "wiremdInlineContainer":
      return transformInlineContainer(node2, ctx);
    case "heading":
      return transformHeading(node2, ctx);
    case "paragraph":
      return transformParagraph(node2, ctx);
    case "text":
      return {
        type: "text",
        content: node2.value
      };
    case "list":
      return transformList(node2, ctx);
    case "listItem":
      return transformListItem(node2, ctx);
    case "table":
      return transformTable(node2, ctx);
    case "blockquote":
      return transformBlockquote(node2, ctx);
    case "code":
      return {
        type: "code",
        value: node2.value,
        lang: node2.lang || void 0,
        inline: false
      };
    case "inlineCode":
      return {
        type: "code",
        value: node2.value,
        inline: true
      };
    case "image":
      return {
        type: "image",
        src: node2.url || "",
        alt: node2.alt || "",
        props: {}
      };
    case "link":
      return {
        type: "link",
        href: node2.url || "#",
        title: node2.title,
        children: node2.children?.map((child) => ctx.transformChild(child)).filter(Boolean) || [],
        props: {}
      };
    case "thematicBreak":
      return {
        type: "separator",
        props: {}
      };
    case "html": {
      const m = node2.value.match(/^<!--([\s\S]*?)-->$/);
      if (m)
        return { type: "comment", text: m[1].trim() };
      return null;
    }
    default:
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[wiremd] Unsupported node type: ${node2.type}`);
      }
      return null;
  }
}
function processNodeList(nodeChildren, options) {
  const result = [];
  let i = 0;
  while (i < nodeChildren.length) {
    const node2 = nodeChildren[i];
    const handle2 = makeContext(nodeChildren, i, options, ctxDeps);
    const transformed = transformNode(node2, handle2.ctx);
    if (transformed) {
      if (node2.position && !transformed.position) {
        transformed.position = node2.position;
      }
      result.push(transformed);
    }
    i = handle2.getCursor() + 1;
  }
  return result;
}
function isHtmlCommentNode(node2) {
  return node2.type === "html" && typeof node2.value === "string" && /^<!--[\s\S]*-->$/.test(node2.value.trim());
}
function collectGridItemsFromContainer(children, ctx, isCard) {
  const gridItems = [];
  const firstHeading = children.find((n) => n.type === "heading");
  if (!firstHeading)
    return gridItems;
  const itemDepth = firstHeading.depth;
  let pending = [];
  let i = 0;
  while (i < children.length) {
    const child = children[i];
    if (child.type === "heading" && child.depth === itemDepth) {
      for (const c of pending) {
        const m = c.value.match(/^<!--([\s\S]*?)-->$/);
        if (m)
          gridItems.push({ type: "comment", text: m[1].trim() });
      }
      pending = [];
      const rawItemNodes = [child];
      i++;
      while (i < children.length) {
        const next = children[i];
        if (next.type === "heading" && next.depth <= itemDepth)
          break;
        rawItemNodes.push(next);
        i++;
      }
      if (i < children.length) {
        let split = rawItemNodes.length;
        while (split > 0 && isHtmlCommentNode(rawItemNodes[split - 1]))
          split--;
        if (split < rawItemNodes.length)
          pending = rawItemNodes.splice(split);
      }
      const headingContent = extractTextContent(child);
      const colSpanMatch = headingContent.match(/\{[^}]*\.col-span-(\d+)[^}]*\}/);
      const alignMatch = headingContent.match(/\{[^}]*\.(left|center|right)[^}]*\}/);
      const itemProps = { classes: [] };
      if (isCard)
        itemProps.classes.push("card");
      if (colSpanMatch)
        itemProps.classes.push(`col-span-${colSpanMatch[1]}`);
      if (alignMatch)
        itemProps.classes.push(`align-${alignMatch[1]}`);
      gridItems.push({
        type: "grid-item",
        props: itemProps,
        children: ctx.transformChildren(rawItemNodes)
      });
    } else {
      i++;
    }
  }
  return gridItems;
}
function collectRowItemsFromContainer(children, ctx) {
  const items = [];
  const hasHeadings = children.some((n) => n.type === "heading");
  if (hasHeadings) {
    const firstHeading = children.find((n) => n.type === "heading");
    const itemDepth = firstHeading.depth;
    let pending = [];
    let i = 0;
    while (i < children.length) {
      const child = children[i];
      if (child.type === "heading" && child.depth === itemDepth) {
        const headingContent = extractTextContent(child);
        const alignMatch = headingContent.match(/\{[^}]*\.(left|center|right)[^}]*\}/);
        const itemProps = { classes: [] };
        if (alignMatch)
          itemProps.classes.push(`align-${alignMatch[1]}`);
        for (const c of pending) {
          const m = c.value.match(/^<!--([\s\S]*?)-->$/);
          if (m)
            items.push({ type: "comment", text: m[1].trim() });
        }
        pending = [];
        i++;
        const rawItemNodes = [];
        while (i < children.length) {
          const next = children[i];
          if (next.type === "heading" && next.depth <= itemDepth)
            break;
          if (next.type === "paragraph") {
            const nodeText = extractTextContent(next);
            const isDropdown = /\[[^\]]+v\](?:\s*\{[^}]+\})?$/.test(nodeText);
            rawItemNodes.push(next);
            i++;
            if (isDropdown && i < children.length && children[i].type === "list") {
              rawItemNodes.push(children[i]);
              i++;
            }
          } else {
            rawItemNodes.push(next);
            i++;
          }
        }
        if (i < children.length) {
          let split = rawItemNodes.length;
          while (split > 0 && isHtmlCommentNode(rawItemNodes[split - 1]))
            split--;
          if (split < rawItemNodes.length)
            pending = rawItemNodes.splice(split);
        }
        items.push({
          type: "grid-item",
          props: itemProps,
          children: ctx.transformChildren(rawItemNodes)
        });
      } else {
        i++;
      }
    }
  } else {
    let i = 0;
    while (i < children.length) {
      const child = children[i];
      const groupNodes = [child];
      i++;
      if (child.type === "paragraph") {
        const nodeText = extractTextContent(child);
        const isDropdown = /\[[^\]]+v\](?:\s*\{[^}]+\})?$/.test(nodeText);
        if (isDropdown && i < children.length && children[i].type === "list") {
          groupNodes.push(children[i]);
          i++;
        }
      }
      items.push({
        type: "grid-item",
        props: { classes: [] },
        children: ctx.transformChildren(groupNodes)
      });
    }
  }
  return items;
}
function transformContainer(node2, ctx) {
  const props = parseAttributes(node2.attributes || "");
  const containerType = (node2.containerType || "").trim();
  const gridMatch = containerType.match(/^grid-(\d+)$/);
  if (gridMatch) {
    const columns = parseInt(gridMatch[1], 10);
    const firstChild = node2.children[0];
    const hasCard = firstChild?.type === "paragraph" && firstChild.children?.[0]?.type === "text" && firstChild.children[0].value?.trim() === "card" || (props.classes || []).includes("card");
    const contentChildren = hasCard ? node2.children.slice(1) : node2.children;
    return {
      type: "grid",
      columns,
      props: { ...props, card: hasCard, classes: (props.classes || []).filter((c) => c !== "card") },
      children: collectGridItemsFromContainer(contentChildren, ctx, hasCard)
    };
  }
  if (containerType === "row") {
    return {
      type: "row",
      props,
      children: collectRowItemsFromContainer(node2.children || [], ctx)
    };
  }
  if (containerType === "tabs") {
    const processed = ctx.transformChildren(node2.children || []);
    const pending = [];
    const tabs2 = [];
    for (const n of processed) {
      if (n.type === "comment") {
        pending.push(n);
      } else if (n.type === "tab") {
        if (pending.length > 0) {
          n.children = [...pending, ...n.children || []];
          pending.length = 0;
        }
        tabs2.push(n);
      }
    }
    if (tabs2.length > 0 && !tabs2.some((t) => t.active)) {
      tabs2[0].active = true;
    }
    return { type: "tabs", props, children: tabs2 };
  }
  if (containerType === "tab") {
    const firstChild = node2.children[0];
    let label = "";
    let isActive = false;
    let contentChildren = node2.children || [];
    if (firstChild?.type === "paragraph" && firstChild.children?.[0]?.type === "text") {
      const raw = firstChild.children[0].value;
      const m = raw.match(/^(.+?)(?:\s*(\{[^}]+\}))?$/);
      label = m?.[1]?.trim() || raw.trim();
      isActive = (m?.[2] || "").includes("active");
      contentChildren = node2.children.slice(1);
    }
    return {
      type: "tab",
      label,
      active: isActive,
      props,
      children: ctx.transformChildren(contentChildren)
    };
  }
  if (containerType === "demo") {
    return {
      type: "demo",
      raw: node2.rawContent || "",
      props,
      children: ctx.transformChildren(node2.children || [])
    };
  }
  return {
    type: "container",
    containerType,
    props,
    children: ctx.transformChildren(node2.children || [])
  };
}
function transformInlineContainer(node2, _ctx) {
  const props = parseAttributes(node2.attributes || "");
  const items = node2.items || [];
  const children = [];
  if (items.length === 1 && items[0].includes(">")) {
    const crumbs = items[0].split(/\s*>\s*/).map((c) => c.trim()).filter(Boolean);
    return {
      type: "breadcrumbs",
      props,
      children: crumbs.map((crumb, i) => ({
        type: "breadcrumb-item",
        content: crumb,
        current: i === crumbs.length - 1,
        props: {}
      }))
    };
  }
  let brandEmitted = false;
  for (const item of items) {
    const trimmed = item.trim();
    const activeMatch = trimmed.match(/^\*\*?([^*]+)\*\*?$/);
    if (activeMatch) {
      children.push({
        type: "nav-item",
        content: activeMatch[1],
        props: { classes: ["active"] }
      });
      continue;
    }
    const linkMatch = trimmed.match(/^\[([^\]]+)\]\(([^)]+)\)(\*)?$/);
    if (linkMatch) {
      children.push({
        type: "nav-item",
        content: linkMatch[1],
        href: linkMatch[2],
        props: { variant: linkMatch[3] ? "primary" : void 0 }
      });
      continue;
    }
    const buttonMatch = trimmed.match(/^\[([^\]]+)\](\*)?$/);
    if (buttonMatch) {
      children.push({
        type: "button",
        content: buttonMatch[1],
        props: {
          variant: buttonMatch[2] ? "primary" : void 0
        }
      });
      continue;
    }
    const iconMatch = trimmed.match(/^:([a-z-]+):$/);
    if (iconMatch) {
      children.push({
        type: "icon",
        props: { name: iconMatch[1] }
      });
      continue;
    }
    const iconTextMatch = trimmed.match(/^:([a-z-]+):\s*(.+)$/);
    if (iconTextMatch) {
      const iconName = iconTextMatch[1];
      const text6 = iconTextMatch[2];
      const nodeType = iconName === "logo" ? "brand" : "nav-item";
      children.push({
        type: nodeType,
        children: [
          { type: "icon", props: { name: iconName } },
          { type: "text", content: text6 }
        ],
        props: {}
      });
      continue;
    }
    if (!brandEmitted) {
      brandEmitted = true;
      children.push({
        type: "brand",
        children: [{ type: "text", content: trimmed, props: {} }],
        props: {}
      });
    } else {
      children.push({
        type: "nav-item",
        content: trimmed,
        props: {}
      });
    }
  }
  return {
    type: "nav",
    props,
    children
  };
}
function transformHeading(node2, _ctx) {
  const content3 = extractTextContent(node2);
  const attrMatch = content3.match(/^(.*?)(\{[^}]+\})$/);
  let headingText = content3;
  let props = { classes: [] };
  if (attrMatch) {
    headingText = attrMatch[1].trim();
    props = parseAttributes(attrMatch[2]);
  }
  if (/:([a-z-]+):/.test(headingText)) {
    const iconPattern = /:([a-z-]+):/g;
    const parts = headingText.split(iconPattern);
    const children = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        if (parts[i].trim()) {
          children.push({
            type: "text",
            content: parts[i],
            props: {}
          });
        }
      } else {
        children.push({
          type: "icon",
          props: { name: parts[i] }
        });
      }
    }
    return {
      type: "heading",
      level: node2.depth,
      children,
      props
    };
  }
  return {
    type: "heading",
    level: node2.depth,
    content: headingText,
    props
  };
}
function tryParseButtonLinkSequence(children) {
  if (!children || children.length < 3 || children.length % 2 === 0)
    return null;
  for (let i = 0; i < children.length; i++) {
    if (i % 2 === 0 && children[i].type !== "text")
      return null;
    if (i % 2 === 1 && children[i].type !== "link")
      return null;
  }
  if (!/^\s*\[$/.test(children[0].value))
    return null;
  const lastText = children[children.length - 1].value;
  if (!/^\](\*)?\s*(\{[^}]*\})?\s*$/.test(lastText))
    return null;
  for (let i = 2; i <= children.length - 3; i += 2) {
    if (!/^\](\*)?\s*(\{[^}]*\})?\s*\[$/.test(children[i].value))
      return null;
  }
  return children.filter((_, i) => i % 2 === 1).map((linkNode, idx) => {
    const closingText = children[idx * 2 + 2].value;
    const closeMatch = closingText.match(/^\](\*)?\s*(\{[^}]*\})?/);
    const isPrimary = !!(closeMatch && closeMatch[1]);
    const attrStr = closeMatch && closeMatch[2] || "";
    const attrs = attrStr ? parseAttributes(attrStr) : {};
    return {
      type: "button",
      content: extractTextContent(linkNode),
      href: linkNode.url || "#",
      props: { ...attrs, variant: isPrimary ? "primary" : attrs.variant }
    };
  });
}
function serializeMdastChildren(children) {
  return (children || []).map((child) => {
    if (child.type === "link") {
      const text6 = (child.children || []).map((c) => c.value || "").join("");
      return `[${text6}](${child.url})`;
    }
    if (child.type === "strong")
      return `**${serializeMdastChildren(child.children)}**`;
    if (child.type === "emphasis")
      return `*${serializeMdastChildren(child.children)}*`;
    return child.value || "";
  }).join("");
}
function transformParagraph(node2, ctx) {
  const nextNode = ctx.peekNext();
  if (node2.children?.length) {
    const serialized = serializeMdastChildren(node2.children);
    const inlineMatch = serialized.match(/^\[\[\s*(.+?)\s*\]\](\{[^}]+\})?$/);
    if (inlineMatch) {
      const content4 = inlineMatch[1];
      const attrs = inlineMatch[2] || "";
      const items = content4.split("|").map((item) => item.trim());
      return transformInlineContainer({ type: "wiremdInlineContainer", content: content4, items, attributes: attrs.trim() }, ctx);
    }
  }
  const hasRichContent = node2.children && node2.children.some(
    (child) => child.type === "strong" || child.type === "emphasis" || child.type === "link" || child.type === "code" || child.type === "inlineCode" || child.type === "image"
  );
  const buttonLinks = tryParseButtonLinkSequence(node2.children);
  if (buttonLinks !== null) {
    if (buttonLinks.length === 1)
      return buttonLinks[0];
    return {
      type: "container",
      containerType: "button-group",
      children: buttonLinks,
      props: {}
    };
  }
  if (hasRichContent) {
    let content4 = extractTextContent(node2);
    content4 = content4.replace(/\s*:::\s*$/, "").trim();
    const buttonMatch = content4.match(/^\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?$/);
    if (buttonMatch) {
      const attrs = buttonMatch[3] ? parseAttributes(buttonMatch[3]) : {};
      return {
        type: "button",
        content: buttonMatch[1],
        props: {
          ...attrs,
          variant: buttonMatch[2] ? "primary" : void 0
        }
      };
    }
    const processedChildren = [];
    let currentText = "";
    const flushText = () => {
      if (currentText) {
        processedChildren.push({
          type: "text",
          content: currentText,
          props: {}
        });
        currentText = "";
      }
    };
    for (const child of node2.children) {
      if (child.type === "text") {
        const textParts = child.value.split(/(\[[^\]]+\](?:\*)?(?:\s*\{[^}]*\})?|:[a-z-]+:|\|[^|]+\|(?:\s*\{[^}]*\})?)/);
        for (const part of textParts) {
          const buttonMatch2 = part.match(/^\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?$/);
          if (buttonMatch2 && !/^\[[_*]+\]/.test(part)) {
            flushText();
            const attrs = buttonMatch2[3] ? parseAttributes(buttonMatch2[3]) : {};
            processedChildren.push({
              type: "button",
              content: buttonMatch2[1],
              props: {
                ...attrs,
                variant: buttonMatch2[2] ? "primary" : void 0
              }
            });
          } else if (part.match(/^:([a-z-]+):$/)) {
            flushText();
            const iconMatch2 = part.match(/^:([a-z-]+):$/);
            if (iconMatch2) {
              processedChildren.push({
                type: "icon",
                props: { name: iconMatch2[1] }
              });
            }
          } else if (part.match(/^\|([^|]+)\|(?:\s*(\{[^}]*\}))?$/)) {
            flushText();
            const pillMatch = part.match(/^\|([^|]+)\|(?:\s*(\{[^}]*\}))?$/);
            if (pillMatch) {
              const [, text6, attrs] = pillMatch;
              const props = parseAttributes(attrs || "");
              const validVariants = ["default", "primary", "success", "warning", "error"];
              const variantClass = props.classes?.find((c) => validVariants.includes(c));
              if (variantClass) {
                props.variant = variantClass;
                props.classes = props.classes.filter((c) => c !== variantClass);
              }
              processedChildren.push({ type: "badge", content: text6.trim(), props });
            }
          } else if (part) {
            currentText += part;
          }
        }
      } else if (child.type === "image") {
        flushText();
        processedChildren.push({
          type: "image",
          src: child.url || "",
          alt: child.alt || "",
          props: {}
        });
      } else if (child.type === "strong") {
        currentText += `<strong>${extractTextContent(child)}</strong>`;
      } else if (child.type === "emphasis") {
        currentText += `<em>${extractTextContent(child)}</em>`;
      } else if (child.type === "code" || child.type === "inlineCode") {
        currentText += `<code>${extractTextContent(child)}</code>`;
      } else if (child.type === "link") {
        currentText += `<a href="${child.url}">${extractTextContent(child)}</a>`;
      } else {
        currentText += extractTextContent(child);
      }
    }
    flushText();
    if (processedChildren.length === 1 && processedChildren[0].type === "text") {
      return {
        type: "paragraph",
        content: processedChildren[0].content,
        props: {}
      };
    }
    return {
      type: "container",
      containerType: "form-group",
      children: processedChildren,
      props: {}
    };
  }
  let content3 = extractTextContent(node2);
  content3 = content3.replace(/\s*:::\s*$/, "").trim();
  const checkboxMatch = content3.match(/^\[\s*([xX ])\s*\]\s+(.+)$/);
  if (checkboxMatch) {
    const checked = checkboxMatch[1].toLowerCase() === "x";
    let label = checkboxMatch[2];
    const attrMatch = label.match(/^(.+?)(\{[^}]+\})$/);
    let props = {};
    if (attrMatch) {
      label = attrMatch[1].trim();
      props = parseAttributes(attrMatch[2]);
    }
    return {
      type: "checkbox",
      label,
      checked,
      props
    };
  }
  const radioPattern = /\(([*•x ])\)\s+([^(]+?)(?=\s*\(|$)/g;
  const radioMatches = Array.from(content3.matchAll(radioPattern));
  if (radioMatches.length >= 2) {
    const radioButtons = [];
    for (const match of radioMatches) {
      const selected = match[1] !== " ";
      let label = match[2].trim();
      const attrMatch = label.match(/^(.+?)(\{[^}]+\})$/);
      let props = {};
      if (attrMatch) {
        label = attrMatch[1].trim();
        props = parseAttributes(attrMatch[2]);
      }
      radioButtons.push({
        type: "radio",
        label,
        selected,
        props
      });
    }
    return {
      type: "radio-group",
      props: { inline: true },
      children: radioButtons
    };
  }
  const inlineContainerMatch = content3.match(/^\[\[\s*(.+?)\s*\]\](\{[^}]+\})?/);
  if (inlineContainerMatch) {
    const itemsContent = inlineContainerMatch[1];
    const attrs = inlineContainerMatch[2] || "";
    const items = itemsContent.split("|").map((item) => item.trim());
    const inlineContainerNode = {
      type: "wiremdInlineContainer",
      content: itemsContent,
      items,
      attributes: attrs.trim()
    };
    const transformed = transformInlineContainer(inlineContainerNode, ctx);
    const remainingText = content3.substring(inlineContainerMatch[0].length).trim();
    if (remainingText) {
      return {
        type: "container",
        containerType: "section",
        children: [
          transformed,
          {
            type: "paragraph",
            content: remainingText,
            props: {}
          }
        ],
        props: {}
      };
    }
    return transformed;
  }
  const lines = content3.split("\n").filter((line) => line.trim());
  if (lines.length > 1) {
    const allWithIcons = lines.every((line) => /:([a-z-]+):/.test(line.trim()));
    if (allWithIcons) {
      const iconLines = [];
      for (const line of lines) {
        const trimmed = line.trim();
        const iconPattern = /:([a-z-]+):/g;
        const parts = trimmed.split(iconPattern);
        const lineChildren = [];
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            if (parts[i].trim()) {
              lineChildren.push({
                type: "text",
                content: parts[i],
                props: {}
              });
            }
          } else {
            lineChildren.push({
              type: "icon",
              props: { name: parts[i] }
            });
          }
        }
        if (lineChildren.length > 0) {
          iconLines.push({
            type: "paragraph",
            children: lineChildren,
            props: {}
          });
        }
      }
      if (iconLines.length > 0) {
        return {
          type: "container",
          containerType: "section",
          props: {},
          children: iconLines
        };
      }
    }
    const isInputLike = (s) => /\[[^\]]*_{3,}[^\]]*\]/.test(s) || /\[[_*]+\]/.test(s);
    const lineIsAllButtons = (line) => {
      const trimmed = line.trim();
      if (!trimmed || !/\[/.test(trimmed))
        return false;
      if (isInputLike(trimmed))
        return false;
      const stripped = trimmed.replace(/\[([^\]]+)\](\*)?(?:\s*\{[^}]*\})?/g, "").trim();
      return stripped === "";
    };
    const allButtons = lines.every(lineIsAllButtons);
    if (allButtons) {
      const buttons = [];
      const buttonPattern = /\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g;
      for (const line of lines) {
        let match;
        buttonPattern.lastIndex = 0;
        while ((match = buttonPattern.exec(line.trim())) !== null) {
          if (/^\[[_*]+\]/.test(match[0]))
            continue;
          const [, text6, isPrimary, attrs] = match;
          const props = parseAttributes(attrs || "");
          if (isPrimary)
            props.variant = "primary";
          buttons.push({ type: "button", content: text6, props });
        }
      }
      if (buttons.length > 1) {
        return {
          type: "container",
          containerType: "button-group",
          props: {},
          children: buttons
        };
      } else if (buttons.length === 1) {
        return buttons[0];
      }
    }
    const lastLine = lines[lines.length - 1].trim();
    const labelLineArray = lines.slice(0, -1);
    const labelLines = labelLineArray.join("\n");
    const lineIsAllInlineElements = (line) => {
      const trimmed = line.trim();
      if (!trimmed || !/\[/.test(trimmed))
        return false;
      const stripped = trimmed.replace(/\[([^\]]+)\](\*)?(?:\s*\{[^}]*\})?/g, "").trim();
      return stripped === "";
    };
    const labelLinesAreButtons = labelLineArray.length > 0 && labelLineArray.every(lineIsAllInlineElements);
    const isInputText = (t) => /^[_*]+$/.test(t) || /_{3,}$/.test(t);
    const parseLabelAsButtons = () => {
      const nodes = [];
      const btnPat = /\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g;
      for (const line of labelLineArray) {
        let m;
        btnPat.lastIndex = 0;
        while ((m = btnPat.exec(line.trim())) !== null) {
          const [, text6, isPrimary, attrs] = m;
          const p = parseAttributes(attrs || "");
          if (isInputText(text6)) {
            const placeholderMatch = text6.match(/^([^_*]+)_{3,}$/);
            if (placeholderMatch)
              p.placeholder = placeholderMatch[1].trim();
            nodes.push({ type: "input", props: p });
          } else {
            if (isPrimary)
              p.variant = "primary";
            nodes.push({ type: "button", content: text6, props: p });
          }
        }
      }
      return nodes;
    };
    const dropdownMatch2 = lastLine.match(/^\[([^\]]+)v\](?:\s*(\{[^}]+\}))?$/);
    if (dropdownMatch2) {
      const [, text6, attrs] = dropdownMatch2;
      const props = parseAttributes(attrs || "");
      const options = [];
      if (nextNode && nextNode.type === "list") {
        for (const item of nextNode.children || []) {
          const itemText = extractTextContent(item);
          options.push({
            type: "option",
            value: itemText,
            label: itemText,
            selected: false
          });
        }
        if (options.length > 0)
          ctx.consumeNext();
      }
      if (labelLinesAreButtons) {
        return {
          type: "container",
          containerType: "button-group",
          props: {},
          children: [...parseLabelAsButtons(), {
            type: "select",
            props: { ...props, placeholder: text6.replace(/[_\s]+$/, "").trim() || void 0 },
            options
          }]
        };
      }
      return {
        type: "container",
        containerType: "form-group",
        props: {},
        children: [
          labelLines ? { type: "text", content: labelLines } : null,
          {
            type: "select",
            props: {
              ...props,
              placeholder: text6.replace(/[_\s]+$/, "").trim() || void 0
            },
            options
          }
        ].filter(Boolean)
      };
    }
    if (/\[[^\]]*[_*][^\]]*\]/.test(lastLine)) {
      const match = lastLine.match(/^\[([^\]]+)\](?:\s*(\{[^}]+\}))?$/);
      if (match) {
        const [, pattern, attrs] = match;
        const props = parseAttributes(attrs || "");
        let placeholderText = "";
        if (pattern.includes("*") && pattern.replace(/[^*]/g, "").length > 3) {
          props.inputType = "password";
        } else {
          const placeholderMatch = pattern.match(/^([^_*]+)[_*]/);
          if (placeholderMatch) {
            placeholderText = placeholderMatch[1].trim();
            props.placeholder = placeholderText;
          }
        }
        const underscoreCount = pattern.replace(/[^_]/g, "").length;
        const asteriskCount = pattern.replace(/[^*]/g, "").length;
        const widthChars = underscoreCount > 0 ? underscoreCount : asteriskCount;
        if (widthChars > 0) {
          if (placeholderText) {
            props.width = Math.max(placeholderText.length + 6, widthChars);
          } else {
            props.width = widthChars;
          }
        }
        if (labelLinesAreButtons) {
          return {
            type: "container",
            containerType: "button-group",
            props: {},
            children: [...parseLabelAsButtons(), { type: "input", props }]
          };
        }
        return {
          type: "container",
          containerType: "form-group",
          props: {},
          children: [
            labelLines ? { type: "text", content: labelLines } : null,
            {
              type: "input",
              props
            }
          ].filter(Boolean)
        };
      }
    }
    if (/\[([^\]]+)\]/.test(lastLine)) {
      const textareaMatch = lastLine.match(/^\[([^\]]+)\](?:\s*(\{[^}]*rows:[^}]*\}))$/);
      if (textareaMatch) {
        const [, placeholder, attrs] = textareaMatch;
        const props = parseAttributes(attrs || "");
        if (labelLinesAreButtons) {
          return {
            type: "container",
            containerType: "button-group",
            props: {},
            children: [...parseLabelAsButtons(), {
              type: "textarea",
              props: { ...props, placeholder: placeholder.trim() }
            }]
          };
        }
        return {
          type: "container",
          containerType: "form-group",
          props: {},
          children: [
            labelLines ? { type: "text", content: labelLines } : null,
            {
              type: "textarea",
              props: {
                ...props,
                placeholder: placeholder.trim()
              }
            }
          ].filter(Boolean)
        };
      }
      const buttonPattern = /\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g;
      const buttons = [];
      let match;
      const isInputTextMulti = (t) => /^[_*]+$/.test(t) || /_{3,}$/.test(t);
      while ((match = buttonPattern.exec(lastLine)) !== null) {
        const [, text6, isPrimary, attrs] = match;
        const props = parseAttributes(attrs || "");
        if (isInputTextMulti(text6) || "rows" in props)
          continue;
        if (isPrimary)
          props.variant = "primary";
        buttons.push({ type: "button", content: text6, props });
      }
      if (buttons.length > 0) {
        if (labelLinesAreButtons) {
          return {
            type: "container",
            containerType: "button-group",
            props: {},
            children: [...parseLabelAsButtons(), ...buttons]
          };
        }
        if (labelLines) {
          return {
            type: "container",
            containerType: "form-group",
            props: {},
            children: [
              { type: "text", content: labelLines },
              ...buttons
            ]
          };
        }
        if (buttons.length === 1) {
          return buttons[0];
        }
        return {
          type: "container",
          containerType: "button-group",
          props: {},
          children: buttons
        };
      }
    }
  }
  const dropdownMatch = content3.match(/^\[([^\]]+)v\](?:\s*(\{[^}]+\}))?$/);
  if (dropdownMatch) {
    const [, text6, attrs] = dropdownMatch;
    const props = parseAttributes(attrs || "");
    const options = [];
    if (nextNode && nextNode.type === "list") {
      for (const item of nextNode.children || []) {
        const itemText = extractTextContent(item);
        options.push({
          type: "option",
          value: itemText,
          label: itemText,
          selected: false
        });
      }
      ctx.consumeNext();
    }
    return {
      type: "select",
      props: {
        ...props,
        placeholder: text6.replace(/[_\s]+$/, "").trim() || void 0
      },
      options
    };
  }
  if (/^\[[^\]]*[_*][^\]]*\](?:\s*\{[^}]+\})?$/.test(content3)) {
    const match = content3.match(/^\[([^\]]+)\](?:\s*(\{[^}]+\}))?$/);
    if (match) {
      const [, pattern, attrs] = match;
      const props = parseAttributes(attrs || "");
      if (pattern.includes("*") && pattern.replace(/[^*]/g, "").length > 3) {
        props.inputType = "password";
      } else {
        const placeholderMatch = pattern.match(/^([^_*]+)[_*]/);
        if (placeholderMatch) {
          props.placeholder = placeholderMatch[1].trim();
        }
      }
      return {
        type: "input",
        props
      };
    }
  }
  const singleTextareaMatch = content3.match(/^\[([^\]]+)\](?:\s*(\{[^}]*rows:[^}]*\}))$/);
  if (singleTextareaMatch) {
    const [, placeholder, attrs] = singleTextareaMatch;
    const props = parseAttributes(attrs || "");
    return {
      type: "textarea",
      props: {
        ...props,
        placeholder: placeholder.trim()
      }
    };
  }
  if (/\|([^|]+)\|/.test(content3)) {
    const textParts = content3.split(/(\|[^|]+\|(?:\s*\{[^}]*\})?)/);
    const children = [];
    const validVariants = ["default", "primary", "success", "warning", "error"];
    for (const part of textParts) {
      const pillMatch = part.match(/^\|([^|]+)\|(?:\s*(\{[^}]*\}))?$/);
      if (pillMatch) {
        const [, text6, attrs] = pillMatch;
        const props = parseAttributes(attrs || "");
        const variantClass = props.classes?.find((c) => validVariants.includes(c));
        if (variantClass) {
          props.variant = variantClass;
          props.classes = props.classes.filter((c) => c !== variantClass);
        }
        children.push({ type: "badge", content: text6.trim(), props });
      } else if (part.trim()) {
        children.push({ type: "text", content: part, props: {} });
      }
    }
    if (children.length === 1 && children[0].type === "badge") {
      return children[0];
    }
    if (children.length > 0) {
      return {
        type: "paragraph",
        children,
        props: {}
      };
    }
  }
  if (/\[([^\]]+)\]/.test(content3)) {
    const buttonPattern = /\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g;
    const elements = [];
    let match;
    const isInputText = (t) => /^[_*]+$/.test(t) || /_{3,}$/.test(t);
    const isSelectText = (t) => /_{1,}v$/.test(t);
    while ((match = buttonPattern.exec(content3)) !== null) {
      const [, text6, isPrimary, attrs] = match;
      const props = parseAttributes(attrs || "");
      if (isSelectText(text6)) {
        const placeholder = text6.replace(/_{1,}v$/, "").trim() || void 0;
        if (placeholder)
          props.placeholder = placeholder;
        elements.push({ type: "select", props, options: [] });
        continue;
      }
      if (isInputText(text6)) {
        const placeholderMatch = text6.match(/^([^_*]+)_{3,}$/);
        if (placeholderMatch)
          props.placeholder = placeholderMatch[1].trim();
        elements.push({ type: "input", props });
        continue;
      }
      if ("rows" in props)
        continue;
      if (isPrimary)
        props.variant = "primary";
      if (/:([a-z-]+):/.test(text6)) {
        const iconPattern = /:([a-z-]+):/g;
        const parts = text6.split(iconPattern);
        const children = [];
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            if (parts[i].trim()) {
              children.push({ type: "text", content: parts[i], props: {} });
            }
          } else {
            children.push({ type: "icon", props: { name: parts[i] } });
          }
        }
        elements.push({ type: "button", content: "", children, props });
      } else {
        elements.push({ type: "button", content: text6, props });
      }
    }
    const buttons = elements.filter((e) => e.type === "button");
    const hasMixed = elements.some((e) => e.type !== "button");
    if (elements.length === 1 && content3.trim() === content3.match(/\[([^\]]+)\](\*)?(?:\s*\{[^}]*\})?/)[0]) {
      return elements[0];
    } else if (elements.length > 0) {
      const remainingText = content3.replace(/\[([^\]]+)\](\*)?(?:\s*\{[^}]*\})?/g, "").trim();
      if (!remainingText && elements.length > 1) {
        return {
          type: "container",
          containerType: "button-group",
          props: {},
          children: elements
        };
      } else if (!remainingText && buttons.length === 1 && !hasMixed) {
        return buttons[0];
      } else if (!remainingText && elements.length === 1) {
        return elements[0];
      } else if (remainingText) {
        const children = [];
        let lastIndex = 0;
        const buttonMatches = Array.from(content3.matchAll(/\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g));
        buttonMatches.forEach((match2, idx) => {
          const textBefore = content3.substring(lastIndex, match2.index);
          if (textBefore.trim()) {
            children.push({ type: "text", content: textBefore, props: {} });
          }
          children.push(buttons[idx]);
          lastIndex = match2.index + match2[0].length;
        });
        const textAfter = content3.substring(lastIndex);
        if (textAfter.trim()) {
          children.push({ type: "text", content: textAfter, props: {} });
        }
        return {
          type: "paragraph",
          children,
          props: {}
        };
      }
    }
  }
  if (/:([a-z-]+):/.test(content3)) {
    const iconPattern = /:([a-z-]+):/g;
    const textParts = content3.split(iconPattern);
    const children = [];
    for (let i = 0; i < textParts.length; i++) {
      if (i % 2 === 0) {
        if (textParts[i].trim()) {
          children.push({
            type: "text",
            content: textParts[i],
            props: {}
          });
        }
      } else {
        children.push({
          type: "icon",
          props: { name: textParts[i] }
        });
      }
    }
    if (children.length > 0) {
      if (children.length === 1 && children[0].type === "icon") {
        return children[0];
      }
      if (children.length === 1 && children[0].type === "text") {
        return {
          type: "paragraph",
          content: children[0].content,
          props: {}
        };
      }
      const cleanedChildren = [...children];
      if (cleanedChildren.length > 0) {
        const lastChild = cleanedChildren[cleanedChildren.length - 1];
        if (lastChild.type === "text" && lastChild.content) {
          const cleaned = lastChild.content.replace(/\s*:::\s*$/, "").trim();
          if (cleaned) {
            cleanedChildren[cleanedChildren.length - 1] = { ...lastChild, content: cleaned };
          } else {
            cleanedChildren.pop();
          }
        }
      }
      return {
        type: "paragraph",
        children: cleanedChildren,
        props: {}
      };
    }
  }
  const iconMatch = content3.match(/^:([a-z-]+):$/);
  if (iconMatch) {
    return {
      type: "icon",
      props: {
        name: iconMatch[1]
      }
    };
  }
  const cleanedContent = content3.replace(/\s*:::\s*$/, "").trim();
  return {
    type: "paragraph",
    content: cleanedContent,
    props: {}
  };
}
function transformList(node2, ctx) {
  const children = [];
  for (const item of node2.children) {
    const transformed = ctx.transformChild(item);
    if (transformed) {
      children.push(transformed);
    }
  }
  return {
    type: "list",
    ordered: node2.ordered || false,
    props: {},
    children
  };
}
function transformListItem(node2, ctx) {
  let immediateContent = "";
  const nestedChildren = [];
  if (node2.children && Array.isArray(node2.children)) {
    for (const child of node2.children) {
      if (child.type === "paragraph" && !immediateContent) {
        immediateContent = extractTextContent(child);
      } else if (child.type === "list") {
        const transformed = transformList(child, ctx);
        if (transformed) {
          nestedChildren.push(transformed);
        }
      }
    }
  }
  const content3 = immediateContent || extractTextContent(node2);
  if (node2.checked !== null && node2.checked !== void 0) {
    const attrMatch = content3.match(/^(.+?)(\{[^}]+\})$/);
    let label = content3;
    let props = {};
    if (attrMatch) {
      label = attrMatch[1].trim();
      props = parseAttributes(attrMatch[2]);
    }
    if (/:([a-z-]+):/.test(label)) {
      const iconPattern = /:([a-z-]+):/g;
      const parts = label.split(iconPattern);
      const children = [];
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          if (parts[i].trim()) {
            children.push({
              type: "text",
              content: parts[i],
              props: {}
            });
          }
        } else {
          children.push({
            type: "icon",
            props: { name: parts[i] }
          });
        }
      }
      if (nestedChildren.length > 0) {
        children.push(...nestedChildren);
      }
      return {
        type: "checkbox",
        label: "",
        // Will use children instead
        checked: node2.checked === true,
        props: { ...props, hasChildren: true },
        children
      };
    }
    return {
      type: "checkbox",
      label,
      checked: node2.checked === true,
      props,
      children: nestedChildren.length > 0 ? nestedChildren : void 0
    };
  }
  const radioMatch = content3.match(/^\(([•x* ])\)\s*(.+)$/);
  if (radioMatch) {
    let label = radioMatch[2];
    const attrMatch = label.match(/^(.+?)(\{[^}]+\})$/);
    let props = {};
    if (attrMatch) {
      label = attrMatch[1].trim();
      props = parseAttributes(attrMatch[2]);
    }
    return {
      type: "radio",
      label,
      selected: radioMatch[1] !== " ",
      props,
      children: nestedChildren.length > 0 ? nestedChildren : void 0
    };
  }
  if (/:([a-z-]+):/.test(content3)) {
    const iconPattern = /:([a-z-]+):/g;
    const parts = content3.split(iconPattern);
    const children = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        if (parts[i].trim()) {
          children.push({
            type: "text",
            content: parts[i],
            props: {}
          });
        }
      } else {
        children.push({
          type: "icon",
          props: { name: parts[i] }
        });
      }
    }
    if (nestedChildren.length > 0) {
      children.push(...nestedChildren);
    }
    return {
      type: "list-item",
      children,
      props: {}
    };
  }
  return {
    type: "list-item",
    content: content3,
    props: {},
    children: nestedChildren.length > 0 ? nestedChildren : void 0
  };
}
function transformTable(node2, ctx) {
  const children = [];
  const align = node2.align || [];
  for (let rowIndex = 0; rowIndex < node2.children.length; rowIndex++) {
    const row2 = node2.children[rowIndex];
    const isHeader = rowIndex === 0;
    const cells = [];
    for (let cellIndex = 0; cellIndex < row2.children.length; cellIndex++) {
      const cell = row2.children[cellIndex];
      const cellAlign = align[cellIndex] || "left";
      const cellChildren = [];
      for (const child of cell.children || []) {
        if (child.type === "text") {
          const iconMatch = /^:([a-z-]+):\s*([\s\S]*)$/.exec(child.value);
          if (iconMatch) {
            cellChildren.push({
              type: "icon",
              props: { name: iconMatch[1] }
            });
            const remainder = iconMatch[2].trim();
            if (remainder) {
              cellChildren.push({
                type: "text",
                content: remainder,
                props: {}
              });
            }
          } else {
            cellChildren.push({
              type: "text",
              content: child.value,
              props: {}
            });
          }
        } else if (child.type === "strong") {
          cellChildren.push({
            type: "text",
            content: `<strong>${extractTextContent(child)}</strong>`,
            props: {}
          });
        } else if (child.type === "emphasis") {
          cellChildren.push({
            type: "text",
            content: `<em>${extractTextContent(child)}</em>`,
            props: {}
          });
        } else if (child.type === "code") {
          cellChildren.push({
            type: "text",
            content: `<code>${extractTextContent(child)}</code>`,
            props: {}
          });
        } else {
          const transformed = ctx.transformChild(child);
          if (transformed) {
            cellChildren.push(transformed);
          }
        }
      }
      cells.push({
        type: "table-cell",
        content: extractTextContent(cell),
        children: cellChildren.length > 0 ? cellChildren : void 0,
        align: cellAlign,
        header: isHeader
      });
    }
    if (isHeader) {
      children.push({
        type: "table-header",
        children: cells
      });
    } else {
      children.push({
        type: "table-row",
        children: cells
      });
    }
  }
  return {
    type: "table",
    props: {},
    children
  };
}
function transformBlockquote(node2, ctx) {
  const children = [];
  for (const child of node2.children) {
    const transformed = ctx.transformChild(child);
    if (transformed) {
      children.push(transformed);
    }
  }
  return {
    type: "blockquote",
    props: {},
    children
  };
}
function extractTextContent(node2) {
  if (typeof node2 === "string") {
    return node2;
  }
  if (node2.value) {
    return node2.value;
  }
  if (node2.children && Array.isArray(node2.children)) {
    return node2.children.map(extractTextContent).join("");
  }
  return "";
}
function parseAttributes(attrString) {
  const props = {
    classes: []
  };
  if (!attrString) {
    return props;
  }
  const inner = attrString.replace(/^\{|\}$/g, "").trim();
  if (!inner) {
    return props;
  }
  const parts = inner.split(/\s+/);
  for (const part of parts) {
    if (part.startsWith(".")) {
      props.classes.push(part.slice(1));
    } else if (part.startsWith(":")) {
      props.state = part.slice(1);
    } else if (part.includes(":")) {
      const [key, value] = part.split(":", 2);
      props[key] = value || true;
    } else {
      props[part] = true;
    }
  }
  return props;
}

// packages/core/src/parser/remark-containers.ts
function parseContainerOpener(node2) {
  if (node2.type !== "paragraph" || !node2.children?.length || node2.children[0].type !== "text")
    return null;
  const firstLine = node2.children[0].value.split("\n")[0].trim();
  const match = firstLine.match(/^:::\s*(\S+)(?:\s*(\{[^}]+\}))?(?:\s+(.+))?$/);
  if (!match)
    return null;
  return {
    containerType: (match[1] || "section").trim(),
    attrs: match[2] ? match[2].trim() : "",
    inline: match[3] ? match[3].trim() : ""
  };
}
function isContainerCloser(node2) {
  return node2.type === "paragraph" && node2.children?.length > 0 && node2.children[0].type === "text" && node2.children[0].value.trim() === ":::";
}
function makeContainerNode(containerType, attrs, children, position2) {
  return {
    type: "wiremdContainer",
    containerType,
    attributes: attrs,
    children,
    position: position2,
    data: {
      hName: "div",
      hProperties: {
        className: ["wiremd-container", `wiremd-${containerType}`]
      }
    }
  };
}
function finishContainer(containerType, attrs, inline, children, nextIndex, position2) {
  const node2 = makeContainerNode(containerType, attrs, children, position2);
  if (inline)
    node2.inline = inline;
  if (containerType === "demo") {
    node2.rawContent = mdastNodesToText(children);
  }
  return { node: node2, nextIndex };
}
function collectContainer(nodes, startIdx) {
  const openerNode = nodes[startIdx];
  const opener = parseContainerOpener(openerNode);
  if (openerNode.children.length === 1 && openerNode.children[0].type === "text") {
    const fullText = openerNode.children[0].value;
    const lines = fullText.split("\n");
    let closingIdx = -1;
    for (let j = lines.length - 1; j >= 1; j--) {
      if (lines[j].trim() === ":::") {
        closingIdx = j;
        break;
      }
    }
    if (closingIdx > 0) {
      const contentText = lines.slice(1, closingIdx).join("\n").trim();
      const children = [];
      if (opener.inline) {
        children.push({
          type: "paragraph",
          children: [{ type: "text", value: opener.inline }]
        });
      }
      if (contentText) {
        children.push({
          type: "paragraph",
          children: [{ type: "text", value: contentText }]
        });
      }
      const trailingText = lines.slice(closingIdx + 1).join("\n").trim();
      const trailing = trailingText ? [{ type: "paragraph", children: [{ type: "text", value: trailingText }] }] : void 0;
      return {
        ...finishContainer(opener.containerType, opener.attrs, opener.inline, children, startIdx + 1, openerNode.position),
        trailing
      };
    }
  }
  const lastChild = openerNode.children[openerNode.children.length - 1];
  if (lastChild?.type === "text" && (lastChild.value.trim().endsWith(":::") || /\n:::\s*$/.test(lastChild.value))) {
    const processedChildren = [];
    let startChildIdx = 0;
    if (openerNode.children[0].type === "text") {
      const firstLines = openerNode.children[0].value.split("\n");
      if (firstLines.length > 1 && firstLines[1].trim()) {
        processedChildren.push({
          type: "text",
          value: firstLines.slice(1).join("\n").trim()
        });
      }
      startChildIdx = 1;
    }
    for (let j = startChildIdx; j < openerNode.children.length; j++) {
      const ch = openerNode.children[j];
      if (j === openerNode.children.length - 1 && ch.type === "text") {
        const value = ch.value.replace(/\n?:::$/, "").trim();
        if (value)
          processedChildren.push({ ...ch, value });
      } else {
        processedChildren.push(ch);
      }
    }
    const contentChildren = processedChildren.length > 0 ? [{ type: "paragraph", children: processedChildren }] : [];
    if (opener.inline) {
      contentChildren.unshift({
        type: "paragraph",
        children: [{ type: "text", value: opener.inline }]
      });
    }
    return finishContainer(opener.containerType, opener.attrs, opener.inline, contentChildren, startIdx + 1, openerNode.position);
  }
  const containerChildren = [];
  if (opener.inline) {
    containerChildren.push({
      type: "paragraph",
      children: [{ type: "text", value: opener.inline }]
    });
  }
  let pendingAfterOpener = null;
  if (openerNode.children.length === 1 && openerNode.children[0].type === "text") {
    const fullText = openerNode.children[0].value;
    const afterOpener = fullText.split("\n").slice(1).join("\n").trim();
    if (afterOpener) {
      const syntheticPara = {
        type: "paragraph",
        children: [{ type: "text", value: afterOpener }]
      };
      if (parseContainerOpener(syntheticPara)) {
        pendingAfterOpener = syntheticPara;
      } else {
        containerChildren.push(syntheticPara);
      }
    }
  } else if (openerNode.children.length > 1 && openerNode.children[0]?.type === "text") {
    const firstText = openerNode.children[0].value;
    const newlineIdx = firstText.indexOf("\n");
    const restChildren = [];
    if (newlineIdx >= 0) {
      const remainder = firstText.slice(newlineIdx + 1);
      if (remainder)
        restChildren.push({ type: "text", value: remainder });
      restChildren.push(...openerNode.children.slice(1));
    } else {
      const startSliceIdx = openerNode.children[1]?.type === "break" ? 2 : 1;
      restChildren.push(...openerNode.children.slice(startSliceIdx));
    }
    if (restChildren.length > 0) {
      const syntheticPara = {
        type: "paragraph",
        children: restChildren
      };
      if (parseContainerOpener(syntheticPara)) {
        pendingAfterOpener = syntheticPara;
      } else {
        containerChildren.push(syntheticPara);
      }
    }
  }
  let i = startIdx + 1;
  if (pendingAfterOpener) {
    const virtualNodes = [pendingAfterOpener, ...nodes.slice(startIdx + 1)];
    const inner = collectContainer(virtualNodes, 0);
    containerChildren.push(inner.node);
    if (inner.trailing)
      containerChildren.push(...inner.trailing);
    i = startIdx + inner.nextIndex;
  }
  while (i < nodes.length) {
    const child = nodes[i];
    if (isContainerCloser(child)) {
      i++;
      break;
    }
    if (parseContainerOpener(child)) {
      const inner = collectContainer(nodes, i);
      containerChildren.push(inner.node);
      if (inner.trailing)
        containerChildren.push(...inner.trailing);
      i = inner.nextIndex;
      continue;
    }
    if (child.type === "paragraph" && child.children?.length) {
      const lastInline = child.children[child.children.length - 1];
      if (lastInline?.type === "text" && lastInline.value.includes("\n:::")) {
        const trimmed = lastInline.value.replace(/\n:::$/, "").trimEnd();
        if (trimmed) {
          containerChildren.push({
            ...child,
            children: [
              ...child.children.slice(0, -1),
              { ...lastInline, value: trimmed }
            ]
          });
        } else if (child.children.length > 1) {
          containerChildren.push({
            ...child,
            children: child.children.slice(0, -1)
          });
        }
        i++;
        break;
      }
    }
    containerChildren.push(child);
    i++;
  }
  return finishContainer(opener.containerType, opener.attrs, opener.inline, containerChildren, i, openerNode.position);
}
function mdastInlinesToText(children) {
  return (children || []).map((child) => {
    switch (child.type) {
      case "text":
        return child.value;
      case "strong":
        return "**" + mdastInlinesToText(child.children) + "**";
      case "emphasis":
        return "_" + mdastInlinesToText(child.children) + "_";
      case "inlineCode":
        return "`" + child.value + "`";
      case "link":
        return "[" + mdastInlinesToText(child.children) + "](" + child.url + ")";
      case "image":
        return "![" + (child.alt || "") + "](" + child.url + ")";
      default:
        return "";
    }
  }).join("");
}
function mdastNodesToText(nodes) {
  return nodes.map((node2) => {
    switch (node2.type) {
      case "heading":
        return "#".repeat(node2.depth) + " " + mdastInlinesToText(node2.children);
      case "paragraph":
        return mdastInlinesToText(node2.children);
      case "list":
        return node2.children.map((item) => {
          const prefix = node2.ordered ? "1. " : item.checked === true ? "- [x] " : item.checked === false ? "- [ ] " : "- ";
          return prefix + mdastNodesToText(item.children || []).replace(/\n/g, "\n  ");
        }).join("\n");
      case "table": {
        const rows = node2.children.map(
          (row2) => row2.children.map((cell) => mdastInlinesToText(cell.children || []))
        );
        if (!rows.length)
          return "";
        const colWidths = rows[0].map(
          (_, ci) => Math.max(...rows.map((r) => (r[ci] || "").length), 3)
        );
        const formatRow = (cells) => "| " + cells.map((c, i) => c.padEnd(colWidths[i])).join(" | ") + " |";
        const separator2 = "| " + colWidths.map((w) => "-".repeat(w)).join(" | ") + " |";
        return [formatRow(rows[0]), separator2, ...rows.slice(1).map(formatRow)].join("\n");
      }
      case "code":
        return "```" + (node2.lang || "") + "\n" + node2.value + "\n```";
      case "blockquote":
        return mdastNodesToText(node2.children).split("\n").map((l) => "> " + l).join("\n");
      case "wiremdContainer": {
        const inlineSuffix = node2.inline ? " " + node2.inline : "";
        const attrs = node2.attributes ? " " + node2.attributes : "";
        const opener = "::: " + node2.containerType + inlineSuffix + attrs;
        let children = node2.children || [];
        if (node2.inline) {
          const first = children[0];
          if (first?.type === "paragraph" && first.children?.length === 1 && first.children[0]?.type === "text" && first.children[0].value?.trim() === node2.inline) {
            children = children.slice(1);
          }
        }
        return opener + "\n" + mdastNodesToText(children) + "\n:::";
      }
      default:
        return "";
    }
  }).filter(Boolean).join("\n\n");
}
function processNodes(nodes) {
  const result = [];
  let i = 0;
  while (i < nodes.length) {
    const node2 = nodes[i];
    if (parseContainerOpener(node2)) {
      const { node: containerNode, trailing, nextIndex } = collectContainer(nodes, i);
      result.push(containerNode);
      if (trailing)
        result.push(...trailing);
      i = nextIndex;
    } else {
      result.push(node2);
      i++;
    }
  }
  return result;
}
var remarkWiremdContainers = () => {
  return (tree) => {
    tree.children = processNodes(tree.children);
  };
};

// packages/core/src/parser/remark-inline-containers.ts
function serializeChild(c) {
  if (c.type === "link") {
    const text6 = (c.children || []).map((cc) => cc.value || "").join("");
    return `[${text6}](${c.url})`;
  }
  if (c.type === "strong")
    return `**${(c.children || []).map(serializeChild).join("")}**`;
  if (c.type === "emphasis")
    return `*${(c.children || []).map(serializeChild).join("")}*`;
  return c.value || "";
}
var remarkWiremdInlineContainers = () => {
  return (tree) => {
    const newChildren = [];
    for (const node2 of tree.children) {
      if (node2.type === "paragraph" && node2.children && node2.children.length > 0) {
        const text6 = node2.children.map(serializeChild).join("");
        const match = text6.match(/^\[\[\s*(.+?)\s*\]\](\{[^}]+\})?$/);
        if (match) {
          const content3 = match[1];
          const attrs = match[2] || "";
          const items = content3.split("|").map((item) => item.trim());
          newChildren.push({
            type: "wiremdInlineContainer",
            content: content3,
            items,
            attributes: attrs.trim(),
            position: node2.position,
            children: node2.children,
            data: {
              hName: "nav",
              hProperties: {
                className: ["wiremd-nav"]
              }
            }
          });
          continue;
        }
      }
      newChildren.push(node2);
    }
    tree.children = newChildren;
  };
};

// packages/core/src/parser/index.ts
var INCLUDE_PATTERN = /!\[\[\s*([^\]]+?\.md)\s*\]\]/g;
function resolveIncludes(markdown, basePath) {
  const dir = (0, import_path.dirname)((0, import_path.resolve)(basePath));
  const parts = markdown.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
  return parts.map((part, i) => {
    if (i % 2 === 1)
      return part;
    return part.replace(INCLUDE_PATTERN, (_match, relPath) => {
      const targetPath = (0, import_path.resolve)(dir, relPath.trim());
      if (!(0, import_fs.existsSync)(targetPath)) {
        return `> \u26A0\uFE0F Could not include: ${relPath}`;
      }
      try {
        return (0, import_fs.readFileSync)(targetPath, "utf-8");
      } catch {
        return `> \u26A0\uFE0F Could not include: ${relPath}`;
      }
    });
  }).join("");
}
function parse2(input2, options = {}) {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkWiremdInlineContainers).use(remarkWiremdContainers);
  const mdast = processor.parse(input2);
  const processed = processor.runSync(mdast);
  const wiremdAST = transformToWiremdAST(processed, options);
  return wiremdAST;
}

// packages/core/src/cli/server.ts
var import_http = require("http");
var import_fs2 = require("fs");
var import_crypto = require("crypto");
var import_path2 = require("path");
var liveReloadScript = `
<style>
  /* Wiremd Live Preview UI */
  #wiremd-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
  }

  #wiremd-toolbar .logo {
    font-weight: 600;
    font-size: 14px;
  }

#wiremd-toolbar .status {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    background: rgba(255,255,255,0.2);
    border-radius: 12px;
    font-size: 12px;
  }

  #wiremd-toolbar .status.connected {
    background: rgba(76, 175, 80, 0.3);
  }

  #wiremd-toolbar .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  #wiremd-toolbar .spacer {
    flex: 1;
  }

  #wiremd-toolbar .viewport-selector {
    display: flex;
    gap: 8px;
  }

  #wiremd-toolbar .viewport-btn {
    padding: 4px 10px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
  }

  #wiremd-toolbar .viewport-btn:hover {
    background: rgba(255,255,255,0.25);
  }

  #wiremd-toolbar .viewport-btn.active {
    background: rgba(255,255,255,0.35);
    border-color: rgba(255,255,255,0.5);
  }

  #wiremd-toolbar .comments-btn {
    padding: 4px 10px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
    opacity: 0.5;
  }

  #wiremd-toolbar .comments-btn.active {
    background: rgba(249,168,37,0.35);
    border-color: rgba(249,168,37,0.7);
    opacity: 1;
  }

  #wiremd-toolbar .comments-btn:hover {
    opacity: 1;
  }

  /* Body-level class hides panel + annotations when comments toggled off */
  body.wmd-comments-hidden .wmd-comments-panel { display: none !important; }
  body.wmd-comments-hidden .wmd-annotated { outline: none !important; }
  body.wmd-comments-hidden .wmd-comment-badge { display: none !important; }

  #wiremd-error-overlay {
    display: none;
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 800px;
    width: 90%;
    background: #ff5252;
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  #wiremd-error-overlay.show {
    display: block;
  }

  #wiremd-error-overlay h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
  }

  #wiremd-error-overlay pre {
    background: rgba(0,0,0,0.2);
    padding: 12px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 12px;
    margin: 12px 0 0 0;
  }

  #wiremd-error-overlay .close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 4px 8px;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  #wiremd-error-overlay .close-btn:hover {
    opacity: 1;
  }

  #wiremd-preview-wrapper {
    transition: padding 0.3s ease;
  }

  #wiremd-preview-wrapper.viewport-mobile {
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  #wiremd-preview-wrapper.viewport-mobile > * {
    max-width: 375px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  #wiremd-preview-wrapper.viewport-tablet {
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  #wiremd-preview-wrapper.viewport-tablet > * {
    max-width: 768px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  #wiremd-preview-wrapper.viewport-laptop {
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  #wiremd-preview-wrapper.viewport-laptop > * {
    max-width: 1024px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .wiremd-reload-indicator {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(102, 126, 234, 0.95);
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 13px;
    display: none;
    animation: fadeIn 0.3s ease;
  }

  .wiremd-reload-indicator.show {
    display: block;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>

<div id="wiremd-toolbar">
  <div class="logo">\u26A1 Wiremd Live</div>
<div class="status" id="wiremd-status">
    <div class="status-dot"></div>
    <span>Connecting...</span>
  </div>
  <div class="spacer"></div>
  <button class="comments-btn" id="wiremd-comments-btn">\u{1F4AC} Comments</button>
  <div class="viewport-selector">
    <button class="viewport-btn active" data-viewport="full">Full</button>
    <button class="viewport-btn" data-viewport="laptop">\u{1F4BB} Laptop</button>
    <button class="viewport-btn" data-viewport="tablet">\u{1F4F1} Tablet</button>
    <button class="viewport-btn" data-viewport="mobile">\u{1F4F1} Mobile</button>
  </div>
</div>

<div id="wiremd-error-overlay">
  <button class="close-btn" onclick="this.parentElement.classList.remove('show')">\xD7</button>
  <h3>\u26A0\uFE0F Render Error</h3>
  <div id="wiremd-error-message"></div>
</div>

<div class="wiremd-reload-indicator" id="wiremd-reload-indicator">
  \u{1F504} Reloading preview...
</div>

<script>
  // Enhanced live-reload client with error handling
  (function() {
    let retryCount = 0;
    const maxRetries = 10;
    let ws = null;

    // Wrap existing content in preview wrapper
    const body = document.body;
    const wrapper = document.createElement('div');
    wrapper.id = 'wiremd-preview-wrapper';
    wrapper.className = 'viewport-full';
    while (body.firstChild && body.firstChild.id !== 'wiremd-toolbar' && body.firstChild.id !== 'wiremd-error-overlay' && body.firstChild.id !== 'wiremd-reload-indicator') {
      wrapper.appendChild(body.firstChild);
    }
    body.appendChild(wrapper);

    body.style.paddingTop = '56px';

    const statusEl = document.getElementById('wiremd-status');
    const errorOverlay = document.getElementById('wiremd-error-overlay');
    const errorMessage = document.getElementById('wiremd-error-message');
    const reloadIndicator = document.getElementById('wiremd-reload-indicator');


    // Comments toggle \u2014 show/hide panel + annotations via body class
    const commentsBtn = document.getElementById('wiremd-comments-btn');
    const hasComments = !!document.querySelector('.wmd-comments-panel');
    const PANEL_WIDTH = '276px';
    document.body.style.transition = 'padding-right 0.2s ease';
    if (hasComments) {
      commentsBtn.classList.add('active');
      document.body.style.paddingRight = PANEL_WIDTH;
    }
    commentsBtn.addEventListener('click', () => {
      const nowHidden = document.body.classList.toggle('wmd-comments-hidden');
      document.body.style.paddingRight = nowHidden ? '0' : PANEL_WIDTH;
      commentsBtn.classList.toggle('active', !nowHidden);
    });

    // Viewport switcher
    document.querySelectorAll('.viewport-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const viewport = btn.dataset.viewport;
        wrapper.className = 'viewport-' + viewport;
      });
    });

    function updateStatus(connected) {
      if (connected) {
        statusEl.className = 'status connected';
        statusEl.innerHTML = '<div class="status-dot"></div><span>Connected</span>';
      } else {
        statusEl.className = 'status';
        statusEl.innerHTML = '<div class="status-dot"></div><span>Disconnected</span>';
      }
    }

    function showError(message) {
      errorMessage.textContent = message;
      errorOverlay.classList.add('show');
      setTimeout(() => {
        errorOverlay.classList.remove('show');
      }, 8000);
    }

    function connect() {
      ws = new WebSocket('ws://localhost:__PORT__/__ws');

      ws.onopen = () => {
        console.log('[wiremd] Connected to live-reload server');
        updateStatus(true);
        retryCount = 0;
      };

      ws.onmessage = (event) => {
        const data = event.data;

        if (data === 'reload') {
          console.log('[wiremd] Reloading...');
          reloadIndicator.classList.add('show');
          setTimeout(() => {
            window.location.reload();
          }, 300);
        } else if (data.startsWith('error:')) {
          const errorMsg = data.substring(6);
          showError(errorMsg);
        }
      };

      ws.onclose = () => {
        updateStatus(false);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(\`[wiremd] Reconnecting... (\${retryCount}/\${maxRetries})\`);
          setTimeout(connect, 1000);
        } else {
          showError('Lost connection to dev server. Please restart the server.');
        }
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    connect();

    // Handle page errors
    window.addEventListener('error', (event) => {
      console.error('[wiremd] Page error:', event.error);
    });
  })();
</script>
`;
var wsClients = /* @__PURE__ */ new Set();
var IGNORED_DIRS = /* @__PURE__ */ new Set(["node_modules", "dist", "build", ".git"]);
function buildTree(dir, base) {
  const node2 = { dirs: {}, files: [] };
  for (const entry of (0, import_fs2.readdirSync)(dir).sort()) {
    if (entry.startsWith("_") || entry.startsWith(".") || IGNORED_DIRS.has(entry))
      continue;
    const full = (0, import_path2.join)(dir, entry);
    let stat4;
    try {
      stat4 = (0, import_fs2.statSync)(full);
    } catch {
      continue;
    }
    if (stat4.isDirectory()) {
      node2.dirs[entry] = buildTree(full, base);
    } else if (entry.endsWith(".md")) {
      node2.files.push((0, import_path2.relative)(base, full));
    }
  }
  return node2;
}
function renderTree(node2, depth = 0) {
  const parts = [];
  for (const file of node2.files) {
    const name = file.split("/").pop();
    parts.push(`<li class="file"><a href="/${file}">${name}</a></li>`);
  }
  for (const [dirName, child] of Object.entries(node2.dirs)) {
    const inner = renderTree(child, depth + 1);
    if (inner) {
      const open2 = depth === 0 ? " open" : "";
      parts.push(`<li class="dir"><details${open2}><summary>${dirName}</summary><ul>${inner}</ul></details></li>`);
    }
  }
  return parts.join("");
}
function renderIndex(rootDir) {
  const tree = buildTree(rootDir, rootDir);
  const inner = renderTree(tree);
  const dirName = rootDir.split("/").pop();
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>wiremd</title>
<style>
body{font-family:system-ui,sans-serif;max-width:480px;margin:60px auto;padding:0 20px;color:#222}
h1{font-size:1rem;color:#888;margin-bottom:1rem;font-weight:500}
ul{list-style:none;padding:0;margin:0}
li{margin:0}
li.dir{margin-top:4px}
details>ul{padding-left:16px;border-left:1px solid #e0e0e0;margin:2px 0 2px 8px}
summary{cursor:pointer;padding:6px 8px;border-radius:4px;font-size:0.85rem;font-weight:600;color:#555;user-select:none;list-style:none}
summary:hover{background:#f5f5f5}
summary::before{content:'\u25B8 ';font-size:0.75em;color:#aaa}
details[open]>summary::before{content:'\u25BE '}
a{display:block;padding:5px 8px;border-radius:4px;color:#333;text-decoration:none;font-size:0.9rem}
a:hover{background:#f0f0f0}
</style>
</head><body><h1>${dirName}/</h1><ul>${inner}</ul></body></html>`;
}
function startServer(options) {
  const { port, outputPath, renderFile, inputFile } = options;
  const rootDir = options.rootDir || (outputPath ? (0, import_path2.dirname)(outputPath) : process.cwd());
  const injectScript = (html2) => {
    const script = liveReloadScript.replace("__PORT__", String(port));
    return html2.replace("</body>", `${script}
</body>`);
  };
  const server = (0, import_http.createServer)((req, res) => {
    if (req.url === "/__ws") {
      res.writeHead(426, { "Content-Type": "text/plain" });
      res.end("This endpoint requires WebSocket upgrade");
      return;
    }
    const urlPath = (req.url || "/").split("?")[0];
    let html2 = null;
    if (urlPath === "/_index") {
      html2 = renderIndex(rootDir);
      res.writeHead(200, { "Content-Type": "text/html", "Cache-Control": "no-cache, no-store, must-revalidate" });
      res.end(injectScript(html2));
      return;
    }
    if (urlPath === "/" || urlPath === "") {
      if (inputFile) {
        res.writeHead(302, { Location: `/${inputFile}` });
        res.end();
        return;
      }
      if (!outputPath) {
        html2 = renderIndex(rootDir);
        res.writeHead(200, { "Content-Type": "text/html", "Cache-Control": "no-cache, no-store, must-revalidate" });
        res.end(injectScript(html2));
        return;
      }
      try {
        html2 = (0, import_fs2.readFileSync)(outputPath, "utf-8");
      } catch {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Error reading: ${outputPath}`);
        return;
      }
    } else if (renderFile) {
      const requestedFile = urlPath.replace(/^\//, "");
      const targetPath = (0, import_path2.join)(rootDir, requestedFile);
      if (targetPath.endsWith(".md") && (0, import_fs2.existsSync)(targetPath)) {
        try {
          html2 = renderFile(targetPath);
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(`Error rendering ${targetPath}: ${err.message}`);
          return;
        }
      } else if (targetPath.endsWith(".html")) {
        if ((0, import_fs2.existsSync)(targetPath)) {
          try {
            html2 = (0, import_fs2.readFileSync)(targetPath, "utf-8");
          } catch {
          }
        }
        if (!html2) {
          const mdPath = targetPath.replace(/\.html$/, ".md");
          if ((0, import_fs2.existsSync)(mdPath)) {
            try {
              html2 = renderFile(mdPath);
            } catch (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end(`Error rendering ${mdPath}: ${err.message}`);
              return;
            }
          }
        }
      }
    }
    if (!html2) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`Not found: ${urlPath}`);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html", "Cache-Control": "no-cache, no-store, must-revalidate" });
    res.end(injectScript(html2));
  });
  server.on("upgrade", (req, socket, _head) => {
    if (req.url === "/__ws") {
      const key = req.headers["sec-websocket-key"];
      const hash = (0, import_crypto.createHash)("sha1").update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64");
      socket.write(
        `HTTP/1.1 101 Switching Protocols\r
Upgrade: websocket\r
Connection: Upgrade\r
Sec-WebSocket-Accept: ${hash}\r
\r
`
      );
      wsClients.add(socket);
      socket.on("close", () => {
        wsClients.delete(socket);
      });
      socket.on("error", () => {
        wsClients.delete(socket);
      });
    }
  });
  server.listen(port, () => {
    console.log(`\u{1F680} Dev server running at http://localhost:${port}`);
    console.log(`\u{1F4E1} Live-reload enabled`);
    console.log(`Press Ctrl+C to stop`);
  });
  return server;
}
function notifyReload() {
  sendMessageToClients("reload");
}
function notifyError(errorMessage) {
  sendMessageToClients(`error:${errorMessage}`);
}
function sendMessageToClients(message) {
  wsClients.forEach((socket) => {
    try {
      const buffer = Buffer.alloc(2 + message.length);
      buffer[0] = 129;
      buffer[1] = message.length;
      buffer.write(message, 2);
      socket.write(buffer);
    } catch (error) {
      wsClients.delete(socket);
    }
  });
}

// node_modules/.pnpm/chokidar@4.0.3/node_modules/chokidar/esm/index.js
var import_fs4 = require("fs");
var import_promises3 = require("fs/promises");
var import_events = require("events");
var sysPath2 = __toESM(require("path"), 1);

// node_modules/.pnpm/readdirp@4.1.2/node_modules/readdirp/esm/index.js
var import_promises = require("node:fs/promises");
var import_node_stream = require("node:stream");
var import_node_path2 = require("node:path");
var EntryTypes = {
  FILE_TYPE: "files",
  DIR_TYPE: "directories",
  FILE_DIR_TYPE: "files_directories",
  EVERYTHING_TYPE: "all"
};
var defaultOptions = {
  root: ".",
  fileFilter: (_entryInfo) => true,
  directoryFilter: (_entryInfo) => true,
  type: EntryTypes.FILE_TYPE,
  lstat: false,
  depth: 2147483648,
  alwaysStat: false,
  highWaterMark: 4096
};
Object.freeze(defaultOptions);
var RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
var NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", RECURSIVE_ERROR_CODE]);
var ALL_TYPES = [
  EntryTypes.DIR_TYPE,
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE,
  EntryTypes.FILE_TYPE
];
var DIR_TYPES = /* @__PURE__ */ new Set([
  EntryTypes.DIR_TYPE,
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE
]);
var FILE_TYPES = /* @__PURE__ */ new Set([
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE,
  EntryTypes.FILE_TYPE
]);
var isNormalFlowError = (error) => NORMAL_FLOW_ERRORS.has(error.code);
var wantBigintFsStats = process.platform === "win32";
var emptyFn = (_entryInfo) => true;
var normalizeFilter = (filter) => {
  if (filter === void 0)
    return emptyFn;
  if (typeof filter === "function")
    return filter;
  if (typeof filter === "string") {
    const fl = filter.trim();
    return (entry) => entry.basename === fl;
  }
  if (Array.isArray(filter)) {
    const trItems = filter.map((item) => item.trim());
    return (entry) => trItems.some((f) => entry.basename === f);
  }
  return emptyFn;
};
var ReaddirpStream = class extends import_node_stream.Readable {
  constructor(options = {}) {
    super({
      objectMode: true,
      autoDestroy: true,
      highWaterMark: options.highWaterMark
    });
    const opts = { ...defaultOptions, ...options };
    const { root: root2, type } = opts;
    this._fileFilter = normalizeFilter(opts.fileFilter);
    this._directoryFilter = normalizeFilter(opts.directoryFilter);
    const statMethod = opts.lstat ? import_promises.lstat : import_promises.stat;
    if (wantBigintFsStats) {
      this._stat = (path2) => statMethod(path2, { bigint: true });
    } else {
      this._stat = statMethod;
    }
    this._maxDepth = opts.depth ?? defaultOptions.depth;
    this._wantsDir = type ? DIR_TYPES.has(type) : false;
    this._wantsFile = type ? FILE_TYPES.has(type) : false;
    this._wantsEverything = type === EntryTypes.EVERYTHING_TYPE;
    this._root = (0, import_node_path2.resolve)(root2);
    this._isDirent = !opts.alwaysStat;
    this._statsProp = this._isDirent ? "dirent" : "stats";
    this._rdOptions = { encoding: "utf8", withFileTypes: this._isDirent };
    this.parents = [this._exploreDir(root2, 1)];
    this.reading = false;
    this.parent = void 0;
  }
  async _read(batch) {
    if (this.reading)
      return;
    this.reading = true;
    try {
      while (!this.destroyed && batch > 0) {
        const par = this.parent;
        const fil = par && par.files;
        if (fil && fil.length > 0) {
          const { path: path2, depth } = par;
          const slice = fil.splice(0, batch).map((dirent) => this._formatEntry(dirent, path2));
          const awaited = await Promise.all(slice);
          for (const entry of awaited) {
            if (!entry)
              continue;
            if (this.destroyed)
              return;
            const entryType = await this._getEntryType(entry);
            if (entryType === "directory" && this._directoryFilter(entry)) {
              if (depth <= this._maxDepth) {
                this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
              }
              if (this._wantsDir) {
                this.push(entry);
                batch--;
              }
            } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
              if (this._wantsFile) {
                this.push(entry);
                batch--;
              }
            }
          }
        } else {
          const parent = this.parents.pop();
          if (!parent) {
            this.push(null);
            break;
          }
          this.parent = await parent;
          if (this.destroyed)
            return;
        }
      }
    } catch (error) {
      this.destroy(error);
    } finally {
      this.reading = false;
    }
  }
  async _exploreDir(path2, depth) {
    let files;
    try {
      files = await (0, import_promises.readdir)(path2, this._rdOptions);
    } catch (error) {
      this._onError(error);
    }
    return { files, depth, path: path2 };
  }
  async _formatEntry(dirent, path2) {
    let entry;
    const basename4 = this._isDirent ? dirent.name : dirent;
    try {
      const fullPath = (0, import_node_path2.resolve)((0, import_node_path2.join)(path2, basename4));
      entry = { path: (0, import_node_path2.relative)(this._root, fullPath), fullPath, basename: basename4 };
      entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
    } catch (err) {
      this._onError(err);
      return;
    }
    return entry;
  }
  _onError(err) {
    if (isNormalFlowError(err) && !this.destroyed) {
      this.emit("warn", err);
    } else {
      this.destroy(err);
    }
  }
  async _getEntryType(entry) {
    if (!entry && this._statsProp in entry) {
      return "";
    }
    const stats = entry[this._statsProp];
    if (stats.isFile())
      return "file";
    if (stats.isDirectory())
      return "directory";
    if (stats && stats.isSymbolicLink()) {
      const full = entry.fullPath;
      try {
        const entryRealPath = await (0, import_promises.realpath)(full);
        const entryRealPathStats = await (0, import_promises.lstat)(entryRealPath);
        if (entryRealPathStats.isFile()) {
          return "file";
        }
        if (entryRealPathStats.isDirectory()) {
          const len = entryRealPath.length;
          if (full.startsWith(entryRealPath) && full.substr(len, 1) === import_node_path2.sep) {
            const recursiveError = new Error(`Circular symlink detected: "${full}" points to "${entryRealPath}"`);
            recursiveError.code = RECURSIVE_ERROR_CODE;
            return this._onError(recursiveError);
          }
          return "directory";
        }
      } catch (error) {
        this._onError(error);
        return "";
      }
    }
  }
  _includeAsFile(entry) {
    const stats = entry && entry[this._statsProp];
    return stats && this._wantsEverything && !stats.isDirectory();
  }
};
function readdirp(root2, options = {}) {
  let type = options.entryType || options.type;
  if (type === "both")
    type = EntryTypes.FILE_DIR_TYPE;
  if (type)
    options.type = type;
  if (!root2) {
    throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
  } else if (typeof root2 !== "string") {
    throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
  } else if (type && !ALL_TYPES.includes(type)) {
    throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
  }
  options.root = root2;
  return new ReaddirpStream(options);
}

// node_modules/.pnpm/chokidar@4.0.3/node_modules/chokidar/esm/handler.js
var import_fs3 = require("fs");
var import_promises2 = require("fs/promises");
var sysPath = __toESM(require("path"), 1);
var import_os = require("os");
var STR_DATA = "data";
var STR_END = "end";
var STR_CLOSE = "close";
var EMPTY_FN = () => {
};
var pl = process.platform;
var isWindows = pl === "win32";
var isMacos = pl === "darwin";
var isLinux = pl === "linux";
var isFreeBSD = pl === "freebsd";
var isIBMi = (0, import_os.type)() === "OS400";
var EVENTS = {
  ALL: "all",
  READY: "ready",
  ADD: "add",
  CHANGE: "change",
  ADD_DIR: "addDir",
  UNLINK: "unlink",
  UNLINK_DIR: "unlinkDir",
  RAW: "raw",
  ERROR: "error"
};
var EV = EVENTS;
var THROTTLE_MODE_WATCH = "watch";
var statMethods = { lstat: import_promises2.lstat, stat: import_promises2.stat };
var KEY_LISTENERS = "listeners";
var KEY_ERR = "errHandlers";
var KEY_RAW = "rawEmitters";
var HANDLER_KEYS = [KEY_LISTENERS, KEY_ERR, KEY_RAW];
var binaryExtensions = /* @__PURE__ */ new Set([
  "3dm",
  "3ds",
  "3g2",
  "3gp",
  "7z",
  "a",
  "aac",
  "adp",
  "afdesign",
  "afphoto",
  "afpub",
  "ai",
  "aif",
  "aiff",
  "alz",
  "ape",
  "apk",
  "appimage",
  "ar",
  "arj",
  "asf",
  "au",
  "avi",
  "bak",
  "baml",
  "bh",
  "bin",
  "bk",
  "bmp",
  "btif",
  "bz2",
  "bzip2",
  "cab",
  "caf",
  "cgm",
  "class",
  "cmx",
  "cpio",
  "cr2",
  "cur",
  "dat",
  "dcm",
  "deb",
  "dex",
  "djvu",
  "dll",
  "dmg",
  "dng",
  "doc",
  "docm",
  "docx",
  "dot",
  "dotm",
  "dra",
  "DS_Store",
  "dsk",
  "dts",
  "dtshd",
  "dvb",
  "dwg",
  "dxf",
  "ecelp4800",
  "ecelp7470",
  "ecelp9600",
  "egg",
  "eol",
  "eot",
  "epub",
  "exe",
  "f4v",
  "fbs",
  "fh",
  "fla",
  "flac",
  "flatpak",
  "fli",
  "flv",
  "fpx",
  "fst",
  "fvt",
  "g3",
  "gh",
  "gif",
  "graffle",
  "gz",
  "gzip",
  "h261",
  "h263",
  "h264",
  "icns",
  "ico",
  "ief",
  "img",
  "ipa",
  "iso",
  "jar",
  "jpeg",
  "jpg",
  "jpgv",
  "jpm",
  "jxr",
  "key",
  "ktx",
  "lha",
  "lib",
  "lvp",
  "lz",
  "lzh",
  "lzma",
  "lzo",
  "m3u",
  "m4a",
  "m4v",
  "mar",
  "mdi",
  "mht",
  "mid",
  "midi",
  "mj2",
  "mka",
  "mkv",
  "mmr",
  "mng",
  "mobi",
  "mov",
  "movie",
  "mp3",
  "mp4",
  "mp4a",
  "mpeg",
  "mpg",
  "mpga",
  "mxu",
  "nef",
  "npx",
  "numbers",
  "nupkg",
  "o",
  "odp",
  "ods",
  "odt",
  "oga",
  "ogg",
  "ogv",
  "otf",
  "ott",
  "pages",
  "pbm",
  "pcx",
  "pdb",
  "pdf",
  "pea",
  "pgm",
  "pic",
  "png",
  "pnm",
  "pot",
  "potm",
  "potx",
  "ppa",
  "ppam",
  "ppm",
  "pps",
  "ppsm",
  "ppsx",
  "ppt",
  "pptm",
  "pptx",
  "psd",
  "pya",
  "pyc",
  "pyo",
  "pyv",
  "qt",
  "rar",
  "ras",
  "raw",
  "resources",
  "rgb",
  "rip",
  "rlc",
  "rmf",
  "rmvb",
  "rpm",
  "rtf",
  "rz",
  "s3m",
  "s7z",
  "scpt",
  "sgi",
  "shar",
  "snap",
  "sil",
  "sketch",
  "slk",
  "smv",
  "snk",
  "so",
  "stl",
  "suo",
  "sub",
  "swf",
  "tar",
  "tbz",
  "tbz2",
  "tga",
  "tgz",
  "thmx",
  "tif",
  "tiff",
  "tlz",
  "ttc",
  "ttf",
  "txz",
  "udf",
  "uvh",
  "uvi",
  "uvm",
  "uvp",
  "uvs",
  "uvu",
  "viv",
  "vob",
  "war",
  "wav",
  "wax",
  "wbmp",
  "wdp",
  "weba",
  "webm",
  "webp",
  "whl",
  "wim",
  "wm",
  "wma",
  "wmv",
  "wmx",
  "woff",
  "woff2",
  "wrm",
  "wvx",
  "xbm",
  "xif",
  "xla",
  "xlam",
  "xls",
  "xlsb",
  "xlsm",
  "xlsx",
  "xlt",
  "xltm",
  "xltx",
  "xm",
  "xmind",
  "xpi",
  "xpm",
  "xwd",
  "xz",
  "z",
  "zip",
  "zipx"
]);
var isBinaryPath = (filePath) => binaryExtensions.has(sysPath.extname(filePath).slice(1).toLowerCase());
var foreach = (val, fn) => {
  if (val instanceof Set) {
    val.forEach(fn);
  } else {
    fn(val);
  }
};
var addAndConvert = (main2, prop, item) => {
  let container2 = main2[prop];
  if (!(container2 instanceof Set)) {
    main2[prop] = container2 = /* @__PURE__ */ new Set([container2]);
  }
  container2.add(item);
};
var clearItem = (cont) => (key) => {
  const set = cont[key];
  if (set instanceof Set) {
    set.clear();
  } else {
    delete cont[key];
  }
};
var delFromSet = (main2, prop, item) => {
  const container2 = main2[prop];
  if (container2 instanceof Set) {
    container2.delete(item);
  } else if (container2 === item) {
    delete main2[prop];
  }
};
var isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
var FsWatchInstances = /* @__PURE__ */ new Map();
function createFsWatchInstance(path2, options, listener, errHandler, emitRaw) {
  const handleEvent = (rawEvent, evPath) => {
    listener(path2);
    emitRaw(rawEvent, evPath, { watchedPath: path2 });
    if (evPath && path2 !== evPath) {
      fsWatchBroadcast(sysPath.resolve(path2, evPath), KEY_LISTENERS, sysPath.join(path2, evPath));
    }
  };
  try {
    return (0, import_fs3.watch)(path2, {
      persistent: options.persistent
    }, handleEvent);
  } catch (error) {
    errHandler(error);
    return void 0;
  }
}
var fsWatchBroadcast = (fullPath, listenerType, val1, val2, val3) => {
  const cont = FsWatchInstances.get(fullPath);
  if (!cont)
    return;
  foreach(cont[listenerType], (listener) => {
    listener(val1, val2, val3);
  });
};
var setFsWatchListener = (path2, fullPath, options, handlers) => {
  const { listener, errHandler, rawEmitter } = handlers;
  let cont = FsWatchInstances.get(fullPath);
  let watcher;
  if (!options.persistent) {
    watcher = createFsWatchInstance(path2, options, listener, errHandler, rawEmitter);
    if (!watcher)
      return;
    return watcher.close.bind(watcher);
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_ERR, errHandler);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    watcher = createFsWatchInstance(
      path2,
      options,
      fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS),
      errHandler,
      // no need to use broadcast here
      fsWatchBroadcast.bind(null, fullPath, KEY_RAW)
    );
    if (!watcher)
      return;
    watcher.on(EV.ERROR, async (error) => {
      const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
      if (cont)
        cont.watcherUnusable = true;
      if (isWindows && error.code === "EPERM") {
        try {
          const fd = await (0, import_promises2.open)(path2, "r");
          await fd.close();
          broadcastErr(error);
        } catch (err) {
        }
      } else {
        broadcastErr(error);
      }
    });
    cont = {
      listeners: listener,
      errHandlers: errHandler,
      rawEmitters: rawEmitter,
      watcher
    };
    FsWatchInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_ERR, errHandler);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      cont.watcher.close();
      FsWatchInstances.delete(fullPath);
      HANDLER_KEYS.forEach(clearItem(cont));
      cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
var FsWatchFileInstances = /* @__PURE__ */ new Map();
var setFsWatchFileListener = (path2, fullPath, options, handlers) => {
  const { listener, rawEmitter } = handlers;
  let cont = FsWatchFileInstances.get(fullPath);
  const copts = cont && cont.options;
  if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
    (0, import_fs3.unwatchFile)(fullPath);
    cont = void 0;
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    cont = {
      listeners: listener,
      rawEmitters: rawEmitter,
      options,
      watcher: (0, import_fs3.watchFile)(fullPath, options, (curr, prev) => {
        foreach(cont.rawEmitters, (rawEmitter2) => {
          rawEmitter2(EV.CHANGE, fullPath, { curr, prev });
        });
        const currmtime = curr.mtimeMs;
        if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
          foreach(cont.listeners, (listener2) => listener2(path2, curr));
        }
      })
    };
    FsWatchFileInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      FsWatchFileInstances.delete(fullPath);
      (0, import_fs3.unwatchFile)(fullPath);
      cont.options = cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
var NodeFsHandler = class {
  constructor(fsW) {
    this.fsw = fsW;
    this._boundHandleError = (error) => fsW._handleError(error);
  }
  /**
   * Watch file for changes with fs_watchFile or fs_watch.
   * @param path to file or dir
   * @param listener on fs change
   * @returns closer for the watcher instance
   */
  _watchWithNodeFs(path2, listener) {
    const opts = this.fsw.options;
    const directory = sysPath.dirname(path2);
    const basename4 = sysPath.basename(path2);
    const parent = this.fsw._getWatchedDir(directory);
    parent.add(basename4);
    const absolutePath = sysPath.resolve(path2);
    const options = {
      persistent: opts.persistent
    };
    if (!listener)
      listener = EMPTY_FN;
    let closer;
    if (opts.usePolling) {
      const enableBin = opts.interval !== opts.binaryInterval;
      options.interval = enableBin && isBinaryPath(basename4) ? opts.binaryInterval : opts.interval;
      closer = setFsWatchFileListener(path2, absolutePath, options, {
        listener,
        rawEmitter: this.fsw._emitRaw
      });
    } else {
      closer = setFsWatchListener(path2, absolutePath, options, {
        listener,
        errHandler: this._boundHandleError,
        rawEmitter: this.fsw._emitRaw
      });
    }
    return closer;
  }
  /**
   * Watch a file and emit add event if warranted.
   * @returns closer for the watcher instance
   */
  _handleFile(file, stats, initialAdd) {
    if (this.fsw.closed) {
      return;
    }
    const dirname6 = sysPath.dirname(file);
    const basename4 = sysPath.basename(file);
    const parent = this.fsw._getWatchedDir(dirname6);
    let prevStats = stats;
    if (parent.has(basename4))
      return;
    const listener = async (path2, newStats) => {
      if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5))
        return;
      if (!newStats || newStats.mtimeMs === 0) {
        try {
          const newStats2 = await (0, import_promises2.stat)(file);
          if (this.fsw.closed)
            return;
          const at = newStats2.atimeMs;
          const mt = newStats2.mtimeMs;
          if (!at || at <= mt || mt !== prevStats.mtimeMs) {
            this.fsw._emit(EV.CHANGE, file, newStats2);
          }
          if ((isMacos || isLinux || isFreeBSD) && prevStats.ino !== newStats2.ino) {
            this.fsw._closeFile(path2);
            prevStats = newStats2;
            const closer2 = this._watchWithNodeFs(file, listener);
            if (closer2)
              this.fsw._addPathCloser(path2, closer2);
          } else {
            prevStats = newStats2;
          }
        } catch (error) {
          this.fsw._remove(dirname6, basename4);
        }
      } else if (parent.has(basename4)) {
        const at = newStats.atimeMs;
        const mt = newStats.mtimeMs;
        if (!at || at <= mt || mt !== prevStats.mtimeMs) {
          this.fsw._emit(EV.CHANGE, file, newStats);
        }
        prevStats = newStats;
      }
    };
    const closer = this._watchWithNodeFs(file, listener);
    if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
      if (!this.fsw._throttle(EV.ADD, file, 0))
        return;
      this.fsw._emit(EV.ADD, file, stats);
    }
    return closer;
  }
  /**
   * Handle symlinks encountered while reading a dir.
   * @param entry returned by readdirp
   * @param directory path of dir being read
   * @param path of this item
   * @param item basename of this item
   * @returns true if no more processing is needed for this entry.
   */
  async _handleSymlink(entry, directory, path2, item) {
    if (this.fsw.closed) {
      return;
    }
    const full = entry.fullPath;
    const dir = this.fsw._getWatchedDir(directory);
    if (!this.fsw.options.followSymlinks) {
      this.fsw._incrReadyCount();
      let linkPath;
      try {
        linkPath = await (0, import_promises2.realpath)(path2);
      } catch (e) {
        this.fsw._emitReady();
        return true;
      }
      if (this.fsw.closed)
        return;
      if (dir.has(item)) {
        if (this.fsw._symlinkPaths.get(full) !== linkPath) {
          this.fsw._symlinkPaths.set(full, linkPath);
          this.fsw._emit(EV.CHANGE, path2, entry.stats);
        }
      } else {
        dir.add(item);
        this.fsw._symlinkPaths.set(full, linkPath);
        this.fsw._emit(EV.ADD, path2, entry.stats);
      }
      this.fsw._emitReady();
      return true;
    }
    if (this.fsw._symlinkPaths.has(full)) {
      return true;
    }
    this.fsw._symlinkPaths.set(full, true);
  }
  _handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
    directory = sysPath.join(directory, "");
    throttler = this.fsw._throttle("readdir", directory, 1e3);
    if (!throttler)
      return;
    const previous3 = this.fsw._getWatchedDir(wh.path);
    const current = /* @__PURE__ */ new Set();
    let stream = this.fsw._readdirp(directory, {
      fileFilter: (entry) => wh.filterPath(entry),
      directoryFilter: (entry) => wh.filterDir(entry)
    });
    if (!stream)
      return;
    stream.on(STR_DATA, async (entry) => {
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      const item = entry.path;
      let path2 = sysPath.join(directory, item);
      current.add(item);
      if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path2, item)) {
        return;
      }
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      if (item === target || !target && !previous3.has(item)) {
        this.fsw._incrReadyCount();
        path2 = sysPath.join(dir, sysPath.relative(dir, path2));
        this._addToNodeFs(path2, initialAdd, wh, depth + 1);
      }
    }).on(EV.ERROR, this._boundHandleError);
    return new Promise((resolve5, reject) => {
      if (!stream)
        return reject();
      stream.once(STR_END, () => {
        if (this.fsw.closed) {
          stream = void 0;
          return;
        }
        const wasThrottled = throttler ? throttler.clear() : false;
        resolve5(void 0);
        previous3.getChildren().filter((item) => {
          return item !== directory && !current.has(item);
        }).forEach((item) => {
          this.fsw._remove(directory, item);
        });
        stream = void 0;
        if (wasThrottled)
          this._handleRead(directory, false, wh, target, dir, depth, throttler);
      });
    });
  }
  /**
   * Read directory to add / remove files from `@watched` list and re-read it on change.
   * @param dir fs path
   * @param stats
   * @param initialAdd
   * @param depth relative to user-supplied path
   * @param target child path targeted for watch
   * @param wh Common watch helpers for this path
   * @param realpath
   * @returns closer for the watcher instance.
   */
  async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath2) {
    const parentDir = this.fsw._getWatchedDir(sysPath.dirname(dir));
    const tracked = parentDir.has(sysPath.basename(dir));
    if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
      this.fsw._emit(EV.ADD_DIR, dir, stats);
    }
    parentDir.add(sysPath.basename(dir));
    this.fsw._getWatchedDir(dir);
    let throttler;
    let closer;
    const oDepth = this.fsw.options.depth;
    if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath2)) {
      if (!target) {
        await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
        if (this.fsw.closed)
          return;
      }
      closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
        if (stats2 && stats2.mtimeMs === 0)
          return;
        this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
      });
    }
    return closer;
  }
  /**
   * Handle added file, directory, or glob pattern.
   * Delegates call to _handleFile / _handleDir after checks.
   * @param path to file or ir
   * @param initialAdd was the file added at watch instantiation?
   * @param priorWh depth relative to user-supplied path
   * @param depth Child path actually targeted for watch
   * @param target Child path actually targeted for watch
   */
  async _addToNodeFs(path2, initialAdd, priorWh, depth, target) {
    const ready = this.fsw._emitReady;
    if (this.fsw._isIgnored(path2) || this.fsw.closed) {
      ready();
      return false;
    }
    const wh = this.fsw._getWatchHelpers(path2);
    if (priorWh) {
      wh.filterPath = (entry) => priorWh.filterPath(entry);
      wh.filterDir = (entry) => priorWh.filterDir(entry);
    }
    try {
      const stats = await statMethods[wh.statMethod](wh.watchPath);
      if (this.fsw.closed)
        return;
      if (this.fsw._isIgnored(wh.watchPath, stats)) {
        ready();
        return false;
      }
      const follow = this.fsw.options.followSymlinks;
      let closer;
      if (stats.isDirectory()) {
        const absPath = sysPath.resolve(path2);
        const targetPath = follow ? await (0, import_promises2.realpath)(path2) : path2;
        if (this.fsw.closed)
          return;
        closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (absPath !== targetPath && targetPath !== void 0) {
          this.fsw._symlinkPaths.set(absPath, targetPath);
        }
      } else if (stats.isSymbolicLink()) {
        const targetPath = follow ? await (0, import_promises2.realpath)(path2) : path2;
        if (this.fsw.closed)
          return;
        const parent = sysPath.dirname(wh.watchPath);
        this.fsw._getWatchedDir(parent).add(wh.watchPath);
        this.fsw._emit(EV.ADD, wh.watchPath, stats);
        closer = await this._handleDir(parent, stats, initialAdd, depth, path2, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (targetPath !== void 0) {
          this.fsw._symlinkPaths.set(sysPath.resolve(path2), targetPath);
        }
      } else {
        closer = this._handleFile(wh.watchPath, stats, initialAdd);
      }
      ready();
      if (closer)
        this.fsw._addPathCloser(path2, closer);
      return false;
    } catch (error) {
      if (this.fsw._handleError(error)) {
        ready();
        return path2;
      }
    }
  }
};

// node_modules/.pnpm/chokidar@4.0.3/node_modules/chokidar/esm/index.js
var SLASH = "/";
var SLASH_SLASH = "//";
var ONE_DOT = ".";
var TWO_DOTS = "..";
var STRING_TYPE = "string";
var BACK_SLASH_RE = /\\/g;
var DOUBLE_SLASH_RE = /\/\//;
var DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
var REPLACER_RE = /^\.[/\\]/;
function arrify(item) {
  return Array.isArray(item) ? item : [item];
}
var isMatcherObject = (matcher) => typeof matcher === "object" && matcher !== null && !(matcher instanceof RegExp);
function createPattern(matcher) {
  if (typeof matcher === "function")
    return matcher;
  if (typeof matcher === "string")
    return (string3) => matcher === string3;
  if (matcher instanceof RegExp)
    return (string3) => matcher.test(string3);
  if (typeof matcher === "object" && matcher !== null) {
    return (string3) => {
      if (matcher.path === string3)
        return true;
      if (matcher.recursive) {
        const relative4 = sysPath2.relative(matcher.path, string3);
        if (!relative4) {
          return false;
        }
        return !relative4.startsWith("..") && !sysPath2.isAbsolute(relative4);
      }
      return false;
    };
  }
  return () => false;
}
function normalizePath(path2) {
  if (typeof path2 !== "string")
    throw new Error("string expected");
  path2 = sysPath2.normalize(path2);
  path2 = path2.replace(/\\/g, "/");
  let prepend = false;
  if (path2.startsWith("//"))
    prepend = true;
  const DOUBLE_SLASH_RE2 = /\/\//;
  while (path2.match(DOUBLE_SLASH_RE2))
    path2 = path2.replace(DOUBLE_SLASH_RE2, "/");
  if (prepend)
    path2 = "/" + path2;
  return path2;
}
function matchPatterns(patterns, testString, stats) {
  const path2 = normalizePath(testString);
  for (let index2 = 0; index2 < patterns.length; index2++) {
    const pattern = patterns[index2];
    if (pattern(path2, stats)) {
      return true;
    }
  }
  return false;
}
function anymatch(matchers, testString) {
  if (matchers == null) {
    throw new TypeError("anymatch: specify first argument");
  }
  const matchersArray = arrify(matchers);
  const patterns = matchersArray.map((matcher) => createPattern(matcher));
  if (testString == null) {
    return (testString2, stats) => {
      return matchPatterns(patterns, testString2, stats);
    };
  }
  return matchPatterns(patterns, testString);
}
var unifyPaths = (paths_) => {
  const paths = arrify(paths_).flat();
  if (!paths.every((p) => typeof p === STRING_TYPE)) {
    throw new TypeError(`Non-string provided as watch path: ${paths}`);
  }
  return paths.map(normalizePathToUnix);
};
var toUnix = (string3) => {
  let str = string3.replace(BACK_SLASH_RE, SLASH);
  let prepend = false;
  if (str.startsWith(SLASH_SLASH)) {
    prepend = true;
  }
  while (str.match(DOUBLE_SLASH_RE)) {
    str = str.replace(DOUBLE_SLASH_RE, SLASH);
  }
  if (prepend) {
    str = SLASH + str;
  }
  return str;
};
var normalizePathToUnix = (path2) => toUnix(sysPath2.normalize(toUnix(path2)));
var normalizeIgnored = (cwd = "") => (path2) => {
  if (typeof path2 === "string") {
    return normalizePathToUnix(sysPath2.isAbsolute(path2) ? path2 : sysPath2.join(cwd, path2));
  } else {
    return path2;
  }
};
var getAbsolutePath = (path2, cwd) => {
  if (sysPath2.isAbsolute(path2)) {
    return path2;
  }
  return sysPath2.join(cwd, path2);
};
var EMPTY_SET = Object.freeze(/* @__PURE__ */ new Set());
var DirEntry = class {
  constructor(dir, removeWatcher) {
    this.path = dir;
    this._removeWatcher = removeWatcher;
    this.items = /* @__PURE__ */ new Set();
  }
  add(item) {
    const { items } = this;
    if (!items)
      return;
    if (item !== ONE_DOT && item !== TWO_DOTS)
      items.add(item);
  }
  async remove(item) {
    const { items } = this;
    if (!items)
      return;
    items.delete(item);
    if (items.size > 0)
      return;
    const dir = this.path;
    try {
      await (0, import_promises3.readdir)(dir);
    } catch (err) {
      if (this._removeWatcher) {
        this._removeWatcher(sysPath2.dirname(dir), sysPath2.basename(dir));
      }
    }
  }
  has(item) {
    const { items } = this;
    if (!items)
      return;
    return items.has(item);
  }
  getChildren() {
    const { items } = this;
    if (!items)
      return [];
    return [...items.values()];
  }
  dispose() {
    this.items.clear();
    this.path = "";
    this._removeWatcher = EMPTY_FN;
    this.items = EMPTY_SET;
    Object.freeze(this);
  }
};
var STAT_METHOD_F = "stat";
var STAT_METHOD_L = "lstat";
var WatchHelper = class {
  constructor(path2, follow, fsw) {
    this.fsw = fsw;
    const watchPath = path2;
    this.path = path2 = path2.replace(REPLACER_RE, "");
    this.watchPath = watchPath;
    this.fullWatchPath = sysPath2.resolve(watchPath);
    this.dirParts = [];
    this.dirParts.forEach((parts) => {
      if (parts.length > 1)
        parts.pop();
    });
    this.followSymlinks = follow;
    this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
  }
  entryPath(entry) {
    return sysPath2.join(this.watchPath, sysPath2.relative(this.watchPath, entry.fullPath));
  }
  filterPath(entry) {
    const { stats } = entry;
    if (stats && stats.isSymbolicLink())
      return this.filterDir(entry);
    const resolvedPath = this.entryPath(entry);
    return this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
  }
  filterDir(entry) {
    return this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
  }
};
var FSWatcher = class extends import_events.EventEmitter {
  // Not indenting methods for history sake; for now.
  constructor(_opts = {}) {
    super();
    this.closed = false;
    this._closers = /* @__PURE__ */ new Map();
    this._ignoredPaths = /* @__PURE__ */ new Set();
    this._throttled = /* @__PURE__ */ new Map();
    this._streams = /* @__PURE__ */ new Set();
    this._symlinkPaths = /* @__PURE__ */ new Map();
    this._watched = /* @__PURE__ */ new Map();
    this._pendingWrites = /* @__PURE__ */ new Map();
    this._pendingUnlinks = /* @__PURE__ */ new Map();
    this._readyCount = 0;
    this._readyEmitted = false;
    const awf = _opts.awaitWriteFinish;
    const DEF_AWF = { stabilityThreshold: 2e3, pollInterval: 100 };
    const opts = {
      // Defaults
      persistent: true,
      ignoreInitial: false,
      ignorePermissionErrors: false,
      interval: 100,
      binaryInterval: 300,
      followSymlinks: true,
      usePolling: false,
      // useAsync: false,
      atomic: true,
      // NOTE: overwritten later (depends on usePolling)
      ..._opts,
      // Change format
      ignored: _opts.ignored ? arrify(_opts.ignored) : arrify([]),
      awaitWriteFinish: awf === true ? DEF_AWF : typeof awf === "object" ? { ...DEF_AWF, ...awf } : false
    };
    if (isIBMi)
      opts.usePolling = true;
    if (opts.atomic === void 0)
      opts.atomic = !opts.usePolling;
    const envPoll = process.env.CHOKIDAR_USEPOLLING;
    if (envPoll !== void 0) {
      const envLower = envPoll.toLowerCase();
      if (envLower === "false" || envLower === "0")
        opts.usePolling = false;
      else if (envLower === "true" || envLower === "1")
        opts.usePolling = true;
      else
        opts.usePolling = !!envLower;
    }
    const envInterval = process.env.CHOKIDAR_INTERVAL;
    if (envInterval)
      opts.interval = Number.parseInt(envInterval, 10);
    let readyCalls = 0;
    this._emitReady = () => {
      readyCalls++;
      if (readyCalls >= this._readyCount) {
        this._emitReady = EMPTY_FN;
        this._readyEmitted = true;
        process.nextTick(() => this.emit(EVENTS.READY));
      }
    };
    this._emitRaw = (...args) => this.emit(EVENTS.RAW, ...args);
    this._boundRemove = this._remove.bind(this);
    this.options = opts;
    this._nodeFsHandler = new NodeFsHandler(this);
    Object.freeze(opts);
  }
  _addIgnoredPath(matcher) {
    if (isMatcherObject(matcher)) {
      for (const ignored of this._ignoredPaths) {
        if (isMatcherObject(ignored) && ignored.path === matcher.path && ignored.recursive === matcher.recursive) {
          return;
        }
      }
    }
    this._ignoredPaths.add(matcher);
  }
  _removeIgnoredPath(matcher) {
    this._ignoredPaths.delete(matcher);
    if (typeof matcher === "string") {
      for (const ignored of this._ignoredPaths) {
        if (isMatcherObject(ignored) && ignored.path === matcher) {
          this._ignoredPaths.delete(ignored);
        }
      }
    }
  }
  // Public methods
  /**
   * Adds paths to be watched on an existing FSWatcher instance.
   * @param paths_ file or file list. Other arguments are unused
   */
  add(paths_, _origAdd, _internal) {
    const { cwd } = this.options;
    this.closed = false;
    this._closePromise = void 0;
    let paths = unifyPaths(paths_);
    if (cwd) {
      paths = paths.map((path2) => {
        const absPath = getAbsolutePath(path2, cwd);
        return absPath;
      });
    }
    paths.forEach((path2) => {
      this._removeIgnoredPath(path2);
    });
    this._userIgnored = void 0;
    if (!this._readyCount)
      this._readyCount = 0;
    this._readyCount += paths.length;
    Promise.all(paths.map(async (path2) => {
      const res = await this._nodeFsHandler._addToNodeFs(path2, !_internal, void 0, 0, _origAdd);
      if (res)
        this._emitReady();
      return res;
    })).then((results) => {
      if (this.closed)
        return;
      results.forEach((item) => {
        if (item)
          this.add(sysPath2.dirname(item), sysPath2.basename(_origAdd || item));
      });
    });
    return this;
  }
  /**
   * Close watchers or start ignoring events from specified paths.
   */
  unwatch(paths_) {
    if (this.closed)
      return this;
    const paths = unifyPaths(paths_);
    const { cwd } = this.options;
    paths.forEach((path2) => {
      if (!sysPath2.isAbsolute(path2) && !this._closers.has(path2)) {
        if (cwd)
          path2 = sysPath2.join(cwd, path2);
        path2 = sysPath2.resolve(path2);
      }
      this._closePath(path2);
      this._addIgnoredPath(path2);
      if (this._watched.has(path2)) {
        this._addIgnoredPath({
          path: path2,
          recursive: true
        });
      }
      this._userIgnored = void 0;
    });
    return this;
  }
  /**
   * Close watchers and remove all listeners from watched paths.
   */
  close() {
    if (this._closePromise) {
      return this._closePromise;
    }
    this.closed = true;
    this.removeAllListeners();
    const closers = [];
    this._closers.forEach((closerList) => closerList.forEach((closer) => {
      const promise = closer();
      if (promise instanceof Promise)
        closers.push(promise);
    }));
    this._streams.forEach((stream) => stream.destroy());
    this._userIgnored = void 0;
    this._readyCount = 0;
    this._readyEmitted = false;
    this._watched.forEach((dirent) => dirent.dispose());
    this._closers.clear();
    this._watched.clear();
    this._streams.clear();
    this._symlinkPaths.clear();
    this._throttled.clear();
    this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
    return this._closePromise;
  }
  /**
   * Expose list of watched paths
   * @returns for chaining
   */
  getWatched() {
    const watchList = {};
    this._watched.forEach((entry, dir) => {
      const key = this.options.cwd ? sysPath2.relative(this.options.cwd, dir) : dir;
      const index2 = key || ONE_DOT;
      watchList[index2] = entry.getChildren().sort();
    });
    return watchList;
  }
  emitWithAll(event, args) {
    this.emit(event, ...args);
    if (event !== EVENTS.ERROR)
      this.emit(EVENTS.ALL, event, ...args);
  }
  // Common helpers
  // --------------
  /**
   * Normalize and emit events.
   * Calling _emit DOES NOT MEAN emit() would be called!
   * @param event Type of event
   * @param path File or directory path
   * @param stats arguments to be passed with event
   * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
  async _emit(event, path2, stats) {
    if (this.closed)
      return;
    const opts = this.options;
    if (isWindows)
      path2 = sysPath2.normalize(path2);
    if (opts.cwd)
      path2 = sysPath2.relative(opts.cwd, path2);
    const args = [path2];
    if (stats != null)
      args.push(stats);
    const awf = opts.awaitWriteFinish;
    let pw;
    if (awf && (pw = this._pendingWrites.get(path2))) {
      pw.lastChange = /* @__PURE__ */ new Date();
      return this;
    }
    if (opts.atomic) {
      if (event === EVENTS.UNLINK) {
        this._pendingUnlinks.set(path2, [event, ...args]);
        setTimeout(() => {
          this._pendingUnlinks.forEach((entry, path3) => {
            this.emit(...entry);
            this.emit(EVENTS.ALL, ...entry);
            this._pendingUnlinks.delete(path3);
          });
        }, typeof opts.atomic === "number" ? opts.atomic : 100);
        return this;
      }
      if (event === EVENTS.ADD && this._pendingUnlinks.has(path2)) {
        event = EVENTS.CHANGE;
        this._pendingUnlinks.delete(path2);
      }
    }
    if (awf && (event === EVENTS.ADD || event === EVENTS.CHANGE) && this._readyEmitted) {
      const awfEmit = (err, stats2) => {
        if (err) {
          event = EVENTS.ERROR;
          args[0] = err;
          this.emitWithAll(event, args);
        } else if (stats2) {
          if (args.length > 1) {
            args[1] = stats2;
          } else {
            args.push(stats2);
          }
          this.emitWithAll(event, args);
        }
      };
      this._awaitWriteFinish(path2, awf.stabilityThreshold, event, awfEmit);
      return this;
    }
    if (event === EVENTS.CHANGE) {
      const isThrottled = !this._throttle(EVENTS.CHANGE, path2, 50);
      if (isThrottled)
        return this;
    }
    if (opts.alwaysStat && stats === void 0 && (event === EVENTS.ADD || event === EVENTS.ADD_DIR || event === EVENTS.CHANGE)) {
      const fullPath = opts.cwd ? sysPath2.join(opts.cwd, path2) : path2;
      let stats2;
      try {
        stats2 = await (0, import_promises3.stat)(fullPath);
      } catch (err) {
      }
      if (!stats2 || this.closed)
        return;
      args.push(stats2);
    }
    this.emitWithAll(event, args);
    return this;
  }
  /**
   * Common handler for errors
   * @returns The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
  _handleError(error) {
    const code4 = error && error.code;
    if (error && code4 !== "ENOENT" && code4 !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code4 !== "EPERM" && code4 !== "EACCES")) {
      this.emit(EVENTS.ERROR, error);
    }
    return error || this.closed;
  }
  /**
   * Helper utility for throttling
   * @param actionType type being throttled
   * @param path being acted upon
   * @param timeout duration of time to suppress duplicate actions
   * @returns tracking object or false if action should be suppressed
   */
  _throttle(actionType, path2, timeout) {
    if (!this._throttled.has(actionType)) {
      this._throttled.set(actionType, /* @__PURE__ */ new Map());
    }
    const action = this._throttled.get(actionType);
    if (!action)
      throw new Error("invalid throttle");
    const actionPath = action.get(path2);
    if (actionPath) {
      actionPath.count++;
      return false;
    }
    let timeoutObject;
    const clear = () => {
      const item = action.get(path2);
      const count = item ? item.count : 0;
      action.delete(path2);
      clearTimeout(timeoutObject);
      if (item)
        clearTimeout(item.timeoutObject);
      return count;
    };
    timeoutObject = setTimeout(clear, timeout);
    const thr = { timeoutObject, clear, count: 0 };
    action.set(path2, thr);
    return thr;
  }
  _incrReadyCount() {
    return this._readyCount++;
  }
  /**
   * Awaits write operation to finish.
   * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
   * @param path being acted upon
   * @param threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
   * @param event
   * @param awfEmit Callback to be called when ready for event to be emitted.
   */
  _awaitWriteFinish(path2, threshold, event, awfEmit) {
    const awf = this.options.awaitWriteFinish;
    if (typeof awf !== "object")
      return;
    const pollInterval = awf.pollInterval;
    let timeoutHandler;
    let fullPath = path2;
    if (this.options.cwd && !sysPath2.isAbsolute(path2)) {
      fullPath = sysPath2.join(this.options.cwd, path2);
    }
    const now = /* @__PURE__ */ new Date();
    const writes = this._pendingWrites;
    function awaitWriteFinishFn(prevStat) {
      (0, import_fs4.stat)(fullPath, (err, curStat) => {
        if (err || !writes.has(path2)) {
          if (err && err.code !== "ENOENT")
            awfEmit(err);
          return;
        }
        const now2 = Number(/* @__PURE__ */ new Date());
        if (prevStat && curStat.size !== prevStat.size) {
          writes.get(path2).lastChange = now2;
        }
        const pw = writes.get(path2);
        const df = now2 - pw.lastChange;
        if (df >= threshold) {
          writes.delete(path2);
          awfEmit(void 0, curStat);
        } else {
          timeoutHandler = setTimeout(awaitWriteFinishFn, pollInterval, curStat);
        }
      });
    }
    if (!writes.has(path2)) {
      writes.set(path2, {
        lastChange: now,
        cancelWait: () => {
          writes.delete(path2);
          clearTimeout(timeoutHandler);
          return event;
        }
      });
      timeoutHandler = setTimeout(awaitWriteFinishFn, pollInterval);
    }
  }
  /**
   * Determines whether user has asked to ignore this path.
   */
  _isIgnored(path2, stats) {
    if (this.options.atomic && DOT_RE.test(path2))
      return true;
    if (!this._userIgnored) {
      const { cwd } = this.options;
      const ign = this.options.ignored;
      const ignored = (ign || []).map(normalizeIgnored(cwd));
      const ignoredPaths = [...this._ignoredPaths];
      const list4 = [...ignoredPaths.map(normalizeIgnored(cwd)), ...ignored];
      this._userIgnored = anymatch(list4, void 0);
    }
    return this._userIgnored(path2, stats);
  }
  _isntIgnored(path2, stat4) {
    return !this._isIgnored(path2, stat4);
  }
  /**
   * Provides a set of common helpers and properties relating to symlink handling.
   * @param path file or directory pattern being watched
   */
  _getWatchHelpers(path2) {
    return new WatchHelper(path2, this.options.followSymlinks, this);
  }
  // Directory helpers
  // -----------------
  /**
   * Provides directory tracking objects
   * @param directory path of the directory
   */
  _getWatchedDir(directory) {
    const dir = sysPath2.resolve(directory);
    if (!this._watched.has(dir))
      this._watched.set(dir, new DirEntry(dir, this._boundRemove));
    return this._watched.get(dir);
  }
  // File helpers
  // ------------
  /**
   * Check for read permissions: https://stackoverflow.com/a/11781404/1358405
   */
  _hasReadPermissions(stats) {
    if (this.options.ignorePermissionErrors)
      return true;
    return Boolean(Number(stats.mode) & 256);
  }
  /**
   * Handles emitting unlink events for
   * files and directories, and via recursion, for
   * files and directories within directories that are unlinked
   * @param directory within which the following item is located
   * @param item      base path of item/directory
   */
  _remove(directory, item, isDirectory) {
    const path2 = sysPath2.join(directory, item);
    const fullPath = sysPath2.resolve(path2);
    isDirectory = isDirectory != null ? isDirectory : this._watched.has(path2) || this._watched.has(fullPath);
    if (!this._throttle("remove", path2, 100))
      return;
    if (!isDirectory && this._watched.size === 1) {
      this.add(directory, item, true);
    }
    const wp = this._getWatchedDir(path2);
    const nestedDirectoryChildren = wp.getChildren();
    nestedDirectoryChildren.forEach((nested) => this._remove(path2, nested));
    const parent = this._getWatchedDir(directory);
    const wasTracked = parent.has(item);
    parent.remove(item);
    if (this._symlinkPaths.has(fullPath)) {
      this._symlinkPaths.delete(fullPath);
    }
    let relPath = path2;
    if (this.options.cwd)
      relPath = sysPath2.relative(this.options.cwd, path2);
    if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
      const event = this._pendingWrites.get(relPath).cancelWait();
      if (event === EVENTS.ADD)
        return;
    }
    this._watched.delete(path2);
    this._watched.delete(fullPath);
    const eventName = isDirectory ? EVENTS.UNLINK_DIR : EVENTS.UNLINK;
    if (wasTracked && !this._isIgnored(path2))
      this._emit(eventName, path2);
    this._closePath(path2);
  }
  /**
   * Closes all watchers for a path
   */
  _closePath(path2) {
    this._closeFile(path2);
    const dir = sysPath2.dirname(path2);
    this._getWatchedDir(dir).remove(sysPath2.basename(path2));
  }
  /**
   * Closes only file-specific watchers
   */
  _closeFile(path2) {
    const closers = this._closers.get(path2);
    if (!closers)
      return;
    closers.forEach((closer) => closer());
    this._closers.delete(path2);
  }
  _addPathCloser(path2, closer) {
    if (!closer)
      return;
    let list4 = this._closers.get(path2);
    if (!list4) {
      list4 = [];
      this._closers.set(path2, list4);
    }
    list4.push(closer);
  }
  _readdirp(root2, opts) {
    if (this.closed)
      return;
    const options = { type: EVENTS.ALL, alwaysStat: true, lstat: true, ...opts, depth: 0 };
    let stream = readdirp(root2, options);
    this._streams.add(stream);
    stream.once(STR_CLOSE, () => {
      stream = void 0;
    });
    stream.once(STR_END, () => {
      if (stream) {
        this._streams.delete(stream);
        stream = void 0;
      }
    });
    return stream;
  }
};
function watch(paths, options = {}) {
  const watcher = new FSWatcher(options);
  watcher.add(paths);
  return watcher;
}
var esm_default = { watch, FSWatcher };

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code4) => `\x1B[${code4 + offset}m`;
var wrapAnsi256 = (offset = 0) => (code4) => `\x1B[${38 + offset};5;${code4}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code4) {
        if (code4 < 8) {
          return 30 + code4;
        }
        if (code4 < 16) {
          return 90 + (code4 - 8);
        }
        let red;
        let green;
        let blue;
        if (code4 >= 232) {
          red = ((code4 - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code4 -= 16;
          const remainder = code4 % 36;
          red = Math.floor(code4 / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/supports-color/index.js
var import_node_process2 = __toESM(require("node:process"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_tty = __toESM(require("node:tty"), 1);
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process2.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position2 = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position2 !== -1 && (terminatorPosition === -1 || position2 < terminatorPosition);
}
var { env } = import_node_process2.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process2.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/utilities.js
function stringReplaceAll(string3, substring, replacer) {
  let index2 = string3.indexOf(substring);
  if (index2 === -1) {
    return string3;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string3.slice(endIndex, index2) + substring + replacer;
    endIndex = index2 + substringLength;
    index2 = string3.indexOf(substring, endIndex);
  } while (index2 !== -1);
  returnValue += string3.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string3, prefix, postfix, index2) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string3[index2 - 1] === "\r";
    returnValue += string3.slice(endIndex, gotCR ? index2 - 1 : index2) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index2 + 1;
    index2 = string3.indexOf("\n", endIndex);
  } while (index2 !== -1);
  returnValue += string3.slice(endIndex);
  return returnValue;
}

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open2, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open2;
    closeAll = close;
  } else {
    openAll = parent.openAll + open2;
    closeAll = close + parent.closeAll;
  }
  return {
    open: open2,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string3) => {
  if (self.level <= 0 || !string3) {
    return self[IS_EMPTY] ? "" : string3;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string3;
  }
  const { openAll, closeAll } = styler;
  if (string3.includes("\x1B")) {
    while (styler !== void 0) {
      string3 = stringReplaceAll(string3, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string3.indexOf("\n");
  if (lfIndex !== -1) {
    string3 = stringEncaseCRLFWithFirstIndex(string3, closeAll, openAll, lfIndex);
  }
  return openAll + string3 + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// packages/core/src/cli/index.ts
var import_meta = {};
function showHelp() {
  console.log(`
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  wiremd - Text-first UI design tool                            \u2502
\u2502  Generate wireframes from Markdown syntax                       \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

USAGE:
  wiremd <input.md> [options]

OPTIONS:
  -o, --output <file>        Output file path (default: <input>.html)
  -f, --format <format>      Output format: html, json (default: html)
  -s, --style <style>        Visual style: sketch, clean, wireframe, none, tailwind, material, brutal (default: sketch)
  -w, --watch                Watch for changes and regenerate
  --serve <port>             Start dev server with live-reload (default: 3000)
  --watch-pattern <pattern>  Glob pattern for files to watch (e.g., "**/*.md")
  --ignore <pattern>         Glob pattern for files to ignore (e.g., "**/node_modules/**")
  -p, --pretty               Pretty print output (default: true)
  --show-comments            Show inline comments as sticky-note callouts (default: hidden)
  -h, --help                 Show this help message
  -v, --version              Show version number

EXAMPLES:
  # Generate HTML with default Balsamiq-style
  wiremd wireframe.md

  # Output to specific file
  wiremd wireframe.md -o output.html

  # Use alternative style
  wiremd wireframe.md --style clean

  # Watch mode with live-reload
  wiremd wireframe.md --watch --serve 3000

  # Watch multiple files with pattern
  wiremd wireframe.md --watch --watch-pattern "src/**/*.md"

  # Generate JSON output
  wiremd wireframe.md --format json

STYLES:
  sketch     - Balsamiq-inspired hand-drawn look (default)
  clean      - Modern minimal design
  wireframe  - Traditional grayscale with hatching
  none       - Unstyled semantic HTML
  tailwind   - Modern utility-first design with purple accents
  material   - Google Material Design with elevation system
  brutal     - Neo-brutalism with bold colors and thick borders

For more information: https://github.com/teezeit/wiremd
`);
}
function showVersion() {
  try {
    const currentDir = import_meta.url ? (0, import_path3.dirname)(new URL(import_meta.url).pathname) : __dirname;
    const pkgPath = (0, import_path3.resolve)(currentDir, "../../package.json");
    const pkg = JSON.parse((0, import_fs5.readFileSync)(pkgPath, "utf-8"));
    console.log(`wiremd v${pkg.version}`);
  } catch {
    console.log("wiremd v0.1.2");
  }
}
function parseArgs(args) {
  const options = {
    input: "",
    format: "html",
    style: "sketch",
    pretty: true
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "-h":
      case "--help":
        showHelp();
        return null;
      case "-v":
      case "--version":
        showVersion();
        return null;
      case "-o":
      case "--output":
        options.output = args[++i];
        break;
      case "-f":
      case "--format": {
        const format = args[++i];
        if (format !== "html" && format !== "json") {
          console.error(`Error: Invalid format "${format}". Must be html or json.`);
          process.exit(1);
        }
        options.format = format;
        break;
      }
      case "-s":
      case "--style": {
        const style = args[++i];
        if (!["sketch", "clean", "wireframe", "none", "tailwind", "material", "brutal"].includes(style)) {
          console.error(`Error: Invalid style "${style}". Must be sketch, clean, wireframe, none, tailwind, material, or brutal.`);
          process.exit(1);
        }
        options.style = style;
        break;
      }
      case "-w":
      case "--watch":
        options.watch = true;
        break;
      case "--serve":
        options.serve = parseInt(args[++i], 10);
        if (isNaN(options.serve)) {
          console.error("Error: --serve requires a numeric port");
          process.exit(1);
        }
        break;
      case "--watch-pattern":
        options.watchPattern = args[++i];
        break;
      case "--ignore":
        options.ignorePattern = args[++i];
        break;
      case "--show-comments":
        options.showComments = true;
        break;
      case "-p":
      case "--pretty":
        options.pretty = true;
        break;
      default:
        if (arg.startsWith("-")) {
          console.error(`Error: Unknown option "${arg}"`);
          console.error('Run "wiremd --help" for usage information.');
          process.exit(1);
        }
        if (!options.input) {
          options.input = arg;
        }
    }
  }
  if (!options.input) {
    console.error("Error: No input file specified");
    console.error('Run "wiremd --help" for usage information.');
    process.exit(1);
  }
  return options;
}
var logger = {
  info: (msg) => console.log(source_default.blue("\u2139"), msg),
  success: (msg) => console.log(source_default.green("\u2713"), msg),
  warning: (msg) => console.log(source_default.yellow("\u26A0"), msg),
  error: (msg) => console.log(source_default.red("\u2717"), msg),
  watching: (msg) => console.log(source_default.cyan("\u{1F440}"), msg),
  changed: (msg) => console.log(source_default.magenta("\u{1F4DD}"), msg),
  style: (msg) => console.log(source_default.gray("\u{1F3A8}"), msg),
  format: (msg) => console.log(source_default.gray("\u{1F4E6}"), msg)
};
function checkFileSize(filePath) {
  try {
    const stats = (0, import_fs5.statSync)(filePath);
    const fileSizeMB = stats.size / (1024 * 1024);
    if (fileSizeMB > 10) {
      logger.warning(`Large file detected (${fileSizeMB.toFixed(2)}MB). Processing may take longer.`);
    }
  } catch (error) {
  }
}
function generateOutput(options) {
  const { input: input2, format, style, pretty, showComments } = options;
  if (!(0, import_fs5.existsSync)(input2)) {
    throw new Error(`File not found: ${input2}`);
  }
  checkFileSize(input2);
  const raw = (0, import_fs5.readFileSync)(input2, "utf-8");
  const markdown = resolveIncludes(raw, (0, import_path3.resolve)(input2));
  const ast = parse2(markdown);
  if (format === "json") {
    return renderToJSON(ast, { pretty });
  } else {
    return renderToHTML(ast, { style, pretty, inlineStyles: true, showComments: showComments ?? false });
  }
}
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Error: No input file specified");
    console.error('Run "wiremd --help" for usage information.\n');
    process.exit(1);
  }
  const options = parseArgs(args);
  if (!options) {
    process.exit(0);
  }
  const inputIsDir = (0, import_fs5.existsSync)(options.input) && (0, import_fs5.statSync)(options.input).isDirectory();
  if (inputIsDir) {
    if (!options.serve && !options.watch) {
      console.error("Error: Directory input requires --serve or --watch");
      process.exit(1);
    }
    const rootDir = (0, import_path3.resolve)(options.input);
    logger.watching(`Watching: ${source_default.bold(options.input)}`);
    if (options.serve) {
      const indexFile = (0, import_fs5.existsSync)((0, import_path3.join)(rootDir, "index.md")) ? "index.md" : void 0;
      startServer({
        port: options.serve,
        rootDir,
        inputFile: indexFile,
        renderFile: (mdPath) => generateOutput({ ...options, input: mdPath, showComments: true })
      });
      console.log("");
    }
    const ignorePatterns = [
      "**/node_modules/**",
      "**/.git/**",
      "**/dist/**",
      "**/build/**",
      ...options.ignorePattern ? [options.ignorePattern] : []
    ];
    const watchPaths = options.watchPattern ? [options.watchPattern] : [(0, import_path3.join)(rootDir, "**/*.md")];
    logger.info(`Ignoring: ${source_default.gray(ignorePatterns.join(", "))}`);
    console.log("");
    const watcher = esm_default.watch(watchPaths, {
      ignored: ignorePatterns,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 50 }
    });
    watcher.on("change", (path2) => {
      logger.changed(`${source_default.bold("changed")}: ${source_default.dim(path2.replace(process.cwd(), "."))}`);
      if (options.serve)
        notifyReload();
    }).on("add", (path2) => {
      logger.info(`New file: ${source_default.dim(path2.replace(process.cwd(), "."))}`);
      if (options.serve)
        notifyReload();
    }).on("unlink", (path2) => {
      logger.warning(`Removed: ${source_default.dim(path2.replace(process.cwd(), "."))}`);
      if (options.serve)
        notifyReload();
    }).on("ready", () => logger.info("Watcher ready. Press Ctrl+C to stop."));
    return;
  }
  if (!options.output) {
    const ext = options.format === "json" ? ".json" : ".html";
    options.output = options.input.replace(/\.md$/, ext);
  }
  if (options.watch || options.serve) {
    logger.watching(`Watching: ${source_default.bold(options.input)}`);
    try {
      const output = generateOutput(options);
      (0, import_fs5.writeFileSync)(options.output, output, "utf-8");
      logger.success(`Generated: ${source_default.bold(options.output)}`);
      logger.style(`Style: ${source_default.bold(options.style)}`);
      logger.format(`Format: ${source_default.bold(options.format)}`);
      console.log("");
    } catch (error) {
      logger.error(`Initial generation failed: ${error.message}`);
    }
    if (options.serve) {
      const port = options.serve;
      startServer({
        port,
        outputPath: options.output,
        renderFile: (mdPath) => generateOutput({ ...options, input: mdPath, showComments: true }),
        rootDir: (0, import_path3.dirname)(options.input),
        inputFile: (0, import_path3.basename)(options.input)
      });
      console.log("");
    }
    const watchPaths = [];
    const ignorePatterns = [
      "**/node_modules/**",
      "**/.git/**",
      "**/dist/**",
      "**/build/**"
    ];
    if (options.ignorePattern) {
      ignorePatterns.push(options.ignorePattern);
    }
    if (options.watchPattern) {
      watchPaths.push(options.watchPattern);
      logger.info(`Watch pattern: ${source_default.bold(options.watchPattern)}`);
    } else {
      watchPaths.push(options.input);
      const inputDir = (0, import_path3.dirname)(options.input);
      watchPaths.push((0, import_path3.join)(inputDir, "**/*.md"));
    }
    logger.info(`Ignoring: ${source_default.gray(ignorePatterns.join(", "))}`);
    console.log("");
    const watcher = esm_default.watch(watchPaths, {
      ignored: ignorePatterns,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 50
      },
      // Performance optimizations
      usePolling: false,
      // Use native fs.watch for better performance
      interval: 100,
      binaryInterval: 300
    });
    let isProcessing = false;
    let pendingRegeneration = false;
    const regenerate = async (filePath, event) => {
      if (isProcessing) {
        pendingRegeneration = true;
        return;
      }
      isProcessing = true;
      pendingRegeneration = false;
      try {
        const relativePath = filePath.replace(process.cwd(), ".");
        logger.changed(`${source_default.bold(event)}: ${source_default.dim(relativePath)}`);
        if (!(0, import_fs5.existsSync)(options.input)) {
          logger.warning("Input file deleted. Waiting for it to be restored...");
          isProcessing = false;
          return;
        }
        const output = generateOutput(options);
        (0, import_fs5.writeFileSync)(options.output, output, "utf-8");
        const timestamp = source_default.dim((/* @__PURE__ */ new Date()).toLocaleTimeString());
        logger.success(`Regenerated: ${source_default.bold(options.output)} ${timestamp}`);
        if (options.serve) {
          notifyReload();
        }
      } catch (error) {
        logger.error(`${error.message}`);
        if (error.stack) {
          console.log(source_default.dim(error.stack.split("\n").slice(1, 4).join("\n")));
        }
        if (options.serve) {
          notifyError(error.message);
        }
        logger.info("Watching for changes to retry...");
      } finally {
        isProcessing = false;
        if (pendingRegeneration) {
          setTimeout(() => regenerate(filePath, event), 50);
        }
      }
    };
    watcher.on("change", (path2) => regenerate(path2, "changed")).on("add", (path2) => {
      logger.info(`New file detected: ${source_default.dim(path2.replace(process.cwd(), "."))}`);
      regenerate(path2, "added");
    }).on("unlink", (path2) => {
      const relativePath = path2.replace(process.cwd(), ".");
      logger.warning(`File removed: ${source_default.dim(relativePath)}`);
      if (path2 === options.input) {
        logger.warning("Main input file deleted. Waiting for restoration...");
      }
    }).on("error", (error) => {
      logger.error(`Watcher error: ${error.message}`);
    }).on("ready", () => {
      logger.info(source_default.green("Watcher ready. Press Ctrl+C to stop."));
    });
    const shutdown = () => {
      console.log("");
      logger.info("Stopping watch mode...");
      watcher.close().then(() => {
        logger.success("Watch mode stopped.");
        process.exit(0);
      });
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    return;
  }
  logger.info(`Parsing: ${source_default.bold(options.input)}`);
  try {
    const output = generateOutput(options);
    (0, import_fs5.writeFileSync)(options.output, output, "utf-8");
    logger.success(`Generated: ${source_default.bold(options.output)}`);
    logger.style(`Style: ${source_default.bold(options.style)}`);
    logger.format(`Format: ${source_default.bold(options.format)}`);
  } catch (error) {
    logger.error(`Generation failed: ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}
var isMainModule = import_meta.url === (0, import_url.pathToFileURL)(process.argv[1]).href;
if (isMainModule) {
  main();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkFileSize,
  generateOutput,
  main,
  parseArgs,
  showHelp,
  showVersion
});
/*! Bundled license information:

chokidar/esm/index.js:
  (*! chokidar - MIT License (c) 2012 Paul Miller (paulmillr.com) *)
*/

main();
