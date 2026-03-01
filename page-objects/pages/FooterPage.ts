import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class FooterPage extends BasePage {
    footerContainer: Locator;
    headerLogo: Locator;
    aboutUsDescription: Locator;
    getInTouchDescription: Locator;
    footerLogo: Locator;

    private footerLocators = {
        footerContainer: this.page.locator('footer'),
        aboutUsDescription: this.page.locator('footer .about-us'),
        getInTouchDescription: this.page.locator('footer .contact'),
        footerLogo: this.page.locator('footer .privacy-policy'),
    };

    constructor(page: Page) {
        super(page);
        this.footerContainer = this.footerLocators.footerContainer;
        this.aboutUsDescription = this.footerLocators.aboutUsDescription;
        this.getInTouchDescription = this.footerLocators.getInTouchDescription;
        this.footerLogo = this.footerLocators.footerLogo;
    }
}