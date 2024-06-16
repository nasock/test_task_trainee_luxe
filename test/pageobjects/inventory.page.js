const HeaderWithFilterComponent = require('./header-with-filter.component.js');
const ItemComponent = require('./item.component.js');

class InventoryPage{
    get headerComponent(){
        return new HeaderWithFilterComponent();
    }

    get inventoryContainer(){
        return $('#inventory_container');
    }

    get allItemsElements(){
        return $$('[class="inventory_item_description"]');
    }

    async getItemComponentByIndex(index){
        return new ItemComponent (await this.allItemsElements[index]);
    }

}

module.exports = new InventoryPage();