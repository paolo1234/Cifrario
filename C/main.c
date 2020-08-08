#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h> 
#include <string.h>

bool checkC(char c, char M[5][5]){  // Controlla se un carattere char � gi� presente in una Matrice di char 5*5 --> Resituisce True se il carattere viene trovato all'interno
	int i = 0, j = 0; 
	for( i = 0; i < 5; i++){
            for ( j = 0; j < 5; j++){
                if((tolower(M[i][j]) == tolower(c))){ 
                    return true;
                }
            }
        }
        return false;
}



int main(int argc, char *argv[]) {
	
	char ParolaChiave[30];
	
	char alfabeto[26] = "abcdefghijklmnopqrstuvwyz";
	
	char M[5][5]; //Crea matrice char 5*5
	
	int  a= 0, k = 0, i = 0, j = 0;  //Indici a = indice stringa alfabeto, k = indice stringa ParolaChiave, i = indice for righe, j = indice for colonne
    
    char alf, c;
	
	printf("Inserisci parola chiave: ");
	scanf("%s", &ParolaChiave);

        for ( i = 0; i < 5; i++) {
            for ( j = 0 ; j < 5; j++) {
                if(k < strlen(ParolaChiave)){
                    c = ParolaChiave[k];
                    if(!checkC(c,M)) {
                        M[i][j] = c;
                    }else {
                        j--;
                    }
                    k++;
                }else{
                    if(a < strlen(alfabeto)){
                        alf = alfabeto[a];
                        if(!checkC(alf, M)) {
                            M[i][j] = alf;
                        }else {
                            j--;
                        }
                        a++;
                    }
                }
            }
        }
	// Visualizza la matrice
        for(i = 0; i < 5; i++){
            printf("\n");
            for( j = 0; j < 5; j++){
                printf("%3c", M[i][j]);
            }
        }
    printf("\n\nPremi un tasto per chiudere...\t"); 
    getch(); /*
    printf("\n\nEHHHH VOLEVIII!!!\t");
	getch(); 
	printf("\n\nVabbe\' dai chiudo...\t");
	getch(); */
	return 0;
}
