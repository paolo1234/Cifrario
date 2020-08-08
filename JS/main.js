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
let M;
function DrawMatrix(p) {
  M = Matrix(5);

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


function dividi(){
  
  let messaggio = document.getElementById('messaggio').value.toLowerCase();
  
  messaggio = messaggio.replace(/ /g, "");
  
  document.getElementById('cifrato').innerHTML = ""; 
  
  let vettore = [];
  var a = 0;
  for ( i = 0; i < messaggio.length; i= i + 2){
    let digrafo = messaggio.slice(i, i+2);
    vettore.push( digrafo.length > 1 ? digrafo : digrafo.concat('x'));
    
  }

  console.log(messaggio);
  console.log(vettore);
  document.getElementById('digrafo').innerHTML = "";
  vettore.forEach((value) =>{
      document.getElementById('digrafo').innerHTML += value.concat("/");
  });
  
  vettore.forEach((value) => {

      let posI1, posJ2;
      for(i1 = 0; i1 < M.length; i1++){
        for(j1 = 0; j1 < M.length; j1++){
          if(value.charAt(0) == M[i1][j1]){
             console.log(i1, j1, value.charAt(0));
             posI1 = i1;
             posJ1 = j1;
          }
        }
      }
      for(i2 = 0; i2 < M.length; i2++){
        for(j2 = 0; j2 < M.length; j2++){
          if(value.charAt(1) == M[i2][j2]){
            //  console.log(i2, j2, value.charAt(1));
             posI2 = i2;
             posJ2 = j2;
          }
        }
      }

      let str = "";
      if(M[posI1][posJ1] != M[posI2][posJ2]){

    
      if(posI1 != posI2){
        console.log(value.charAt(0), ",", value.charAt(1),  " non sono sulla stessa riga.");
      }else{
        console.log(StessaRiga(posI1, posJ1, posJ2));
        str += StessaRiga(posI1, posJ1, posJ2);
      }

      if(posJ1 != posJ2){
        console.log(value.charAt(0), ",", value.charAt(1),  " non sono sulla stessa colonna.");
      }else{
        console.log(StessaColonna(posJ1, posI1, posI2));
        str += StessaColonna(posJ1, posI1, posI2);
      }

      if((posI1 != posI2) && (posJ1 != posJ2)) { str += Diversi(posI1, posI2, posJ1, posJ2); }
    }else{
      str += "[CY]";
    }

      document.getElementById('cifrato').innerHTML += str;

  });

}

function StessaColonna(c, r1, r2){
      if(r2 == M.length -1){
        console.log(`C2: (${r2}) supera la lunghezza della matrice (${M.length -1})`);
        // return (M[posI1][posJ1] != 'x' || M[posI2][posJ2] != 'x') ? `${M[r1+1][c]}${M[0][c]}` : `[XX]`;
        return `${M[r1+1][c]}${M[0][c]}`;
      }
      else if(r1 == M.length -2){
        console.log(`C1: (${r1}) supera di 2 la lunghezza della matrice (${M.length -1})`);
        return `${M[r1+1][c]}${M[0][c]}`;
      }
      else if(r1 == M.length -1){
        console.log(`C1: (${r1}) supera la lunghezza della matrice (${M.length -1})`);
        return `${M[0][c]}${M[r2+1][c]}`;
      }
      else{
        return `${M[r1+1][c]}${M[r2+1][c]}`;
      }


}

function StessaRiga(r, c1, c2 ){

      if(c2 == M.length -1){
        console.log(`C2: (${c2}) supera la lunghezza della matrice (${M.length -1})`);
        return `${M[r][c1+1]}${M[r][0]}`;
      }
      else if(c1 == M.length -2){
        console.log(`C1: (${c1}) supera di 2 la lunghezza della matrice (${M.length -1})`);
        return `${M[r][c1+1]}${M[r][0]}`;
      }
      else if(c1 == M.length -1){
        console.log(`C1: (${c1}) supera la lunghezza della matrice (${M.length -1})`);
        return `${M[r][0]}${M[r][c2+1]}`;
      }
      else{
        return `${M[r][c1+1]}${M[r][c2+1]}`;
      }

}

function Diversi(posI1, posI2, posJ1, posJ2) {
  return `${M[posI2][posJ1]}${M[posI1][posJ2]}`;
}


(() => {
  console.log("Il cifrario sta lavorando correttamente...");
  Reset();
})();
