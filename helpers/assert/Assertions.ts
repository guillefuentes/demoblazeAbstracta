import { APIResponse, Locator, Page, expect } from '@playwright/test';

export default class Assert {
    constructor(protected page: Page) { }

    //Element Assertions
    async elementIsVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    };

    async elementIsNotVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeHidden();
    };

    async elementIsClickable(locator: Locator): Promise<void> {
        await expect(locator).toBeEnabled();
    }

    async elementIsNotClickable(locator: Locator): Promise<void> {
        await expect(locator).toBeDisabled();
    };

    //Element Content Assertions
    async elementHasText(locator: Locator): Promise<void> {
        await expect(locator).not.toHaveText('');
    };

    async elementTextContains(locator: Locator, expectedSubstring: string): Promise<void> {
        await expect(locator).toHaveText(new RegExp(expectedSubstring));
    };

    async elementTextNotContains(locator: Locator, expectedSubstring: string): Promise<void> {
        await expect(locator).not.toHaveText(new RegExp(expectedSubstring));
    };

    async elementTextIs(locator: Locator, expectedSubstring: string): Promise<void> {
        await expect(locator).toHaveText(expectedSubstring);
    };

    async elementTextIsNot(locator: Locator, expectedSubstring: string): Promise<void> {
        await expect(locator).not.toHaveText(expectedSubstring);
    };

    //URL Assertions
    async pageURLIs(expectedURL: string): Promise<void> {
        await expect(this.page).toHaveURL(expectedURL);
    };

    async pageURLContains(expectedSubstring: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(expectedSubstring));
    };

    async pageURLNotContains(expectedSubstring: string): Promise<void> {
        await expect(this.page).not.toHaveURL(new RegExp(expectedSubstring));
    };

    //Title Assertions
    async pageTitleIs(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    };

    async pageTitleContains(expectedSubstring: string): Promise<void> {
        await expect(this.page).toHaveTitle(new RegExp(expectedSubstring));
    };

    async pageTitleNotContains(expectedSubstring: string): Promise<void> {
        await expect(this.page).not.toHaveTitle(new RegExp(expectedSubstring));
    };

    //API Response Assertions
    async responseIsOK(response: APIResponse): Promise<void> {
        await expect(response).toBeOK();
    }

    async responseStatusIs(response: APIResponse, expectedStatus: number): Promise<void> {
        expect(response.status()).toBe(expectedStatus);
    }

    async responseHasErrors(response: APIResponse): Promise<void> {
        const isErrorStatus = response.status() >= 400 && response.status() < 600;
        expect(isErrorStatus).toBeTruthy();
    }
}
