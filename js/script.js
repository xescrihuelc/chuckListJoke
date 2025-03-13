// Variable para marcar inicialmente posicion
// de Array de los chistes
let numJoke = 0;

// Función para obtener el chiste de la API
const obtainJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => {
            // Al obtener respuesta de la API
            // invocará a estas dons funciones
            renderJoke(data.value);
            saveJoke(data.value);
        })
        .catch((error) => {
            console.error("ERROR:", error);
            alert("ERROR fetching the joke");
        });
};

// Función que añade el chiste en la página
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

// Funcion para guardar y actualizar chistes en localStorage
const saveJoke = (phrase) => {
    if (!localStorage.getItem("jokes")) {
        localStorage.jokes = "[]";
    }
    const jokesArray = JSON.parse(localStorage.getItem("jokes"));
    jokesArray.push(phrase);
    const newData = JSON.stringify(jokesArray);
    localStorage.setItem("jokes", newData);
};

// Llama una función para actualizar los onclick()
// de los elementos button de clase bttnDeleteJoke
const updateJoke = () => {
    numJoke = 0;

    const jokes = document.querySelectorAll(".bttnDeleteJoke");

    jokes.forEach((joke) => {
        joke.setAttribute("onclick", `eraseJoke(${numJoke})`);
        console.log(localStorage.getItem("jokes"));
        numJoke += 1;
    });
};

// Función para eliminar un chiste de
// la página y del localStorage
const eraseJoke = (number) => {
    // Eliminar chiste de la página
    const divJokes = document.querySelectorAll(".jokeBox");
    const jokeElement = divJokes[number];
    jokeElement.remove();

    // Eliminar chiste del array de chistes del localStorage
    const jokesArray = JSON.parse(localStorage.getItem("jokes"));
    const updatedArray = jokesArray.filter(
        (index) => index !== jokesArray[number]
    );
    const newData = JSON.stringify(updatedArray);
    localStorage.setItem("jokes", newData);

    // Llama una función para actualizar los onclick()
    // de los elementos button de clase bttnDeleteJoke
    updateJoke();
};

// Función para vaciar la ul 'jokeList'
// y vacía el array de chistes del localStorage
const emptyJokeList = () => {
    jokesList.innerHTML = "";
    let jokesArray = JSON.parse(localStorage.getItem("jokes"));
    jokesArray = new Array();
    const newData = JSON.stringify(jokesArray);
    localStorage.setItem("jokes", newData);
};

// Función que carga y muestras los
// chistes almacenado en localStorage
// al cargar la página.
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
