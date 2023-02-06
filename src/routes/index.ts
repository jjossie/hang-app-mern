import Router from 'express';
// import {Homie} from "../models/homie.js";
import {createHomie, getHomieById} from "../controllers/hangout.js";


export const routes = Router();

routes.get('/hello', (req, res) => {
  res.send("Hello World!");
});


routes.post('/homie', async (req, res) => {
  try {
    const newHomie = req.body;
    const result = await createHomie(newHomie.name, newHomie.email);
    res.status(204).json(result);
  } catch (e) {
    res.status(400).send("Invalid homie");
  }
});


routes.get('/homie/:homieId', async (req, res) => {
  try {
    const homieId = req.params.homieId;
    const result = await getHomieById(homieId);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).send("Homie not found. check the id maybe idk");
  }
});

