import promptSync from 'prompt-sync';
const prompt = promptSync();

class miCalculadora {
    sumar(num1, num2) 
        {return num1 + num2;}
    restar(num1, num2) 
        {return num1 - num2;}
    Multiplicar(num1, num2) 
        {return num1 * num2;}
    dividir(num1, num2) {
        if (num2 === 0){
            return "Error: No se puede dividir por cero.";
        }
        return num1 / num2
        ;
    }
}


function main(){

    console.log("¡Hola Bienvenidos a la Calculadora!");

    const calculadora = new miCalculadora();

    while(true) {
        console.log("\n Opciones: ");
        console.log("1. Sumar"); // Corregido el error del "1." suelto
        console.log("2. Restar");
        console.log("3. Multiplicar");
        console.log("4. Dividir");
        console.log("0. Salir");

        let opcion = Number(prompt("Seleccione una opcion: "));
        
        if (opcion === 0) {
            console.log("Hasta luego!");
            break; //rompemos el ciclo
        }
        if (opcion >= 1 && opcion <= 4){
            let num1 = Number(prompt("Ingrese el primer numero; "));
            let num2 = Number(prompt("Ingrese el segundo numero; "));
        
        let resultado; 
        switch (opcion) {
            case 1:
                resultado = calculadora.sumar(num1, num2);
                break;
            case 2: resultado = calculadora.restar(num1, num2);
                break;
            case 3: resultado = calculadora.Multiplicar(num1, num2);
                break;
            case 4: resultado = calculadora.dividir(num1, num2);
                break;
            default:
                console.log("Opcion no valida. ");
                continue;
        }
            console.log("El resultado es: " + resultado);
    } else {
        console.log("opcion no valida. ");
    }
}
}
main();