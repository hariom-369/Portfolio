// ============================================================
// PORTFOLIO DATA — Hariom Choudhary
// Single source of truth for all content
// ============================================================

export const personal = {
  name: 'Hariom Choudhary',
  title: 'Full-Stack Developer',
  subtitle: 'AI/ML Enthusiast',
  tagline: 'Building scalable web applications and intelligent systems.',
  description:
    'I engineer full-stack products and explore intelligent systems at the intersection of modern web development and machine learning. Currently pursuing B.Tech at IIIT Kota, I focus on building reliable, well-architected software that solves real problems.',
  email: 'hariomchoudhary6106@gmail.com',
  phone: '+91-7849920674',
  location: 'IIIT Kota, Rajasthan, India',
  resumeFile: '/Hariom_Choudhary_Resume.pdf',
};

export const education = [
  {
    institution: 'Indian Institute of Information Technology, Kota',
    shortName: 'IIIT Kota',
    degree: 'B.Tech — Electronics and Communication Engineering',
    period: '2023 — 2027',
    status: 'Pursuing',
    highlight: 'Secured 95.42 percentile in JEE Mains',
  },
];

export const projects = [
  {
    id: 'lux-cashbook',
    name: 'LUX-CashBook',
    tagline: 'Premium Personal Finance & Cash Book Platform',
    category: 'Full-Stack Product',
    status: 'Built',
    accentColor: '#22d3ee',
    accentDim: 'rgba(34, 211, 238, 0.1)',
    problem:
      'Personal finance management often requires either overly complex enterprise tools or oversimplified apps that lack essential features like cash book management, lending/borrowing tracking, and offline-first operation.',
    solution:
      'A comprehensive personal finance system built with offline-first architecture, featuring multi-wallet management, a full cash book, lending/borrowing ledger, and automated financial reports — all synced seamlessly when online.',
    features: [
      { label: 'Cash Book', icon: '📒', desc: 'Complete transaction ledger with category tagging' },
      { label: 'Lending & Borrowing', icon: '🤝', desc: 'Ledger tracking for money lent and borrowed' },
      { label: 'Income & Expenses', icon: '📊', desc: 'Categorized income and expense tracking' },
      { label: 'Multi-Wallet', icon: '💳', desc: 'Manage multiple wallets and accounts' },
      { label: 'Budget Management', icon: '🎯', desc: 'Set budgets and track spending against limits' },
      { label: 'Financial Reports', icon: '📈', desc: 'Visual reports and analytics for financial health' },
      { label: 'Offline-First', icon: '📡', desc: 'Full offline capability with background sync' },
      { label: 'CSV Import/Export', icon: '📂', desc: 'Bulk import and export via CSV format' },
      { label: 'PDF Statements', icon: '📄', desc: 'Generate downloadable PDF financial statements' },
      { label: 'Backup & Restore', icon: '🔒', desc: 'Encrypted data backup and restore capability' },
    ],
    stack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express.js', category: 'Backend' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'Mongoose', category: 'ORM' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Zustand', category: 'State' },
      { name: 'TanStack Query', category: 'Data Fetching' },
      { name: 'Vite', category: 'Build Tool' },
      { name: 'JWT', category: 'Auth' },
    ],
    architecture: [
      { layer: 'React + TypeScript', role: 'UI', color: '#22d3ee' },
      { layer: 'Zustand + TanStack Query', role: 'State & Data Layer', color: '#818cf8' },
      { layer: 'REST API', role: 'Interface', color: '#6366f1' },
      { layer: 'Express.js + Node.js', role: 'Backend', color: '#10b981' },
      { layer: 'MongoDB + Mongoose', role: 'Database', color: '#f59e0b' },
    ],
    challenges: [
      'Designing an offline-first architecture with automatic sync conflict resolution',
      'Building a robust multi-wallet transaction system with atomic operations',
      'Implementing PDF statement generation with dynamic financial data',
      'Managing complex state across cash book, ledger, and budget modules',
    ],
    links: { github: null, demo: null },
  },
  {
    id: 'ecommerce',
    name: 'Full-Stack E-Commerce Platform',
    tagline: 'Scalable MERN Stack Commerce Application',
    category: 'Full-Stack Web App',
    status: 'Built',
    accentColor: '#6366f1',
    accentDim: 'rgba(99, 102, 241, 0.1)',
    problem:
      'Building a complete e-commerce platform that handles authentication, role-based access, product management, cart operations, and order processing end-to-end requires careful API design and data architecture.',
    solution:
      'A full-stack e-commerce application on the MERN stack with JWT authentication, role-based access control separating user and admin flows, and RESTful APIs handling the complete commerce lifecycle from product listing to order placement.',
    features: [
      { label: 'User Authentication', icon: '🔐', desc: 'Secure JWT-based auth with token refresh' },
      { label: 'Role-Based Access', icon: '👥', desc: 'Separate user and admin access levels' },
      { label: 'Product Listing', icon: '🛍️', desc: 'Dynamic product catalog with filtering' },
      { label: 'Cart Management', icon: '🛒', desc: 'Real-time cart operations and persistence' },
      { label: 'Order Placement', icon: '📦', desc: 'Complete order flow with status tracking' },
      { label: 'REST APIs', icon: '⚡', desc: 'Clean RESTful API architecture' },
      { label: 'Data Validation', icon: '✅', desc: 'Server-side validation and error handling' },
    ],
    stack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express.js', category: 'Backend' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'JWT', category: 'Auth' },
      { name: 'REST APIs', category: 'Architecture' },
    ],
    architecture: [
      { layer: 'React', role: 'Frontend', color: '#22d3ee' },
      { layer: 'REST API', role: 'Interface', color: '#818cf8' },
      { layer: 'Express.js + Node.js', role: 'Backend', color: '#6366f1' },
      { layer: 'MongoDB', role: 'Database', color: '#10b981' },
    ],
    challenges: [
      'Implementing secure JWT authentication with role-based route protection',
      'Designing atomic cart operations to prevent race conditions',
      'Building clean RESTful APIs with consistent error handling patterns',
      'Managing product inventory and order state transitions',
    ],
    links: { github: null, demo: null },
  },
  {
    id: 'ai-career-mentor',
    name: 'AI Career Mentor',
    tagline: 'AI-Driven Career Guidance & Skill Intelligence Platform',
    category: 'AI / ML System',
    status: 'Built',
    accentColor: '#10b981',
    accentDim: 'rgba(16, 185, 129, 0.1)',
    problem:
      'Job seekers lack personalized, data-driven guidance on which career paths suit their actual skill profile. Generic job boards don\'t analyze skill gaps or recommend specific learning paths tailored to individual capability profiles.',
    solution:
      'An AI-powered platform that parses resumes using NLP and TF-IDF analysis, identifies skill gaps against 60+ job roles, and delivers personalized career recommendations with targeted learning guidance. A Python/Flask ML backend connects to a React dashboard for visualization.',
    features: [
      { label: 'Resume Parsing', icon: '📄', desc: 'NLP-powered resume text extraction and analysis' },
      { label: 'TF-IDF Analysis', icon: '🧠', desc: 'TF-IDF based skill extraction from unstructured text' },
      { label: 'Skill Gap Analysis', icon: '📊', desc: 'Identifies missing skills per target role' },
      { label: 'Role Recommendations', icon: '🎯', desc: '60+ job roles with fit-scoring algorithm' },
      { label: 'Personalized Guidance', icon: '✨', desc: 'Tailored skill-building recommendations' },
      { label: 'React Dashboard', icon: '📱', desc: 'Interactive visualization of career insights' },
    ],
    stack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Python', category: 'ML Backend' },
      { name: 'Flask', category: 'ML API' },
      { name: 'NLP', category: 'AI' },
      { name: 'TF-IDF', category: 'Algorithm' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express.js', category: 'Backend' },
      { name: 'MongoDB', category: 'Database' },
    ],
    pipeline: [
      { step: 'Resume Upload', icon: '📄', color: '#22d3ee' },
      { step: 'Text Extraction', icon: '⚙️', color: '#818cf8' },
      { step: 'NLP Processing', icon: '🧠', color: '#6366f1' },
      { step: 'Skill Identification', icon: '🔍', color: '#a78bfa' },
      { step: 'Gap Analysis', icon: '📊', color: '#10b981' },
      { step: 'Role Recommendation', icon: '🎯', color: '#f59e0b' },
    ],
    metrics: [
      { value: '85%', label: 'Resume Parsing Accuracy', note: 'Project-reported results' },
      { value: '60+', label: 'Job Roles Indexed' },
      { value: '40%', label: 'Improvement in Recommendation Relevance', note: 'Project-reported results' },
    ],
    challenges: [
      'Implementing TF-IDF skill extraction from varied resume formats',
      'Building a meaningful skill gap scoring system across 60+ roles',
      'Connecting Python/Flask ML backend with Node.js REST API layer',
      'Designing the recommendation algorithm for relevance and accuracy',
    ],
    links: { github: null, demo: null },
  },
];

