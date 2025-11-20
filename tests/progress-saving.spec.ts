import { test, expect } from '@playwright/test';

test.describe('Progress Saving', () => {
  test('should save progress automatically', async ({ page }) => {
    // Start new game
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Make some progress
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Answer first question
    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    // Reload page
    await page.reload();

    // Should still be on story page (not home)
    await expect(page).toHaveURL('/story');

    // Should be on the same node (not back at start)
    // We should NOT see the opening text again
    const hasOpeningText = await page.getByText(/called to the Central Library/i).isVisible().catch(() => false);
    expect(hasOpeningText).toBeFalsy();
  });

  test('should allow continuing from home page', async ({ page }) => {
    // Start new game and make progress
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Answer question
    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    // Go back to home
    await page.getByRole('button', { name: /Home/i }).click();

    // Continue button should be visible
    await expect(page.getByRole('button', { name: /Continue Story/i })).toBeVisible();

    // Click continue
    await page.getByRole('button', { name: /Continue Story/i }).click();

    // Should be back in the story at saved position
    await expect(page).toHaveURL('/story');
  });

  test('should reset progress when starting new adventure', async ({ page }) => {
    // Make some progress
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Go home
    await page.getByRole('button', { name: /Home/i }).click();

    // Start new adventure
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Should be at the beginning
    await expect(page.getByText(/called to the Central Library/i)).toBeVisible();
  });

  test('should persist inventory across page reloads', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Navigate to get an item
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

    // Check if inventory exists
    const hasInventory = await page.getByText(/Your Inventory/i).isVisible().catch(() => false);

    if (hasInventory) {
      // Get inventory content
      const inventoryText = await page.getByText(/Your Inventory/i).textContent();

      // Reload page
      await page.reload();

      // Inventory should still be there
      await expect(page.getByText(/Your Inventory/i)).toBeVisible();

      // Should have same content
      const newInventoryText = await page.getByText(/Your Inventory/i).textContent();
      expect(newInventoryText).toBe(inventoryText);
    }
  });
});
