// 10 Áreas principais 2024-2025 com roadmaps baseado em roadmap.sh
// Dados de salário: Glassdoor Brasil 2024-2025
// Tendências: LinkedIn 2025

export const AREAS_PRECONFIGURAS = [
  {
    id: "frontend",
    nome: "Frontend",
    slug: "frontend",
    descricao: "Constrói interfaces visuais incríveis com HTML, CSS, JavaScript e frameworks modernos. 337 vagas abertas.",
    icone: "layout",
    dificuldade: 3,
    faixaSalarialMin: 2700,
    faixaSalarialMax: 25900,
    tempoPrimeiraVaga: "6-12 meses",
    vagasEstimadas: 337,
    roadmap: [
      {
        titulo: "Fundamentos Web",
        nivel: 1,
        subtopicos: ["HTML5 Semântico", "CSS3 (Flexbox, Grid)", "JavaScript (ES6+)", "DOM & Eventos", "Responsividade"]
      },
      {
        titulo: "CSS Avançado",
        nivel: 2,
        subtopicos: ["Flexbox e Grid avançado", "Animações CSS", "Preprocessadores (Sass, Less)", "BEM/SMACSS", "Mobile First"]
      },
      {
        titulo: "JavaScript Moderno",
        nivel: 2,
        subtopicos: ["Async/Await", "Promises", "Destructuring", "Classes", "Módulos ES6"]
      },
      {
        titulo: "Frameworks (React/Vue/Angular)",
        nivel: 3,
        subtopicos: ["Componentes", "Props & State", "Hooks/Lifecycle", "Roteamento", "State Management"]
      },
      {
        titulo: "Performance & SEO",
        nivel: 4,
        subtopicos: ["Web Vitals", "Lazy Loading", "Code Splitting", "SEO On-page", "Acessibilidade (a11y)"]
      },
      {
        titulo: "Ferramentas & Build",
        nivel: 4,
        subtopicos: ["Webpack/Vite", "NPM/Yarn", "Git", "Testes (Jest, Cypress)", "CI/CD"]
      },
      {
        titulo: "Projeto Completo",
        nivel: 5,
        subtopicos: ["Portfólio Real", "Integração com API", "Deploy (GitHub Pages, Vercel)", "Iteração & Feedback"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Análise e Desenvolvimento de Sistemas", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Sistemas de Informação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Ciência da Computação", tipo: "Bacharelado", duracao: "4 anos" },
    ],
    linguagensPopulares: ["JavaScript", "TypeScript", "React", "Vue.js", "Angular"],
    termosEssenciais: ["React", "componente", "estado", "hook", "responsividade", "acessibilidade"]
  },

  {
    id: "backend",
    nome: "Backend",
    slug: "backend",
    descricao: "Lógica de negócio, APIs, bancos de dados e infraestrutura. Mercado em alta demanda.",
    icone: "database",
    dificuldade: 4,
    faixaSalarialMin: 3200,
    faixaSalarialMax: 14400,
    tempoPrimeiraVaga: "9-18 meses",
    vagasEstimadas: 250,
    roadmap: [
      {
        titulo: "Lógica de Programação",
        nivel: 1,
        subtopicos: ["Variáveis & Tipos", "Condicionais", "Loops", "Funções", "Estruturas de Dados"]
      },
      {
        titulo: "Escolher Linguagem",
        nivel: 1,
        subtopicos: ["Node.js (JavaScript)", "Python", "Java", "Go", "C#"]
      },
      {
        titulo: "Bancos de Dados",
        nivel: 2,
        subtopicos: ["SQL (PostgreSQL)", "NoSQL (MongoDB)", "Modelagem de Dados", "Migrations", "Índices"]
      },
      {
        titulo: "Frameworks Web",
        nivel: 3,
        subtopicos: ["Express (Node)", "Django (Python)", "Spring (Java)", "FastAPI", "Gin (Go)"]
      },
      {
        titulo: "APIs REST & GraphQL",
        nivel: 3,
        subtopicos: ["HTTP Methods", "Statuscode", "REST Design", "GraphQL Queries", "Documentação (Swagger)"]
      },
      {
        titulo: "Autenticação & Segurança",
        nivel: 4,
        subtopicos: ["JWT & OAuth", "Hash & Salt", "CORS", "SQL Injection Prevention", "Rate Limiting"]
      },
      {
        titulo: "Testes & Qualidade",
        nivel: 4,
        subtopicos: ["Unit Tests", "Integration Tests", "Mocks & Fixtures", "Test Coverage", "TDD"]
      },
      {
        titulo: "Deploy & DevOps",
        nivel: 5,
        subtopicos: ["Docker", "Heroku/AWS", "Logs & Monitoring", "CI/CD Basics", "Escalabilidade"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Análise e Desenvolvimento de Sistemas", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Ciência da Computação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Engenharia de Software", tipo: "Bacharelado", duracao: "4 anos" },
    ],
    linguagensPopulares: ["JavaScript/Node.js", "Python", "Java", "Go", "C#"],
    termosEssenciais: ["API", "REST", "banco de dados", "autenticação", "servidor", "middleware"]
  },

  {
    id: "fullstack",
    nome: "Full Stack",
    slug: "fullstack",
    descricao: "Domina front-end e back-end. Construa aplicações completas de ponta a ponta.",
    icone: "code",
    dificuldade: 4,
    faixaSalarialMin: 5300,
    faixaSalarialMax: 11200,
    tempoPrimeiraVaga: "12-20 meses",
    vagasEstimadas: 180,
    roadmap: [
      {
        titulo: "Frontend Fundamentals",
        nivel: 1,
        subtopicos: ["HTML/CSS", "JavaScript", "Responsividade", "DOM Manipulation"]
      },
      {
        titulo: "Backend Fundamentals",
        nivel: 1,
        subtopicos: ["Servidor", "Rotas & Controllers", "Bancos de Dados", "APIs Básicas"]
      },
      {
        titulo: "Escolher Stack",
        nivel: 2,
        subtopicos: ["MERN (MongoDB, Express, React, Node)", "LAMP (Linux, Apache, MySQL, PHP)", "Django + React", "Next.js Full"]
      },
      {
        titulo: "Frontend Avançado",
        nivel: 3,
        subtopicos: ["Framework (React/Vue)", "State Management", "Roteamento", "Componentes Reutilizáveis"]
      },
      {
        titulo: "Backend Avançado",
        nivel: 3,
        subtopicos: ["Banco de Dados Avançado", "Autenticação JWT", "Validação & Segurança", "ORM/Query Builder"]
      },
      {
        titulo: "Integração & APIs",
        nivel: 4,
        subtopicos: ["Frontend ↔ Backend Communication", "RESTful Design", "Error Handling", "Documentação API"]
      },
      {
        titulo: "Deploy Full-Stack",
        nivel: 4,
        subtopicos: ["Docker Compose", "Nginx", "Environment Variables", "Database Migrations", "SSL/HTTPS"]
      },
      {
        titulo: "Produção & Scaling",
        nivel: 5,
        subtopicos: ["Monitoramento", "Logging", "Caching", "Load Balancing", "Arquitetura"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Análise e Desenvolvimento de Sistemas", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Engenharia de Software", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Ciência da Computação", tipo: "Bacharelado", duracao: "4 anos" },
    ],
    linguagensPopulares: ["JavaScript", "Python", "TypeScript"],
    termosEssenciais: ["full-stack", "MERN", "deployment", "DevOps", "arquitetura"]
  },

  {
    id: "devops",
    nome: "DevOps",
    slug: "devops",
    descricao: "Automação, infraestrutura, deploy e operações. Salário de R$ 5k-13.9k. Mercado crescente.",
    icone: "server",
    dificuldade: 4,
    faixaSalarialMin: 5000,
    faixaSalarialMax: 13900,
    tempoPrimeiraVaga: "10-18 meses",
    vagasEstimadas: 120,
    roadmap: [
      {
        titulo: "Linux Fundamentals",
        nivel: 1,
        subtopicos: ["Shell Scripting", "File Systems", "Users & Permissions", "Networking Basics", "SSH"]
      },
      {
        titulo: "Redes & Protocolos",
        nivel: 2,
        subtopicos: ["TCP/IP", "DNS", "HTTP/HTTPS", "Firewalls", "VPN"]
      },
      {
        titulo: "Containerização (Docker)",
        nivel: 2,
        subtopicos: ["Docker Images", "Docker Compose", "Dockerfile", "Registries (Docker Hub)", "Volumes & Networks"]
      },
      {
        titulo: "Orquestração (Kubernetes)",
        nivel: 3,
        subtopicos: ["Pods", "Deployments", "Services", "ConfigMaps", "Ingress", "Helm"]
      },
      {
        titulo: "Infrastructure as Code",
        nivel: 3,
        subtopicos: ["Terraform", "Ansible", "CloudFormation", "Configuration Management"]
      },
      {
        titulo: "CI/CD Pipelines",
        nivel: 4,
        subtopicos: ["GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD", "Test Automation"]
      },
      {
        titulo: "Cloud Platforms",
        nivel: 4,
        subtopicos: ["AWS (EC2, RDS, S3)", "GCP", "Azure", "Cost Optimization"]
      },
      {
        titulo: "Monitoramento & Logging",
        nivel: 5,
        subtopicos: ["Prometheus", "Grafana", "ELK Stack", "DataDog", "Alerting"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Redes de Computadores", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Sistemas de Informação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Infraestrutura de TI", tipo: "Pós-graduação", duracao: "1-2 anos" },
    ],
    linguagensPopulares: ["Bash", "Python", "Go", "YAML"],
    termosEssenciais: ["Docker", "Kubernetes", "CI/CD", "Terraform", "Linux", "AWS"]
  },

  {
    id: "dados",
    nome: "Data Engineer",
    slug: "dados",
    descricao: "Pipelines de dados, ETL, Big Data. Área em alta demanda no mercado.",
    icone: "bar-chart",
    dificuldade: 4,
    faixaSalarialMin: 6000,
    faixaSalarialMax: 18000,
    tempoPrimeiraVaga: "12-18 meses",
    vagasEstimadas: 140,
    roadmap: [
      {
        titulo: "Fundamentos Matemática",
        nivel: 1,
        subtopicos: ["Estatística Básica", "Probabilidade", "Álgebra Linear", "Análise Exploratória"]
      },
      {
        titulo: "SQL Avançado",
        nivel: 2,
        subtopicos: ["Queries Complexas", "Joins & Subqueries", "Window Functions", "Optimization", "Índices"]
      },
      {
        titulo: "Python para Dados",
        nivel: 2,
        subtopicos: ["Pandas", "NumPy", "Matplotlib", "Jupyter Notebooks", "Scikit-learn Basics"]
      },
      {
        titulo: "Bancos de Dados",
        nivel: 3,
        subtopicos: ["SQL (PostgreSQL, MySQL)", "NoSQL (MongoDB, Cassandra)", "Data Warehouses", "Data Lakes"]
      },
      {
        titulo: "Pipelines ETL",
        nivel: 3,
        subtopicos: ["Apache Airflow", "Apache Spark", "Talend", "Data Modeling", "Scheduling"]
      },
      {
        titulo: "Big Data & Distributed",
        nivel: 4,
        subtopicos: ["Hadoop", "Spark SQL", "Cloud Data Solutions", "Partitioning", "Scaling"]
      },
      {
        titulo: "Machine Learning",
        nivel: 4,
        subtopicos: ["Feature Engineering", "Model Training", "Evaluation Metrics", "Deployment"]
      },
      {
        titulo: "Data Governance",
        nivel: 5,
        subtopicos: ["Data Quality", "Lineage Tracking", "Security", "Compliance (GDPR)", "Documentation"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Ciência de Dados", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Estatística", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Ciência da Computação", tipo: "Bacharelado", duracao: "4 anos" },
    ],
    linguagensPopulares: ["Python", "SQL", "Scala", "Spark"],
    termosEssenciais: ["SQL", "Pandas", "ETL", "Spark", "Airflow", "Big Data"]
  },

  {
    id: "qa",
    nome: "QA / Teste de Software",
    slug: "qa",
    descricao: "Garantir qualidade, testes automatizados, detecção de bugs. Mercado em crescimento.",
    icone: "check-circle",
    dificuldade: 3,
    faixaSalarialMin: 3500,
    faixaSalarialMax: 12000,
    tempoPrimeiraVaga: "6-10 meses",
    vagasEstimadas: 95,
    roadmap: [
      {
        titulo: "Conceitos de QA",
        nivel: 1,
        subtopicos: ["Test Types (Unit, Integration, E2E)", "Test Lifecycle", "Bug Reporting", "Test Plans"]
      },
      {
        titulo: "Testes Manuais",
        nivel: 1,
        subtopicos: ["Test Cases", "Exploratory Testing", "Checklists", "Regression Testing", "Edge Cases"]
      },
      {
        titulo: "Automação Básica",
        nivel: 2,
        subtopicos: ["Selenium", "Cypress", "Playwright", "Page Object Model", "Framework Selection"]
      },
      {
        titulo: "Automação Avançada",
        nivel: 3,
        subtopicos: ["Pytest/Jest", "Mocking & Stubbing", "API Testing (Postman, REST Assured)", "Data-driven Testing"]
      },
      {
        titulo: "Testes de Performance",
        nivel: 3,
        subtopicos: ["Load Testing (JMeter, Gatling)", "Stress Testing", "Profiling", "Optimization"]
      },
      {
        titulo: "CI/CD Integration",
        nivel: 4,
        subtopicos: ["GitHub Actions", "Jenkins", "GitLab CI", "Test Reporting", "Artifact Management"]
      },
      {
        titulo: "Teste de Segurança",
        nivel: 4,
        subtopicos: ["OWASP Testing", "SQL Injection Tests", "XSS Tests", "Security Scanning Tools"]
      },
      {
        titulo: "Liderança em QA",
        nivel: 5,
        subtopicos: ["Test Strategy", "Risk-based Testing", "Mentoring", "Métricas de Qualidade"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Análise e Desenvolvimento de Sistemas", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Engenharia de Software", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Engenharia de Qualidade", tipo: "Pós-graduação", duracao: "1-2 anos" },
    ],
    linguagensPopulares: ["Python", "Java", "JavaScript", "C#"],
    termosEssenciais: ["Selenium", "Cypress", "Jest", "automação", "bug tracking"]
  },

  {
    id: "mobile",
    nome: "Mobile (Android/iOS)",
    slug: "mobile",
    descricao: "Apps Android (Kotlin), iOS (Swift) ou cross-platform (React Native). Crescimento contínuo.",
    icone: "smartphone",
    dificuldade: 4,
    faixaSalarialMin: 4000,
    faixaSalarialMax: 16000,
    tempoPrimeiraVaga: "10-16 meses",
    vagasEstimadas: 85,
    roadmap: [
      {
        titulo: "Fundamentos OOP",
        nivel: 1,
        subtopicos: ["Classes & Objects", "Inheritance & Polymorphism", "Design Patterns", "SOLID Principles"]
      },
      {
        titulo: "Android (Kotlin)",
        nivel: 2,
        subtopicos: ["Activities & Fragments", "Lifecycle", "Services", "Intents", "Content Providers", "XML Layouts"]
      },
      {
        titulo: "iOS (Swift)",
        nivel: 2,
        subtopicos: ["SwiftUI/UIKit", "ViewControllers", "Delegates & Protocols", "Storyboards", "Auto Layout"]
      },
      {
        titulo: "Cross-Platform (React Native/Flutter)",
        nivel: 3,
        subtopicos: ["Components", "Navigation", "State Management (Redux, Bloc)", "Native Modules", "Performance"]
      },
      {
        titulo: "API & Networking",
        nivel: 3,
        subtopicos: ["REST APIs", "HTTP Methods", "Authentication (JWT)", "Async Operations", "Error Handling"]
      },
      {
        titulo: "UI/UX Mobile",
        nivel: 3,
        subtopicos: ["Material Design", "Human Interface Guidelines", "Animations", "Touch Interactions"]
      },
      {
        titulo: "Testes & Qualidade",
        nivel: 4,
        subtopicos: ["Unit Tests", "UI Tests (Espresso, XCTest)", "Performance Testing", "Memory Profiling"]
      },
      {
        titulo: "Deploy & Distribuição",
        nivel: 5,
        subtopicos: ["Play Store", "App Store", "Versioning", "Beta Testing", "Crash Reporting"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Análise e Desenvolvimento de Sistemas", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Ciência da Computação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Engenharia de Software", tipo: "Bacharelado", duracao: "4 anos" },
    ],
    linguagensPopulares: ["Kotlin", "Swift", "Dart (Flutter)", "JavaScript (React Native)"],
    termosEssenciais: ["Kotlin", "Swift", "React Native", "app store", "SDK"]
  },

  {
    id: "seguranca",
    nome: "Cibersegurança",
    slug: "seguranca",
    descricao: "Proteção de sistemas, pentesting, compliance. Uma das áreas mais em alta conforme LinkedIn.",
    icone: "lock",
    dificuldade: 4,
    faixaSalarialMin: 5500,
    faixaSalarialMax: 16000,
    tempoPrimeiraVaga: "12-20 meses",
    vagasEstimadas: 75,
    roadmap: [
      {
        titulo: "Fundamentos de Segurança",
        nivel: 1,
        subtopicos: ["CIA Triad", "Threat vs Vulnerability", "Security Mindset", "OWASP Top 10"]
      },
      {
        titulo: "Redes & Protocolos",
        nivel: 2,
        subtopicos: ["OSI Model", "TCP/IP", "DNS", "HTTP/HTTPS", "Packet Analysis"]
      },
      {
        titulo: "Criptografia",
        nivel: 2,
        subtopicos: ["Symmetric/Asymmetric Encryption", "Hashing", "Digital Signatures", "TLS/SSL", "PKI"]
      },
      {
        titulo: "Teste de Penetração",
        nivel: 3,
        subtopicos: ["Reconnaissance", "Scanning (Nmap, Burp)", "Exploitation", "Post-exploitation", "Reporting"]
      },
      {
        titulo: "Segurança de Aplicação",
        nivel: 3,
        subtopicos: ["Input Validation", "SQL Injection Prevention", "XSS Prevention", "CSRF Protection", "Authentication/Authorization"]
      },
      {
        titulo: "Segurança de Rede",
        nivel: 4,
        subtopicos: ["Firewalls", "IDS/IPS", "VPN", "WAF (Web Application Firewall)", "DDoS Mitigation"]
      },
      {
        titulo: "Compliance & Regulamentações",
        nivel: 4,
        subtopicos: ["GDPR", "HIPAA", "PCI-DSS", "ISO 27001", "LGPD (Brasil)"]
      },
      {
        titulo: "Resposta a Incidentes",
        nivel: 5,
        subtopicos: ["Detection", "Containment", "Eradication", "Recovery", "Post-incident Analysis"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Segurança da Informação", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Redes de Computadores", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Segurança Cibernética", tipo: "Pós-graduação", duracao: "1-2 anos" },
    ],
    linguagensPopulares: ["Python", "Bash", "C", "Go"],
    termosEssenciais: ["Pentesting", "Criptografia", "Firewall", "OWASP", "compliance"]
  },

  {
    id: "cloud",
    nome: "Cloud Architecture",
    slug: "cloud",
    descricao: "Infraestrutura em nuvem (AWS, Azure, GCP). Design escalável e seguro.",
    icone: "cloud",
    dificuldade: 4,
    faixaSalarialMin: 6000,
    faixaSalarialMax: 18000,
    tempoPrimeiraVaga: "10-16 meses",
    vagasEstimadas: 110,
    roadmap: [
      {
        titulo: "Conceitos de Nuvem",
        nivel: 1,
        subtopicos: ["IaaS vs PaaS vs SaaS", "Modelos de Deployment", "Escalabilidade", "Disponibilidade", "Segurança na Nuvem"]
      },
      {
        titulo: "AWS Fundamentals",
        nivel: 2,
        subtopicos: ["EC2", "RDS", "S3", "Lambda", "VPC", "IAM", "CloudFormation Basics"]
      },
      {
        titulo: "Azure ou GCP",
        nivel: 2,
        subtopicos: ["Compute Services", "Storage", "Databases", "Networking", "Identity & Access"]
      },
      {
        titulo: "Networking na Nuvem",
        nivel: 3,
        subtopicos: ["VPC Design", "Subnets", "Security Groups", "Load Balancers", "CDN"]
      },
      {
        titulo: "Armazenamento & Banco de Dados",
        nivel: 3,
        subtopicos: ["Blob Storage", "Relational Databases", "NoSQL", "Data Warehouse", "Backup & Recovery"]
      },
      {
        titulo: "Segurança na Nuvem",
        nivel: 4,
        subtopicos: ["IAM Policies", "Encryption", "Compliance", "Network Security", "Auditing"]
      },
      {
        titulo: "Otimização de Custos",
        nivel: 4,
        subtopicos: ["Reserved Instances", "Spot Instances", "Cost Monitoring", "Resource Right-sizing", "Reserved Capacity"]
      },
      {
        titulo: "Alta Disponibilidade & DR",
        nivel: 5,
        subtopicos: ["Multi-region", "Failover", "Disaster Recovery Plans", "SLA Planning", "Auto-scaling"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Redes de Computadores", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Sistemas de Informação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Arquitetura de Soluções em Nuvem", tipo: "Pós-graduação", duracao: "1-2 anos" },
    ],
    linguagensPopulares: ["YAML", "Python", "Go"],
    termosEssenciais: ["AWS", "Azure", "GCP", "EC2", "S3", "autoscaling"]
  },

  {
    id: "ia",
    nome: "IA Engineer / LLM",
    slug: "ia",
    descricao: "LLMs, Prompt Engineering, RAG, Agents. Área com ENORME crescimento em 2024-2025.",
    icone: "brain",
    dificuldade: 4,
    faixaSalarialMin: 7000,
    faixaSalarialMax: 22000,
    tempoPrimeiraVaga: "6-12 meses",
    vagasEstimadas: 200,
    roadmap: [
      {
        titulo: "Machine Learning Fundamentals",
        nivel: 1,
        subtopicos: ["Supervised Learning", "Unsupervised Learning", "Evaluation Metrics", "Overfitting & Regularization"]
      },
      {
        titulo: "Deep Learning & Transformers",
        nivel: 2,
        subtopicos: ["Neural Networks", "Backpropagation", "Attention Mechanism", "Transformer Architecture", "BERT/GPT Basics"]
      },
      {
        titulo: "LLMs (Large Language Models)",
        nivel: 2,
        subtopicos: ["GPT Architecture", "Fine-tuning", "Quantization", "LoRA", "Transfer Learning"]
      },
      {
        titulo: "Prompt Engineering",
        nivel: 3,
        subtopicos: ["Prompt Design", "Few-shot Learning", "Chain-of-thought", "Advanced Techniques", "Prompt Optimization"]
      },
      {
        titulo: "RAG (Retrieval-Augmented Generation)",
        nivel: 3,
        subtopicos: ["Vector Databases (Pinecone, Weaviate)", "Embeddings", "Semantic Search", "Context Injection"]
      },
      {
        titulo: "Agents & Automation",
        nivel: 4,
        subtopicos: ["Tool Use", "Reasoning Loops", "Planning", "ReAct Pattern", "Multi-agent Systems"]
      },
      {
        titulo: "LLM Deployment",
        nivel: 4,
        subtopicos: ["OpenAI API", "Hugging Face", "Local Models (Ollama, LLaMA)", "Cost Optimization", "Rate Limiting"]
      },
      {
        titulo: "Production & Ethics",
        nivel: 5,
        subtopicos: ["Monitoring", "Bias Detection", "Content Filtering", "Responsible AI", "Governance"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Ciência da Computação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Ciência de Dados", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Inteligência Artificial", tipo: "Pós-graduação", duracao: "1-2 anos" },
    ],
    linguagensPopulares: ["Python", "JavaScript", "YAML"],
    termosEssenciais: ["LLM", "Prompt Engineering", "RAG", "Agent", "fine-tuning", "embeddings"]
  },

  {
    id: "analista-sistemas",
    nome: "Analista de Sistemas",
    slug: "analista-sistemas",
    descricao: "Levanta requisitos, modela processos e faz a ponte entre negócio e tecnologia. Ótima porta de entrada em TI.",
    icone: "layout",
    dificuldade: 3,
    faixaSalarialMin: 3000,
    faixaSalarialMax: 12000,
    tempoPrimeiraVaga: "6-12 meses",
    vagasEstimadas: 160,
    roadmap: [
      {
        titulo: "Fundamentos de TI",
        nivel: 1,
        subtopicos: ["Lógica de Programação", "Banco de Dados", "Redes Básicas", "Ciclo de Vida de Software"]
      },
      {
        titulo: "Levantamento de Requisitos",
        nivel: 2,
        subtopicos: ["Entrevistas com Stakeholders", "Casos de Uso", "User Stories", "Documentação Funcional"]
      },
      {
        titulo: "Modelagem de Processos",
        nivel: 2,
        subtopicos: ["BPMN", "Fluxogramas", "Modelagem de Dados (DER)", "UML Básico"]
      },
      {
        titulo: "Metodologias Ágeis",
        nivel: 3,
        subtopicos: ["Scrum", "Kanban", "Backlog Refinement", "Sprint Planning"]
      },
      {
        titulo: "Ferramentas de Gestão",
        nivel: 3,
        subtopicos: ["Jira", "Trello", "Confluence", "Miro"]
      },
      {
        titulo: "SQL & Integração de Sistemas",
        nivel: 4,
        subtopicos: ["Consultas SQL", "APIs & Integrações", "ERP/CRM Básico", "Testes de Aceitação"]
      },
      {
        titulo: "Análise de Negócio",
        nivel: 4,
        subtopicos: ["Indicadores (KPIs)", "Análise de Impacto", "Priorização", "Comunicação com Stakeholders"]
      },
      {
        titulo: "Especialização",
        nivel: 5,
        subtopicos: ["Analista de Requisitos Sênior", "Business Analyst", "Product Owner", "Arquitetura de Negócio"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Análise e Desenvolvimento de Sistemas", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Sistemas de Informação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Gestão da Tecnologia da Informação", tipo: "Tecnólogo", duracao: "2 anos" },
    ],
    linguagensPopulares: ["SQL", "BPMN", "UML"],
    termosEssenciais: ["requisitos", "user story", "BPMN", "stakeholder", "backlog"]
  },

  {
    id: "analista-dados",
    nome: "Analista de Dados",
    slug: "analista-dados",
    descricao: "Transforma dados brutos em relatórios e insights para tomada de decisão. Excelente porta de entrada para a área de dados.",
    icone: "bar-chart",
    dificuldade: 3,
    faixaSalarialMin: 3200,
    faixaSalarialMax: 13000,
    tempoPrimeiraVaga: "6-12 meses",
    vagasEstimadas: 190,
    roadmap: [
      {
        titulo: "Fundamentos de Dados",
        nivel: 1,
        subtopicos: ["Estatística Básica", "Excel/Google Sheets Avançado", "Tipos de Dados", "Análise Exploratória"]
      },
      {
        titulo: "SQL",
        nivel: 2,
        subtopicos: ["Queries Básicas", "Joins", "Agregações (GROUP BY)", "Subqueries", "Window Functions"]
      },
      {
        titulo: "Python para Análise",
        nivel: 2,
        subtopicos: ["Pandas", "NumPy", "Limpeza de Dados", "Jupyter Notebooks"]
      },
      {
        titulo: "Visualização de Dados",
        nivel: 3,
        subtopicos: ["Matplotlib/Seaborn", "Storytelling com Dados", "Dashboards", "Design de Gráficos"]
      },
      {
        titulo: "Estatística Aplicada",
        nivel: 3,
        subtopicos: ["Testes de Hipótese", "Correlação vs Causalidade", "Distribuições", "Regressão Simples"]
      },
      {
        titulo: "Ferramentas de BI",
        nivel: 4,
        subtopicos: ["Power BI", "Looker Studio", "Tableau Básico", "Métricas de Negócio"]
      },
      {
        titulo: "Modelagem de Dados",
        nivel: 4,
        subtopicos: ["Data Warehouse Básico", "Modelagem Dimensional", "ETL Simples", "Qualidade de Dados"]
      },
      {
        titulo: "Comunicação de Insights",
        nivel: 5,
        subtopicos: ["Apresentação para Stakeholders", "Relatórios Executivos", "A/B Testing", "Tomada de Decisão"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Ciência de Dados", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Estatística", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Sistemas de Informação", tipo: "Bacharelado", duracao: "4 anos" },
    ],
    linguagensPopulares: ["SQL", "Python", "Excel"],
    termosEssenciais: ["SQL", "Excel", "dashboard", "KPI", "análise exploratória"]
  },

  {
    id: "analista-bi",
    nome: "Analista de BI",
    slug: "analista-bi",
    descricao: "Constrói dashboards, modela dados de negócio e entrega inteligência de dados (Business Intelligence) para a empresa toda.",
    icone: "bar-chart",
    dificuldade: 3,
    faixaSalarialMin: 3500,
    faixaSalarialMax: 14000,
    tempoPrimeiraVaga: "6-12 meses",
    vagasEstimadas: 130,
    roadmap: [
      {
        titulo: "Fundamentos de BI",
        nivel: 1,
        subtopicos: ["O que é Business Intelligence", "KPIs & Métricas", "Excel Avançado", "Lógica de Negócio"]
      },
      {
        titulo: "SQL para BI",
        nivel: 2,
        subtopicos: ["Queries Analíticas", "Joins & Views", "Stored Procedures Básico", "Otimização de Consultas"]
      },
      {
        titulo: "Modelagem Dimensional",
        nivel: 2,
        subtopicos: ["Star Schema", "Snowflake Schema", "Fatos & Dimensões", "Data Warehouse"]
      },
      {
        titulo: "Ferramentas de BI",
        nivel: 3,
        subtopicos: ["Power BI (DAX)", "Tableau", "Looker Studio", "Qlik Sense"]
      },
      {
        titulo: "ETL & Integração",
        nivel: 3,
        subtopicos: ["Power Query", "Pipelines de Dados", "Fontes Múltiplas", "Agendamento de Atualizações"]
      },
      {
        titulo: "DAX & Fórmulas Avançadas",
        nivel: 4,
        subtopicos: ["Medidas DAX", "Colunas Calculadas", "Time Intelligence", "Contexto de Filtro"]
      },
      {
        titulo: "Design de Dashboards",
        nivel: 4,
        subtopicos: ["UX para Dados", "Storytelling Visual", "Performance de Relatórios", "Governança de Dados"]
      },
      {
        titulo: "BI Estratégico",
        nivel: 5,
        subtopicos: ["Self-service BI", "Governança & Segurança", "Data Catalog", "Cultura Data-Driven"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Ciência de Dados", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Sistemas de Informação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Business Intelligence", tipo: "Pós-graduação", duracao: "1-2 anos" },
    ],
    linguagensPopulares: ["DAX", "SQL", "M (Power Query)"],
    termosEssenciais: ["Power BI", "DAX", "dashboard", "star schema", "data warehouse"]
  },

  {
    id: "ux-ui",
    nome: "UX/UI Design",
    slug: "ux-ui",
    descricao: "Projeta a experiência e a interface de produtos digitais, unindo pesquisa com usuário e design visual.",
    icone: "layout",
    dificuldade: 3,
    faixaSalarialMin: 3000,
    faixaSalarialMax: 14000,
    tempoPrimeiraVaga: "6-12 meses",
    vagasEstimadas: 105,
    roadmap: [
      {
        titulo: "Fundamentos de Design",
        nivel: 1,
        subtopicos: ["Teoria das Cores", "Tipografia", "Hierarquia Visual", "Grid & Layout"]
      },
      {
        titulo: "Pesquisa com Usuário (UX Research)",
        nivel: 2,
        subtopicos: ["Entrevistas", "Personas", "Jornada do Usuário", "Testes de Usabilidade"]
      },
      {
        titulo: "Arquitetura de Informação",
        nivel: 2,
        subtopicos: ["Fluxos de Navegação", "Sitemap", "Card Sorting", "Wireframes"]
      },
      {
        titulo: "Prototipação",
        nivel: 3,
        subtopicos: ["Figma", "Protótipos de Baixa e Alta Fidelidade", "Design System", "Componentes Reutilizáveis"]
      },
      {
        titulo: "UI Design",
        nivel: 3,
        subtopicos: ["Interfaces Responsivas", "Mobile First", "Acessibilidade (a11y)", "Micro-interações"]
      },
      {
        titulo: "Handoff para Desenvolvimento",
        nivel: 4,
        subtopicos: ["Especificações Técnicas", "Design Tokens", "Colaboração com Devs", "Ferramentas (Zeplin, Figma Dev Mode)"]
      },
      {
        titulo: "Testes & Iteração",
        nivel: 4,
        subtopicos: ["A/B Testing", "Análise de Métricas", "Feedback Loops", "Design Thinking"]
      },
      {
        titulo: "Portfólio & Especialização",
        nivel: 5,
        subtopicos: ["Case Studies", "Design Systems Avançado", "Product Design", "Liderança de Design"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Design Digital", tipo: "Tecnólogo", duracao: "2 anos" },
      { curso: "Design Gráfico", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "UX Design", tipo: "Pós-graduação", duracao: "1-2 anos" },
    ],
    linguagensPopulares: ["Figma", "HTML/CSS Básico"],
    termosEssenciais: ["wireframe", "protótipo", "usabilidade", "design system", "persona"]
  },

  {
    id: "product-manager",
    nome: "Product Manager",
    slug: "product-manager",
    descricao: "Define a visão e prioridades de um produto digital, conectando negócio, design e engenharia.",
    icone: "layout",
    dificuldade: 4,
    faixaSalarialMin: 5000,
    faixaSalarialMax: 20000,
    tempoPrimeiraVaga: "12-18 meses",
    vagasEstimadas: 90,
    roadmap: [
      {
        titulo: "Fundamentos de Produto",
        nivel: 1,
        subtopicos: ["O que é um PM", "Product Discovery", "Problem Space vs Solution Space", "Métricas de Produto"]
      },
      {
        titulo: "Pesquisa & Descoberta",
        nivel: 2,
        subtopicos: ["Entrevistas com Usuários", "Jobs to be Done", "Personas", "Validação de Hipóteses"]
      },
      {
        titulo: "Priorização & Roadmap",
        nivel: 2,
        subtopicos: ["RICE/ICE Scoring", "Roadmap de Produto", "OKRs", "Backlog Management"]
      },
      {
        titulo: "Metodologias Ágeis",
        nivel: 3,
        subtopicos: ["Scrum", "Kanban", "Sprint Planning", "Refinamento de Backlog"]
      },
      {
        titulo: "Dados & Métricas",
        nivel: 3,
        subtopicos: ["SQL Básico", "Funis de Conversão", "A/B Testing", "Analytics (Amplitude, Mixpanel)"]
      },
      {
        titulo: "Design & UX Colaboração",
        nivel: 4,
        subtopicos: ["Wireframes", "Design Sprints", "Handoff com Design", "Usabilidade"]
      },
      {
        titulo: "Go-to-Market",
        nivel: 4,
        subtopicos: ["Lançamento de Features", "Pricing", "Posicionamento", "Comunicação com Stakeholders"]
      },
      {
        titulo: "Liderança de Produto",
        nivel: 5,
        subtopicos: ["Visão de Produto", "Gestão de Time", "Estratégia de Longo Prazo", "Product-Market Fit"]
      }
    ],
    faculdadesRelacionadas: [
      { curso: "Administração", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Sistemas de Informação", tipo: "Bacharelado", duracao: "4 anos" },
      { curso: "Gestão de Produtos Digitais", tipo: "Pós-graduação", duracao: "1-2 anos" },
    ],
    linguagensPopulares: ["SQL", "Excel"],
    termosEssenciais: ["roadmap", "backlog", "OKR", "discovery", "product-market fit"]
  }
];
