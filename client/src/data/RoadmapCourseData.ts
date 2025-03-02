import { Code, Server, Database, Globe, Cpu, PenTool, LineChart, Layers, Smartphone } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  popularity: number;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

export interface RoadmapNode {
  id: string;
  type: string;
  data: {
    label: string;
    description?: string;
    resources?: Resource[];
  };
  position: { x: number; y: number };
  style?: {
    background?: string;
    border?: string;
    color?: string;
  };
}

export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  style?: {
    stroke?: string;
  };
}

export interface Resource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book';
}

export const courses: Course[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Learn to build modern, responsive web interfaces with HTML, CSS, JavaScript and popular frameworks.',
    icon: 'Code',
    color: 'bg-blue-500',
    popularity: 95,
    nodes: [
      {
        id: '1',
        type: 'input',
        data: {
          label: 'Internet Basics',
          description: 'Learn how the internet works, DNS, hosting, and HTTP basics.',
          resources: [
            { title: 'How Does the Internet Work?', url: 'https://www.youtube.com/watch?v=x3c1ih2NJEg', type: 'video' },
            { title: 'What is HTTP?', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', type: 'article' }
          ]
        },
        position: { x: 250, y: 0 },
        style: { background: '#e3f2fd', border: '1px solid #90caf9', color: '#0d47a1' }
      },
      {
        id: '2',
        type: 'default',
        data: {
          label: 'HTML Fundamentals',
          description: 'Learn HTML tags, attributes, semantic HTML, forms, and validation.',
          resources: [
            { title: 'HTML Crash Course', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', type: 'video' },
            { title: 'MDN HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', type: 'article' }
          ]
        },
        position: { x: 250, y: 100 },
        style: { background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#1b5e20' }
      },
      {
        id: '3',
        type: 'default',
        data: {
          label: 'CSS Fundamentals',
          description: 'Learn CSS selectors, box model, layouts, responsive design, and animations.',
          resources: [
            { title: 'CSS Crash Course', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI', type: 'video' },
            { title: 'CSS Tricks', url: 'https://css-tricks.com/', type: 'article' }
          ]
        },
        position: { x: 250, y: 200 },
        style: { background: '#fff3e0', border: '1px solid #ffcc80', color: '#e65100' }
      },
      {
        id: '4',
        type: 'default',
        data: {
          label: 'JavaScript Basics',
          description: 'Learn JavaScript syntax, data types, functions, DOM manipulation, and events.',
          resources: [
            { title: 'JavaScript Crash Course', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c', type: 'video' },
            { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'article' }
          ]
        },
        position: { x: 250, y: 300 },
        style: { background: '#fff8e1', border: '1px solid #ffe082', color: '#ff6f00' }
      },
      {
        id: '5',
        type: 'default',
        data: {
          label: 'Frontend Framework',
          description: 'Learn a modern JavaScript framework like React, Vue, or Angular.',
          resources: [
            { title: 'React Tutorial', url: 'https://reactjs.org/tutorial/tutorial.html', type: 'article' },
            { title: 'Vue.js Guide', url: 'https://vuejs.org/guide/introduction.html', type: 'article' }
          ]
        },
        position: { x: 250, y: 400 },
        style: { background: '#f3e5f5', border: '1px solid #ce93d8', color: '#4a148c' }
      },
      {
        id: '6',
        type: 'default',
        data: {
          label: 'State Management',
          description: 'Learn state management libraries like Redux, Vuex, or Context API.',
          resources: [
            { title: 'Redux Essentials', url: 'https://redux.js.org/tutorials/essentials/part-1-overview-concepts', type: 'article' },
            { title: 'Context API Guide', url: 'https://reactjs.org/docs/context.html', type: 'article' }
          ]
        },
        position: { x: 100, y: 500 },
        style: { background: '#e1f5fe', border: '1px solid #81d4fa', color: '#01579b' }
      },
      {
        id: '7',
        type: 'default',
        data: {
          label: 'API Integration',
          description: 'Learn to work with REST APIs, GraphQL, and data fetching libraries.',
          resources: [
            { title: 'REST API Tutorial', url: 'https://restfulapi.net/', type: 'article' },
            { title: 'GraphQL Introduction', url: 'https://graphql.org/learn/', type: 'article' }
          ]
        },
        position: { x: 400, y: 500 },
        style: { background: '#e8eaf6', border: '1px solid #9fa8da', color: '#1a237e' }
      },
      {
        id: '8',
        type: 'output',
        data: {
          label: 'Advanced Frontend',
          description: 'Learn advanced topics like performance optimization, testing, and deployment.',
          resources: [
            { title: 'Web Performance', url: 'https://web.dev/learn/performance/', type: 'article' },
            { title: 'Testing JavaScript', url: 'https://testingjavascript.com/', type: 'course' }
          ]
        },
        position: { x: 250, y: 600 },
        style: { background: '#fce4ec', border: '1px solid #f48fb1', color: '#880e4f' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#90caf9' } },
      { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#a5d6a7' } },
      { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#ffcc80' } },
      { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#ffe082' } },
      { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#ce93d8' } },
      { id: 'e5-7', source: '5', target: '7', animated: true, style: { stroke: '#ce93d8' } },
      { id: 'e6-8', source: '6', target: '8', animated: true, style: { stroke: '#81d4fa' } },
      { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#9fa8da' } }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Learn server-side programming, APIs, databases, and server management.',
    icon: 'Server',
    color: 'bg-green-500',
    popularity: 90,
    nodes: [
      {
        id: '1',
        type: 'input',
        data: {
          label: 'Internet & Servers',
          description: 'Learn how the internet works, DNS, hosting, and HTTP basics.',
          resources: [
            { title: 'How Does the Internet Work?', url: 'https://www.youtube.com/watch?v=x3c1ih2NJEg', type: 'video' },
            { title: 'What is a Web Server?', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server', type: 'article' }
          ]
        },
        position: { x: 250, y: 0 },
        style: { background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#1b5e20' }
      },
      {
        id: '2',
        type: 'default',
        data: {
          label: 'Programming Language',
          description: 'Learn a backend language like Node.js, Python, Java, or C#.',
          resources: [
            { title: 'Node.js Crash Course', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', type: 'video' },
            { title: 'Python for Beginners', url: 'https://www.python.org/about/gettingstarted/', type: 'article' }
          ]
        },
        position: { x: 250, y: 100 },
        style: { background: '#e3f2fd', border: '1px solid #90caf9', color: '#0d47a1' }
      },
      {
        id: '3',
        type: 'default',
        data: {
          label: 'Databases',
          description: 'Learn SQL and NoSQL databases like MySQL, PostgreSQL, MongoDB.',
          resources: [
            { title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/', type: 'article' },
            { title: 'MongoDB Basics', url: 'https://university.mongodb.com/courses/M001/about', type: 'course' }
          ]
        },
        position: { x: 250, y: 200 },
        style: { background: '#fff3e0', border: '1px solid #ffcc80', color: '#e65100' }
      },
      {
        id: '4',
        type: 'default',
        data: {
          label: 'APIs',
          description: 'Learn to build RESTful APIs and GraphQL services.',
          resources: [
            { title: 'RESTful API Design', url: 'https://restfulapi.net/', type: 'article' },
            { title: 'GraphQL Tutorial', url: 'https://www.howtographql.com/', type: 'course' }
          ]
        },
        position: { x: 250, y: 300 },
        style: { background: '#fff8e1', border: '1px solid #ffe082', color: '#ff6f00' }
      },
      {
        id: '5',
        type: 'default',
        data: {
          label: 'Authentication',
          description: 'Learn authentication and authorization methods like JWT, OAuth.',
          resources: [
            { title: 'JWT Introduction', url: 'https://jwt.io/introduction', type: 'article' },
            { title: 'OAuth 2.0 Simplified', url: 'https://aaronparecki.com/oauth-2-simplified/', type: 'article' }
          ]
        },
        position: { x: 100, y: 400 },
        style: { background: '#f3e5f5', border: '1px solid #ce93d8', color: '#4a148c' }
      },
      {
        id: '6',
        type: 'default',
        data: {
          label: 'Testing',
          description: 'Learn unit testing, integration testing, and test-driven development.',
          resources: [
            { title: 'Jest Testing', url: 'https://jestjs.io/docs/getting-started', type: 'article' },
            { title: 'Test-Driven Development', url: 'https://www.agilealliance.org/glossary/tdd/', type: 'article' }
          ]
        },
        position: { x: 400, y: 400 },
        style: { background: '#e1f5fe', border: '1px solid #81d4fa', color: '#01579b' }
      },
      {
        id: '7',
        type: 'default',
        data: {
          label: 'Deployment',
          description: 'Learn CI/CD, Docker, and cloud services like AWS, Azure, or GCP.',
          resources: [
            { title: 'Docker Tutorial', url: 'https://docs.docker.com/get-started/', type: 'article' },
            { title: 'AWS Basics', url: 'https://aws.amazon.com/getting-started/', type: 'article' }
          ]
        },
        position: { x: 250, y: 500 },
        style: { background: '#e8eaf6', border: '1px solid #9fa8da', color: '#1a237e' }
      },
      {
        id: '8',
        type: 'output',
        data: {
          label: 'Advanced Backend',
          description: 'Learn microservices, serverless, and advanced architecture patterns.',
          resources: [
            { title: 'Microservices Guide', url: 'https://martinfowler.com/microservices/', type: 'article' },
            { title: 'Serverless Handbook', url: 'https://serverlesshandbook.dev/', type: 'book' }
          ]
        },
        position: { x: 250, y: 600 },
        style: { background: '#fce4ec', border: '1px solid #f48fb1', color: '#880e4f' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#a5d6a7' } },
      { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#90caf9' } },
      { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#ffcc80' } },
      { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#ffe082' } },
      { id: 'e4-6', source: '4', target: '6', animated: true, style: { stroke: '#ffe082' } },
      { id: 'e5-7', source: '5', target: '7', animated: true, style: { stroke: '#ce93d8' } },
      { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#81d4fa' } },
      { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#9fa8da' } }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Master both frontend and backend technologies to build complete web applications.',
    icon: 'Layers',
    color: 'bg-purple-500',
    popularity: 85,
    nodes: [
      {
        id: '1',
        type: 'input',
        data: {
          label: 'Web Fundamentals',
          description: 'Learn HTML, CSS, JavaScript, and how the web works.',
          resources: [
            { title: 'Web Development Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn', type: 'article' },
            { title: 'Full Stack Roadmap', url: 'https://roadmap.sh/full-stack', type: 'article' }
          ]
        },
        position: { x: 250, y: 0 },
        style: { background: '#f3e5f5', border: '1px solid #ce93d8', color: '#4a148c' }
      },
      {
        id: '2',
        type: 'default',
        data: {
          label: 'Frontend Basics',
          description: 'Learn modern HTML, CSS, responsive design, and JavaScript.',
          resources: [
            { title: 'Frontend Masters', url: 'https://frontendmasters.com/learn/', type: 'course' },
            { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'article' }
          ]
        },
        position: { x: 100, y: 100 },
        style: { background: '#e3f2fd', border: '1px solid #90caf9', color: '#0d47a1' }
      },
      {
        id: '3',
        type: 'default',
        data: {
          label: 'Backend Basics',
          description: 'Learn a backend language, databases, and server concepts.',
          resources: [
            { title: 'Node.js for Beginners', url: 'https://nodejs.dev/learn', type: 'article' },
            { title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/', type: 'article' }
          ]
        },
        position: { x: 400, y: 100 },
        style: { background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#1b5e20' }
      },
      {
        id: '4',
        type: 'default',
        data: {
          label: 'Frontend Framework',
          description: 'Learn React, Vue, or Angular and state management.',
          resources: [
            { title: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html', type: 'article' },
            { title: 'Vue.js Guide', url: 'https://vuejs.org/guide/introduction.html', type: 'article' }
          ]
        },
        position: { x: 100, y: 200 },
        style: { background: '#fff3e0', border: '1px solid #ffcc80', color: '#e65100' }
      },
      {
        id: '5',
        type: 'default',
        data: {
          label: 'Backend Framework',
          description: 'Learn Express, Django, Spring Boot, or Laravel.',
          resources: [
            { title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html', type: 'article' },
            { title: 'Django Tutorial', url: 'https://docs.djangoproject.com/en/stable/intro/tutorial01/', type: 'article' }
          ]
        },
        position: { x: 400, y: 200 },
        style: { background: '#fff8e1', border: '1px solid #ffe082', color: '#ff6f00' }
      },
      {
        id: '6',
        type: 'default',
        data: {
          label: 'API Development',
          description: 'Learn to build and consume RESTful APIs and GraphQL.',
          resources: [
            { title: 'REST API Design', url: 'https://restfulapi.net/', type: 'article' },
            { title: 'GraphQL Tutorial', url: 'https://www.howtographql.com/', type: 'course' }
          ]
        },
        position: { x: 250, y: 300 },
        style: { background: '#e1f5fe', border: '1px solid #81d4fa', color: '#01579b' }
      },
      {
        id: '7',
        type: 'default',
        data: {
          label: 'Authentication & Security',
          description: 'Learn authentication, authorization, and web security.',
          resources: [
            { title: 'Web Security Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/Security', type: 'article' },
            { title: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/', type: 'article' }
          ]
        },
        position: { x: 250, y: 400 },
        style: { background: '#e8eaf6', border: '1px solid #9fa8da', color: '#1a237e' }
      },
      {
        id: '8',
        type: 'default',
        data: {
          label: 'Deployment & DevOps',
          description: 'Learn CI/CD, Docker, and cloud services.',
          resources: [
            { title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', type: 'article' },
            { title: 'Docker for Beginners', url: 'https://docker-curriculum.com/', type: 'article' }
          ]
        },
        position: { x: 250, y: 500 },
        style: { background: '#fce4ec', border: '1px solid #f48fb1', color: '#880e4f' }
      },
      {
        id: '9',
        type: 'output',
        data: {
          label: 'Full Stack Mastery',
          description: 'Build complete, production-ready applications.',
          resources: [
            { title: 'The Odin Project', url: 'https://www.theodinproject.com/', type: 'course' },
            { title: 'Full Stack Open', url: 'https://fullstackopen.com/en/', type: 'course' }
          ]
        },
        position: { x: 250, y: 600 },
        style: { background: '#e0f7fa', border: '1px solid #80deea', color: '#006064' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ce93d8' } },
      { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#ce93d8' } },
      { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#90caf9' } },
      { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#a5d6a7' } },
      { id: 'e4-6', source: '4', target: '6', animated: true, style: { stroke: '#ffcc80' } },
      { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#ffe082' } },
      { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#81d4fa' } },
      { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#9fa8da' } },
      { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#f48fb1' } }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Learn to automate and optimize software development and IT operations.',
    icon: 'Server',
    color: 'bg-red-500',
    popularity: 80,
    nodes: [
      {
        id: '1',
        type: 'input',
        data: {
          label: 'Operating Systems',
          description: 'Learn Linux fundamentals, shell scripting, and system administration.',
          resources: [
            { title: 'Linux Journey', url: 'https://linuxjourney.com/', type: 'article' },
            { title: 'Shell Scripting Tutorial', url: 'https://www.shellscript.sh/', type: 'article' }
          ]
        },
        position: { x: 250, y: 0 },
        style: { background: '#ffebee', border: '1px solid #ef9a9a', color: '#b71c1c' }
      },
      {
        id: '2',
        type: 'default',
        data: {
          label: 'Networking',
          description: 'Learn TCP/IP, DNS, HTTP, and network security.',
          resources: [
            { title: 'Computer Networking', url: 'https://www.youtube.com/watch?v=QKfk7YFILws', type: 'video' },
            { title: 'Networking for DevOps', url: 'https://www.networklessons.com/', type: 'article' }
          ]
        },
        position: { x: 250, y: 100 },
        style: { background: '#e3f2fd', border: '1px solid #90caf9', color: '#0d47a1' }
      },
      {
        id: '3',
        type: 'default',
        data: {
          label: 'Version Control',
          description: 'Learn Git, GitHub, and GitLab workflows.',
          resources: [
            { title: 'Git Tutorial', url: 'https://www.atlassian.com/git/tutorials', type: 'article' },
            { title: 'GitHub Flow', url: 'https://guides.github.com/introduction/flow/', type: 'article' }
          ]
        },
        position: { x: 250, y: 200 },
        style: { background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#1b5e20' }
      },
      {
        id: '4',
        type: 'default',
        data: {
          label: 'Containerization',
          description: 'Learn Docker, container concepts, and best practices.',
          resources: [
            { title: 'Docker Tutorial', url: 'https://docs.docker.com/get-started/', type: 'article' },
            { title: 'Docker Mastery', url: 'https://www.udemy.com/course/docker-mastery/', type: 'course' }
          ]
        },
        position: { x: 250, y: 300 },
        style: { background: '#fff3e0', border: '1px solid #ffcc80', color: '#e65100' }
      },
      {
        id: '5',
        type: 'default',
        data: {
          label: 'Container Orchestration',
          description: 'Learn Kubernetes, container orchestration, and scaling.',
          resources: [
            { title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', type: 'article' },
            { title: 'Kubernetes the Hard Way', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way', type: 'article' }
          ]
        },
        position: { x: 250, y: 400 },
        style: { background: '#fff8e1', border: '1px solid #ffe082', color: '#ff6f00' }
      },
      {
        id: '6',
        type: 'default',
        data: {
          label: 'CI/CD',
          description: 'Learn continuous integration and continuous deployment pipelines.',
          resources: [
            { title: 'CI/CD Pipeline', url: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd', type: 'article' },
            { title: 'GitHub Actions', url: 'https://docs.github.com/en/actions', type: 'article' }
          ]
        },
        position: { x: 100, y: 500 },
        style: { background: '#f3e5f5', border: '1px solid #ce93d8', color: '#4a148c' }
      },
      {
        id: '7',
        type: 'default',
        data: {
          label: 'Infrastructure as Code',
          description: 'Learn Terraform, Ansible, and infrastructure automation.',
          resources: [
            { title: 'Terraform Tutorial', url: 'https://learn.hashicorp.com/terraform', type: 'article' },
            { title: 'Ansible for DevOps', url: 'https://www.ansiblefordevops.com/', type: 'book' }
          ]
        },
        position: { x: 400, y: 500 },
        style: { background: '#e1f5fe', border: '1px solid #81d4fa', color: '#01579b' }
      },
      {
        id: '8',
        type: 'output',
        data: {
          label: 'Monitoring & Observability',
          description: 'Learn monitoring, logging, and observability tools.',
          resources: [
            { title: 'Prometheus Docs', url: 'https://prometheus.io/docs/introduction/overview/', type: 'article' },
            { title: 'ELK Stack Tutorial', url: 'https://www.elastic.co/guide/index.html', type: 'article' }
          ]
        },
        position: { x: 250, y: 600 },
        style: { background: '#e8eaf6', border: '1px solid #9fa8da', color: '#1a237e' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ef9a9a' } },
      { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#90caf9' } },
      { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#a5d6a7' } },
      { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#ffcc80' } },
      { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#ffe082' } },
      { id: 'e5-7', source: '5', target: '7', animated: true, style: { stroke: '#ffe082' } },
      { id: 'e6-8', source: '6', target: '8', animated: true, style: { stroke: '#ce93d8' } },
      { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#81d4fa' } }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Learn to build native and cross-platform mobile applications.',
    icon: 'Smartphone',
    color: 'bg-blue-500',
    popularity: 75,
    nodes: [
      {
        id: '1',
        type: 'input',
        data: {
          label: 'Programming Fundamentals',
          description: 'Learn a programming language like JavaScript, Java, Swift, or Kotlin.',
          resources: [
            { title: 'JavaScript Basics', url: 'https://javascript.info/', type: 'article' },
            { title: 'Swift Programming', url: 'https://docs.swift.org/swift-book/', type: 'article' }
          ]
        },
        position: { x: 250, y: 0 },
        style: { background: '#e3f2fd', border: '1px solid #90caf9', color: '#0d47a1' }
      },
      {
        id: '2',
        type: 'default',
        data: {
          label: 'Mobile UI Design',
          description: 'Learn mobile UI/UX principles and design guidelines.',
          resources: [
            { title: 'Material Design', url: 'https://material.io/design', type: 'article' },
            { title: 'iOS Design Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/', type: 'article' }
          ]
        },
        position: { x: 250, y: 100 },
        style: { background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#1b5e20' }
      },
      {
        id: '3a',
        type: 'default',
        data: {
          label: 'Cross-Platform Development',
          description: 'Learn React Native, Flutter, or Xamarin.',
          resources: [
            { title: 'React Native Docs', url: 'https://reactnative.dev/docs/getting-started', type: 'article' },
            { title: 'Flutter Tutorial', url: 'https://flutter.dev/docs/get-started/codelab', type: 'article' }
          ]
        },
        position: { x: 100, y: 200 },
        style: { background: '#fff3e0', border: '1px solid #ffcc80', color: '#e65100' }
      },
      {
        id: '3b',
        type: 'default',
        data: {
          label: 'Native Development',
          description: 'Learn Android (Java/Kotlin) or iOS (Swift/Objective-C) development.',
          resources: [
            { title: 'Android Basics', url: 'https://developer.android.com/courses', type: 'course' },
            { title: 'iOS Development', url: 'https://developer.apple.com/tutorials/swiftui', type: 'article' }
          ]
        },
        position: { x: 400, y: 200 },
        style: { background: '#fff8e1', border: '1px solid #ffe082', color: '#ff6f00' }
      },
      {
        id: '4',
        type: 'default',
        data: {
          label: 'State Management',
          description: 'Learn state management for mobile apps.',
          resources: [
            { title: 'Redux for React Native', url: 'https://redux.js.org/introduction/getting-started', type: 'article' },
            { title: 'Provider Pattern', url: 'https://flutter.dev/docs/development/data-and-backend/state-mgmt/simple', type: 'article' }
          ]
        },
        position: { x: 250, y: 300 },
        style: { background: '#f3e5f5', border: '1px solid #ce93d8', color: '#4a148c' }
      },
      {
        id: '5',
        type: 'default',
        data: {
          label: 'API Integration',
          description: 'Learn to connect mobile apps to backend services.',
          resources: [
            { title: 'Networking in React Native', url: 'https://reactnative.dev/docs/network', type: 'article' },
            { title: 'HTTP and API Calls', url: 'https://flutter.dev/docs/cookbook/networking/fetch-data', type: 'article' }
          ]
        },
        position: { x: 250, y: 400 },
        style: { background: '#e1f5fe', border: '1px solid #81d4fa', color: '#01579b' }
      },
      {
        id: '6',
        type: 'default',
        data: {
          label: 'Native Features',
          description: 'Learn to use device features like camera, GPS, and notifications.',
          resources: [
            { title: 'React Native Device APIs', url: 'https://reactnative.dev/docs/permissionsandroid', type: 'article' },
            { title: 'Flutter Platform Channels', url: 'https://flutter.dev/docs/development/platform-integration/platform-channels', type: 'article' }
          ]
        },
        position: { x: 250, y: 500 },
        style: { background: '#e8eaf6', border: '1px solid #9fa8da', color: '#1a237e' }
      },
      {
        id: '7',
        type: 'output',
        data: {
          label: 'App Store Deployment',
          description: 'Learn to publish apps to Google Play Store and Apple App Store.',
          resources: [
            { title: 'Google Play Console', url: 'https://developer.android.com/distribute/console', type: 'article' },
            { title: 'App Store Connect', url: 'https://developer.apple.com/app-store-connect/', type: 'article' }
          ]
        },
        position: { x: 250, y: 600 },
        style: { background: '#fce4ec', border: '1px solid #f48fb1', color: '#880e4f' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#90caf9' } },
      { id: 'e2-3a', source: '2', target: '3a', animated: true, style: { stroke: '#a5d6a7' } },
      { id: 'e2-3b', source: '2', target: '3b', animated: true, style: { stroke: '#a5d6a7' } },
      { id: 'e3a-4', source: '3a', target: '4', animated: true, style: { stroke: '#ffcc80' } },
      { id: 'e3b-4', source: '3b', target: '4', animated: true, style: { stroke: '#ffe082' } },
      { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#ce93d8' } },
      { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#81d4fa' } },
      { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#9fa8da' } }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Learn to analyze and interpret complex data using statistics and machine learning.',
    icon: 'LineChart',
    color: 'bg-yellow-500',
    popularity: 70,
    nodes: [
      {
        id: '1',
        type: 'input',
        data: {
          label: 'Programming Basics',
          description: 'Learn Python or R programming language.',
          resources: [
            { title: 'Python for Data Science', url: 'https://www.datacamp.com/courses/intro-to-python-for-data-science', type: 'course' },
            { title: 'R Programming', url: 'https://www.coursera.org/learn/r-programming', type: 'course' }
          ]
        },
        position: { x: 250, y: 0 },
        style: { background: '#fff8e1', border: '1px solid #ffe082', color: '#ff6f00' }
      },
      {
        id: '2',
        type: 'default',
        data: {
          label: 'Mathematics & Statistics',
          description: 'Learn linear algebra, calculus, probability, and statistics.',
          resources: [
            { title: 'Statistics and Probability', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'course' },
            { title: 'Linear Algebra', url: 'https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/', type: 'course' }
          ]
        },
        position: { x: 250, y: 100 },
        style: { background: '#e3f2fd', border: '1px solid #90caf9', color: '#0d47a1' }
      },
      {
        id: '3',
        type: 'default',
        data: {
          label: 'Data Manipulation',
          description: 'Learn pandas, NumPy, and data wrangling techniques.',
          resources: [
            { title: 'Pandas Tutorial', url: 'https://pandas.pydata.org/pandas-docs/stable/getting_started/10min.html', type: 'article' },
            { title: 'NumPy Basics', url: 'https://numpy.org/doc/stable/user/absolute_beginners.html', type: 'article' }
          ]
        },
        position: { x: 250, y: 200 },
        style: { background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#1b5e20' }
      },
      {
        id: '4',
        type: 'default',
        data: {
          label: 'Data Visualization',
          description: 'Learn matplotlib, seaborn, and data visualization principles.',
          resources: [
            { title: 'Matplotlib Tutorial', url: 'https://matplotlib.org/stable/tutorials/introductory/pyplot.html', type: 'article' },
            { title: 'Data Visualization with Seaborn', url: 'https://seaborn.pydata.org/tutorial.html', type: 'article' }
          ]
        },
        position: { x: 250, y: 300 },
        style: { background: '#fff3e0', border: '1px solid #ffcc80', color: '#e65100' }
      },
      {
        id: '5a',
        type: 'default',
        data: {
          label: 'Machine Learning',
          description: 'Learn supervised and unsupervised learning algorithms.',
          resources: [
            { title: 'Machine Learning Course', url: 'https://www.coursera.org/learn/machine-learning', type: 'course' },
            { title: 'Scikit-Learn Tutorial', url: 'https://scikit-learn.org/stable/tutorial/index.html', type: 'article' }
          ]
        },
        position: { x: 100, y: 400 },
        style: { background: '#f3e5f5', border: '1px solid #ce93d8', color: '#4a148c' }
      },
      {
        id: '5b',
        type: 'default',
        data: {
          label: 'Big Data',
          description: 'Learn Hadoop, Spark, and big data processing.',
          resources: [
            { title: 'Apache Spark Tutorial', url: 'https://spark.apache.org/docs/latest/quick-start.html', type: 'article' },
            { title: 'Hadoop Ecosystem', url: 'https://www.tutorialspoint.com/hadoop/hadoop_ecosystem.htm', type: 'article' }
          ]
        },
        position: { x: 400, y: 400 },
        style: { background: '#e1f5fe', border: '1px solid #81d4fa', color: '#01579b' }
      },
      {
        id: '6',
        type: 'default',
        data: {
          label: 'Deep Learning',
          description: 'Learn neural networks, TensorFlow, and PyTorch.',
          resources: [
            { title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', type: 'course' },
            { title: 'TensorFlow Tutorial', url: 'https://www.tensorflow.org/tutorials', type: 'article' }
          ]
        },
        position: { x: 250, y: 500 },
        style: { background: '#e8eaf6', border: '1px solid #9fa8da', color: '#1a237e' }
      },
      {
        id: '7',
        type: 'output',
        data: {
          label: 'Data Science Projects',
          description: 'Build a portfolio of data science projects.',
          resources: [
            { title: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions', type: 'article' },
            { title: 'Data Science Project Ideas', url: 'https://www.datacamp.com/community/tutorials/data-science-projects-for-beginners', type: 'article' }
          ]
        },
        position: { x: 250, y: 600 },
        style: { background: '#fce4ec', border: '1px solid #f48fb1', color: '#880e4f' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ffe082' } },
      { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#90caf9' } },
      { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#a5d6a7' } },
      { id: 'e4-5a', source: '4', target: '5a', animated: true, style: { stroke: '#ffcc80' } },
      { id: 'e4-5b', source: '4', target: '5b', animated: true, style: { stroke: '#ffcc80' } },
      { id: 'e5a-6', source: '5a', target: '6', animated: true, style: { stroke: '#ce93d8' } },
      { id: 'e5b-6', source: '5b', target: '6', animated: true, style: { stroke: '#81d4fa' } },
      { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#9fa8da' } }
    ]
  }
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Code':
      return Code;
    case 'Server':
      return Server;
    case 'Database':
      return Database;
    case 'Globe':
      return Globe;
    case 'Cpu':
      return Cpu;
    case 'PenTool':
      return PenTool;
    case 'LineChart':
      return LineChart;
    case 'Layers':
      return Layers;
    case 'Smartphone':
      return Smartphone;
    default:
      return Code;
  }
};