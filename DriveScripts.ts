// const getFolderId = (folderName: string) => {
//   const folders = DriveApp.getFoldersByName(folderName)
//   const folder = folders.next();
//   const folderId = folder.getId()
//   return folderId
// }

// const getFileId = () => {
//   const files = DriveApp.getFileById()
//   Logger.log(files)
//   // const file = files.next()
//   // const fileId = file.getId()
//   // Logger.log(fileId)
// }


/**
 * Creates a copy of the form template {@linkcode TEMPLATE_WORKSHOP_FORM_ID}
 * 
 * It makes a copy of the form we set of as template for registring to the workshops an then move that document created to a specific directory.
 * 
 * @returns the id of the form reciently created

 * @see {@link https://developers.google.com/apps-script/reference/drive} for reference about app-script DriveApp 
 * @see {@link https://developers.google.com/apps-script/reference/drive/file} for reference about DriveApp 'File' Class
 */
const copyForm = (): string => {
  const templateWorkshopForm = DriveApp.getFileById(TEMPLATE_WORKSHOP_FORM_ID);
  const subfolder = DriveApp.getFolderById(FORM_SUBFOLDER_FOR_WORKSHOPS);
  const formCopyFile = templateWorkshopForm.makeCopy(subfolder);
  const formCopyFileId = formCopyFile.getId();
  return formCopyFileId;
}

/**
 * Creates a new spreadsheet
 * 
 * It creates a new spreadsheet and move to a specific directory
 * 
 * Those spreadsheet are the documents in where we are going to store all the data of the participants registered to an specific workshop.
 * 
 * @param month the month date on where we are 
 * @returns returns the Spreadsheet object reciently created.
 * 
 * @see {@link https://developers.google.com/apps-script/reference/drive} for reference about app-script DriveApp 
 * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app} for reference about app-script SpreadsheetApp
 * 
 */

const createSpreadSheet = (month: string) => {
  const spreadSheetWorkshopsFolder = DriveApp.getFolderById(SPREADSHEET_FORMS_WORKSHOPS_FOLDER_ID);
  const ss = SpreadsheetApp.create("Talleres de " + month)
  const ssFile = DriveApp.getFileById(ss.getId())
  ssFile.moveTo(spreadSheetWorkshopsFolder)
  return ss
}