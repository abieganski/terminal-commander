import * as vscode from 'vscode';
import { TerminalCommandsProvider } from './terminalCommandsProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Terminal Commands extension is now active!');

    // Create and register the webview provider
    const provider = new TerminalCommandsProvider(context.extensionUri);
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

export function deactivate() {}
