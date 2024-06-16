const HeaderComponent = require('./header.component.js');

class CompletePage{
    get headerComponent(){
        return new HeaderComponent();
    }

    get headerComponent(){
        return new HeaderComponent();
    }

    get message(){
        return $('[class="complete-header"]');
    }

    get backHomeButton(){
        return $('#back-to-products');
    }

    async clickBackHomeButton(){
        await this.backHomeButton.click();
        await browser.waitUntil(async()=>{
            return await $('#inventory_container').isDisplayed();
        }, 5000, "The inventory page was not opened.");
    }
}

module.exports = new CompletePage();