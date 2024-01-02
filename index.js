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
//const feedUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY';
const startInput = document.querySelector('#start');
console.log(startInput);

document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.datepicker');
  const instances = M.Datepicker.init(elems, {
    autoClose: true,
    defaultDate: new Date(),
    format: 'yyyy-mm-dd'
  });

  startInput.addEventListener('change', function () {
    const startDateValue = this.value;
    async function getAsteroids() {
      let responseAsteroids = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateValue}&api_key=${apiKey}`);
      //console.log(responseAsteroids);
      let astroidsResponse = await responseAsteroids.json();
      console.log(astroidsResponse);
      //config the date picker
    }
    console.log(this.value)
    getAsteroids()
  });
});

