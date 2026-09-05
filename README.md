# Microservicio de catálogo — EP1 DOY0101

Desarrollé este microservicio HTTP de catálogo para aplicar control de versiones, colaboración y automatización durante la Evaluación Parcial 1 de Ingeniería DevOps.

## Contexto de origen

Ingresé mediante continuidad de estudios y durante mi formación anterior no desarrollé microservicios. Por eso, preparé este servicio desde cero como base para esta evaluación.

## Participación

- Cuenta Duoc: `cristpinog`.
- Cuenta personal: `Cristobalpg1127`.

Ambas cuentas me pertenecen. Consulté al docente y me autorizó utilizarlas para simular el trabajo colaborativo solicitado en la evaluación.

## Funcionalidades

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Comprueba la disponibilidad del servicio. |
| GET | `/products` | Devuelve el catálogo completo. |
| GET | `/products/:id` | Devuelve un producto por identificador. |
| GET | `/products?category=<nombre>` | Filtra productos por categoría. |

La API utiliza datos de ejemplo en memoria. Los precios están expresados en pesos chilenos.

## Ejecución local

Requiero Node.js 22 o superior.

```sh
npm start
```

El servicio queda disponible en `http://127.0.0.1:3000`.

## Pruebas

```sh
npm test
```

Las pruebas verifican el estado del servicio, el catálogo, la consulta por identificador, el filtro por categoría, las rutas inexistentes y el manejo de URL malformada.

## Estructura

- `src/server.js`: servidor y rutas HTTP.
- `test/server.test.js`: pruebas de integración HTTP.
- `.github/workflows/ci.yml`: automatización de integración continua.
- `package.json`: comandos y versión mínima de Node.js.

## Estrategia de ramificación

Utilicé una estrategia basada en GitFlow para organizar los cambios de la evaluación:

- `main`: contiene la versión integrada y estable del microservicio.
- `develop`: integra los cambios antes de la publicación en `main`.
- `feature/<nombre>`: contiene el desarrollo de una funcionalidad específica.
- `hotfix/<nombre>`: contiene una corrección urgente creada desde `main`.

### Justificación técnica

Elegí esta estrategia porque el enunciado exige las ramas `main`, `develop`, `feature/<nombre>` y `hotfix/<nombre>`. La separación entre `develop` y `main` me permitió integrar y validar las funcionalidades antes de considerarlas estables. Las ramas de tipo `feature` mantuvieron cada mejora aislada, mientras que la rama `hotfix` permitió corregir un error de forma controlada sin mezclarlo con trabajo en desarrollo.

## Flujo de trabajo colaborativo

1. Creo una rama desde `develop` para cada funcionalidad.
2. Realizo cambios y ejecuto las pruebas locales.
3. Subo la rama y abro un pull request hacia `develop`.
4. Reviso el cambio desde la otra cuenta antes de integrarlo.
5. Integro las funcionalidades desde `develop` a `main` mediante pull request.
6. Para una corrección urgente, creo una rama `hotfix` desde `main`, valido el cambio y luego sincronizo la corrección con `develop`.

## Convenciones de trabajo

### Nombres de ramas

- `feature/consulta-producto`
- `feature/filtro-categoria`
- `hotfix/url-malformada`

### Mensajes de commit

Utilizo el formato `tipo: descripción breve en presente`.

Ejemplos:

- `feat: consulto productos por identificador`
- `fix: controlo URLs malformadas sin detener el servicio`
- `chore: sincronizo el hotfix con develop`

### Revisión y merge

Reviso los cambios mediante pull requests antes de integrarlos. Mantengo las funcionalidades separadas, verifico las pruebas automatizadas y uso merge para conservar la trazabilidad del historial.

## Integración continua

Configuré GitHub Actions en `.github/workflows/ci.yml`.

El workflow se ejecuta en cada `push` a `develop` y en cada pull request dirigido a `main` o `develop`. El proceso obtiene el código, configura Node.js, valida la sintaxis del servidor y ejecuta las pruebas automatizadas.

## Evidencias de trazabilidad

- [Feature: consulta por identificador](https://github.com/cristpinog/ep1-catalogo/pull/1)
- [Feature: filtro por categoría](https://github.com/cristpinog/ep1-catalogo/pull/2)
- [Integración de develop a main](https://github.com/cristpinog/ep1-catalogo/pull/3)
- [Hotfix: URL malformada](https://github.com/cristpinog/ep1-catalogo/pull/4)
- [Sincronización del hotfix con develop](https://github.com/cristpinog/ep1-catalogo/pull/5)
- [Ejecución en push a develop](https://github.com/cristpinog/ep1-catalogo/actions/runs/33943637551)
- [Ejecución en pull request a main](https://github.com/cristpinog/ep1-catalogo/actions/runs/33943634604)

## Uso de IA

Utilicé herramientas de IA como apoyo para crear el microservicio, revisar código, generar pruebas y apoyar la documentación. Revisé y validé los cambios realizados antes de integrarlos al repositorio.

## Reflexión personal

La experiencia más significativa de este proyecto fue la implementación de un flujo de integración continua mediante GitHub Actions, lo que permitió validar la ejecución automatizada de las pruebas unitarias. Este proceso evidenció que la integración continua es fundamental para detectar y corregir fallos de forma temprana, evitando que afecten a la rama principal (`main`). De cara a futuros desarrollos, considero indispensable adoptar esta metodología de trabajo, priorizando los despliegues incrementales, la validación formal mediante pruebas y las revisiones de código previas a cada liberación de versión.
