import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';

export async function generateCommand(type: string, options: any) {
  const spinner = ora(`Generating ${type}...`).start();

  try {
    const name = options.name || `Generated${type}`;
    const outputPath = options.output || process.cwd();

    let content: string;

    switch (type.toLowerCase()) {
      case 'component':
        content = generateReactComponent(name);
        break;
      case 'api':
        content = generateAPIEndpoint(name);
        break;
      case 'hook':
        content = generateReactHook(name);
        break;
      case 'service':
        content = generateService(name);
        break;
      case 'model':
        content = generateModel(name);
        break;
      case 'test':
        content = generateTest(name);
        break;
      case 'dockerfile':
        content = generateDockerfile();
        break;
      case 'ci':
        content = generateCIConfig();
        break;
      default:
        spinner.fail(chalk.red(`Unknown generation type: ${type}`));
        return;
    }

    if (options.dryRun) {
      spinner.succeed(chalk.green('Dry run - Generated content:'));
      console.log(chalk.gray('─'.repeat(50)));
      console.log(content);
      console.log(chalk.gray('─'.repeat(50)));
      return;
    }

    const fileName = getFileName(type, name);
    const filePath = path.join(outputPath, fileName);

    await fs.writeFile(filePath, content);
    spinner.succeed(chalk.green(`✨ Generated ${fileName}`));
    console.log(chalk.cyan(`📁 Location: ${filePath}`));

  } catch (error) {
    spinner.fail(chalk.red(`Failed to generate: ${error}`));
  }
}

function generateReactComponent(name: string): string {
  return `import React from 'react';
import styles from './${name}.module.css';

interface ${name}Props {
  className?: string;
  children?: React.ReactNode;
}

export const ${name}: React.FC<${name}Props> = ({ className, children }) => {
  return (
    <div className={\`\${styles.container} \${className || ''}\`}>
      {children}
    </div>
  );
};

export default ${name};`;
}

function generateReactHook(name: string): string {
  const hookName = name.startsWith('use') ? name : `use${name}`;
  return `import { useState, useEffect, useCallback } from 'react';

interface ${hookName}Options {
  initialValue?: any;
  onUpdate?: (value: any) => void;
}

export const ${hookName} = (options: ${hookName}Options = {}) => {
  const { initialValue, onUpdate } = options;
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (onUpdate && value !== undefined) {
      onUpdate(value);
    }
  }, [value, onUpdate]);

  const updateValue = useCallback((newValue: any) => {
    setLoading(true);
    try {
      setValue(newValue);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    value,
    setValue: updateValue,
    loading,
    error,
  };
};

export default ${hookName};`;
}

function generateAPIEndpoint(name: string): string {
  return `import { Request, Response, NextFunction } from 'express';

export interface ${name}Request extends Request {
  body: {
    // Define request body structure
  };
  params: {
    id?: string;
  };
}

export const get${name} = async (
  req: ${name}Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    
    // Implement GET logic
    const result = await fetch${name}(id);
    
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const create${name} = async (
  req: ${name}Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    
    // Validate input
    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
      });
    }
    
    // Implement CREATE logic
    const result = await save${name}(data);
    
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const update${name} = async (
  req: ${name}Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    // Implement UPDATE logic
    const result = await modify${name}(id, data);
    
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const delete${name} = async (
  req: ${name}Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    
    // Implement DELETE logic
    await remove${name}(id);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Helper functions (implement these based on your data layer)
async function fetch${name}(id?: string) {
  // Implement data fetching
  return {};
}

async function save${name}(data: any) {
  // Implement data saving
  return data;
}

async function modify${name}(id: string | undefined, data: any) {
  // Implement data modification
  return data;
}

async function remove${name}(id: string | undefined) {
  // Implement data removal
}`;
}

function generateService(name: string): string {
  return `import axios from 'axios';

export class ${name}Service {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL = process.env.API_URL || 'http://localhost:3000') {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  setAuthToken(token: string) {
    this.headers['Authorization'] = \`Bearer \${token}\`;
  }

  async get<T>(endpoint: string, params?: any): Promise<T> {
    try {
      const response = await axios.get(\`\${this.baseURL}\${endpoint}\`, {
        headers: this.headers,
        params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await axios.post(\`\${this.baseURL}\${endpoint}\`, data, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await axios.put(\`\${this.baseURL}\${endpoint}\`, data, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.delete(\`\${this.baseURL}\${endpoint}\`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export default new ${name}Service();`;
}

function generateModel(name: string): string {
  return `export interface ${name} {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Add your model properties here
}

export class ${name}Model implements ${name} {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<${name}> = {}) {
    this.id = data.id || this.generateId();
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  toJSON(): ${name} {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(json: any): ${name}Model {
    return new ${name}Model({
      id: json.id,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    });
  }

  validate(): boolean {
    // Add validation logic
    return true;
  }
}`;
}

function generateTest(name: string): string {
  return `import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('${name}', () => {
  let instance: any;

  beforeEach(() => {
    // Setup before each test
    instance = new ${name}();
  });

  afterEach(() => {
    // Cleanup after each test
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should create an instance', () => {
      expect(instance).toBeDefined();
    });

    it('should have required properties', () => {
      // Add your property checks
      expect(instance).toHaveProperty('id');
    });
  });

  describe('methods', () => {
    it('should perform expected operation', async () => {
      // Add your test logic
      const result = await instance.someMethod();
      expect(result).toBeDefined();
    });

    it('should handle errors gracefully', async () => {
      // Test error handling
      await expect(instance.methodThatThrows()).rejects.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle null input', () => {
      const result = instance.processInput(null);
      expect(result).toBeNull();
    });

    it('should handle empty input', () => {
      const result = instance.processInput('');
      expect(result).toBe('');
    });
  });
});`;
}

function generateDockerfile(): string {
  return `# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {r.statusCode === 200 ? process.exit(0) : process.exit(1)})"

# Start application
CMD ["node", "dist/index.js"]`;
}

function generateCIConfig(): string {
  return `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test -- --coverage
    
    - name: Build
      run: npm run build
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        token: \${{ secrets.CODECOV_TOKEN }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        echo "Deploying to production..."
        # Add your deployment script here`;
}

function getFileName(type: string, name: string): string {
  const fileMap: Record<string, string> = {
    component: `${name}.tsx`,
    hook: `${name}.ts`,
    api: `${name}.controller.ts`,
    service: `${name}.service.ts`,
    model: `${name}.model.ts`,
    test: `${name}.test.ts`,
    dockerfile: 'Dockerfile',
    ci: '.github/workflows/ci.yml',
  };

  return fileMap[type.toLowerCase()] || `${name}.ts`;
}