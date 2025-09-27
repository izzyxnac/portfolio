#!/bin/bash

# Build Script for AI/ML Portfolio (Bash)
# This script handles the complete build process with error checking

set -e  # Exit on any error

echo "🚀 Starting build process..."

# Change to project directory
cd "$(dirname "$0")/.."

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in project directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
# Try npm ci first, fall back to npm install on permission issues
if ! npm ci 2>/dev/null; then
    echo "⚠️  npm ci didn't work, trying alternative installation method..."
    if ! npm install; then
        echo "❌ Dependency installation failed"
        exit 1
    fi
fi

# Run type checking
echo "🔍 Running TypeScript type checking..."
if ! npm run type-check; then
    echo "❌ TypeScript type checking failed"
    exit 1
fi

# Run ESLint
echo "🔧 Running ESLint checks..."
if ! npm run lint; then
    echo "❌ ESLint checks failed"
    exit 1
fi

# Run Prettier check
echo "💅 Checking code formatting..."
if ! npm run format:check; then
    echo "❌ Prettier formatting check failed"
    exit 1
fi

# Run unit tests
echo "🧪 Running unit tests..."
if ! npm run test:unit; then
    echo "❌ Unit tests failed"
    exit 1
fi

# Build the application
echo "🏗️  Building application..."
if ! npm run build; then
    echo "❌ Application build failed"
    exit 1
fi

# Verify build output
if [ -d ".next" ]; then
    echo "✅ Build completed successfully!"
    echo "📊 Build artifacts:"
    ls -la .next/
else
    echo "❌ Build failed - .next directory not found"
    exit 1
fi

echo "🎉 Build process completed successfully!"
