# bitspeed

"Bitespeed Backend Task: Identity Reconciliation”: 

Basic functionality: This repo is based on -> to identify and keep track of a customer's identity across multiple purchases via their email and phoneNumber. If the customer uses different email and mobile number than also if the customer seraches it's info using any email or phonenumber all it's data will be provided with all emailIds and phone numbers.

how to run the code: 

1. first install all the dependencies mentioned in package.json.
2. Change the database connection values like username, password, host, databaseName according to your local database.
3. Create a table in that database named contacts. ( CREATE TABLE contacts(id INT NOT NULL AUTO_INCREMENT,phoneNumber VARCHAR(15),email VARCHAR(245),linkedId INT, linkPrecedence VARCHAR(30),createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,deletedAt DATETIME,PRIMARY KEY(id)); )
4. then you can run this code by pointing directory to bitspeed and entring command -> npm start
5. than you are good to go.
6. To fetch the data from sql or to store the data of a unique user make a post call to -> 
curl --location --request POST 'http://loclahost:5002/api/identify?email=peter%2540edu&phoneNumber=123456'

this will give you data of all the users related to email and phoneNumber mentioned + data which is linked to these number via primary or secondary id.

7. If you need you can host this locally for anyone to use by using ngrok.

you will get the response in this format: 
{
    "primaryContatctId": 5,
    "emails": [
        "samDrake.edu",
        "nathanDrake.edu",
        "peterparker@edu",
        "peter@edu",
        "lorraine@hillvalley.edu"
    ],
    "phoneNumbers": [
        "546444",
        "123456",
        "676754"
    ],
    "secondaryContactIds": [
        2,
        7,
        11,
        12,
        1
    ]
}

