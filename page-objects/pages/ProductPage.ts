import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { SignUpModal, LogInModal, PlaceOrderModal } from '@modals'
import { HeaderPage, FooterPage } from '@pages';

export default class ProductPage extends BasePage {
    signUpModal: SignUpModal;
    logInModal: LogInModal;
    placeOrder: PlaceOrderModal;

    headerSection: HeaderPage;
    footerSection: FooterPage;

    productTitle: Locator;
    productPrice: Locator;
    productDescription: Locator;
    addToCartButton: Locator;

    private productLocators = {
        productTitle: this.page.locator('.name'),
        productPrice: this.page.locator('.price-container'),
        productDescription: this.page.locator('#myTabContent'),
        addToCartButton: this.page.getByRole('link', { name: 'Add to cart' }),
    }

    constructor(page: Page) {
        super(page);

        //Modals
        this.signUpModal = new SignUpModal(page);
        this.logInModal = new LogInModal(page);
        this.placeOrder = new PlaceOrderModal(page);

        //Sections
        this.headerSection = new HeaderPage(page);
        this.footerSection = new FooterPage(page);

        this.productTitle = this.productLocators.productTitle;
        this.productPrice = this.productLocators.productPrice;
        this.productDescription = this.productLocators.productDescription;
        this.addToCartButton = this.productLocators.addToCartButton;
    };

    async clickAddToCart() {
        await this.actions.mouse.click(this.addToCartButton);
    };
}