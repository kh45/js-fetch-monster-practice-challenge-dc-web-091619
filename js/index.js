const createMon = document.getElementById('create-form');
let currentPage = 1
let APIUrl = "http://localhost:3000/monsters?_limit=50&_page="
const backBtn = document.getElementById('back');
const fwdBtn = document.getElementById('forward');


document.addEventListener('DOMContentLoaded', () => {
    fetch(`${APIUrl}${currentPage}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(json){
        json.forEach((monster) => renderMonsters(monster))
    });
    
    createMon.addEventListener('submit', createMonster)
    backBtn.addEventListener('click', moveBack);
    fwdBtn.addEventListener('click', moveFwd);
})


function renderMonsters(monster) {
    const main = document.getElementById("monster-container");
    const monst_div = document.createElement('div');
    const monst_name = document.createElement('h2');
    const monst_age = document.createElement('h4');
    const monst_desc = document.createElement('p');
    monst_name.innerHTML = monster.name;
    monst_age.innerHTML = `Age: ${monster.age}`;
    monst_desc.innerHTML = `Bio: ${monster.description}`;
    monst_div.appendChild(monst_name);
    monst_div.appendChild(monst_age);
    monst_div.appendChild(monst_desc);
    main.appendChild(monst_div);

}

function createMonster() {
    console.log("hello?")
    event.preventDefault()
    const new_name = document.getElementById('new_monst_name').value;
    const new_age = document.getElementById('new_monst_age').value;
    const new_desc = document.getElementById('new_monst_desc').value;


    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: new_name,
            age: new_age,
            description: new_desc
        })
    }

    fetch("http://localhost:3000/monsters", configObj)
    .then(function(response) {
        return response.json()
    })
    .then(function(monster) {
        renderMonsters(monster)
    })

    createMon.reset()
}

function moveBack() {
    if (currentPage > 1) {
        const main = document.getElementById("monster-container").innerHTML = "";
        currentPage -= 1;
        fetch(`${APIUrl}${currentPage}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            json.forEach((monster) => renderMonsters(monster))
        })
    }
}

function moveFwd() {
    currentPage += 1;
    const main = document.getElementById("monster-container").innerHTML = "";
    fetch(`${APIUrl}${currentPage}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        json.forEach((monster => renderMonsters(monster)))
    })
}

