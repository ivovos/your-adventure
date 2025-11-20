import { test, expect } from '@playwright/test';

test('should generate and play a story', async ({ page }) => {
    // 1. Navigate to Create Page
    await page.goto('/create');

    // 2. Step 1: Choose Character
    await page.click('text=Rusty the Robot');
    // Wait for selection to be applied (check for selected style or check if button is enabled)
    await expect(page.locator('button:has-text("Next Step")')).toBeEnabled();
    await page.click('button:has-text("Next Step")');

    // 3. Step 2: Choose Quest
    await page.click('text=Find the Lost Treasure');
    await expect(page.locator('button:has-text("Next Step")')).toBeEnabled();
    await page.click('button:has-text("Next Step")');

    // 4. Step 3: Choose World
    await page.click('text=Cyber City');

    // 5. Generate Story
    const generateBtn = page.locator('button:has-text("Generate Story")');
    await expect(generateBtn).toBeEnabled();
    await generateBtn.click();

    // 6. Wait for redirection to Story Page
    // Increase timeout for generation
    await expect(page).toHaveURL('/story', { timeout: 10000 });

    // 7. Verify Story Content
    // The mock generator uses "The Adventure of [Character]" as title
    await expect(page.locator('h2')).toContainText('The Adventure of Rusty the Robot');

    // Verify content mentions the character
    await expect(page.locator('.story-content').first()).toContainText('Rusty the Robot');
});
