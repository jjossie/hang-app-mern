# HangApp 2: *Electric Boogaloo*
## *MERN Stack Edition*

This is attempt #2 at making HangApp, a simple web app for polling a group of your friends using tinder-style swipe voting to make difficult decisions instead of facing uncomfortable things like actual social interaction. Attempt #1 is [here](https://github.com/jjossie/hang-app), which was made using Django and an accidentally home-baked vanilla JS frontend framework. It was a good try, but lowkey it sucks. 

## Additional Features

I'm gonna try and throw in some nifty stuff like:

- Saving hangout sessions so the same questions can be posed to the same (or another) group of homies later
- The ability to see which homies are part of the session in neat little auto-colored avatars at the top/bottom of the screen
- Seeing which homies are ready to vote / done voting / etc.
- Authentication (mostly just for class requirements)
- QR code generation
- Real-time refreshing (still not sure how to do this)
- Actually deploying the backend

Also potentially:

- More ways to democratize (vote with a slider?)

## Better API Design

Include routes like

- POST /joinHangout/:id (joins an existing hangout)
- POST /hangout (creates a new one)
- GET /hangout/:id (get a hangout obviously)
- PUT /decision/:id (adds a vote ? this seems less relational and more NoSQL which is 👍)
- DELETE /option/:id (only thing I think you'd need a delete for)
