const sideA = document.getElementById('sideA');
const sideB = document.getElementById('sideB');
const river = document.getElementById('river');
const boatSpace = document.getElementById('boat');
const crossBtn = document.getElementById('crossBtn');
const moveBoat = document.getElementById('moveBoat');

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

function setGameOver(message) {
    setTimeout(() => {
        alert(message);
    }, 2000);
}

function checkElements() {

    const checkList = (list) => {

        const hasWolf = list.some(obj => obj.title === "wolf");
        const hasGoat = list.some(obj => obj.title === "goat");
        const hasGrass = list.some(obj => obj.title === "grass");

        if (listB.length === 3) {
            if (hasWolf && hasGoat && hasGrass) {
                gameOver = true;
                setGameOver("Parabéns! Você venceu.");
                return
            }
        }

        if (hasWolf && hasGoat) {
            gameOver = true;
            setGameOver("Você perdeu! O lobo comeu o bode.");
            return 
        }

        if (hasGoat && hasGrass) {
            gameOver = true;
            setGameOver("Você perdeu! O bode comeu a grama.");
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
            if (!hasCrossed) {
                listA.push(boat);
            } else {
                listB.push(boat);
            }

            boat = null;
            return placeItems()
        }

        listA.push(boat);
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

    const generateImages = (element, img, title) => {
        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", img);
        imgElement.setAttribute("alt", title);
        imgElement.setAttribute("class", "item");
        imgElement.addEventListener("click", () => {
            addToBoat(title);
        });
        element.appendChild(imgElement);
    }

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

    if (hasCrossed) {
        moveBoat.classList.add("moveRight");
    } else {
        moveBoat.classList.remove("moveRight");
    }

    transferItems()
})

placeItems()
