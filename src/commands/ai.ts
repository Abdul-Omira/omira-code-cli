import chalk from 'chalk';
import ora from 'ora';
import axios from 'axios';
import fs from 'fs-extra';

export async function aiCommand(prompt: string, options: any) {
  const spinner = ora('Connecting to AI model...').start();

  try {
    const modelUrl = process.env.AI_MODEL_URL || 'http://localhost:8080';
    const model = options.model || 'mistral-7b';

    // Check if context file is provided
    let context = '';
    if (options.context) {
      context = await fs.readFile(options.context, 'utf-8');
      prompt = `Context:\n${context}\n\nRequest: ${prompt}`;
    }

    spinner.text = `Processing with ${model}...`;

    const response = await axios.post(`${modelUrl}/generate`, {
      prompt,
      model,
      max_tokens: 500,
      temperature: 0.7,
      stream: options.stream,
    });

    spinner.succeed(chalk.green('AI Response:'));
    
    console.log('\n' + chalk.cyan('─'.repeat(60)));
    console.log(response.data.response || response.data);
    console.log(chalk.cyan('─'.repeat(60)) + '\n');

  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      spinner.fail(chalk.red('AI model server is not running'));
      console.log(chalk.yellow('\n💡 Tip: Start the model server with:'));
      console.log(chalk.gray('   omira serve mistral-7b'));
    } else {
      spinner.fail(chalk.red(`AI request failed: ${error.message}`));
    }
  }
}