import { categories } from './categories.js';

export class CategoryManager {
    constructor(gameState, uiController, game) {
        this.gameState = gameState;
        this.uiController = uiController;
        this.game = game;
        this.categoryListElement = document.getElementById('categoryList');
        this.modal = document.getElementById('categoryModal');
        this.setupCategories();
    }

    setupCategories() {
        if (!this.categoryListElement) return;
        
        this.categoryListElement.innerHTML = '';
        Object.keys(categories).forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-item';
            categoryElement.textContent = category;
            categoryElement.addEventListener('click', () => this.selectCategory(category));
            this.categoryListElement.appendChild(categoryElement);
        });
    }

    selectCategory(category) {
        this.gameState.changeCategory(category);
        this.hideModal();
        this.uiController.updateCategory(category);
        this.game.startNewLevel(); // Start the game after category selection
    }

    showModal() {
        if (this.modal) {
            this.modal.style.display = 'flex';
        }
    }

    hideModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }
}