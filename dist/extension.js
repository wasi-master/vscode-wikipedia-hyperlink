/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const {replace} = '';

// escape
const es = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
const ca = /[&<>'"]/g;

const esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
};
const pe = m => esca[m];

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const escape = es => replace.call(es, ca, pe);
exports.escape = escape;


// unescape
const unes = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"'
};
const cape = m => unes[m];

/**
 * Safely unescape previously escaped entities such as `&`, `<`, `>`, `"`,
 * and `'`.
 * @param {string} un a previously escaped string
 * @returns {string} the unescaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const unescape = un => replace.call(un, es, cape);
exports.unescape = unescape;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.request = void 0;
const url_1 = __webpack_require__(4);
const https = __webpack_require__(5);
const qs = __webpack_require__(6);
/**
 * Parse a request body based on known MIME types, based on the Content-Type
 * header. If unknown or undefined, will return the original request body.
 * @param {Object} opts - The request options.
 * @param {Object|string} body - The request body.
 * @returns {Object|string} A parsed request body for known MIME types, or the original request body.
 */
function parse(opts = {}, body) {
    if (opts.headers == null) {
        return body;
    }
    switch (opts.headers['Content-Type']) {
        case 'application/json': return JSON.stringify(body);
        case 'application/x-www-form-urlencoded': return qs.stringify(body);
        default: return body;
    }
}
/**
 * Make an asynchronous request to an HTTP or HTTPS address. Automatically
 * derives protocol from URL input, and content length from the request body.
 * @param {URL|string} url - The request URL.
 * @param {Object} opts - The request options.
 * @param {Object|string} body - The request body.
 * @returns {Promise} A promise to return either a response object, or an error.
 */
function request(url, opts = {}, body = '') {
    const data = parse(opts, body);
    if (opts.headers == null) {
        opts.headers = {};
    }
    return new Promise((resolve, reject) => {
        if (!(url instanceof url_1.URL)) {
            url = new url_1.URL(url);
        }
        const request = https.request(url, opts, (response) => {
            const chunks = [];
            response.on('data', (chunk) => {
                chunks.push(chunk);
            });
            response.on('end', () => {
                try {
                    const { headers } = response;
                    const body = chunks.join('');
                    resolve({ headers, body });
                }
                catch (error) {
                    reject(error);
                }
            });
            response.on('error', (error) => {
                reject(error);
            });
        });
        request.write(data);
        request.end();
    });
}
exports.request = request;


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),
/* 7 */
/***/ ((module) => {

var replacements = [
  [/\*/g, '\\*', 'asterisks'],
  [/#/g, '\\#', 'number signs'],
  [/\//g, '\\/', 'slashes'],
  [/\(/g, '\\(', 'parentheses'],
  [/\)/g, '\\)', 'parentheses'],
  [/\[/g, '\\[', 'square brackets'],
  [/\]/g, '\\]', 'square brackets'],
  [/</g, '&lt;', 'angle brackets'],
  [/>/g, '&gt;', 'angle brackets'],
  [/_/g, '\\_', 'underscores']
]

module.exports = function (string, skips) {
  skips = skips || []
  return replacements.reduce(function (string, replacement) {
    var name = replacement[2]
    return name && skips.indexOf(name) !== -1
      ? string
      : string.replace(replacement[0], replacement[1])
  }, string)
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const html_escaper_1 = __webpack_require__(2);
const requests_1 = __webpack_require__(3);
const markdownEscape = __webpack_require__(7);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.commands.registerCommand('wikipedia-hyperlinker.addHyperlink', () => {
        var editor = vscode.window.activeTextEditor;
        if (editor !== undefined) {
            const currentSelection = editor.selection;
            const text = editor.document.getText(currentSelection);
            if (text.trim() === '') {
                vscode.window.showErrorMessage('No text is selected');
                return false;
            }
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Window,
                cancellable: false,
                title: 'Loading article from wikipedia...'
            }, async (progress) => {
                progress.report({ increment: 0 });
                try {
                    const response = await (0, requests_1.request)(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info|extracts&exintro&explaintext&&inprop=url&redirects=1&titles=${encodeURIComponent(text)}`);
                    const body = JSON.parse(response.body);
                    progress.report({ increment: 100 });
                    console.log(response);
                    const summary = body['query']['pages'][Object.keys(body['query']['pages'])[0]]['extract'];
                    const url = body['query']['pages'][Object.keys(body['query']['pages'])[0]]['fullurl'];
                    if (summary.includes("may refer to:")) {
                        vscode.window
                            .showInformationMessage(`There are multiple articles under the term ${text}. Do you want to see all the possible articles in wikipedia inside your browser?`, { modal: true }, ...["Yes", "No"])
                            .then((answer) => {
                            if (answer === "Yes") {
                                vscode.env.openExternal(vscode.Uri.parse(url));
                            }
                            else {
                                vscode.window.showInformationMessage("Okay, you can refine your text anytime and use the command again");
                            }
                        });
                        return false;
                    }
                    var currentLanguage = editor?.document.languageId;
                    if (currentLanguage === "markdown") {
                        editor?.edit(editBuilder => {
                            editBuilder.replace(currentSelection, `[${markdownEscape(text)}](${url} "${markdownEscape(summary)}")`);
                        });
                    }
                    else if (currentLanguage === "html" || currentLanguage === "jinja") {
                        editor?.edit(editBuilder => {
                            editBuilder.replace(currentSelection, `<a href="${url}" title="${(0, html_escaper_1.escape)(summary)}">${(0, html_escaper_1.escape)(text)}</a>`);
                        });
                    }
                    else {
                        vscode.window.showWarningMessage(`The current language (${currentLanguage}) is not supported`, ...["Use HTML", "Use Markdown", "Cancel"]).then((answer) => {
                            if (answer === "Use HTML") {
                                editor?.edit(editBuilder => {
                                    editBuilder.replace(currentSelection, `<a href="${url}" title="${(0, html_escaper_1.escape)(summary)}">${(0, html_escaper_1.escape)(text)}</a>`);
                                });
                            }
                            else if (answer === "Use Markdown") {
                                editor?.edit(editBuilder => {
                                    editBuilder.replace(currentSelection, `[${markdownEscape(text)}](${url} "${markdownEscape(summary)}")`);
                                });
                            }
                        });
                    }
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Request failed`);
                    console.error(error);
                }
            });
        }
        else {
            vscode.window.showInformationMessage('No window is active');
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map