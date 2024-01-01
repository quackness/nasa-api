const apiKey = 'Z6B0Pbqt2FldR7fPdreYIZLBXDaAnZGdKZ4kxicX';
const apodUrl = 'https://api.nasa.gov/planetary/apod';

async function getNasaPictue() {
  let result = await fetch('https://api.nasa.gov/planetary/apod?api_key=Z6B0Pbqt2FldR7fPdreYIZLBXDaAnZGdKZ4kxicX');
  let response = await result.json();
  console.log(response);
  return response;
  const nasaResponse = document.getElementById("nasa");
}
getNasaPictue();