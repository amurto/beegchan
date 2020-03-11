import express from 'express';

export default class AbstractRouter {
  constructor() {
    if (this.constructor === AbstractRouter) {
      throw new TypeError('Cannot construct instances of abstract class AbstractRouter directly. Must extend it.');
    }
    if (this.registerRoutes === AbstractRouter.prototype.registerRoutes) {
      throw new TypeError('Must implement/override abstract method registerRoutes');
    }
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    throw new TypeError('Do not call abstract method registerRoutes from child.');
  }


  getRouter() {
    return this.router;
  }
}