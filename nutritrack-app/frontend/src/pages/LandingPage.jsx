import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import {
  Activity,
  Target,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Zap,
  Heart,
  Award,
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🥗</span>
              </div>
              <span className="text-2xl font-bold text-gradient-success">NutriTrack</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('features');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('how-it-works');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('testimonials');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
              >
                Testimonials
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="hidden sm:block px-6 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn btn-primary px-6 py-2.5 text-sm font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        {/* Subtle Background Patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center justify-center min-h-[calc(100vh-5rem)] py-12">
            {/* Left Side - Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left flex flex-col justify-center space-y-5"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-200/50 mb-2"
              >
                <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-500" />
                <span className="text-xs font-semibold text-gray-700">Transform Your Health Journey Today</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
              >
                <span className="block">Your all-in-one</span>
                <span className="block">Smart Health Companion</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-600 to-green-700 mt-1">
                  NutriTrack.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0"
              >
                Plan smarter, eat better, and track progress effortlessly — all in one app.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center mb-6"
              >
                <Link
                  to="/register"
                  className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 overflow-hidden flex items-center justify-center w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                
                <Link
                  to="/login"
                  className="px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold text-sm border-2 border-gray-300 shadow-md hover:shadow-lg hover:border-gray-400 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center w-full sm:w-auto"
                >
                  Sign In
                </Link>
              </motion.div>

              {/* Trust Indicators - Prominently Displayed */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-5"
              >
                {/* 10K+ Active Users */}
                <div className="flex items-center space-x-2.5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                        className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border-2 border-white shadow-md"
                      ></motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">10K+</span>
                    <span className="text-xs text-gray-600">Active Users</span>
                  </div>
                </div>

                {/* 4.9/5 Rating */}
                <div className="flex items-center space-x-2.5">
                  <div className="flex items-center space-x-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">4.9/5</span>
                    <span className="text-xs text-gray-600">Rating</span>
                  </div>
                </div>
              </motion.div>

              {/* Key Benefits */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                {[
                  { icon: CheckCircleIcon, text: "Free to start", color: "text-green-600" },
                  { icon: Award, text: "Expert guidance", color: "text-blue-600" },
                  { icon: TrendingUp, text: "Proven results", color: "text-purple-600" },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center space-x-1.5 text-gray-600 group cursor-default"
                  >
                    <benefit.icon className={`w-4 h-4 ${benefit.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Visual with Circle */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="relative flex justify-center items-center lg:justify-center"
            >
              <div className="relative w-full max-w-[450px] lg:max-w-[500px] mx-auto">
                {/* Main Circle Container */}
                <div className="relative w-full aspect-square">
                  {/* Outer Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
                  
                  {/* Gradient Border Circle */}
                  <div className="relative w-full h-full">
                    {/* Circular Gradient Border */}
                    <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                      <defs>
                        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50%"
                        cy="50%"
                        r="48%"
                        fill="none"
                        stroke="url(#circleGradient)"
                        strokeWidth="4"
                        opacity="0.8"
                      />
                    </svg>
                    
                    {/* Main White Circle */}
                    <div className="absolute inset-[4%] bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                      {/* Inner Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50"></div>
                      
                      {/* Salad Emoji - Central */}
                      <div className="relative z-10 text-7xl sm:text-8xl md:text-9xl">🥗</div>
                    </div>

                    {/* Food Items - Perfectly Positioned Along Circle */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      {[
                        { emoji: '🍎', angle: 0 },
                        { emoji: '🫐', angle: 45 },
                        { emoji: '🥦', angle: 90 },
                        { emoji: '🍓', angle: 135 },
                        { emoji: '🍌', angle: 180 },
                        { emoji: '🍊', angle: 225 },
                        { emoji: '🍇', angle: 270 },
                        { emoji: '🍅', angle: 315 },
                      ].map((item, index) => {
                        const radius = 46; // Position on the gradient border
                        const angleRad = (item.angle * Math.PI) / 180;
                        const x = 50 + radius * Math.cos(angleRad);
                        const y = 50 + radius * Math.sin(angleRad);
                        
                        return (
                          <motion.div
                            key={index}
                            className="absolute text-3xl sm:text-4xl md:text-5xl filter drop-shadow-xl"
                            style={{
                              left: `${x}%`,
                              top: `${y}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                            animate={{
                              y: [0, -8, 0],
                              rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{
                              duration: 3 + index * 0.3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2,
                            }}
                          >
                            {item.emoji}
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Stat Card - Top Right */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, y: -30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
                      className="absolute top-0 right-0 sm:top-1 sm:right-1 md:-top-3 md:-right-3 bg-white rounded-xl shadow-xl p-3 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center shadow-md">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-1 mb-0.5">
                            <span className="text-xl font-bold text-gray-900">4.8/5</span>
                            <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="text-xs text-gray-500 font-medium">Satisfaction Rate</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Stat Card - Bottom Left */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 200 }}
                      className="absolute bottom-0 left-0 sm:bottom-1 sm:left-1 md:-bottom-3 md:-left-3 bg-white rounded-xl shadow-xl p-3 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900 mb-0.5">95%</div>
                          <div className="text-xs text-gray-500 font-medium">Goal Achievement</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-sm font-semibold">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Powerful Features
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
            >
              Everything You Need for
              <span className="block text-gradient-success">Better Health</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Comprehensive tools and features designed to help you achieve your wellness goals
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: BarChart3,
                title: "Smart Meal Tracking",
                description: "Log meals effortlessly with detailed nutritional insights and make informed dietary choices.",
                gradient: "from-blue-500 to-indigo-600",
                bgGradient: "from-blue-50 to-indigo-50",
              },
              {
                icon: Activity,
                title: "Exercise Integration",
                description: "Track workouts and see how they complement your nutrition for optimal health results.",
                gradient: "from-green-500 to-emerald-600",
                bgGradient: "from-green-50 to-emerald-50",
              },
              {
                icon: Target,
                title: "Personalized Plans",
                description: "Get customized meal plans tailored to your preferences, goals, and dietary restrictions.",
                gradient: "from-purple-500 to-violet-600",
                bgGradient: "from-purple-50 to-violet-50",
              },
              {
                icon: Users,
                title: "Expert Consultations",
                description: "Schedule appointments with certified nutrition professionals for personalized guidance.",
                gradient: "from-orange-500 to-amber-600",
                bgGradient: "from-orange-50 to-amber-50",
              },
              {
                icon: TrendingUp,
                title: "Progress Reports",
                description: "Visualize your journey with comprehensive reports and analytics to stay motivated.",
                gradient: "from-pink-500 to-rose-600",
                bgGradient: "from-pink-50 to-rose-50",
              },
              {
                icon: Calendar,
                title: "Goal Achievement",
                description: "Set realistic goals and track progress with intelligent monitoring and celebrations.",
                gradient: "from-teal-500 to-cyan-600",
                bgGradient: "from-teal-50 to-cyan-50",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Get started in minutes and transform your health journey
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and set your health goals, dietary preferences, and personal information.",
                icon: UserGroupIcon,
                gradient: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-500",
              },
              {
                step: "02",
                title: "Track Your Progress",
                description: "Log meals, exercises, and monitor your daily nutrition intake with ease.",
                icon: ChartBarIcon,
                gradient: "from-green-500 to-green-600",
                bgColor: "bg-green-500",
              },
              {
                step: "03",
                title: "Achieve Your Goals",
                description: "Get personalized recommendations and watch your health improve over time.",
                icon: Target,
                gradient: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-500",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center relative"
              >
                <div className="relative inline-block mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl mx-auto`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 ${step.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-sm font-semibold">
                <SparklesIcon className="w-4 h-4 mr-2" />
                What Our Users Say
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
            >
              Trusted by Thousands
              <span className="block text-gradient-success">of Happy Users</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              See how NutriTrack has helped people achieve their health and wellness goals
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Fitness Enthusiast",
                image: "👩",
                rating: 5,
                text: "NutriTrack has completely transformed my approach to nutrition. The meal tracking is so easy, and I love the personalized recommendations. I've lost 15 pounds in just 3 months!",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                name: "Michael Chen",
                role: "Busy Professional",
                image: "👨",
                rating: 5,
                text: "As someone with a hectic schedule, NutriTrack makes it so simple to track my meals and stay on top of my nutrition goals. The progress reports are incredibly insightful.",
                gradient: "from-green-500 to-emerald-600",
              },
              {
                name: "Emily Rodriguez",
                role: "Health Coach",
                image: "👩‍🦰",
                rating: 5,
                text: "I recommend NutriTrack to all my clients. The expert consultation feature and detailed analytics make it the perfect tool for anyone serious about their health journey.",
                gradient: "from-purple-500 to-violet-600",
              },
              {
                name: "David Thompson",
                role: "Athlete",
                image: "👨‍💼",
                rating: 5,
                text: "The exercise integration feature is fantastic! Being able to see how my workouts and nutrition work together has helped me optimize my performance significantly.",
                gradient: "from-orange-500 to-amber-600",
              },
              {
                name: "Lisa Park",
                role: "Dietitian",
                image: "👩‍⚕️",
                rating: 5,
                text: "NutriTrack's meal planning feature is incredibly comprehensive. It takes into account dietary restrictions and personal preferences, making it perfect for my clients.",
                gradient: "from-pink-500 to-rose-600",
              },
              {
                name: "James Wilson",
                role: "Student",
                image: "👨‍🎓",
                rating: 5,
                text: "I started using NutriTrack during my weight loss journey, and it's been a game-changer. The user-friendly interface and motivational progress tracking keep me on track every day.",
                gradient: "from-teal-500 to-cyan-600",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                    "{testimonial.text}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            >
              Ready to Transform Your
              <span className="block text-yellow-300">Health Journey?</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed"
            >
              Join thousands of users who have transformed their health with NutriTrack.
              Start your personalized nutrition journey today — it's free to get started!
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                to="/register"
                className="group px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center"
              >
                Start Free Trial
                <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-10 py-5 bg-transparent text-white border-2 border-white/30 hover:bg-white/10 rounded-2xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                Sign In
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-8 text-blue-100"
            >
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-6 h-6 text-green-300" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-6 h-6 text-green-300" />
                <span className="font-medium">Free forever plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-6 h-6 text-green-300" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">🥗</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gradient-success">NutriTrack</h3>
                </div>
                <p className="text-gray-300 mb-6 max-w-md leading-relaxed text-lg">
                  Your comprehensive nutrition companion. Transform your health journey with
                  personalized meal tracking, expert guidance, and proven results.
                </p>
                <div className="flex space-x-4">
                  {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center cursor-pointer transition-colors shadow-lg hover:scale-110 transform"
                    >
                      <span className="text-xl">{icon}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-bold mb-6 text-white">Features</h4>
                <ul className="space-y-3">
                  {['Meal Tracking', 'Exercise Logging', 'Diet Planning', 'Progress Reports', 'Expert Consultations'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-base">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-bold mb-6 text-white">Support</h4>
                <ul className="space-y-3">
                  {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-base">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-base">
                &copy; 2025 NutriTrack. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-gray-400 text-base">Crafted with care — for a healthier you</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
