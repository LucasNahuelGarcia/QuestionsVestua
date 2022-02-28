# Enunciado 1

> Estás subiendo una escalera de N peldaños. En cada momento, puedes subir 1 o 2 peldaños. ¿En cuántas formas diferentes puedes subir las escalera?

# Razonamiento

Supongamos que tenemos un conjunto S, con todas las combinaciones de 1 y 2 que dan como resultado N.
Podemos usar una estructura *(<<Cantidad de 1>>, <<Cantidad de 2>>)* para cada elemento de S.

**Por ejemplo, veamos para una escalera de 3 peldaños:**
`S = {(1,1),(3,0)}`

La solución para el problema sería la sumatoria del número de permutaciones posibles para cada elemento en S.

**En el ejemplo anterior:**
Necesitamos calcular *Perm(1,1) + Perm(3,0)*.

Perm(1,1) es 2: Podemos subir 1 escalon y luego 2, o 2 y luego 1.
Perm(3,0) es 1: Podemos subir de a 1 escalon 3 veces.
*(obviamente solo tomamos en cuenta las permutaciones que no son equivalentes)*
`Sol = 2+1 = 3`
