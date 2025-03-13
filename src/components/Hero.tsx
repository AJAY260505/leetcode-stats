
import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="max-w-4xl mx-auto text-center opacity-0" style={{ animationDelay: '0.2s' }}>
          <div className="inline-block px-3 py-1 mb-6 bg-secondary rounded-full">
            <span className="text-xs font-medium uppercase tracking-wider text-primary/80">Track your progress</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Master Your LeetCode Journey
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Track your progress, compare with peers, and reach new heights in your coding skills.
            Simple, beautiful, insightful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium inline-flex items-center justify-center hover:opacity-90 transition-opacity group"
            >
              Get Started
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/leaderboard"
              className="w-full sm:w-auto px-8 py-3 rounded-lg border border-border hover:bg-secondary transition-colors font-medium inline-flex items-center justify-center"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[50%] bg-green-100 rounded-full blur-[120px] opacity-30"></div>
      </div>
    </section>
  );
};

export default Hero;
