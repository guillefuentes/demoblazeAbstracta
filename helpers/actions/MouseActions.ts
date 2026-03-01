import { Locator, Page } from '@playwright/test';

export default class MouseActions {
    constructor(protected page: Page) { }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    };

    async doubleClick(locator: Locator): Promise<void> {
        await locator.dblclick();
    };

    async rightClick(locator: Locator): Promise<void> {
        await locator.click({ button: 'right' });
    };

    async middleClick(locator: Locator): Promise<void> {
        await locator.click({ button: 'middle' });
    };

    async hover(locator: Locator): Promise<void> {
        await locator.hover();
    };

    async scrollUntilInView(locator: Locator): Promise<void> {
        let scrolls = 0;
        while (!(await locator.isVisible()) && scrolls < 10) {
            await this.page.mouse.wheel(0, 50);
            scrolls++;
        };
    };

    async scrollBy(offsetX: number = 0, offsetY: number = 50): Promise<void> {
        await this.page.mouse.wheel(offsetX, offsetY);
    };
}
