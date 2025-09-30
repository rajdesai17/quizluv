# **Online Quiz Application**

### **Project Goal**

A full-stack application where users can take a quiz and see their score.

### **Core Features**

- **Backend:**
    1. Use a database (like SQLite) to store a few questions for one quiz. Each question has text, options, and a reference to the correct option.
    2. An endpoint to fetch all questions for a quiz (without sending the correct answers).
    3. An endpoint that takes the user's answers, calculates the score, and returns it.
- **Frontend:**
    1. A start page that lets the user begin the quiz.
    2. A view that displays one question at a time with its options.
    3. "Next" and "Previous" buttons to navigate between questions.
    4. A "Submit" button on the final question that sends all answers to the backend.
    5. A final screen that displays the user's score.

### **Evaluation Criteria**

- **Dev Skills & Code Quality:** Full end-to-end functionality, state management on the frontend to track user answers, a well-designed API to support the quiz flow.
- **Completion:** A user can complete the entire quiz flow from start to finish.

### **Bonus Features ✨**

- Add a timer to the quiz on the frontend.
- On the results page, show the user which questions they got right and wrong.
- **Test Cases:** Backend tests for the scoring logic