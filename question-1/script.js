/**
 * On this module you should write your answer to question #1.
 * This file would be executed with the following command (N=100):
 * $ node scritp.js 100
 */

const args = process.argv.slice(-1);
console.log(`Running question #1 with args ${args}`);

const N = args;
var respuesta = 0;
var combinaciones = [];

var cantidadUnos = parseInt(N);
var cantidadDos = 0;

while(cantidadUnos > 1) {
    combinaciones.push([cantidadUnos,cantidadDos]);
    cantidadUnos -= 2;
    cantidadDos++;
}
combinaciones.push([cantidadUnos,cantidadDos]);

console.log(combinaciones);
