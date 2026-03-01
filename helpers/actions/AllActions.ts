import { Page } from '@playwright/test';
import MouseActions from './MouseActions';
import KeyboardActions from './KeyboardActions';
import { BrowserActions } from './BrowserActions';

class AllActions {
    mouse: MouseActions;
    keyboard: KeyboardActions;
    browser: BrowserActions;

    constructor(protected page: Page) {
        this.mouse = new MouseActions(page);
        this.keyboard = new KeyboardActions(page);
        this.browser = new BrowserActions(page);
    };
}

export default AllActions;