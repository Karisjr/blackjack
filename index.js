let winnerBannerEl = document.getElementById("winner-banner")
let messageEl = document.getElementById("message-banner")
let player1El = document.getElementById("player-1")
let player2El = document.getElementById("player-2")
let currentPlayer = null;

//create an object called Player - this will include all the state (card, sum, has blackjack and isAlive)
//2 instances - Player1 and Player2
//currentplay should equal player1 or player2 as we need to switch the object
//

let Player1 = {
    name: "player-1",
    cards: [], 
    sum: 0,
    hasBlackjack: false,
    isAlive: true,
    score: 0,
    finished: false
}

let Player2 = {
    name: "player-2",
    cards: [], 
    sum: 0,
    hasBlackjack: false,
    isAlive: true,
    score: 0,
    finished: false
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }  
}

function startBlackjack() {
    console.log("I was clicked to start game")
    // isAlive = true
    currentPlayer = Player1
    document.getElementById(currentPlayer.name).classList.add("active-player")
    renderGame()
    let firstCard = getRandomCard()
    // cards.push(cards)
}

function hitMe() {
    if (currentPlayer.isAlive === true && currentPlayer.hasBlackjack === false) {
        let card = getRandomCard();
        currentPlayer.sum += card
        currentPlayer.cards.push(card)
        renderGame()
    } else {
        disabled = true
    }
}

function haseveryoneplayed() {
    return Player1.cards.length != 0 && Player2.cards.length != 0
}
function hasEveryoneFinished() {
    return Player1.finished && Player2.finished
}

    //haseveryoneplayed - check if cards are empty for each player? if true, then check which sum is greater 
    //and if not then...

function Stay() {
    currentPlayer.finished = true
    renderGame()
    if (haseveryoneplayed()) {
        if (Player1.sum > Player2.sum) {
            theWinnerIs(Player1)
        } else {
            theWinnerIs(Player2)
        }
        return
    }
    switchPlayer()
}

function renderPlayer(player) {
    let sumEl = document.getElementById(player.name + "-sum-el") 
    let cardsEl = document.getElementById(player.name + "-cards-el")
    cardsEl.textContent = "Cards: " 

    for (let i = 0; i < player.cards.length; i++) {
        cardsEl.textContent += player.cards[i] + " "
    }

    sumEl.textContent = "Sum: " + player.sum
}

function renderGame() {
    renderPlayer(Player1) 
    renderPlayer(Player2)
    if (currentPlayer.sum === 21) { // '===' means exactly, if the sum total matches 21
        currentPlayer.hasBlackjack = true;
        message = "Blackjack!"
        varclass = "blackjack-style"
        theWinnerIs(currentPlayer)
    } else if (currentPlayer.sum > 21) {
        currentPlayer.isAlive = false
        varclass = "bust-style"
        message = "BUST!"
        let otherPlayer = currentPlayer == Player1 ? Player2 : Player1
        theWinnerIs(otherPlayer)
    } else if (hasEveryoneFinished()) {
        message = "Winner by points!"
        varclass = "base-style"
    } else {
        message = "Hit or Stay?"
        varclass = "base-style"
    }
    messageEl.innerHTML = '<p class="'+ varclass +'">' + message + '</p>'
}

function renderScores() {
    let player1score = document.getElementById("player1-score-tracker")
    let player2score = document.getElementById("player2-score-tracker")
    player1score.textContent = Player1.score
    player2score.textContent = Player2.score
}

function Reset() {
    gameFinished = true
    resetPlayer (Player1)
    resetPlayer (Player2)
    // clear player state and start new Blackjack game
    startBlackjack()
}

function restartGame() {
    Player1.score = 0
    Player2.score = 0

    document.getElementById("overlay").style.display = "none";
    Reset()
    renderScores()
}

function resetPlayer(player) {
    player.cards = []
    player.sum = 0
    player.hasBlackjack = false
    player.isAlive = true
    player.finished = false
    drawMessage()
}

function switchPlayer() {
    document.getElementById(currentPlayer.name).classList.remove("active-player")
    if (currentPlayer === Player1) {
        currentPlayer = Player2
    } else if (currentPlayer === Player2) {
        currentPlayer = Player2
    }
    document.getElementById(currentPlayer.name).classList.add("active-player")
}

//If a player gets blackjack then points need to be added 

//After both players have clicked 'stay' whoever has the highest number gets a point

async function theWinnerIs(player) { //await only works if you put 'async' on your function - allows a delay!
    player.score += 1
    drawMessage(player.name + ' Won!')
    //display banner for winner 


    if (player.score >= 5) {
        finishGame(player)
    } else {
        renderScores()
        document.getElementById("player-2").classList.remove("active-player")
        await new Promise(resolve => setTimeout(resolve, 5000))
        Reset()
    }
}

function drawMessage(message) {
    if (message) {
        winnerBannerEl.innerHTML = message
    } else {
        winnerBannerEl.innerHTML = '<i class="fa-solid fa-dice"></i>'
    }
    // banner.append(h1)
    // state.gameElement.append(banner)
}

function finishGame(winner) {
    document.getElementById("newCard").disabled = true;
    document.getElementById("stayNextPlayersTurn").disabled = true;
    let overlayEl = document.getElementById("overlay")
    overlayEl.style.display = "block";
    overlayEl.innerHTML = '<p class="overlay-text">The Winner is ' + winner.name + ' with ' + winner.score + ' points</p>'
}

