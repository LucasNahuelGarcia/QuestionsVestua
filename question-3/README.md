# Enunciado 3

> Implementar un método de verificación lógica de paréntesis. Es decir, implementar el método `parenthesisChecker(str)` que recibe un `string` como parámetro y devuelve un `boolean`. La respuesta del método debe ser `true` si la cadena de `string` es válida en términos de paréntesis (`( )`, `[ ]`, `{ }`), i.e. cada apertura de paréntesis se cierra correctamente. A continuación se muestran ejemplos de `string` válidos e inválidos.
> 
> **Ejemplos válidos**: la función debe devuelve `true`.
>
> - `parenthesisChecker('a * (b + c)')` → `true`
> - `parenthesisChecker('a * (b + c * [d])')` → `true`
> - `parenthesisChecker('[]{}()abc{([])}')` → `true`
>
> **Ejemplos válidos**: la función debe devuelve `false`.
>
> - `parenthesisChecker('(()')` → `false`
> - `parenthesisChecker('(([))')` → `false`
> - `parenthesisChecker('([)]')` → `false`

# Razonamiento

## Problema con la implementación inicial
En primer lugar, el código que llama a la función parentesisChecker:
`const isValid = parenthesisChecker(args);`
Tiene un error lógico. Si consideramos que la función **parenthesisChecker** recibe por definición un String como parámetro nos encontramos conque args no es un String, sino un arreglo.
Por lo que hay que cambiar esta línea de código así:
`const isValid = parenthesisChecker(args[0]);`

## Diseño del algoritmo
### Idea inicial
Para controlar parentesis en un String necesitamos encontrar un parentesis cerrando a cada parentesis que se abre.
Una solución simple sería utilizar un contador que aumente con cada parentesis abierto y disminuya con cada parentesis cerrado, de forma tal que si luego de recorrer toda la cadena de texto no tenemos el contador en 0, sabemos que la cadena de texto no es válida.

El problema con esta implementación es que es complicado implementarla con varios tipos de paréntesis:
 Si le agregamos al problema {}, [], etc.
 se vuelve dificil evaluar cadenas como: **[((]))**
 **¿Cómo recordamos sin complicar demasiado el algoritmo que el corchete se abrió antes que el paréntesis?**
 
### Solucion usando un stack
Una forma simple de encarar el problema teniendo en cuenta este problema es utilizando un stack. 
Cada vez que leamos un parentesis abriendo lo agregamos al stack.
Cada vez que leamos un parentesis cerrando combrobamos cual es el elemento en la cima del stack. Si es igual al opuesto correspondiente del parentesis leido, entonces quitamos el último elemento del stack. Si no se da esta igualdad, entonces tenemos un error y termina el programa.
 
