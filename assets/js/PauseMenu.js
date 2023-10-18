const pauseMenu = document.getElementById("pauseMenu");
const resumeButton = document.getElementById("resumeButton");
const restartButton = document.getElementById("restartButton");

// Function to pause the game and show the pause menu
function pauseGame() {
    pauseMenu.classList.remove("hidden");
    // Disable game interactions when paused
    // For example, you could pause game updates, etc.
}

// Function to resume the game
function resumeGame() {
    pauseMenu.classList.add("hidden");
    // Resume game interactions
}

// Function to restart the game
function restartGame() {
    // Add code to reset the game to its initial state
    location.reload(); // Make sure the pause menu is hidden
}

// Event listeners for buttons
resumeButton.addEventListener("click", resumeGame);
restartButton.addEventListener("click", restartGame);

// Listen for the 'Escape' key to toggle the pause menu
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (pauseMenu.classList.contains("hidden")) {
            pauseGame();
        } else {
            resumeGame();
        }
    }
});
