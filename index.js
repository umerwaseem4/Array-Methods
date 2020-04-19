const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// fetch api from randomuser
let data = [];

getUsername();
getUsername();
getUsername();


async function getUsername() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    console.log(user);

    const userData = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(userData);
}

// Double All money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    });
    updateDom();
}

// filter Richest
function filterRichest() {
    data = data.filter(user => {
        return user.money > 1000000
    });

    updateDom();
}

// sortMethod
function sortMethod() {
    data = data.sort((a, b) => {
        return b.money - a.money;
    });

    updateDom();
}

// allwealth


function allwealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total: <strong>${moneyFormate(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

function addData(obj) {
    data.push(obj);
    updateDom();
}

function updateDom(providedArr = data) {
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedArr.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');

        element.innerHTML = `<strong>${item.name}</strong> ${moneyFormate(item.money)}`;
        main.appendChild(element);
    });
}

function moneyFormate(num) {
    return "$" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getUsername);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', filterRichest);
sortBtn.addEventListener('click', sortMethod);
calculateWealthBtn.addEventListener('click', allwealth);

