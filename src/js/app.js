async function runGame() {
  async function loadConfig() {
    const configFile = await fetch('/data/config.json');
    const configData = await configFile.json();
    return configData;
  }

  async function loadStations() {
    const stationFile = await fetch('/data/stations.json');
    const stationsData = await stationFile.json();
    return stationsData.stations;
  }

  async function loadTrackSegments() {
    const trackSegmentsFile = await fetch('/data/tracksegments.json');
    const trackSegmentsData = await trackSegmentsFile.json();
    return trackSegmentsData.trackSegments;
  }

  function updateProgress() {
    const currentScore = Object.keys(stationsFound).length;
    const percentFound = ((currentScore / maxStations) * 100).toFixed(1);
    document.getElementById('progressOverview').innerText = `${currentScore} of ${maxStations} stations (${percentFound}%): ${numGuesses} guess${numGuesses == 1 ? '' : 'es'}`;

    // Did they win - pop the modal if so!
    if (currentScore === maxStations) {
      setTimeout(
        () => {
          document.getElementById('guessed-all').classList.add('is-active');
        },
        500
      );
    }
  }
  
  // Load the config, track segments and anonymous station data.
  const config = await loadConfig();
  const trackSegments = await loadTrackSegments();
  const stations = await loadStations();
  const stationsFound = {};

  let maxStations = stations.length;
  let numGuesses = 0;
  
  const myMap = L.map('mapid').setView([config.map.startPos.latitude, config.map.startPos.longitude], config.map.startPos.zoom);
  const stationInput = document.getElementById('stationInput');

  L.tileLayer(
    `https://tiles.stadiamaps.com/tiles/${config.map.tileLayer}/{z}/{x}/{y}{r}.png`,
    {
      maxZoom: config.map.maxZoom,
      attribution: `
      &copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>
      &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a>
      &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>
      &copy; <a href="https://www.openstreetmap.org/about/" target="_blank">OpenStreetMap contributors</a>`
    }
  ).addTo(myMap);

  // Initialise the found stations header.
  updateProgress();

  stationInput.addEventListener('animationend', () => {
    stationInput.classList.remove('animate__animated', 'animate__rubberBand');
    document.getElementById('wrongGuessIcon').classList.add('is-hidden');
    document.getElementById('subwayIcon').classList.remove('is-hidden');
    document.getElementById('stationControl').classList.remove('is-loading');
    stationInput.removeAttribute('disabled');
    stationInput.focus();
  });

  stationInput.addEventListener('keyup', async function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('stationControl').classList.add('is-loading');
      stationInput.setAttribute('disabled', '');

      const guess = stationInput.value.trim().toLowerCase();
      let alreadyFound = false;

      // Does this guess match a previously guessed station? (save time/API call).
      for (const id in stationsFound) {
        if (stationsFound[id].includes(guess)) {
          // Guessed this one before, no need to call the backend function for this.
          alreadyFound = true;
          break;
        }
      }

      if (!alreadyFound) {
        // Check their guess against the API...
        const resp = await fetch('/api/guess', {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: `{ "guess": "${guess}" }`
        });
        const reply = await resp.json();

        if (reply.id === 0) {
          // Bad guess, provide some animated feedback.
          document.getElementById('subwayIcon').classList.add('is-hidden');
          document.getElementById('wrongGuessIcon').classList.remove('is-hidden');
          stationInput.classList.add('animate__animated', 'animate__rubberBand');
          numGuesses += 1;
          updateProgress();
        } else {
          // First time finding it! Get the station info...
          const station = stations.filter((s) => s.id === reply.id)[0];

          // Update the marker...
          myMap.removeLayer(station.marker);

          station.marker = L.circleMarker({ lat: station.latitude, lng: station.longitude }, {
            radius: config.station.radius,
            color: config.station.colors.found,
            fill: true,
            fillColor: config.station.colors.found,
            fillOpacity: 1
          });

          station.marker.bindPopup(`<b style="font-size:1.5em">${reply.name}</b><hr/><p>${reply.description}</p>`).openPopup();
          station.marker.on('mouseover', function (e) {
            this.openPopup();
          });

          station.marker.addTo(myMap);

          document.getElementById('subwayIcon').classList.add('is-hidden');
          document.getElementById('rightGuessIcon').classList.remove('is-hidden');

          // Show where the station is on the map.
          myMap.setView({ lat: station.latitude, lng: station.longitude }, config.station.zoom.level, { 
            animate: true,
            duration: config.station.zoom.duration
          });

          // Add the station to the list of found stations.
          const foundStationsList = document.getElementById('foundStationsList');
          const newFoundStation = document.createElement('a');
          newFoundStation.id = `found-station-${station.id}`;
          newFoundStation.classList.add('panel-block', 'is-active');
          newFoundStation.innerHTML = `
          <span class="panel-icon">
            <i class="fas fa-subway" aria-hidden="true"></i>
          </span>
          ${reply.name}
        `;

          // Add listener to focus the map on this station when it is clicked in 
          // the list.
          newFoundStation.addEventListener('click', (e) => {
            myMap.setView({ lat: station.latitude, lng: station.longitude }, config.station.zoom.level, { 
              animate: true,
              duration: config.station.zoom.duration
            });
          });

          foundStationsList.prepend(newFoundStation);
          numGuesses += 1;
          stationsFound[reply.id] = reply.spellings;
          updateProgress();

          // Put the input field back after a short delay.
          setTimeout(() => {
            document.getElementById('subwayIcon').classList.remove('is-hidden');
            document.getElementById('rightGuessIcon').classList.add('is-hidden');
            document.getElementById('stationControl').classList.remove('is-loading');
            stationInput.value = '';
            stationInput.removeAttribute('disabled');
            stationInput.focus();
          }, 750);
        }
      } else {
        // Let the user know this has been found before...
        document.getElementById('subwayIcon').classList.add('is-hidden');
        document.getElementById('alreadyGotItIcon').classList.remove('is-hidden');
        document.getElementById('inputHelp').classList.add('is-hidden');
        document.getElementById('alreadyFoundIt').classList.remove('is-hidden');

        // Put the input field back after a short delay...
        setTimeout(() => {
          document.getElementById('alreadyGotItIcon').classList.add('is-hidden');
          document.getElementById('subwayIcon').classList.remove('is-hidden');
          document.getElementById('alreadyFoundIt').classList.add('is-hidden');
          document.getElementById('inputHelp').classList.remove('is-hidden');
          document.getElementById('stationControl').classList.remove('is-loading');
          stationInput.value = '';
          stationInput.removeAttribute('disabled');
          stationInput.focus();
        }, 750);
      }
    }
  });

  // Draw the track segments.
  for (const segment of trackSegments) {
    const latLngs = [];

    for (const point of segment.points) {
      latLngs.push({ lat: point.latitude, lng: point.longitude });
    }

    const segmentLine = L.polyline(latLngs, {
      color: config.track.color,
      weight: config.track.weight
    });

    segmentLine.addTo(myMap);
  }

  // Draw the station markers.
  for (const station of stations) {
    const marker = L.circleMarker({ lat: station.latitude, lng: station.longitude }, {
      radius: config.station.radius,
      color: config.station.colors.notFound
    });

    marker.stationId = station.id;
    station.marker = marker;
    marker.addTo(myMap);
  }

  // Add success modal close button click handler.
  document.getElementById('close-guessed-all').addEventListener('click', (e) => {
    document.getElementById('guessed-all').classList.remove('is-active');
  });
}

runGame();