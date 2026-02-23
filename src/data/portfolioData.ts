import React from 'react';
import { Code2, Briefcase, Layers, Heart, Terminal, Globe, Cpu, GraduationCap, Award, BookOpen, Users } from 'lucide-react';

// Projects Data
export const projectsData = [
  {
    title: "PetEmote",
    year: "2024",
    description: "AI-Based Pet Emotion Recognition Mobile App using React Native and TensorFlow Lite for real-time analysis.",
    tags: ['React Native', 'TensorFlow Lite', 'Firebase', 'GraphQL'],
    icon: Code2,
    github: "https://github.com/Shanewaz-Aurnob/PetEmote-React-Native-ML-App",
    details: `• Built a cross-platform mobile app using React Native and TensorFlow Lite to detect pet emotions in real time.
• Integrated Firebase for real-time data handling and authentication.
• Used GraphQL for efficient data fetching and state management.
• Implemented on-device ML models for low-latency inference.`
  },
  {
    title: "CU ERP System",
    year: "2023",
    description: "Large-scale enterprise resource management API with role-based access control and MySQL integration.",
    tags: ['Node.js', 'Express.js', 'MySQL', 'TypeScript'],
    icon: Briefcase,
    github: "https://github.com/Shanewaz-Aurnob/ERP-API-Web-Engineering",
    details: `• Developed a robust backend API for enterprise resource management.
• Implemented role-based access control (RBAC) for secure data access.
• Integrated MySQL database with optimized queries for large-scale data.
• Used TypeScript for type safety and better maintainability.`
  },
  {
    title: "Smart Attendance System",
    year: "2023",
    description: "QR-based classroom automation system with PDF reporting and role-based access for teachers/students.",
    tags: ['React', 'Tailwind CSS', 'Express.js', 'MySQL'],
    icon: Layers,
    github: "https://github.com/Shanewaz-Aurnob/Web-Engg",
    details: `• Implemented a QR-based attendance system for automated classroom tracking.
• Developed role-based access control for teachers and students.
• Generated PDF reports for attendance sessions using server-side logic.
• Built with React and Tailwind CSS for a modern, responsive frontend.`
  },
  {
    title: "Tiles & Inventory Management",
    year: "2023",
    description: "Web solution for inventory tracking, supplier management, and order monitoring with real-time updates.",
    tags: ['React.js', 'Node.js', 'Firebase'],
    icon: Globe,
    github: "https://github.com/Shanewaz-Aurnob/Software-Engg",
    details: `• Created a web-based solution for managing inventory, suppliers, and orders.
• Integrated Firebase for real-time database updates and synchronization.
• Developed a user-friendly dashboard for monitoring stock levels and order status.
• Built with React.js and Node.js for a scalable architecture.`
  },
  {
    title: "Heart Disease Expert System",
    year: "2024",
    description: "Prolog rule-based inference system for diagnosing heart diseases using structured reasoning.",
    tags: ['Prolog', 'AI', 'Expert Systems'],
    icon: Heart,
    github: "https://github.com/Shanewaz-Aurnob/Artificial-Intelligence-Lab",
    details: `• Built a rule-based expert system for diagnosing heart diseases.
• Used Prolog for implementing backward chaining and logical inference.
• Designed a structured symptom-based diagnostic flow.
• Implemented IF-THEN reasoning for accurate disease identification.`
  },
  {
    title: "Intelligent Home Automation",
    year: "2024",
    description: "IoT system using ESP32 and ANN for predictive appliance control and energy-efficient automation.",
    tags: ['ESP32', 'Blynk', 'ANN', 'C++'],
    icon: Cpu,
    details: `• Developed an IoT-based smart home system with predictive control.
• Used ESP32 microcontrollers and Blynk platform for remote monitoring.
• Implemented on-device Artificial Neural Networks (ANN) for appliance control.
• Focused on context-aware energy-efficient automation.`
  },
  {
    title: "Arduino Fire Alarm",
    year: "2022",
    description: "Real-time fire detection and alert system using Arduino UNO, flame sensors, and microcontroller programming.",
    tags: ['Arduino', 'C++', 'Sensors', 'IoT'],
    icon: Terminal,
    details: `• Built a real-time fire detection and alert system.
• Used Arduino UNO and flame sensors for reliable detection.
• Programmed microcontrollers for automated safety alerts.
• Implemented a buzzer-based alarm system for immediate warning.`
  }
];

