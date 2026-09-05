import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

const products = [
  { id: 1, name: 'Cuaderno', category: 'papeleria', price: 2500 },
  { id: 2, name: 'Lapiz', category: 'papeleria', price: 500 },
  { id: 3, name: 'Mouse', category: 'tecnologia', price: 12000 },
];

export function createApp() {
  return createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname;
    let status = 200;
    let body;
    if (req.method === 'GET' && path === '/health') {
      body = { status: 'ok', service: 'catalogo' };
    } else if (req.method === 'GET' && path === '/products') {
      const category = url.searchParams.get('category');
      body = category === null
        ? products
        : products.filter((item) => item.category === category.trim().toLowerCase());
    } else if (req.method === 'GET' && /^\/products\/[1-9]\d*$/.test(path)) {
      const id = Number(path.split('/')[2]);
      const product = products.find((item) => item.id === id);
      status = product ? 200 : 404;
      body = product ?? { error: 'Producto no encontrado' };
    } else {
      status = 404;
      body = { error: 'Ruta no encontrada' };
    }
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 3000);
  createApp().listen(port, '127.0.0.1', () => {
    console.log(`Catalogo disponible en http://127.0.0.1:${port}`);
  });
}
