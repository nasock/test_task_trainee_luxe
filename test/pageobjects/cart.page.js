const HeaderWithFilterComponent = require('./header-with-filter.component.js');
const ItemComponent = require('./item.component.js');

class CartPage{
    get headerComponent(){
        return new HeaderWithFilterComponent();
    }

    get allItemsElements(){
        return $$('[class="cart_item_label"]');
    }

    get removedItem(){
        return $ ('[class="removed_cart_item"]');
    }

    get continueShoppingButton(){
        return $('#continue-shopping');
    }

    get checkoutButton(){
        return $('#checkout');
    }

    async getItemComponentByIndex(index){
        return new ItemComponent (await this.allItemsElements[index]);
    }

    async clickCheckoutButton(){
        await this.checkoutButton.click();
        await browser.waitUntil(async()=>{
            return await $('#checkout_info_container').isDisplayed();
        }, 5000, "The checkout page was not open");
    }

    async clickContinueShoppingButton(){
        await this.continueShoppingButton.click();
        await browser.waitUntil(async()=>{
            return await $('#inventory_container').isDisplayed();
        }, 5000, "The inventory page was not opened.");
    }
}

module.exports = new CartPage();