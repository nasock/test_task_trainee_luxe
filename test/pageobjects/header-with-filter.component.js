const HeaderComponent = require('./header.component.js');

class HeaderWithFilterComponent extends HeaderComponent{
    get filter(){
        return $('[class="select_container"]');
    }

    async clickFilter(){
        await this.cartIcon.click();
        await browser.waitUntil(async()=>{
            return await $('[class="product_sort_container"] option').isDisplayed();
        }, 5000, "The filter is not shown");
    }
}

module.exports = HeaderWithFilterComponent;