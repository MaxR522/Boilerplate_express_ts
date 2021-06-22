# Node.js Express.js Typescript boilerplate

---

![NodeJs](https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white)![ExpressJs](https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge)![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white)

![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

> this readme contain the prerequisite, how to run it, folder structure, features and dependencies used inside the project

## Description

This is a small project with full authentication system. I build this boilerplate to start all my new project from this and not from 0.

## Prerequisite

- node js version >= 10.xx.x
- express version >= 4.xx.x
- typescript version >= 4.x.x

## Run Locally

> I assume that you have node, npm, yarn, mongoDB, redis and typescript installed globally

Clone the project

```bash

git clone https://github.com/MaxR522/Boilerplate_express_ts.git

```

Go to the project directory

```bash

cd Boilerplate_express_ts

```

Install dependencies

```bash

yarn install

```

Start the dev server

```bash

yarn dev

```

To run tests, run the following command

```bash

yarn test

```

To build, run the following command

```bash

yarn build

```

To start server

```bash

yarn start

```

To generate doc, run the following command

```bash


yarn doc

```

To lint, run the following command

```bash

yarn lint

```

## Basic folder structure

```
├── doc (generated doc by apiDoc)
├── src (all source file)
│   └── apiDoc (all apiDoc for routes)
│   └── config (all config files and variables from .env)
│   └── controllers
│	└── post_controller
│	└── user_controller
│   └── custom_typings (adding custom types)
│   └── interfaces (all the interfaces)
│   └── mailers
│   └── middlewares
│   └── models
│   └── routes
│   └── utils (utils method)
│   └── index.ts
├── tests
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├──  apidoc.json
├──  LICENSE.md
├──  package.json
├──  tsconfig.json
└──  yarn.lock
```

## Features

1 - **User authentication system**:

- [x] Register with confirmation email
- [x] Login generate access and refresh token
- [x] Logout
- [x] Generating new access-token
- [x] Revoke refresh-token
- [x] Reset password
- [x] Change password
- [ ] Connection using Google account (coming soon)
- [ ] Connection using Facebook account (coming soon)

2 - **CRUD User**:

- [x] Update user's information
- [ ] Delete user's account (coming soon)
- [x] Read user's info (all, one, filtered)

3 - **CRUD Post** (for example purposes only) (coming soon):

- [ ] Create Post, only logged in user
- [ ] Read Post, show posts (all, one or specified query)
- [ ] Update Post, only the user who is the author of Post
- [ ] Delete Post, only the user who is the author of Post

## Security & Privacy

- [x] rate limit attempt on email when login
- [x] JWT auth with access-token (low expiry time) and refresh-token (long expiry time) stored in cookie httpOnly
- [x] CORS
- [x] User's password hashed by bcrypt
- [x] rate limit request per IP address, All IP addresses are not stored permanently

## Some dependencies used with explanation

1. <ins>**Prod dependecies**:</ins>

- **bcrypt** to encrypt password
- **cookie-parser** to parse cookie
- **cors** to block request from unwanted domain
- **express-validator** validation for param, header or cookie
- **jsonwebtoken** the authentication system is based on JWT token
- **mongoose** mongoDB database
- **redis** for storing data with expiry time to live
- **nodemailer** for mailing
- **passport** for Oauth authentication
- **express**
- **axios** to perform some requests
- **winston** for logging
- **morgan** for http logging

2. <ins>**Dev dependencies**:</ins>

- **mocha** for testing
- **chai & chai-http** for testing asssertion
- **apiDoc** api documentation
- **nodemon**
- **typescript**
- **prettier**
- **eslint**

## Author

- [Mario Randrianomearisoa](https://github.com/MaxR522)
