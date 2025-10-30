interface ExpertiseItem {
  name: string;
  type: 'Language' | 'Framework' | 'Backend';
  description: string;
  tags: string[];
}

export const expertiseData: ExpertiseItem[] = [
  {
    name: 'React',
    type: 'Framework',
    description:
      'React is a popular JavaScript library for building user interfaces, particularly single-page applications. It allows developers to create reusable UI components and efficiently update the DOM when data changes.',
    tags: ['FRAMEWORK', 'WEB APP', 'FRONTEND'],
  },
  {
    name: 'Next.js',
    type: 'Framework',
    description:
      'Next.js is a React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications.',
    tags: ['FRAMEWORK', 'WEB APP', 'FRONTEND', 'SSR'],
  },
  {
    name: 'Node.js',
    type: 'Backend',
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows developers to run JavaScript on the server-side.",
    tags: ['BACKEND', 'RUNTIME', 'JAVASCRIPT'],
  },
  {
    name: 'Express',
    type: 'Framework',
    description:
      'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    tags: ['FRAMEWORK', 'BACKEND', 'WEB APP'],
  },
  {
    name: 'Auth0',
    type: 'Backend',
    description:
      'Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications with support for multiple identity providers.',
    tags: ['THIRD PARTY', 'AUTHENTICATION', 'API'],
  },
  {
    name: 'Stripe',
    type: 'Backend',
    description:
      'Stripe is a technology company that builds economic infrastructure for the internet, providing payment processing solutions for online businesses.',
    tags: ['THIRD PARTY', 'PAYMENT', 'API'],
  },
  {
    name: 'Flutter',
    type: 'Framework',
    description:
      "Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
    tags: ['FRAMEWORK', 'MOBILE', 'CROSS-PLATFORM'],
  },
  {
    name: 'React Native',
    type: 'Framework',
    description:
      'React Native is a popular framework for building native mobile applications using JavaScript and React. It allows developers to create cross-platform apps that run on both iOS and Android with a single codebase.',
    tags: ['FRAMEWORK', 'MOBILE', 'FRONTEND'],
  },
  {
    name: 'JavaScript',
    type: 'Language',
    description:
      'JavaScript is a versatile programming language that enables interactive web pages and is an essential part of web applications, alongside HTML and CSS.',
    tags: ['LANGUAGE', 'WEB APP', 'FRONTEND', 'BACKEND'],
  },
  {
    name: 'HTML',
    type: 'Language',
    description:
      'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.',
    tags: ['LANGUAGE', 'WEB APP', 'FRONTEND'],
  },
  {
    name: 'CSS',
    type: 'Language',
    description:
      'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.',
    tags: ['LANGUAGE', 'WEB APP', 'FRONTEND', 'STYLING'],
  },
  {
    name: 'MongoDB',
    type: 'Backend',
    description:
      'MongoDB is a source-available cross-platform document-oriented database program that uses JSON-like documents with optional schemas.',
    tags: ['DATABASE', 'NOSQL', 'BACKEND'],
  },
  {
    name: 'PostgreSQL',
    type: 'Backend',
    description:
      'PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development.',
    tags: ['DATABASE', 'SQL', 'BACKEND'],
  },
];

export const expertiseCategories = [
  { id: 'all', name: 'ALL' },
  { id: 'language', name: 'LANGUAGE' },
  { id: 'framework', name: 'FRAMEWORK' },
  { id: 'database', name: 'DATABASE' },
  { id: 'api', name: 'API' },
  { id: 'web_app', name: 'WEB APP' },
  { id: 'mobile', name: 'MOBILE' },
  { id: 'third_party', name: 'THIRD PARTY' },
  { id: 'backend', name: 'BACKEND' },
  { id: 'frontend', name: 'FRONTEND' },
];
