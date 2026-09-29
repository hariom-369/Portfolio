import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({ margin: 50, size: 'A4' });
doc.pipe(fs.createWriteStream('public/Hariom_Choudhary_Resume.pdf'));

// Colors
const colors = {
  primary: '#0f172a',
  secondary: '#475569',
  accent: '#2563eb',
  light: '#94a3b8',
  border: '#e2e8f0'
};

// Fonts
const fontRegular = 'Helvetica';
const fontBold = 'Helvetica-Bold';

// Helper for drawing lines
const drawLine = () => {
  doc.moveDown(0.5);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
  doc.moveDown(0.5);
};

// --- Header ---
doc.fontSize(28).fillColor(colors.primary).font(fontBold).text('Hariom Choudhary');
doc.moveDown(0.2);
doc.fontSize(12).fillColor(colors.accent).font(fontBold).text('Full-Stack Developer • AI/ML Enthusiast • B.Tech ECE (IIIT Kota)');
doc.moveDown(0.2);
doc.fontSize(10).fillColor(colors.secondary).font(fontRegular).text('hariomchoudhary6106@gmail.com  |  +91-7849920674  |  IIIT Kota, Rajasthan, India');
doc.moveDown(0.2);
doc.fillColor(colors.secondary).text('GitHub: github.com/Hariom-Choudhary  |  LinkedIn: linkedin.com/in/hariom-choudhary');

drawLine();

// --- Education ---
doc.fontSize(14).fillColor(colors.primary).font(fontBold).text('EDUCATION');
doc.moveDown(0.3);

doc.fontSize(11).fillColor(colors.primary).font(fontBold).text('Indian Institute of Information Technology, Kota', { continued: true });
doc.fillColor(colors.secondary).font(fontRegular).text('    2023 - 2027', { align: 'right' });
doc.fontSize(10).fillColor(colors.secondary).text('B.Tech in Electronics & Communication Engineering (ECE)');
doc.moveDown(0.2);
doc.fontSize(10).fillColor(colors.secondary).text('• JEE Mains Percentile: 95.42');

drawLine();

// --- Skills ---
doc.fontSize(14).fillColor(colors.primary).font(fontBold).text('TECHNICAL SKILLS', { align: 'left' });
doc.moveDown(0.3);

const addSkill = (category, skills) => {
  doc.fontSize(10).fillColor(colors.primary).font(fontBold).text(`${category}: `, { continued: true });
  doc.fillColor(colors.secondary).font(fontRegular).text(skills);
};

addSkill('Programming', 'C, C++, Java, Python, JavaScript, TypeScript, HTML, CSS, SQL');
doc.moveDown(0.2);
addSkill('Web Technologies', 'React, Node.js, Express.js, Bootstrap, REST APIs, Tailwind CSS');
doc.moveDown(0.2);
addSkill('AI & Data Science', 'Neural Networks, NLP, Generative AI, LLMs, Pandas, NumPy, Vector Databases');
doc.moveDown(0.2);
addSkill('Tools', 'Git, GitHub, VS Code, Vite, Flask, MongoDB, Postman');

drawLine();

// --- Projects ---
doc.fontSize(14).fillColor(colors.primary).font(fontBold).text('PROJECTS');
doc.moveDown(0.3);

const addProject = (title, tech, desc1, desc2) => {
  doc.fontSize(11).fillColor(colors.primary).font(fontBold).text(title, { continued: true });
  doc.fillColor(colors.accent).font(fontBold).text(`    |    ${tech}`, { align: 'right' });
  doc.moveDown(0.2);
  doc.fontSize(10).fillColor(colors.secondary).font(fontRegular).text(`• ${desc1}`);
  if (desc2) {
    doc.moveDown(0.1);
    doc.text(`• ${desc2}`);
  }
  doc.moveDown(0.5);
};

addProject(
  'LUX-CashBook (Premium Personal Finance)',
  'React, Node.js, MongoDB, Zustand',
  'Architected a comprehensive personal finance system featuring multi-wallet management and cash books.',
  'Implemented offline-first architecture with automatic background sync and PDF statement generation.'
);

addProject(
  'AI Career Mentor',
  'React, Python, Flask, NLP, TF-IDF',
  'Developed an AI platform that parses resumes using NLP to identify skill gaps against 60+ job roles.',
  'Integrated a Python/Flask ML backend with a Node.js REST API to deliver personalized learning paths.'
);

addProject(
  'Full-Stack E-Commerce Platform',
  'MERN Stack, JWT',
  'Built a scalable commerce platform with secure JWT authentication and role-based access control.',
  'Engineered atomic cart operations and RESTful APIs to prevent race conditions during order placement.'
);

drawLine();

// --- Achievements & Leadership ---
doc.fontSize(14).fillColor(colors.primary).font(fontBold).text('ACHIEVEMENTS & LEADERSHIP');
doc.moveDown(0.3);

doc.fontSize(10).fillColor(colors.secondary).font(fontRegular);
doc.text('• Solved 500+ Data Structures & Algorithms (DSA) problems across LeetCode, Codeforces, and CodeChef.');
doc.moveDown(0.2);
doc.text('• Sports Secretary (IIIT Kota): Coordinating campus sports events and building a collaborative community.');
doc.moveDown(0.2);
doc.text('• Team Leader (Smart India Hackathon): Led a team to analyze problem statements and design solutions under strict competitive timelines.');

doc.end();
