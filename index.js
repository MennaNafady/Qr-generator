import fs from 'fs';
import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL to generate its QR code:',
    },
  ])
  .then((answers) => {
    const url = answers.url;

    // Generate QR code
    const qrCodeImage = qr.image(url, { type: 'png' });
    const outputFilePath = 'qrcode.png';
    const writeStream = fs.createWriteStream(outputFilePath);
    qrCodeImage.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`QR code generated and saved to ${outputFilePath}`);
    });

    // Save URL to a text file
    fs.writeFile('url.txt', url, (err) => {
      if (err) {
        console.error('Error writing URL to file:', err);
      } else {
        console.log('URL saved to url.txt');
      }
    });
  })
  .catch((error) => {
    console.error('Error during inquirer prompt:', error);
  });

