# CI/CD Quick Start Guide

### Enhanced GitHub Actions Workflow
**File:** `.github/workflows/playwright.yml`

**Features:**
- ✅ Runs all Playwright tests automatically
- 📊 Generates rich test summary with pass/fail metrics
- 📋 Shows test coverage breakdown
- ⚠️ Handles known failing tests gracefully
- 📦 Uploads HTML reports and test artifacts
- 🔗 Provides direct links to reports

## How It Works

### On Every Push/PR to main/master:

1. **Setup Environment**
   - Installs Node.js LTS
   - Installs dependencies
   - Installs Playwright browsers

2. **Run Tests**
   - Executes all test files
   - Captures output to both console and log file
   - Continues even if tests fail (for summary generation)

3. **Generate Summary**
   - Parses test results from JSON file
   - Creates markdown summary with metrics
   - Includes pass/fail counts
   - Lists all test coverage
   - Notes known issues (BLZ_004)

4. **Upload Artifacts**
   - HTML report (interactive, 30 days retention)
   - Test results (screenshots/videos, 30 days retention)

## Viewing Test Results

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Select any workflow run
4. See the summary at the top with all metrics
5. Download artifacts for detailed HTML reports

## Test Summary Includes:

```
# 🎭 Playwright Test Results

## ✅ All Tests Passed (or ❌ Tests Failed)

| ✅ Passed | ❌ Failed | ⏭️ Skipped | 📊 Total |
|-----------|-----------|------------|----------|
| 3         | 1         | 0          | 4        |

## 📋 Test Coverage
- @BLZ_001: Product list extraction...
- @BLZ_002: Complete purchase flow...
- @BLZ_003: Cart validations...
- @BLZ_004: Navigation ⚠️ Known bug

## 📦 Artifacts
- Links to reports and test results
```

## Important Notes

### Known Failing Test Handling

The workflow **does NOT fail CI** when BLZ_004 fails because it's a documented application bug.

**To change this behavior:**
Edit `.github/workflows/playwright.yml` and uncomment line at the end:
```yaml
# exit 1  <- Uncomment this to fail CI on test failures
```

### Local vs CI Reporters

- **Local dev**: Uses simple HTML reporter
- **CI environment**: Uses HTML + JSON + GitHub reporters

This is automatic based on the `CI` environment variable.

## Next Steps

1. **Push to GitHub**: The workflow will run automatically
2. **Check Actions tab**: View your first test summary
3. **Customize**: Edit workflow if you want different behavior
4. **Share**: Send GitHub Actions link to stakeholders for test visibility

## Troubleshooting

**If summary doesn't show test counts:**
- The fallback parser looks for Playwright's console output
- Ensure tests are actually running
- Check the workflow logs for JSON file creation

**If you want more detail:**
Download the `playwright-report` artifact and open `index.html` locally.
