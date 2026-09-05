# Microservicio de catálogo — EP1 DOY0101

Desarrollé esta API HTTP educativa de consulta de productos como base para aplicar control de versiones, colaboración y automatización durante la evaluación.

## Contexto de origen

Ingresé mediante continuidad de estudios y durante mi formación anterior no desarrollé microservicios. Por eso, creé este servicio desde cero para esta actividad con apoyo de Codex, en lugar de reutilizar un proyecto de una asignatura anterior.

## Participación

- Cuenta Duoc: `cristpinog`.
- Cuenta personal: `Cristobalpg1127`.

Ambas cuentas me pertenecen. Consulté al docente y me autorizó a utilizarlas para simular el trabajo colaborativo de esta evaluación.

## Ejecución

Requiere Node.js 22 o superior. No utiliza paquetes externos ni requiere una base de datos.

```sh
npm start
```

Dirección local: http://127.0.0.1:3000. La variable `PORT` permite cambiar el puerto.

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/health` | Estado del servicio |
| GET | `/products` | Catálogo de tres productos de ejemplo |

Los precios de ejemplo están expresados en pesos chilenos. Los datos se mantienen en el código y esta versión no permite modificarlos mediante la API.

## Pruebas

```sh
npm test
```

Las pruebas realizan solicitudes HTTP reales a un servidor local en un puerto temporal.

## Estructura

- `src/server.js`: servidor y rutas HTTP.
- `test/server.test.js`: pruebas de integración.
- `package.json`: comandos y versión mínima de Node.js.

## Uso de IA

Utilicé OpenAI Codex para generar la implementación inicial, las pruebas automatizadas y el borrador de documentación. Actualizaré esta sección según el apoyo que utilice durante el resto del trabajo. Me corresponde revisar los resultados y redactar mis justificaciones y mi reflexión personal.

## Estado de la evaluación

Preparé la versión inicial del microservicio y comprobé sus tres pruebas automatizadas con apoyo de Codex. Aún debo completar la estrategia de ramas, dos features y un hotfix mediante pull requests, GitHub Actions y las evidencias. Este README todavía no constituye mi entrega final.

