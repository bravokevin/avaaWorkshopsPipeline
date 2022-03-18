const FORMS_FOLDER_ID = '1f9kU7oennj_xqxiUWfjr9qQnNa7LnzUg'
const TEMPLATE_WORKSHOP_FORM_ID = '1bf2gMyAbF7BtwIQ6Dkhft8QcM9CHSR_vMfEYEL7DqhM'
const FORM_SUBFOLDER_FOR_WORKSHOPS = '1FsiVC5_OrdbetPoIBF2t_yockytiDoe_'
const SPREADSHEET_FORMS_WORKSHOPS_FOLDER_ID = '1MJb12mObOlFesmKRmQ5DpqAEo_wUqE27'
const SPREADSHEET_DATA_WORKSHOPS_ID = '1lFXh6G53pIShCCVOf5H6istqiXjFjpYFF68TS8bretg'

const getFolderId = (folderName) => {
  const folders = DriveApp.getFoldersByName(folderName)
  const folder = folders.next();
  const folderId = folder.getId()
  return folderId
}

const getFileId = () => {
  const files = DriveApp.getFileById("1fbhHMxnzINKXqWBomDjloDvKNP5tXWpbV9wb3hDSMx5YVr7b9H_YRHPD")
  Logger.log(files)
  // const file = files.next()
  // const fileId = file.getId()
  // Logger.log(fileId)
}

const copyForm = () => {
  const templateWorkshopForm = DriveApp.getFileById(TEMPLATE_WORKSHOP_FORM_ID);
  const subfolder = DriveApp.getFolderById(FORM_SUBFOLDER_FOR_WORKSHOPS);
  const formCopyFile = templateWorkshopForm.makeCopy(subfolder);
  const formCopyFileId = formCopyFile.getId();

  return formCopyFileId;



}
const createSpreadSheet = (month) => {
  const spreadSheetWorkshopsFolder = DriveApp.getFolderById(SPREADSHEET_FORMS_WORKSHOPS_FOLDER_ID);
  const ss = SpreadsheetApp.create("Talleres de " + month)
  const ssFile = DriveApp.getFileById(ss.getId())
  ssFile.moveTo(spreadSheetWorkshopsFolder)
  return ss

}












