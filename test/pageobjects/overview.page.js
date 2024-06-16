const HeaderComponent = require('./header.component.js');
const ItemComponent = require('./item.component.js');

class OverviewPage{
    get headerComponent(){
        return new HeaderComponent();
    }

    get allItemsElements(){
        return $$('[class="cart_item_label"]');
    }

    get totalPrice(){
        return $('[class="summary_total_label"]');
    }

    get cancelButton(){
        return $('#cancel');
    }

    get finishButton(){
        return $('#finish');
    }

    async getItemComponentByIndex(index){
        return new ItemComponent (await this.allItemsElements[index]);
    }

    async getTotalPriceText(){
        let totalPrice = await this.totalPrice.getText();
        return await totalPrice.split(" ")[1];
    }

    async clickCancelButton(){
        await this.cancelButton.click();
        await browser.waitUntil(async()=>{
            return await $('#inventory_container').isDisplayed();
        }, 5000, "The inventory page was not opened.");
    }

    async clickFinishButton(){
        await this.finishButton.click();
        await browser.waitUntil(async()=>{
            return await $('#checkout_complete_container').isDisplayed();
        }, 5000, "The complete page was not opened.");
    }
}

module.exports = new OverviewPage();