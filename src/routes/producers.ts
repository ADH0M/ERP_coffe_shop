import express, {type Router } from 'express';
import { getAllProducers } from '../controller/producers.js';
const route:Router = express.Router();
route.get('/' , getAllProducers);

export default route ;