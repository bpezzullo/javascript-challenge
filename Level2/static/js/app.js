// from set up global variables used through out the JS functions.

var tableData = data;  // The data provided
var a;
var citykey = [],  cix, cityselected = [];
var statekey = [], stx, stateselected = [];
var countrykey = [], cox;
var shapekey = [], shx, shapeselected = [];
var itemselected = [];

// fucntion to generate the text for the drop downs.

function generatetxt(keylist) {
  
  var text, i;

  // start the dropdown list with All.
  text = "<option>All</option>";

  // loop through array to populate the drop down.
  for (i = 0; i < keylist.length; i++) {
    text += "<option>" + keylist[i] + "</option>";
  }
  return text
}


// create the drop downlists
function generateDropDowns(data) {
  var keys = ['city','state','country','shape'];

// loop through the data to find the information needed for the drop down lists for city
// state, country and shape.

  data.forEach(datarow => {
    // get the value of the first key "city" and then check to see if the city from the
    // datarow has already been captured by checking to see if it is in the citykey array.
    // if it has been skip down to the next key.  If not than push it into the array.
    console.log(datarow);
    cix = (datarow[keys[0]]);
        if (citykey.indexOf(cix) === -1) {
      citykey.push(cix);
    }
    // get the value of the second key "state" and then check to see if the state from
    // the datarow has already been captured by checking to see if it is in the statekey array.
    // if it has been skip down to the next key.  If not than push it into the array.
  
    stx = (datarow[keys[1]]);
    if (statekey.indexOf(stx) === -1) {
      statekey.push(stx);
    }
    // get the value of the first key "city" and then check to see if the country from the
    // datarow has already been captured by checking to see if it is in the countrykey array.
    // if it has been skip down to the next key.  If not than push it into the array.
    
    cox = (datarow[keys[2]]);
       if (countrykey.indexOf(cox) === -1) {
      countrykey.push(cox);
    }
    // get the value of the first key "city" and then check to see if the shape from the
    // datarow has already been captured by checking to see if it is in the shapekey array.
    // if it has been skip down to the next key.  If not than push it into the array.

    shx = (datarow[keys[3]]);
    if (shapekey.indexOf(shx) === -1) {
      shapekey.push(shx);
    }

  });

  // Sort items
  citykey.sort();
  statekey.sort();
  shapekey.sort();

  // now create a text which will be used to modify the HTML for the drop downs.  Include
  // All as the first item.
  
  document.getElementById("cityselect").innerHTML = generatetxt(citykey);
  
  document.getElementById("stateselect").innerHTML = generatetxt(statekey);

  document.getElementById("countryselect").innerHTML = generatetxt(countrykey);
  
  document.getElementById("shapeselect").innerHTML = generatetxt(shapekey);

}


// Function that builds the table with 7 inputs.  Table structure, the data, and 
// a date to start.  It was extended to include multiple selections from City, state
// to shape.  The data is optional.  If not provided it will be seen as undefined. 
// If the user wants to start fresh than the date will be empty "".  If empty
// or undefined than generate the full table.  If data is provided than only
// provide those sightings identified by the items selected.
  
function generateTable(table, data, date, city, state, country, shape) {

// for each element or row in the table than insert the row into the HTML table.
  for (let element of data) {

      // Check whether a date is provided.  If provided only pull those
      // rows to be displayed.  
      // Extended to include filtering based on city, state, country and shape.
      // For each item after date
      //   * if input is undefined that means the user hasn't selected  anything and
      //     assume that all was selected.  
      //   * If input is set to All then display all of that
      //     key / type.  
      //   * If the length is 0 of the than assume all entries for the type.
      //   * otherwise only add row that has a the selected value


    if (element['datetime'] === date || date == undefined || date == "") {
      if (cityselected.indexOf(element['city']) != -1 || city == undefined || cityselected.indexOf('All') != -1 || cityselected.length === 0)  {
        if (stateselected.indexOf(element['state']) != -1 || state == undefined || stateselected.indexOf('All') != -1 || stateselected.length === 0) {
          if (element['country'] === country || country == undefined || country === 'All') {
            if (shapeselected.indexOf(element['shape']) != -1 || shape == undefined || shapeselected.indexOf('All') != -1 || shapeselected.length === 0) {
              // Insert the row and than append each cell.
              let row = table.insertRow();
              for (key in element) {
              
                  let cell = row.insertCell();
                  let text = document.createTextNode(element[key]);
                  cell.appendChild(text);
              }
            }
          }
        }
      }
    }
  }
}
// Function that will clear out the table from the previous filter
function clearTable(table,table_size) {

  for (var i=0; i < table_size - 1; i++) {
      table.deleteRow(0);
      
  }
}
//
// Function call with includ of keyname and output of items selected
// What items were selected by the user?  This function returns those items in an array.
//
function itemsselected(keyname) {
  // clear out the array
  itemselected = [];
  for (var i=0; i < keyname.options.length; i++){
  if (keyname.options[i].selected==true){
    itemselected.push(keyname.options[i].text);
  }
  }
  return itemselected
}
//
//
// Start of main area that sets up the html to start adding the table elements.
// Set table to start after tbody since the header is there already.
//
//

let table = document.querySelector("tbody");

// generate the table the first time the page is loaded.
generateTable(table, tableData);

// generate the drop downs based on the data in the input.
generateDropDowns(tableData);

// filter table based on the input from the user.  Datetime and country are single elements.
// City, state, and shape are multi select and the input is provided in an array where.
// the field option is set to true if it was selected.  This routine is called when the users has
// hit the filter button.
function checkinput() {
  var date = document.getElementById("datetime").value;
  var city = document.getElementById("cityselect");
  var state = document.getElementById("stateselect");
  var country = document.getElementById("countryselect").value;
  var shape = document.getElementById("shapeselect");

  var table_size = document.getElementById("ufo-table").rows.length;

  // determine selection. call a simple function to return the items selected.
  // store those items in the identified arrays.
  cityselected = itemsselected(city);

  stateselected = itemsselected(state);

  shapeselected = itemsselected(shape);


  // clear the table and then check for the right date range.
  clearTable(table, table_size);
  // If in the right date range provde the results otherwise provde an alert
  // and refresh with a full table.
  if (date >= '1/1/2010' && date <='1/13/2010' || date == "") {
      
      generateTable(table, tableData, date, city, state, country, shape);  
  }
  else {

      alert("Please enter a date between 1/1/2010 and 1/13/2010!");
      generateTable(table, tableData);
  }
}

