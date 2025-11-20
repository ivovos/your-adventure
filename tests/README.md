# Automated Testing Guide

## Overview

This project includes comprehensive Playwright tests that automatically walk through the adventure and verify everything works correctly. You'll never need to manually test every path again!

## Test Files

### 1. `adventure-paths.spec.ts`
Tests complete story paths from start to finish:
- **Path 1**: Examine Message → Reference Section → Hide Successfully (with CONCEALS, NECESSARY, PERMANENT challenges + dice roll)
- **Path 2**: Library Search → Study Rooms → Take Photo (with SEPARATE, OBTAIN challenges)
- **Incorrect Answers**: Tests retry functionality when students get answers wrong
- **Hints**: Verifies hint system works correctly
- **Inventory**: Checks that items are collected and displayed
- **"Find Incorrect" Questions**: Tests the spelling challenges where students identify misspelled words

### 2. `ui-components.spec.ts`
Tests individual UI components:
- Home page display
- Continue button functionality
- Story page header navigation
- Educational challenge badges (🧠 📝)
- Dice roller animation
- Choice button styling
- Explanation display after answers

### 3. `progress-saving.spec.ts`
Tests progress saving features:
- Automatic progress saving
- Continue from home page
- Progress reset on new game
- Inventory persistence across reloads

## Running Tests

### Run all tests (headless)
```bash
npm test
```

### Watch tests with UI (recommended for development)
```bash
npm run test:ui
```
This opens an interactive browser where you can:
- See tests running in real-time
- Step through each action
- Inspect elements
- Debug failures

### Run tests with visible browser
```bash
npm run test:headed
```
Watch the browser automatically navigate through your app!

### View test report
```bash
npm run test:report
```
Opens an HTML report showing:
- Which tests passed/failed
- Screenshots of failures
- Detailed logs
- Timeline of actions

## What Gets Tested

### ✅ Story Progression
- All story nodes are reachable
- Choices navigate to correct nodes
- Text content displays properly

### ✅ Educational Challenges
- Questions appear correctly
- Correct answers are accepted
- Wrong answers show error message
- Retry functionality works
- Hints display when clicked
- Explanations show after answers
- Both question formats work (correct/incorrect)

### ✅ Dice Rolling
- Dice button appears
- Rolling animation works
- Results display correctly
- Navigation happens after roll

### ✅ Progress Saving
- Progress saves automatically
- Can continue from home page
- Inventory persists
- Progress resets on new game

### ✅ UI/UX
- All buttons are clickable
- Navigation works
- Styling applies correctly
- Responsive layout
- Emojis display

## Test Coverage

Current test coverage includes:
- **15+ test scenarios**
- **Multiple story paths**
- **All educational challenge types**
- **Progress saving/loading**
- **Error handling**
- **UI component rendering**

## Adding New Tests

When you add new story content, add tests to `adventure-paths.spec.ts`:

```typescript
test('should complete NEW PATH NAME', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Start New Adventure/i }).click();

  // Navigate through your new path
  await page.getByRole('button', { name: /Your Choice/i }).click();

  // Test new challenges
  await expect(page.getByText(/Your Question/i)).toBeVisible();
  // ... add assertions
});
```

## Debugging Failed Tests

### 1. Check Screenshots
Failed tests automatically capture screenshots:
```
test-results/
  ├── adventure-paths-spec-ts-should-complete-Path-1/
  │   └── test-failed-1.png
```

### 2. Run with UI
```bash
npm run test:ui
```
Step through the test to see exactly where it fails.

### 3. Check Traces
Open the HTML report to see:
- Network requests
- Console logs
- Element screenshots
- Action timeline

### 4. Run Single Test
```bash
npx playwright test -g "should complete Path 1"
```

## CI/CD Integration

These tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run Playwright tests
  run: npm test

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Browser Automation

The tests use Playwright which:
- ✅ Runs headless by default (fast)
- ✅ Can run with visible browser (debugging)
- ✅ Takes screenshots on failure
- ✅ Records video (if configured)
- ✅ Works in CI/CD
- ✅ Cross-browser compatible

## Best Practices

1. **Run tests before committing**
   ```bash
   npm test
   ```

2. **Watch tests during development**
   ```bash
   npm run test:ui
   ```

3. **Update tests when changing story**
   - Add tests for new paths
   - Update assertions for changed text

4. **Keep tests fast**
   - Use `waitForTimeout` sparingly
   - Prefer `waitForSelector` or `expect().toBeVisible()`

5. **Make tests reliable**
   - Don't test dice roll results (they're random)
   - Test that navigation happens, not specific outcomes

## Troubleshooting

### Tests failing locally?
1. Make sure dev server isn't already running
2. Clear localStorage: `localStorage.clear()` in browser console
3. Delete `test-results/` and `playwright-report/` folders

### Timeouts?
Increase timeout in `playwright.config.ts`:
```typescript
use: {
  timeout: 60000, // 60 seconds
}
```

### Can't find elements?
Use Playwright Inspector:
```bash
npx playwright test --debug
```

## Questions?

- Playwright Docs: https://playwright.dev
- Test location: `/tests/*.spec.ts`
- Configuration: `playwright.config.ts`
