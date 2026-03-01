
# demoblazeAbstracta

Demo Repository for Demoblaze website used for Abstracta's technical interview (02/2026)

## Getting Started

**📖 For complete documentation on test architecture, conventions, and patterns, see [TESTING_GUIDE.md](TESTING_GUIDE.md)**

Follow these steps to set up and run tests quickly:

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 2. Install Dependencies

Clone the repository and install all required packages:

```bash
git clone https://github.com/guillefuentes/demoblazeAbstracta.git
cd demoblazeAbstracta
npm install
```

### 3. Install Playwright Browsers

Playwright requires browser binaries. Install them with:

```bash
npx playwright install
```

For more details, see the Playwright documentation: https://playwright.dev/

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run by tag (Chromium):

```bash
npx playwright test -g @BLZ_001 --project=chromium
npx playwright test -g @BLZ_002 --project=chromium
```

Open the last HTML report:

```bash
npx playwright show-report
```

## Notes

- `.env` is not required in the current setup.
- All tests target `https://www.demoblaze.com/`.
- **Known Failing Test:** `@BLZ_004` currently fails due to a pagination bug in the application (see [TESTING_GUIDE.md](TESTING_GUIDE.md#known-issues--failing-tests) for details). This demonstrates the framework's ability to detect real bugs.
