const carta = 'bici coche balón _playstation bici coche peluche'

const cartaModificada = carta.split(" ");

console.log(cartaModificada);

for (let i=0; i < cartaModificada.length; i++){
    count = 0

    if(cartaModificada[i] === cartaModificada[i+1]){
        count ++
    } 
}