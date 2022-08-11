/**
 * It search for an specific group of contacs and returns the primary email address of all the contacts whithin that group
 * @param groupName - the name of a contact group
 * @returns  an array of email addresses of all the contacts in the specified group
 */
const getContacts = (groupName: string): string[][] => {
  const contactGroup = ContactsApp.getContactGroup(groupName)
  if (contactGroup === null) {
    throw new Error("Este grupo de contactos no existe.")
  }
  const contactsRaw = contactGroup.getContacts();
  const splitedContacts = splitContacts(contactsRaw)
  return splitedContacts;
}

// -------------------------------------------------------------- UTILS --------------------------------------------------------------

/**
 * splits the list of contact passed as parameter in chunks of 100 each.
 * 
 * @description Due to the appscript limitations (We can only have 100 recipients per email, in the free tier)  every 100 contacts we push `contacts` to `contactsArr`, then, we delete the values of `contacts` to start the process again. This allow us to have a two dimensional array with arrays of 100 contacts each.
 * 
 * @param contactsList the list of the contacts we want to split.
 * @returns an array of chunks of 100 contacts each.
 */
const splitContacts = (contactsList: GoogleAppsScript.Contacts.Contact[]): string[][] =>{
  const contacts: string[] = []
  const contactsArr: string[][] = []
  contactsList.forEach(c => {
    contacts.push(c.getEmails()[0].getAddress())
  })
  //split the arr into arr of 100 contacts each 
  while (contacts.length > 0) {
    contactsArr.push(contacts.splice(0, 100))
  }
  return contactsArr;
}

/**
 * search for all the contacts groups (labels) in the account and returns its names
 * 
 * @returns names of the contactGroup
 */
const getGroupOfContacts = () => {
  const contactGroup = ContactsApp.getContactGroups();
  const contactsGroupsNames: string[] = [];

  contactGroup.forEach(c => {
    if (!c.isSystemGroup() && c.getName() !== "Starred in Android") contactsGroupsNames.push(c.getName());
  })

  return contactsGroupsNames;
}

/**
 * Put all the contacts labels created in the {@linkcode RANGE_FOR_GROUP_NAME} cel
 * 
 * @description uses data validation utility of spreadsheet to create a list with only the required labels.
 */
const syncContactsLabels = () =>{
  const cell = sheet.getRange(RANGE_FOR_GROUP_NAME);
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(getGroupOfContacts()).build()
  cell.setDataValidation(rule);
}