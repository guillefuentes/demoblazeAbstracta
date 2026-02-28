import { Locator, Page } from '@playwright/test';

enum Keys {
    Enter = 'Enter',
    Tab = 'Tab',
    Escape = 'Escape',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    ControlC = 'Control+C',
    ControlV = 'Control+V',
    Shift = 'Shift',
    Alt = 'Alt',
    Space = ' ',
    PageUp = 'PageUp',
    PageDown = 'PageDown',
};

export default class KeyboardActions {
    constructor(protected page: Page) { }

    async clearField(locator: Locator): Promise<void> {
        await locator.clear();
    };

    async fillField(locator: Locator, text: string): Promise<void> {
        await locator.clear();
        await locator.fill(text);
    };

    async pressKeysSequentially(key: Keys | Keys[]): Promise<void> {
        if (Array.isArray(key))
            for (const k of key)
                await this.page.keyboard.press(k);

        else await this.page.keyboard.press(key);
    }

    async pressEscape(): Promise<void> {
        await this.page.keyboard.press(Keys.Escape);
    };
}

