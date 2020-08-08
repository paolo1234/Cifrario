let M;


function Matrix(rows) {

  var arr = [];

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}

function checkC(c, M) {
  // Controlla se un carattere è vuoto o già presente nell matrice
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) if (c == " " || M[i][j] == c || !(c.match(/[a-z]/i))) return true;
  }
  return false;
}


function DrawMatrix(p) {
  M = Matrix(5);

  let a = 0, k = 0;
  
  const al = "abcdefghijklmnopqrstuvwyz";

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

function Cripta(input){
    
    document.getElementById('cifrato').innerHTML = "";
    
    const digrafi = Dividi(input);

    let str = "";

    StampaDigrafi(digrafi);

    digrafi.forEach((digrafo) => {
        let posI1, posJ2;

        if(digrafo.charAt(0) == 'x' && digrafo.charAt(1) != 'x'){
           str += digrafo.charAt(1);
        }else if(digrafo.charAt(1) == 'x' && digrafo.charAt(0) != 'x'){
          console.log(digrafo.charAt(0))
          str += digrafo.charAt(0);
        }else if(digrafo.charAt(0) == digrafo.charAt(1)){
          str += digrafo.charAt(0).concat(digrafo.charAt(1));
        }else{
                //TROVO CARATTERE 1 NELLA MATRICE
                for(i1 = 0; i1 < M.length; i1++){
                  for(j1 = 0; j1 < M.length; j1++){
                    if(digrafo.charAt(0) == M[i1][j1]){
                       posI1 = i1;
                       posJ1 = j1;
                    }
                  }
                }
                //TROVO CARATTERE 2 NELLA MATRICE
                for(i2 = 0; i2 < M.length; i2++){
                  for(j2 = 0; j2 < M.length; j2++){
                    if(digrafo.charAt(1) == M[i2][j2]){
                       posI2 = i2;
                       posJ2 = j2;
                    }
                  }
                }
                //CONTROLLO STESSA RIGA
                if(posI1 == posI2 && posJ1 != posJ2){
                  str += StessaRiga(posI1, posJ1, posJ2);
                }
                //CONTROLLO STESSA COLONNA
                else if(posI1 != posI2 && posJ1 == posJ2){
                  str += StessaColonna(posJ1, posI1, posI2);
                }
                //DIVERSI
                else if ((posI1 != posI2) && (posJ1 != posJ2)){
                  str += Diversi(posI1, posI2, posJ1, posJ2);
                }

                
        }

        document.getElementById('cifrato').innerHTML = str.toLocaleUpperCase();
    });

}

function StampaDigrafi(v){

  document.getElementById('digrafo').innerHTML = "";
   v.forEach((value) =>{
     document.getElementById('digrafo').innerHTML += value.concat("/");
   });

}

function Dividi(input){ // Ritorna un vettore di Digrafi

  let messaggio = input.value.toLowerCase().replace(/ /g, 'x');

  let digrafi = [];

  for( let i = 0; i < messaggio.length; i = i +2){
      let digrafo = messaggio.slice(i, i+2);
      digrafi.push( digrafo.length > 1 ? digrafo : digrafo.concat('x'));
  }

  return digrafi;
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


function validateP(input){
  let regex = /[^a-z]/g;
  input.value = input.value.replace(regex, '');
  const p = input.value;
  const M = DrawMatrix(p);
  PrintMatrix(M);
}

(() => {
  console.log("Il cifrario sta lavorando correttamente...");
})();
