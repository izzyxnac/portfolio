# Setup Script for AI/ML Portfolio Development Environment (PowerShell)
# This script sets up the complete development environment

$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up AI/ML Portfolio development environment..." -ForegroundColor Green

# Change to project root
$RootDir = Split-Path $PSScriptRoot -Parent
Set-Location $RootDir

try {
    # Check Node.js version
    Write-Host "🔍 Checking Node.js version..." -ForegroundColor Yellow
    try {
        $NodeVersion = node --version
        $NodeMajorVersion = [int]($NodeVersion -replace 'v(\d+)\..*', '$1')
        
        if ($NodeMajorVersion -lt 18) {
            Write-Host "❌ Node.js version 18 or later is required. Current version: $NodeVersion" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ Node.js version: $NodeVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Node.js is not installed. Please install Node.js 18 or later." -ForegroundColor Red
        exit 1
    }

    # Install dependencies
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  npm install failed, trying to clear cache and retry..." -ForegroundColor Yellow
        npm cache clean --force
        npm install
        if ($LASTEXITCODE -ne 0) {
            throw "npm install failed even after cache clean with exit code $LASTEXITCODE"
        }
    }

    # Copy environment files if they don't exist
    Write-Host "⚙️  Setting up environment files..." -ForegroundColor Yellow
    if (-not (Test-Path ".env.local")) {
        if (Test-Path ".env.local.example") {
            Copy-Item ".env.local.example" ".env.local"
            Write-Host "📝 Created .env.local from template" -ForegroundColor Cyan
            Write-Host "⚠️  Please update .env.local with your actual values" -ForegroundColor Yellow
        } else {
            Write-Host "⚠️  .env.local.example not found, skipping environment setup" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✅ .env.local already exists" -ForegroundColor Green
    }

    # Install Vercel CLI globally if not present
    Write-Host "🔧 Checking Vercel CLI..." -ForegroundColor Yellow
    try {
        vercel --version | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "Vercel CLI check failed"
        }
        Write-Host "✅ Vercel CLI is already installed" -ForegroundColor Green
    }
    catch {
        Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel@latest
        if ($LASTEXITCODE -ne 0) {
            throw "Vercel CLI installation failed with exit code $LASTEXITCODE"
        }
    }

    # Run initial build to verify setup
    Write-Host "🏗️  Running initial build to verify setup..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Initial build failed with exit code $LASTEXITCODE"
    }

    # Run tests to ensure everything works
    Write-Host "🧪 Running tests to verify setup..." -ForegroundColor Yellow
    npm run test:unit
    if ($LASTEXITCODE -ne 0) {
        throw "Unit tests failed with exit code $LASTEXITCODE"
    }

    Write-Host ""
    Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Update .env.local with your actual environment variables" -ForegroundColor White
    Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor White
    Write-Host "3. Run 'vercel login' to authenticate with Vercel" -ForegroundColor White
    Write-Host "4. Run 'vercel link' to connect your project to Vercel" -ForegroundColor White
    Write-Host ""
    Write-Host "🚀 Happy coding!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Setup failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
