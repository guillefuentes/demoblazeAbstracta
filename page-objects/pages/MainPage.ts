import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { SignUpModal, LogInModal } from '@modals'
import { HeaderPage, FooterPage } from '@pages';

export default class MainPage extends BasePage {
    signUpModal: SignUpModal;
    logInModal: LogInModal;
    headerSection: HeaderPage;
    footerSection: FooterPage;

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

    readonly baseLoactors = {
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

        //Sections
        this.headerSection = new HeaderPage(page);
        this.footerSection = new FooterPage(page);

        //Locators per Section
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

    async clickNextPaginationButton() {
        await this.productGridSection.nextButton.click();
    };

    async clickPreviousPaginationButton() {
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
}