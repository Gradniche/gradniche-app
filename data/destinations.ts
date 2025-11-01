import React from 'react';
import { Page } from '../App';
import { AvatarConfig } from './forums';

export interface FAQ {
    question: string;
    answer: string;
}

export interface VisaGuide {
    overview: string;
    documents: { item: string; icon: React.ReactElement<React.SVGProps<SVGSVGElement>>; }[];
    steps: { title: string; description: string; }[];
    financials: string[];
    interviewTips: string[];
    faq: FAQ[];
}

export type DestinationPage = 'destination-usa' | 'destination-canada' | 'destination-uk' | 'destination-australia' | 'destination-germany' | 'destination-ireland' | 'destination-uae' | 'destination-new-zealand';

export interface Destination {
    name: string;
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    heroImage: string;
    intro: string;
    whyStudy: {
        title: string;
        point: string;
        icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    }[];
    educationSystemInfo: string;
    admissionProcessInfo: string;
    costOfStudyingInfo: string;
    visaGuide: VisaGuide;
    postStudyWorkInfo: string;
    scholarshipsInfo: string;
    coursesInfo: string;
    faq: FAQ[];
    topUniversities: {
        name: string;
        qsRanking: number;
        logo: string;
    }[];
    avatarConfig: AvatarConfig;
}

interface DestinationData {
    [key: string]: Destination;
}

