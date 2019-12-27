import express from 'express';
import consola from 'consola';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Nuxt, Builder } = require('nuxt');

export default class NuxtExpressServer {
  private app: express.Application;
  private readonly host: string;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.host = process.env.HOST || '127.0.0.1';
    this.port = Number(process.env.PORT) || 3000;
  }

  public start(): void {
    // Import and Set Nuxt.js options
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require('../../nuxt.config.js');
    config.dev = !(process.env.NODE_ENV === 'production');

    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    // Build only in dev mode
    if (config.dev) {
      const builder = new Builder(nuxt);
      builder.build();
    }

    // Give nuxt middleware to express
    this.app.use(nuxt.render);

    // Listen the server
    this.app.listen(this.port, this.host);
    consola.ready(`Server listening on http://${this.host}:${this.port}`);
  }
}

const server = new NuxtExpressServer();
server.start();
