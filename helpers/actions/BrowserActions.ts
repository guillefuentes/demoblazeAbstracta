import { Locator, Page } from '@playwright/test';

export class BrowserActions {
    constructor(protected page: Page) { }

    async waitUntilElementVisible(): Promise<void> {
        await this.page.waitForSelector('locator', { state: 'visible' });
    };

    async waitUntilElementHidden(): Promise<void> {
        await this.page.waitForSelector('locator', { state: 'hidden' });
    };

    async waitUntilElementAttached(): Promise<void> {
        await this.page.waitForSelector('locator', { state: 'attached' });
    };

    async waitUntilTimeout(seconds: number = 0): Promise<void> {
        await this.page.waitForTimeout(seconds * 1000);
    };

}