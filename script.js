const sideA = document.getElementById('sideA');
const sideB = document.getElementById('sideB');
const river = document.getElementById('river');
const boatSpace = document.getElementById('boat');
const crossBtn = document.getElementById('crossBtn');
const moveBoat = document.getElementById('moveBoat');
const menuBtn = document.getElementById('menuBtn');
const ground = document.getElementById('ground');
const restartBtn = document.getElementById('restartBtn');
const gameOverScreen = document.getElementById('gameOverScreen');
const gameOverImg = document.getElementById('gameOverImg');
const gameOverTxt = document.getElementById('gameOverTxt');
const gameOverTitle = document.getElementById('gameOverTitle');

let listA = [
    { title: "grass", img: "./images/grass-bag.webp" },
    { title: "goat", img: "./images/goat.webp" },
    { title: "wolf", img: "./images/wolf.webp" },
];

let listB = [];

let boat = null;
let hasCrossed = false;
let gameOver = false;
let disabled = false;
let menuIsOpen = true;
let firstMove = false;

function setGameOver(status) {
    gameOverImg.innerHTML = ''

    if (status === "wolf") {
        gameOverTitle.innerText = 'Você perdeu!';
        generateImages(gameOverImg, "./images/lose-wolf.webp", "Wolf running after goat");
        gameOverTxt.innerText = 'O lobo comeu o bode!';
    }

    if (status === "goat") {
        gameOverTitle.innerText = 'Você perdeu!';
        generateImages(gameOverImg, "./images/lose-goat.webp", "Goat eating veggies");
        gameOverTxt.innerText = 'O bode comeu os vegetais!';
    }

    if (status === "win") {
        gameOverTitle.innerText = 'Parabéns!';
        generateImages(gameOverImg, "./images/win.webp", "Farmer, goat, wolf and veggies together");
        gameOverTxt.innerText = 'Você venceu o desafio!';
    }

    setTimeout(() => {
        gameOverScreen.classList.add('displayFlex');
    }, 2000);
}

function restart() {
    listA = [
        { title: "grass", img: "./images/grass-bag.webp" },
        { title: "goat", img: "./images/goat.webp" },
        { title: "wolf", img: "./images/wolf.webp" },
    ];

    listB = [];

    boat = null;
    hasCrossed = false;
    gameOver = false;
    disabled = false;
    gameOverScreen.classList.remove('displayFlex');
    moveBoat.classList.remove("moveRight");

    placeItems()
}

function generateImages (element, img, title) {
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", img);
    imgElement.setAttribute("alt", title);
    imgElement.setAttribute("class", "item");
    imgElement.addEventListener("click", () => {
        addToBoat(title);
    });
    element.appendChild(imgElement);
}

restartBtn.addEventListener("click", restart);

function checkElements() {

    const checkList = (list) => {

        const hasWolf = list.some(obj => obj.title === "wolf");
        const hasGoat = list.some(obj => obj.title === "goat");
        const hasGrass = list.some(obj => obj.title === "grass");

        if (listB.length === 3) {
            if (hasWolf && hasGoat && hasGrass) {
                gameOver = true;
                setGameOver("win");
                return
            }
        }

        if (hasWolf && hasGoat) {
            gameOver = true;
            setGameOver("wolf");
            return
        }

        if (hasGoat && hasGrass) {
            gameOver = true;
            setGameOver("goat");
            return
        }
    }

    if (listB.length === 3) checkList(listB);

    if (listA.length === 2 && hasCrossed) checkList(listA);

    if (listB.length === 2 && !hasCrossed) checkList(listB);
}

function addToBoat(keyWord) {
    if (gameOver || disabled) return

    if (boat) {
        if (boat.title === keyWord) {
            hasCrossed ? listB.push(boat) : listA.push(boat)
            boat = null;
            return placeItems()
        }

        hasCrossed ? listB.push(boat) : listA.push(boat)
    }

    if (!hasCrossed) {
        for (let i = 0; i < listA.length; i++) {
            if (listA[i].title === keyWord) {
                boat = listA[i];
                listA.splice(i, 1);
                break
            }
        }
    } else {
        for (let i = 0; i < listB.length; i++) {
            if (listB[i].title === keyWord) {
                boat = listB[i];
                listB.splice(i, 1);
                break
            }
        }
    }

    placeItems()
}

function placeItems() {

    sideA.innerHTML = '';
    sideB.innerHTML = '';
    boatSpace.innerHTML = '';


    for (let i = 0; i < listA.length; i++) {
        generateImages(sideA, listA[i].img, listA[i].title);
    }

    for (let i = 0; i < listB.length; i++) {
        generateImages(sideB, listB[i].img, listB[i].title);
    }

    if (boat) {
        generateImages(boatSpace, boat.img, boat.title);
    }
}

function transferItems() {
    if (hasCrossed && boat) {
        listB.push(boat);
    }

    if (!hasCrossed && boat) {
        listA.push(boat);
    }

    boat = null;
    setTimeout(() => {
        placeItems();
        disabled = false;
    }, 2000);

    checkElements()
}

crossBtn.addEventListener("click", function () {
    if (gameOver || disabled) return

    disabled = true;
    hasCrossed = !hasCrossed;

    if (!firstMove) closeMenu();
    firstMove = true;

    if (hasCrossed) {
        moveBoat.classList.add("moveRight");
    } else {
        moveBoat.classList.remove("moveRight");
    }

    transferItems()
});

function closeMenu() {
    menuIsOpen = !menuIsOpen;

    if (menuIsOpen) {
        menuBtn.classList.remove('defaultMenu');
        ground.classList.remove('menuColapse');
    } else {
        menuBtn.classList.add('defaultMenu');
        ground.classList.add('menuColapse');
    }
}

menuBtn.addEventListener("click", function () {
    firstMove = true;
    closeMenu()
})

placeItems()
