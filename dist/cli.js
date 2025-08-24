#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const create_1 = require("./commands/create");
const generate_1 = require("./commands/generate");
const analyze_1 = require("./commands/analyze");
const refactor_1 = require("./commands/refactor");
const test_1 = require("./commands/test");
const interactive_1 = require("./commands/interactive");
const ai_1 = require("./commands/ai");
const program = new commander_1.Command();
console.log(gradient_string_1.default.pastel.multiline(figlet_1.default.textSync('OMIRA Code', {
    font: 'ANSI Shadow',
    horizontalLayout: 'fitted',
})));
program
    .name('omira')
    .description(chalk_1.default.cyan('🚀 OMIRA Code - Advanced CLI for developers'))
    .version('1.0.0', '-v, --version', 'Display version number')
    .helpOption('-h, --help', 'Display help for command');
program
    .command('create <type> <name>')
    .description('Create new projects, components, or files')
    .option('-t, --template <template>', 'Use a specific template')
    .option('-f, --force', 'Overwrite existing files')
    .option('--typescript', 'Use TypeScript (default)')
    .option('--javascript', 'Use JavaScript')
    .action(create_1.createCommand);
program
    .command('generate <type>')
    .alias('g')
    .description('Generate code snippets and boilerplate')
    .option('-n, --name <name>', 'Name for the generated code')
    .option('-o, --output <path>', 'Output path')
    .option('--dry-run', 'Preview without creating files')
    .action(generate_1.generateCommand);
program
    .command('analyze [path]')
    .alias('a')
    .description('Analyze code quality and complexity')
    .option('-r, --recursive', 'Analyze recursively')
    .option('--fix', 'Auto-fix issues where possible')
    .option('--report <format>', 'Output format (json, html, console)', 'console')
    .action(analyze_1.analyzeCommand);
program
    .command('refactor <file>')
    .alias('r')
    .description('Refactor code with AI assistance')
    .option('-p, --pattern <pattern>', 'Refactoring pattern to apply')
    .option('--preview', 'Preview changes without applying')
    .option('--backup', 'Create backup before refactoring')
    .action(refactor_1.refactorCommand);
program
    .command('test [path]')
    .alias('t')
    .description('Generate and run tests')
    .option('--generate', 'Generate test files')
    .option('--coverage', 'Run with coverage')
    .option('--watch', 'Run in watch mode')
    .action(test_1.testCommand);
program
    .command('ai <prompt>')
    .description('AI-powered code assistance')
    .option('-c, --context <file>', 'Provide context file')
    .option('-m, --model <model>', 'AI model to use', 'mistral-7b')
    .option('--stream', 'Stream response')
    .action(ai_1.aiCommand);
program
    .command('interactive')
    .alias('i')
    .description('Start interactive mode')
    .action(interactive_1.interactiveMode);
program
    .addHelpText('after', `
${chalk_1.default.yellow('Examples:')}
  $ omira create react MyApp
  $ omira generate component --name Button
  $ omira analyze ./src --recursive
  $ omira ai "optimize this function" -c utils.js
  $ omira interactive

${chalk_1.default.cyan('Documentation:')} https://github.com/omira/code-cli
${chalk_1.default.green('Report issues:')} https://github.com/omira/code-cli/issues
`);
program.parse(process.argv);
if (!process.argv.slice(2).length) {
    (0, interactive_1.interactiveMode)();
}
//# sourceMappingURL=cli.js.map