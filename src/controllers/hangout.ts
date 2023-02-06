import {HomieModel} from "../models/homie.js";

export async function createHomie(name: String, email: String): Promise<object> {
    return HomieModel.create({
        name: name,
        email: email,
        isReady: false
    });
}

export async function getHomieById(homieId: String): Promise<object> {
    return HomieModel.findById(homieId);
}

export async function getHomieByEmail(email: String): Promise<object> {
    return HomieModel.find({email: email});
}

export async function readyUpHomie(homieId: String): Promise<object> {
    return HomieModel.findByIdAndUpdate(homieId, {
        isReady: true
    });
}

export async function isHomieReady(homieId: String): Promise<object> {
    return HomieModel.findById(homieId, 'isReady');
}