
import React from 'react';
import Hero from '../components/Hero';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';

const features = [
  {
    title: 'Track Your Progress',
    description: 'Monitor your problem-solving journey with detailed stats and insights.',
    icon: '📈'
  },
  {
    title: 'Compare With Peers',
    description: 'See how you stack up against other coders in the community leaderboard.',
    icon: '🥇'
  },
  {
    title: 'Set Goals',
    description: 'Create personalized milestones to keep your learning on track.',
    icon: '🎯'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 bg-secondary rounded-full">
              <span className="text-xs font-medium uppercase tracking-wider text-primary/80">Features</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple tools to help you monitor and improve your coding skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all"
              >
                <div className="bg-primary/5 p-3 rounded-xl w-fit mb-5">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block px-3 py-1 mb-4 bg-primary/10 rounded-full">
                <span className="text-xs font-medium uppercase tracking-wider text-primary/80">Get Started</span>
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ready to Level Up?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Register your LeetCode username to start tracking your progress and join the community.
              </p>
              <p className="text-muted-foreground mb-6">
                No password required - we'll use your public LeetCode profile data to showcase your achievements.
              </p>
            </div>
            
            <div className="order-1 md:order-2">
              <RegisterForm className="mx-auto md:ml-auto md:mr-0" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
