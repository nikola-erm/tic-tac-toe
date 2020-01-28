var isGameOver = false;
var lockCount = 0;

function cellClick(cell) {
	if (lockCount > 0 || isGameOver || cell.innerHTML != '')
		return;
	cell.innerHTML = 'X';
	updateGameStatus();
	if (isGameOver)
		return;
	makeRandomMove();
}

async function makeRandomMove() {
	var cells = [].slice.call(document.getElementsByClassName('cell'), 0);
	var emptyCells = cells.filter(x => x.innerHTML == '');
	if (emptyCells.length > 0) {
		lockCount++;
		await sleep(500);
		lockCount--;
		emptyCells[randInt(emptyCells.length)].innerHTML = 'O';
		updateGameStatus()
	}
}

function randInt(n) {
	return Math.floor(Math.random() * n);
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function newGameClick() {
	isGameOver = false;
	var cells = [].slice.call(document.getElementsByClassName('cell'), 0);
	cells.forEach(c => {
		c.innerHTML = '';
		c.classList.remove('good');
		c.classList.remove('bad');
	});
}

function updateGameStatus() {
	var lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		
		[0, 4, 8],
		[2, 4, 6]
	];
	var cells = [].slice.call(document.getElementsByClassName('cell'), 0);
	lines.forEach(line => {
		if (cells[line[0]].innerHTML == '')
			return;
		var cc = [cells[line[0]], cells[line[1]], cells[line[2]]];
		if (cc[0].innerHTML != cc[1].innerHTML || cc[1].innerHTML != cc[2].innerHTML)
			return;
		isGameOver = true;
		if (cc[0].innerHTML == 'X') {
			cc.forEach(c => c.classList.add('good'));
		} else {
			cc.forEach(c => c.classList.add('bad'));
		}
	});
}