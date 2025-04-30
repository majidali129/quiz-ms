import { QuizCompleteStatus, QuizDifficulty, QuizType } from "@/features/quiz/types";

const creators = ["lahmajidali", "itsmajidali129", "majidalifrontenddeveloper", "majidaliofficial129"];

export const sampleQuizzes = [
  {
    title: "JavaScript Basics",
    description: "Test your knowledge of core JavaScript concepts.",
    quizType: "Objective",
    course: "JS101",
    createdBy: "lahmajidali",
    startDate: "2025-05-01",
    startTime: "10:00",
    quizDuration: 30,
    maxAttempts: 3,
    passingScore: 70,
    difficulty: "easy",
    questions: [
      {
        questionText: "What does '===' mean in JavaScript?",
        options: ["Assignment", "Equality", "Strict Equality", "Comparison"],
        correctOption: 2,
      },
      {
        questionText: "What type is NaN in JavaScript?",
        options: ["Number", "String", "Undefined", "Null"],
        correctOption: 0,
      },
      {
        questionText: "Which company developed JavaScript?",
        options: ["Netscape", "Google", "Microsoft", "Apple"],
        correctOption: 0,
      },
      {
        questionText: "How to define a constant in JavaScript?",
        options: ["var", "let", "const", "define"],
        correctOption: 2,
      },
      {
        questionText: "Which method converts a JSON string to object?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.decode()", "JSON.toObject()"],
        correctOption: 1,
      },
      {
        questionText: "What is the default value of `typeof undefined`?",
        options: ["null", "object", "undefined", "string"],
        correctOption: 2,
      },
      {
        questionText: "What symbol is used for single-line comments?",
        options: ["/*", "//", "#", "<!--"],
        correctOption: 1,
      },
      {
        questionText: "What is an IIFE in JS?",
        options: ["A variable", "A function that calls itself", "An object", "A loop"],
        correctOption: 1,
      },
      {
        questionText: "How do you declare an arrow function?",
        options: ["=>", "<=>", "-->", "->"],
        correctOption: 0,
      },
      {
        questionText: "Which is not a primitive type?",
        options: ["Number", "String", "Object", "Boolean"],
        correctOption: 2,
      },
    ],
  },
  {
    title: "React Fundamentals",
    description: "Quiz on basic React concepts and hooks.",
    quizType: "Objective",
    course: "REACT201",
    createdBy: "itsmajidali129",
    startDate: "2025-05-03",
    startTime: "11:00",
    quizDuration: 40,
    maxAttempts: 2,
    passingScore: 60,
    difficulty: "medium",
    questions: [
      {
        questionText: "What does JSX stand for?",
        options: ["JavaScript XML", "JSON XML", "Java Source XML", "JavaScript Syntax"],
        correctOption: 0,
      },
      {
        questionText: "Which hook is used for side effects?",
        options: ["useState", "useEffect", "useContext", "useMemo"],
        correctOption: 1,
      },
      {
        questionText: "What is a component?",
        options: ["A function", "A reusable UI element", "A file", "A CSS module"],
        correctOption: 1,
      },
      {
        questionText: "What is the default port for React dev server?",
        options: ["3000", "8080", "5000", "9000"],
        correctOption: 0,
      },
      {
        questionText: "How to lift state up?",
        options: ["By props", "Using Redux", "Passing handlers via props", "Using useState"],
        correctOption: 2,
      },
      {
        questionText: "Which hook provides state?",
        options: ["useEffect", "useMemo", "useState", "useRef"],
        correctOption: 2,
      },
      {
        questionText: "Which React feature allows context sharing?",
        options: ["Props", "useEffect", "Context API", "Hooks"],
        correctOption: 2,
      },
      {
        questionText: "What is the purpose of keys in lists?",
        options: ["Styling", "Identifying elements", "Looping", "Sorting"],
        correctOption: 1,
      },
      {
        questionText: "Which hook helps with memoization?",
        options: ["useEffect", "useMemo", "useCallback", "useState"],
        correctOption: 1,
      },
      {
        questionText: "React is maintained by?",
        options: ["Google", "Facebook", "Microsoft", "Amazon"],
        correctOption: 1,
      },
    ],
  },
  // 1. JavaScript Basics (Easy)
  {
    title: "JavaScript Fundamentals",
    description: "Test your basic JavaScript knowledge",
    course: "Web Development 101",
    quizType: QuizType.Objective,
    createdBy: creators[0],
    questions: [
      {
        questionText: "Which keyword is used to declare variables in JavaScript?",
        options: ["var", "let", "const", "all of the above"],
        correctOption: 3,
      },
      {
        questionText: "What does 'DOM' stand for in web development?",
        options: ["Document Object Model", "Data Object Management", "Digital Output Module", "Display Object Manipulation"],
        correctOption: 0,
      },
      {
        questionText: "Which operator is used for strict equality comparison?",
        options: ["==", "===", "=", "!=="],
        correctOption: 1,
      },
      {
        questionText: "What will 'typeof null' return in JavaScript?",
        options: ["null", "undefined", "object", "string"],
        correctOption: 2,
      },
      {
        questionText: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctOption: 0,
      },
      {
        questionText: "What is the purpose of 'use strict' in JavaScript?",
        options: ["To enable strict mode which catches common coding mistakes", "To make the code run faster", "To enforce type safety", "To enable experimental features"],
        correctOption: 0,
      },
      {
        questionText: "Which of these is NOT a JavaScript data type?",
        options: ["number", "boolean", "character", "symbol"],
        correctOption: 2,
      },
      {
        questionText: "What does the 'this' keyword refer to in a method?",
        options: ["The function itself", "The global object", "The object that owns the method", "The parent object"],
        correctOption: 2,
      },
      {
        questionText: "Which function is used to parse a string to an integer?",
        options: ["parseInt()", "parseFloat()", "Number()", "toInteger()"],
        correctOption: 0,
      },
      {
        questionText: "What does the 'NaN' value represent?",
        options: ["Not a Number", "Null and None", "Negative Number", "No assigned Number"],
        correctOption: 0,
      },
    ],
    startDate: "2023-11-15",
    startTime: "10:00",
    quizDuration: 30,
    maxAttempts: 3,
    passingScore: 70,
    completionStatus: QuizCompleteStatus["not-started"],
    isActive: true,
    difficulty: QuizDifficulty.easy,
    createdAt: new Date("2023-10-01"),
    updatedAt: new Date("2023-10-01"),
  },

  // 2. React Advanced (Hard)
  {
    title: "Advanced React Patterns",
    description: "Challenging questions about React advanced concepts",
    course: "Frontend Masters",
    quizType: QuizType.Objective,
    createdBy: creators[1],
    questions: [
      {
        questionText: "What is the purpose of React.memo?",
        options: ["To create memoized selectors", "To optimize functional components", "To manage global state", "To handle side effects"],
        correctOption: 1,
      },
      {
        questionText: "Which hook should be used for data fetching?",
        options: ["useState", "useEffect", "useReducer", "useContext"],
        correctOption: 1,
      },
      {
        questionText: "What is the key difference between useMemo and useCallback?",
        options: ["useMemo memoizes values, useCallback memoizes functions", "useMemo is for synchronous operations, useCallback for async", "useMemo is for components, useCallback for hooks", "There is no difference"],
        correctOption: 0,
      },
      {
        questionText: "What problem does the Context API solve?",
        options: ["Component styling", "Prop drilling", "State management", "Performance optimization"],
        correctOption: 1,
      },
      {
        questionText: "When would you use useReducer instead of useState?",
        options: ["When you need to manage complex state logic", "When you need better performance", "When you need to share state between components", "When you need to persist state"],
        correctOption: 0,
      },
      {
        questionText: "What is the children prop in React?",
        options: ["A special prop for child components", "A way to pass components as data", "A property that contains child elements", "All of the above"],
        correctOption: 3,
      },
      {
        questionText: "What is the purpose of React Fragments?",
        options: ["To group multiple elements without adding extra nodes", "To improve performance", "To create reusable component templates", "To handle errors"],
        correctOption: 0,
      },
      {
        questionText: "What is the difference between controlled and uncontrolled components?",
        options: ["Controlled components manage their own state", "Uncontrolled components are managed by React", "Controlled components are managed by React", "There is no difference"],
        correctOption: 2,
      },
      {
        questionText: "What does the term 'lifting state up' mean in React?",
        options: ["Moving state to a higher component in the tree", "Optimizing state updates", "Using context to share state", "Converting local state to global state"],
        correctOption: 0,
      },
      {
        questionText: "What is the purpose of the key prop in lists?",
        options: ["To uniquely identify elements", "To improve rendering performance", "To help React identify which items changed", "All of the above"],
        correctOption: 3,
      },
    ],
    startDate: "2023-11-20",
    startTime: "14:00",
    quizDuration: 45,
    maxAttempts: 2,
    passingScore: 80,
    completionStatus: QuizCompleteStatus["in-progress"],
    isActive: true,
    difficulty: QuizDifficulty.hard,
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2023-10-10"),
  },

  // 3. Node.js Architecture (Medium)
  {
    title: "Node.js Core Concepts",
    description: "Questions about Node.js internals and architecture",
    course: "Backend Development",
    quizType: QuizType.Objective,
    createdBy: creators[2],
    questions: [
      {
        questionText: "What is the event loop in Node.js?",
        options: ["A design pattern for handling events", "A loop that executes synchronous code", "A mechanism for executing asynchronous operations", "A type of for-loop"],
        correctOption: 2,
      },
      {
        questionText: "Which module is NOT built into Node.js?",
        options: ["fs", "http", "express", "path"],
        correctOption: 2,
      },
      {
        questionText: "What does 'non-blocking I/O' mean in Node.js?",
        options: ["I/O operations don't block the event loop", "I/O operations are always synchronous", "I/O operations are handled by separate threads", "I/O operations are prioritized"],
        correctOption: 0,
      },
      {
        questionText: "What is the purpose of the package.json file?",
        options: ["To store project metadata and dependencies", "To configure the Node.js runtime", "To define database schemas", "To store application secrets"],
        correctOption: 0,
      },
      {
        questionText: "Which command installs a package locally?",
        options: ["npm install -g package", "npm install package", "npm global install package", "npm add package"],
        correctOption: 1,
      },
      {
        questionText: "What is the CommonJS module system?",
        options: ["Node.js's original module system", "A new ES6 module system", "A browser-based module system", "A module system for TypeScript"],
        correctOption: 0,
      },
      {
        questionText: "What is the purpose of the require() function?",
        options: ["To import modules", "To load environment variables", "To make HTTP requests", "To validate input"],
        correctOption: 0,
      },
      {
        questionText: "Which core module provides file system operations?",
        options: ["fs", "path", "os", "util"],
        correctOption: 0,
      },
      {
        questionText: "What does process.env contain?",
        options: ["User environment variables", "Node.js configuration", "Package dependencies", "Operating system info"],
        correctOption: 0,
      },
      {
        questionText: "What is the purpose of the __dirname variable?",
        options: ["Returns the current directory name", "Returns the parent directory", "Returns the root directory", "Returns the home directory"],
        correctOption: 0,
      },
    ],
    startDate: "2023-12-01",
    startTime: "09:30",
    quizDuration: 60,
    maxAttempts: 1,
    passingScore: 90,
    completionStatus: QuizCompleteStatus.completed,
    isActive: false,
    difficulty: QuizDifficulty.medium,
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-10-20"),
  },

  // 4. System Design (Subjective)
  {
    title: "System Design Principles",
    description: "General system design concepts and patterns",
    course: "System Design",
    quizType: QuizType.Subjective,
    createdBy: creators[3],
    questions: [
      {
        questionText: "Explain the CAP theorem in distributed systems",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "Describe the difference between horizontal and vertical scaling",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "What are the advantages of microservices architecture?",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "Explain the concept of eventual consistency",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "Describe how a load balancer works",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "What is the difference between SQL and NoSQL databases?",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "Explain the concept of sharding in databases",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "Describe the benefits of caching in system design",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "What is a CDN and how does it work?",
        options: [],
        correctOption: -1,
      },
      {
        questionText: "Explain the concept of idempotency in APIs",
        options: [],
        correctOption: -1,
      },
    ],
    startDate: "2023-12-10",
    startTime: "13:00",
    quizDuration: 90,
    maxAttempts: 2,
    passingScore: 75,
    isActive: true,
    difficulty: QuizDifficulty.hard,
    createdAt: new Date("2023-11-01"),
    updatedAt: new Date("2023-11-05"),
  },

  // 5. TypeScript Fundamentals (Medium)
  {
    title: "TypeScript Basics",
    description: "Test your TypeScript knowledge",
    course: "Web Development 201",
    quizType: QuizType.Objective,
    createdBy: creators[0],
    questions: [
      {
        questionText: "What is TypeScript?",
        options: ["A superset of JavaScript", "A completely different language", "A JavaScript framework", "A testing library"],
        correctOption: 0,
      },
      {
        questionText: "Which command compiles TypeScript to JavaScript?",
        options: ["tsc", "typescript", "compile-ts", "node-ts"],
        correctOption: 0,
      },
      {
        questionText: "What is the file extension for TypeScript files?",
        options: [".js", ".ts", ".tsx", ".typescript"],
        correctOption: 1,
      },
      {
        questionText: "How do you define a type in TypeScript?",
        options: ["type MyType = {...}", "interface MyType {...}", "Both A and B", "None of the above"],
        correctOption: 2,
      },
      {
        questionText: "What is the purpose of the 'any' type?",
        options: ["To represent any JavaScript value", "To represent an empty value", "To represent a function", "To represent an array"],
        correctOption: 0,
      },
      {
        questionText: "What does the '!' operator do in TypeScript?",
        options: ["Logical NOT", "Non-null assertion", "Optional chaining", "Type casting"],
        correctOption: 1,
      },
      {
        questionText: "How do you make a property optional in an interface?",
        options: ["property?: type", "optional property: type", "property: type?", "property: optional type"],
        correctOption: 0,
      },
      {
        questionText: "What is a tuple in TypeScript?",
        options: ["An array with fixed types at specific positions", "A key-value pair", "A type alias", "A function type"],
        correctOption: 0,
      },
      {
        questionText: "What is the purpose of enums in TypeScript?",
        options: ["To define a set of named constants", "To create iterables", "To define classes", "To handle errors"],
        correctOption: 0,
      },
      {
        questionText: "How do you define a function type in TypeScript?",
        options: ["type Func = () => void", "interface Func { (): void }", "Both A and B", "None of the above"],
        correctOption: 2,
      },
    ],
    startDate: "2023-12-15",
    startTime: "11:00",
    quizDuration: 45,
    maxAttempts: 3,
    passingScore: 80,
    completionStatus: QuizCompleteStatus["not-started"],
    isActive: true,
    difficulty: QuizDifficulty.medium,
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-11-15"),
  },
];
