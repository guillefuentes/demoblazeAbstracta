import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages';

export default class SignUpModal extends BasePage {
    modalIdentifier: Locator;

    usernameField : Locator;
    passwordField : Locator;
    signUpButton : Locator;
    closeButton : Locator;

    private signUpLocators = {
        modalIdentifier: this.page.locator('.modal-content').filter({ hasText: 'Sign up' }),
        usernameField: this.page.locator('#sign-username'),
        passwordField: this.page.locator('#sign-password'),
        signUpButton: this.page.locator('button').filter({ hasText: 'Sign up' }),
        closeButton: this.page.locator('.modal-content').filter({ hasText: 'Sign up' }).locator('button').filter({ hasText: 'Close' }),
    };

    constructor(page: Page) {
        super(page);

        this.modalIdentifier = this.signUpLocators.modalIdentifier;
        this.usernameField = this.signUpLocators.usernameField;
        this.passwordField = this.signUpLocators.passwordField;
        this.signUpButton = this.signUpLocators.signUpButton;
        this.closeButton = this.signUpLocators.closeButton;
    };

    async signUp(username: string, password: string): Promise<void> {
        await this.actions.keyboard.fillField(this.usernameField, username);
        await this.actions.keyboard.fillField(this.passwordField, password);
        await this.actions.mouse.click(this.signUpButton);
    };

    async closeModal(): Promise<void> {
        await this.actions.mouse.click(this.closeButton);
    }
};