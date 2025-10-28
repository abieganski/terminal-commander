"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const terminalCommandsProvider_1 = require("./terminalCommandsProvider");
function activate(context) {
    console.log('Terminal Commands extension is now active!');
    // Create and register the webview provider
    const provider = new terminalCommandsProvider_1.TerminalCommandsProvider(context.extensionUri);
    const registration = vscode.window.registerWebviewViewProvider('terminal-commands-view', provider);
    context.subscriptions.push(registration);
    console.log('Webview provider registered for terminal-commands-view');
    // Register the command to show the panel
    const showPanelCommand = vscode.commands.registerCommand('terminal-commands.showPanel', () => {
        // The webview will be automatically shown when registered
        vscode.window.showInformationMessage('Terminal Commands panel is now available! Look for the terminal icon in the activity bar.');
    });
    context.subscriptions.push(showPanelCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map