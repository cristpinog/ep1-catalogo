import { request } from 'node:http';
import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/server.js';

async function withApp(t) {
  const server = createApp();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => {
    server.close((err) => err ? reject(err) : resolve());
    server.closeAllConnections();
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test('GET /health confirma disponibilidad', async (t) => {
  const response = await fetch(`${await withApp(t)}/health`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).status, 'ok');
});

test('GET /products devuelve el catalogo en JSON', async (t) => {
  const response = await fetch(`${await withApp(t)}/products`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/json/);
  const products = await response.json();
  assert.equal(products.length, 3);
  assert.ok(products.every((p) => p.id && p.name && p.price > 0));
});

test('Una ruta inexistente devuelve 404', async (t) => {
  const response = await fetch(`${await withApp(t)}/inexistente`);
  assert.equal(response.status, 404);
  assert.ok((await response.json()).error);
});

test('GET /products/2 devuelve solo el producto solicitado', async (t) => {
  const response = await fetch(`${await withApp(t)}/products/2`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    id: 2, name: 'Lapiz', category: 'papeleria', price: 500,
  });
});

test('GET /products/999 devuelve 404 si el producto no existe', async (t) => {
  const response = await fetch(`${await withApp(t)}/products/999`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'Producto no encontrado' });
});

test('Filtro productos por categoria', async (t) => {
  const response = await fetch(`${await withApp(t)}/products?category=papeleria`);
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).map((p) => p.id), [1, 2]);
});

test('Normalizo mayusculas y espacios del filtro', async (t) => {
  const response = await fetch(`${await withApp(t)}/products?category=%20TECNOLOGIA%20`);
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).map((p) => p.id), [3]);
});

test('Una URL malformada devuelve 400 y el servidor sigue disponible', async (t) => {
  const base = await withApp(t);
  const { hostname, port } = new URL(base);
  const response = await new Promise((resolve, reject) => {
    const req = request({ hostname, port, path: '//[', method: 'GET' }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.end();
  });
  assert.equal(response.status, 400);
  assert.deepEqual(JSON.parse(response.body), { error: 'URL no valida' });
  const health = await fetch(`${base}/health`);
  assert.equal(health.status, 200);
});
