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

// Load the track segments...
// TODO move this to a Cloudflare function.
const trackSegments = {
  "tracks": [
    {
      "segment": "Hucknall To Highbury Vale",
      "points": [
        {
          "latitude": 53.03822917548256,
          "longitude": -1.1958210066220325
        },
        {
          "latitude": 53.03649380667707,
          "longitude": -1.19449599541322
        },
        {
          "latitude": 53.03477449695946,
          "longitude": -1.1930958823545348
        },
        {
          "latitude": 53.031325993727904,
          "longitude": -1.190338571579922
        },
        {
          "latitude": 53.029858118693475,
          "longitude": -1.189153035235213
        },
        {
          "latitude": 53.02882573709652,
          "longitude": -1.188466389750494
        },
        {
          "latitude": 53.02828372686561,
          "longitude": -1.188176711186613
        },
        {
          "latitude": 53.02775784138134,
          "longitude": -1.1879353123833891
        },
        {
          "latitude": 53.027286797405694,
          "longitude": -1.187760968803273
        },
        {
          "latitude": 53.026815748285834,
          "longitude": -1.1875866252231773
        },
        {
          "latitude": 53.026086579914455,
          "longitude": -1.1873774129270689
        },
        {
          "latitude": 53.02536385219728,
          "longitude": -1.1872593957343751
        },
        {
          "latitude": 53.02494440645112,
          "longitude": -1.187195022720176
        },
        {
          "latitude": 53.024402347445665,
          "longitude": -1.187136014123845
        },
        {
          "latitude": 53.02387318803679,
          "longitude": -1.1871091920345982
        },
        {
          "latitude": 53.0228180764263,
          "longitude": -1.1870877343631878
        },
        {
          "latitude": 53.02069486843021,
          "longitude": -1.1870394546025305
        },
        {
          "latitude": 53.01645136610733,
          "longitude": -1.1869643527526574
        },
        {
          "latitude": 53.015431572553744,
          "longitude": -1.186905344156295
        },
        {
          "latitude": 53.014966848510134,
          "longitude": -1.1869214374098684
        },
        {
          "latitude": 53.01445370989795,
          "longitude": -1.1870501834382357
        },
        {
          "latitude": 53.01379533443993,
          "longitude": -1.1871011454078113
        },
        {
          "latitude": 53.013346729722095,
          "longitude": -1.1872245270183417
        },
        {
          "latitude": 53.01271496373123,
          "longitude": -1.1874337393144498
        },
        {
          "latitude": 53.01205938579544,
          "longitude": -1.187610765103475
        },
        {
          "latitude": 53.01032013970549,
          "longitude": -1.1881364780527426
        },
        {
          "latitude": 53.00805752215139,
          "longitude": -1.188957233983697
        },
        {
          "latitude": 53.00749911183901,
          "longitude": -1.1891932683690527
        },
        {
          "latitude": 53.00693746643434,
          "longitude": -1.1894883113507706
        },
        {
          "latitude": 53.00639760210962,
          "longitude": -1.189823587466359
        },
        {
          "latitude": 53.00589404544265,
          "longitude": -1.1901776390444392
        },
        {
          "latitude": 53.00512255941146,
          "longitude": -1.1907838182614172
        },
        {
          "latitude": 53.00436719989688,
          "longitude": -1.1914704637461362
        },
        {
          "latitude": 53.002862897561485,
          "longitude": -1.192833025879901
        },
        {
          "latitude": 53.00134885794948,
          "longitude": -1.1942063168493389
        },
        {
          "latitude": 53.00096791851416,
          "longitude": -1.1945228175024671
        },
        {
          "latitude": 53.000570833999504,
          "longitude": -1.194812496066317
        },
        {
          "latitude": 53.00017697420659,
          "longitude": -1.1950646237052456
        },
        {
          "latitude": 52.9996604313273,
          "longitude": -1.1953489378512585
        },
        {
          "latitude": 52.9991535676199,
          "longitude": -1.195547421311693
        },
        {
          "latitude": 52.99860472759642,
          "longitude": -1.1957244471007176
        },
        {
          "latitude": 52.99797516721391,
          "longitude": -1.195810277786327
        },
        {
          "latitude": 52.99735689769946,
          "longitude": -1.1958531931291163
        },
        {
          "latitude": 52.99673539070125,
          "longitude": -1.1958424642934111
        },
        {
          "latitude": 52.996120332111936,
          "longitude": -1.1957807734881616
        },
        {
          "latitude": 52.995511722207375,
          "longitude": -1.195635934206221
        },
        {
          "latitude": 52.99490794687675,
          "longitude": -1.1954079464476208
        },
        {
          "latitude": 52.99430739191692,
          "longitude": -1.1951129034659027
        },
        {
          "latitude": 52.99372943060153,
          "longitude": -1.1947534874699857
        },
        {
          "latitude": 52.993135317053074,
          "longitude": -1.1942921475349484
        },
        {
          "latitude": 52.992583171590795,
          "longitude": -1.1937717990035488
        },
        {
          "latitude": 52.99203747703432,
          "longitude": -1.1931763486222446
        },
        {
          "latitude": 52.99153698188207,
          "longitude": -1.1925272540624778
        },
        {
          "latitude": 52.991078458651785,
          "longitude": -1.1918406085777586
        },
        {
          "latitude": 52.990645763251834,
          "longitude": -1.1911298232126888
        },
        {
          "latitude": 52.98908770099821,
          "longitude": -1.1886105584801658
        }
      ]
    },
    {
      "segment": "The Forest to Wilkinson Street",
      "points": [
        {
          "latitude": 52.96653132185581,
          "longitude": -1.1681384647519628
        },
        {
          "latitude": 52.96717038696437,
          "longitude": -1.1685821021081255
        },
        {
          "latitude": 52.96826724362744,
          "longitude": -1.169263249064548
        },
        {
          "latitude": 52.968716316822814,
          "longitude": -1.1695448810016422
        },
        {
          "latitude": 52.969167000698654,
          "longitude": -1.1697944605420814
        },
        {
          "latitude": 52.970158811746515,
          "longitude": -1.1703899109233855
        },
        {
          "latitude": 52.97066278518714,
          "longitude": -1.1707117759943353
        },
        {
          "latitude": 52.9709147697038,
          "longitude": -1.1708727085298332
        },
        {
          "latitude": 52.97115867639443,
          "longitude": -1.1710255273833248
        },
        {
          "latitude": 52.971200673434055,
          "longitude": -1.1710522824173475
        },
        {
          "latitude": 52.97124267043287,
          "longitude": -1.171103244386923
        },
        {
          "latitude": 52.97127336052158,
          "longitude": -1.1711649351921725
        },
        {
          "latitude": 52.97128951319109,
          "longitude": -1.1712373548331585
        },
        {
          "latitude": 52.97128951319109,
          "longitude": -1.1713553720258203
        },
        {
          "latitude": 52.97127012998695,
          "longitude": -1.1714760714274324
        },
        {
          "latitude": 52.97122974828375,
          "longitude": -1.1716396861718648
        },
        {
          "latitude": 52.97120228870403,
          "longitude": -1.1717925720805604
        },
        {
          "latitude": 52.971192597083466,
          "longitude": -1.1718918138107624
        },
        {
          "latitude": 52.9711893665428,
          "longitude": -1.1720044665856189        },
        {
          "latitude": 52.971195827623895,
          "longitude": -1.1721117549426072
        },
        {
          "latitude": 52.97121036505278,
          "longitude": -1.1722109966728087
        },
        {
          "latitude": 52.97122974828375,
          "longitude": -1.1723129206119605
        },
        {
          "latitude": 52.971258823113864,
          "longitude": -1.1724067979243251
        },
        {
          "latitude": 52.97129274372427,
          "longitude": -1.1724872641920665
        },
        {
          "latitude": 52.97132020324655,
          "longitude": -1.1725489549973158
        },
        {
          "latitude": 52.97143246405318,
          "longitude": -1.1727891468065248
        },
        {
          "latitude": 52.971474460826734,
          "longitude": -1.17291252841705
        },
        {
          "latitude": 52.97149707445715,
          "longitude": -1.1730037235205013
        },
        {
          "latitude": 52.97150999652635,
          "longitude": -1.1730841897882427
        },
        {
          "latitude": 52.971518072817666,
          "longitude": -1.173180749309526
        },
        {
          "latitude": 52.971521303333745,
          "longitude": -1.1732719444129722
        },
        {
          "latitude": 52.971520091890234,
          "longitude": -1.173649398263914
        },
        {
          "latitude": 52.97152614910745,
          "longitude": -1.1748088501268428
        },
        {
          "latitude": 52.97154553219676,
          "longitude": -1.1753774784188684
        },
        {
          "latitude": 52.97155522373816,
          "longitude": -1.175876369278858
        },
        {
          "latitude": 52.971566530533714,
          "longitude": -1.1760694883214555
        },
        {
          "latitude": 52.97160691192228,
          "longitude": -1.1763913533924206
        },
        {
          "latitude": 52.97168928983794,
          "longitude": -1.1768124601935874
        }
      ]
    }
  ]
};

