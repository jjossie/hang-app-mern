import swaggerAutogen from "swagger-autogen";
import {config} from "dotenv";

config();

const doc = {
  info: {
    title: 'HangApp API',
    description: 'HangApp allows a group of homies to make decisions in a group using tinder-style swipe voting. This API is for interacting with the data of hangouts and homies.',
  },

  host: `localhost:${process.env.PORT}`,
  schemes: ['http', 'https'],

  definitions: {
    homie: {
      $name: "Joe Momma",
      email: "joemomma@gmail.com",
      isReady: false
    }
  }
}

const outputFile = "../src/swagger.json";
let endpointsFiles = ["../src/app.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);