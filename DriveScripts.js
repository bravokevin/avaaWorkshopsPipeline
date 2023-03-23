// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
"use strict";
// const getFolderId = (folderName: string) => {
//   const folders = DriveApp.getFoldersByName(folderName)
//   const folder = folders.next();
//   const folderId = folder.getId()
//   return folderId
// }
/**
 * Deletes a file based on its Id
 * @param FileId the id of the file we want to delete
 */
const deleteFile = (FileId) => {
    const file = DriveApp.getFileById(FileId);
    file.setTrashed(true);
};
/**
 * Creates a copy of the form template {@linkcode TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY}
 *
 * It makes a copy of the form we set of as template for registring to the workshops an then move that document to a specific directory.
 *
 * @returns the id of the form reciently created

 * @see {@link https://developers.google.com/apps-script/reference/drive} for reference about app-script DriveApp
 * @see {@link https://developers.google.com/apps-script/reference/drive/file} for reference about DriveApp 'File' Class
 */
const copyForm = (workshopName) => {
    const formId = scriptProperties.getProperty(TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY);
    const formsSubfolderId = scriptProperties.getProperty(FORM_SUBFOLDER_FOR_WORKSHOPS_PROPERTY_KEY);
    const templateWorkshopForm = DriveApp.getFileById(formId);
    const subfolder = DriveApp.getFolderById(formsSubfolderId);
    const formCopyFile = templateWorkshopForm.makeCopy(workshopName, subfolder);
    const formCopyFileId = formCopyFile.getId();
    return formCopyFileId;
    // //in the case does not exist in the propertie service.
    // if (formId === null) {
    //   // restoreFolder()
    //   formId = scriptProperties.getProperty(TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY);
    // }
    // //in the case the form has been deleted
    // try {
    //   templateWorkshopForm = DriveApp.getFileById(formId!);
    // }
    // catch (e) {
    //   // restoreFolder()
    //   formId = scriptProperties.getProperty(TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY);
    //   templateWorkshopForm = DriveApp.getFileById(formId!);
    //   Logger.log(e)
    // }
    // try {
    //   subfolder = DriveApp.getFolderById(formsSubfolderId!);
    //   formCopyFile = templateWorkshopForm.makeCopy(workshopName, subfolder);
    // }
    // catch (e) {
    //   // restoreFolder()
    //   subfolder = DriveApp.getFolderById(formsSubfolderId!);
    //   formCopyFile = templateWorkshopForm.makeCopy(workshopName, subfolder);
    //   Logger.log(e)
    // }
};
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
const createSpreadSheet = (month) => {
    const validationSs = SpreadsheetApp.openById(SPREADSHEET_TEMPLATE_FOR_FORM_VALIDATION_ID);
    const ss = validationSs.copy(`Talleres de ${month} del ${new Date().getFullYear()}`);
    const ssFile = DriveApp.getFileById(ss.getId());
    let spreadsheetFolderId = scriptProperties.getProperty(SPREADSHEET_FORMS_WORKSHOPS_SUBFOLDER_PROPERTY_KEY);
    let spreadSheetWorkshopsFolder;
    // try {
    spreadSheetWorkshopsFolder = DriveApp.getFolderById(spreadsheetFolderId);
    ssFile.moveTo(spreadSheetWorkshopsFolder);
    // }
    // catch (e) {
    //   // restoreFolder()
    //   // spreadsheetFolderId = scriptProperties.getProperty(SPREADSHEET_FORMS_WORKSHOPS_SUBFOLDER_PROPERTY_KEY)
    //   // spreadSheetWorkshopsFolder = DriveApp.getFolderById(spreadsheetFolderId!);
    //   // ssFile.moveTo(spreadSheetWorkshopsFolder)
    //   Logger.log(e)
    // }
    return ss;
};
/**
 * It creates all the initial folders and files necesaries to start working
 *
 * @see {@link https://developers.google.com/apps-script/reference/properties/properties#getproperties} for reference about storing data in bulk
 */
const init = () => {
    const mainFolder = DriveApp.createFolder("Talleres AVAA");
    const spreadsheetSubfolder = mainFolder.createFolder("Registro de Becarios en Talleres");
    const formFubfolder = mainFolder.createFolder("Formularios Para Talleres");
    const templateFormId = createTemplateForm(mainFolder);
    TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY;
    scriptProperties.setProperty(TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY, templateFormId);
    scriptProperties.setProperty(SPREADSHEET_FORMS_WORKSHOPS_SUBFOLDER_PROPERTY_KEY, spreadsheetSubfolder.getId());
    scriptProperties.setProperty(FORM_SUBFOLDER_FOR_WORKSHOPS_PROPERTY_KEY, formFubfolder.getId());
    scriptProperties.setProperty(MAIN_FOLDER_PROPERTY_KEY, spreadsheetSubfolder.getId());
    syncContactsLabels();
};
// const restoreFolder = () => {
//   const mainFolderid = scriptProperties.getProperty(MAIN_FOLDER_PROPERTY_KEY);
//   const spreadsheetsId = scriptProperties.getProperty(SPREADSHEET_FORMS_WORKSHOPS_SUBFOLDER_PROPERTY_KEY);
//   const formsSubfolderId = scriptProperties.getProperty(FORM_SUBFOLDER_FOR_WORKSHOPS_PROPERTY_KEY);
//   const formTemplate = scriptProperties.getProperty(TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY);
//   let mainFolder: GoogleAppsScript.Drive.Folder;
//   let formFubfolder: GoogleAppsScript.Drive.Folder;
//   let templateFormId: string;
//   let spreadsheetSubfolder: GoogleAppsScript.Drive.Folder;
//   if (mainFolderid === null && spreadsheetsId === null && formsSubfolderId === null && formTemplate) init();
//   else {
//     try {
//       DriveApp.getFolderById(mainFolderid!);
//     }
//     catch (error) {
//       mainFolder = DriveApp.createFolder("Talleres AVAA");
//       scriptProperties.setProperty(MAIN_FOLDER_PROPERTY_KEY, mainFolder.getId())
//     }
//     try {
//       DriveApp.getFolderById(spreadsheetsId!);
//     }
//     catch (error) {
//       spreadsheetSubfolder = mainFolder!.createFolder("Registro de Becarios en Talleres");
//       scriptProperties.setProperty(SPREADSHEET_FORMS_WORKSHOPS_SUBFOLDER_PROPERTY_KEY, spreadsheetSubfolder.getId())
//     }
//     try {
//       DriveApp.getFolderById(formsSubfolderId!);
//     }
//     catch (error) {
//       formFubfolder = mainFolder!.createFolder("Formularios Para Talleres");
//       scriptProperties.setProperty(FORM_SUBFOLDER_FOR_WORKSHOPS_PROPERTY_KEY, formFubfolder.getId())
//     }
//     try {
//       DriveApp.getFolderById(formTemplate!);
//     }
//     catch (error) {
//       templateFormId = createTemplateForm(mainFolder!);
//       scriptProperties.setProperty(TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY, templateFormId)
//     }
//   }
// }
