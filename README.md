
# PuckSoccer

A 2D sport game where two players compete against each other in an exciting button football match.

### [Play Online!]()

<img src="https://github.com/Dougarasu/puck-soccer/blob/master/puck_soccer_cover.jpg" alt="" width="auto" height="auto">

## Input
<table>
  <tr>
    <th>Action</th><th>Keys</th>
  </tr>
  <tr>
    <td>Aim and kick with Puck</td><td>Click & Drag with mouse</td>
  </tr>
</table>

## Mechanics
* A Goal is done when the Ball gets in between the goal posts.
* A player "Wins" the game when 2 goals are scored.
* The player can set the direction and the strength of the kick when click and drag over a Puck.
* There is a "turn cool down" which indicates how much time left before the current player's turn ends, restarting the timer for the next player.
* Each player has:
  * A score, indicating how many goals he/she made in the match;
  * A name, chosen in the beginning of the match;
  * A profile picture, also chosen in the beginning of the match.

## Game Elements

* **Field** - Represented by a 2D soccer field. It has white lines around it indicating the boundaries for the playable area.

<img src="https://github.com/Dougarasu/puck-soccer/blob/master/assets/img/fields/field_bg.jpg" alt="" width="auto" height="200">

* **Ball** - Represented by a 2D soccer ball sprite. It always starts in the center of the Field and react to collision with Pucks.

<img src="https://github.com/Dougarasu/puck-soccer/blob/master/assets/img/puck_ball.png" alt="" width="50" height="50">

* **Pucks** - Represented by a 2D circular sprites, where each player has 5 Pucks which can interact to score Goals. The Pucks can collide amongst each other and the Ball.

<img src="https://github.com/Dougarasu/puck-soccer/blob/master/assets/img/profiles/brazil.png" alt="" width="50" height="50">
<img src="https://github.com/Dougarasu/puck-soccer/blob/master/assets/img/profiles/china.png" alt="" width="50" height="50">
<img src="https://github.com/Dougarasu/puck-soccer/blob/master/assets/img/profiles/poland.png" alt="" width="50" height="50">
<img src="https://github.com/Dougarasu/puck-soccer/blob/master/assets/img/profiles/usa.png" alt="" width="50" height="50">

* **Goal Post** - Represented by a 2D goal post positioned in each side of the Field. A goal is made when the Ball collides with this element, and a sound effects indicates to the player the score earned.

<img src="https://github.com/Dougarasu/puck-soccer/blob/master/assets/img/goals.png" alt="" width="auto" height="200">

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

After cloning (https://github.com/Dougarasu/puck-soccer.git) or downloading this project to your computer:

  1- Install Compass to compile SASS (if you haven't already installed):

#### Windows:

`gem install compass`

#### Linux:

`sudo gem install compass`

  2- After installation of Compass, use the command below to watch changes on the styling files:

`compass watch`

  3- The style files are located in the folder "assets/sass", with the extension ".scss".

## Built With

* Javascript - Scripting physics, mechanics and behavior of game structure and elements
* HTML / CSS - Interface and styling
* Compass / SASS - Compiling style files from SASS to CSS
* [Require JS](http://requirejs.org/) - File and module loader
* [GIMP](https://www.gimp.org/) - Image editing

## Compatibility
<table>
  <tr>
    <th>Browser</th><th>Comments</th>
  </tr>
  <tr>
    <td>Google Chrome</td><td>Used during development, no known issues.</td>
  </tr>
  <tr>
    <td>Mozilla Firefox</td><td>No know issues.</td>
  </tr>
  <tr>
    <td>Internet Explorer 10+</td><td>Sound is not working.</td>
  </tr>
  <tr>
    <td>Safari</td><td>Untested.</td>
  </tr>
  <tr>
    <td>Opera</td><td>Untested.</td>
  </tr>
</table>

## Authors

* **[Douglas Púppio](https://github.com/Dougarasu)** - *Initial work*
* **[Chen Wang](https://github.com/w124384389)** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### TO-DO List
* Support for others browsers.
* Support for mobile devices.
* Add Sound and Music buttons (on/off).
* Add sound effect to indicate whether it is a good or bad kick.
* Add network system to play in different devices.
