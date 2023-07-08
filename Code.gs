const API_KEY = '<ADD API KEY HERE>'

function getLatLong() {
  let sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getActiveSheet();

  let cities = 
    sheet
      .getRange(2,1, sheet.getLastRow() - 1,1)
      .getValues()

  let latlong = cities.map(city => makeRequest(city));

  sheet
    .getRange(2, 2, sheet.getLastRow() - 1, 2)
    .setValues(latlong)
}

function makeRequest(city) {
  let request = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;
  let response = UrlFetchApp.fetch(request).getContentText();
  let json = JSON.parse(response)[0];
  return [json.lat, json.lon];
}

function onOpen() {
  SpreadsheetApp
    .getUi()
    .createMenu('Custom')
    .addItem('Get Lat/Long', 'getLatLong')
    .addToUi();
    
}
