---
title: ¿Por qué debería tener un Sistema de Diseño?
description: Cuando un proyecto o aplicación comienza a crecer, sucede que se comienza a llenar de muchas pantallas y páginas. Justamente en este momento comienza a ser mas difícil mantener coherencia en como llevas a un usuario por una experiencia uniforme y robusta que identifique a tu marca. Debido a esto, una buena idea seria tener un sistema de diseño.
heroimage: https://i.imgur.com/qvlp2AY.jpg
authorId: 1
categoryId: 2
tags:
  - UX Design
  - Emotional Design
  - Design System
---

Cuando un proyecto o aplicación comienza a crecer, sucede que se comienza a llenar de muchas pantallas y páginas. Justamente en este momento comienza a ser mas difícil mantener coherencia en como llevas a un usuario por una experiencia uniforme y robusta que identifique a tu marca. Debido a esto, una buena idea seria tener un sistema de diseño.

Un sistema de diseño (o Design System) se puede definir como un **conjunto** definido y estructurado de **estándares** con el objetivo de mantener un diseño escalable, fácil de mantener y **reutilizable** basado en componentes y patrones que deciden como construir un sitio, aplicación, módulo, interfaz, entre otros.

Si estas interesado en saber más de porqué usar un sistema de diseño, y como en Accentio podemos ayudarte con eso, te invitamos a continuar leyendo 😉

## ¿Por qué usar un Sistema de Diseño?

Cuando hablamos de un Sistema de Diseño este **abarca toda la aplicación**. Ya desde la etapa de planeación el sistema de diseño esta involucrado. Es sumamente importante, que para cuidar la experiencia de usuario, se tenga un sistema de diseño que sea fácil de mantener y que **mejore progresivamente** con el tiempo, permitiéndote cambiar algo que no funciona o mejorar algo que ya funcionaba.

Las ventajas que te puede dar un sistema de diseño son muchas. Vamos a ir mencionando varias y luego podrás considerar si en tu proyecto ya es momento de comenzar a pensar en un sistema de diseño.

###  Tu aplicación puede ser desarrollada mas rápido

Un Sistema de Diseño te da la **versatilidad** de reutilizar componentes ya previamente creados, y posicionarlos cada vez que necesites alguna interacción parecida a lo largo de tu aplicación. De esta manera puedes **generar emociones positivas** en tu usuario al ya reconocer algún elemento que ya sabía como se usaba. 

