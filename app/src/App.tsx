import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu,
  X,
  Palette,
  Gem,
  Scissors,
  Star
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const hairRef = useRef<HTMLDivElement>(null);
  const nailsRef = useRef<HTMLDivElement>(null);
  const makeupRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // CACHE BUSTING: Upgraded to ?v=3 to force a hard reset on all devices
  const portfolioData = [
    { id: 1, src: '/images/portfolio_event1.jpg?v=3', category: 'Events', aspect: 'aspect-[3/4]', offset: 'mt-0' },
    { id: 2, src: '/images/portfolio_event2.jpg?v=3', category: 'Events', aspect: 'aspect-square', offset: 'mt-0 lg:mt-8' },
    { id: 3, src: '/images/portfolio_event3.jpg?v=3', category: 'Events', aspect: 'aspect-[4/5]', offset: 'mt-0 lg:mt-16' },
    { id: 4, src: '/images/portfolio_hair1_new.jpg?v=3', category: 'Hair', aspect: 'aspect-[4/5]', offset: 'mt-0' },
    { id: 5, src: '/images/portfolio_hair2_new.jpg?v=3', category: 'Hair', aspect: 'aspect-square', offset: 'mt-0 lg:mt-12' },
    { id: 6, src: '/images/portfolio_hair3.jpg?v=3', category: 'Hair', aspect: 'aspect-[3/4]', offset: 'mt-0 lg:mt-8' },
    { id: 7, src: '/images/portfolio_makeup1.jpg?v=3', category: 'Makeup', aspect: 'aspect-[3/4]', offset: 'mt-0' },
    { id: 8, src: '/images/portfolio_makeup2.jpg?v=3', category: 'Makeup', aspect: 'aspect-square', offset: 'mt-0 lg:mt-8' },
    { id: 9, src: '/images/portfolio_nails1.jpg?v=3', category: 'Nails', aspect: 'aspect-square', offset: 'mt-0 lg:mt-16' },
    { id: 10, src: '/images/portfolio_nails2.jpg?v=3', category: 'Nails', aspect: 'aspect-[4/5]', offset: 'mt-0 lg:mt-8' },
  ];

  const filteredPortfolio = activeFilter === 'All' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-bg', 
        { scale: 1.1, filter: 'blur(10px)' }, 
        { scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }
      );
      
      gsap.fromTo('.hero-headline', 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.4 }
      );
      
      gsap.fromTo('.hero-subheadline', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
      );
      
      gsap.fromTo('.hero-cta', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.9 }
      );

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
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.15,
              scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' }
            }
          );
        }
      });

      gsap.fromTo('.training-reveal', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: trainingRef.current, start: 'top 80%' } });
      gsap.fromTo('.contact-reveal', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out', scrollTrigger: { trigger: contactRef.current, start: 'top 80%' } });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
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
    <div className="relative bg-ivory font-sans selection:bg-champagne/30 selection:text-charcoal noise-overlay">
      
      {/* Upgraded Dynamic Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-ivory shadow-sm border-b border-charcoal/5' 
          : 'py-6 bg-transparent'
      }`}>
        
        {/* PURE CODE LOGO - Dynamic Colors (Champagne on Scroll) */}
        <div 
          className="cursor-pointer flex flex-col items-center justify-center transition-transform duration-500 hover:scale-105 group"
          onClick={() => scrollToSection(heroRef)}
        >
          <div className={`flex items-baseline drop-shadow-md transition-colors duration-500 z-10 ${
            isScrolled ? 'text-champagne group-hover:text-teal' : 'text-white group-hover:text-champagne'
          }`}>
            <span className="font-serif italic font-bold text-4xl md:text-5xl tracking-tighter">tv</span>
            <span className="font-display italic font-semibold text-5xl md:text-6xl -ml-1.5">D</span>
          </div>
          
          <div className={`flex flex-col items-center mt-[-6px] transition-colors duration-500 ${
            isScrolled ? 'text-champagne group-hover:text-teal' : 'text-white/95 group-hover:text-champagne'
          }`}>
            <span className="font-sans font-extrabold text-[12px] md:text-[14px] leading-[1.1] tracking-tight lowercase">
              tricia-val's
            </span>
            <span className="font-sans font-extrabold text-[12px] md:text-[14px] leading-[1.1] tracking-tight lowercase">
              dynasty
            </span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.ref)}
              className={`text-xs uppercase tracking-[0.15em] transition-colors relative group font-medium ${
                isScrolled ? 'text-charcoal/70 hover:text-charcoal' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                isScrolled ? 'bg-champagne' : 'bg-white'
              }`}></span>
            </button>
          ))}
          <button 
            onClick={() => scrollToSection(contactRef)}
            className={`text-xs uppercase tracking-widest py-3 px-8 transition-colors duration-500 rounded-full ${
              isScrolled 
                ? 'bg-charcoal text-white hover:bg-champagne hover:border-champagne' 
                : 'bg-white text-charcoal hover:bg-champagne hover:text-white'
            }`}
          >
            Book
          </button>
        </div>
        
        <button 
          className={`lg:hidden p-2 transition-colors duration-500 ${
            isScrolled ? 'text-charcoal' : 'text-white'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ivory/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.ref)}
              className="font-display text-4xl text-charcoal hover:text-champagne transition-colors font-light"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection(contactRef)}
            className="btn-editorial mt-8 py-4 px-12 text-sm bg-charcoal text-white rounded-full"
          >
            Book a session
          </button>
        </div>
      )}

      {/* Section 1: Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <img src="/images/hero_arch.jpg?v=3" alt="Editorial beauty" className="w-full h-full object-cover object-center scale-105 contrast-105 saturate-105" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/60 mix-blend-multiply" />
        </div>
        
        <div className="hero-content relative z-10 flex flex-col items-center justify-center text-white px-6 mt-16 w-full max-w-5xl mx-auto">
          <div className="relative text-center">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/90 mb-6 block drop-shadow-md font-semibold">
              Tricia-Val's Dynasty
            </span>
            <h1 className="hero-headline font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.1] tracking-tight text-white drop-shadow-2xl">
              Crafting the <span className="italic font-serif text-white">perfect vibe.</span>
            </h1>
          </div>
          
          <p className="hero-subheadline mt-8 md:mt-10 text-center max-w-md text-sm md:text-lg font-light tracking-[0.15em] leading-relaxed text-white/95 drop-shadow-xl italic font-serif">
            ...everything beauty and events
          </p>
          
          <div className="hero-cta mt-12">
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="btn-glass backdrop-blur-md bg-white/10 border border-white/30 text-white hover:bg-white hover:text-charcoal transition-all duration-500 py-4 px-10 text-xs uppercase tracking-[0.2em] rounded-full shadow-xl"
            >
              Book a session
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Services Overview */}
      <section ref={servicesRef} className="py-24 lg:py-40 bg-ivory relative z-10">
        <div className="px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="service-reveal flex flex-col items-center text-center mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-soft-gray mb-4">What We Offer</span>
            <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal">
              Our Services
            </h2>
            <div className="w-[1px] h-16 bg-champagne mt-8 opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="service-reveal lg:col-span-7 rounded-3xl overflow-hidden relative group">
              <img src="/images/event_balloon_arch.jpg?v=3" alt="Event Decoration" className="w-full h-full min-h-[400px] lg:min-h-[600px] object-cover contrast-105 saturate-105 transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 lg:p-12 text-white">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne mb-4 block">Featured</span>
                <h3 className="font-display text-3xl lg:text-4xl font-light mb-4">Event Decoration</h3>
                <p className="text-sm font-light tracking-wide text-white/80 max-w-md leading-relaxed">
                  Styling that sets the mood: balloons, backdrops, tablescapes.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
              {[
                { title: "Makeup & Gele", desc: "Bridal glam, editorial looks, traditional headwrap styling.", icon: Palette },
                { title: "Nail Art & Care", desc: "Gel, extensions, intricate art, manicures & pedicures.", icon: Gem },
                { title: "Hair, Wigs & Piercing", desc: "Installations, braiding, custom wigs, safe piercing.", icon: Scissors }
              ].map((service, idx) => (
                <div key={idx} className="service-reveal bg-white p-8 border border-charcoal/5 hover:border-champagne/40 transition-colors duration-500 flex gap-6 items-start group rounded-3xl">
                  <service.icon className="w-6 h-6 text-champagne/80 mt-1 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
                  <div>
                    <h4 className="font-display text-xl font-normal text-charcoal tracking-wide">{service.title}</h4>
                    <p className="text-sm text-soft-gray mt-3 font-light leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Event Styling */}
      <section ref={eventRef} className="py-32 lg:py-48 relative overflow-hidden flex items-center justify-center">
        <div className="event-reveal absolute inset-0">
          <img src="/images/event_balloon_arch.jpg?v=3" alt="Event styling" className="w-full h-full object-cover contrast-105 saturate-105 scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        
        <div className="relative z-10 px-6 text-center max-w-3xl mx-auto">
          <h2 className="event-reveal font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            Event styling that feels like a <i className="font-serif text-champagne">celebration.</i>
          </h2>
          <p className="event-reveal mt-8 text-sm md:text-base font-light tracking-wide text-white/80 leading-relaxed">
            From intimate dinners to milestone parties. We design backdrops, balloon features, and tablescapes that photograph beautifully.
          </p>
          <button 
            onClick={() => scrollToSection(contactRef)}
            className="event-reveal btn-glass backdrop-blur-md bg-white/10 border border-white/30 text-white hover:bg-white hover:text-charcoal transition-all duration-500 py-4 px-10 text-xs uppercase tracking-[0.2em] mt-10 rounded-full"
          >
            Plan your event
          </button>
        </div>
      </section>

      {/* Section 4 & 5 Combined: Hair & Nails */}
      <section ref={hairRef} className="py-24 lg:py-40 bg-ivory">
        <div className="px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-32">
            <div className="hair-reveal w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <img src="/images/hair_braids_new.jpg?v=3" alt="Hair styling" className="w-full h-full object-cover contrast-105 saturate-105 grayscale-[20%]" loading="lazy" />
              </div>
            </div>
            
            <div className="hair-reveal w-full lg:w-1/2 lg:pl-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-soft-gray mb-6 block">01 / Crown</span>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal leading-tight">
                Hair that changes <br/> the room.
              </h2>
              <p className="mt-8 text-soft-gray font-light leading-relaxed max-w-md">
                Installations, braids, custom wigs, and maintenance, styled to fit your face and your mood.
              </p>
              <button onClick={() => scrollToSection(contactRef)} className="mt-10 text-xs uppercase tracking-[0.2em] text-charcoal border-b border-charcoal pb-1 hover:text-champagne hover:border-champagne transition-colors">
                Book hair service
              </button>
            </div>
          </div>

          <div ref={nailsRef} className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
            <div className="nails-reveal w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <img src="/images/nails_art.jpg?v=3" alt="Nail art" className="w-full h-full object-cover contrast-105 saturate-105" loading="lazy" />
              </div>
            </div>
            
            <div className="nails-reveal w-full lg:w-1/2 lg:pr-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-soft-gray mb-6 block">02 / Detail</span>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal leading-tight">
                Nails as detailed <br/> as your plans.
              </h2>
              <p className="mt-8 text-soft-gray font-light leading-relaxed max-w-md">
                Gel, extensions, nail art, and full care, as well as manicures and pedicures that last.
              </p>
              <button onClick={() => scrollToSection(contactRef)} className="mt-10 text-xs uppercase tracking-[0.2em] text-charcoal border-b border-charcoal pb-1 hover:text-champagne hover:border-champagne transition-colors">
                Book nail appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Makeup */}
      <section ref={makeupRef} className="py-32 lg:py-48 relative overflow-hidden flex items-center justify-center">
        <div className="makeup-reveal absolute inset-0">
          <img src="/images/makeup_portrait.jpg?v=3" alt="Makeup styling" className="w-full h-full object-cover contrast-105 saturate-105 scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        
        <div className="relative z-10 px-6 text-center max-w-3xl mx-auto">
          <h2 className="makeup-reveal font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            Makeup and gele, <br/> <i className="font-serif text-champagne">done your way.</i>
          </h2>
          <p className="makeup-reveal mt-8 text-sm md:text-base font-light tracking-wide text-white/80 leading-relaxed">
            Bridal glam, editorial looks, and traditional headwrap styling, calm, precise, and on time.
          </p>
          <button 
            onClick={() => scrollToSection(contactRef)}
            className="makeup-reveal btn-glass backdrop-blur-md bg-white/10 border border-white/30 text-white hover:bg-white hover:text-charcoal transition-all duration-500 py-4 px-10 text-xs uppercase tracking-[0.2em] mt-10 rounded-full"
          >
            Book makeup session
          </button>
        </div>
      </section>

      {/* Section 7: Training Academy */}
      <section ref={trainingRef} className="py-24 lg:py-32 bg-[#F5F3EF]">
        <div className="px-6 lg:px-16 max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
            <div className="training-reveal w-full lg:w-1/2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-soft-gray mb-4 block">Academy</span>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal mb-6">Learn the craft.</h2>
              <p className="text-soft-gray font-light max-w-xl leading-relaxed">
                Small-group training with real-world practice, leave confident and portfolio-ready.
              </p>
              
              <div className="flex flex-col gap-4 mt-8 font-light text-sm text-charcoal">
                <span className="flex items-center gap-3"><Star className="w-4 h-4 text-champagne" /> Hands-on kits included</span>
                <span className="flex items-center gap-3"><Star className="w-4 h-4 text-champagne" /> Live models & practice sessions</span>
                <span className="flex items-center gap-3"><Star className="w-4 h-4 text-champagne" /> Certificate of completion</span>
              </div>
              
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="mt-10 btn-editorial py-4 px-10 text-xs uppercase tracking-[0.2em] rounded-full"
              >
                Join the waitlist
              </button>
            </div>
            
            <div className="training-reveal w-full lg:w-1/2 relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-lg border border-charcoal/5">
                <img src="/images/training_class.jpg?v=3" alt="Beauty Training Class" className="w-full h-full object-cover contrast-105 saturate-105" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-champagne/10 rounded-full blur-2xl z-[-1]"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { title: "Makeup & Gele Mastery", time: "16-week intensive", desc: "Master bridal glam, editorial looks, and traditional headwrap styling.", img: "/images/training_gele.jpg?v=3" },
              { title: "Nail Technology", time: "24-week certification", desc: "Gel, acrylics, nail art, and business skills for aspiring technicians.", img: "/images/training_nails.jpg?v=3" },
              { title: "Hair Styling & Wigs", time: "12-week workshop", desc: "Installations, braiding, custom wig making, and styling.", img: "/images/training_hair.jpg?v=3" }
            ].map((course, idx) => (
              <div key={idx} className="training-reveal bg-white border border-charcoal/10 hover:border-champagne shadow-sm cursor-pointer group rounded-3xl overflow-hidden flex flex-col transition-colors duration-500">
                <div className="h-56 w-full overflow-hidden bg-gray-100">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover contrast-105 saturate-105 transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                </div>
                
                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne">{course.time}</span>
                  <h4 className="font-display text-2xl font-normal text-charcoal mt-4 mb-4">{course.title}</h4>
                  <p className="text-sm text-soft-gray font-light mb-8 leading-relaxed flex-1">{course.desc}</p>
                  <div className="w-8 h-[1px] bg-charcoal/20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Portfolio */}
      <section ref={portfolioRef} className="py-24 lg:py-40 bg-ivory min-h-screen">
        <div className="px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="portfolio-reveal flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-soft-gray mb-4 block">Gallery</span>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal">
                Recent work
              </h2>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 md:mt-0 font-mono text-[10px] uppercase tracking-[0.2em]">
              {['All', 'Events', 'Hair', 'Nails', 'Makeup'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`transition-colors pb-1 ${
                    activeFilter === filter 
                      ? 'text-charcoal border-b border-charcoal' 
                      : 'text-soft-gray hover:text-charcoal'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500">
            {filteredPortfolio.map((item) => (
                <div key={item.id} className={`portfolio-reveal ${item.aspect} overflow-hidden group bg-gray-100 ${item.offset} animate-in fade-in zoom-in duration-500 rounded-3xl`}>
                  <img src={item.src} alt={item.category} className="w-full h-full object-cover contrast-105 saturate-105 transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                </div>
            ))}
          </div>
          
          <div className="portfolio-reveal mt-20 text-center">
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="text-xs uppercase tracking-[0.2em] text-charcoal border-b border-charcoal pb-1 hover:text-champagne hover:border-champagne transition-colors"
            >
              Request full portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Section 9: Contact */}
      <section ref={contactRef} className="py-24 lg:py-40 bg-[#F5F3EF]">
        <div className="px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            <div className="contact-reveal w-full lg:w-5/12">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-soft-gray mb-4 block">Get in Touch</span>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal leading-tight">
                Let's create <br/><i className="font-serif text-champagne">something beautiful.</i>
              </h2>
              <p className="mt-8 text-soft-gray font-light leading-relaxed">
                Tell us what you need. We'll confirm your date and send a prep guide.
              </p>
              
              <div className="mt-16 space-y-8 font-light text-sm tracking-wide">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft-gray mb-2">Email</p>
                  <p className="text-charcoal">triciaval07@gmail.com</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft-gray mb-2">Phone</p>
                  <p className="text-charcoal">+234 816 698 3061</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft-gray mb-2">Location</p>
                  <p className="text-charcoal max-w-[200px] leading-relaxed">101 Ikot Udoro, off Ikot Ekpene Road, Akwa Ibom, Nigeria</p>
                </div>
              </div>
            </div>
            
            <div className="contact-reveal w-full lg:w-7/12">
              <div className="bg-ivory p-8 lg:p-12 border border-charcoal/10 rounded-3xl">
                <h3 className="font-display text-2xl font-light text-charcoal mb-8">Request a booking or training slot</h3>
                <form 
                  action="https://api.web3forms.com/submit" 
                  method="POST" 
                  className="space-y-8"
                >
                  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="input-group">
                      <input type="text" name="Name" required placeholder="Your name" className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors" />
                    </div>
                    <div className="input-group">
                      <input type="tel" name="Phone" required placeholder="Your phone number" className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors" />
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <input type="email" name="Email" required placeholder="your@email.com" className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                  
                  <div className="input-group">
                    <select name="Service Requested" required className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors text-charcoal appearance-none rounded-none">
                      <option value="" disabled selected className="text-soft-gray/50">Select a service</option>
                      <option value="Event Decoration">Event Decoration</option>
                      <option value="Makeup & Gele">Makeup & Gele</option>
                      <option value="Nail Art & Care">Nail Art & Care</option>
                      <option value="Hair & Wigs">Hair & Wigs</option>
                      <option value="Piercing">Piercing</option>
                      <option value="Training">Training</option>
                    </select>
                  </div>
                  
                  <div className="input-group">
                    <textarea name="Message" rows={4} required placeholder="Tell us about your event or service needs..." className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors resize-none mt-4"></textarea>
                  </div>
                  
                  <button type="submit" className="btn-editorial w-full py-4 text-xs uppercase tracking-[0.2em] mt-4 rounded-full bg-charcoal text-white">
                    Request booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-32 border-t border-charcoal/10 pt-12 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal">
            Tricia Val's Dynasty
          </div>
          <p className="text-xs text-soft-gray font-light">Beauty, events & style — curated for you.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-soft-gray">
            © 2026 All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;