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
        headerContainer: this.page.locator('header'),
        headerLogo: this.page.locator('header .logo'),
        homeLink: this.page.locator('header .nav-bar .home'),
        contactLink: this.page.locator('header .nav-bar .contact'),
        aboutUsLink: this.page.locator('header .nav-bar .about'),
        cartLink: this.page.locator('header .nav-bar .cart'),
        logInLink: this.page.locator('header .nav-bar .login'),
        signUpLink: this.page.locator('header .nav-bar .signup'),
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