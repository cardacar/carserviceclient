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


