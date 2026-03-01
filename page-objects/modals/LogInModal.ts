import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages';

export default class LogInModal extends BasePage {
    modalIdentifier: Locator;

    usernameField : Locator;
    passwordField : Locator;
    loginButton : Locator;
    closeButton : Locator;

    readonly logInLocators = {
        modalIdentifier: this.page.locator('.modal-content').filter({ hasText: 'Log in' }),
        usernameField: this.page.locator('#loginusername'),
        passwordField: this.page.locator('#loginpassword'),
        loginButton: this.page.locator('button').filter({ hasText: 'Log in' }),
        closeButton: this.page.locator('button').filter({ hasText: 'Close' }),
    };

    constructor(page: Page) {
        super(page);

        this.modalIdentifier = this.logInLocators.modalIdentifier;
    };

    async logIn(username: string, password: string): Promise<void> {
        await this.actions.keyboard.fillField(this.logInLocators.usernameField, username);
        await this.actions.keyboard.fillField(this.logInLocators.passwordField, password);
    };
};