(async () => {


const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const routes = require('./routes');

const handler = routes.getRequestHandler(app);

try {

	await app.prepare();

	const server = express();

	server.use(handler);

	server.listen(port);

} catch (err) {

	console.error(err);

}


})();