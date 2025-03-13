
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { toast } from 'sonner';

interface RegisterFormProps {
  className?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ className = '' }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter your LeetCode username');
      return;
    }

    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      // In a real app, we would save to database here
      localStorage.setItem('leetcodeUsername', username);
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success('Registration successful!');
      
      // After success animation
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1500);
  };

  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="relative backdrop-blur-lg bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
        
        <h3 className="text-xl font-semibold mb-4">Register Your LeetCode Profile</h3>
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1 text-muted-foreground">
              LeetCode Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
              disabled={isLoading || isSubmitted}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || isSubmitted}
            className={`w-full flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all ${
              isSubmitted
                ? 'bg-green-500 text-white'
                : 'bg-primary text-primary-foreground hover:opacity-90'
            }`}
          >
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : isSubmitted ? (
              <>
                <CheckCircle size={20} className="mr-2" />
                Registered Successfully
              </>
            ) : (
              <>
                Register 
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
