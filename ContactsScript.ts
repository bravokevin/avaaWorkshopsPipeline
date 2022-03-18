const CONTACT_GROUP_ID = 'http://www.google.com/m8/feeds/groups/kevinjosemotab%40gmail.com/base/358067f78e7fe312'

const getContacts = () => {
  const contactGroup = ContactsApp.getContactGroupById(CONTACT_GROUP_ID)
  const contactsRaw = contactGroup.getContacts();
  const contacts = []
  contactsRaw.forEach(contact => {
    contacts.push(contact.getEmailAddresses()[0])
  })
  return contacts;
}

