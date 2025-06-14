"use client";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import Navbar from './Components/Nav';
import { motion, useScroll, useInView, useMotionValueEvent } from 'framer-motion';
import { useSpring, animated, useTransition } from 'react-spring';
import Head from 'next/head';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '-50px',
      ...options
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasIntersected, options]);

  return [elementRef, isIntersecting, hasIntersected] as const;
};

// Custom hook for staggered animations

export default function Welcome() {

  const { scrollY } = useScroll()
  type Tech = {
    icon: string;
    name: string;
    color: string;
    knowledge: string;
  };
  const [selectedTech, setSelectedTech] = useState<Tech | null>(null);
  const [filter, setFilter] = useState('all');
  type Project = {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    technologies: string[];
    features: string[];
    link: string;
    demoLink: string;
  };
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  useMotionValueEvent(scrollY, "change", (latest: number) => {
    console.log("Page scroll: ", latest)
  })


  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  // Intersection observer refs for each section
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [aboutRef, aboutVisible, aboutHasIntersected] = useIntersectionObserver();
  const [educationRef, educationVisible, educationHasIntersected] = useIntersectionObserver();
  const [experienceRef, experienceVisible, experienceHasIntersected] = useIntersectionObserver();
  const [techStackRef, techStackVisible, techStackHasIntersected] = useIntersectionObserver();
  const [projectsRef, projectsVisible, projectsHasIntersected] = useIntersectionObserver();
  const [contactRef, contactVisible, contactHasIntersected] = useIntersectionObserver();

  // Trigger hero animations immediately on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroLoaded(true);
    }, 100); // Small delay to ensure smooth rendering
    
    return () => clearTimeout(timer);
  }, []);

  // Add smooth scrolling functionality
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId!);
        if (targetElement) {
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
          window.history.pushState(null, '', targetId!);
        }
      }
    };
    document.body.addEventListener('click', handleAnchorClick);
    return () => {
      document.body.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  // Tech stack data
  const techStackData = [
    { 
      icon: '🌐', 
      name: 'HTML', 
      color: 'text-orange-500 dark:text-orange-400 purple:text-orange-400',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '🎨', 
      name: 'CSS', 
      color: 'text-blue-500 dark:text-blue-400 purple:text-blue-400',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '📜', 
      name: 'JavaScript', 
      color: 'text-yellow-500 dark:text-yellow-400 purple:text-yellow-400',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '📘', 
      name: 'TypeScript', 
      color: 'text-blue-600 dark:text-blue-400 purple:text-blue-400',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '⚛️', 
      name: 'ReactJS', 
      color: 'text-cyan-500 dark:text-cyan-400 purple:text-cyan-400',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '⏭️', 
      name: 'NextJS', 
      color: 'text-gray-700 dark:text-gray-300 purple:text-gray-300',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '🎭', 
      name: 'NodeJS', 
      color: 'text-green-600 dark:text-green-400 purple:text-green-400',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '🔄', 
      name: 'PHP', 
      color: 'text-purple-600 dark:text-purple-400 purple:text-purple-400',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '🛠️', 
      name: 'Laravel', 
      color: 'text-red-600 dark:text-red-400 purple:text-red-400',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '🧰', 
      name: 'MySQL', 
      color: 'text-blue-800 dark:text-blue-500 purple:text-blue-500',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '🔧', 
      name: 'Git', 
      color: 'text-gray-700 dark:text-gray-300 purple:text-gray-300',
      knowledge: '60% - Proficient'
    },
    { 
      icon: '🐱', 
      name: 'GitHub', 
      color: 'text-gray-800 dark:text-gray-200 purple:text-gray-200',
      knowledge: '60% - Proficient'
    }
  ];
  
  // Project data
 const projectsData = [
  {
    id: 1,
    title: "Payroll System for Eljin Corporation",
    category: "web",
    image: "https://via.placeholder.com/600x340", // Replace with real screenshot if available
    description: "A comprehensive payroll and employee management system for Eljin Corporation, featuring secure authentication, attendance tracking, and automated payroll calculations.",
    technologies: ["React", "Laravel", "MySQL"],
    features: [
      "User authentication and role-based access",
      "Employee management and attendance tracking",
      "Calendar-based event and schedule management",
      "Customizable dashboards for different user types",
      "Automated payroll calculations and reporting"
    ],
    link: "https://github.com/your-username/payroll-system", // Update if public repo exists
    demoLink: "https://eljincorp.com/"
  },
  {
    id: 2,
    title: "Waste Processing System",
    category: "web",
    image: "https://via.placeholder.com/600x340", // Replace with real screenshot if available
    description: "A real-time waste tracking and management platform for Eljin Corporation, providing map visualization, analytics, and role-based access for efficient waste processing.",
    technologies: ["React", "Laravel", "MySQL"],
    features: [
      "Real-time tracking and map visualization of waste collection",
      "Role-based access for admins, collectors, and supervisors",
      "Dynamic reporting and dashboard analytics",
      "Mobile-friendly and responsive UI"
    ],
    link: "https://github.com/your-username/waste-management-system", // Update if public repo exists
    demoLink: "https://wasteprocessing.eljincorp.com/"
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "web",
    image: "https://via.placeholder.com/600x340", // Replace with real screenshot if available
    description: "A personal portfolio showcasing projects, skills, and contact information in a sleek and responsive layout.",
    technologies: ["React", "Laravel"],
    features: [
      "Interactive project gallery",
      "Responsive design",
    ],
    link: "https://github.com/your-username/portfolio", // Update if public repo exists
    demoLink: "https://your-portfolio-demo.com" // Update with your real portfolio URL if available
  }
];

  // Filter projects
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  // Set up staggered animations for tech stack and projects
  
  // Close tooltip and modal handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.tech-item')) {
        setSelectedTech(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeProject && !(event.target as HTMLElement).closest('.project-modal-content')) {
        setActiveProject(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeProject]);
  
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeProject]);

  // Hero section animations - trigger immediately on mount
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'translateY(0)' : 'translateY(-30px)' 
    },
    config: { tension: 180, friction: 12 }
  });
  
  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)' 
    },
    config: { tension: 180, friction: 12 },
    delay: heroLoaded ? 300 : 0
  });
  
  const descriptionAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)' 
    },
    config: { tension: 180, friction: 12 },
    delay: heroLoaded ? 600 : 0
  });
  
  const buttonsAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)' 
    },
    config: { tension: 180, friction: 12 },
    delay: heroLoaded ? 900 : 0
  });
  
  const socialsAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'scale(1)' : 'scale(0.8)' 
    },
    config: { tension: 180, friction: 12 },
    delay: heroLoaded ? 1200 : 0
  });

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(50px) rotateY(15deg)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'translateX(0px) rotateY(0deg)' : 'translateX(50px) rotateY(15deg)' 
    },
    config: { mass: 1, tension: 180, friction: 20 },
    delay: heroLoaded ? 400 : 0
  });
  
  const dotsAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'scale(1)' : 'scale(0.5)' 
    },
    config: { mass: 1, tension: 200, friction: 15 },
    delay: heroLoaded ? 700 : 0
  });
  
  const fileNameAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(20px)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'translateX(0px)' : 'translateX(20px)' 
    },
    config: { mass: 1, tension: 170, friction: 14 },
    delay: heroLoaded ? 1000 : 0
  });

  // About section animations
const aboutHeaderAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


  const profileAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px) scale(0.9)' },
    to: { 
      opacity: aboutHasIntersected ? 1 : 0, 
      transform: aboutHasIntersected ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.9)' 
    },
    config: { tension: 180, friction: 12 },
    delay: aboutHasIntersected ? 200 : 0
  });

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(50px)' },
    to: { 
      opacity: aboutHasIntersected ? 1 : 0, 
      transform: aboutHasIntersected ? 'translateX(0)' : 'translateX(50px)' 
    },
    config: { tension: 180, friction: 12 },
    delay: aboutHasIntersected ? 400 : 0
  });

  const educationAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { 
      opacity: educationHasIntersected ? 1 : 0, 
      transform: educationHasIntersected ? 'translateY(0)' : 'translateY(30px)' 
    },
    config: { tension: 180, friction: 12 }
  });

  const experienceAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { 
      opacity: experienceHasIntersected ? 1 : 0, 
      transform: experienceHasIntersected ? 'translateY(0)' : 'translateY(30px)' 
    },
    config: { tension: 180, friction: 12 }
  });

  const techStackAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { 
      opacity: techStackHasIntersected ? 1 : 0, 
      transform: techStackHasIntersected ? 'translateY(0)' : 'translateY(30px)' 
    },
    config: { tension: 180, friction: 12 }
  });

  // Projects section animations
  const projectsHeaderAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { 
      opacity: projectsHasIntersected ? 1 : 0, 
      transform: projectsHasIntersected ? 'translateY(0)' : 'translateY(30px)' 
    },
    config: { tension: 180, friction: 12 }
  });
  
  const filterAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { 
      opacity: projectsHasIntersected ? 1 : 0, 
      transform: projectsHasIntersected ? 'translateY(0)' : 'translateY(20px)' 
    },
    config: { tension: 180, friction: 12 },
    delay: projectsHasIntersected ? 200 : 0
  });

  // Contact section animations
  const contactHeaderAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { 
      opacity: contactHasIntersected ? 1 : 0, 
      transform: contactHasIntersected ? 'translateY(0)' : 'translateY(30px)' 
    },
    config: { tension: 180, friction: 12 }
  });

  const contactFormAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px) scale(0.95)' },
    to: { 
      opacity: contactHasIntersected ? 1 : 0, 
      transform: contactHasIntersected ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.95)' 
    },
    config: { tension: 180, friction: 12 },
    delay: contactHasIntersected ? 200 : 0
  });

  const contactInfoAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(50px) scale(0.95)' },
    to: { 
      opacity: contactHasIntersected ? 1 : 0, 
      transform: contactHasIntersected ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.95)' 
    },
    config: { tension: 180, friction: 12 },
    delay: contactHasIntersected ? 400 : 0
  });

  // Individual tech item animation
  const techItemAnimation = (index: number, isVisible: boolean) => useSpring({
    from: { opacity: 0, transform: 'scale(0.8) translateY(20px)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)' 
    },
    config: { tension: 180, friction: 12 },
    delay: isVisible ? index * 50 : 0
  });

  // Individual project item animation
  const projectItemAnimation = (index: number, isVisible: boolean) => useSpring({
    from: { opacity: 0, transform: 'scale(0.9) translateY(30px)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(30px)' 
    },
    config: { tension: 180, friction: 12 },
    delay: isVisible ? index * 100 : 0
  });

  // Tooltip animation
  const tooltipAnimation = useSpring({
    opacity: selectedTech ? 1 : 0,
    transform: selectedTech ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-10px)',
    config: { tension: 300, friction: 20 }
  });
  
  // Modal animations
  const modalAnimation = useSpring({
    opacity: activeProject ? 1 : 0,
    transform: activeProject ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
    config: { tension: 300, friction: 26 }
  });
  
  const backdropAnimation = useSpring({
    opacity: activeProject ? 0.5 : 0,
    config: { tension: 300, friction: 26 }
  });

  // Success/Error message animation
  const messageAnimation = useSpring({
    opacity: submitStatus ? 1 : 0,
    transform: submitStatus ? 'translateY(0)' : 'translateY(-10px)',
    config: { tension: 300, friction: 20 }
  });

  // Typing animation for the code section
  const [typing, setTyping] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const codeLines = [
    "// Software Engineer",
    "const developer = {",
    "  name: 'Hanz Pillerva',",
    "  skills: ['React', 'Node.js', 'Php', 'Laravel',",
    "           'JavaScript', 'HTML/CSS', 'Mysql'],",
    "  focuses: ['Full-Stack', 'UI/UX', 'Web Performance',",
    "            'Responsive Design'],",
    "  learning: 'Always'",
    "};"
  ];
  
  // Start typing animation when hero section loads
  useEffect(() => {
    if (heroLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 1500); // Start typing after other hero animations
      
      return () => clearTimeout(timer);
    }
  }, [heroLoaded]);
  
  useEffect(() => {
    if (!isLoaded || currentLine >= codeLines.length) return;
    
    const targetLine = codeLines[currentLine];
    const timer = setTimeout(() => {
      if (typing.length < targetLine.length) {
        setTyping(targetLine.substring(0, typing.length + 1));
      } else {
        setTyping('');
        setCurrentLine(prev => prev + 1);
      }
    }, 30);
    
    return () => clearTimeout(timer);
  }, [typing, currentLine, isLoaded]);
  
  const completedLines = codeLines.slice(0, currentLine);
  const currentTypingLine = currentLine < codeLines.length ? typing : '';
  
  // Cursor blink animation
  const cursorAnimation = useSpring({
    from: { opacity: 0 },
    to: async (next) => {
      while (isLoaded) {
        await next({ opacity: 1 });
        await next({ opacity: 0 });
      }
    },
    config: { duration: 500 }
  });

  // Helper function for syntax highlighting
  const formatCodeLine = (line: string) => {
    if (line.startsWith('//')) {
      return <span className="text-gray-500 dark:text-gray-400 purple:text-purple-400">{line}</span>;
    }
    
    const parts = [];
    let inString = false;
    let currentPart = '';
    let key = 0;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === "'" && line[i-1] !== '\\') {
        inString = !inString;
        currentPart += char;
        if (!inString) {
          parts.push(<span key={key++} className="text-green-500 dark:text-green-400 purple:text-purple-400">{currentPart}</span>);
          currentPart = '';
        }
      } else if (inString) {
        currentPart += char;
      } else if (char === ':') {
        if (currentPart.trim()) {
          parts.push(<span key={key++} className="text-purple-500 dark:text-purple-400 purple:text-purple-400">{currentPart}</span>);
        }
        parts.push(<span key={key++} className="text-gray-500 dark:text-gray-400 purple:text-purple-400">{char}</span>);
        currentPart = '';
      } else if (char === '{' || char === '}' || char === '[' || char === ']' || char === ',' || char === ';') {
        if (currentPart.trim()) {
          parts.push(<span key={key++}>{currentPart}</span>);
        }
        parts.push(<span key={key++} className="text-gray-500 dark:text-gray-400 purple:text-purple-400">{char}</span>);
        currentPart = '';
      } else if (char === ' ' && currentPart.trim() === 'const') {
        parts.push(<span key={key++} className="text-purple-500 dark:text-purple-400 purple:text-purple-400">{currentPart}</span>);
        parts.push(<span key={key++}>{char}</span>);
        currentPart = '';
      } else {
        currentPart += char;
      }
    }
    
    if (currentPart) {
      if (currentPart === 'developer') {
        parts.push(<span key={key++} className="text-blue-500 dark:text-blue-400 purple:text-purple-400">{currentPart}</span>);
      } else {
        parts.push(<span key={key++}>{currentPart}</span>);
      }
    }
    
    return <>{parts}</>;
  };

  const handleTechClick = (tech: Tech) => {
    if (selectedTech && selectedTech.name === tech.name) {
      setSelectedTech(null);
    } else {
      setSelectedTech(tech);
    }
  };

  // Form handling functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/Contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const techRefs = useMemo(
    () => techStackData.map(() => React.createRef<HTMLDivElement>()),
    [techStackData.length]
  );

  const projectRefs = useMemo(
    () => filteredProjects.map(() => React.createRef<HTMLDivElement>()),
    [filteredProjects.length]
  );

  return (
    <>
    <Head>
      <title>Hanz Pillerva | Portfolio</title>
    </Head>
    <section>
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
       {/* <DropGrid /> */}

       
        
      <div className="min-h-screen 
                    bg-white dark:bg-gray-900 
                    text-gray-800 dark:text-white 
                    flex flex-col items-center justify-center py-12 px-2 sm:px-4 md:px-8 
                    transition-colors duration-300
                    pt-16 w-full">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start lg:items-center justify-between text-center lg:text-left gap-8 md:gap-12">

          <div className="w-full lg:w-1/2 mb-12 md:mb-16 lg:mb-0">
            <animated.div style={profileAnimation} className="mb-6">
              <p className="text-blue-600 dark:text-blue-400 text-xl sm:text-2xl">Hello! I'm</p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mt-3">
                <span className="text-gray-800 dark:text-white">Hanz</span>{" "}
                <span className="text-blue-600 dark:text-blue-400">Pillerva</span>
              </h1>
            </animated.div>
            
            <animated.h2 style={subtitleAnimation} className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
              Full-Stack Web Developer & Technical Specialist
            </animated.h2>
            
            <animated.p style={descriptionAnimation} className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 md:mb-10 max-w-xl mx-auto">
              Building elegant solutions to complex problems with modern
              technologies.
            </animated.p>
            
            <animated.div style={buttonsAnimation} className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8 md:mb-10 w-full">
              <a 
                href="#contact" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 
                        dark:bg-blue-400 dark:hover:bg-blue-500 
                        text-white 
                        px-6 md:px-8 py-3 md:py-4 rounded-md font-medium transition-colors text-base md:text-lg text-center"
              >
                Contact Me
              </a>
              <a 
                href="#projects" 
                className="w-full sm:w-auto bg-transparent 
                        border border-gray-300 hover:border-gray-400 
                        dark:border-gray-700 dark:hover:border-gray-500 
                        text-gray-700 dark:text-white 
                        px-6 md:px-8 py-3 md:py-4 rounded-md font-medium transition-colors text-base md:text-lg text-center"
              >
                View Projects
              </a>
            </animated.div>
            
            <animated.div style={socialsAnimation} className="flex justify-center gap-6 md:gap-8">
              <a 
                href="https://github.com" 
                className="text-gray-500 hover:text-gray-800 
                        dark:text-gray-400 dark:hover:text-white 
                        transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-gray-500 hover:text-gray-800 
                        dark:text-gray-400 dark:hover:text-white 
                        transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="mailto:email@example.com" 
                className="text-gray-500 hover:text-gray-800 
                        dark:text-gray-400 dark:hover:text-white 
                        transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </animated.div>
          </div>
          
          <animated.div style={cardAnimation} className="w-full lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl w-full max-w-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-900">
                <animated.div style={dotsAnimation} className="flex space-x-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </animated.div>
                <animated.div style={fileNameAnimation} className="ml-auto text-xs sm:text-sm text-gray-500">
                  developer.js
                </animated.div>
              </div>
              
              <div className="p-4 sm:p-8 font-mono text-sm sm:text-base">
                {completedLines.map((line, index) => (
                  <div key={index} className="mb-1">
                    {formatCodeLine(line)}
                  </div>
                ))}
                
                {currentLine < codeLines.length && (
                  <div className="mb-1 flex">
                    {formatCodeLine(currentTypingLine)}
                    <animated.span style={cursorAnimation} className="ml-1 inline-block w-2 h-4 bg-blue-400"></animated.span>
                  </div>
                )}
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>

    <section ref={aboutRef} id="about" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
       <motion.div
  ref={ref}
      variants={aboutHeaderAnimation}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
>
  <div className="text-center mb-12">
    <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">GET TO KNOW ME</p>
    <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
      About Me
    </h2>
  </div>
</motion.div>
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <animated.div style={profileAnimation} className="w-full lg:w-2/5 flex flex-col items-center text-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden mb-8 border-4 border-white dark:border-gray-700">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 flex items-center justify-center text-white text-6xl font-bold">
                HP
              </div>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I'm a passionate Full-Stack Developer who loves building 
              dynamic, user-friendly applications. I thrive on solving 
              problems, creating seamless experiences, and continuously 
              expanding my skills. Always eager to learn and grow, I'm currently 
              looking for new opportunities to contribute and innovate.
            </p>
            
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Tarlac City, Philippines</span>
            </div>
          </animated.div>
          
          <animated.div style={contentAnimation} className="w-full lg:w-3/5">
            <div ref={educationRef}>
              <animated.div style={educationAnimation} className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Education</h3>
                <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Tarlac State University</h4>
                    <p className="text-gray-500 dark:text-gray-400">BS in Computer Science</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-700 dark:text-gray-300">2017 - 2021</p>
                    <p className="text-gray-500 dark:text-gray-400">CGPA: 3.8</p>
                  </div>
                </div>
              </animated.div>
            </div>
            
            <div ref={experienceRef}>
              <animated.div style={experienceAnimation} className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Experience</h3>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Full-Stack Web Developer</h4>
                    <div className="text-right">
                      <p className="text-gray-700 dark:text-gray-300">Jan 2022 - Present</p>
                      <p className="text-gray-500 dark:text-gray-400">Remote</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="min-w-4 h-4 mt-1.5 mr-3 border-l-2 border-blue-500 dark:border-blue-400"></div>
                      <p className="text-gray-600 dark:text-gray-300">Improved website performance, increasing mobile traffic by 10%</p>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-4 h-4 mt-1.5 mr-3 border-l-2 border-blue-500 dark:border-blue-400"></div>
                      <p className="text-gray-600 dark:text-gray-300">Developed a mental health tracking platform, adopted by 700+ students</p>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-4 h-4 mt-1.5 mr-3 border-l-2 border-blue-500 dark:border-blue-400"></div>
                      <p className="text-gray-600 dark:text-gray-300">Fixed UI bugs, reducing complaints by 50%</p>
                    </div>
                  </div>
                </div>
              </animated.div>
            </div>
            
            <div ref={techStackRef}>
              <animated.div style={techStackAnimation}>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Tech Stack</h3>
                
                <div className="flex flex-wrap gap-3 relative">
                  {techStackData.map((tech, index) => (
                    <animated.div
                      key={index}
                      ref={techRefs[index]}
                      style={techItemAnimation(index, true)}
                      className={`px-4 py-2 rounded-full bg-white dark:bg-gray-700 ${tech.color.replace(/purple:[^ ]+ ?/g, '')} 
                                flex items-center shadow-sm border border-gray-200 dark:border-gray-600
                                hover:shadow-md transition-all duration-300 cursor-pointer tech-item
                                ${selectedTech && selectedTech.name === tech.name ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
                                `}
                      onClick={() => handleTechClick(tech)}
                    >
                      <span className="mr-2">{tech.icon}</span>{tech.name}
                    </animated.div>
                  ))}

                  {selectedTech && (
                    <animated.div 
                      style={tooltipAnimation}
                      className="absolute top-full left-0 right-0 mt-4 p-4 bg-white dark:bg-gray-800 
                               rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
                               z-10 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`text-2xl ${selectedTech.color}`}>{selectedTech.icon}</div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 mb-1">{selectedTech.name}</h4>
                          <p className="text-gray-600">{selectedTech.knowledge}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">Proficiency Level</span>
                          <span className="text-sm font-medium text-gray-700">
                            {selectedTech.knowledge.startsWith('Advanced') ? '90%' : selectedTech.knowledge.startsWith('Intermediate') ? '70%' : '50%'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${selectedTech.color.includes('orange') ? 'bg-orange-500' : 
                                      selectedTech.color.includes('blue') ? 'bg-blue-500' : 
                                      selectedTech.color.includes('yellow') ? 'bg-yellow-500' : 
                                      selectedTech.color.includes('green') ? 'bg-green-600' : 
                                      selectedTech.color.includes('red') ? 'bg-red-600' : 
                                      selectedTech.color.includes('purple') ? 'bg-purple-600' : 
                                      selectedTech.color.includes('cyan') ? 'bg-cyan-500' : 'bg-gray-700'}`} 
                            style={{ width: selectedTech.knowledge.startsWith('Advanced') ? '90%' : selectedTech.knowledge.startsWith('Intermediate') ? '70%' : '50%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setSelectedTech(null)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </animated.div>
                  )}
                </div>
              </animated.div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>

    <section ref={projectsRef} id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 w-full overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 md:px-8 max-w-6xl">
        <animated.div style={projectsHeaderAnimation} className="text-center mb-8 md:mb-12">
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">MY RECENT WORK</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Projects
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Here are some of my recent projects that showcase my skills and experience. Click on any project to learn more about it.
          </p>
        </animated.div>
        
        <animated.div style={filterAnimation} className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full transition-colors duration-300
                      ${filter === 'all' 
                        ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setFilter('web')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full transition-colors duration-300
                      ${filter === 'web' 
                        ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            Web Development
          </button>
        </animated.div>
      </div>
      {activeProject && (
        <>
          <animated.div
            style={backdropAnimation}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setActiveProject(null)}
          />
          <animated.div
            style={modalAnimation}
            className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4"
          >
            <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl project-modal-content">
              <div className="relative">
                <div className="h-40 sm:h-60 md:h-80 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img 
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <button 
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  onClick={() => setActiveProject(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">{activeProject.title}</h2>
                
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {activeProject.description}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {activeProject.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="flex items-start text-gray-600 dark:text-gray-300"
                      >
                        <span className="mr-2 mt-1 text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a 
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-center transition-colors duration-300 text-sm sm:text-base"
                  >
                    View Source Code
                  </a>
                  <a 
                    href={activeProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-center transition-colors duration-300 text-sm sm:text-base"
                  >
                    View Live Demo
                  </a>
                </div>
              </div>
            </div>
          </animated.div>
        </>
      )}
    </section>  {/* <-- Make sure this closing tag is present and at the right place */}

    {/* CONTACT SECTION */}
    <section ref={contactRef} id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 w-full">
      <div className="container mx-auto px-2 sm:px-4 md:px-8 max-w-6xl">
        {/* Section Header */}
        <animated.div style={contactHeaderAnimation} className="text-center mb-8 md:mb-12">
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">GET IN TOUCH</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Contact Me
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together!
          </p>
        </animated.div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Contact Form */}
          <animated.div style={contactFormAnimation} className="w-full lg:w-3/5">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">Send me a message</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project or just say hello!"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-medium py-3 md:py-4 px-4 md:px-6 rounded-lg transition-all duration-200 
                             focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                             transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150
                             ${isSubmitting 
                               ? 'bg-gray-400 cursor-not-allowed' 
                               : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                             } text-white focus:ring-blue-500 dark:focus:ring-blue-400 text-base md:text-lg`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Success/Error Messages */}
                {submitStatus && (
                  <animated.div style={messageAnimation} className="mt-4">
                    {submitStatus === 'success' && (
                      <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm sm:text-base">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Message sent successfully! I'll get back to you soon.
                        </div>
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm sm:text-base">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Failed to send message. Please try again or contact me directly.
                        </div>
                      </div>
                    )}
                  </animated.div>
                )}
              </form>
            </div>
          </animated.div>

          {/* Contact Information */}
          <animated.div style={contactInfoAnimation} className="w-full lg:w-2/5">
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">Let's Connect</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600 text-sm sm:text-base">hanz.pillerva@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Phone</h4>
                      <p className="text-gray-600 text-sm sm:text-base">+63 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Location</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Tarlac City, Central Luzon, Philippines</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Response Time</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">Follow Me</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                             hover:bg-gray-50 dark:hover:bg-gray-800 
                             transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-gray-800 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">GitHub</span>
                  </a>

                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                             hover:bg-gray-50 dark:hover:bg-gray-800 
                             transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-gray-800 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">LinkedIn</span>
                  </a>

                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                             hover:bg-gray-50 dark:hover:bg-gray-800 
                             transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-gray-800 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Twitter</span>
                  </a>

                  <a 
                    href="https://instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                             hover:bg-gray-50 dark:hover:bg-gray-800 
                             transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-gray-800 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44zm0 13.888c-2.209 0-4 1.79-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.21-1.791-4-4-4z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
    
    {/* Back to Top Button */}
    <button 
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 z-40"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
    </>
  );
}