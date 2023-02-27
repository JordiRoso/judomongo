# Buscador Resultados Judo

## Tabla de Contenidos

- [Sobre el proyecto](#sobre-el-proyecto)
- [Comenzando](#comenzando)
- [Uso](#uso)
- [API](#api)

## Sobre el proyecto <a name = "sobre-el-proyecto"></a>

El proyecto es un buscador de resultados de competiciones de Judo, creado con MongoDB, React, Redux y Bootstrap. Tiene 3 colecciones: "competitionMen", "competitionWomen" y "users". Dentro de las colecciones "competitionMen" y "competitionWomen" se encuentran los resultados de las diferentes competiciones.

## Comenzando <a name = "comenzando"></a>

Para utilizar el buscador de resultados debes clonar el repositorio y seguir las instrucciones.

### Instalación

Una vez clonado el repositorio para que funcione correctamente y se instalen todas las dependencias requeridas hay que instalar:

```
npm install 
```


### Seeders

Hay unos seeders por si se quiere utilizar el buscador independientemente de la carga de toda la Base de Datos. Para utilizar los seeders:
```
npm run seed
```

## Uso <a name = "uso"></a>

En desarrollo:
```
npm run dev
```

En producción:

````
npm start
`````




## API <a name = "api"></a>

### Endpoints

HTTP Verbs | Endpoints | Acción |
| --- | --- | --- |
| GET | /users| Lista de todos los users |
| GET | /users/id/:id | Lista de los users por su id |
| DELETE | /users/delete/:id| Borrar users por su id|
| POST | /auth/register | Registrar usuarios |
| POST | /auth/login| Hacer Login usuario|
| PATCH| /users/:id | Actualizar usuario |
| GET | /girls/ girl/:id| Busqueda de competiciones de chicos por su id |
| GET | /results/ competitor/:id| Busqueda de competiciones de chica por su id |
| GET | results/buscar/search?category=senior&gender=female&name=japon&year=2025| Buscar: por Query Params: senior o junior, male o female, name, year|
| PATCH | /girls/:id | Actualizar competiciones  de chicas por su id |
| PATCH | /results/:id | Actualizar competiciones  de chicos por su id |
| POST | /girls/girl| Creacion de competiciones y resultados de competiciones de chicas|
| POST | /results/men| Creacion de competiciones y resultados de competiciones de chicos|
| GET | /results | Buscar y muestra  todas competiciones. Tanto competiciones de chicos como de chicas |
| DELETE | /results /:id| Borrar  Resultados Competiciones tanto de chicos como de chicas |
| DELETE | /results /competitions/:id| Borrar   Competiciones tanto de chicos como de chicas |