// Load the stations...
// TODO move this to a Cloudflare function.
const stationInfo = {
  "stations": [
    {
      "id": 1,
      "name": "Phoenix Park",
      "lines": [ 2 ],
      "latitude": 52.9888701,
      "longitude": -1.2294598,
      "spellings": [
        "phoenix park",
        "phoenix pk"
      ]
    },
    {
      "id": 2,
      "name": "Cinderhill",
      "lines": [ 2 ],
      "latitude": 52.989002,
      "longitude": -1.2032973,
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
      "latitude": 52.9427018,
      "longitude": -1.1529373,
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
      "latitude": 52.9390042,
      "longitude": -1.1562377,
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
      "latitude": 52.9352505,
      "longitude": -1.1565327,
      "spellings": [
        "wilford village"
      ]
    },
    {
      "id": 7,
      "name": "Wilford Lane",
      "lines": [ 2 ],
      "latitude": 52.9259375,
      "longitude": -1.1575157,
      "spellings": [
        "wilford lane",
        "wilford ln"
      ]
    },
    {
      "id": 8,
      "name": "Compton Acres",
      "lines": [ 2 ],
      "latitude": 52.91909,
      "longitude": -1.1600833,
      "spellings": [
        "compton acres"
      ]
    },
    {
      "id": 9,
      "name": "Ruddington Lane",
      "lines": [ 2 ],
      "latitude": 52.9144632,
      "longitude": -1.1609714,
      "spellings": [
        "ruddington lane",
        "ruddington ln"
      ]
    },
    {
      "id": 10,
      "name": "Southchurch Drive",
      "lines": [ 2 ],
      "latitude": 52.9108988,
      "longitude": -1.172502,
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
      "latitude": 52.906933,
      "longitude": -1.1773169,
      "spellings": [
        "rivergreen",
        "river green"
      ]
    },
    {
      "id": 12,
      "name": "Clifton Centre",
      "lines": [ 2 ],
      "latitude": 52.9036867,
      "longitude": -1.179558,
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
      "latitude": 52.897312,
      "longitude": -1.1835562,
      "spellings": [
        "holy trinity"
      ]
    },
    {
      "id": 14,
      "name": "Summerwood Lane",
      "lines": [ 2 ],
      "latitude": 52.8969818,
      "longitude": -1.1928266,
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
      "latitude": 52.896671,
      "longitude": -1.1952733,
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
      "latitude": 53.0387698,
      "longitude": -1.2005843,
      "spellings": [
        "hucknall"
      ]
    },
    {
      "id": 17,
      "name": "Butler's Hill",
      "lines": [ 1 ],
      "latitude": 53.0288049,
      "longitude": -1.1933195,
      "spellings": [
        "butler's hill",
        "butlers hill"
      ]
    },
    {
      "id": 18,
      "name": "Moor Bridge",
      "lines": [ 1 ],
      "latitude": 53.014484,
      "longitude": -1.1895743,
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
      "latitude": 53.0060014,
      "longitude": -1.1927724,
      "spellings": [
        "bulwell forest",
        "bullwell forest"
      ]
    },
    {
      "id": 20,
      "name": "Bulwell",
      "lines": [ 1 ],
      "latitude": 52.9992301,
      "longitude": -1.1981893,
      "spellings": [
        "bulwell",
        "bullwell"
      ]
    },
    {
      "id": 21,
      "name": "Highbury Vale",
      "lines": [ 1 ],
      "latitude": 52.9897872,
      "longitude": -1.1922439,
      "spellings": [
        "highbury vale"
      ]
    },
    {
      "id": 22,
      "name": "Meadows Way West",
      "lines": [ 1 ],
      "latitude": 52.9433398,
      "longitude": -1.1593675,
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
      "latitude": 52.9418269,
      "longitude": -1.1679038,
      "spellings": [
        "ng2",
        "ng 2"
      ]
    },
    {
      "id": 24,
      "name": "Gregory Street",
      "lines": [ 1 ],
      "latitude": 52.9438643,
      "longitude": -1.1796904,
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
      "latitude": 52.9425645,
      "longitude": -1.1861838,
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
      "latitude": 52.9367003,
      "longitude": -1.1893979,
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
      "latitude": 52.932217,
      "longitude": -1.2047433,
      "spellings": [
        "university boulevard",
        "university blvd"
      ]
    },
    {
      "id": 28,
      "name": "Middle Street",
      "lines": [ 1 ],
      "latitude": 52.927868,
      "longitude": -1.2116373,
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
      "latitude": 52.925362,
      "longitude": -1.2173653,
      "spellings": [
        "beeston centre",
        "beeston center"
      ]
    },
    {
      "id": 30,
      "name": "Chilwell Road",
      "lines": [ 1 ],
      "latitude": 52.922718,
      "longitude": -1.2227823,
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
      "latitude": 52.9212989,
      "longitude": -1.2281265,
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
      "latitude": 52.922626,
      "longitude": -1.2340283,
      "spellings": [
        "cator lane",
        "cator ln"
      ]
    },
    {
      "id": 33,
      "name": "Bramcote Lane",
      "lines": [ 1 ],
      "latitude": 52.921581,
      "longitude": -1.2387913,
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
      "latitude": 52.920286,
      "longitude": -1.2457754,
      "spellings": [
        "eskdale drive",
        "eskdale dr"
      ]
    },
    {
      "id": 35,
      "name": "Inham Road",
      "lines": [ 1 ],
      "latitude": 52.919582,
      "longitude": -1.2540263,
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
      "latitude": 52.9184276,
      "longitude": -1.2658761,
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
      "latitude": 52.984894,
      "longitude": -1.1847373,
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
      "latitude": 52.981686,
      "longitude": -1.1811493,
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
      "latitude": 52.972056,
      "longitude": -1.1807227,
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
      "latitude": 52.9715151,
      "longitude": -1.1762386,
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
      "latitude": 52.9622879,
      "longitude": -1.1641329,
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
      "latitude": 52.957883,
      "longitude": -1.1598948,
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
      "latitude": 52.9551982,
      "longitude": -1.1543968,
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
      "latitude": 52.9531453,
      "longitude": -1.152568,
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
      "latitude": 52.9530064,
      "longitude": -1.1480968,
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
      "latitude": 52.9471816,
      "longitude": -1.1488292,
      "spellings": [
        "nottingham station",
        "nottingham stn",
        "railway station",
        "railway stn"
      ]
    }
  ]
};

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

// Draw the track segments.
for (const segment of trackSegments.tracks) {
  const latLngs = [];

  for (const point of segment.points) {
    latLngs.push({ lat: point.latitude, lng: point.longitude });
  }

  const segmentLine = L.polyline(latLngs, {
    color: '#ff0000',
    weight: 6
  });

  segmentLine.addTo(myMap);
}

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