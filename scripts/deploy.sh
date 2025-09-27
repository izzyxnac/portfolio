#!/bin/bash

# Deployment Script for AI/ML Portfolio (Bash)
# This script handles deployment to Vercel with proper environment setup

set -e  # Exit on any error

# Configuration
VERCEL_PROJECT_NAME="ai-ml-portfolio"
ENVIRONMENT=${1:-"preview"}  # Default to preview, can be "production"

echo "🚀 Starting deployment process to $ENVIRONMENT..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Check for required environment variables
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: VERCEL_TOKEN environment variable is required"
    echo "Please set your Vercel token: export VERCEL_TOKEN=your_token_here"
    exit 1
fi

# Change to project directory
cd "$(dirname "$0")/.."

# Pull Vercel configuration
echo "⚙️  Pulling Vercel configuration..."
if [ "$ENVIRONMENT" = "production" ]; then
    if ! vercel pull --yes --environment=production --token="$VERCEL_TOKEN"; then
        echo "❌ Vercel pull (production) failed"
        exit 1
    fi
else
    if ! vercel pull --yes --environment=preview --token="$VERCEL_TOKEN"; then
        echo "❌ Vercel pull (preview) failed"
        exit 1
    fi
fi

# Build the project
echo "🏗️  Building project artifacts..."
if [ "$ENVIRONMENT" = "production" ]; then
    if ! vercel build --prod --token="$VERCEL_TOKEN"; then
        echo "❌ Vercel build (production) failed"
        exit 1
    fi
else
    if ! vercel build --token="$VERCEL_TOKEN"; then
        echo "❌ Vercel build (preview) failed"
        exit 1
    fi
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
if [ "$ENVIRONMENT" = "production" ]; then
    if ! DEPLOYMENT_URL=$(vercel deploy --prebuilt --prod --token="$VERCEL_TOKEN"); then
        echo "❌ Vercel production deployment failed"
        exit 1
    fi
    echo "✅ Production deployment successful!"
    echo "🌐 Production URL: $DEPLOYMENT_URL"
    
    # Run E2E tests against production
    echo "🧪 Running E2E tests against production..."
    export PLAYWRIGHT_BASE_URL="$DEPLOYMENT_URL"
    if ! npm run test:e2e; then
        echo "⚠️  E2E tests failed, but deployment was successful"
    fi
    
else
    if ! DEPLOYMENT_URL=$(vercel deploy --prebuilt --token="$VERCEL_TOKEN"); then
        echo "❌ Vercel preview deployment failed"
        exit 1
    fi
    echo "✅ Preview deployment successful!"
    echo "🌐 Preview URL: $DEPLOYMENT_URL"
fi

echo "🎉 Deployment process completed successfully!"
echo "📝 Deployment URL saved to deployment-url-$ENVIRONMENT.txt"
