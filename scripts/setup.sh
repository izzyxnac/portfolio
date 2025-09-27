#!/bin/bash

# Setup Script for AI/ML Portfolio Development Environment (Bash)
# This script sets up the complete development environment

set -e  # Exit on any error

echo "🚀 Setting up AI/ML Portfolio development environment..."

# Change to project root
cd "$(dirname "$0")/.."

# Check Node.js version
echo "🔍 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or later."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or later is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
if ! npm install; then
    echo "⚠️  npm install failed, trying to clear cache and retry..."
    if ! npm cache clean --force; then
        echo "❌ Failed to clear npm cache"
        exit 1
    fi
    if ! npm install; then
        echo "❌ npm install failed even after cache clean"
        exit 1
    fi
fi

# Copy environment files if they don't exist
echo "⚙️  Setting up environment files..."
if [ ! -f ".env.local" ]; then
    if [ -f ".env.local.example" ]; then
        cp ".env.local.example" ".env.local"
        echo "📝 Created .env.local from template"
        echo "⚠️  Please update .env.local with your actual values"
    else
        echo "⚠️  .env.local.example not found, skipping environment setup"
    fi
else
    echo "✅ .env.local already exists"
fi

# Install Vercel CLI globally if not present
echo "🔧 Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    if ! npm install -g vercel@latest; then
        echo "❌ Vercel CLI installation failed"
        exit 1
    fi
else
    echo "✅ Vercel CLI is already installed"
fi

# Run initial build to verify setup
echo "🏗️  Running initial build to verify setup..."
if ! npm run build; then
    echo "❌ Initial build failed"
    exit 1
fi

# Run tests to ensure everything works
echo "🧪 Running tests to verify setup..."
if ! npm run test:unit; then
    echo "❌ Unit tests failed"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env.local with your actual environment variables"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Run 'vercel login' to authenticate with Vercel"
echo "4. Run 'vercel link' to connect your project to Vercel"
echo ""
echo "🚀 Happy coding!"
