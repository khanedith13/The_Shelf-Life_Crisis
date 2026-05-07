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

        this.inventory.push({
            id: Date.now(),
            name: name.charAt(0).toUpperCase() + name.slice(1),
            expires,
            quantity
        });

        this.save();
        this.render();
        this.clearForm();
    }
    
    markUsed(id) {
        this.inventory = this.inventory.filter(item => item.id !== id);
        this.save();
        this.render();
    }

    getStatus(item) {
        const now = new Date();
        const diffTime = item.expires - now;
        const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

        
    }

    
}
