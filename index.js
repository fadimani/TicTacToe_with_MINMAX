
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
    console.log(plays);
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




//************************************************************************************** */
/*
for (var i = 0; i < cells.length; i++) 
{
cells[i].addEventListener('mouseover',function(){show(i);});
cells[i].addEventListener('mouseout',not_show0);
console.log(i);
}




//onmouseover="this.innerHTML = 'O';" 
//onmouseout="this.innerHTML = '';" 
//onclick="this.removeEventListener('mouseout',function(){this.innerHTML = '';})"


cells[0].addEventListener('mouseover',function(){show(0);});
cells[0].addEventListener('mouseout',not_show0);
cells[0].onclick = function(){cells[0].removeEventListener('mouseout',not_show0)};


cells[1].addEventListener('mouseover',function(){show(1);});
cells[1].addEventListener('mouseout',not_show1);
cells[1].onclick = function(){cells[1].removeEventListener('mouseout',not_show1)};


cells[2].addEventListener('mouseover',function(){show(2);});
cells[2].addEventListener('mouseout',not_show2);
cells[2].onclick = function(){cells[2].removeEventListener('mouseout',not_show2)};


cells[3].addEventListener('mouseover',function(){show(3);});
cells[3].addEventListener('mouseout',not_show3);
cells[3].onclick = function(){cells[3].removeEventListener('mouseout',not_show3)};


cells[4].addEventListener('mouseover',function(){show(4);});
cells[4].addEventListener('mouseout',not_show4);
cells[4].onclick = function(){cells[4].removeEventListener('mouseout',not_show4)};


cells[5].addEventListener('mouseover',function(){show(5);});
cells[5].addEventListener('mouseout',not_show5);
cells[5].onclick = function(){cells[4].removeEventListener('mouseout',not_show4)};


cells[6].addEventListener('mouseover',function(){show(6);});
cells[6].addEventListener('mouseout',not_show6);
cells[6].onclick = function(){cells[5].removeEventListener('mouseout',not_show5)};


cells[7].addEventListener('mouseover',function(){show(7);});
cells[7].addEventListener('mouseout',not_show7);
cells[7].onclick = function(){cells[6].removeEventListener('mouseout',not_show6)};


cells[8].addEventListener('mouseover',function(){show(8);});
cells[8].addEventListener('mouseout',not_show8);
cells[8].onclick = function(){cells[7].removeEventListener('mouseout',not_show7)};

*/

function not_show0()
{
    cells[0].innerHTML="";
}
function not_show1()
{
    cells[1].innerHTML="";
}
function not_show2()
{
    cells[2].innerHTML="";
}
function not_show3()
{
    cells[3].innerHTML="";
}
function not_show4()
{
    cells[4].innerHTML="";
}
function not_show5()
{
    cells[5].innerHTML="";
}
function not_show6()
{
    cells[6].innerHTML="";
}
function not_show7()
{
    cells[7].innerHTML="";
}
function not_show8()
{
    cells[8].innerHTML="";
}



function show(u)
{
    cells[u].innerHTML="O";
}

//************************************************************************************** */


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