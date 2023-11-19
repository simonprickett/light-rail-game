import copyfiles from 'copyfiles';
import { promises as fs } from 'fs';

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
// TODO check this city exists in the right places...
console.log(`Building for ${city}.`);


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
  await copyFiles(`${SOURCE_FOLDER_NAME}/data/${city}/*.*`, `${OUTPUT_FOLDER_NAME}/data`, 3);
  console.log(`Copied data files for ${city} to ${OUTPUT_FOLDER_NAME}/data.`);

  // TODO templating of the index file.
  // Temporary.. just copy it across
  await copyFiles(`${SOURCE_FOLDER_NAME}/html/index.html`, `${OUTPUT_FOLDER_NAME}`, 2);
  console.log('Temporary: Copied index.html into place.');

  console.log('Done.');
} catch (e) {
  console.error('Build failed:');
  console.log(e);
}