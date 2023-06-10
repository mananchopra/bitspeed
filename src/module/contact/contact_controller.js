const router = require('express').Router()
const contactService = require("./contact_service")

router.post('/identify', async(req, res, next) => {
    const result = await contactService.getContacts(req.query.email, req.query.phoneNumber)
    return res.json(result);

})

router.post('/createContact', async(req, res, next) => {
    console.log(JSON.stringify(req.body))
    const result = await contactService.createContact(req.body)
    return res.json(result);

})

module.exports = router
