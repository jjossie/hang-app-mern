import {HomieModel} from "../models/homie.js";

export async function createHomie(name: String, email: String): Promise<object> {
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

export async function getHomieById(homieId: String): Promise<object> {
  return HomieModel.findById(homieId);
}

export async function getHomieByEmail(email: String): Promise<object> {
  return HomieModel.find({email: email});
}

export async function readyUpHomie(homieId: String): Promise<object> {
  return HomieModel.findByIdAndUpdate(homieId, {
    isReady: true,
  });
}

export async function isHomieReady(homieId: String): Promise<object> {
  return HomieModel.findById(homieId, 'isReady');
}