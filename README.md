# Instant Messaging App
A small MERN stack project for the cs314 class. It covers the essential functionalities
for an application similar to Slack or Dicord:
- Clients can send messages to other clients through the server
- Clients can receive messages from other clients through the server
- Server accepts connections from clients
- Server delivers real-time messages between clients over the Internet

## Table of contents
- [Prerequisites] (#prerequisites)
- [Installation] (#installation)
- [Usage] (#usage)
- [Testing] (#testing)
- [Report] (#report)
    - [Code Structure] (#code-structure)
    - [Tests] (#tests)
    - [Challenges faced during the project] (#challenges-faced-during-the-project)
    - [Additional features implemented beyond the requirements] (#additional-features-implemented-beyond-the-requirements)

## Prerequisites
Ensure you have the following tools installed on your machine before proceeding
with the installation:
- IDE: VSCode
- MERN stack
    - MongoDB: A database for storing and retrieving data
    - Express.js: A web application framework for building user interfaces
    - React.js: A JavaScript library for building user interfaces
    - Node.js: A runtime for executing JavaScript

## Installation
1. **Clone** the repository (or download the source code)
2. **Navigate** to the project directory in your VS Code terminal
3. **Install** dependecies for both the client and server:

```bash
cd client
npm install
```

```bash
cd server
npm install
```

4. Note: If server does not want to work, go to **server/config/mongoose.config.js** file, and change the connection of the "database" variable to your database.

# Usage
1. **Start the server** (Server will run at http://localhost:8000)
```bash
cd server
npm start
```

2. **Start the client** (Client will run at http://localhost:3000)
```bash
cd client
npm start
```

# Testing
To test the client-side features, do the following in your terminal:
```bash
cd client
npm test
```

## Report
## Code structure
- Server-side
    - **config** folder has json and mongoose configurations files
    - **controller** folder has controller functionalities from http requests for users and chats
    - **model** folder has mongoose user and chat models for storage
        - Note: **post.model.js** is **not a model**, it is a schema that is stored in the chat model for storage
    - **routes** folder has routes to handle http user and chat requests
    - **sockets** folder traffics all chat messages
    - **server.js** creates a Express application for building APIs
- Client-side
    - **__mocks__** folder has three files that Jest uses whenever actual modules are imported
    - **__tests__** folder has testing files to test client-side components
    - **components** folder stores functionality components used in **views** folder
    - **views** folder contains page logic
    - **lib** folder stores server API to send HTTP requests

## Tests
For my tests, I could not finish testing all client-side features,
but the ones that I did in the "__tests__" folder, where I wrote
about 4 tests for each of my components. The componets tests are:
Registration component, Login component, Update component, and
createChat component. The tests that I did not do include: Main
component and Chat component.

## Challenges Faced During the Project
1. For me, I learned how to create a MERN stack application in
the past, so doing this again was relatively straightforward
since I had a previous MERN stack app. The challenge
for me was re-learning what my previous application since it had little
to no structure, and no documentation. This took me a lot of
my time, re-learning React.js, Express.js, and MongoDB.
2. Learning how to use sockets was a challenge to me because I
never used sockets before, and it was confusing the process of
using both sockets and http requests together to create real-time
messaging.
3. Testing my application with Jest was a real challenge for me. The
main challenge was trying to mock my client-side components. I had a
problem with one of my components because since my mock rejected value
did not appear the same as when running the actual application, it hid
the errors that were supposed to appear in the screen. This took me a
long time to debug since I did not know you had to follow the same
structure for your rejected value. Moreover, testing the Chat component
with sockets was very difficult for me.

## Additional Features Implemented Beyond the Requirements
    - Server-side features