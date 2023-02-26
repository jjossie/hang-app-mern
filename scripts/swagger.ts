import dotenv from 'dotenv';
dotenv.config();

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'HangApp API',
    description: 'HangApp allows a group of homies to make decisions in a group using tinder-style swipe voting. This API is for interacting with the data of hangouts and homies.',
  },

  host: `hang-app.onrender.com`,
  // host: `localhost:3341`,
  schemes: ['https', 'http'],
  // schemes: ['http'],

  definitions: {
    newHomie: {
      $name: "Joe Momma",
    },
    homie: {
      $name: "Joe Momma",
      email: "joemomma@gmail.com",
      isReady: false
    },
    newHangout: {
      $creator: "63e813521329eb317607ee25"
    },
    hangout: {
      $creator: "63e813521329eb317607ee25",
      homies: [
          "63e813521329eb317607ee25",
          "63e0372a9d859e637a944c00",
          "63e10d4d3defab4fa0bde684"
      ],
      "decision": {
        "prompt": "What's the move, gang?",
        "media": "",
        "_id": "63fad1279a762e76808f501c",
        "options": []
      }
    },
    error: {
      $message: "Something went wrong.",
      error: {}
    },
    newDecision: {
      $prompt: "What's the move, gang?",
      media: "",
    },
    newOption: {
      $text: "Let's do a thing"
    },
    voteInput: {
      $value: 1,
      $timeTaken: 4
    }

  }
}

// const outputFile = `../src/${process.env.SWAGGER_JSON_FILENAME}`;
const outputFile = `../src/swagger.json`;
let endpointsFiles = ["../src/app.ts"];
swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
      console.log(`Wrote to ${outputFile}`);
    });