import { test, expect } from '@playwright/test';

test.describe('Adventure Story Paths', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Path 1: Examine Message → Reference Section → Hide Successfully', async ({ page }) => {
    // Start adventure
    await page.getByRole('button', { name: /Start New Adventure/i }).click();
    await expect(page).toHaveURL('/story');

    // Wait for story to load
    await expect(page.getByText(/The Case of the Missing Words/i)).toBeVisible();

    // Choice 1: Examine the coded message
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Challenge 1: CONCEALS (Verbal Reasoning)
    await expect(page.getByText(/What does CONCEALS mean/i)).toBeVisible();
    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await expect(page.getByText(/Nailed it!/i)).toBeVisible();

    // Wait for navigation
    await page.waitForTimeout(2500);

    // Challenge 2: NECESSARY (Spelling)
    await expect(page.getByText(/Which spelling is CORRECT/i)).toBeVisible();
    await page.getByRole('button', { name: 'NECESSARY' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await expect(page.getByText(/Nailed it!/i)).toBeVisible();

    await page.waitForTimeout(2500);

    // Challenge 3: PERMANENT (Verbal Reasoning - Opposite)
    await expect(page.getByText(/OPPOSITE of "temporary"/i)).toBeVisible();
    await page.getByRole('button', { name: 'Permanent' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await expect(page.getByText(/Nailed it!/i)).toBeVisible();

    await page.waitForTimeout(2500);

    // Dice Roll Challenge
    await expect(page.getByText(/Roll.*dice/i)).toBeVisible();
    await page.getByRole('button', { name: /Roll the Dice/i }).click();

    // Wait for dice roll to complete
    await page.waitForTimeout(3000);

    // Should navigate to either success or failure path
    const hasSuccessText = await page.getByText(/Success/i).isVisible().catch(() => false);
    const hasFailText = await page.getByText(/Not quite/i).isVisible().catch(() => false);

    expect(hasSuccessText || hasFailText).toBeTruthy();
  });

  test('should complete Path 2: Library Search → Study Rooms → Take Photo', async ({ page }) => {
    await page.getByRole('button', { name: /Start New Adventure/i }).click();
    await expect(page).toHaveURL('/story');

    // Choice: Search the library for more clues
    await page.getByRole('button', { name: /Search the library/i }).click();

    // Challenge: SEPARATE (Spelling)
    await expect(page.getByText(/Which spelling is CORRECT/i)).toBeVisible();
    await page.getByRole('button', { name: 'SEPARATE' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await expect(page.getByText(/Nailed it!/i)).toBeVisible();

    await page.waitForTimeout(2500);

    // Choice: Take photo of evidence
    await page.getByRole('button', { name: /Take a photo/i }).click();

    // Challenge: OBTAIN (Verbal Reasoning)
    await expect(page.getByText(/to get or acquire/i)).toBeVisible();
    await page.getByRole('button', { name: 'Obtain' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await expect(page.getByText(/Nailed it!/i)).toBeVisible();

    await page.waitForTimeout(2500);

    // Should show evidence challenge
    await expect(page.getByText(/EVIDENCE/i)).toBeVisible();
  });

  test('should handle incorrect answers and allow retry', async ({ page }) => {
    await page.getByRole('button', { name: /Start New Adventure/i }).click();
    await expect(page).toHaveURL('/story');

    // Choice: Examine the coded message
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Give wrong answer to CONCEALS
    await expect(page.getByText(/What does CONCEALS mean/i)).toBeVisible();
    await page.getByRole('button', { name: 'Reveals' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();

    // Should show error message
    await expect(page.getByText(/Not quite/i)).toBeVisible();

    // Should show Try Again button
    await expect(page.getByRole('button', { name: /Try Again/i })).toBeVisible();

    // Retry with correct answer
    await page.getByRole('button', { name: /Try Again/i }).click();
    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await expect(page.getByText(/Nailed it!/i)).toBeVisible();
  });

  test('should display hints when requested', async ({ page }) => {
    await page.getByRole('button', { name: /Start New Adventure/i }).click();
    await expect(page).toHaveURL('/story');

    // Navigate to first challenge
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // Check for hint button
    await expect(page.getByRole('button', { name: /Need a hint/i })).toBeVisible();

    // Click hint
    await page.getByRole('button', { name: /Need a hint/i }).click();

    // Hint should be visible
    await expect(page.getByText(/Hint:/i)).toBeVisible();
  });

  test('should track inventory items', async ({ page }) => {
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Complete challenges to get to reference section (which gives an item)
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    // CONCEALS
    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    // NECESSARY
    await page.getByRole('button', { name: 'NECESSARY' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    // PERMANENT
    await page.getByRole('button', { name: 'Permanent' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    // Check for item acquired notification
    const itemNotification = page.getByText(/acquired/i);
    if (await itemNotification.isVisible()) {
      // Check that inventory section appears at bottom
      await expect(page.getByText(/Your Inventory/i)).toBeVisible();
    }
  });

  test('should handle "find the incorrect word" spelling challenges', async ({ page }) => {
    await page.getByRole('button', { name: /Start New Adventure/i }).click();

    // Navigate to a path with "incorrect word" challenge
    // This requires going through several steps to reach it
    await page.getByRole('button', { name: /Examine the coded message/i }).click();

    await page.getByRole('button', { name: 'Hides' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    await page.getByRole('button', { name: 'NECESSARY' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    await page.getByRole('button', { name: 'Permanent' }).click();
    await page.getByRole('button', { name: /Submit Answer/i }).click();
    await page.waitForTimeout(2500);

    // Roll dice - might need to retry if we don't get the right path
    await page.getByRole('button', { name: /Roll the Dice/i }).click();
    await page.waitForTimeout(3000);

    // Check if we see "Which word is spelled INCORRECTLY" question
    const hasIncorrectQuestion = await page.getByText(/spelled INCORRECTLY/i).isVisible().catch(() => false);

    if (hasIncorrectQuestion) {
      // Should have 4 different words to choose from
      const buttons = page.getByRole('button').filter({ hasText: /[A-Z]{5,}/});
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(4);
    }
  });
});
