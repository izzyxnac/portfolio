import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the Next.js logo', () => {
    render(<Home />)
    
    const logo = screen.getByAltText('Next.js logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders the main content', () => {
    render(<Home />)
    
    const getStartedText = screen.getByText(/Get started by editing/)
    expect(getStartedText).toBeInTheDocument()
  })

  it('renders the deploy button', () => {
    render(<Home />)
    
    const deployButton = screen.getByText('Deploy now')
    expect(deployButton).toBeInTheDocument()
  })

  it('renders the docs link', () => {
    render(<Home />)
    
    const docsLink = screen.getByText('Read our docs')
    expect(docsLink).toBeInTheDocument()
  })
})
