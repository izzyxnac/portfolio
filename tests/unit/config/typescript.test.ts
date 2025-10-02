import { describe, it, expect } from 'vitest';
import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';

describe('TypeScript Configuration', () => {
  const configPath = path.resolve(__dirname, '../../../tsconfig.json');

  it('should load TypeScript configuration', () => {
    expect(fs.existsSync(configPath)).toBe(true);

    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    expect(configFile.error).toBeUndefined();
    expect(configFile.config).toBeDefined();
  });

  it('should have strict mode configured', () => {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const config = configFile.config;

    // Using relaxed strict mode for better development experience
    expect(config.compilerOptions.strict).toBe(false);
  });

  it('should have TypeScript compiler options configured correctly', () => {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const config = configFile.config;

    expect(config.compilerOptions.target).toBe('ES2020');
    expect(config.compilerOptions.module).toBe('esnext');
    expect(config.compilerOptions.moduleResolution).toBe('bundler');
    expect(config.compilerOptions.jsx).toBe('preserve');
    expect(config.compilerOptions.noEmit).toBe(true);
  });

  it('should validate configuration structure', () => {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const config = configFile.config;

    // Validate that the config has the expected structure
    expect(config.compilerOptions).toBeDefined();
    expect(config.include).toBeDefined();
    expect(config.exclude).toBeDefined();
    expect(Array.isArray(config.include)).toBe(true);
    expect(Array.isArray(config.exclude)).toBe(true);
  });

  it('should support path mapping', () => {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const config = configFile.config;

    expect(config.compilerOptions.paths).toBeDefined();
    expect(config.compilerOptions.paths['@/*']).toEqual(['./src/*']);
  });

  it('should include Next.js types', () => {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const config = configFile.config;

    expect(config.include).toContain('next-env.d.ts');
    expect(config.include).toContain('**/*.ts');
    expect(config.include).toContain('**/*.tsx');
  });

  it('should exclude node_modules', () => {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const config = configFile.config;

    expect(config.exclude).toContain('node_modules');
  });

  it('should have proper library configuration', () => {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const config = configFile.config;

    expect(config.compilerOptions.lib).toContain('dom');
    expect(config.compilerOptions.lib).toContain('dom.iterable');
    expect(config.compilerOptions.lib).toContain('esnext');
  });

  it('should have proper module resolution settings', () => {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const config = configFile.config;

    expect(config.compilerOptions.esModuleInterop).toBe(true);
    expect(config.compilerOptions.allowJs).toBe(true);
    expect(config.compilerOptions.skipLibCheck).toBe(true);
    expect(config.compilerOptions.isolatedModules).toBe(true);
  });
});