export const skills = {
  'Programming Languages': {
    color: '#6366f1',
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  'Frontend / Backend': {
    color: '#22d3ee',
    items: ['React', 'Node.js', 'Express.js', 'Bootstrap', 'TypeScript', 'REST APIs'],
  },
  'AI / ML': {
    color: '#10b981',
    items: [
      'Neural Networks', 'CNNs', 'RNN / LSTM', 'Transformers',
      'NLP', 'Generative AI', 'LLMs', 'Prompt Engineering', 'AI Agent Frameworks',
    ],
  },
  'Data Science': {
    color: '#f59e0b',
    items: ['NumPy', 'Pandas', 'Matplotlib', 'Linear Algebra', 'Probability', 'Statistics', 'Calculus'],
  },
  'Vector Databases': {
    color: '#a78bfa',
    items: ['FAISS', 'ChromaDB', 'Pinecone'],
  },
  'Developer Tools': {
    color: '#818cf8',
    items: ['Git', 'GitHub', 'VS Code', 'Vite', 'Flask'],
  },
};

export const achievements = [
  {
    metric: '500+',
    label: 'DSA Problems Solved',
    description: 'Across LeetCode, Codeforces, CodeChef, and GeeksforGeeks',
    icon: '⚡',
    accentColor: '#6366f1',
  },
  {
    metric: '95.42',
    label: 'JEE Mains Percentile',
    description: 'National-level engineering entrance examination',
    icon: '🎯',
    accentColor: '#22d3ee',
  },
];

export const dsaPlatforms = [
  { name: 'LeetCode', color: '#f59e0b' },
  { name: 'Codeforces', color: '#818cf8' },
  { name: 'CodeChef', color: '#10b981' },
  { name: 'GeeksforGeeks', color: '#22d3ee' },
];

export const leadership = [
  {
    role: 'Sports Secretary',
    org: 'Sports Society, IIIT Kota',
    period: '2023 — Present',
    description:
      'Coordinating sports events and activities at IIIT Kota. Responsible for organizing competitions, managing participation, and building a collaborative sporting community.',
    icon: '🏆',
    tags: ['Coordination', 'Leadership', 'Community Building'],
  },
  {
    role: 'Team Leader',
    org: 'Smart India Hackathon, IIIT Kota',
    period: '2024',
    description:
      'Led a team in Smart India Hackathon — analyzing real-world problem statements, designing technical solutions, and coordinating team effort under competitive timelines.',
    icon: '💡',
    tags: ['Problem Analysis', 'Team Leadership', 'Solution Design', 'Hackathon'],
  },
];

export const engineeringFocus = [
  {
    title: 'Full-Stack Engineering',
    description: 'Designing and shipping complete web products end-to-end — from database schema and API design to component architecture and user experience.',
    icon: '⚡',
    color: '#6366f1',
  },
  {
    title: 'AI / ML Systems',
    description: 'Exploring intelligent systems through neural networks, NLP, and generative AI. Integrating ML backends into practical applications.',
    icon: '🧠',
    color: '#22d3ee',
  },
  {
    title: 'System Architecture',
    description: 'Thinking in systems — clean API boundaries, scalable data models, offline-first design, and synchronization patterns.',
    icon: '🏗️',
    color: '#10b981',
  },
  {
    title: 'Problem Solving',
    description: 'Approaching problems structurally through DSA practice across multiple competitive programming platforms.',
    icon: '🎯',
    color: '#f59e0b',
  },
];

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];