// Expertise Data
export const expertiseData = [
  { title: "Programming", icon: Terminal, items: ["C", "C++", "Python", "Java", "JavaScript"] },
  { title: "Web Development", icon: Globe, items: ["HTML", "CSS", "React.js", "Node.js", "Express.js", "REST API", "GraphQL"] },
  { title: "Machine Learning", icon: Cpu, items: ["Scikit-learn", "TensorFlow", "Transformers", "NLTK", "Hugging Face"] },
  { title: "Databases", icon: Briefcase, items: ["MySQL", "Firebase", "MongoDB"] },
  { title: "Tools & Tech", icon: Layers, items: ["Git", "GitHub", "GitLab", "VS Code", "Jupyter", "Android Studio"] },
  { title: "Professional", icon: GraduationCap, items: ["Project Management", "Leadership", "Teamwork", "Public Relation"] }
];

// Education Data
export const educationData = [
  { 
    degree: "B.Sc. in Engineering (CSE)", 
    institution: "University of Chittagong", 
    year: "2023", 
    result: "CGPA: 3.27",
    details: "Specialized in Machine Learning and Software Engineering."
  },
  { 
    degree: "Higher Secondary Certificate (HSC)", 
    institution: "Govt. K.M.H College, Kotchandpur", 
    year: "2019", 
    result: "GPA: 4.58" 
  },
  { 
    degree: "Secondary School Certificate (SSC)", 
    institution: "Kotchandpur Govt. Model Pilot Secondary School", 
    year: "2017", 
    result: "GPA: 4.73" 
  }
];

// Experience Data
export const experienceData = [
  { title: "Entrepreneurs Expo 2.0", role: "Organizer", year: "2026", desc: "Organized under Chittagong University Entrepreneur & Startup Society.", image: "/images/experience/expo.jpg" },
  { title: "CU 5th Convocation", role: "Organizer", year: "2025", desc: "Managed logistics and coordinated the convocation event.", image: "/images/experience/convocation.jpg" },
  { title: "CUSS IT Fiesta", role: "Organizer", year: "2024", desc: "Led IT and technical activities under CU Scientific Society.", image: "/images/experience/it-fiesta.jpg" },
  { title: "Futurenation Skills Hub", role: "Volunteer", year: "2024", desc: "Assisted UNDP Bangladesh in skill development programs.", image: "/images/experience/futurenation.jpg" },
  { title: "Tarunner Alo", role: "Co-Founder", year: "2021-23", desc: "Established a non-political community helping organization.", image: "/images/experience/tarunner-alo.jpg" },
  { title: "Kotchandpur Blood Bank", role: "Joint Secretary", year: "2020-22", desc: "Coordinated blood donation drives and provided support for underprivileged people.", image: "/images/experience/blood-bank.jpg" }
];

// Certificates Data
export const certificatesData = [
  { title: "2nd Runner-Up", icon: Award, desc: "Intra Department Database Project Showcasing, CSE CU (2023)", image: "/images/certificates/runner-up.jpg" },
  { title: "Full Stack Training", icon: BookOpen, desc: "EDGE Project, Bangladesh Computer Council (2025)", image: "/images/certificates/fullstack.jpg" },
  { title: "Entrepreneurship", icon: GraduationCap, desc: "Vision to Venture Workshop, CUESS (2025)", image: "/images/certificates/entrepreneurship.jpg" },
  { title: "Leadership Workshop", icon: Users, desc: "Leadership & Organizational Excellence, CUCC (2025)", image: "/images/certificates/leadership.jpg" }
];

