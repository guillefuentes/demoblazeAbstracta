# Testing Guide

## Purpose
This project contains Playwright end-to-end tests for the Demoblaze store using a Page Object + custom helpers approach.

Current test coverage:
- `@BLZ_001` Product list extraction and JSON output generation
- `@BLZ_002` Complete purchase flow (add to cart, cart validation, place order)
- `@BLZ_003` Cart validations with new user registration
- `@BLZ_004` Main page navigation and pagination (⚠️ **Currently failing - see Known Issues**)

## Current Environment Setup

Environment setup and first-run installation are documented in [README.md](README.md).

## Running Tests

Use this section for test execution.

### Run all tests
```bash
npx playwright test
```

### Run a specific project/browser
```bash
npx playwright test --project=chromium
```

### Run by tag
```bash
npx playwright test -g @BLZ_001 --project=chromium
npx playwright test -g @BLZ_002 --project=chromium
```

### Open last HTML report
```bash
npx playwright show-report
```

## Known Issues & Failing Tests

### BLZ_004: Pagination Navigation Bug

**Status:** ❌ Test failing due to application bug  
**Test:** `tests/MainPageNavigationAndPagination.spec.ts`  
**Location:** Pagination validation - "Navigate back to previous page"

**Bug Description:**
When navigating pagination (Next → Previous), the application doesn't correctly restore the previous page's product list.

**Expected Behavior:**
1. User is on page 1 viewing products (e.g., "Nokia lumia 1520", "Nexus 6", etc.)
2. User clicks "Next" → Shows page 2 products
3. User clicks "Previous" → Should show original page 1 products

**Actual Behavior:**
Step 3 shows **different products** than the original page 1 (e.g., "Apple monitor 24" instead of "Nokia lumia 1520")

**Test Evidence:**
```typescript
// Line 143 in MainPageNavigationAndPagination.spec.ts
Expected: "Nokia lumia 1520"
Received: "Apple monitor 24"
```

**Why This Test Remains:**
- ✅ Demonstrates the test framework successfully catches real bugs
- ✅ Documents known application issues for stakeholders
- ✅ Will automatically pass once the bug is fixed
- ✅ Prevents regression if the bug gets fixed then reintroduced

## Test Artifacts on Failure

Configured in `playwright.config.ts` under `use`:
- `screenshot: 'only-on-failure'`
- `video: 'retain-on-failure'`
- `trace: 'on-first-retry'`

What this means:
- Failed tests keep screenshots
- Failed tests keep first-attempt videos
- Trace is collected on retry, not on first attempt

Artifacts and reports are generated under:
- `test-results/`
- `playwright-report/`

## Project Testing Structure

- `tests/` test specs
- `fixtures/pageManager.ts` fixture wiring and dependency injection
- `page-objects/` page and modal abstractions
- `helpers/actions/` interaction wrappers (mouse, keyboard, browser)
- `helpers/assert/Assertions.ts` reusable assertions
- `helpers/productHelpers.ts` product list extraction helpers
- `output/` generated JSON files (e.g., product details)

## Test Design Notes

- Fixtures from `fixtures/pageManager.ts` inject shared dependencies (for example `actions`, `assert`, and page objects) to keep tests consistent.
- Interfaces (for example `interface/ProductInformation.ts`) are used to keep extracted or shared test data strongly typed.
- Assertions are centralized in `helpers/assert/Assertions.ts` to keep checks reusable.
- Interaction logic is delegated to actions/page objects to keep specs readable.
- Tests are tagged (for example `@BLZ_001`, `@BLZ_002`) for targeted execution and feature identification.
- Stable page-object selectors are preferred over ad-hoc selectors in specs.
- `test.step(...)` is used to improve report readability and execution traceability.
- Step structure follows: *parent action step* → *nested assertion step(s)*.

## CI/CD Integration

### GitHub Actions Workflow

The project includes automated testing via GitHub Actions (`.github/workflows/playwright.yml`):

**Triggers:**
- Push to `main` or `master` branches
- Pull requests targeting `main` or `master`

**What It Does:**
1. Sets up Node.js LTS environment
2. Installs dependencies and Playwright browsers
3. Runs all Playwright tests
4. Generates a **comprehensive test summary** including:
   - ✅ Pass/fail metrics
   - 📋 Test coverage breakdown by tag
   - ⚠️ Known issues documentation
   - 📦 Links to HTML reports and artifacts

**Reporters Used in CI:**
- `html` - Interactive HTML report
- `json` - Machine-readable results for parsing
- `github` - Integrates with GitHub Actions annotations

**Artifacts Uploaded:**
- `playwright-report/` - Full HTML report (30 days retention)
- `test-results/` - Screenshots, videos, traces (30 days retention)

**Handling Known Failures:**

The workflow is configured to **not fail the build** when BLZ_004 fails, since this is a documented application bug. The summary clearly indicates this is expected behavior.

To change this (fail CI on any test failure), uncomment the `exit 1` line in the final step of the workflow.

**Viewing Results:**

Navigate to the "Actions" tab in GitHub → Select a workflow run → View the summary with test metrics and download artifacts.

## Scope Note

Some helper and assertion methods are intentionally broader than the current test cases.
This is deliberate to show how the framework can be extended for additional scenarios without changing the overall structure.
The implemented tests remain the source of truth for active coverage in this mock project.