let weatherJSON;
let minTemp = Infinity;
let maxTemp = -Infinity;
let dx;

function preload() {
  weatherJSON = loadJSON("https://api.weather.gov/gridpoints/OKX/33,37/forecast");  
}

function setup() {
  createCanvas(600, 400);
  dx = width / (weatherJSON.properties.periods.length + 2);
  
  for (const p of weatherJSON.properties.periods) {
    minTemp = min(p.temperature, minTemp);
    maxTemp = max(p.temperature, maxTemp);
  }
  noLoop();
}

function draw() {
  background(220);
  textSize(16);
  textAlign(CENTER);
  text("Weather Forecast Visualization", width / 2, 30);
  textSize(12);
  textAlign(LEFT);
  
  let px = dx;
  let py = map(weatherJSON.properties.periods[0].temperature, minTemp, maxTemp, 0.8 * height, 0.2 * height);
  
  for (let i = 1; i < weatherJSON.properties.periods.length; i++) {
    let cx = dx * (i + 1);
    let cy = map(weatherJSON.properties.periods[i].temperature, minTemp, maxTemp, 0.8 * height, 0.2 * height);
    line(px, py, cx, cy);
    fill(0);
    text(weatherJSON.properties.periods[i].temperature + "°F", cx, cy - 10);
    text(weatherJSON.properties.periods[i].shortForecast, cx, cy + 15);
    px = cx;
    py = cy;
  }
}

