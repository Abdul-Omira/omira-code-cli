"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactiveMode = interactiveMode;
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const boxen_1 = __importDefault(require("boxen"));
const create_1 = require("./create");
const generate_1 = require("./generate");
const ai_1 = require("./ai");
async function interactiveMode() {
    console.log((0, boxen_1.default)(gradient_string_1.default.pastel('Welcome to OMIRA Code Interactive Mode'), {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
        borderColor: 'cyan',
    }));
    const { action } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: chalk_1.default.cyan('What would you like to do?'),
            choices: [
                { name: '🚀 Create a new project', value: 'create' },
                { name: '⚡ Generate code', value: 'generate' },
                { name: '🤖 AI assistance', value: 'ai' },
                { name: '📊 Analyze code', value: 'analyze' },
                { name: '🔧 Refactor code', value: 'refactor' },
                { name: '🧪 Generate tests', value: 'test' },
                { name: '❌ Exit', value: 'exit' },
            ],
        },
    ]);
    switch (action) {
        case 'create':
            await handleCreateProject();
            break;
        case 'generate':
            await handleGenerateCode();
            break;
        case 'ai':
            await handleAIAssistance();
            break;
        case 'analyze':
            console.log(chalk_1.default.yellow('Code analysis coming soon!'));
            break;
        case 'refactor':
            console.log(chalk_1.default.yellow('Code refactoring coming soon!'));
            break;
        case 'test':
            console.log(chalk_1.default.yellow('Test generation coming soon!'));
            break;
        case 'exit':
            console.log(chalk_1.default.green('👋 Thanks for using OMIRA Code!'));
            process.exit(0);
    }
    // Continue in interactive mode
    await interactiveMode();
}
async function handleCreateProject() {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'projectType',
            message: 'What type of project?',
            choices: [
                { name: '⚛️  React', value: 'react' },
                { name: '🟢 Node.js', value: 'node' },
                { name: '🚂 Express API', value: 'express' },
                { name: '▲  Next.js', value: 'next' },
                { name: '🟩 Vue.js', value: 'vue' },
                { name: '🐍 Python FastAPI', value: 'python' },
            ],
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            validate: (input) => input.length > 0 || 'Please enter a project name',
        },
        {
            type: 'confirm',
            name: 'useTypeScript',
            message: 'Use TypeScript?',
            default: true,
        },
    ]);
    const options = {
        typescript: answers.useTypeScript,
        javascript: !answers.useTypeScript,
    };
    await (0, create_1.createCommand)(answers.projectType, answers.projectName, options);
}
async function handleGenerateCode() {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'generateType',
            message: 'What would you like to generate?',
            choices: [
                { name: '🧩 React Component', value: 'component' },
                { name: '🪝 React Hook', value: 'hook' },
                { name: '🌐 API Endpoint', value: 'api' },
                { name: '📦 Service', value: 'service' },
                { name: '📊 Model', value: 'model' },
                { name: '🧪 Test File', value: 'test' },
                { name: '🐳 Dockerfile', value: 'dockerfile' },
                { name: '🔄 CI/CD Config', value: 'ci' },
            ],
        },
        {
            type: 'input',
            name: 'name',
            message: 'Name (leave empty for default):',
            when: (answers) => !['dockerfile', 'ci'].includes(answers.generateType),
        },
        {
            type: 'confirm',
            name: 'preview',
            message: 'Preview before creating?',
            default: true,
        },
    ]);
    const options = {
        name: answers.name,
        dryRun: answers.preview,
    };
    await (0, generate_1.generateCommand)(answers.generateType, options);
    if (answers.preview) {
        const { proceed } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'proceed',
                message: 'Create the file?',
                default: true,
            },
        ]);
        if (proceed) {
            await (0, generate_1.generateCommand)(answers.generateType, { ...options, dryRun: false });
        }
    }
}
async function handleAIAssistance() {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'aiMode',
            message: 'What kind of AI assistance?',
            choices: [
                { name: '💡 Explain code', value: 'explain' },
                { name: '🔍 Find bugs', value: 'debug' },
                { name: '⚡ Optimize code', value: 'optimize' },
                { name: '📝 Add comments', value: 'comment' },
                { name: '♻️  Refactor code', value: 'refactor' },
                { name: '🧪 Generate tests', value: 'test' },
                { name: '💬 Custom prompt', value: 'custom' },
            ],
        },
        {
            type: 'editor',
            name: 'code',
            message: 'Paste your code (Ctrl+S to save):',
            when: (answers) => answers.aiMode !== 'custom',
        },
        {
            type: 'input',
            name: 'prompt',
            message: 'Enter your prompt:',
            when: (answers) => answers.aiMode === 'custom',
        },
    ]);
    let finalPrompt = answers.prompt;
    if (answers.aiMode !== 'custom') {
        const prompts = {
            explain: 'Explain this code in detail:',
            debug: 'Find and fix bugs in this code:',
            optimize: 'Optimize this code for performance:',
            comment: 'Add comprehensive comments to this code:',
            refactor: 'Refactor this code following best practices:',
            test: 'Generate unit tests for this code:',
        };
        finalPrompt = `${prompts[answers.aiMode]}\n\n\`\`\`\n${answers.code}\n\`\`\``;
    }
    await (0, ai_1.aiCommand)(finalPrompt, { model: 'mistral-7b', stream: true });
}
//# sourceMappingURL=interactive.js.map