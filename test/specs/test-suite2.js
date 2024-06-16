const loginPage = require('../pageobjects/login.page.js');
const inventoryPage = require('../pageobjects/inventory.page.js');

describe('test suite 2', () => {
    const correctLoginName = 'standard_user';
    const correctLoginPassword = 'secret_sauce';
    const incorrectLoginName = 'aaaaa';
    const incorrectLoginPassword = '12345';
    
    it('test case: valid Login', async () => {
        await browser.url('https://www.saucedemo.com/');

        await loginPage.insertUserName(correctLoginName);
        await loginPage.insertPassword(correctLoginPassword);
        await loginPage.clickSubmitButton();
        await loginPage.waitInventoryPageDownload();

        await expect(await inventoryPage.headerComponent.pageName).toHaveText("Products", 
        {message: 'the inventory page was not opened after clicking "Login" button on the login page'});
    })

    it('test case: login with unexisting user name and password', async () => {
        await browser.url('https://www.saucedemo.com/');

        await loginPage.insertUserName(incorrectLoginName);
        await loginPage.insertPassword(incorrectLoginPassword);
        await loginPage.clickSubmitButton();

        await expect(await loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service',
        {message: 'the error message was not shown after entering invalid user name and password on the login page'});
    })

    it('test case: login with empty fields', async () => {
        await browser.url('https://www.saucedemo.com/');

        // step 1
        await loginPage.clickSubmitButton();
        await expect(await loginPage.errorMessage).toHaveText('Epic sadface: Username is required',
        {message: 'the error message was not shown after entering all empty fields on the login page'});

        // step 2
        await loginPage.insertUserName(incorrectLoginName);
        await loginPage.clickSubmitButton();
        await expect(await loginPage.errorMessage).toHaveText('Epic sadface: Password is required',
        {message: 'the error message was not shown after entering entering empty "Password" field on the login page'});
    })
})