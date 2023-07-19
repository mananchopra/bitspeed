const contactRepository = require('./contact_repository')
const _ = require('lodash')

const getContacts = async(email, phoneNumber) => {
    if(!email && !phoneNumber) {
        throw new Error('Both Email and phoneNumber are empty.')
    }
    if(!email) email = null
    if(!phoneNumber) phoneNumber = null
    const UserContactInfo = await contactRepository.getContactsByEmailorMobile(email,phoneNumber)
    let contact = {}
    contact.primaryContatctId = UserContactInfo?.primaryContact?.id
    contact.emails = [], contact.phoneNumbers = [], contact.secondaryContactIds = []
    UserContactInfo.contacts = _.sortBy(UserContactInfo.contacts, contact => contact.createdAt)
    let info = new Set()
    info.add(UserContactInfo.primaryContact.id)
    for (let userContact of UserContactInfo.contacts) {
        if(!info.has(userContact.email) && userContact.email != null) {
            contact.emails.push(userContact.email)
            info.add(userContact.email)
        }
        if(!info.has(userContact.phoneNumber) && userContact.phoneNumber != null) {
            contact.phoneNumbers.push(userContact.phoneNumber)
            info.add(userContact.phoneNumber)
        }
        if(!info.has(userContact.id)) {
            contact.secondaryContactIds.push(userContact.id)
            info.add(userContact.id)
        }
    }
    return contact
}

const createContact = async (data) => {
    return await contactRepository.createContact(data)
}

module.exports = {
    getContacts, 
    createContact
}
