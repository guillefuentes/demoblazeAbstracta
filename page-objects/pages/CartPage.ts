import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { SignUpModal, LogInModal, PlaceOrderModal } from '@modals'
import { HeaderPage, FooterPage } from '@pages';

export default class CartPage extends BasePage {
    signUpModal: SignUpModal;
    logInModal: LogInModal;
    placeOrderModal: PlaceOrderModal;

    headerSection: HeaderPage;
    footerSection: FooterPage;

    inCartProducts: {
        cartTable: Locator,
        productName: Locator,
        productPrice: Locator
        deleteProductButton: Locator
    };

    totalPrice: Locator;
    placeOrderButton: Locator;

    private cartLocators = {
        inCartProducts: {
            cartTable: this.page.locator('.table-responsive'),
            productName: this.page.locator('#tbodyid > tr > td:nth-child(2)'),
            productPrice: this.page.locator('#tbodyid > tr > td:nth-child(3)'),
            deleteProductLink: this.page.getByRole('link', { name: 'Delete' })
        },
        totalPrice: this.page.locator('#totalp'),
        placeOrderButton: this.page.getByRole('button', { name: 'Place Order' }),
    }

    constructor(page: Page) {
        super(page);

        //Modals
        this.signUpModal = new SignUpModal(page);
        this.logInModal = new LogInModal(page);
        this.placeOrderModal = new PlaceOrderModal(page);

        //Sections
        this.headerSection = new HeaderPage(page);
        this.footerSection = new FooterPage(page);

        this.inCartProducts = {
            cartTable: this.cartLocators.inCartProducts.cartTable,
            productName: this.cartLocators.inCartProducts.productName,
            productPrice: this.cartLocators.inCartProducts.productPrice,
            deleteProductButton: this.cartLocators.inCartProducts.deleteProductLink,
        };

        this.totalPrice = this.cartLocators.totalPrice;
        this.placeOrderButton = this.cartLocators.placeOrderButton;
    };

    async placeOrder(): Promise<void> {
        await this.actions.mouse.click(this.placeOrderButton);
    }
}