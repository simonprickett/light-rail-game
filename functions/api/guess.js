import stations from '../../lib/stations';

export async function onRequestPost(context) {
  let responseObj = {
    id: 0,
    name: '',
    description: '',
    spellings: []
  };

  try {
    const requestData = await context.request.json();

    if (requestData.guess) {
      // Look for the station.
      const guess = requestData.guess.trim().toLowerCase();
      for (const station of stations) {
        if (station.spellings.includes(guess)) {
          responseObj = station;
          break;
        }
      }
    }
  } catch (e) {
    // Swallow errors as we will just return responseObj with id 0.
  }

  return new Response(
    JSON.stringify(responseObj),
    {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    }
  );
}