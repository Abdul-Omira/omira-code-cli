# OMIRA Code CLI 🚀

<div align="center">

![OMIRA Code Banner](https://img.shields.io/badge/OMIRA-Code_CLI-gradient?style=for-the-badge&logo=terminal&logoColor=white)

[![npm version](https://img.shields.io/npm/v/omira-code-cli.svg?style=flat-square)](https://www.npmjs.com/package/omira-code-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/omira-code-cli.svg?style=flat-square)](https://nodejs.org)
[![Downloads](https://img.shields.io/npm/dt/omira-code-cli.svg?style=flat-square)](https://www.npmjs.com/package/omira-code-cli)

**Advanced CLI for developers with AI-powered code generation and project management**

</div>

---

## ✨ Features

- 🚀 **Project Creation** - Instantly scaffold React, Node.js, Express, Next.js, Vue, and Python projects
- ⚡ **Code Generation** - Generate components, hooks, APIs, services, models, and more
- 🤖 **AI Integration** - AI-powered code assistance for optimization, debugging, and generation
- 📊 **Code Analysis** - Analyze code quality, complexity, and auto-fix issues
- 🔧 **Smart Refactoring** - Refactor code with AI assistance and best practices
- 🧪 **Test Generation** - Automatically generate unit tests for your code
- 🎨 **Beautiful UI** - Stunning gradient ASCII art and color-coded terminal output
- 💡 **Interactive Mode** - Guided workflows with an intuitive interface

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g omira-code-cli
```

### Local Installation

```bash
npm install omira-code-cli
```

## 🚀 Quick Start

### Interactive Mode (Easiest)

```bash
omira interactive
# or
omira i
```

### Create a New Project

```bash
# Create a React app
omira create react MyApp

# Create an Express API
omira create express MyAPI

# Create a Python FastAPI project
omira create python MyService
```

### Generate Code

```bash
# Generate a React component
omira generate component --name UserCard

# Generate an API endpoint
omira generate api --name Products

# Generate a React hook
omira generate hook --name useAuth

# Generate a Dockerfile
omira generate dockerfile
```

## 📖 Commands

### `create <type> <name>`
Create new projects with pre-configured templates.

**Types:** `react`, `node`, `express`, `next`, `vue`, `python`

```bash
omira create react MyApp --typescript
omira create express MyAPI --force
```

### `generate <type>` (alias: `g`)
Generate code snippets and boilerplate.

**Types:** `component`, `hook`, `api`, `service`, `model`, `test`, `dockerfile`, `ci`

```bash
omira generate component --name Button --output ./src/components
omira g api --name Users --dry-run
```

### `analyze [path]` (alias: `a`)
Analyze code quality and complexity.

```bash
omira analyze ./src --recursive
omira a . --fix --report json
```

### `refactor <file>` (alias: `r`)
Refactor code with AI assistance.

```bash
omira refactor utils.js --pattern clean-code
omira r api.ts --preview --backup
```

### `test [path]` (alias: `t`)
Generate and run tests.

```bash
omira test ./src --generate
omira t . --coverage --watch
```

### `ai <prompt>`
AI-powered code assistance.

```bash
omira ai "optimize this function" -c utils.js
omira ai "explain this code" --model mistral-7b --stream
```

### `interactive` (alias: `i`)
Start interactive mode with guided workflows.

```bash
omira interactive
```

## 🎯 Examples

### Create a Full-Stack Application

```bash
# Create backend
omira create express backend-api
cd backend-api && npm install

# Create frontend
omira create react frontend-app
cd frontend-app && npm install
```

### Generate Complete CRUD API

```bash
# Generate model
omira generate model --name Product

# Generate service
omira generate service --name ProductService

# Generate API endpoints
omira generate api --name Products

# Generate tests
omira generate test --name ProductAPI
```

### AI-Powered Development

```bash
# Get AI help for optimization
omira ai "optimize this sorting algorithm" -c sort.js

# Debug with AI
omira ai "find bugs in this code" -c buggy.js

# Generate documentation
omira ai "add JSDoc comments" -c utils.js
```

## ⚙️ Configuration

### Environment Variables

```bash
# AI Model Configuration
export AI_MODEL_URL=http://localhost:8080
export DEFAULT_AI_MODEL=mistral-7b

# Custom Templates Directory
export OMIRA_TEMPLATES_DIR=~/.omira/templates
```

### Custom Templates

Create custom templates in `~/.omira/templates/`:

```
~/.omira/templates/
├── react-component/
│   ├── component.tsx
│   ├── component.test.tsx
│   └── component.module.css
└── express-api/
    ├── controller.ts
    ├── service.ts
    └── routes.ts
```

## 🤝 AI Integration

OMIRA Code CLI integrates with local AI models for enhanced development:

1. **Start AI Model Server** (using Model Forge CLI)
   ```bash
   model-forge serve mistral-7b
   ```

2. **Use AI Features**
   ```bash
   omira ai "write a function to validate email"
   omira refactor code.js --pattern ai-optimize
   ```

## 🛠️ Development

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/abdul-omira/omira-code-cli.git
cd omira-code-cli

# Install dependencies
npm install

# Build
npm run build

# Run in development
npm run dev
```

### Run Tests

```bash
npm test
npm run test:coverage
```

### Link for Local Testing

```bash
npm link
omira --version
```

## 📊 Project Structure

```
omira-code-cli/
├── src/
│   ├── cli.ts              # Main CLI entry point
│   ├── commands/           # Command implementations
│   │   ├── create.ts
│   │   ├── generate.ts
│   │   ├── analyze.ts
│   │   ├── refactor.ts
│   │   ├── test.ts
│   │   ├── ai.ts
│   │   └── interactive.ts
│   ├── templates/          # Code templates
│   ├── utils/              # Utility functions
│   └── services/           # Core services
├── dist/                   # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Features Showcase

### Beautiful Terminal UI
- Gradient ASCII art banner
- Color-coded output with chalk
- Progress bars and spinners
- Interactive prompts with inquirer

### Smart Code Generation
- Context-aware templates
- TypeScript/JavaScript support
- Modern best practices
- Customizable output

### AI-Powered Features
- Code explanation
- Bug detection
- Performance optimization
- Test generation
- Documentation creation

## 📝 License

MIT © Abdul Omira

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/abdul-omira/omira-code-cli/issues) with:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- System information

## 💬 Support

- 📧 Email: abdul.omira@example.com
- 🐦 Twitter: [@abdul_omira](https://twitter.com/abdul_omira)
- 💼 LinkedIn: [Abdul Omira](https://linkedin.com/in/abdul-omira)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=abdul-omira/omira-code-cli&type=Date)](https://star-history.com/#abdul-omira/omira-code-cli&Date)

---

<div align="center">

**Built with ❤️ by Abdul Omira**

⭐ Star this repository if you find it helpful!

</div>