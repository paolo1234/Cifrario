let M;
let Mode = true;// True: crypta -- False: Decrypta


function copy() {
  let copyText = document.getElementById("cifrato");

  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand("copy");

}

const Matrix = rows => { let arr = []; for (let i = 0; i < rows; i++) arr[i] = []; return arr; };

function checkC(c, M) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++)
      if (c == " " || M[i][j] == c || !c.match(/[a-z]/i)) return true;
  }
  return false;
}

function DrawMatrix(p) {
  M = Matrix(5);

  let a = 0,
    k = 0;

  const al = "abcdefghiklmnopqrstuvwxyz";

  for (i = 0; i < M.length; i++) {
    for (j = 0; j < M.length; j++) {
      if (a < p.length) {
        let ca = p.charAt(a);
        if (!checkC(ca, M)) {
          M[i][j] = ca;
        } else {
          j--;
        }
        a++;
      } else {
        if (k < al.length) {
          let ce = al.charAt(k);
          if (!checkC(ce, M)) {
            M[i][j] = ce;
          } else {
            j--;
          }
          k++;
        }
      }
    }
  }

  return M;
}

function PrintMatrix(M) {
  document.getElementById("cifrario").innerHTML = "";
  for (i = 0; i < M.length; i++) {
    for (j = 0; j < M.length; j++)
      document.getElementById("cifrario").innerHTML +=
        "<span class='cella'>" + M[i][j] + " </span>";
  }
}

function StampaDigrafi(v) {
  document.getElementById("digrafo").innerHTML = "";
  v.forEach((value) => {
    document.getElementById("digrafo").innerHTML += value.concat("/");
  });
}

function StessaColonna(c, r1, r2) {
  if (Mode) {
    if (r2 == M.length - 1) {
      return `${M[r1 + 1][c]}${M[0][c]}`;
    }
    // else if (r1 == M.length - 2) {
    //   return `${M[r1 + 1][c]}${M[0][c]}`;
    // }
    else if (r1 == M.length - 1) {
      return `${M[0][c]}${M[r2 + 1][c]}`;
    } else {
      return `${M[r1 + 1][c]}${M[r2 + 1][c]}`;
    }
  } else {
    if (r1 == 0) return `${M[M.length - 1][c]}${M[r2 - 1][c]}`;
    else if (r2 == 0) return `${M[r1 - 1][c]}${M[M.length - 1][c]}`;

    else return `${M[r1 - 1][c]}${M[r2 - 1][c]}`;
  }
}


function StessaRiga(r, c1, c2) {
  if (Mode) {
    if (c2 == M.length - 1) {
      return `${M[r][c1 + 1]}${M[r][0]}`;
    }
    // else if (c1 == M.length - 2) {
    //   return `${M[r][c1 + 1]}${M[r][1]}`;
    else if (c1 == M.length - 1) {
      return `${M[r][0]}${M[r][c2 + 1]}`;
    }
    else {
      return `${M[r][c1 + 1]}${M[r][c2 + 1]}`;
    }
  } else if (Mode == false) {
    if (c1 == M.length - 1 && c2 == 0) {
      return `${M[r][c1 - 1]}${M[r][c1]}`;
    } else if (c2 == 0) {
      return `${M[r][c1 - 1]}${M[r][M.length - 1]}`;
    }
    else if (c1 == 0) {
      return `${M[r][M.length - 1]}${M[r][c2 - 1]}`;
    }
    else {
      return `${M[r][c1 - 1]}${M[r][c2 - 1]}`;
    }
  }
}

function Diversi(posI1, posI2, posJ1, posJ2) {
  return `${M[posI1][posJ2]}${M[posI2][posJ1]}`;
}

function validateP(input) {
  let regex = /[^a-z ]/gi;
  input.value = input.value.replace(regex, "");
  const p = input.value.toLocaleLowerCase();
  const M = DrawMatrix(p);
  PrintMatrix(M);
}

const setCrypta = () => {
  document.getElementById("setCrypta").className = "active";
  document.getElementById("setDecrypta").className = "";
  document.getElementById("messaggio").value = "";
  document.getElementById("cifrato").value = "";
  Mode = true;
};

const setDecrypta = () => {

  document.getElementById("setDecrypta").className = "active";
  document.getElementById("setCrypta").className = "";
  document.getElementById("messaggio").value = "";
  document.getElementById("cifrato").value = "";
  Mode = false;

};

const findIndex = (index, digrafo) => {
  for (i = 0; i < M.length; i++) {
    for (j = 0; j < M.length; j++) {
      if (digrafo.charAt(index) == M[i][j]) {
        posI = i;
        posJ = j;
      }
    }
  }
  return [posI, posJ];
};

const Cipher = (input) => {
  document.getElementById("cifrato").innerHTML = "";

  let str = "";

  let digrafi = DividiSwitch(input);

  StampaDigrafi(digrafi);


  digrafi.forEach((digrafo) => {

    let [posI1, posJ1] = findIndex(0, digrafo);
    let [posI2, posJ2] = findIndex(1, digrafo);

    //CONTROLLO STESSA RIGA
    if (posI1 == posI2 && posJ1 != posJ2) {
      str += StessaRiga(posI1, posJ1, posJ2);
      //CONTROLLO STESSA COLONNA
    } else if (posI1 != posI2 && posJ1 == posJ2) {
      str += StessaColonna(posJ1, posI1, posI2);
    }
    //DIVERSI
    else {
      str += Diversi(posI1, posI2, posJ1, posJ2);
    }
    document.getElementById("cifrato").value = (!Mode) ? str.toLocaleUpperCase().replace(/x/gi, "") : str.toLocaleUpperCase();
  });
};

function DividiSwitch(input) {

  let messaggio = input.value.toLowerCase().replace(/ /g, "");
  messaggio = messaggio.replace(/è/g, "e").replace(/à/g, "a").replace(/ò/g, "o").replace(/ù/g, "u").replace(/ì/g, "i");

  let digrafi = [];

  for (let i = 0; i < messaggio.length; i = i + 2) {

    if (Mode && messaggio[i] == messaggio[i + 1]) {
      messaggio = messaggio.slice(0, i + 1) + 'x' + messaggio.slice(i + 1);
    }
    let digrafo = messaggio.slice(i, i + 2);
    digrafi.push(digrafo.length > 1 || !Mode ? digrafo : digrafo.concat('x'));
  }

  return digrafi;

}