window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span")

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.weatherapi.com/v1/current.json?key=c7486a5860c74c22bb923125212112&q=${lat}, ${long}`
            fetch(api).then(data => {
                return data.json();
            }).then(data => {
                const condition = data.current.condition.text;
                const tempF = data.current.temp_f;
                const tempC = data.current.temp_c;
                const locName = data.location.name;
                const locRegion = data.location.region;
                const iconNow = data.current.condition.icon;
                temperatureDegree.textContent = tempF;
                temperatureDescription.textContent = condition;
                locationTimezone.textContent = locName + ", " + locRegion;
                const currentIcon = document.getElementById("weather-icon");
                currentIcon.src = iconNow;

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C'
                        temperatureDegree.textContent = tempC;
                    } else {
                        temperatureSpan.textContent = 'F'
                        temperatureDegree.textContent = tempF;
                    }
                })
            })
        });
    } else {
        window.alert("Please allow location services so we can collect weather data for you");
    }
})