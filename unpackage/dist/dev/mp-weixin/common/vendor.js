(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"uooGou","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!********************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/aliIcon/iconfont.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 110:
/*!***************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/until/MEIQIA.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (a, b, c, d, e, j, s) {
  a[d] = a[d] || function () {
    (a[d].a = a[d].a || []).push(arguments);
  };
  j = b.createElement(c),
  s = b.getElementsByTagName(c)[0];
  j.async = true;
  j.charset = 'UTF-8';
  j.src = 'https://static.meiqia.com/widget/loader.js';
  s.parentNode.insertBefore(j, s);
})(window, document, 'script', '_MEIQIA');
_MEIQIA('entId', 'ccda9a977d342d658e6519b56cb2ef2c');
_MEIQIA('withoutBtn');

/***/ }),

/***/ 12:
/*!*******************************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/js_sdk/ican-H5Api/ican-H5Api.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 13:
/*!************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/until/app.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getUrlCode = exports.getCode = exports.cdnUrl = exports.baseUrl = exports.request = exports.holo = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var appid = 'wx330402ca48f3af03'; //公众号appid

//本地环境
uni.setStorageSync('lng', '113.66072');
uni.setStorageSync('lat', '34.79977');
// 这个token 从微信公众号网页环境里拿
uni.setStorageSync('token', '5888979327324100910');
var baseUrl = 'http://test.jianyunkeji.net/';exports.baseUrl = baseUrl;
var cdnUrl = 'https://cdn.jianyunkeji.net/';

//测试服环境
// const baseUrl = window.location.origin + '/';  
// const cdnUrl = 'https://cdn.jianyunkeji.net/';

//正式服环境
// const baseUrl = window.location.origin + '/';
// const cdnUrl = 'https://cdn.jianyunkeji.cn/';
exports.cdnUrl = cdnUrl;

var request = function request(options) {
  if (!options.data) {
    options.data = {};
  }
  if (!options.data.token) {
    options.data.token = uni.getStorageSync('token');
  };
  if (options.loading || options.loading === undefined) {
    // holo.loading();
  }
  return new Promise(function (res, rej) {
    uni.request({

      url: baseUrl + options.url,
      data: options.data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*" },

      method: options.type || 'GET',
      dataType: 'json',
      success: function success(data) {
        // if (data.data.cmd == 'popup_to_login') {
        // uni.showModal({
        // 	content:'未登录，请先登录',
        // 	success:function(res) {
        // 		if (res.confirm) {
        // 			uni.switchTab({
        // 				url:'/pages/my/my'
        // 			})
        // 		} else if (res.cancel) {
        // 		   uni.switchTab({
        // 			url:'/pages/index/index'
        // 		   })
        // 		}
        // 	}
        // })
        // uni.clearStorageSync('token');
        // holo.hideLoding();
        // } else
        if (data.data.cmd == 'popup_to_login' || data.data.cmd == 'popup_to_affirm') {
          uni.clearStorageSync('token');
          uni.switchTab({
            url: '/pages/my/my' });

        } else {
          res(data);
        }
      },
      fail: function fail(data) {
        rej(data);
      } });

  });
};

// uni.setStorageSync('token','5888977165041131296'); 
// uni.setStorageSync('token','5888977165041130709'); 


// h5调用微信授权==>获取code
exports.request = request;var getCode = function getCode(scope, url) {
  var redirect_uri = '';
  if (url) {
    redirect_uri = url;
  } else {
    redirect_uri = window.location.href;
  }
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(
  appid, "&redirect_uri=").concat(encodeURIComponent(redirect_uri), "&response_type=code&scope=").concat(scope, "&state=123&connect_redirect=1#wechat_redirect");
};
//方法:用来提取code
exports.getCode = getCode;var getUrlCode = function getUrlCode(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
};
/*工具类*/exports.getUrlCode = getUrlCode;var
ToolClass = /*#__PURE__*/function () {
  function ToolClass() {_classCallCheck(this, ToolClass);_defineProperty(this, "filterSpace",






























































    function (str) {
      return str.replace(/ /g, '');
    });}_createClass(ToolClass, [{ key: "formatSeconds", value: function formatSeconds(date) {date = new Date(date * 1000);var y = date.getFullYear();var m = date.getMonth() + 1;var d = date.getDate();var h = date.getHours();var m1 = date.getMinutes();var s = date.getSeconds();h = h < 10 ? "0" + h : h;m1 = m1 < 10 ? "0" + m1 : m1;s = s < 10 ? "0" + s : s;m = m < 10 ? "0" + m : m;d = d < 10 ? "0" + d : d;return y + '.' + m + '.' + d + ' ' + h + ":" + m + ':' + s;} //日期+时间
  }, { key: "formatTime", value: function formatTime(date) {date = new Date(date);var year = date.getFullYear();var month = date.getMonth() + 1;var day = date.getDate();var hour = date.getHours();var minute = date.getMinutes();var second = date.getSeconds();return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');} }, { key: "formatdate", //日期格式化
    value: function formatdate(date) {date = new Date(date);var year = date.getFullYear();var month = date.getMonth() + 1;var day = date.getDate();return [year, month, day].map(this.formatNumber).join('-');} }, { key: "formatNumber", value: function formatNumber(n) {n = n.toString();return n[1] ? n : '0' + n;} }, { key: "getDay", //获取某一天的时间 day:0 代表今天 1 代表明天
    value: function getDay(day) {var today = new Date();var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();var tMonth = today.getMonth();var tDate = today.getDate();tMonth = this.doHandleMonth(tMonth + 1);tDate = this.doHandleMonth(tDate);return tYear + "-" + tMonth + "-" + tDate;} }, { key: "doHandleMonth", value: function doHandleMonth(month) {var m = month;if (month.toString().length == 1) {m = "0" + month;}return m;} }, { key: "formatNumber", value: function formatNumber(n) {n = n.toString();return n[1] ? n : '0' + n;
    }

    /*模态框*/ }, { key: "showModal", value: function showModal(
    obj) {
      uni.showModal({
        title: obj.title,
        content: obj.content,
        showCancel: obj.showCancel || true,
        cancelText: obj.cancelText || '取消',
        success: function success(res) {
          obj.success(res);
        },
        fail: function fail() {
          obj.fail();
        } });

    }
    /*消息提示*/ }, { key: "toast", value: function toast(
    obj) {
      uni.showToast({
        title: obj.title,
        icon: obj.icon || '',
        image: obj.image || '',
        mask: obj.mask || true,
        duration: obj.duration || 1500,
        position: obj.position || 'center',
        success: function success() {
          console.log('ok');
        },
        fail: function fail() {
          console.log('error');
        } });

    } }, { key: "loading",
    // 加载loading
    value: function loading() {
      uni.showLoading({
        title: '加载中' });

    } }, { key: "hideLoding",
    // 关闭loading
    value: function hideLoding() {
      uni.hideLoading();
    } }, { key: "countdown",
    //倒计时函数
    value: function countdown(residue) {
      var hour = Math.floor(residue / (60 * 60)); //获取剩余小时
      var minutes = Math.floor(residue / 60 % 60); //获取剩余分钟
      var seconds = Math.floor(residue % 60); //获取秒
      hour = hour < 10 ? '0' + hour : hour;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return "".concat(hour, ":").concat(minutes, ":").concat(seconds);
    } }]);return ToolClass;}();
;
var holo = new ToolClass();exports.holo = holo;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 171:
/*!*****************************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/components/uni-icons/icons.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"uooGou","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"uooGou","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"uooGou","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"uooGou","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!****************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/until/jweixin.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.jweixin = void 0;var _app = __webpack_require__(/*! ./app.js */ 13);



