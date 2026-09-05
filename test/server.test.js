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
