import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HeaderPage extends BasePage {
    headerContainer: Locator;
    headerLogo: Locator;
    homeLink: Locator;
    contactLink: Locator;
    aboutUsLink: Locator;
    cartLink: Locator;
    logInLink: Locator;
    signUpLink: Locator;

    readonly headerLocators = {
        headerContainer: this.page.locator('container'),
        headerLogo: this.page.locator('.navbar-brand'),
        homeLink: this.page.locator('.nav-link').filter({ hasText: 'Home' }),
        contactLink: this.page.locator('.nav-link').filter({ hasText: 'Contact' }),
        aboutUsLink: this.page.locator('.nav-link').filter({ hasText: 'About us' }),
        cartLink: this.page.locator('.nav-link').filter({ hasText: 'Cart' }),
        logInLink: this.page.locator('.nav-link').filter({ hasText: 'Log in' }),
        signUpLink: this.page.locator('.nav-link').filter({ hasText: 'Sign up' }),
    };

    constructor(page: Page) {
        super(page);

        this.headerContainer = this.headerLocators.headerContainer;
        this.headerLogo = this.headerLocators.headerLogo;
        this.homeLink = this.headerLocators.homeLink;
        this.contactLink = this.headerLocators.contactLink;
        this.aboutUsLink = this.headerLocators.aboutUsLink;
        this.cartLink = this.headerLocators.cartLink;
        this.logInLink = this.headerLocators.logInLink;
        this.signUpLink = this.headerLocators.signUpLink;
    }

    async clickHomeLink() {
        await this.homeLink.click();
    };

    async clickContactLink() {
        await this.contactLink.click();
    };

    async clickAboutUsLink() {
        await this.aboutUsLink.click();
    };

    async clickCartLink() {
        await this.cartLink.click();
    };

    async clickLogInLink() {
        await this.logInLink.click();
    };

    async clickSignUpLink() {
        await this.signUpLink.click();
    };
}