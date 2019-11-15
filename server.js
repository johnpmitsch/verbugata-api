const jsonServer = require('json-server');
const server = jsonServer.create();
const db = fs.readFileSync(path.join(__dirname, 'db.json'))
const router = jsonServer.router(db, { foreignKeySuffix: '_id' });
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);
