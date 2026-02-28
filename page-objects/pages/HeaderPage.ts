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

    //Main Page only - Carrousel
    headerCarrousel: {
        container: Locator,
        previousButton: Locator,
        nextButton: Locator
    };

    readonly headerLocators = {
        headerContainer: this.page.locator('header'),
        headerLogo: this.page.locator('header .logo'),
        homeLink: this.page.locator('header .nav-bar .home'),
        contactLink: this.page.locator('header .nav-bar .contact'),
        aboutUsLink: this.page.locator('header .nav-bar .about'),
        cartLink: this.page.locator('header .nav-bar .cart'),
        logInLink: this.page.locator('header .nav-bar .login'),
        signUpLink: this.page.locator('header .nav-bar .signup'),
        headerCarrousel: {
            container: this.page.locator('header .carrousel'),
            previousButton: this.page.locator('header .carrousel .prev'),
            nextButton: this.page.locator('header .carrousel .next')
        }
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

        this.headerCarrousel = {
            container: this.headerLocators.headerCarrousel.container,
            previousButton: this.headerLocators.headerCarrousel.previousButton,
            nextButton: this.headerLocators.headerCarrousel.nextButton
        };
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

    async clickCarrouselNext() {
        await this.headerCarrousel.nextButton.click();
    };

    async clickCarrouselPrevious() {
        await this.headerCarrousel.previousButton.click();
    };
}