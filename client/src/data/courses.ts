export interface CourseContent {
  id: string;
  title: string;
  type: "pdf" | "ppt" | "doc" | "video" | "link" | "text";
  url: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  students: number;
  topics: string[];
  contents: CourseContent[];
  enrolled?: boolean;
}

export const courses: Course[] = [
  {
    id: "gd-preparation",
    title: "Mastering Group Discussions for Placements",
    description:
      "Learn strategies, best practices, and tips to excel in Group Discussions (GD) during placement interviews. Covers communication skills, critical thinking, and confidence-building techniques.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
    category: "Placement Preparation",
    rating: 4.7,
    students: 5240,
    topics: [
      "Importance of GD in placements",
      "Effective communication skills",
      "Structuring your arguments",
      "Handling conflicts & rebuttals",
      "Common GD topics and strategies",
      "Mock GD practice sessions",
    ],
    contents: [
      {
        id: "gd-intro",
        title: "Introduction to Group Discussion",
        type: "video",
        url: "https://drive.google.com/file/d/1example_gd_video/view",
        description: "Overview of GD importance and format",
      },
      {
        id: "gd-tips",
        title: "GD Do’s and Don’ts",
        type: "pdf",
        url: "https://drive.google.com/file/d/1example_gd_pdf/view",
        description: "Key strategies for performing well in GDs",
      },
    ],
  },
  {
    id: "programming-essentials",
    title: "Programming Essentials for Placements",
    description:
      "A comprehensive guide to mastering coding for placements, covering problem-solving, data structures, and algorithms with hands-on practice.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    category: "Programming",
    rating: 4.8,
    students: 13250,
    topics: [
      "Data Structures & Algorithms",
      "Time Complexity Analysis",
      "Recursion & Backtracking",
      "Sorting & Searching Techniques",
      "Dynamic Programming",
      "System Design Basics",
      "Competitive Programming Strategies",
    ],
    contents: [
      {
        id: "dsa-intro",
        title: "Introduction to Data Structures & Algorithms",
        type: "ppt",
        url: "https://drive.google.com/file/d/1example_dsa_ppt/view",
        description: "Overview of DSA topics for placement coding rounds",
      },
      {
        id: "sorting-searching",
        title: "Sorting and Searching Techniques",
        type: "video",
        url: "https://drive.google.com/file/d/1example_sorting_video/view",
        description: "Learn essential sorting and searching algorithms",
      },
    ],
  },
  {
    id: "aptitude-prep",
    title: "Aptitude Preparation for Placements",
    description:
      "Sharpen your quantitative, logical, and verbal aptitude skills to crack placement exams. Covers numerical ability, logical reasoning, and verbal ability with practice tests.",
    image:
      "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
    category: "Aptitude",
    rating: 4.6,
    students: 8500,
    topics: [
      "Quantitative Aptitude",
      "Logical Reasoning",
      "Verbal Ability",
      "Data Interpretation",
      "Probability & Permutations",
      "Time & Work Problems",
      "Mock Tests & Practice Questions",
    ],
    contents: [
      {
        id: "quantitative-aptitude",
        title: "Quantitative Aptitude Basics",
        type: "pdf",
        url: "https://drive.google.com/file/d/1example_quant_pdf/view",
        description: "Fundamental topics in quantitative aptitude",
      },
      {
        id: "reasoning-tricks",
        title: "Logical Reasoning Tricks",
        type: "video",
        url: "https://drive.google.com/file/d/1example_logic_video/view",
        description:
          "Tips and strategies for solving logical reasoning questions",
      },
    ],
  },
  {
    id: "web-development-2025",
    title: "Complete Web Development Bootcamp 2025",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js and more with this comprehensive web development course. Perfect for beginners and intermediate developers looking to expand their skills and build modern, responsive websites and web applications.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    category: "Web Development",
    rating: 4.8,
    students: 15420,
    topics: [
      "HTML5 & CSS3 fundamentals",
      "JavaScript ES6+ and DOM manipulation",
      "React.js with hooks and context API",
      "Node.js and Express backend development",
      "MongoDB database integration",
      "Authentication and authorization",
      "Responsive design principles",
      "API development and consumption",
    ],
    contents: [
      {
        id: "web-dev-intro",
        title: "Introduction to Web Development",
        type: "pdf",
        url: "https://drive.google.com/file/d/1example_pdf_link/view",
        description:
          "An overview of web development fundamentals and course structure",
      },
      {
        id: "html-basics",
        title: "HTML5 Basics",
        type: "video",
        url: "https://drive.google.com/file/d/1example_video_link/view",
        description: "Learn the fundamentals of HTML5 markup language",
      },
      {
        id: "css-styling",
        title: "CSS Styling Guide",
        type: "pdf",
        url: "https://drive.google.com/file/d/1example_css_pdf/view",
        description: "Comprehensive guide to CSS styling techniques",
      },
    ],
  },
  {
    id: "data-science-fundamentals",
    title: "Data Science Fundamentals: Python & Machine Learning",
    description:
      "Learn the core concepts of data science, statistics, and machine learning using Python. This course covers everything from data cleaning and visualization to building predictive models and neural networks.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Data Science",
    rating: 4.7,
    students: 8932,
    topics: [
      "Python programming for data analysis",
      "Data cleaning and preprocessing",
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Natural language processing",
      "Time series analysis",
      "Data science project workflow",
    ],
    contents: [
      {
        id: "python-basics",
        title: "Python Programming Basics",
        type: "pdf",
        url: "https://drive.google.com/file/d/1example_python_pdf/view",
        description: "Introduction to Python programming language",
      },
      {
        id: "data-analysis",
        title: "Data Analysis with Pandas",
        type: "ppt",
        url: "https://drive.google.com/file/d/1example_pandas_ppt/view",
        description: "Learn how to analyze data using the Pandas library",
      },
    ],
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile applications for iOS and Android using React Native. Learn to create beautiful, responsive UIs and integrate with device features and APIs to create professional-grade mobile apps.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Mobile Development",
    rating: 4.6,
    students: 6254,
    topics: [
      "React Native fundamentals",
      "Cross-platform development principles",
      "Native device features integration",
      "State management with Redux",
      "Navigation and routing",
      "UI/UX design for mobile",
      "App deployment to app stores",
      "Performance optimization",
    ],
    contents: [],
  },
  {
    id: "ui-ux-design-masterclass",
    title: "UI/UX Design Masterclass",
    description:
      "Master the art and science of user interface and user experience design. Learn design thinking, wireframing, prototyping, and user testing to create intuitive and beautiful digital products that users love.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    category: "Design",
    rating: 4.9,
    students: 7845,
    topics: [
      "Design thinking methodology",
      "User research and personas",
      "Wireframing and prototyping",
      "Visual design principles",
      "Interaction design",
      "Usability testing",
      "Design systems",
      "Figma and design tools mastery",
    ],
    contents: [
      {
        id: "design-thinking",
        title: "Introduction to Design Thinking",
        type: "pdf",
        url: "https://drive.google.com/file/d/1example_design_pdf/view",
        description: "Learn the fundamentals of design thinking methodology",
      },
    ],
  },
];
