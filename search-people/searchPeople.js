import peopleFromJSON from "../people.json" assert { type: "json" };

const searchInput = document.getElementById("search-input");
const alphaBet = document.getElementById("sort-alphabet");
const address = document.getElementById("sort-address");

let peopleData = [];

searchInput.addEventListener(
    "input",
    debounce((event) => {
        searchPeople(event.target.value);

        renderListPeoples(peopleData);
    }, 200)
);

alphaBet.addEventListener("click", () => {
    sortByAlphaBet(peopleData);

    renderListPeoples(peopleData);
});

address.addEventListener("click", () => {
    sortByAddress(peopleData);

    renderListPeoples(peopleData);
});

function searchPeople(textInput) {
    peopleData = [];

    const formatTextInput = textInput.toLowerCase();

    peopleFromJSON.forEach((people) => {
        if (
            people.name.toLowerCase().includes(formatTextInput) ||
            people.category.toLowerCase().includes(formatTextInput) ||
            people.address.toLowerCase().includes(formatTextInput)
        ) {
            peopleData.push(people);
        }
    });
}

function renderListPeoples(peoplesData) {
    const parent = document.getElementById("list-peoples");

    parent.textContent = "";

    peoplesData.forEach((item) => {
        const newPeople = document.createElement("div");

        newPeople.innerHTML = `<div class="people-item">
        <p class="people-info">Name: ${item.name}</p>
        <p class="people-info">Address: ${item.address}</p>
        <p class="people-info">Category: ${item.category}</p>
    </div>`;

        parent.append(newPeople);
    });
}

function debounce(func, delay) {
    let timeout;

    return function executedFunc(...args) {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
            timeout = null;
        }, delay);
    };
}

function sortByAlphaBet(array) {
    array.sort(function (a, b) {
        const nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            //sort string ascending
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }
        return 0; //default return value (no sorting)
    });
}

function sortByAddress(array) {
    console.log(array);
    array.sort(function (a, b) {
        const addressA = a.address.toLowerCase().split("");
        const addressB = b.address.toLowerCase().split("");

        let isSame = 1;

        addressA.forEach((item) => {
            if (addressB.includes(item)) isSame = -1;
        });

        return isSame;
    });
}
