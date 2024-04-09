import axios from 'axios';

const form = document.querySelector('form');
const addressInput = document.getElementById('address')! as HTMLInputElement;

// declare var google: any;

const GOOGLE_API_KEY = 'GOOGLE_MAPS_API_KEY';

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng:number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`).then(response => {
        if(response.data.status !== 'OK') {
            throw new Error('COuld not fetch location!');
        }
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById('map')!, {
            center: coordinates, //{lat: -34.397, lng: 150.644},
            zoom: 8
        });

        new google.maps.Marker({position: coordinates, map: map});
      }

      ).catch(err => {
        alert(err.message);
        console.log(err);
      });
}

form?.addEventListener('submit',searchAddressHandler);