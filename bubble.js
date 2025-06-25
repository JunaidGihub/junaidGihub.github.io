let hitNum;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameTime = 60;
let timerInterval;
let currentDifficulty = "easy";  // Default difficulty

topScore = document.querySelector('#topScore');
topScore.innerText = `${highScore}`;

// Sound Effects
const popSound = new Audio("pop.mp3");
const buzzSound = new Audio("buzz.mp3");
popSound.playbackRate = 1.5;
buzzSound.playbackRate = 4;

// Generate bubbles
function bubbleCount() {
    let bCount = "";
    for (let i = 1; i <= 84; i++) {
        let nom = Math.floor(Math.random() * 10);
        bCount += `<div class="bubble">${nom}</div>`;
    }
    document.querySelector(".mainCont").innerHTML = bCount;
}

// Start the timer
function setTimer() {
    let time = gameTime;
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            document.querySelector("#time").innerText = time;
        } else {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

// Set the hit number
function setHit() {
    hitNum = Math.floor(Math.random() * 10);
    document.querySelector("#hit").innerText = hitNum;
}

// Increase score
function setScore() {
    score += 10;
    document.querySelector("#score").innerText = score;

    // Update high score if needed
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
}

// Decrease score based on difficulty
function decreaseScore() {
    let penalty = 0;
    if (currentDifficulty === "easy") {
        penalty = 2;
    } else if (currentDifficulty === "medium") {
        penalty = 4;
    } else if (currentDifficulty === "hard") {
        penalty = 6;
    }

    score -= penalty;
    if (score < 0) {
        score = 0; // score kabhi negative nahi hoga
    }
    document.querySelector("#score").innerText = score;
}

// Game Over
function gameOver() {
    document.querySelector(".mainCont").innerHTML = `
        <div style="text-align: center;">
            <h1>Game Over</h1>
            <h5>Your Score: ${score}</h5>
            <h5>High Score: ${highScore}</h5>
            <button onclick="restartGame()">Restart</button>
        </div>
    `;
    topScore.innerText = `${highScore}`;
}

// Start game based on difficulty
function startGame(difficulty) {
    currentDifficulty = difficulty;
    
    if (difficulty === "easy") {
        gameTime = 60;
    } else if (difficulty === "medium") {
        gameTime = 45;
    } else if (difficulty === "hard") {
        gameTime = 30;
    }

    document.getElementById("difficultyScreen").style.display = "none";
    score = 0;
    document.querySelector("#score").innerText = score;
    document.querySelector("#time").innerText = gameTime;

    bubbleCount();
    setHit();
    setTimer();
}

// Restart the game
function restartGame() {
    clearInterval(timerInterval);
    document.getElementById("difficultyScreen").style.display = "flex";
}

// Bubble click event
document.querySelector(".mainCont").addEventListener("click", function (data) {
    if (!data.target.classList.contains("bubble")) return;

    let clickedNum = Number(data.target.textContent);
    if (clickedNum === hitNum) {
        popSound.play();     // Play pop sound
        setScore();          // +10
        bubbleCount();
        setHit();
    } else {
        buzzSound.play();    // Play buzz sound
        decreaseScore();     // Penalty based on difficulty
        bubbleCount();
        setHit();
    }
});
