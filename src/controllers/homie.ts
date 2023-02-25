import {IHomie, HomieModel} from "../models/homie";
import {HydratedDocument} from "mongoose";

export async function createHomie(name: String, email: String): Promise<object> {
  const existingHomie = await getHomieByEmail(email);
  if (existingHomie)
    throw new Error("Homie with that email already exists 🫠");

  const newHomie = new HomieModel({
    name: name,
    email: email,
    isReady: false,
  });
  const result = await newHomie.save();
  return {
    id: result._id
  };
}

export async function getHomieById(homieId: String): Promise<object | null> {
  return HomieModel.findById(homieId);
}

export async function getHomieByEmail(email: String): Promise<HydratedDocument<IHomie>> {
  const homie = await HomieModel.findOne({email});
  if (!homie)
    throw new Error("Homie not found with that email");
  return homie;
}

export async function updateHomie(homieId: String, updatedHomie: IHomie) {
  return HomieModel.findByIdAndUpdate(homieId, updatedHomie);
}

export async function readyUpHomie(email: String): Promise<object> {
  const homie = await HomieModel.findOne({email});
  if (!homie)
    throw new Error("Homie not found with that email");
  homie.isReady = true;
  return await homie.save();
}

export async function isHomieReady(homieId: String): Promise<object | null> {
  return HomieModel.findById(homieId, 'isReady');
}