function convertSheet() {
  // get current spreadsheet and data sheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = spreadsheet.getSheetByName('Worksheet');
  // get contents from data sheet
  const data = dataSheet.getDataRange().getValues();
  
  // define 3 sheets to be used
  let firstSheet = spreadsheet.getSheetByName('Sheet1');
  let secondSheet = spreadsheet.getSheetByName('Sheet2');
  let thirdSheet = spreadsheet.getSheetByName('Sheet3');

  /*
    clean contents if sheet exists
    if not, create a new sheet
  */
  if (firstSheet) {
    firstSheet.clearContents();
  } else {
    firstSheet = spreadsheet.insertSheet();
    firstSheet.setName('Sheet1');
  }
  if (secondSheet) {
    secondSheet.clearContents();
  } else {
    secondSheet = spreadsheet.insertSheet();
    secondSheet.setName('Sheet2');
  }
  if (thirdSheet) {
    thirdSheet.clearContents();
  } else {
    thirdSheet = spreadsheet.insertSheet();
    thirdSheet.setName('Sheet3');
  }

  // get sheets content from original data regarding the requirement
  const header = data[0];
  let sheet1Data = data.filter(d => d[3] === 'MIGHTYMONKS' && d[6] >= 33 && d[6] <= 42);
  let sheet2Data = data.filter(d => d[3] === 'HELLOCO' && d[6] >= 18 && d[6] <= 34 && d[5] === 'CRITICAL');
  let sheet3Data = data.filter(d => d[3] === 'FIREWOOD' && d[6] >= 54 && d[6] <= 81 && d[5] === 'CRITICAL' && d[4] === 'FOCUS GROUP').map(d => [d[1]]);
  // add header for each sheet data
  sheet1Data.splice(0, 0, header);
  sheet2Data.splice(0, 0, header);
  sheet3Data.splice(0, 0, ['Email Address']);

  // set contents for each sheet
  firstSheet.getRange(1, 1, sheet1Data.length, header.length).setValues(sheet1Data);
  secondSheet.getRange(1, 1, sheet2Data.length, header.length).setValues(sheet2Data);
  thirdSheet.getRange(1, 1, sheet3Data.length, 1).setValues(sheet3Data);
}