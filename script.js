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

    bindEvents() {
        document.getElementById('addForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addIngredient();
        });
    }

    addIngredient() {
        const name = document.getElementById('ingredientName').value.trim();
        const dateStr = document.getElementById('expirationDate').value;
        const quantity = document.getElementById('quantity').value.trim();

        if (!name || !dateStr) {
            alert('Please fill in all required fields!');
            return;
        }

        const expires = new Date(dateStr);
        if (expires <= new Date()) {
            alert('Expiration date must be in the future!');
            return;
        }

        
    }
    
}
