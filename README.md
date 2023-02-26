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
```


## API <a name = "api"></a>

### Endpoints

HTTP Verbs | Endpoints | Acción |
| --- | --- | --- |
| GET | /competitionMen/ | Lista de todas las competiciones de hombres |
| GET | /competitionMen/:id | Busqueda de una competición por su id |
| GET | /competitionMen/:nameCompetition | Busqueda de una competición por su nombre |
| GET | /competitionWomen/ | Lista de todas las competiciones de mujeres |
| GET | /competitionWomen/:id | Busqueda de una competición por su id |
| GET | /competitionWomen/:nameCompetition | Busqueda de una competición por su nombre |
| GET | /users/ | Lista de todos los usuarios |
| GET | /users/:id | Busqueda de un usuario por su id |
| GET | /users/:name | Busqueda de un usuario por su nombre |