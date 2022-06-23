
var origBoard;
var gameWon2 = null;
var harde = false;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos =[
                        [0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 8],
                        [0, 3, 6],
                        [1, 4, 7],
                        [2, 5, 8],
                        [0, 4, 8],
                        [6, 4, 2]
                    ]

const cells = document.getElementsByClassName('cell');

function startGame() {
	document.getElementById("playerText").innerHTML = "Tic Tac Toe";
	origBoard = [0,1,2,3,4,5,6,7,8];
    gameWon2 = null;
    preview();
	for (var i = 0; i < cells.length; i++) 
        {
            cells[i].innerText = '';
            cells[i].style.removeProperty('background-color');
            cells[i].addEventListener('click', turnClick);
            
        }
}

function turnClick(square) {                //we passed the click event as a square 
    if (typeof origBoard[square.target.id]== 'number') // so we cant play in the same cell twice
    {
        turn(square.target.id, huPlayer); //ai player gotta take a turn too now
        if (!checkTie() & gameWon2==null )
        {
            cells[bestSpot()].removeEventListener('mouseover',show);
            cells[bestSpot()].removeEventListener('mouseout',not_show);
            setTimeout(function(){turn(bestSpot(),aiPlayer);}, 300);
            //turn(bestSpot(),aiPlayer);
        }
    }

}

function turn(squareId, player) 
{
	origBoard[squareId] = player;                           //how we keep track of the board in the console
	document.getElementById(squareId).innerText = player;   //what we see
    console.log(origBoard);
    let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) 
{   // a is the accumulator, e is the current element and i is the index
	let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    //console.log(plays);
    var gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) 
        {
			gameWon = {index: index, player: player};
			break;
		}
	}
    gameWon2=gameWon;
	return gameWon;
}

function gameOver(gameWon) 
{
	for (let index of winCombos[gameWon.index]) 
    {
		document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "green" : "red";
	}
	for (var i = 0; i < cells.length; i++) 
    {
		cells[i].removeEventListener('click', turnClick, false);
	}
    declareWinner(gameWon.player==huPlayer ? "you win" : "you lose" );

    
}





function preview()
{
    for (var i = 0; i < cells.length; i++) 
    {
        cells[i].addEventListener('mouseover',show);
        cells[i].addEventListener('mouseout',not_show);
        cells[i].onclick=rem;
    }
}


function show()
{
    this.innerHTML="O";
   // this.style.color = "#2d414b";
}
function not_show()
{
    this.innerHTML="";
}
function rem()
{
    this.removeEventListener('mouseout',not_show);
}


function Buttontoggle()
{
  var t = document.getElementById("tobtn");
  if(t.innerHTML=="back to easy mode")
  { easy();
    t.innerHTML="hard mode";}
  else if(t.innerHTML=="hard mode")
  { hard();
    t.innerHTML="back to easy mode";}
}



function easy(){harde=false; startGame();}

function hard(){harde=true; startGame();}

function bestSpot()     //this is where our ai will play 
{
    if (harde==true)
	{return minimax(origBoard, aiPlayer).index;}
    else
    return emptySquares()[0];
}
function emptySquares() 
{
	return origBoard.filter(s => typeof s == 'number');
}




function checkTie() 
{
	if (emptySquares().length == 0 & gameWon2 == null ) //if all cells are full without a winner that means it s a tie
    {
		for (var i = 0; i < cells.length; i++) //tie coloring
        {
			cells[i].style.backgroundColor = "#2d414b" ;
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("that's a tie")
		return true;     // retuen true if tie
	}
	return false;      //return false if no tie
}





function declareWinner(who) 
{
	document.querySelector("#playerText").innerText = who;
}



function minimax(newBoard, player) {
	var availSpots = emptySquares(newBoard);

	if (checkWin(newBoard, player)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}