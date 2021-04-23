# CarServiceClient

Es un proyecto que se le hizo un fork de https://github.com/cmduquer/carserviceclient y modificado para cumplir con las condiciones solicitadas

## Componentes y servicios usados

Se creo los siguientes componentes main-view, owner-list, owner y el servicio de shared/owner

## main-view

Solo muestra dos botones para redirigirse a las paginas de la web

## Owner-list

Es la vista donde se pueden observar los datos del owner y tiene  la siguiente implementacion
En el ngOnInit se obtienen todos los datos para mostrar
selectToDelete obtiene los datos seleccionados en el checkbox del html
gotoMain me redirecciona a la vista inicial
deleteOwner me elimina los datos seleccionados

## owner

Es el lugar donde se edita, actualiza y elimina individualmente los owners y tiene  la siguiente implementacion
El ngOnInit es donde obtengo el dato del owner el cual se desea eliminar, actualizar si se selecciona un campo
El gotoList() me sirve para redireccionar al owners-list
save, recibe los datos del form y hace peticion al servicio de owner para guardar
remove, recibe el href por el cual hace una peticion al servicio de owner para eliminar

## shared/owner
Es el servicio que se encarga de mandar las peticiones a la API, tiene los mismos metodos que el cars service y algunos mas
los cuales son los siguientes
removeRelation, recibe el dni y lo que hace es eliminar la relacion que tiene con el car
get, solo obtiene el owner solicitado por la dni


