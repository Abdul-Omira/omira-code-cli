"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiCommand = aiCommand;
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const axios_1 = __importDefault(require("axios"));
const fs_extra_1 = __importDefault(require("fs-extra"));
async function aiCommand(prompt, options) {
    const spinner = (0, ora_1.default)('Connecting to AI model...').start();
    try {
        const modelUrl = process.env.AI_MODEL_URL || 'http://localhost:8080';
        const model = options.model || 'mistral-7b';
        // Check if context file is provided
        let context = '';
        if (options.context) {
            context = await fs_extra_1.default.readFile(options.context, 'utf-8');
            prompt = `Context:\n${context}\n\nRequest: ${prompt}`;
        }
        spinner.text = `Processing with ${model}...`;
        const response = await axios_1.default.post(`${modelUrl}/generate`, {
            prompt,
            model,
            max_tokens: 500,
            temperature: 0.7,
            stream: options.stream,
        });
        spinner.succeed(chalk_1.default.green('AI Response:'));
        console.log('\n' + chalk_1.default.cyan('─'.repeat(60)));
        console.log(response.data.response || response.data);
        console.log(chalk_1.default.cyan('─'.repeat(60)) + '\n');
    }
    catch (error) {
        if (error.code === 'ECONNREFUSED') {
            spinner.fail(chalk_1.default.red('AI model server is not running'));
            console.log(chalk_1.default.yellow('\n💡 Tip: Start the model server with:'));
            console.log(chalk_1.default.gray('   omira serve mistral-7b'));
        }
        else {
            spinner.fail(chalk_1.default.red(`AI request failed: ${error.message}`));
        }
    }
}
//# sourceMappingURL=ai.js.map