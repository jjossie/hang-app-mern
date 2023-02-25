import {IHangout, HangoutModel} from "../models/hangout";
import assert from "assert";
import {HomieModel} from "../models/homie";
import {Types} from "mongoose";
import ObjectId = Types.ObjectId;


export async function createHangout(hangout: IHangout): Promise<object | null> {
  if (!hangout.homies)
    hangout.homies = [hangout.creator];
  const newHangout = new HangoutModel(hangout);
  const result = await newHangout.save();
  return {
    id: result._id,
  };
}

export async function getHangoutById(hangoutId: String): Promise<object | null> {
  return HangoutModel.findById(hangoutId);
}


export async function addHomieToHangout(hangoutId: string, homieId: Types.ObjectId): Promise<object | null> {
  assert(await HomieModel.findById(homieId)); // Do I need to confirm the homie exists?
  const hangout = await HangoutModel.findById(hangoutId);
  if (!hangout) throw new Error("Could not find hangout");
  if (!hangout.homies)
    hangout.homies = [homieId]

  if (hangout.homies.filter(obj => obj === homieId).length == 0)
    hangout.homies.push(new ObjectId(homieId)); // Only add them if they're not added already

  return await hangout.save();
}

export async function removeHomieFromHangout(hangoutId: string, homieId: Types.ObjectId): Promise<object | null> {
  assert(await HomieModel.findById(homieId)); // Do I need to confirm the homie exists?
  const hangout = await HangoutModel.findById(hangoutId);
  if (!hangout)        throw new Error("Could not find hangout");
  if (!hangout.homies) throw new Error("No Homies attached to hangout");

  hangout.homies = hangout.homies.filter(obj => obj !== homieId);
  return await hangout.save();
}