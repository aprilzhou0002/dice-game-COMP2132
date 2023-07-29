let playerTotalScore = 0;
let computerTotalScore = 0;
let rollCount = 0;
let burgerImageIndex = 1;
let burgerEatingImageIndex = 1;
let burgerMakingImageIndex = 1;
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
let modalContent = document.querySelector('.modal-content');


span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function animateBurgerImages() {
    let burger1 = document.getElementById('burger1');
    let burger2 = document.getElementById('burger2');

    burger1.src = `images/burger-${burgerImageIndex}.png`;
    burger2.src = `images/burger-${burgerImageIndex}.png`;

    burgerImageIndex = burgerImageIndex < 19 ? burgerImageIndex + 1 : 1;
    setTimeout(function() {
        requestAnimationFrame(animateBurgerImages);
    }, 100);
}

animateBurgerImages();

function calculateScore(dice1, dice2) {
    if (dice1 === 1 || dice2 === 1) {
        return 0;
    } else if (dice1 === dice2) {
        return (dice1 + dice2) * 2;
    } else {
        return dice1 + dice2;
    }
}

function rollDice() {
    if (rollCount >= 3) {
        return;
    }

    let playerDice1 = Math.ceil(Math.random() * 6);
    let playerDice2 = Math.ceil(Math.random() * 6);
    let computerDice1 = Math.ceil(Math.random() * 6);
    let computerDice2 = Math.ceil(Math.random() * 6);

    let playerRoundScore = calculateScore(playerDice1, playerDice2);
    let computerRoundScore = calculateScore(computerDice1, computerDice2);

    playerTotalScore += playerRoundScore;
    computerTotalScore += computerRoundScore;
    rollCount++;

    document.getElementById('playerDice1').style.display = 'inline-block';
    document.getElementById('playerDice1').src = `images/dice-${playerDice1}.png`;
    document.getElementById('playerDice2').style.display = 'inline-block';
    document.getElementById('playerDice2').src = `images/dice-${playerDice2}.png`;
    document.getElementById('playerRoundScore').textContent = `Round Score: ${playerRoundScore}`;
    document.getElementById('playerTotalScore').textContent = `Total Score: ${playerTotalScore}`;

    document.getElementById('computerDice1').style.display = 'inline-block';
    document.getElementById('computerDice1').src = `images/dice-${computerDice1}.png`;
    document.getElementById('computerDice2').style.display = 'inline-block';
    document.getElementById('computerDice2').src = `images/dice-${computerDice2}.png`;
    document.getElementById('computerRoundScore').textContent = `Round Score: ${computerRoundScore}`;
    document.getElementById('computerTotalScore').textContent = `Total Score: ${computerTotalScore}`;

    if (rollCount === 3) {
        if (playerTotalScore > computerTotalScore) {
            document.getElementById('winner').textContent = "Congrats! You win the burger!";
            modalContent.classList.add('player-wins');
            $('#burgerMakingImage').show(); 
            burgerMakingImageIndex = 1;
            animateBurgerMakingImages();
        } else if (playerTotalScore < computerTotalScore) {
            document.getElementById('winner').textContent = "Oops! You lose the burger ...";
            modalContent.classList.add('player-loses');
            $('#burgerImage').show();
            burgerEatingImageIndex = 1;
            animateBurgerEatingImages();
        } else {
            document.getElementById('winner').textContent = "It's a draw! Let's play again.";
            document.getElementById('drawImage').style.display = 'block';
        }
        modal.style.display = "block";
      }
}

function animateBurgerEatingImages() {
    $('#burgerImage').attr('src', `images/burger-eating-${burgerEatingImageIndex}.jpg`);

    if (burgerEatingImageIndex < 28) {
        burgerEatingImageIndex++;
        setTimeout(animateBurgerEatingImages, 100);
    }
}

function animateBurgerMakingImages() {
    $('#burgerMakingImage').attr('src', `images/burger-making-${burgerMakingImageIndex}.jpg`);

    if (burgerMakingImageIndex < 21) {
        burgerMakingImageIndex++;
        setTimeout(animateBurgerMakingImages, 100);
    }
}

function resetGame() {
    $('#burgerImage').hide();
    burgerEatingImageIndex = 1; 
    $('#burgerMakingImage').hide();
    burgerMakingImageIndex = 1;
    document.getElementById('drawImage').style.display = 'none';

    playerTotalScore = 0;
    computerTotalScore = 0;
    rollCount = 0;

    modal.style.display = "none";
    modalContent.classList.remove('player-wins', 'player-loses');

    document.getElementById('playerDice1').style.display = 'none';
    document.getElementById('playerDice2').style.display = 'none';
    document.getElementById('playerDice1').src = '';
    document.getElementById('playerDice2').src = '';
    document.getElementById('playerRoundScore').textContent = "Round Score: ";
    document.getElementById('playerTotalScore').textContent = "Total Score: ";

    document.getElementById('computerDice1').style.display = 'none';
    document.getElementById('computerDice2').style.display = 'none';
    document.getElementById('computerDice1').src = '';
    document.getElementById('computerDice2').src = '';
    document.getElementById('computerRoundScore').textContent = "Round Score: ";
    document.getElementById('computerTotalScore').textContent = "Total Score: ";

    document.getElementById('winner').textContent = "";
}

document.getElementById('rollBtn').addEventListener('click', rollDice);
document.getElementById('resetBtn').addEventListener('click', resetGame);

$('#arrow').on('click', function() {
    $('#instructions').slideToggle();
    $(this).toggleClass("fa-chevron-down fa-chevron-up");
});


