import {IHomie, HomieModel} from "../models/homie";
import {HydratedDocument, Types} from "mongoose";

export async function createHomie(name: String, tokenData: any): Promise<object> {
  if (!tokenData.email)
    throw new Error("No email found in token")
  const existingHomie = await HomieModel.findOne({email: tokenData.email});
  if (existingHomie)
    throw new Error("Homie with that email already exists 🫠");

  const newHomie = new HomieModel({
    name: name,
    email: tokenData.email,
    isReady: false,
    tokenData: tokenData
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

export async function updateHomie(homieId: Types.ObjectId, updatedHomie: IHomie) {
  return HomieModel.findByIdAndUpdate(homieId, updatedHomie);
}

export async function readyUpHomie(homieId: Types.ObjectId): Promise<object> {
  const homie = await HomieModel.findById(homieId);
  if (!homie)
    throw new Error("Homie not found with that id");
  homie.isReady = true;
  return await homie.save();
}

export async function isHomieReady(homieId: String): Promise<object | null> {
  return HomieModel.findById(homieId, 'isReady');
}