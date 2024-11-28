export class UIController {
    constructor() {
        this.gridElement = document.getElementById('puzzle-grid');
        this.wordListElement = document.getElementById('word-list');
        this.levelElement = document.getElementById('currentLevel');
        this.categoryElement = document.getElementById('currentCategory');
        this.isSelecting = false;
        this.selectedCells = [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.gridElement) {
            this.gridElement.addEventListener('mousedown', (e) => this.handleCellSelection(e));
            this.gridElement.addEventListener('mouseover', (e) => this.handleCellDrag(e));
            document.addEventListener('mouseup', () => this.handleSelectionEnd());
        }
    }

    renderPuzzle(puzzle) {
        if (!puzzle) return;
        this.renderGrid(puzzle.grid);
        this.renderWordList(puzzle.words);
        this.updateGameInfo(puzzle);
    }

    renderGrid(grid) {
        if (!this.gridElement || !grid) return;

        this.gridElement.style.gridTemplateColumns = `repeat(${grid.length}, var(--grid-cell-size))`;
        this.gridElement.innerHTML = '';

        grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                const cellElement = document.createElement('div');
                cellElement.className = 'grid-cell';
                cellElement.dataset.row = i;
                cellElement.dataset.col = j;
                cellElement.textContent = cell;
                this.gridElement.appendChild(cellElement);
            });
        });
    }

    renderWordList(words) {
        if (!this.wordListElement || !words) return;

        this.wordListElement.innerHTML = '';
        words.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.className = 'word-item';
            wordElement.textContent = word;
            this.wordListElement.appendChild(wordElement);
        });
    }

    updateGameInfo(puzzle) {
        if (this.levelElement && puzzle) {
            this.levelElement.textContent = puzzle.level;
        }
        if (this.categoryElement && puzzle) {
            this.categoryElement.textContent = puzzle.category;
        }
    }

    updateCategory(category) {
        if (this.categoryElement) {
            this.categoryElement.textContent = category;
        }
    }

    handleCellSelection(e) {
        const cell = e.target.closest('.grid-cell');
        if (cell) {
            this.isSelecting = true;
            this.selectedCells = [cell];
            cell.classList.add('selected');
        }
    }

    handleCellDrag(e) {
        if (!this.isSelecting) return;
        
        const cell = e.target.closest('.grid-cell');
        if (cell && !this.selectedCells.includes(cell)) {
            this.selectedCells.push(cell);
            cell.classList.add('selected');
        }
    }

    handleSelectionEnd() {
        if (!this.isSelecting) return;
        
        this.isSelecting = false;
        const word = this.getSelectedWord();
        this.checkWord(word);
        this.clearSelection();
    }

    getSelectedWord() {
        return this.selectedCells
            .map(cell => cell.textContent)
            .join('');
    }

    checkWord(word) {
        const wordElement = Array.from(this.wordListElement.children)
            .find(el => el.textContent === word);
        
        if (wordElement && !wordElement.classList.contains('found')) {
            wordElement.classList.add('found');
            return true;
        }
        return false;
    }

    clearSelection() {
        this.selectedCells.forEach(cell => {
            cell.classList.remove('selected');
        });
        this.selectedCells = [];
    }

    showResult(isCorrect) {
        const message = isCorrect ? 'Congratulations!' : 'Keep trying!';
        alert(message);
    }

    showGameComplete() {
        alert('Congratulations! You\'ve completed all levels!');
    }

    showCategoryModal() {
        const modal = document.getElementById('categoryModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
}