var jweixin = __webpack_require__(/*! ./jssdk.js */ 21);exports.jweixin = jweixin;
(0, _app.request)({
  url: 'ugo/api/app.php?c=nearby_store/getJssdkConf',
  data: {
    url: window.location.href.split('#')[0] } }).

then(function (res) {
  jweixin.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.data.data.appId, // 必填，公众号的唯一标识
    timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    signature: res.data.data.signature, // 必填，签名
    jsApiList: ['getLocation', 'openLocation', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
  });
});

/***/ }),

/***/ 21:
/*!**************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/until/jssdk.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}!function (e, n) {
   true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return n(e);
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(window, function (o, e) {
  if (!o.jWeixin) {var _w;
    var n,c = {
      config: "preVerifyJSAPI",
      onMenuShareTimeline: "menu:share:timeline",
      onMenuShareAppMessage: "menu:share:appmessage",
      onMenuShareQQ: "menu:share:qq",
      onMenuShareWeibo: "menu:share:weiboApp",
      onMenuShareQZone: "menu:share:QZone",
      previewImage: "imagePreview",
      getLocation: "geoLocation",
      openProductSpecificView: "openProductViewWithPid",
      addCard: "batchAddCard",
      openCard: "batchViewCard",
      chooseWXPay: "getBrandWCPayRequest",
      openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
      startSearchBeacons: "startMonitoringBeacons",
      stopSearchBeacons: "stopMonitoringBeacons",
      onSearchBeacons: "onBeaconsInRange",
      consumeAndShareCard: "consumedShareCard",
      openAddress: "editAddress" },

    a = function () {
      var e = {};
      for (var n in c) {e[c[n]] = n;}
      return e;
    }(),
    i = o.document,
    t = i.title,
    r = navigator.userAgent.toLowerCase(),
    s = navigator.platform.toLowerCase(),
    d = !(!s.match("mac") && !s.match("win")),
    u = -1 != r.indexOf("wxdebugger"),
    l = -1 != r.indexOf("micromessenger"),
    p = -1 != r.indexOf("android"),
    f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),
    m = (n = r.match(/micromessenger\/(\d+\.\d+\.\d+)/) || r.match(/micromessenger\/(\d+\.\d+)/)) ? n[1] : "",
    g = {
      initStartTime: L(),
      initEndTime: 0,
      preVerifyStartTime: 0,
      preVerifyEndTime: 0 },

    h = {
      version: 1,
      appId: "",
      initTime: 0,
      preVerifyTime: 0,
      networkType: "",
      isPreVerifyOk: 1,
      systemType: f ? 1 : p ? 2 : -1,
      clientVersion: m,
      url: encodeURIComponent(location.href) },

    v = {},
    S = {
      _completes: [] },

    y = {
      state: 0,
      data: {} };

    O(function () {
      g.initEndTime = L();
    });
    var I = !1,
    _ = [],
    w = (_w = {
      config: function config(e) {
        B("config", v = e);
        var t = !1 !== v.check;
        O(function () {
          if (t) M(c.config, {
            verifyJsApiList: C(v.jsApiList),
            verifyOpenTagList: C(v.openTagList) },
          function () {
            S._complete = function (e) {
              g.preVerifyEndTime = L(), y.state = 1, y.data = e;
            }, S.success = function (e) {
              h.isPreVerifyOk = 0;
            }, S.fail = function (e) {
              S._fail ? S._fail(e) : y.state = -1;
            };
            var t = S._completes;
            return t.push(function () {
              !function () {
                if (!(d || u || v.debug || m < "6.0.2" || h.systemType < 0)) {
                  var i = new Image();
                  h.appId = v.appId, h.initTime = g.initEndTime - g.initStartTime, h.preVerifyTime = g.preVerifyEndTime -
                  g.preVerifyStartTime, w.getNetworkType({
                    isInnerInvoke: !0,
                    success: function success(e) {
                      h.networkType = e.networkType;
                      var n = "https://open.weixin.qq.com/sdk/report?v=" + h.version + "&o=" + h.isPreVerifyOk + "&s=" +
                      h.systemType + "&c=" + h.clientVersion + "&a=" + h.appId + "&n=" + h.networkType + "&i=" + h.initTime +
                      "&p=" + h.preVerifyTime + "&u=" + h.url;
                      i.src = n;
                    } });

                }
              }();
            }), S.complete = function (e) {
              for (var n = 0, i = t.length; n < i; ++n) {t[n]();}
              S._completes = [];
            }, S;
          }()), g.preVerifyStartTime = L();else
          {
            y.state = 1;
            for (var e = S._completes, n = 0, i = e.length; n < i; ++n) {e[n]();}
            S._completes = [];
          }
        }), w.invoke || (w.invoke = function (e, n, i) {
          o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);
        }, w.on = function (e, n) {
          o.WeixinJSBridge && WeixinJSBridge.on(e, n);
        });
      },
      ready: function ready(e) {
        0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());
      },
      error: function error(e) {
        m < "6.0.2" || (-1 == y.state ? e(y.data) : S._fail = e);
      },
      checkJsApi: function checkJsApi(e) {
        M("checkJsApi", {
          jsApiList: C(e.jsApiList) }, (
        e._complete = function (e) {
          if (p) {
            var n = e.checkResult;
            n && (e.checkResult = JSON.parse(n));
          }
          e = function (e) {
            var n = e.checkResult;
            for (var i in n) {
              var t = a[i];
              t && (n[t] = n[i], delete n[i]);
            }
            return e;
          }(e);
        }, e));
      },
      onMenuShareTimeline: function onMenuShareTimeline(e) {
        P(c.onMenuShareTimeline, {
          complete: function complete() {
            M("shareTimeline", {
              title: e.title || t,
              desc: e.title || t,
              img_url: e.imgUrl || "",
              link: e.link || location.href,
              type: e.type || "link",
              data_url: e.dataUrl || "" },
            e);
          } },
        e);
      },
      onMenuShareAppMessage: function onMenuShareAppMessage(n) {
        P(c.onMenuShareAppMessage, {
          complete: function complete(e) {
            "favorite" === e.scene ? M("sendAppMessage", {
              title: n.title || t,
              desc: n.desc || "",
              link: n.link || location.href,
              img_url: n.imgUrl || "",
              type: n.type || "link",
              data_url: n.dataUrl || "" }) :
            M("sendAppMessage", {
              title: n.title || t,
              desc: n.desc || "",
              link: n.link || location.href,
              img_url: n.imgUrl || "",
              type: n.type || "link",
              data_url: n.dataUrl || "" },
            n);
          } },
        n);
      },
      onMenuShareQQ: function onMenuShareQQ(e) {
        P(c.onMenuShareQQ, {
          complete: function complete() {
            M("shareQQ", {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },
            e);
          } },
        e);
      },
      onMenuShareWeibo: function onMenuShareWeibo(e) {
        P(c.onMenuShareWeibo, {
          complete: function complete() {
            M("shareWeiboApp", {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },
            e);
          } },
        e);
      },
      onMenuShareQZone: function onMenuShareQZone(e) {
        P(c.onMenuShareQZone, {
          complete: function complete() {
            M("shareQZone", {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },
            e);
          } },
        e);
      },
      updateTimelineShareData: function updateTimelineShareData(e) {
        M("updateTimelineShareData", {
          title: e.title,
          link: e.link,
          imgUrl: e.imgUrl },
        e);
      },
      updateAppMessageShareData: function updateAppMessageShareData(e) {
        M("updateAppMessageShareData", {
          title: e.title,
          desc: e.desc,
          link: e.link,
          imgUrl: e.imgUrl },
        e);
      },
      startRecord: function startRecord(e) {
        M("startRecord", {}, e);
      },
      stopRecord: function stopRecord(e) {
        M("stopRecord", {}, e);
      },
      onVoiceRecordEnd: function onVoiceRecordEnd(e) {
        P("onVoiceRecordEnd", e);
      },
      playVoice: function playVoice(e) {
        M("playVoice", {
          localId: e.localId },
        e);
      },
      pauseVoice: function pauseVoice(e) {
        M("pauseVoice", {
          localId: e.localId },
        e);
      },
      stopVoice: function stopVoice(e) {
        M("stopVoice", {
          localId: e.localId },
        e);
      },
      onVoicePlayEnd: function onVoicePlayEnd(e) {
        P("onVoicePlayEnd", e);
      },
      uploadVoice: function uploadVoice(e) {
        M("uploadVoice", {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },
        e);
      },
      downloadVoice: function downloadVoice(e) {
        M("downloadVoice", {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },
        e);
      },
      translateVoice: function translateVoice(e) {
        M("translateVoice", {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },
        e);
      },
      chooseImage: function chooseImage(e) {
        M("chooseImage", {
          scene: "1|2",
          count: e.count || 9,
          sizeType: e.sizeType || ["original", "compressed"],
          sourceType: e.sourceType || ["album", "camera"] }, (
        e._complete = function (e) {
          if (p) {
            var n = e.localIds;
            try {
              n && (e.localIds = JSON.parse(n));
            } catch (e) {}
          }
        }, e));
      },
      getLocation: function getLocation(e) {},
      previewImage: function previewImage(e) {
        M(c.previewImage, {
          current: e.current,
          urls: e.urls },
        e);
      },
      uploadImage: function uploadImage(e) {
        M("uploadImage", {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },
        e);
      },
      downloadImage: function downloadImage(e) {
        M("downloadImage", {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },
        e);
      },
      getLocalImgData: function getLocalImgData(e) {
        !1 === I ? (I = !0, M("getLocalImgData", {
          localId: e.localId }, (
        e._complete = function (e) {
          if (I = !1, 0 < _.length) {
            var n = _.shift();
            wx.getLocalImgData(n);
          }
        }, e))) : _.push(e);
      },
      getNetworkType: function getNetworkType(e) {
        M("getNetworkType", {}, (e._complete = function (e) {
          e = function (e) {
            var n = e.errMsg;
            e.errMsg = "getNetworkType:ok";
            var i = e.subtype;
            if (delete e.subtype, i) e.networkType = i;else
            {
              var t = n.indexOf(":"),
              o = n.substring(t + 1);
              switch (o) {
                case "wifi":
                case "edge":
                case "wwan":
                  e.networkType = o;
                  break;
                default:
                  e.errMsg = "getNetworkType:fail";}

            }
            return e;
          }(e);
        }, e));
      },
      openLocation: function openLocation(e) {
        M("openLocation", {
          latitude: e.latitude,
          longitude: e.longitude,
          name: e.name || "",
          address: e.address || "",
          scale: e.scale || 28,
          infoUrl: e.infoUrl || "" },
        e);
      } }, _defineProperty(_w, "getLocation",
    function getLocation(e) {
      M(c.getLocation, {
        type: (e = e || {}).type || "wgs84" }, (
      e._complete = function (e) {
        delete e.type;
      }, e));
    }), _defineProperty(_w, "hideOptionMenu",
    function hideOptionMenu(e) {
      M("hideOptionMenu", {}, e);
    }), _defineProperty(_w, "showOptionMenu",
    function showOptionMenu(e) {
      M("showOptionMenu", {}, e);
    }), _defineProperty(_w, "closeWindow",
    function closeWindow(e) {
      M("closeWindow", {}, e = e || {});
    }), _defineProperty(_w, "hideMenuItems",
    function hideMenuItems(e) {
      M("hideMenuItems", {
        menuList: e.menuList },
      e);
    }), _defineProperty(_w, "showMenuItems",
    function showMenuItems(e) {
      M("showMenuItems", {
        menuList: e.menuList },
      e);
    }), _defineProperty(_w, "hideAllNonBaseMenuItem",
    function hideAllNonBaseMenuItem(e) {
      M("hideAllNonBaseMenuItem", {}, e);
    }), _defineProperty(_w, "showAllNonBaseMenuItem",
    function showAllNonBaseMenuItem(e) {
      M("showAllNonBaseMenuItem", {}, e);
    }), _defineProperty(_w, "scanQRCode",
    function scanQRCode(e) {
      M("scanQRCode", {
        needResult: (e = e || {}).needResult || 0,
        scanType: e.scanType || ["qrCode", "barCode"] }, (
      e._complete = function (e) {
        if (f) {
          var n = e.resultStr;
          if (n) {
            var i = JSON.parse(n);
            e.resultStr = i && i.scan_code && i.scan_code.scan_result;
          }
        }
      }, e));
    }), _defineProperty(_w, "openAddress",
    function openAddress(e) {
      M(c.openAddress, {}, (e._complete = function (e) {
        e = function (e) {
          return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName,
          delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName,
          e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.
          addressDetailInfo, delete e.addressDetailInfo, e;
        }(e);
      }, e));
    }), _defineProperty(_w, "openProductSpecificView",
    function openProductSpecificView(e) {
      M(c.openProductSpecificView, {
        pid: e.productId,
        view_type: e.viewType || 0,
        ext_info: e.extInfo },
      e);
    }), _defineProperty(_w, "addCard",
    function addCard(e) {
      for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
        var r = n[t],
        a = {
          card_id: r.cardId,
          card_ext: r.cardExt };

        i.push(a);
      }
      M(c.addCard, {
        card_list: i }, (
      e._complete = function (e) {
        var n = e.card_list;
        if (n) {
          for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
            var o = n[i];
            o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext,
            delete o.is_succ;
          }
          e.cardList = n, delete e.card_list;
        }
      }, e));
    }), _defineProperty(_w, "chooseCard",
    function chooseCard(e) {
      M("chooseCard", {
        app_id: v.appId,
        location_id: e.shopId || "",
        sign_type: e.signType || "SHA1",
        card_id: e.cardId || "",
        card_type: e.cardType || "",
        card_sign: e.cardSign,
        time_stamp: e.timestamp + "",
        nonce_str: e.nonceStr }, (
      e._complete = function (e) {
        e.cardList = e.choose_card_info, delete e.choose_card_info;
      }, e));
    }), _defineProperty(_w, "openCard",
    function openCard(e) {
      for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
        var r = n[t],
        a = {
          card_id: r.cardId,
          code: r.code };

        i.push(a);
      }
      M(c.openCard, {
        card_list: i },
      e);
    }), _defineProperty(_w, "consumeAndShareCard",
    function consumeAndShareCard(e) {
      M(c.consumeAndShareCard, {
        consumedCardId: e.cardId,
        consumedCode: e.code },
      e);
    }), _defineProperty(_w, "chooseWXPay",
    function chooseWXPay(e) {
      M(c.chooseWXPay, V(e), e);
    }), _defineProperty(_w, "openEnterpriseRedPacket",
    function openEnterpriseRedPacket(e) {
      M(c.openEnterpriseRedPacket, V(e), e);
    }), _defineProperty(_w, "startSearchBeacons",
    function startSearchBeacons(e) {
      M(c.startSearchBeacons, {
        ticket: e.ticket },
      e);
    }), _defineProperty(_w, "stopSearchBeacons",
    function stopSearchBeacons(e) {
      M(c.stopSearchBeacons, {}, e);
    }), _defineProperty(_w, "onSearchBeacons",
    function onSearchBeacons(e) {
      P(c.onSearchBeacons, e);
    }), _defineProperty(_w, "openEnterpriseChat",
    function openEnterpriseChat(e) {
      M("openEnterpriseChat", {
        useridlist: e.userIds,
        chatname: e.groupName },
      e);
    }), _defineProperty(_w, "launchMiniProgram",
    function launchMiniProgram(e) {
      M("launchMiniProgram", {
        targetAppId: e.targetAppId,
        path: function (e) {
          if ("string" == typeof e && 0 < e.length) {
            var n = e.split("?")[0],
            i = e.split("?")[1];
            return n += ".html", void 0 !== i ? n + "?" + i : n;
          }
        }(e.path),
        envVersion: e.envVersion },
      e);
    }), _defineProperty(_w, "openBusinessView",
    function openBusinessView(e) {
      M("openBusinessView", {
        businessType: e.businessType,
        queryString: e.queryString || "",
        envVersion: e.envVersion }, (
      e._complete = function (n) {
        if (p) {
          var e = n.extraData;
          if (e) try {
            n.extraData = JSON.parse(e);
          } catch (e) {
            n.extraData = {};
          }
        }
      }, e));
    }), _defineProperty(_w, "miniProgram",
    {
      navigateBack: function navigateBack(e) {
        e = e || {}, O(function () {
          M("invokeMiniProgramAPI", {
            name: "navigateBack",
            arg: {
              delta: e.delta || 1 } },

          e);
        });
      },
      navigateTo: function navigateTo(e) {
        O(function () {
          M("invokeMiniProgramAPI", {
            name: "navigateTo",
            arg: {
              url: e.url } },

          e);
        });
      },
      redirectTo: function redirectTo(e) {
        O(function () {
          M("invokeMiniProgramAPI", {
            name: "redirectTo",
            arg: {
              url: e.url } },

          e);
        });
      },
      switchTab: function switchTab(e) {
        O(function () {
          M("invokeMiniProgramAPI", {
            name: "switchTab",
            arg: {
              url: e.url } },

          e);
        });
      },
      reLaunch: function reLaunch(e) {
        O(function () {
          M("invokeMiniProgramAPI", {
            name: "reLaunch",
            arg: {
              url: e.url } },

          e);
        });
      },
      postMessage: function postMessage(e) {
        O(function () {
          M("invokeMiniProgramAPI", {
            name: "postMessage",
            arg: e.data || {} },
          e);
        });
      },
      getEnv: function getEnv(e) {
        O(function () {
          e({
            miniprogram: "miniprogram" === o.__wxjs_environment });

        });
      } }), _w),


    T = 1,
    k = {};
    return i.addEventListener("error", function (e) {
      if (!p) {
        var n = e.target,
        i = n.tagName,
        t = n.src;
        if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i)
        if (-1 != t.indexOf("wxlocalresource://")) {
          e.preventDefault(), e.stopPropagation();
          var o = n["wx-id"];
          if (o || (o = T++, n["wx-id"] = o), k[o]) return;
          k[o] = !0, wx.ready(function () {
            wx.getLocalImgData({
              localId: t,
              success: function success(e) {
                n.src = e.localData;
              } });

          });
        }
      }
    }, !0), i.addEventListener("load", function (e) {
      if (!p) {
        var n = e.target,
        i = n.tagName;
        n.src;
        if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
          var t = n["wx-id"];
          t && (k[t] = !1);
        }
      }
    }, !0), e && (o.wx = o.jWeixin = w), w;
  }

  function M(n, e, i) {
    o.WeixinJSBridge ? WeixinJSBridge.invoke(n, x(e), function (e) {
      A(n, e, i);
    }) : B(n, i);
  }

  function P(n, i, t) {
    o.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {
      t && t.trigger && t.trigger(e), A(n, e, i);
    }) : B(n, t || i);
  }

  function x(e) {
    return (e = e || {}).appId = v.appId, e.verifyAppId = v.appId, e.verifySignType = "sha1", e.verifyTimestamp = v.timestamp +
    "", e.verifyNonceStr = v.nonceStr, e.verifySignature = v.signature, e;
  }

  function V(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1" };

  }

  function A(e, n, i) {
    "openEnterpriseChat" != e && "openBusinessView" !== e || (n.errCode = n.err_code), delete n.err_code, delete n.err_desc,
    delete n.err_detail;
    var t = n.errMsg;
    t || (t = n.err_msg, delete n.err_msg, t = function (e, n) {
      var i = e,
      t = a[i];
      t && (i = t);
      var o = "ok";
      if (n) {
        var r = n.indexOf(":");
        "confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (
        o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(
        /_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i &&
        "function not exist" == o && (o = "ok"), "" == o && (o = "fail");
      }
      return n = i + ":" + o;
    }(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", v.debug &&
    !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n);}

    i.complete && i.complete(n);
  }

  function C(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
        o = c[t];
        o && (e[n] = o);
      }
      return e;
    }
  }

  function B(e, n) {
    if (!(!v.debug || n && n.isInnerInvoke)) {
      var i = a[e];
      i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "");
    }
  }

  function L() {
    return new Date().getTime();
  }

  function O(e) {
    l && (o.WeixinJSBridge ? e() : i.addEventListener && i.addEventListener("WeixinJSBridgeReady", e, !1));
  }
});

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**********************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 712:
/*!***********************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/integralBtn1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 713:
/*!***********************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/integralBtn2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 714:
/*!***********************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/integralBtn3.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABWCAYAAACpQ0o9AAAXKklEQVR42u1d2ZsUxZZnHu/7nVe/uQ93/BfunfF1WFpEtmYRQdkRpFFQdlQYUUG54DY6KuoFF1y4CIqO447bFZSGbqDZGrqrurq6q7trr8zKperMORGRmZFZmVVZ3UWDc+3v+30RcSLiRJxfRJyMjMzKHjPmBvgDgH8qXrlys9bd3Wx0dz9idnfvw/CY3t3dYUQiCUTBiEQNDA2UKyRjeViGl41SnWbSQbrG/PZXg/Bo9I9IYIvZHTmCZA4ikVAfInZcl9Im6jIj3UdIN7XxG9PiT+nsvAmJ3oQktdVPdgAi7rRekR9pozap7eLBtycp7x+IEyheb/+vd/1h/SEJ/4E4iiSYYQgMC72uQYqa6uH3VPXgARCI1z15kLTrWb8uP25Go1PQ8Naws3a4CDsI6pGDluGgHHo3Ve/14VdBPhp6CxJ73E1MpKrfvvaIgHa6lQ8AguIopz7eEtYu7b0Dt6tEIILi9fIy0vrVZ3tv7+9x17EfDS3XS4zuuxIidV1461opEQojdE0oU5+p77/aiyluE6ejYQMjmZl6gy7Auo8rCqF7gGz4tW0Zf2d2RfY2alZeS5cUZnBxq7qXbLrhiVe7uv5Q9YLaqJ1KrbqRxmxTJbQC2nbDEq9fvfon7GR/43Yto3nxDbUCEkZX17/dcMQXu7qa2G1+mAvaNdy9jLhM7UmjkK03DPFi767pDXQjVcmJXOMLdG1oZPONMuO1EfvxSJXZGWmAG2v4NSCiXdcVAD09f67maq7ZHWykwStp+PUV4mD0iY/H/wUb7xuNu9CgFaU3kFC9ip5qqxdvxvrU0dwF0Z5X7+5qHdUZ6iFJ9yVutHdHEWcbOlr3AbjleuV63OyMFvRh9EmPdO0drSOD+i6YjcDFDjBOfAP6h6+D/uojoO+5F/QdCxDzQX9yMejPrQH97V2gf3UIjLN4QHa1s/a5PkI7fcp1sBZmFekBB3PF/z267Jqd59NB08jOasK4KI/RV6+A3vp30P/2AujPrEKyF3I8tQT03fcgVoC+aynoOxfxwSD5Kw/zQbh4vq4jZfXwwbq3rnL94uH3i/UexoU+Uuank6PoVq50gv7tUdBfWAv6E3dzYl/dCvrH+8H4/lMwfv4O9JM/gPHTV6B/eQj0957DFbAay87nZT94CYzz7VUHvDr53XUPHnHUcPKxoX9HlK/dts4z469c5oTuWcnJfG0b6N98BMaZUzijz4Fx+SIYly7ykMUvgNFxBgxaJUdeA203uqUncCW8sxv0c1inu8u3Xdd5/qnWuu+IfZ4HlBv6PICe7qDCE6N2QUN/rX99BPS/rACNCDyEM7jtF+5GLiLJF86DfqEDdLwOsFCA5dMgnD8L+nf/A9rzD4L2GK6Yd5/BOmcCB6Dh9waRyImGvTFhRrumDOtBdY2LlW+ZrqugnzgG2rP3c+IOvoCzvdUh/Pw50DvOCpzBWS3i58+I8Jw9EPp3n4L23AM4gHiNOLqPr5BROuwjzhpzWtnVdWp0bqBwZhKJr28H7dF5uHvZAzrOeE66RXYNdIhBuICuiQbiW1wBu3AFPbUc9B8+Y4Nb9wqIhMn3HolETo382WskMtbVeMQbRsJ1OuI/y/GIVpBxle9sjn2MM3UxaM+sBuOX7/lMZsS2g362nYcdEsmuVXCGl2HlRP7ZNtAOvgja9rtA378TV9A5h3y77xEfOyJOGblc7TMfmZuxI33wfdRpOOJ0NBJxGnJtEyNSJ30GhghuPwkGzkL924+R7E84cIbqXx0Gbe820LbNBe1l3Mt/fhD0Lz7A8G8OvjjEZV8eRljhYS5jOOQpj7JDe9GFLQBt5z28LVpNbT9ztP/CL9TYL/9DPL9Bkezv9vIg50ePjuyFpii+VxORCLfRDf7yKuU6L4H+Ge4KnlsLxccXgfb4QiRlERQRGsNCKD4yB4oPzcIBmMcJI5kIeVxgu5OuyJPA8rYvgOLDs0Ej7FiGbmilwL08fOkhNmhG5+WQNvlx4MuHCbHYTcN1OZu5kmidnfLpJF1IcW+uPbkciltmIWZWQPORBSGw7GavbFaN/Jl8sLFftENiLin0xAqFzcMkP9pmK4kKVG0oGkw+7s21t/agoXdwAjYJIsJiU4305vr1abKuh3BV7H+KH2M0kvxotK3+hyT4Qikn3IfQqCA6GtigkxcVjw/PngLthS1o6AyOjTP84zUx0xPK8pmOfGNQvSBdiOc3ov9vc/w3m0zRStt9J2LUhxMuq/vl3FI0upIrEwqjIm7LZETccqsTVkdwKdNFtvjselA3CmI88JOrGzDcINJyfKMkE3VVq7w3f0NlG6orf6ZTfs8DoJ8Rd8M20T4cuOIe+63JJ3GgR6Mt9bmcnp4jlSTXC8vfI/mnf0bjHkRjm0Fdj4Yi1PUiLmRWnJPS7JJTWVaHZAyko5nLNzQ7uuRyQmaXt3XPcPQKGct/sgX0Uyf49reC/BHhw/peaO3pGayqsKcO8ml7efJHUHetBnUdGrquuQKMyHXBsPItwquVdWG9FHrhbeOxZXhY9z3296rj9xtD/lDo4wb6NQev1AN22OMhXSa/pydgULjLYaeTJ74DdecqUNdOl9DsjhMJLplVxsqT0p4yRVsu53vjovy6Zo9ega14DPHjl6y/bE9vz/wewUGPY2MP50RrO+0crGHczYHDH3Ea6jwfZ30zV+5FFPzlAWUl8rUfvwb18RWgPjidQRGhDEUKZVQroz7Y7Crjp9evrp9c3TQXD/Q+ZieqJvWb+l9hszvtOlLGuDNIbj6I01BHykYstjU8yVVgkY83L9p3n4H66DJQHpgmgMbacUfGYeVbZdxyL1RXviizZrpPPZ6v+tbDcMMc0D79mziACyJfRqyS/EAuoltDkY+jtI8UWw2wMBZz4l7EKjtlL1GL/GOfgrJ1MZIyjWP1NCcehNVSuNqnTpBsTRX5Gh+dFjbeCcWPDvBjabroRqPSzI352BsDrd1xOzrG3RzE7PLEaajzfCT6G1YxZqFHigultlx0zB4cKy6Rj8tY+/oTUB5aCMr9UxHTBDC+eqoTt+SrrbRXJpeT6/qgQq9PO5621PV4tHHor/xhTbcgP9bjttnDi+kjq+SMxY+F22b29na4yB4WhH+kPT6e6WhffAjK5vmg3De1AgUBP1lQXq16QeUK1dpfOxuK77zEjq/5zI/AyHmwcT7cw5Pe3oS3sinBiPWC0evTQK8nTrOfzfxLUPzsMC7ru6GwagoCDaWwZSqLWzIKFZZnyQRarPypos4UJwyQKd56kj5llSNXqE6LKLsGb7j2PYPH0W283zh5TJpEvbJtAbYHQZQ1e2OJsOQXEKIihQKWsl5Z1gumnecpR+TT0QL6/OInB0FZP48bubIGWkLIHpgF+uF9UOpF/UfeYGlXuRZPHT+5N/9+vAd5ZScehZzmzxdo5bps5nHTlsW47b6IeWWFcOTH44YRqLQSZlDjMZw5EXQ76POLR9+Fwto7oXDvZIEpkEdQPG/LPFg52VVezlMeXgrmxXagP/PyWbyY3+Mqk/eEBU9b+QqdNAC4E3oeH9S3nWQz3ySfL0g0a/IQr8WNOULy46gsHm5Q4jG+ZCP8TYTikbdwdiL5y9HwFQ4KAl5ZvgoKLc2gvfk8lHMZRn45nwXtwIvoRpp5meWODrm9Wnrz96Ib2r2JHYVwt9NjE2gy2y3b6hsAkReS/N54waQG4nE3enloSjLTk29aZZj7scjvxF3EfvSpd0D+ntuRnNt5WIHJ7vRyqeyKqZBfOR0vjDNxlq8As+04QMlk5EOpBEb7CVC2rWD5+ZXTsPyUSl2uNiYL2WSnHRwo5Qk8XGs9zme+IJ8Tzok1JZtNiROZH8ZDXBqIOKsXzu2U+voSDul9doNBMHzSbHbQhcYi//3XIX//bMgvm4S4vQ5MAmX7/aC++BgU9z8L2gf4wtSJb6FcyIP8V1by7CUq7YN97KKpvrCd1ZP11GqHQmUbHq798iMnn7aStILFRDS9k9EDs0poxvsSYcnvwMI2+YaIV5DeJ+J9bpktJ39puZ1390L+PiR/6SSGnAd5n7QlM8+3QTk1xNxLWS1A2TDA74/kLB/LlVKDYHac4jqWOLryPm3IKGzBx4w/HbNnvuwBTGEb50Lw0tfH5SzfnycxCCG3mv3935hMKYfhCb15Muw8tuxw1tBeGV+CUt/6b8i3zITc4kkcSwi3iZDL8nKeFC/1dEEZXUtdf1ie6jHiqR2v3sXuNlj7WC6/Dp/5fvu5PfPZCu6L+9scr+QgiC8k/1hY8vf5ke+g33cg3OB+n5N/GdS/Po8XtBmQW3Rb3VCf2453nWfDDwCWMy93oOt5ou628qvnQfHzj9hWk8/8eM0J6MeTt5ze1xfuHU4cpa2sUj8n2o7397sGwEnLoVSGyO8RM//VpyG3vBlyCydCdgEauvA2HkfweBAwfwleCJ/aBOYlHADTrMo75RPxyq4trF6uqv6JEm7DviD5q/AZ88cHxcyPcfL7JSL7PXz0S3ZLHBn9/ZK8n2b+1rBbzWaueARwkX8FlJd2QW7ZdMjNR8IRuQU8zEppJlvgyRey3CK8GO7ZCqX+3uqTPhEH5eltrLxV39Yr65zvIyfZvbNB/eAt6YIbl4geARKJ5nAPU2IDN/NKCR9FkixRTWaRH+Xk/9cOnIlT0cBbIXs3YaKISyGDJZPSIp5fvwTP2Turkm+in89vWCrpuLUinrvbTy7yluNd7juvcbdD5NuzPFGF3ERN8oux2M2hHyOWEolBRmQiUQVV8qnRuET+M49BdtEUyN5167BReHw9lIYGqs/85CAUntjgU39iuHaW4ROtfS/ymd/bw69dLjv73en+RA2OGBdDdb21bA4MHKmptHqDvONEftcVKPxlKy7vyZCZhwYyNNmhJcsIOPmUx8PsAnQ7L+/Gu9qs499VBbeUQyy0ZbjNVPc+zcpzfU12W5m5TZLsVlu/0z7KF+MR80u7+cyn3RrN/JqTsDqMROLDut5e0BOJFkfBAJgDUtwlk/JcoSCftmtE/s4tuMSRkDubBAQZc0UawyzhTkkmy5GUIvricrHI9vNmTzf+DOcAFHY9jOHbLM32+ZivHXkHy0939M919JDOrKfdzFynL9mFeAzx9HbH55PLSQTYbtnP0gOO7QNWmgO9SH2vjkAi8UdbybCQ4B0X5Ocf24jLehIaPMHBHIlkK80wgcvmNNllswumMHdg4mGd0foTFHb/J2SXzmDEUUhpA48FSugq1DdfRhKnSPWbHH1zKtvLyvl3443Wji14c9jFZ75F/gi4IC7rfmutNDjYZg4MSooGwUkP1ia/T5CPSzi/bS0u7YmQuWOCgzkSZJk331WnyV1uThVdfuXuaHLne8vOw+3mo+uRfNntCPIHB9xhCJQSg+3DelcTl8tmc3CQN8ZCGQP+6YFBp3Pk9+miheTnHl4N6TuR/NkTBMZzg0U6fcd4Hs7mIeWlZ3PY5WdbMqvueDvfKTfBt420p0zapw5LYx/zj6zh5MeF26GJ5LG/FMiLpxxyOLxfmieTN5WGhsxaDfiC+bw+Rj7N/NzmVUhwE6RnISGIdAAyPunMrAkiPsGRz5bDCT51RHq2E3fkbj2u8nNuxb7e58x8unYJkku+AyAw5EM8ckccDv/3WENDRxFcuRUy5UMiLYFkg6LcoCA/HmOG5Nat4LNt5vhgzBpmXljMCiGf3QS59Sscn2+Rb9kn82DbLviwOBHkl5G7kX1nYSg9toLkMGDk93PyceZnVy/hxs0Yh7BCGeM5ZkpxV944H9n4AF3jAsqPE/qrlMNVkV2zFB+eX+XHyWhDySJfQikEB8bQ0LgR/y6rlEyeKg0l3cqT2IGklU46YdLqGLkeTr6JMz/bMh/SzePCYYYnbARm+KR9ZeMhu2qB8PkxfrF1zXJhd9Lhwc2BVSY58h/EMdeTSk0xk0RskpSC6UHJR04DUKILlXA72RV3QXr6OEgh5FBGykKzlN88VuSNlcqOdco3V+q09KSbnZBBipO+lFxWCjPYV3r2zMgf4ORzwpOhwLgYHJzauM/wplInmPKUaCTlEF7yDIK1Ioh8g5GP5+rrVnKipo1l5NkhETmNE2GFnOixHoJEepo7tAaGpb0yuZ7d1jgfHWNd5bOrFomZ3yvIH3JPsFTKsTtVyQFx1dDPxhvJ5C2lVKpcSqbwlj7FG035xVO8o4x89JV9vWwWqW++CpmFM7mB08YGIl0lrz6MG1a99Fx8i+HpHfyCi30nG5gbTVo2JrmdgoeSZLfgoExcNfxzL6h4v5lyN+rtgJ0mH0gXKnrERo8S8Y2Awot7IHPPPNzOTUbcfsMhs2gW5HfghzV++Ib9nIkdj9AEGkpK5FeQDR5O3rg2X5jKZn9fSqcHSqk0YCh1IO10Ki06QbOftlz9cXbuYnZeZL8uN87gOzGnj7MPVBgn8SMVJ3nI4q344NoH9MMK9kELq6yVZ9UT+VzmQGcyTx1RTrfL/p0dV7A+Ud/wKyXUV5PIx77TTofZYtmWFraKuMls53wQN5DL/fO1+8pUOj1dNFQdzPUMsjtEIxYBEx8l0qNA4xy+DUY/PD6NP785dVzgJwE5Lsu8+MmnTlAYJJPyiHjqE/5oz7hwlvXVpD5j38kG7mqCbM3YceLmmn9tChvayxrMSLA6ksk4s4P8foLveOiIwey8wGc/DQDNMvolOhlthwJnRPqMBDs/oE67t8xJT/xkZX2rDxTSZ2Eu4Ld5sI9m9xV2Z16iPb6Y9S4bLdtle5GT0fnAHcDvsNFW1nAQ2AAk+Q0KuR6aSfgUig0AvYJNhp4XoJ9fuiBk5wUs+Xkpr8MrbwvWEwSmv533BVcl9c3suswefZK/J7fJyGdkB9taRi6Ik9H7YHU6/YdSNttflXyCtd/v489z6YaLGXj1EvetV6qg86JTptNHFkYepNclu8T7FLnCJwnb5SR431PCz2eybvuygnjkgLgY/W9rZrN/xgFQEFABq5Ps4otGDIrzfdo700knGUmDQRfjnkgV1MpvAKgvveLtNLrIEvFJmfhMpX1ZJlOIg+v3VdlMpqmcy2lVB0C6ADM3RMbZz0L7fMOSS+aULVWUD0KfC6WKNiTgMQgjnHY2Q5arSTk+nWzJeWxDm8n26/8h61xuajmf11gHWSdzAllnudq7AutGxcIQD5NDjsyO83MU+845JcVl2HK5nlQfZeWkVMaKp7xIefy7RXbOGQAETTac8df/Q9b2AGQLE0v5nIIzAlywOu5dsl7/mc24V4u3jO1zvb5X0pf1qZvN+PtreWJkvfosonOVQBvNTOHG+YS77YIU5U+4AvpL+bzd2XKedZjDNqLSsLKfocNGNrCdmsj7pJksj7bkE2jjjffPC+wBwCs/vr7dygYgJMoB8euBckA/yoUCfsNRvXH/bYfrPqBQ2FuN5AoUKtO8fCGwXNlbr+Cjy44XoK7+iDplVq+wd1T38Q1yQ9NxEAYQ4EJeDvPcQAoLgnTMs+DUy4NXT7lKnqsdr4zPZDtddumwSGcDMEA2jPm1/tFBU0nJv4EGloPJc9JlPxID8spKbX1+dau1w/Uq5ZKivHFND8lG88/IZm9Bo46XbMIUHiqcxDKlFSst4iKfE0YyxSFdqSBMyCQ9Qm4TLcl5WpEGSWFlzULhBPV1zP+3P/ZETFGmorGnOVkOygL1pEs+OvzyylXiTp3CaerbP8Q/Ljby+XFlVT2KMIMGoqyoIq2KPLUKoapEpirpcNKWLhZXMcS2cQdzFLAvY/4R//CCdhMSsQWJOMsIIYJVB2UPuFxhbyYzcplcccMi3M4TcWsAeFtbqO0xv/3ZB3X/CsViC+IIDsJQ2Yd8eRBc8aJ/HiddHSKdTDe28RvTIa4PkC3ebGpaM5K5FbEfiTyGr4B3lNViAkMFYQpQPMHz1GNUluqYiobf/yr+qv4B/f8BID4qLWurtcYAAAAASUVORK5CYII="

/***/ }),

