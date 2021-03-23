# I CARE │ Red Social

## Índice

* [1. Objetivo](#1-objetivo)
* [2. Alcances](#2-alcances)
* [3. Interface](#3-Interface)
* [4. Historias](#4-Historias)
* [5. Usabilidad](#5-Usabilidad)
***

## 1. Objetivo

![](/src/assets/logo.png) 

I care es una red de apoyo que aporta tips de bienestar para estudiantes del bootcamp de laboratoria.

Durante el bootcamp es muy común que demos mayor prioridad a los proyectos y descuidemos nuestro bienestar ¿un poco?. 

Mujeres que viven las mismas circunstancias, son las mejores consejeras.

Se va a visualizar información de temas básicos como salud, manejo de estres, ejercicio, alimentación, etc..

Todas las recomendaciones son bienvenidas!!


## 2. Alcances

Las usuarias podran ingresar de varias maneras:

  * Creando una cuenta con correo electrónico
  * Creando una cuenta con Google o de Facebook

Ya ingresadas en la aplicación podrán:

  * Visitar las publicaciones existentes 
  * Publicar, 
  * Editar, 
  * Borrar,
  * Dar like a alguna que le parezca interesante (la usuaria solo podrá dar un like a cada publicación).

## 3. Interface

Con el fin de que la experiencia sea agradable para las usuarias diseñamos el wireframe:

![wireframe](/src/assets/prototype.jpg)

Posteriormente, con los feedbacks recibidos elaboramos la vista mobile first:

![mobilefirst](/src/assets/mobileprototype.jpg)

* Implementamos el proyecto de forma responsive, iniciando con la version mobile first.
* Implementamos el uso de Firebase para la autenticación e ingreso de las usuarias.
* Implementamos la modularización del codigo para separar por responsabilidades.
* Implementamos el uso de SPA para dar pronta respuesta a las usuarias.

## 4. Historias

Se desarrollaron las siguientes historias de usuario:

1. Yo como usuaria me gustaría poder crear una cuenta en el sitio con google/correo/facebook.
2. Yo como usuaria me gustaría poder logear con mi cuenta en el sitio.
3. Yo como usuaria me gustaría ver todos los post en el sitio.
4. Yo como usuaria me gustaría publicar un post en el sitio.
5. Yo como usuaria me gustaría poder darle like/editar y borrar un post en el sitio.


## 5. Usabilidad.

1. Crear cuenta

![ToSign](/src/assets/tosign.gif)

2. Ingresar

![ToLog](/src/assets/tolog.gif)

3. Publicaciones

![ToPost](/src/assets/topost.gif)

4. Cerrar sesión 

![ToLogOut](/src/assets/tologout.gif)




