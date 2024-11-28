export class GameState {
    constructor() {
        this.currentLevel = 1;
        this.currentCategory = 'Animals';
        this.currentPuzzle = null;
        this.foundWords = new Set();
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    getCurrentCategory() {
        return this.currentCategory;
    }

    setCurrentPuzzle(puzzle) {
        this.currentPuzzle = puzzle;
        this.foundWords.clear();
    }

    incrementLevel() {
        if (this.currentLevel < 10) {
            this.currentLevel++;
            return true;
        }
        return false;
    }

    changeCategory(category) {
        this.currentCategory = category;
        this.currentLevel = 1;
        this.foundWords.clear();
    }

    addFoundWord(word) {
        this.foundWords.add(word);
    }

    checkSolution() {
        if (!this.currentPuzzle || !this.currentPuzzle.words) {
            return false;
        }
        return this.foundWords.size === this.currentPuzzle.words.length;
    }
}