/***/ 715:
/*!***********************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/integralBtn4.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 716:
/*!***********************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/integralBtn5.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 717:
/*!**************************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/exclamatoryMark.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAACoUlEQVQ4y21UW0tUURjdHi0xRS0V8zJ5QbqYJl4IxBCjehjooume2Wd/a8+lZAIxqCCqB82XHkqi6KUkeuglSMIfEAkS1EOUQ5OXxlHGceakqSURZb31oDNzZvJ722t96/vOWay9GTOVytT3EzCEd7SEVUxhmC6KJr6LbVUDmrDgKvnIQBhhClJQLsCwL56e0++5avn2pPa2NDqGUSyrOTyW3F4nK2WlvcbWrj/o9otv+iTBs8PUzlPRDj8WMeiuduXy1BiheXKWq1w3zxoqTD2nYhJNHsVnzEsXz4ki7oLe4ra0zXFZZ7oQQEiJTURV0Ft8hcOaHp2g5+OpeqkqoufGbWhXIccnTy1LYTwLfVjDfbnT5NYemibD2Wj2T92gH/RIz2dUjSnMqANmC3gJeRGRjWZMVsJLQXWEOd1YlA8p20yKYnqPsL0hYUgG9WNR9TM8o7D9JEtJFOBDsoAxvRkRvGbwq/krexOprQW8guawxmgNc5fKkwX/fxJjVEoT+MPwHbOiPJmCD4ZqStpQAh/+MvgpKCuTNlgwTtOqJhGVZQjQT2YbpvlzzYmUygQpjys3EbXX0YL0Mr1bhEUfz0hMLi8QsWhslDWdLkpDv8OWatwzHV5ZZiY9RRjSn4t6s9mimN7oYX6CeXMxyFepx5x4xyH46QshjvFUqWhVHxHFjKW07COvM+BsHdCi9OE8uu68fb4qvsHdQBMyYGthGmOMac5ORwjjsjWW1xSeRdlMi14uUY8xWhGXY3/KMxw9iGAWF1AUD/lGMy+ADR9pBbc68hKNdMOPJXole1EnLHy3XkilnQfhwAsYFMI1PT/pVlvTRZN6ohZg0AImMYZR+CiECCIYkcdV5pYvh15IVtwlH35hHev4jQCGqEtYmBbv+QcsJwTIUr8khgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 718:
/*!*****************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/signIn.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 719:
/*!*****************************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/todaySignInSuccess.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 720:
/*!*******************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/leftSign.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAaCAMAAAADmbV0AAABqlBMVEUAAAD///////////+/v7/////MzMyqqqrV1dXj4+PMzMzm5ubo6Oi/v7/V1dXr6+vPz8/f39/Dw8Pj4+PMzMzm5ubn5+fKysrExMTGxsbs7OzKysrDw8Pn5+fj4+PIyMjk5OTHx8fIyMjo6OjGxsbm5ubm5ubGxsbIyMjp6enHx8fk5OTIyMjm5ubm5ubJycnn5+fo6OjIyMjp6enn5+fHx8fJycnl5eXIyMjm5ubJycnKysrn5+fHx8fIyMjn5+fHx8fIyMjIyMjp6enn5+fn5+fIyMjIyMjJycnm5ubIyMjm5ubHx8fIyMjn5+fn5+fm5ubm5ubHx8fIyMjn5+fn5+fIyMjIyMjm5ubo6OjIyMjm5ubHx8fIyMjn5+fo6Ojo6OjIyMjHx8fIyMjm5ubIyMjIyMjn5+fIyMjJycnn5+fHx8fn5+fn5+fm5ubIyMjm5ubo6Ojo6OjIyMjn5+fHx8fn5+fIyMjn5+fIyMjIyMjn5+fo6OjIyMjn5+fIyMjn5+fn5+fHx8fo6OjHx8fIyMjHx8fn5+fo6Ojn5+fIyMjn5+fIyMjn5+cHZEveAAAAjHRSTlMAAQIDBAQFBgYJCgoLDAwNEBAREhQUFRgaGxsdHiAkJSYpKiwtMjQ2ODo7Q0ZHSEtLTk9QVVdZWVxdXmBhZWprbm9wc3d+gYOEhoeRk5WVl5iZmqanqqusrK+4uby9wMTIy83Nz9DR1tjY2dzc3eLj4+Tm5+nq7O3t7/Dx8fT19vb3+Pr7+/z8/P3+/rt9TOgAAAFeSURBVBgZhcH5Q4txHAfw91hrERW6UKspJNo6HOkYlXKtHBGjdMyRJF2Woy1Z5Hk+n//Zts9n3+d5/OL1glfjxKsn7fAIhGrxr9bvzGzH4DKwSVaiDh6H33PeTjWMKxblvPHDbZxFFEWnvlBBBC6XbBYdUL6XJG7CcXyVxedyqBukuuCYZNUL1ZwhsVgK4yqrZ1D+ORJ752Gc3GKxVg01SmoMhu8FCzsKdS5LYj4AI8bqIdShdyQyYRhNaRYfjkLdJzUEwz/L4ncb1EWLxLQPxi1Wd6COrZD4ehrG2Z8skkGox6Suwyh7y+LHGajLpKbguMdqGKo+RWL9BIz2PyxmDkAlSFgRGFUfWXxrgBok9QiOB6z6oULbJJaOwChJs3iOoqckfl2Ao4LFRg2KUiTuwm2Z8+xOGCtU8DoItx6bcybgiFPebgu8upP7n0YOwlG5QETZa/ivYF/8dhgefwFgudqVTiCbCgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 721:
/*!**********************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/rightSignIn.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAaCAMAAAAdUIXHAAABvFBMVEUAAAD///+AgID///+/v7/////MzMzV1dW/v7/j4+PMzMzm5ubo6Oi/v7/IyMjMzMzDw8Pj4+Pk5OTn5+fFxcXo6OjKysrg4ODr6+vOzs7s7Ozl5eXl5eXBwcHJycnIyMjl5eXs7Ozn5+fKysrn5+fGxsbp6enIyMjm5ubHx8fo6OjKysrl5eXHx8fl5eXJycnm5ubq6urGxsbn5+fFxcXp6enn5+fGxsbGxsbIyMjHx8fo6OjHx8fKysrm5ubn5+fn5+fIyMjJycnIyMjn5+fo6OjGxsbm5ubn5+fGxsbHx8fm5ubn5+fm5ubo6OjIyMjHx8fIyMjn5+fo6OjIyMjIyMjIyMjIyMjn5+fJycnn5+fIyMjn5+fIyMjo6Ojm5ubn5+fn5+fn5+fJycnHx8fo6OjIyMjn5+fn5+fn5+fn5+fn5+fn5+fIyMjIyMjn5+fn5+fIyMjIyMjHx8fJycnIyMjn5+fn5+fIyMjHx8fIyMjIyMjHx8fm5ubm5ubIyMjn5+fIyMjn5+fn5+fIyMjm5ubn5+fn5+fHx8fIyMjIyMjn5+fHx8fIyMjn5+fIyMjIyMjn5+fIyMjn5+d7RoqXAAAAknRSTlMAAQIDBAQFBggJCgoLDA4PERITFRYWGBkZGhsdHiEhJScoKisrLS8zMzc3Ojo7PD09PT9AQkdKTFBTV1lbW1xgYWJjamxucHBzdXx8foOFhoiPlZianqKmqKmqsbK4ubq8vb/Bw8XHyMnKy8zO0NXZ293f4eHj5ebp6uvt7u7v8fP09PX29vb3+Pr7+/z8/P3+/kDBGPkAAAFjSURBVBgZhcH5P5RRFAfg7ztGIyHRlK2FLEmSpSwt2ixJIaNBtlKRSo2tFSkRJjNzzj/s8zr3zr3v/NLz4P+cq+1XHKS6EHoVroFHcIaZX+fDq2GTiP7dhMX3kl1j8MhdJtePTBjdfChRAFuYRB2SyrdZVMLSRko1tMB7Fj+Pwij8TmLJD+0JK49gGScRb4Z2eZ/FrB/GfVJC0LI+sfh9Hsa5DRKRbGiDrDyA4X9DIloL7XqCxYQDo4eUfmh5n1msFsGo2iHxIQBtlJUbMDLmSfytgHablWFYBkh5CK14jcXKCRhNMRLTPijOFIvENRjHF0msn4HWwcpTWJ6Rchda6R8WH4/BaCXlObT0ORZ7l2Cc+kbiy0lovaw8hmWERLwFWtYvFu+OwMiJkhhC0kUWW2WwnCWxkIOkEhZdsKV9JVesAZZJdr1w4HGPXH2wnX7LzDNBpLg1vxvpdODha7xT78DjAAl95I/rEFNwAAAAAElFTkSuQmCC"

/***/ }),

