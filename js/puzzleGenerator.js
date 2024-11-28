import { categories } from './categories.js';

export class PuzzleGenerator {
    constructor() {
        this.gridSize = 10;
    }

    generatePuzzle(level, category) {
        const words = this.getWordsForLevel(level, category);
        const grid = this.createEmptyGrid();
        const placedWords = this.placeWordsInGrid(grid, words);

        return {
            grid,
            words,
            size: this.gridSize,
            level,
            category
        };
    }

    createEmptyGrid() {
        return Array(this.gridSize).fill(null)
            .map(() => Array(this.gridSize).fill(''));
    }

    getWordsForLevel(level, category) {
        return categories[category]?.[level] || ['PUZZLE', 'GAME', 'WORD', 'SEARCH'];
    }

    placeWordsInGrid(grid, words) {
        const placedWords = [];

        for (const word of words) {
            const placement = this.findWordPlacement(grid, word);
            if (placement) {
                this.placeWord(grid, word, placement);
                placedWords.push(word);
            }
        }

        this.fillEmptyCells(grid);
        return placedWords;
    }

    findWordPlacement(grid, word) {
        const directions = [
            { dx: 1, dy: 0 },  // horizontal
            { dx: 0, dy: 1 },  // vertical
            { dx: 1, dy: 1 }   // diagonal
        ];

        for (let attempt = 0; attempt < 50; attempt++) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);

            if (this.canPlaceWord(grid, word, x, y, direction)) {
                return { x, y, direction };
            }
        }

        return null;
    }

    canPlaceWord(grid, word, startX, startY, direction) {
        if (startX + word.length * direction.dx > this.gridSize ||
            startY + word.length * direction.dy > this.gridSize) {
            return false;
        }

        for (let i = 0; i < word.length; i++) {
            const x = startX + i * direction.dx;
            const y = startY + i * direction.dy;
            if (grid[y][x] !== '' && grid[y][x] !== word[i]) {
                return false;
            }
        }

        return true;
    }

    placeWord(grid, word, placement) {
        const { x: startX, y: startY, direction } = placement;
        
        for (let i = 0; i < word.length; i++) {
            const x = startX + i * direction.dx;
            const y = startY + i * direction.dy;
            grid[y][x] = word[i];
        }
    }

    fillEmptyCells(grid) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (!grid[i][j]) {
                    grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
    }
}