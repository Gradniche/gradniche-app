import React from 'react';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-24 bg-[#050810] relative overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Success Stories from Our Students</h2>
                    <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                        See how GradNiche has empowered students to achieve their global education dreams.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-3xl border border-white/5 hover:border-[#F6520C]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col animate-fade-in relative overflow-hidden group" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#F6520C]/10 rounded-full blur-3xl group-hover:bg-[#F6520C]/20 transition-colors duration-500"></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <svg className="w-12 h-12 text-[#F6520C]/40 mb-6 group-hover:text-[#F6520C]/60 transition-colors duration-300" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                    <path d="M9.984 20.016q0 1.584-1.008 2.688t-2.64 1.104q-1.632 0-2.64-1.104t-1.008-2.688q0-1.584 1.008-2.688t2.64-1.104q1.632 0 2.64 1.104t1.008 2.688zM22.016 20.016q0 1.584-1.008 2.688t-2.64 1.104q-1.632 0-2.64-1.104t-1.008-2.688q0-1.584 1.008-2.688t2.64-1.104q1.632 0 2.64 1.104t1.008 2.688zM28 8v16q0 1.632-1.176 2.808t-2.832 1.176h-16q-1.632 0-2.808-1.176t-1.176-2.808v-16q0-1.632 1.176-2.808t2.808-1.176h16q1.664 0 2.832 1.176t1.176 2.808z"></path>
                                </svg>
                                <blockquote className="text-gray-300 text-lg leading-relaxed mb-8 flex-grow font-light">
                                    <p>"{testimonial.quote}"</p>
                                </blockquote>
                                <figcaption className="flex items-center mt-auto pt-6 border-t border-white/10">
                                    <div className="relative w-14 h-14 mr-5">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#F6520C] to-orange-300 rounded-full animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <img
                                            className="absolute inset-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full object-cover border-2 border-[#0a101f]"
                                            src={`${testimonial.image}&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                            alt={testimonial.name}
                                        />
                                    </div>
                                    <div>
                                        <cite className="font-bold text-white not-italic text-lg tracking-tight">{testimonial.name}</cite>
                                        <p className="text-sm text-[#F6520C] font-medium mt-0.5">{testimonial.university}, {testimonial.country}</p>
                                    </div>
                                </figcaption>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;