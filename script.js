function getWeather() {
    let city = document.querySelector("#city").value;

    let apiURL = "https://api.open-meteo.com/v1/forecast?latitude="
        + city + "&current=temperature_2m";

    document.querySelector("#temperature").textContent = "Loading weather...";

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            let temperature = data.current.temperature_2m;

            document.querySelector("#temperature").textContent =
                temperature + "°C";

            if (temperature < 10) {
                document.querySelector("#outfitImage").src = "images/winter.jpg";
                document.querySelector("#outfitText").textContent =
                    "It's freezing out! Put on a warm coat and long pants to stay warm.";
                document.body.className = "cold";

            } else if (temperature < 20) {
                document.querySelector("#outfitImage").src = "images/sweater.jpg";
                document.querySelector("#outfitText").textContent =
                    "It's cool and comfortable! Grab a sweater and you're ready to go.";
                document.body.className = "mild";

            } else {
                document.querySelector("#outfitImage").src = "images/summer.jpg";
                document.querySelector("#outfitText").textContent =
                    "It's hot out! Keep cool with a T-shirt and shorts.";
                document.body.className = "warm";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.querySelector("#temperature").textContent =
                "Unable to load weather. Please try again.";
        });
}

document.querySelector("#city").addEventListener("change", getWeather);

document.querySelector("#refreshButton").addEventListener("click", getWeather);

getWeather();