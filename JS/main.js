function Matrix(rows) {
  // Funzione per creare una matrice in js
  var arr = [];

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}

function check(p, M) {
  // Controlla se un carattere è vuoto o già presente nell matrice
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) if (p == " " || M[i][j] == p || !(p.match(/[a-z]/i))) return true;
  }
  return false;
}

function Reset() {
}

function DrawMatrix(p) {
  let M = Matrix(5);

  let a = 0,
    k = 0;

  const al = "abcdefghijklmnopqrstuvwyz";

  for (i = 0; i < M.length; i++) {
    for (j = 0; j < M.length; j++) {
      if (a < p.length) {
        let ca = p.charAt(a).toLowerCase();
        if (!check(ca, M)) {
          M[i][j] = ca;
        } else {
          j--;
        }
        a++;
      } else {
        if (k < al.length) {
          let ce = al.charAt(k).toLowerCase();
          if (!check(ce, M)) {
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

function setP() {
    const p = document.getElementById("parolachiave").value;
    let str = "";
    for(let i = 0; i < p.length ; i++){
        let cha = p.charAt(i);
        if (cha == " " || !(cha.match(/[a-z]/i))){
            console.log("rimosso:", cha);
        }else{
            str = str + cha;
        }

        document.getElementById("parolachiave").value = str;
    }

  
  const M = DrawMatrix(p);
  PrintMatrix(M);
}

(() => {
  console.log("Il cifrario sta lavorando correttamente...");
  Reset();
})();
