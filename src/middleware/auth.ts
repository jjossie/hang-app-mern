// If a token exists, uses the token to attach the user object on the request
// Otherwise, does nothing
import {NextFunction, Request, Response} from "express";
import {getHomieByEmail} from "../controllers/homie";
import {HydratedDocument} from "mongoose";
import {IHomie} from "../models/homie";


export const addHomieId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.oidc.isAuthenticated())
    return next();
  else{
    if (!req.oidc.user)
      throw new Error("Authenticated, but no user object 🤨");

    const homie: HydratedDocument<IHomie> = await getHomieByEmail(req.oidc.user.email);
    req.homieId = homie._id;
    return next();
  }
};
