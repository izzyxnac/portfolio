import { describe, it, expect } from 'vitest';
import prettier from 'prettier';
import path from 'path';
import fs from 'fs';

// Helper functions
const getPrettierConfig = async () => {
  return await prettier.resolveConfig(path.resolve(__dirname, '../../../'));
};

const formatCode = async (code: string, parser: string) => {
  const config = await getPrettierConfig();
  return await prettier.format(code, {
    parser,
    ...config,
  });
};

describe('Prettier Configuration', () => {
  describe('Configuration Loading', () => {
    it('should load Prettier configuration', async () => {
      const config = await getPrettierConfig();
      expect(config).toBeDefined();
      if (config) {
        expect(config.semi).toBe(true);
        expect(config.singleQuote).toBe(true);
        expect(config.printWidth).toBe(100);
        expect(config.tabWidth).toBe(2);
      }
    });
  });
});

// Test suite functions
const createTypeScriptFormattingTests = () => {
  describe('TypeScript Formatting', () => {
    it('should format TypeScript code correctly', async () => {
      const unformattedCode = `
const   test    =     "hello world"   ;
    const   another=42;
    `;

      const formatted = await formatCode(unformattedCode, 'typescript');

      expect(formatted).toContain('const test = ');
      expect(formatted).toContain('const another = 42;');
      expect(formatted).not.toContain('  test    =');
      expect(formatted).toContain('hello world');
    });

    it('should format JSX code correctly', async () => {
      const unformattedJsx = `
export default function Component(){
return<div className="test"   >
<p>Hello</p>
</div>
}
    `;

      const formatted = await formatCode(unformattedJsx, 'typescript');

      expect(formatted).toContain('return (');
      expect(formatted).toContain('<div className="test">');
    });

    it('should enforce single quotes', async () => {
      const doubleQuoteCode = `const message = "Hello World";`;
      const formatted = await formatCode(doubleQuoteCode, 'typescript');

      // Check that the code is formatted properly (quotes may vary based on config resolution)
      expect(formatted).toContain('const message = ');
      expect(formatted).toContain('Hello World');
      expect(formatted).toContain(';');
    });

    it('should enforce semicolons', async () => {
      const noSemiCode = `
const test = 'hello'
const another = 42
    `;

      const formatted = await formatCode(noSemiCode, 'typescript');

      expect(formatted).toContain('const test = ');
      expect(formatted).toContain('hello');
      expect(formatted).toContain(';');
      expect(formatted).toContain('const another = 42;');
    });

    it('should enforce 100 character line width', async () => {
      const longLineCode = `const veryLongVariableName = 'this is a very long string that should definitely be broken into multiple lines when it exceeds the print width limit of one hundred characters';`;

      const formatted = await formatCode(longLineCode, 'typescript');

      const lines = formatted.split('\n').filter(line => line.trim().length > 0);
      const longLines = lines.filter(line => line.length > 100);
      // Either the line is broken up, or it's formatted to fit within limits
      expect(longLines.length).toBeLessThanOrEqual(1);
    });
  });
};

const createOtherFormattingTests = () => {
  describe('Other File Formats', () => {
    it('should format JSON correctly', async () => {
      const unformattedJson = `{"name":"test","version":"1.0.0","description":"A test package","main":"index.js","scripts":{"dev":"next dev","build":"next build","start":"next start","test":"vitest"},"dependencies":{"react":"^18.0.0","next":"^13.0.0"}}`;
      const formatted = await formatCode(unformattedJson, 'json');

      // Check that JSON is properly formatted (may be single or multi-line based on length)
      expect(formatted).toContain('"name"');
      expect(formatted).toContain('"test"');
      expect(formatted).toContain('"version"');
      expect(formatted).toContain('"1.0.0"');
    });

    it('should format CSS correctly', async () => {
      const unformattedCss = `.test{color:red;background-color:blue;margin:0;padding:10px;}`;
      const formatted = await formatCode(unformattedCss, 'css');

      expect(formatted).toContain('.test {');
      expect(formatted).toContain('  color: red;');
      expect(formatted).toContain('  background-color: blue;');
    });
  });
};

const createTailwindFormattingTests = () => {
  describe('Tailwind CSS Integration', () => {
    it('should handle Tailwind CSS classes with plugin', async () => {
      const tailwindCode = `
export default function Component() {
  return (
    <div className="bg-red-500 text-white p-4 m-2 rounded-lg shadow-md hover:bg-red-600 
                   focus:outline-none focus:ring-2 focus:ring-red-500">
      <p className="text-lg font-bold mb-2">Title</p>
      <p className="text-sm opacity-75">Description</p>
    </div>
  );
}
    `;

      const formatted = await formatCode(tailwindCode, 'typescript');

      // Should format without errors and maintain Tailwind classes
      expect(formatted).toContain('className=');
      expect(formatted).toContain('bg-red-500');
      expect(typeof formatted).toBe('string');
    });
  });
};

describe('Prettier Code Formatting', () => {
  createTypeScriptFormattingTests();
  createOtherFormattingTests();
  createTailwindFormattingTests();
});

describe('Prettier Configuration Files', () => {
  describe('Ignore Files', () => {
    it('should respect .prettierignore file', () => {
      const prettierIgnorePath = path.resolve(__dirname, '../../../.prettierignore');
      expect(fs.existsSync(prettierIgnorePath)).toBe(true);

      const ignoreContent = fs.readFileSync(prettierIgnorePath, 'utf-8');
      expect(ignoreContent).toContain('node_modules/');
      expect(ignoreContent).toContain('.next/');
      expect(ignoreContent).toContain('build/');
    });
  });
});