/***/ 748:
/*!******************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/nogoods.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 799:
/*!****************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/jifen.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 816:
/*!**************************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/exchangePayIcon.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 817:
/*!************************************************************!*\
  !*** D:/xampp/htdocs/aijiayougou/static/wechatPayIcon.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAFjElEQVRYw81Za2wUVRSeIgjUiEKJDwJaTA0lbZd2595Z1rYzd7YJSBohkjRqjJqY6A/+oGhNTHxgNPhKINAfRiNiihSzdmfu7JZaYqBWESXBdwoShEBaRZCXz1ppqd+dbXHb7m5n9tlJbrrdvTP3u+ee853vnJGkFC+2XprKInIps+j9zCTbdYvuwedvGKc9OqcXMX7DOMU4OaybhGsmfbbW8K3SW2kZ21Y8Q8rVJX8kX6eZ5L4oSHIUoAYwhhyOS9jYMWwsopv00Wqrap60XpqSFaCKoRRpYQDlZB8W/ssFyASD/IO/RzSLPl1n+W7MGFDWyaaqhnc1s8heLNKfPtDRAwa4DKt/jNNaKdZKC+xdB+cVaq1KI47vYqaBjhtiDYNsZCHf/JTALu9YfHP9nvLtmkH7sw421tqcfMFa5VJ3bmBWFgNol2YoQ7kCOwq4SfcHdlXd6gxsRJ4rKCofQEeDJp+yFnlucsp6Uy7UTeXdfIP936/J1sS0hx8QqY3DdJNnsOQCsLQETHlZYlewvCWY/GPeXIBTBBw9B6u2BEJVqj84f2ZCsA1B6Srsaks0SvPir2cAtFkPkeqxadsf9M9UQ2RlyZaS6Ve+hPmrcePp3FoUxjFhUU7eEUDLgmVXj7FjARLWYjAGYoqcZWHv0hjA8oYcW/eUZpGteqvsiyeEqq1F1zJLeQhATwxz8yBc5nVpSCqQfO0ls/DPJznxURw9ALyhcwDtlOKl4YKKrtKKuhA1xgc/+VbldIG0bJfHB9494yBy/3CpzGLv/ckGanrlOEc/kqyu1yLyOjXiPQlXifecfpUvvUeqsyrXOpGFkIRPMFNpYlzpcwXUJE160CtLCOy4EY9jZoZcg7lttkHMpMHZJOkGfcsBgQ/Whn2rhBiq31u2Bik7yYmQQfztFUJGN6qWIBlNS8ROdxieGxBUz+CEf3GYsiMSPnQ4mmzQl2GNKSLB4POdOOKv9Ch3xoI9ARm6SeVyRTJhbtOoSet0oa1Ne4NO6e+QAHzYyeQAp98pB5SiWIEUsOiLCKb9WLwbYwMzSHlDoqMfuS9Ib9K5shHP/DUVdpHsNOhscp9myQ1j0znrLJ4hR+RC2/oTFAJwv9VY74Abq45hmt8dAxa0BDcw5YOJfTLRVROit+EZm8WCadLjaeESPS522MvaSLlToCKtahH/3bi3O1Wrxg4Uv18KwF+7oKlBQW8OKt2C5UE/xJTSjHv+zFTyCZjEFICDLm/83N/hn5MIqWe35xpok4cx74dhistkxtwsAD/n0vH/DoR9cXUqynUPKG+nCNAspPfLwhCSxr21UdXkXBOAa9+OdQs7rXK6Bu5yPGt6xKIn7fhZ0e6bhS+6XFq5R6TTmraa2SqqAuycY9P/ZllAfSgoNCovOXmcuVhwWIr2Iqi6Af58DuToAIzy1BXfU8Oehfjy+KQpPsc3WY4A8KJRiinAlZcywZVZGJegIR4bF+HqTroAP3w/+QCT3YpRWhSXQ5FJHhju604WVzirJi310aSGW7yaemWRURrrAxGslSZQfyL/z8Hk9/IL2pYAm4QWcdZfQ08LNzXnpwtkr7nDMdiRSyQUcOyTcJELOfTZc7ohr0v5HYgoxcF/bTmy7FHRhZ/QZyfoZk6DhT/LcpvqZ2iTJvF2Ke33G9Vh+Zb4NR+CIj3tILr6PSrKdjynMpUqJu6FIlMdWyyKxp36AX1FqDP8/z787pjDNtcA5h0Sr8vw3Ef08JKyiepA15fKlQdH6E1YFEG4T6i0kd9FF0dtrby9NiTXiwDVOHkN1fU20RRB04WLxgd6aI048nuFjFWDnoVpvylKVubAii9gcSEnz2PR52t2VMxONl8EjPD7Fe0l08VmRCKyG3i5uER/IdoPg75Af9ZefBJc/wEoTIJDDPANJAAAAABJRU5ErkJggg=="

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map