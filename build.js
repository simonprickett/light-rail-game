import copyfiles from 'copyfiles';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';

const SOURCE_FOLDER_NAME = 'src';
const OUTPUT_FOLDER_NAME = 'dist';
const LIB_FOLDER_NAME = 'lib';

async function copyFiles(srcPath, destPath, up) {
  return new Promise((resolve, reject) => {
    copyfiles([srcPath, destPath], { up }, (err, resp) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

// Make sure we were invoked with a city name...
if (process.argv.length !== 3) {
  console.error('Usage: npm run build <city>');
  process.exit(1);
}

const city = process.argv[2];
console.log(`Building for ${city}.`);

// Check if the city is set up... could check individual files here
// to if needed, but this is probably a good enough sanity check.
try {
  await Promise.all([
    fs.stat(`${SOURCE_FOLDER_NAME}/data/${city}`),
    fs.stat(`${SOURCE_FOLDER_NAME}/images/${city}`)
  ]);
} catch(e) {
  console.error(`Missing folder for ${city}.`);
  process.exit(1);
}

console.log('City checks completed OK.');

try {
  // Delete the previous output.
  await fs.rm(OUTPUT_FOLDER_NAME, {
    recursive: true,
    force: true
  });
  console.log(`Deleted ${OUTPUT_FOLDER_NAME}.`);

  await fs.rm(LIB_FOLDER_NAME, {
    recursive: true,
    force: true
  });
  console.log(`Deleted ${LIB_FOLDER_NAME}.`);

  // Copy the CSS files across.
  // SOURCE_FOLDER_NAME/css/* -> OUTPUT_FOLDER_NAME/css
  await copyFiles(`${SOURCE_FOLDER_NAME}/css/*.css`, `${OUTPUT_FOLDER_NAME}/css`, 2);
  console.log(`Copied CSS files ${SOURCE_FOLDER_NAME}/css to ${OUTPUT_FOLDER_NAME}/css.`);

  // Copy the JS files across.
  // SOURCE_FOLDER_NAME/js/* -> OUTPUT_FOLDER_NAME/js
  await copyFiles(`${SOURCE_FOLDER_NAME}/js/*.js`, `${OUTPUT_FOLDER_NAME}/js`, 2);
  console.log(`Copied CSS files ${SOURCE_FOLDER_NAME}/js to ${OUTPUT_FOLDER_NAME}/js.`);

  // Copy the city specific image files across.
  // SOURCE_FOLDER_NAME/images/<city>/* -> OUTPUT_FOLDER_NAME/images
  await copyFiles(`${SOURCE_FOLDER_NAME}/images/${city}/*.*`, `${OUTPUT_FOLDER_NAME}/images`, 3);
  console.log(`Copied image files for ${city} to ${OUTPUT_FOLDER_NAME}/images.`);

  // Copy the city specific data files across.
  // SOURCE_FOLDER_NAME/data/<city>/* -> OUTPUT_FOLDER_NAME/data
  await copyFiles(`${SOURCE_FOLDER_NAME}/data/${city}/config.json`, `${OUTPUT_FOLDER_NAME}/data`, 3);
  await copyFiles(`${SOURCE_FOLDER_NAME}/data/${city}/tracksegments.json`, `${OUTPUT_FOLDER_NAME}/data`, 3);
  console.log(`Copied data files for ${city} to ${OUTPUT_FOLDER_NAME}/data.`);

  // Generate the index.html file from its template.
  let tplSrc = await fs.readFile(`${SOURCE_FOLDER_NAME}/templates/index.handlebars`, { encoding: 'utf-8' });
  let tpl = Handlebars.compile(tplSrc);

  // Load the message catalog for this city from SOURCE_FOLDER_NAME/data/<city>/strings.json
  const tplValsStr = await fs.readFile(`${SOURCE_FOLDER_NAME}/data/${city}/strings.json`);
  const htmlSrc = tpl(JSON.parse(tplValsStr));
  await fs.writeFile(`${OUTPUT_FOLDER_NAME}/index.html`, htmlSrc, { encoding: 'utf-8' });
  console.log(`Generated ${OUTPUT_FOLDER_NAME}/index.html.`);

  // Create the server side stations file (lib/stations.js) for this city from data in:
  // SOURCE_FOLDER_NAME/data/<city>/stationinfo.json
  const stationInfoStr = await fs.readFile(`${SOURCE_FOLDER_NAME}/data/${city}/stationinfo.json`);
  const stationInfo = JSON.parse(stationInfoStr);

  // Load the template values for JS file that the function will read from.
  tplSrc = await fs.readFile(`${SOURCE_FOLDER_NAME}/templates/stations.handlebars`, { encoding: 'utf-8' });
  tpl = Handlebars.compile(tplSrc);

  // Now also create the version of this data that the front end needs as a JSON file.
  const frontEndStationInfo = {
    stations: []
  };

  for (const stn of stationInfo.stations) {
    const { id, latitude, longitude } = stn;
    frontEndStationInfo.stations.push({ id, latitude, longitude});
  }

  await fs.writeFile(
    `${OUTPUT_FOLDER_NAME}/data/stations.json`, 
    JSON.stringify(frontEndStationInfo), 
    { encoding: 'utf-8' }
  );
  console.log(`Generated ${OUTPUT_FOLDER_NAME}/data/stations.json.`);

  // Create lib folder.
  await fs.mkdir(LIB_FOLDER_NAME);
  console.log(`Created ${LIB_FOLDER_NAME}.`);
  
  const stationsJsSrc = tpl(stationInfo);
  await fs.writeFile(`${LIB_FOLDER_NAME}/stations.js`, stationsJsSrc, { encoding: 'utf-8' });
  console.log(`Generated ${LIB_FOLDER_NAME}/stations.js.`);

  console.log('Done.');
} catch (e) {
  console.error('Build failed:');
  console.log(e);
}