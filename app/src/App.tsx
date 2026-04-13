import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  Heart, 
  Star, 
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

  // Luxurious, slow-eased animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero entrance - slow zoom and soft fade
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

      // Section reveal animations - silky and deliberate
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
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'expo.out',
              stagger: 0.15,
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });

      // Training section
      gsap.fromTo('.training-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: trainingRef.current, start: 'top 80%' }
        }
      );

      // Portfolio section
      gsap.fromTo('.portfolio-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: portfolioRef.current, start: 'top 80%' }
        }
      );

      // Contact section
      gsap.fromTo('.contact-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: contactRef.current, start: 'top 80%' }
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
    <div className="relative bg-ivory font-sans selection:bg-champagne/30 selection:text-charcoal noise-overlay">
      {/* Navigation - Ultra minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 py-6 bg-ivory/80 backdrop-blur-md border-b border-charcoal/5 transition-all duration-300">
        <div 
          className="font-mono text-xs uppercase tracking-[0.25em] text-charcoal cursor-pointer hover:text-champagne transition-colors"
          onClick={() => scrollToSection(heroRef)}
        >
          Tricia Val's
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.ref)}
              className="text-xs uppercase tracking-[0.15em] text-charcoal/70 hover:text-charcoal transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <button 
            onClick={() => scrollToSection(contactRef)}
            className="btn-editorial text-xs uppercase tracking-widest py-3 px-8"
          >
            Book
          </button>
        </div>
        
        <button 
          className="lg:hidden p-2 text-charcoal"
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
            className="btn-editorial mt-8 py-4 px-12 text-sm"
          >
            Book Now
          </button>
        </div>
      )}

      {/* Section 1: Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <img 
            src="/images/hero_arch.jpg" 
            alt="Editorial beauty" 
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
          />
          {/* Subtle warm vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/60 mix-blend-multiply" />
        </div>
        
        <div className="hero-content relative z-10 flex flex-col items-center justify-center text-white px-6 mt-16 w-full max-w-5xl mx-auto">
          <div className="relative text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-champagne mb-6 block drop-shadow-md">
              The Beauty Atelier
            </span>
            <h1 className="hero-headline font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight text-white drop-shadow-lg">
              Curated elegance.<br/>
              <span className="italic font-serif text-champagne/90">Perfectly executed.</span>
            </h1>
          </div>
          
          <p className="hero-subheadline mt-10 text-center max-w-md text-sm md:text-base font-light tracking-wide leading-relaxed text-white/90 drop-shadow-md">
            The premier destination for bespoke events, editorial makeup, and tailored styling.
          </p>
          
          <div className="hero-cta mt-12">
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="btn-glass backdrop-blur-md bg-white/10 border border-white/30 text-white hover:bg-white hover:text-charcoal transition-all duration-500 py-4 px-10 text-xs uppercase tracking-[0.2em]"
            >
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Services Overview */}
      <section ref={servicesRef} className="py-24 lg:py-40 bg-ivory relative z-10">
        <div className="px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="service-reveal flex flex-col items-center text-center mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-soft-gray mb-4">Atelier Services</span>
            <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal">
              The Collection
            </h2>
            <div className="w-[1px] h-16 bg-champagne mt-8 opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Featured Card */}
            <div className="service-reveal lg:col-span-7 rounded-none overflow-hidden relative group">
              <img 
                src="/images/event_balloon_arch.jpg" 
                alt="Event Decoration" 
                className="w-full h-full min-h-[400px] lg:min-h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 lg:p-12 text-white">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne mb-4 block">Signature</span>
                <h3 className="font-display text-3xl lg:text-4xl font-light mb-4">Event Architecture</h3>
                <p className="text-sm font-light tracking-wide text-white/80 max-w-md leading-relaxed">
                  Bespoke styling that sets the mood. Intricate balloon structures, backdrops, and tablescapes designed for the camera.
                </p>
              </div>
            </div>
            
            {/* Service Cards Col */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
              {[
                { title: "Makeup & Gele", desc: "Bridal glam, editorial looks, and traditional headwrap styling.", icon: Palette },
                { title: "Nail Art & Care", desc: "Gel, extensions, intricate art, manicures & pedicures.", icon: Gem },
                { title: "Hair & Piercing", desc: "Installations, braiding, custom wigs, safe piercing.", icon: Scissors }
              ].map((service, idx) => (
                <div key={idx} className="service-reveal bg-white p-8 border border-charcoal/5 hover:border-champagne/40 transition-colors duration-500 flex gap-6 items-start group">
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

      {/* Section 3: Event Styling Image Break */}
      <section ref={eventRef} className="py-32 lg:py-48 relative overflow-hidden flex items-center justify-center">
        <div className="event-reveal absolute inset-0">
          <img 
            src="/images/event_balloon_arch.jpg" 
            alt="Event styling" 
            className="w-full h-full object-cover scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        
        <div className="relative z-10 px-6 text-center max-w-3xl mx-auto">
          <h2 className="event-reveal font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            Styling that feels like a <i className="font-serif text-champagne">celebration.</i>
          </h2>
          <p className="event-reveal mt-8 text-sm uppercase tracking-[0.2em] text-white/70">
            Intimate Dinners • Milestone Parties • Bridal
          </p>
        </div>
      </section>

      {/* Section 4 & 5 Combined: The Beauty Edit (Hair & Nails side-by-side or alternating) */}
      <section ref={hairRef} className="py-24 lg:py-40 bg-ivory">
        <div className="px-6 lg:px-16 max-w-7xl mx-auto">
          
          {/* Hair */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-32">
            <div className="hair-reveal w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="/images/hair_braids.jpg" 
                  alt="Hair styling" 
                  className="w-full h-full object-cover grayscale-[20%]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-champagne/10 rounded-full blur-2xl z-[-1]"></div>
            </div>
            
            <div className="hair-reveal w-full lg:w-1/2 lg:pl-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-soft-gray mb-6 block">01 / Crown</span>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal leading-tight">
                Hair that commands <br/> the room.
              </h2>
              <p className="mt-8 text-soft-gray font-light leading-relaxed max-w-md">
                Precision installations, knotless braids, custom wig units, and flawless maintenance. Styled to complement your bone structure and your aesthetic.
              </p>
              <button onClick={() => scrollToSection(contactRef)} className="mt-10 text-xs uppercase tracking-[0.2em] text-charcoal border-b border-charcoal pb-1 hover:text-champagne hover:border-champagne transition-colors">
                Book Hair Service
              </button>
            </div>
          </div>

          {/* Nails */}
          <div ref={nailsRef} className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
            <div className="nails-reveal w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="/images/nails_art.jpg" 
                  alt="Nail art" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="nails-reveal w-full lg:w-1/2 lg:pr-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-soft-gray mb-6 block">02 / Detail</span>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal leading-tight">
                Nails as detailed <br/> as your plans.
              </h2>
              <p className="mt-8 text-soft-gray font-light leading-relaxed max-w-md">
                From minimalist gel overlays to architectural extensions and intricate hand-painted art. Complete with luxury care for hands and feet.
              </p>
              <button onClick={() => scrollToSection(contactRef)} className="mt-10 text-xs uppercase tracking-[0.2em] text-charcoal border-b border-charcoal pb-1 hover:text-champagne hover:border-champagne transition-colors">
                Book Nail Service
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Section 7: Training Academy (Editorial Grid) */}
      <section ref={trainingRef} className="py-24 lg:py-32 bg-[#F5F3EF]">
        <div className="px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="training-reveal text-center mb-20">
            <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal mb-4">The Academy</h2>
            <p className="text-sm uppercase tracking-[0.2em] text-soft-gray">Master the craft</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { title: "Makeup & Gele Mastery", time: "12-Week Intensive" },
              { title: "Nail Technology", time: "6-Week Certification" },
              { title: "Event Styling Basics", time: "2-Week Workshop" }
            ].map((course, idx) => (
              <div key={idx} className="training-reveal bg-white p-10 lg:p-14 hover:bg-ivory transition-colors duration-500 border border-transparent hover:border-champagne/20 cursor-pointer">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne">{course.time}</span>
                <h4 className="font-display text-2xl font-normal text-charcoal mt-6 mb-8">{course.title}</h4>
                <div className="w-8 h-[1px] bg-charcoal/20"></div>
                <button className="mt-8 text-xs font-light text-soft-gray flex items-center gap-2 group-hover:text-charcoal transition-colors">
                  View Syllabus <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Portfolio Minimalist Grid */}
      <section ref={portfolioRef} className="py-24 lg:py-40 bg-ivory">
        <div className="px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="portfolio-reveal flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal">
              Portfolio
            </h2>
            <div className="flex gap-6 mt-6 md:mt-0 font-mono text-[10px] uppercase tracking-[0.2em]">
              <button className="text-charcoal border-b border-charcoal pb-1">All</button>
              <button className="text-soft-gray hover:text-charcoal transition-colors">Events</button>
              <button className="text-soft-gray hover:text-charcoal transition-colors">Beauty</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Masonry-style varying heights via aspect ratios */}
            <div className="portfolio-reveal aspect-[3/4] overflow-hidden group bg-gray-100">
              <img src="/images/portfolio_event1.jpg" alt="Work" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="portfolio-reveal aspect-square overflow-hidden group bg-gray-100 mt-0 lg:mt-12">
              <img src="/images/portfolio_hair1.jpg" alt="Work" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="portfolio-reveal aspect-[4/5] overflow-hidden group bg-gray-100">
              <img src="/images/portfolio_makeup1.jpg" alt="Work" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="portfolio-reveal aspect-square overflow-hidden group bg-gray-100 mt-0 lg:mt-24">
              <img src="/images/portfolio_nails1.jpg" alt="Work" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Contact (High-end stationery look) */}
      <section ref={contactRef} className="py-24 lg:py-40 bg-[#F5F3EF]">
        <div className="px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            <div className="contact-reveal w-full lg:w-5/12">
              <h2 className="font-display text-4xl lg:text-5xl font-light text-charcoal leading-tight">
                Let's create <br/><i className="font-serif text-champagne">something beautiful.</i>
              </h2>
              <p className="mt-8 text-soft-gray font-light leading-relaxed">
                Inquire about availability for your event date or book a private session at our atelier.
              </p>
              
              <div className="mt-16 space-y-8 font-light text-sm tracking-wide">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft-gray mb-2">Email</p>
                  <p className="text-charcoal hover:text-champagne transition-colors cursor-pointer">triciaval07@gmail.com</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft-gray mb-2">Phone</p>
                  <p className="text-charcoal">+234 816 698 3061</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft-gray mb-2">Atelier</p>
                  <p className="text-charcoal max-w-[200px] leading-relaxed">101 Ikot Udoro, off Ikot Ekpene Road, Akwa Ibom</p>
                </div>
              </div>
            </div>
            
            <div className="contact-reveal w-full lg:w-7/12">
              <div className="bg-ivory p-8 lg:p-12 border border-charcoal/10">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="input-group">
                      <input type="text" placeholder="First Name" className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors placeholder:text-soft-gray/50" />
                    </div>
                    <div className="input-group">
                      <input type="text" placeholder="Last Name" className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors placeholder:text-soft-gray/50" />
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors placeholder:text-soft-gray/50" />
                  </div>
                  
                  <div className="input-group">
                    <select className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors text-charcoal appearance-none rounded-none">
                      <option value="" disabled selected className="text-soft-gray/50">Subject of Inquiry</option>
                      <option>Event Styling</option>
                      <option>Bridal Makeup</option>
                      <option>Hair / Nails Appointment</option>
                      <option>Academy Enrollment</option>
                    </select>
                  </div>
                  
                  <div className="input-group">
                    <textarea rows={4} placeholder="Tell us about your vision..." className="w-full bg-transparent border-b border-charcoal/20 pb-3 text-sm font-light focus:outline-none focus:border-champagne transition-colors placeholder:text-soft-gray/50 resize-none mt-4"></textarea>
                  </div>
                  
                  <button type="submit" className="btn-editorial w-full py-4 text-xs uppercase tracking-[0.2em] mt-4">
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-32 border-t border-charcoal/10 pt-12 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal">
            Tricia Val's
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-soft-gray hover:text-charcoal transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="text-soft-gray hover:text-charcoal transition-colors"><Facebook className="w-4 h-4" /></a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-soft-gray">
            © 2026. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
