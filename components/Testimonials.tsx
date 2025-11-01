import React from 'react';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Success Stories from Our Students</h2>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        See how GradNiche has empowered students to achieve their global education dreams.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-[#F6520C]/80 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] flex flex-col animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                            <svg className="w-12 h-12 text-gray-600 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                <path d="M9.984 20.016q0 1.584-1.008 2.688t-2.64 1.104q-1.632 0-2.64-1.104t-1.008-2.688q0-1.584 1.008-2.688t2.64-1.104q1.632 0 2.64 1.104t1.008 2.688zM22.016 20.016q0 1.584-1.008 2.688t-2.64 1.104q-1.632 0-2.64-1.104t-1.008-2.688q0-1.584 1.008-2.688t2.64-1.104q1.632 0 2.64 1.104t1.008 2.688zM28 8v16q0 1.632-1.176 2.808t-2.832 1.176h-16q-1.632 0-2.808-1.176t-1.176-2.808v-16q0-1.632 1.176-2.808t2.808-1.176h16q1.664 0 2.832 1.176t1.176 2.808z"></path>
                            </svg>
                            <blockquote className="text-gray-300 italic text-lg mb-6 flex-grow">
                                <p>"{testimonial.quote}"</p>
                            </blockquote>
                            <figcaption className="flex items-center mt-auto pt-4 border-t border-gray-700">
                                <img
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                    src={`${testimonial.image}&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                    alt={testimonial.name}
                                />
                                <div>
                                    <cite className="font-semibold text-white not-italic">{testimonial.name}</cite>
                                    <p className="text-sm text-gray-400">{testimonial.university}, {testimonial.country}</p>
                                </div>
                            </figcaption>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;