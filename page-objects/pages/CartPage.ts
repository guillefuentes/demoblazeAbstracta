import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { SignUpModal, LogInModal, PlaceOrderModal } from '@modals'
import { HeaderPage, FooterPage } from '@pages';

export default class CartPage extends BasePage {
    signUpModal: SignUpModal;
    logInModal: LogInModal;
    placeOrder: PlaceOrderModal;

    headerSection: HeaderPage;
    footerSection: FooterPage;

    pageIdentifier: Locator;

    productsInCartSection: {
        cartTable: Locator,
        productName: Locator,
        productPrice: Locator
        deleteProductButton: Locator
    };

    totalPrice: Locator;
    placeOrderButton: Locator;

    readonly cartLocators = {
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

    };
}