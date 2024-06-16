
class HeaderComponent{
    get pageName(){
        return $('[class="title"]');
    }

    get cartIcon(){
        return $('#shopping_cart_container');
    }

    get cartBadge(){
        return $('[class="shopping_cart_badge"]');
    }

    async isCartEmpty(){
        return !(await this.cartBadge.isExisting());
    }

    async getNumberOfItemsInCart(){
        if(await this.isCartEmpty()){
            return 0;
        }
        return parseInt(await this.cartBadge.getText());
    }

    async clickCartIcon(){
        await this.cartIcon.click();
        await browser.waitUntil(async()=>{
            return await $('[class="cart_list"]').isDisplayed();
        }, 5000, "The cart page was not open");
    }
}

module.exports = HeaderComponent;