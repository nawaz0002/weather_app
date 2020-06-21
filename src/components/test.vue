            console.log(this.searchCity)
            if(google && google){
                new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
            }
            
            // this.autocomplete.addListener('place_changed', () => {
            // let place = this.autocomplete.getPlace();
            // let ac = place.address_components;
            // let lat = place.geometry.location.lat();
            // let lon = place.geometry.location.lng();
            // let city = ac[0]["short_name"];

            // console.log(`The user picked ${city} with the coordinates ${lat}, ${lon}`);
            // });              
              

              
                // axios.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyD_KdTsTa28samKPCz6zvxamfoSp1rcSFA&libraries=places')
                //     .then(response => {
                //         console.log(response)
                //         return response
                //     })
                //     .catch(err => console.log(err))