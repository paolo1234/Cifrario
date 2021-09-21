# Cifrario di Playfair v2.0.0

Cifrario di Playfair scritto in Javascript:

[Prova ora su Github Pages](https://paolo1234.github.io/Cifrario/)

# Funzionamento del cifrario di Playfair

    //TODO Aggiungere il funzionamento del Cifrario

# Changelog

### v1.0.0 [08/08/2020]

    Cifrario di Playfair funzionante, completamente scritto in Javascript, HTML e CSS

#### v1.0.5 [11/08/2020]

    Bug fixes

#### v1.1.0 [14/08/2020]

    Miglioramento del codice, risoluzione i problemi nella versione mobile

### v2.0.0 [21/09/2021]
    
    Completamente stravolta la logica dietro il funzionamento del programma, adesso viene utilizzato un algoritmo più corretto, il codice è organizzato meglio e si utilizza la sintassi ES6.

# Struttura del codice

    
### Oggetto state

Si occupa di memorizzare i vari input e output, lo stato corrente riguardo la modalità (encrypt/decrypt) e altre operazioni fondamentali

| Proprietà | Tipo     | Descrizione               |
| :-------- | :------- | :------------------------- |
| `cryptMode` | `boolean` | Definisce se il codice deve lavorare in modalità encrypt o decrypt |
| `keyword` | `string` | Memorizza la parola chiave |
| `message` | `string` | Memorizza il messaggio di input |
| `cryptedMessage` | `string` | Memorizza il messaggio criptato |
| `decryptedMessage` | `string` | Memorizza il messaggio decriptato |
| `normalizedKeyword` | `function` | Restituisce la parola chiave in minuscolo rimuovendo caratteri speciali, numeri e lettere accentate|
| `resetMessage` | `function` | Cancella tutti i dati memorizzati riguardanti il messaggio e la parola chiave|
| `resetFields` | `function` | Resetta i campi di input/output nella pagina HTML|

### mod(a,b)

Implementa la funzione modulo tra due numeri interi.

Risolve il problema dell'operatore `%` di javascript, il quale non funziona con numeri negativi.


| Parametri | Tipo     | Descrizione               |
| :-------- | :------- | :------------------------- |
| `a` | `number` | Primo operando |
| `b` | `number` | secondo operando |

### charNotAlreadyExists(grid, character)

### createBigramsFromText(text)

### makeGrid(keyword)

### drawGrid(grid);

### findIndex(grid, index, digrafo)

### encrypt(grid, input)

### decrypt(grid, input)

### lifeCycle()

### getKeywordFromInput({ target })

### getCryptedMessageFromInput({ target })

### toggleCryptMode()

### setDecryptMode()

### setEncryptMode()
  