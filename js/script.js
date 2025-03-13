let numJoke = 0;

const emptyJokeList = () => {
    jokesList.innerHTML = "";
    let jokesArray = JSON.parse(localStorage.getItem("jokes"));
    jokesArray = new Array();
    const newData = JSON.stringify(jokesArray);
    localStorage.setItem("jokes", newData);
};

const obtainJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => {
            renderJoke(data.value);
            saveJoke(data.value);
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
    <button type="button" class="bttnDeleteJoke" onclick="eraseJoke(${numJoke})">Eliminar</button>
    `;
    jokesList.appendChild(jokeDiv);
    numJoke += 1;
};

const saveJoke = (phrase) => {
    if (!localStorage.getItem("jokes")) {
        localStorage.jokes = "[]";
    }
    const jokesArray = JSON.parse(localStorage.getItem("jokes"));
    jokesArray.push(phrase);
    const newData = JSON.stringify(jokesArray);
    localStorage.setItem("jokes", newData);
};

const updateJoke = () => {
    numJoke = 0;

    //
    const jokes = document.querySelectorAll(".bttnDeleteJoke");
    //

    jokes.forEach((joke) => {
        joke.setAttribute("onclick", `eraseJoke(${numJoke})`);
        console.log(localStorage.getItem("jokes"));

        numJoke += 1;
    });

    //
};

const eraseJoke = (number) => {
    //
    const divJokes = document.querySelectorAll(".jokeBox");
    //
    const jokeElement = divJokes[number];
    jokeElement.remove();
    //
    const jokesArray = JSON.parse(localStorage.getItem("jokes"));

    //
    const updatedArray = jokesArray.filter(
        (index) => index !== jokesArray[number]
    );

    //
    const newData = JSON.stringify(updatedArray);
    localStorage.setItem("jokes", newData);

    //
    updateJoke();
};

const loadJoke = () => {
    if (!localStorage.getItem("jokes")) {
        localStorage.jokes = "[]";
    } else {
        const jokesArray = JSON.parse(localStorage.getItem("jokes"));
        jokesArray.forEach((joke) => {
            renderJoke(joke);
        });
    }
};

// Variable Elements
const getJoke = document.getElementById("fetchJoke");
const jokesList = document.getElementById("jokeList");
const bttnEraseJokes = document.getElementById("eraseJokes");

// Triggers
getJoke.addEventListener("click", obtainJoke);
bttnEraseJokes.addEventListener("click", emptyJokeList);

loadJoke();
