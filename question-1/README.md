# Enunciado 1

> Estás subiendo una escalera de N peldaños. En cada momento, puedes subir 1 o 2 peldaños. ¿En cuántas formas diferentes puedes subir las escalera?

# Razonamiento

## Idea inicial
Supongamos que tenemos un conjunto S, con todas las combinaciones de 1 y 2 que dan como resultado N.
para cada elemento de S, podemos usar una estructura *(<<Cantidad de 1>>, <<Cantidad de 2>>)*.

**Por ejemplo, veamos para una escalera de 3 peldaños:**
`S = {(1,1),(3,0)}`

La solución para el problema sería la sumatoria del número de combinaciones posibles para cada elemento en S.

**En el ejemplo anterior:**
Necesitamos calcular *Perm(1,1) + Perm(3,0)*.

Perm(1,1) es 2: Podemos subir 1 escalon y luego 2, o 2 y luego 1.
Perm(3,0) es 1: Podemos subir de a 1 escalon 3 veces.
*(obviamente solo tomamos en cuenta las combinaciones que no son equivalentes)*
`Sol = 2+1 = 3`

## Implementación
### Crear S
Sabemos que N es un número posivo mayor a 0.
Para cualquier valor de N, tenemos un elemento del conjunto S es (N,0)
*(La suma de N unos me da N)*

Podemos crear los demas elementos del conjunto intercambiando un 2 por dos 1
Así:
 `(N-2,1),(N-4,2),(N-6,3)...`
Hasta que la cantidad de unos llegue a 0 o 1.

### Calcular las combinaciones
Por cada elemento *x* de S tenemos que sumar el número de formas significativas de ordenar los 1 y 2. (Significativas en el sentido de no contar soluciones duplicadas)


