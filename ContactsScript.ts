/**
 * It search for an specific group of contacs and returns the primary email address of all the contacts whithin that group
 * 
 * Due to the appscript limitations (We can only have 100 recipients per email, in the free tier) so every 100 contacts we push `contacts` to `contactsArr`,  Then, we delete the values of `contacts` to start the process again. This allow us to have a two dimensional array with arrays of 100 contacts each.
 * @param groupName - the name of a contact group
 * @returns  an array of email addresses of all the contacts in the specified group
 */
const getContacts = (groupName: string): string[][] => {
  const contactGroup = ContactsApp.getContactGroup(groupName)
  if (contactGroup === null) {
    throw new Error("Este grupo de contactos no existe.")
  }
  const contactsRaw = contactGroup.getContacts();
  const contacts: string[] = []
  const contactsArr: string[][] = []

  contactsRaw.forEach(c => {
    contacts.push(c.getEmails()[0].getAddress())
  })

  while (contacts.length > 0) {
    contactsArr.push(contacts.splice(0, 100))
  }

  return contactsArr;
}

