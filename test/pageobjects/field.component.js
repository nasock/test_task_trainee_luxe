
class FieldComponent{
    constructor(field_id) {
        this.field_id = field_id;
    }

    get fieldElement(){
        return $(this.field_id);
    }

    async insertValue(value){
        await this.fieldElement.setValue(value);
    }
}

module.exports = FieldComponent;