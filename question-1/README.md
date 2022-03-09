# Enunciado 1

> Estás subiendo una escalera de N peldaños. En cada momento, puedes subir 1 o 2 peldaños. ¿En cuántas formas diferentes puedes subir las escaleras?

# Razonamiento

## Idea inicial
Supongamos que tenemos un conjunto S, con todas las permutaciones de 1 y 2 que dan como resultado N.
para cada elemento de S, podemos usar una estructura *(<<Cantidad de 1>>, <<Cantidad de 2>>)*.

**Por ejemplo, veamos para una escalera de 3 peldaños:**
`S = {(1,1),(3,0)}`

La solución para el problema sería la sumatoria del número de permutaciones posibles para cada elemento en S.

**En el ejemplo anterior:**
Necesitamos calcular *Perm(1,1) + Perm(3,0)*.

Perm(1,1) es 2: Podemos subir 1 escalón y luego 2, o 2 y luego 1.
Perm(3,0) es 1: Podemos subir de a 1 escalón 3 veces.
*(obviamente solo tomamos en cuenta las permutaciones que no son equivalentes)*
`Sol = 2+1 = 3`

## Implementación
### Crear S
Sabemos que N es un número positivo mayor a 0.
Para cualquier valor de N, tenemos un elemento del conjunto S es (N,0)
*(La suma de N unos me da N)*

Podemos crear los demás elementos del conjunto intercambiando un 2 por dos 1
Así:
 `(N-2,1),(N-4,2),(N-6,3)...`
Hasta que la cantidad de unos llegue a 0 o 1.

### Calcular las permutaciones
Por cada elemento *x* de S tenemos que sumar el número de formas significativas de ordenar los 1 y 2. (Significativas en el sentido de no contar soluciones duplicadas)

Un conjunto de N elementos distinguibles se puede ordenar de N! formas.
Por ejemplo: Si calculamos el conjunto S para una escalera de 3 peldaños debería ser algo así:
`S = {(1,1),(3,0)}`

Podemos ordenar el primer elemento (1,1) de 2! formas:
 1,2 ó 2,1

Ahora, el segundo elemento (3,0) puede ordenarse, según nuestra fórmula, de 3! formas. Esto está obviamente mal, estamos contando permutaciones que son redundantes.
Osea, la fórmula que usamos asume que los elementos son distinguibles entre sí, por lo que podemos mezclar los tres unos de tres formas distintas.

Hay que eliminar estas permutaciones extra, para hacerlo solo tenemos que calcular cuántas permutaciones iguales podemos hacer en cada elemento de S.
Esto es fácil: solo usamos la fórmula para calcular permutaciones en la cantidad de 1 y la cantidad de 2. Luego multiplicamos los resultados:
Para (2,2) tenemos:
  + 2! formas de ordenar los 1
  + 2! formas de ordenar los 2
  esto sería 2! * 2! = 4 permutaciones redundantes en cada orden generado.
Luego dividimos el número de permutaciones que habíamos obtenido por el número de permutaciones redundantes.

De esta forma:
 (Continuando con el ejemplo de (2,2))
 Tendremos según nuestra fórmula inicial 24 formas de ordenar (2,2).
 Pero para cada orden hay 4 órdenes redundantes.
 
 La operación lógica que hay que hacer es: **24/4=6**
 Que es la respuesta a nuestro problema.

Podríamos directamente modificar la ecuación que hicimos de la siguiente forma:
**Formas de ordenar = (cantUnos + cantDos)! / (cantUnos! * cantDos!)**
Esto se da a menos que la cantidad de órdenes redundantes sea 0, en cuyo caso el resultado es **(cantUnos + cantDos)!**.
