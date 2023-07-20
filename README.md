# bitspeed

"Bitespeed Backend Task: Identity Reconciliation”: 

HOSTED ON : https://manna-project-bitspeed.onrender.com

CURL TO CREATE OR GET STORED DATA: 
curl --location 'https://manna-project-bitspeed.onrender.com/api/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "manan@gmail.com",
    "phoneNumber": "7488454584"
}'

For the first hit on API, it will take time as the server has to start. After the first hit it produces results quickly as it is a free server site so it gets automatically off once not in use. 

Basic functionality: This repo is based on -> to identify and keep track of a customer's identity across multiple purchases via their email and phone number. If the customer uses a different email and mobile number then also if the customer searches for its info using any email or phone number all its data will be provided with all email IDs and phone numbers.

how to run the code: 

BULID COMMAND : npm i

START COMMAND: npm start

This will give you data of all the users related to email and phone numbers mentioned + data which is linked to these numbers via primary or secondary id.