// Media Data
export const mediaData = [
  {
    pub: "The Daily Campus",
    headline: "করোনায় ঘরবন্দী দিনগুলো যেমন কাটছে চবি শিক্ষার্থীদের",
    link: "https://thedailycampus.com/public-university/44764/%E0%A6%95%E0%A6%B0%E0%A7%8B%E0%A6%A8%E0%A6%BE%E0%A7%9F-%E0%A6%98%E0%A6%B0%E0%A6%AC%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%BF-%E0%A6%A6%E0%A6%BF%E0%A6%A8%E0%A6%97%E0%A7%81%E0%A6%B2%E0%A7%8B-%E0%A6%AF%E0%A7%87%E0%A6%AE%E0%A6%A8-%E0%A6%95%E0%A6%BE%E0%A6%9F%E0%A6%9B%E0%A7%87-%E0%A6%9A%E0%A6%AC%E0%A6%BF-%E0%A6%B6%E0%A6%BF%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%A5%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0",
    image: "https://thedailycampus.com/media/imgAll/2020April/big/Inkedcu-44764-5eaad08a3ebef--2020-04-30-_LI.jpg",
    logo: "/images/dailycampus-logo.png"
  },
  {
    pub: "Bahannomews",
    headline: "বন্যার্তদের পাশে চবি শিক্ষার্থীরা",
    link: "https://www.bahannonews.com/details/article/10089691/%E0%A6%AC%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%A4%E0%A6%A6%E0%A7%87%E0%A6%B0-%E0%A6%AA%E0%A6%BE%E0%A6%B6%E0%A7%87-%E0%A6%9A%E0%A6%AC%E0%A6%BF-%E0%A6%B6%E0%A6%BF%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%A5%E0%A7%80%E0%A6%B0%E0%A6%BE/",
    image: "https://www.bahannonews.com/cloud-uploads/default/uploads/a3e/a3e2b46227fc4eb7ce84dc66f7e0f446",
    logo: "/images/bahannonews-logo.png"
  },
  {
    pub: "The Daily Campus",
    headline: "করোনা আতঙ্কে ক্লাস পরীক্ষা বর্জনের ঘোষণা চবি শিক্ষার্থীদের",
    link: "https://thedailycampus.com/public-university/40903/%E0%A6%95%E0%A6%B0%E0%A7%8B%E0%A6%A8%E0%A6%BE-%E0%A6%86%E0%A6%A4%E0%A6%99%E0%A7%8D%E0%A6%95%E0%A7%87-%E0%A6%95%E0%A7%8D%E0%A6%B2%E0%A6%BE%E0%A6%B8-%E0%A6%AA%E0%A6%B0%E0%A7%80%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A6%BE-%E0%A6%AC%E0%A6%B0%E0%A7%8D%E0%A6%9C%E0%A6%A8%E0%A7%87%E0%A6%B0-%E0%A6%98%E0%A7%8B%E0%A6%B7%E0%A6%A3%E0%A6%BE-%E0%A6%9A%E0%A6%AC%E0%A6%BF-%E0%A6%B6%E0%A6%BF%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%A5%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0",
    image: "https://thedailycampus.com/media/imgAll/2020March/big/cu-40903-5e6e374fafafa--2020-03-15-.jpg",
    logo: "/images/dailycampus-logo.png"
  }
];

