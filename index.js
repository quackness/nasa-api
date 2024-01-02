// https://api.nasa.gov/

const apiKey = 'Z6B0Pbqt2FldR7fPdreYIZLBXDaAnZGdKZ4kxicX';
const apodUrl = 'https://api.nasa.gov/planetary/apod';

async function getNasaPictue() {
  let result = await fetch(`${apodUrl}?api_key=${apiKey}`);
  let response = await result.json();
  //console.log(response);
  // return response;
  const explanationDiv = document.createElement('div');
  explanationDiv.textContent = response.explanation;
  const dateDiv = document.createElement('div');
  dateDiv.textContent = response.date;
  const image = document.createElement('img');
  image.src = response.url;
  image.alt = response.media_type;
  //console.log(image);
  // <img src="pic_trulli.jpg" alt="Italian Trulli">
  const nasaResponse = document.getElementById("nasa");
  nasaResponse.appendChild(explanationDiv);
  nasaResponse.appendChild(dateDiv);
  nasaResponse.appendChild(image);
}
getNasaPictue();

//asteroids feed api
//example call

async function getAsteroids() {
  let responseAsteroids = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-01-01&end_date=2024-01-02&api_key=Z6B0Pbqt2FldR7fPdreYIZLBXDaAnZGdKZ4kxicX');
  //console.log(responseAsteroids);
  let test = await responseAsteroids.json();
  console.log(test);

}
getAsteroids()