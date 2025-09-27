import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';

describe('ESLint Configuration', () => {
  const configPath = path.resolve(__dirname, '../../../eslint.config.mjs');

  describe('Configuration Loading', () => {
    it('should have ESLint configuration file', () => {
      expect(fs.existsSync(configPath)).toBe(true);

      const configContent = fs.readFileSync(configPath, 'utf-8');
      expect(configContent).toContain('next/core-web-vitals');
      expect(configContent).toContain('prettier');
    });
  });

  describe('Configuration Content', () => {
    it('should have proper rule configuration', () => {
      const configContent = fs.readFileSync(configPath, 'utf-8');

      // Check for key rules
      expect(configContent).toContain('prefer-const');
      expect(configContent).toContain('no-var');
      expect(configContent).toContain('no-console');
      expect(configContent).toContain('max-len');
    });

    it('should have TypeScript and React support', () => {
      const configContent = fs.readFileSync(configPath, 'utf-8');

      expect(configContent).toContain('**/*.ts');
      expect(configContent).toContain('**/*.tsx');
      expect(configContent).toContain('react/react-in-jsx-scope');
    });

    it('should have proper ignores configured', () => {
      const configContent = fs.readFileSync(configPath, 'utf-8');

      expect(configContent).toContain('node_modules/**');
      expect(configContent).toContain('.next/**');
      expect(configContent).toContain('build/**');
    });
  });
});
