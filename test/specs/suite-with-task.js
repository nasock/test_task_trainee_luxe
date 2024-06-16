const assert = require('assert');
const loginPage = require('../pageobjects/login.page.js');
const inventoryPage = require('../pageobjects/inventory.page.js');
const cartPage = require('../pageobjects/cart.page.js');
const checkoutPage = require('../pageobjects/checkout.page.js');
const overviewPage = require('../pageobjects/overview.page.js');
const completePage = require('../pageobjects/complete.page.js');

describe('test suite 1', () => {
    const loginName = 'standard_user';
    const loginPassword = 'secret_sauce';
    const userFirstName = 'Ann';
    const userLastName = 'Koval';
    const postalCode = '12345';

    beforeEach('precondition: Login', async () => {
        await browser.url('https://www.saucedemo.com/');

        await loginPage.insertUserName(loginName);
        await loginPage.insertPassword(loginPassword);
        await loginPage.clickSubmitButton();
        await loginPage.waitInventoryPageDownload();
    });

    it('test case 8: Valid Checkout', async () => {
        // step 1
        let oldValue = await inventoryPage.headerComponent.getNumberOfItemsInCart();
        let inventoryItem = await inventoryPage.getItemComponentByIndex(0);

        await inventoryItem.clickAddRemoveButton();
        let newValue = await inventoryPage.headerComponent.getNumberOfItemsInCart();
        assert(newValue === (oldValue + 1), 
        "the number of products in the cart didn't increase by 1 on the cart icon on the inventory page after adding to the cart");

        inventoryItem = await inventoryPage.getItemComponentByIndex(0);
        assert(await inventoryItem.isItemAddedToCart(), 
        'the product was not added to the cart after clicking on "Add To Cart" button near the product on the inventory page');

        let itemFullDescription = await inventoryItem.getFullDescription();
        let itemPrice = await inventoryItem.getPrice();
        
        // step 2
        await inventoryPage.headerComponent.clickCartIcon();

        await expect(await cartPage.headerComponent.pageName).toHaveText("Your Cart", 
        {message: 'the cart page was not opened after clicking the cart icon on the inventory page'});

        let cartItem = await cartPage.getItemComponentByIndex(0);
        let cartItemFullDescription = await cartItem.getFullDescription();
        assert(itemFullDescription === cartItemFullDescription, 
            "the product in the cart is not the one that was selected");

        // step 3
        await cartPage.clickCheckoutButton();
        await expect(await checkoutPage.checkoutForm).toBeDisplayed(
            {message: 'the checkout form was not displayd on the checkout page'});

        // step 4
        await checkoutPage.insertFirstName(userFirstName);
        await expect(await checkoutPage.getFirstNameElement()).toHaveValue(userFirstName, 
            {message: 'the first name was not inserted in the first name field on checkout page'});

        // step 5
        await checkoutPage.insertLastName(userLastName);
        await expect(await checkoutPage.getLastNameElement()).toHaveValue(userLastName, 
            {message: 'the last name was not inserted in the last name field on checkout page'});

        // step 6
        await checkoutPage.insertPostalCode(postalCode);
        await expect(await checkoutPage.getPostalCodeElement()).toHaveValue(postalCode, 
            {message: 'the postal code was not inserted in the postal code field on checkout page'});

        // step 7
        await checkoutPage.clickContinueButton();
        await checkoutPage.waitOverviewPageDownload();

        await expect(await overviewPage.headerComponent.pageName).toHaveText("Checkout: Overview", 
        {message: 'the overview page was not opened after clicking "Continue" button on the checkout page'});

        let checkoutItem = await overviewPage.getItemComponentByIndex(0);
        let checkoutItemFullDescription = await checkoutItem.getFullDescription();
        assert(await itemFullDescription.includes(checkoutItemFullDescription), 
        "the product on the overview page was not the one that was selected");

        let totalPrice = await overviewPage.getTotalPriceText();
        assert(totalPrice === itemPrice, 
            `the total price ${totalPrice} is not equal the price of the product ${itemPrice} on the overview page`);``

        // step 8
        await overviewPage.clickFinishButton();
        await expect(await completePage.headerComponent.pageName).toHaveText("Checkout: Complete!", 
        {message: 'the complete page was not opened after clicking "Finish" button on the overview page'});
        await expect(await completePage.message).toHaveText("Thank you for your order!", 
        {message: 'the grateful message was not shown on the complete page'});

        // step 9
        await completePage.clickBackHomeButton();
        await expect(await inventoryPage.headerComponent.pageName).toHaveText("Products", 
        {message: 'the inventory page was not opened after clicking "Back Home" button on the complete page'});
        await expect(await inventoryPage.inventoryContainer).toBeDisplayed(
            {message: 'the product were not shown on the inventory page'});
        assert(await inventoryPage.headerComponent.isCartEmpty(), "the cart was not empty on the inventory page");  
    })

    it('test case: remove product from the cart with "Remove" button on the cart page', async () => {
        // step 1
        let inventoryItem = await inventoryPage.getItemComponentByIndex(0);
        await inventoryItem.clickAddRemoveButton();
        await inventoryPage.headerComponent.clickCartIcon();

        // step 2
        let cartItem = await cartPage.getItemComponentByIndex(0);
        await cartItem.clickAddRemoveButton();

        await expect(await cartPage.removedItem).toBeExisting({
            message: 'the product was not removed from the cart after clicking "Remove" button on the cart page'});
        assert(await cartPage.headerComponent.isCartEmpty(), 
        'the cart icon is shows number on the cart page when the cart is empty');
        assert(!(await cartPage.checkoutButton.isEnabled()), 
        '"Checkout" button is not disabled on the cart page when the cart is empty');
    })

    it('test case: redirection on the inventory and cart pages after clicking "Continue Shopping" and "Cancel" buttons', async () => {
        // step 1
        let inventoryItem = await inventoryPage.getItemComponentByIndex(0);
        await inventoryItem.clickAddRemoveButton();

        let itemNum = await inventoryPage.headerComponent.getNumberOfItemsInCart();
        let itemFullDescription = await inventoryItem.getFullDescription();

        await inventoryPage.headerComponent.clickCartIcon();
        await cartPage.clickContinueShoppingButton();
        await expect(await inventoryPage.headerComponent.pageName).toHaveText("Products",
        {message: 'the inventory page was not opened after clicking "Continue Shoppin" button on the cart page'});

        let newItemNum = await inventoryPage.headerComponent.getNumberOfItemsInCart();
        assert(itemNum === newItemNum, 
            `the number of products ${newItemNum} differs after clicking "Continue Shoppin" button on the cart page`);

        // step 2
        await inventoryPage.headerComponent.clickCartIcon();
        await cartPage.clickCheckoutButton();

        await checkoutPage.insertFirstName(userFirstName);
        await checkoutPage.insertLastName(userLastName);
        await checkoutPage.insertPostalCode(postalCode);

        await checkoutPage.clickCancelButton();
        await expect(await cartPage.headerComponent.pageName).toHaveText("Your Cart",
        {message: 'the cart page was not opened after clicking "Cancel" button on the checkout page'});
        
        newItemNum = await cartPage.headerComponent.getNumberOfItemsInCart();
        assert(itemNum === newItemNum, 
            `the number of products ${newItemNum} differs after clicking "Cancel" button on the checkout page`);

        let cartItem = await cartPage.getItemComponentByIndex(0);
        let cartItemFullDescription = await cartItem.getFullDescription();
        assert(itemFullDescription === cartItemFullDescription,
            'the product is not the selected one after clicking "Cancel" button on the checkout page');

        // step 3
        await cartPage.clickCheckoutButton();

        await expect(await checkoutPage.getFirstNameElement()).toHaveValue('',
        {message: '"First Name" field was not empty after on the checkout page after cancellation'});
        await expect(await checkoutPage.getLastNameElement()).toHaveValue('',
        {message: '"Last Name" field was not empty after on the checkout page after cancellation'});
        await expect(await checkoutPage.getPostalCodeElement()).toHaveValue('',
        {message: '"Postal Code" field was not empty after on the checkout page after cancellation'});

        // step 4
        await checkoutPage.insertFirstName(userFirstName);
        await checkoutPage.insertLastName(userLastName);
        await checkoutPage.insertPostalCode(postalCode);

        await checkoutPage.clickContinueButton();
        await overviewPage.clickCancelButton();
        await expect(await inventoryPage.headerComponent.pageName).toHaveText("Products",
        {message: 'the inventory page was not opened after clicking "Cancel" button on the overview page'});

        newItemNum = await inventoryPage.headerComponent.getNumberOfItemsInCart();
        assert(itemNum === newItemNum, 
            `the number of products ${newItemNum} differs after clicking "Continue Shoppin" button on the cart page`);
    })

    it('test case: entering empty fields on the checkout page', async () => {
        // step 1
        let inventoryItem = await inventoryPage.getItemComponentByIndex(0);
        await inventoryItem.clickAddRemoveButton();
        await inventoryPage.headerComponent.clickCartIcon();
        await cartPage.clickCheckoutButton();

        await checkoutPage.clickContinueButton();
        await expect(await checkoutPage.errorMessage).toHaveText('Error: First Name is required',
        {message: 'the error message was shown not after entering all empty fields on the checkout page'});

        // step 2 
        await checkoutPage.insertFirstName(userFirstName);
        await checkoutPage.clickContinueButton();
        await expect(await checkoutPage.errorMessage).toHaveText('Error: Last Name is required',
        {message: 'the error message was not shown after entering empty "Last Name" and "Postal Code" fields on the checkout page'});

        // step 3
        await checkoutPage.insertLastName(userLastName);
        await checkoutPage.clickContinueButton();
        await expect(await checkoutPage.errorMessage).toHaveText('Error: Postal Code is required',
        {message: 'the error message was not shown after entering empty "Postal Code" field on the checkout page'});
    })

})

