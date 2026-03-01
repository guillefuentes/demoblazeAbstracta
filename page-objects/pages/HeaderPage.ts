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
    usernameDisplay: Locator;
    logOutLink: Locator;

    private headerLocators = {
        headerContainer: this.page.locator('container'),
        headerLogo: this.page.locator('.navbar-brand'),
        homeLink: this.page.locator('.nav-link').filter({ hasText: 'Home' }),
        contactLink: this.page.locator('.nav-link').filter({ hasText: 'Contact' }),
        aboutUsLink: this.page.locator('.nav-link').filter({ hasText: 'About us' }),
        cartLink: this.page.locator('.nav-link').filter({ hasText: 'Cart' }),
        logInLink: this.page.locator('.nav-link').filter({ hasText: 'Log in' }),
        signUpLink: this.page.locator('.nav-link').filter({ hasText: 'Sign up' }),
        usernameDisplay: this.page.locator('#nameofuser'),
        logOutLink: this.page.locator('.nav-link').filter({ hasText: 'Log out' }),
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
        this.usernameDisplay = this.headerLocators.usernameDisplay;
        this.logOutLink = this.headerLocators.logOutLink;
    }

    async clickHomeLink() {
        await this.actions.mouse.click(this.homeLink);
    };

    async clickContactLink() {
        await this.actions.mouse.click(this.contactLink);
    };

    async clickAboutUsLink() {
        await this.actions.mouse.click(this.aboutUsLink);
    };

    async clickCartLink() {
        await this.actions.mouse.click(this.cartLink);
    };

    async clickLogInLink() {
        await this.actions.mouse.click(this.logInLink);
    };

    async clickSignUpLink() {
        await this.actions.mouse.click(this.signUpLink);
    };

    async clickLogOutLink() {
        await this.actions.mouse.click(this.logOutLink);
    }
}