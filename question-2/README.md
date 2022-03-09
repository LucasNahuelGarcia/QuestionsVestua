# Enunciado 2

> En la carpeta [question-2](https://bitbucket.org/vestua-com/questions/src/main/question-2/) se ha exportado eventos de navegación de usuarios anonimizados de la plataforma Vestuá. Se le pide al equipo de Ingeniería que hagan un análisis sobre los datos de navegación. En particular se solicita:
>
> - Calcular la cantidad de visitas únicas por cada producto.
> - Calcular la cantidad de clicks únicos por cada producto.
> - Calcular el CTR (*Clickthrough Rate*) de cada producto.
>
> El set de datos contiene la siguiente estructura:
>
> - `user`: id del usuario que ejecutó el evento.
> - `entityId`: id de la entidad al que el usuario ejecutó el evento.
> - `entityType`: tipo de entidad al que se ejecutó el evento.
> - `eventType`: tipo de evento. Puede ser `impression` o `click`.
>
> Como miembro del equipo de ingeniería, te solicitan modificar el archivo [script.js](https://bitbucket.org/vestua-com/questions/src/main/question-2/script.js) para que pueda leer el set de datos y generar un archivo `output.csv` con las siguientes columnas:
>
> - `productId`: id del producto.
> - `clicks`: cantidad de *clicks* únicos que tiene el producto
> - `impressions`: cantidad de impresiones únicas que tiene el producto.
> - `ctr`: métrica CTR del producto.

# Razonamiento
## Suposiciones
**Voy a asumir que con impresiones y clicks únicos se refiere a limitar 1 de cada tipo por usuario y producto.**
**Voy a asumir que todas las líneas van a ser eventos sobre entidades de tipo producto.**
**Voy a asumir que la fórmula para calcular CTR es (clicks/impresiones)*100***
**Voy a asumir que puede haber una cantidad indefinida de eventos en el archivo de entrada, pero que puede haber una cantidad limitada de productos.**

## Manejo de los archivos
Dado que estoy trabajando con una base de datos, los archivos de entrada pueden ser muy grandes. Por eso probablemente es mejor trabajar con un stream para acceder al archivo por partes. De paso podemos usar readline para ir línea por línea.
Como el archivo de entrada es una tabla de eventos, sabemos se van a repetir productos.
La tabla que se solicita de salida tiene que ser de productos. Entonces tenemos que recorrer los eventos y agregar al archivo de salida una línea por producto.
Cada vez que encontremos un producto repetido, hay que revisar el tipo de evento y sumar uno a la columna correspondiente.


## Contar los eventos por producto
Cada línea del archivo de salida tiene que ser un producto.
Tengo que guardar la cantidad de eventos de impresión y click únicos por producto.
El archivo de entrada tiene una línea por evento.

De esto se deduce que para generar completamente una línea del archivo de salida, tengo que leer varias líneas del archivo de entrada.

### Ordenar el archivo de entrada
Una solución al problema de los productos repetidos es ordenar la tabla por entidad. De esta forma tendría bloques de líneas con el mismo producto. Podría leer un bloque y completar una línea del archivo de salida, estando seguro de que no hay más eventos para este producto.
Lamentablemente, como estoy trabajando con la suposición de que el archivo de entrada podría ser arbitrariamente largo y lo estoy accediendo por un stream, no es práctico ordenarlo.

### Escribir líneas provisorias
Podría leer línea por línea el archivo de entrada, si leo un evento con un producto que no encontré antes entonces creo una nueva línea en el archivo de salida con un 1 en el tipo de evento correspondiente; si leo un evento con un producto que ya leí antes busco el producto en el archivo de salida y le sumo 1 en el evento correspondiente.

Si mantengo el archivo de salida ordenado por id de entidad, el algoritmo para insertar nuevos productos y para sumar eventos a productos ya existentes sería de **O(log(n))**.

Por lo que el algoritmo completo sería de **O(n*log(n))**.
Ya que tenemos que insertar o actualizar un producto por iteración, e iteramos n veces.

### Usar un hashmap <--- Esta es la opción que terminé usando
Leo el archivo de entrada línea por línea, creo un mapa con claves entityId y valores de forma:
`
{
  impression: Integer,
  click: Integer
}
`
Un hashmap correcto, tiende a tener un tiempo de ejecución de O(1) para la inserción y actualización.
Como tenemos que actualizar el hashmap una vez por evento, calcular la cantidad de eventos de cada tipo por producto en el hashmap tendría un tiempo de O(n*1).
Después, tenemos que volcar los datos del hashmap en el archivo de salida. Para esto tendría que recorrer el hashmap en cualquier orden, convertir la información en una línea de csv y escribirla en el archivo de salida.

El tiempo total de ejecución de este programa debería de ser de O(2n) = O(n)

#### Cómo descartar múltiples eventos del mismo usuario
La única solución que se me ocurre es almacenar una colección de usuarios que imprimieron y de usuarios que hicieron click, por objeto.
Cuando evaluamos un nuevo evento, verificamos que este usuario no esté en la lista de usuarios que ya realizaron esta acción.

## Calcular el CTR
Estoy calculando el Clickthrough Rate de cada producto usando
(Clicks / Impresiones) * 100
Algo extraño que encontré es que el set de datos de eventos no está completo, existen productos a los que les hicieron click, pero nunca fueron impresos.
Esto es contradictorio, sospecho que habrán quedado los datos de impresión en la parte truncada de la tabla.
En estos casos, el CTR no se puede calcular porque tendría que dividir por 0.
Voy a tomar la convención de que estos productos tienen un CTR del 100%, para no tener entradas con valor 'Infinity'.


