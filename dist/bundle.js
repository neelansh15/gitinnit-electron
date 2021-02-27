/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((module) => {

eval("module.exports = {\r\n    clientId: \"b65daac8e0126d1be993\",\r\n    clientSecret: \"0a46a6fa68feebda5f76ba2a61ccc4d182a07f42\"\r\n}\n\n//# sourceURL=webpack://gitinnit-electron/./config.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { app, BrowserWindow } = __webpack_require__(/*! electron */ \"./node_modules/electron/index.js\")\r\nconst config = __webpack_require__(/*! ./config */ \"./config.js\")\r\n// const {createApp, h} = require('vue')\r\n\r\n// const rootComponent = {\r\n//   render(){\r\n//     return h('h1', 'Hello there! This is from Vue!')\r\n//   }\r\n// }\r\n// const app = new createApp(rootComponent)\r\n\r\nfunction createWindow () {\r\n  const win = new BrowserWindow({\r\n    width: 800,\r\n    height: 600,\r\n    webPreferences: {\r\n      nodeIntegration: true\r\n    }\r\n  })\r\n\r\n  win.loadFile('index.html', {\r\n    query:{\r\n      \"clientId\": config.clientId,\r\n      \"clientSecret\": config.clientSecret\r\n    }\r\n  })\r\n}\r\n\r\napp.whenReady().then(createWindow)\r\n\r\napp.on('window-all-closed', () => {\r\n  if (process.platform !== 'darwin') {\r\n    app.quit()\r\n  }\r\n})\r\n\r\napp.on('activate', () => {\r\n  if (BrowserWindow.getAllWindows().length === 0) {\r\n    createWindow()\r\n  }\r\n})\r\n\n\n//# sourceURL=webpack://gitinnit-electron/./main.js?");

/***/ }),

/***/ "./node_modules/electron/index.js":
/*!****************************************!*\
  !*** ./node_modules/electron/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var __dirname = \"/\";\nvar fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))\nvar path = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'path'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))\n\nvar pathFile = path.join(__dirname, 'path.txt')\n\nfunction getElectronPath () {\n  if (fs.existsSync(pathFile)) {\n    var executablePath = fs.readFileSync(pathFile, 'utf-8')\n    if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {\n      return path.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath)\n    }\n    return path.join(__dirname, 'dist', executablePath)\n  } else {\n    throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')\n  }\n}\n\nmodule.exports = getElectronPath()\n\n\n//# sourceURL=webpack://gitinnit-electron/./node_modules/electron/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;