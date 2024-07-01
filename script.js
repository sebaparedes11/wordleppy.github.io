let intentos = 6;
let palabra= null;

const apiUrl = "https://api.wordnik.com/v4/words.json/randomWord?api_key=YOUR_API_KEY";
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const grid = document.getElementById("grid");
 
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data && data.word) {
      palabra = data.word.toUpperCase();
    } else {
      console.error("Error: No word returned from API");
      palabra = "DEFAULT_WORD"; 
    }
  })
  .catch(error => {
    console.error("Error al obtener palabra aleatoria:", error);
    palabra = "DEFAULT_WORD"; 
  });


function leerIntento() {
  const intento = input.value.toUpperCase();
  if (intento.length !== 5) {
    alert("Ingrese una palabra de 5 letras");
    return;
  }
  return intento;
}

function intentar() {
  const intento = leerIntento();
  if (!palabra) {
    console.error("Error: La palabra no esta definida.");
    return;
  }
  if (intento === palabra) {
    terminar("<h1>GANASTE!😀</h1>");
    return;
  }
  const row = document.createElement("div");
  row.className = "row";
  const intentoUpper = intento.toUpperCase().slice(0, 5);

  for (let i = 0; i < 5; i++) {
    const letter = document.createElement("span");
    letter.className = "letter";
    if (intentoUpper[i] === palabra.toUpperCase()[i]) {
      letter.style.backgroundColor = "'#79b851";
    } else if (palabra.toUpperCase().includes(intentoUpper[i])) {
      letter.style.backgroundColor = "#f3c237";
    } else {
      letter.style.backgroundColor = "#a4aec4";
    }
    letter.textContent = intento[i];
    row.appendChild(letter);
  }
  grid.appendChild(row);
  intentos--;
  if (intentos === 0) {
    terminar("<h1>PERDISTE!😖</h1>");
  }
}

function terminar(mensaje) {
  input.disabled = true;
  button.disabled = true;
  const contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje.replace("😀", "&#128516;").replace("😖", "&#128542;");
}

button.addEventListener("click", intentar);




 

