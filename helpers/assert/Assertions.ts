import { Locator, Page, expect, Response } from '@playwright/test';

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

    async elementCountIs(locator: Locator, expectedCount: number): Promise<void> {
        await expect(locator).toHaveCount(expectedCount);
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
    async responseStatusIs(response: Response, expectedStatus: number): Promise<void> {
        expect(response.status()).toBe(expectedStatus);
    }

    async responseStatusIsOK(response: Response): Promise<void> {
        expect(response.status()).toBe(200);
    }

    async responseHasErrors(response: Response): Promise<void> {
        const isErrorStatus = response.status() >= 400 && response.status() < 600;
        expect(isErrorStatus).toBeTruthy();
    }

    //JavaScript Dialog Assertions
    //NOTE: these sho

    async alertMessageIs(expectedMessage: string, delaySeconds: number = 1): Promise<void> {
        const dialog = await this.page.waitForEvent('dialog', { timeout: 5000 });
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe(expectedMessage);

        await this.page.waitForTimeout(delaySeconds * 1000);
        await dialog.accept();
    }

    async confirmMessageIs(expectedMessage: string, accept: boolean = true, delaySeconds: number = 1): Promise<void> {
        const dialog = await this.page.waitForEvent('dialog', { timeout: 5000 });
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe(expectedMessage);

        await this.page.waitForTimeout(delaySeconds * 1000);
        if (accept) await dialog.accept();
        else await dialog.dismiss();
    }

    async promptMessageIs(expectedMessage: string, inputText: string | null = null, delaySeconds: number = 1): Promise<void> {
        const dialog = await this.page.waitForEvent('dialog', { timeout: 5000 });
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe(expectedMessage);

        await this.page.waitForTimeout(delaySeconds * 1000);
        if (inputText !== null) await dialog.accept(inputText);
        else await dialog.dismiss();
    }

    //Numeric Assertions
    async valueIsEqualOrGreaterThan(actual: number, threshold: number): Promise<void> {
        expect(actual).toBeGreaterThanOrEqual(threshold);
    };

    async valueIsEqualOrLessThan(actual: number, threshold: number): Promise<void> {
        expect(actual).toBeLessThanOrEqual(threshold);
    };

    async valueIsBetween(actual: number, min: number, max: number): Promise<void> {
        const isInsideRange = actual >= min && actual <= max;

        expect(isInsideRange).toBeTruthy();
    };

    async valueIsNotBetween(actual: number, min: number, max: number): Promise<void> {
        const isOutsideRange = actual < min || actual > max;

        expect(isOutsideRange).toBeTruthy();
    }

    async valueIs(actual: number, expected: number): Promise<void> {
        expect(actual).toBe(expected);
    };

    async valueIsNot(actual: number, expected: number): Promise<void> {
        expect(actual).not.toBe(expected);
    };

    //Text Assertions
    async textIs(actual: string, expected: string): Promise<void> {
        expect(actual).toBe(expected);
    };

    async textIsNot(actual: string, expected: string): Promise<void> {
        expect(actual).not.toBe(expected);
    };

    async textContains(actual: string, expectedSubstring: string): Promise<void> {
        expect(actual).toContain(expectedSubstring);
    };

    async textNotContains(actual: string, expectedSubstring: string): Promise<void> {
        expect(actual).not.toContain(expectedSubstring);
    };
}