Hablamos de esto previamente en [nuestro post de Emotional Design (O Diseño Emocional)](https://blog.accentiostudios.com/que-es-emotional-design)

### Puedes centrarte en resolver otros problemas complicados
Cuando tienes bien definido como puedes construir tu UI reutilizando patrones de tu sistema, puedes perder menos tiempo arreglando el diseño y mas tiempo creando features (o características) nuevas en tu aplicación o algún otro problemas que necesita de tu atención o la del equipo.

### Crea un lenguaje unificado entre tus productos
Con un Sistema de Diseño consigues que cada uno de tus productos mantenga un **lenguaje en común** que permita identificarlos como parte de un todo y de tu marca. Un buen ejemplo de esto puede ser Google, Microsoft o Apple. Reconoces que usas un producto de ellos solamente por su lenguaje visual.

![Algunos componentes básicos de Material Design de Google](https://i.imgur.com/oeoq4MD.jpg)

### Crea un lenguaje unificado entre los equipos desarrolladores
Continuando el punto anterior, un lenguaje común **evita perdidas de tiempo** , no hay necesidad de ir reinventando la rueda. Si existe un lenguaje común todos sabremos de que estamos hablando, seguiremos el mismo camino, evitaremos incoherencias y malos entendidos. Incluso si partes del equipo tienen diferencias geográficas.

### Funciona como documentación para nuevos integrantes del equipo

Al tener un sistema de diseño, nuevas personas que puedan entrar a futuro y retomen el desarrollo de la aplicación tendrán un lugar de donde sacar referencias, y entender como se supone que debería ser el lenguaje usado al momento de construir la aplicación.

## Cuando NO usar un Sistema de Diseño
Hay algunas veces que no es necesario tener un sistema de diseño. Crear y mantener un sistema de diseño es una tarea que lleva tiempo, dedicación y **constante mejora**. Cuando el proyecto es muy pequeño, o no tiene la intención de escalar su complejidad, crear un sistema de diseño puede no ser la prioridad.

Ahora, si tu intención es escalar, o mantener coherencia entre aplicaciones; si tu objetivo es aumentar la complejidad, un sistema de diseño comienza a tener sentido para ti.

## Partes de un Sistema de Diseño

Un sistema de diseño consta de varias partes, el conjunto de estas forman un repositorio de diseño:

### Guías de Estilo
Estas especifican como implementar los componentes del sistema, tienen referencias visuales y principios al momento de crear interfaces. Normalmente estas guías también vienen con fragmentos ya construidos usando varios componentes para poner en contexto y ayudar a explicar mejor.

Las guías de estilo pueden contener incluso tonos de voz al momento de escribir,  estándares de interacción, recomendaciones, etc.

![Carbon Design System de IBM](https://i.imgur.com/8oolocQ.jpg)

### Librería de Componentes
Contiene una serie de componentes pre-construidos, listos para ser reutilizados, que sirven en conjunto con las guías de estilo, como la base para comenzar a diseñar una interfaz. Ahorrando un tiempo significativo al momento de diseñar estas.

Un componente de una librería normalmente viene documentado con las siguientes partes
 - **Nombre**: Una manera de llamar única que identifique el componente entre los demás. De esta manera se evita confusión.
 - **Descripción**: Una clara explicación de que es y para que funciona el componente, normalmente acompañado con una breve guía de como cuando usar y cuando no usar.
 - **Atributos**: Variables de configuración del componente, permitiendo alterar su funcionamiento para diversos escenarios que precise la aplicación. Estos pueden ser color, tamaño, texto, contenido, etc.
 - **Estado**: Valores predeterminados recomendados y los cambios posteriores en la apariencia.
 - **Fragmentos de Código:** Fragmentos del código real del componente. Algunos sistemas de diseño van tan lejos como para compartir múltiples ejemplos y ofrecer un entorno de "caja de arena" o "sandbox" para probar diferentes personalizaciones de componentes
 - **Front-end y backend frameworks:** Algunos sistemas de diseño también especifican cuales son los frameworks de front y backend a utilizar, tanto porque los componentes están construidos en el, como también para evitar problemas de desarrollo y agilizar el proceso.
 
![Algunos Componentes de Excelsior Design System](https://i.imgur.com/qY19ZFf.jpg)

### Librería de Patrones
Se suele pensar que una librería de patrones y una librería de componentes es la misma cosa. Sin embargo tiene sus diferencias. Mientras una librería de componentes contiene una serie de elementos específicos para una interfaz, una librería de patrones contiene **elementos mayores**, construido de varios componentes. 

Se suele usar los términos **"Átomos, y Organismos"** para referirse a esto. Los átomos serian los componentes específicos, los organismos por su parte, al estar construidos de varios átomos, serian los patrones. Un ejemplo de esto puede ser la cabecera (o Header) de una pagina web: Puede estar construido de un menú, un logo, una caja de búsqueda y un botón.

![Pattern de Caja de Login de Carbon IBM](https://i.imgur.com/6GBRyea.jpg)

## Conclusión

Ahora ya entendemos la importancia del porqué tener un sistema de diseño en tu proyecto. Las guías, patrones y elementos reutilizables pueden ayudarte muchísimo a **optimizar** tu flujo de trabajo a la vez que aseguras una **buena experiencia de usuario** a lo largo de tu aplicación/es. Un sistema de diseño **requiere tiempo**, esfuerzo e investigación. Un sistema de diseño mal hecho, o mal ejecutado puede ocasionar resultados contrarios a los esperados, además de robarte tiempo que puedes estar dedicando a resolver otras prioridades. Siempre crea este tipo de sistema con un **equipo capacitado y dedicado** a esta tarea.

**En Accentio Studios** somos un grupo de profesionales que nos dedicamos a la experiencia de usuario, inclusive si eso requiere la creación de un **nuevo sistema de diseño para tu negocio**. Si quieres saber más información te invitamos a que entres [a nuestra pagina principal 😎💙](https://accentiostudios.com).

**¡Muchas gracias por leer!**