import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages';

export default class LogInModal extends BasePage {
    modalIdentifier: Locator;

    usernameField : Locator;
    passwordField : Locator;
    loginButton : Locator;
    closeButton : Locator;

    private logInLocators = {
        modalIdentifier: this.page.locator('.modal-content').filter({ hasText: 'Log in' }),
        usernameField: this.page.locator('#loginusername'),
        passwordField: this.page.locator('#loginpassword'),
        loginButton: this.page.locator('button').filter({ hasText: 'Log in' }),
        closeButton: this.page.locator('button').filter({ hasText: 'Close' }),
    };

    constructor(page: Page) {
        super(page);

        this.modalIdentifier = this.logInLocators.modalIdentifier;
        this.usernameField = this.logInLocators.usernameField;
        this.passwordField = this.logInLocators.passwordField;
        this.loginButton = this.logInLocators.loginButton;
        this.closeButton = this.logInLocators.closeButton;
    };

    async logIn(username: string, password: string): Promise<void> {
        await this.actions.keyboard.fillField(this.usernameField, username);
        await this.actions.keyboard.fillField(this.passwordField, password);
        await this.actions.mouse.click(this.loginButton);
    };

    async closeModal(): Promise<void> {
        await this.actions.mouse.click(this.closeButton);
    }
};