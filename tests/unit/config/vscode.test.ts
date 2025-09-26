import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Helper functions
const readJsonFile = (filePath: string) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
};

interface Configuration {
  name: string;
  type: string;
  program?: string;
  [key: string]: unknown;
}

interface Task {
  label: string;
  group?: {
    kind: string;
    isDefault?: boolean;
  };
  problemMatcher?: string[];
  [key: string]: unknown;
}

interface Compound {
  name: string;
  [key: string]: unknown;
}

const findConfigByName = (configurations: Configuration[], name: string) => {
  return configurations.find(config => config.name === name);
};

const findTaskByLabel = (tasks: Task[], label: string) => {
  return tasks.find(task => task.label === label);
};

const findCompoundByName = (compounds: Compound[], name: string) => {
  return compounds.find(compound => compound.name === name);
};

// Test suite functions
const createSettingsTests = (vscodeDir: string) => {
  const settingsPath = path.join(vscodeDir, 'settings.json');

  describe('settings.json', () => {
    it('should exist and be valid JSON', () => {
      expect(fs.existsSync(settingsPath)).toBe(true);

      const content = fs.readFileSync(settingsPath, 'utf-8');
      expect(() => JSON.parse(content)).not.toThrow();
    });

    it('should have format on save enabled', () => {
      const settings = readJsonFile(settingsPath);

      expect(settings['editor.formatOnSave']).toBe(true);
      expect(settings['editor.formatOnPaste']).toBe(true);
    });

    it('should have ESLint fix on save configured', () => {
      const settings = readJsonFile(settingsPath);

      expect(settings['editor.codeActionsOnSave']).toBeDefined();
      expect(settings['editor.codeActionsOnSave']['source.fixAll.eslint']).toBe('explicit');
    });

    it('should have Prettier as default formatter', () => {
      const settings = readJsonFile(settingsPath);

      expect(settings['editor.defaultFormatter']).toBe('esbenp.prettier-vscode');
    });

    it('should have TypeScript preferences configured', () => {
      const settings = readJsonFile(settingsPath);

      expect(settings['typescript.preferences.quoteStyle']).toBe('single');
      expect(settings['typescript.suggest.autoImports']).toBe(true);
      expect(settings['typescript.updateImportsOnFileMove.enabled']).toBe('always');
    });

    it('should have file-specific formatters configured', () => {
      const settings = readJsonFile(settingsPath);

      expect(settings['[typescript]']['editor.defaultFormatter']).toBe('esbenp.prettier-vscode');
      expect(settings['[typescriptreact]']['editor.defaultFormatter']).toBe(
        'esbenp.prettier-vscode'
      );
      expect(settings['[javascript]']['editor.defaultFormatter']).toBe('esbenp.prettier-vscode');
      expect(settings['[json]']['editor.defaultFormatter']).toBe('esbenp.prettier-vscode');
    });

    it('should have proper search and file exclusions', () => {
      const settings = readJsonFile(settingsPath);

      expect(settings['search.exclude']['**/node_modules']).toBe(true);
      expect(settings['search.exclude']['**/.next']).toBe(true);
      expect(settings['files.exclude']['**/node_modules']).toBe(true);
      expect(settings['files.exclude']['**/.next']).toBe(true);
    });

    it('should have Tailwind CSS configuration', () => {
      const settings = readJsonFile(settingsPath);

      expect(settings['tailwindCSS.includeLanguages']).toBeDefined();
      expect(settings['tailwindCSS.includeLanguages']['typescript']).toBe('html');
      expect(settings['tailwindCSS.includeLanguages']['typescriptreact']).toBe('html');
    });
  });
};

const createExtensionsTests = (vscodeDir: string) => {
  const extensionsPath = path.join(vscodeDir, 'extensions.json');

  describe('extensions.json', () => {
    it('should exist and be valid JSON', () => {
      expect(fs.existsSync(extensionsPath)).toBe(true);
      expect(() => readJsonFile(extensionsPath)).not.toThrow();
    });

    it('should recommend essential extensions', () => {
      const extensions = readJsonFile(extensionsPath);

      const recommendations = extensions.recommendations;
      expect(recommendations).toContain('esbenp.prettier-vscode');
      expect(recommendations).toContain('dbaeumer.vscode-eslint');
      expect(recommendations).toContain('ms-vscode.vscode-typescript-next');
      expect(recommendations).toContain('bradlc.vscode-tailwindcss');
    });

    it('should recommend testing extensions', () => {
      const extensions = readJsonFile(extensionsPath);

      const recommendations = extensions.recommendations;
      expect(recommendations).toContain('vitest.explorer');
      expect(recommendations).toContain('ms-playwright.playwright');
    });

    it('should have unwanted recommendations', () => {
      const extensions = readJsonFile(extensionsPath);

      expect(extensions.unwantedRecommendations).toBeDefined();
      expect(extensions.unwantedRecommendations).toContain('ms-vscode.vscode-typescript');
      expect(extensions.unwantedRecommendations).toContain('hookyqr.beautify');
    });
  });
};

