import Router from 'express';


export const routes = Router();

routes.get('/hello', (req, res) => {
    res.send("Hello World!");
});

