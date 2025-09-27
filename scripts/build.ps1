# Build Script for AI/ML Portfolio (PowerShell)
# This script handles the complete build process with error checking

param(
    [string]$Environment = "development"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting build process..." -ForegroundColor Green

# Change to project directory
$ProjectDir = Split-Path $PSScriptRoot -Parent
Set-Location $ProjectDir

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found in project directory" -ForegroundColor Red
    exit 1
}

try {
    # Install dependencies
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    # Try npm ci first, fall back to npm install on Windows permission issues
    npm ci 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  npm ci didn't work, trying alternative installation method..." -ForegroundColor Yellow
        npm install
        if ($LASTEXITCODE -ne 0) {
            throw "Dependency installation failed with exit code $LASTEXITCODE"
        }
    }

    # Run type checking
    Write-Host "🔍 Running TypeScript type checking..." -ForegroundColor Yellow
    npm run type-check
    if ($LASTEXITCODE -ne 0) {
        throw "TypeScript type checking failed with exit code $LASTEXITCODE"
    }

    # Run ESLint
    Write-Host "🔧 Running ESLint checks..." -ForegroundColor Yellow
    npm run lint
    if ($LASTEXITCODE -ne 0) {
        throw "ESLint checks failed with exit code $LASTEXITCODE"
    }

    # Run Prettier check
    Write-Host "💅 Checking code formatting..." -ForegroundColor Yellow
    npm run format:check
    if ($LASTEXITCODE -ne 0) {
        throw "Prettier formatting check failed with exit code $LASTEXITCODE"
    }

    # Run unit tests
    Write-Host "🧪 Running unit tests..." -ForegroundColor Yellow
    npm run test:unit
    if ($LASTEXITCODE -ne 0) {
        throw "Unit tests failed with exit code $LASTEXITCODE"
    }

    # Build the application
    Write-Host "🏗️  Building application..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Application build failed with exit code $LASTEXITCODE"
    }

    # Verify build output
    if (Test-Path ".next") {
        Write-Host "✅ Build completed successfully!" -ForegroundColor Green
        Write-Host "📊 Build artifacts:" -ForegroundColor Cyan
        Get-ChildItem ".next" | Format-Table Name, Length, LastWriteTime
    } else {
        Write-Host "❌ Build failed - .next directory not found" -ForegroundColor Red
        exit 1
    }

    Write-Host "🎉 Build process completed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Build process failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
