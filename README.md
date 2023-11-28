# Light Rail Game

This is a light rail station name guessing game using [Cloudflare Pages and Workers](https://pages.cloudflare.com/), the [Bulma CSS framework](https://bulma.io/) and [Leaflet maps](https://leafletjs.com/) with tiles from [Stamen](https://maps.stamen.com/#watercolor/12/37.7706/-122.3782).

![GIF showing the tram game working in a browser](readme_images/tramgame_demo_nottingham.gif)

TODO - write a full README... meantime, try it out in the following locations:

* [Nottingham Trams](https://tramgame.simonprickett.dev/)
* [Edinburgh Trams](https://edtramgame.simonprickett.dev/)
* [Glasgow Subway](https://glasubgame.simonprickett.dev/)
* [Austin MetroRail](https://austingame.simonprickett.dev/)
* [SF Bay Area BART](https://bartgame.simonprickett.dev/)

You'll need a recent version of [Node.js](https://nodejs.org/en/download) installed to run this game.  I've tested it with version 18.18.2.

To run this project locally, first clone it and install the dependencies:

```
git clone https://github.com/simonprickett/light-rail-game.git
cd light-rail-game
npm install
```

The game exists for a few different locations, and has to be built with a specific location target.  

For the Nottingham Tram system:

```
npm run build nottingham
```

If you want to play with the Glasgow Subway data:

```
npm run build glasgow
```

The Edinburgh Tram system can be built like this:

```
npm run build edinburgh
```

And Austin MetroRail:

```
npm run build austin
```

To use the SF BART data:

```
npm run build sfbay
```

Now start the local server:

```
npm start
```

The URL that the game is running on will be displayed in your console output.  Example: `http://127.0.0.1:8788/`
