import { Page, Locator } from '@playwright/test';

export default abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Common navigation methods for all pages
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    };

    async refreshPage(): Promise<void> {
        await this.page.reload();
    };

    async navigateBack(): Promise<void> {
        await this.page.goBack();
    };

    //Common retrieval methods for all pages
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getPageURL(): Promise<string> {
        return this.page.url();
    }

    async getTextFromElement(locator: Locator): Promise<string | null> {
        const text : string = await locator.innerText();

        return text;
    };

    async getElementCount(locator: Locator): Promise<number> {
        return await locator.count();
    };

    async getElementAttribute(locator: Locator, attributeName: string): Promise<string | null> {
        return await locator.getAttribute(attributeName);
    };

    async getLocatorFromSelector(selector: string): Promise<Locator> {
        return this.page.locator(selector);
    }
}