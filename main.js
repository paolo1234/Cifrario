/*
  Funzione modulo due numeri interi
*/
const mod = (a, b) => {
  let r = a % b;
  return (r < 0) ? r + b : r
};

/*
  Definisco gli elementi del DOM 
*/
const keywordInputText = document.querySelector('#keyword');
const cryptedMessageInputText = document.querySelector('#message');
const cipherGridDiv = document.querySelector('#cifrario');
const outputMessageText = document.querySelector('#outputMessage');
const setEncryptBtn = document.querySelector('#setCrypta');
const setDecryptBtn = document.querySelector('#setDecrypta');

const create2DMatrix = rows => { let arr = []; for (let i = 0; i < rows; i++) arr[i] = []; return arr; };

/*
  Variabili di stato
*/

const state = {
  cryptMode: true,
  keyword: '',
  message: '',
  cryptedMessage: '',
  decryptedMessage: '',
  normalizedKeyword() {
    return this.keyword
      .replace(/[\W0-9]+/g, '')  // Rimuove gli spazi
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '')  // Rimuove accentate
      .toLowerCase();
  },
  resetMessage() {
    this.message = '';
    this.keyword = '';
    this.decryptedMessage = '';
    this.cryptedMessage = '';
  },
  resetFields() {
    keywordInputText.value = '';
    cryptedMessageInputText.value = '';
    outputMessageText.value = '';
  }
};

/*
  Ritorna true se il carattere non è già presente all'interno della matrice.  
*/
const charNotAlreadyExists = (matrix, character) => {
  for (let row of matrix) {
    if (row.includes(character)) return 0;
  }
  return 1;
}

/*
  Ritorna un vettore di digrafi necesari per criptare il messaggio
*/
const createBigramsFromText = (text) => {
  let outputText = text
    .replace(/ /g, '')  // Rimuove gli spazi
    .normalize("NFD").replace(/[\u0300-\u036f]/g, '')  // Rimuove accentate
    .toUpperCase();
  // Se ci sono due lettere uguali consecutive devo spezzarle con un X
  for (let i = 0; i < outputText.length; i++) {
    if (outputText.charAt(i) === outputText.charAt(i + 1)) {
      outputText = outputText.slice(0, i + 1) + 'X' + outputText.slice(i + 1)
    }
  }
  // Se il numero di cifre non è pari allora aggiungo una X
  if (outputText.length % 2 !== 0) outputText += 'X';
  // Divido la stringa in piccola chunk da 2
  return outputText.match(/.{1,2}/g);
};

const makeGrid = (keyword) => {

  let grid = create2DMatrix(5);
  let alphabetIndex = 0;
  let keywordIndex = 0;
  const alphabet = "abcdefghiklmnopqrstuvwxyz";

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let tempAlphabetChar = alphabet.charAt(alphabetIndex);
      let tempKeywordChar = keyword.charAt(keywordIndex);
      if (keywordIndex < keyword.length) {
        if (charNotAlreadyExists(grid, tempKeywordChar)) {
          grid[i][j] = tempKeywordChar;
        } else {
          j--;
        }
        keywordIndex++;
      } else if (alphabetIndex < alphabet.length) {
        if (charNotAlreadyExists(grid, tempAlphabetChar)) {
          grid[i][j] = tempAlphabetChar;
        } else {
          j--;
        }
        alphabetIndex++;
      }
    }
  }
  return grid;
};


const drawGrid = (grid) => {
  cipherGridDiv.innerHTML = "";
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      let char = document.createElement('span');
      char.setAttribute('class', 'cella');
      char.innerText = grid[i][j];
      cipherGridDiv.appendChild(char);
    }
  }
}

const findIndex = (grid, index, digrafo) => {
  let posI, posJ;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (digrafo.charAt(index).toLowerCase() == grid[i][j]) {
        posI = i;
        posJ = j;
      }
    }
  }
  return [posI, posJ];
};

const encrypt = (grid, input) => {

  let str = "";

  let digrafi = createBigramsFromText(input);

  if (digrafi === null || digrafi === undefined) return;
  digrafi.forEach((digrafo) => {

    let [posI1, posJ1] = findIndex(grid, 0, digrafo);
    let [posI2, posJ2] = findIndex(grid, 1, digrafo);

    //CONTROLLO STESSA RIGA
    if (posI1 == posI2) {
      str += grid[posI1][(posJ1 + 1) % 5];
      str += grid[posI2][(posJ2 + 1) % 5];
      //CONTROLLO STESSA COLONNA
    } else if (posJ1 == posJ2) {
      str += grid[(posI1 + 1) % 5][posJ1];
      str += grid[(posI2 + 1) % 5][posJ2];
    }
    //DIVERSI
    else {
      str += grid[posI1][posJ2];
      str += grid[posI2][posJ1];
    }

  });
  state.cryptedMessage = str;
};

const decrypt = (grid, input) => {

  let str = "";

  let digrafi = createBigramsFromText(input);

  if (digrafi === null || digrafi === undefined) return;
  digrafi.forEach((digrafo) => {

    let [posI1, posJ1] = findIndex(grid, 0, digrafo);
    let [posI2, posJ2] = findIndex(grid, 1, digrafo);

    //CONTROLLO STESSA RIGA
    if (posI1 == posI2) {
      str += grid[posI1][mod(posJ1 - 1, 5)];
      str += grid[posI2][mod(posJ2 - 1, 5)];
      //CONTROLLO STESSA COLONNA
    } else if (posJ1 == posJ2) {
      str += grid[mod(posI1 - 1, 5)][posJ1];
      str += grid[mod(posI2 - 1, 5)][posJ2];
    }
    //DIVERSI
    else {
      str += grid[posI1][posJ2];
      str += grid[posI2][posJ1];
    }
  });
  state.decryptedMessage = str.replace(/x/gi, "");
};

const lifeCycle = () => {
  const keyword = state.normalizedKeyword();
  const grid = makeGrid(keyword);
  drawGrid(grid);
  const message = state.message;
  if (state.cryptMode) {
    encrypt(grid, message);
    outputMessageText.value = state.cryptedMessage;
  }
  else {
    decrypt(grid, message);
    outputMessageText.value = state.decryptedMessage;
  }
};


const getKeywordFromInput = ({ target }) => {  // maybe key
  state.keyword = target.value;
  lifeCycle();
}

const getCryptedMessageFromInput = ({ target }) => {
  state.message = target.value;
  lifeCycle();
}

const toggleCryptMode = () => {
  setDecryptBtn.classList.toggle('active');
  setEncryptBtn.classList.toggle('active');
  state.resetMessage();
  state.resetFields();
}

const setDecryptMode = () => {
  toggleCryptMode();
  state.cryptMode = false;
}
const setEncryptMode = () => {
  toggleCryptMode();
  state.cryptMode = true;
}

setEncryptBtn.addEventListener('click', setEncryptMode);
setDecryptBtn.addEventListener('click', setDecryptMode);
keywordInputText.addEventListener('change', getKeywordFromInput);
keywordInputText.addEventListener('keyup', getKeywordFromInput);
cryptedMessageInputText.addEventListener('change', getCryptedMessageFromInput);
cryptedMessageInputText.addEventListener('keyup', getCryptedMessageFromInput);