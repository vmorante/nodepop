# NodePop
Nodepop es una api para la venta de articulos de segunda mano.Esta construida bajo las tecnologias de Javacript,Node.JS, mongodb y express.js
## **Inicialización de la base de datos**
```
  npm run installDB
```
## Instalar modulos necesarios
```
mpm init
```
## **Arranque de la aplicacion(MongoDB y app)**
```
 
  mongostart 
  nodemon start
```
## Modulos instalados
* Mongoose
* jsonwebtoken
* crypto
* i18n
* jshint
## Pagina principal
```
http://localhost:3000
```

## Registro
Introducir nombre,clave y email
```
http://localhost:3000/apiv1/usuarios/registro
```
## Login
Introducir clave y email
```
http://localhost:3000/apiv1/usuarios/authenticate
```
## Anuncios
Solo se pueden ver cuando estas registrado
### Filtros
* Limit :http://localhost:3000/apiv1/anuncios?limit=1
* skip :http://localhost:3000/apiv1/anuncios?skip=2
* sort :http://localhost:3000/apiv1/anuncios?sort=nombre
* tag :http://localhost:3000/apiv1/anuncios?tags=mobile
* tipo de anuncio (venta y busqueda) : http://localhost:3000/apiv1/anuncios?venta=true
* Nombre articulo(busqueda por el articulo que empieze por el dato introducido) :http://localhost:3000/apiv1/anuncios?nombre=bi
* Precio: 
    * Entre dos valores: http://localhost:3000/apiv1/anuncios?precio=10-100
    * Precio mayor que: http://localhost:3000/apiv1/anuncios?precio=100-
    * Precio menor que :http://localhost:3000/apiv1/anuncios?precio=-100
    * Precio igual que :http://localhost:3000/apiv1/anuncios?precio=50
## Internalización
Dos idiomas disponibles para los mensajes de error: Español(es) y Inglés(in).
Incluir en headers
```
Accept-Language :in
```
