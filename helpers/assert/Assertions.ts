import { Locator, Page } from '@playwright/test';

export default class Assert {
    constructor(protected page: Page) { }

    //Element Assertions
    async elementIsVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    };

    async elementIsNotVisible(locator: Locator): Promise<boolean> {
        return !(await locator.isVisible());
    };

    async elementIsClickable(locator: Locator): Promise<boolean> {
        return await locator.isEnabled();
    }

    async elementIsNotClickable(locator: Locator): Promise<boolean> {
        return !(await locator.isEnabled());
    };

    //Element Content Assertions
    async elementHasText(locator: Locator): Promise<boolean> {
        return (await locator.textContent() !== null);
    };

    async elementTextContains(locator: Locator, expectedSubstring: string): Promise<boolean> {
        return (await locator.textContent())?.includes(expectedSubstring) || false;
    };

    async elementTextNotContains(locator: Locator, expectedSubstring: string): Promise<boolean> {
        return !((await locator.textContent())?.includes(expectedSubstring) || false);
    };

    async elementTextIs(locator: Locator, expectedSubstring: string): Promise<boolean> {
        return (await locator.textContent())?.trim() === expectedSubstring.trim();
    };

    async elementTextIsNot(locator: Locator, expectedSubstring: string): Promise<boolean> {
        return (await locator.textContent())?.trim() !== expectedSubstring.trim();
    };

    //URL Assertions
    async pageURLIs(expectedURL: string): Promise<boolean> {
        return this.page.url() === expectedURL;
    };

    async pageURLContains(expectedSubstring: string): Promise<boolean> {
        return this.page.url().includes(expectedSubstring);
    };

    async pageURLNotContains(expectedSubstring: string): Promise<boolean> {
        return !this.page.url().includes(expectedSubstring);
    };

    //Title Assertions
    async pageTitleIs(expectedTitle: string): Promise<boolean> {
        return (await this.page.title()).trim() === expectedTitle.trim();
    };

    async pageTitleContains(expectedSubstring: string): Promise<boolean> {
        return (await this.page.title()).includes(expectedSubstring);
    };

    async pageTitleNotContains(expectedSubstring: string): Promise<boolean> {
        return !(await this.page.title()).includes(expectedSubstring);
    };
}
