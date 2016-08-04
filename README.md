# Maker-oids

This project is the result of two week's work between four people. It currently has reached V2 of features, beyond the MVP stage.

Final project made as part of the course at Makers Academy.

# App Description

A re-imagined version of the classic arcade game.

# Initial Setup

When trying to work with this project's code, you need to enter the following lines on the command-line after cloning/forking:
- npm install (to install all the required node modules)
- npm start (to start the localhost server)
- npm test (to start the Karma testing-framework)

# Testing framework

All tests are done with Jasmine through the Karma testing-framework.

# Technologies

The application is built using JavaScript scripting and HTML5, with the Canvas element.

# Contributors
- [Cameron] (https://github.com/cameronepstein)
- [Hassan] (https://github.com/hassanrad)
- [Matt] (https://github.com/mbutlerw)
- [Randy] (https://github.com/rmarmer1)

# Game Features
## V1 (MVP)

```
800x600 game canvas
```
```
Player-controlled ship
- Left-key: Turn-left
- Right-key: Turn-right
- Up-key: Thrust forward
- Space-key: Fire weapon
```
```
Asteroid objects
- Spawn at randomly generated points, away from center-screen (player's designated spawn point)
- Move at randomly generated velocities
- Destroyed when hit by projectile
```
## V2

```
Screen wrapping
- When crossing canvas-edge, objects re-appear on opposite side of canvas
```
```
Enhanced asteroid objects
- When destroyed, break up into 3 smaller asteroid objects
- Smaller asteroid objects travel at randomly generated velocities
```
```
Collision Detection
- Originally was done semi-accurately by calculating when drawn-shapes intersect on either X or Y axis
- Improved collision detection by drawing objects using vertices, and detecting line-intersections precisely
```
```
Levels
- After destroying all asteroids on the screen, player advances to the next level
- Every level has the equivalent number of large asteroids spawned (ie. level 9 starts with 9 large asteroids)
```
```
Lives
- Player starts with 3 lives
- Player loses a life when colliding with asteroid
- Player respawns in center of screen and is temporarily invulnerable
```
```
Power-Ups
- Appear at a 20% chance when asteroids are destroyed, moving at a random velocity, and dissapear after a set-duration
- When player's ship collects a power-up, it changes weapon to "shotgun" for a set-duration of time
```
```
Sound-Effects
- Sound effects added for firing weapons, thrusting, and destroying asteroids
```
## Nice To-Haves
```
Points / High-Score
- Adding point-system and tracking highest achieved scores
```
```
Multiplayer
 -  Local 2-Player Coop
```
```
VR-Mode
-  using A-Frame
```
```
Visualization Mode
-  Asteroid objects react to music
```
```
Responsive Canvas Size
- Game canvas adjusting to user's window-size on initial load
```
