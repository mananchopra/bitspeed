# bitspeed

"Bitespeed Backend Task: Identity Reconciliation”: 

HOSTED ON : https://manna-project-bitspeed.onrender.com

CURL TO CREATE OR GET STORED DATA : curl --location --request POST 'https://manna-project-bitspeed.onrender.com/api/identify?email=manan%40edu&phoneNumber=123456'

For first hit on api it will take time as the server has to start. After the first hit it produces results quickly as it is a free server site so it gets automatically off once not in use. 

Basic functionality: This repo is based on -> to identify and keep track of a customer's identity across multiple purchases via their email and phoneNumber. If the customer uses different email and mobile number than also if the customer seraches it's info using any email or phonenumber all it's data will be provided with all emailIds and phone numbers.

how to run the code: 

BULID COMMAND : npm i

START COMMAND : npm start

this will give you data of all the users related to email and phoneNumber mentioned + data which is linked to these number via primary or secondary id.
