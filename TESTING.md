# Automated Testing Quick Start

## ✅ Tests are Ready!

Your adventure app now has comprehensive automated tests that walk through every path and verify everything works. No more manual testing!

## Quick Commands

### Run All Tests (Headless)
```bash
npm test
```
Fast, automated testing. Perfect for CI/CD or quick checks.

### Interactive Test UI (Recommended!)
```bash
npm run test:ui
```
**This is the best way to see tests in action:**
- Visual browser showing each step
- Pause/resume tests
- See what the bot is clicking
- Debug failures easily
- Time travel through test steps

### Watch Browser Automation
```bash
npm run test:headed
```
Opens real Chrome browser and you can watch it automatically:
- Click buttons
- Fill in answers
- Navigate the story
- Roll dice
- Complete challenges

### View Test Report
```bash
npm run test:report
```
After tests run, see:
- Which tests passed ✅
- Which tests failed ❌
- Screenshots of failures
- Detailed logs

## What Gets Tested

### Story Paths
- ✅ Path 1: Examine Message → Reference → Dice Roll → Success/Fail
- ✅ Path 2: Library Search → Study Rooms → Photo Challenge
- ✅ All educational challenges (CONCEALS, NECESSARY, PERMANENT, etc.)
- ✅ Correct and incorrect answer flows
- ✅ Hint system
- ✅ Dice rolling mechanics

### UI Components
- ✅ Home page rendering
- ✅ Continue button (when progress exists)
- ✅ Story navigation
- ✅ Challenge badges (🧠 📝)
- ✅ Dice animation
- ✅ Choice buttons
- ✅ Explanations

### Progress Saving
- ✅ Auto-save on progress
- ✅ Continue from home
- ✅ Reset on new game
- ✅ Inventory persistence

## Example: Watch a Full Story Playthrough

```bash
npm run test:headed
```

Then sit back and watch as the automated browser:
1. Clicks "Start New Adventure"
2. Chooses "Examine the coded message"
3. Answers "What does CONCEALS mean?" → Clicks "Hides"
4. Submits answer
5. Answers spelling challenge → Clicks "NECESSARY"
6. Solves "PERMANENT" word puzzle
7. Rolls the dice
8. Continues based on dice result
9. And more!

## Debugging Failed Tests

### Option 1: Interactive UI (Easiest)
```bash
npm run test:ui
```
Click on failed test → Click "Show trace" → See exactly what happened

### Option 2: Screenshots
Check `test-results/` folder for screenshots of failures

### Option 3: Run Single Test
```bash
npx playwright test --grep "home page should display"
```

## Adding Tests for New Content

When you add new story nodes or challenges:

1. Open `tests/adventure-paths.spec.ts`
2. Add a new test:

```typescript
test('should complete my new path', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Start/i }).click();

  // Your story path
  await page.getByRole('button', { name: /My New Choice/i }).click();

  // Verify challenge appears
  await expect(page.getByText(/My Question/i)).toBeVisible();
});
```

3. Run the test:
```bash
npm run test:ui
```

## Test Structure

```
tests/
├── adventure-paths.spec.ts      # Full story walkthroughs
├── ui-components.spec.ts        # Component-level tests
├── progress-saving.spec.ts      # Save/load functionality
└── README.md                    # Detailed documentation
```

## Benefits

### For You
- 🎯 Never manually test every path again
- 🐛 Catch bugs before your child sees them
- ⚡ Make changes confidently
- 📊 Get instant feedback on what broke

### For Development
- ✅ Verify all paths work
- ✅ Test all spelling challenges
- ✅ Ensure dice rolls function
- ✅ Validate progress saving
- ✅ Check UI rendering

## Pro Tips

### 1. Run Tests Before Adding Content
```bash
npm test
```
Make sure current version works before changes.

### 2. Watch Tests During Development
```bash
npm run test:ui
```
Keep this open while coding - instant feedback!

### 3. Use Headed Mode for Demos
```bash
npm run test:headed
```
Show others how the app works automatically.

### 4. Check Reports After Failures
```bash
npm run test:report
```
Beautiful HTML report with screenshots and logs.

## Common Issues

### "Address already in use"
If dev server is already running:
1. Stop it (Ctrl+C)
2. Tests will start their own server

### Tests are slow
Normal! Each full path test takes 10-30 seconds because it simulates real user interaction.

### Random failures
Dice rolls are random - tests check navigation happens, not specific results.

## Next Steps

1. **Run your first test:**
   ```bash
   npm run test:ui
   ```

2. **Watch the magic** - See browser automation in action

3. **Make a change** - Edit story, rerun tests

4. **Add more tests** - Cover your new content

## Resources

- Full test documentation: `/tests/README.md`
- Playwright docs: https://playwright.dev
- Test config: `playwright.config.ts`

---

**Now you can iterate fast and break nothing!** 🚀