export const destinationData: DestinationData = {
    usa: {
        name: "United States",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" })),
        heroImage: "https://images.unsplash.com/photo-1606733822640-9994c657a705?q=80&w=2070&auto=format&fit=crop",
        intro: "The United States boasts one of the world's most renowned and flexible higher education systems, offering a vast array of programs at prestigious universities. It's a global leader in technology and research, providing unparalleled opportunities for innovation and career growth.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-usa', hair: 'short01', eyes: 'variant01', skinColor: 'F5C6A0', hairColor: '4D4D4D', clothing: 'shirt', clothingColor: 'F6520C' } },
        whyStudy: [
            { 
                title: "Top-Ranked Universities", 
                point: "Home to the highest number of world-class universities, including the Ivy League and top tech institutes like MIT and Stanford.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }))
            },
            { 
                title: "Flexibility in Academics", 
                point: "Offers incredible flexibility, allowing students to explore different subjects before declaring a major and even combine diverse fields of study.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }))
            },
            { 
                title: "Research & Innovation", 
                point: "Unmatched opportunities for research, with universities at the forefront of technological advancements and scientific discoveries.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }))
            },
            { 
                title: "Global Career Path", 
                point: "The Optional Practical Training (OPT) program allows students to gain valuable work experience for up to 3 years in STEM fields.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" }))
            }
        ],
        educationSystemInfo: "The US education system is known for its well-rounded, liberal arts approach. An undergraduate degree (Bachelor's) is typically four years. Graduate studies include Master's degrees (1-2 years) and doctoral degrees (PhD), which are heavily research-focused and can take 5-7 years. The system emphasizes critical thinking, student participation, and practical experience.",
        admissionProcessInfo: "1. Standardized Tests: Take the GRE/GMAT for graduate programs and English proficiency tests like TOEFL/IELTS.\n2. University Shortlisting: Research and select universities based on your profile and program interests.\n3. Application Package: Prepare documents like Statement of Purpose (SOP), Letters of Recommendation (LORs), transcripts, and a resume.\n4. Application Submission: Apply directly to universities, usually through their online portals.",
        costOfStudyingInfo: "Costs vary significantly by university (public vs. private) and location. \n\nTuition Fees: \n- Public Universities: $25,000 - $40,000 per year\n- Private Universities: $40,000 - $65,000+ per year\n\nLiving Costs:\n- Average: $15,000 - $25,000 per year. This covers accommodation, food, transport, and health insurance. Costs are higher in major cities like New York and San Francisco.",
        visaGuide: {
            overview: "The F-1 Visa is the most common type of student visa for those wishing to study at an academic institution in the United States. It's for students enrolled in full-time academic programs at an accredited college, university, or other academic institution.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Form I-20', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })) },
                { item: 'University Acceptance Letter', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Financial Proof', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'SEVIS Fee Receipt', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h5.25M9 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" })) },
                { item: 'DS-160 Confirmation Page', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" })) }
            ],
            steps: [
                { title: 'Receive Form I-20', description: "Once you accept your admission offer and provide proof of funds, your university will issue a Form I-20, which is a Certificate of Eligibility for Nonimmigrant Student Status." },
                { title: 'Pay the SEVIS I-901 Fee', description: "The Student and Exchange Visitor Information System (SEVIS) is a U.S. government database. You must pay the I-901 SEVIS fee online before you can schedule your visa interview." },
                { title: 'Complete the DS-160 Form', description: "Fill out the Online Nonimmigrant Visa Application (Form DS-160). You will need to upload a photo and print the confirmation page with the barcode." },
                { title: 'Schedule Your Interview', description: "Create an account on the U.S. embassy/consulate website for India, pay the visa application fee, and schedule two appointments: one for biometrics (fingerprinting and photo) and one for the visa interview." },
                { title: 'Attend the Interview', description: "Go to the consulate for your interview. A consular officer will ask questions about your choice of university, academic goals, financial situation, and your ties to India to assess your intent to return after your studies." }
            ],
            financials: [
                "You must prove sufficient funds to cover your first year of tuition and living expenses.",
                "The required amount is specified on your Form I-20.",
                "Acceptable proof includes bank statements, education loan approval letters, or scholarship letters."
            ],
            interviewTips: [
                "Be Clear and Concise: Answer the questions directly. Do not provide long, rambling answers.",
                "Know Your Program: Be prepared to talk about why you chose your specific university and program.",
                "Demonstrate Strong Ties to India: Explain your plans after graduation and show strong family, property, or job ties to your home country. This is crucial to prove non-immigrant intent.",
                "Dress Formally: Present yourself professionally.",
                "Stay Calm and Confident: Be honest and confident in your responses."
            ],
            faq: [
                { question: "How early can I apply for my F-1 visa?", answer: "You can apply for your F-1 visa up to 365 days before the program start date listed on your I-20. However, you can only enter the US on an F-1 visa 30 days or less before the start date." },
                { question: "What if my visa is rejected?", answer: "If your visa is rejected, the consular officer will provide a reason. You can reapply, but you must address the reasons for the initial rejection. This might involve providing stronger financial proof or better demonstrating your ties to India." }
            ]
        },
        postStudyWorkInfo: "Optional Practical Training (OPT) is the main avenue for post-study work. \n- Standard OPT: Graduates are eligible for up to 12 months of OPT, allowing them to work in a job directly related to their field of study.\n- STEM OPT Extension: If you have a degree in a designated Science, Technology, Engineering, or Mathematics (STEM) field, you can apply for a 24-month extension, allowing for a total of 36 months of work experience. This is a significant advantage for gaining valuable industry experience.",
        scholarshipsInfo: "Financial aid in the US is competitive but available.\n- University Scholarships: Most universities offer merit-based scholarships for international graduate students. These are often awarded at the time of admission and may cover full or partial tuition.\n- Assistantships: Research Assistantships (RAs) and Teaching Assistantships (TAs) are common for graduate students. They typically provide a tuition waiver and a stipend in exchange for work.\n- External Scholarships: Prestigious scholarships like the Fulbright-Nehru Fellowships and the Tata Scholarship (at Cornell) are available specifically for Indian students.",
        coursesInfo: "The USA offers an extensive range of courses. Popular fields for Indian students include:\n- Computer Science & IT (AI, Data Science, Cybersecurity)\n- Engineering (Mechanical, Electrical, Civil)\n- Business & Management (MBA, Finance, Analytics)\n- Medicine & Healthcare (Public Health, Biomedical Sciences)\n- Arts & Humanities (Design, Film, Liberal Arts)",
        faq: [
            { question: "Is the GRE/GMAT mandatory for all Master's programs?", answer: "Not anymore. While many top-tier programs still require or recommend GRE/GMAT scores, a growing number of universities are making them optional. Always check the specific requirements for each program you're interested in." },
            { question: "What is OPT and CPT?", answer: "CPT (Curricular Practical Training) allows you to work in a paid internship during your studies. OPT (Optional Practical Training) is a period of up to 12 months (extendable to 36 months for STEM fields) where you can work in your field of study after graduation." },
            { question: "How important is the Statement of Purpose (SOP)?", answer: "The SOP is extremely important. It's your opportunity to tell the admissions committee about your motivations, experiences, and future goals. A well-written SOP can significantly strengthen your application, especially if your academic scores are not perfect." }
        ],
        topUniversities: [
            { name: "Massachusetts Institute of Technology (MIT)", qsRanking: 1, logo: "https://logo.clearbit.com/mit.edu" },
            { name: "Harvard University", qsRanking: 4, logo: "https://logo.clearbit.com/harvard.edu" },
            { name: "Stanford University", qsRanking: 6, logo: "https://logo.clearbit.com/stanford.edu" },
            { name: "University of California, Berkeley (UCB)", qsRanking: 12, logo: "https://logo.clearbit.com/berkeley.edu" }
        ]
    },
    canada: {
        name: "Canada",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12,21V15.5M12,15.5,8,13,5,14,3,11l4,1,1-3-3-2,5-4,4,4-3,2,1,3,4-1,2,3-3-1-4,2.5Z" })),
        heroImage: "https://images.unsplash.com/photo-1619451433292-0f8a883727b1?q=80&w=1974&auto=format&fit=crop",
        intro: "Canada is celebrated for its high academic standards, welcoming and diverse culture, and high quality of life. It offers a world-class education at an affordable cost, with clear pathways to permanent residency for international graduates.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-canada-female', hair: 'long01', eyes: 'variant06', skinColor: 'E4A381', hairColor: 'A25900', clothing: 'hoodie', clothingColor: 'FF0000' } },
        whyStudy: [
            { 
                title: "Quality Education", 
                point: "Canadian universities are globally recognized for their quality and rigor, with strong government investment ensuring high standards.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { d: "M12 14l9-5-9-5-9 5 9 5z" }), React.createElement('path', { d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" }))
            },
            { 
                title: "Affordable Costs", 
                point: "Tuition fees and living costs in Canada are generally lower than in other major English-speaking countries like the USA and the UK.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" }))
            },
            { 
                title: "Welcoming & Safe", 
                point: "Known for its multicultural, tolerant, and safe society. Canada consistently ranks as one of the best countries in the world to live.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }))
            },
            { 
                title: "Immigration Path", 
                point: "The Post-Graduation Work Permit (PGWP) allows graduates to work for up to three years, providing a clear route to permanent residency.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10h6" }))
            }
        ],
        educationSystemInfo: "The Canadian education system is managed by provincial governments, but standards are uniformly high. Bachelor's degrees are typically 3-4 years. Master's degrees are 1-2 years and can be thesis-based or course-based. The system strongly emphasizes research and cooperative (co-op) education programs that integrate internships into the curriculum.",
        admissionProcessInfo: "1. Select a Program: Choose a program and a Designated Learning Institution (DLI).\n2. Meet Requirements: Fulfill the academic and English proficiency (IELTS/TOEFL) requirements for your chosen program.\n3. Letter of Acceptance: Apply to the DLI and receive an official Letter of Acceptance.",
        costOfStudyingInfo: "Tuition Fees:\n- Average for Master's Programs: $18,000 - $35,000 CAD per year.\n\nLiving Costs:\n- Besides tuition, you must show you have at least $10,200 CAD for your living expenses for the first year. A more realistic budget is around $15,000 - $20,000 CAD per year, especially in cities like Toronto or Vancouver.",
        visaGuide: {
            overview: "The Canadian Study Permit is the official document that allows foreign nationals to study at Designated Learning Institutions (DLIs) in Canada. For Indian students, the application process is streamlined through the Student Direct Stream (SDS).",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Letter of Acceptance (LOA)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'GIC of $10,200 CAD', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'Proof of Tuition Payment', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h5.25M9 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" })) },
                { item: 'IELTS Score Card (SDS)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" })) },
                { item: 'Medical Examination', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" })) }
            ],
            steps: [
                { title: 'Get Letter of Acceptance (LOA)', description: "Apply to your chosen Designated Learning Institution (DLI). Once admitted, you will receive an official LOA." },
                { title: 'Fulfill SDS Requirements', description: "For the faster Student Direct Stream (SDS) process, you must pay your first year of tuition, get a Guaranteed Investment Certificate (GIC) of at least $10,200 CAD, and achieve an IELTS score of at least 6.0 in all four bands." },
                { title: 'Undergo a Medical Exam', description: "You may need to have an upfront medical examination from a panel physician approved by Immigration, Refugees and Citizenship Canada (IRCC)." },
                { title: 'Submit Your Application Online', description: "Create an account on the IRCC portal, fill out the application forms, upload all required documents, and pay the application fee." },
                { title: 'Provide Biometrics', description: "After submitting your application, you'll receive a letter instructing you to provide your fingerprints and photo (biometrics) at a Visa Application Centre (VAC)." }
            ],
            financials: [
                "For the SDS stream, a Guaranteed Investment Certificate (GIC) of at least $10,200 CAD is mandatory proof of living expenses.",
                "For the non-SDS stream, you must provide bank statements or other financial documents proving you can support yourself."
            ],
            interviewTips: [
                "Canada does not typically require an interview for a study permit application.",
                "However, a visa officer may request an interview in some cases. If so, be prepared to answer questions similar to those for an F-1 visa: your choice of program, future plans, and ties to your home country.",
                "The most important part of the Canadian application is the documentation. Ensure every document is clear, accurate, and meets the requirements."
            ],
            faq: [
                { question: "What is the Student Direct Stream (SDS)?", answer: "SDS is an expedited study permit processing program available to students from certain countries, including India. It has specific requirements (GIC, first-year tuition paid, IELTS 6.0 in all bands) but offers much faster processing times, typically around 20 calendar days." },
                { question: "What is a Guaranteed Investment Certificate (GIC)?", answer: "A GIC is an investment you make with a Canadian bank. For study permit purposes, it proves you have money to support yourself. The bank will give you a portion of the money when you arrive in Canada, and the rest in installments over the year." }
            ]
        },
        postStudyWorkInfo: "Post-Graduation Work Permit (PGWP):\nThis is a cornerstone of studying in Canada. \n- Duration: The length of the PGWP depends on your program duration, up to a maximum of 3 years.\n- Open Work Permit: It allows you to work for any employer, anywhere in Canada.\n- Path to PR: The Canadian work experience gained on a PGWP is highly valuable and is a major component in applying for Permanent Residency through programs like the Canadian Experience Class (CEC) under Express Entry.",
        scholarshipsInfo: "While large full-ride scholarships are rare, many funding options exist:\n- University Entrance Scholarships: Most universities automatically consider international applicants for entrance scholarships based on academic merit, typically ranging from $2,000 - $10,000 CAD.\n- Provincial Government Scholarships: Some provinces, like Ontario and British Columbia, offer scholarships for international students (e.g., Ontario Graduate Scholarship).\n- Program-Specific Awards: Many Master's programs, especially thesis-based ones, offer funding packages that include a stipend and teaching/research assistantship opportunities.",
        coursesInfo: "Canada excels in a variety of fields. Highly sought-after courses include:\n- Business & Finance\n- Computer Science & IT\n- Engineering (especially Civil, Mechanical, and Electrical)\n- Hospitality & Tourism Management\n- Health Sciences and Public Health\n- Media & Journalism",
        faq: [
            { question: "What is the Post-Graduation Work Permit (PGWP)?", answer: "The PGWP allows students who have graduated from an eligible Canadian DLI to obtain an open work permit. The permit's length depends on your study program's duration, up to a maximum of three years. It's a key step towards gaining Canadian work experience and qualifying for permanent residency." },
            { question: "Can I work while studying in Canada?", answer: "Yes. If your study permit includes a condition allowing you to work, you can work up to 20 hours per week during regular academic sessions and full-time during scheduled breaks like summer or winter holidays." },
            { question: "What is a Designated Learning Institution (DLI)?", answer: "A DLI is a school approved by a provincial or territorial government to host international students. You must have an acceptance letter from a DLI to apply for a study permit." }
        ],
        topUniversities: [
            { name: "University of Toronto", qsRanking: 25, logo: "https://logo.clearbit.com/utoronto.ca" },
            { name: "University of British Columbia", qsRanking: 38, logo: "https://logo.clearbit.com/ubc.ca" },
            { name: "McGill University", qsRanking: 29, logo: "https://logo.clearbit.com/mcgill.ca" },
            { name: "McMaster University", qsRanking: 176, logo: "https://logo.clearbit.com/mcmaster.ca" }
        ]
    },
    uk: {
        name: "United Kingdom",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 15l2-10h10l2 10H5zM3 21h18M12 5a2 2 0 110-4 2 2 0 010 4zM7 5a1 1 0 110-2 1 1 0 010 2zM17 5a1 1 0 110-2 1 1 0 010 2z" })),
        heroImage: "https://images.unsplash.com/photo-1558236121-9d57a48d88c9?q=80&w=1974&auto=format&fit=crop",
        intro: "The UK is home to some of the world's oldest and most prestigious universities, offering a rich academic heritage. Its courses are often shorter and more intensive, providing a fast-track to your career while immersing you in a vibrant, multicultural society.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-uk', hair: 'short02', eyes: 'variant02', skinColor: 'AF6E5A', hairColor: '282828', clothing: 'blazer', clothingColor: '00247D' } },
        whyStudy: [
            { 
                title: "Academic Heritage", 
                point: "The UK's reputation for quality education is world-renowned, with historic institutions like Oxford and Cambridge leading the way.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" }))
            },
            { 
                title: "Shorter Course Duration", 
                point: "Master's degrees are typically one year long, and Bachelor's degrees are three years, saving students significant time and money.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }))
            },
            { 
                title: "Multicultural Hub", 
                point: "Experience a diverse and inclusive society with a rich history and culture, attracting students from all over the globe.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }))
            },
            { 
                title: "Graduate Route Visa", 
                point: "This post-study work visa allows graduates to work in the UK for two years (three for PhDs) after completing their studies.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }))
            }
        ],
        educationSystemInfo: "The UK education system is known for its depth and specialization. Bachelor's degrees (except in Scotland) are three years. Master's degrees are intensive one-year programs. The teaching style encourages independent study, critical thinking, and in-depth analysis of your chosen subject.",
        admissionProcessInfo: "1. Course Selection: Choose a university and a postgraduate course.\n2. Application: Apply directly through the university's online portal.\n3. Offer Letter: Receive a conditional or unconditional offer letter.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: £15,000 - £30,000 per year. MBA and medical programs can be significantly higher.\n\nLiving Costs:\n- You must show proof of funds for your living expenses. This is £1,334 per month for courses in London and £1,023 per month for courses outside London, for up to 9 months.",
        visaGuide: {
            overview: "The UK Student Visa allows you to study at a licensed student sponsor institution. The application is points-based, and you must meet the 70-point requirement, which includes having a Confirmation of Acceptance for Studies (CAS), meeting financial requirements, and proving English language proficiency.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'CAS Reference Number', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })) },
                { item: 'Proof of Financial Support', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'English Language Test Results', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" })) },
                { item: 'Tuberculosis (TB) Test Results', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" })) },
            ],
            steps: [
                { title: 'Receive your CAS', description: "After you've met all conditions of your offer and paid a tuition deposit, your university will issue a Confirmation of Acceptance for Studies (CAS). This is a unique reference number, not a physical document." },
                { title: 'Prepare Your Documents', description: "Gather all necessary documents, especially your financial proof. The funds must be held in your (or your parents') bank account for a minimum of 28 consecutive days before you apply." },
                { title: 'Complete the Online Application', description: "Fill out the visa application form on the official GOV.UK website. You will need your CAS number and other personal details." },
                { title: 'Pay Fees and Book an Appointment', description: "Pay the visa application fee and the Immigration Health Surcharge (IHS). After payment, you will be directed to book an appointment at a Visa Application Centre (VAC)." },
                { title: 'Attend VAC Appointment', description: "Visit the VAC at your scheduled time to submit your biometrics (fingerprints and photo) and your supporting documents." }
            ],
            financials: [
                "You must prove you have enough money to pay for one academic year of course fees (amount on your CAS).",
                "You must also show funds for living costs: £1,334 per month (in London) or £1,023 per month (outside London) for up to 9 months.",
                "The required funds must be held in your (or your parents') account for at least 28 consecutive days."
            ],
            interviewTips: [
                "A credibility interview may be part of your visa application process.",
                "Be Genuine: The purpose is to check that you are a genuine student.",
                "Know Your Course: Be able to discuss why you chose your specific course and university.",
                "Explain Your Finances: Be clear about how you are funding your education.",
                "Post-Study Plans: Explain your career plans after graduation in your home country."
            ],
            faq: [
                { question: "What is the IHS (Immigration Health Surcharge)?", answer: "The IHS is a mandatory fee for students coming to the UK for more than 6 months. Paying it gives you access to the UK's National Health Service (NHS) on the same basis as a permanent resident." },
                { question: "Can I apply for the Graduate Route from outside the UK?", answer: "No, you must apply for the Graduate Route visa from inside the UK and must have a valid Student Visa at the time of application. You must apply after your university has notified you that you have successfully completed your course." }
            ]
        },
        postStudyWorkInfo: "The Graduate Route:\nThis is the UK's post-study work visa. It allows eligible international students to stay in the UK to work, or look for work, after they have successfully completed their course.\n- Duration: 2 years for Master's graduates, 3 years for PhD graduates.\n- Flexibility: It is an unsponsored route, meaning you do not need a job offer to apply. You can work in most jobs and switch employers freely.\n- Objective: It provides a great opportunity to gain valuable work experience in the UK, which can later help in applying for a Skilled Worker visa.",
        scholarshipsInfo: "The UK offers several prestigious scholarships for Indian students:\n- Chevening Scholarships: A fully-funded scholarship from the UK government for a one-year Master's degree. Highly competitive and prestigious.\n- Commonwealth Scholarships: For students from Commonwealth countries, including India, covering Master's and PhD studies.\n- GREAT Scholarships: A joint initiative by the British Council and UK universities, offering scholarships of at least £10,000 for one-year postgraduate courses.\n- University-Specific Scholarships: Almost all UK universities offer merit-based scholarships specifically for international students.",
        coursesInfo: "The UK is a popular destination for a wide range of subjects, especially:\n- Business, Management, and Finance\n- Law\n- Engineering\n- Computer Science and Artificial Intelligence\n- Art and Design\n- Medicine and Life Sciences",
        faq: [
            { question: "What is the Graduate Route visa?", answer: "The Graduate Route allows international students who have successfully completed a degree in the UK to stay and work, or look for work, at any skill level for two years (three years for PhD graduates). You must apply from within the UK before your Student visa expires." },
            { question: "How long does a Master's degree take in the UK?", answer: "Most Master's programs in the UK are one year long, which is a major advantage as it reduces both tuition and living costs compared to two-year programs in other countries." },
            { question: "Is the IELTS UKVI required?", answer: "It depends on your university's requirements. Some universities may accept standard IELTS Academic or other tests, while others specifically require the IELTS for UKVI for visa purposes. Always check with your chosen institution." }
        ],
        topUniversities: [
            { name: "University of Cambridge", qsRanking: 5, logo: "https://logo.clearbit.com/cam.ac.uk" },
            { name: "University of Oxford", qsRanking: 3, logo: "https://logo.clearbit.com/ox.ac.uk" },
            { name: "Imperial College London", qsRanking: 2, logo: "https://logo.clearbit.com/imperial.ac.uk" },
            { name: "UCL (University College London)", qsRanking: 9, logo: "https://logo.clearbit.com/ucl.ac.uk" }
        ]
    },
    australia: {
        name: "Australia",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2 19h20M4 19a8 8 0 018-8 8 8 0 018 8M12 3a8 8 0 018 8" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 19a8 8 0 00-8-8" })),
        heroImage: "https://images.unsplash.com/photo-1617924449881-674574b5b74c?q=80&w=2070&auto=format&fit=crop",
        intro: "Australia offers a world-class education system in a relaxed, friendly, and safe environment. With its sunny climate, beautiful beaches, and vibrant cities, it provides an unbeatable lifestyle alongside excellent academic and research opportunities.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-australia-female', hair: 'long02', eyes: 'variant07', skinColor: 'C47D6A', hairColor: 'B86B25', clothing: 'crewNeck', clothingColor: 'FFCD00' } },
        whyStudy: [
            { 
                title: "Globally Ranked", 
                point: "Australian universities are consistently ranked among the top globally, particularly in fields like engineering and environmental science.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 3v4M3 5h4M6 17v4m-2-2h4M14 3v4m-2 2h4M15 17v4m-2-2h4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }))
            },
            { 
                title: "Research & Technology", 
                point: "The government and universities invest heavily in research and innovation, providing students with access to state-of-the-art facilities.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.022a2 2 0 011.022-.547z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8a4 4 0 100-8 4 4 0 000 8z" }))
            },
            { 
                title: "Post-Study Work", 
                point: "The Temporary Graduate visa (subclass 485) allows eligible students to stay and work in Australia for two to four years after graduation.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }))
            },
            { 
                title: "Unmatched Lifestyle", 
                point: "Enjoy a high standard of living, vibrant multicultural cities, and stunning natural landscapes, from coral reefs to vast deserts.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }))
            }
        ],
        educationSystemInfo: "The Australian education system is modeled on the British system, emphasizing research and practical skills. A Bachelor's degree is typically three years, while Master's degrees range from 1 to 2 years. The system is regulated by the government through the Australian Qualifications Framework (AQF), ensuring high standards across all institutions.",
        admissionProcessInfo: "1. Apply to University: Submit an application to your chosen institution.\n2. Receive Offer: Get a Letter of Offer from the university.\n3. Confirmation of Enrolment (CoE): Accept the offer and pay the tuition deposit to receive your CoE.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: $22,000 - $50,000 AUD per year.\n\nLiving Costs:\n- The Department of Home Affairs requires students to show they have access to at least $21,041 AUD for living costs for one year. Major cities like Sydney and Melbourne are more expensive.",
        visaGuide: {
            overview: "The Australian Student Visa (subclass 500) allows you to stay in Australia to study full-time in a registered course. A key component of the application is satisfying the Genuine Temporary Entrant (GTE) requirement.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Confirmation of Enrolment (CoE)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })) },
                { item: 'GTE Statement', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" })) },
                { item: 'Financial Capacity Evidence', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'Overseas Student Health Cover (OSHC)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" })) },
                { item: 'English Proficiency Test Results', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" })) }
            ],
            steps: [
                { title: 'Receive Confirmation of Enrolment (CoE)', description: "After accepting your university's Letter of Offer and paying the tuition deposit, you will receive your CoE. This document is essential for the visa application." },
                { title: 'Prepare GTE and Financial Documents', description: "Write a detailed Genuine Temporary Entrant (GTE) statement explaining your reasons for choosing Australia and your course. Gather evidence of your financial capacity to cover all costs." },
                { title: 'Arrange Overseas Student Health Cover (OSHC)', description: "You must purchase an approved OSHC policy for the entire duration of your planned stay in Australia before you can apply for your visa." },
                { title: 'Lodge Your Visa Application Online', description: "Create an ImmiAccount on the Department of Home Affairs website, fill in the application form, and upload all your documents, including your CoE, GTE statement, financial proof, and OSHC policy." },
                { title: 'Provide Biometrics', description: "After lodging your application, you will be required to visit a designated center to provide your biometrics (fingerprints and a photograph)." }
            ],
            financials: [
                "You must demonstrate access to sufficient funds to cover travel, 12 months of course fees, and 12 months of living costs.",
                "The current minimum living cost requirement is AUD $24,505 per year for a single applicant.",
                "Evidence can include bank statements, education loans, or scholarship letters."
            ],
            interviewTips: [
                "Visa interviews are not standard for Australian student visas but can be requested by the case officer.",
                "Your GTE statement is your main interview. Be honest, detailed, and clear about your intentions.",
                "Research your course and university thoroughly and be able to explain how it will benefit your future career back in India.",
                "Ensure your financial documents are clear and the source of funds is legitimate and explainable."
            ],
            faq: [
                { question: "What is the GTE (Genuine Temporary Entrant) requirement?", answer: "The GTE is a personal statement where you must convince the Department of Home Affairs that you genuinely intend to stay in Australia temporarily for studies and not for other reasons. You need to provide details about your personal circumstances, ties to your home country, and the value of the course to your future." },
                { question: "Can my family accompany me?", answer: "Yes, you can include family members (your partner and your or your partner's dependent children) in your student visa application. You will need to show additional funds for their living expenses." }
            ]
        },
        postStudyWorkInfo: "Temporary Graduate visa (subclass 485):\nThis visa has two main streams:\n- Post-Study Work stream: For students who graduate with a higher education degree. It allows them to stay and work for 2 to 4 years, depending on their qualification and the location of their study.\n- Graduate Work stream: For students with specific qualifications related to occupations on the skills shortage list.\nThis visa is an excellent pathway to gain work experience and potentially qualify for a skilled migration visa later.",
        scholarshipsInfo: "Australia is committed to supporting international students:\n- Australia Awards: Government-funded scholarships for students from specific countries, offering full tuition, travel, and living expenses.\n- Provider Scholarships: Almost all Australian universities offer scholarships for international students based on academic merit. These can range from a percentage of tuition fees (e.g., 25-50%) to a fixed amount.\n- Research Training Program (RTP): For students pursuing research-based Master's or PhDs, the RTP provides tuition fee offsets and stipends.",
        coursesInfo: "Australia is renowned for its programs in:\n- Information Technology (especially Data Science and Cyber Security)\n- Engineering\n- Business and Accounting\n- Healthcare (Nursing, Public Health)\n- Hospitality and Tourism\n- Environmental Sciences",
        faq: [
            { question: "What is the Genuine Temporary Entrant (GTE) requirement?", answer: "GTE is a key part of the visa application where you must prove that you are coming to Australia temporarily for the purpose of studying and intend to return home after your education. This is assessed based on your personal circumstances, immigration history, and the value of the course to your future." },
            { question: "What is OSHC?", answer: "Overseas Student Health Cover (OSHC) is mandatory health insurance for international students in Australia. You must have OSHC for the entire duration of your student visa." },
            { question: "How much can I work as a student in Australia?", answer: "Currently, student visa holders can work up to 48 hours per fortnight while their course is in session and unlimited hours during scheduled course breaks. Policies can change, so it's best to check the official government website for the latest rules." }
        ],
        topUniversities: [
            { name: "Australian National University", qsRanking: 30, logo: "https://logo.clearbit.com/anu.edu.au" },
            { name: "University of Melbourne", qsRanking: 13, logo: "https://logo.clearbit.com/unimelb.edu.au" },
            { name: "University of Sydney", qsRanking: 18, logo: "https://logo.clearbit.com/sydney.edu.au" },
            { name: "UNSW Sydney", qsRanking: 19, logo: "https://logo.clearbit.com/unsw.edu.au" }
        ]
    },
    germany: {
        name: "Germany",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2 6h20M2 12h20M2 18h20" })),
        heroImage: "https://images.unsplash.com/photo-1560026333-b8279205a5a3?q=80&w=2070&auto=format&fit=crop",
        intro: "Germany is a powerhouse of engineering and research, offering world-class education with little to no tuition fees at its public universities. It combines a rich cultural history with a modern, high-tech economy, making it an ideal destination for ambitious students.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-germany', hair: 'short06', eyes: 'variant03', skinColor: 'D88C7A', hairColor: '2c1b18', clothing: 'blazer', clothingColor: '000000' } },
        whyStudy: [
            { title: "No Tuition Fees", point: "Most public universities in Germany offer high-quality education with no tuition fees, even for international students.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" })) },
            { title: "Engineering & Tech", point: "As the birthplace of 'Industry 4.0', Germany is a global leader in automotive, mechanical, and electrical engineering.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 10V3L4 14h7v7l9-11h-7z" })) },
            { title: "Research Hub", point: "Strong focus on research with world-renowned institutions like Max Planck and Fraunhofer, providing excellent PhD opportunities.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.022a2 2 0 011.022-.547z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8a4 4 0 100-8 4 4 0 000 8z" })) },
            { title: "Post-Study Visa", point: "Graduates can stay for 18 months to find a job, and the strong economy provides excellent career prospects.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })) }
        ],
        educationSystemInfo: "Germany's higher education is split between traditional research universities (Universitäten) and universities of applied sciences (Fachhochschulen). Master's degrees are typically two years and are either consecutive (building on a related Bachelor's) or non-consecutive. The system is highly regarded for its research-intensive approach and strong links to industry.",
        admissionProcessInfo: "1. Find a Program: Use the DAAD database to find a suitable program.\n2. Check Requirements: Ensure you meet the academic and language (German or English) requirements.\n3. Apply: Apply either directly to the university or through the Uni-Assist portal for many universities.",
        costOfStudyingInfo: "Tuition Fees:\n- Public Universities: Free for most programs (a small semester contribution of €150-€300 applies).\n- Private Universities: €10,000 - €25,000 per year.\n\nLiving Costs:\n- A 'Blocked Account' (Sperrkonto) is required for the visa, proving you have sufficient funds. The current mandatory amount is €11,208 for one year, which equates to €934 per month.",
        visaGuide: {
            overview: "To study in Germany, you need a German National Visa for the purpose of studying. A key requirement is the 'Blocked Account' (Sperrkonto) to prove you can finance your stay.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Letter of Admission', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Proof of Financial Means (Blocked Account)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'Travel Health Insurance', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" })) },
            ],
            steps: [
                { title: 'Get University Admission', description: "First, secure an admission letter from a German university." },
                { title: 'Open a Blocked Account (Sperrkonto)', description: "Open a blocked account with a provider like Fintiba or Expatrio and deposit the required amount (currently €11,208) for your living expenses." },
                { title: 'Book Visa Appointment', description: "Schedule an appointment for your national visa application at the German embassy or consulate in your region via the VFS Global website." },
                { title: 'Prepare Documents & Attend Interview', description: "Gather all required documents, including the application form, passport, photos, admission letter, and proof of blocked account, and attend your scheduled appointment." }
            ],
            financials: ["A blocked account with €11,208 is the standard proof of funds. An official scholarship letter (e.g., from DAAD) can also serve as proof."],
            interviewTips: ["The interview is straightforward. Be prepared to explain your motivation for choosing Germany and your specific course.", "Clearly state your study plans and career goals.", "Knowledge of basic German can be an advantage, even for English-taught programs."],
            faq: [
                { question: "What is a Blocked Account (Sperrkonto)?", answer: "It's a special bank account required for the German student visa. You deposit a year's worth of living expenses, and you can only withdraw a fixed monthly amount (€934) after arriving in Germany, ensuring you have stable funds for your studies." },
                { question: "Do I need to learn German to study in Germany?", answer: "Not necessarily. There are over 2,000 programs taught entirely in English. However, learning basic German is highly recommended for daily life and will significantly improve your job prospects after graduation." }
            ]
        },
        postStudyWorkInfo: "Job Seeker Visa:\n- Graduates from German universities can apply for a residence permit to stay in the country and seek employment for up to 18 months.\n- During this period, you can take up any kind of employment to support yourself.\n- Once you find a job that matches your qualifications, you can apply for a German residence permit or an EU Blue Card.",
        scholarshipsInfo: "While public education is free, there are scholarships for living costs:\n- DAAD Scholarships: The German Academic Exchange Service (DAAD) offers a wide range of scholarships for international students covering living expenses.\n- Deutschlandstipendium: This program provides a monthly stipend of €300, half from the government and half from private sponsors.\n- University-Specific Scholarships: Many universities offer their own scholarships for talented international students.",
        coursesInfo: "Germany is a global leader in technical and scientific fields. Popular courses include:\n- Automotive Engineering\n- Mechanical Engineering\n- Computer Science & Informatics\n- Data Science & Analytics\n- Renewable Energy\n- Business & Management",
        faq: [
            { question: "What is Uni-Assist?", answer: "Uni-Assist is a centralized admissions portal for international students used by many German universities. It evaluates your application documents to see if you meet the formal requirements for admission before forwarding your application to the universities you choose." },
            { question: "Can I work while studying?", answer: "Yes, international students are allowed to work for 120 full days or 240 half days per year. This helps in covering living expenses." }
        ],
        topUniversities: [
            { name: "Technical University of Munich (TUM)", qsRanking: 28, logo: "https://logo.clearbit.com/tum.de" },
            { name: "Ludwig Maximilian University of Munich (LMU)", qsRanking: 59, logo: "https://logo.clearbit.com/lmu.de" },
            { name: "Heidelberg University", qsRanking: 84, logo: "https://logo.clearbit.com/uni-heidelberg.de" }
        ]
    },
    ireland: {
        name: "Ireland",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.5,18.5a.5.5,0,0,1,0,1H13a.5.5,0,0,1,0-1Z" })),
        heroImage: "https://images.unsplash.com/photo-1576702251953-274a27aa4693?q=80&w=1974&auto=format&fit=crop",
        intro: "Known as the 'Silicon Docks of Europe', Ireland is a vibrant, English-speaking country offering a world-class education with close ties to the global tech industry. It combines a safe, friendly culture with excellent post-study work opportunities.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-ireland-female', hair: 'long06', eyes: 'variant11', skinColor: 'F5C6A0', hairColor: 'cb6820', clothing: 'crewNeck', clothingColor: '009A44' } },
        whyStudy: [
            { title: "European Tech Hub", point: "Home to the European headquarters of top tech giants like Google, Facebook, Apple, and LinkedIn.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 12h14M12 5l7 7-7 7" })) },
            { title: "English-Speaking", point: "An English-speaking country in the heart of Europe, making it easy for international students to adapt and communicate.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 5h12M9 3v2m1.06 5.16l-4.16 4.16M16 12h5m-9-9v2M5 12H3m16 0h-2M12 21v-2m-3.53-3.53l-2-2m13.06-2l-2-2" })) },
            { title: "Post-Study Work Visa", point: "A generous 2-year post-study work visa allows Master's and PhD graduates to gain valuable work experience.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" })) },
            { title: "Safe & Friendly", point: "Consistently ranked as one of the safest and friendliest countries in the world, with a rich cultural heritage.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" })) }
        ],
        educationSystemInfo: "The Irish education system is part of the European Bologna Process, ensuring qualifications are recognized globally. Master's degrees are typically one year, offering an intensive and focused curriculum. The system is known for its high-quality research and strong industry collaboration, especially in the tech and pharmaceutical sectors.",
        admissionProcessInfo: "1. Choose a Course: Select a course and university.\n2. Apply Online: Most applications are made directly to the university's admissions office.\n3. Receive Offer: Secure an offer letter from the Irish university.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: €10,000 - €25,000 per year.\n\nLiving Costs:\n- For your student visa, you must demonstrate access to at least €10,000 for one academic year of living expenses. A more realistic budget, especially in Dublin, is around €12,000 - €15,000 per year.",
        visaGuide: {
            overview: "As an Indian student, you need to apply for a 'D' type study visa to enter Ireland. After arrival, you must register with the Garda National Immigration Bureau (GNIB/INIS) to get your Irish Residence Permit (IRP) card.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Letter of Acceptance', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Proof of Fee Payment', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h5.25M9 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" })) },
                { item: 'Proof of Funds (€10,000)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'Private Medical Insurance', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" })) }
            ],
            steps: [
                { title: 'Secure Admission', description: "Receive an unconditional Letter of Acceptance from your Irish university." },
                { title: 'Pay Tuition Fees', description: "Pay the required tuition fee deposit as mentioned in your offer letter and get a receipt." },
                { title: 'Arrange Finances and Insurance', description: "Gather proof of funds (e.g., education loan sanction letter, bank statements) and purchase private medical insurance." },
                { title: 'Apply Online', description: "Complete the online visa application form on the AVATS website, pay the fee, and submit it." },
                { title: 'Submit Documents', description: "Submit your passport and all supporting documents to the VFS centre in your jurisdiction." }
            ],
            financials: ["You must show you have sufficient funds to cover your course fees and living expenses. The current minimum living expense requirement is €10,000 for the first year."],
            interviewTips: ["Visa interviews are not always required for Ireland but can be requested.", "Clearly articulate your reasons for choosing Ireland and your specific course.", "Emphasize your intention to return to India after completing your studies and post-study work period."],
            faq: [
                { question: "What is the IRP card?", answer: "The Irish Residence Permit (IRP) is a credit-card-sized registration card that proves you are legally residing in Ireland. You must register and get your IRP card within 90 days of arriving in the country." },
                { question: "What is the Third Level Graduate Programme?", answer: "This is the official name for the post-study work visa. It allows eligible graduates with a Master's or PhD degree to remain in Ireland for 24 months to seek employment and work full-time." }
            ]
        },
        postStudyWorkInfo: "Third Level Graduate Programme (Stamp 1G):\n- Graduates with a Master's or PhD from an Irish university are eligible for a 24-month (2-year) post-study work visa.\n- This allows you to work full-time in any profession and is a direct pathway to gaining a full work permit and potentially long-term residency.",
        scholarshipsInfo: "Many Irish universities offer scholarships for Indian students:\n- Government of Ireland International Education Scholarship (GOI-IES): A prestigious scholarship offering a full tuition waiver and a €10,000 stipend for one year of study.\n- University Scholarships: Institutions like Trinity College Dublin, UCD, and NUI Galway offer merit-based scholarships, often providing partial tuition fee waivers (€2,000 - €5,000).",
        coursesInfo: "Ireland is a top destination for technology and science programs:\n- Data Science & Big Data Analytics\n- Software Engineering & Computer Science\n- Business Analytics\n- Pharmaceutical Sciences & Biotechnology\n- Digital Marketing\n- Finance",
        faq: [
            { question: "What is the difference between a college and a university in Ireland?", answer: "In Ireland, 'university' is a protected term for institutions that offer degrees up to the PhD level. 'Colleges' or 'Institutes of Technology' also offer high-quality degrees, often with a more practical or vocational focus." },
            { question: "Is Ireland an expensive country for students?", answer: "While Dublin can be as expensive as other major European cities, the overall cost of living and tuition is generally more affordable than in the UK or USA. The one-year Master's programs also help in reducing the total cost." }
        ],
        topUniversities: [
            { name: "Trinity College Dublin", qsRanking: 100, logo: "https://logo.clearbit.com/tcd.ie" },
            { name: "University College Dublin (UCD)", qsRanking: 176, logo: "https://logo.clearbit.com/ucd.ie" },
            { name: "University of Galway", qsRanking: 278, logo: "https://logo.clearbit.com/universityofgalway.ie" }
        ]
    },
    uae: {
        name: "UAE",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" })),
        heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
        intro: "The United Arab Emirates is a dynamic and futuristic hub for education and business. With state-of-the-art campuses, a highly international environment, and a focus on innovation, the UAE offers a unique study abroad experience in a tax-free landscape.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-uae', hair: 'short08', eyes: 'variant12', skinColor: 'AF6E5A', hairColor: '000000', clothing: 'shirt', clothingColor: '000000', accessories: 'sunglasses', accessoriesProbability: 100 } },
        whyStudy: [
            { title: "Global Business Hub", point: "Strategically located between East and West, it's a major center for trade, finance, and tourism, offering great internship opportunities.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" })) },
            { title: "Modern & Safe", point: "Known for its futuristic cities, modern infrastructure, and one of the highest safety ratings in the world.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" })) },
            { title: "Truly International", point: "With over 200 nationalities living and working in the UAE, you'll experience a highly diverse and multicultural environment.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" })) },
            { title: "Tax-Free Income", point: "The prospect of tax-free salaries after graduation is a major draw for students looking to kickstart their careers.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" })) }
        ],
        educationSystemInfo: "The UAE has heavily invested in its education sector, attracting branch campuses of many world-renowned universities alongside its own high-quality local institutions. The system is modern and focused on preparing students for the global workforce. Master's degrees are typically 1.5 to 2 years long.",
        admissionProcessInfo: "1. Select University: Choose from local universities or international branch campuses.\n2. Check Eligibility: Ensure you meet the specific academic and English language requirements (TOEFL/IELTS).\n3. Apply Online: Submit your application and required documents directly through the university's portal.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: $15,000 - $35,000 USD per year.\n\nLiving Costs:\n- Living costs are highest in Dubai and Abu Dhabi. Expect to budget around $1,200 - $1,800 USD per month for accommodation, food, and other expenses.",
        visaGuide: {
            overview: "Your student visa is typically sponsored by the university you are enrolled in. The university's administration office will guide you through the process after you have been accepted and paid your initial fees.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'University Offer Letter', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Passport Size Photos', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" })) },
                { item: 'Medical Fitness Test', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" })) }
            ],
            steps: [
                { title: 'Accept Your Offer', description: "Formally accept the admission offer from your university and pay the required tuition deposit." },
                { title: 'Submit Documents to University', description: "The university will act as your sponsor. You need to submit scanned copies of your passport, photos, and other required documents to their visa department." },
                { title: 'University Applies for Visa', description: "The university applies for your entry permit on your behalf. Once approved, they will send you a copy." },
                { title: 'Enter the UAE', description: "You can travel to the UAE using the entry permit." },
                { title: 'Complete Formalities in UAE', description: "After arrival, you will undergo a medical test and provide biometrics to complete the process of getting your student residence visa stamped in your passport." }
            ],
            financials: ["While a blocked account is not required, universities may ask for bank statements to prove you can cover your tuition and living expenses before they sponsor your visa."],
            interviewTips: ["No formal visa interview is conducted at an embassy. The entire process is managed by the university and immigration authorities within the UAE.", "Ensure all your documents are clear, valid, and submitted correctly to your university to avoid delays."],
            faq: [
                { question: "Who sponsors my student visa in the UAE?", answer: "Your university acts as your sponsor for the student visa. This simplifies the process as the university's visa office handles the application with the immigration authorities." },
                { question: "Can I work while studying in the UAE?", answer: "Yes, many free zones like Dubai International Academic City have programs that allow students to take on part-time work and internships with companies within the zone. Regulations can vary, so it's best to check with your university." }
            ]
        },
        postStudyWorkInfo: "Post-Study Work Options:\n- While there isn't a standardized post-study work visa like in other countries, the UAE has introduced long-term residence options.\n- 'Golden Visa' for Outstanding Students: High-achieving students (with a GPA of 3.8 or higher from accredited universities) may be eligible for a 10-year Golden Visa, allowing them to live and work in the UAE without a national sponsor.\n- Job Search: The majority of graduates find employment and their new employer then sponsors their work visa.",
        scholarshipsInfo: "Scholarships are widely available, especially from individual universities:\n- Academic Merit Scholarships: Most universities in the UAE offer generous scholarships to students with excellent academic records, often providing a tuition fee reduction of 15% to 50%.\n- Need-Based Grants: Some institutions also provide financial aid to students who can demonstrate financial need.\n- It is best to check the 'scholarships' or 'financial aid' section of the specific university you are applying to.",
        coursesInfo: "The UAE is a hub for business, finance, and modern technology courses:\n- Business Administration (MBA)\n- Finance and Accounting\n- Hospitality and Tourism Management\n- Engineering (Civil, Petroleum, Electrical)\n- Computer Science & Artificial Intelligence\n- Architecture and Design",
        faq: [
            { question: "What are international branch campuses?", answer: "These are campuses of well-known universities from other countries (e.g., UK, USA, Australia) that have been established in the UAE. They offer the same curriculum and degree as the main campus, providing a world-class education in a new location." },
            { question: "Is the UAE safe for international students?", answer: "The UAE is known for being one of the safest countries in the world, with very low crime rates and a high standard of living, making it an excellent and secure environment for students." }
        ],
        topUniversities: [
            { name: "Khalifa University", qsRanking: 203, logo: "https://logo.clearbit.com/ku.ac.ae" },
            { name: "American University of Sharjah", qsRanking: 369, logo: "https://logo.clearbit.com/aus.edu" },
            { name: "United Arab Emirates University", qsRanking: 261, logo: "https://logo.clearbit.com/uaeu.ac.ae" }
        ]
    },
    'new-zealand': {
        name: "New Zealand",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19,21.5a1,1,0,0,1-1.6-.8l-1.9-4.2a1,1,0,0,1,0-.9,1,1,0,0,1,.8-.5h1.3a1,1,0,0,0,.9-.6l3.4-6.8a1,1,0,0,0-1.7-.8l-3.5,7a1,1,0,0,1-.8.5H14a1,1,0,0,0-1,1,1,1,0,0,0,0,1l2,4.3a1,1,0,0,0,1.6.8Z" })),
        heroImage: "https://images.unsplash.com/photo-1507699622108-3835c2417445?q=80&w=2070&auto=format&fit=crop",
        intro: "New Zealand offers a unique blend of high-quality, internationally recognized education and an unbeatable quality of life. Known for its stunning landscapes, friendly people, and innovative spirit, it provides a safe and welcoming environment for students to thrive.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-nz-female', hair: 'long07', eyes: 'variant01', skinColor: 'E4A381', hairColor: '4D4D4D', clothing: 'blazer', clothingColor: '000000' } },
        whyStudy: [
            { title: "World-Class Education", point: "NZ qualifications are based on the British system and are recognized globally for their quality and practical focus.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { d: "M12 14l9-5-9-5-9 5 9 5z" }), React.createElement('path', { d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" })) },
            { title: "Incredible Quality of Life", point: "Consistently ranked as one of the safest and most peaceful countries, offering a perfect balance of city life and nature.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" })) },
            { title: "Innovation & Research", point: "A hub for research in fields like agriculture, environmental science, and technology, encouraging a hands-on learning approach.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" })) },
            { title: "Work Opportunities", point: "The Post-study Work Visa allows graduates to work for up to three years, providing a strong career foundation.", icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })) }
        ],
        educationSystemInfo: "New Zealand's education system is internationally respected for its high quality. A Bachelor's degree is three years, and a Master's degree is typically one to two years. The system promotes critical thinking and practical skills, with eight universities all ranked in the top 3% worldwide.",
        admissionProcessInfo: "1. Choose Program: Select a program and an approved education provider.\n2. Meet Entry Requirements: Fulfill the academic and English language proficiency (IELTS/PTE) criteria.\n3. Apply and Get Offer: Apply directly to the institution and receive an 'Offer of Place'.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: NZ$25,000 - NZ$45,000 per year.\n\nLiving Costs:\n- You must prove you have at least NZ$20,000 to cover your living expenses for the first year of study. This is a key requirement for the student visa application.",
        visaGuide: {
            overview: "The New Zealand Fee Paying Student Visa allows you to study full-time. The application process is primarily online and requires you to show you are a genuine student with sufficient funds for your stay.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Offer of Place', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Proof of Funds (NZ$20,000/year)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'Proof of Tuition Fee Payment', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h5.25M9 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" })) },
                // FIX: Added missing properties to the visaGuide object for New Zealand to conform to the VisaGuide interface.
                { item: 'Medical Examination Certificate', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" })) },
                { item: 'English Proficiency Test Results', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" })) }
            ],
            steps: [
                { title: 'Receive Offer of Place', description: "Secure your admission from an approved New Zealand education provider. This is the first and most crucial document." },
                { title: 'Gather Financial Evidence', description: "Collect documents to prove you have at least NZ$20,000 for your first year of living costs, plus funds to cover your tuition fees." },
                { title: 'Apply Online', description: "Complete the student visa application form on the official Immigration New Zealand website. Upload all your supporting documents." },
                { title: 'Pay Application Fee & Submit', description: "Pay the required visa application fee online and submit your application for processing." },
                { title: 'Await Decision', description: "Immigration New Zealand will assess your application. They may contact you for further information or an interview if required. Once approved, you'll receive your visa." }
            ],
            financials: [
                "You must provide evidence of sufficient funds to cover your living expenses for the first year of your study, which is currently set at NZ$20,000.",
                "You also need to show proof that you have paid your tuition fees or have access to funds to cover them.",
                "Acceptable evidence includes bank statements for the last 6 months, an education loan sanction letter, or an official scholarship award letter."
            ],
            interviewTips: [
                "Visa interviews are not standard for New Zealand but may be requested if the visa officer needs clarification.",
                "Be prepared to clearly explain your reasons for choosing New Zealand, your specific course, and your chosen institution.",
                "Articulate your future career plans and how your studies in New Zealand will help you achieve them back in your home country.",
                "Be honest and confident in your answers."
            ],
            faq: [
                { question: "What is an 'Offer of Place'?", answer: "This is the official acceptance letter from your chosen New Zealand institution. It must be unconditional and is a mandatory document for your visa application." },
                { question: "Can I work while studying in New Zealand?", answer: "Yes, most student visa holders are permitted to work up to 20 hours per week during the academic year and full-time during scheduled holidays, like the summer break." }
            ]
        },
        postStudyWorkInfo: "New Zealand's Post-study Work Visa allows eligible graduates to work for any employer in any job.\n- Duration: The length of the visa can be up to 3 years, depending on your qualification.\n- Pathway to Residence: This visa provides a great opportunity to gain skilled work experience in New Zealand, which can be a stepping stone towards applying for a skilled migrant residence visa.",
        scholarshipsInfo: "There are several scholarships available for international students in New Zealand:\n- New Zealand Government Scholarships: These are prestigious scholarships, such as the New Zealand International Scholarships, which cover full tuition, living allowances, and travel costs.\n- University Scholarships: All eight of New Zealand's universities offer a range of scholarships for international students based on academic merit. These often provide partial tuition fee waivers.",
        coursesInfo: "New Zealand offers high-quality programs, particularly in:\n- Business & Management\n- Engineering (Civil, Mechanical)\n- Information Technology & Data Science\n- Agriculture & Environmental Science\n- Tourism & Hospitality\n- Health Sciences",
        faq: [
            { question: "What is the education system like in New Zealand?", answer: "New Zealand follows the British education system, which is known for its quality and is recognized worldwide. All eight universities are ranked within the top 3% globally, ensuring a high standard of education." },
            { question: "Is New Zealand a good country for international students?", answer: "Yes, New Zealand is considered one of the safest, friendliest, and most peaceful countries in the world. It offers a great work-life balance and a welcoming environment for students from all backgrounds." }
        ],
        topUniversities: [
            { name: "University of Auckland", qsRanking: 66, logo: "https://logo.clearbit.com/auckland.ac.nz" },
            { name: "University of Otago", qsRanking: 214, logo: "https://logo.clearbit.com/otago.ac.nz" }
        ]
    }
};
