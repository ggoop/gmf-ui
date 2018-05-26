/*!
 * gmf-ui v1.0.1
 * Made with <3 by ggoop 2018
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Bridge"] = factory();
	else
		root["Bridge"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: F:/project/gmf/gmf-ui/src/bridge.js: \"HTTP_API\" is read-only\n\n\u001b[0m \u001b[90m 62 | \u001b[39m      alert(\u001b[32m'[assert]: signature is required'\u001b[39m)\u001b[33m;\u001b[39m\n \u001b[90m 63 | \u001b[39m    }\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 64 | \u001b[39m    \u001b[33mHTTP_API\u001b[39m \u001b[33m=\u001b[39m axios\u001b[33m.\u001b[39mcreate({ baseURL\u001b[33m:\u001b[39m combineURLs(\u001b[33mCONFIG_COPY\u001b[39m\u001b[33m.\u001b[39mhost\u001b[33m,\u001b[39m \u001b[32m'api'\u001b[39m) })\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m    \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 65 | \u001b[39m    \u001b[33mHTTP_API\u001b[39m\u001b[33m.\u001b[39mdefaults\u001b[33m.\u001b[39mheaders\u001b[33m.\u001b[39mcommon[\u001b[32m'X-Requested-With'\u001b[39m] \u001b[33m=\u001b[39m \u001b[32m'XMLHttpRequest'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 66 | \u001b[39m    \u001b[33mHTTP_API\u001b[39m\u001b[33m.\u001b[39mdefaults\u001b[33m.\u001b[39mheaders\u001b[33m.\u001b[39mpost[\u001b[32m'Content-Type'\u001b[39m] \u001b[33m=\u001b[39m \u001b[32m'application/json'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 67 | \u001b[39m    \u001b[90m//HTTP_API.defaults.headers.common['Authorization'] = AUTH_TOKEN;\u001b[39m\u001b[0m\n");

/***/ })
/******/ ]);
});