// Gallery Data
export const galleryData = [
  {
    id: 1,
    title: "Community Education Drive",
    category: "Education",
    description: "Organizing free educational programs for underprivileged children",
    date: "March 2025",
    location: "Chittagong",
    image: "/images/gallery-1.jpg",
    fullDesc: "Supporting the future through quality education for all. We provide free learning resources and mentorship to students from low-income families."
  },
  {
    id: 2,
    title: "Health Awareness Camp",
    category: "Health",
    description: "Free medical checkups and health awareness sessions for rural communities",
    date: "February 2025",
    location: "Jhenaidah",
    image: "/images/gallery-2.jpg",
    fullDesc: "Bringing healthcare closer to underserved communities. Free medical screening and health education sessions."
  },
  {
    id: 3,
    title: "Disaster Relief Fund",
    category: "Charity",
    description: "Emergency relief supplies and financial aid for flood-affected families",
    date: "January 2025",
    location: "Multiple Districts",
    image: "/images/gallery-3.jpg",
    fullDesc: "Responding quickly to help communities in crisis. Providing essential supplies and support."
  },
  {
    id: 4,
    title: "Youth Skill Development",
    category: "Community",
    description: "Vocational training programs for unemployed youth in the district",
    date: "December 2024",
    location: "Kotchandpur",
    image: "/images/gallery-4.jpg",
    fullDesc: "Empowering youth with practical skills for better employment prospects."
  },
  {
    id: 5,
    title: "School Renovation Project",
    category: "Education",
    description: "Renovating schools and providing modern learning infrastructure",
    date: "November 2024",
    location: "Rural Schools",
    image: "/images/gallery-1.jpg",
    fullDesc: "Building better learning environments. Infrastructure development for quality education."
  },
  {
    id: 6,
    title: "Nutrition & Wellness",
    category: "Health",
    description: "Meal distribution and nutritional support programs for children",
    date: "October 2024",
    location: "Urban Communities",
    image: "/images/gallery-5.jpg",
    fullDesc: "Ensuring no child goes hungry. Providing nutritious meals and wellness education."
  }
];

// Tech Stack Data
export const techStackData = ["React.js", "Node.js", "TensorFlow", "Python", "Machine Learning", "Full-Stack", "NLP", "Express.js", "MySQL", "Firebase"];

// Research Publications Data
export const researchData = [
  {
    title: "Crisis Response through Social Cues Analysis",
    authors: ["Shanewaz Aurnob, Dr. Abu Nowshed Chy"],
    journal: "Undergraduate Thesis, University of Chittagong",
    year: "2025",
    type: "Thesis",
    abstract: "Developed a Bengali social cue classification system using machine learning and transformer-based models for multiclass crisis-related text analysis.",
    doi: "",
    citations: 0,
    tags: ["NLP", "Machine Learning", "Transformers", "Bengali Text Classification", "Crisis Analysis"]
  },
  {
    title: "Exploring media consumption and mental health among young adults during the second wave of COVID-19 in Bangladesh",
    authors: ["Md. Najmus Sayadat Pitol", "Muhammad Mainuddin Patwary", "Shanewaz Aurnob", "et al."],
    journal: "Heliyon, Vol. 9, Issue 10",
    year: "2023",
    type: "Journal Article",
    abstract: "A comprehensive study examining the relationship between media consumption patterns and mental health outcomes among young adults during the COVID-19 pandemic in Bangladesh.",
    doi: "https://doi.org/10.1016/j.heliyon.2023.e20371",
    citations: 4,
    tags: ["Mental Health", "COVID-19", "Media Studies", "Public Health", "Bangladesh"]
  }
];

// Social Links Data
export const socialLinks = [
  { icon: 'Github', href: "https://github.com/Shanewaz-Aurnob", label: "GitHub" },
  { icon: 'Linkedin', href: "https://linkedin.com/in/shanewaz-aurnob", label: "LinkedIn" },
  { icon: 'Facebook', href: "https://www.facebook.com/s.aurnob", label: "Facebook" },
  { icon: 'X', href: "https://x.com/ShanewazAurnob", label: "X (Twitter)" }
];

// Contact Data
export const contactData = {
  email: "aurnob.csecu@gmail.com",
  phone: "+8801685530730",
  name: "Shanewaz Aurnob",
  location: "Kotchandpur, Jhenaidah",
  resumeUrl: "/resume/Shanewaz-Aurnob-Resume.pdf" // Updated path
};
