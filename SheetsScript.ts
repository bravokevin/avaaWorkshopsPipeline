const SPREADSHEET_ID = "1qUy-dHm7IOU8VykaR2gRDn-sZwnMfh7Rqj_ktaKIcRg"; // The ID of the master sheet in where all workshops details are visualized

// --------------------------------------------- constants variables ---------------------------------------------

const SHEET_NAME: string = 'Sheet1'; // the name of the {sheet} in the specified spreadsheet

/**
 * The start column from where we search for the workshops data
 * @type {String}
 */
const START_COLUMN: string = 'A'


/**
 * The end  column from where we search for the workshops data
 * @type {String}
 */
const END_COLUMN: string = 'L'

/**
 * the key for storing the scheduled workshop details using {@linkcode scriptProperties}
 * @type
 */
const SCRIPT_PROPERTIES_WORKSHOPS_KEY: string = 'CURRENT_WORKSHOPS'

const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID); // the actual spreadsheet object
const sheet = spreadsheet.getSheets()[1]; //the sheet from where we grab all the data

/**
 * script property service object
 * @type {GoogleAppsScript.Properties.Properties}
 * @see https://developers.google.com/apps-script/guides/properties
 */
const scriptProperties: GoogleAppsScript.Properties.Properties = PropertiesService.getScriptProperties();


const resetAllScriptPropertiesValues = () => {
  scriptProperties.deleteAllProperties();
}

const isBlank = (currentValue: any): boolean => currentValue[0] !== ''

enum Pensum{
  'padfads',
  adfasdf,
}

// --------------------------------------------- class/schema for storing workshops details ---------------------------------------------

class Workshop {
  id: number;
  name: string;
  pensum: Pensum;
  date: string;
  startHour: string;
  endHour: string;
  speaker: string
  numberOfParticipants: number;
  kindOfWorkshop: string;
  platform: string
  description: string
  sendType: string;

  constructor(
    id: number,
    name: string,
    pensum: Pensum,
    date: string,
    startHour: string,
    endHour: string,
    speaker: string,
    numberOfParticipants: number,
    kindOfWorkshop: string,
    platform: string,
    description: string,
    sendType: string
    ) {

    this.id = id;
    this.name = name;
    this.pensum = pensum;
    this.date = date;
    this.startHour = startHour;
    this.endHour = endHour;
    this.speaker = speaker;
    this.numberOfParticipants = numberOfParticipants;
    this.kindOfWorkshop = kindOfWorkshop;
    this.platform = platform;
    this.description = description;
    this.sendType = sendType;
  }
}
// --------------------------------------------- helper functions ---------------------------------------------


/**
 * Grab the information from a specifed range of cell
 * @returns  an array of all the values grabbed
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
 */
const getWorkshopsDetails = (): any[][] | undefined => {
  const [pointOfStart, pointOfEnd] = getCurrentRange();
  const rangeName = `${SHEET_NAME}!${START_COLUMN}${pointOfStart}:${END_COLUMN}${pointOfEnd}`
  try {
    // Get the values from the spreadsheet using spreadsheetId and the specified range.
    const values = Sheets.Spreadsheets.Values.get(SPREADSHEET_ID, rangeName).values;
    //  Print the values from spreadsheet if values are available.
    if (!values) {
      Logger.log('No data found.');
      return;
    }
    if (!values.every(isBlank)) {
      Logger.log('this is basd')
      return
    }
    return values
  } catch (err) {
    Logger.log(err.message);
  }
}
/**
 * Set the actual range from where we grab the data using {getWorkshopsDetails} 
 * @returns {Array<Number>} an array with the start and end point
 */
const getCurrentRange = (): [number, number] => {
  const namedRanges = spreadsheet.getNamedRanges()
  const namedRange = namedRanges.filter((word: GoogleAppsScript.Spreadsheet.NamedRange) => word.getName() === 'current_workshops')
  const pointOfStart = namedRange[0].getRange().getLastRow()
  const pointOfEnd = sheet.getLastRow()
  return [pointOfStart, pointOfEnd]
}
/**
 * 
 */
const updateSheetRange = (): void => {
  const [pointOfStart, pointOfEnd] = getCurrentRange();
  const range = `${SHEET_NAME}!${START_COLUMN}${pointOfStart}:${END_COLUMN}${pointOfEnd}`
  const namedRanges = spreadsheet.getNamedRanges();
  namedRanges[0].setRange(sheet.getRange(range))
}


/**
 * stores the scheduled workshops to send that information later
 * @param values - a list of workshops
 * @param scriptPropertiesKey -  the script property key in where all the data would be stored
 * @see https://developers.google.com/apps-script/reference/properties/properties#setProperty(String,String)
 */
const storeValues = (values: any[], scriptPropertiesKey: string) => {
  const processedData = processData(values);
  const dataObject = Object.assign({}, processedData)
  const jsonData = JSON.stringify(dataObject)
  scriptProperties.setProperty(scriptPropertiesKey, jsonData)
}

/**
 * Converts all the information grabbed by {getWorkshopsDetails} and parse into a object then stores that object in an arr
 * @param {Array}
 * @returns {Array<Workshop>} 
 */
const processData = (values: any[]) => {
  const workshops: Workshop[] = [];
  values.forEach(value => {
    workshops.push(new Workshop(...value))
  })
  return workshops;
}


/**
 * Determine if a workshop should be scheduled or not based on its type 
 * @param processedWorkshopData - 
 * @type Workshop[]
 * @returns 
 */
const processWorkshopType = (processedWorkshopData: Workshop[]): [Workshop[], Workshop[]] => {
  const scheduledWOrkshops: Workshop[] = [];
  const workshopsToSendASAP: Workshop[] = []

  processedWorkshopData.forEach(workshop => {
    if (workshop.sendType === "ASAP") {
      workshopsToSendASAP.push(workshop)
    }
    else if (workshop.sendType === "Semanal") {
      scheduledWOrkshops.push(workshop);
    }
  })
  return [scheduledWOrkshops, workshopsToSendASAP];

}