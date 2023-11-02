const myMap = L.map('mapid').setView([52.9529021, -1.1504818], 12);
const stationInput = document.getElementById('stationInput');
const stationsFound = [];

let maxStations = 0;

function updateProgress() {
  const currentScore = stationsFound.length;
  const percentFound = ((currentScore / maxStations) * 100).toFixed(1);
  document.getElementById('progressOverview').innerText = `${currentScore} of ${maxStations} Stations (${percentFound}% found)`;
}

L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png',
  {
    maxZoom: 19,
    attribution: `
      &copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>
      &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a>
      &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>
      &copy; <a href="https://www.openstreetmap.org/about/" target="_blank">OpenStreetMap contributors</a>`
  }
).addTo(myMap);

// Load the stations...
// TODO move this to a Cloudflare function.
const stationInfo = {
  "stations": [
    {
      "id": 1,
      "name": "Phoenix Park",
      "lines": [ 2 ],
      "latitude": 52.98885196854974,
      "longitude": -1.206747252897746,
      "spellings": [
        "phoenix park",
        "phoenix pk"
      ]
    },
    {
      "id": 2,
      "name": "Cinderhill",
      "lines": [ 2 ],
      "latitude": 52.988994054015166,
      "longitude": -1.2005513502816694,
      "spellings": [
        "cinderhill",
        "cinder hill"
      ]
    },
    {
      "id": 3,
      "name": "Highbury Vale",
      "lines": [ 2 ],
      "latitude": 52.9897871,
      "longitude": -1.1945399,
      "spellings": [
        "highbury vale"
      ]
    },
    {
      "id": 4,
      "name": "Queen's Walk",
      "lines": [ 2 ],
      "latitude": 52.94279004909993,
      "longitude": -1.150345763628964,
      "spellings": [
        "queen's walk",
        "queen's wlk",
        "queens walk",
        "queens wlk"
      ]
    },
    {
      "id": 5,
      "name": "Meadows Embankment",
      "lines": [ 2 ],
      "latitude": 52.939033531505984,
      "longitude": -1.1537173002473726,
      "spellings": [
        "meadows embankment",
        "meadow's embankment",
        "the embankment",
        "embankment"
      ]
    },
    {
      "id": 6,
      "name": "Wilford Village",
      "lines": [ 2 ],
      "latitude": 52.93550947930177,
      "longitude": -1.155852338551466,
      "spellings": [
        "wilford village"
      ]
    },
    {
      "id": 7,
      "name": "Wilford Lane",
      "lines": [ 2 ],
      "latitude": 52.925899321085375,
      "longitude": -1.1561634747867255,
      "spellings": [
        "wilford lane",
        "wilford ln"
      ]
    },
    {
      "id": 8,
      "name": "Compton Acres",
      "lines": [ 2 ],
      "latitude": 52.91904285721739,
      "longitude": -1.1575260369204587,
      "spellings": [
        "compton acres"
      ]
    },
    {
      "id": 9,
      "name": "Ruddington Lane",
      "lines": [ 2 ],
      "latitude": 52.9148184762586,
      "longitude": -1.1583092419264924,
      "spellings": [
        "ruddington lane",
        "ruddington ln"
      ]
    },
    {
      "id": 10,
      "name": "Southchurch Drive",
      "lines": [ 2 ],
      "latitude": 52.91077484665436,
      "longitude": -1.170322855700205,
      "spellings": [
        "southchurch drive",
        "southchurch dr",
        "south church drive",
        "south church dr"
      ]
    },
    {
      "id": 11,
      "name": "Rivergreen",
      "lines": [ 2 ],
      "latitude": 52.906931431182166,
      "longitude": -1.174743136008106,
      "spellings": [
        "rivergreen",
        "river green"
      ]
    },
    {
      "id": 12,
      "name": "Clifton Centre",
      "lines": [ 2 ],
      "latitude": 52.90365067044881,
      "longitude": -1.1769961915048608,
      "spellings": [
        "clifton centre",
        "clifton ctr",
        "clifton center"
      ]
    },
    {
      "id": 13,
      "name": "Holy Trinity",
      "lines": [ 2 ],
      "latitude": 52.897062515024146,
      "longitude": -1.1811509331293035,
      "spellings": [
        "holy trinity"
      ]
    },
    {
      "id": 14,
      "name": "Summerwood Lane",
      "lines": [ 2 ],
      "latitude": 52.896973441865946,
      "longitude": -1.188238401991894,
      "spellings": [
        "summerwood lane",
        "summer wood lane",
        "summerwood ln",
        "summer wood ln"
      ]
    },
    {
      "id": 15,
      "name": "Clifton South",
      "lines": [ 2 ],
      "latitude": 52.89619855429791,
      "longitude": -1.1935349599555272,
      "spellings": [
        "clifton south",
        "clifton sth",
        "clifton s"
      ]
    },
    {
      "id": 16,
      "name": "Hucknall",
      "lines": [ 1 ],
      "latitude": 53.03822756271869,
      "longitude": -1.1958199337384774,
      "spellings": [
        "hucknall"
      ]
    },
    {
      "id": 17,
      "name": "Butler's Hill",
      "lines": [ 1 ],
      "latitude": 53.02879347477343,
      "longitude": -1.1885431009257308,
      "spellings": [
        "butler's hill",
        "butlers hill"
      ]
    },
    {
      "id": 18,
      "name": "Moor Bridge",
      "lines": [ 1 ],
      "latitude": 53.014456937203896,
      "longitude": -1.1870491105546808,
      "spellings": [
        "moor bridge",
        "moor brg",
        "moor br"
      ]
    },
    {
      "id": 19,
      "name": "Bulwell Forest",
      "lines": [ 1 ],
      "latitude": 53.005895659415714,
      "longitude": -1.190289218935741,
      "spellings": [
        "bulwell forest",
        "bullwell forest"
      ]
    },
    {
      "id": 20,
      "name": "Bulwell",
      "lines": [ 1 ],
      "latitude": 52.99922297924357,
      "longitude": -1.1956053570245009,
      "spellings": [
        "bulwell",
        "bullwell"
      ]
    },
    {
      "id": 21,
      "name": "Highbury Vale",
      "lines": [ 1 ],
      "latitude": 52.989772286568744,
      "longitude": -1.1896991329723052,
      "spellings": [
        "highbury vale"
      ]
    },
    {
      "id": 22,
      "name": "Meadows Way West",
      "lines": [ 1 ],
      "latitude": 52.94353523508301,
      "longitude": -1.1557230560812897,
      "spellings": [
        "meadows way west",
        "meadow's way west",
        "meadows way w",
        "meadow's way w",
        "meadows way",
        "meadow's way"
      ]
    },
    {
      "id": 23,
      "name": "NG2",
      "lines": [ 1 ],
      "latitude": 52.94183680706651,
      "longitude": -1.1653857137324892,
      "spellings": [
        "ng2",
        "ng 2"
      ]
    },
    {
      "id": 24,
      "name": "Gregory Street",
      "lines": [ 1 ],
      "latitude": 52.943863279938675,
      "longitude": -1.1767172417767164,
      "spellings": [
        "gregory street",
        "gregory st",
        "gregory str"
      ]
    },
    {
      "id": 25,
      "name": "Queen's Medical Centre",
      "lines": [ 1 ],
      "latitude": 52.94254832604121,
      "longitude": -1.1836856205631214,
      "spellings": [
        "queen's medical centre",
        "queen's medical center",
        "queens medical centre",
        "queens medical center",
        "queen's medical ctr",
        "queens medical ctr",
        "queens medical",
        "queens",
        "queen's"
      ]
    },
    {
      "id": 26,
      "name": "University of Nottingham",
      "lines": [ 1 ],
      "latitude": 52.937277764946664,
      "longitude": -1.1882185536459102,
      "spellings": [
        "university of nottingham",
        "nottingham university",
        "nottm university",
        "university of nottm"
      ]
    },
    {
      "id": 27,
      "name": "University Boulevard",
      "lines": [ 1 ],
      "latitude": 52.932198548625486,
      "longitude": -1.2017395688353592,
      "spellings": [
        "university boulevard",
        "university blvd"
      ]
    },
    {
      "id": 28,
      "name": "Middle Street",
      "lines": [ 1 ],
      "latitude": 52.92785580149485,
      "longitude": -1.209080774662305,
      "spellings": [
        "middle street",
        "middle str",
        "middle st"
      ]
    },
    {
      "id": 29,
      "name": "Beeston Centre",
      "lines": [ 1 ],
      "latitude": 52.92540751914861,
      "longitude": -1.214831430596855,
      "spellings": [
        "beeston centre",
        "beeston center"
      ]
    },
    {
      "id": 30,
      "name": "Chilwell Road",
      "lines": [ 1 ],
      "latitude": 52.92265880696913,
      "longitude": -1.2203943319066437,
      "spellings": [
        "chilwell road",
        "chilwell rd",
        "chillwell road",
        "chillwell rd",
        "chil well road",
        "chil well rd",
        "chill well road",
        "chill well rd"
      ]
    },
    {
      "id": 31,
      "name": "High Road - Central College",
      "lines": [ 1 ],
      "latitude": 52.921239065209,
      "longitude": -1.223344761723886,
      "spellings": [
        "high road - central college",
        "high rd - central college",
        "high road",
        "high rd",
        "central college",
        "beeston high road",
        "beeston high rd",
        "beeston college",
        "beeston central college"
      ]
    },
    {
      "id": 32,
      "name": "Cator Lane",
      "lines": [ 1 ],
      "latitude": 52.92262969945599,
      "longitude": -1.231136578650164,
      "spellings": [
        "cator lane",
        "cator ln"
      ]
    },
    {
      "id": 33,
      "name": "Bramcote Lane",
      "lines": [ 1 ],
      "latitude": 52.9215235994507,
      "longitude": -1.2362837375766855,
      "spellings": [
        "bramcote lane",
        "bramcote ln",
        "bramcoat lane",
        "bramcoat ln"
      ]
    },
    {
      "id": 34,
      "name": "Eskdale Drive",
      "lines": [ 1 ],
      "latitude": 52.92034631577148,
      "longitude": -1.2429356157099627,
      "spellings": [
        "eskdale drive",
        "eskdale dr"
      ]
    },
    {
      "id": 35,
      "name": "Inham Road",
      "lines": [ 1 ],
      "latitude": 52.91953125447315,
      "longitude": -1.2518512781757,
      "spellings": [
        "inham road",
        "inham rd",
        "innham road",
        "innham rd"
      ]
    },
    {
      "id": 36,
      "name": "Toton Lane",
      "lines": [ 1 ],
      "latitude": 52.91843801324574,
      "longitude": -1.2621080451037914,
      "spellings": [
        "toton lane",
        "toton ln",
        "total la"
      ]
    },
    {
      "id": 37,
      "name": "David Lane",
      "lines": [ 1, 2 ],
      "latitude": 52.98486046767809,
      "longitude": -1.182033379865476,
      "spellings": [
        "david lane",
        "david ln",
        "david la"
      ]
    },
    {
      "id": 38,
      "name": "Basford",
      "lines": [ 1, 2 ],
      "latitude": 52.98160499002741,
      "longitude": -1.1783051094601311,
      "spellings": [
        "basford",
        "bassford",
        "baseford"
      ]
    },
    {
      "id": 39,
      "name": "Wilkinson Street",
      "lines": [ 1, 2 ],
      "latitude": 52.97200830087293,
      "longitude": -1.178240736445932,
      "spellings": [
        "wilkinson street",
        "wilkinson st",
        "wilkinson str"
      ]
    },
    {
      "id": 40,
      "name": "Shipstone Street",
      "lines": [ 1, 2 ],
      "latitude": 52.97152211096274,
      "longitude": -1.173544054508408,
      "spellings": [
        "shipstone street",
        "shipstone st",
        "shipstone str",
        "ship stone street",
        "ship stone st",
        "ship stone str",
        "shipston street",
        "shipston st",
        "shipston str"
      ]
    },
    {
      "id": 41,
      "name": "Beaconsfield Street",
      "lines": [ 1, 2 ],
      "latitude": 52.9702795,
      "longitude": -1.1730928,
      "spellings": [
        "beaconsfield street",
        "beaconsfield st",
        "beaconsfield str",
        "beacons field street",
        "beacons field st",
        "beacons field str"
      ]
    },
    {
      "id": 42,
      "name": "Noel Street",
      "lines": [ 1, 2 ],
      "latitude": 52.9674279,
      "longitude": -1.1713717,
      "spellings": [
        "noel street",
        "noel st",
        "noel str"
      ]
    },
    {
      "id": 43,
      "name": "Radford Road",
      "lines": [ 1, 2 ],
      "latitude": 52.9698488,
      "longitude": -1.1765246,
      "spellings": [
        "radford road",
        "radford rd"
      ]
    },
    {
      "id": 44,
      "name": "Hyson Green Market",
      "lines": [ 1, 2 ],
      "latitude": 52.9663272,
      "longitude": -1.1734862,
      "spellings": [
        "hyson green market",
        "hyson green mkt",
        "hyson green"
      ]
    },
    {
      "id": 45,
      "name": "The Forest",
      "lines": [ 1, 2 ],
      "latitude": 52.9653846,
      "longitude": -1.1698225,
      "spellings": [
        "the forest",
        "forest rec",
        "forest recreation",
        "forest recreation ground"
      ]
    },
    {
      "id": 46,
      "name": "High School",
      "lines": [ 1, 2 ],
      "latitude": 52.962330315939624,
      "longitude": -1.1614796128754852,
      "spellings": [
        "high school",
        "high sch",
        "nottingham high school",
        "nottingham high sch",
        "nottingham high"
      ]
    },
    {
      "id": 47,
      "name": "Nottingham Trent University",
      "lines": [ 1, 2 ],
      "latitude": 52.95783871058926,
      "longitude": -1.1548652856671606,
      "spellings": [
        "nottingham trent university",
        "nottingham trent",
        "trent university",
        "trent uni",
        "ntu",
        "ntu campus"
      ]
    },
    {
      "id": 48,
      "name": "Royal Centre",
      "lines": [ 1, 2 ],
      "latitude": 52.955065961581674,
      "longitude": -1.1518075674929928,
      "spellings": [
        "royal centre",
        "royal center",
        "theatre royal",
        "theater royal"
      ]
    },
    {
      "id": 49,
      "name": "Old Market Square",
      "lines": [ 1, 2 ],
      "latitude": 52.9530622327645,
      "longitude": -1.1500802249454742,
      "spellings": [
        "old market square",
        "old market sq",
        "market square",
        "market sq"
      ]
    },
    {
      "id": 50,
      "name": "Lace Market",
      "lines": [ 1, 2 ],
      "latitude": 52.95290063768557,
      "longitude": -1.145477554430681,
      "spellings": [
        "lace market",
        "lace mkt",
        "the lace market",
        "the lace mkt",
        "hockley",
        "hockly"
      ]
    },
    {
      "id": 51,
      "name": "Nottingham Station",
      "lines": [ 1, 2 ],
      "latitude": 52.94717889398906,
      "longitude": -1.1456038864710183,
      "spellings": [
        "nottingham station",
        "nottingham stn",
        "railway station",
        "railway stn",
        "train station",
        "train stn"
      ]
    }
  ]
}

