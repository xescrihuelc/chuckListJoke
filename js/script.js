const obtainJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => {
            renderJoke(data.value);
        })
        .catch((error) => {
            console.error("ERROR:", error);
            alert("ERROR fetching the joke");
        });
};

const renderJoke = (joke) => {
    const jokeDiv = document.createElement("div");
    jokeDiv.classList.add("jokeBox");
    jokeDiv.innerHTML = `
    <p class="joke">${joke}</p>
    <button type="button" class="bttnDeleteJoke">Eliminar</button>
    `;
    jokesList.appendChild(jokeDiv);
};

// const saveJoke = (phrase) => {};
// const loadJoke = (phrase) => {}

// Variable Elements
const getJoke = document.getElementById("fetchJoke");
const jokesList = document.getElementById("jokeList");

// Triggers
getJoke.addEventListener("click", obtainJoke);
