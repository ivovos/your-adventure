import { test, expect } from '@playwright/test';

test.describe('UI Components', () => {
  test('home page should display correctly', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page.getByRole('heading', { name: /The Case of the Missing Words/i })).toBeVisible();

    // Check subtitle
    await expect(page.getByText(/modern mystery adventure/i)).toBeVisible();

    // Check start button
    await expect(page.getByRole('button', { name: /Start New Adventure/i })).toBeVisible();

    // Check footer
    await expect(page.getByText(/Practice Verbal Reasoning/i)).toBeVisible();
  });

  test('should show continue button when progress exists', async ({ page }) => {
    // Start a new game to create progress
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();
    await page.waitForURL('/story');

    // Go back to home
    await page.goto('/');

    // Should now show continue button
    await expect(page.getByRole('button', { name: /Continue Story/i })).toBeVisible();
  });

  test('story page header should work', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Check header elements
    await expect(page.getByRole('button', { name: /Home/i })).toBeVisible();
    await expect(page.getByText(/The Case of the Missing Words/i)).toBeVisible();

    // Click home button
    await page.getByRole('button', { name: /Home/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('educational challenge badges should display correctly', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Navigate to first challenge
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Check for verbal reasoning badge
    await expect(page.getByText(/🧠 Verbal Reasoning/i)).toBeVisible();

    // Complete and move to spelling challenge
    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    // Check for spelling challenge badge
    await expect(page.getByText(/📝 Spelling Challenge/i)).toBeVisible();
  });

  test('dice roller should animate and show results', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Navigate to dice challenge
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Complete challenges
    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    await page.getByRole('button', { name: 'NECESSARY' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    await page.getByRole('button', { name: 'Permanent' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    // Should see dice roll
    await expect(page.getByText(/🎲/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Roll the Dice/i })).toBeVisible();

    // Click roll
    await page.getByRole('button', { name: /Roll the Dice/i }).click();

    // Should show rolling state
    await expect(page.getByRole('button', { name: /Rolling/i })).toBeVisible();

    // Wait for result
    await page.waitForTimeout(2000);

    // Should show result (either success or not)
    const hasResult = await page.getByText(/rolled \d+/i).isVisible();
    expect(hasResult).toBeTruthy();
  });

  test('choice buttons should have correct styling', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Get choice buttons
    const choiceButtons = page.locator('.choice-button');

    // Should have at least 2 choices
    const count = await choiceButtons.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Check hover state works
    const firstButton = choiceButtons.first();
    await firstButton.hover();

    // Button should be visible and enabled
    await expect(firstButton).toBeVisible();
    await expect(firstButton).toBeEnabled();
  });

  test('explanations should show after correct answers', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Answer correctly
    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();

    // Should show explanation
    await expect(page.getByText(/CONCEALS means/i)).toBeVisible();

    // Should show success message
    await expect(page.getByText(/Nailed it!/i)).toBeVisible();
  });
});
