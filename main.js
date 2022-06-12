const gameBoard = document.getElementById("game-board");
const imgs = document.querySelectorAll("#game-board img");


let arrayOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let amountOfNumbers = 12;

let imgsObjects = [];

let flippedImg1 = "";
let flippedImg2 = "";


function startGame() {
	imgs.forEach((img, i) => {
		let randomNumber = Math.floor(Math.random() * amountOfNumbers);
		amountOfNumbers--;
		img.style.order = `${arrayOfNumbers[randomNumber]}`;
		const imgObj = {
			order: arrayOfNumbers[randomNumber],
			src: img.attributes.src.nodeValue,
			index: i,
			matched: false,
		};
		imgsObjects.push(imgObj);
		img.addEventListener("click", flipImg);
		arrayOfNumbers.splice(randomNumber, 1);
		img.src = "cards-imgs/card-back.jpg";
		img.classList.remove("matched");
	});
}

startGame();

function flipImg() {
	for (let imgObj of imgsObjects) {
		if (imgObj.order == this.style.order) {
			this.src = imgObj.src;
			if (flippedImg1) {
				flippedImg2 = imgObj;
				validate(flippedImg1, flippedImg2);
			} else {
				flippedImg1 = imgObj;
			}
		}
	}
}

function validate(img1, img2) {
	let matched = 0;
	if (img1.src == img2.src) {
		imgs[img1.index].classList.add("matched");
		imgs[img2.index].classList.add("matched");
		imgs[img1.index].removeEventListener("click", flipImg);
		imgs[img2.index].removeEventListener("click", flipImg);
		imgsObjects[imgsObjects.indexOf(img1)].matched = true;
		imgsObjects[imgsObjects.indexOf(img2)].matched = true;
		for (let imgObj of imgsObjects) {
			if (imgObj.matched) {
				matched++;
				if (matched == 12) {
					setTimeout(() => {
						endGame();
					}, 1000);
				}
			}
		}
	} else {
		imgs.forEach(img => img.removeEventListener("click", flipImg));
		setTimeout(() => {
			imgs[img1.index].src = "cards-imgs/card-back.jpg";
			imgs[img2.index].src = "cards-imgs/card-back.jpg";
			addEvents();
		}, 1000);
	}
	flippedImg1 = "";
	flippedImg2 = "";
}

function addEvents() {
	imgs.forEach((img, i) => {
		if (!imgsObjects[i].matched) {
			img.addEventListener("click", flipImg);
		}
	});
}

function endGame() {
	imgs.forEach((img) => {
		img.removeEventListener("click", flipImg);
	});
	arrayOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	amountOfNumbers = 12;
	imgsObjects = [];
	flippedImg1 = "";
	flippedImg2 = "";
	startGame();
}