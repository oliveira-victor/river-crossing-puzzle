const sideA = document.getElementById('sideA');
const sideB = document.getElementById('sideB');
const river = document.getElementById('river');
const boatSpace = document.getElementById('boat');
const crossBtn = document.getElementById('crossBtn');

let listA = [
    { title: "grass", img: "https://cdn-icons-png.flaticon.com/512/5367/5367613.png" },
    { title: "goat", img: "https://cdn2.iconfinder.com/data/icons/farm-filled-outline-1/64/goat-animal-mammal-farm-512.png" },
    { title: "wolf", img: "https://cdn-icons-png.flaticon.com/512/2273/2273646.png" },
];

let listB = [];

let boat = null;
let hasCrossed = false;
let gameOver = false;
const solution = listA;

function checkElements() {

    const checkList = (list) => {

        const hasWolf = list.some(obj => obj.title === "wolf");
        const hasGoat = list.some(obj => obj.title === "goat");
        const hasGrass = list.some(obj => obj.title === "grass");

        if (hasWolf && hasGoat) {
            gameOver = true;
            return console.log(`You lose. The wolf ate the goat`)
        }

        if (hasGoat && hasGrass) {
            gameOver = true;
            return console.log(`You lose. The goat ate the grass`)
        }
    }

    if (listA.length === 2 && hasCrossed) checkList(listA);

    if (listB.length === 2 && !hasCrossed) checkList(listB);

    if (listB === solution) {
        return console.log("Congrats! You won.")
    }

    console.log("End of checking");
}

function addToBoat(keyWord) {
    if (gameOver) return

    if (boat) {
        if (boat.title === keyWord) {
            listA.push(boat);
            boat = null;

            return placeItems()
        }

        listA.push(boat);
    }

    for (let i = 0; i < listA.length; i++) {
        if (listA[i].title === keyWord) {
            boat = listA[i];
            listA.splice(i, 1);
            break
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
        boat = null;
        setTimeout(placeItems, 2000);
    }

    checkElements()
}

crossBtn.addEventListener("click", function() {
    if (gameOver) return

    hasCrossed = !hasCrossed;

    if (hasCrossed) {
        river.classList.add("crossRight");
    } else {
        river.classList.remove("crossRight");
    }

    transferItems()
})

placeItems()
