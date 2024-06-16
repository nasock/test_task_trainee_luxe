const FieldComponent = require('./field.component.js');

class LoginPage{
    get userName(){
        return new FieldComponent('#user-name');
    }

    get password(){
        return new FieldComponent('#password');
    }

    get submitButton(){
        return $('#login-button');
    }

    get errorMessage(){
        return $('[class*="error-message-container"]');
    }

    async insertUserName(value){
        await this.userName.insertValue(value);
    }
    
    async insertPassword(value){
        await this.password.insertValue(value);
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }

    async waitInventoryPageDownload(){
        await browser.waitUntil(async() => {
            return await $('#inventory_container').isDisplayed();
        }, 5000, "You didn't login.");
    }
}

module.exports = new LoginPage();