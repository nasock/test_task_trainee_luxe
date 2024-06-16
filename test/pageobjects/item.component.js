class ItemComponent{
    constructor(itemInfoElement) {
        this.itemInfoElement = itemInfoElement;
    }

    get addRemoveButton(){
        return this.itemInfoElement.$('[class*="btn_small"]');
    }
    
    async getFullDescription(){
        return await this.itemInfoElement.getText();
    }

    async isItemAddedToCart(){
        let text = await this.itemInfoElement.getText();
        return (await text.split("\n")[3]) === "Remove";
    }

    async getPrice(){
        let text = await this.itemInfoElement.getText();
        return await text.split("\n")[2];
    }

    async clickAddRemoveButton(){
        let button = await this.addRemoveButton;
        await button.click();
    }

}

module.exports = ItemComponent;