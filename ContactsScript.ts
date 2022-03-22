const CONTACT_GROUP_ID = 'http://www.google.com/m8/feeds/groups/kevinjosemotab%40gmail.com/base/358067f78e7fe312'


/**
 * It search for an specific group of contacs and returns the primary email address of all the contacts whithin that group
 * @returns  an array of email addresses of all the contacts in the specified group
 */
const getContacts = (): string[]  => {
  const contactGroup = ContactsApp.getContactGroupById(CONTACT_GROUP_ID)
  const contactsRaw = contactGroup.getContacts();
  const contacts: string[] = []
  //for each contact store its primary email address in the {contacts} variable
  contactsRaw.forEach(contact => {
    contacts.push(contact.getEmailAddresses()[0])
  })
  return contacts;
}

