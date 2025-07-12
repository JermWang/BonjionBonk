const sharp = require('sharp');
const fs = require('fs');

async function generateFavicon() {
  try {
    // Create a single 32x32 favicon.ico file
    await sharp('public/images/characters/main/monkey-2.png')
      .resize(32, 32)
      .toFile('public/favicon.ico');
      
    console.log('Favicon generated successfully at public/favicon.ico');
  } catch (err) {
    console.error('Error generating favicon:', err);
  }
}

generateFavicon(); 