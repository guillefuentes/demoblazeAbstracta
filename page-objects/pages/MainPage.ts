import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import SignUpModal from '../modals/SignUpModal';
import LogInModal from '../modals/LogInModal';
export default class MainPage extends BasePage {
    signUpModal: SignUpModal;
    logInModal: LogInModal;
    headerSection: {
        headerContainer: Locator,
        headerLogo: Locator,
        homeLink: Locator,
        contactLink: Locator,
        aboutUsLink: Locator,
        cartLink: Locator,
        logInLink: Locator,
        signUpLink: Locator,
    };
    categoriesSection: {
        catContainer: Locator,
        phoneCategory: Locator,
        laptopCategory: Locator,
        monitorCategory: Locator,
    };
    productGridSection: {
        gridContainer: Locator,
        productCard: {
            container: Locator,
            productName: Locator,
            productPrice: Locator,
            productDescription: Locator,
        },
        previousButton: Locator,
        nextButton: Locator
    };
    footerSection: {
        footerContainer: Locator,
        aboutUsDescription: Locator,
        getInTouchDescription: Locator,
        footerLogo: Locator,
    };

    readonly baseLoactors = {
        headerSection: {
            headerContainer: this.page.locator('header'),
            headerLogo: this.page.locator('header .logo'),
            homeLink: this.page.locator('header .nav-bar .home'),
            contactLink: this.page.locator('header .nav-bar .contact'),
            aboutUsLink: this.page.locator('header .nav-bar .about'),
            cartLink: this.page.locator('header .nav-bar .cart'),
            logInLink: this.page.locator('header .nav-bar .login'),
            signUpLink: this.page.locator('header .nav-bar .signup'),
        },
        footerSection: {
            footerContainer: this.page.locator('footer'),
            aboutUsDescription: this.page.locator('footer .about-us'),
            getInTouchDescription: this.page.locator('footer .contact'),
            footerLogo: this.page.locator('footer .privacy-policy'),
        },
        categoriesSection: {
            catContainer: this.page.locator('.categories'),
            phoneCategory: this.page.locator('.categories .phone'),
            laptopCategory: this.page.locator('.categories .laptop'),
            monitorCategory: this.page.locator('.categories .monitor'),
        },
        productGridSection: {
            gridContainer: this.page.locator('.product-grid'),
            productCard: {
                container: this.page.locator('.product-card'),
                productName: this.page.locator('.product-name'),
                productPrice: this.page.locator('.product-price'),
                productDescription: this.page.locator('.product-description'),
            },
            previousButton: this.page.locator('.pagination .previous'),
            nextButton: this.page.locator('.pagination .next')
        },
    };

    constructor(page: Page) {
        super(page);

        //Modals
        this.signUpModal = new SignUpModal(page);
        this.logInModal = new LogInModal(page);

        //Locators per Section
        this.headerSection = {
            headerContainer: this.baseLoactors.headerSection.headerContainer,
            headerLogo: this.baseLoactors.headerSection.headerLogo,
            homeLink: this.baseLoactors.headerSection.homeLink,
            contactLink: this.baseLoactors.headerSection.contactLink,
            aboutUsLink: this.baseLoactors.headerSection.aboutUsLink,
            cartLink: this.baseLoactors.headerSection.cartLink,
            logInLink: this.baseLoactors.headerSection.logInLink,
            signUpLink: this.baseLoactors.headerSection.signUpLink,
        };

        this.footerSection = {
            footerContainer: this.baseLoactors.footerSection.footerContainer,
            aboutUsDescription: this.baseLoactors.footerSection.aboutUsDescription,
            getInTouchDescription: this.baseLoactors.footerSection.getInTouchDescription,
            footerLogo: this.baseLoactors.footerSection.footerLogo,
        };

        this.categoriesSection = {
            catContainer: this.baseLoactors.categoriesSection.catContainer,
            phoneCategory: this.baseLoactors.categoriesSection.phoneCategory,
            laptopCategory: this.baseLoactors.categoriesSection.laptopCategory,
            monitorCategory: this.baseLoactors.categoriesSection.monitorCategory,
        };

        this.productGridSection = {
            gridContainer: this.baseLoactors.productGridSection.gridContainer,
            productCard: {
                container: this.baseLoactors.productGridSection.productCard.container,
                productName: this.baseLoactors.productGridSection.productCard.productName,
                productPrice: this.baseLoactors.productGridSection.productCard.productPrice,
                productDescription: this.baseLoactors.productGridSection.productCard.productDescription,
            },
            previousButton: this.baseLoactors.productGridSection.previousButton,
            nextButton: this.baseLoactors.productGridSection.nextButton
        };
    };

    async clickNextButton() {
        await this.productGridSection.nextButton.click();
    };

    async clickPreviousButton() {
        await this.productGridSection.previousButton.click();
    };

    async clickCategory(category: 'phone' | 'laptop' | 'monitor') {
        switch (category) {
            case 'phone':
                await this.categoriesSection.phoneCategory.click();
                break;
            case 'laptop':
                await this.categoriesSection.laptopCategory.click();
                break;
            case 'monitor':
                await this.categoriesSection.monitorCategory.click();
                break;
        }
    };

    async signIn() {
        await this.headerSection.logInLink.click();
        //call to s
    };

    async signUp() {
        await this.headerSection.signUpLink.click();
    };
}