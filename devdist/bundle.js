webpackJsonp([0],[
/* 0 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_export.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , core      = __webpack_require__(/*! ./_core */ 24)
  , hide      = __webpack_require__(/*! ./_hide */ 12)
  , redefine  = __webpack_require__(/*! ./_redefine */ 13)
  , ctx       = __webpack_require__(/*! ./_ctx */ 25)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_an-object.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_global.js ***!
  \**************************************/
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_fails.js ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_is-object.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_wks.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(/*! ./_shared */ 67)('wks')
  , uid        = __webpack_require__(/*! ./_uid */ 44)
  , Symbol     = __webpack_require__(/*! ./_global */ 2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_descriptors.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_object-dp.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 125)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 23)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_to-length.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 34)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_to-object.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 19);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 10 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_has.js ***!
  \***********************************/
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 11 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_a-function.js ***!
  \******************************************/
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_hide.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(/*! ./_object-dp */ 7)
  , createDesc = __webpack_require__(/*! ./_property-desc */ 33);
module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_redefine.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , hide      = __webpack_require__(/*! ./_hide */ 12)
  , has       = __webpack_require__(/*! ./_has */ 10)
  , SRC       = __webpack_require__(/*! ./_uid */ 44)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 24).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 14 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_string-html.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , defined = __webpack_require__(/*! ./_defined */ 19)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_to-iobject.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 51)
  , defined = __webpack_require__(/*! ./_defined */ 19);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 16 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gopd.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(/*! ./_object-pie */ 52)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 33)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 15)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 23)
  , has            = __webpack_require__(/*! ./_has */ 10)
  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 125)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 17 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-gpo.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(/*! ./_has */ 10)
  , toObject    = __webpack_require__(/*! ./_to-object */ 9)
  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 88)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_cof.js ***!
  \***********************************/
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_defined.js ***!
  \***************************************/
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_strict-method.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 21 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_array-methods.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(/*! ./_ctx */ 25)
  , IObject  = __webpack_require__(/*! ./_iobject */ 51)
  , toObject = __webpack_require__(/*! ./_to-object */ 9)
  , toLength = __webpack_require__(/*! ./_to-length */ 8)
  , asc      = __webpack_require__(/*! ./_array-species-create */ 214);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 22 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-sap.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0)
  , core    = __webpack_require__(/*! ./_core */ 24)
  , fails   = __webpack_require__(/*! ./_fails */ 3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 23 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_to-primitive.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_core.js ***!
  \************************************/
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_ctx.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 26 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_metadata.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(/*! ./es6.map */ 141)
  , $export = __webpack_require__(/*! ./_export */ 0)
  , shared  = __webpack_require__(/*! ./_shared */ 67)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 144)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_typed-array.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(/*! ./_descriptors */ 6)){
  var LIBRARY             = __webpack_require__(/*! ./_library */ 37)
    , global              = __webpack_require__(/*! ./_global */ 2)
    , fails               = __webpack_require__(/*! ./_fails */ 3)
    , $export             = __webpack_require__(/*! ./_export */ 0)
    , $typed              = __webpack_require__(/*! ./_typed */ 68)
    , $buffer             = __webpack_require__(/*! ./_typed-buffer */ 95)
    , ctx                 = __webpack_require__(/*! ./_ctx */ 25)
    , anInstance          = __webpack_require__(/*! ./_an-instance */ 36)
    , propertyDesc        = __webpack_require__(/*! ./_property-desc */ 33)
    , hide                = __webpack_require__(/*! ./_hide */ 12)
    , redefineAll         = __webpack_require__(/*! ./_redefine-all */ 41)
    , toInteger           = __webpack_require__(/*! ./_to-integer */ 34)
    , toLength            = __webpack_require__(/*! ./_to-length */ 8)
    , toIndex             = __webpack_require__(/*! ./_to-index */ 43)
    , toPrimitive         = __webpack_require__(/*! ./_to-primitive */ 23)
    , has                 = __webpack_require__(/*! ./_has */ 10)
    , same                = __webpack_require__(/*! ./_same-value */ 138)
    , classof             = __webpack_require__(/*! ./_classof */ 50)
    , isObject            = __webpack_require__(/*! ./_is-object */ 4)
    , toObject            = __webpack_require__(/*! ./_to-object */ 9)
    , isArrayIter         = __webpack_require__(/*! ./_is-array-iter */ 80)
    , create              = __webpack_require__(/*! ./_object-create */ 38)
    , getPrototypeOf      = __webpack_require__(/*! ./_object-gpo */ 17)
    , gOPN                = __webpack_require__(/*! ./_object-gopn */ 39).f
    , getIterFn           = __webpack_require__(/*! ./core.get-iterator-method */ 97)
    , uid                 = __webpack_require__(/*! ./_uid */ 44)
    , wks                 = __webpack_require__(/*! ./_wks */ 5)
    , createArrayMethod   = __webpack_require__(/*! ./_array-methods */ 21)
    , createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 58)
    , speciesConstructor  = __webpack_require__(/*! ./_species-constructor */ 89)
    , ArrayIterators      = __webpack_require__(/*! ./es6.array.iterator */ 98)
    , Iterators           = __webpack_require__(/*! ./_iterators */ 47)
    , $iterDetect         = __webpack_require__(/*! ./_iter-detect */ 64)
    , setSpecies          = __webpack_require__(/*! ./_set-species */ 42)
    , arrayFill           = __webpack_require__(/*! ./_array-fill */ 73)
    , arrayCopyWithin     = __webpack_require__(/*! ./_array-copy-within */ 118)
    , $DP                 = __webpack_require__(/*! ./_object-dp */ 7)
    , $GOPD               = __webpack_require__(/*! ./_object-gopd */ 16)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/collections/generic-collection.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = GenericCollection;
function GenericCollection() {
    throw new Error("Can't construct. GenericCollection is a mixin.");
}

var DOMTokenList = global.DOMTokenList || function(){};

GenericCollection.EmptyArray = Object.freeze([]);

/* TODO: optimize for DOMTokenList and Array to use for() instead of forEach */
GenericCollection.prototype.addEach = function (values) {
    //We want to eliminate everything but array like: Strings, Arrays, DOMTokenList
    if(values && (values instanceof Array || (values instanceof DOMTokenList) || values instanceof String)) {
        for (var i = 0; i < values.length; i++) {
            this.add(values[i], i);
        }
    }
    else if (values && Object(values) === values) {
        if (typeof values.forEach === "function") {
            values.forEach(this.add, this);
        } else if (typeof values.length === "number") {
            // Array-like objects that do not implement forEach, ergo,
            // Arguments
            for (var i = 0; i < values.length; i++) {
                this.add(values[i], i);
            }
        } else {
            Object.keys(values).forEach(function (key) {
                this.add(values[key], key);
            }, this);
        }
    }
    return this;
};

// This is sufficiently generic for Map (since the value may be a key)
// and ordered collections (since it forwards the equals argument)
GenericCollection.prototype.deleteEach = function (values, equals) {
    values.forEach(function (value) {
        this["delete"](value, equals);
    }, this);
    return this;
};

// all of the following functions are implemented in terms of "reduce".
// some need "constructClone".

GenericCollection.prototype.forEach = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    return this.reduce(function (undefined, value, key, object, depth) {
        callback.call(thisp, value, key, object, depth);
    }, undefined);
};

GenericCollection.prototype.map = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    var result = [];
    this.reduce(function (undefined, value, key, object, depth) {
        result.push(callback.call(thisp, value, key, object, depth));
    }, undefined);
    return result;
};

GenericCollection.prototype.enumerate = function (start) {
    if (start == null) {
        start = 0;
    }
    var result = [];
    this.reduce(function (undefined, value) {
        result.push([start++, value]);
    }, undefined);
    return result;
};

GenericCollection.prototype.group = function (callback, thisp, equals) {
    equals = equals || Object.equals;
    var groups = [];
    var keys = [];
    this.forEach(function (value, key, object) {
        var key = callback.call(thisp, value, key, object);
        var index = keys.indexOf(key, equals);
        var group;
        if (index === -1) {
            group = [];
            groups.push([key, group]);
            keys.push(key);
        } else {
            group = groups[index][1];
        }
        group.push(value);
    });
    return groups;
};

GenericCollection.prototype.toArray = function () {
    return this.map(Function.identity);
};

// this depends on stringable keys, which apply to Array and Iterator
// because they have numeric keys and all Maps since they may use
// strings as keys.  List, Set, and SortedSet have nodes for keys, so
// toObject would not be meaningful.
GenericCollection.prototype.toObject = function () {
    var object = {};
    this.reduce(function (undefined, value, key) {
        object[key] = value;
    }, undefined);
    return object;
};

GenericCollection.from = function () {
    return this.apply(this,arguments);
};

GenericCollection.prototype.filter = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    var result = this.constructClone();
    this.reduce(function (undefined, value, key, object, depth) {
        if (callback.call(thisp, value, key, object, depth)) {
            result.add(value, key);
        }
    }, undefined);
    return result;
};

GenericCollection.prototype.every = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    return this.reduce(function (result, value, key, object, depth) {
        return result && callback.call(thisp, value, key, object, depth);
    }, true);
};

GenericCollection.prototype.some = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    return this.reduce(function (result, value, key, object, depth) {
        return result || callback.call(thisp, value, key, object, depth);
    }, false);
};

GenericCollection.prototype.all = function () {
    return this.every(Boolean);
};

GenericCollection.prototype.any = function () {
    return this.some(Boolean);
};

GenericCollection.prototype.min = function (compare) {
    compare = compare || this.contentCompare || Object.compare;
    var first = true;
    return this.reduce(function (result, value) {
        if (first) {
            first = false;
            return value;
        } else {
            return compare(value, result) < 0 ? value : result;
        }
    }, undefined);
};

GenericCollection.prototype.max = function (compare) {
    compare = compare || this.contentCompare || Object.compare;
    var first = true;
    return this.reduce(function (result, value) {
        if (first) {
            first = false;
            return value;
        } else {
            return compare(value, result) > 0 ? value : result;
        }
    }, undefined);
};

GenericCollection.prototype.sum = function (zero) {
    zero = zero === undefined ? 0 : zero;
    return this.reduce(function (a, b) {
        return a + b;
    }, zero);
};

GenericCollection.prototype.average = function (zero) {
    var sum = zero === undefined ? 0 : zero;
    var count = zero === undefined ? 0 : zero;
    this.reduce(function (undefined, value) {
        sum += value;
        count += 1;
    }, undefined);
    return sum / count;
};

GenericCollection.prototype.concat = function () {
    var result = this.constructClone(this);
    for (var i = 0; i < arguments.length; i++) {
        result.addEach(arguments[i]);
    }
    return result;
};

GenericCollection.prototype.flatten = function () {
    var self = this;
    return this.reduce(function (result, array) {
        array.forEach(function (value) {
            this.push(value);
        }, result, self);
        return result;
    }, []);
};

GenericCollection.prototype.zip = function () {
    var table = Array.prototype.slice.call(arguments);
    table.unshift(this);
    return Array.unzip(table);
}

GenericCollection.prototype.join = function (delimiter) {
    return this.reduce(function (result, string) {
        // work-around for reduce that does not support no-basis form
        if (result === void 0) {
            return string;
        } else {
            return result + delimiter + string;
        }
    }, void 0);
};

GenericCollection.prototype.sorted = function (compare, by, order) {
    compare = compare || this.contentCompare || Object.compare;
    // account for comparators generated by Function.by
    if (compare.by) {
        by = compare.by;
        compare = compare.compare || this.contentCompare || Object.compare;
    } else {
        by = by || Function.identity;
    }
    if (order === undefined)
        order = 1;
    return this.map(function (item) {
        return {
            by: by(item),
            value: item
        };
    })
    .sort(function (a, b) {
        return compare(a.by, b.by) * order;
    })
    .map(function (pair) {
        return pair.value;
    });
};

GenericCollection.prototype.reversed = function () {
    return this.constructClone(this).reverse();
};

GenericCollection.prototype.clone = function (depth, memo) {
    if (depth === undefined) {
        depth = Infinity;
    } else if (depth === 0) {
        return this;
    }
    var clone = this.constructClone();
    this.forEach(function (value, key) {
        clone.add(Object.clone(value, depth - 1, memo), key);
    }, this);
    return clone;
};

GenericCollection.prototype.only = function () {
    if (this.length === 1) {
        return this.one();
    }
};

GenericCollection.prototype.iterator = function () {
    return this.iterate.apply(this, arguments);
};

GenericCollection._sizePropertyDescriptor = {
    get: function() {
        return this.length;
    },
    enumerable: false,
    configurable: true
};

Object.defineProperty(GenericCollection.prototype,"size",GenericCollection._sizePropertyDescriptor);

__webpack_require__(/*! ./shim-array */ 115);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 28)))

/***/ }),
/* 31 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./~/collections/shim.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {


var Array = __webpack_require__(/*! ./shim-array */ 115);
var Object = __webpack_require__(/*! ./shim-object */ 57);
var Function = __webpack_require__(/*! ./shim-function */ 116);
var RegExp = __webpack_require__(/*! ./shim-regexp */ 209);



/***/ }),
/* 32 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_meta.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(/*! ./_uid */ 44)('meta')
  , isObject = __webpack_require__(/*! ./_is-object */ 4)
  , has      = __webpack_require__(/*! ./_has */ 10)
  , setDesc  = __webpack_require__(/*! ./_object-dp */ 7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 33 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_property-desc.js ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 34 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_to-integer.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 35 */
/* no static exports found */
/* all exports used */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Description goes here
 */
exports.default = {

  // configurations for game
  gameWidth: 1024,
  gameHeight: 768,
  localStorageName: 'biopeli',

  // configuration for game length
  gameLength: 300,

  // configurations for tiles
  tileSize: {
    width: 64,
    height: 64
  },

  ruinSettings: {
    minRuin: 4, // minimum time between two ruining events
    maxRuin: 48, // maxium time between two ruining events
    fixMultiplier: 2
  },

  // configurations for map
  mapSize: {
    width: 18, // NOTE TO CHANGER! VALUES UNDER 12 BUG THE MAP!
    height: 18 // THIS TOO
  },
  noise: {
    freqs: {
      groundfreq: 10,
      forestfreq: 20,
      fertilityfreq: 5
    },
    noiseWidth: 64,
    noiseHeight: 64
  },
  generatingSettings: {
    groundLimit: -0.2,
    forestLimit: -0.1
  },
  moveCosts: {
    grass: 1,
    water: 5,
    forest: 2,
    field: 1,
    industrial: 1
  },

  // configurations for menu
  menuWidth: 256,
  menuLeftPadding: 35,
  menuButtonWidth: 189,
  menuButtonHeight: 66,
  menuTextStartingPoint: 0.5,
  linePadding: 8,
  sectionPadding: 18,
  menuFontSize: 16,

  // configuration for top bar
  topBarItems: [{ name: 'time', asset: 'time', type: 'text', widthPct: 1 / 3 }, { name: 'score', asset: 'score', type: 'text', widthPct: 1 / 6 }, { name: 'cash', asset: 'cash', type: 'text', widthPct: 1 / 6 }, { name: 'turnip', asset: 'turnip', type: 'bar', widthPct: 1 / 3 }],
  topBarSettings: {
    height: 64,
    paddingWidth: 32,
    iconWidth: 64,
    iconPadding: 16,
    verticalPadding: 16
  },

  // configurations for camera
  cameraSpeed: 200,
  tweenCameraDuration: 500,

  // amount of time between time events
  gameTimerInterval: 1000,

  // configurations for city
  cityInitialPopulation: 500,
  cityDemandMultiplier: 4,
  cityDemandRandomVariance: 0.1,
  startTurnipPrice: 6,
  populationChangeAt100: 1.5,
  populationChangeAt200: 2.5,

  // max amount of flowers
  maxFlowers: 10,

  // currency
  currency: 'Ag',

  // fonts
  fontBig: '64px Arial',
  fontNormal: '32px Arial',
  fontSmall: '16px Arial',
  fontWeightBold: 'bold',
  fontFill: '#ffff00',

  // player
  playerInitialCash: 20000
};

/***/ }),
/* 36 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_an-instance.js ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 37 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_library.js ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 38 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_object-create.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , dPs         = __webpack_require__(/*! ./_object-dps */ 131)
  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 76)
  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 88)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 75)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 78).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gopn.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 133)
  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 76).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 40 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-keys.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 133)
  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 76);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 41 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_redefine-all.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 13);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 42 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_set-species.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(/*! ./_global */ 2)
  , dP          = __webpack_require__(/*! ./_object-dp */ 7)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6)
  , SPECIES     = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 43 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_to-index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 34)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 44 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_uid.js ***!
  \***********************************/
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 45 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_add-to-unscopables.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(/*! ./_hide */ 12)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 46 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_for-of.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(/*! ./_ctx */ 25)
  , call        = __webpack_require__(/*! ./_iter-call */ 127)
  , isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 80)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toLength    = __webpack_require__(/*! ./_to-length */ 8)
  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 97)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 47 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iterators.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 48 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_set-to-string-tag.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 7).f
  , has = __webpack_require__(/*! ./_has */ 10)
  , TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 49 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_string-trim.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , defined = __webpack_require__(/*! ./_defined */ 19)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , spaces  = __webpack_require__(/*! ./_string-ws */ 93)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 50 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_classof.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 18)
  , TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 51 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_iobject.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 18);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 52 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-pie.js ***!
  \******************************************/
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 53 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./~/weak-map/weak-map.js ***!
  \********************************/
/***/ (function(module, exports) {

// Copyright (C) 2011 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Install a leaky WeakMap emulation on platforms that
 * don't provide a built-in one.
 *
 * <p>Assumes that an ES5 platform where, if {@code WeakMap} is
 * already present, then it conforms to the anticipated ES6
 * specification. To run this file on an ES5 or almost ES5
 * implementation where the {@code WeakMap} specification does not
 * quite conform, run <code>repairES5.js</code> first.
 *
 * <p>Even though WeakMapModule is not global, the linter thinks it
 * is, which is why it is in the overrides list below.
 *
 * <p>NOTE: Before using this WeakMap emulation in a non-SES
 * environment, see the note below about hiddenRecord.
 *
 * @author Mark S. Miller
 * @requires crypto, ArrayBuffer, Uint8Array, navigator, console
 * @overrides WeakMap, ses, Proxy
 * @overrides WeakMapModule
 */

/**
 * This {@code WeakMap} emulation is observably equivalent to the
 * ES-Harmony WeakMap, but with leakier garbage collection properties.
 *
 * <p>As with true WeakMaps, in this emulation, a key does not
 * retain maps indexed by that key and (crucially) a map does not
 * retain the keys it indexes. A map by itself also does not retain
 * the values associated with that map.
 *
 * <p>However, the values associated with a key in some map are
 * retained so long as that key is retained and those associations are
 * not overridden. For example, when used to support membranes, all
 * values exported from a given membrane will live for the lifetime
 * they would have had in the absence of an interposed membrane. Even
 * when the membrane is revoked, all objects that would have been
 * reachable in the absence of revocation will still be reachable, as
 * far as the GC can tell, even though they will no longer be relevant
 * to ongoing computation.
 *
 * <p>The API implemented here is approximately the API as implemented
 * in FF6.0a1 and agreed to by MarkM, Andreas Gal, and Dave Herman,
 * rather than the offially approved proposal page. TODO(erights):
 * upgrade the ecmascript WeakMap proposal page to explain this API
 * change and present to EcmaScript committee for their approval.
 *
 * <p>The first difference between the emulation here and that in
 * FF6.0a1 is the presence of non enumerable {@code get___, has___,
 * set___, and delete___} methods on WeakMap instances to represent
 * what would be the hidden internal properties of a primitive
 * implementation. Whereas the FF6.0a1 WeakMap.prototype methods
 * require their {@code this} to be a genuine WeakMap instance (i.e.,
 * an object of {@code [[Class]]} "WeakMap}), since there is nothing
 * unforgeable about the pseudo-internal method names used here,
 * nothing prevents these emulated prototype methods from being
 * applied to non-WeakMaps with pseudo-internal methods of the same
 * names.
 *
 * <p>Another difference is that our emulated {@code
 * WeakMap.prototype} is not itself a WeakMap. A problem with the
 * current FF6.0a1 API is that WeakMap.prototype is itself a WeakMap
 * providing ambient mutability and an ambient communications
 * channel. Thus, if a WeakMap is already present and has this
 * problem, repairES5.js wraps it in a safe wrappper in order to
 * prevent access to this channel. (See
 * PATCH_MUTABLE_FROZEN_WEAKMAP_PROTO in repairES5.js).
 */

/**
 * If this is a full <a href=
 * "http://code.google.com/p/es-lab/wiki/SecureableES5"
 * >secureable ES5</a> platform and the ES-Harmony {@code WeakMap} is
 * absent, install an approximate emulation.
 *
 * <p>If WeakMap is present but cannot store some objects, use our approximate
 * emulation as a wrapper.
 *
 * <p>If this is almost a secureable ES5 platform, then WeakMap.js
 * should be run after repairES5.js.
 *
 * <p>See {@code WeakMap} for documentation of the garbage collection
 * properties of this WeakMap emulation.
 */
(function WeakMapModule() {
  "use strict";

  if (typeof ses !== 'undefined' && ses.ok && !ses.ok()) {
    // already too broken, so give up
    return;
  }

  /**
   * In some cases (current Firefox), we must make a choice betweeen a
   * WeakMap which is capable of using all varieties of host objects as
   * keys and one which is capable of safely using proxies as keys. See
   * comments below about HostWeakMap and DoubleWeakMap for details.
   *
   * This function (which is a global, not exposed to guests) marks a
   * WeakMap as permitted to do what is necessary to index all host
   * objects, at the cost of making it unsafe for proxies.
   *
   * Do not apply this function to anything which is not a genuine
   * fresh WeakMap.
   */
  function weakMapPermitHostObjects(map) {
    // identity of function used as a secret -- good enough and cheap
    if (map.permitHostObjects___) {
      map.permitHostObjects___(weakMapPermitHostObjects);
    }
  }
  if (typeof ses !== 'undefined') {
    ses.weakMapPermitHostObjects = weakMapPermitHostObjects;
  }

  // IE 11 has no Proxy but has a broken WeakMap such that we need to patch
  // it using DoubleWeakMap; this flag tells DoubleWeakMap so.
  var doubleWeakMapCheckSilentFailure = false;

  // Check if there is already a good-enough WeakMap implementation, and if so
  // exit without replacing it.
  if (typeof WeakMap === 'function') {
    var HostWeakMap = WeakMap;
    // There is a WeakMap -- is it good enough?
    if (typeof navigator !== 'undefined' &&
        /Firefox/.test(navigator.userAgent)) {
      // We're now *assuming not*, because as of this writing (2013-05-06)
      // Firefox's WeakMaps have a miscellany of objects they won't accept, and
      // we don't want to make an exhaustive list, and testing for just one
      // will be a problem if that one is fixed alone (as they did for Event).

      // If there is a platform that we *can* reliably test on, here's how to
      // do it:
      //  var problematic = ... ;
      //  var testHostMap = new HostWeakMap();
      //  try {
      //    testHostMap.set(problematic, 1);  // Firefox 20 will throw here
      //    if (testHostMap.get(problematic) === 1) {
      //      return;
      //    }
      //  } catch (e) {}

    } else {
      // IE 11 bug: WeakMaps silently fail to store frozen objects.
      var testMap = new HostWeakMap();
      var testObject = Object.freeze({});
      testMap.set(testObject, 1);
      if (testMap.get(testObject) !== 1) {
        doubleWeakMapCheckSilentFailure = true;
        // Fall through to installing our WeakMap.
      } else {
        module.exports = WeakMap;
        return;
      }
    }
  }

  var hop = Object.prototype.hasOwnProperty;
  var gopn = Object.getOwnPropertyNames;
  var defProp = Object.defineProperty;
  var isExtensible = Object.isExtensible;

  /**
   * Security depends on HIDDEN_NAME being both <i>unguessable</i> and
   * <i>undiscoverable</i> by untrusted code.
   *
   * <p>Given the known weaknesses of Math.random() on existing
   * browsers, it does not generate unguessability we can be confident
   * of.
   *
   * <p>It is the monkey patching logic in this file that is intended
   * to ensure undiscoverability. The basic idea is that there are
   * three fundamental means of discovering properties of an object:
   * The for/in loop, Object.keys(), and Object.getOwnPropertyNames(),
   * as well as some proposed ES6 extensions that appear on our
   * whitelist. The first two only discover enumerable properties, and
   * we only use HIDDEN_NAME to name a non-enumerable property, so the
   * only remaining threat should be getOwnPropertyNames and some
   * proposed ES6 extensions that appear on our whitelist. We monkey
   * patch them to remove HIDDEN_NAME from the list of properties they
   * returns.
   *
   * <p>TODO(erights): On a platform with built-in Proxies, proxies
   * could be used to trap and thereby discover the HIDDEN_NAME, so we
   * need to monkey patch Proxy.create, Proxy.createFunction, etc, in
   * order to wrap the provided handler with the real handler which
   * filters out all traps using HIDDEN_NAME.
   *
   * <p>TODO(erights): Revisit Mike Stay's suggestion that we use an
   * encapsulated function at a not-necessarily-secret name, which
   * uses the Stiegler shared-state rights amplification pattern to
   * reveal the associated value only to the WeakMap in which this key
   * is associated with that value. Since only the key retains the
   * function, the function can also remember the key without causing
   * leakage of the key, so this doesn't violate our general gc
   * goals. In addition, because the name need not be a guarded
   * secret, we could efficiently handle cross-frame frozen keys.
   */
  var HIDDEN_NAME_PREFIX = 'weakmap:';
  var HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'ident:' + Math.random() + '___';

  if (typeof crypto !== 'undefined' &&
      typeof crypto.getRandomValues === 'function' &&
      typeof ArrayBuffer === 'function' &&
      typeof Uint8Array === 'function') {
    var ab = new ArrayBuffer(25);
    var u8s = new Uint8Array(ab);
    crypto.getRandomValues(u8s);
    HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'rand:' +
      Array.prototype.map.call(u8s, function(u8) {
        return (u8 % 36).toString(36);
      }).join('') + '___';
  }

  function isNotHiddenName(name) {
    return !(
        name.substr(0, HIDDEN_NAME_PREFIX.length) == HIDDEN_NAME_PREFIX &&
        name.substr(name.length - 3) === '___');
  }

  /**
   * Monkey patch getOwnPropertyNames to avoid revealing the
   * HIDDEN_NAME.
   *
   * <p>The ES5.1 spec requires each name to appear only once, but as
   * of this writing, this requirement is controversial for ES6, so we
   * made this code robust against this case. If the resulting extra
   * search turns out to be expensive, we can probably relax this once
   * ES6 is adequately supported on all major browsers, iff no browser
   * versions we support at that time have relaxed this constraint
   * without providing built-in ES6 WeakMaps.
   */
  defProp(Object, 'getOwnPropertyNames', {
    value: function fakeGetOwnPropertyNames(obj) {
      return gopn(obj).filter(isNotHiddenName);
    }
  });

  /**
   * getPropertyNames is not in ES5 but it is proposed for ES6 and
   * does appear in our whitelist, so we need to clean it too.
   */
  if ('getPropertyNames' in Object) {
    var originalGetPropertyNames = Object.getPropertyNames;
    defProp(Object, 'getPropertyNames', {
      value: function fakeGetPropertyNames(obj) {
        return originalGetPropertyNames(obj).filter(isNotHiddenName);
      }
    });
  }

  /**
   * <p>To treat objects as identity-keys with reasonable efficiency
   * on ES5 by itself (i.e., without any object-keyed collections), we
   * need to add a hidden property to such key objects when we
   * can. This raises several issues:
   * <ul>
   * <li>Arranging to add this property to objects before we lose the
   *     chance, and
   * <li>Hiding the existence of this new property from most
   *     JavaScript code.
   * <li>Preventing <i>certification theft</i>, where one object is
   *     created falsely claiming to be the key of an association
   *     actually keyed by another object.
   * <li>Preventing <i>value theft</i>, where untrusted code with
   *     access to a key object but not a weak map nevertheless
   *     obtains access to the value associated with that key in that
   *     weak map.
   * </ul>
   * We do so by
   * <ul>
   * <li>Making the name of the hidden property unguessable, so "[]"
   *     indexing, which we cannot intercept, cannot be used to access
   *     a property without knowing the name.
   * <li>Making the hidden property non-enumerable, so we need not
   *     worry about for-in loops or {@code Object.keys},
   * <li>monkey patching those reflective methods that would
   *     prevent extensions, to add this hidden property first,
   * <li>monkey patching those methods that would reveal this
   *     hidden property.
   * </ul>
   * Unfortunately, because of same-origin iframes, we cannot reliably
   * add this hidden property before an object becomes
   * non-extensible. Instead, if we encounter a non-extensible object
   * without a hidden record that we can detect (whether or not it has
   * a hidden record stored under a name secret to us), then we just
   * use the key object itself to represent its identity in a brute
   * force leaky map stored in the weak map, losing all the advantages
   * of weakness for these.
   */
  function getHiddenRecord(key) {
    if (key !== Object(key)) {
      throw new TypeError('Not an object: ' + key);
    }
    var hiddenRecord = key[HIDDEN_NAME];
    if (hiddenRecord && hiddenRecord.key === key) { return hiddenRecord; }
    if (!isExtensible(key)) {
      // Weak map must brute force, as explained in doc-comment above.
      return void 0;
    }

    // The hiddenRecord and the key point directly at each other, via
    // the "key" and HIDDEN_NAME properties respectively. The key
    // field is for quickly verifying that this hidden record is an
    // own property, not a hidden record from up the prototype chain.
    //
    // NOTE: Because this WeakMap emulation is meant only for systems like
    // SES where Object.prototype is frozen without any numeric
    // properties, it is ok to use an object literal for the hiddenRecord.
    // This has two advantages:
    // * It is much faster in a performance critical place
    // * It avoids relying on Object.create(null), which had been
    //   problematic on Chrome 28.0.1480.0. See
    //   https://code.google.com/p/google-caja/issues/detail?id=1687
    hiddenRecord = { key: key };

    // When using this WeakMap emulation on platforms where
    // Object.prototype might not be frozen and Object.create(null) is
    // reliable, use the following two commented out lines instead.
    // hiddenRecord = Object.create(null);
    // hiddenRecord.key = key;

    // Please contact us if you need this to work on platforms where
    // Object.prototype might not be frozen and
    // Object.create(null) might not be reliable.

    try {
      defProp(key, HIDDEN_NAME, {
        value: hiddenRecord,
        writable: false,
        enumerable: false,
        configurable: false
      });
      return hiddenRecord;
    } catch (error) {
      // Under some circumstances, isExtensible seems to misreport whether
      // the HIDDEN_NAME can be defined.
      // The circumstances have not been isolated, but at least affect
      // Node.js v0.10.26 on TravisCI / Linux, but not the same version of
      // Node.js on OS X.
      return void 0;
    }
  }

  /**
   * Monkey patch operations that would make their argument
   * non-extensible.
   *
   * <p>The monkey patched versions throw a TypeError if their
   * argument is not an object, so it should only be done to functions
   * that should throw a TypeError anyway if their argument is not an
   * object.
   */
  (function(){
    var oldFreeze = Object.freeze;
    defProp(Object, 'freeze', {
      value: function identifyingFreeze(obj) {
        getHiddenRecord(obj);
        return oldFreeze(obj);
      }
    });
    var oldSeal = Object.seal;
    defProp(Object, 'seal', {
      value: function identifyingSeal(obj) {
        getHiddenRecord(obj);
        return oldSeal(obj);
      }
    });
    var oldPreventExtensions = Object.preventExtensions;
    defProp(Object, 'preventExtensions', {
      value: function identifyingPreventExtensions(obj) {
        getHiddenRecord(obj);
        return oldPreventExtensions(obj);
      }
    });
  })();

  function constFunc(func) {
    func.prototype = null;
    return Object.freeze(func);
  }

  var calledAsFunctionWarningDone = false;
  function calledAsFunctionWarning() {
    // Future ES6 WeakMap is currently (2013-09-10) expected to reject WeakMap()
    // but we used to permit it and do it ourselves, so warn only.
    if (!calledAsFunctionWarningDone && typeof console !== 'undefined') {
      calledAsFunctionWarningDone = true;
      console.warn('WeakMap should be invoked as new WeakMap(), not ' +
          'WeakMap(). This will be an error in the future.');
    }
  }

  var nextId = 0;

  var OurWeakMap = function() {
    if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
      calledAsFunctionWarning();
    }

    // We are currently (12/25/2012) never encountering any prematurely
    // non-extensible keys.
    var keys = []; // brute force for prematurely non-extensible keys.
    var values = []; // brute force for corresponding values.
    var id = nextId++;

    function get___(key, opt_default) {
      var index;
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        return id in hiddenRecord ? hiddenRecord[id] : opt_default;
      } else {
        index = keys.indexOf(key);
        return index >= 0 ? values[index] : opt_default;
      }
    }

    function has___(key) {
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        return id in hiddenRecord;
      } else {
        return keys.indexOf(key) >= 0;
      }
    }

    function set___(key, value) {
      var index;
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        hiddenRecord[id] = value;
      } else {
        index = keys.indexOf(key);
        if (index >= 0) {
          values[index] = value;
        } else {
          // Since some browsers preemptively terminate slow turns but
          // then continue computing with presumably corrupted heap
          // state, we here defensively get keys.length first and then
          // use it to update both the values and keys arrays, keeping
          // them in sync.
          index = keys.length;
          values[index] = value;
          // If we crash here, values will be one longer than keys.
          keys[index] = key;
        }
      }
      return this;
    }

    function delete___(key) {
      var hiddenRecord = getHiddenRecord(key);
      var index, lastIndex;
      if (hiddenRecord) {
        return id in hiddenRecord && delete hiddenRecord[id];
      } else {
        index = keys.indexOf(key);
        if (index < 0) {
          return false;
        }
        // Since some browsers preemptively terminate slow turns but
        // then continue computing with potentially corrupted heap
        // state, we here defensively get keys.length first and then use
        // it to update both the keys and the values array, keeping
        // them in sync. We update the two with an order of assignments,
        // such that any prefix of these assignments will preserve the
        // key/value correspondence, either before or after the delete.
        // Note that this needs to work correctly when index === lastIndex.
        lastIndex = keys.length - 1;
        keys[index] = void 0;
        // If we crash here, there's a void 0 in the keys array, but
        // no operation will cause a "keys.indexOf(void 0)", since
        // getHiddenRecord(void 0) will always throw an error first.
        values[index] = values[lastIndex];
        // If we crash here, values[index] cannot be found here,
        // because keys[index] is void 0.
        keys[index] = keys[lastIndex];
        // If index === lastIndex and we crash here, then keys[index]
        // is still void 0, since the aliasing killed the previous key.
        keys.length = lastIndex;
        // If we crash here, keys will be one shorter than values.
        values.length = lastIndex;
        return true;
      }
    }

    return Object.create(OurWeakMap.prototype, {
      get___:    { value: constFunc(get___) },
      has___:    { value: constFunc(has___) },
      set___:    { value: constFunc(set___) },
      delete___: { value: constFunc(delete___) }
    });
  };

  OurWeakMap.prototype = Object.create(Object.prototype, {
    get: {
      /**
       * Return the value most recently associated with key, or
       * opt_default if none.
       */
      value: function get(key, opt_default) {
        return this.get___(key, opt_default);
      },
      writable: true,
      configurable: true
    },

    has: {
      /**
       * Is there a value associated with key in this WeakMap?
       */
      value: function has(key) {
        return this.has___(key);
      },
      writable: true,
      configurable: true
    },

    set: {
      /**
       * Associate value with key in this WeakMap, overwriting any
       * previous association if present.
       */
      value: function set(key, value) {
        return this.set___(key, value);
      },
      writable: true,
      configurable: true
    },

    'delete': {
      /**
       * Remove any association for key in this WeakMap, returning
       * whether there was one.
       *
       * <p>Note that the boolean return here does not work like the
       * {@code delete} operator. The {@code delete} operator returns
       * whether the deletion succeeds at bringing about a state in
       * which the deleted property is absent. The {@code delete}
       * operator therefore returns true if the property was already
       * absent, whereas this {@code delete} method returns false if
       * the association was already absent.
       */
      value: function remove(key) {
        return this.delete___(key);
      },
      writable: true,
      configurable: true
    }
  });

  if (typeof HostWeakMap === 'function') {
    (function() {
      // If we got here, then the platform has a WeakMap but we are concerned
      // that it may refuse to store some key types. Therefore, make a map
      // implementation which makes use of both as possible.

      // In this mode we are always using double maps, so we are not proxy-safe.
      // This combination does not occur in any known browser, but we had best
      // be safe.
      if (doubleWeakMapCheckSilentFailure && typeof Proxy !== 'undefined') {
        Proxy = undefined;
      }

      function DoubleWeakMap() {
        if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
          calledAsFunctionWarning();
        }

        // Preferable, truly weak map.
        var hmap = new HostWeakMap();

        // Our hidden-property-based pseudo-weak-map. Lazily initialized in the
        // 'set' implementation; thus we can avoid performing extra lookups if
        // we know all entries actually stored are entered in 'hmap'.
        var omap = undefined;

        // Hidden-property maps are not compatible with proxies because proxies
        // can observe the hidden name and either accidentally expose it or fail
        // to allow the hidden property to be set. Therefore, we do not allow
        // arbitrary WeakMaps to switch to using hidden properties, but only
        // those which need the ability, and unprivileged code is not allowed
        // to set the flag.
        //
        // (Except in doubleWeakMapCheckSilentFailure mode in which case we
        // disable proxies.)
        var enableSwitching = false;

        function dget(key, opt_default) {
          if (omap) {
            return hmap.has(key) ? hmap.get(key)
                : omap.get___(key, opt_default);
          } else {
            return hmap.get(key, opt_default);
          }
        }

        function dhas(key) {
          return hmap.has(key) || (omap ? omap.has___(key) : false);
        }

        var dset;
        if (doubleWeakMapCheckSilentFailure) {
          dset = function(key, value) {
            hmap.set(key, value);
            if (!hmap.has(key)) {
              if (!omap) { omap = new OurWeakMap(); }
              omap.set(key, value);
            }
            return this;
          };
        } else {
          dset = function(key, value) {
            if (enableSwitching) {
              try {
                hmap.set(key, value);
              } catch (e) {
                if (!omap) { omap = new OurWeakMap(); }
                omap.set___(key, value);
              }
            } else {
              hmap.set(key, value);
            }
            return this;
          };
        }

        function ddelete(key) {
          var result = !!hmap['delete'](key);
          if (omap) { return omap.delete___(key) || result; }
          return result;
        }

        return Object.create(OurWeakMap.prototype, {
          get___:    { value: constFunc(dget) },
          has___:    { value: constFunc(dhas) },
          set___:    { value: constFunc(dset) },
          delete___: { value: constFunc(ddelete) },
          permitHostObjects___: { value: constFunc(function(token) {
            if (token === weakMapPermitHostObjects) {
              enableSwitching = true;
            } else {
              throw new Error('bogus call to permitHostObjects___');
            }
          })}
        });
      }
      DoubleWeakMap.prototype = OurWeakMap.prototype;
      module.exports = DoubleWeakMap;

      // define .constructor to hide OurWeakMap ctor
      Object.defineProperty(WeakMap.prototype, 'constructor', {
        value: WeakMap,
        enumerable: false,  // as default .constructor is
        configurable: true,
        writable: true
      });
    })();
  } else {
    // There is no host WeakMap, so we must use the emulation.

    // Emulated WeakMaps are incompatible with native proxies (because proxies
    // can observe the hidden name), so we must disable Proxy usage (in
    // ArrayLike and Domado, currently).
    if (typeof Proxy !== 'undefined') {
      Proxy = undefined;
    }

    module.exports = OurWeakMap;
  }
})();


/***/ }),
/* 54 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./src/controllers/menucontrol/contents/Content.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A base class for content creators. Content creators use Controller's interface
 * to create the blueprint of the menu for the menuView to draw.
 */
var Content = function () {
  function Content() {
    _classCallCheck(this, Content);
  }

  _createClass(Content, [{
    key: "setOwner",
    value: function setOwner(owner) {
      this.owner = owner;
    }
  }, {
    key: "sectionName",
    value: function sectionName(name) {
      this.owner.currentSection.name = name;
    }
  }, {
    key: "section",
    value: function section(name) {
      this.owner.section(name);
    }
  }, {
    key: "icon",
    value: function icon(asset) {
      this.owner.icon(asset);
    }
  }, {
    key: "text",
    value: function text(_text, size) {
      this.owner.text(_text, size);
    }
  }, {
    key: "animatedBar",
    value: function animatedBar(width, height, horizontal, percent) {
      this.owner.animatedBar(width, height, horizontal, percent);
    }
  }, {
    key: "button",
    value: function button(name, functionToCall, context, asset) {
      this.owner.button(name, functionToCall, context, asset);
    }
  }, {
    key: "add",
    value: function add(component) {
      this.owner.add(component);
    }
  }, {
    key: "addSection",
    value: function addSection(section) {
      this.owner.addSection(section);
    }
  }, {
    key: "addSections",
    value: function addSections(sections) {
      this.owner.addSections(sections);
    }

    /**
     * Helper function to format a number to not have decimals.
     *
     * @param {*} number
     */

  }, {
    key: "format",
    value: function format(number, decimals) {
      if (number == null) return number;
      if (decimals == null) decimals = 0;
      return number.toFixed(decimals);
    }
  }]);

  return Content;
}();

exports.default = Content;

/***/ }),
/* 55 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./src/models/logic/Functions.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LinearFunction = function LinearFunction(multiplier, constantAddition) {
  return function (x) {
    return x * multiplier + constantAddition;
  };
};

var ConstantFunction = function ConstantFunction(constant) {
  return function () {
    return constant;
  };
};

var Circle = function Circle(xo, yo, radius, mult) {
  return function (x) {
    return x >= -radius + xo && x <= radius + xo ? yo + mult * Math.sqrt(radius * radius - (x - xo) * (x - xo)) : 0;
  };
};

/**
 * Creates linear function that goes through given points
 *
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 */
var createLine = function createLine(x1, y1, x2, y2) {
  if (x1 === x2) {
    return null;
  }

  if (y1 === y2) {
    return ConstantFunction(y1);
  }

  if (x2 > x1) {
    var help = x2;
    x2 = x1;
    x1 = help;
    help = y2;
    y2 = y1;
    y1 = help;
  }

  var slope = (y2 - y1) / (x2 - x1);
  var constant = y1 - x1 * slope;
  return LinearFunction(slope, constant);
};

/**
 * Creates linear function with given slope and constant addition
 *
 * @param {*} slope
 * @param {*} constant
 */
var initializeLine = function initializeLine(slope, constant) {
  if (slope === 0) {
    return ConstantFunction(constant);
  }

  return LinearFunction(slope, constant);
};

var createCircle = function createCircle(x, y, radius, upper) {
  var mult = -1;
  if (upper) mult = 1;

  return Circle(x, y, radius, mult);
};

exports.createLine = createLine;
exports.initializeLine = initializeLine;
exports.createCircle = createCircle;

/***/ }),
/* 56 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./~/collections/_map.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Shim = __webpack_require__(/*! ./shim */ 31);
var GenericCollection = __webpack_require__(/*! ./generic-collection */ 30);
var Map, GlobalMap, CollectionsMap;

if((global.Map !== void 0) && (typeof global.Set.prototype.values === "function")) {

    Map = module.exports = global.Map,
    GlobalMap = Map;
    Map.Map = Map; // hack so require("map").Map will work in MontageJS

    // use different strategies for making sets observable between Internet
    // Explorer and other browsers.
    var protoIsSupported = {}.__proto__ === Object.prototype,
        map_makeObservable;

    if (protoIsSupported) {
        map_makeObservable = function () {
            this.__proto__ = ChangeDispatchMap;
        };
    } else {
        map_makeObservable = function () {
            Object.defineProperties(this, observableSetProperties);
        };
    }

    Object.defineProperty(Map.prototype, "makeObservable", {
        value: map_makeObservable,
        writable: true,
        configurable: true,
        enumerable: false
    });

    //This is a no-op test in property-changes.js - PropertyChanges.prototype.makePropertyObservable, so might as well not pay the price every time....
    Object.defineProperty(Map.prototype, "makePropertyObservable", {
        value: function(){},
        writable: true,
        configurable: true,
        enumerable: false
    });


    Map.prototype.constructClone = function (values) {
        return new this.constructor(values);
    };

    Map.prototype.isMap = true;
    Map.prototype.addEach = function (values) {
        if (values && Object(values) === values) {
            if (typeof values.forEach === "function") {
                // copy map-alikes
                if (values.isMap === true) {
                    values.forEach(function (value, key) {
                        this.set(key, value);
                    }, this);
                // iterate key value pairs of other iterables
                } else {
                    values.forEach(function (pair) {
                        this.set(pair[0], pair[1]);
                    }, this);
                }
            } else if (typeof values.length === "number") {
                // Array-like objects that do not implement forEach, ergo,
                // Arguments
                for (var i = 0; i < values.length; i++) {
                    this.add(values[i], i);
                }
            } else {
                // copy other objects as map-alikes
                Object.keys(values).forEach(function (key) {
                    this.set(key, values[key]);
                }, this);
            }
        } else if (values && typeof values.length === "number") {
            // String
            for (var i = 0; i < values.length; i++) {
                this.add(values[i], i);
            }
        }
        return this;
    };

    Map.prototype.add = function (value, key) {
        return this.set(key, value);
    };

    Map.prototype.reduce = function (callback, basis /*, thisp*/) {
        var thisp = arguments[2];
        this.forEach(function(value, key, map) {
            basis = callback.call(thisp, basis, value, key, this);
        });
        return basis;
    };

    Map.prototype.reduceRight = function (callback, basis /*, thisp*/) {
        var thisp = arguments[2];
        var keysIterator = this.keys();
        var size = this.size;
        var reverseOrder = new Array(this.size);
        var aKey, i = 0;
        while ((aKey = keysIterator.next().value)) {
            reverseOrder[--size] = aKey;
        }
        while (i++ < size) {
            basis = callback.call(thisp, basis, this.get(reverseOrder[i]), reverseOrder[i], this);
        }
        return basis;
    };

    Map.prototype.equals = function (that, equals) {
        equals = equals || Object.equals;
        if (this === that) {
            return true;
        } else if (that && typeof that.every === "function") {
            return that.size === this.size && that.every(function (value, key) {
                return equals(this.get(key), value);
            }, this);
        } else {
            var keys = Object.keys(that);
            return keys.length === this.size && Object.keys(that).every(function (key) {
                return equals(this.get(key), that[key]);
            }, this);
        }
    };

    var _keysArrayFunction = function(value,key) {return key;};
    Map.prototype.keysArray = function() {
        return this.map(_keysArrayFunction);
    }
    var _valuesArrayFunction = function(value,key) {return value;};
    Map.prototype.valuesArray = function() {
        return this.map(_valuesArrayFunction);
    }
    var _entriesArrayFunction = function(value,key) {return [key,value];};
    Map.prototype.entriesArray = function() {
        return this.map(_entriesArrayFunction);
    }
    Map.prototype.toJSON = function () {
        return this.entriesArray();
    };

    // XXX deprecated
    Map.prototype.items = function () {
        return this.entriesArray();
    };

    // Map.prototype.contentEquals = Object.equals;
    // Map.prototype.contentHash = Object.hash;


    Map.from = function (value) {
        var result = new this;
        result.addEach(value);
        return result;
    };


    //Backward compatibility:
    Object.defineProperty(Map.prototype,"length",{
        get: function() {
            return this.size;
        },
        enumerable: true,
        configurable:true
    });


    var map_clear = Map.prototype.clear,
        map_set = Map.prototype.set,
        map_delete = Map.prototype.delete;

    var observableMapProperties = {
        clear : {
            value: function () {
                var keys;
                if (this.dispatchesMapChanges) {
                    this.forEach(function (value, key) {
                        this.dispatchBeforeMapChange(key, value);
                    }, this);
                    keys = this.keysArray();
                }
                map_clear.call(this);
                if (this.dispatchesMapChanges) {
                    keys.forEach(function (key) {
                        this.dispatchMapChange(key);
                    }, this);
                }
            },
            writable: true,
            configurable: true

        },
        set : {
            value: function (key, value) {
                var found = this.get(key);
                if (found) { // update
                    if (this.dispatchesMapChanges) {
                        this.dispatchBeforeMapChange(key, found);
                    }

                    map_set.call(this,key, value);

                    if (this.dispatchesMapChanges) {
                        this.dispatchMapChange(key, value);
                    }
                } else { // create
                    if (this.dispatchesMapChanges) {
                        this.dispatchBeforeMapChange(key, undefined);
                    }

                    map_set.call(this,key, value);

                    if (this.dispatchesMapChanges) {
                        this.dispatchMapChange(key, value);
                    }
                }
                return this;
            },
            writable: true,
            configurable: true
        },

        "delete": {
            value: function (key) {
                if (this.has(key)) {
                    if (this.dispatchesMapChanges) {
                        this.dispatchBeforeMapChange(key, this.get(key));
                    }
                    map_delete.call(this,key);

                    if (this.dispatchesMapChanges) {
                        this.dispatchMapChange(key, undefined);
                    }
                    return true;
                }
                return false;
            }
        }
    };



    Object.addEach(Map.prototype, GenericCollection.prototype, false);

    var ChangeDispatchMap = Object.create(Map.prototype, observableMapProperties);
}

    var Set = __webpack_require__(/*! ./_set */ 206).CollectionsSet;
    var GenericMap = __webpack_require__(/*! ./generic-map */ 108);

    CollectionsMap = Map = function Map(values, equals, hash, getDefault) {
        if (!(this instanceof Map)) {
            return new Map(values, equals, hash, getDefault);
        }
        equals = equals || Object.equals;
        hash = hash || Object.hash;
        getDefault = getDefault || Function.noop;
        this.contentEquals = equals;
        this.contentHash = hash;
        this.getDefault = getDefault;
        this.store = new Set(
            undefined,
            function keysEqual(a, b) {
                return equals(a.key, b.key);
            },
            function keyHash(item) {
                return hash(item.key);
            }
        );
        this.length = 0;
        this.addEach(values);
    }

    Map.Map = Map; // hack so require("map").Map will work in MontageJS

    Object.addEach(Map.prototype, GenericCollection.prototype);
    Object.addEach(Map.prototype, GenericMap.prototype); // overrides GenericCollection
    Object.defineProperty(Map.prototype,"size",GenericCollection._sizePropertyDescriptor);

    Map.from = GenericCollection.from;

    Map.prototype.constructClone = function (values) {
        return new this.constructor(
            values,
            this.contentEquals,
            this.contentHash,
            this.getDefault
        );
    };

    Map.prototype.log = function (charmap, logNode, callback, thisp) {
        logNode = logNode || this.logNode;
        this.store.log(charmap, function (node, log, logBefore) {
            logNode(node.value.value, log, logBefore);
        }, callback, thisp);
    };

    Map.prototype.logNode = function (node, log) {
        log(' key: ' + node.key);
        log(' value: ' + node.value);
    };

    if(!GlobalMap) {
        module.exports = CollectionsMap;
    }
    else {
        module.exports = GlobalMap;
        GlobalMap.CollectionsMap = CollectionsMap;
    }

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 28)))

/***/ }),
/* 57 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/collections/shim-object.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var WeakMap = __webpack_require__(/*! weak-map */ 53);

module.exports = Object;

/*
    Based in part on extras from Motorola Mobility’s Montage
    Copyright (c) 2012, Motorola Mobility LLC. All Rights Reserved.
    3-Clause BSD License
    https://github.com/motorola-mobility/montage/blob/master/LICENSE.md
*/

/**
    Defines extensions to intrinsic <code>Object</code>.
    @see [Object class]{@link external:Object}
*/

/**
    A utility object to avoid unnecessary allocations of an empty object
    <code>{}</code>.  This object is frozen so it is safe to share.

    @object external:Object.empty
*/
Object.empty = Object.freeze(Object.create(null));

/**
    Returns whether the given value is an object, as opposed to a value.
    Unboxed numbers, strings, true, false, undefined, and null are not
    objects.  Arrays are objects.

    @function external:Object.isObject
    @param {Any} value
    @returns {Boolean} whether the given value is an object
*/
Object.isObject = function (object) {
    return Object(object) === object;
};

/**
    Returns the value of an any value, particularly objects that
    implement <code>valueOf</code>.

    <p>Note that, unlike the precedent of methods like
    <code>Object.equals</code> and <code>Object.compare</code> would suggest,
    this method is named <code>Object.getValueOf</code> instead of
    <code>valueOf</code>.  This is a delicate issue, but the basis of this
    decision is that the JavaScript runtime would be far more likely to
    accidentally call this method with no arguments, assuming that it would
    return the value of <code>Object</code> itself in various situations,
    whereas <code>Object.equals(Object, null)</code> protects against this case
    by noting that <code>Object</code> owns the <code>equals</code> property
    and therefore does not delegate to it.

    @function external:Object.getValueOf
    @param {Any} value a value or object wrapping a value
    @returns {Any} the primitive value of that object, if one exists, or passes
    the value through
*/
Object.getValueOf = function (value) {
    if (value && typeof value.valueOf === "function") {
        value = value.valueOf();
    }
    return value;
};

var hashMap = new WeakMap();
Object.hash = function (object) {
    if (object && typeof object.hash === "function") {
        return "" + object.hash();
    } else if (Object(object) === object) {
        if (!hashMap.has(object)) {
            hashMap.set(object, Math.random().toString(36).slice(2));
        }
        return hashMap.get(object);
    } else {
        return "" + object;
    }
};

/**
    A shorthand for <code>Object.prototype.hasOwnProperty.call(object,
    key)</code>.  Returns whether the object owns a property for the given key.
    It does not consult the prototype chain and works for any string (including
    "hasOwnProperty") except "__proto__".

    @function external:Object.owns
    @param {Object} object
    @param {String} key
    @returns {Boolean} whether the object owns a property wfor the given key.
*/
var owns = Object.prototype.hasOwnProperty;
Object.owns = function (object, key) {
    return owns.call(object, key);
};

/**
    A utility that is like Object.owns but is also useful for finding
    properties on the prototype chain, provided that they do not refer to
    methods on the Object prototype.  Works for all strings except "__proto__".

    <p>Alternately, you could use the "in" operator as long as the object
    descends from "null" instead of the Object.prototype, as with
    <code>Object.create(null)</code>.  However,
    <code>Object.create(null)</code> only works in fully compliant EcmaScript 5
    JavaScript engines and cannot be faithfully shimmed.

    <p>If the given object is an instance of a type that implements a method
    named "has", this function defers to the collection, so this method can be
    used to generically handle objects, arrays, or other collections.  In that
    case, the domain of the key depends on the instance.

    @param {Object} object
    @param {String} key
    @returns {Boolean} whether the object, or any of its prototypes except
    <code>Object.prototype</code>
    @function external:Object.has
*/
Object.has = function (object, key) {
    if (typeof object !== "object") {
        throw new Error("Object.has can't accept non-object: " + typeof object);
    }
    // forward to mapped collections that implement "has"
    if (object && typeof object.has === "function") {
        return object.has(key);
    // otherwise report whether the key is on the prototype chain,
    // as long as it is not one of the methods on object.prototype
    } else if (typeof key === "string") {
        return key in object && object[key] !== Object.prototype[key];
    } else {
        throw new Error("Key must be a string for Object.has on plain objects");
    }
};

/**
    Gets the value for a corresponding key from an object.

    <p>Uses Object.has to determine whether there is a corresponding value for
    the given key.  As such, <code>Object.get</code> is capable of retriving
    values from the prototype chain as long as they are not from the
    <code>Object.prototype</code>.

    <p>If there is no corresponding value, returns the given default, which may
    be <code>undefined</code>.

    <p>If the given object is an instance of a type that implements a method
    named "get", this function defers to the collection, so this method can be
    used to generically handle objects, arrays, or other collections.  In that
    case, the domain of the key depends on the implementation.  For a `Map`,
    for example, the key might be any object.

    @param {Object} object
    @param {String} key
    @param {Any} value a default to return, <code>undefined</code> if omitted
    @returns {Any} value for key, or default value
    @function external:Object.get
*/
Object.get = function (object, key, value) {
    if (typeof object !== "object") {
        throw new Error("Object.get can't accept non-object: " + typeof object);
    }
    // forward to mapped collections that implement "get"
    if (object && typeof object.get === "function") {
        return object.get(key, value);
    } else if (Object.has(object, key)) {
        return object[key];
    } else {
        return value;
    }
};

/**
    Sets the value for a given key on an object.

    <p>If the given object is an instance of a type that implements a method
    named "set", this function defers to the collection, so this method can be
    used to generically handle objects, arrays, or other collections.  As such,
    the key domain varies by the object type.

    @param {Object} object
    @param {String} key
    @param {Any} value
    @returns <code>undefined</code>
    @function external:Object.set
*/
Object.set = function (object, key, value) {
    if (object && typeof object.set === "function") {
        object.set(key, value);
    } else {
        object[key] = value;
    }
};

Object.addEach = function (target, source, overrides) {
    var overridesExistingProperty = arguments.length === 3 ? overrides : true;
    if (!source) {
    } else if (typeof source.forEach === "function" && !source.hasOwnProperty("forEach")) {
        // copy map-alikes
        if (source.isMap === true) {
            source.forEach(function (value, key) {
                target[key] = value;
            });
        // iterate key value pairs of other iterables
        } else {
            source.forEach(function (pair) {
                target[pair[0]] = pair[1];
            });
        }
    } else if (typeof source.length === "number") {
        // arguments, strings
        for (var index = 0; index < source.length; index++) {
            target[index] = source[index];
        }
    } else {
        // copy other objects as map-alikes
        for(var keys = Object.keys(source), i = 0, key;(key = keys[i]); i++) {
            if(overridesExistingProperty || !Object.owns(target,key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};


/*
var defineEach = function defineEach(target, prototype) {
    // console.log("Map defineEach: ",Object.keys(prototype));
    var proto = Map.prototype;
    for (var name in prototype) {
        if(!proto.hasOwnProperty(name)) {
            Object.defineProperty(proto, name, {
                value: prototype[name],
                writable: writable,
                configurable: configurable,
                enumerable: enumerable
            });
        }
    }
}
*/
Object.defineEach = function (target, source, overrides, configurable, enumerable, writable) {
    var overridesExistingProperty = arguments.length === 3 ? overrides : true;
    if (!source) {
    } else if (typeof source.forEach === "function" && !source.hasOwnProperty("forEach")) {
        // copy map-alikes
        if (source.isMap === true) {
            source.forEach(function (value, key) {
                Object.defineProperty(target, key, {
                    value: value,
                    writable: writable,
                    configurable: configurable,
                    enumerable: enumerable
                });
            });
        // iterate key value pairs of other iterables
        } else {
            source.forEach(function (pair) {
                Object.defineProperty(target, pair[0], {
                    value: pair[1],
                    writable: writable,
                    configurable: configurable,
                    enumerable: enumerable
                });

            });
        }
    } else if (typeof source.length === "number") {
        // arguments, strings
        for (var index = 0; index < source.length; index++) {
            Object.defineProperty(target, index, {
                value: source[index],
                writable: writable,
                configurable: configurable,
                enumerable: enumerable
            });

        }
    } else {
        // copy other objects as map-alikes
        for(var keys = Object.keys(source), i = 0, key;(key = keys[i]); i++) {
            if(overridesExistingProperty || !Object.owns(target,key)) {
                Object.defineProperty(target, key, {
                    value: source[key],
                    writable: writable,
                    configurable: configurable,
                    enumerable: enumerable
                });

            }
        }
    }
    return target;
};

/**
    Iterates over the owned properties of an object.

    @function external:Object.forEach
    @param {Object} object an object to iterate.
    @param {Function} callback a function to call for every key and value
    pair in the object.  Receives <code>value</code>, <code>key</code>,
    and <code>object</code> as arguments.
    @param {Object} thisp the <code>this</code> to pass through to the
    callback
*/
Object.forEach = function (object, callback, thisp) {

    var keys = Object.keys(object), i = 0, iKey;
    for(;(iKey = keys[i]);i++) {
        callback.call(thisp, object[iKey], iKey, object);
    }

};

/**
    Iterates over the owned properties of a map, constructing a new array of
    mapped values.

    @function external:Object.map
    @param {Object} object an object to iterate.
    @param {Function} callback a function to call for every key and value
    pair in the object.  Receives <code>value</code>, <code>key</code>,
    and <code>object</code> as arguments.
    @param {Object} thisp the <code>this</code> to pass through to the
    callback
    @returns {Array} the respective values returned by the callback for each
    item in the object.
*/
Object.map = function (object, callback, thisp) {
    var keys = Object.keys(object), i = 0, result = [], iKey;
    for(;(iKey = keys[i]);i++) {
        result.push(callback.call(thisp, object[iKey], iKey, object));
    }
    return result;
};

/**
    Returns the values for owned properties of an object.

    @function external:Object.map
    @param {Object} object
    @returns {Array} the respective value for each owned property of the
    object.
*/
Object.values = function (object) {
    return Object.map(object, Function.identity);
};

// TODO inline document concat
Object.concat = function () {
    var object = {};
    for (var i = 0; i < arguments.length; i++) {
        Object.addEach(object, arguments[i]);
    }
    return object;
};

Object.from = Object.concat;

/**
    Returns whether two values are identical.  Any value is identical to itself
    and only itself.  This is much more restictive than equivalence and subtly
    different than strict equality, <code>===</code> because of edge cases
    including negative zero and <code>NaN</code>.  Identity is useful for
    resolving collisions among keys in a mapping where the domain is any value.
    This method does not delgate to any method on an object and cannot be
    overridden.
    @see http://wiki.ecmascript.org/doku.php?id=harmony:egal
    @param {Any} this
    @param {Any} that
    @returns {Boolean} whether this and that are identical
    @function external:Object.is
*/
Object.is = function (x, y) {
    if (x === y) {
        // 0 === -0, but they are not identical
        return x !== 0 || 1 / x === 1 / y;
    }
    // NaN !== NaN, but they are identical.
    // NaNs are the only non-reflexive value, i.e., if x !== x,
    // then x is a NaN.
    // isNaN is broken: it converts its argument to number, so
    // isNaN("foo") => true
    return x !== x && y !== y;
};

/**
    Performs a polymorphic, type-sensitive deep equivalence comparison of any
    two values.

    <p>As a basic principle, any value is equivalent to itself (as in
    identity), any boxed version of itself (as a <code>new Number(10)</code> is
    to 10), and any deep clone of itself.

    <p>Equivalence has the following properties:

    <ul>
        <li><strong>polymorphic:</strong>
            If the given object is an instance of a type that implements a
            methods named "equals", this function defers to the method.  So,
            this function can safely compare any values regardless of type,
            including undefined, null, numbers, strings, any pair of objects
            where either implements "equals", or object literals that may even
            contain an "equals" key.
        <li><strong>type-sensitive:</strong>
            Incomparable types are not equal.  No object is equivalent to any
            array.  No string is equal to any other number.
        <li><strong>deep:</strong>
            Collections with equivalent content are equivalent, recursively.
        <li><strong>equivalence:</strong>
            Identical values and objects are equivalent, but so are collections
            that contain equivalent content.  Whether order is important varies
            by type.  For Arrays and lists, order is important.  For Objects,
            maps, and sets, order is not important.  Boxed objects are mutally
            equivalent with their unboxed values, by virtue of the standard
            <code>valueOf</code> method.
    </ul>
    @param this
    @param that
    @returns {Boolean} whether the values are deeply equivalent
    @function external:Object.equals
*/
Object.equals = function (a, b, equals, memo) {
    equals = equals || Object.equals;
    //console.log("Object.equals: a:",a, "b:",b, "equals:",equals);
    // unbox objects, but do not confuse object literals
    a = Object.getValueOf(a);
    b = Object.getValueOf(b);
    if (a === b)
        return true;
    if (Object.isObject(a)) {
        memo = memo || new WeakMap();
        if (memo.has(a)) {
            return true;
        }
        memo.set(a, true);
    }
    if (Object.isObject(a) && typeof a.equals === "function") {
        return a.equals(b, equals, memo);
    }
    // commutative
    if (Object.isObject(b) && typeof b.equals === "function") {
        return b.equals(a, equals, memo);
    }
    if (Object.isObject(a) && Object.isObject(b)) {
        if (Object.getPrototypeOf(a) === Object.prototype && Object.getPrototypeOf(b) === Object.prototype) {
            for (var name in a) {
                if (!equals(a[name], b[name], equals, memo)) {
                    return false;
                }
            }
            for (var name in b) {
                if (!(name in a) || !equals(b[name], a[name], equals, memo)) {
                    return false;
                }
            }
            return true;
        }
    }
    // NaN !== NaN, but they are equal.
    // NaNs are the only non-reflexive value, i.e., if x !== x,
    // then x is a NaN.
    // isNaN is broken: it converts its argument to number, so
    // isNaN("foo") => true
    // We have established that a !== b, but if a !== a && b !== b, they are
    // both NaN.
    if (a !== a && b !== b)
        return true;
    if (!a || !b)
        return a === b;
    return false;
};

// Because a return value of 0 from a `compare` function  may mean either
// "equals" or "is incomparable", `equals` cannot be defined in terms of
// `compare`.  However, `compare` *can* be defined in terms of `equals` and
// `lessThan`.  Again however, more often it would be desirable to implement
// all of the comparison functions in terms of compare rather than the other
// way around.

/**
    Determines the order in which any two objects should be sorted by returning
    a number that has an analogous relationship to zero as the left value to
    the right.  That is, if the left is "less than" the right, the returned
    value will be "less than" zero, where "less than" may be any other
    transitive relationship.

    <p>Arrays are compared by the first diverging values, or by length.

    <p>Any two values that are incomparable return zero.  As such,
    <code>equals</code> should not be implemented with <code>compare</code>
    since incomparability is indistinguishable from equality.

    <p>Sorts strings lexicographically.  This is not suitable for any
    particular international setting.  Different locales sort their phone books
    in very different ways, particularly regarding diacritics and ligatures.

    <p>If the given object is an instance of a type that implements a method
    named "compare", this function defers to the instance.  The method does not
    need to be an owned property to distinguish it from an object literal since
    object literals are incomparable.  Unlike <code>Object</code> however,
    <code>Array</code> implements <code>compare</code>.

    @param {Any} left
    @param {Any} right
    @returns {Number} a value having the same transitive relationship to zero
    as the left and right values.
    @function external:Object.compare
*/
Object.compare = function (a, b) {
    // unbox objects, but do not confuse object literals
    // mercifully handles the Date case
    a = Object.getValueOf(a);
    b = Object.getValueOf(b);
    if (a === b)
        return 0;
    var aType = typeof a;
    var bType = typeof b;
    if (aType === "number" && bType === "number")
        return a - b;
    if (aType === "string" && bType === "string")
        return a < b ? -Infinity : Infinity;
        // the possibility of equality elimiated above
    if (a && typeof a.compare === "function")
        return a.compare(b);
    // not commutative, the relationship is reversed
    if (b && typeof b.compare === "function")
        return -b.compare(a);
    return 0;
};

/**
    Creates a deep copy of any value.  Values, being immutable, are
    returned without alternation.  Forwards to <code>clone</code> on
    objects and arrays.

    @function external:Object.clone
    @param {Any} value a value to clone
    @param {Number} depth an optional traversal depth, defaults to infinity.
    A value of <code>0</code> means to make no clone and return the value
    directly.
    @param {Map} memo an optional memo of already visited objects to preserve
    reference cycles.  The cloned object will have the exact same shape as the
    original, but no identical objects.  Te map may be later used to associate
    all objects in the original object graph with their corresponding member of
    the cloned graph.
    @returns a copy of the value
*/
Object.clone = function (value, depth, memo) {
    value = Object.getValueOf(value);
    memo = memo || new WeakMap();
    if (depth === undefined) {
        depth = Infinity;
    } else if (depth === 0) {
        return value;
    }
    if (Object.isObject(value)) {
        if (!memo.has(value)) {
            if (value && typeof value.clone === "function") {
                memo.set(value, value.clone(depth, memo));
            } else {
                var prototype = Object.getPrototypeOf(value);
                if (prototype === null || prototype === Object.prototype) {
                    var clone = Object.create(prototype);
                    memo.set(value, clone);
                    for (var key in value) {
                        clone[key] = Object.clone(value[key], depth - 1, memo);
                    }
                } else {
                    throw new Error("Can't clone " + value);
                }
            }
        }
        return memo.get(value);
    }
    return value;
};

/**
    Removes all properties owned by this object making the object suitable for
    reuse.

    @function external:Object.clear
    @returns this
*/
Object.clear = function (object) {
    if (object && typeof object.clear === "function") {
        object.clear();
    } else {
        var keys = Object.keys(object),
            i = keys.length;
        while (i) {
            i--;
            delete object[keys[i]];
        }
    }
    return object;
};


/***/ }),
/* 58 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_array-includes.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15)
  , toLength  = __webpack_require__(/*! ./_to-length */ 8)
  , toIndex   = __webpack_require__(/*! ./_to-index */ 43);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 59 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_collection.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(/*! ./_global */ 2)
  , $export           = __webpack_require__(/*! ./_export */ 0)
  , redefine          = __webpack_require__(/*! ./_redefine */ 13)
  , redefineAll       = __webpack_require__(/*! ./_redefine-all */ 41)
  , meta              = __webpack_require__(/*! ./_meta */ 32)
  , forOf             = __webpack_require__(/*! ./_for-of */ 46)
  , anInstance        = __webpack_require__(/*! ./_an-instance */ 36)
  , isObject          = __webpack_require__(/*! ./_is-object */ 4)
  , fails             = __webpack_require__(/*! ./_fails */ 3)
  , $iterDetect       = __webpack_require__(/*! ./_iter-detect */ 64)
  , setToStringTag    = __webpack_require__(/*! ./_set-to-string-tag */ 48)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 79);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 60 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_fix-re-wks.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(/*! ./_hide */ 12)
  , redefine = __webpack_require__(/*! ./_redefine */ 13)
  , fails    = __webpack_require__(/*! ./_fails */ 3)
  , defined  = __webpack_require__(/*! ./_defined */ 19)
  , wks      = __webpack_require__(/*! ./_wks */ 5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 61 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_flags.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 62 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_invoke.js ***!
  \**************************************/
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 63 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_is-regexp.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , cof      = __webpack_require__(/*! ./_cof */ 18)
  , MATCH    = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 64 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-detect.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(/*! ./_wks */ 5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 65 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_object-forced-pam.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 37)|| !__webpack_require__(/*! ./_fails */ 3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(/*! ./_global */ 2)[K];
});

/***/ }),
/* 66 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gops.js ***!
  \*******************************************/
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 67 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_shared.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 68 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_typed.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2)
  , hide   = __webpack_require__(/*! ./_hide */ 12)
  , uid    = __webpack_require__(/*! ./_uid */ 44)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 69 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./src/controllers/menucontrol/Controller.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TextComponent = __webpack_require__(/*! ./components/TextComponent */ 158);

var _TextComponent2 = _interopRequireDefault(_TextComponent);

var _ButtonComponent = __webpack_require__(/*! ./components/ButtonComponent */ 155);

var _ButtonComponent2 = _interopRequireDefault(_ButtonComponent);

var _AnimatedBarComponent = __webpack_require__(/*! ./components/AnimatedBarComponent */ 154);

var _AnimatedBarComponent2 = _interopRequireDefault(_AnimatedBarComponent);

var _IconComponent = __webpack_require__(/*! ./components/IconComponent */ 156);

var _IconComponent2 = _interopRequireDefault(_IconComponent);

var _MenuSection = __webpack_require__(/*! ./components/MenuSection */ 157);

var _MenuSection2 = _interopRequireDefault(_MenuSection);

var _ResetDecorator = __webpack_require__(/*! ./helpers/ResetDecorator */ 163);

var _ResetDecorator2 = _interopRequireDefault(_ResetDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The base class for controllers. Takes care of creating components, giving them to menuView,
 * and holding the inner state of the controller
 */
var Controller = function () {
  function Controller(game, style, menuView) {
    _classCallCheck(this, Controller);

    this.game = game;
    this.style = style;
    this.menuView = menuView;

    this.state = new Map();
  }

  /**
   * Creates the components and gives them to menuView
   */


  _createClass(Controller, [{
    key: 'redraw',
    value: function redraw() {
      this.menuView.draw(this.buildSections());
    }

    /**
     * Initializes the class for contentcreators and calls the creation function of
     * non-abstract classes
     */

  }, {
    key: 'buildSections',
    value: function buildSections() {
      this.initialize();

      this.createSections();

      return this.sections;
    }

    /**
     * Sets up sections
     */

  }, {
    key: 'initialize',
    value: function initialize() {
      this.sections = [];
      this.section();
    }

    /**
     * When using controller alone, draws the sections created
     */

  }, {
    key: 'finish',
    value: function finish() {
      this.menuView.draw(this.sections);
    }

    /**
     * Adds new section to section list
     */

  }, {
    key: 'section',
    value: function section(name) {
      this.currentSection = new _MenuSection2.default(name);
      this.sections.push(this.currentSection);
    }

    /**
     * Creates new icon component
     * @param {*} asset
     */

  }, {
    key: 'icon',
    value: function icon(asset) {
      this.currentSection.components.push(new _IconComponent2.default({
        asset: asset,
        assetWidth: this.game.cache.getImage(asset).width,
        assetHeight: this.game.cache.getImage(asset).height
      }));
    }

    /**
     * Creates new text component
     */

  }, {
    key: 'text',
    value: function text(_text, size) {
      var fontSize = this.style.mediumFont;
      if (size != null) {
        fontSize = this.style[size + 'Font'];
      }

      this.currentSection.components.push(new _TextComponent2.default(_text, fontSize));
    }

    /**
     * Creates new animated bar
     *
     * @param {*} width
     * @param {*} height
     * @param {*} horizontal does the bar's size grow horizontal or vertical
     * @param {*} percent the amount of the bar that is filled
     */

  }, {
    key: 'animatedBar',
    value: function animatedBar(width, height, vertical, percent) {
      this.currentSection.components.push(new _AnimatedBarComponent2.default({
        width: width,
        height: height,
        vertical: vertical,
        percent: percent
      }));
    }

    /**
     * Creates new button
     *
     * @param {*} name the text in the button
     * @param {*} functionToCall
     * @param {*} context
     * @param {*} asset
     */

  }, {
    key: 'button',
    value: function button(name, functionToCall, context, asset) {
      if (asset == null) {
        asset = 'emptyButton';
      }

      this.currentSection.components.push(new _ButtonComponent2.default({
        name: name,
        functionToCall: functionToCall,
        context: context,
        height: this.style.buttonHeight,
        width: this.style.buttonWidth,
        fontSize: this.style.mediumFont,
        asset: asset
      }));
    }

    /**
     * Adds pre-created component to the section
     *
     * @param {*} component
     */

  }, {
    key: 'add',
    value: function add(component) {
      this.currentSection.components.push(component);
    }

    /**
     * Adds a pre-created section to the sections. The section is new the current one
     * @param {*} section
     */

  }, {
    key: 'addSection',
    value: function addSection(section) {
      this.sections.push(section);
      this.currentSection = section;
    }

    /**
     * Adds several sections to the current section list. Last of them will be the current one
     *
     * @param {*} sections
     */

  }, {
    key: 'addSections',
    value: function addSections(sections) {
      this.sections = this.sections.concat(sections);
      this.currentSection = this.sections[this.sections.length - 1];
    }

    /**
     * Automatically creates a button with reset decorator on with given parameters
     *
     * @param {*} name text in button
     * @param {*} asset
     * @param {*} functionToCall the function to call before resetting the menu
     * @param {*} context context for the function
     * @param {*} callValues values the function is called with
     */

  }, {
    key: 'resetDecoratedButton',
    value: function resetDecoratedButton(name, asset, functionToCall, context) {
      for (var _len = arguments.length, callValues = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        callValues[_key - 4] = arguments[_key];
      }

      var wrapped = this.wrapFunctionValueArray(functionToCall, context, callValues);
      var rd = new _ResetDecorator2.default({
        action: {
          function: wrapped,
          context: this
        },
        controller: this
      });
      this.button(name, rd.act, rd, asset);
    }

    /**
     * Creates a button that calls function with call values
     *
     * @param {*} name
     * @param {*} asset
     * @param {*} functionToCall
     * @param {*} context
     * @param {*} callValues the values the function is called with
     */

  }, {
    key: 'wrappedButton',
    value: function wrappedButton(name, asset, functionToCall, context) {
      for (var _len2 = arguments.length, callValues = Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
        callValues[_key2 - 4] = arguments[_key2];
      }

      this.button(name, this.wrapFunctionValueArray(functionToCall, context, callValues), context, asset);
    }

    /**
     * Creates a button that gives given value to the controller state
     *
     * @param {*} name
     * @param {*} asset
     * @param {*} stateName
     * @param {*} value
     */

  }, {
    key: 'addStateButton',
    value: function addStateButton(name, asset, stateName, value) {
      this.wrappedButton(name, asset, this.addState, this, stateName, value);
    }

    /**
     * Wraps the function call in a function
     *
     * @param {*} func
     * @param {*} context
     * @param {*} values
     */

  }, {
    key: 'wrapFunction',
    value: function wrapFunction(func, context) {
      for (var _len3 = arguments.length, values = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        values[_key3 - 2] = arguments[_key3];
      }

      return this.wrapFunctionValueArray(func, context, values);
    }

    /**
     * Wraps the function call in a function. Takes call values in array
     *
     * @param {*} func
     * @param {*} context
     * @param {*} values
     */

  }, {
    key: 'wrapFunctionValueArray',
    value: function wrapFunctionValueArray(func, context, values) {
      return function (func, context, values) {
        return function () {
          return func.apply(context, values);
        };
      }(func, context, values);
    }

    /**
     * Adds given value to the state, or updates the value to the given if it already exist
     *
     * @param {*} name
     * @param {*} value
     */

  }, {
    key: 'addState',
    value: function addState(name, value) {
      this.state.set(name, value);
      this.redraw();
    }

    /**
     * Gives the value of a state variable
     *
     * @param {*} name
     */

  }, {
    key: 'stateValue',
    value: function stateValue(name) {
      return this.state.get(name);
    }

    /**
     * Does the state have given value
     *
     * @param {*} name
     */

  }, {
    key: 'hasStateValue',
    value: function hasStateValue(name) {
      return this.state.get(name) != null;
    }

    /**
     * Resets the controller by emptying its state and redrawing it
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.state.clear();
      this.redraw();
    }
  }]);

  return Controller;
}();

exports.default = Controller;

/***/ }),
/* 70 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./src/controllers/menucontrol/MenuBuilder.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(/*! ../../config */ 35);

var _config2 = _interopRequireDefault(_config);

var _MenuView = __webpack_require__(/*! ../../view/menu/MenuView */ 103);

var _MenuView2 = _interopRequireDefault(_MenuView);

var _StackingLayout = __webpack_require__(/*! ../../view/menu/layouts/StackingLayout */ 106);

var _StackingLayout2 = _interopRequireDefault(_StackingLayout);

var _Style = __webpack_require__(/*! ../../view/menu/Style */ 104);

var _Style2 = _interopRequireDefault(_Style);

var _Controller = __webpack_require__(/*! ./Controller */ 69);

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generic menu with title, description and buttons
 */
var MenuBuilder = function () {
  function MenuBuilder(game, backgroundAsset, startHeight) {
    _classCallCheck(this, MenuBuilder);

    game.stage.backgroundColor = 0x6B8E23;

    var menu = new _MenuView2.default({
      game: game,
      layout: new _StackingLayout2.default({
        menuRect: {
          x: game.camera.width / 4,
          y: 0,
          width: game.camera.width / 2,
          height: game.camera.height
        },
        linePadding: 16,
        sectionPadding: startHeight,
        vertical: true
      }),
      background: backgroundAsset,
      backgroundInTheMiddle: true
    });

    this.c = new _Controller2.default(game, new _Style2.default({
      smallFont: 16,
      mediumFont: 32,
      largeFont: 64,
      buttonHeight: _config2.default.menuButtonHeight,
      buttonWidth: _config2.default.menuButtonWidth
    }), menu);

    this.c.initialize();
  }

  /**
   * Menu title
   * @param {string} text - Title text
   */


  _createClass(MenuBuilder, [{
    key: 'createTitle',
    value: function createTitle(text) {
      this.c.text(text, 'large');
    }

    /**
     * Creates final score
     * @param {string} text - score text
     */

  }, {
    key: 'createScore',
    value: function createScore(text) {
      this.c.text(text, 'medium');
    }

    /**
     * Menu description
     * @param {string} text - Description that is displayed in the menu
     */

  }, {
    key: 'createDescription',
    value: function createDescription(text) {
      this.c.text(text, 'small');
    }

    /**
     * Adds a new button to the menu
     * @param {string} text - Button text
     * @param {function} call - Function that is called when pressed
     */

  }, {
    key: 'createButton',
    value: function createButton(text, call) {
      this.c.button(text, call, this);
    }
  }, {
    key: 'finishMenu',
    value: function finishMenu() {
      this.c.finish();
    }
  }]);

  return MenuBuilder;
}();

exports.default = MenuBuilder;

/***/ }),
/* 71 */
/* no static exports found */
/* all exports used */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Utility functions
 */
exports.default = {
  centerGameObjects: function centerGameObjects(objects) {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5);
    });
  },
  randomNoBounds: function randomNoBounds() {
    return Math.random();
  },
  randomWithBounds: function randomWithBounds(lower, upper) {
    return Math.floor(Math.random() * upper + lower);
  }
};

/***/ }),
/* 72 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/collections/listen/change-descriptor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

/*
    Copyright (c) 2016, Montage Studio Inc. All Rights Reserved.
    3-Clause BSD License
    https://github.com/montagejs/montage/blob/master/LICENSE.md
*/

var Map = __webpack_require__(/*! ../_map */ 56);

var ObjectChangeDescriptor = module.exports.ObjectChangeDescriptor = function ObjectChangeDescriptor(name) {
    this.name = name;
    this.isActive = false;
    this._willChangeListeners = null;
    this._changeListeners = null;
	return this;
}

Object.defineProperties(ObjectChangeDescriptor.prototype,{
    name: {
		value:null,
		writable: true
	},
    isActive: {
		value:false,
		writable: true
	},
	_willChangeListeners: {
		value:null,
		writable: true
	},
	willChangeListeners: {
		get: function() {
			return this._willChangeListeners || (this._willChangeListeners = new this.willChangeListenersRecordConstructor(this.name));
		}
	},
	_changeListeners: {
		value:null,
		writable: true
	},
    changeListeners: {
		get: function() {
			return this._changeListeners || (this._changeListeners = new this.changeListenersRecordConstructor(this.name));
		}
	},
    changeListenersRecordConstructor: {
        value:ChangeListenersRecord,
        writable: true
    },
    willChangeListenersRecordConstructor: {
        value:ChangeListenersRecord,
        writable: true
    }

});

var ListenerGhost = module.exports.ListenerGhost = Object.create(null);
var ChangeListenerSpecificHandlerMethodName = new Map();

 module.exports.ChangeListenersRecord = ChangeListenersRecord;
function ChangeListenersRecord(name) {
    var specificHandlerMethodName = ChangeListenerSpecificHandlerMethodName.get(name);
    if(!specificHandlerMethodName) {
        specificHandlerMethodName = "handle";
        specificHandlerMethodName += name;
        specificHandlerMethodName += "Change";
        ChangeListenerSpecificHandlerMethodName.set(name,specificHandlerMethodName);
    }
    this._current = null;
    this._current = null;
    this.specificHandlerMethodName = specificHandlerMethodName;
    return this;
}

Object.defineProperties(ChangeListenersRecord.prototype,{
    _current: {
		value: null,
		writable: true
	},
	current: {
		get: function() {
            // if(this._current) {
            //     console.log(this.constructor.name," with ",this._current.length," listeners: ", this._current);
            // }
            return this._current;
            //return this._current || (this._current = []);
		},
        set: function(value) {
            this._current = value;
        }
	},
    ListenerGhost: {
        value:ListenerGhost,
        writable: true
    },
    ghostCount: {
        value:0,
        writable: true
    },
    maxListenerGhostRatio: {
        value:0.3,
        writable: true
    },
    listenerGhostFilter: {
        value: function listenerGhostFilter(value) {
          return value !== this.ListenerGhost;
      }
    },
    removeCurrentGostListenersIfNeeded: {
        value: function() {
            if(this._current && this.ghostCount/this._current.length>this.maxListenerGhostRatio) {
                this.ghostCount = 0;
                this._current = this._current.filter(this.listenerGhostFilter,this);
            }
            return this._current;
        }
    },
    dispatchBeforeChange: {
        value: false,
        writable: true
    },
    genericHandlerMethodName: {
		value: "handlePropertyChange",
        writable: true
	}
});

module.exports.WillChangeListenersRecord = WillChangeListenersRecord;
var WillChangeListenerSpecificHandlerMethodName = new Map();
function WillChangeListenersRecord(name) {
    var specificHandlerMethodName = WillChangeListenerSpecificHandlerMethodName.get(name);
    if(!specificHandlerMethodName) {
        specificHandlerMethodName = "handle";
        specificHandlerMethodName += name;
        specificHandlerMethodName += "WillChange";
        WillChangeListenerSpecificHandlerMethodName.set(name,specificHandlerMethodName);
    }
    this.specificHandlerMethodName = specificHandlerMethodName;
	return this;
}
WillChangeListenersRecord.prototype = new ChangeListenersRecord();
WillChangeListenersRecord.prototype.constructor = WillChangeListenersRecord;
WillChangeListenersRecord.prototype.genericHandlerMethodName = "handlePropertyWillChange";


/***/ }),
/* 73 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_array-fill.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9)
  , toIndex  = __webpack_require__(/*! ./_to-index */ 43)
  , toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 74 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_create-property.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7)
  , createDesc      = __webpack_require__(/*! ./_property-desc */ 33);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 75 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_dom-create.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , document = __webpack_require__(/*! ./_global */ 2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 76 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_enum-bug-keys.js ***!
  \*********************************************/
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 77 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_fails-is-regexp.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 78 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_html.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_global */ 2).document && document.documentElement;

/***/ }),
/* 79 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_inherit-if-required.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 87).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 80 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_is-array-iter.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(/*! ./_iterators */ 47)
  , ITERATOR   = __webpack_require__(/*! ./_wks */ 5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 81 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_is-array.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 18);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 82 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-create.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(/*! ./_object-create */ 38)
  , descriptor     = __webpack_require__(/*! ./_property-desc */ 33)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 12)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 83 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-define.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(/*! ./_library */ 37)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , redefine       = __webpack_require__(/*! ./_redefine */ 13)
  , hide           = __webpack_require__(/*! ./_hide */ 12)
  , has            = __webpack_require__(/*! ./_has */ 10)
  , Iterators      = __webpack_require__(/*! ./_iterators */ 47)
  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 82)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17)
  , ITERATOR       = __webpack_require__(/*! ./_wks */ 5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 84 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-expm1.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 85 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_math-sign.js ***!
  \*****************************************/
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 86 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_microtask.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , macrotask = __webpack_require__(/*! ./_task */ 94).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(/*! ./_cof */ 18)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 87 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_set-proto.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(/*! ./_ctx */ 25)(Function.call, __webpack_require__(/*! ./_object-gopd */ 16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 88 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_shared-key.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 67)('keys')
  , uid    = __webpack_require__(/*! ./_uid */ 44);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 89 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_species-constructor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(/*! ./_an-object */ 1)
  , aFunction = __webpack_require__(/*! ./_a-function */ 11)
  , SPECIES   = __webpack_require__(/*! ./_wks */ 5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 90 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_string-at.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 34)
  , defined   = __webpack_require__(/*! ./_defined */ 19);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 91 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_string-context.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 63)
  , defined  = __webpack_require__(/*! ./_defined */ 19);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 92 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_string-repeat.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 34)
  , defined   = __webpack_require__(/*! ./_defined */ 19);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 93 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_string-ws.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 94 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_task.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(/*! ./_ctx */ 25)
  , invoke             = __webpack_require__(/*! ./_invoke */ 62)
  , html               = __webpack_require__(/*! ./_html */ 78)
  , cel                = __webpack_require__(/*! ./_dom-create */ 75)
  , global             = __webpack_require__(/*! ./_global */ 2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(/*! ./_cof */ 18)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 95 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_typed-buffer.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(/*! ./_global */ 2)
  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 6)
  , LIBRARY        = __webpack_require__(/*! ./_library */ 37)
  , $typed         = __webpack_require__(/*! ./_typed */ 68)
  , hide           = __webpack_require__(/*! ./_hide */ 12)
  , redefineAll    = __webpack_require__(/*! ./_redefine-all */ 41)
  , fails          = __webpack_require__(/*! ./_fails */ 3)
  , anInstance     = __webpack_require__(/*! ./_an-instance */ 36)
  , toInteger      = __webpack_require__(/*! ./_to-integer */ 34)
  , toLength       = __webpack_require__(/*! ./_to-length */ 8)
  , gOPN           = __webpack_require__(/*! ./_object-gopn */ 39).f
  , dP             = __webpack_require__(/*! ./_object-dp */ 7).f
  , arrayFill      = __webpack_require__(/*! ./_array-fill */ 73)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 96 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_wks-define.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(/*! ./_global */ 2)
  , core           = __webpack_require__(/*! ./_core */ 24)
  , LIBRARY        = __webpack_require__(/*! ./_library */ 37)
  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 140)
  , defineProperty = __webpack_require__(/*! ./_object-dp */ 7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 97 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/core.get-iterator-method.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(/*! ./_classof */ 50)
  , ITERATOR  = __webpack_require__(/*! ./_wks */ 5)('iterator')
  , Iterators = __webpack_require__(/*! ./_iterators */ 47);
module.exports = __webpack_require__(/*! ./_core */ 24).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 98 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.iterator.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 45)
  , step             = __webpack_require__(/*! ./_iter-step */ 128)
  , Iterators        = __webpack_require__(/*! ./_iterators */ 47)
  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 83)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./src/models/StaticTypes.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * @typedef {object} StructureType
 * @property {string} name
 * @property {string} asset
 * @property {set.<string>} harvestingWeeks
 * @property {boolean} continuousProduction
 * @property {number} turnipYield
 */

/**
 * Harvesting week format 'month.week'.
 */
var structureTypes = {
  wheat_farm: {
    name: 'wheat farm',
    asset: 'wheat_farm',
    health: 12,
    harvestingWeeks: new Set(['8.1']),
    continuousProduction: false,
    turnipYield: 4,
    cost: 10000,
    pollution: 4,
    radiusForTileOwnership: 2
  },
  dairy_farm: {
    name: 'dairy farm',
    asset: 'dairy_farm',
    health: 15,
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 6,
    cost: 15000,
    pollution: 5,
    radiusForTileOwnership: 2
  },
  berry_farm: {
    name: 'berry farm',
    asset: 'berry_farm',
    health: 8,
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 3,
    cost: 10000,
    pollution: 3,
    radiusForTileOwnership: 2
  },
  mill: {
    name: 'mill',
    asset: 'mill',
    health: 20,
    refinery: true,
    buysFrom: ['wheat farm'],
    cost: 20000,
    multiplier: 2,
    pollution: 2,
    radiusForTileOwnership: 1,
    reach: 5
  }

  /**
   * @typedef {object} TileType
   * @property {string} name
   * @property {string} asset
   * @property {StructureType[]} allowedStructures
   */

};var tileTypes = {
  forest: {
    name: 'forest',
    asset: 'forest',
    flowers: 10,
    allowedStructures: []
  },
  grass: {
    name: 'grass',
    asset: 'grass',
    flowers: 10,
    allowedStructures: []
  },
  water: {
    name: 'water',
    asset: 'water',
    flowers: 10,
    allowedStructures: []
  },
  field: {
    name: 'field',
    asset: 'field',
    flowers: 10,
    allowedStructures: []
  },
  industrial: {
    name: 'industrial',
    asset: 'industrial',
    flowers: 10,
    allowedStructures: []
  }
};

var addAllowedStructures = function addAllowedStructures(structureTypes, tileTypes) {
  tileTypes.grass.allowedStructures = [structureTypes.wheat_farm, structureTypes.dairy_farm, structureTypes.berry_farm, structureTypes.mill];
  tileTypes.water.allowedStructures = [];
  tileTypes.field.allowedStructures = [structureTypes.mill];
  tileTypes.industrial.allowedStructures = [structureTypes.mill];
  return { structureTypes: structureTypes, tileTypes: tileTypes };
};

var StaticTypes = addAllowedStructures(structureTypes, tileTypes);

exports.default = StaticTypes;

/***/ }),
/* 103 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./src/view/menu/MenuView.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LabeledButton = __webpack_require__(/*! ./menuitems/LabeledButton */ 202);

var _LabeledButton2 = _interopRequireDefault(_LabeledButton);

var _Text = __webpack_require__(/*! ./menuitems/Text */ 203);

var _Text2 = _interopRequireDefault(_Text);

var _AnimatedBar = __webpack_require__(/*! ./menuitems/AnimatedBar */ 200);

var _AnimatedBar2 = _interopRequireDefault(_AnimatedBar);

var _Icon = __webpack_require__(/*! ./menuitems/Icon */ 201);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Component that draws menu with given component list and with wanted layout
 */
var MenuView = function () {
  function MenuView(_ref) {
    var game = _ref.game,
        layout = _ref.layout,
        background = _ref.background,
        backgroundInTheMiddle = _ref.backgroundInTheMiddle;

    _classCallCheck(this, MenuView);

    this.game = game;
    this.layout = layout;
    this.backgroundInTheMiddle = backgroundInTheMiddle;

    this.menuViewGroup = game.add.group();
    this.menuViewGroup.fixedToCamera = true;
    this.game.world.bringToTop(this.menuViewGroup);

    this.activeMenuitems = new Map();

    this.createBackground(background);
  }

  /**
   * Creates background image of menu
   */


  _createClass(MenuView, [{
    key: 'createBackground',
    value: function createBackground(backgroundAsset) {
      var menuRect = this.layout.menuRect;

      if (backgroundAsset != null) {
        var x = menuRect.x;
        var y = menuRect.y;
        if (this.backgroundInTheMiddle) {
          var aHeight = this.game.cache.getImage(backgroundAsset).height;
          var aWidth = this.game.cache.getImage(backgroundAsset).width;
          var mHeight = menuRect.height;
          var mWidth = menuRect.width;

          y = y + (mHeight - aHeight) / 2;
          x = x + (mWidth - aWidth) / 2;
        }
        this.background = this.game.add.sprite(x, y, backgroundAsset);
        this.background.fixedToCamera = true;
        this.game.world.moveDown(this.background);
      } else {
        this.background = this.game.make.graphics();
        this.background.beginFill(0x000000, 0.25);
        this.background.drawRoundedRect(menuRect.x, menuRect.y, menuRect.width, menuRect.height, 1);
        this.background.endFill();
        this.background.fixedToCamera = true;
        this.game.add.existing(this.background);
        this.game.world.bringToTop(this.background);
      }
    }

    /**
     * Redraws the menu with given components
     * @param {*} sections
     */

  }, {
    key: 'draw',
    value: function draw(sections) {
      this.active = new Set();
      this.activeSections = [];

      this.activeButtons = [];
      this.activeTexts = [];

      this.layout.init(sections);
      this.updateMenu(sections);
      this.game.world.bringToTop(this.background);
      this.game.world.bringToTop(this.menuViewGroup);
    }

    /**
     * Iterates through given sections
     * @param {*} sections
     */

  }, {
    key: 'updateMenu',
    value: function updateMenu(sections) {
      var newSections = new Map();

      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];

        var menuitems = this.activeMenuitems.has(section.name) ? this.updateSection(this.activeMenuitems.get(section.name), section.components) : this.createSection(section.components);

        this.activeSections.push(menuitems);
        newSections.set(section.name, menuitems);

        if (i !== sections.length - 1) {
          this.layout.afterSection();
        }
      }

      this.removeExtraSections(this.activeMenuitems, newSections);
      this.activeMenuitems = newSections;
    }

    /**
     * Iterates through given components in a section
     * @param {*} components
     */

  }, {
    key: 'createSection',
    value: function createSection(components) {
      var menuitems = [];
      for (var i = 0; i < components.length; i++) {
        menuitems.push(this.createComponent(components[i]));

        if (i !== components.length - 1) {
          this.layout.afterLine();
        }
      }

      return menuitems;
    }
  }, {
    key: 'createComponent',
    value: function createComponent(component) {
      var coords = this.layout.nextComponentLocation(component);

      return this.componentFunction(component.type, 'create').call(this, coords, component);
    }
  }, {
    key: 'componentFunction',
    value: function componentFunction(type, prefix) {
      return this[prefix + type.charAt(0).toUpperCase() + type.slice(1)];
    }

    /**
     * Creates a button with given button action
     * @param {ButtonAction} buttonAction
     */

  }, {
    key: 'createButton',
    value: function createButton(coords, buttonComponent) {
      var button = new _LabeledButton2.default({
        game: this.game,
        viewGroup: this.menuViewGroup,
        label: buttonComponent.name,
        fontSize: buttonComponent.fontSize,
        asset: buttonComponent.asset,
        x: coords.x,
        y: coords.y,
        callback: buttonComponent.function,
        context: buttonComponent.context,
        buttonWidth: buttonComponent.width,
        buttonHeight: buttonComponent.height
      });
      this.activeButtons.push(button);
      return button;
    }

    /**
     * Creates a visible text with given text and font size
     * @param {*} text
     * @param {*} fontSize
     * @return { ??? }
     */

  }, {
    key: 'createText',
    value: function createText(coords, textComponent) {
      var anchor;

      if (this.layout.vertical) {
        anchor = {
          x: 0.5,
          y: 0
        };
      } else {
        anchor = {
          x: 0,
          y: 0.5
        };
      }

      var tex = new _Text2.default({
        game: this.game,
        menuSize: this.layout.menuRect.width,
        viewGroup: this.menuViewGroup,
        text: textComponent.text,
        fontSize: textComponent.fontSize,
        x: coords.x,
        y: coords.y,
        anchor: anchor
      });

      this.activeTexts.push(tex);
      return tex;
    }

    /**
     * Creates a new animated bar to the menu
     * @param {*} animatedBarComponent
     */

  }, {
    key: 'createBar',
    value: function createBar(coords, animatedBarComponent) {
      return new _AnimatedBar2.default({
        game: this.game,
        group: this.menuViewGroup,
        vertical: animatedBarComponent.vertical,
        width: animatedBarComponent.width,
        height: animatedBarComponent.height,
        x: coords.x,
        y: coords.y,
        percent: animatedBarComponent.percent
      });
    }

    /**
     * Creates new icon to the menu
     * @param {*} iconComponent
     */

  }, {
    key: 'createIcon',
    value: function createIcon(coords, iconComponent) {
      return new _Icon2.default({
        game: this.game,
        group: this.menuViewGroup,
        x: coords.x,
        y: coords.y,
        asset: iconComponent.asset
      });
    }
  }, {
    key: 'updateSection',
    value: function updateSection(section, components) {
      var menuitems = [];

      var i = 0;
      for (var j = 0; j < components.length; j++) {
        var component = components[j];
        var menuitem = section[i];
        if (i < section.length && menuitem.type === component.type) {
          if (component.type === 'button' && (component.asset !== menuitem.asset || component.function !== menuitem.callback)) {
            menuitems.push(this.createComponent(component));
            menuitem.destroy();
          } else {
            menuitems.push(menuitem);
            this.updateComponent(menuitem, component);
          }
          i++;
        } else {
          menuitems.push(this.createComponent(component));
        }

        if (j !== components.length - 1) {
          this.layout.afterLine();
        }
      }

      this.removeExtraMenuitems(section, i);

      return menuitems;
    }
  }, {
    key: 'removeExtraMenuitems',
    value: function removeExtraMenuitems(section, startIndex) {
      for (var i = section.length - 1; i >= startIndex; i--) {
        section[i].destroy();
        section.pop();
      }
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(menuitem, component) {
      var coords = this.layout.nextComponentLocation(component);

      this.componentFunction(component.type, 'update').call(this, coords, component, menuitem);
    }
  }, {
    key: 'updateButton',
    value: function updateButton(coords, component, button) {
      button.update(component.name, component.fontSize, coords.x, coords.y, component.function, component.context, component.width, component.height);
      this.activeButtons.push(button);
    }
  }, {
    key: 'updateText',
    value: function updateText(coords, component, text) {
      text.update(component.text, component.fontSize, coords.x, coords.y);
      this.activeTexts.push(text);
    }
  }, {
    key: 'updateIcon',
    value: function updateIcon(coords, component, icon) {
      icon.update(coords.x, coords.y);
    }
  }, {
    key: 'updateBar',
    value: function updateBar(coords, component, bar) {
      bar.update(coords.x, coords.y, component.percent);
    }
  }, {
    key: 'removeExtraSections',
    value: function removeExtraSections(oldSections, newSections) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = oldSections.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!newSections.has(key)) this.destroySection(oldSections.get(key));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'destroySection',
    value: function destroySection(menuitems) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = menuitems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var menuitem = _step2.value;

          menuitem.destroy();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return MenuView;
}();

exports.default = MenuView;

/***/ }),
/* 104 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/view/menu/Style.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = function Style(_ref) {
  var smallFont = _ref.smallFont,
      mediumFont = _ref.mediumFont,
      largeFont = _ref.largeFont,
      buttonWidth = _ref.buttonWidth,
      buttonHeight = _ref.buttonHeight;

  _classCallCheck(this, Style);

  this.smallFont = smallFont;
  this.mediumFont = mediumFont;
  this.largeFont = largeFont;
  this.buttonHeight = buttonHeight;
  this.buttonWidth = buttonWidth;
};

exports.default = Style;

/***/ }),
/* 105 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/view/menu/layouts/Layout.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for layouts. Layouts handle how the items are placed in menu
 */
var Layout = function () {
  function Layout(menuRect, vertical) {
    _classCallCheck(this, Layout);

    this.menuRect = menuRect;

    if (vertical) {
      this.perpendicularSize = menuRect.width;
      this.parallelSize = menuRect.height;
      this.parallelStart = menuRect.y;
    } else {
      this.perpendicularSize = menuRect.height;
      this.parallelSize = menuRect.width;
      this.parallelStart = menuRect.x;
    }

    this.vertical = vertical;
  }

  /**
   * Gives the location of the next element
   * @param {*} component
   */


  _createClass(Layout, [{
    key: 'nextComponentLocation',
    value: function nextComponentLocation(component) {
      var coordinates = this.coordinates(component);
      this.addComponentPadding(component);
      return coordinates;
    }

    /**
     * Calculates the locatino of next component
     * @param {*} component
     */

  }, {
    key: 'coordinates',
    value: function coordinates(component) {
      var coords;
      if (this.vertical) {
        coords = {
          x: this.menuRect.x + (this.perpendicularSize - component.width) / 2,
          y: this.menuRect.y + this.currentDrawLocation()
        };
      } else {
        coords = {
          x: this.menuRect.x + this.currentDrawLocation(),
          y: this.menuRect.y + (this.perpendicularSize - component.height) / 2
        };
      }

      if (component.type === 'text') {
        if (this.vertical) {
          coords.x = this.menuRect.x + this.perpendicularSize / 2;
        } else {
          coords.y = this.menuRect.y + this.perpendicularSize / 2;
        }
      }

      return coords;
    }

    /**
     * Gives the component's size that is parallel to the menu
     * @param {*} component
     */

  }, {
    key: 'componentParallelSize',
    value: function componentParallelSize(component) {
      if (this.vertical) {
        if (component.type === 'text') {
          return component.height * Math.ceil(component.fontSize * component.text.length / this.menuRect.width * 9 / 16);
        }
        return component.height;
      } else {
        return component.width;
      }
    }
  }]);

  return Layout;
}();

exports.default = Layout;

/***/ }),
/* 106 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./src/view/menu/layouts/StackingLayout.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout2 = __webpack_require__(/*! ./Layout */ 105);

var _Layout3 = _interopRequireDefault(_Layout2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Layout that stacks the elements from the start of the menu towards
 */
var StackingLayout = function (_Layout) {
  _inherits(StackingLayout, _Layout);

  function StackingLayout(_ref) {
    var menuRect = _ref.menuRect,
        linePadding = _ref.linePadding,
        sectionPadding = _ref.sectionPadding,
        vertical = _ref.vertical;

    _classCallCheck(this, StackingLayout);

    var _this = _possibleConstructorReturn(this, (StackingLayout.__proto__ || Object.getPrototypeOf(StackingLayout)).call(this, menuRect, vertical));

    _this.linePadding = linePadding;
    _this.sectionPadding = sectionPadding;
    return _this;
  }

  _createClass(StackingLayout, [{
    key: 'addComponentPadding',
    value: function addComponentPadding(component) {
      this.drawLocation += this.componentParallelSize(component);
    }
  }, {
    key: 'init',
    value: function init() {
      this.drawLocation = this.parallelStart + this.sectionPadding;
    }
  }, {
    key: 'afterLine',
    value: function afterLine() {
      this.drawLocation += this.linePadding;
    }
  }, {
    key: 'afterSection',
    value: function afterSection() {
      this.drawLocation += this.sectionPadding;
    }
  }, {
    key: 'currentDrawLocation',
    value: function currentDrawLocation() {
      return this.drawLocation;
    }
  }]);

  return StackingLayout;
}(_Layout3.default);

exports.default = StackingLayout;

/***/ }),
/* 107 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./~/collections/_list.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = List;

var Shim = __webpack_require__(/*! ./shim */ 31);
var GenericCollection = __webpack_require__(/*! ./generic-collection */ 30);
var GenericOrder = __webpack_require__(/*! ./generic-order */ 109);

function List(values, equals, getDefault) {
    return List._init(List, this, values, equals, getDefault);
}

List._init = function (constructor, object, values, equals, getDefault) {
    if (!(object instanceof constructor)) {
        return new constructor(values, equals, getDefault);
    }
    var head = object.head = new object.Node();
    head.next = head;
    head.prev = head;
    object.contentEquals = equals || Object.equals;
    object.getDefault = getDefault || Function.noop;
    object.length = 0;
    object.addEach(values);
}

List.List = List; // hack so require("list").List will work in MontageJS

Object.addEach(List.prototype, GenericCollection.prototype);
Object.addEach(List.prototype, GenericOrder.prototype);

List.from = GenericCollection.from;

List.prototype.constructClone = function (values) {
    return new this.constructor(values, this.contentEquals, this.getDefault);
};

List.prototype.find = function (value, equals, index) {
    equals = equals || this.contentEquals;
    var head = this.head;
    var at = this.scan(index, head.next);
    while (at !== head) {
        if (equals(at.value, value)) {
            return at;
        }
        at = at.next;
    }
};

List.prototype.findLast = function (value, equals, index) {
    equals = equals || this.contentEquals;
    var head = this.head;
    var at = this.scan(index, head.prev);
    while (at !== head) {
        if (equals(at.value, value)) {
            return at;
        }
        at = at.prev;
    }
};

List.prototype.has = function (value, equals) {
    return !!this.find(value, equals);
};

List.prototype.get = function (value, equals) {
    var found = this.find(value, equals);
    if (found) {
        return found.value;
    }
    return this.getDefault(value);
};

// LIFO (delete removes the most recently added equivalent value)
List.prototype["delete"] = function (value, equals) {
    var found = this.findLast(value, equals);
    if (found) {
        found["delete"]();
        this.length--;
        return true;
    }
    return false;
};

List.prototype.deleteAll = function (value, equals) {
    equals = equals || this.contentEquals;
    var head = this.head;
    var at = head.next;
    var count = 0;
    while (at !== head) {
        if (equals(value, at.value)) {
            at["delete"]();
            count++;
        }
        at = at.next;
    }
    this.length -= count;
    return count;
};

List.prototype.clear = function () {
    this.head.next = this.head.prev = this.head;
    this.length = 0;
};

List.prototype.add = function (value) {
    var node = new this.Node(value)
    return this._addNode(node);
};

List.prototype._addNode = function (node) {
    this.head.addBefore(node);
    this.length++;
    return true;
};

List.prototype.push = function () {
    var head = this.head;
    for (var i = 0; i < arguments.length; i++) {
        var value = arguments[i];
        var node = new this.Node(value);
        head.addBefore(node);
    }
    this.length += arguments.length;
};

List.prototype.unshift = function () {
    var at = this.head;
    for (var i = 0; i < arguments.length; i++) {
        var value = arguments[i];
        var node = new this.Node(value);
        at.addAfter(node);
        at = node;
    }
    this.length += arguments.length;
};

List.prototype._shouldPop = function () {
    var value;
    var head = this.head;
    if (head.prev !== head) {
        value = head.prev.value;
    }
    return value;
}

List.prototype.pop = function (_before, _after) {
    var value;
    var head = this.head;
    if (head.prev !== head) {
        value = head.prev.value;
        var index = this.length - 1;
        var popDispatchValueArray = _before ? _before.call(this,value,index) : void 0;
        head.prev['delete']();
        this.length--;
        _after ? _after.call(this,value,index, popDispatchValueArray) : void 0;
    }
    return value;
};

List.prototype.shift = function (_before, _after) {
    var value;
    var head = this.head;
    if (head.prev !== head) {
        value = head.next.value;
        var dispatchValueArray = _before ? _before.call(this,value,0) : void 0;
        head.next['delete']();
        this.length--;
        _after ? _after.call(this,value,0,dispatchValueArray) : void 0;
    }
    return value;
};

List.prototype.peek = function () {
    if (this.head !== this.head.next) {
        return this.head.next.value;
    }
};

List.prototype.poke = function (value) {
    if (this.head !== this.head.next) {
        this.head.next.value = value;
    } else {
        this.push(value);
    }
};

List.prototype.one = function () {
    return this.peek();
};

// TODO
// List.prototype.indexOf = function (value) {
// };

// TODO
// List.prototype.lastIndexOf = function (value) {
// };

// an internal utility for coercing index offsets to nodes
List.prototype.scan = function (at, fallback) {
    var head = this.head;
    if (typeof at === "number") {
        var count = at;
        if (count >= 0) {
            at = head.next;
            while (count) {
                count--;
                at = at.next;
                if (at == head) {
                    break;
                }
            }
        } else {
            at = head;
            while (count < 0) {
                count++;
                at = at.prev;
                if (at == head) {
                    break;
                }
            }
        }
        return at;
    } else {
        return at || fallback;
    }
};

// at and end may both be positive or negative numbers (in which cases they
// correspond to numeric indicies, or nodes)
List.prototype.slice = function (at, end) {
    var sliced = [];
    var head = this.head;
    at = this.scan(at, head.next);
    end = this.scan(end, head);

    while (at !== end && at !== head) {
        sliced.push(at.value);
        at = at.next;
    }

    return sliced;
};

List.prototype.splice = function (at, length /*...plus*/) {
    return this.swap(at, length, Array.prototype.slice.call(arguments, 2));
};

List.prototype.swap = function (start, length, plus, _before, _after) {
    var initial = start;
    // start will be head if start is null or -1 (meaning from the end), but
    // will be head.next if start is 0 (meaning from the beginning)
    start = this.scan(start, this.head);
    if (length == null) {
        length = Infinity;
    }
    plus = Array.from(plus);

    // collect the minus array
    var minus = [];
    var at = start;
    while (length-- && length >= 0 && at !== this.head) {
        minus.push(at.value);
        at = at.next;
    }

    // before range change
    var index, startNode;
    index = _before ? _before.call(this, start, plus, minus) : void 0;

    // delete minus
    var at = start;
    for (var i = 0, at = start; i < minus.length; i++, at = at.next) {
        at["delete"]();
    }
    // add plus
    if (initial == null && at === this.head) {
        at = this.head.next;
    }
    for (var i = 0; i < plus.length; i++) {
        var node = new this.Node(plus[i]);
        at.addBefore(node);
    }
    // adjust length
    this.length += plus.length - minus.length;

    _after ? _after.call(this, start, plus, minus) : void 0;

    return minus;
};

List.prototype.reverse = function () {
    var at = this.head;
    do {
        var temp = at.next;
        at.next = at.prev;
        at.prev = temp;
        at = at.next;
    } while (at !== this.head);
    return this;
};

List.prototype.sort = function () {
    this.swap(0, this.length, this.sorted());
};

// TODO account for missing basis argument
List.prototype.reduce = function (callback, basis /*, thisp*/) {
    var thisp = arguments[2];
    var head = this.head;
    var at = head.next;
    while (at !== head) {
        basis = callback.call(thisp, basis, at.value, at, this);
        at = at.next;
    }
    return basis;
};

List.prototype.reduceRight = function (callback, basis /*, thisp*/) {
    var thisp = arguments[2];
    var head = this.head;
    var at = head.prev;
    while (at !== head) {
        basis = callback.call(thisp, basis, at.value, at, this);
        at = at.prev;
    }
    return basis;
};

List.prototype.updateIndexes = function (node, index) {
    while (node !== this.head) {
        node.index = index++;
        node = node.next;
    }
};


List.prototype.iterate = function () {
    return new ListIterator(this.head);
};

function ListIterator(head) {
    this.head = head;
    this.at = head.next;
};

ListIterator.prototype.__iterationObject = null;
Object.defineProperty(ListIterator.prototype,"_iterationObject", {
    get: function() {
        return this.__iterationObject || (this.__iterationObject = { done: false, value:null});
    }
});


ListIterator.prototype.next = function () {
    if (this.at === this.head) {
        this._iterationObject.done = true;
        this._iterationObject.value = void 0;
    } else {
        var value = this.at.value;
        this.at = this.at.next;
        this._iterationObject.value = value;
    }
    return this._iterationObject;
};

List.prototype.Node = Node;

function Node(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
};

Node.prototype["delete"] = function () {
    this.prev.next = this.next;
    this.next.prev = this.prev;
};

Node.prototype.addBefore = function (node) {
    var prev = this.prev;
    this.prev = node;
    node.prev = prev;
    prev.next = node;
    node.next = this;
};

Node.prototype.addAfter = function (node) {
    var next = this.next;
    this.next = node;
    node.next = next;
    next.prev = node;
    node.prev = this;
};


/***/ }),
/* 108 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/collections/generic-map.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Object = __webpack_require__(/*! ./shim-object */ 57);
var Iterator = __webpack_require__(/*! ./iterator */ 111);

module.exports = GenericMap;
function GenericMap() {
    throw new Error("Can't construct. GenericMap is a mixin.");
}

// all of these methods depend on the constructor providing a `store` set

GenericMap.prototype.isMap = true;

GenericMap.prototype.addEach = function (values) {
    var i;
    if (values && Object(values) === values) {
        if (typeof values.forEach === "function") {
            // copy map-alikes
            if (values.isMap === true) {
                values.forEach(function (value, key) {
                    this.set(key, value);
                }, this);
            // iterate key value pairs of other iterables
            } else {
                values.forEach(function (pair) {
                    this.set(pair[0], pair[1]);
                }, this);
            }
        } else if (typeof values.length === "number") {
            // Array-like objects that do not implement forEach, ergo,
            // Arguments
            for (i = 0; i < values.length; i++) {
                this.add(values[i], i);
            }
        } else {
            // copy other objects as map-alikes
            Object.keys(values).forEach(function (key) {
                this.set(key, values[key]);
            }, this);
        }
    } else if (values && typeof values.length === "number") {
        // String
        for (i = 0; i < values.length; i++) {
            this.add(values[i], i);
        }
    }
    return this;
};

GenericMap.prototype.get = function (key, defaultValue) {
    var item = this.store.get(new this.Item(key));
    if (item) {
        return item.value;
    } else if (arguments.length > 1) {
        console.log("Use of a second argument as default value is deprecated to match standards");
        return defaultValue;
    } else {
        return this.getDefault(key);
    }
};

GenericMap.prototype.set = function (key, value) {
    var item = new this.Item(key, value);
    var found = this.store.get(item);
    var grew = false;
    if (found) { // update
        if (this.dispatchesMapChanges) {
            this.dispatchBeforeMapChange(key, found.value);
        }
        found.value = value;
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange(key, value);
        }
    } else { // create
        if (this.dispatchesMapChanges) {
            this.dispatchBeforeMapChange(key, undefined);
        }
        if (this.store.add(item)) {
            this.length++;
            grew = true;
        }
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange(key, value);
        }
    }
    return this;
};

GenericMap.prototype.add = function (value, key) {
    return this.set(key, value);
};

GenericMap.prototype.has = function (key) {
    return this.store.has(new this.Item(key));
};

GenericMap.prototype['delete'] = function (key) {
    var item = new this.Item(key);
    if (this.store.has(item)) {
        var from = this.store.get(item).value;
        if (this.dispatchesMapChanges) {
            this.dispatchBeforeMapChange(key, from);
        }
        this.store["delete"](item);
        this.length--;
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange(key, undefined);
        }
        return true;
    }
    return false;
};

GenericMap.prototype.clear = function () {
    var keys, key;
    if (this.dispatchesMapChanges) {
        this.forEach(function (value, key) {
            this.dispatchBeforeMapChange(key, value);
        }, this);
        keys = this.keysArray();
    }
    this.store.clear();
    this.length = 0;
    if (this.dispatchesMapChanges) {
        for(var i=0;(key = keys[i]);i++) {
            this.dispatchMapChange(key);
        }
        // keys.forEach(function (key) {
        //     this.dispatchMapChange(key);
        // }, this);
    }
};

GenericMap.prototype.reduce = function (callback, basis, thisp) {
    return this.store.reduce(function (basis, item) {
        return callback.call(thisp, basis, item.value, item.key, this);
    }, basis, this);
};

GenericMap.prototype.reduceRight = function (callback, basis, thisp) {
    return this.store.reduceRight(function (basis, item) {
        return callback.call(thisp, basis, item.value, item.key, this);
    }, basis, this);
};

GenericMap.prototype.keysArray = function () {
    return this.map(function (value, key) {
        return key;
    });
};
GenericMap.prototype.keys = function () {
    return new Iterator(this.keysArray());
};

GenericMap.prototype.valuesArray = function () {
    return this.map(Function.identity);
};
GenericMap.prototype.values = function () {
    return new Iterator(this.valuesArray());
};

GenericMap.prototype.entriesArray = function () {
    return this.map(function (value, key) {
        return [key, value];
    });
};
GenericMap.prototype.entries = function () {
    return new Iterator(this.entriesArray());
};

// XXX deprecated
GenericMap.prototype.items = function () {
    return this.entriesArray();
};

GenericMap.prototype.equals = function (that, equals) {
    equals = equals || Object.equals;
    if (this === that) {
        return true;
    } else if (that && typeof that.every === "function") {
        return that.length === this.length && that.every(function (value, key) {
            return equals(this.get(key), value);
        }, this);
    } else {
        var keys = Object.keys(that);
        return keys.length === this.length && Object.keys(that).every(function (key) {
            return equals(this.get(key), that[key]);
        }, this);
    }
};

GenericMap.prototype.toJSON = function () {
    return this.entriesArray();
};


GenericMap.prototype.Item = Item;

function Item(key, value) {
    this.key = key;
    this.value = value;
}

Item.prototype.equals = function (that) {
    return Object.equals(this.key, that.key) && Object.equals(this.value, that.value);
};

Item.prototype.compare = function (that) {
    return Object.compare(this.key, that.key);
};


/***/ }),
/* 109 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/collections/generic-order.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {


var Object = __webpack_require__(/*! ./shim-object */ 57);

module.exports = GenericOrder;
function GenericOrder() {
    throw new Error("Can't construct. GenericOrder is a mixin.");
}

GenericOrder.prototype.equals = function (that, equals) {
    equals = equals || this.contentEquals || Object.equals;

    if (this === that) {
        return true;
    }
    if (!that) {
        return false;
    }

    var self = this;
    return (
        this.length === that.length &&
        this.zip(that).every(function (pair) {
            return equals(pair[0], pair[1]);
        })
    );
};

GenericOrder.prototype.compare = function (that, compare) {
    compare = compare || this.contentCompare || Object.compare;

    if (this === that) {
        return 0;
    }
    if (!that) {
        return 1;
    }

    var length = Math.min(this.length, that.length);
    var comparison = this.zip(that).reduce(function (comparison, pair, index) {
        if (comparison === 0) {
            if (index >= length) {
                return comparison;
            } else {
                return compare(pair[0], pair[1]);
            }
        } else {
            return comparison;
        }
    }, 0);
    if (comparison === 0) {
        return this.length - that.length;
    }
    return comparison;
};

GenericOrder.prototype.toJSON = function () {
    return this.toArray();
};


/***/ }),
/* 110 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/collections/generic-set.js ***!
  \**************************************/
/***/ (function(module, exports) {


module.exports = GenericSet;
function GenericSet() {
    throw new Error("Can't construct. GenericSet is a mixin.");
}

GenericSet.prototype.isSet = true;

GenericSet.prototype.union = function (that) {
    var union =  this.constructClone(this);
    union.addEach(that);
    return union;
};

GenericSet.prototype.intersection = function (that) {
    return this.constructClone(this.filter(function (value) {
        return that.has(value);
    }));
};

GenericSet.prototype.difference = function (that) {
    var union =  this.constructClone(this);
    union.deleteEach(that);
    return union;
};

GenericSet.prototype.symmetricDifference = function (that) {
    var union = this.union(that);
    var intersection = this.intersection(that);
    return union.difference(intersection);
};

GenericSet.prototype.deleteAll = function (value) {
    // deleteAll is equivalent to delete for sets since they guarantee that
    // only one value exists for an equivalence class, but deleteAll returns
    // the count of deleted values instead of whether a value was deleted.
    return +this["delete"](value);
};

GenericSet.prototype.equals = function (that, equals) {
    var self = this;
    return (
        that && typeof that.reduce === "function" &&
        this.length === that.length &&
        that.reduce(function (equal, value) {
            return equal && self.has(value, equals);
        }, true)
    );
};

GenericSet.prototype.forEach = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    return this.reduce(function (undefined, value, key, object, depth) {
        //ECMASCRIPT Sets send value twice in callback to forEach
        callback.call(thisp, value, value, object, depth);
    }, undefined);
};


GenericSet.prototype.toJSON = function () {
    return this.toArray();
};

// W3C DOMTokenList API overlap (does not handle variadic arguments)

GenericSet.prototype.contains = function (value) {
    return this.has(value);
};

GenericSet.prototype.remove = function (value) {
    return this["delete"](value);
};

GenericSet.prototype.toggle = function (value) {
    if (this.has(value)) {
        this["delete"](value);
    } else {
        this.add(value);
    }
};

var _valuesArrayFunction = function(value,key) {return value;};
GenericSet.prototype.valuesArray = function() {
    return this.map(_valuesArrayFunction);
}
var _entriesArrayFunction = function(value,key) {return [key,value];};
GenericSet.prototype.entriesArray = function() {
    return this.map(_entriesArrayFunction);
}


/***/ }),
/* 111 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/collections/iterator.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Iterator;

var Object = __webpack_require__(/*! ./shim-object */ 57);
var GenericCollection = __webpack_require__(/*! ./generic-collection */ 30);

// upgrades an iterable to a Iterator
function Iterator(iterable) {

    var values = iterable && iterable.values && iterable.values();
    if(values && typeof values.next === "function" ) {
        return values;
    }

    if (!(this instanceof Iterator)) {
        return new Iterator(iterable);
    }

    if (Array.isArray(iterable) || typeof iterable === "string")
        return Iterator.iterate(iterable);

    iterable = Object(iterable);

    if (iterable instanceof Iterator) {
        return iterable;
    } else if (iterable.next) {
        this.next = function () {
            return iterable.next();
        };
    } else if (iterable.iterate) {
        var iterator = iterable.iterate();
        this.next = function () {
            return iterator.next();
        };
    } else if (Object.prototype.toString.call(iterable) === "[object Function]") {
        this.next = iterable;
    } else {
        throw new TypeError("Can't iterate " + iterable);
    }

}

Iterator.prototype.forEach = GenericCollection.prototype.forEach;
Iterator.prototype.map = GenericCollection.prototype.map;
Iterator.prototype.filter = GenericCollection.prototype.filter;
Iterator.prototype.every = GenericCollection.prototype.every;
Iterator.prototype.some = GenericCollection.prototype.some;
Iterator.prototype.any = GenericCollection.prototype.any;
Iterator.prototype.all = GenericCollection.prototype.all;
Iterator.prototype.min = GenericCollection.prototype.min;
Iterator.prototype.max = GenericCollection.prototype.max;
Iterator.prototype.sum = GenericCollection.prototype.sum;
Iterator.prototype.average = GenericCollection.prototype.average;
Iterator.prototype.flatten = GenericCollection.prototype.flatten;
Iterator.prototype.zip = GenericCollection.prototype.zip;
Iterator.prototype.enumerate = GenericCollection.prototype.enumerate;
Iterator.prototype.sorted = GenericCollection.prototype.sorted;
Iterator.prototype.group = GenericCollection.prototype.group;
Iterator.prototype.reversed = GenericCollection.prototype.reversed;
Iterator.prototype.toArray = GenericCollection.prototype.toArray;
Iterator.prototype.toObject = GenericCollection.prototype.toObject;
Iterator.prototype.iterator = GenericCollection.prototype.iterator;

Iterator.prototype.__iterationObject = null;
Object.defineProperty(Iterator.prototype,"_iterationObject", {
    get: function() {
        return this.__iterationObject || (this.__iterationObject = { done: false, value:void 0});
    }
});


// this is a bit of a cheat so flatten and such work with the generic
// reducible
Iterator.prototype.constructClone = function (values) {
    var clone = [];
    clone.addEach(values);
    return clone;
};

Iterator.prototype.mapIterator = function (callback /*, thisp*/) {
    var self = Iterator(this),
        thisp = arguments[1],
        i = 0;

    if (Object.prototype.toString.call(callback) != "[object Function]")
        throw new TypeError();

    return new self.constructor(function () {
        if(self._iterationObject.done !== true) {
            var callbackValue = callback.call(thisp, self.next().value, i++, self);
            self._iterationObject.value = callbackValue;
        }
        return self._iterationObject;
    });
};

Iterator.prototype.filterIterator = function (callback /*, thisp*/) {
    var self = Iterator(this),
        thisp = arguments[1],
        i = 0;

    if (Object.prototype.toString.call(callback) != "[object Function]")
        throw new TypeError();

    return new self.constructor(function () {
        var nextEntry;
        while (true) {
            nextEntry = self.next();
            if(nextEntry.done !== true) {
                if (callback.call(thisp, nextEntry.value, i++, self))
                    return nextEntry;
            }
            else {
                //done true and value undefined at this point
                return nextEntry;
            }
        }
    });
};

Iterator.prototype.reduce = function (callback /*, initial, thisp*/) {
    var self = Iterator(this),
        result = arguments[1],
        thisp = arguments[2],
        i = 0,
        nextEntry;

    if (Object.prototype.toString.call(callback) != "[object Function]")
        throw new TypeError();

    // first iteration unrolled
    nextEntry = self.next();
    if(nextEntry.done === true) {
        if (arguments.length > 1) {
            return arguments[1]; // initial
        } else {
            throw TypeError("cannot reduce a value from an empty iterator with no initial value");
        }
    }
    if (arguments.length > 1) {
        result = callback.call(thisp, result, nextEntry.value, i, self);
    } else {
        result = nextEntry.value;
    }
    i++;
    // remaining entries
    while (true) {
        nextEntry = self.next();
        if(nextEntry.done === true) {
            return result;
        }
        result = callback.call(thisp, result, nextEntry.value, i, self);
        i++;
    }

};

Iterator.prototype.concat = function () {
    return Iterator.concat(
        Array.prototype.concat.apply(this, arguments)
    );
};

Iterator.prototype.dropWhile = function (callback /*, thisp */) {
    var self = Iterator(this),
        thisp = arguments[1],
        stopped = false,
        stopValue,
        nextEntry,
        i = 0;

    if (Object.prototype.toString.call(callback) != "[object Function]")
        throw new TypeError();

    while (true) {
        nextEntry = self.next();
        if(nextEntry.done === true) {
            break;
        }
        if (!callback.call(thisp, nextEntry.value, i, self)) {
            stopped = true;
            stopValue = nextEntry.value;
            break;
        }
        i++;
    }

    if (stopped) {
        return self.constructor([stopValue]).concat(self);
    } else {
        return self.constructor([]);
    }
};

Iterator.prototype.takeWhile = function (callback /*, thisp*/) {
    var self = Iterator(this),
        thisp = arguments[1],
        nextEntry,
        i = 0;

    if (Object.prototype.toString.call(callback) != "[object Function]")
        throw new TypeError();

    return new self.constructor(function () {
        if(self._iterationObject.done !== true) {
            var value = self.next().value;
            if(callback.call(thisp, value, i++, self)) {
                self._iterationObject.value = value;
            }
            else {
                self._iterationObject.done = true;
                self._iterationObject.value = void 0;
            }
        }
        return self._iterationObject;
    });

};

Iterator.prototype.zipIterator = function () {
    return Iterator.unzip(
        Array.prototype.concat.apply(this, arguments)
    );
};

Iterator.prototype.enumerateIterator = function (start) {
    return Iterator.count(start).zipIterator(this);
};

// creates an iterator for Array and String
Iterator.iterate = function (iterable) {
    var start;
    start = 0;
    return new Iterator(function () {
        // advance to next owned entry
        if (typeof iterable === "object") {
            while (!(start in iterable)) {
                // deliberately late bound
                if (start >= iterable.length) {
                    this._iterationObject.done = true;
                    this._iterationObject.value = void 0;
                    break;
                }
                else start += 1;
            }
        } else if (start >= iterable.length) {
            this._iterationObject.done = true;
            this._iterationObject.value = void 0;
        }

        if(!this._iterationObject.done) {
            this._iterationObject.value = iterable[start];
            start += 1;
        }
        return this._iterationObject;
    });
};

Iterator.cycle = function (cycle, times) {
    var next;
    if (arguments.length < 2)
        times = Infinity;
    //cycle = Iterator(cycle).toArray();
    return new Iterator(function () {
        var iteration, nextEntry;

        if(next) {
            nextEntry = next();
        }

        if(!next || nextEntry.done === true) {
            if (times > 0) {
                times--;
                iteration = Iterator.iterate(cycle);
                nextEntry = (next = iteration.next.bind(iteration))();
            }
            else {
                this._iterationObject.done = true;
                nextEntry = this._iterationObject;            }
        }
        return nextEntry;
    });
};

Iterator.concat = function (iterators) {
    iterators = Iterator(iterators);
    var next;
    return new Iterator(function (){
        var iteration, nextEntry;
        if(next) nextEntry = next();
        if(!nextEntry || nextEntry.done === true) {
            nextEntry = iterators.next();
            if(nextEntry.done === false) {
                iteration = Iterator(nextEntry.value);
                next = iteration.next.bind(iteration);
                return next();
            }
            else {
                return nextEntry;
            }
        }
        else return nextEntry;
    });
};

Iterator.unzip = function (iterators) {
    iterators = Iterator(iterators).map(Iterator);
    if (iterators.length === 0)
        return new Iterator([]);
    return new Iterator(function () {
        var stopped, nextEntry;
        var result = iterators.map(function (iterator) {
            nextEntry = iterator.next();
            if (nextEntry.done === true ) {
                stopped = true;
            }
            return nextEntry.value;
        });
        if (stopped) {
            this._iterationObject.done = true;
            this._iterationObject.value = void 0;
        }
        else {
            this._iterationObject.value = result;
        }
        return this._iterationObject;
    });
};

Iterator.zip = function () {
    return Iterator.unzip(
        Array.prototype.slice.call(arguments)
    );
};

Iterator.chain = function () {
    return Iterator.concat(
        Array.prototype.slice.call(arguments)
    );
};

Iterator.range = function (start, stop, step) {
    if (arguments.length < 3) {
        step = 1;
    }
    if (arguments.length < 2) {
        stop = start;
        start = 0;
    }
    start = start || 0;
    step = step || 1;
    return new Iterator(function () {
        if (start >= stop) {
            this._iterationObject.done = true;
            this._iterationObject.value = void 0;
        }
        var result = start;
        start += step;
        this._iterationObject.value = result;

        return this._iterationObject;
    });
};

Iterator.count = function (start, step) {
    return Iterator.range(start, Infinity, step);
};

Iterator.repeat = function (value, times) {
    return new Iterator.range(times).mapIterator(function () {
        return value;
    });
};


/***/ }),
/* 112 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/collections/listen/map-changes.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var WeakMap = __webpack_require__(/*! weak-map */ 53),
    Map = __webpack_require__(/*! ../_map */ 56),
    ChangeDescriptor = __webpack_require__(/*! ./change-descriptor */ 72),
    ObjectChangeDescriptor = ChangeDescriptor.ObjectChangeDescriptor,
    ChangeListenersRecord = ChangeDescriptor.ChangeListenersRecord,
    ListenerGhost = ChangeDescriptor.ListenerGhost;

module.exports = MapChanges;
function MapChanges() {
    throw new Error("Can't construct. MapChanges is a mixin.");
}

var object_owns = Object.prototype.hasOwnProperty;

/*
    Object map change descriptors carry information necessary for adding,
    removing, dispatching, and shorting events to listeners for map changes
    for a particular key on a particular object.  These descriptors are used
    here for shallow map changes.

    {
        willChangeListeners:Array(Fgunction)
        changeListeners:Array(Function)
    }
*/

var mapChangeDescriptors = new WeakMap();

function MapChangeDescriptor(name) {
    this.name = name;
    this.isActive = false;
    this._willChangeListeners = null;
    this._changeListeners = null;
};

MapChangeDescriptor.prototype = new ObjectChangeDescriptor();
MapChangeDescriptor.prototype.constructor = MapChangeDescriptor;

MapChangeDescriptor.prototype.changeListenersRecordConstructor = MapChangeListenersRecord;
MapChangeDescriptor.prototype.willChangeListenersRecordConstructor = MapWillChangeListenersRecord;

var MapChangeListenersSpecificHandlerMethodName = new Map();

function MapChangeListenersRecord(name) {
    var specificHandlerMethodName = MapChangeListenersSpecificHandlerMethodName.get(name);
    if(!specificHandlerMethodName) {
        specificHandlerMethodName = "handle";
        specificHandlerMethodName += name.slice(0, 1).toUpperCase();
        specificHandlerMethodName += name.slice(1);
        specificHandlerMethodName += "MapChange";
        MapChangeListenersSpecificHandlerMethodName.set(name,specificHandlerMethodName);
    }
    this.specificHandlerMethodName = specificHandlerMethodName;
	return this;
}
MapChangeListenersRecord.prototype = new ChangeListenersRecord();
MapChangeListenersRecord.prototype.constructor = MapChangeListenersRecord;
MapChangeListenersRecord.prototype.genericHandlerMethodName = "handleMapChange";

var MapWillChangeListenersSpecificHandlerMethodName = new Map();

function MapWillChangeListenersRecord(name) {
    var specificHandlerMethodName = MapWillChangeListenersSpecificHandlerMethodName.get(name);
    if(!specificHandlerMethodName) {
        specificHandlerMethodName = "handle";
        specificHandlerMethodName += name.slice(0, 1).toUpperCase();
        specificHandlerMethodName += name.slice(1);
        specificHandlerMethodName += "MapWillChange";
        MapWillChangeListenersSpecificHandlerMethodName.set(name,specificHandlerMethodName);
    }
    this.specificHandlerMethodName = specificHandlerMethodName;
    return this;
}
MapWillChangeListenersRecord.prototype = new ChangeListenersRecord();
MapWillChangeListenersRecord.prototype.constructor = MapWillChangeListenersRecord;
MapWillChangeListenersRecord.prototype.genericHandlerMethodName = "handleMapWillChange";


MapChanges.prototype.getAllMapChangeDescriptors = function () {
    if (!mapChangeDescriptors.has(this)) {
        mapChangeDescriptors.set(this, new Map());
    }
    return mapChangeDescriptors.get(this);
};

MapChanges.prototype.getMapChangeDescriptor = function (token) {
    var tokenChangeDescriptors = this.getAllMapChangeDescriptors();
    token = token || "";
    if (!tokenChangeDescriptors.has(token)) {
        tokenChangeDescriptors.set(token, new MapChangeDescriptor(token));
    }
    return tokenChangeDescriptors.get(token);
};

var ObjectsDispatchesMapChanges = new WeakMap(),
    dispatchesMapChangesGetter = function() {
        return ObjectsDispatchesMapChanges.get(this);
    },
    dispatchesMapChangesSetter = function(value) {
        return ObjectsDispatchesMapChanges.set(this,value);
    },
    dispatchesChangesMethodName = "dispatchesMapChanges",
    dispatchesChangesPropertyDescriptor = {
        get: dispatchesMapChangesGetter,
        set: dispatchesMapChangesSetter,
        configurable: true,
        enumerable: false
    };

MapChanges.prototype.addMapChangeListener = function addMapChangeListener(listener, token, beforeChange) {
    //console.log("this:",this," addMapChangeListener(",listener,",",token,",",beforeChange);

    if (!this.isObservable && this.makeObservable) {
        // for Array
        this.makeObservable();
    }
    var descriptor = this.getMapChangeDescriptor(token);
    var listeners;
    if (beforeChange) {
        listeners = descriptor.willChangeListeners;
    } else {
        listeners = descriptor.changeListeners;
    }

    // console.log("addMapChangeListener()",listener, token);
    //console.log("this:",this," addMapChangeListener()  listeners._current is ",listeners._current);

    if(!listeners._current) {
        listeners._current = listener;
    }
    else if(!Array.isArray(listeners._current)) {
        listeners._current = [listeners._current,listener]
    }
    else {
        listeners._current.push(listener);
    }

    if(Object.getOwnPropertyDescriptor((this.__proto__||Object.getPrototypeOf(this)),dispatchesChangesMethodName) === void 0) {
        Object.defineProperty((this.__proto__||Object.getPrototypeOf(this)), dispatchesChangesMethodName, dispatchesChangesPropertyDescriptor);
    }
    this.dispatchesMapChanges = true;

    var self = this;
    return function cancelMapChangeListener() {
        if (!self) {
            // TODO throw new Error("Can't remove map change listener again");
            return;
        }
        self.removeMapChangeListener(listener, token, beforeChange);
        self = null;
    };
};

MapChanges.prototype.removeMapChangeListener = function (listener, token, beforeChange) {
    var descriptor = this.getMapChangeDescriptor(token);

    var listeners;
    if (beforeChange) {
        listeners = descriptor.willChangeListeners;
    } else {
        listeners = descriptor.changeListeners;
    }

    if(listeners._current) {
        if(listeners._current === listener) {
            listeners._current = null;
        }
        else {
            var index = listeners._current.lastIndexOf(listener);
            if (index === -1) {
                throw new Error("Can't remove map change listener: does not exist: token " + JSON.stringify(token));
            }
            else {
                if(descriptor.isActive) {
                    listeners.ghostCount = listeners.ghostCount+1
                    listeners._current[index]=ListenerGhost
                }
                else {
                    listeners._current.spliceOne(index);
                }
            }
        }
    }


};

MapChanges.prototype.dispatchMapChange = function (key, value, beforeChange) {
    var descriptors = this.getAllMapChangeDescriptors(),
        Ghost = ListenerGhost;

    descriptors.forEach(function (descriptor, token) {

        if (descriptor.isActive) {
            return;
        }

        var listeners = beforeChange ? descriptor.willChangeListeners : descriptor.changeListeners;
        if(listeners && listeners._current) {

            var tokenName = listeners.specificHandlerMethodName;
            if(Array.isArray(listeners._current) && listeners._current.length) {

                //removeGostListenersIfNeeded returns listeners.current or a new filtered one when conditions are met
                var currentListeners = listeners.removeCurrentGostListenersIfNeeded(),
                    i, countI, listener;
                descriptor.isActive = true;

                try {
                    for(i=0, countI = currentListeners.length;i<countI;i++) {
                        // dispatch to each listener
                        if ((listener = currentListeners[i]) !== Ghost) {
                            if (listener[tokenName]) {
                                listener[tokenName](value, key, this);
                            } else if (listener.call) {
                                listener.call(listener, value, key, this);
                            } else {
                                throw new Error("Handler " + listener + " has no method " + tokenName + " and is not callable");
                            }
                        }
                    }
                } finally {
                    descriptor.isActive = false;
                }
            }
            else {
                descriptor.isActive = true;
                // dispatch each listener

                try {
                    listener = listeners._current;
                    if (listener[tokenName]) {
                        listener[tokenName](value, key, this);
                    } else if (listener.call) {
                        listener.call(listener, value, key, this);
                    } else {
                        throw new Error("Handler " + listener + " has no method " + tokenName + " and is not callable");
                    }
                } finally {
                    descriptor.isActive = false;
                }

            }
        }

    }, this);
};

MapChanges.prototype.addBeforeMapChangeListener = function (listener, token) {
    return this.addMapChangeListener(listener, token, true);
};

MapChanges.prototype.removeBeforeMapChangeListener = function (listener, token) {
    return this.removeMapChangeListener(listener, token, true);
};

MapChanges.prototype.dispatchBeforeMapChange = function (key, value) {
    return this.dispatchMapChange(key, value, true);
};


/***/ }),
/* 113 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/collections/listen/property-changes.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

/*
    Based in part on observable arrays from Motorola Mobility’s Montage
    Copyright (c) 2012, Motorola Mobility LLC. All Rights Reserved.
    3-Clause BSD License
    https://github.com/motorola-mobility/montage/blob/master/LICENSE.md
*/

/*
    This module is responsible for observing changes to owned properties of
    objects and changes to the content of arrays caused by method calls.
    The interface for observing array content changes establishes the methods
    necessary for any collection with observable content.
*/



// objectHasOwnProperty.call(myObject, key) will be used instead of
// myObject.hasOwnProperty(key) to allow myObject have defined
// a own property called "hasOwnProperty".

var objectHasOwnProperty = Object.prototype.hasOwnProperty;

// Object property descriptors carry information necessary for adding,
// removing, dispatching, and shorting events to listeners for property changes
// for a particular key on a particular object.  These descriptors are used
// here for shallow property changes.  The current listeners are the ones
// modified by add and remove own property change listener methods.  During
// property change dispatch, we capture a snapshot of the current listeners in
// the active change listeners array.  The descriptor also keeps a memo of the
// corresponding handler method names.
//
// {
//     willChangeListeners:{current, active:Array<Function>, ...method names}
//     changeListeners:{current, active:Array<Function>, ...method names}
// }

// Maybe remove entries from this table if the corresponding object no longer
// has any property change listeners for any key.  However, the cost of
// book-keeping is probably not warranted since it would be rare for an
// observed object to no longer be observed unless it was about to be disposed
// of or reused as an observable.  The only benefit would be in avoiding bulk
// calls to dispatchOwnPropertyChange events on objects that have no listeners.

//  To observe shallow property changes for a particular key of a particular
//  object, we install a property descriptor on the object that overrides the previous
//  descriptor.  The overridden descriptors are stored in this weak map.  The
//  weak map associates an object with another object that maps property names
//  to property descriptors.
//
//  object.__overriddenPropertyDescriptors__[key]
//
//  We retain the old descriptor for various purposes.  For one, if the property
//  is no longer being observed by anyone, we revert the property descriptor to
//  the original.  For "value" descriptors, we store the actual value of the
//  descriptor on the overridden descriptor, so when the property is reverted, it
//  retains the most recently set value.  For "get" and "set" descriptors,
//  we observe then forward "get" and "set" operations to the original descriptor.

module.exports = PropertyChanges;

function PropertyChanges() {
    throw new Error("This is an abstract interface. Mix it. Don't construct it");
}

__webpack_require__(/*! ../shim */ 31);
var Map = __webpack_require__(/*! ../_map */ 56);
var WeakMap = __webpack_require__(/*! ../weak-map */ 211);
var ChangeDescriptor = __webpack_require__(/*! ./change-descriptor */ 72),
    ObjectChangeDescriptor = ChangeDescriptor.ObjectChangeDescriptor,
    ListenerGhost = ChangeDescriptor.ListenerGhost;

PropertyChanges.debug = true;

var ObjectsPropertyChangeListeners = new WeakMap();

var ObjectChangeDescriptorName = new Map();

PropertyChanges.ObjectChangeDescriptor = function() {

}

PropertyChanges.prototype.getOwnPropertyChangeDescriptor = function (key) {
    var objectPropertyChangeDescriptors = ObjectsPropertyChangeListeners.get(this), keyChangeDescriptor;
    if (!objectPropertyChangeDescriptors) {
        objectPropertyChangeDescriptors = Object.create(null);
        ObjectsPropertyChangeListeners.set(this,objectPropertyChangeDescriptors);
    }
    if ( (keyChangeDescriptor = objectPropertyChangeDescriptors[key]) === void 0) {
        var propertyName = ObjectChangeDescriptorName.get(key);
        if(!propertyName) {
            propertyName = String(key);
            propertyName = propertyName && propertyName[0].toUpperCase() + propertyName.slice(1);
            ObjectChangeDescriptorName.set(key,propertyName);
        }
        return objectPropertyChangeDescriptors[key] = new ObjectChangeDescriptor(propertyName);
    }
    else return keyChangeDescriptor;
};

PropertyChanges.prototype.hasOwnPropertyChangeDescriptor = function (key) {
    var objectPropertyChangeDescriptors = ObjectsPropertyChangeListeners.get(this);
    if (!objectPropertyChangeDescriptors) {
        return false;
    }
    if (!key) {
        return true;
    }
    if (objectPropertyChangeDescriptors[key] === void 0) {
        return false;
    }
    return true;
};

PropertyChanges.prototype.addOwnPropertyChangeListener = function (key, listener, beforeChange) {
    if (this.makeObservable && !this.isObservable) {
        this.makeObservable(); // particularly for observable arrays, for
        // their length property
    }
    var descriptor = PropertyChanges.getOwnPropertyChangeDescriptor(this, key),
        listeners = beforeChange ? descriptor.willChangeListeners : descriptor.changeListeners;

    PropertyChanges.makePropertyObservable(this, key);

    if(!listeners._current) {
        listeners._current = listener;
    }
    else if(!Array.isArray(listeners._current)) {
        listeners._current = [listeners._current,listener]
    }
    else {
        listeners._current.push(listener);
    }

    var self = this;
    return function cancelOwnPropertyChangeListener() {
        PropertyChanges.removeOwnPropertyChangeListener(self, key, listener, beforeChange);
        self = null;
    };
};

PropertyChanges.prototype.addBeforeOwnPropertyChangeListener = function (key, listener) {
    return PropertyChanges.addOwnPropertyChangeListener(this, key, listener, true);
};

PropertyChanges.prototype.removeOwnPropertyChangeListener = function removeOwnPropertyChangeListener(key, listener, beforeChange) {
    var descriptor = PropertyChanges.getOwnPropertyChangeDescriptor(this, key);

    var listeners;
    if (beforeChange) {
        listeners = descriptor._willChangeListeners;
    } else {
        listeners = descriptor._changeListeners;
    }

    if(listeners) {
        if(listeners._current) {
            if(listeners._current === listener) {
                listeners._current = null;
            }
            else {

                var index = listeners._current.lastIndexOf(listener);
                if (index === -1) {
                    throw new Error("Can't remove property change listener: does not exist: property name" + JSON.stringify(key));
                }
                if(descriptor.isActive) {
                    listeners.ghostCount = listeners.ghostCount+1;
                    listeners._current[index]=removeOwnPropertyChangeListener.ListenerGhost;
                }
                else {
                    listeners._current.spliceOne(index);
                }
            }
        }
    }
};
PropertyChanges.prototype.removeOwnPropertyChangeListener.ListenerGhost = ListenerGhost;

PropertyChanges.prototype.removeBeforeOwnPropertyChangeListener = function (key, listener) {
    return PropertyChanges.removeOwnPropertyChangeListener(this, key, listener, true);
};

PropertyChanges.prototype.dispatchOwnPropertyChange = function dispatchOwnPropertyChange(key, value, beforeChange) {
    var descriptor = PropertyChanges.getOwnPropertyChangeDescriptor(this, key),
        listeners;

    if (!descriptor.isActive) {
        descriptor.isActive = true;
        listeners = beforeChange ? descriptor._willChangeListeners: descriptor._changeListeners;
        try {
            dispatchOwnPropertyChange.dispatchEach(listeners, key, value, this);
        } finally {
            descriptor.isActive = false;
        }
    }
};
PropertyChanges.prototype.dispatchOwnPropertyChange.dispatchEach = dispatchEach;

function dispatchEach(listeners, key, value, object) {
    if(listeners && listeners._current) {
        // copy snapshot of current listeners to active listeners
        var current,
            listener,
            i,
            countI,
            thisp,
            specificHandlerMethodName = listeners.specificHandlerMethodName,
            genericHandlerMethodName = listeners.genericHandlerMethodName,
            Ghost = ListenerGhost;

        if(Array.isArray(listeners._current)) {
            //removeGostListenersIfNeeded returns listeners.current or a new filtered one when conditions are met
            current = listeners.removeCurrentGostListenersIfNeeded();
            //We use a for to guarantee we won't dispatch to listeners that would be added after we started
            for(i=0, countI = current.length;i<countI;i++) {
                if ((thisp = current[i]) !== Ghost) {
                    //This is fixing the issue causing a regression in Montage's repetition
                    listener = (
                        thisp[specificHandlerMethodName] ||
                        thisp[genericHandlerMethodName] ||
                        thisp
                    );
                    if (!listener.call) {
                        throw new Error("No event listener for " + listeners.specificHandlerName + " or " + listeners.genericHandlerName + " or call on " + listener);
                    }
                    listener.call(thisp, value, key, object);
                }
            }
        }
        else {
            thisp = listeners._current;
            listener = (
                thisp[specificHandlerMethodName] ||
                thisp[genericHandlerMethodName] ||
                thisp
            );
            if (!listener.call) {
                throw new Error("No event listener for " + listeners.specificHandlerName + " or " + listeners.genericHandlerName + " or call on " + listener);
            }
            listener.call(thisp, value, key, object);
        }

    }
}

dispatchEach.ListenerGhost = ListenerGhost;


PropertyChanges.prototype.dispatchBeforeOwnPropertyChange = function (key, listener) {
    return PropertyChanges.dispatchOwnPropertyChange(this, key, listener, true);
};

var ObjectsOverriddenPropertyDescriptors = new WeakMap(),
    Objects__state__ = new WeakMap(),
    propertyListener = {
        get: void 0,
        set: void 0,
        configurable: true,
        enumerable: false
    };

PropertyChanges.prototype.makePropertyObservable = function (key) {
    // arrays are special.  we do not support direct setting of properties
    // on an array.  instead, call .set(index, value).  this is observable.
    // 'length' property is observable for all mutating methods because
    // our overrides explicitly dispatch that change.


    var overriddenPropertyDescriptors = ObjectsOverriddenPropertyDescriptors.get(this);
    if (overriddenPropertyDescriptors && overriddenPropertyDescriptors.get(key) !== void 0) {
        // if we have already recorded an overridden property descriptor,
        // we have already installed the observer, so short-here
        return;
    }

    // memoize overridden property descriptor table
    if (!overriddenPropertyDescriptors) {
        if (Array.isArray(this)) {
            return;
        }
        if (!Object.isExtensible(this)) {
            throw new Error("Can't make property " + JSON.stringify(key) + " observable on " + this + " because object is not extensible");
        }
        overriddenPropertyDescriptors = new Map();
        ObjectsOverriddenPropertyDescriptors.set(this,overriddenPropertyDescriptors);
    }

    // var state = Objects__state__.get(this);
    // if (typeof state !== "object") {
    //     Objects__state__.set(this,(state = {}));
    // }
    // state[key] = this[key];



    // walk up the prototype chain to find a property descriptor for
    // the property name
    var overriddenDescriptor;
    var attached = this;
    do {
        overriddenDescriptor = Object.getOwnPropertyDescriptor(attached, key);
        if (overriddenDescriptor) {
            break;
        }
        attached = Object.getPrototypeOf(attached);
    } while (attached);
    // or default to an undefined value
    if (!overriddenDescriptor) {
        overriddenDescriptor = {
            value: void 0,
            enumerable: true,
            writable: true,
            configurable: true
        };
    } else {
        if (!overriddenDescriptor.configurable) {
            return;
        }
        if (!overriddenDescriptor.writable && !overriddenDescriptor.set) {
            return;
        }
    }

    // memoize the descriptor so we know not to install another layer,
    // and so we can reuse the overridden descriptor when uninstalling
    overriddenPropertyDescriptors.set(key,overriddenDescriptor);


    // TODO reflect current value on a displayed property

    // in both of these new descriptor variants, we reuse the overridden
    // descriptor to either store the current value or apply getters
    // and setters.  this is handy since we can reuse the overridden
    // descriptor if we uninstall the observer.  We even preserve the
    // assignment semantics, where we get the value from up the
    // prototype chain, and set as an owned property.
    if ('value' in overriddenDescriptor) {
        propertyListener.get = function dispatchingGetter() {
            return dispatchingGetter.overriddenDescriptor.value;
        };
        propertyListener.set = function dispatchingSetter(value) {
            var descriptor,
                isActive,
                overriddenDescriptor = dispatchingSetter.overriddenDescriptor;

            if (value !== overriddenDescriptor.value) {
                if (!(isActive = (descriptor = dispatchingSetter.descriptor).isActive)) {
                    descriptor.isActive = true;
                    try {
                        dispatchingSetter.dispatchEach(descriptor._willChangeListeners, dispatchingSetter.key, overriddenDescriptor.value, this);
                    } finally {}
                }
                overriddenDescriptor.value = value;
                if (!isActive) {
                    try {
                        dispatchingSetter.dispatchEach(descriptor._changeListeners, dispatchingSetter.key, value, this);
                    } finally {
                        descriptor.isActive = false;
                    }
                }
            }
        };
        propertyListener.set.dispatchEach = dispatchEach;
        propertyListener.set.key = key;
        propertyListener.get.overriddenDescriptor = propertyListener.set.overriddenDescriptor = overriddenDescriptor;
        propertyListener.set.descriptor = ObjectsPropertyChangeListeners.get(this)[key];

        propertyListener.enumerable = overriddenDescriptor.enumerable;

        propertyListener.configurable = true

    } else { // 'get' or 'set', but not necessarily both
            propertyListener.get = overriddenDescriptor.get;
            propertyListener.set = function dispatchingSetter() {
                var formerValue = dispatchingSetter.overriddenGetter.call(this),
                    descriptor,
                    isActive,
                    newValue;


                    if(arguments.length === 1) {
                        dispatchingSetter.overriddenSetter.call(this,arguments[0]);
                    }
                    else if(arguments.length === 2) {
                        dispatchingSetter.overriddenSetter.call(this,arguments[0],arguments[1]);
                    }
                    else {
                        dispatchingSetter.overriddenSetter.apply(this, arguments);
                    }

                if ((newValue = dispatchingSetter.overriddenGetter.call(this)) !== formerValue) {
                    descriptor = dispatchingSetter.descriptor;
                    if (!(isActive = descriptor.isActive)) {
                        descriptor.isActive = true;
                        try {
                            dispatchingSetter.dispatchEach(descriptor._willChangeListeners, key, formerValue, this);
                        } finally {}
                    }
                    if (!isActive) {
                        try {
                            dispatchingSetter.dispatchEach(descriptor._changeListeners, key, newValue, this);
                        } finally {
                            descriptor.isActive = false;
                        }
                    }
                }
            };
            propertyListener.enumerable = overriddenDescriptor.enumerable;
            propertyListener.configurable = true;
        propertyListener.set.dispatchEach = dispatchEach;
        propertyListener.set.overriddenSetter = overriddenDescriptor.set;
        propertyListener.set.overriddenGetter = overriddenDescriptor.get;
        propertyListener.set.descriptor = ObjectsPropertyChangeListeners.get(this)[key];
    }

    Object.defineProperty(this, key, propertyListener);
};

// constructor functions

PropertyChanges.getOwnPropertyChangeDescriptor = function (object, key) {
    if (object.getOwnPropertyChangeDescriptor) {
        return object.getOwnPropertyChangeDescriptor(key);
    } else {
        return PropertyChanges.prototype.getOwnPropertyChangeDescriptor.call(object, key);
    }
};

PropertyChanges.hasOwnPropertyChangeDescriptor = function (object, key) {
    if (object.hasOwnPropertyChangeDescriptor) {
        return object.hasOwnPropertyChangeDescriptor(key);
    } else {
        return PropertyChanges.prototype.hasOwnPropertyChangeDescriptor.call(object, key);
    }
};

PropertyChanges.addOwnPropertyChangeListener = function (object, key, listener, beforeChange) {
    if (Object.isObject(object)) {
        return object.addOwnPropertyChangeListener
            ? object.addOwnPropertyChangeListener(key, listener, beforeChange)
            : this.prototype.addOwnPropertyChangeListener.call(object, key, listener, beforeChange);
    }
};

PropertyChanges.removeOwnPropertyChangeListener = function (object, key, listener, beforeChange) {
    if (!Object.isObject(object)) {
    } else if (object.removeOwnPropertyChangeListener) {
        return object.removeOwnPropertyChangeListener(key, listener, beforeChange);
    } else {
        return PropertyChanges.prototype.removeOwnPropertyChangeListener.call(object, key, listener, beforeChange);
    }
};

PropertyChanges.dispatchOwnPropertyChange = function (object, key, value, beforeChange) {
    if (!Object.isObject(object)) {
    } else if (object.dispatchOwnPropertyChange) {
        return object.dispatchOwnPropertyChange(key, value, beforeChange);
    } else {
        return PropertyChanges.prototype.dispatchOwnPropertyChange.call(object, key, value, beforeChange);
    }
};

PropertyChanges.addBeforeOwnPropertyChangeListener = function (object, key, listener) {
    return PropertyChanges.addOwnPropertyChangeListener(object, key, listener, true);
};

PropertyChanges.removeBeforeOwnPropertyChangeListener = function (object, key, listener) {
    return PropertyChanges.removeOwnPropertyChangeListener(object, key, listener, true);
};

PropertyChanges.dispatchBeforeOwnPropertyChange = function (object, key, value) {
    return PropertyChanges.dispatchOwnPropertyChange(object, key, value, true);
};

PropertyChanges.makePropertyObservable = function (object, key) {
    if (object.makePropertyObservable) {
        return object.makePropertyObservable(key);
    } else {
        return PropertyChanges.prototype.makePropertyObservable.call(object, key);
    }
};


/***/ }),
/* 114 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/collections/listen/range-changes.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//TODO:
// Remove Dict and use native Map as much as possible here
//Use ObjectChangeDescriptor to avoid creating useless arrays and benefit from similar gains made in property-changes


var WeakMap = __webpack_require__(/*! weak-map */ 53),
    Map = __webpack_require__(/*! ../_map */ 56),
    ChangeDescriptor = __webpack_require__(/*! ./change-descriptor */ 72),
    ObjectChangeDescriptor = ChangeDescriptor.ObjectChangeDescriptor,
    ChangeListenersRecord = ChangeDescriptor.ChangeListenersRecord,
    ListenerGhost = ChangeDescriptor.ListenerGhost;

var rangeChangeDescriptors = new WeakMap(); // {isActive, willChangeListeners, changeListeners}


//
function RangeChangeDescriptor(name) {
    this.name = name;
    this.isActive = false;
    this._willChangeListeners = null;
    this._changeListeners = null;
};

RangeChangeDescriptor.prototype = new ObjectChangeDescriptor();
RangeChangeDescriptor.prototype.constructor = RangeChangeDescriptor;

RangeChangeDescriptor.prototype.changeListenersRecordConstructor = RangeChangeListenersRecord;
RangeChangeDescriptor.prototype.willChangeListenersRecordConstructor = RangeWillChangeListenersRecord;
Object.defineProperty(RangeChangeDescriptor.prototype,"active",{
    get: function() {
        return this._active || (this._active = this._current ? this._current.slice():[]);
    }
});


var RangeChangeListenersSpecificHandlerMethodName = new Map();

function RangeChangeListenersRecord(name) {
    var specificHandlerMethodName = RangeChangeListenersSpecificHandlerMethodName.get(name);
    if(!specificHandlerMethodName) {
        specificHandlerMethodName = "handle";
        specificHandlerMethodName += name.slice(0, 1).toUpperCase();
        specificHandlerMethodName += name.slice(1);
        specificHandlerMethodName += "RangeChange";
        RangeChangeListenersSpecificHandlerMethodName.set(name,specificHandlerMethodName);
    }
    this.specificHandlerMethodName = specificHandlerMethodName;
	return this;
}
RangeChangeListenersRecord.prototype = new ChangeListenersRecord();
RangeChangeListenersRecord.prototype.constructor = RangeChangeListenersRecord;

var RangeWillChangeListenersSpecificHandlerMethodName = new Map();

function RangeWillChangeListenersRecord(name) {
    var specificHandlerMethodName = RangeWillChangeListenersSpecificHandlerMethodName.get(name);
    if(!specificHandlerMethodName) {
        specificHandlerMethodName = "handle";
        specificHandlerMethodName += name.slice(0, 1).toUpperCase();
        specificHandlerMethodName += name.slice(1);
        specificHandlerMethodName += "RangeWillChange";
        RangeWillChangeListenersSpecificHandlerMethodName.set(name,specificHandlerMethodName);
    }
    this.specificHandlerMethodName = specificHandlerMethodName;
    return this;
}
RangeWillChangeListenersRecord.prototype = new ChangeListenersRecord();
RangeWillChangeListenersRecord.prototype.constructor = RangeWillChangeListenersRecord;

module.exports = RangeChanges;
function RangeChanges() {
    throw new Error("Can't construct. RangeChanges is a mixin.");
}

RangeChanges.prototype.getAllRangeChangeDescriptors = function () {
    if (!rangeChangeDescriptors.has(this)) {
        rangeChangeDescriptors.set(this, new Map());
    }
    return rangeChangeDescriptors.get(this);
};

RangeChanges.prototype.getRangeChangeDescriptor = function (token) {
    var tokenChangeDescriptors = this.getAllRangeChangeDescriptors();
    token = token || "";
    if (!tokenChangeDescriptors.has(token)) {
        tokenChangeDescriptors.set(token, new RangeChangeDescriptor(token));
    }
    return tokenChangeDescriptors.get(token);
};

var ObjectsDispatchesRangeChanges = new WeakMap(),
    dispatchesRangeChangesGetter = function() {
        return ObjectsDispatchesRangeChanges.get(this);
    },
    dispatchesRangeChangesSetter = function(value) {
        return ObjectsDispatchesRangeChanges.set(this,value);
    },
    dispatchesChangesMethodName = "dispatchesRangeChanges",
    dispatchesChangesPropertyDescriptor = {
        get: dispatchesRangeChangesGetter,
        set: dispatchesRangeChangesSetter,
        configurable: true,
        enumerable: false
    };

RangeChanges.prototype.addRangeChangeListener = function addRangeChangeListener(listener, token, beforeChange) {
    // a concession for objects like Array that are not inherently observable
    if (!this.isObservable && this.makeObservable) {
        this.makeObservable();
    }

    var descriptor = this.getRangeChangeDescriptor(token);

    var listeners;
    if (beforeChange) {
        listeners = descriptor.willChangeListeners;
    } else {
        listeners = descriptor.changeListeners;
    }

    // even if already registered
    if(!listeners._current) {
        listeners._current = listener;
    }
    else if(!Array.isArray(listeners._current)) {
        listeners._current = [listeners._current,listener]
    }
    else {
        listeners._current.push(listener);
    }

    if(Object.getOwnPropertyDescriptor((this.__proto__||Object.getPrototypeOf(this)),dispatchesChangesMethodName) === void 0) {
        Object.defineProperty((this.__proto__||Object.getPrototypeOf(this)), dispatchesChangesMethodName, dispatchesChangesPropertyDescriptor);
    }
    this.dispatchesRangeChanges = true;

    var self = this;
    return function cancelRangeChangeListener() {
        if (!self) {
            // TODO throw new Error("Range change listener " + JSON.stringify(token) + " has already been canceled");
            return;
        }
        self.removeRangeChangeListener(listener, token, beforeChange);
        self = null;
    };
};


RangeChanges.prototype.removeRangeChangeListener = function (listener, token, beforeChange) {
    var descriptor = this.getRangeChangeDescriptor(token);

    var listeners;
    if (beforeChange) {
        listeners = descriptor._willChangeListeners;
    } else {
        listeners = descriptor._changeListeners;
    }

    if(listeners._current) {
        if(listeners._current === listener) {
            listeners._current = null;
        }
        else {
            var index = listeners._current.lastIndexOf(listener);
            if (index === -1) {
                throw new Error("Can't remove range change listener: does not exist: token " + JSON.stringify(token));
            }
            else {
                if(descriptor.isActive) {
                    listeners.ghostCount = listeners.ghostCount+1
                    listeners._current[index]=ListenerGhost
                }
                else {
                    listeners._current.spliceOne(index);
                }
            }
        }
    }

};

RangeChanges.prototype.dispatchRangeChange = function (plus, minus, index, beforeChange) {
    var descriptors = this.getAllRangeChangeDescriptors(),
        descriptor,
        mapIter  = descriptors.values(),
        listeners,
        tokenName,
        i,
        countI,
        listener,
        currentListeners,
        Ghost;

    descriptors.dispatchBeforeChange = beforeChange;

     while (descriptor = mapIter.next().value) {

        if (descriptor.isActive) {
            return;
        }

        // before or after
        listeners = beforeChange ? descriptor._willChangeListeners : descriptor._changeListeners;
        if(listeners && listeners._current) {
            tokenName = listeners.specificHandlerMethodName;
            if(Array.isArray(listeners._current)) {
                if(listeners._current.length) {
                    // notably, defaults to "handleRangeChange" or "handleRangeWillChange"
                    // if token is "" (the default)

                    descriptor.isActive = true;
                    // dispatch each listener
                    try {
                            //removeGostListenersIfNeeded returns listeners.current or a new filtered one when conditions are met
                            currentListeners = listeners.removeCurrentGostListenersIfNeeded();
                            Ghost = ListenerGhost;
                        for(i=0, countI = currentListeners.length;i<countI;i++) {
                            if ((listener = currentListeners[i]) !== Ghost) {
                                if (listener[tokenName]) {
                                    listener[tokenName](plus, minus, index, this, beforeChange);
                                } else if (listener.call) {
                                    listener.call(this, plus, minus, index, this, beforeChange);
                                } else {
                                    throw new Error("Handler " + listener + " has no method " + tokenName + " and is not callable");
                                }
                            }
                        }
                    } finally {
                        descriptor.isActive = false;
                    }
                }
            }
            else {
                descriptor.isActive = true;
                // dispatch each listener
                try {
                    listener = listeners._current;
                    if (listener[tokenName]) {
                        listener[tokenName](plus, minus, index, this, beforeChange);
                    } else if (listener.call) {
                        listener.call(this, plus, minus, index, this, beforeChange);
                    } else {
                        throw new Error("Handler " + listener + " has no method " + tokenName + " and is not callable");
                    }
                } finally {
                    descriptor.isActive = false;
                }

            }
        }

    }
};

RangeChanges.prototype.addBeforeRangeChangeListener = function (listener, token) {
    return this.addRangeChangeListener(listener, token, true);
};

RangeChanges.prototype.removeBeforeRangeChangeListener = function (listener, token) {
    return this.removeRangeChangeListener(listener, token, true);
};

RangeChanges.prototype.dispatchBeforeRangeChange = function (plus, minus, index) {
    return this.dispatchRangeChange(plus, minus, index, true);
};


/***/ }),
/* 115 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/collections/shim-array.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
    Based in part on extras from Motorola Mobility’s Montage
    Copyright (c) 2012, Motorola Mobility LLC. All Rights Reserved.
    3-Clause BSD License
    https://github.com/motorola-mobility/montage/blob/master/LICENSE.md
*/

var Function = __webpack_require__(/*! ./shim-function */ 116);
var GenericCollection = __webpack_require__(/*! ./generic-collection */ 30);
var GenericOrder = __webpack_require__(/*! ./generic-order */ 109);
var WeakMap = __webpack_require__(/*! weak-map */ 53);

module.exports = Array;

var array_splice = Array.prototype.splice;
var array_slice = Array.prototype.slice;

Array.empty = [];

if (Object.freeze) {
    Object.freeze(Array.empty);
}

Array.from = function (values) {
    var array = [];
    array.addEach(values);
    return array;
};

Array.unzip = function (table) {
    var transpose = [];
    var length = Infinity;
    // compute shortest row
    for (var i = 0; i < table.length; i++) {
        var row = table[i];
        table[i] = row.toArray();
        if (row.length < length) {
            length = row.length;
        }
    }
    for (var i = 0; i < table.length; i++) {
        var row = table[i];
        for (var j = 0; j < row.length; j++) {
            if (j < length && j in row) {
                transpose[j] = transpose[j] || [];
                transpose[j][i] = row[j];
            }
        }
    }
    return transpose;
};

function define(key, value) {
    Object.defineProperty(Array.prototype, key, {
        value: value,
        writable: true,
        configurable: true,
        enumerable: false
    });
}

define("addEach", GenericCollection.prototype.addEach);
define("deleteEach", GenericCollection.prototype.deleteEach);
define("toArray", GenericCollection.prototype.toArray);
define("toObject", GenericCollection.prototype.toObject);
define("all", GenericCollection.prototype.all);
define("any", GenericCollection.prototype.any);
define("min", GenericCollection.prototype.min);
define("max", GenericCollection.prototype.max);
define("sum", GenericCollection.prototype.sum);
define("average", GenericCollection.prototype.average);
define("only", GenericCollection.prototype.only);
define("flatten", GenericCollection.prototype.flatten);
define("zip", GenericCollection.prototype.zip);
define("enumerate", GenericCollection.prototype.enumerate);
define("group", GenericCollection.prototype.group);
define("sorted", GenericCollection.prototype.sorted);
define("reversed", GenericCollection.prototype.reversed);

define("constructClone", function (values) {
    var clone = new this.constructor();
    clone.addEach(values);
    return clone;
});

define("has", function (value, equals) {
    return this.find(value, equals) !== -1;
});

define("get", function (index, defaultValue) {
    if (+index !== index)
        throw new Error("Indicies must be numbers");
    if (!index in this) {
        return defaultValue;
    } else {
        return this[index];
    }
});

define("set", function (index, value) {
    this[index] = value;
    return true;
});

define("add", function (value) {
    this.push(value);
    return true;
});

define("delete", function (value, equals) {
    var index = this.find(value, equals);
    if (index !== -1) {
        this.spliceOne(index);
        return true;
    }
    return false;
});

define("deleteAll", function (value, equals) {
    equals = equals || this.contentEquals || Object.equals;
    var count = 0;
    for (var index = 0; index < this.length;) {
        if (equals(value, this[index])) {
            this.swap(index, 1);
            count++;
        } else {
            index++;
        }
    }
    return count;
});

define("find", function (value, equals) {
    equals = equals || this.contentEquals || Object.equals;
    for (var index = 0; index < this.length; index++) {
        if (index in this && equals(value, this[index])) {
            return index;
        }
    }
    return -1;
});

define("findLast", function (value, equals) {
    equals = equals || this.contentEquals || Object.equals;
    var index = this.length;
    do {
        index--;
        if (index in this && equals(this[index], value)) {
            return index;
        }
    } while (index > 0);
    return -1;
});

define("swap", function (start, length, plus) {
    var args, plusLength, i, j, returnValue;
    if (start > this.length) {
        this.length = start;
    }
    if (typeof plus !== "undefined") {
        args = [start, length];
        if (!Array.isArray(plus)) {
            plus = array_slice.call(plus);
        }
        i = 0;
        plusLength = plus.length;
        // 1000 is a magic number, presumed to be smaller than the remaining
        // stack length. For swaps this small, we take the fast path and just
        // use the underlying Array splice. We could measure the exact size of
        // the remaining stack using a try/catch around an unbounded recursive
        // function, but this would defeat the purpose of short-circuiting in
        // the common case.
        if (plusLength < 1000) {
            for (i; i < plusLength; i++) {
                args[i+2] = plus[i];
            }
            return array_splice.apply(this, args);
        } else {
            // Avoid maximum call stack error.
            // First delete the desired entries.
            returnValue = array_splice.apply(this, args);
            // Second batch in 1000s.
            for (i; i < plusLength;) {
                args = [start+i, 0];
                for (j = 2; j < 1002 && i < plusLength; j++, i++) {
                    args[j] = plus[i];
                }
                array_splice.apply(this, args);
            }
            return returnValue;
        }
    // using call rather than apply to cut down on transient objects
    } else if (typeof length !== "undefined") {
        return array_splice.call(this, start, length);
    }  else if (typeof start !== "undefined") {
        return array_splice.call(this, start);
    } else {
        return [];
    }
});

define("peek", function () {
    return this[0];
});

define("poke", function (value) {
    if (this.length > 0) {
        this[0] = value;
    }
});

define("peekBack", function () {
    if (this.length > 0) {
        return this[this.length - 1];
    }
});

define("pokeBack", function (value) {
    if (this.length > 0) {
        this[this.length - 1] = value;
    }
});

define("one", function () {
    for (var i in this) {
        if (Object.owns(this, i)) {
            return this[i];
        }
    }
});

if (!Array.prototype.clear) {
    define("clear", function () {
        this.length = 0;
        return this;
    });
}

define("compare", function (that, compare) {
    compare = compare || Object.compare;
    var i;
    var length;
    var lhs;
    var rhs;
    var relative;

    if (this === that) {
        return 0;
    }

    if (!that || !Array.isArray(that)) {
        return GenericOrder.prototype.compare.call(this, that, compare);
    }

    length = (this.length < that.length) ? this.length : that.length;

    for (i = 0; i < length; i++) {
        if (i in this) {
            if (!(i in that)) {
                return -1;
            } else {
                lhs = this[i];
                rhs = that[i];
                relative = compare(lhs, rhs);
                if (relative) {
                    return relative;
                }
            }
        } else if (i in that) {
            return 1;
        }
    }

    return this.length - that.length;
});

define("equals", function (that, equals) {
    equals = equals || Object.equals;
    var i = 0;
    var length = this.length;
    var left;
    var right;

    if (this === that) {
        return true;
    }
    if (!that || !Array.isArray(that)) {
        return GenericOrder.prototype.equals.call(this, that);
    }

    if (length !== that.length) {
        return false;
    } else {
        for (; i < length; ++i) {
            if (i in this) {
                if (!(i in that)) {
                    return false;
                }
                left = this[i];
                right = that[i];
                if (!equals(left, right)) {
                    return false;
                }
            } else {
                if (i in that) {
                    return false;
                }
            }
        }
    }
    return true;
});

define("clone", function (depth, memo) {
    if (depth == null) {
        depth = Infinity;
    } else if (depth === 0) {
        return this;
    }
    memo = memo || new WeakMap();
    if (memo.has(this)) {
        return memo.get(this);
    }
    var clone = new Array(this.length);
    memo.set(this, clone);
    for (var i in this) {
        clone[i] = Object.clone(this[i], depth - 1, memo);
    };
    return clone;
});

define("iterate", function (start, end) {
    return new ArrayIterator(this, start, end);
});

if(Array.prototype.spliceOne === void 0) {
    define("spliceOne", function (index,itemToAdd) {
        var len=this.length;
        if (!len) { return }
        if(arguments.length === 1) {
            while (index<len) {
                this[index] = this[index+1];
                index++
            }
            this.length--;
        }
        else {
            this[index] = itemToAdd;
        }
    });
}

define("Iterator", ArrayIterator);

function ArrayIterator(array, start, end) {
    this.array = array;
    this.start = start == null ? 0 : start;
    this.end = end;
};
ArrayIterator.prototype.__iterationObject = null;
Object.defineProperty(ArrayIterator.prototype,"_iterationObject", {
    get: function() {
        return this.__iterationObject || (this.__iterationObject = { done: false, value:null});
    }
});

ArrayIterator.prototype.next = function () {
    if (this.start === (this.end == null ? this.array.length : this.end)) {
        this._iterationObject.done = true;
        this._iterationObject.value = void 0;
    } else {
        this._iterationObject.value = this.array[this.start++];
    }
    return this._iterationObject;
};


/***/ }),
/* 116 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/collections/shim-function.js ***!
  \****************************************/
/***/ (function(module, exports) {


module.exports = Function;

/**
    A utility to reduce unnecessary allocations of <code>function () {}</code>
    in its many colorful variations.  It does nothing and returns
    <code>undefined</code> thus makes a suitable default in some circumstances.

    @function external:Function.noop
*/
Function.noop = function () {
};

/**
    A utility to reduce unnecessary allocations of <code>function (x) {return
    x}</code> in its many colorful but ultimately wasteful parameter name
    variations.

    @function external:Function.identity
    @param {Any} any value
    @returns {Any} that value
*/
Function.identity = function (value) {
    return value;
};

/**
    A utility for creating a comparator function for a particular aspect of a
    figurative class of objects.

    @function external:Function.by
    @param {Function} relation A function that accepts a value and returns a
    corresponding value to use as a representative when sorting that object.
    @param {Function} compare an alternate comparator for comparing the
    represented values.  The default is <code>Object.compare</code>, which
    does a deep, type-sensitive, polymorphic comparison.
    @returns {Function} a comparator that has been annotated with
    <code>by</code> and <code>compare</code> properties so
    <code>sorted</code> can perform a transform that reduces the need to call
    <code>by</code> on each sorted object to just once.
 */
Function.by = function (by , compare) {
    compare = compare || Object.compare;
    by = by || Function.identity;
    var compareBy = function (a, b) {
        return compare(by(a), by(b));
    };
    compareBy.compare = compare;
    compareBy.by = by;
    return compareBy;
};

// TODO document
Function.get = function (key) {
    return function (object) {
        return Object.get(object, key);
    };
};



/***/ }),
/* 117 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_a-number-value.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 18);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 118 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_array-copy-within.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9)
  , toIndex  = __webpack_require__(/*! ./_to-index */ 43)
  , toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 119 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_array-from-iterable.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 46);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 120 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_array-reduce.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 11)
  , toObject  = __webpack_require__(/*! ./_to-object */ 9)
  , IObject   = __webpack_require__(/*! ./_iobject */ 51)
  , toLength  = __webpack_require__(/*! ./_to-length */ 8);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 121 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_bind.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(/*! ./_a-function */ 11)
  , isObject   = __webpack_require__(/*! ./_is-object */ 4)
  , invoke     = __webpack_require__(/*! ./_invoke */ 62)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 122 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_collection-strong.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(/*! ./_object-dp */ 7).f
  , create      = __webpack_require__(/*! ./_object-create */ 38)
  , redefineAll = __webpack_require__(/*! ./_redefine-all */ 41)
  , ctx         = __webpack_require__(/*! ./_ctx */ 25)
  , anInstance  = __webpack_require__(/*! ./_an-instance */ 36)
  , defined     = __webpack_require__(/*! ./_defined */ 19)
  , forOf       = __webpack_require__(/*! ./_for-of */ 46)
  , $iterDefine = __webpack_require__(/*! ./_iter-define */ 83)
  , step        = __webpack_require__(/*! ./_iter-step */ 128)
  , setSpecies  = __webpack_require__(/*! ./_set-species */ 42)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6)
  , fastKey     = __webpack_require__(/*! ./_meta */ 32).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 123 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_collection-to-json.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 50)
  , from    = __webpack_require__(/*! ./_array-from-iterable */ 119);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 124 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_collection-weak.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(/*! ./_redefine-all */ 41)
  , getWeak           = __webpack_require__(/*! ./_meta */ 32).getWeak
  , anObject          = __webpack_require__(/*! ./_an-object */ 1)
  , isObject          = __webpack_require__(/*! ./_is-object */ 4)
  , anInstance        = __webpack_require__(/*! ./_an-instance */ 36)
  , forOf             = __webpack_require__(/*! ./_for-of */ 46)
  , createArrayMethod = __webpack_require__(/*! ./_array-methods */ 21)
  , $has              = __webpack_require__(/*! ./_has */ 10)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 125 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_ie8-dom-define.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 6) && !__webpack_require__(/*! ./_fails */ 3)(function(){
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 75)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 126 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_is-integer.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 127 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iter-call.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 128 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iter-step.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 129 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-log1p.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 130 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_object-assign.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(/*! ./_object-keys */ 40)
  , gOPS     = __webpack_require__(/*! ./_object-gops */ 66)
  , pIE      = __webpack_require__(/*! ./_object-pie */ 52)
  , toObject = __webpack_require__(/*! ./_to-object */ 9)
  , IObject  = __webpack_require__(/*! ./_iobject */ 51)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 131 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-dps.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(/*! ./_object-dp */ 7)
  , anObject = __webpack_require__(/*! ./_an-object */ 1)
  , getKeys  = __webpack_require__(/*! ./_object-keys */ 40);

module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 132 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_object-gopn-ext.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15)
  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 39).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 133 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_object-keys-internal.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(/*! ./_has */ 10)
  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 15)
  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 58)(false)
  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 88)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 134 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_object-to-array.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(/*! ./_object-keys */ 40)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 15)
  , isEnum    = __webpack_require__(/*! ./_object-pie */ 52).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 135 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_own-keys.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(/*! ./_object-gopn */ 39)
  , gOPS     = __webpack_require__(/*! ./_object-gops */ 66)
  , anObject = __webpack_require__(/*! ./_an-object */ 1)
  , Reflect  = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 136 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_parse-float.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat
  , $trim       = __webpack_require__(/*! ./_string-trim */ 49).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 93) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 137 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_parse-int.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt
  , $trim     = __webpack_require__(/*! ./_string-trim */ 49).trim
  , ws        = __webpack_require__(/*! ./_string-ws */ 93)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 138 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_same-value.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 139 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_string-pad.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 8)
  , repeat   = __webpack_require__(/*! ./_string-repeat */ 92)
  , defined  = __webpack_require__(/*! ./_defined */ 19);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 140 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_wks-ext.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);

/***/ }),
/* 141 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/es6.map.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 122);

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 59)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 142 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.flags.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(/*! ./_descriptors */ 6) && /./g.flags != 'g')__webpack_require__(/*! ./_object-dp */ 7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 61)
});

/***/ }),
/* 143 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/es6.set.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 122);

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 59)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 144 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.weak-map.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(/*! ./_array-methods */ 21)(0)
  , redefine     = __webpack_require__(/*! ./_redefine */ 13)
  , meta         = __webpack_require__(/*! ./_meta */ 32)
  , assign       = __webpack_require__(/*! ./_object-assign */ 130)
  , weak         = __webpack_require__(/*! ./_collection-weak */ 124)
  , isObject     = __webpack_require__(/*! ./_is-object */ 4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 59)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 145 */
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! pixi */ 99);

__webpack_require__(/*! p2 */ 100);

var _phaser = __webpack_require__(/*! phaser */ 29);

var _phaser2 = _interopRequireDefault(_phaser);

var _Boot = __webpack_require__(/*! ./states/pregame/Boot */ 192);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./states/pregame/Splash */ 193);

var _Splash2 = _interopRequireDefault(_Splash);

var _Play = __webpack_require__(/*! ./states/Play */ 190);

var _Play2 = _interopRequireDefault(_Play);

var _GameOver = __webpack_require__(/*! ./states/GameOver */ 188);

var _GameOver2 = _interopRequireDefault(_GameOver);

var _Start = __webpack_require__(/*! ./states/Start */ 191);

var _Start2 = _interopRequireDefault(_Start);

var _Instructions = __webpack_require__(/*! ./states/Instructions */ 189);

var _Instructions2 = _interopRequireDefault(_Instructions);

var _config = __webpack_require__(/*! ./config */ 35);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Description goes here
 */
var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  /**
   * Description goes here
   */
  function Game() {
    _classCallCheck(this, Game);

    var docElement = document.documentElement;
    var width = docElement.clientWidth > _config2.default.gameWidth ? _config2.default.gameWidth : docElement.clientWidth;
    var height = docElement.clientHeight > _config2.default.gameHeight ? _config2.default.gameHeight : docElement.clientHeight;

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, width, height, _phaser2.default.CANVAS, 'content', null));

    _this.state.add('Boot', _Boot2.default, false);
    _this.state.add('Splash', _Splash2.default, false);
    _this.state.add('Game', _Play2.default, false);
    _this.state.add('Start', _Start2.default, false);
    _this.state.add('Instructions', _Instructions2.default, false);
    _this.state.add('GameOver', _GameOver2.default, false);

    _this.state.start('Boot');
    return _this;
  }

  return Game;
}(_phaser2.default.Game);

window.game = new Game();

/***/ }),
/* 146 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/babel-polyfill/lib/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 392);

__webpack_require__(/*! regenerator-runtime/runtime */ 398);

__webpack_require__(/*! core-js/fn/regexp/escape */ 212);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 28)))

/***/ }),
/* 147 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./src/controllers/events/EventController.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventController = function () {
  function EventController() {
    _classCallCheck(this, EventController);

    this.events = new Map();

    this.addEvent('structureBuilt');
  }

  _createClass(EventController, [{
    key: 'addEvent',
    value: function addEvent(name) {
      this.events.set(name, []);
    }
  }, {
    key: 'addListener',
    value: function addListener(name, callback, context) {
      this.events.get(name).push({ callback: callback, context: context });
    }
  }, {
    key: 'event',
    value: function event(name) {
      var listeners = this.events.get(name);
      if (listeners != null) {
        for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var listener = _step.value;

            listener.callback.apply(listener.context, values);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }]);

  return EventController;
}();

exports.default = EventController;

/***/ }),
/* 148 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./src/controllers/events/GameEvents.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Game events class, finishes the game etc
 */
var GameEvents = function () {
  /**
  * Constructor
  * @param gameState gameState
  */
  function GameEvents(_ref) {
    var gameState = _ref.gameState,
        gameLength = _ref.gameLength;

    _classCallCheck(this, GameEvents);

    this.gameState = gameState;
    this.gameLength = gameLength;
  }

  /**
   * Check if game is over
   */


  _createClass(GameEvents, [{
    key: 'isGameOver',
    value: function isGameOver(timeEvent) {
      if (timeEvent.serialNumber >= this.gameLength) {
        this.finishGame();
      }
    }
    /**
     * Finish the game
     */

  }, {
    key: 'finishGame',
    value: function finishGame() {
      this.gameState.music.stop();
      this.gameState.state.state.start('GameOver', true, false, this.gameState.player.points, this.gameState.city.population);
    }
  }]);

  return GameEvents;
}();

exports.default = GameEvents;

/***/ }),
/* 149 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./src/controllers/events/time/GameTimerListener.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is a listener for the GameTimer object
 */
var GameTimerListener = function () {
  /**
   * @param {City} city
   * @param {Player} player
   * @param {MenuController} menuController
   * @param {TopBarController} topBarController
   * @param {GameEvents} gameEvents
   */
  function GameTimerListener(_ref) {
    var city = _ref.city,
        player = _ref.player,
        menuController = _ref.menuController,
        topBarController = _ref.topBarController,
        gameEvents = _ref.gameEvents;

    _classCallCheck(this, GameTimerListener);

    this.city = city;
    this.player = player;
    this.menuController = menuController;
    this.topBarController = topBarController;
    this.gameEvents = gameEvents;
  }

  /**
  * Calls all things that need to be updated after game timer call
  * @param {TimerEvent} timerEvent
  */


  _createClass(GameTimerListener, [{
    key: "onTimer",
    value: function onTimer(timerEvent) {
      var producedTurnips = this.countProductionFromStructures(timerEvent);
      this.doTransaction(producedTurnips, timerEvent);

      this.checkBuildingRuining(timerEvent);

      this.redrawControllers
      // is game over?
      ();this.gameEvents.isGameOver(timerEvent);
    }

    /**
     * Goes through given structures and sums yearly and weekly productions
     * @param {Structure[]} structures
     * @param {TimerEvent} timerEvent
     */

  }, {
    key: "countProductionFromStructures",
    value: function countProductionFromStructures(timerEvent) {
      var sum = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.player.structures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var structure = _step.value;

          var amount = structure.produce(timerEvent
          // console.log(structure.structureName + ' ' + amount)
          );sum += amount;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return sum;
    }
  }, {
    key: "checkBuildingRuining",
    value: function checkBuildingRuining(timerEvent) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.player.structures[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var structure = _step2.value;

          structure.healthManager.checkRuin(timerEvent);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /**
     * Handles the transaction between city and the player
     * @param {number} producedTurnips
     * @param {boolean} buyYearlyHarvest
     */

  }, {
    key: "doTransaction",
    value: function doTransaction(producedTurnips, timerEvent) {
      var money = this.city.buyTurnips(producedTurnips, timerEvent.endOfYear);
      this.player.addPoints(money);
      this.player.cash += money;
    }

    /**
     * Redraws top bar and menu controllers
     */

  }, {
    key: "redrawControllers",
    value: function redrawControllers() {
      this.topBarController.redraw();
      this.menuController.redraw();
    }
  }]);

  return GameTimerListener;
}();

exports.default = GameTimerListener;

/***/ }),
/* 150 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./src/controllers/events/time/TimeEvent.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimeEvent = function () {
  function TimeEvent(_ref) {
    var callTime = _ref.callTime;

    _classCallCheck(this, TimeEvent);

    this.serialNumber = callTime;
    this.week = this.serialNumber % 4 + 1;
    this.month = Math.floor(this.serialNumber / 4) % 12 + 1;
    this.year = Math.floor(this.serialNumber / 48) + 1980;
    this.endOfYear = this.month === 12 && this.week === 4;
  }

  _createClass(TimeEvent, [{
    key: 'toString',
    value: function toString() {
      if (this.month > 9) {
        return this.year + ' / ' + this.month + ' / ' + this.week;
      } else {
        return this.year + ' / 0' + this.month + ' / ' + this.week;
      }
    }
  }]);

  return TimeEvent;
}();

exports.default = TimeEvent;

/***/ }),
/* 151 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./src/controllers/events/time/Timer.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TimeEvent = __webpack_require__(/*! ./TimeEvent */ 150);

var _TimeEvent2 = _interopRequireDefault(_TimeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
  /**
   * @param {string} name
   * @param {number} interval in millis
   * @param {number} currentTime in millis
   */
  function Timer(_ref) {
    var name = _ref.name,
        interval = _ref.interval,
        currentTime = _ref.currentTime;

    _classCallCheck(this, Timer);

    if (name == null) {
      this.name = '';
    } else {
      this.name = name;
    }

    this.interval = interval;
    this.lastTime = currentTime;
    this.callTime = 0;
    this.currentTimeEvent = null;
    this.listeners = new Set();
  }

  /**
   * Adds new listener to be called when timer updates
   *
   * @param {*} listener
   */


  _createClass(Timer, [{
    key: 'addListener',
    value: function addListener(listener) {
      this.listeners.add(listener);
    }

    /**
     * Removes listener from listeners
     *
     * @param {*} listener
    */

  }, {
    key: 'removeListener',
    value: function removeListener(listener) {
      this.listeners.delete(listener);
    }

    /**
     * Checks if enough time has passed for timer update, and if it has, updates
     *
     * @param {number} currentTime
     */

  }, {
    key: 'update',
    value: function update(currentTime) {
      if (currentTime - this.lastTime >= this.interval) {
        this.callTime++;
        this.callListeners();
        this.lastTime = currentTime;
      }
    }

    /**
     * Helper method for calling all of the listeners
     */

  }, {
    key: 'callListeners',
    value: function callListeners() {
      this.currentTimeEvent = this.createTimeEvent();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listener = _step.value;

          var method = listener['on' + this.name + 'Timer'];
          method.call(listener, this.currentTimeEvent);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Function that creates the time event to be given to listeners
     *
     * @return {{time: number, year: number}}
     */

  }, {
    key: 'createTimeEvent',
    value: function createTimeEvent() {
      return new _TimeEvent2.default({ callTime: this.callTime });
    }
  }]);

  return Timer;
}();

exports.default = Timer;

/***/ }),
/* 152 */
/* no static exports found */
/* all exports used */
/*!***************************************************************!*\
  !*** ./src/controllers/menucontrol/MulticontentController.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Controller2 = __webpack_require__(/*! ./Controller */ 69);

var _Controller3 = _interopRequireDefault(_Controller2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Controller that has multiple different content creators it can switch between
 */
var MulticontentController = function (_Controller) {
  _inherits(MulticontentController, _Controller);

  function MulticontentController(_ref) {
    var game = _ref.game,
        style = _ref.style,
        menuView = _ref.menuView,
        contents = _ref.contents,
        startIndex = _ref.startIndex;

    _classCallCheck(this, MulticontentController);

    var _this = _possibleConstructorReturn(this, (MulticontentController.__proto__ || Object.getPrototypeOf(MulticontentController)).call(this, game, style, menuView));

    _this.contents = contents;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.contents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var content = _step.value;

        content.setOwner(_this);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    _this.startIndex = startIndex != null ? startIndex : 0;
    _this.index = _this.startIndex;

    _this.getStack = [];
    return _this;
  }

  /**
   * Draws the section with the currently chosen content creator. If user has
   * moved to the current content from some other content, "Back"-button is
   * created
   */


  _createClass(MulticontentController, [{
    key: 'createSections',
    value: function createSections() {
      this.contents[this.index].createSections();

      if (this.getStack.length > 0) {
        this.section('back');
        this.button('Takaisin', this.previousContent, this);
      }
    }

    /**
     * The content creator currently active
     */

  }, {
    key: 'current',
    value: function current() {
      return this.contents[this.index];
    }

    /**
     * Rechooses the previous content creator
     */

  }, {
    key: 'previousContent',
    value: function previousContent() {
      this.index = this.getStack.pop();
      this.redraw();
    }

    /**
     * Chooses a new content creator and saves the change
     */

  }, {
    key: 'changeContent',
    value: function changeContent(index) {
      this.getStack.push(this.index);
      this.index = index;
      this.redraw();
    }
  }, {
    key: 'setContent',
    value: function setContent(index) {
      this.index = index;
      this.redraw();
    }

    /**
     * Creates a button that changes the current content creator to the given
     *
     * @param {*} name text in the button
     * @param {*} index the index of the content
     * @param {*} extraFunction function that is called before the change
     * @param {*} context context of the extra function
     */

  }, {
    key: 'changeButton',
    value: function changeButton(name, index, extraFunction, context) {
      var _this2 = this;

      this.button(name, function (index, extraFunction, context) {
        return function () {
          if (extraFunction != null) {
            extraFunction.call(context);
          }
          _this2.changeContent(index);
        };
      }(index, extraFunction, context), this);
    }

    /**
     * Resets the content change stack and also resets the whole controller
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.index = this.startIndex;
      this.getStack = [];

      _get(MulticontentController.prototype.__proto__ || Object.getPrototypeOf(MulticontentController.prototype), 'reset', this).call(this);
    }
  }]);

  return MulticontentController;
}(_Controller3.default);

exports.default = MulticontentController;

/***/ }),
/* 153 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./src/controllers/menucontrol/SingleController.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Controller2 = __webpack_require__(/*! ./Controller */ 69);

var _Controller3 = _interopRequireDefault(_Controller2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Simple controller that has only one content
 */
var SingleController = function (_Controller) {
  _inherits(SingleController, _Controller);

  function SingleController(_ref) {
    var game = _ref.game,
        style = _ref.style,
        menuView = _ref.menuView,
        content = _ref.content;

    _classCallCheck(this, SingleController);

    var _this = _possibleConstructorReturn(this, (SingleController.__proto__ || Object.getPrototypeOf(SingleController)).call(this, game, style, menuView));

    _this.content = content;
    _this.content.setOwner(_this);
    return _this;
  }

  /**
   * Makes the content create the content of a menu
   */


  _createClass(SingleController, [{
    key: 'createSections',
    value: function createSections() {
      this.content.createSections();
    }
  }]);

  return SingleController;
}(_Controller3.default);

exports.default = SingleController;

/***/ }),
/* 154 */
/* no static exports found */
/* all exports used */
/*!************************************************************************!*\
  !*** ./src/controllers/menucontrol/components/AnimatedBarComponent.js ***!
  \************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimatedBarComponent = function AnimatedBarComponent(_ref) {
  var width = _ref.width,
      height = _ref.height,
      vertical = _ref.vertical,
      percent = _ref.percent;

  _classCallCheck(this, AnimatedBarComponent);

  this.type = 'bar';
  this.vertical = vertical;
  this.height = height;
  this.width = width;
  this.percent = percent;
};

exports.default = AnimatedBarComponent;

/***/ }),
/* 155 */
/* no static exports found */
/* all exports used */
/*!*******************************************************************!*\
  !*** ./src/controllers/menucontrol/components/ButtonComponent.js ***!
  \*******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Description goes here
 */
var ButtonComponent =
/**
 * Description goes here
 *
 * @param {object} param
 * @param {string} param.name
 * @param {function} param.functionToCall
 * @param {???} param.context
 */
function ButtonComponent(_ref) {
  var name = _ref.name,
      functionToCall = _ref.functionToCall,
      context = _ref.context,
      height = _ref.height,
      width = _ref.width,
      fontSize = _ref.fontSize,
      asset = _ref.asset;

  _classCallCheck(this, ButtonComponent);

  this.type = 'button';
  this.name = name;
  this.function = functionToCall;
  this.context = context;
  this.height = height;
  this.width = width;
  this.fontSize = fontSize;
  this.asset = asset;
};

exports.default = ButtonComponent;

/***/ }),
/* 156 */
/* no static exports found */
/* all exports used */
/*!*****************************************************************!*\
  !*** ./src/controllers/menucontrol/components/IconComponent.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IconComponent = function IconComponent(_ref) {
  var asset = _ref.asset,
      assetHeight = _ref.assetHeight,
      assetWidth = _ref.assetWidth;

  _classCallCheck(this, IconComponent);

  this.type = 'icon';
  this.asset = asset;
  this.height = assetHeight;
  this.width = assetWidth;
};

exports.default = IconComponent;

/***/ }),
/* 157 */
/* no static exports found */
/* all exports used */
/*!***************************************************************!*\
  !*** ./src/controllers/menucontrol/components/MenuSection.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuSection = function MenuSection(name) {
  _classCallCheck(this, MenuSection);

  this.name = name;
  this.components = [];
};

exports.default = MenuSection;

/***/ }),
/* 158 */
/* no static exports found */
/* all exports used */
/*!*****************************************************************!*\
  !*** ./src/controllers/menucontrol/components/TextComponent.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextComponent = function TextComponent(text, fontSize) {
  _classCallCheck(this, TextComponent);

  this.type = 'text';
  this.text = text;
  this.fontSize = fontSize;
  this.width = fontSize * text.length;
  this.height = fontSize;
};

exports.default = TextComponent;

/***/ }),
/* 159 */
/* no static exports found */
/* all exports used */
/*!***********************************************************************!*\
  !*** ./src/controllers/menucontrol/contents/BuildStructureContent.js ***!
  \***********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Content2 = __webpack_require__(/*! ./Content */ 54);

var _Content3 = _interopRequireDefault(_Content2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BuildStructureController = function (_Content) {
  _inherits(BuildStructureController, _Content);

  function BuildStructureController(_ref) {
    var player = _ref.player,
        structureFactory = _ref.structureFactory,
        purchaseManager = _ref.purchaseManager;

    _classCallCheck(this, BuildStructureController);

    var _this = _possibleConstructorReturn(this, (BuildStructureController.__proto__ || Object.getPrototypeOf(BuildStructureController)).call(this));

    _this.structureFactory = structureFactory;
    _this.purchaseManager = purchaseManager;

    _this.emptyFunction = function () {};
    return _this;
  }

  _createClass(BuildStructureController, [{
    key: 'createSections',
    value: function createSections() {
      this.sectionName('info');
      var stype = this.owner.stateValue('structureType');
      var tile = this.owner.stateValue('selectedTile');
      this.text('Type: ' + stype.name);
      if (!stype.refinery) {
        if (stype.continuousProduction) {
          this.text('Continuous production');
        } else {
          var text = 'Harvests: ';
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = stype.harvestingWeeks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var harvest = _step.value;

              text += harvest;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          this.text(text);
        }

        this.text('Yield: ' + stype.turnipYield);
      }
      this.text('Price: ' + stype.cost, 'large');

      this.section('build');
      if (this.purchaseManager.hasCash(stype.cost)) {
        this.owner.resetDecoratedButton('Build', null, this.structureFactory.buildBuilding, this.structureFactory, tile, stype);
      } else {
        this.button('Not enough money', this.emptyFunction, null, 'unusableButton');
      }
    }
  }]);

  return BuildStructureController;
}(_Content3.default);

exports.default = BuildStructureController;

/***/ }),
/* 160 */
/* no static exports found */
/* all exports used */
/*!*************************************************************!*\
  !*** ./src/controllers/menucontrol/contents/CityContent.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Content2 = __webpack_require__(/*! ./Content */ 54);

var _Content3 = _interopRequireDefault(_Content2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CityContent = function (_Content) {
  _inherits(CityContent, _Content);

  function CityContent(_ref) {
    var city = _ref.city,
        gameEvents = _ref.gameEvents;

    _classCallCheck(this, CityContent);

    var _this = _possibleConstructorReturn(this, (CityContent.__proto__ || Object.getPrototypeOf(CityContent)).call(this));

    _this.city = city;
    _this.gameEvents = gameEvents;
    return _this;
  }

  _createClass(CityContent, [{
    key: 'createSections',
    value: function createSections() {
      this.sectionName('city');
      this.text('City: ' + this.city.name);
      this.text('Population: ' + this.city.population);
      this.text('Yearly demand: ' + this.city.turnipDemand.yearDemand);
      this.text('Demand supplied: ' + this.format(this.city.turnipDemand.collectedSupply));
      this.text('Current turnip price: ' + this.format(this.city.turnipDemand.currentPrice(), 2));
      this.button('Lopeta', this.gameEvents.finishGame, this.gameEvents);
    }
  }]);

  return CityContent;
}(_Content3.default);

exports.default = CityContent;

/***/ }),
/* 161 */
/* no static exports found */
/* all exports used */
/*!*************************************************************!*\
  !*** ./src/controllers/menucontrol/contents/TileContent.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Content2 = __webpack_require__(/*! ./Content */ 54);

var _Content3 = _interopRequireDefault(_Content2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Controller of side menu of the game
 */
var SideMenuContent = function (_Content) {
  _inherits(SideMenuContent, _Content);

  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  function SideMenuContent(_ref) {
    var demandFunction = _ref.demandFunction,
        purchaseManager = _ref.purchaseManager,
        topBarController = _ref.topBarController;

    _classCallCheck(this, SideMenuContent);

    var _this = _possibleConstructorReturn(this, (SideMenuContent.__proto__ || Object.getPrototypeOf(SideMenuContent)).call(this));

    _this.demandFunction = demandFunction;
    _this.purchaseManager = purchaseManager;
    _this.topBarController = topBarController;

    _this.emptyFunction = function () {};
    return _this;
  }

  /**
   * Create blueprint of the menu's contents
   */


  _createClass(SideMenuContent, [{
    key: 'createSections',
    value: function createSections() {
      if (!this.owner.hasStateValue('selectedTile')) {
        return;
      }

      var tile = this.owner.stateValue('selectedTile');
      this.tileInformation(tile);

      if (tile.structure != null) {
        var structure = tile.structure;
        this.structureInformation(structure);
        this.structureRuining(structure);
      } else {
        this.createBuildingButtons(tile);
      }
    }
  }, {
    key: 'tileInformation',
    value: function tileInformation(tile) {
      this.sectionName('tile');
      this.text('Ground type: ' + tile.tileType.name);
      this.text('X: ' + tile.x + ', Y: ' + tile.y);
      this.text('Flowers: ' + tile.flowers);
      this.text('Moisture: ' + this.format(tile.moisture) + '%');
      this.text('Fertility: ' + this.format(tile.fertility) + '%');
      if (tile.owner != null) {
        this.text('Land owner: ' + tile.owner.ownerName);
      }
    }
  }, {
    key: 'structureInformation',
    value: function structureInformation(structure) {
      this.section('structure');
      this.text('"' + structure.ownerName + '"');
      this.text('"' + structure.structureName + '"');
      this.text('Structure: ' + structure.structureType.name);
      this.text('Founding year: ' + structure.foundingYear);
      this.text('Size: ' + structure.size);

      var turnipProduction = structure.turnipProduction();
      this.text('Production per time: ' + this.format(turnipProduction, 2));
      this.text('Money per time: ' + this.format(this.demandFunction.pay(turnipProduction), 2));
    }
  }, {
    key: 'structureRuining',
    value: function structureRuining(structure) {
      var _this2 = this;

      this.section('ruin');
      this.text('Structure health: ' + structure.health.toString());
      this.animatedBar(200, 50, false, structure.health.percent());
      this.text('Fix cost: ' + structure.healthManager.fixPrice());
      if (structure.health.percent() < 1 && this.purchaseManager.hasCash(structure.healthManager.fixPrice())) {
        var fix = function (structure) {
          return function () {
            structure.healthManager.fix();
            _this2.owner.redraw();
            _this2.topBarController.redraw();
          };
        }(structure);
        this.button('Repair', fix, this, 'emptyButton');
      } else if (structure.health.percent() < 1 && !this.purchaseManager.hasCash(structure.healthManager.fixPrice())) {
        this.button('Not enough money', this.emptyFunction, null, 'unusableButton');
      } else {
        this.button('Perfect condition', this.emptyFunction, null, 'unusableButton');
      }
    }
  }, {
    key: 'createBuildingButtons',
    value: function createBuildingButtons(tile) {
      this.section('actions');

      var allowedStructures = tile.tileType.allowedStructures;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = allowedStructures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var structureType = _step.value;

          this.owner.changeButton(structureType.name, 2, this.owner.wrapFunction(this.owner.addState, this.owner, 'structureType', structureType), this);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return SideMenuContent;
}(_Content3.default);

exports.default = SideMenuContent;

/***/ }),
/* 162 */
/* no static exports found */
/* all exports used */
/*!***************************************************************!*\
  !*** ./src/controllers/menucontrol/contents/TopBarContent.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Content2 = __webpack_require__(/*! ./Content */ 54);

var _Content3 = _interopRequireDefault(_Content2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Controller for game's topbar
 */
var TopBarContent = function (_Content) {
  _inherits(TopBarContent, _Content);

  function TopBarContent(_ref) {
    var player = _ref.player,
        city = _ref.city,
        timer = _ref.timer;

    _classCallCheck(this, TopBarContent);

    var _this = _possibleConstructorReturn(this, (TopBarContent.__proto__ || Object.getPrototypeOf(TopBarContent)).call(this));

    _this.player = player;
    _this.city = city;
    _this.timer = timer;
    return _this;
  }

  /**
   * Creates the blueprint of the topBar
   */


  _createClass(TopBarContent, [{
    key: 'createSections',
    value: function createSections() {
      this.sectionName('time');
      this.icon('time');
      this.text(this.timer.currentTimeEvent.toString(), 'small');

      this.section('points');
      this.icon('score');
      this.text('' + this.format(this.player.points));

      this.section('money');
      this.icon('cash');
      this.text('' + this.format(this.player.cash));

      this.section('demand');
      this.icon('turnip');
      this.animatedBar(100, 40, false, this.city.turnipDemand.percentageSupplied());
    }
  }]);

  return TopBarContent;
}(_Content3.default);

exports.default = TopBarContent;

/***/ }),
/* 163 */
/* no static exports found */
/* all exports used */
/*!***************************************************************!*\
  !*** ./src/controllers/menucontrol/helpers/ResetDecorator.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles resetting the menu for the true action
 */
var ResetDecorator = function () {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param { ??? } param.action
   * @param {Menu} param.menu
   */
  function ResetDecorator(_ref) {
    var action = _ref.action,
        controller = _ref.controller;

    _classCallCheck(this, ResetDecorator);

    this.action = action;
    this.controller = controller;
  }

  /**
   * Description goes here
   */


  _createClass(ResetDecorator, [{
    key: "act",
    value: function act() {
      this.action.function.call(this.action.context);
      this.controller.reset();
    }
  }]);

  return ResetDecorator;
}();

exports.default = ResetDecorator;

/***/ }),
/* 164 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./src/game/GameState.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(/*! ../config */ 35);

var _config2 = _interopRequireDefault(_config);

var _MapGenerator = __webpack_require__(/*! ../models/map/MapGenerator */ 170);

var _MapGenerator2 = _interopRequireDefault(_MapGenerator);

var _Player = __webpack_require__(/*! ./Player */ 165);

var _Player2 = _interopRequireDefault(_Player);

var _City = __webpack_require__(/*! ../models/city/City */ 167);

var _City2 = _interopRequireDefault(_City);

var _StructureFactory = __webpack_require__(/*! ../models/structure/StructureFactory */ 180);

var _StructureFactory2 = _interopRequireDefault(_StructureFactory);

var _PurchaseManager = __webpack_require__(/*! ../models/PurchaseManager */ 166);

var _PurchaseManager2 = _interopRequireDefault(_PurchaseManager);

var _TileFinder = __webpack_require__(/*! ../models/map/TileFinder */ 173);

var _TileFinder2 = _interopRequireDefault(_TileFinder);

var _MapView = __webpack_require__(/*! ../view/map/MapView */ 197);

var _MapView2 = _interopRequireDefault(_MapView);

var _MenuView = __webpack_require__(/*! ../view/menu/MenuView */ 103);

var _MenuView2 = _interopRequireDefault(_MenuView);

var _CameraMover = __webpack_require__(/*! ../view/CameraMover */ 194);

var _CameraMover2 = _interopRequireDefault(_CameraMover);

var _MapListener = __webpack_require__(/*! ../view/MapListener */ 196);

var _MapListener2 = _interopRequireDefault(_MapListener);

var _InputHandler = __webpack_require__(/*! ../view/InputHandler */ 195);

var _InputHandler2 = _interopRequireDefault(_InputHandler);

var _EventController = __webpack_require__(/*! ../controllers/events/EventController */ 147);

var _EventController2 = _interopRequireDefault(_EventController);

var _GameEvents = __webpack_require__(/*! ../controllers/events/GameEvents */ 148);

var _GameEvents2 = _interopRequireDefault(_GameEvents);

var _GameTimerListener = __webpack_require__(/*! ../controllers/events/time/GameTimerListener */ 149);

var _GameTimerListener2 = _interopRequireDefault(_GameTimerListener);

var _Timer = __webpack_require__(/*! ../controllers/events/time/Timer */ 151);

var _Timer2 = _interopRequireDefault(_Timer);

var _TopBarContent = __webpack_require__(/*! ../controllers/menucontrol/contents/TopBarContent */ 162);

var _TopBarContent2 = _interopRequireDefault(_TopBarContent);

var _TileContent = __webpack_require__(/*! ../controllers/menucontrol/contents/TileContent */ 161);

var _TileContent2 = _interopRequireDefault(_TileContent);

var _CityContent = __webpack_require__(/*! ../controllers/menucontrol/contents/CityContent */ 160);

var _CityContent2 = _interopRequireDefault(_CityContent);

var _BuildStructureContent = __webpack_require__(/*! ../controllers/menucontrol/contents/BuildStructureContent */ 159);

var _BuildStructureContent2 = _interopRequireDefault(_BuildStructureContent);

var _SingleController = __webpack_require__(/*! ../controllers/menucontrol/SingleController */ 153);

var _SingleController2 = _interopRequireDefault(_SingleController);

var _MulticontentController = __webpack_require__(/*! ../controllers/menucontrol/MulticontentController */ 152);

var _MulticontentController2 = _interopRequireDefault(_MulticontentController);

var _StackingLayout = __webpack_require__(/*! ../view/menu/layouts/StackingLayout */ 106);

var _StackingLayout2 = _interopRequireDefault(_StackingLayout);

var _StaticLayout = __webpack_require__(/*! ../view/menu/layouts/StaticLayout */ 199);

var _StaticLayout2 = _interopRequireDefault(_StaticLayout);

var _Style = __webpack_require__(/*! ../view/menu/Style */ 104);

var _Style2 = _interopRequireDefault(_Style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Description goes here
 */
var GameState = function () {
  /**
   * @param {Phaser.Game} param.state - Current game
   * @param {Number} param.mapWidth - Map width in # of tiles
   * @param {Number} param.mapHeight - Map height in # of tiles
   * @param {Number} param.tileWidth - Tile width in pixels
   * @param {Number} param.tileHeight - Tile height in pixels
   * @param {Number} param.menuWidth - Menu width in pixels
   */
  function GameState(_ref) {
    var cityName = _ref.cityName,
        perlinNoise = _ref.perlinNoise,
        startMoney = _ref.startMoney,
        state = _ref.state,
        mapSize = _ref.mapSize,
        tileSize = _ref.tileSize,
        menuWidth = _ref.menuWidth,
        gameLength = _ref.gameLength;

    _classCallCheck(this, GameState);

    this.state = state;

    state.world.setBounds(0, 0, mapSize.width * tileSize.width + menuWidth, mapSize.height * tileSize.height);

    this.initializeModel(cityName, perlinNoise, gameLength, startMoney, mapSize, tileSize);
    this.initializeView();
    this.initializeControllers();

    this.mapListener = new _MapListener2.default({
      game: state,
      map: this.map,
      menuController: this.menuController
    });

    this.mapView = new _MapView2.default({
      game: state,
      map: this.map,
      menuController: this.menuController,
      viewWidthPx: state.game.width - menuWidth,
      viewHeightPx: state.game.height
    });

    this.inputHandler = new _InputHandler2.default({
      game: state,
      mapListener: this.mapListener,
      cameraMover: this.cameraMover,
      mapView: this.mapView
    });

    this.gameTimerListener = new _GameTimerListener2.default({
      city: this.city,
      player: this.player,
      menuController: this.menuController,
      topBarController: this.topBarController,
      gameEvents: this.gameEvents
    });

    this.gameTimer.addListener(this.gameTimerListener);

    this.gameTimer.callListeners();
  }

  _createClass(GameState, [{
    key: 'initializeModel',
    value: function initializeModel(cityName, perlinNoise, gameLength, startMoney, mapSize, tileSize) {
      this.eventController = new _EventController2.default();

      var mapGenerator = new _MapGenerator2.default({
        mapSize: mapSize,
        tileSize: tileSize,
        generatingSettings: _config2.default.generatingSettings,
        perlinNoise: perlinNoise,
        noiseSettings: _config2.default.noise
      });
      this.map = mapGenerator.generateMap();

      this.tileFinder = new _TileFinder2.default({
        map: this.map,
        multipliers: _config2.default.moveCosts
      });

      this.player = new _Player2.default({ startMoney: startMoney });
      this.purchaseManager = new _PurchaseManager2.default({ player: this.player });
      this.city = new _City2.default({
        name: cityName,
        startPopulation: _config2.default.cityInitialPopulation,
        popularityPct: _config2.default.cityDemandMultiplier,
        demandRandomVariance: _config2.default.cityDemandRandomVariance,
        startPrice: _config2.default.startTurnipPrice,
        increaseAtOne: _config2.default.populationChangeAt100,
        increaseAtTwo: _config2.default.populationChangeAt200
      });

      this.gameTimer = new _Timer2.default({
        interval: _config2.default.gameTimerInterval,
        currentTime: this.currentTime()
      });

      this.structureFactory = new _StructureFactory2.default({
        tileFinder: this.tileFinder,
        gameTimer: this.gameTimer,
        player: this.player,
        eventController: this.eventController,
        purchaseManager: this.purchaseManager,
        map: this.map,
        ruinSettings: _config2.default.ruinSettings
      });

      this.gameEvents = new _GameEvents2.default({
        gameState: this,
        gameLength: gameLength
      });

      this.music = this.state.add.audio('music');
      this.music.play();
      this.music.loopFull();
    }
  }, {
    key: 'initializeView',
    value: function initializeView() {
      this.menuView = new _MenuView2.default({
        game: this.state,
        layout: new _StackingLayout2.default({
          menuRect: {
            x: this.state.camera.width - _config2.default.menuWidth,
            y: 0,
            width: _config2.default.menuWidth,
            height: this.state.camera.height
          },
          linePadding: _config2.default.linePadding,
          sectionPadding: _config2.default.sectionPadding,
          vertical: true
        }),
        background: 'menuBg'
      });

      this.topBarView = new _MenuView2.default({
        game: this.state,
        layout: new _StaticLayout2.default({
          menuRect: {
            x: 0,
            y: 0,
            width: this.state.camera.width - _config2.default.menuWidth,
            height: _config2.default.topBarSettings.height
          },
          linePadding: 5,
          vertical: false
        }),
        background: null
      });

      this.cameraMover = new _CameraMover2.default({
        game: this.state,
        xSpeed: _config2.default.cameraSpeed,
        ySpeed: _config2.default.cameraSpeed
      });
    }
  }, {
    key: 'initializeControllers',
    value: function initializeControllers() {
      this.topBarController = new _SingleController2.default({
        game: this.state,
        style: new _Style2.default({
          smallFont: 20,
          mediumFont: 30
        }),
        menuView: this.topBarView,
        content: new _TopBarContent2.default({
          player: this.player,
          city: this.city,
          timer: this.gameTimer
        })
      });

      this.cityContent = new _CityContent2.default({
        city: this.city,
        gameEvents: this.gameEvents
      });

      this.tileContent = new _TileContent2.default({
        topBarController: this.topBarController,
        purchaseManager: this.purchaseManager,
        demandFunction: this.city.turnipDemand
      });

      var buildStructureController = new _BuildStructureContent2.default({
        purchaseManager: this.purchaseManager,
        structureFactory: this.structureFactory
      });

      this.menuController = new _MulticontentController2.default({
        game: this.state,
        menuView: this.menuView,
        style: new _Style2.default({
          mediumFont: 16,
          largeFont: 32,
          buttonHeight: _config2.default.menuButtonHeight,
          buttonWidth: _config2.default.menuButtonWidth
        }),
        contents: [this.cityContent, this.tileContent, buildStructureController]
      });
    }

    /**
     * Description goes here
     */

  }, {
    key: 'update',
    value: function update() {
      this.mapView.draw(this.state.camera.x, this.state.camera.y);
      this.gameTimer.update(this.currentTime());
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return Date.now();
    }
  }]);

  return GameState;
}();

exports.default = GameState;

/***/ }),
/* 165 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./src/game/Player.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Keeps track of the player's points, money and structures
 */
var _class = function () {
  /**
   * Initially the player has 0 points and structures.
   * @param {number} startMoney - initial amount of money, controlled by state Play
   */
  function _class(_ref) {
    var startMoney = _ref.startMoney;

    _classCallCheck(this, _class);

    this.points = 0;
    this.cash = startMoney;
    this.structures = new Set();
  }

  /**
   * Adds points given as a parameter to players existing points
   * @param {number} - The amount of points to be added
   */


  _createClass(_class, [{
    key: "addPoints",
    value: function addPoints(points) {
      this.points += points;
    }

    /**
     * Adds a structure for the player
     * @param {Structure} structure - The structure to be added
     */

  }, {
    key: "addStructure",
    value: function addStructure(structure) {
      this.structures.add(structure);
    }

    /**
     * Removes a structure from player's structures
     * @param {Structure} structure - The structure to be removed
     */

  }, {
    key: "removeStructure",
    value: function removeStructure(structure) {
      this.structures.delete(structure);
    }

    /**
     * The amount of points to be added to the player are calculated
     * @param {number} fulFilledPct - how much of city's demand has the player fulfilled
     */

  }, {
    key: "countPoints",
    value: function countPoints(fulfilledPct) {
      if (fulfilledPct >= 100) {
        this.addPoints(100);
      } else {
        this.addPoints(fulfilledPct);
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 166 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./src/models/PurchaseManager.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PurchaseManager = function () {
  function PurchaseManager(_ref) {
    var player = _ref.player;

    _classCallCheck(this, PurchaseManager);

    this.player = player;
  }

  _createClass(PurchaseManager, [{
    key: "purchase",
    value: function purchase(price) {
      if (this.hasCash(price)) {
        this.player.cash -= price;
        return true;
      }

      return false;
    }
  }, {
    key: "hasCash",
    value: function hasCash(price) {
      return this.player.cash >= price;
    }
  }]);

  return PurchaseManager;
}();

exports.default = PurchaseManager;

/***/ }),
/* 167 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./src/models/city/City.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DemandCalculator = __webpack_require__(/*! ./DemandCalculator */ 168);

var _DemandCalculator2 = _interopRequireDefault(_DemandCalculator);

var _Functions = __webpack_require__(/*! ../logic/Functions */ 55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tracks the demand and population of the city
 * @param {String} name
 */
var City = function () {
  function City(_ref) {
    var name = _ref.name,
        startPopulation = _ref.startPopulation,
        popularityPct = _ref.popularityPct,
        demandRandomVariance = _ref.demandRandomVariance,
        startPrice = _ref.startPrice,
        increaseAtOne = _ref.increaseAtOne,
        increaseAtTwo = _ref.increaseAtTwo;

    _classCallCheck(this, City);

    this.name = name;
    this.population = startPopulation;
    this.turnipDemand = new _DemandCalculator2.default({
      city: this,
      popularityPct: popularityPct,
      demandRandomVariance: demandRandomVariance,
      startConstantPrice: startPrice
    });

    this.normalFunction = (0, _Functions.createLine)(0.5, 1, 1, increaseAtOne);
    this.overFunction = (0, _Functions.createLine)(1, increaseAtOne, 2, increaseAtTwo);
  }

  /**
   * Buys produced turnips for the city according to weekly and sometimes yearly demand
   * @param {number} producedTurnips
   * @param {boolean} buyYearlyHarvest
   */


  _createClass(City, [{
    key: 'buyTurnips',
    value: function buyTurnips(producedTurnips, endOfTheYear) {
      var cash = this.turnipDemand.weekly(producedTurnips);
      if (endOfTheYear) this.endOfTheYear();
      return cash;
    }

    /**
     * Helper for buyTurnips to buy turnips according to yearly demand
     * @param {number} supply
     */

  }, {
    key: 'endOfTheYear',
    value: function endOfTheYear() {
      this.increasePopulation(this.turnipDemand.percentageSupplied());
      this.turnipDemand.calculateYearlyDemand();
    }

    /**
     * Increases population according to the demand fulfilled by the player
     */

  }, {
    key: 'increasePopulation',
    value: function increasePopulation(percentageSupplied) {
      var percentage = percentageSupplied <= 1 ? this.normalFunction(percentageSupplied) : this.overFunction(percentageSupplied);

      this.population *= percentage;
      this.population = Math.ceil(this.population);
    }
  }]);

  return City;
}();

exports.default = City;

/***/ }),
/* 168 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./src/models/city/DemandCalculator.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Functions = __webpack_require__(/*! ../logic/Functions */ 55);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Determines how much money the player gets from the produced turnips
 */
var DemandCalculator = function () {
  function DemandCalculator(_ref) {
    var city = _ref.city,
        popularityPct = _ref.popularityPct,
        demandRandomVariance = _ref.demandRandomVariance,
        startConstantPrice = _ref.startConstantPrice;

    _classCallCheck(this, DemandCalculator);

    this.city = city;
    this.popularityPct = popularityPct;
    this.demandRandomVariance = demandRandomVariance;
    this.constantPrice = startConstantPrice;

    this.calculateYearlyDemand();
  }

  /**
   * Sets the yearly demand based on demanded amount and initializes helper values
   */


  _createClass(DemandCalculator, [{
    key: 'calculateYearlyDemand',
    value: function calculateYearlyDemand() {
      this.collectedSupply = 0;

      this.yearDemand = this.demandedAmount();
      this.wholeDemand = this.yearDemand * 2;

      this.constantFunction = (0, _Functions.createLine)(0, this.constantPrice, this.yearDemand, this.constantPrice);
      this.decreasingFunction = (0, _Functions.createLine)(this.yearDemand, this.constantPrice, this.wholeDemand, 0);
    }

    /**
     * Done every week. Saves the supply and gives money of it
     *
     * @param {*} supply
     */

  }, {
    key: 'weekly',
    value: function weekly(supply) {
      var price = this.pay(supply);
      this.collectedSupply += supply;
      return price;
    }

    /**
     * Gives the percentage of demand the player has supplied this year
     */

  }, {
    key: 'percentageSupplied',
    value: function percentageSupplied() {
      return this.collectedSupply / this.yearDemand;
    }

    /**
     * Calculates the amount of money player will get from the given supply. Is based on
     * how much player supplies and how much they have supplied.
     * @param {*} supply amount supplied this week
     */

  }, {
    key: 'pay',
    value: function pay(supply) {
      var newSupply = this.collectedSupply + supply;
      var startPrice = this.priceAt(this.collectedSupply);
      var endPrice = this.priceAt(newSupply);

      if (this.collectedSupply < this.yearDemand && newSupply > this.yearDemand || this.collectedSupply < this.wholeDemand && newSupply > this.wholeDemand) {
        var overSupply = newSupply - this.yearDemand;
        if (newSupply > this.wholeDemand) {
          overSupply = newSupply - this.wholeDemand;
        }
        var underSupply = supply - overSupply;
        var underSupplyPrice = this.priceAt(underSupply + this.collectedSupply);
        return this.priceBetween(startPrice, underSupplyPrice, underSupply) + this.priceBetween(underSupplyPrice, endPrice, overSupply);
      }

      return this.priceBetween(startPrice, endPrice, supply);
    }

    /**
     * Gives the integral of the linear function between two price points. Gives the
     * money of the difference
     *
     * @param {*} startPrice
     * @param {*} endPrice
     * @param {*} supply
     */

  }, {
    key: 'priceBetween',
    value: function priceBetween(startPrice, endPrice, supply) {
      return (startPrice + endPrice) / 2 * supply;
    }

    /**
     * The price of turnips at the point that the player has supplied
     */

  }, {
    key: 'currentPrice',
    value: function currentPrice() {
      return this.priceAt(this.collectedSupply);
    }

    /**
     * Gives the price at the given point of supply curve
     *
     * @param {*} supplyPoint
     */

  }, {
    key: 'priceAt',
    value: function priceAt(supplyPoint) {
      return supplyPoint <= this.yearDemand ? this.constantFunction(supplyPoint) : Math.max(0, this.decreasingFunction(supplyPoint));
    }

    /**
     * Calculates the amount of turnips the city will demand next year. Is based on the
     * city size, given multiplier and random element
     */

  }, {
    key: 'demandedAmount',
    value: function demandedAmount() {
      var rvar = (-0.5 + this.random()) * this.demandRandomVariance;
      return Math.floor(this.city.population * this.popularityPct * (1 + rvar));
    }

    /**
     * Random for testing purposes
     */

  }, {
    key: 'random',
    value: function random() {
      return Math.random();
    }
  }]);

  return DemandCalculator;
}();

exports.default = DemandCalculator;

/***/ }),
/* 169 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./src/models/map/Map.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ModelTile = __webpack_require__(/*! ./ModelTile */ 171);

var _ModelTile2 = _interopRequireDefault(_ModelTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generates the map with given measurements for grid and tiles
 */
var Map = function () {
  /**
   * @param {number} param.gridSizeX
   * @param {number} param.gridSizeY
   * @param {number} param.tileWidth
   * @param {number} param.tileHeight
   */
  function Map(_ref) {
    var width = _ref.width,
        height = _ref.height,
        tileSize = _ref.tileSize;

    _classCallCheck(this, Map);

    this.gridSizeX = width;
    this.gridSizeY = height;
    this.tileWidth = tileSize.width;
    this.tileHeight = tileSize.height;
    this.grid = [];
  }

  /**
   * returns a hashmap containing lists of tiles with the distance n
   * @param {*} n the distance n
   * @param {*} tile the tile from wich radius is calculated
   */


  _createClass(Map, [{
    key: 'getTilesInRadius',
    value: function getTilesInRadius(n, tile) {
      var bounds = this.boundsForRadius(tile.x, tile.y, n);
      var tiles = new Map();
      for (var i = 0; i <= n; i++) {
        tiles.set(i, []);
      }

      for (var x = bounds.sx; x <= bounds.ex; x++) {
        for (var y = bounds.sy; y <= bounds.ey; y++) {
          var dx = Math.abs(x - tile.x);
          var dy = Math.abs(y - tile.y);
          var distance = this.radiusFunction(dx, dy);
          if (distance <= n) {
            var distArray = tiles.get(distance);
            distArray.push(this.getTileWithGridCoordinates(x, y));
          }
        }
      }
      return tiles;
    }
  }, {
    key: 'boundsForRadius',
    value: function boundsForRadius(tx, ty, n) {
      var start = this.ensureCoordsInGrid(tx - n, ty - n);
      var end = this.ensureCoordsInGrid(tx + n, ty + n);
      return {
        sx: start.x,
        sy: start.y,
        ex: end.x,
        ey: end.y
      };
    }
  }, {
    key: 'ensureCoordsInGrid',
    value: function ensureCoordsInGrid(x, y) {
      x = x >= 0 ? x : 0;
      x = x <= this.gridSizeX - 1 ? x : this.gridSizeX - 1;
      y = y >= 0 ? y : 0;
      y = y <= this.gridSizeY - 1 ? y : this.gridSizeY - 1;
      return { x: x, y: y };
    }
  }, {
    key: 'radiusFunction',
    value: function radiusFunction(hori, veri) {
      // hypotenuse
      return Math.floor(Math.sqrt(Math.pow(hori, 2) + Math.pow(veri, 2)));
    }

    /**
     * @param {Number} gx
     * @param {Number} gy
     * @param {TileType} tileType
     */

  }, {
    key: 'addTileWithGridCoordinates',
    value: function addTileWithGridCoordinates(gx, gy, tileType, moisture, fertility) {
      var tile = new _ModelTile2.default({
        x: gx,
        y: gy,
        type: tileType,
        structure: null,
        moisture: moisture,
        fertility: fertility
      });
      this.grid[gy * this.gridSizeX + gx] = tile;
      return tile;
    }

    /**
     * @param {Number} px
     * @param {Number} py
     * @param {TileType} tileType
     */

  }, {
    key: 'addTileWithPixelCoordinates',
    value: function addTileWithPixelCoordinates(px, py, tileType, moisture, fertility) {
      var gx = this.pixelsToGridX(px);
      var gy = this.pixelsToGridY(py);
      return this.addTileWithGridCoordinates(gx, gy, tileType, moisture, fertility);
    }

    /**
     * @param {Number} gx
     * @param {Number} gy
     *
     * @return {ModelTile}
     */

  }, {
    key: 'getTileWithGridCoordinates',
    value: function getTileWithGridCoordinates(gx, gy) {
      return this.grid[gy * this.gridSizeX + gx];
    }

    /**
     * @param {Number} px
     * @param {Number} py
     *
     * @return {ModelTile}
     */

  }, {
    key: 'getTileWithPixelCoordinates',
    value: function getTileWithPixelCoordinates(px, py) {
      var gx = this.pixelsToGridX(px);
      var gy = this.pixelsToGridY(py);
      return this.getTileWithGridCoordinates(gx, gy);
    }

    /**
     * @param {Number} gx
     * @param {Number} gy
     */

  }, {
    key: 'removeTileWithGridCoordinates',
    value: function removeTileWithGridCoordinates(gx, gy) {
      this.grid[gy * this.gridSizeX + gx] = undefined;
    }

    /**
     * @param {Number} px
     * @param {Number} py
     */

  }, {
    key: 'removeTileWithPixelCoordinates',
    value: function removeTileWithPixelCoordinates(px, py) {
      this.grid[this.pixelsToGridX(py) * this.gridSizeX + this.pixelsToGridX(px)] = undefined;
    }

    /**
     * Pixel-Grid-Pixel conversion helpers
     * @param {Number} x
     * @return {Number}
     */

  }, {
    key: 'pixelsToGridX',
    value: function pixelsToGridX(x) {
      return Math.floor(x / this.tileWidth);
    }

    /**
     * @param {Number} y
     * @return {Number}
     */

  }, {
    key: 'pixelsToGridY',
    value: function pixelsToGridY(y) {
      return Math.floor(y / this.tileHeight);
    }

    /**
     * @param {Number} x
     * @return {Number}
     */

  }, {
    key: 'gridToPixelsX',
    value: function gridToPixelsX(x) {
      return x * this.tileWidth;
    }

    /**
     * @param {Number} y
     * @return {Number}
     */

  }, {
    key: 'gridToPixelsY',
    value: function gridToPixelsY(y) {
      return y * this.tileHeight;
    }
  }]);

  return Map;
}();

exports.default = Map;

/***/ }),
/* 170 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./src/models/map/MapGenerator.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Map = __webpack_require__(/*! ./Map */ 169);

var _Map2 = _interopRequireDefault(_Map);

var _PerlinGenerator = __webpack_require__(/*! ./PerlinGenerator */ 172);

var _PerlinGenerator2 = _interopRequireDefault(_PerlinGenerator);

var _StaticTypes = __webpack_require__(/*! ../StaticTypes */ 102);

var _StaticTypes2 = _interopRequireDefault(_StaticTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapGenerator = function () {
  function MapGenerator(_ref) {
    var mapSize = _ref.mapSize,
        tileSize = _ref.tileSize,
        generatingSettings = _ref.generatingSettings,
        perlinNoise = _ref.perlinNoise,
        noiseSettings = _ref.noiseSettings;

    _classCallCheck(this, MapGenerator);

    this.types = _StaticTypes2.default.tileTypes;

    this.width = mapSize.width;
    this.height = mapSize.height;

    this.tileSize = tileSize;

    this.perlinGenerator = new _PerlinGenerator2.default({
      Noise: perlinNoise,
      noiseHeight: noiseSettings.noiseHeight,
      noiseWidth: noiseSettings.noiseWidth,
      freqs: noiseSettings.freqs
    });

    this.groundLimit = generatingSettings.groundLimit;
    this.forestLimit = generatingSettings.forestLimit;
  }

  /**
   * Generates the game map
   *
   * @param {number} seed - optional seed for map generation
   */


  _createClass(MapGenerator, [{
    key: 'generateMap',
    value: function generateMap(seed) {
      var map = new _Map2.default({
        width: this.width,
        height: this.height,
        tileSize: this.tileSize
      });

      var x, y;
      for (x = 0; x < this.width; x++) {
        for (y = 0; y < this.height; y++) {
          var tileType = this.tileTypeAt(x, y);
          var moisture = this.moistureAt(x, y);
          var fertility = this.fertilityAt(x, y);

          map.addTileWithGridCoordinates(x, y, tileType, moisture, fertility);
        }
      }

      return map;
    }

    /**
     * returns the tile type at the given coordinate
     * @param {number} x - tile x coordinate
     * @param {number} y - tile y coordinate
     * @return {TileType} - tile type
     */

  }, {
    key: 'tileTypeAt',
    value: function tileTypeAt(x, y) {
      var noises = this.perlinGenerator.noisesAt(x, y);

      if (noises.ground > this.groundLimit) {
        if (noises.forest > this.forestLimit) {
          return this.types.grass;
        }

        return this.types.forest;
      }

      return this.types.water;
    }
  }, {
    key: 'moistureAt',
    value: function moistureAt(x, y) {
      var noise = this.perlinGenerator.noiseValueAt(x, y, 'ground');

      if (noise <= this.groundLimit) {
        return 100;
      }

      var difference = 1 - this.groundLimit;

      return 100 * (1 - (noise - this.groundLimit) / difference);
    }
  }, {
    key: 'fertilityAt',
    value: function fertilityAt(x, y) {
      var noise = this.perlinGenerator.noiseValueAt(x, y, 'fertility');
      return 100 * (noise + 1) / 2;
    }
  }]);

  return MapGenerator;
}();

exports.default = MapGenerator;

/***/ }),
/* 171 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./src/models/map/ModelTile.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* This is a model of a tile on the map
*/
var _class =
/**
* @param {object} param
* @param {number} param.x
* @param {number} param.y
* @param {TileType} param.type
* @param {Structure} param.structure
*/
function _class(_ref) {
  var x = _ref.x,
      y = _ref.y,
      type = _ref.type,
      structure = _ref.structure,
      moisture = _ref.moisture,
      fertility = _ref.fertility;

  _classCallCheck(this, _class);

  this.x = x;
  this.y = y;
  this.tileType = type;
  this.structure = structure;
  this.flowers = type.flowers;
  // tuotetaan näille arvo kartan generoinnin yhteydessä
  this.moisture = moisture;
  this.fertility = fertility;
  this.owner = null;
};

exports.default = _class;

/***/ }),
/* 172 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/models/map/PerlinGenerator.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Maps coordinates to tile types
 */
var PerlinGenerator = function () {
  /**
   * @param {object} param
   * @param {number} param.height - map height
   * @param {number} param.width - map width
   * @param {number} param.seed - seed for forest generation, optional
   */
  function PerlinGenerator(_ref) {
    var Noise = _ref.Noise,
        noiseHeight = _ref.noiseHeight,
        noiseWidth = _ref.noiseWidth,
        freqs = _ref.freqs;

    _classCallCheck(this, PerlinGenerator);

    this.fertilitynoise = new Noise(Math.random());
    this.forestnoise = new Noise(Math.random());
    this.groundnoise = new Noise(Math.random());

    this.height = noiseHeight;
    this.width = noiseWidth;

    this.groundfreq = freqs.groundfreq;
    this.forestfreq = freqs.forestfreq;
    this.fertilityfreq = freqs.fertilityfreq;
  }

  _createClass(PerlinGenerator, [{
    key: 'noisesAt',
    value: function noisesAt(x, y) {
      var nx = x / this.width - 0.5;
      var ny = y / this.height - 0.5;

      return {
        ground: this.groundnoise.perlin2(this.groundfreq * nx, this.groundfreq * ny),
        forest: this.forestnoise.perlin2(this.forestfreq * nx, this.forestfreq * ny),
        fertility: this.fertilitynoise.perlin2(this.fertilityfreq * nx, this.fertilityfreq * ny)
      };
    }
  }, {
    key: 'noiseValueAt',
    value: function noiseValueAt(x, y, noiseName) {
      var nx = x / this.width - 0.5;
      var ny = y / this.height - 0.5;

      var noise = this[noiseName + 'noise'];
      var freq = this[noiseName + 'freq'];
      return noise.perlin2(freq * nx, freq * ny);
    }
  }]);

  return PerlinGenerator;
}();

exports.default = PerlinGenerator;

/***/ }),
/* 173 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/models/map/TileFinder.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Heap = __webpack_require__(/*! collections/heap */ 207);

var TileFinder = function () {
  function TileFinder(_ref) {
    var map = _ref.map,
        multipliers = _ref.multipliers;

    _classCallCheck(this, TileFinder);

    this.map = map;
    this.width = map.gridSizeX;
    this.height = map.gridSizeY;

    this.multipliers = multipliers;
  }

  /**
   * Finds tiles in distance radius of given tile. Gives them back as set of
   * capsules, which hold the tile and the distance to the tile
   *
   * @param {*} tile from which
   * @param {*} radius in distance
   */


  _createClass(TileFinder, [{
    key: 'findTilesInDistanceOf',
    value: function findTilesInDistanceOf(tile, radius) {
      var heap = new Heap([], function (a, b) {
        return a.distance === b.distance;
      }, function (a, b) {
        return b.distance - a.distance;
      });
      var found = new Set();
      var used = new Set();
      used.add(tile);

      heap.push(this.encapsule(tile, 0));

      while (heap.length > 0) {
        var capsule = heap.pop();

        if (capsule.distance === radius) continue;

        var tiles = this.tilesNextTo(capsule.tile);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _tile = _step.value;

            if (used.has(_tile)) continue;

            var distanceTo = capsule.distance + this.multipliers[_tile.tileType.name];
            if (distanceTo <= radius) {
              var encapsuled = this.encapsule(_tile, distanceTo);
              heap.push(encapsuled);
              found.add(encapsuled);
              used.add(_tile);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return found;
    }
  }, {
    key: 'encapsule',
    value: function encapsule(tile, distance) {
      return { tile: tile, distance: distance };
    }

    /**
     * Gives tiles next to the given tile
     * @param {*} tile
     */

  }, {
    key: 'tilesNextTo',
    value: function tilesNextTo(tile) {
      var x = tile.x;
      var y = tile.y;
      var tiles = [];
      for (var i = -1; i < 2; i += 2) {
        this.addTileToList(x + i, y, tiles);
      }
      for (var _i = -1; _i < 2; _i += 2) {
        this.addTileToList(x, y + _i, tiles);
      }

      return tiles;
    }
  }, {
    key: 'addTileToList',
    value: function addTileToList(x, y, list) {
      if (this.isInMap(x, y)) list.push(this.map.getTileWithGridCoordinates(x, y));
    }

    /**
     * Returns true if tile is in map
     * @param {*} x
     * @param {*} y
     */

  }, {
    key: 'isInMap',
    value: function isInMap(x, y) {
      return x < this.width && x >= 0 && y >= 0 && y < this.height;
    }
  }]);

  return TileFinder;
}();

exports.default = TileFinder;

/***/ }),
/* 174 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./src/models/namegeneration/CityNameGenerator.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generates a random name for the city
 */
var CityNameGenerator = function () {
  /**
   * @param {Object[]} param.cityNames - list of names that the generator uses
   */
  function CityNameGenerator(_ref) {
    var cityNames = _ref.cityNames,
        randomWithBounds = _ref.randomWithBounds;

    _classCallCheck(this, CityNameGenerator);

    this.cityNames = cityNames;
    this.randomWithBounds = randomWithBounds;
  }

  /**
  * Generates the name from two randomly chosen names from the list
  *
  * @returns {String} - newly generated name
  */


  _createClass(CityNameGenerator, [{
    key: "generateName",
    value: function generateName() {
      var first = this.randomWithBounds(0, this.cityNames.length);
      var second = this.randomWithBounds(0, this.cityNames.length);

      if (second === first) {
        second++;
        if (second === this.cityNames.length) {
          second = 0;
        }
      }

      var name = this.getStart(first) + this.getEnd(second, first);

      return name;
    }

    /**
     * Generates a start for the new name
     *
     * @param {int} param.id - id of the word to be used
     * @returns {String} - start for the new name
     */

  }, {
    key: "getStart",
    value: function getStart(id) {
      var no = this.cityNames[id];

      if (no.full !== undefined) {
        return no.name.slice(0, no.full);
      }

      return no.name.slice(0, no.point);
    }

    /**
     * Generater an end for the new name
     *
     * @param {int} id - id of the word to be used
     * @param {int} first - id of the name used in the first part
     * @returns {String} - end for the new name
     */

  }, {
    key: "getEnd",
    value: function getEnd(id, first) {
      var no = this.cityNames[id];
      if (this.cityNames[first].full !== undefined) {
        return no.name;
      }
      return no.name.slice(no.point);
    }
  }]);

  return CityNameGenerator;
}();

exports.default = CityNameGenerator;

/***/ }),
/* 175 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./src/models/namegeneration/CityNameList.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{ name: 'mTechVille', point: 5 }, { name: 'Kumpulan kampus', point: 8, full: 9 }, { name: 'Helsinki', point: 6 }, { name: 'Turku', point: 3 }, { name: 'Tampere', point: 3 }, { name: 'Oulu', point: 2 }, { name: 'Rovaniemi', point: 4 }, { name: 'Jyväskylä', point: 5 }, { name: 'Pori', point: 2 }, { name: 'Kotka', point: 3 }, { name: 'Espoo', point: 2 }, { name: 'Vantaa', point: 3 }, { name: 'Seinäjoki', point: 5 }, { name: 'Joensuu', point: 4 }, { name: 'Lappeenranta', point: 7 }, { name: 'Savonlinna', point: 5 }, { name: 'Pietarsaari', point: 6 }, { name: 'Utsjoki', point: 3 }, { name: 'Kilpisjärvi', point: 6 }, { name: 'Lahti', point: 3 }, { name: 'Mikkeli', point: 3 }, { name: 'Vaasa', point: 3 }, { name: 'Maarienhamina', point: 7 }, { name: 'Kouvola', point: 3 }, { name: 'Kuopio', point: 3 }, { name: 'Hämeenlinna', point: 6 }, { name: 'Järvenpää', point: 6 }, { name: 'Rauma', point: 3 }, { name: 'Hyvinkää', point: 5 }, { name: 'Kempele', point: 3 }, { name: 'Tornio', point: 3 }, { name: 'Kajaani', point: 2 }, { name: 'Kuusamo', point: 3 }, { name: 'Imatra', point: 1 }, { name: 'Tukholma', point: 3 }, { name: 'Göteburg', point: 4 }, { name: 'Malmö', point: 3 }, { name: 'Uppsala', point: 3 }, { name: 'Oslo', point: 2 }, { name: 'Bergen', point: 3 }, { name: 'Trondheim', point: 5 }, { name: 'Tromso', point: 4 }, { name: 'Kööpenhamina', point: 6 }, { name: 'Tallinna', point: 3 }, { name: 'Riika', point: 3 }, { name: 'Vilna', point: 3 }, { name: 'Reykjavik', point: 4 }, { name: 'Lontoo', point: 3 }, { name: 'Pariisi', point: 2 }, { name: 'Moskova', point: 3 }, { name: 'Praha', point: 3 }, { name: 'Vienna', point: 4 }, { name: 'Berliini', point: 3 }, { name: 'Varsova', point: 3 }, { name: 'Minsk', point: 3 }, { name: 'Hampuri', point: 3 }, { name: 'Stuttgart', point: 5 }, { name: 'Dresden', point: 4 }, { name: 'Lissabon', point: 5 }, { name: 'Napoli', point: 2 }, { name: 'Amsterdam', point: 6 }, { name: 'Madrid', point: 3 }, { name: 'Rooma', point: 3 }, { name: 'Ateena', point: 1 }, { name: 'Pietari', point: 3 }, { name: 'Venetsia', point: 5 }, { name: 'Milano', point: 4 }, { name: 'Budapest', point: 4 }, { name: 'Bucharest', point: 5 }, { name: 'Manchester', point: 3 }, { name: 'Liverpool', point: 5 }, { name: 'Dublin', point: 3 }, { name: 'Barcelona', point: 5 }, { name: 'Brysseli', point: 4 }, { name: 'Munchen', point: 3 }, { name: 'Frankfurt', point: 5 }, { name: 'Lyon', point: 2 }, { name: 'Marseille', point: 3 }, { name: 'Kiova', point: 3 }, { name: 'Belgrad', point: 3 }, { name: 'Kairo', point: 3 }, { name: 'Ouagadougou', point: 5 }, { name: 'Lagos', point: 2 }, { name: 'Kinshasa', point: 3 }, { name: 'Johannesburg', point: 8 }, { name: 'Pretoria', point: 3 }, { name: 'Mombasa', point: 3 }, { name: 'Kampala', point: 3 }, { name: 'Tripoli', point: 3 }, { name: 'Alexandria', point: 4 }, { name: 'Timbuktu', point: 3 }, { name: 'Antananarivo', point: 6 }, { name: 'Accra', point: 2 }, { name: 'Windhoek', point: 4 }, { name: 'Luanda', point: 4 }, { name: 'Tunis', point: 2 }, { name: 'Algiers', point: 2 }, { name: 'Maputo', point: 2 }, { name: 'Yamoussoukro', point: 6 }, { name: 'Yaounde', point: 6 }, { name: 'Istanbul', point: 5 }, { name: 'Izmir', point: 2 }, { name: 'Baghdad', point: 4 }, { name: 'Teheran', point: 4 }, { name: 'Kalkutta', point: 3 }, { name: 'Bangkok', point: 4 }, { name: 'Jakarta', point: 5 }, { name: 'Singapore', point: 5 }, { name: 'Vladivostok', point: 5 }, { name: 'Irkutsk', point: 2 }, { name: 'Manila', point: 2 }, { name: 'Ulaanbatar', point: 5 }, { name: 'Dubai', point: 2 }, { name: 'Delhi', point: 2 }, { name: 'Mumbai', point: 3 }, { name: 'Bangalore', point: 5 }, { name: 'Chennai', point: 4 }, { name: 'Ankara', point: 2 }, { name: 'Mekka', point: 3 }, { name: 'Jerusalem', point: 4 }, { name: 'Damascus', point: 5 }, { name: 'Riyadh', point: 3 }, { name: 'Tbilisi', point: 3 }, { name: 'Baku', point: 2 }, { name: 'Kabul', point: 2 }, { name: 'Tashkent', point: 4 }, { name: 'Beirut', point: 3 }, { name: 'Islamabad', point: 6 }, { name: 'Lahore', point: 2 }, { name: 'Dhaka', point: 3 }, { name: 'Kathmandu', point: 4 }, { name: 'Novgorod', point: 3 }, { name: 'Omsk', point: 2 }, { name: 'Novosibirsk', point: 6 }, { name: 'Tokio', point: 2 }, { name: 'Kyoto', point: 3 }, { name: 'Hiroshima', point: 4 }, { name: 'Osaka', point: 1 }, { name: 'Fukuoka', point: 4 }, { name: 'Sapporo', point: 3 }, { name: 'Sendai', point: 3 }, { name: 'Nagoya', point: 2 }, { name: 'Seoul', point: 3 }, { name: 'Busan', point: 2 }, { name: 'Pyongjang', point: 5 }, { name: 'Peking', point: 2 }, { name: 'Shanghai', point: 5 }, { name: 'Xi\'an', point: 3 }, { name: 'Chongqing', point: 5 }, { name: 'Wuhan', point: 2 }, { name: 'Guangzhou', point: 5 }, { name: 'Chengdu', point: 5 }, { name: 'Qingdao', point: 4 }, { name: 'Tianjin', point: 4 }, { name: 'Urumqi', point: 4 }, { name: 'Harbin', point: 3 }, { name: 'Shenyang', point: 3 }, { name: 'Nanjing', point: 3 }, { name: 'Lanzhou', point: 3 }, { name: 'Changchun', point: 5 }, { name: 'Chicago', point: 3 }, { name: 'Atlanta', point: 5 }, { name: 'Dallas', point: 3 }, { name: 'Houston', point: 4 }, { name: 'Miami', point: 3 }, { name: 'Boston', point: 3 }, { name: 'Seatle', point: 4 }, { name: 'Portland', point: 4 }, { name: 'Detroit', point: 3 }, { name: 'Philadelphia', point: 5 }, { name: 'Indianapolis', point: 7 }, { name: 'Minneapolis', point: 6 }, { name: 'Nashville', point: 4 }, { name: 'Denver', point: 3 }, { name: 'Albuquerque', point: 4 }, { name: 'Montreal', point: 4 }, { name: 'Winnipeg', point: 5 }, { name: 'Ottawa', point: 2 }, { name: 'Vancouver', point: 3 }, { name: 'Toronto', point: 2 }, { name: 'Calgary', point: 3 }, { name: 'Sydney', point: 3 }, { name: 'Canberra', point: 3 }, { name: 'Perth', point: 3 }, { name: 'Adelaide', point: 3 }, { name: 'Auckland', point: 4 }, { name: 'Wellington', point: 7 }, { name: 'Nauru', point: 3 }, { name: 'Fiji', point: 2 }, { name: 'Kiribati', point: 4 }, { name: 'Tonga', point: 3 }, { name: 'Brasilia', point: 5 }, { name: 'Lima', point: 2 }, { name: 'Santiago', point: 3 }, { name: 'Havanna', point: 5 }, { name: 'Caracaz', point: 4 }, { name: 'Bogota', point: 4 }, { name: 'Georgetown', point: 6 }, { name: 'Manaus', point: 2 }, { name: 'Salvador', point: 3 }, { name: 'Fortaleza', point: 5 }, { name: 'Montevideo', point: 5 }, { name: 'Asuncion', point: 4 }, { name: 'Los Angeles', point: 6, full: 4 }, { name: 'Las Vegas', point: 6, full: 4 }, { name: 'San Fransisco', point: 8, full: 4 }, { name: 'San Antonio', point: 6, full: 4 }, { name: 'El Paso', point: 5, full: 3 }, { name: 'New York', point: 5, full: 4 }, { name: 'New Orleans', point: 6, full: 4 }, { name: 'Salt Lake City', point: 7, full: 5 }, { name: 'St. Louis', point: 7, full: 4 }, { name: 'Hong Kong', point: 6, full: 5 }, { name: 'Buenos Aires', point: 9, full: 7 }, { name: 'Rio de Janeiro', point: 9, full: 7 }, { name: 'Sao Paulo', point: 8, full: 4 }, { name: 'San Jose', point: 6, full: 4 }, { name: 'Porto Alegre', point: 7, full: 6 }, { name: 'Belo Horizonte', point: 9, full: 5 }, { name: 'Addis Abaha', point: 7, full: 6 }, { name: 'Cape Town', point: 7, full: 5 }, { name: 'Mexico City', point: 6, full: 7 }, { name: 'N\'djamena', point: 2, full: 2 }, { name: 'La Paz', point: 4, full: 3 }, { name: 'Port-au-Prince', point: 9, full: 8 }, { name: 'Old Delhi', point: 5, full: 4 }, { name: 'Ha Noi', point: 4, full: 3 }, { name: 'Ho Chi Min', point: 8, full: 7 }, { name: 'Tel Aviv', point: 5, full: 4 }, { name: 'Kuala Lumpur', point: 9, full: 6 }, { name: 'Dar es Salaam', point: 9, full: 7 }, { name: 'Minas Tirith', point: 8, full: 6 }, { name: 'Minas Morgul', point: 9, full: 6 }, { name: 'South Park', point: 8, full: 6 }, { name: 'Shangri-la', point: 8, full: 7 }, { name: 'El Dorado', point: 3, full: 3 }, { name: 'Asdistania', point: 3 }, { name: 'Agrabah', point: 2 }, { name: 'Megacity', point: 4 }, { name: 'Atlantis', point: 5 }, { name: 'Baldur', point: 3 }, { name: 'Gotham', point: 3 }, { name: 'Springfield', point: 6 }, { name: 'Avalon', point: 3 }, { name: 'Tylypahka', point: 4 }];

/***/ }),
/* 176 */
/* no static exports found */
/* all exports used */
/*!*************************************************************!*\
  !*** ./src/models/namegeneration/StructureNameGenerator.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generates a random name for a building and it's owner
 */
var StructureNameGenerator = function () {
  /**
  * @param {Object[]} param.frontAdjectives - list of adjectives
  * @param {Object[]} param.names - list of names
  * @param {Object[]} param.endAdjectives - list of adjectives
  * @param {Object[]} param.hyperboles - list of hyperbole words
  */
  function StructureNameGenerator(_ref) {
    var frontAdjectives = _ref.frontAdjectives,
        names = _ref.names,
        endAdjectives = _ref.endAdjectives,
        hyperboles = _ref.hyperboles,
        random = _ref.random,
        randomWithBounds = _ref.randomWithBounds;

    _classCallCheck(this, StructureNameGenerator);

    this.frontAdjectives = frontAdjectives;
    this.names = names;
    this.endAdjectives = endAdjectives;
    this.hyperboles = hyperboles;
    this.random = random;
    this.randomWithBounds = randomWithBounds;
  }

  /**
  * @returns {String} Name of the owner of the building
  */


  _createClass(StructureNameGenerator, [{
    key: 'createOwnerName',
    value: function createOwnerName() {
      var front = this.randomWithBounds(0, this.frontAdjectives.length);
      var name = this.randomWithBounds(0, this.names.length);
      return this.frontAdjectives[front] + ' ' + this.names[name];
    }

    /**
     * Creates name for the structure
     *
     * @param {StructureType} param.structureType - the type of the structure
     * @returns {String} - name for building
     */

  }, {
    key: 'createBuildingName',
    value: function createBuildingName(structureType) {
      var end = this.randomWithBounds(0, this.endAdjectives.length);
      var type = this.findType(structureType);
      var hyper = this.randomWithBounds(0, this.hyperboles.length);
      if (this.random() < 0.25) {
        var tmp = this.endAdjectives[end].toLowerCase();
        return this.hyperboles[hyper] + '-' + tmp + ' ' + type;
      }
      return this.endAdjectives[end] + ' ' + type;
    }

    /**
     * Helper to find the type of the structure
     *
     * @param {StructureType} structureType - type to be examined
     * @returns {String} - the typeof the structure
     */

  }, {
    key: 'findType',
    value: function findType(structureType) {
      var type = '';
      if (structureType === 'wheat farm') {
        type = 'viljatila';
      }
      if (structureType === 'dairy farm') {
        type = 'navetta';
      }
      if (structureType === 'berry farm') {
        type = 'marjatila';
      }
      if (structureType === 'mill') {
        type = 'mylly';
      }
      return type;
    }
  }]);

  return StructureNameGenerator;
}();

exports.default = StructureNameGenerator;

/***/ }),
/* 177 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./src/models/namegeneration/StructureNameParts.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [['Iso', 'Hobitti', 'Zombie', 'Kola', 'Pikku', 'Rauhanmies', 'Piippu', 'Vihreä', 'Kirkonmies', 'Maanviljelijä', 'Merimies', 'Akateemikko', 'Pihi', 'Laiha', 'Pappi', 'Syöppö', 'Yösyöppö', 'Suurisuu', 'Piippolan', 'Korhosen', 'Virtasen', 'Bahmanpourin', 'Häkkisen', 'Karttusen', 'Klintin', 'Tainan', 'Koskisen', 'Rämön', 'Kousan', 'Karjalainen', 'Ruotsalainen', 'Tanskalainen', 'Suomalainen', 'Kiinalainen', 'Intialainen', 'Amerikkalainen', 'Venäläinen', 'Thaimaalainen', 'Munkki', 'Professori', 'Luukkaisen'], ['Olli', 'Pekka', 'Jukka', 'Kalle', 'Kyösti', 'Jaakko', 'Matti', 'Maija', 'Matleena', 'Salla', 'Reetta', 'Martta', 'Eeva', 'Jon-Erik', 'Hossein', 'Ilkka', 'Ilja', 'Jarkko', 'Miia', 'Juha', 'vaari', 'mummo', 'mummi', 'setä', 'ukki', 'pappa', 'eno', 'täti', 'kummisetä'], ['Pieni', 'Hapokas', 'Iso', 'Suuri', 'Kämänen', 'Siisti', 'Puhdas', 'Laadukas', 'Kummallinen', 'Ainutlaatuinen', 'Nuorekas', 'Ikivihreä', 'Vanhahtava', 'Kurja', 'Huonon tuurin', 'Pahan päivän', 'Surkea', 'Likainen', 'Kallis', 'Ylihinnoiteltu', 'Aromikas', 'Viheliäinen', 'Onnekas', 'Luksus', 'Naurettava', 'Luomumainen', 'Aito', 'Feikki', 'Aamuvirkku', 'Yöllinen', 'Fifty-sixty'], ['Todella', 'Liian', 'Tosi', 'Huippu', 'Melko', 'Suhteellisen', 'Äärimmäisen', 'Kohtalaisen', 'Hieman', 'Hivenen', 'Just ja just', 'Järkyttävän', 'Mielettömän', 'Ihan järkyttävän', 'Jäätävän']];

/***/ }),
/* 178 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./src/models/structure/ProducerFactory.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ContinuousProducer = __webpack_require__(/*! ./producers/ContinuousProducer */ 183);

var _ContinuousProducer2 = _interopRequireDefault(_ContinuousProducer);

var _SeasonalProducer = __webpack_require__(/*! ./producers/SeasonalProducer */ 185);

var _SeasonalProducer2 = _interopRequireDefault(_SeasonalProducer);

var _Refiner = __webpack_require__(/*! ./producers/Refiner */ 184);

var _Refiner2 = _interopRequireDefault(_Refiner);

var _PrimaryProducerDecorator = __webpack_require__(/*! ./producers/decorators/PrimaryProducerDecorator */ 187);

var _PrimaryProducerDecorator2 = _interopRequireDefault(_PrimaryProducerDecorator);

var _AllDecorator = __webpack_require__(/*! ./producers/decorators/AllDecorator */ 186);

var _AllDecorator2 = _interopRequireDefault(_AllDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Yields turnips during the harvesting period (month.week).
 */
var ProducerFactory = function () {
  function ProducerFactory(_ref) {
    var tileFinder = _ref.tileFinder,
        eventController = _ref.eventController;

    _classCallCheck(this, ProducerFactory);

    this.tileFinder = tileFinder;
    this.eventController = eventController;
  }

  /**
   * Returns either a function that yields turnips weekly or one that
   * yields only during harvesting months, depending on the structure type.
   */


  _createClass(ProducerFactory, [{
    key: 'createProducer',
    value: function createProducer(structureType, tile) {
      var sType = this.checkStructureType(structureType);

      var producer = sType.refinery ? this.createRefiner(sType.buysFrom, sType.multiplier, sType.reach, tile) : this.createPrimaryProducer(sType, tile);

      return new _AllDecorator2.default({ producer: producer, tile: tile });
    }
  }, {
    key: 'createPrimaryProducer',
    value: function createPrimaryProducer(sType, tile) {
      var producer = sType.continuousProduction ? this.createContinuousProducer(sType.turnipYield) : this.createSeasonalProducer(sType.harvestingWeeks, sType.turnipYield);

      return new _PrimaryProducerDecorator2.default({ tile: tile, producer: producer });
    }
  }, {
    key: 'createSeasonalProducer',
    value: function createSeasonalProducer(harvestingWeeks, turnipYield) {
      return new _SeasonalProducer2.default({
        turnipYield: turnipYield,
        harvestWeeks: harvestingWeeks
      });
    }

    /**
     * Yields the same amount of turnips per week.
     */

  }, {
    key: 'createContinuousProducer',
    value: function createContinuousProducer(turnipYield) {
      return new _ContinuousProducer2.default({
        turnipYield: turnipYield
      });
    }

    /**
     * Creates refiner
     *
     * @param {*} inputTypes
     * @param {*} multiplier
     * @param {*} radius
     * @param {*} tile
     */

  }, {
    key: 'createRefiner',
    value: function createRefiner(inputTypes, multiplier, radius, tile) {
      var refiner = new _Refiner2.default({
        inputTypes: inputTypes,
        zone: this.tileFinder.findTilesInDistanceOf(tile, radius),
        multiplier: multiplier,
        radius: radius,
        tile: tile
      });

      this.eventController.addListener('structureBuilt', refiner.structureCreated, refiner);

      return refiner;
    }

    /**
     * If the structure type is undefined, create a new one.
     */

  }, {
    key: 'checkStructureType',
    value: function checkStructureType(structureType) {
      return structureType == null ? {
        refinery: false,
        harvestingWeeks: new Set(),
        continuousProduction: false,
        turnipYield: 0
      } : structureType;
    }
  }]);

  return ProducerFactory;
}();

exports.default = ProducerFactory;

/***/ }),
/* 179 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/models/structure/Structure.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Structure class consists of general attributes of a structure:
 * name, size, foundingYear, structureType, and productionInput,
 * and the function that calculates the value for production efficiency
 * (production unit / time period).
 */
var Structure = function () {
  /**
   * tile, name, size, and structureType are given to the constructor as parameters.
   * the initial value of productionInput is 0.
   * @param {ModelTile} param.tile
   * @param {string} param.name
   * @param {integer} param.size
   * @param {StructureType} param.structureType
   * @param {integer} foundingYear
   * @param {function} produceFn
   */
  function Structure(_ref) {
    var tile = _ref.tile,
        health = _ref.health,
        healthManager = _ref.healthManager,
        ownerName = _ref.ownerName,
        structureName = _ref.structureName,
        size = _ref.size,
        structureType = _ref.structureType,
        foundingYear = _ref.foundingYear,
        producer = _ref.producer;

    _classCallCheck(this, Structure);

    this.tile = tile;

    this.health = health;
    this.healthManager = healthManager;
    this.producer = producer;

    this.ownerName = ownerName;
    this.structureName = structureName;
    this.size = size;
    this.structureType = structureType;
    this.foundingYear = foundingYear;

    this.ownedTiles = [];
    this.radiusForTileOwnership = structureType.radiusForTileOwnership;
  }

  /**
   * Returns true if the structure produces throughout the year and false if
   * only during harvesting periods.
   */


  _createClass(Structure, [{
    key: "hasContinuousProduction",
    value: function hasContinuousProduction() {
      return this.structureType.continuousProduction;
    }

    /**
     * Returns the asset of the structure type
     */

  }, {
    key: "asset",
    value: function asset() {
      return this.structureType.asset;
    }
  }, {
    key: "turnipProduction",
    value: function turnipProduction() {
      return this.lastProduce;
    }

    /**
     * Returns the amount of turnips produced by this structure
     * @param {TimeEvent} timeEvent - Current ingame date
     * @return {number} - Turnips produced
     */

  }, {
    key: "produce",
    value: function produce(timeEvent) {
      this.lastProduce = this.producer === undefined ? 0 : this.producer.produce(timeEvent);
      return this.lastProduce;
    }
  }]);

  return Structure;
}();

exports.default = Structure;

/***/ }),
/* 180 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./src/models/structure/StructureFactory.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Structure = __webpack_require__(/*! ./Structure */ 179);

var _Structure2 = _interopRequireDefault(_Structure);

var _StructureHealth = __webpack_require__(/*! ./health/StructureHealth */ 182);

var _StructureHealth2 = _interopRequireDefault(_StructureHealth);

var _HealthManager = __webpack_require__(/*! ./health/HealthManager */ 181);

var _HealthManager2 = _interopRequireDefault(_HealthManager);

var _ProducerFactory = __webpack_require__(/*! ./ProducerFactory */ 178);

var _ProducerFactory2 = _interopRequireDefault(_ProducerFactory);

var _StructureNameGenerator = __webpack_require__(/*! ../namegeneration/StructureNameGenerator */ 176);

var _StructureNameGenerator2 = _interopRequireDefault(_StructureNameGenerator);

var _StructureNameParts = __webpack_require__(/*! ../namegeneration/StructureNameParts */ 177);

var _StructureNameParts2 = _interopRequireDefault(_StructureNameParts);

var _utils = __webpack_require__(/*! ../../utils */ 71);

var _utils2 = _interopRequireDefault(_utils);

var _StaticTypes = __webpack_require__(/*! ../StaticTypes */ 102);

var _StaticTypes2 = _interopRequireDefault(_StaticTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a structure for the player
 */
var StructureFactory = function () {
  /**
   * @param {GameTimer} gameTimer
   * @param {Player} player
   */
  function StructureFactory(_ref) {
    var purchaseManager = _ref.purchaseManager,
        gameTimer = _ref.gameTimer,
        eventController = _ref.eventController,
        player = _ref.player,
        map = _ref.map,
        tileFinder = _ref.tileFinder,
        ruinSettings = _ref.ruinSettings;

    _classCallCheck(this, StructureFactory);

    this.gameTimer = gameTimer;
    this.player = player;
    this.map = map;
    this.eventController = eventController;
    this.purchaseManager = purchaseManager;

    this.namer = new _StructureNameGenerator2.default({
      frontAdjectives: _StructureNameParts2.default[0],
      names: _StructureNameParts2.default[1],
      endAdjectives: _StructureNameParts2.default[2],
      hyperboles: _StructureNameParts2.default[3],
      random: _utils2.default.randomNoBounds,
      randomWithBounds: _utils2.default.randomWithBounds
    });
    this.producerFactory = new _ProducerFactory2.default({
      tileFinder: tileFinder,
      eventController: eventController
    });

    this.minRuin = ruinSettings.minRuin;
    this.maxRuin = ruinSettings.maxRuin;
    this.priceMultiplier = ruinSettings.fixMultiplier;
  }

  /**
   * Builds a structure on the tile given as a parameter
   * @param {ModelTile} tile
   * @param {StructureType} structureType
   */


  _createClass(StructureFactory, [{
    key: 'buildBuilding',
    value: function buildBuilding(tile, structureType) {
      if (!this.purchaseManager.purchase(structureType.cost)) return;

      var health = new _StructureHealth2.default({ maxHealth: structureType.health });
      var manager = new _HealthManager2.default({
        health: health,
        minRuinTime: this.minRuin,
        maxRuinTime: this.maxRuin,
        purchaseManager: this.purchaseManager,
        buildingCost: structureType.cost,
        priceMultiplier: this.priceMultiplier
      });
      manager.calculateNextRuin(this.gameTimer.currentTimeEvent);

      tile.structure = new _Structure2.default({
        tile: tile,
        health: health,
        healthManager: manager,
        ownerName: this.namer.createOwnerName(),
        structureName: this.namer.createBuildingName(structureType.name),
        size: 0,
        structureType: structureType,
        foundingYear: this.gameTimer.currentTimeEvent.year,
        producer: this.producerFactory.createProducer(structureType, tile)
      });
      this.player.addStructure(tile.structure);
      this.buyLand(tile);
      this.createInitialPollution(structureType.pollution, tile);
      this.calculateSize(tile.structure);

      this.eventController.event('structureBuilt', tile);
    }

    /**
     * Creates initial pollution to the map when building a building
     * @param {*} pollution
     * @param {*} map
     */

  }, {
    key: 'createInitialPollution',
    value: function createInitialPollution(pollution, tile) {
      var tiles = this.map.getTilesInRadius(3, tile);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              distance = _step$value[0],
              tilesArray = _step$value[1];

          tilesArray.forEach(function (tmpTile) {
            var amount = pollution - distance > 0 ? pollution - distance : 0;
            tmpTile.flowers -= amount;
            if (tmpTile.flowers < 1) {
              tmpTile.flowers = 1;
            }
          }, this);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'buyLand',
    value: function buyLand(tile) {
      var tiles = this.map.getTilesInRadius(tile.structure.radiusForTileOwnership, tile);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tiles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              distance = _step2$value[0],
              tilesArray = _step2$value[1];

          tilesArray.forEach(function (tmpTile) {
            if (tile.structure.structureType.refinery) {
              this.buyLandForRefinery(tile, distance, tmpTile);
            } else {
              this.buyLandForProducer(tile, tmpTile);
            }
          }, this);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'buyLandForRefinery',
    value: function buyLandForRefinery(tile, distance, tmpTile) {
      if (distance === 0 || tmpTile.structure === null) {
        this.decreaseOwnedTiles(tmpTile);
        this.setAssetForRefinery(tmpTile);
        tmpTile.owner = tile.structure;
        tile.structure.ownedTiles.push(tmpTile);
      }
    }
  }, {
    key: 'decreaseOwnedTiles',
    value: function decreaseOwnedTiles(tmpTile) {
      if (tmpTile.owner !== null) {
        if (tmpTile.tileType.name === 'field') {
          tmpTile.owner.size--;
          this.calculateFarmLand(tmpTile.owner);
        }
        tmpTile.owner.ownedTiles.pop(tmpTile);
      }
    }
  }, {
    key: 'buyLandForProducer',
    value: function buyLandForProducer(tile, tmpTile) {
      if (tmpTile.owner === null) {
        this.setAssetForProducer(tmpTile);
        tmpTile.owner = tile.structure;
        tile.structure.ownedTiles.push(tmpTile);
      }
    }
  }, {
    key: 'setAssetForRefinery',
    value: function setAssetForRefinery(tmpTile) {
      if (tmpTile.tileType.name !== 'water') {
        tmpTile.tileType = _StaticTypes2.default.tileTypes.industrial;
      }
    }
  }, {
    key: 'setAssetForProducer',
    value: function setAssetForProducer(tmpTile) {
      if (tmpTile.tileType.name === 'grass') {
        tmpTile.tileType = _StaticTypes2.default.tileTypes.field;
      }
    }
  }, {
    key: 'calculateSize',
    value: function calculateSize(structure) {
      if (structure.structureType.refinery) {
        this.calculateSizeForRefinery(structure);
      } else {
        this.calculateSizeForProducer(structure);
      }
    }
  }, {
    key: 'calculateSizeForProducer',
    value: function calculateSizeForProducer(structure) {
      structure.ownedTiles.forEach(function (tmpTile) {
        if (tmpTile.tileType.name === 'field') {
          structure.size++;
        }
      }, this);
      this.calculateFarmLand(structure);
    }
  }, {
    key: 'calculateSizeForRefinery',
    value: function calculateSizeForRefinery(structure) {
      structure.ownedTiles.forEach(function (tmpTile) {
        // structure.producer.producer.producerHolders.length
      }, this);
    }
  }, {
    key: 'calculateFarmLand',
    value: function calculateFarmLand(structure) {
      structure.ownedTiles.forEach(function (tmpTile) {
        structure.producer.producer.ownedFarmLand.push(tmpTile);
      }, this);
    }
  }]);

  return StructureFactory;
}();

exports.default = StructureFactory;

/***/ }),
/* 181 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./src/models/structure/health/HealthManager.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Functions = __webpack_require__(/*! ../../logic/Functions */ 55);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HealthManager = function () {
  function HealthManager(_ref) {
    var purchaseManager = _ref.purchaseManager,
        health = _ref.health,
        minRuinTime = _ref.minRuinTime,
        maxRuinTime = _ref.maxRuinTime,
        buildingCost = _ref.buildingCost,
        priceMultiplier = _ref.priceMultiplier;

    _classCallCheck(this, HealthManager);

    this.purchaseManager = purchaseManager;

    this.health = health;
    this.min = minRuinTime;
    this.difference = maxRuinTime - minRuinTime;

    this.maxCost = buildingCost * priceMultiplier;
    this.priceFunction = (0, _Functions.createCircle)(0, 1, 1, false);
  }

  _createClass(HealthManager, [{
    key: 'calculateNextRuin',
    value: function calculateNextRuin(timeEvent) {
      this.nextRuin = timeEvent.serialNumber + this.min + Math.floor(this.rand() * (this.difference + 1));
    }
  }, {
    key: 'checkRuin',
    value: function checkRuin(timeEvent) {
      if (timeEvent.serialNumber >= this.nextRuin) {
        this.health.loseOne();
        this.calculateNextRuin(timeEvent);
      }
    }
  }, {
    key: 'fix',
    value: function fix() {
      if (!this.purchaseManager.purchase(this.fixPrice())) return;
      this.health.fill();
    }
  }, {
    key: 'fixPrice',
    value: function fixPrice() {
      return Math.floor(this.priceFunction(1 - this.health.percent()) * this.maxCost);
    }
  }, {
    key: 'rand',
    value: function rand() {
      return Math.random();
    }
  }]);

  return HealthManager;
}();

exports.default = HealthManager;

/***/ }),
/* 182 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./src/models/structure/health/StructureHealth.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StructureHealth = function () {
  function StructureHealth(_ref) {
    var maxHealth = _ref.maxHealth;

    _classCallCheck(this, StructureHealth);

    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
  }

  _createClass(StructureHealth, [{
    key: 'fill',
    value: function fill() {
      this.currentHealth = this.maxHealth;
    }
  }, {
    key: 'loseHealth',
    value: function loseHealth(amount) {
      this.currentHealth = Math.max(0, this.currentHealth - amount);
    }
  }, {
    key: 'loseOne',
    value: function loseOne() {
      this.loseHealth(1);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.currentHealth + '/' + this.maxHealth;
    }
  }, {
    key: 'percent',
    value: function percent() {
      return this.currentHealth / this.maxHealth;
    }
  }]);

  return StructureHealth;
}();

exports.default = StructureHealth;

/***/ }),
/* 183 */
/* no static exports found */
/* all exports used */
/*!**************************************************************!*\
  !*** ./src/models/structure/producers/ContinuousProducer.js ***!
  \**************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Produces turnips every week
 */
var ContinuousProducer = function () {
  function ContinuousProducer(_ref) {
    var turnipYield = _ref.turnipYield;

    _classCallCheck(this, ContinuousProducer);

    this.turnipYield = turnipYield;
  }

  _createClass(ContinuousProducer, [{
    key: "produce",
    value: function produce() {
      return this.turnipYield;
    }
  }]);

  return ContinuousProducer;
}();

exports.default = ContinuousProducer;

/***/ }),
/* 184 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./src/models/structure/producers/Refiner.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Functions = __webpack_require__(/*! ../../logic/Functions */ 55);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Refiner takes production from given type buildingsnear it and enchancts their production
 */
var Refiner = function () {
  function Refiner(_ref) {
    var zone = _ref.zone,
        inputTypes = _ref.inputTypes,
        multiplier = _ref.multiplier,
        radius = _ref.radius;

    _classCallCheck(this, Refiner);

    this.zone = zone;
    this.inputTypes = inputTypes;
    this.multiplier = multiplier;
    this.radius = radius;
    this.distancefunction = (0, _Functions.createLine)(1, 1, radius, 1 / multiplier);
    this.producerHolders = [];
    this.findProducers();
  }

  _createClass(Refiner, [{
    key: 'produce',
    value: function produce(timeEvent) {
      var productionSum = 0;
      var size = this.producerHolders.length;
      for (var i = 0; i < size; i++) {
        var producerHolder = this.producerHolders.shift();
        if (this.verifyOwnership(producerHolder)) {
          productionSum += this.distancefunction(producerHolder.distance) * producerHolder.producer.produce(timeEvent, true);
          this.producerHolders.push(producerHolder);
        }
      }
      return Math.round(productionSum * this.multiplier);
    }

    /**
     * Helper for produce method: before taking production check if some other refinery has claimed
     * the ownership of the producer
     * @param {*} producerHolder
     */

  }, {
    key: 'verifyOwnership',
    value: function verifyOwnership(producerHolder) {
      return producerHolder.producer.refinery === this;
    }
  }, {
    key: 'findProducers',
    value: function findProducers() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.zone[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var capsule = _step.value;

          if (capsule.tile.structure !== null) {
            var structure = capsule.tile.structure;
            var producer = structure.producer;
            var distance = capsule.distance;

            if (this.canRefineOutputOf(structure) && this.isCloser(producer, distance)) {
              this.producerHolders.push({ distance: distance, producer: producer });
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'canRefineOutputOf',
    value: function canRefineOutputOf(structure) {
      return this.inputTypes.includes(structure.structureType.name);
    }
  }, {
    key: 'isInZone',
    value: function isInZone(tile) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.zone[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var capsule = _step2.value;

          if (tile === capsule.tile) {
            return capsule;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'isCloser',
    value: function isCloser(producer, distance) {
      if (producer.refineryDistance === null || producer.refineryDistance > distance) {
        producer.refinery = this;
        producer.refineryDistance = distance;
        return true;
      }
    }

    /**
     * Listens to new structures built by the user
     * @param {*} tile
     */

  }, {
    key: 'structureCreated',
    value: function structureCreated(tile) {
      if (this.canRefineOutputOf(tile.structure)) {
        var match = this.isInZone(tile);
        if (match) {
          if (this.isCloser(match.tile.structure.producer, match.distance)) {
            this.producerHolders.push({ distance: match.distance, producer: match.tile.structure.producer });
          }
        }
      }
    }
  }]);

  return Refiner;
}();

exports.default = Refiner;

/***/ }),
/* 185 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./src/models/structure/producers/SeasonalProducer.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * produces turnips all the time and gives the collected turnips at harvest seasons
 */
var SeasonalProducer = function () {
  function SeasonalProducer(_ref) {
    var turnipYield = _ref.turnipYield,
        harvestWeeks = _ref.harvestWeeks;

    _classCallCheck(this, SeasonalProducer);

    this.turnipYield = turnipYield;
    this.harvestWeeks = harvestWeeks;
    this.produced = 0;
  }

  _createClass(SeasonalProducer, [{
    key: 'produce',
    value: function produce(timeEvent) {
      this.produced += this.turnipYield;
      if (this.harvestWeeks.has(timeEvent.month + '.' + timeEvent.week)) {
        var harvest = this.produced;
        this.produced = 0;
        return harvest;
      }
      return 0;
    }
  }]);

  return SeasonalProducer;
}();

exports.default = SeasonalProducer;

/***/ }),
/* 186 */
/* no static exports found */
/* all exports used */
/*!*******************************************************************!*\
  !*** ./src/models/structure/producers/decorators/AllDecorator.js ***!
  \*******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AllDecorator = function () {
  function AllDecorator(_ref) {
    var producer = _ref.producer,
        tile = _ref.tile;

    _classCallCheck(this, AllDecorator);

    this.producer = producer;
    this.tile = tile;
    this.refinery = null;
    this.refineryDistance = null;
  }

  _createClass(AllDecorator, [{
    key: "produce",
    value: function produce(timeEvent, ownerCall) {
      if (this.refinery != null && !ownerCall) {
        return 0;
      }

      if (this.health == null) {
        this.health = this.tile.structure.health;
      }

      return this.producer.produce(timeEvent) * this.health.percent();
    }
  }]);

  return AllDecorator;
}();

exports.default = AllDecorator;

/***/ }),
/* 187 */
/* no static exports found */
/* all exports used */
/*!*******************************************************************************!*\
  !*** ./src/models/structure/producers/decorators/PrimaryProducerDecorator.js ***!
  \*******************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(/*! ../../../../config */ 35);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for producers. Producers determine what amount of
 * turnips a structure produces at given week
 */
var PrimaryProducerDecorator = function () {
  function PrimaryProducerDecorator(_ref) {
    var tile = _ref.tile,
        producer = _ref.producer;

    _classCallCheck(this, PrimaryProducerDecorator);

    this.tile = tile;
    this.producer = producer;
    this.ownedFarmLand = [];
  }

  _createClass(PrimaryProducerDecorator, [{
    key: 'produce',
    value: function produce(timeEvent) {
      var value = 0;
      this.ownedFarmLand.forEach(function (tile) {
        value += tile.flowers / _config2.default.maxFlowers;
      }, this);
      return this.producer.produce(timeEvent) * value;
    }
  }]);

  return PrimaryProducerDecorator;
}();

exports.default = PrimaryProducerDecorator;

/***/ }),
/* 188 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/states/GameOver.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 29);

var _phaser2 = _interopRequireDefault(_phaser);

var _MenuBuilder = __webpack_require__(/*! ../controllers/menucontrol/MenuBuilder */ 70);

var _MenuBuilder2 = _interopRequireDefault(_MenuBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Game over screen
 */
var GameOver = function (_Phaser$State) {
  _inherits(GameOver, _Phaser$State);

  function GameOver() {
    _classCallCheck(this, GameOver);

    return _possibleConstructorReturn(this, (GameOver.__proto__ || Object.getPrototypeOf(GameOver)).apply(this, arguments));
  }

  _createClass(GameOver, [{
    key: 'init',

    /**
     * Here we can add to the parameters any data we want to
     * carry over to the game over screen
     * @param {*} score, final score
     * @param {*} population, final city population
     */
    value: function init(score, population) {
      this.points = score;
      this.population = population;
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.menu = new _MenuBuilder2.default(this, 'gameover', this.camera.height * 5 / 9);
      this.stage.backgroundColor = 0x000000;

      this.menu.createScore('Loppupisteesi: ' + this.points.toFixed(0) + '\n' + 'Kaupungin koko: ' + this.population);
      this.menu.createButton('Jatka', function () {
        _this2.state.start('Start');
      });
      this.menu.finishMenu();
    }
  }]);

  return GameOver;
}(_phaser2.default.State);

exports.default = GameOver;

/***/ }),
/* 189 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/states/Instructions.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 29);

var _phaser2 = _interopRequireDefault(_phaser);

var _MenuBuilder = __webpack_require__(/*! ../controllers/menucontrol/MenuBuilder */ 70);

var _MenuBuilder2 = _interopRequireDefault(_MenuBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Game instructions
 */
var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.menu = new _MenuBuilder2.default(this, 'start', this.camera.height / 4);
      this.menu.createTitle('Ohjeet');
      this.menu.createDescription('Trycka på knappen');
      this.menu.createButton('knapp', function () {
        _this2.state.start('Start');
      });
      this.menu.finishMenu();
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 190 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./src/states/Play.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _noisejs = __webpack_require__(/*! noisejs */ 393);

var _phaser = __webpack_require__(/*! phaser */ 29);

var _phaser2 = _interopRequireDefault(_phaser);

var _GameState = __webpack_require__(/*! ../game/GameState */ 164);

var _GameState2 = _interopRequireDefault(_GameState);

var _config = __webpack_require__(/*! ../config */ 35);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Description goes here
 */
var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',

    /**
     * Description goes here
     */
    value: function init(cityName) {
      this.cityName = cityName;
    }

    /**
     * Description goes here
     */

  }, {
    key: 'create',
    value: function create() {
      // create before game state
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.flowersKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR);

      var cityName = this.cityName;
      this.cityName = undefined;

      this.gameState = new _GameState2.default({
        cityName: cityName,
        perlinNoise: _noisejs.Noise,
        startMoney: _config2.default.playerInitialCash,
        state: this,
        mapSize: _config2.default.mapSize,
        tileSize: _config2.default.tileSize,
        menuWidth: _config2.default.menuWidth,
        gameLength: _config2.default.gameLength
      });
    }

    /**
     * Updates the  gameState associated with this object
     */

  }, {
    key: 'update',
    value: function update() {
      this.gameState.update();
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 191 */
/* no static exports found */
/* all exports used */
/*!*****************************!*\
  !*** ./src/states/Start.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 29);

var _phaser2 = _interopRequireDefault(_phaser);

var _MenuBuilder = __webpack_require__(/*! ../controllers/menucontrol/MenuBuilder */ 70);

var _MenuBuilder2 = _interopRequireDefault(_MenuBuilder);

var _CityNameGenerator = __webpack_require__(/*! ../models/namegeneration/CityNameGenerator */ 174);

var _CityNameGenerator2 = _interopRequireDefault(_CityNameGenerator);

var _CityNameList = __webpack_require__(/*! ../models/namegeneration/CityNameList */ 175);

var _CityNameList2 = _interopRequireDefault(_CityNameList);

var _utils = __webpack_require__(/*! ../utils */ 71);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Screen displayed when the game is started
 */
var Start = function (_Phaser$State) {
  _inherits(Start, _Phaser$State);

  function Start() {
    _classCallCheck(this, Start);

    return _possibleConstructorReturn(this, (Start.__proto__ || Object.getPrototypeOf(Start)).apply(this, arguments));
  }

  _createClass(Start, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      var cityName = new _CityNameGenerator2.default({
        cityNames: _CityNameList2.default,
        randomWithBounds: _utils2.default.randomWithBounds
      }).generateName();

      this.menuMusic = this.add.audio('menu');
      this.menuMusic.play();
      this.menuMusic.loopFull();

      this.menu = new _MenuBuilder2.default(this, 'start', this.camera.height / 4);
      this.menu.createTitle('Biopeli');
      this.menu.createDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
      this.menu.createButton('Aloita peli', function () {
        _this2.state.start('Game', true, false, cityName, _this2.menuMusic.stop());
      });
      this.menu.createButton('Ohjeet', function () {
        _this2.state.start('Instructions', true, false, _this2.menuMusic.stop());
      });
      this.menu.finishMenu();
    }
  }]);

  return Start;
}(_phaser2.default.State);

exports.default = Start;

/***/ }),
/* 192 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/states/pregame/Boot.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 29);

var _phaser2 = _interopRequireDefault(_phaser);

var _webfontloader = __webpack_require__(/*! webfontloader */ 101);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Description goes here
 */
var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',

    /**
     * Description goes here
     */
    value: function init() {
      this.stage.backgroundColor = '#EDEEC9';
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }

    /**
     * Description goes here
     */

  }, {
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Bangers']
        },
        active: this.fontsLoaded
      });

      var text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
      text.anchor.setTo(0.5, 0.5);

      this.load.image('loaderBg', './assets/images/loading/loader-bg.png');
      this.load.image('loaderBar', './assets/images/loading/loader-bar.png');
    }

    /**
     * Description goes here
     */

  }, {
    key: 'render',
    value: function render() {
      if (this.fontsReady) {
        this.state.start('Splash');
      }
    }

    /**
     * Description goes here
     */

  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 193 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/states/pregame/Splash.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 29);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../../utils */ 71);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Description goes here
 */
var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',

    /**
     * Description goes here
     */
    value: function init() {}

    /**
     * Description goes here
     */

  }, {
    key: 'preload',
    value: function preload() {
      this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
      _utils2.default.centerGameObjects([this.loaderBg, this.loaderBar]);

      this.load.setPreloadSprite(this.loaderBar
      //
      // load your assets
      //
      );this.load.image('emptyButton', 'assets/images/buttons/empty_button.png');
      this.load.image('unusableButton', 'assets/images/buttons/empty_unbutton.png');

      this.load.audio('music', 'assets/music/music.ogg');
      this.load.audio('menu', 'assets/music/menu.ogg');

      this.load.image('forest', 'assets/images/tiles/forest.png');
      this.load.image('water', 'assets/images/tiles/water.png');
      this.load.image('grass', 'assets/images/tiles/grass.png');
      this.load.image('field', 'assets/images/tiles/field.png');
      this.load.image('industrial', 'assets/images/tiles/industrial.png');
      this.load.image('wheat_farm', 'assets/images/structures/wheat_farm.png');
      this.load.image('berry_farm', 'assets/images/structures/berry_farm.png');
      this.load.image('dairy_farm', 'assets/images/structures/dairy_farm.png');
      this.load.image('mill', 'assets/images/structures/mill.png');

      this.load.image('turnip', 'assets/images/icons/turnip.png');
      this.load.image('score', 'assets/images/icons/score.png');
      this.load.image('time', 'assets/images/icons/time.png');
      this.load.image('cash', 'assets/images/icons/cash.png');

      this.load.image('gameover', 'assets/images/backgrounds/gameover.png');
      this.load.image('start', 'assets/images/backgrounds/start.png');
      this.load.image('menuBg', 'assets/images/backgrounds/low-poly-bg.png');

      this.load.spritesheet('daisy', 'assets/images/daisy.png', 32, 32, 10);
      this.load.image('area', 'assets/images/tiles/area.png');
      this.load.spritesheet('hammers', 'assets/images/hammers.png', 128, 128, 4);
    }

    /**
     * Description goes here
     */

  }, {
    key: 'create',
    value: function create() {
      this.state.start('Start');
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 194 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./src/view/CameraMover.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(/*! ../config */ 35);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Description goes here
 */
var CameraMover = function () {
  /**
   * Description goes here
   *
   * @param {Phaser.Game} param.game
   * @param {number} param.xSpeed
   * @param {number} param.ySpeed
   */
  function CameraMover(_ref) {
    var game = _ref.game,
        xSpeed = _ref.xSpeed,
        ySpeed = _ref.ySpeed;

    _classCallCheck(this, CameraMover);

    this.game = game;
    this.x = xSpeed;
    this.y = ySpeed;
  }

  /**
   * Description
   * @param {*} events - see InputHandler
   */


  _createClass(CameraMover, [{
    key: 'update',
    value: function update(events) {
      var event = events.cursor;
      var tx = this.game.camera.x + this.updateCoordinate(event.left, event.right, this.x);
      var ty = this.game.camera.y + this.updateCoordinate(event.up, event.down, this.y);

      this.tweenCameraTo(tx, ty);
    }

    /**
     * Description goes here
     *
     * @param { ??? } eventForNegDirection
     * @param { ??? } eventForPosDirection
     * @param {number} increment
     *
     * @return {number} - delta
     */

  }, {
    key: 'updateCoordinate',
    value: function updateCoordinate(eventForNegDirection, eventForPosDirection, increment) {
      var delta = 0;

      if (eventForNegDirection) {
        delta -= increment;
      } else if (eventForPosDirection) {
        delta += increment;
      }
      return delta;
    }

    /**
     * Description goes here
     *
     * @param {number} tx
     * @param {number} ty
     */

  }, {
    key: 'tweenCameraTo',
    value: function tweenCameraTo(tx, ty) {
      // .to parameters(properties object = new coordinates, duration, type of Easing, autoStart)
      this.game.add.tween(this.game.camera).to({ y: ty, x: tx }, _config2.default.tweenCameraDuration, 'Linear', true);
    }
  }]);

  return CameraMover;
}();

exports.default = CameraMover;

/***/ }),
/* 195 */
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./src/view/InputHandler.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Description goes here
 */
var InputHandler = function () {
  /**
   * Description goes here
   *
   * @param {Phaser.Game} param.game - Current game
   * @param {MapListener} param.mapListener - Current map listener
   * @param {CameraMover} param.cameraMover - Current camera mover
   */
  function InputHandler(_ref) {
    var game = _ref.game,
        mapListener = _ref.mapListener,
        cameraMover = _ref.cameraMover,
        mapView = _ref.mapView;

    _classCallCheck(this, InputHandler);

    this.game = game;
    this.mapListener = mapListener;
    this.cameraMover = cameraMover;
    this.mapView = mapView;

    this.initialize();
  }

  /**
   * add callbacks to controls -> Phaser takes care of update in game loop
   */


  _createClass(InputHandler, [{
    key: "initialize",
    value: function initialize() {
      this.game.input.onDown.add(this.onPointerDown, this);
      var cursors = this.game.cursors;
      cursors.up.onDown.add(this.onCursorDown, this);
      cursors.down.onDown.add(this.onCursorDown, this);
      cursors.left.onDown.add(this.onCursorDown, this);
      cursors.right.onDown.add(this.onCursorDown, this
      // let daisiesKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      );var flowersKey = this.game.flowersKey;
      flowersKey.onDown.add(this.flowersOnOff, this);
    }

    /**
     * Description goes here
     */

  }, {
    key: "onPointerDown",
    value: function onPointerDown() {
      var ptr = this.game.input.activePointer;
      var pointerEvent = {
        x: ptr.position.x,
        y: ptr.position.y
      };

      this.mapListener.update(pointerEvent);
    }

    /**
     * Description goes here
     */

  }, {
    key: "onCursorDown",
    value: function onCursorDown() {
      var cursors = this.game.cursors;
      var cursorEvent = {
        up: cursors.up.isDown,
        down: cursors.down.isDown,
        left: cursors.left.isDown,
        right: cursors.right.isDown
      };

      this.cameraMover.update({ cursor: cursorEvent });
    }
  }, {
    key: "flowersOnOff",
    value: function flowersOnOff() {
      this.mapView.showFlowers === true ? this.mapView.showFlowers = false : this.mapView.showFlowers = true;
    }
  }]);

  return InputHandler;
}();

exports.default = InputHandler;

/***/ }),
/* 196 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./src/view/MapListener.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Description goes here
 */
var MapListener = function () {
  /**
   * Description goes here
   *
   * @param {Object} param - Parameter object
   *
   * @param {Phaser.Game} param.game
   * @param {Map} param.map
   * @param {MenuOptionCreator} param.menuOptionCreator
   * @param {Menu} param.menu
   */
  function MapListener(_ref) {
    var game = _ref.game,
        map = _ref.map,
        menuController = _ref.menuController;

    _classCallCheck(this, MapListener);

    this.game = game;
    this.map = map;
    this.menuController = menuController;
    this.menuView = menuController.menuView;
  }

  /**
   * Description goes here
   *
   * @param {{x: number, y: number}} pointerEvent
   */


  _createClass(MapListener, [{
    key: 'update',
    value: function update(pointerEvent) {
      if (this.pointerInMapArea(pointerEvent)) {
        var tile = this.getTileFromMap(pointerEvent);
        if (!this.validTile(tile)) return;
        this.updateMenuOptions(tile);
      }
    }

    /**
     * Description goes here
     *
     * @param {{x: number, y: number}} pointerEvent
     *
     * @return {boolean}
     */

  }, {
    key: 'pointerInMapArea',
    value: function pointerInMapArea(pointerEvent) {
      return pointerEvent !== undefined && pointerEvent.x <= this.menuView.layout.menuRect.x;
    }

    /**
     * Description goes here
     *
     * @param {{x: number, y: number}} pointerEvent
     *
     * @return {ModelTile}
     */

  }, {
    key: 'getTileFromMap',
    value: function getTileFromMap(pointerEvent) {
      var x = pointerEvent.x + this.game.camera.x;
      var y = pointerEvent.y + this.game.camera.y;
      return this.map.getTileWithPixelCoordinates(x, y);
    }

    /**
     * Description goes here
     *
     * @param {ModelTile} tile
     *
     * @return {Boolean}
     */

  }, {
    key: 'validTile',
    value: function validTile(tile) {
      if (typeof tile === 'undefined') {
        return false;
      } else if (tile === this.menuController.stateValue('selectedTile')) {
        this.menuController.reset();

        return false;
      }

      return true;
    }

    /**
     * Description goes here
     *
     * @param {ModelTile} tile
     */

  }, {
    key: 'updateMenuOptions',
    value: function updateMenuOptions(tile) {
      this.menuController.addState('selectedTile', tile);
      this.menuController.setContent(1);
    }
  }]);

  return MapListener;
}();

exports.default = MapListener;

/***/ }),
/* 197 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./src/view/map/MapView.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ViewTile = __webpack_require__(/*! ./ViewTile */ 198);

var _ViewTile2 = _interopRequireDefault(_ViewTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles viewing of the game map
 */
var MapView = function () {
  /**
   * @param {object} param
   * @param {Phaser.Game} param.game
   * @param {Map} param.map
   * @param {Menu} param.menu
   * @param {number} param.viewWidthPx
   * @param {number} param.viewHeightPx
   */
  function MapView(_ref) {
    var game = _ref.game,
        map = _ref.map,
        menuController = _ref.menuController,
        viewWidthPx = _ref.viewWidthPx,
        viewHeightPx = _ref.viewHeightPx;

    _classCallCheck(this, MapView);

    this.game = game;
    this.map = map;
    this.menuController = menuController;
    this.viewWidthPx = viewWidthPx;
    this.viewHeightPx = viewHeightPx;
    this.tileWidth = map.tileWidth;
    this.tileHeight = map.tileHeight;
    this.showFlowers = false;
    this.initialize();
  }

  _createClass(MapView, [{
    key: 'initialize',
    value: function initialize() {
      this.viewTexture = this.game.add.renderTexture(this.viewWidthPx, this.viewHeightPx, 'maptexture');
      this.renderS = this.game.add.sprite(0, 0, this.viewTexture);
      this.renderS.fixedToCamera = true;
    }

    /**
     * @param {number} cameraX
     * @param {number} cameraY
     */

  }, {
    key: 'draw',
    value: function draw(cameraX, cameraY) {
      this.viewTexture.clear();

      var viewArea = this.viewAreaLimits(cameraX, cameraY);
      var offset = this.offset(cameraX, cameraY, viewArea.startCol, viewArea.startRow);

      this.selectedTile = this.menuController.stateValue('selectedTile');
      this.landHighlights = [];
      this.buildingHighlights = [];
      if (this.selectedTile !== undefined && this.selectedTile !== null) {
        this.setRefineryHighlights();
      }
      this.fillView(viewArea, offset);
      this.renderS.reset(cameraX, cameraY);
    }
  }, {
    key: 'setRefineryHighlights',
    value: function setRefineryHighlights() {
      var _this = this;

      var st = this.selectedTile;
      if (st.structure !== null && st.structure.structureType.refinery) {
        var producers = st.structure.producer.producer.producerHolders;
        producers.forEach(function (capsule) {
          _this.buildingHighlights.push(capsule.producer.producer.tile);
        });
        var tiles = st.structure.producer.producer.zone;
        tiles.forEach(function (tile) {
          if (!_this.buildingHighlights.includes(tile.tile)) {
            _this.landHighlights.push(tile.tile);
          }
        });
      }
    }

    /**
     * @param {Phaser.Sprite} sprite
     * @param {number} x
     * @param {number} y
     */

  }, {
    key: 'addToViewTexture',
    value: function addToViewTexture(sprite, x, y) {
      this.viewTexture.renderXY(sprite, Math.round(x), Math.round(y));
    }

    /**
     * @param {number} cameraX
     * @param {number} cameraY
     */

  }, {
    key: 'viewAreaLimits',
    value: function viewAreaLimits(cameraX, cameraY) {
      var startCol = Math.floor(cameraX / this.tileWidth);
      var startRow = Math.floor(cameraY / this.tileHeight);

      return {
        startCol: startCol,
        endCol: startCol + Math.floor(this.viewWidthPx / this.tileWidth) + 1,
        startRow: startRow,
        endRow: startRow + Math.floor(this.viewHeightPx / this.tileHeight) + 1
      };
    }

    /**
     * Calculates the amount of tiles shown at borders of the viewed area
     * @param {number} cameraX
     * @param {number} cameraY
     * @param {number} startCol
     * @param {number} startRow
     */

  }, {
    key: 'offset',
    value: function offset(cameraX, cameraY, startCol, startRow) {
      return {
        x: -cameraX + startCol * this.tileWidth,
        y: -cameraY + startRow * this.tileHeight
      };
    }

    /**
     * @param {number} col
     * @param {number} row
     * @param {number} startCol
     * @param {number} startRow
     * @param {{x: number, y: number}} offset
     */

  }, {
    key: 'ColAndRowToPx',
    value: function ColAndRowToPx(col, row, startCol, startRow, offset) {
      return {
        x: (col - startCol) * this.tileWidth + offset.x,
        y: (row - startRow) * this.tileHeight + offset.y
      };
    }

    /**
     * Fills the shown area
     * @param { ??? } viewArea
     * @param { ??? } offset
     */

  }, {
    key: 'fillView',
    value: function fillView(viewArea, offset) {
      for (var c = viewArea.startCol; c <= viewArea.endCol; c++) {
        for (var r = viewArea.startRow; r <= viewArea.endRow; r++) {
          var tile = this.map.getTileWithGridCoordinates(c, r);
          var pxCoords = this.ColAndRowToPx(c, r, viewArea.startCol, viewArea.startRow, offset);
          if (typeof tile !== 'undefined') this.createViewTileForFill(tile, pxCoords, viewArea, offset);
        }
      }
    }

    /**
     * Creates a view for a given tile on the map
     * @param {ModelTile} tile
     * @param {{x: number, y: number}} pxCoords
     * @param { ??? } viewArea
     * @param { ??? } offset - not actually used
     */

  }, {
    key: 'createViewTileForFill',
    value: function createViewTileForFill(tile, pxCoords, viewArea, offset) {
      var viewTile = new _ViewTile2.default({ game: this.game, x: 0, y: 0, modelTile: tile });
      viewTile.update(this.showFlowers);
      this.addHighlights(viewTile, pxCoords);
      viewTile.tileSprite.width = this.tileWidth;
      viewTile.tileSprite.height = this.tileHeight;
      this.addToViewTexture(viewTile.tileSprite, pxCoords.x, pxCoords.y);
    }

    /**
     * Adds Highlights to the given viewtile with help from highlight function
     * @param {ViewTile} viewTile
     * @param {{x: number, y: number}} pxCoords
     */

  }, {
    key: 'addHighlights',
    value: function addHighlights(viewTile, pxCoords) {
      var tile = viewTile.modelTile;
      var sprites = [];
      if (tile === this.selectedTile) {
        sprites.push(this.highlight(0.2, true));
      }
      if (this.landHighlights.includes(tile)) {
        sprites.push(this.highlightBackground());
        sprites.push(this.highlight(0.2, false, 'blue'));
      }
      if (this.buildingHighlights.includes(tile)) {
        sprites.push(this.highlightBackground());
        sprites.push(this.highlight(0.5, true, 'green'));
      }
      sprites.forEach(function (sprite) {
        return viewTile.addHighlight(sprite);
      });
    }

    /**
     * Helper for highlighting a tile
     */

  }, {
    key: 'highlight',
    value: function highlight(alpha, round, col) {
      var corners = round ? 15 : 1;
      var palette = new Map();
      palette.set('black', 0x000000);
      palette.set('blue', 0x1631f8);
      palette.set('yellow', 0xfff600);
      palette.set('red', 0xff0018);
      palette.set('green', 0x00ff06);
      var color = palette.get(col);
      if (color === undefined) {
        color = palette.get('black');
      }

      var highlight = this.game.make.graphics();
      highlight.beginFill(color, alpha);
      highlight.drawRoundedRect(0, 0, this.tileWidth, this.tileHeight, corners);
      highlight.endFill();

      return highlight;
    }

    /**
     *  Helper for optional highlight background
     */

  }, {
    key: 'highlightBackground',
    value: function highlightBackground() {
      var bg = this.game.make.sprite(0, 0, 'area');
      bg.width = this.tileWidth;
      bg.height = this.tileHeight;
      bg.alpha = 0.2;
      return bg;
    }
  }]);

  return MapView;
}();

exports.default = MapView;

/***/ }),
/* 198 */
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./src/view/map/ViewTile.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(/*! ../../config */ 35);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Description goes here
 */
var ViewTile = function () {
  /**
   * @param {Phaser.Game} param.game
   * @param {number} param.x
   * @param {number} param.y
   * @param {ModelTile} param.modelTile
   */
  function ViewTile(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y,
        modelTile = _ref.modelTile;

    _classCallCheck(this, ViewTile);

    this.game = game;
    this.modelTile = modelTile;
    this.tileSprite = this.makeTileSprite(x, y);
    this.structureSprite = null;
    // this.update()
  }

  /**
   * Updates the view for the tile
   */


  _createClass(ViewTile, [{
    key: 'update',
    value: function update(showFlowers) {
      if (this.modelTile.structure != null && this.structureSprite == null) {
        this.structureSprite = this.makeStructureSprite();
        this.hammerSprite = this.makeHammerSprite();
      } else if (this.modelTile.structure == null && this.structureSprite != null) {
        this.structureSprite.destroy();
        this.structureSprite = null;
      }
      if (showFlowers) this.makeFlowerSprite();
    }

    /**
     * Creates the view for the using the asset related to modeltile's type
     * @param {number} x
     * @param {number} y
     */

  }, {
    key: 'makeTileSprite',
    value: function makeTileSprite(x, y) {
      return this.game.make.sprite(x, y, this.modelTile.tileType.asset);
    }

    /**
     * Creates a structure to be added as a child for the tile
     */

  }, {
    key: 'makeStructureSprite',
    value: function makeStructureSprite() {
      var sprite = this.game.make.sprite(0, 0, this.modelTile.structure.asset());
      return this.tileSprite.addChild(sprite);
    }
  }, {
    key: 'makeHammerSprite',
    value: function makeHammerSprite() {
      var hammers = this.game.make.sprite(_config2.default.tileWidth, _config2.default.tileHeight, 'hammers');
      hammers.anchor.set(0.5, 0.5);
      hammers.scale.setTo(0.7, 0.7);
      hammers.frame = Math.max(Math.min(3, 4 - Math.ceil(this.modelTile.structure.health.percent() * 4 + 0.01)), 0);
      return this.tileSprite.addChild(hammers);
    }

    /**
     * Adds a given text as a child for the tile
     * @param {string} toAdd
     */

  }, {
    key: 'makeFlowerSprite',
    value: function makeFlowerSprite() {
      var daisies = this.game.make.sprite(0, 0, 'daisy');
      daisies.frame = 10 - this.modelTile.flowers;
      return this.tileSprite.addChild(daisies);
    }
  }, {
    key: 'addHighlight',
    value: function addHighlight(toAdd) {
      toAdd.width = this.tileSprite.width;
      toAdd.height = this.tileSprite.height;
      this.tileSprite.addChild(toAdd);
    }
  }]);

  return ViewTile;
}();

exports.default = ViewTile;

/***/ }),
/* 199 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./src/view/menu/layouts/StaticLayout.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout2 = __webpack_require__(/*! ./Layout */ 105);

var _Layout3 = _interopRequireDefault(_Layout2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Layout that places the sections balanced distance away from each other
 */
var StaticLayout = function (_Layout) {
  _inherits(StaticLayout, _Layout);

  function StaticLayout(_ref) {
    var menuRect = _ref.menuRect,
        vertical = _ref.vertical,
        linePadding = _ref.linePadding;

    _classCallCheck(this, StaticLayout);

    var _this = _possibleConstructorReturn(this, (StaticLayout.__proto__ || Object.getPrototypeOf(StaticLayout)).call(this, menuRect, vertical));

    _this.linePadding = linePadding;
    return _this;
  }

  _createClass(StaticLayout, [{
    key: 'init',
    value: function init(components) {
      this.sectionAmount = components.length;
      this.currentSection = 0;
      this.currentLocation = this.linePadding;
    }
  }, {
    key: 'addComponentPadding',
    value: function addComponentPadding(component) {
      this.currentLocation += this.componentParallelSize(component);
    }
  }, {
    key: 'afterLine',
    value: function afterLine() {
      this.currentLocation += this.linePadding;
    }
  }, {
    key: 'afterSection',
    value: function afterSection() {
      this.currentSection++;
      this.currentLocation = this.linePadding;
    }
  }, {
    key: 'currentDrawLocation',
    value: function currentDrawLocation() {
      return this.parallelSize * (this.currentSection / this.sectionAmount) + this.currentLocation;
    }
  }]);

  return StaticLayout;
}(_Layout3.default);

exports.default = StaticLayout;

/***/ }),
/* 200 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./src/view/menu/menuitems/AnimatedBar.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimatedBar = function () {
  function AnimatedBar(_ref) {
    var game = _ref.game,
        group = _ref.group,
        vertical = _ref.vertical,
        width = _ref.width,
        height = _ref.height,
        x = _ref.x,
        y = _ref.y,
        percent = _ref.percent;

    _classCallCheck(this, AnimatedBar);

    this.type = 'bar';
    this.game = game;
    this.vertical = vertical;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.colors = { background: '#2e221f', bar: '#67244f' };
    this.duration = 250;
    this.group = group;
    this.percent = percent;
    this.draw();
  }

  _createClass(AnimatedBar, [{
    key: 'update',
    value: function update(x, y, percent) {
      this.background.x = x;
      this.background.y = y;

      this.bar.x = x;
      this.bar.y = y;
      this.setPercentage(percent);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.bar.destroy();
      this.background.destroy();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var bitmapBg = this.game.add.bitmapData(this.width, this.height);
      bitmapBg.ctx.fillStyle = this.colors.background;
      bitmapBg.ctx.beginPath();
      bitmapBg.ctx.rect(0, 0, this.width, this.height);
      bitmapBg.ctx.fill();
      this.background = this.group.create(this.x, this.y, bitmapBg, null, this.group);

      var bitmapBar = this.game.add.bitmapData(this.width, this.height);
      bitmapBar.ctx.fillStyle = this.colors.bar;
      bitmapBar.ctx.beginPath();
      bitmapBar.ctx.rect(0, 0, this.width, this.height);
      bitmapBar.ctx.fill();
      this.bar = this.group.create(this.x, this.y, bitmapBar, null, this.group);

      if (this.vertical) {
        this.bar.height = this.height * this.percent;
      } else {
        this.bar.width = this.width * this.percent;
      }
    }

    /**
     * Animate bar fill to new value
     * @param {number} value - Percentage value between [0, 1]
     * @memberof AnimatedBar
     */

  }, {
    key: 'setPercentage',
    value: function setPercentage(value) {
      if (!this.vertical) {
        var inPixels = value * this.width <= this.width ? value * this.width : this.width;
        this.game.add.tween(this.bar).to({ width: inPixels }, this.duration, 'Linear', true);
      } else {
        var _inPixels = value * this.height <= this.height ? value * this.height : this.height;
        this.game.add.tween(this.bar).to({ height: _inPixels }, this.duration, 'Linear', true);
      }
    }
  }]);

  return AnimatedBar;
}();

exports.default = AnimatedBar;

/***/ }),
/* 201 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/view/menu/menuitems/Icon.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Icon = function () {
  function Icon(_ref) {
    var game = _ref.game,
        group = _ref.group,
        x = _ref.x,
        y = _ref.y,
        asset = _ref.asset;

    _classCallCheck(this, Icon);

    this.type = 'icon';
    this.icon = group.create(x, y, asset);
    this.x = x;
    this.y = y;
  }

  _createClass(Icon, [{
    key: 'update',
    value: function update(x, y) {
      this.icon.x = x;
      this.icon.y = y;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.icon.destroy();
    }
  }]);

  return Icon;
}();

exports.default = Icon;

/***/ }),
/* 202 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./src/view/menu/menuitems/LabeledButton.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Description goes here
 */
var LabeledButton = function () {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param {Phaser.Game} param.game
   * @param { ??? } param.viewGroup
   * @param { ??? } param.label
   * @param {number} param.
   * @param {number} param.
   * @param { ??? } param.callback
   * @param { ??? } param.context
   * @param {number} param.buttonWidth
   * @param {number} param.buttonHeight
   */
  function LabeledButton(_ref) {
    var game = _ref.game,
        viewGroup = _ref.viewGroup,
        label = _ref.label,
        fontSize = _ref.fontSize,
        asset = _ref.asset,
        x = _ref.x,
        y = _ref.y,
        callback = _ref.callback,
        context = _ref.context,
        buttonWidth = _ref.buttonWidth,
        buttonHeight = _ref.buttonHeight;

    _classCallCheck(this, LabeledButton);

    this.type = 'button';

    this.style = { font: fontSize + 'px Arial', fill: '#ffff00', align: 'center' };
    this.group = viewGroup;

    this.button = game.make.button(x, y, asset, callback, context);
    viewGroup.add(this.button
    // this method call creates a 'text' object and adds it to viewGroup
    );this.text = game.add.text(Math.floor(x + buttonWidth / 2), Math.floor(y + buttonHeight / 2), label, this.style, viewGroup);
    this.text.anchor.set(0.5, 0.5);

    this.x = x;
    this.y = y;
    this.asset = asset;
    this.width = buttonWidth;
    this.height = buttonHeight;
    this.callback = callback;
    this.context = context;
  }

  _createClass(LabeledButton, [{
    key: 'update',
    value: function update(label, fontSize, x, y, callback, context) {
      this.button.x = x;
      this.button.y = y;
      this.button.callback = callback;
      this.button.context = context;

      this.style.font = fontSize + 'px Arial';
      this.text.text = label;
      this.text.x = Math.floor(x + this.width / 2);
      this.text.y = Math.floor(y + this.height / 2);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.group.removeChild(this.button);
      this.text.destroy();
      this.button.destroy();
    }
  }]);

  return LabeledButton;
}();

exports.default = LabeledButton;

/***/ }),
/* 203 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/view/menu/menuitems/Text.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Description goes here
 */
var Text = function () {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param {Phaser.Game} param.game
   * @param {} param.viewGroup
   * @param {} param.text
   * @param {} param.fontSize
   * @param {number} param.x
   * @param {number} param.y
   */
  function Text(_ref) {
    var game = _ref.game,
        menuSize = _ref.menuSize,
        viewGroup = _ref.viewGroup,
        text = _ref.text,
        fontSize = _ref.fontSize,
        x = _ref.x,
        y = _ref.y,
        anchor = _ref.anchor;

    _classCallCheck(this, Text);

    this.type = 'text';

    this.style = { font: fontSize + 'px Arial', fill: '#ffff00', align: 'center' };
    this.text = game.add.text(x, y, text, this.style, viewGroup);
    this.text.anchor.set(anchor.x, anchor.y);
    this.text.wordWrap = true;
    this.text.wordWrapWidth = menuSize;
  }

  _createClass(Text, [{
    key: 'update',
    value: function update(text, fontSize, x, y) {
      this.style.font = fontSize + 'px Arial';

      this.text.text = text;
      this.text.x = x;
      this.text.y = y;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.text.destroy();
    }
  }]);

  return Text;
}();

exports.default = Text;

/***/ }),
/* 204 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./~/collections/_dict.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Shim = __webpack_require__(/*! ./shim */ 31);
var GenericCollection = __webpack_require__(/*! ./generic-collection */ 30);
var GenericMap = __webpack_require__(/*! ./generic-map */ 108);

// Burgled from https://github.com/domenic/dict

module.exports = Dict;
function Dict(values, getDefault) {
    if (!(this instanceof Dict)) {
        return new Dict(values, getDefault);
    }
    getDefault = getDefault || Function.noop;
    this.getDefault = getDefault;
    this.store = Object.create(null);
    this.length = 0;
    this.addEach(values);
}

Dict.Dict = Dict; // hack so require("dict").Dict will work in MontageJS.

Object.addEach(Dict.prototype, GenericCollection.prototype);
Object.addEach(Dict.prototype, GenericMap.prototype);

Dict.from = GenericCollection.from;

Dict.prototype.constructClone = function (values) {
    return new this.constructor(values, this.getDefault);
};

Dict.prototype.assertString = function (key) {
    if (typeof key !== "string") {
        throw new TypeError("key must be a string but Got " + key);
    }
}

Object.defineProperty(Dict.prototype,"$__proto__",{writable:true});
Object.defineProperty(Dict.prototype,"_hasProto",{
    get:function() {
        return this.hasOwnProperty("$__proto__") && typeof this._protoValue !== "undefined";
    }
});
Object.defineProperty(Dict.prototype,"_protoValue",{
    get:function() {
        return this["$__proto__"];
    },
    set: function(value) {
        this["$__proto__"] = value;
    }
});

Object.defineProperty(Dict.prototype,"size",GenericCollection._sizePropertyDescriptor);


Dict.prototype.get = function (key, defaultValue) {
    this.assertString(key);
    if (key === "__proto__") {
        if (this._hasProto) {
            return this._protoValue;
        } else if (arguments.length > 1) {
            return defaultValue;
        } else {
            return this.getDefault(key);
        }
    }
    else {
        if (key in this.store) {
            return this.store[key];
        } else if (arguments.length > 1) {
            return defaultValue;
        } else {
            return this.getDefault(key);
        }
    }
};

Dict.prototype.set = function (key, value) {
    this.assertString(key);
    var isProtoKey = (key === "__proto__");

    if (isProtoKey ? this._hasProto : key in this.store) { // update
        if (this.dispatchesMapChanges) {
            this.dispatchBeforeMapChange(key, isProtoKey ? this._protoValue : this.store[key]);
        }

        isProtoKey
            ? this._protoValue = value
            : this.store[key] = value;

        if (this.dispatchesMapChanges) {
            this.dispatchMapChange(key, value);
        }
        return false;
    } else { // create
        if (this.dispatchesMapChanges) {
            this.dispatchBeforeMapChange(key, undefined);
        }
        this.length++;

        isProtoKey
            ? this._protoValue = value
            : this.store[key] = value;

        if (this.dispatchesMapChanges) {
            this.dispatchMapChange(key, value);
        }
        return true;
    }
};

Dict.prototype.has = function (key) {
    this.assertString(key);
    return key === "__proto__" ? this._hasProto : key in this.store;
};

Dict.prototype["delete"] = function (key) {
    this.assertString(key);
    if (key === "__proto__") {
        if (this._hasProto) {
            if (this.dispatchesMapChanges) {
                this.dispatchBeforeMapChange(key, this._protoValue);
            }
            this._protoValue = undefined;
            this.length--;
            if (this.dispatchesMapChanges) {
                this.dispatchMapChange(key, undefined);
            }
            return true;
        }
        return false;
    }
    else {
        if (key in this.store) {
            if (this.dispatchesMapChanges) {
                this.dispatchBeforeMapChange(key, this.store[key]);
            }
            delete this.store[key];
            this.length--;
            if (this.dispatchesMapChanges) {
                this.dispatchMapChange(key, undefined);
            }
            return true;
        }
        return false;
    }
};

Dict.prototype.clear = function () {
    var key;
    if (this._hasProto) {
        if (this.dispatchesMapChanges) {
            this.dispatchBeforeMapChange("__proto__", this._protoValue);
        }
        this._protoValue = undefined;
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange("__proto__", undefined);
        }
    }
    for (key in this.store) {
        if (this.dispatchesMapChanges) {
            this.dispatchBeforeMapChange(key, this.store[key]);
        }
        delete this.store[key];
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange(key, undefined);
        }
    }
    this.length = 0;
};

Dict.prototype.reduce = function (callback, basis, thisp) {
    if(this._hasProto) {
        basis = callback.call(thisp, basis, "$__proto__", "__proto__", this);
    }
    var store = this.store;
    for (var key in this.store) {
        basis = callback.call(thisp, basis, store[key], key, this);
    }
    return basis;
};

Dict.prototype.reduceRight = function (callback, basis, thisp) {
    var self = this;
    var store = this.store;
    basis = Object.keys(this.store).reduceRight(function (basis, key) {
        return callback.call(thisp, basis, store[key], key, self);
    }, basis);

    if(this._hasProto) {
        return callback.call(thisp, basis, this._protoValue, "__proto__", self);
    }
    return basis;
};

Dict.prototype.one = function () {
    var key;
    for (key in this.store) {
        return this.store[key];
    }
    return this._protoValue;
};

Dict.prototype.toJSON = function () {
    return this.toObject();
};


/***/ }),
/* 205 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/collections/_fast-set.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Shim = __webpack_require__(/*! ./shim */ 31);
var Dict = __webpack_require__(/*! ./_dict */ 204);
var List = __webpack_require__(/*! ./_list */ 107);
var GenericCollection = __webpack_require__(/*! ./generic-collection */ 30);
var GenericSet = __webpack_require__(/*! ./generic-set */ 110);
var TreeLog = __webpack_require__(/*! ./tree-log */ 210);

var object_has = Object.prototype.hasOwnProperty;

module.exports = FastSet;

function FastSet(values, equals, hash, getDefault) {
    if (!(this instanceof FastSet)) {
        return new FastSet(values, equals, hash, getDefault);
    }
    equals = equals || Object.equals;
    hash = hash || Object.hash;
    getDefault = getDefault || Function.noop;
    this.contentEquals = equals;
    this.contentHash = hash;
    this.getDefault = getDefault;
    var self = this;
    this.buckets = new this.Buckets(null, function getDefaultBucket() {
        return new self.Bucket();
    });
    this.length = 0;
    this.addEach(values);
}

FastSet.FastSet = FastSet; // hack so require("fast-set").FastSet will work in MontageJS

Object.addEach(FastSet.prototype, GenericCollection.prototype);
Object.addEach(FastSet.prototype, GenericSet.prototype);
FastSet.from = GenericCollection.from;

FastSet.prototype.Buckets = Dict;
FastSet.prototype.Bucket = List;

FastSet.prototype.constructClone = function (values) {
    return new this.constructor(
        values,
        this.contentEquals,
        this.contentHash,
        this.getDefault
    );
};

FastSet.prototype.has = function (value) {
    var hash = this.contentHash(value);
    return this.buckets.get(hash).has(value);
};

FastSet.prototype.get = function (value, equals) {
    if (equals) {
        throw new Error("FastSet#get does not support second argument: equals");
    }
    var hash = this.contentHash(value);
    var buckets = this.buckets;
    if (buckets.has(hash)) {
        return buckets.get(hash).get(value);
    } else {
        return this.getDefault(value);
    }
};

FastSet.prototype["delete"] = function (value, equals) {
    if (equals) {
        throw new Error("FastSet#delete does not support second argument: equals");
    }
    var hash = this.contentHash(value);
    var buckets = this.buckets;
    if (buckets.has(hash)) {
        var bucket = buckets.get(hash);
        if (bucket["delete"](value)) {
            this.length--;
            if (bucket.length === 0) {
                buckets["delete"](hash);
            }
            return true;
        }
    }
    return false;
};

FastSet.prototype.clear = function () {
    this.buckets.clear();
    this.length = 0;
};

FastSet.prototype.add = function (value) {
    var hash = this.contentHash(value);
    var buckets = this.buckets;
    if (!buckets.has(hash)) {
        buckets.set(hash, new this.Bucket(null, this.contentEquals));
    }
    if (!buckets.get(hash).has(value)) {
        buckets.get(hash).add(value);
        this.length++;
        return true;
    }
    return false;
};

FastSet.prototype.reduce = function (callback, basis /*, thisp*/) {
    var thisp = arguments[2];
    var buckets = this.buckets;
    var index = 0;
    return buckets.reduce(function (basis, bucket) {
        return bucket.reduce(function (basis, value) {
            return callback.call(thisp, basis, value, index++, this);
        }, basis, this);
    }, basis, this);
};

FastSet.prototype.one = function () {
    if (this.length > 0) {
        return this.buckets.one().one();
    }
};

FastSet.prototype.iterate = function () {
    return this.buckets.valuesArray().flatten().iterate();
};

FastSet.prototype.log = function (charmap, logNode, callback, thisp) {
    charmap = charmap || TreeLog.unicodeSharp;
    logNode = logNode || this.logNode;
    if (!callback) {
        callback = console.log;
        thisp = console;
    }
    callback = callback.bind(thisp);

    var buckets = this.buckets, bucketsSize = buckets.size,
        mapIter = buckets.keys(), hash, index = 0,
        branch, leader, bucket;

    while (hash = mapIter.next().value) {
        if (index === bucketsSize - 1) {
            branch = charmap.fromAbove;
            leader = ' ';
        } else if (index === 0) {
            branch = charmap.branchDown;
            leader = charmap.strafe;
        } else {
            branch = charmap.fromBoth;
            leader = charmap.strafe;
        }
        bucket = buckets.get(hash);
        callback.call(thisp, branch + charmap.through + charmap.branchDown + ' ' + hash);
        bucket.forEach(function (value, node) {
            var branch, below, written;
            if (node === bucket.head.prev) {
                branch = charmap.fromAbove;
                below = ' ';
            } else {
                branch = charmap.fromBoth;
                below = charmap.strafe;
            }
            logNode(
                node,
                function (line) {
                    if (!written) {
                        callback.call(thisp, leader + ' ' + branch + charmap.through + charmap.through + line);
                        written = true;
                    } else {
                        callback.call(thisp, leader + ' ' + below + '  ' + line);
                    }
                },
                function (line) {
                    callback.call(thisp, leader + ' ' + charmap.strafe + '  ' + line);
                }
            );
        });
        index++;
    }

    //var hashes = buckets.keysArray();
    // hashes.forEach(function (hash, index) {
    //     var branch;
    //     var leader;
    //     if (index === hashes.length - 1) {
    //         branch = charmap.fromAbove;
    //         leader = ' ';
    //     } else if (index === 0) {
    //         branch = charmap.branchDown;
    //         leader = charmap.strafe;
    //     } else {
    //         branch = charmap.fromBoth;
    //         leader = charmap.strafe;
    //     }
    //     var bucket = buckets.get(hash);
    //     callback.call(thisp, branch + charmap.through + charmap.branchDown + ' ' + hash);
    //     bucket.forEach(function (value, node) {
    //         var branch, below;
    //         if (node === bucket.head.prev) {
    //             branch = charmap.fromAbove;
    //             below = ' ';
    //         } else {
    //             branch = charmap.fromBoth;
    //             below = charmap.strafe;
    //         }
    //         var written;
    //         logNode(
    //             node,
    //             function (line) {
    //                 if (!written) {
    //                     callback.call(thisp, leader + ' ' + branch + charmap.through + charmap.through + line);
    //                     written = true;
    //                 } else {
    //                     callback.call(thisp, leader + ' ' + below + '  ' + line);
    //                 }
    //             },
    //             function (line) {
    //                 callback.call(thisp, leader + ' ' + charmap.strafe + '  ' + line);
    //             }
    //         );
    //     });
    // });
};

FastSet.prototype.logNode = function (node, write) {
    var value = node.value;
    if (Object(value) === value) {
        JSON.stringify(value, null, 4).split("\n").forEach(function (line) {
            write(" " + line);
        });
    } else {
        write(" " + value);
    }
};


/***/ }),
/* 206 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./~/collections/_set.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Shim = __webpack_require__(/*! ./shim */ 31);
var GenericCollection = __webpack_require__(/*! ./generic-collection */ 30);
var GenericSet = __webpack_require__(/*! ./generic-set */ 110);
var Set, GlobalSet, CollectionsSet;


if((global.Set !== void 0) && (typeof global.Set.prototype.values === "function")) {

    GlobalSet = module.exports = global.Set;
    GlobalSet.Set = GlobalSet; // hack so require("set").Set will work in MontageJS

    GlobalSet.prototype.reduce = function (callback, basis /*, thisp*/) {
        var thisp = arguments[2];
        this.forEach(function(value) {
            basis = callback.call(thisp, basis, value, this);
        });
        return basis;
    };

    GlobalSet.prototype.reduceRight = function (callback, basis /*, thisp*/) {
        var thisp = arguments[2];
        var setIterator = this.values();
        var size = this.size;
        var reverseOrder = new Array(this.size);
        var value, i = 0;
        while ((value = setIterator.next().value)) {
            reverseOrder[--size] = value;
        }
        while (i++ < size) {
            basis = callback.call(thisp, basis, value, this);
        }
        return basis;
    };

    GlobalSet.prototype.equals = function (that, equals) {
        var self = this;
        return (
            that && typeof that.reduce === "function" &&
            this.size === (that.size || that.length) &&
            that.reduce(function (equal, value) {
                return equal && self.has(value, equals);
            }, true)
        );
    };

    GlobalSet.prototype.constructClone = function (values) {
        return new this.constructor(values, this.contentEquals, this.contentHash, this.getDefault);
    };

    GlobalSet.prototype.toJSON = function () {
        return this.entriesArray();
    };

    GlobalSet.prototype.one = function () {
        if (this.size > 0) {
            return this.values().next().value;
        }
        return undefined;
    };

    GlobalSet.prototype.pop = function () {
        if (this.size) {
            var setIterator = this.values(), aValue, value;
            while(aValue = setIterator.next().value) {
                value = aValue;
            }
            this["delete"](value,this.size-1);
            return value;
        }
    };

    GlobalSet.prototype.shift = function () {
        if (this.size) {
            var firstValue = this.values().next().value;
            this["delete"](firstValue,0);
            return firstValue;
        }
    };

    //Backward compatibility:
    Object.defineProperty(GlobalSet.prototype,"length",{
        get: function() {
            return this.size;
        },
        enumerable: true,
        configurable:true
    });

    GlobalSet.from = function (value) {
        var result = (new this);
        result.addEach(value);
        return result;
    };

    Object.addEach(GlobalSet.prototype, GenericCollection.prototype, false);
    Object.addEach(GlobalSet.prototype, GenericSet.prototype, false);

}



    var List = __webpack_require__(/*! ./_list */ 107);
    var FastSet = __webpack_require__(/*! ./_fast-set */ 205);
    var Iterator = __webpack_require__(/*! ./iterator */ 111);

    CollectionsSet = function CollectionsSet(values, equals, hash, getDefault) {
        return CollectionsSet._init(CollectionsSet, this, values, equals, hash, getDefault);
    }

    CollectionsSet._init = function (constructor, object, values, equals, hash, getDefault) {
        if (!(object instanceof constructor)) {
            return new constructor(values, equals, hash, getDefault);
        }
        equals = equals || Object.equals;
        hash = hash || Object.hash;
        getDefault = getDefault || Function.noop;
        object.contentEquals = equals;
        object.contentHash = hash;
        object.getDefault = getDefault;
        // a list of values in insertion order, used for all operations that depend
        // on iterating in insertion order
        object.order = new object.Order(undefined, equals);
        // a set of nodes from the order list, indexed by the corresponding value,
        // used for all operations that need to quickly seek  value in the list
        object.store = new object.Store(
            undefined,
            function (a, b) {
                return equals(a.value, b.value);
            },
            function (node) {
                return hash(node.value);
            }
        );
        object.length = 0;
        object.addEach(values);

    }

    CollectionsSet.Set = CollectionsSet; // hack so require("set").Set will work in MontageJS
    CollectionsSet.CollectionsSet = CollectionsSet;

    Object.addEach(CollectionsSet.prototype, GenericCollection.prototype);
    Object.addEach(CollectionsSet.prototype, GenericSet.prototype);

    CollectionsSet.from = GenericCollection.from;

    Object.defineProperty(CollectionsSet.prototype,"size",GenericCollection._sizePropertyDescriptor);

    //Overrides for consistency:
    // Set.prototype.forEach = GenericCollection.prototype.forEach;


    CollectionsSet.prototype.Order = List;
    CollectionsSet.prototype.Store = FastSet;

    CollectionsSet.prototype.constructClone = function (values) {
        return new this.constructor(values, this.contentEquals, this.contentHash, this.getDefault);
    };

    CollectionsSet.prototype.has = function (value) {
        var node = new this.order.Node(value);
        return this.store.has(node);
    };

    CollectionsSet.prototype.get = function (value, equals) {
        if (equals) {
            throw new Error("Set#get does not support second argument: equals");
        }
        var node = new this.order.Node(value);
        node = this.store.get(node);
        if (node) {
            return node.value;
        } else {
            return this.getDefault(value);
        }
    };

    CollectionsSet.prototype.add = function (value) {
        var node = new this.order.Node(value);
        if (!this.store.has(node)) {
            var index = this.length;
            this.order.add(value);
            node = this.order.head.prev;
            this.store.add(node);
            this.length++;
            return true;
        }
        return false;
    };

    CollectionsSet.prototype["delete"] = function (value, equals) {
        if (equals) {
            throw new Error("Set#delete does not support second argument: equals");
        }
        var node = new this.order.Node(value);
        if (this.store.has(node)) {
            node = this.store.get(node);
            this.store["delete"](node); // removes from the set
            this.order.splice(node, 1); // removes the node from the list
            this.length--;
            return true;
        }
        return false;
    };

    CollectionsSet.prototype.pop = function () {
        if (this.length) {
            var result = this.order.head.prev.value;
            this["delete"](result);
            return result;
        }
    };

    CollectionsSet.prototype.shift = function () {
        if (this.length) {
            var result = this.order.head.next.value;
            this["delete"](result);
            return result;
        }
    };

    CollectionsSet.prototype.one = function () {
        if (this.length > 0) {
            return this.store.one().value;
        }
    };

    CollectionsSet.prototype.clear = function () {
        this.store.clear();
        this.order.clear();
        this.length = 0;
    };
    Object.defineProperty(CollectionsSet.prototype,"_clear", {
        value: CollectionsSet.prototype.clear
    });

    CollectionsSet.prototype.reduce = function (callback, basis /*, thisp*/) {
        var thisp = arguments[2];
        var list = this.order;
        var index = 0;
        return list.reduce(function (basis, value) {
            return callback.call(thisp, basis, value, index++, this);
        }, basis, this);
    };

    CollectionsSet.prototype.reduceRight = function (callback, basis /*, thisp*/) {
        var thisp = arguments[2];
        var list = this.order;
        var index = this.length - 1;
        return list.reduceRight(function (basis, value) {
            return callback.call(thisp, basis, value, index--, this);
        }, basis, this);
    };

    CollectionsSet.prototype.iterate = function () {
        return this.order.iterate();
    };

    CollectionsSet.prototype.values = function () {
        return new Iterator(this.valuesArray());
    };

    CollectionsSet.prototype.log = function () {
        var set = this.store;
        return set.log.apply(set, arguments);
    };



if(!GlobalSet) {
    module.exports = CollectionsSet;
}
else {
    GlobalSet.prototype.valuesArray = GenericSet.prototype.valuesArray;
    GlobalSet.prototype.entriesArray = GenericSet.prototype.entriesArray;
    module.exports = GlobalSet;
    GlobalSet.CollectionsSet = CollectionsSet;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 28)))

/***/ }),
/* 207 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./~/collections/heap.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {


// Adapted from Eloquent JavaScript by Marijn Haverbeke
// http://eloquentjavascript.net/appendix2.html

var ArrayChanges = __webpack_require__(/*! ./listen/array-changes */ 208);
var Shim = __webpack_require__(/*! ./shim */ 31);
var GenericCollection = __webpack_require__(/*! ./generic-collection */ 30);
var MapChanges = __webpack_require__(/*! ./listen/map-changes */ 112);
var RangeChanges = __webpack_require__(/*! ./listen/range-changes */ 114);
var PropertyChanges = __webpack_require__(/*! ./listen/property-changes */ 113);

// Max Heap by default.  Comparison can be reversed to produce a Min Heap.

module.exports = Heap;

function Heap(values, equals, compare) {
    if (!(this instanceof Heap)) {
        return new Heap(values, equals, compare);
    }
    this.contentEquals = equals || Object.equals;
    this.contentCompare = compare || Object.compare;
    this.content = [];
    this.length = 0;
    this.addEach(values);
}

Heap.Heap = Heap; // hack so require("heap").Heap will work in MontageJS

Object.addEach(Heap.prototype, GenericCollection.prototype);
Object.addEach(Heap.prototype, PropertyChanges.prototype);
Object.addEach(Heap.prototype, RangeChanges.prototype);
Object.addEach(Heap.prototype, MapChanges.prototype);

Heap.from = GenericCollection.from;

Heap.prototype.constructClone = function (values) {
    return new this.constructor(
        values,
        this.contentEquals,
        this.contentCompare
    );
};

// TODO variadic
Heap.prototype.push = function (value) {
    this.content.push(value);
    this.float(this.content.length - 1);
    this.length++;
};

Heap.prototype.pop = function () {
    // Store the first value so we can return it later.  This will leave a gap
    // at index 0 that must be filled.
    var result = this.content[0];
    // Remove the value at the end of the array.  The value most be removed
    // from the end to preserve the completness of the tree, despite that the
    // last child is also among the most likely to need to sink back to the
    // bottom.
    var top = this.content.pop();
    // If there are any values remaining, put the last value on the top and
    // let it sink back down.
    if (this.content.length > 0) {
        this.content.set(0, top);
        this.sink(0);
    }
    this.length--;
    return result;
};

Heap.prototype.add = function (value) {
    this.push(value);
};

// indexOf must do a linear search since a binary heap does not preserve a
// strict sort order.  Thus, deletion takes linear time for all values except
// for the max value.

Heap.prototype.indexOf = function (value) {
    for (var index = 0; index < this.length; index++) {
        if (this.contentEquals(this.content[index], value)) {
            return index;
        }
    }
    return -1;
};

Heap.prototype["delete"] = function (value, equals) {
    if (equals) {
        throw new Error("Heap#delete does not support second argument: equals");
    }
    var index = this.indexOf(value);
    if (index === -1)
        return false;
    var top = this.content.pop();
    this.length = this.content.length;
    if (index === this.content.length)
        return true;
    this.content.set(index, top);
    var comparison = this.contentCompare(top, value);
    if (comparison > 0) {
        this.float(index);
    } else if (comparison < 0) {
        this.sink(index);
    }
    return true;
};

Heap.prototype.peek = function () {
    if (this.length) {
        return this.content[0];
    }
};

Heap.prototype.max = function () {
    return this.peek();
};

Heap.prototype.one = function () {
    return this.peek();
};

// Brings a value up until its parent is greater than it
Heap.prototype.float = function (index) {
    // Grab the value that is being adjusted
    var value = this.content[index];
    // A value can go no higher that the top: index 0
    while (index > 0) {
        // Compute the parent value's index and fetch it
        var parentIndex = Math.floor((index + 1) / 2) - 1;
        var parent = this.content[parentIndex];
        // If the parent is less than it
        if (this.contentCompare(parent, value) < 0) {
            this.content.set(parentIndex, value);
            this.content.set(index, parent);
        } else {
            // Stop propagating if the parent is greater than the value.
            break;
        }
        // Proceed upward
        index = parentIndex;
    }
};

// Brings a value down until its children are both less than it
Heap.prototype.sink = function (index) {
    // Moves a value downward until it is greater than its children.
    var length = this.content.length;
    var value = this.content[index];
    var left, right, leftIndex, rightIndex, swapIndex, needsSwap;

    while (true) {
        // Invariant: the value is at index.
        // Variant: the index proceedes down the tree.

        // Compute the indicies of the children.
        rightIndex = (index + 1) * 2;
        leftIndex = rightIndex - 1;

        // If the left child exists, determine whether it is greater than the
        // parent (value) and thus whether it can be floated upward.
        needsSwap = false;
        if (leftIndex < length) {
            // Look it up and compare it.
            var left = this.content[leftIndex];
            var comparison = this.contentCompare(left, value);
            // If the child is greater than the parent, it can be floated.
            if (comparison > 0) {
                swapIndex = leftIndex;
                needsSwap = true;
            }
        }

        // If the right child exists, determine whether it is greater than the
        // parent (value), or even greater than the left child.
        if (rightIndex < length) {
            var right = this.content[rightIndex];
            var comparison = this.contentCompare(right, needsSwap ? left : value);
            if (comparison > 0) {
                swapIndex = rightIndex;
                needsSwap = true;
            }
        }

        // if there is a child that is less than the value, float the child and
        // sink the value.
        if (needsSwap) {
            this.content.set(index, this.content[swapIndex]);
            this.content.set(swapIndex, value);
            index = swapIndex;
            // and continue sinking
        } else {
            // if the children are both less than the value
            break;
        }

    }

};

Heap.prototype.clear = function () {
    this.content.clear();
    this.length = 0;
};

Heap.prototype.reduce = function (callback, basis /*, thisp*/) {
    var thisp = arguments[2];
    return this.content.reduce(function (basis, value, key) {
        return callback.call(thisp, basis, value, key, this);
    }, basis, this);
};

Heap.prototype.reduceRight = function (callback, basis /*, thisp*/) {
    var thisp = arguments[2];
    return this.content.reduceRight(function (basis, value, key) {
        return callback.call(thisp, basis, value, key, this);
    }, basis, this);
};

Heap.prototype.toJSON = function () {
    return this.toArray();
};

Heap.prototype.makeObservable = function () {
    // TODO refactor dispatchers to allow direct forwarding
    this.content.addRangeChangeListener(this, "content");
    this.content.addBeforeRangeChangeListener(this, "content");
    this.content.addMapChangeListener(this, "content");
    this.content.addBeforeMapChangeListener(this, "content");
};

Heap.prototype.handleContentRangeChange = function (plus, minus, index) {
    this.dispatchRangeChange(plus, minus, index);
};

Heap.prototype.handleContentRangeWillChange = function (plus, minus, index) {
    this.dispatchBeforeRangeChange(plus, minus, index);
};

Heap.prototype.handleContentMapChange = function (value, key) {
    this.dispatchMapChange(key, value);
};

Heap.prototype.handleContentMapWillChange = function (value, key) {
    this.dispatchBeforeMapChange(key, value);
};


/***/ }),
/* 208 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/collections/listen/array-changes.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

/*
 Based in part on observable arrays from Motorola Mobility’s Montage
 Copyright (c) 2012, Motorola Mobility LLC. All Rights Reserved.
 3-Clause BSD License
 https://github.com/motorola-mobility/montage/blob/master/LICENSE.md
 */

/*
 This module is responsible for observing changes to owned properties of
 objects and changes to the content of arrays caused by method calls.
 The interface for observing array content changes establishes the methods
 necessary for any collection with observable content.
 */

__webpack_require__(/*! ../shim */ 31);
var array_splice = Array.prototype.splice,
    array_spliceOne = Array.prototype.spliceOne,
    array_slice = Array.prototype.slice,
    array_reverse = Array.prototype.reverse,
    array_sort = Array.prototype.sort,
    array_swap = Array.prototype.swap,
    array_push = Array.prototype.push,

// use different strategies for making arrays observable between Internet
// Explorer and other browsers.
    protoIsSupported = {}.__proto__ === Object.prototype,
    array_makeObservable,
    LENGTH = "length";

if (protoIsSupported) {
    array_makeObservable = function () {
        this.__proto__ = ChangeDispatchArray;
    };
} else {
    array_makeObservable = function () {
        Object.defineProperties(this, observableArrayProperties);
    };
}

Object.defineProperty(Array.prototype, "makeObservable", {
    value: array_makeObservable,
    writable: true,
    configurable: true,
    enumerable: false
});

//This is a no-op test in property-changes.js - PropertyChanges.prototype.makePropertyObservable, so might as well not pay the price every time....
Object.defineProperty(Array.prototype, "makePropertyObservable", {
    value: function(){},
    writable: true,
    configurable: true,
    enumerable: false
});

var observableArrayProperties = {

    isObservable: {
        value: true,
        writable: true,
        configurable: true
    },

    makeObservable: {
        value: Function.noop, // idempotent
        writable: true,
        configurable: true
    },

    reverse: {
        value: function reverse() {

            var reversed = this.constructClone(this);
            reversed.reverse();
            this.swap(0, this.length, reversed);

            return this;
        },
        writable: true,
        configurable: true
    },

    sort: {
        value: function sort() {
            var index, length;
            // dispatch before change events
            this.dispatchBeforeRangeChange(this, this, 0);
            for (index = 0, length = this.length; index < length; index++) {
                PropertyChanges.dispatchBeforeOwnPropertyChange(this, index, this[index]);
                this.dispatchBeforeMapChange(index, this[index]);
            }

            // actual work
            array_sort.apply(this, arguments);

            // dispatch after change events
            for (index = 0, length = this.length; index < length; index++) {
                PropertyChanges.dispatchOwnPropertyChange(this, index, this[index]);
                this.dispatchMapChange(index, this[index]);
            }
            this.dispatchRangeChange(this, this, 0);

            return this;
        },
        writable: true,
        configurable: true
    },

    _dispatchBeforeOwnPropertyChange: {
        value: function _dispatchBeforeOwnPropertyChange(start, length) {
            for (var i = start, countI = start+length; i < countI; i++) {
                PropertyChanges.dispatchBeforeOwnPropertyChange(this, i, this[i]);
                this.dispatchBeforeMapChange(i, this[i]);
            }
        }
    },

    _dispatchOwnPropertyChange: {
        value: function _dispatchOwnPropertyChange(start, length) {
            for (var i = start, countI = start+length; i < countI; i++) {
                this.dispatchOwnPropertyChange(i, this[i]);
                this.dispatchMapChange(i, this[i]);
            }
        }
    },

    swap: {
        value: function swap(start, length, plus) {
            var hasOwnPropertyChangeDescriptor, i, j, plusLength;
            if (plus) {
                if (!Array.isArray(plus)) {
                    plus = array_slice.call(plus);
                }
            } else {
                plus = Array.empty;
            }
            plusLength = plus.length;

            if (start < 0) {
                start = this.length + start;
            } else if (start > this.length) {
                var holes = start - this.length;
                var newPlus = Array(holes + plusLength);
                for (i = 0, j = holes; i < plusLength; i++, j++) {
                    if (i in plus) {
                        newPlus[j] = plus[i];
                    }
                }
                plus = newPlus;
                plusLength = plus.length;
                start = this.length;
            }

            var minus;
            if (length === 0) {
                // minus will be empty
                if (plusLength === 0) {
                    // at this point if plus is empty there is nothing to do.
                    return []; // [], but spare us an instantiation
                }
                minus = Array.empty;
            } else {
                minus = array_slice.call(this, start, start + length);
            }
            var diff = plusLength - minus.length;
            var oldLength = this.length;
            var newLength = Math.max(this.length + diff, start + plusLength);
            var longest = (oldLength > newLength) ? oldLength : newLength;
            // dispatch before change events
            if (diff) {
                PropertyChanges.dispatchBeforeOwnPropertyChange(this, LENGTH, this.length);
            }
            this.dispatchBeforeRangeChange(plus, minus, start);
            if (diff === 0) { // substring replacement
                this._dispatchBeforeOwnPropertyChange(start, plusLength);
            } else if ((hasOwnPropertyChangeDescriptor = PropertyChanges.hasOwnPropertyChangeDescriptor(this))) {
                // all subsequent values changed or shifted.
                // avoid (longest - start) long walks if there are no
                // registered descriptors.
                this._dispatchBeforeOwnPropertyChange(start, longest-start);
            }

            // actual work
            if (start > oldLength) {
                this.length = start;
            }
            var result = array_swap.call(this, start, length, plus);

            // dispatch after change events
            if (diff === 0) { // substring replacement
                this._dispatchOwnPropertyChange(start,plusLength);
            } else if (hasOwnPropertyChangeDescriptor) {
                // all subsequent values changed or shifted.
                // avoid (longest - start) long walks if there are no
                // registered descriptors.
                this._dispatchOwnPropertyChange(start,longest-start);
            }
            this.dispatchRangeChange(plus, minus, start);
            if (diff) {
                this.dispatchOwnPropertyChange(LENGTH, this.length);
            }

            return result;
        },
        writable: true,
        configurable: true
    },

    splice: {
        value: function splice(start, length) {
            // start parameter should be min(start, this.length)
            // http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.12
            if (start > this.length) {
                start = this.length;
            }
            return this.swap.call(this, start, length, array_slice.call(arguments, 2));
        },
        writable: true,
        configurable: true
    },

    // splice is the array content change utility belt.  forward all other
    // content changes to splice so we only have to write observer code in one
    // place

    spliceOne: {
        value: function splice(start,itemToAdd) {
            //Nothhing to add so length will go down by one.
            var plus, minus, oldLength = this.length, newLength, longest, argumentsLength = arguments.length, hasOwnPropertyChangeDescriptor;
            if(argumentsLength === 1) {
                PropertyChanges.dispatchBeforeOwnPropertyChange(this, LENGTH, this.length);
                newLength = this.length - 1;
                plus = Array.empty;
            }
            //Care about 2 only
            else {
                plus = [itemToAdd];
                newLength = this.length;
            }
            minus = [this[start]];
            longest = (oldLength > newLength) ? oldLength : newLength;

            this.dispatchBeforeRangeChange(plus, minus, start);
            if (argumentsLength === 2) { // substring replacement
                this._dispatchBeforeOwnPropertyChange(start, 1);
            } else if ((hasOwnPropertyChangeDescriptor = PropertyChanges.hasOwnPropertyChangeDescriptor(this))) {
                // all subsequent values changed or shifted.
                // avoid (longest - start) long walks if there are no
                // registered descriptors.
                this._dispatchBeforeOwnPropertyChange(start, longest-start);
            }

            if (argumentsLength === 1) { // substring replacement
                array_spliceOne.call(this,start);
            }
            else {
                array_spliceOne.call(this,start,itemToAdd);
            }

            // dispatch after change events
            if (argumentsLength === 2) { // substring replacement
                this._dispatchOwnPropertyChange(start,1);
            } else if (hasOwnPropertyChangeDescriptor) {
                // all subsequent values changed or shifted.
                // avoid (longest - start) long walks if there are no
                // registered descriptors.
                this._dispatchOwnPropertyChange(start,longest-start);
            }
            this.dispatchRangeChange(plus, minus, start);

            if(argumentsLength === 1) {
                this.dispatchOwnPropertyChange(LENGTH, this.length);
            }

        },
        writable: true,
        configurable: true
    },
    _setSwapBuffer: {
        get: function() {
            return this.__setSwapBuffer || (Object.defineProperty(this,"__setSwapBuffer",{
                value: [],
                writable: true,
                configurable: true,
                enumerable: false
            })).__setSwapBuffer;
        },
        enumerable: false
    },
    set: {
        value: function set(index, value) {
            var hasValue = typeof value !== undefined,
                diff ,
                plus = hasValue ? [] : Array.empty,
                minus,
                start,
                hasOwnPropertyChangeDescriptor;


            if(index >= this.length) {
                plus[index - this.length] = value;
                diff = (index + 1) - this.length;
                start = this.length;
            }
            else {
                plus[0] = value;
                diff = 0;
                start = index;
            }
            minus = diff === 0 ? [this[index]] : Array.empty;


            if(diff>0) {
                PropertyChanges.dispatchBeforeOwnPropertyChange(this, LENGTH, this.length);
            }
            this.dispatchBeforeRangeChange(plus, minus, start);
            if (diff === 0) { // substring replacement
                this._dispatchBeforeOwnPropertyChange(start, 1);
            } else if ((hasOwnPropertyChangeDescriptor = PropertyChanges.hasOwnPropertyChangeDescriptor(this))) {
                // all subsequent values changed or shifted.
                // avoid (longest - start) long walks if there are no
                // registered descriptors.
                this._dispatchBeforeOwnPropertyChange(start, diff);
            }

            this[index] = value;

            // dispatch after change events
            if (diff === 0) { // substring replacement
                this._dispatchOwnPropertyChange(start,1);
            } else if (hasOwnPropertyChangeDescriptor) {
                // all subsequent values changed or shifted.
                // avoid (longest - start) long walks if there are no
                // registered descriptors.
                this._dispatchOwnPropertyChange(start,diff);
            }
            this.dispatchRangeChange(plus, minus, start);
            if (diff) {
                this.dispatchOwnPropertyChange(LENGTH, this.length);
            }
            return true;
        },
        writable: true,
        configurable: true
    },

    shift: {
        value: function shift() {
            return this.splice(0, 1)[0];
        },
        writable: true,
        configurable: true
    },

    pop: {
        value: function pop() {
            if (this.length) {
                return this.splice(this.length - 1, 1)[0];
            }
        },
        writable: true,
        configurable: true
    },

    push: {
        value: function push(arg) {
            var start = this.length,
                addedCount = arguments.length,
                argArray,
                hasOwnPropertyChangeDescriptor;

            argArray = addedCount === 1 ? [arguments[0]] : Array.apply(null, arguments);

            if(addedCount > 0) {
                PropertyChanges.dispatchBeforeOwnPropertyChange(this, LENGTH, start);
                this.dispatchBeforeRangeChange(argArray, Array.empty, start);

                if(hasOwnPropertyChangeDescriptor = PropertyChanges.hasOwnPropertyChangeDescriptor(this)) {
                    this._dispatchBeforeOwnPropertyChange(start, addedCount);
                }
            }

            array_push.apply(this,arguments);

            if (addedCount > 0) {
                if (hasOwnPropertyChangeDescriptor) {
                    this._dispatchOwnPropertyChange(start,addedCount);
                }
                this.dispatchRangeChange(argArray,Array.empty, start);
                this.dispatchOwnPropertyChange(LENGTH, this.length);
            }

        },
        writable: true,
        configurable: true
    },

    unshift: {
        value: function unshift(arg) {
            if (arguments.length === 1) {
                return this.splice(0, 0, arg);
            } else {
                var args = array_slice.call(arguments);
                return this.swap(0, 0, args);
            }
        },
        writable: true,
        configurable: true
    },

    clear: {
        value: function clear() {
            return this.splice(0, this.length);
        },
        writable: true,
        configurable: true
    }

};

var ChangeDispatchArray = Object.create(Array.prototype, observableArrayProperties);
exports.observableArrayProperties = observableArrayProperties;

var PropertyChanges = __webpack_require__(/*! ./property-changes */ 113);
var RangeChanges = __webpack_require__(/*! ./range-changes */ 114);
var MapChanges = __webpack_require__(/*! ./map-changes */ 112);

Object.defineEach(Array.prototype, PropertyChanges.prototype, false, /*configurable*/true, /*enumerable*/ false, /*writable*/true);
Object.defineEach(Array.prototype, RangeChanges.prototype, false, /*configurable*/true, /*enumerable*/ false, /*writable*/true);
Object.defineEach(Array.prototype, MapChanges.prototype, false, /*configurable*/true, /*enumerable*/ false, /*writable*/true);


/***/ }),
/* 209 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/collections/shim-regexp.js ***!
  \**************************************/
/***/ (function(module, exports) {


/**
    accepts a string; returns the string with regex metacharacters escaped.
    the returned string can safely be used within a regex to match a literal
    string. escaped characters are [, ], {, }, (, ), -, *, +, ?, ., \, ^, $,
    |, #, [comma], and whitespace.
*/
if (!RegExp.escape) {
    var special = /[-[\]{}()*+?.\\^$|,#\s]/g;
    RegExp.escape = function (string) {
        return string.replace(special, "\\$&");
    };
}



/***/ }),
/* 210 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/collections/tree-log.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = TreeLog;

function TreeLog() {
}

TreeLog.ascii = {
    intersection: "+",
    through: "-",
    branchUp: "+",
    branchDown: "+",
    fromBelow: ".",
    fromAbove: "'",
    fromBoth: "+",
    strafe: "|"
};

TreeLog.unicodeRound = {
    intersection: "\u254b",
    through: "\u2501",
    branchUp: "\u253b",
    branchDown: "\u2533",
    fromBelow: "\u256d", // round corner
    fromAbove: "\u2570", // round corner
    fromBoth: "\u2523",
    strafe: "\u2503"
};

TreeLog.unicodeSharp = {
    intersection: "\u254b",
    through: "\u2501",
    branchUp: "\u253b",
    branchDown: "\u2533",
    fromBelow: "\u250f", // sharp corner
    fromAbove: "\u2517", // sharp corner
    fromBoth: "\u2523",
    strafe: "\u2503"
};



/***/ }),
/* 211 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/collections/weak-map.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = (global.WeakMap !== void 0) ? global.WeakMap : __webpack_require__(/*! weak-map */ 53);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 28)))

/***/ }),
/* 212 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/fn/regexp/escape.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 221);
module.exports = __webpack_require__(/*! ../../modules/_core */ 24).RegExp.escape;

/***/ }),
/* 213 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/_array-species-constructor.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , isArray  = __webpack_require__(/*! ./_is-array */ 81)
  , SPECIES  = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 214 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_array-species-create.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 213);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 215 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_date-to-primitive.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 216 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_enum-keys.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 40)
  , gOPS    = __webpack_require__(/*! ./_object-gops */ 66)
  , pIE     = __webpack_require__(/*! ./_object-pie */ 52);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 217 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_keyof.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(/*! ./_object-keys */ 40)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 218 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_partial.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(/*! ./_path */ 219)
  , invoke    = __webpack_require__(/*! ./_invoke */ 62)
  , aFunction = __webpack_require__(/*! ./_a-function */ 11);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 219 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_path.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_global */ 2);

/***/ }),
/* 220 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_replacer.js ***!
  \****************************************/
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 221 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/core.regexp.escape.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0)
  , $re     = __webpack_require__(/*! ./_replacer */ 220)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 222 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.array.copy-within.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(/*! ./_array-copy-within */ 118)});

__webpack_require__(/*! ./_add-to-unscopables */ 45)('copyWithin');

/***/ }),
/* 223 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.array.every.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $every  = __webpack_require__(/*! ./_array-methods */ 21)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 224 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.fill.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', {fill: __webpack_require__(/*! ./_array-fill */ 73)});

__webpack_require__(/*! ./_add-to-unscopables */ 45)('fill');

/***/ }),
/* 225 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.array.filter.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $filter = __webpack_require__(/*! ./_array-methods */ 21)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 226 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.array.find-index.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $find   = __webpack_require__(/*! ./_array-methods */ 21)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 45)(KEY);

/***/ }),
/* 227 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.find.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $find   = __webpack_require__(/*! ./_array-methods */ 21)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 45)(KEY);

/***/ }),
/* 228 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.for-each.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(/*! ./_export */ 0)
  , $forEach = __webpack_require__(/*! ./_array-methods */ 21)(0)
  , STRICT   = __webpack_require__(/*! ./_strict-method */ 20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 229 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.from.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(/*! ./_ctx */ 25)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , toObject       = __webpack_require__(/*! ./_to-object */ 9)
  , call           = __webpack_require__(/*! ./_iter-call */ 127)
  , isArrayIter    = __webpack_require__(/*! ./_is-array-iter */ 80)
  , toLength       = __webpack_require__(/*! ./_to-length */ 8)
  , createProperty = __webpack_require__(/*! ./_create-property */ 74)
  , getIterFn      = __webpack_require__(/*! ./core.get-iterator-method */ 97);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 64)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 230 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.index-of.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(/*! ./_export */ 0)
  , $indexOf      = __webpack_require__(/*! ./_array-includes */ 58)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 231 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.is-array.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', {isArray: __webpack_require__(/*! ./_is-array */ 81)});

/***/ }),
/* 232 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.join.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 15)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 51) != Object || !__webpack_require__(/*! ./_strict-method */ 20)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 233 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.array.last-index-of.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(/*! ./_export */ 0)
  , toIObject     = __webpack_require__(/*! ./_to-iobject */ 15)
  , toInteger     = __webpack_require__(/*! ./_to-integer */ 34)
  , toLength      = __webpack_require__(/*! ./_to-length */ 8)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 234 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.array.map.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $map    = __webpack_require__(/*! ./_array-methods */ 21)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 235 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.array.of.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(/*! ./_export */ 0)
  , createProperty = __webpack_require__(/*! ./_create-property */ 74);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 236 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.array.reduce-right.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $reduce = __webpack_require__(/*! ./_array-reduce */ 120);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 237 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.array.reduce.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $reduce = __webpack_require__(/*! ./_array-reduce */ 120);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 238 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.array.slice.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(/*! ./_export */ 0)
  , html       = __webpack_require__(/*! ./_html */ 78)
  , cof        = __webpack_require__(/*! ./_cof */ 18)
  , toIndex    = __webpack_require__(/*! ./_to-index */ 43)
  , toLength   = __webpack_require__(/*! ./_to-length */ 8)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 239 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.some.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $some   = __webpack_require__(/*! ./_array-methods */ 21)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 240 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.sort.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(/*! ./_export */ 0)
  , aFunction = __webpack_require__(/*! ./_a-function */ 11)
  , toObject  = __webpack_require__(/*! ./_to-object */ 9)
  , fails     = __webpack_require__(/*! ./_fails */ 3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 241 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.array.species.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 42)('Array');

/***/ }),
/* 242 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.date.now.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 243 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-iso-string.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 244 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.date.to-json.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(/*! ./_export */ 0)
  , toObject    = __webpack_require__(/*! ./_to-object */ 9)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 245 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-primitive.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(/*! ./_hide */ 12)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 215));

/***/ }),
/* 246 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-string.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(/*! ./_redefine */ 13)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 247 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.function.bind.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', {bind: __webpack_require__(/*! ./_bind */ 121)});

/***/ }),
/* 248 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es6.function.has-instance.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17)
  , HAS_INSTANCE   = __webpack_require__(/*! ./_wks */ 5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(/*! ./_object-dp */ 7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 249 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.function.name.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(/*! ./_object-dp */ 7).f
  , createDesc = __webpack_require__(/*! ./_property-desc */ 33)
  , has        = __webpack_require__(/*! ./_has */ 10)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 6) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 250 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.acosh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , log1p   = __webpack_require__(/*! ./_math-log1p */ 129)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 251 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.asinh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 252 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.atanh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 253 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.cbrt.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , sign    = __webpack_require__(/*! ./_math-sign */ 85);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 254 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.clz32.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 255 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.cosh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 256 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.expm1.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $expm1  = __webpack_require__(/*! ./_math-expm1 */ 84);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 257 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.math.fround.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , sign      = __webpack_require__(/*! ./_math-sign */ 85)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 258 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.hypot.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 259 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.imul.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 260 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.log10.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 261 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.log1p.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {log1p: __webpack_require__(/*! ./_math-log1p */ 129)});

/***/ }),
/* 262 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.log2.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 263 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.sign.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {sign: __webpack_require__(/*! ./_math-sign */ 85)});

/***/ }),
/* 264 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.sinh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , expm1   = __webpack_require__(/*! ./_math-expm1 */ 84)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 265 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.tanh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , expm1   = __webpack_require__(/*! ./_math-expm1 */ 84)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 266 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.trunc.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 267 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.number.constructor.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(/*! ./_global */ 2)
  , has               = __webpack_require__(/*! ./_has */ 10)
  , cof               = __webpack_require__(/*! ./_cof */ 18)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 79)
  , toPrimitive       = __webpack_require__(/*! ./_to-primitive */ 23)
  , fails             = __webpack_require__(/*! ./_fails */ 3)
  , gOPN              = __webpack_require__(/*! ./_object-gopn */ 39).f
  , gOPD              = __webpack_require__(/*! ./_object-gopd */ 16).f
  , dP                = __webpack_require__(/*! ./_object-dp */ 7).f
  , $trim             = __webpack_require__(/*! ./_string-trim */ 49).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(/*! ./_object-create */ 38)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(/*! ./_descriptors */ 6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 13)(global, NUMBER, $Number);
}

/***/ }),
/* 268 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.number.epsilon.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 269 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-finite.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 270 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-integer.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {isInteger: __webpack_require__(/*! ./_is-integer */ 126)});

/***/ }),
/* 271 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-nan.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 272 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-safe-integer.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , isInteger = __webpack_require__(/*! ./_is-integer */ 126)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 273 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.number.max-safe-integer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 274 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.number.min-safe-integer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 275 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.number.parse-float.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(/*! ./_export */ 0)
  , $parseFloat = __webpack_require__(/*! ./_parse-float */ 136);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 276 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.number.parse-int.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , $parseInt = __webpack_require__(/*! ./_parse-int */ 137);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 277 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.number.to-fixed.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , toInteger    = __webpack_require__(/*! ./_to-integer */ 34)
  , aNumberValue = __webpack_require__(/*! ./_a-number-value */ 117)
  , repeat       = __webpack_require__(/*! ./_string-repeat */ 92)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 278 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.number.to-precision.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , $fails       = __webpack_require__(/*! ./_fails */ 3)
  , aNumberValue = __webpack_require__(/*! ./_a-number-value */ 117)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 279 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.assign.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./_object-assign */ 130)});

/***/ }),
/* 280 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.create.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(/*! ./_object-create */ 38)});

/***/ }),
/* 281 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.object.define-properties.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', {defineProperties: __webpack_require__(/*! ./_object-dps */ 131)});

/***/ }),
/* 282 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.object.define-property.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', {defineProperty: __webpack_require__(/*! ./_object-dp */ 7).f});

/***/ }),
/* 283 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.freeze.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 32).onFreeze;

__webpack_require__(/*! ./_object-sap */ 22)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 284 */
/* no static exports found */
/* all exports used */
/*!*********************************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(/*! ./_to-iobject */ 15)
  , $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

__webpack_require__(/*! ./_object-sap */ 22)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 285 */
/* no static exports found */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-own-property-names.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 22)('getOwnPropertyNames', function(){
  return __webpack_require__(/*! ./_object-gopn-ext */ 132).f;
});

/***/ }),
/* 286 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-prototype-of.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(/*! ./_to-object */ 9)
  , $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);

__webpack_require__(/*! ./_object-sap */ 22)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 287 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-extensible.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 22)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 288 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-frozen.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 22)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 289 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-sealed.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 22)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 290 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.object.is.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', {is: __webpack_require__(/*! ./_same-value */ 138)});

/***/ }),
/* 291 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.object.keys.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9)
  , $keys    = __webpack_require__(/*! ./_object-keys */ 40);

__webpack_require__(/*! ./_object-sap */ 22)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 292 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es6.object.prevent-extensions.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 32).onFreeze;

__webpack_require__(/*! ./_object-sap */ 22)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 293 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.object.seal.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 32).onFreeze;

__webpack_require__(/*! ./_object-sap */ 22)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 294 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.object.set-prototype-of.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 87).set});

/***/ }),
/* 295 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.to-string.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 50)
  , test    = {};
test[__webpack_require__(/*! ./_wks */ 5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(/*! ./_redefine */ 13)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 296 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.parse-float.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(/*! ./_export */ 0)
  , $parseFloat = __webpack_require__(/*! ./_parse-float */ 136);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 297 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.parse-int.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , $parseInt = __webpack_require__(/*! ./_parse-int */ 137);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 298 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/es6.promise.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(/*! ./_library */ 37)
  , global             = __webpack_require__(/*! ./_global */ 2)
  , ctx                = __webpack_require__(/*! ./_ctx */ 25)
  , classof            = __webpack_require__(/*! ./_classof */ 50)
  , $export            = __webpack_require__(/*! ./_export */ 0)
  , isObject           = __webpack_require__(/*! ./_is-object */ 4)
  , aFunction          = __webpack_require__(/*! ./_a-function */ 11)
  , anInstance         = __webpack_require__(/*! ./_an-instance */ 36)
  , forOf              = __webpack_require__(/*! ./_for-of */ 46)
  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 89)
  , task               = __webpack_require__(/*! ./_task */ 94).set
  , microtask          = __webpack_require__(/*! ./_microtask */ 86)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(/*! ./_set-to-string-tag */ 48)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 42)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 24)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 64)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 299 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.apply.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , aFunction = __webpack_require__(/*! ./_a-function */ 11)
  , anObject  = __webpack_require__(/*! ./_an-object */ 1)
  , rApply    = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 300 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.construct.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(/*! ./_export */ 0)
  , create     = __webpack_require__(/*! ./_object-create */ 38)
  , aFunction  = __webpack_require__(/*! ./_a-function */ 11)
  , anObject   = __webpack_require__(/*! ./_an-object */ 1)
  , isObject   = __webpack_require__(/*! ./_is-object */ 4)
  , fails      = __webpack_require__(/*! ./_fails */ 3)
  , bind       = __webpack_require__(/*! ./_bind */ 121)
  , rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 301 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.define-property.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(/*! ./_object-dp */ 7)
  , $export     = __webpack_require__(/*! ./_export */ 0)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 23);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 302 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.delete-property.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , gOPD     = __webpack_require__(/*! ./_object-gopd */ 16).f
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 303 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.enumerate.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 82)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 304 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(/*! ./_object-gopd */ 16)
  , $export  = __webpack_require__(/*! ./_export */ 0)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 305 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , getProto = __webpack_require__(/*! ./_object-gpo */ 17)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 306 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(/*! ./_object-gopd */ 16)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17)
  , has            = __webpack_require__(/*! ./_has */ 10)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 307 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.has.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 308 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.is-extensible.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(/*! ./_export */ 0)
  , anObject      = __webpack_require__(/*! ./_an-object */ 1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 309 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.own-keys.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(/*! ./_own-keys */ 135)});

/***/ }),
/* 310 */
/* no static exports found */
/* all exports used */
/*!*************************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(/*! ./_export */ 0)
  , anObject           = __webpack_require__(/*! ./_an-object */ 1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 311 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , setProto = __webpack_require__(/*! ./_set-proto */ 87);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 312 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.set.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(/*! ./_object-dp */ 7)
  , gOPD           = __webpack_require__(/*! ./_object-gopd */ 16)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17)
  , has            = __webpack_require__(/*! ./_has */ 10)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 33)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , isObject       = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 313 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.constructor.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(/*! ./_global */ 2)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 79)
  , dP                = __webpack_require__(/*! ./_object-dp */ 7).f
  , gOPN              = __webpack_require__(/*! ./_object-gopn */ 39).f
  , isRegExp          = __webpack_require__(/*! ./_is-regexp */ 63)
  , $flags            = __webpack_require__(/*! ./_flags */ 61)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(/*! ./_descriptors */ 6) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function(){
  re2[__webpack_require__(/*! ./_wks */ 5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 13)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 42)('RegExp');

/***/ }),
/* 314 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.match.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 60)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 315 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.replace.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 60)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 316 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.search.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 60)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 317 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.split.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 60)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(/*! ./_is-regexp */ 63)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 318 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.to-string.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 142);
var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , $flags      = __webpack_require__(/*! ./_flags */ 61)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(/*! ./_redefine */ 13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(/*! ./_fails */ 3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 319 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.anchor.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 14)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 320 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.big.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 14)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 321 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.blink.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 14)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 322 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.bold.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 14)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 323 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es6.string.code-point-at.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $at     = __webpack_require__(/*! ./_string-at */ 90)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 324 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.string.ends-with.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(/*! ./_export */ 0)
  , toLength  = __webpack_require__(/*! ./_to-length */ 8)
  , context   = __webpack_require__(/*! ./_string-context */ 91)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 77)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 325 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.fixed.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 14)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 326 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.string.fontcolor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 14)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 327 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.fontsize.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 14)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 328 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.string.from-code-point.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(/*! ./_export */ 0)
  , toIndex        = __webpack_require__(/*! ./_to-index */ 43)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 329 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.includes.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(/*! ./_export */ 0)
  , context  = __webpack_require__(/*! ./_string-context */ 91)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 77)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 330 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.string.italics.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 14)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 331 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.iterator.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(/*! ./_string-at */ 90)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 83)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 332 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.link.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 14)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 333 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.raw.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 15)
  , toLength  = __webpack_require__(/*! ./_to-length */ 8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 334 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.repeat.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 92)
});

/***/ }),
/* 335 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.small.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 14)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 336 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.string.starts-with.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(/*! ./_export */ 0)
  , toLength    = __webpack_require__(/*! ./_to-length */ 8)
  , context     = __webpack_require__(/*! ./_string-context */ 91)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 77)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 337 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.strike.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 14)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 338 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.sub.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 14)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 339 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.sup.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 14)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 340 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.trim.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 49)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 341 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/es6.symbol.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(/*! ./_global */ 2)
  , has            = __webpack_require__(/*! ./_has */ 10)
  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 6)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , redefine       = __webpack_require__(/*! ./_redefine */ 13)
  , META           = __webpack_require__(/*! ./_meta */ 32).KEY
  , $fails         = __webpack_require__(/*! ./_fails */ 3)
  , shared         = __webpack_require__(/*! ./_shared */ 67)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48)
  , uid            = __webpack_require__(/*! ./_uid */ 44)
  , wks            = __webpack_require__(/*! ./_wks */ 5)
  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 140)
  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 96)
  , keyOf          = __webpack_require__(/*! ./_keyof */ 217)
  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 216)
  , isArray        = __webpack_require__(/*! ./_is-array */ 81)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 15)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 23)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 33)
  , _create        = __webpack_require__(/*! ./_object-create */ 38)
  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 132)
  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 16)
  , $DP            = __webpack_require__(/*! ./_object-dp */ 7)
  , $keys          = __webpack_require__(/*! ./_object-keys */ 40)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 39).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 52).f  = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 66).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 37)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 342 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.array-buffer.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , $typed       = __webpack_require__(/*! ./_typed */ 68)
  , buffer       = __webpack_require__(/*! ./_typed-buffer */ 95)
  , anObject     = __webpack_require__(/*! ./_an-object */ 1)
  , toIndex      = __webpack_require__(/*! ./_to-index */ 43)
  , toLength     = __webpack_require__(/*! ./_to-length */ 8)
  , isObject     = __webpack_require__(/*! ./_is-object */ 4)
  , ArrayBuffer  = __webpack_require__(/*! ./_global */ 2).ArrayBuffer
  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 89)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 42)(ARRAY_BUFFER);

/***/ }),
/* 343 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.typed.data-view.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 68).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 95).DataView
});

/***/ }),
/* 344 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.typed.float32-array.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 345 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.typed.float64-array.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 346 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int16-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 347 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int32-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 348 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int8-array.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 349 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint16-array.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 350 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint32-array.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 351 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint8-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 352 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 353 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.weak-set.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 124);

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 59)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 354 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.array.includes.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(/*! ./_export */ 0)
  , $includes = __webpack_require__(/*! ./_array-includes */ 58)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 45)('includes');

/***/ }),
/* 355 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/es7.asap.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(/*! ./_export */ 0)
  , microtask = __webpack_require__(/*! ./_microtask */ 86)()
  , process   = __webpack_require__(/*! ./_global */ 2).process
  , isNode    = __webpack_require__(/*! ./_cof */ 18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 356 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.error.is-error.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0)
  , cof     = __webpack_require__(/*! ./_cof */ 18);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 357 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.map.to-json.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(/*! ./_collection-to-json */ 123)('Map')});

/***/ }),
/* 358 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.iaddh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 359 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.imulh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 360 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.isubh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 361 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.umulh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 362 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.define-getter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(/*! ./_export */ 0)
  , toObject        = __webpack_require__(/*! ./_to-object */ 9)
  , aFunction       = __webpack_require__(/*! ./_a-function */ 11)
  , $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 65), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 363 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.define-setter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(/*! ./_export */ 0)
  , toObject        = __webpack_require__(/*! ./_to-object */ 9)
  , aFunction       = __webpack_require__(/*! ./_a-function */ 11)
  , $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 65), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 364 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.object.entries.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(/*! ./_export */ 0)
  , $entries = __webpack_require__(/*! ./_object-to-array */ 134)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 365 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./~/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(/*! ./_export */ 0)
  , ownKeys        = __webpack_require__(/*! ./_own-keys */ 135)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 15)
  , gOPD           = __webpack_require__(/*! ./_object-gopd */ 16)
  , createProperty = __webpack_require__(/*! ./_create-property */ 74);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 366 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.lookup-getter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(/*! ./_export */ 0)
  , toObject                 = __webpack_require__(/*! ./_to-object */ 9)
  , toPrimitive              = __webpack_require__(/*! ./_to-primitive */ 23)
  , getPrototypeOf           = __webpack_require__(/*! ./_object-gpo */ 17)
  , getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 65), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 367 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.lookup-setter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(/*! ./_export */ 0)
  , toObject                 = __webpack_require__(/*! ./_to-object */ 9)
  , toPrimitive              = __webpack_require__(/*! ./_to-primitive */ 23)
  , getPrototypeOf           = __webpack_require__(/*! ./_object-gpo */ 17)
  , getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 65), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 368 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.object.values.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0)
  , $values = __webpack_require__(/*! ./_object-to-array */ 134)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 369 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.observable.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(/*! ./_export */ 0)
  , global      = __webpack_require__(/*! ./_global */ 2)
  , core        = __webpack_require__(/*! ./_core */ 24)
  , microtask   = __webpack_require__(/*! ./_microtask */ 86)()
  , OBSERVABLE  = __webpack_require__(/*! ./_wks */ 5)('observable')
  , aFunction   = __webpack_require__(/*! ./_a-function */ 11)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , anInstance  = __webpack_require__(/*! ./_an-instance */ 36)
  , redefineAll = __webpack_require__(/*! ./_redefine-all */ 41)
  , hide        = __webpack_require__(/*! ./_hide */ 12)
  , forOf       = __webpack_require__(/*! ./_for-of */ 46)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(/*! ./_set-species */ 42)('Observable');

/***/ }),
/* 370 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.define-metadata.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(/*! ./_metadata */ 26)
  , anObject                  = __webpack_require__(/*! ./_an-object */ 1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 371 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.delete-metadata.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 26)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 372 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(/*! ./es6.set */ 143)
  , from                    = __webpack_require__(/*! ./_array-from-iterable */ 119)
  , metadata                = __webpack_require__(/*! ./_metadata */ 26)
  , anObject                = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf          = __webpack_require__(/*! ./_object-gpo */ 17)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 373 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-metadata.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 26)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf         = __webpack_require__(/*! ./_object-gpo */ 17)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 374 */
/* no static exports found */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(/*! ./_metadata */ 26)
  , anObject                = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 375 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 26)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 376 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.has-metadata.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 26)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf         = __webpack_require__(/*! ./_object-gpo */ 17)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 377 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 26)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 378 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.metadata.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(/*! ./_metadata */ 26)
  , anObject                  = __webpack_require__(/*! ./_an-object */ 1)
  , aFunction                 = __webpack_require__(/*! ./_a-function */ 11)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 379 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.set.to-json.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(/*! ./_collection-to-json */ 123)('Set')});

/***/ }),
/* 380 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es7.string.at.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0)
  , $at     = __webpack_require__(/*! ./_string-at */ 90)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 381 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.match-all.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(/*! ./_export */ 0)
  , defined     = __webpack_require__(/*! ./_defined */ 19)
  , toLength    = __webpack_require__(/*! ./_to-length */ 8)
  , isRegExp    = __webpack_require__(/*! ./_is-regexp */ 63)
  , getFlags    = __webpack_require__(/*! ./_flags */ 61)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 82)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 382 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.string.pad-end.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0)
  , $pad    = __webpack_require__(/*! ./_string-pad */ 139);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 383 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.pad-start.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0)
  , $pad    = __webpack_require__(/*! ./_string-pad */ 139);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 384 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.trim-left.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 49)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 385 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es7.string.trim-right.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 49)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 386 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es7.symbol.async-iterator.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 96)('asyncIterator');

/***/ }),
/* 387 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es7.symbol.observable.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 96)('observable');

/***/ }),
/* 388 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.system.global.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', {global: __webpack_require__(/*! ./_global */ 2)});

/***/ }),
/* 389 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/web.dom.iterable.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(/*! ./es6.array.iterator */ 98)
  , redefine      = __webpack_require__(/*! ./_redefine */ 13)
  , global        = __webpack_require__(/*! ./_global */ 2)
  , hide          = __webpack_require__(/*! ./_hide */ 12)
  , Iterators     = __webpack_require__(/*! ./_iterators */ 47)
  , wks           = __webpack_require__(/*! ./_wks */ 5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 390 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/web.immediate.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , $task   = __webpack_require__(/*! ./_task */ 94);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 391 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/web.timers.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(/*! ./_global */ 2)
  , $export    = __webpack_require__(/*! ./_export */ 0)
  , invoke     = __webpack_require__(/*! ./_invoke */ 62)
  , partial    = __webpack_require__(/*! ./_partial */ 218)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 392 */
/* no static exports found */
/* all exports used */
/*!***************************!*\
  !*** ./~/core-js/shim.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 341);
__webpack_require__(/*! ./modules/es6.object.create */ 280);
__webpack_require__(/*! ./modules/es6.object.define-property */ 282);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 281);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 284);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 286);
__webpack_require__(/*! ./modules/es6.object.keys */ 291);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 285);
__webpack_require__(/*! ./modules/es6.object.freeze */ 283);
__webpack_require__(/*! ./modules/es6.object.seal */ 293);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 292);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 288);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 289);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 287);
__webpack_require__(/*! ./modules/es6.object.assign */ 279);
__webpack_require__(/*! ./modules/es6.object.is */ 290);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 294);
__webpack_require__(/*! ./modules/es6.object.to-string */ 295);
__webpack_require__(/*! ./modules/es6.function.bind */ 247);
__webpack_require__(/*! ./modules/es6.function.name */ 249);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 248);
__webpack_require__(/*! ./modules/es6.parse-int */ 297);
__webpack_require__(/*! ./modules/es6.parse-float */ 296);
__webpack_require__(/*! ./modules/es6.number.constructor */ 267);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 277);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 278);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 268);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 269);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 270);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 271);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 272);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 273);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 274);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 275);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 276);
__webpack_require__(/*! ./modules/es6.math.acosh */ 250);
__webpack_require__(/*! ./modules/es6.math.asinh */ 251);
__webpack_require__(/*! ./modules/es6.math.atanh */ 252);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 253);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 254);
__webpack_require__(/*! ./modules/es6.math.cosh */ 255);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 256);
__webpack_require__(/*! ./modules/es6.math.fround */ 257);
__webpack_require__(/*! ./modules/es6.math.hypot */ 258);
__webpack_require__(/*! ./modules/es6.math.imul */ 259);
__webpack_require__(/*! ./modules/es6.math.log10 */ 260);
__webpack_require__(/*! ./modules/es6.math.log1p */ 261);
__webpack_require__(/*! ./modules/es6.math.log2 */ 262);
__webpack_require__(/*! ./modules/es6.math.sign */ 263);
__webpack_require__(/*! ./modules/es6.math.sinh */ 264);
__webpack_require__(/*! ./modules/es6.math.tanh */ 265);
__webpack_require__(/*! ./modules/es6.math.trunc */ 266);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 328);
__webpack_require__(/*! ./modules/es6.string.raw */ 333);
__webpack_require__(/*! ./modules/es6.string.trim */ 340);
__webpack_require__(/*! ./modules/es6.string.iterator */ 331);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 323);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 324);
__webpack_require__(/*! ./modules/es6.string.includes */ 329);
__webpack_require__(/*! ./modules/es6.string.repeat */ 334);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 336);
__webpack_require__(/*! ./modules/es6.string.anchor */ 319);
__webpack_require__(/*! ./modules/es6.string.big */ 320);
__webpack_require__(/*! ./modules/es6.string.blink */ 321);
__webpack_require__(/*! ./modules/es6.string.bold */ 322);
__webpack_require__(/*! ./modules/es6.string.fixed */ 325);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 326);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 327);
__webpack_require__(/*! ./modules/es6.string.italics */ 330);
__webpack_require__(/*! ./modules/es6.string.link */ 332);
__webpack_require__(/*! ./modules/es6.string.small */ 335);
__webpack_require__(/*! ./modules/es6.string.strike */ 337);
__webpack_require__(/*! ./modules/es6.string.sub */ 338);
__webpack_require__(/*! ./modules/es6.string.sup */ 339);
__webpack_require__(/*! ./modules/es6.date.now */ 242);
__webpack_require__(/*! ./modules/es6.date.to-json */ 244);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 243);
__webpack_require__(/*! ./modules/es6.date.to-string */ 246);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 245);
__webpack_require__(/*! ./modules/es6.array.is-array */ 231);
__webpack_require__(/*! ./modules/es6.array.from */ 229);
__webpack_require__(/*! ./modules/es6.array.of */ 235);
__webpack_require__(/*! ./modules/es6.array.join */ 232);
__webpack_require__(/*! ./modules/es6.array.slice */ 238);
__webpack_require__(/*! ./modules/es6.array.sort */ 240);
__webpack_require__(/*! ./modules/es6.array.for-each */ 228);
__webpack_require__(/*! ./modules/es6.array.map */ 234);
__webpack_require__(/*! ./modules/es6.array.filter */ 225);
__webpack_require__(/*! ./modules/es6.array.some */ 239);
__webpack_require__(/*! ./modules/es6.array.every */ 223);
__webpack_require__(/*! ./modules/es6.array.reduce */ 237);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 236);
__webpack_require__(/*! ./modules/es6.array.index-of */ 230);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 233);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 222);
__webpack_require__(/*! ./modules/es6.array.fill */ 224);
__webpack_require__(/*! ./modules/es6.array.find */ 227);
__webpack_require__(/*! ./modules/es6.array.find-index */ 226);
__webpack_require__(/*! ./modules/es6.array.species */ 241);
__webpack_require__(/*! ./modules/es6.array.iterator */ 98);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 313);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 318);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 142);
__webpack_require__(/*! ./modules/es6.regexp.match */ 314);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 315);
__webpack_require__(/*! ./modules/es6.regexp.search */ 316);
__webpack_require__(/*! ./modules/es6.regexp.split */ 317);
__webpack_require__(/*! ./modules/es6.promise */ 298);
__webpack_require__(/*! ./modules/es6.map */ 141);
__webpack_require__(/*! ./modules/es6.set */ 143);
__webpack_require__(/*! ./modules/es6.weak-map */ 144);
__webpack_require__(/*! ./modules/es6.weak-set */ 353);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 342);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 343);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 348);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 351);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 352);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 346);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 349);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 347);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 350);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 344);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 345);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 299);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 300);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 301);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 302);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 303);
__webpack_require__(/*! ./modules/es6.reflect.get */ 306);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 304);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 305);
__webpack_require__(/*! ./modules/es6.reflect.has */ 307);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 308);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 309);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 310);
__webpack_require__(/*! ./modules/es6.reflect.set */ 312);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 311);
__webpack_require__(/*! ./modules/es7.array.includes */ 354);
__webpack_require__(/*! ./modules/es7.string.at */ 380);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 383);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 382);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 384);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 385);
__webpack_require__(/*! ./modules/es7.string.match-all */ 381);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 386);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 387);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 365);
__webpack_require__(/*! ./modules/es7.object.values */ 368);
__webpack_require__(/*! ./modules/es7.object.entries */ 364);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 362);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 363);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 366);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 367);
__webpack_require__(/*! ./modules/es7.map.to-json */ 357);
__webpack_require__(/*! ./modules/es7.set.to-json */ 379);
__webpack_require__(/*! ./modules/es7.system.global */ 388);
__webpack_require__(/*! ./modules/es7.error.is-error */ 356);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 358);
__webpack_require__(/*! ./modules/es7.math.isubh */ 360);
__webpack_require__(/*! ./modules/es7.math.imulh */ 359);
__webpack_require__(/*! ./modules/es7.math.umulh */ 361);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 370);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 371);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 373);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 372);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 375);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 374);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 376);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 377);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 378);
__webpack_require__(/*! ./modules/es7.asap */ 355);
__webpack_require__(/*! ./modules/es7.observable */ 369);
__webpack_require__(/*! ./modules/web.timers */ 391);
__webpack_require__(/*! ./modules/web.immediate */ 390);
__webpack_require__(/*! ./modules/web.dom.iterable */ 389);
module.exports = __webpack_require__(/*! ./modules/_core */ 24);

/***/ }),
/* 393 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./~/noisejs/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

(function(global){

  // Passing in seed will seed this Noise instance
  function Noise(seed) {
    function Grad(x, y, z) {
      this.x = x; this.y = y; this.z = z;
    }

    Grad.prototype.dot2 = function(x, y) {
      return this.x*x + this.y*y;
    };

    Grad.prototype.dot3 = function(x, y, z) {
      return this.x*x + this.y*y + this.z*z;
    };

    this.grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

    this.p = [151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    // To remove the need for index wrapping, double the permutation table length
    this.perm = new Array(512);
    this.gradP = new Array(512);

    this.seed(seed || 0);
  }

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  Noise.prototype.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    var p = this.p;
    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      var perm = this.perm;
      var gradP = this.gradP;
      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = this.grad3[v % 12];
    }
  };

  /*
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }*/

  // Skewing and unskewing factors for 2, 3, and 4 dimensions
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;

  // 2D simplex noise
  Noise.prototype.simplex2 = function(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin)*F2; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var t = (i+j)*G2;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1=1; j1=0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1=0; j1=1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1 + 2 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;

    var perm = this.perm;
    var gradP = this.gradP;
    var gi0 = gradP[i+perm[j]];
    var gi1 = gradP[i+i1+perm[j+j1]];
    var gi2 = gradP[i+1+perm[j+1]];
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  Noise.prototype.simplex3 = function(xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin+zin)*F3; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;

    var perm = this.perm;
    var gradP = this.gradP;
    var gi0 = gradP[i+   perm[j+   perm[k   ]]];
    var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
    var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
    var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

    // Calculate the contribution from the four corners
    var t0 = 0.5 - x0*x0-y0*y0-z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1-z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.5 - x2*x2-y2*y2-z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.5 - x3*x3-y3*y3-z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);

  };

  // ##### Perlin noise stuff

  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  Noise.prototype.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var perm = this.perm;
    var gradP = this.gradP;
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };

  // 3D Perlin Noise
  Noise.prototype.perlin3 = function(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255; Z = Z & 255;

    // Calculate noise contributions from each of the eight corners
    var perm = this.perm;
    var gradP = this.gradP;
    var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
    var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    // Interpolate
    return lerp(
        lerp(
          lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
          lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };

  global.Noise = Noise;

})( false ? this : module.exports);


/***/ }),
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/regenerator-runtime/runtime.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 28)))

/***/ }),
/* 399 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */146);
module.exports = __webpack_require__(/*! /home/klint/biopeli/src/main.js */145);


/***/ })
],[399]);
//# sourceMappingURL=bundle.js.map