document.addEventListener("DOMContentLoaded", function(){
const loginPage = document.getElementById("login-page");
const signupPage = document.getElementById("signup-page");
const dashboardPage = document.getElementById("dashboard-page");
const token = localStorage.getItem("token");

if (!token) {
    dashboardPage.style.display = "none";
    loginPage.style.display = "flex";
}
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

      document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";


    dashboardPage.style.display = "none";
    loginPage.style.display = "flex";
});
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function () {
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }

    getCurrentWeather(cityName);
    getWeatherForecast(cityName);
    
});
async function getWeatherForecast(cityName) {
    const token = localStorage.getItem("token");
    document.getElementById("forecast-container").innerHTML = "<p>Loading forecast...</p>";

    try {
        const url = `https://task-5-weather-website.vercel.app/api/weather/forecast?city=${encodeURIComponent(cityName)}&days=7`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            document.getElementById("forecast-container").innerHTML =
    "<p>Unable to load forecast.</p>";
            alert("Forecast error: " + result.message);
            return;
        }

        const forecastDays = result.data.forecast.forecastday;

        console.log("Forecast Data:", forecastDays);
        const forecastContainer = document.getElementById("forecast-container");

forecastContainer.innerHTML = "";

forecastDays.forEach(function(day,index) {
    forecastContainer.innerHTML += `
        <div class="forecast-card ${index === 0 ? "current-day" : ""}">
            <h3>${day.date}</h3>
            <img src="https:${day.day.condition.icon}" alt="Weather icon">
            <p>${day.day.condition.text}</p>
            <p>Max: ${day.day.maxtemp_c}°C</p>
            <p>Min: ${day.day.mintemp_c}°C</p>
        </div>
    `;
});

    } catch (error) {
        document.getElementById("forecast-container").innerHTML =
    "<p>Unable to load forecast.</p>";
        console.error("Error fetching forecast:", error);
    }
}

const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");
showSignup.addEventListener("click", function () {
    loginPage.style.display = "none";
    signupPage.style.display = "flex";
});
showLogin.addEventListener("click", function () {
    signupPage.style.display = "none";
    loginPage.style.display = "flex";
});
const loginForm=document.getElementById("login-form")
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
const password = document.getElementById("login-password").value.trim();

if (email === "") {
    alert("Please enter your email.");
    return;
}

if (password === "") {
    alert("Please enter your password.");
    return;
}

loginUser(email, password);
});
async function loginUser(email, password) {
    try {
        const response = await fetch(
            "https://task-5-weather-website.vercel.app/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            alert("Login Failed: " + result.message);
            return;
        }

        localStorage.setItem("token", result.data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(result.data.user)
        );

        alert("Login successful!");

        loginPage.style.display = "none";
dashboardPage.style.display = "block";

    } catch (error) {
        console.error("Error during login:", error);
    }
}
const signupForm = document.getElementById("signup-form");
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");

  signupForm.addEventListener("submit",function(event){
    event.preventDefault();
  
    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();


    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email.");
        return;
    }

    if (password === "") {
        alert("Please enter your password.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    alert("Validation successful!");
    
    registerUser(name, email, password);
    });
});
 async function registerUser(name, email, password) {
    try {
        const response = await fetch(
            "https://task-5-weather-website.vercel.app/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {

            alert("Signup Failed: " + result.message);
            return;
        }

        localStorage.setItem("token", result.data.token);
        localStorage.setItem(
            "user",
            JSON.stringify(result.data.user)
        );

        alert("Account created successfully!");
        const signupPage = document.getElementById("signup-page");
const dashboardPage = document.getElementById("dashboard-page");

        signupPage.style.display = "none";
dashboardPage.style.display = "block";
console.log("Dashboard should open now");

    } catch (error) {
        console.error("Error during signup:", error);
    }
}
async function getCurrentWeather(cityName) {
    const token = localStorage.getItem("token");

    try {
        const url = `https://task-5-weather-website.vercel.app/api/weather/current?city=${encodeURIComponent(cityName)}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (!response.ok) {

            document.getElementById("weather-result").innerHTML =
    "<h2>Weather Error</h2><p>" + result.message + "</p>";
            alert("Weather error: " + result.message);
            return;
        }

        const weatherData = result.data;

        console.log("Weather Data:", weatherData);
        const weatherResult = document.getElementById("weather-result");

weatherResult.innerHTML = `
    <h2>${weatherData.location.name}</h2>
    <p>${weatherData.location.country}</p>
    <h3>${weatherData.current.temp_c}°C</h3>
    <p>${weatherData.current.condition.text}</p>
    <img src="https:${weatherData.current.condition.icon}" alt="Weather icon">
`;

    } catch (error) {
        document.getElementById("weather-result").innerHTML =
    "<h2>Something went wrong</h2><p>Unable to fetch weather data.</p>";
        console.error("Error fetching current weather:", error);
    }
}
const customCursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (event) {
    customCursor.style.left = event.clientX + "px";
    customCursor.style.top = event.clientY + "px";
});