const createLaunchTests = (vscodeDir: string) => {
  const launchPath = path.join(vscodeDir, 'launch.json');

  describe('launch.json', () => {
    it('should exist and be valid JSON', () => {
      expect(fs.existsSync(launchPath)).toBe(true);
      expect(() => readJsonFile(launchPath)).not.toThrow();
    });

    it('should have Next.js debug configurations', () => {
      const launch = readJsonFile(launchPath);

      const configurations = launch.configurations;
      const nextServerConfig = findConfigByName(configurations, 'Next.js: debug server-side');
      const nextClientConfig = findConfigByName(configurations, 'Next.js: debug client-side');

      expect(nextServerConfig).toBeDefined();
      expect(nextClientConfig).toBeDefined();
      expect(nextServerConfig?.type).toBe('node');
      expect(nextClientConfig?.type).toBe('chrome');
    });

    it('should have Vitest debug configurations', () => {
      const launch = readJsonFile(launchPath);

      const configurations = launch.configurations;
      const vitestConfig = findConfigByName(configurations, 'Debug Vitest Tests');

      expect(vitestConfig).toBeDefined();
      expect(vitestConfig?.type).toBe('node');
      expect(vitestConfig?.program).toContain('vitest.mjs');
    });

    it('should have compound configurations', () => {
      const launch = readJsonFile(launchPath);

      expect(launch.compounds).toBeDefined();
      expect(launch.compounds.length).toBeGreaterThan(0);

      const fullStackCompound = findCompoundByName(
        launch.compounds,
        'Next.js: debug full stack (compound)'
      );
      expect(fullStackCompound).toBeDefined();
    });
  });
};

const createTasksTests = (vscodeDir: string) => {
  const tasksPath = path.join(vscodeDir, 'tasks.json');

  describe('tasks.json', () => {
    it('should exist and be valid JSON', () => {
      expect(fs.existsSync(tasksPath)).toBe(true);
      expect(() => readJsonFile(tasksPath)).not.toThrow();
    });

    it('should have development tasks', () => {
      const tasks = readJsonFile(tasksPath);

      const taskLabels = tasks.tasks.map((task: { label: string }) => task.label);
      expect(taskLabels).toContain('dev');
      expect(taskLabels).toContain('build');
      expect(taskLabels).toContain('lint');
      expect(taskLabels).toContain('format');
    });

    it('should have test tasks', () => {
      const tasks = readJsonFile(tasksPath);

      const taskLabels = tasks.tasks.map((task: { label: string }) => task.label);
      expect(taskLabels).toContain('test');
      expect(taskLabels).toContain('test:watch');
      expect(taskLabels).toContain('test:ui');
    });

    it('should have proper task groups', () => {
      const tasks = readJsonFile(tasksPath);

      const devTask = findTaskByLabel(tasks.tasks, 'dev');
      const testTask = findTaskByLabel(tasks.tasks, 'test');

      expect(devTask?.group?.kind).toBe('build');
      expect(devTask?.group?.isDefault).toBe(true);
      expect(testTask?.group?.kind).toBe('test');
    });

    it('should have problem matchers configured', () => {
      const tasks = readJsonFile(tasksPath);

      const lintTask = findTaskByLabel(tasks.tasks, 'lint');
      expect(lintTask?.problemMatcher).toContain('$eslint-stylish');
    });
  });
};

describe('VS Code Configuration', () => {
  const vscodeDir = path.resolve(__dirname, '../../../.vscode');

  it('should have .vscode directory', () => {
    expect(fs.existsSync(vscodeDir)).toBe(true);
    expect(fs.statSync(vscodeDir).isDirectory()).toBe(true);
  });

  createSettingsTests(vscodeDir);
  createExtensionsTests(vscodeDir);
  createLaunchTests(vscodeDir);
  createTasksTests(vscodeDir);
});
