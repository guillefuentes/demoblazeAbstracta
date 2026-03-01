import { Page } from '@playwright/test';

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

    async waitUntilLoadedState(): Promise<void> {
        await this.page.waitForLoadState('load');
    };

    async waitUntilNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    };

    async waitUntilCompleteLoad(): Promise<void> {
        await this.page.waitForFunction(() => {
            return document.readyState === 'complete';
        });
    };
}