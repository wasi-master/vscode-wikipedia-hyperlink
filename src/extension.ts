// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { escape as htmlEscape } from 'html-escaper';
import markdownEscape = require("markdown-escape");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "wikipedia-hyperlinker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('wikipedia-hyperlinker.addHyperlink', () => {
		// The code you place here will be executed every time your command is executed
		var editor = vscode.window.activeTextEditor;
		if (editor !== undefined) {
			const currentSelection = editor.selection;
			const text = editor.document.getText(currentSelection);
			vscode.window.withProgress({
				location: vscode.ProgressLocation.Window,
				cancellable: false,
				title: 'Loading article from wikipedia...'
			}, async (progress) => {
				progress.report({ increment: 0 });
				// Make a request to wikipedia to get short description
				try {
					const response = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info|extracts&exintro&explaintext&&inprop=url&redirects=1`, { 'params': { 'titles': text } });
					progress.report({ increment: 100 });
					console.log(response);
					const summary: string = response.data['query']['pages'][Object.keys(response.data['query']['pages'])[0]]['extract'];
					const url: string = response.data['query']['pages'][Object.keys(response.data['query']['pages'])[0]]['fullurl'];
					if (summary.includes("may refer to:")) {
						vscode.window
							.showInformationMessage(
								`There are multiple articles under the term ${text}. Do you want to see all the possible articles in wikipedia inside your browser?`,
								{modal: true},
								...["Yes", "No"]
							)
							.then((answer) => {
								if (answer === "Yes") {
									vscode.env.openExternal(vscode.Uri.parse(url));
								} else {
									vscode.window.showInformationMessage("Okay, you can refine your text anytime and use the command again");
								}
							});
						return false;
					}
					var currentLanguage = editor?.document.languageId;
					// vscode.window.showInformationMessage(`Added wikipedia article for ${text}`);
					if (currentLanguage == "markdown") {
						editor?.edit(editBuilder => {
							editBuilder.replace(currentSelection,
								`[${markdownEscape(text)}](${url} "${markdownEscape(summary)}")`
							);
						});
					} else if (currentLanguage == "html") {
						editor?.edit(editBuilder => {
							editBuilder.replace(currentSelection,
								`<a href="${url}" title="${htmlEscape(summary)}">${htmlEscape(text)}</a>`
							);
						});
					}
				} catch (error) {
					if (axios.isAxiosError(error) && error.response) {
						console.error(error.response);
						vscode.window.showErrorMessage(`Request failed with HTTP Code ${error.response.status}`);
					} else if (axios.isAxiosError(error) && error.request) {
						vscode.window.showErrorMessage(`Request failed`);
					} else {
						console.error(error);
					}
				}

			});
			// Display a message box to the user
		} else {
			vscode.window.showInformationMessage('No window is active');

		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
