const operacion = (a, b, funcion) => funcion(a,b) // se crea una funcion que tiene como parametro 2 incognitas y una funcion
    
const suma = (a,b) => a + b; //se crean las distintas funciones con sus respectivas operaciones ya que necesitamos traerlas como callbacks!
const resta = (a,b) => a - b;
const multiplicacion = (a,b) => a*b;
const division = (a,b) => (a / b);



console.log(operacion(2,3, suma))