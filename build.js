import copyfiles from 'copyfiles';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';

const SOURCE_FOLDER_NAME = 'src';
const OUTPUT_FOLDER_NAME = 'dist';

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
    fs.stat(`${SOURCE_FOLDER_NAME}/images/${city}`),
    fs.stat(`${SOURCE_FOLDER_NAME}/templates/${city}.json`)
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

  // Create new folder.
  await fs.mkdir(OUTPUT_FOLDER_NAME);
  console.log(`Created ${OUTPUT_FOLDER_NAME}.`);

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
  await copyFiles(`${SOURCE_FOLDER_NAME}/data/${city}/*.json`, `${OUTPUT_FOLDER_NAME}/data`, 3);
  console.log(`Copied data files for ${city} to ${OUTPUT_FOLDER_NAME}/data.`);

  // Generate the index.html file from its template.
  const tplSrc = await fs.readFile(`${SOURCE_FOLDER_NAME}/templates/index.handlebars`, { encoding: 'utf-8' });
  const tpl = Handlebars.compile(tplSrc);

  // Load the template values for this city from SOURCE_FOLDER_NAME/templates/<city>.json
  const tplValsStr = await fs.readFile(`${SOURCE_FOLDER_NAME}/templates/${city}.json`);
  const htmlSrc = tpl(JSON.parse(tplValsStr));
  await fs.writeFile(`${OUTPUT_FOLDER_NAME}/index.html`, htmlSrc, { encoding: 'utf-8' });
  console.log(`Generated index.html template for ${city} in ${OUTPUT_FOLDER_NAME}.`);

  // Create the server side stations file for this city.
  // TODO need to generate this... and the front end JSON version.
  await copyFiles(`${SOURCE_FOLDER_NAME}/data/${city}/stations.js`, `lib`, 3);

  console.log('Done.');
} catch (e) {
  console.error('Build failed:');
  console.log(e);
}