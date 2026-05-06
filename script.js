class ShelfLifeTracker {
    constructor() {
        this.inventory = (JSON.parse(localStorage.getItem('bakeryInventory')) || [])
            .map(item => ({
                ...item,
                expires: new Date(item.expires)
            }));
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
    }


    
}
