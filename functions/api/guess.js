import stations from '../../lib/stations';

export async function onRequestPost(context) {
  let stationId = 0;
  let stationName = '';
  let stationDescription = '';
  let stationSpellings = {};

  try {
    const requestData = await context.request.json();

    if (requestData.guess) {
      // Look for the station.
      const guess = requestData.guess.trim().toLowerCase();
      for (const station of stations) {
        if (station.spellings.includes(guess)) {
          stationId = station.id;
          stationName = station.name;
          stationDescription = station.description;
          stationSpellings = station.spellings;
          break;
        }
      }
    }
  } catch (e) {
    // Swallow errors as we will just return stationId 0
    // and stationName '', stationDescription '', stationSpellings {}.
  }

  return new Response(
    `{ "stationId": ${stationId}, "stationName": "${stationName}", "stationDescription": "${stationDescription}", "stationSpellings": ${JSON.stringify(stationSpellings)} }`, 
    {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    }
  );
}