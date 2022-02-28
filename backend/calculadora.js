var params = process.argv.slice(2);

var numero0= parseFloat(params[0]);
var numero1 = parseFloat(params[1]);


console.log(numero0);
console.log(numero1);

var plantilla = `
la suma es: ${numero0 + numero1},
la multiplicacion: ${numero0 * numero1},
la division es: ${numero0 / numero1},
la resta es: ${numero0 - numero1}`;

console.log(plantilla);
console.log('HoLa desde node JS');
