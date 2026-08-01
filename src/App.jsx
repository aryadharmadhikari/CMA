import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  Volume2,
  Mic,
  BookOpen,
  Award,
  Sparkles,
  Compass,
  Users,
  CheckCircle,
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Calendar,
  Star,
  ShieldCheck
} from 'lucide-react';
import './App.css';

// Inline SVG components for social brand icons
const Instagram = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

const Twitter = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

function App() {
  // Navigation scroll state
  const [scrolled, setScrolled] = useState(false);
  // Mobile menu toggle state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Demo Booking Modal state
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('Hindustani Classical');
  // Gallery lightbox state
  const [lightboxImage, setLightboxImage] = useState(null);
  // Testimonial carousel active index
  const [activeTestimonial, setActiveTestimonial] = useState(1); // Default to center highlighted card
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '' });
  // Active scroll section
  const [activeLink, setActiveLink] = useState('home');

  // Form states
  const [demoForm, setDemoForm] = useState({ name: '', email: '', phone: '', course: 'Hindustani Classical', date: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', course: 'Hindustani Classical', message: '' });

  // Handle scroll to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Simple active link detection
      const sections = ['home', 'about', 'courses', 'gallery', 'testimonials', 'events', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Show Toast Helper
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 4000);
  };

  // Submit Handlers
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    showToast(`Thank you, ${demoForm.name}! Your demo class request for ${demoForm.course} has been registered successfully.`);
    setDemoForm({ name: '', email: '', phone: '', course: 'Hindustani Classical', date: '' });
    setDemoModalOpen(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    showToast(`Thank you, ${contactForm.name}! We have received your query about ${contactForm.course} and will contact you shortly.`);
    setContactForm({ name: '', email: '', phone: '', course: 'Hindustani Classical', message: '' });
  };

  const openDemoModal = (courseName = 'Hindustani Classical') => {
    setSelectedCourse(courseName);
    setDemoForm(prev => ({ ...prev, course: courseName }));
    setDemoModalOpen(true);
    setMobileMenuOpen(false);
  };

  // Gallery Data
  const galleryItems = [
    { id: 1, tag: "Concert", title: "Annual Summer Symphony", src: "/images/event_concert.png" },
    { id: 2, tag: "Classical", title: "Classical Indian Recital", src: "/images/course_classical.png" },
    { id: 3, tag: "Studio", title: "Professional Mic Control Session", src: "/images/course_vocal_training.png" },
    { id: 4, tag: "Guitar", title: "Contemporary Acoustic Workshop", src: "/images/course_contemporary.png" },
    { id: 5, tag: "Recital", title: "Junior Keyboard Recital", src: "/images/course_kids_adults.png" },
    { id: 6, tag: "Fiesta", title: "Fiesta Grand Finale Chorus", src: "/images/event_fiesta.png" }
  ];

  // Testimonials Data
  const testimonials = [
    {
      id: 0,
      name: "Ananya Deshmukh",
      course: "Hindustani Classical Student",
      avatar: "/images/student_avatar1.png",
      review: "CMA has completely transformed my approach to classical singing. The guru-shishya dynamic integrated with scientific vocal exercises helped me gain voice control I never thought possible."
    },
    {
      id: 1,
      name: "Rohan Malhotra",
      course: "Contemporary Vocals & Guitar",
      avatar: "/images/student_avatar2.png",
      review: "The stage exposure here is unmatched! Within six months, I was performing live in front of hundreds. The contemporary program is practical, performance-driven, and extremely inspiring."
    },
    {
      id: 2,
      name: "Dr. Sunita Sharma",
      course: "Parent of Arjun (8 Yrs)",
      avatar: "/images/student_avatar3.png",
      review: "I enrolled my son in the Kids program. The educators make complex musical theory fun and accessible. The personalized attention in small batches is a huge plus for early development."
    }
  ];

  // Generating floating background particles
  const particles = Array.from({ length: 15 });

  return (
    <>
      {/* Background Floating Particles */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {particles.map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 15}s`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          />
        ))}
      </div>

      {/* Sticky Transparent Header / Navigation */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-logo">
          <img src="/images/logo.png" alt="Chinmay's Music Academy Logo" style={{ height: '75px', width: 'auto', borderRadius: '50%', border: '2px solid var(--accent-gold)', boxShadow: '0 2px 8px rgba(0, 168, 181, 0.15)' }} />
        </a>

        {/* Navigation Links */}
        <nav>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li><a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className={activeLink === 'about' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#courses" className={activeLink === 'courses' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Courses</a></li>
            <li><a href="#gallery" className={activeLink === 'gallery' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Gallery</a></li>
            <li><a href="#testimonials" className={activeLink === 'testimonials' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Testimonials</a></li>
            <li><a href="#events" className={activeLink === 'events' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Events</a></li>
            <li><a href="#contact" className={activeLink === 'contact' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>


        {/* Mobile Hamburger Menu Toggle */}
        <button
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="hero-container">
          {/* Left Hero Content */}
          <div className="hero-content reveal">
            <h1 className="hero-heading">
              Chinmay's <br />
              <span className="gold-gradient-text">Music Academy</span>
            </h1>
            <p className="hero-tagline" style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--accent-gold)', marginTop: '1rem', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
              <i>Where Music becomes a Way of Life</i>
            </p>
            <p className="hero-subheading" style={{ marginTop: '0px' }}>
              Join Chinmay’s Music Academy and begin your musical journey with world-class expert guidance, personalized curriculums, and a performance-driven structure.
            </p>
            <div className="hero-actions">
              <button onClick={() => openDemoModal()} className="btn btn-gold">
                Book Demo Class <ChevronRight size={18} />
              </button>
              <a href="#courses" className="btn btn-outline">
                Explore Programs
              </a>
            </div>
          </div>

          {/* Right Hero Image overlapping naturally */}
          <div className="hero-image-wrapper reveal reveal-delay-2">
            <div className="hero-glow-ring"></div>
            <div className="hero-image-container">
              <img
                src="/images/hero_singer.png"
                alt="Vocalist performing live on stage under spotlights"
                className="hero-image"
              />
              <div className="hero-image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="features-strip">
        <div className="feature-card reveal">
          <div className="feature-icon-wrapper">
            <Mic size={24} />
          </div>
          <h3 className="feature-title">Vocal Ergonomics</h3>
          <p className="feature-desc">Scientifically designed vocal strain prevention & safety training.</p>
        </div>
        <div className="feature-card reveal reveal-delay-1">
          <div className="feature-icon-wrapper">
            <Sparkles size={24} />
          </div>
          <h3 className="feature-title">Performance Focused</h3>
          <p className="feature-desc">Frequent live stage exposures, microphone confidence & real shows.</p>
        </div>
        <div className="feature-card reveal reveal-delay-2">
          <div className="feature-icon-wrapper">
            <Compass size={24} />
          </div>
          <h3 className="feature-title">Contemporary Approach</h3>
          <p className="feature-desc">A beautiful, fluid blend of classical roots and modern techniques.</p>
        </div>
        <div className="feature-card reveal reveal-delay-3">
          <div className="feature-icon-wrapper">
            <Users size={24} />
          </div>
          <h3 className="feature-title">Personalized Attention</h3>
          <p className="feature-desc">Small batch sizes ensuring tailored, individual mentorship.</p>
        </div>
        <div className="feature-card reveal reveal-delay-4">
          <div className="feature-icon-wrapper">
            <Award size={24} />
          </div>
          <h3 className="feature-title">Certified Programs</h3>
          <p className="feature-desc">Highly structured curriculum backed by professional examinations.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        {/* Transparent Treble Clef Watermark */}
        <svg className="treble-clef-watermark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M12 2v20M12 6a4 4 0 100 8M12 2a3 3 0 013 3M12 18a4 4 0 11-4-4" />
        </svg>

        <div className="about-container">
          {/* Left Column: Portrait of Founder with overlay signature */}
          <div className="about-image-wrapper reveal">
            <div className="about-image-container">
              <img
                src="/images/founder_chinmay.png"
                alt="Founder Chinmay playing guitar in professional music studio"
                className="about-image"
              />
              <div className="about-image-overlay"></div>
              <div className="founder-signature">Chinmay</div>
            </div>
          </div>

          {/* Right Column: About CMA content */}
          <div className="about-content reveal reveal-delay-2">
            <span className="section-label">About CMA</span>
            <h2 className="section-title">
              Nurturing Voices. <br />
              <span className="text-gold">Inspiring Performers.</span>
            </h2>
            <p className="about-desc">
              At Chinmay's Music Academy, we believe music is far more than just memorizing notes and repeating scales. It is an emotional expression, a builder of lifelong confidence, and a journey of self-discovery. <br /><br />
              Founded by industry veteran Chinmay, our academy focuses on creating holistic performers. We guide our students through the mechanics of breathing, stage presence, crowd connection, and artistic individuality, preparing them to truly move audiences, rather than just sing.
            </p>
            <a href="#contact" className="btn btn-gold">
              Know More About CMA <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section">
        <span className="section-label">Our Programs</span>
        <h2 className="section-title">Find The Right Path For Your Musical Journey</h2>
        <p className="section-description">
          Choose from our meticulously curated courses designed for beginner hobbyists to advanced performers.
        </p>

        <div className="courses-grid">
          {/* Card 1: Hindustani Classical */}
          <div className="course-card reveal">
            <div className="course-img-container">
              <img src="/images/course_classical.png" alt="Indian female classical vocalist singing" className="course-img" />
            </div>
            <div className="course-info">
              <h3 className="course-title">Hindustani Classical</h3>
              <p className="course-desc">Develop a solid foundation in Indian classical raags, taal, vocal textures, and traditional music theory.</p>
              <a href="#contact" onClick={() => openDemoModal('Hindustani Classical')} className="course-link">
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Card 2: Contemporary Music */}
          <div className="course-card reveal reveal-delay-1">
            <div className="course-img-container">
              <img src="/images/course_contemporary.png" alt="Contemporary singer and guitarist" className="course-img" />
            </div>
            <div className="course-info">
              <h3 className="course-title">Contemporary Music</h3>
              <p className="course-desc">Master modern pop, rock, and fusion, including microphone technique, guitar accompaniment, and songwriting.</p>
              <a href="#contact" onClick={() => openDemoModal('Contemporary Music')} className="course-link">
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Card 3: Vocal Training */}
          <div className="course-card reveal reveal-delay-2">
            <div className="course-img-container">
              <img src="/images/course_vocal_training.png" alt="Female vocalist training in studio" className="course-img" />
            </div>
            <div className="course-info">
              <h3 className="course-title">Vocal Training</h3>
              <p className="course-desc">A highly scientific voice coaching system focusing on pitch, range expansion, breath stamina, and vocal hygiene.</p>
              <a href="#contact" onClick={() => openDemoModal('Vocal Training')} className="course-link">
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Card 4: Kids & Adults */}
          <div className="course-card reveal reveal-delay-3">
            <div className="course-img-container">
              <img src="/images/course_kids_adults.png" alt="Happy child singing in class" className="course-img" />
            </div>
            <div className="course-info">
              <h3 className="course-title">Kids & Adults</h3>
              <p className="course-desc">Custom tailored age-inclusive learning tracks designed to keep young minds engaged and busy professionals growing.</p>
              <a href="#contact" onClick={() => openDemoModal('Kids & Adults')} className="course-link">
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <span className="section-label">Visual Gallery</span>
        <h2 className="section-title">Moments That Make Music Magical</h2>
        <p className="section-description">
          A glimpse into the vibrant performances, workshops, and recording studio milestones of CMA students.
        </p>

        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className={`gallery-item reveal reveal-delay-${idx % 3}`}
              onClick={() => setLightboxImage(item)}
            >
              <img src={item.src} alt={item.title} className="gallery-img" />
              <div className="gallery-item-overlay">
                <span className="gallery-tag">{item.tag}</span>
                <p className="gallery-caption">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => showToast("Loading full gallery archive... Redirecting shortly!")} className="btn btn-outline">
          View Full Gallery
        </button>
      </section>

      {/* Testimonials Section (Cream / Light background) */}
      <section id="testimonials" className="testimonials-section">
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">Voices That Inspire Us</h2>
        <p className="section-description">
          Read stories of musical breakthroughs, confidence boosts, and stage triumphs directly from our academy students and parents.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className={`testimonial-card ${idx === activeTestimonial ? 'featured' : ''}`}
              onClick={() => setActiveTestimonial(idx)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.avatar} alt={item.name} className="testimonial-avatar" />
              <Star className="testimonial-quote-icon" fill="#D4AF37" color="#D4AF37" size={24} />
              <p className="testimonial-review">"{item.review}"</p>
              <h4 className="testimonial-name">{item.name}</h4>
              <p style={{ fontSize: '13px', color: idx === activeTestimonial ? '#E2E8F0' : '#718096', fontWeight: 500 }}>
                {item.course}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="carousel-indicators">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${idx === activeTestimonial ? 'active' : ''}`}
              onClick={() => setActiveTestimonial(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section">
        <span className="section-label">Events & Showcases</span>
        <h2 className="section-title">Learn. Perform. Celebrate.</h2>
        <p className="section-description">
          Stage performance is core to our teachings. Join us at our upcoming events, student concerts, and expert workshops.
        </p>

        <div className="events-grid">
          {/* Card 1: Summer Concert */}
          <div className="event-card reveal">
            <div className="event-img-wrapper">
              <span className="event-date-badge">18 AUG</span>
              <img src="/images/event_concert.png" alt="Symphony orchestra performing on stage" className="event-img" />
            </div>
            <div className="event-info">
              <h3 className="event-title">Annual Summer Concert</h3>
              <p className="event-desc">Our flagship arena concert where students of all batches showcase their classical and contemporary progress live on stage.</p>
            </div>
          </div>

          {/* Card 2: Masterclass */}
          <div className="event-card reveal reveal-delay-1">
            <div className="event-img-wrapper">
              <span className="event-date-badge">05 SEP</span>
              <img src="/images/event_masterclass.png" alt="Intimate vocal workshop training" className="event-img" />
            </div>
            <div className="event-info">
              <h3 className="event-title">Vocal Masterclass</h3>
              <p className="event-desc">An advanced, intensive workshop led by founder Chinmay focusing on microtone control, stage posture, and breath ergonomics.</p>
            </div>
          </div>

          {/* Card 3: Fiesta */}
          <div className="event-card reveal reveal-delay-2">
            <div className="event-img-wrapper">
              <span className="event-date-badge">22 OCT</span>
              <img src="/images/event_fiesta.png" alt="Grand outdoor musical festival" className="event-img" />
            </div>
            <div className="event-info">
              <h3 className="event-title">CMA Music Fiesta</h3>
              <p className="event-desc">A grand musical carnival celebrating fusion, folk, and classical genres, featuring student collaborations and food zones.</p>
            </div>
          </div>
        </div>

        <button onClick={() => showToast("Displaying all events... Registration is currently open!")} className="btn btn-outline">
          View All Events
        </button>
      </section>

      {/* Contact / Admissions Section */}
      <section id="contact" className="contact-section">
        {/* Transparent Violin Watermark */}
        <svg className="violin-watermark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M12 2v20M9 8c0-2.5 1.5-4 3-4s3 1.5 3 4M9 16c0 2.5 1.5 4 3 4s3-1.5 3-4" />
        </svg>

        <div className="contact-container">
          {/* Left Side Info */}
          <div className="contact-left reveal">
            <span className="section-label">Admissions</span>
            <h2 className="section-title">Begin Your Musical Journey With CMA</h2>
            <p className="hero-subheading" style={{ margin: '0' }}>
              Whether you are an aspiring vocalist wishing to refine your classical sur, a hobbyist desiring to play chords on guitar, or a parent supporting a musical toddler, we are here to guide you.
            </p>

            <div className="contact-info-list">
              <a href="https://wa.me/917738863965" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} className="contact-info-item">
                <div className="contact-icon-box">
                  <MessageSquare size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>WhatsApp Chat</h4>
                  <p>+91 7738863965</p>
                </div>
              </a>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Cals</h4>
                  <p>chinmaysmusicacademy0109@gmail.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Academy Location</h4>
                  <p>202, RH - 68, Vishambhar CHS, Sudama Nagar, MIDC, Dombivli East 421203</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="contact-right reveal reveal-delay-2">
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input
                  type="tel"
                  id="contact-phone"
                  className="form-control"
                  placeholder="10 digit mobile number"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-course">Course Interested In</label>
                <select
                  id="contact-course"
                  className="form-control"
                  value={contactForm.course}
                  onChange={(e) => setContactForm({ ...contactForm, course: e.target.value })}
                >
                  <option value="Hindustani Classical">Hindustani Classical</option>
                  <option value="Contemporary Music">Contemporary Music</option>
                  <option value="Vocal Training">Vocal Training</option>
                  <option value="Kids & Adults">Kids & Adults (Age-inclusive)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  className="form-control"
                  placeholder="Tell us about your musical experience and learning goals..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-gold" style={{ marginTop: '10px' }}>
                Submit Enquiry <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="footer">
        <div className="footer-top">
          {/* Col 1 */}
          <div className="footer-col">
            <a href="#home" className="footer-logo">
              <img src="/images/logo.png" alt="Chinmay's Music Academy Logo" style={{ height: '90px', width: 'auto', borderRadius: '50%', marginRight: '8px', verticalAlign: 'middle', border: '1px solid var(--accent-gold)' }} />
            </a>
            <p className="footer-desc">
              Chinmay’s Music Academy is a premier music institution nurturing voices, developing performance confidence, and inspiring artistic excellence.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About CMA</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h3>Our Courses</h3>
            <ul className="footer-links">
              <li><a href="#courses" onClick={() => openDemoModal('Hindustani Classical')}>Hindustani Classical</a></li>
              <li><a href="#courses" onClick={() => openDemoModal('Contemporary Music')}>Contemporary Music</a></li>
              <li><a href="#courses" onClick={() => openDemoModal('Vocal Training')}>Vocal Training</a></li>
              <li><a href="#courses" onClick={() => openDemoModal('Kids & Adults')}>Kids & Adults Course</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col">
            <h3>Contact Information</h3>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>+91 7738863965</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <span>chinmaysmusicacademy0109@gmail.com</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>202, RH - 68, Vishambhar CHS, Sudama Nagar, MIDC, Dombivli East 421203</span>

              </div>
            </div>
            <div className="footer-col footer-map-col">
              <div className="footer-map-container">
                <iframe
                  title="Chinmay's Music Academy Location Map"
                  src="https://maps.google.com/maps?q=19.2048174,73.1046268&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Chinmay’s Music Academy. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#about" onClick={(e) => { e.preventDefault(); showToast("Privacy policy document updated for the current batch."); }}>Privacy Policy</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); showToast("Terms of service updated for the academic year 2026."); }}>Terms of Service</a>
            <a href="#contact">Admissions FAQ</a>
          </div>
        </div>
      </footer>

      {/* Book Demo Class Modal Overlay */}
      <div className={`modal-overlay ${demoModalOpen ? 'open' : ''}`} onClick={() => setDemoModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={() => setDemoModalOpen(false)} aria-label="Close modal">
            <X size={24} />
          </button>
          <h3 className="modal-title">Book A Demo Class</h3>
          <p className="modal-subtitle">
            Experience our coaching first-hand. Fill out the form and our admissions team will schedule a 30-minute 1-on-1 session.
          </p>

          <form onSubmit={handleDemoSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="demo-name">Your Name</label>
              <input
                type="text"
                id="demo-name"
                className="form-control"
                placeholder="Enter your name"
                value={demoForm.name}
                onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="demo-email">Email Address</label>
              <input
                type="email"
                id="demo-email"
                className="form-control"
                placeholder="name@example.com"
                value={demoForm.email}
                onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="demo-phone">Phone Number</label>
              <input
                type="tel"
                id="demo-phone"
                className="form-control"
                placeholder="10 digit mobile number"
                value={demoForm.phone}
                onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="demo-course">Select Program</label>
              <select
                id="demo-course"
                className="form-control"
                value={demoForm.course}
                onChange={(e) => setDemoForm({ ...demoForm, course: e.target.value })}
              >
                <option value="Hindustani Classical">Hindustani Classical</option>
                <option value="Contemporary Music">Natyasangeet</option>
                <option value="Light/Bollywood Music">Vocal Training</option>
                <option value="Kids & Adults">Kids & Adults</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="demo-date">Preferred Date</label>
              <input
                type="date"
                id="demo-date"
                className="form-control"
                value={demoForm.date}
                onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-gold" style={{ marginTop: '10px', width: '100%' }}>
              Confirm Demo Booking <CheckCircle size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Gallery Lightbox Overlay */}
      <div className={`lightbox-overlay ${lightboxImage ? 'open' : ''}`} onClick={() => setLightboxImage(null)}>
        {lightboxImage && (
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImage(null)} aria-label="Close lightbox">
              <X size={30} />
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.title} className="lightbox-img" />
            <p className="lightbox-caption">
              <span className="text-gold">[{lightboxImage.tag}]</span> {lightboxImage.title}
            </p>
          </div>
        )}
      </div>

      {/* Success Toast Notification */}
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <CheckCircle size={20} />
        <span>{toast.message}</span>
      </div>
    </>
  );
}

export default App;
