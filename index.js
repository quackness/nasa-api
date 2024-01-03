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
const astroFeedElement = document.querySelector('#astro-feed');
console.log(astroFeedElement);


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

      function handleFeedData({ element_count, near_earth_objects }, astroFeedElement) {
        console.log("element_count", element_count);
        let count = 0;
        astroFeedElement.innerHTML = Object.keys(near_earth_objects).map(date => {
          return near_earth_objects[date].map(astroid => {
            count++;
            const id = astroid.id;
            const name = astroid.name;
            const dangerous = astroid.is_potentially_hazardous_asteroid;
            const magnitude = astroid.absolute_magnitude_h;
            const minSize = astroid.estimated_diameter.meters.estimated_diameter_min;
            const maxSize = astroid.estimated_diameter.meters.estimated_diameter_max;
            const test = astroid.close_approach_data;
            console.log("test", test)
            const close_approach_data = astroid.close_approach_data.shift();
            console.log("close_approach_data", close_approach_data)
            const miss_distance = close_approach_data.miss_distance.kilometers;
            console.log(">>", id, miss_distance, maxSize)
            return `
            <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${dangerous ? 'YES' : 'NO'}</td>
            <td>${magnitude}</td>
            <td>${minSize}</td>
            <td>${maxSize}</td>
            <td>${miss_distance}</td>
            <td>${date}</td>
            </tr>
            `
          }).join("");
          // console.log("?", astroidContent)
          // return `<tr>${astroidContent}</tr>`
        }).join("");
        // console.log("count", count);
      }
      handleFeedData(astroidsResponse, astroFeedElement);
    }
    // console.log(this.value)
    getAsteroids()
  });
});

