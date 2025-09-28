#!/usr/bin/env node

/**
 * Comprehensive quality check script
 * Runs all code quality checks before deployment
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

const checks = [
  {
    name: 'ESLint',
    command: 'npm run lint',
    description: 'Checking code style and potential errors...',
  },
  {
    name: 'Prettier',
    command: 'npm run format:check',
    description: 'Checking code formatting...',
  },
  {
    name: 'TypeScript',
    command: 'npm run type-check',
    description: 'Running TypeScript type checking...',
  },
  {
    name: 'Unit Tests',
    command: 'npm run test:unit',
    description: 'Running unit tests...',
  },
  {
    name: 'Build',
    command: 'npm run build',
    description: 'Testing production build...',
  },
];

async function runCheck(check) {
  console.log(chalk.blue(`\n🔍 ${check.name}: ${check.description}`));

  try {
    execSync(check.command, { stdio: 'inherit' });
    console.log(chalk.green(`✅ ${check.name} passed!`));
    return true;
  } catch {
    console.log(chalk.red(`❌ ${check.name} failed!`));
    return false;
  }
}

async function main() {
  console.log(chalk.bold.cyan('\n🚀 Running comprehensive quality checks...\n'));

  let allPassed = true;

  for (const check of checks) {
    const passed = await runCheck(check);
    if (!passed) {
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log(chalk.bold.green('\n🎉 All quality checks passed! Ready for deployment.'));
    process.exit(0);
  } else {
    console.log(
      chalk.bold.red('\n💥 Some quality checks failed. Please fix the issues before pushing.')
    );
    process.exit(1);
  }
}

main().catch(console.error);
