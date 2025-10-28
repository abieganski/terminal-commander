# Terminal Commands VS Code Extension

A VS Code extension that provides a GUI panel with buttons to run common terminal commands.

## Features

- Quick access to common package manager commands (pnpm, npm, yarn)
- Git commands (status, add, commit, push, pull)
- File system commands (ls, pwd, clear)
- Custom command input for any terminal command
- Integrates with VS Code's terminal system

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Show Terminal Commands Panel" and select it
3. Click any button to run the corresponding command in the terminal
4. Use the custom command input for any other command

## Development

1. Install dependencies: `npm install`
2. Compile TypeScript: `npm run compile`
3. Press F5 to run the extension in a new Extension Development Host window

## Commands

The extension provides the following predefined commands:
- Package management: `pnpm install`, `npm install`, `yarn install`
- Development: `pnpm run dev`, `npm run dev`, `yarn dev`
- Build: `pnpm run build`, `npm run build`, `yarn build`
- Git: `git status`, `git add .`, `git commit`, `git push`, `git pull`
- System: `ls -la`, `pwd`, `clear`
# terminal-commander
