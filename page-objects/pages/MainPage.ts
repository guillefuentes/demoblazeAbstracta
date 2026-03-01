import { Locator, Page } from '@playwright/test';
import { SignUpModal, LogInModal } from '@modals'
import { HeaderPage, FooterPage, BasePage } from '@pages';

export default class MainPage extends BasePage {
    signUpModal: SignUpModal;
    logInModal: LogInModal;
    headerSection: HeaderPage;
    footerSection: FooterPage;

    carrouselContainer: Locator;
    carrouselPreviousButton: Locator;
    carrouselNextButton: Locator;
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
            productLink: Locator,
            productPrice: Locator,
            productDescription: Locator,
        },
        previousButton: Locator,
        nextButton: Locator
    };

    readonly baseLoactors = {
        carrouselContainer: this.page.locator('#contcar'),
        carrouselPreviousButton: this.page.locator('#contcar').getByRole('button', { name: 'Previous' }),
        carrouselNextButton: this.page.locator('#contcar').getByRole('button', { name: 'Next' }),
        categoriesSection: {
            catContainer: this.page.locator('.list-group').filter({ hasText: 'CATEGORIES' }),
            phoneCategory: this.page.getByRole('link', { name: 'Phones' }),
            laptopCategory: this.page.getByRole('link', { name: 'Laptops' }),
            monitorCategory: this.page.getByRole('link', { name: 'Monitors' }),
        },
        productGridSection: {
            gridContainer: this.page.locator('#tbodyid'),
            productCard: {
                container: this.page.locator('.card'),
                productName: this.page.locator('.card-title'),
                productPrice: this.page.locator('.card-block h5'),
                productLink: this.page.locator('.card-title a'),
                productDescription: this.page.locator('#article'),
            },
            previousButton: this.page.getByRole('button', { name: 'Previous' }),
            nextButton: this.page.locator('.pagination').getByRole('button', { name: 'Next' })
        },
    };

    constructor(page: Page) {
        super(page);

        //Modals
        this.signUpModal = new SignUpModal(page);
        this.logInModal = new LogInModal(page);

        //Cross-Page Sections
        this.headerSection = new HeaderPage(page);
        this.footerSection = new FooterPage(page);


        //Locators per Section
        this.carrouselContainer = this.baseLoactors.carrouselContainer;
        this.carrouselPreviousButton = this.baseLoactors.carrouselPreviousButton;
        this.carrouselNextButton = this.baseLoactors.carrouselNextButton;

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
                productLink: this.baseLoactors.productGridSection.productCard.productLink,
                productDescription: this.baseLoactors.productGridSection.productCard.productDescription,
            },
            previousButton: this.baseLoactors.productGridSection.previousButton,
            nextButton: this.baseLoactors.productGridSection.nextButton
        };
    };

    async clickNextPaginationButton() {
        await this.actions.mouse.click(this.productGridSection.nextButton);
    };

    async clickPreviousPaginationButton() {
        await this.actions.mouse.click(this.productGridSection.previousButton);
    };

    async clickCategory(category: 'phone' | 'laptop' | 'monitor') {
        switch (category) {
            case 'phone':
                await this.actions.mouse.click(this.categoriesSection.phoneCategory)
                break;
            case 'laptop':
                await this.actions.mouse.click(this.categoriesSection.laptopCategory)
                break;
            case 'monitor':
                await this.actions.mouse.click(this.categoriesSection.monitorCategory)
                break;
        }
    };

    async clickCarrouselNext() {
        await this.actions.mouse.click(this.carrouselNextButton);
    };

    async clickCarrouselPrevious() {
        await this.actions.mouse.click(this.carrouselPreviousButton);
    };
}