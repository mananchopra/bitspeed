const contact = require('./contact_database')
const {Op, QueryTypes} = require('sequelize')
const _ = require('lodash')

const updateContactWithId = async (Ids, linkPrecedence, linkedId) => {
     const result = await contact.update({linkPrecedence: linkPrecedence, linkedId: linkedId },
        { where: {id : {[Op.in]: Ids}}})
}

const updateContactWithLinkedIdChange = async (Ids, linkedId) => {
    const result = await contact.update({linkedId: linkedId },
       { where: {id : {[Op.in]: Ids}}})
}

const getContactsByEmailorMobile = async (email, phoneNumber) => {
    let contacts = await contact.findAll({where: {[Op.or]: [{email: email}, {phoneNumber: phoneNumber}]}});
    if(_.isEmpty(contacts)) {
        let createdContact = await createContact({"phoneNumber": phoneNumber,
        "linkedId": null,
        "linkPrecedence": "primary",
        "email":email})
        contacts = createdContact
        let primaryContact = createdContact
        return {contacts, primaryContact}
    }
    let contacIds = new Set();
    for (let contact of contacts) {
        if (contact.id !==null && !contacIds.has(contact.id)) {
            contacIds.add(contact.id)
        }
        if(contact.linkedId !==null && !contacIds.has(contact.linkedId)) {
            contacIds.add(contact.linkedId)
        }
    }
    let idOfContacts = []
    for (let id of contacIds) {
        idOfContacts.push(id)
    }
    contacts = await contact.sequelize.query('SELECT * FROM contacts WHERE id IN (:id) or linkedId IN (:linkedId)',
    {
      replacements: { id: idOfContacts, linkedId: idOfContacts },
      type: QueryTypes.SELECT
    })
    let primaryContacts = _.filter(contacts, contact=> contact.linkPrecedence==='primary')
    primaryContacts = _.sortBy(primaryContacts, contact=> contact.createdAt)
    primaryContact = primaryContacts[0]
    let primaryToSecondaryContacts = []
    let linkedIdChange = []
    for (let contact of contacts) {
        if(contact.linkPrecedence==='primary' && contact.id !== primaryContact.id) {
            contact.linkPrecedence = 'secondary'
            contact.linkedId = primaryContact.id
            primaryToSecondaryContacts.push(contact.id)
        }
        else if(contact.id !== primaryContact.id && contact.linkedId !== primaryContact.id) {
            contact.linkedId = primaryContact.id
            linkedIdChange.push(contact.id)
        }
    }
    if(!_.isEmpty(primaryToSecondaryContacts)) {
        const result = await updateContactWithId(primaryToSecondaryContacts, "secondary", primaryContact.id)
    }
    if(!_.isEmpty(linkedIdChange)) {
        const result = await updateContactWithLinkedIdChange(linkedIdChange, primaryContact.id)
    }
    const emailContacts = _.filter(contacts, contact=> contact.email === email)
    const phoneNumberContacts = _.filter(contacts, contact => contact.phoneNumber === phoneNumber)
    let createdContact = null
    if(_.isEmpty(emailContacts) && _.isEmpty(phoneNumberContacts)) {
        createdContact = await createContact({"phoneNumber": phoneNumber,
        "linkedId": null,
        "linkPrecedence": "primary",
        "email":email})
    } else if(_.isEmpty(emailContacts) || _.isEmpty(phoneNumberContacts)) {
        createdContact = await createContact({"phoneNumber": phoneNumber,
        "linkedId": primaryContact.id,
        "linkPrecedence": "secondary",
        "email":email})
    }
    if (createdContact !== null) {
        contacts.push(createdContact)
    }
    return {contacts, primaryContact, linkedIdChange, primaryToSecondaryContacts}
}

const createContact = async (body) => {
    return await contact.create(body)
}   

module.exports = {
    getContactsByEmailorMobile,
    createContact
}