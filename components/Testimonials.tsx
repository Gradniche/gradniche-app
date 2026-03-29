import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 md:py-32 bg-black relative overflow-hidden">
            {/* Subtle ambient glow */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 mix-blend-screen opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 shadow-lg"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-xs md:text-sm font-semibold tracking-wide text-white/90 uppercase">Testimonials</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
                    >
                        Success Stories from Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Students</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-normal leading-relaxed"
                    >
                        See how GradNiche has empowered students to achieve their global education dreams.
                    </motion.p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-[#1C1C1E]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[32px] border border-white/10 hover:bg-[#2C2C2E]/80 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-black/50 flex flex-col relative overflow-hidden group"
                        >
                            {/* Subtle hover gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <svg className="w-10 h-10 md:w-12 md:h-12 text-blue-500/40 mb-6 group-hover:text-blue-400/60 transition-colors duration-300" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                    <path d="M9.984 20.016q0 1.584-1.008 2.688t-2.64 1.104q-1.632 0-2.64-1.104t-1.008-2.688q0-1.584 1.008-2.688t2.64-1.104q1.632 0 2.64 1.104t1.008 2.688zM22.016 20.016q0 1.584-1.008 2.688t-2.64 1.104q-1.632 0-2.64-1.104t-1.008-2.688q0-1.584 1.008-2.688t2.64-1.104q1.632 0 2.64 1.104t1.008 2.688zM28 8v16q0 1.632-1.176 2.808t-2.832 1.176h-16q-1.632 0-2.808-1.176t-1.176-2.808v-16q0-1.632 1.176-2.808t2.808-1.176h16q1.664 0 2.832 1.176t1.176 2.808z"></path>
                                </svg>
                                <blockquote className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 flex-grow font-normal">
                                    <p>"{testimonial.quote}"</p>
                                </blockquote>
                                <figcaption className="flex items-center mt-auto pt-6 border-t border-white/10">
                                    <div className="relative w-12 h-12 md:w-14 md:h-14 mr-4 md:mr-5 shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <img
                                            className="absolute inset-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full object-cover border-2 border-[#1C1C1E]"
                                            src={`${testimonial.image}&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                            alt={testimonial.name}
                                        />
                                    </div>
                                    <div>
                                        <cite className="font-semibold text-white not-italic text-lg tracking-tight">{testimonial.name}</cite>
                                        <p className="text-sm text-blue-400 font-medium mt-0.5">{testimonial.university}, {testimonial.country}</p>
                                    </div>
                                </figcaption>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;