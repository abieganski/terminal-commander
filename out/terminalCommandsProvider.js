"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalCommandsProvider = void 0;
const vscode = require("vscode");
class TerminalCommandsProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'runCommand':
                    this._runCommand(message.text);
                    return;
            }
        }, undefined, []);
    }
    _runCommand(command) {
        // Get the active terminal or create a new one
        let terminal = vscode.window.activeTerminal;
        if (!terminal) {
            terminal = vscode.window.createTerminal('Terminal Commands');
        }
        // Show the terminal and run the command
        terminal.show();
        terminal.sendText(command);
    }
    _getHtmlForWebview(webview) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminal Commands</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            font-weight: var(--vscode-font-weight);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 10px;
            margin: 0;
        }
        
        .button-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .command-button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            transition: background-color 0.2s;
        }
        
        .command-button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        
        .command-button:active {
            background-color: var(--vscode-button-activeBackground);
        }
        
        .custom-command {
            margin-top: 10px;
        }
        
        .custom-input {
            width: 100%;
            padding: 6px;
            margin-bottom: 8px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            font-size: 13px;
        }
        
        .custom-input:focus {
            outline: none;
            border-color: var(--vscode-focusBorder);
        }
        
        .run-custom {
            width: 100%;
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
        }
        
        .run-custom:hover {
            background-color: var(--vscode-button-secondaryHoverBackground);
        }
    </style>
</head>
<body>
    <div class="button-container">
        <button class="command-button" onclick="runCommand('pnpm install')">pnpm install</button>
        <button class="command-button" onclick="runCommand('npm install')">npm install</button>
        <button class="command-button" onclick="runCommand('yarn install')">yarn install</button>
        <button class="command-button" onclick="runCommand('pnpm run dev')">pnpm run dev</button>
        <button class="command-button" onclick="runCommand('npm run dev')">npm run dev</button>
        <button class="command-button" onclick="runCommand('yarn dev')">yarn dev</button>
        <button class="command-button" onclick="runCommand('pnpm run build')">pnpm run build</button>
        <button class="command-button" onclick="runCommand('npm run build')">npm run build</button>
        <button class="command-button" onclick="runCommand('yarn build')">yarn build</button>
        <button class="command-button" onclick="runCommand('git status')">git status</button>
        <button class="command-button" onclick="runCommand('git add .')">git add .</button>
        <button class="command-button" onclick="runCommand('git commit -m "Update"')">git commit</button>
        <button class="command-button" onclick="runCommand('git push')">git push</button>
        <button class="command-button" onclick="runCommand('git pull')">git pull</button>
        <button class="command-button" onclick="runCommand('ls -la')">ls -la</button>
        <button class="command-button" onclick="runCommand('pwd')">pwd</button>
        <button class="command-button" onclick="runCommand('clear')">clear</button>
        
        <div class="custom-command">
            <input type="text" class="custom-input" id="customCommand" placeholder="Enter custom command..." />
            <button class="command-button run-custom" onclick="runCustomCommand()">Run Custom Command</button>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        function runCommand(command) {
            vscode.postMessage({
                command: 'runCommand',
                text: command
            });
        }
        
        function runCustomCommand() {
            const input = document.getElementById('customCommand');
            const command = input.value.trim();
            if (command) {
                runCommand(command);
                input.value = '';
            }
        }
        
        // Allow Enter key to run custom command
        document.getElementById('customCommand').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                runCustomCommand();
            }
        });
    </script>
</body>
</html>`;
    }
}
exports.TerminalCommandsProvider = TerminalCommandsProvider;
TerminalCommandsProvider.viewType = 'terminal-commands-view';
//# sourceMappingURL=terminalCommandsProvider.js.map