import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  Heart, 
  Star, 
  ArrowDown, 
  Calendar, 
  Scissors, 
  Palette, 
  Gem,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const hairRef = useRef<HTMLDivElement>(null);
  const nailsRef = useRef<HTMLDivElement>(null);
  const makeupRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Optimized scroll animations
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation - simplified
      gsap.fromTo('.hero-bg', 
        { scale: 1.05, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
      );
      
      gsap.fromTo('.hero-headline', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.3 }
      );
      
      gsap.fromTo('.hero-subheadline', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );
      
      gsap.fromTo('.hero-cta', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.7 }
      );

      // Section reveal animations - using Intersection Observer-like behavior
      const sections = [
        { ref: servicesRef, class: '.service-reveal' },
        { ref: eventRef, class: '.event-reveal' },
        { ref: hairRef, class: '.hair-reveal' },
        { ref: nailsRef, class: '.nails-reveal' },
        { ref: makeupRef, class: '.makeup-reveal' },
      ];

      sections.forEach(({ ref, class: className }) => {
        if (ref.current) {
          gsap.fromTo(className,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });

      // Training section
      gsap.fromTo('.training-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: trainingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Portfolio section
      gsap.fromTo('.portfolio-reveal',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Contact section
      gsap.fromTo('.contact-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Services', ref: servicesRef },
    { label: 'Portfolio', ref: portfolioRef },
    { label: 'Training', ref: trainingRef },
    { label: 'Contact', ref: contactRef },
  ];

  return (
    <div className="relative bg-ivory">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-[6vw] py-4 lg:py-6">
        <div 
          className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal cursor-pointer"
          onClick={() => scrollToSection(heroRef)}
        >
          Tricia Val's
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.ref)}
              className="text-sm text-charcoal hover:text-champagne transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection(contactRef)}
            className="btn-outline text-sm py-2 px-6"
          >
            Book
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ivory/98 backdrop-blur-lg lg:hidden flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.ref)}
              className="text-2xl font-display text-charcoal hover:text-champagne transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection(contactRef)}
            className="btn-primary mt-4"
          >
            Book Now
          </button>
        </div>
      )}

      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-base min-h-screen flex items-center justify-center relative">
        <div className="hero-bg absolute inset-0">
          <img 
            src="/images/hero_arch.jpg" 
            alt="Event decoration" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>
        
        <div className="hero-content relative z-10 flex flex-col items-center justify-center text-white px-6 text-center">
          <div className="relative">
            <Sparkles className="absolute -top-6 -left-8 w-5 h-5 text-champagne animate-sparkle" />
            <Sparkles className="absolute -top-3 -right-10 w-4 h-4 text-champagne animate-sparkle" style={{ animationDelay: '0.5s' }} />
            
            <h1 className="hero-headline font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight tracking-tight text-balance">
              Beauty, Events & Style.
            </h1>
            
            <svg className="mx-auto mt-4 w-48 md:w-64 lg:w-80 h-3" viewBox="0 0 300 10">
              <path 
                d="M2 6 Q 75 2, 150 6 T 298 6" 
                stroke="#D4AF37" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <p className="hero-subheadline mt-8 text-center max-w-xl text-base md:text-lg leading-relaxed text-white/90">
            ...your go to for all things beauty
          </p>
          
          <div className="hero-cta mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="btn-primary"
            >
              Book a session
            </button>
          </div>
        </div>
    
      </section>

      {/* Section 2: Services Overview */}
      <section ref={servicesRef} className="section-base py-20 lg:py-32 bg-ivory">
        <div className="px-6 lg:px-[6vw]">
          <div className="service-reveal text-center mb-12 lg:mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal mb-3 block">What We Offer</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal">
              Our Services
            </h2>
            <svg className="mx-auto mt-4 w-32 md:w-48 h-3" viewBox="0 0 200 10">
              <path 
                d="M2 6 Q 50 2, 100 6 T 198 6" 
                stroke="#D4AF37" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Featured Card */}
            <div className="service-reveal lg:row-span-2 rounded-3xl overflow-hidden shadow-card relative group">
              <img 
                src="/images/event_balloon_arch.jpg" 
                alt="Event Decoration" 
                className="w-full h-full min-h-[300px] lg:min-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-champagne mb-2 block">Featured</span>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-2">Event Decoration</h3>
                <p className="text-sm text-white/80">Styling that sets the mood: balloons, backdrops, tablescapes.</p>
              </div>
            </div>
            
            {/* Service Cards */}
            <div className="service-reveal rounded-3xl bg-white shadow-card p-5 lg:p-6 flex items-center gap-4 lg:gap-5 service-card">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Palette className="w-5 h-5 lg:w-6 lg:h-6 text-teal" />
              </div>
              <div>
                <h4 className="font-display text-lg lg:text-xl font-semibold text-charcoal">Makeup & Gele</h4>
                <p className="text-sm text-soft-gray mt-1">Bridal glam, editorial looks, traditional headwrap styling.</p>
              </div>
            </div>
            
            <div className="service-reveal rounded-3xl bg-white shadow-card p-5 lg:p-6 flex items-center gap-4 lg:gap-5 service-card">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Gem className="w-5 h-5 lg:w-6 lg:h-6 text-teal" />
              </div>
              <div>
                <h4 className="font-display text-lg lg:text-xl font-semibold text-charcoal">Nail Art & Care</h4>
                <p className="text-sm text-soft-gray mt-1">Gel, extensions, intricate art, manicures & pedicures.</p>
              </div>
            </div>
            
            <div className="service-reveal rounded-3xl bg-white shadow-card p-5 lg:p-6 flex items-center gap-4 lg:gap-5 service-card">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Scissors className="w-5 h-5 lg:w-6 lg:h-6 text-teal" />
              </div>
              <div>
                <h4 className="font-display text-lg lg:text-xl font-semibold text-charcoal">Hair, Wigs & Piercing</h4>
                <p className="text-sm text-soft-gray mt-1">Installations, braiding, custom wigs, safe piercing.</p>
              </div>
            </div>
          </div>
          
          <div className="service-reveal mt-8 text-center">
            <p className="font-mono text-xs text-soft-gray">
              Training available — <button onClick={() => scrollToSection(trainingRef)} className="text-teal hover:underline">ask about our next cohort</button>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Event Styling */}
      <section ref={eventRef} className="section-base py-20 lg:py-32 relative">
        <div className="event-reveal absolute inset-0">
          <img 
            src="/images/event_balloon_arch.jpg" 
            alt="Event styling" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        
        <div className="relative z-10 px-6 lg:px-[8vw] py-12 lg:py-0">
          <div className="max-w-xl">
            <Sparkles className="event-reveal w-5 h-5 lg:w-6 lg:h-6 text-champagne mb-4 animate-sparkle" />
            
            <h2 className="event-reveal font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Event styling that feels like a celebration.
            </h2>
            
            <svg className="event-reveal mt-4 w-40 md:w-56 h-3" viewBox="0 0 250 10">
              <path 
                d="M2 6 Q 62 2, 125 6 T 248 6" 
                stroke="#D4AF37" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            
            <p className="event-reveal mt-6 text-white/80 leading-relaxed">
              From intimate dinners to milestone parties. We design backdrops, balloon features, and tablescapes that photograph beautifully.
            </p>
            
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="event-reveal btn-primary mt-8"
            >
              Plan your event
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Hair & Wigs */}
      <section ref={hairRef} className="section-base py-20 lg:py-32 bg-ivory">
        <div className="px-6 lg:px-[6vw]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Image */}
            <div className="hair-reveal w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-card">
              <img 
                src="/images/hair_braids.jpg" 
                alt="Hair styling" 
                className="w-full h-[300px] lg:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Text */}
            <div className="hair-reveal w-full lg:w-1/2 lg:pl-8">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
                Hair that changes the room.
              </h2>
              
              <svg className="mt-4 w-32 md:w-40 h-3" viewBox="0 0 180 10">
                <path 
                  d="M2 6 Q 45 2, 90 6 T 178 6" 
                  stroke="#D4AF37" 
                  strokeWidth="2" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              
              <p className="mt-6 text-soft-gray leading-relaxed">
                Installations, braids, custom wigs, and maintenance, styled to fit your face and your mood.
              </p>
              
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="btn-primary mt-8"
              >
                Book hair service
              </button>
              
              <Heart className="mt-6 w-5 h-5 lg:w-6 lg:h-6 text-champagne animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Nail Art */}
      <section ref={nailsRef} className="section-base py-20 lg:py-32 bg-ivory">
        <div className="px-6 lg:px-[6vw]">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
            {/* Image */}
            <div className="nails-reveal w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-card">
              <img 
                src="/images/nails_art.jpg" 
                alt="Nail art" 
                className="w-full h-[300px] lg:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Text */}
            <div className="nails-reveal w-full lg:w-1/2 lg:pr-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-champagne animate-sparkle" />
                <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-champagne animate-sparkle" style={{ animationDelay: '0.3s' }} />
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
                Nails as detailed as your plans.
              </h2>
              
              <svg className="mt-4 w-36 md:w-48 h-3" viewBox="0 0 220 10">
                <path 
                  d="M2 6 Q 55 2, 110 6 T 218 6" 
                  stroke="#D4AF37" 
                  strokeWidth="2" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              
              <p className="mt-6 text-soft-gray leading-relaxed">
                Gel, extensions, nail art, and full care, as well asmanicures and pedicures that last.
              </p>
              
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="btn-primary mt-8"
              >
                Book nail appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Makeup & Gele */}
      <section ref={makeupRef} className="section-base py-20 lg:py-32 relative">
        <div className="makeup-reveal absolute inset-0">
          <img 
            src="/images/makeup_portrait.jpg" 
            alt="Makeup and gele" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        
        <div className="relative z-10 px-6 lg:px-[8vw] py-12 lg:py-0">
          <div className="max-w-xl">
            <div className="makeup-reveal flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-champagne animate-sparkle" />
            </div>
            
            <h2 className="makeup-reveal font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Makeup and gele, done your way.
            </h2>
            
            <svg className="makeup-reveal mt-4 w-44 md:w-56 h-3" viewBox="0 0 280 10">
              <path 
                d="M2 6 Q 70 2, 140 6 T 278 6" 
                stroke="#D4AF37" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            
            <p className="makeup-reveal mt-6 text-white/80 leading-relaxed">
              Bridal glam, editorial looks, and traditional headwrap styling, calm, precise, and on time.
            </p>
            
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="makeup-reveal btn-primary mt-8"
            >
              Book makeup session
            </button>
          </div>
        </div>
      </section>

      {/* Section 7: Training Academy */}
      <section ref={trainingRef} className="section-base py-20 lg:py-32 bg-ivory">
        <div className="px-6 lg:px-[8vw]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-[45%]">
              <div className="training-reveal">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal mb-3 block">Academy</span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
                  Learn the craft.
                </h2>
                
                <svg className="mt-4 w-36 md:w-44 h-3" viewBox="0 0 200 10">
                  <path 
                    d="M2 6 Q 50 2, 100 6 T 198 6" 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                
                <p className="mt-6 text-soft-gray leading-relaxed">
                  Small-group training with real-world practice, leave confident and portfolio-ready.
                </p>
                
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-charcoal">
                    <Star className="w-4 h-4 text-champagne" />
                    Hands-on kits included
                  </li>
                  <li className="flex items-center gap-3 text-charcoal">
                    <Star className="w-4 h-4 text-champagne" />
                    Live models / practice sessions
                  </li>
                  <li className="flex items-center gap-3 text-charcoal">
                    <Star className="w-4 h-4 text-champagne" />
                    Certificate of completion
                  </li>
                </ul>
                
                <button 
                  onClick={() => scrollToSection(contactRef)}
                  className="btn-primary mt-8"
                >
                  Join the waitlist
                </button>
              </div>
              
              <div className="training-reveal mt-8">
                <img 
                  src="/images/training_class.jpg" 
                  alt="Training class" 
                  className="w-full h-[250px] lg:h-[300px] rounded-3xl object-cover shadow-card"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Right Cards */}
            <div className="w-full lg:w-[55%] flex flex-col gap-5 lg:gap-6">
              <div className="training-reveal rounded-3xl bg-white shadow-card p-5 lg:p-6 training-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal">12-week intensive</span>
                    <h4 className="font-display text-xl lg:text-2xl font-semibold text-charcoal mt-2">Makeup and Gele Mastery</h4>
                    <p className="text-soft-gray mt-2 text-sm">Master bridal glam, editorial looks, and traditional headwrap styling.</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-4 h-4 lg:w-5 lg:h-5 text-teal" />
                  </div>
                </div>
              </div>
              
              <div className="training-reveal rounded-3xl bg-white shadow-card p-5 lg:p-6 training-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal">6-week certification</span>
                    <h4 className="font-display text-xl lg:text-2xl font-semibold text-charcoal mt-2">Nail Technology</h4>
                    <p className="text-soft-gray mt-2 text-sm">Gel, acrylics, nail art, and business skills for aspiring technicians.</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Gem className="w-4 h-4 lg:w-5 lg:h-5 text-teal" />
                  </div>
                </div>
              </div>
              
              <div className="training-reveal rounded-3xl bg-white shadow-card p-5 lg:p-6 border-2 border-champagne/20 training-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal">2-week workshop</span>
                    <h4 className="font-display text-xl lg:text-2xl font-semibold text-charcoal mt-2">Event Styling Basics</h4>
                    <p className="text-soft-gray mt-2 text-sm">Learn balloon design, tablescapes, and backdrop creation.</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-teal" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Portfolio */}
      <section ref={portfolioRef} className="section-base py-20 lg:py-32 bg-ivory">
        <div className="px-6 lg:px-[8vw]">
          <div className="portfolio-reveal flex flex-col md:flex-row md:items-end md:justify-between mb-10 lg:mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal mb-3 block">Gallery</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal">
                Recent work
              </h2>
              <svg className="mt-3 w-28 md:w-36 h-3" viewBox="0 0 160 10">
                <path 
                  d="M2 6 Q 40 2, 80 6 T 158 6" 
                  stroke="#D4AF37" 
                  strokeWidth="2" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button className="px-4 py-2 rounded-full bg-champagne text-white text-sm">All</button>
              <button className="px-4 py-2 rounded-full bg-white text-charcoal text-sm hover:bg-champagne/10 transition-colors shadow-sm">Events</button>
              <button className="px-4 py-2 rounded-full bg-white text-charcoal text-sm hover:bg-champagne/10 transition-colors shadow-sm">Hair</button>
              <button className="px-4 py-2 rounded-full bg-white text-charcoal text-sm hover:bg-champagne/10 transition-colors shadow-sm">Nails</button>
              <button className="px-4 py-2 rounded-full bg-white text-charcoal text-sm hover:bg-champagne/10 transition-colors shadow-sm">Makeup</button>
            </div>
          </div>
          
          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            <div className="portfolio-reveal rounded-3xl overflow-hidden shadow-card portfolio-item">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/portfolio_event1.jpg" 
                  alt="Event decoration" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="portfolio-reveal rounded-3xl overflow-hidden shadow-card portfolio-item">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/portfolio_hair1.jpg" 
                  alt="Hair styling" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="portfolio-reveal rounded-3xl overflow-hidden shadow-card portfolio-item">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="/images/portfolio_nails1.jpg" 
                  alt="Nail art" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="portfolio-reveal rounded-3xl overflow-hidden shadow-card portfolio-item">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/portfolio_makeup1.jpg" 
                  alt="Makeup and gele" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="portfolio-reveal rounded-3xl overflow-hidden shadow-card portfolio-item">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/portfolio_event2.jpg" 
                  alt="Event styling" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="portfolio-reveal rounded-3xl overflow-hidden shadow-card portfolio-item">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/portfolio_hair2.jpg" 
                  alt="Hair installation" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="portfolio-reveal rounded-3xl overflow-hidden shadow-card portfolio-item">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/portfolio_event3.jpg" 
                  alt="Bridal shower" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="portfolio-reveal rounded-3xl overflow-hidden shadow-card portfolio-item">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/portfolio_makeup2.jpg" 
                  alt="Makeup application" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          <div className="portfolio-reveal mt-10 text-center">
            <button className="btn-outline inline-flex items-center gap-2">
              Request full portfolio <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 9: Contact / Booking */}
      <section ref={contactRef} className="section-base py-20 lg:py-32 bg-gradient-to-br from-teal-50 to-ivory">
        <div className="px-6 lg:px-[8vw]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="contact-reveal w-full lg:w-[45%]">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal mb-3 block">Get in Touch</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
                Let's create something beautiful.
              </h2>
              
              <svg className="mt-4 w-40 md:w-52 h-3" viewBox="0 0 240 10">
                <path 
                  d="M2 6 Q 60 2, 120 6 T 238 6" 
                  stroke="#D4AF37" 
                  strokeWidth="2" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              
              <p className="mt-6 text-soft-gray leading-relaxed">
                Tell us what you need. We'll confirm your date and send a prep guide.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Mail className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-soft-gray">Email</p>
                    <p className="text-charcoal">triciaval07@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Phone className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-soft-gray">Phone</p>
                    <p className="text-charcoal">+234 816 698 3061</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-soft-gray">Location</p>
                    <p className="text-charcoal">101 Ikot Udoro, off Ikot Ekpene Road, Akwa Ibom, Nigeria</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <a href="#" className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-champagne hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-champagne hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Right Form Card */}
            <div className="contact-reveal w-full lg:w-[55%]">
              <div className="bg-white rounded-3xl shadow-card p-6 lg:p-8 relative">
                <Sparkles className="absolute -top-3 -right-3 w-5 h-5 lg:w-6 lg:h-6 text-champagne animate-sparkle" />
                <Heart className="absolute -bottom-3 -left-3 w-5 h-5 lg:w-6 lg:h-6 text-champagne animate-float" />
                
                <h3 className="font-display text-xl lg:text-2xl font-semibold text-charcoal mb-6">Request a booking or training slot</h3>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs uppercase tracking-[0.18em] text-soft-gray mb-2 block">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs uppercase tracking-[0.18em] text-soft-gray mb-2 block">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-sm"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-mono text-xs uppercase tracking-[0.18em] text-soft-gray mb-2 block">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="font-mono text-xs uppercase tracking-[0.18em] text-soft-gray mb-2 block">Service</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all text-sm bg-white">
                      <option>Select a service</option>
                      <option>Event Decoration</option>
                      <option>Makeup & Gele</option>
                      <option>Nail Art & Care</option>
                      <option>Hair & Wigs</option>
                      <option>Piercing</option>
                      <option>Training</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="font-mono text-xs uppercase tracking-[0.18em] text-soft-gray mb-2 block">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-champagne focus:ring-2 focus:ring-champagne/20 outline-none transition-all resize-none text-sm"
                      placeholder="Tell us about your event or service needs..."
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary w-full">
                    Request booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 lg:mt-24 px-6 lg:px-[8vw] pt-8 border-t border-charcoal/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal">
              Tricia Val's Dynasty
            </div>
            <p className="text-sm text-soft-gray text-center">
              Beauty, events & style — curated for you.
            </p>
            <p className="font-mono text-xs text-soft-gray">
              © 2026 All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
