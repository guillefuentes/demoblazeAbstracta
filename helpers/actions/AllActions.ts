import { Page } from '@playwright/test';
import MouseActions from '@actions/MouseActions';
import KeyboardActions from '@actions/KeyboardActions';
import { BrowserActions } from '@actions/BrowserActions';

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