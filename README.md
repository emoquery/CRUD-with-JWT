# CRUD with JWT 

 API Endpoints

| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| POST         | /register    |Register User       |
| POST        | /login    |Login User           |
| GET         | / |Get all users         |
| GET        | /:username    |Get a specific user         |
| PUT        | /:username    |Update an existing user|
| DELETE        | /:username    |Delete an existing user|

To register you need to enter: Name,Surname,Username,Password and Email

To login you need to enter: Username and Password

To get access for protected routes enter key:"x-token" and value:"token that you will get after registration(expires in 10h)" in headers

## Quick Start

Create the .env file.

```bash
PORT = 3000
DB_URI = Database link
TOKEN = secretkey
```

Install the dependencies.

```bash
npm install
```
To start the express server, run the following.

```bash
npm start
```
