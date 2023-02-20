import {Homie, HomieModel} from "../models/homie";

export async function createHomie(name: String, email: String): Promise<object | null> {
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

export async function getHomieByEmail(email: String): Promise<object | null> {
  return HomieModel.find({email: email});
}

export async function updateHomie(homieId: String, updatedHomie: Homie) {
  return HomieModel.findByIdAndUpdate(homieId, updatedHomie);
}

export async function readyUpHomie(homieId: String): Promise<object | null> {
  return HomieModel.findByIdAndUpdate(homieId, {
    isReady: true,
  });
}

export async function isHomieReady(homieId: String): Promise<object | null> {
  return HomieModel.findById(homieId, 'isReady');
}