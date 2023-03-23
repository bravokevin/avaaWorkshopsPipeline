const doPost = (e) => {
  const reqData = JSON.parse(e.postData.contents);
  temporalFunction(reqData.workshop, reqData.subject, reqData.group);
  let JSONString = JSON.stringify(e.postData.contents);
  let JSONOutput = ContentService.createTextOutput(JSONString);
  JSONOutput.setMimeType(ContentService.MimeType.JSON);
  return JSONOutput
}