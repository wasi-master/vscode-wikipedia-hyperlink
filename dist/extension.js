(()=>{var e={339:e=>{var t=[[/\*/g,"\\*","asterisks"],[/#/g,"\\#","number signs"],[/\//g,"\\/","slashes"],[/\(/g,"\\(","parentheses"],[/\)/g,"\\)","parentheses"],[/\[/g,"\\[","square brackets"],[/\]/g,"\\]","square brackets"],[/</g,"&lt;","angle brackets"],[/>/g,"&gt;","angle brackets"],[/_/g,"\\_","underscores"]];e.exports=function(e,r){return r=r||[],t.reduce((function(e,t){var s=t[2];return s&&-1!==r.indexOf(s)?e:e.replace(t[0],t[1])}),e)}},763:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.request=void 0;const s=r(310),n=r(687),a=r(477);t.request=function(e,t={},r=""){const o=function(e={},t){if(null==e.headers)return t;switch(e.headers["Content-Type"]){case"application/json":return JSON.stringify(t);case"application/x-www-form-urlencoded":return a.stringify(t);default:return t}}(t,r);return null==t.headers&&(t.headers={}),new Promise(((r,a)=>{e instanceof s.URL||(e=new s.URL(e));const i=n.request(e,t,(e=>{const t=[];e.on("data",(e=>{t.push(e)})),e.on("end",(()=>{try{const{headers:s}=e,n=t.join("");r({headers:s,body:n})}catch(e){a(e)}})),e.on("error",(e=>{a(e)}))}));i.write(o),i.end()}))}},496:e=>{"use strict";e.exports=require("vscode")},687:e=>{"use strict";e.exports=require("https")},477:e=>{"use strict";e.exports=require("querystring")},310:e=>{"use strict";e.exports=require("url")},247:(e,t)=>{"use strict";const{replace:r}="",s=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,n=/[&<>'"]/g,a={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},o=e=>a[e];t.escape=e=>r.call(e,n,o);const i={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"'},c=e=>i[e];t.unescape=e=>r.call(e,s,c)}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,r),a.exports}var s={};(()=>{"use strict";var e=s;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const t=r(496),n=r(247),a=r(763),o=r(339);e.activate=function(e){let r=t.commands.registerCommand("wikipedia-hyperlinker.addHyperlink",(()=>{var e=t.window.activeTextEditor;if(void 0!==e){const r=e.selection,s=e.document.getText(r);if(""===s.trim())return t.window.showErrorMessage("No text is selected"),!1;t.window.withProgress({location:t.ProgressLocation.Window,cancellable:!1,title:"Loading article from wikipedia..."},(async i=>{i.report({increment:0});try{const u=await(0,a.request)(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info|extracts&exintro&explaintext&&inprop=url&redirects=1&titles=${encodeURIComponent(s)}`),d=JSON.parse(u.body);i.report({increment:100}),console.log(u);const l=d.query.pages[Object.keys(d.query.pages)[0]].extract,p=d.query.pages[Object.keys(d.query.pages)[0]].fullurl;if(l.includes("may refer to:"))return t.window.showInformationMessage(`There are multiple articles under the term ${s}. Do you want to see all the possible articles in wikipedia inside your browser?`,{modal:!0},"Yes","No").then((e=>{"Yes"===e?t.env.openExternal(t.Uri.parse(p)):t.window.showInformationMessage("Okay, you can refine your text anytime and use the command again")})),!1;var c=e?.document.languageId;"markdown"===c?e?.edit((e=>{e.replace(r,`[${o(s)}](${p} "${o(l)}")`)})):"html"===c||"jinja"===c?e?.edit((e=>{e.replace(r,`<a href="${p}" title="${(0,n.escape)(l)}">${(0,n.escape)(s)}</a>`)})):t.window.showWarningMessage(`The current language (${c}) is not supported`,"Use HTML","Use Markdown","Cancel").then((t=>{"Use HTML"===t?e?.edit((e=>{e.replace(r,`<a href="${p}" title="${(0,n.escape)(l)}">${(0,n.escape)(s)}</a>`)})):"Use Markdown"===t&&e?.edit((e=>{e.replace(r,`[${o(s)}](${p} "${o(l)}")`)}))}))}catch(e){t.window.showErrorMessage("Request failed"),console.error(e)}}))}else t.window.showInformationMessage("No window is active")}));e.subscriptions.push(r)},e.deactivate=function(){}})(),module.exports=s})();