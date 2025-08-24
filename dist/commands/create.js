"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = createCommand;
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
async function createCommand(type, name, options) {
    const spinner = (0, ora_1.default)(`Creating ${type} project: ${name}`).start();
    try {
        const projectPath = path_1.default.join(process.cwd(), name);
        if (await fs_extra_1.default.pathExists(projectPath) && !options.force) {
            spinner.fail(chalk_1.default.red(`Directory ${name} already exists. Use --force to overwrite.`));
            return;
        }
        await fs_extra_1.default.ensureDir(projectPath);
        switch (type.toLowerCase()) {
            case 'react':
                await createReactProject(projectPath, name, options);
                break;
            case 'node':
                await createNodeProject(projectPath, name, options);
                break;
            case 'express':
                await createExpressProject(projectPath, name, options);
                break;
            case 'next':
                await createNextProject(projectPath, name, options);
                break;
            case 'vue':
                await createVueProject(projectPath, name, options);
                break;
            case 'python':
                await createPythonProject(projectPath, name, options);
                break;
            default:
                spinner.fail(chalk_1.default.red(`Unknown project type: ${type}`));
                return;
        }
        spinner.succeed(chalk_1.default.green(`✨ Successfully created ${type} project: ${name}`));
        console.log('\n' + chalk_1.default.cyan('📦 Next steps:'));
        console.log(chalk_1.default.gray(`   cd ${name}`));
        console.log(chalk_1.default.gray('   npm install'));
        console.log(chalk_1.default.gray('   npm run dev'));
    }
    catch (error) {
        spinner.fail(chalk_1.default.red(`Failed to create project: ${error}`));
    }
}
async function createReactProject(projectPath, name, options) {
    const packageJson = {
        name,
        version: '1.0.0',
        private: true,
        scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview',
            lint: 'eslint . --ext ts,tsx --report-unused-disable-directives',
        },
        dependencies: {
            'react': '^18.2.0',
            'react-dom': '^18.2.0',
        },
        devDependencies: {
            '@types/react': '^18.2.43',
            '@types/react-dom': '^18.2.17',
            '@vitejs/plugin-react': '^4.2.1',
            'eslint': '^8.55.0',
            'typescript': '^5.2.2',
            'vite': '^5.0.8',
        },
    };
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
    const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, 'index.html'), indexHtml);
    const srcDir = path_1.default.join(projectPath, 'src');
    await fs_extra_1.default.ensureDir(srcDir);
    const appContent = `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to ${name}</h1>
      <p>Built with OMIRA Code CLI</p>
    </div>
  );
}

export default App;`;
    await fs_extra_1.default.writeFile(path_1.default.join(srcDir, 'App.tsx'), appContent);
    const mainContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
    await fs_extra_1.default.writeFile(path_1.default.join(srcDir, 'main.tsx'), mainContent);
}
async function createNodeProject(projectPath, name, options) {
    const isTypeScript = !options.javascript;
    const packageJson = {
        name,
        version: '1.0.0',
        description: 'Node.js project created with OMIRA Code',
        main: isTypeScript ? 'dist/index.js' : 'index.js',
        scripts: {
            start: isTypeScript ? 'node dist/index.js' : 'node index.js',
            dev: isTypeScript ? 'tsx src/index.ts' : 'nodemon index.js',
            build: isTypeScript ? 'tsc' : undefined,
            test: 'jest',
        },
        dependencies: {},
        devDependencies: isTypeScript ? {
            '@types/node': '^20.10.5',
            'typescript': '^5.3.3',
            'tsx': '^4.6.2',
        } : {
            'nodemon': '^3.0.2',
        },
    };
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
    if (isTypeScript) {
        const tsConfig = {
            compilerOptions: {
                target: 'ES2022',
                module: 'commonjs',
                outDir: './dist',
                rootDir: './src',
                strict: true,
                esModuleInterop: true,
                skipLibCheck: true,
            },
        };
        await fs_extra_1.default.writeJson(path_1.default.join(projectPath, 'tsconfig.json'), tsConfig, { spaces: 2 });
        const srcDir = path_1.default.join(projectPath, 'src');
        await fs_extra_1.default.ensureDir(srcDir);
        await fs_extra_1.default.writeFile(path_1.default.join(srcDir, 'index.ts'), `console.log('Hello from ${name}!');`);
    }
    else {
        await fs_extra_1.default.writeFile(path_1.default.join(projectPath, 'index.js'), `console.log('Hello from ${name}!');`);
    }
}
async function createExpressProject(projectPath, name, options) {
    const packageJson = {
        name,
        version: '1.0.0',
        description: 'Express API created with OMIRA Code',
        main: 'dist/server.js',
        scripts: {
            start: 'node dist/server.js',
            dev: 'tsx watch src/server.ts',
            build: 'tsc',
            test: 'jest',
        },
        dependencies: {
            'express': '^4.18.2',
            'cors': '^2.8.5',
            'helmet': '^7.1.0',
            'morgan': '^1.10.0',
        },
        devDependencies: {
            '@types/express': '^4.17.21',
            '@types/cors': '^2.8.17',
            '@types/morgan': '^1.9.9',
            '@types/node': '^20.10.5',
            'typescript': '^5.3.3',
            'tsx': '^4.6.2',
        },
    };
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
    const srcDir = path_1.default.join(projectPath, 'src');
    await fs_extra_1.default.ensureDir(srcDir);
    const serverContent = `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ${name} API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`;
    await fs_extra_1.default.writeFile(path_1.default.join(srcDir, 'server.ts'), serverContent);
}
async function createNextProject(projectPath, name, options) {
    (0, child_process_1.execSync)(`npx create-next-app@latest ${name} --typescript --tailwind --app --no-git`, {
        cwd: path_1.default.dirname(projectPath),
        stdio: 'inherit',
    });
}
async function createVueProject(projectPath, name, options) {
    (0, child_process_1.execSync)(`npm create vue@latest ${name}`, {
        cwd: path_1.default.dirname(projectPath),
        stdio: 'inherit',
    });
}
async function createPythonProject(projectPath, name, options) {
    const requirements = `fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
python-dotenv==1.0.0`;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, 'requirements.txt'), requirements);
    const mainPy = `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="${name}")

class HealthCheck(BaseModel):
    status: str
    message: str

@app.get("/")
def read_root():
    return {"message": "Welcome to ${name}"}

@app.get("/health", response_model=HealthCheck)
def health_check():
    return HealthCheck(status="healthy", message="API is running")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, 'main.py'), mainPy);
    const readme = `# ${name}

Created with OMIRA Code CLI

## Setup
\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Run
\`\`\`bash
uvicorn main:app --reload
\`\`\``;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, 'README.md'), readme);
}
//# sourceMappingURL=create.js.map