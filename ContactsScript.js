// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
"use strict";
/**
 * Main function to get and split contacts
 *
 * @description Due to the appscript limitations We can only have 100 recipients per email, in the free tier. So we need to separate all the list of contacts in cunks of 100
 *
 * @param groupName The name of a contact group we want to grab the gmail addresses from
 * @returns a two dimensional array of email addresses of all the contacts in the specified group. Each one in chunks of 100
 */
const getContacts = (groupName) => {
    const contacts = getContactsPrimaryEmail(groupName);
    const splitedContacts = splitContacts(contacts);
    return splitedContacts;
};
// -------------------------------------------------------------- UTILS --------------------------------------------------------------
/**
 * It search for an specific group of contacs and returns the primary email address of all the contacts whithin that group
 *
 * @param groupName - The name of a contact group we want to grab the gmail addresses from
 * @returns  A list of the primary email address of the contract group
 */
const getContactsPrimaryEmail = (groupName) => {
    const contactGroup = ContactsApp.getContactGroup(groupName);
    if (contactGroup === null) {
        throw new Error("Este grupo de contactos no existe.");
    }
    // gets the array of contacts object
    const contactsRaw = contactGroup.getContacts();
    const contacts = [];
    //gets the primary email address of those contacts
    contactsRaw.forEach(c => {
        contacts.push(c.getEmails()[0].getAddress());
    });
    return contacts;
};
/**
 * Splits the array passed as parameter in chunks of 100 each.
 *
 * @description Every 100 contacts we pop `contacts` and push it into `contactsArr`, then we delete those values we already pop of `contacts` to start the process again. This allow us to have a two dimensional array with arrays of 100 contacts each
 *
 * @param contacts The array of the contacts emails we want to split.
 * @returns An array of arrays of 100 contacts each.
 */
const splitContacts = (contacts) => {
    const contactsArr = [];
    //split the arr into arr of 100 contacts each 
    while (contacts.length > 0) {
        contactsArr.push(contacts.splice(0, 50));
    }
    return contactsArr;
};
/**
 * Search for only the the contacts groups (labels) we created in the actual account and returns its names.
 *
 * @notice It doesnt return those groups created by default by google or android.
 * @returns names of the contacts groups
 */
const getGroupOfContacts = () => {
    const contactGroup = ContactsApp.getContactGroups();
    const contactsGroupsNames = [];
    contactGroup.forEach(c => {
        if (!c.isSystemGroup() && c.getName() !== "Starred in Android")
            contactsGroupsNames.push(c.getName());
    });
    return contactsGroupsNames;
};
/**
 * Sets all the contacts groups name created by us in the {@linkcode RANGE_FOR_GROUP_NAME} cel as a validation list.
 *
 * @description uses data validation utility of spreadsheet to create a list in the cell with only the required labels of contacts.
 */
const syncContactsLabels = () => {
    const cell = sheet.getRange(RANGE_FOR_GROUP_NAME);
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(getGroupOfContacts()).build();
    cell.setDataValidation(rule);
};
