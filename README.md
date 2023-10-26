# Kimuchan 🌸: A Japanese Learning App 

## Overview

こんにちは (Konnichiwa)! Welcome to Kimuchan, your go-to web app for mastering the Japanese language. From vocabulary to reading tests, we're your one-stop location for all things 日本語 (Nihongo).

## Table of Contents

- [Quick Start](#quick-start)
- [Docker Notes](#docker-notes)
- [MongoDB Setup](#mongodb-setup)
- [User Accounts](#user-accounts)
- [Features](#features)
  - [Vocabulary](#vocabulary)
  - [Reading Lessons](#reading-lessons)
  - [Tests](#tests)
  - [Friendship & Community](#friendship--community)
- [User Activity](#user-activity)
- [FAQs](#faqs)
- [License](#license)

---

# Quick Start

1. **Clone the repository**
2. **Install dependencies:**  
   ```bash
   npm install
3. **Run the web app:**  
npm start

# User Accounts
Your data is safe with us. We hash your passwords and keep your email confidential.

## Regular User Example

{
  "email": "john.doe@example.com",
  "username": "john_doe",
  "role": "user",
  ...
}
## Admin User Example
{
  "email": "jane.smith@example.com",
  "role": "admin",
  ...
}

# Features
## Vocabulary
Learn words like 'こんにちは' (Konnichiwa) and 'ありがとう' (Arigatou) with ease.

const vocabulary1 = new Vocabulary({
  word: 'こんにちは',
  pronunciation: 'Konnichiwa',
  meaning: 'Hello',
  ...
});

## Reading Lessons based on JLPT Reading Tests: Prep Like a Pro 🎯

One of the standout features of Kimuchan is the dedicated practice tests for JLPT (Japanese Language Proficiency Test) levels. Whether you're eyeing N5 or striving for N1, we've got your back!

- **Realistic Test Scenarios:** Our tests mimic the JLPT format, offering you an authentic exam experience.
  
- **Level-Specific Content:** Tackling N5? Or perhaps challenging N2? Our questions adapt to your chosen JLPT level.
  
- **Instant Feedback:** Get real-time results to understand your strengths and weaknesses better.

- **Unlimited Retakes:** Yes, you read that right! Take the tests as many times as you want until you feel confident.


## Tests
Challenge yourself with our comprehensive tests that cover various aspects of the Japanese language.

const test = new Test({
  title: 'Japanese Test',
  description: 'A test to evaluate Japanese reading skills.',
  ...
});

## Friendship & Community
Why learn alone when you can make friends?

const friendshipRequest = new Friendship({
  user1: 'user123',
  user2: 'user456',
  status: 'pending',
  ...
});

## User Activity
Keep track of your learning milestones.

const readingLessonActivity = new UserActivity({
  user: userId,
  activityType: 'readingLesson',
  ...
});


Incorporate this additional information into the FAQ section as well:

```markdown
## FAQs

- **Is Kimuchan beginner-friendly?**
  - Yes, we cater to learners of all levels.

- **Can I practice for the JLPT exams?**
  - Absolutely! Our JLPT Reading Tests feature offers a comprehensive and realistic practice environment to help you prepare effectively for your exams.



## License
MIT License. Freely use the code, but attribution is appreciated.

Feel free to make any changes as you see fit!
Hope this fits the bill! If you have any more specific requirements or questions, feel free to ask. Happy coding! 🌸👩‍💻👨‍💻

<h1 align="center">Hi 👋, I'm Kim</h1>
<h3 align="center">A passionate learner from Vietnam</h3>

- 🔭 I’m currently working on **a Japanese learning app**

- 🌱 I’m currently learning **typescript, python**

- 💬 Ask me about **javascript, react, nodejs**

- 📫 How to reach me **tranhoangbichkim@gmail.com**

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://linkedin.com/in/kimuchan" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="kimuchan" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.microsoft.com/en-us/sql-server" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" alt="mssql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

