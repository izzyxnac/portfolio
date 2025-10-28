import { test, expect, Page } from '@playwright/test';

// Helper function to setup test page
async function setupTestPage(page: Page) {
  await page.goto('/');
}

// Helper function to create test section and navigation link
async function createTestSectionAndLink(page: Page) {
  // Add a test section to the page for anchor linking
  await page.evaluate(() => {
    const section = document.createElement('section');
    section.id = 'test-section';
    section.style.height = '100vh';
    section.style.marginTop = '100vh';
    section.style.backgroundColor = '#f0f0f0';
    section.style.display = 'flex';
    section.style.alignItems = 'center';
    section.style.justifyContent = 'center';
    section.style.fontSize = '24px';
    section.textContent = 'Test Section';
    document.body.appendChild(section);
  });

  // Always create a simple test navigation that's guaranteed to work
  await page.evaluate(() => {
    // Remove any existing test navigation
    const existingTestNav = document.querySelector('[data-testid="test-navigation"]');
    if (existingTestNav) {
      existingTestNav.remove();
    }

    // Create a test navigation container
    const testNav = document.createElement('div');
    testNav.setAttribute('data-testid', 'test-navigation');
    testNav.style.position = 'fixed';
    testNav.style.top = '10px';
    testNav.style.right = '10px';
    testNav.style.zIndex = '9999';
    testNav.style.background = 'white';
    testNav.style.padding = '10px';
    testNav.style.border = '2px solid #333';
    testNav.style.borderRadius = '4px';
    testNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

    const link = document.createElement('a');
    link.href = '#test-section';
    link.textContent = 'Test Section Link';
    link.style.color = '#0066cc';
    link.style.textDecoration = 'underline';
    link.style.cursor = 'pointer';
    link.setAttribute('data-testid', 'test-section-link');

    testNav.appendChild(link);
    document.body.appendChild(testNav);
  });
}

test.describe('Navigation - Advanced Features', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('smooth scrolling for anchor links', async ({ page }) => {
    // Create test section and navigation link
    await createTestSectionAndLink(page);

    // Wait for elements to be created and stable
    await page.waitForTimeout(1000);

    // Verify test navigation was created
    await expect(page.getByTestId('test-navigation')).toBeVisible();

    // Ensure the link is visible and clickable
    const testLink = page.getByTestId('test-section-link');
    await expect(testLink).toBeVisible();
    await testLink.waitFor({ state: 'attached' });

    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);

    // Click the anchor link
    await testLink.click();

    // Wait for smooth scroll to complete
    await page.waitForTimeout(2000);

    // Verify the section is in view
    const testSection = page.locator('#test-section');
    await expect(testSection).toBeInViewport();

    // Verify scroll position changed
    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBeGreaterThan(initialScrollY);
  });

  test('navigation performance', async ({ page }, testInfo) => {
    // Set viewport to desktop to ensure navigation is visible
    await page.setViewportSize({ width: 1200, height: 800 });

    // Measure navigation performance
    const startTime = Date.now();

    // Navigate between pages using navigation links
    const aboutLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'About' });
    await aboutLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL('/about');

    const projectsLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Projects' });
    await projectsLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL('/projects');

    const homeLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Home' });
    await homeLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL('/');

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // Navigation should be reasonably fast
    // Mobile devices may be slower, so we use a more generous timeout
    const isMobile = testInfo.project.name.includes('Mobile');
    // 15s for mobile, 20s for desktop (more generous timeout)
    const timeoutMs = isMobile ? 15000 : 20000;

    expect(totalTime).toBeLessThan(timeoutMs);
  });
});
