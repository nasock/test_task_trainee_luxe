const FieldComponent = require('./field.component.js');
const HeaderComponent = require('./header.component.js');

class CheckoutePage{
    get headerComponent(){
        return new HeaderComponent();
    }

    get checkoutForm(){
        return $('[class="checkout_info"]');
    }

    get userFirstName(){
        return new FieldComponent('#first-name');
    }

    get userLastName(){
        return new FieldComponent('#last-name');
    }

    get postalCode(){
        return new FieldComponent('#postal-code');
    }

    get errorMessage(){
        return $('[class*="error-message-container"]');
    }

    get cancelButton(){
        return $('#cancel');
    }

    get continueButton(){
        return $('#continue');
    }

    async getFirstNameElement(){
        return await this.userFirstName.fieldElement;
    }

    async getLastNameElement(){
        return await this.userLastName.fieldElement;
    }

    async getPostalCodeElement(){
        return await this.postalCode.fieldElement;
    }

    async insertFirstName(value){
        await await this.userFirstName.insertValue(value);
    }

    async insertLastName(value){
        await await this.userLastName.insertValue(value);
    }
    
    async insertPostalCode(value){
        await await this.postalCode.insertValue(value);
    }

    async clickCancelButton(){
        await this.cancelButton.click();
        await browser.waitUntil(async()=>{
            return await $('[class="cart_list"]').isDisplayed();
        }, 5000, "The cart page was not open");
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    async waitOverviewPageDownload(){
        await browser.waitUntil(async()=>{
            return await $('[class="title"]').isDisplayed();
        }, 5000, "The overview page was not open");
    }
}

module.exports = new CheckoutePage();