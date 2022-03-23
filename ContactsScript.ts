/**
 * It search for an specific group of contacs and returns the primary email address of all the contacts whithin that group
 * @param groupName - the name of a contact group
 * @returns  an array of email addresses of all the contacts in the specified group
 */
const getContacts = (groupName: string): string[] => {

  const contactGroup = ContactsApp.getContactGroup(groupName)
  const contactsRaw = contactGroup.getContacts();
  const contacts: string[] = []
  //for each contact store its primary email address in the {contacts} variable
  contactsRaw.forEach(contact => {
    contacts.push(contact.getAddresses()[0].getAddress())
  })
  return contacts;
}

