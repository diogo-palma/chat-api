import { createServer } from 'http';
import app from './server';

const server = createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
