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

        if (diffDays <= 2) return { status: 'critical', days: diffDays };
        if (diffDays <= 7) return { status: 'warning', days: diffDays };
        return { status: 'safe', days: diffDays };
    }

    getStats() {
        const stats = { critical: 0, warning: 0, safe: 0, total: this.inventory.length };

        this.inventory.forEach(item => {
            const status = this.getStatus(item).status;
            stats[status]++;
        });

        return stats;
    }

    render() {  
        this.renderStats();
        this.renderWarning();
        this.renderInventory();
    }

    renderStats() {
        const stats = this.getStats();
        document.getElementById('criticalCount').textContent = stats.critical;
        document.getElementById('warningCount').textContent = stats.warning;
        document.getElementById('safeCount').textContent = stats.safe;
        document.getElementById('totalCount').textContent = stats.total;
    }

    renderWarning() {
        const criticalItems = this.inventory.filter(item =>
            this.getStatus(item).status === 'critical'
        );

        const banner = document.getElementById('warningBanner');
        const warningText = document.getElementById('warningText');

        if (criticalItems.length > 0) {
            warningText.innerHTML = `
                <strong>🚨 Expiring Soon:</strong><br>
                ${criticalItems.map(item => {
                const status = this.getStatus(item);
                return `• ${item.name} (${status.days}d)`;
            }).join('<br>')}
            `;
            banner.classList.add('show');
        } else {
            banner.classList.remove('show');
        }
    }

    renderInventory() {
        const container = document.getElementById('inventoryList');
        
        if (this.inventory.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🥖</div>
                    <h3>No ingredients yet</h3>
                    <p>Add your first ingredient to get started!</p>
                </div>
            `;
            return;
        }

        const sorted = [...this.inventory].sort((a, b) => a.expires - b.expires);

        const groups = {
            critical: [],
            warning: [],
            safe: []
        };

        sorted.forEach(item => {
            const status = this.getStatus(item).status;
            groups[status].push(item);
        });

        Object.values(groups).forEach(group =>
            group.sort((a, b) => a.expires - b.expires)
        );

        const renderGroup = (title, items) => {
            if (items.length === 0) return '';

            return `
                <h4 style="margin: 20px 0 10px; color: var(--text-secondary);">
                    ${title}
                </h4>
                ${items.map(item => {
                const status = this.getStatus(item);

                return `
                        <div class="inventory-item item-${status.status}">
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                                <div class="item-meta">
                                    ${item.quantity ? `<span>${item.quantity}</span>` : ''}
                                    <span class="item-days days-${status.status}">
                                        ${status.days} day${status.days !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                            <button class="btn btn-danger" onclick="tracker.markUsed(${item.id})">
                                ✓ Used
                            </button>
                        </div>
                    `;
            }).join('')}
            `;
        };

        container.innerHTML =
            renderGroup('🚨 Critical Items', groups.critical) +
            renderGroup('⚠️ Warning Items', groups.warning) +
            renderGroup('✅ Safe Items', groups.safe);
    }





    
}
