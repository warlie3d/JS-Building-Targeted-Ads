// get user's data
// get user's coordinates
async function getCoords() {
  //user might reject or accept or take 5min to see that i asked them to give permission
  //dont return promise resolve inline
  let pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return [pos.coords.latitude, pos.coords.longitude];
}
console.log(getCoords());

// get user's time
function userTime() {
  const now = new Date();
  return now.getHours();
}
// console.log(userTime())

// helper functions
// check time of day
function getMealTime() {
  const timeOfDay = userTime();
  //after 8 in 24hour format
  if (timeOfDay > 20) {
    return "late-night snack";
  } else if (timeOfDay > 16) {
    return "dinner";
  } else if (timeOfDay > 11) {
    return "lunch";
  } else {
    return "breakfast";
  }
}
// console.log(getMealTime())
// build ads
// build ad 1
function buildAd1() {
  const mealTime = getMealTime();
  let content = document.querySelector(".ad1");
  let inner = document.createElement("p");
  inner.innerHTML = `We've got the best ${mealTime} in the state`;
  content.append(inner);
}
buildAd1();

// build ad 2
// Build Ad 2
function buildAd2(coordinates) {
  const coords = coordinates;
  const href = `https://www.google.com/maps/search/coffee/@${coords[0]},${coords[1]},15z/`;
  let content = document.querySelector(".ad2");
  let inner = document.createElement("p");
  inner.innerHTML = `It's time to try our coffee! <span><a href="${href}" target="_blank">We're this close!</a></span>`;
  content.append(inner);
}

// console.log(buildAd2(getCoords()))

// event listeners
// on load, build ads
// On load, build ads:
window.onload = async () => {
  const coords = await getCoords();
  buildAd2(coords);
};
