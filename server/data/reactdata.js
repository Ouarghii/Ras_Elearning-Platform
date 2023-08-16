const questionsReact=
[
  {
    "id": 1,
    "question": "What does ReactJS stand for?",
    "options": ["JavaScript XML", "Java XML", "JavaScript"]
  },
  {
    "id": 2,
    "question": "Which library is used for state management in React?",
    "options": ["Express", "Redux", "Axios"]
  },
  {
    "id": 3,
    "question": "Which of the following is a hook in React?",
    "options": ["setAttributes", "getElements", "useState"]
  },
  {
    "id": 4,
    "question": "In React, props are...",
    "options": ["Both read and write", "Write-only", "Read-only"]
  },
  {
    "id": 5,
    "question": "What is JSX in React?",
    "options": ["JS XML", "JavaScript XML", "Java Syntax XML"]
  },
  {
    "id": 6,
    "question": "Which component lifecycle method is called before rendering?",
    "options": ["componentWillUpdate", "componentDidMount", "componentWillMount"]
  },
  {
    "id": 7,
    "question": "In React, what is a fragment?",
    "options": ["A type of CSS selector", "A shorthand for the React.Fragment component", "A JavaScript library"]
  },
  {
    "id": 8,
    "question": "What is the purpose of useEffect hook?",
    "options": ["Create new components", "Perform side effects in functional components", "Handle events in class components"]
  },
  {
    "id": 9,
    "question": "Which hook is used for handling network requests in React?",
    "options": ["useApi", "useEffect", "useFetch"]
  },
  {
    "id": 10,
    "question": "What is the purpose of the 'key' prop in React?",
    "options": ["Apply custom styling to elements", "Set a unique identifier for the entire component", "Help React identify which items have changed"]
  },
  {
    "id": 11,
    "question": "Which method is used to change the state in React?",
    "options": ["updateState", "setState", "changeState"]
  },
  {
    "id": 12,
    "question": "What is the virtual DOM in React?",
    "options": ["A third-party library", "A lightweight representation of the actual DOM", "A type of CSS selector"]
  },
  {
    "id": 13,
    "question": "What is the purpose of React Router?",
    "options": ["Perform network requests", "Manage state in Redux", "Implement navigation in single-page applications"]
  },
  {
    "id": 14,
    "question": "Which package is used for making HTTP requests in React?",
    "options": ["jQuery", "Fetch", "Axios"]
  },
  {
    "id": 15,
    "question": "What is the purpose of a 'ref' in React?",
    "options": ["Create functional components", "Access and interact with DOM elements", "Define component styles"]
  }
]

const answersCorrect = [
    0, // For question 1, the correct option is "JavaScript XML"
    1, // For question 2, the correct option is "Redux"
    2, // For question 3, the correct option is "useState"
    0, // For question 4, the correct option is "Both read and write"
    1, // For question 5, the correct option is "JavaScript XML"
    1, // For question 6, the correct option is "componentDidMount"
    1, // For question 7, the correct option is "A shorthand for the React.Fragment component"
    0, // For question 8, the correct option is "Create new components"
    2, // For question 9, the correct option is "useFetch"
    2, // For question 10, the correct option is "Help React identify which items have changed"
    1, // For question 11, the correct option is "setState"
    1, // For question 12, the correct option is "A lightweight representation of the actual DOM"
    2, // For question 13, the correct option is "Implement navigation in single-page applications"
    2, // For question 14, the correct option is "Axios"
    1, // For question 15, the correct option is "Access and interact with DOM elements"
  ];

module.exports = { questionsReact, answersCorrect };
