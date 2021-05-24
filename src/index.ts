import { createServer } from 'http';
import init from './app';

(async () => {
  const port = 3000;
  const app = await init();
  app.set('port', port);

  const server = createServer(app);
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})();
