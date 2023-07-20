const router = require('express').Router()
const contactService = require("./contact_service")

router.post('/identify', async(req, res, next) => {
    if(!req.body.email && !req.body.phoneNumber) {
        return res.status(400).json('both email and phoneNumber are null')
    }
    const result = await contactService.getContacts(req.body.email, req.body.phoneNumber)
    return res.status(200).json(result);
})

router.post('/createContact', async(req, res, next) => {
    console.log(JSON.stringify(req.body))
    const result = await contactService.createContact(req.body)
    return res.status(200).json(result);
})

module.exports = router
