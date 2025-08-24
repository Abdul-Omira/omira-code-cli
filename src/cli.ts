#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createCommand } from './commands/create';
import { generateCommand } from './commands/generate';
import { analyzeCommand } from './commands/analyze';
import { refactorCommand } from './commands/refactor';
import { testCommand } from './commands/test';
import { interactiveMode } from './commands/interactive';
import { aiCommand } from './commands/ai';

const program = new Command();

console.log(
  gradient.pastel.multiline(
    figlet.textSync('OMIRA Code', {
      font: 'ANSI Shadow',
      horizontalLayout: 'fitted',
    })
  )
);

program
  .name('omira')
  .description(chalk.cyan('🚀 OMIRA Code - Advanced CLI for developers'))
  .version('1.0.0', '-v, --version', 'Display version number')
  .helpOption('-h, --help', 'Display help for command');

program
  .command('create <type> <name>')
  .description('Create new projects, components, or files')
  .option('-t, --template <template>', 'Use a specific template')
  .option('-f, --force', 'Overwrite existing files')
  .option('--typescript', 'Use TypeScript (default)')
  .option('--javascript', 'Use JavaScript')
  .action(createCommand);

program
  .command('generate <type>')
  .alias('g')
  .description('Generate code snippets and boilerplate')
  .option('-n, --name <name>', 'Name for the generated code')
  .option('-o, --output <path>', 'Output path')
  .option('--dry-run', 'Preview without creating files')
  .action(generateCommand);

program
  .command('analyze [path]')
  .alias('a')
  .description('Analyze code quality and complexity')
  .option('-r, --recursive', 'Analyze recursively')
  .option('--fix', 'Auto-fix issues where possible')
  .option('--report <format>', 'Output format (json, html, console)', 'console')
  .action(analyzeCommand);

program
  .command('refactor <file>')
  .alias('r')
  .description('Refactor code with AI assistance')
  .option('-p, --pattern <pattern>', 'Refactoring pattern to apply')
  .option('--preview', 'Preview changes without applying')
  .option('--backup', 'Create backup before refactoring')
  .action(refactorCommand);

program
  .command('test [path]')
  .alias('t')
  .description('Generate and run tests')
  .option('--generate', 'Generate test files')
  .option('--coverage', 'Run with coverage')
  .option('--watch', 'Run in watch mode')
  .action(testCommand);

program
  .command('ai <prompt>')
  .description('AI-powered code assistance')
  .option('-c, --context <file>', 'Provide context file')
  .option('-m, --model <model>', 'AI model to use', 'mistral-7b')
  .option('--stream', 'Stream response')
  .action(aiCommand);

program
  .command('interactive')
  .alias('i')
  .description('Start interactive mode')
  .action(interactiveMode);

program
  .addHelpText('after', `
${chalk.yellow('Examples:')}
  $ omira create react MyApp
  $ omira generate component --name Button
  $ omira analyze ./src --recursive
  $ omira ai "optimize this function" -c utils.js
  $ omira interactive

${chalk.cyan('Documentation:')} https://github.com/omira/code-cli
${chalk.green('Report issues:')} https://github.com/omira/code-cli/issues
`);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  interactiveMode();
}