maxStations = stationInfo.stations.length;

// Initialise the found stations header.
updateProgress();

stationInput.addEventListener('animationend', () => {
  stationInput.classList.remove('animate__animated', 'animate__rubberBand');
  document.getElementById('wrongGuessIcon').classList.add('is-hidden');
  document.getElementById('subwayIcon').classList.remove('is-hidden');
});

stationInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();
      const guess = stationInput.value.trim().toLowerCase();
      
      // TODO move this to a Cloudflare function.
      // Check their guess...
      for (const station of stationInfo.stations) {
        if (station.spellings.includes(guess)) {
          if (stationsFound.includes(station.id)) {
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
              stationInput.value = '';
            }, 750);

            return;
          }

          // First time finding it! Update the marker...
          myMap.removeLayer(station.marker);

          station.marker = L.circleMarker({ lat: station.latitude, lng: station.longitude }, { 
            radius: 5,
            color: '#00d1b2',
            fill: true,
            fillColor: '#00d1b2',
            fillOpacity: 1
          });

          station.marker.bindTooltip(station.name);
          station.marker.addTo(myMap);

          document.getElementById('subwayIcon').classList.add('is-hidden');
          document.getElementById('rightGuessIcon').classList.remove('is-hidden');

          // Show where the station is on the map.
          myMap.setView({ lat: station.latitude, lng: station.longitude }, 14, { 
            animate: true, 
            duration: 0.5
          });

          const foundStationsList = document.getElementById('foundStationsList');
          foundStationsList.innerHTML = `
            ${foundStationsList.innerHTML}
            <a class="panel-block is-active">
              <span class="panel-icon">
                <i class="fas fa-subway" aria-hidden="true"></i>
            </span>
            ${station.name}
            </a>
          `;

          stationsFound.push(station.id);  
          updateProgress();

          // Put the input field back after a short delay.
          setTimeout(() => {
            document.getElementById('subwayIcon').classList.remove('is-hidden');
            document.getElementById('rightGuessIcon').classList.add('is-hidden');
            stationInput.value = '';
          }, 750);

          // All done.
          return;
        }
      }

      // Animate for an incorrect guess.
      document.getElementById('subwayIcon').classList.add('is-hidden');
      document.getElementById('wrongGuessIcon').classList.remove('is-hidden');
      stationInput.classList.add('animate__animated', 'animate__rubberBand');

  }
});

// Draw the station markers.
for (const station of stationInfo.stations) {
  const marker = L.circleMarker({ lat: station.latitude, lng: station.longitude }, { 
    radius: 5,
    color: '#ff0000'
  });

  marker.stationId = station.id;
  station.marker = marker;
  marker.addTo(myMap);
}