/* Global Variables */
const apiKey = "8fdf34c83b07a8d94bd523945ad855b6";
let btn = document.getElementById("generate");
let entry = document.querySelector(".entry");
let show = document.querySelector(".show");
let warn = document.querySelector(".warn");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

btn.addEventListener("click", theResult);

/*
Here we add functions and some check when button on click.
We do this check to make the website dynamic.
*/
async function theResult() {
  let zipCode = document.getElementById("zip").value;
  let content = document.getElementById("feelings").value;
  // Put functions between try & catch to make sure the server receive requests and send responses correctly and if there is an error show that to client & server side

  try {
    // First we check if the zip code is empty or not.
    if (zipCode !== "") {
      // Here we check if the content is empty or not.
      if (content !== "") {
        // Here we make warn invisible so we can show the result
        warn.style.display = "none";
        // Store the return of getTemp function to use it in next function.
        // Adding apikey as a parameter.
        let temp = await getTemp(zipCode, apiKey);
        // Store the return of saveData function to use it in next function.
        let finalDatat = await saveData(temp, content);
        await showData(finalDatat);
        // Show the result after check
        entry.classList.add("show");
      } else {
        entry.classList.remove("show");
        warn.innerHTML = "You must enter your feel";
        warn.style.display = "block";
      }
    } else {
      entry.classList.remove("show");
      warn.innerHTML = "You must enter Zip Code";
      warn.style.display = "block";
    }
  } catch (err) {
    // This message appear when the zip code is wrong.
    console.log("There is Error", err);
    entry.classList.remove("show");
    warn.innerHTML = `The Zip Code Is Wrong <br> Please Try Again`;
    warn.style.display = "block";
  }
}

/*
This function to get tempreature from Openweathermap.com and store it.
We need zipCode so we put it as a parameter in function.
*/
// Adding apiKey as a parameter.
async function getTemp(zipCode, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
  let res = await fetch(url);
  res = await res.json();
  let temp = res.main.temp;

  return temp;
}

/*
This function deal with server.
*/
async function saveData(temp, content) {
  // Here we send data to the server and save it by POST Method
  fetch("/saveData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Here we convert data from javaScript to json.
    body: JSON.stringify({
      date: newDate,
      temp: temp,
      content: content,
    }),
  });
  // Here we get data from server by get Method.
  let dataRes = await fetch("/getData");
  // Convert data from json to js to deal with it.
  let finalData = await dataRes.json();

  return finalData;
}

/*
This function to show final result and data to website
*/
async function showData(finalData) {
  let date = document.getElementById("date");
  let temp = document.getElementById("temp");
  let content = document.getElementById("content");
  date.innerHTML = `The Day is : ${finalData.date}`;
  temp.innerHTML = `The Temperature is : ${finalData.temp} C`;
  content.innerHTML = `You Feel : ${finalData.content}`;
}
