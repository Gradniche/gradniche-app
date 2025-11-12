import React from 'react';
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
        postStudyWorkInfo: "The Graduate Route:\nThis is the UK's post-study work visa. It allows eligible international students to stay in the UK to work, or look for work, for 2 years (3 years for PhD graduates) after they have successfully completed their course. This visa is a great opportunity to gain valuable work experience in the UK.",
        scholarshipsInfo: "The UK offers many prestigious scholarships for Indian students:\n- Chevening Scholarships: The UK government's global scholarship programme, offering full funding for Master's degrees.\n- Commonwealth Scholarships: For students from Commonwealth countries, offering various scholarships for Master's and PhD studies.\n- GREAT Scholarships: A joint programme by the British Council and UK universities, offering scholarships for Indian students for a one-year Master's degree.",
        coursesInfo: "The UK is a popular destination for a wide variety of subjects:\n- Business, Management & Finance\n- Engineering & Technology\n- Law\n- Art & Design\n- Computer Science and Data Science\n- Medicine and Life Sciences",
        faq: [
            { question: "Are one-year Master's degrees from the UK valuable?", answer: "Yes, absolutely. One-year Master's degrees from the UK are globally recognized and highly respected by employers. The intensive nature of the course is well understood and valued. It also allows you to enter the workforce a year earlier." },
            { question: "What is a 'conditional' vs 'unconditional' offer?", answer: "A conditional offer means you still need to meet certain requirements, such as achieving a specific score on your English test or in your final undergraduate exams. An unconditional offer means you have met all the requirements and your place is confirmed." },
            { question: "Can I bring my family with me on a Student Visa?", answer: "If you are studying a postgraduate course of 9 months or longer, or a government-sponsored student, you may be able to bring your dependents (partner and children under 18) with you." }
        ],
        topUniversities: [
            { name: "University of Cambridge", qsRanking: 2, logo: "https://logo.clearbit.com/cam.ac.uk" },
            { name: "University of Oxford", qsRanking: 4, logo: "https://logo.clearbit.com/ox.ac.uk" },
            { name: "Imperial College London", qsRanking: 8, logo: "https://logo.clearbit.com/imperial.ac.uk" },
            { name: "UCL (University College London)", qsRanking: 10, logo: "https://logo.clearbit.com/ucl.ac.uk" }
        ]
    },
    australia: {
        name: "Australia",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })),
        heroImage: "https://images.unsplash.com/photo-1624555130298-e6b42c34a0d2?q=80&w=1974&auto=format&fit=crop",
        intro: "Australia offers a world-class education combined with an unbeatable lifestyle. Known for its vibrant cities, stunning landscapes, and friendly culture, it provides a high-quality, hands-on learning experience with generous post-study work rights.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-australia-female', hair: 'long02', eyes: 'variant07', skinColor: 'C47D6A', hairColor: 'B86B25', clothing: 'crewNeck', clothingColor: 'FFCD00' } },
        whyStudy: [
            { 
                title: "Globally Ranked", 
                point: "Australian universities are consistently ranked among the top in the world, particularly in fields like engineering, medicine, and environmental science.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.002 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.002 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" }))
            },
            { 
                title: "Post-Study Work", 
                point: "Generous Temporary Graduate visa (subclass 485) allows graduates to work for 2-4 years, providing a pathway to professional careers.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M briefcase" }))
            },
            { 
                title: "Quality of Life", 
                point: "Enjoy a high standard of living, vibrant multicultural cities, and stunning natural beauty, from beaches to the outback.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 10V3L4 14h7v7l9-11h-7z" }))
            },
            { 
                title: "Research Focus", 
                point: "Australia is a leader in global research, making significant contributions in fields like environmental sciences and medical research.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 011.806-.547z" }))
            }
        ],
        educationSystemInfo: "The Australian education system is modeled on the British system. A Bachelor's degree is typically 3 years, while a Master's degree is 1.5-2 years. The system is regulated by the Australian Qualifications Framework (AQF), ensuring consistent quality across all institutions. There is a strong emphasis on practical, real-world skills and group-based project work.",
        admissionProcessInfo: "1. Select Course & University: Use a platform like GradNiche to research your options.\n2. Apply: Submit your application directly to the university with all required documents (transcripts, English test scores, SOP, etc.).\n3. Receive Offer: If successful, you will receive a Letter of Offer.\n4. Accept & Pay: Accept your offer and pay the tuition deposit to receive your Confirmation of Enrolment (CoE).",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: $25,000 - $50,000 AUD per year.\n\nLiving Costs:\n- The Australian government requires students to show they have access to at least $21,041 AUD for living costs for one year.",
        visaGuide: {
            overview: "The Student visa (subclass 500) allows you to stay in Australia to study full-time in a CRICOS-registered course. You can generally include family members in your application.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Confirmation of Enrolment (CoE)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })) },
                { item: 'Proof of Financial Capacity', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'Genuine Temporary Entrant (GTE)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" })) },
                { item: 'Overseas Student Health Cover (OSHC)', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" })) },
            ],
            steps: [
                { title: 'Receive Confirmation of Enrolment (CoE)', description: "After accepting your offer and paying your deposit, your university will provide you with a CoE." },
                { title: 'Create an ImmiAccount', description: "Create an account on the Australian Department of Home Affairs' ImmiAccount portal. This is where you will lodge your visa application." },
                { title: 'Gather and Prepare Documents', description: "Collect all necessary documents, including your CoE, financial proof, OSHC policy, and write a strong Genuine Temporary Entrant (GTE) statement." },
                { title: 'Lodge Your Application', description: "Complete the online application form in your ImmiAccount, upload all your documents, and pay the visa application fee." },
                { title: 'Provide Biometrics & Health Check', description: "You may be required to provide biometrics (fingerprints and photo) and undergo a health examination as part of your application." }
            ],
            financials: [
                "You must show evidence of sufficient funds to cover your travel, tuition, and living costs.",
                "The minimum required amount for living expenses is currently AUD $21,041 for one year.",
                "Evidence can include bank deposits, loan documents, or scholarship letters."
            ],
            interviewTips: [
                "Interviews are not always required but can be requested by the case officer.",
                "Be prepared to explain your GTE statement in detail.",
                "Your main goal is to prove that your primary purpose is to study and that you intend to return home after your studies.",
                "Have clear reasons for choosing Australia, your specific institution, and your course."
            ],
            faq: [
                { question: "What is the GTE requirement?", answer: "The Genuine Temporary Entrant (GTE) is a personal statement you write to prove that you are coming to Australia temporarily to gain a quality education and that you intend to return home afterward. You need to provide details about your personal circumstances in your home country and your potential circumstances in Australia." },
                { question: "What is OSHC?", answer: "Overseas Student Health Cover (OSHC) is a mandatory health insurance for international students in Australia. You must have OSHC for the entire duration of your stay. Universities often have a preferred provider they can arrange for you." }
            ]
        },
        postStudyWorkInfo: "Temporary Graduate visa (subclass 485):\n- Post-Study Work stream: This allows you to live, study and work in Australia temporarily after you have finished your studies. The length of your stay depends on your qualification, typically 2 years for a Master's by coursework and 3 years for a Master's by research.\n- Recent changes have extended these durations for certain in-demand degrees.",
        scholarshipsInfo: "Australia offers a range of scholarships for international students:\n- Australia Awards: Prestigious, government-funded scholarships for students from developing countries to undertake full-time study.\n- Destination Australia: Scholarships to study in regional Australia, providing funding for both tuition and living expenses.\n- University-specific Scholarships: Most Australian universities offer a wide variety of scholarships based on academic merit.",
        coursesInfo: "Australia is a great choice for various fields:\n- Business & Management\n- Engineering (especially Mining and Civil)\n- Information Technology & Data Science\n- Environmental Sciences & Marine Biology\n- Hospitality & Tourism",
        faq: [
            { question: "Can I work while studying in Australia?", answer: "Yes. The student visa allows you to work up to 48 hours per fortnight during your study periods and unlimited hours during scheduled course breaks." },
            { question: "What is CRICOS?", answer: "CRICOS stands for the Commonwealth Register of Institutions and Courses for Overseas Students. You must study a course registered on CRICOS to be eligible for a student visa. This ensures the course and institution meet high standards set by the Australian government." },
            { question: "Is it expensive to live in Australia?", answer: "Living costs can be high, especially in major cities like Sydney and Melbourne. However, the ability to work part-time helps offset these costs, and the high quality of life is a major draw for many students." }
        ],
        topUniversities: [
            { name: "The Australian National University", qsRanking: 30, logo: "https://logo.clearbit.com/anu.edu.au" },
            { name: "The University of Melbourne", qsRanking: 33, logo: "https://logo.clearbit.com/unimelb.edu.au" },
            { name: "The University of Sydney", qsRanking: 41, logo: "https://logo.clearbit.com/sydney.edu.au" },
            { name: "The University of New South Wales (UNSW)", qsRanking: 45, logo: "https://logo.clearbit.com/unsw.edu.au" }
        ]
    },
    germany: {
        name: "Germany",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 5v14M9 5v14M5 9h14M5 15h14" })),
        heroImage: "https://images.unsplash.com/photo-1595393045353-295e85c88941?q=80&w=2070&auto=format&fit=crop",
        intro: "Germany is a global powerhouse in engineering and research, famous for its high-quality, tuition-free education at public universities. It offers a unique blend of historic culture and modern innovation in the heart of Europe.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-germany', hair: 'short06', eyes: 'variant03', skinColor: 'D88C7A', hairColor: '2c1b18', clothing: 'blazer', clothingColor: '000000' } },
        whyStudy: [
            { 
                title: "Tuition-Free Education", 
                point: "Most public universities in Germany charge no tuition fees for Master's programs, even for international students.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.828 15.172a.5.5 0 01.354.146l.707.707a.5.5 0 010 .707l-2.121 2.121a.5.5 0 01-.707 0L8 16.828a.5.5 0 01.146-.354l.707-.707a.5.5 0 01.707 0z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18.5a.5.5 0 01.49.59l-1.07 3.22a.5.5 0 01-.978 0l-1.07-3.22a.5.5 0 01.49-.59z" }))
            },
            { 
                title: "Engineering Excellence", 
                point: "Globally renowned for its automotive, mechanical, and industrial engineering programs with strong industry links.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 10V3L4 14h7v7l9-11h-7z" }))
            },
            { 
                title: "Strong Economy", 
                point: "As Europe's largest economy, Germany offers excellent career prospects for graduates, especially in STEM fields.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }))
            },
            { 
                title: "Post-Study Work Visa", 
                point: "Graduates can stay for 18 months to find a job, with clear pathways to long-term work permits and residency.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }))
            }
        ],
        educationSystemInfo: "German higher education is divided into Universities (research-oriented) and Universities of Applied Sciences (Fachhochschulen, practice-oriented). Master's degrees are typically two years and can be taught in either German or English. The system is highly specialized and research-driven.",
        admissionProcessInfo: "1. Find a Program: Use platforms like DAAD to find suitable programs.\n2. Check Requirements: Ensure you meet the specific academic and language requirements.\n3. Apply: Apply either directly to the university or through the Uni-Assist portal for many universities.",
        costOfStudyingInfo: "Tuition Fees:\n- Public Universities: Free for most programs (a small semester contribution of €150-€300 is required).\n- Private Universities: €10,000 - €20,000 per year.\n\nLiving Costs:\n- You must show proof of funds in a 'Blocked Account' (Sperrkonto). The current required amount is €11,208 for one year.",
        visaGuide: {
            overview: "A German National Visa (D-Visa) for the purpose of studying is required to enter Germany for your studies. Upon arrival, you will convert this into a residence permit.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'University Admission Letter', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Blocked Account Confirmation', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'Health Insurance', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" })) },
            ],
            steps: [
                { title: 'Open a Blocked Account', description: "This is the most crucial step. You must deposit the required amount (€11,208 as of 2023) into a German blocked account to prove you can cover your living expenses." },
                { title: 'Get Health Insurance', description: "You need to get travel health insurance for the visa process, which you will later convert to a German public or private health insurance upon arrival." },
                { title: 'Schedule an Appointment', description: "Book a visa appointment at the German embassy or consulate in your jurisdiction via the VFS Global website." },
                { title: 'Attend the Interview', description: "Submit your application and documents at the VFS centre. Your interview will focus on your motivation, academic background, and future plans." }
            ],
            financials: [
                "The blocked account is the primary proof of funds.",
                "A formal sponsorship letter ('Verpflichtungserklärung') from a resident in Germany is another option.",
                "Scholarship award letters are also accepted."
            ],
            interviewTips: [
                "Your motivation letter is key. Clearly articulate why you chose Germany and your specific program.",
                "Be prepared to answer questions about your future career plans in your home country.",
                "Even for English-taught programs, showing some basic German language skills is a plus."
            ],
            faq: [
                { question: "What is a Blocked Account (Sperrkonto)?", answer: "A blocked account is a special bank account for international students in Germany. You deposit a lump sum for your first year's living expenses, and you can only withdraw a fixed monthly amount. It serves as proof of financial resources for your visa." },
                { question: "Do I need to know German to study in Germany?", answer: "Not necessarily. Many Master's programs are taught entirely in English. However, learning basic German is highly recommended for daily life and will significantly improve your job prospects after graduation." }
            ]
        },
        postStudyWorkInfo: "After graduation, you can apply for a residence permit to seek work for up to 18 months. Once you find a job that matches your qualifications, you can apply for a German residence permit for work or an EU Blue Card, which is a pathway to permanent residency.",
        scholarshipsInfo: "While tuition is free, scholarships are available to cover living costs:\n- DAAD Scholarships: The German Academic Exchange Service offers a wide range of scholarships for international students.\n- Deutschlandstipendium: Provides €300 per month and is awarded by universities to high-achieving students.\n- Foundation Scholarships: Many political and religious foundations in Germany offer scholarships to international students.",
        coursesInfo: "Germany is a global leader in:\n- Automotive, Mechanical & Industrial Engineering\n- Renewable Energy\n- Computer Science & Informatics\n- Natural Sciences (Physics, Chemistry, Biology)\n- Business & Economics",
        faq: [
            { question: "Is education really free in Germany?", answer: "Yes, for the most part. All public universities in 15 out of 16 German states have no tuition fees for Master's programs. The state of Baden-Württemberg is the only exception, charging non-EU students €1,500 per semester. All students have to pay a small semester contribution of around €150-300." },
            { question: "What is Uni-Assist?", answer: "Uni-Assist is a centralized admissions portal used by many, but not all, German universities to process international student applications. It checks if your application meets the formal requirements before forwarding it to the universities." },
            { question: "Can I work part-time while studying?", answer: "Yes, international students are allowed to work for 120 full days or 240 half days per year. This can help cover your living expenses." }
        ],
        topUniversities: [
            { name: "Technical University of Munich (TUM)", qsRanking: 49, logo: "https://logo.clearbit.com/tum.de" },
            { name: "Ludwig-Maximilians-Universität München (LMU)", qsRanking: 59, logo: "https://logo.clearbit.com/lmu.de" },
            { name: "Heidelberg University", qsRanking: 65, logo: "https://logo.clearbit.com/uni-heidelberg.de" }
        ]
    },
    ireland: {
        name: "Ireland",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })),
        heroImage: "https://images.unsplash.com/photo-1576728741344-85019e262141?q=80&w=1935&auto=format&fit=crop",
        intro: "Known as the 'Silicon Valley of Europe', Ireland is a vibrant, English-speaking country with a fast-growing economy. It's home to the European headquarters of many tech giants, offering a dynamic environment and excellent career prospects for graduates.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-ireland-female', hair: 'long06', eyes: 'variant11', skinColor: 'F5C6A0', hairColor: 'cb6820', clothing: 'crewNeck', clothingColor: '009A44' } },
        whyStudy: [
            { 
                title: "Europe's Tech Hub", 
                point: "Home to the European HQs of Google, Facebook, Apple, and more, providing unparalleled job opportunities in tech.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 12h14M12 5l7 7-7 7" }))
            },
            { 
                title: "One-Year Master's", 
                point: "Most Master's programs are one year, allowing for a quicker, more cost-effective route to a high-quality European degree.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }))
            },
            { 
                title: "Post-Study Work Visa", 
                point: "The Third Level Graduate Programme provides a 2-year post-study work visa, allowing graduates to seek employment.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }))
            },
            { 
                title: "Friendly & Safe", 
                point: "Renowned for its friendly people, safe cities, and rich cultural heritage, providing a welcoming environment for students.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }))
            }
        ],
        educationSystemInfo: "Ireland's education system is part of the European Bologna Process, ensuring degrees are recognized worldwide. The system is similar to the UK's, with a strong focus on research and specialized one-year Master's programs.",
        admissionProcessInfo: "1. Choose a Course: Select a course and university.\n2. Apply Online: Most applications are made directly to the university's international office.\n3. Receive Offer: If accepted, you will receive a Letter of Offer.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: €12,000 - €25,000 per year.\n\nLiving Costs:\n- You must show proof of access to at least €10,000 for your first year of living expenses.",
        visaGuide: {
            overview: "Indian students need to apply for a 'D' type study visa to enter Ireland. The application is made online, and then you submit your documents to the VFS centre in your jurisdiction.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Letter of Acceptance', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Proof of Fee Payment', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h5.25M9 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" })) },
                { item: 'Financial Evidence', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
            ],
            steps: [
                { title: 'Apply Online', description: "Complete the AVATS online application form." },
                { title: 'Pay the Fee', description: "Pay the visa application fee online." },
                { title: 'Submit Documents', description: "Submit your printed summary form, passport, and all supporting documents to the relevant VFS office." },
                { title: 'Await Decision', description: "Processing times are typically 4-8 weeks." }
            ],
            financials: [
                "You must show evidence of access to at least €10,000 for the first year of your course.",
                "An education loan from an approved bank in India is a common way to show this.",
                "A statement of your (or your sponsor's) bank account for the previous six months is required."
            ],
            interviewTips: [
                "Interviews are rare but can be requested.",
                "Be ready to explain your 'gaps' in education, if any.",
                "Clearly state your reasons for choosing Ireland and your intention to return to India."
            ],
            faq: [
                { question: "What is the Third Level Graduate Programme?", answer: "It allows non-EU/EEA students who have graduated from Irish higher education institutions to remain in Ireland for up to 24 months to seek employment. Once you find a job, you can apply for a Green Card or Work Permit." },
                { question: "Is a part-time job easy to find in Ireland?", answer: "Yes, in major cities like Dublin, Cork, and Galway, it's relatively easy to find part-time jobs in the retail and hospitality sectors. Students can work up to 20 hours per week during term time." }
            ]
        },
        postStudyWorkInfo: "The Third Level Graduate Programme allows eligible graduates to remain in Ireland and work for up to 24 months. This provides an excellent opportunity to gain work experience in Europe's booming tech and pharmaceutical sectors and potentially secure a long-term work permit.",
        scholarshipsInfo: "Many Irish universities offer merit-based scholarships for Indian students, typically in the form of tuition fee waivers from €2,000 to €5,000. The Government of Ireland International Education Scholarship is a prestigious award that provides a full tuition waiver and a €10,000 stipend for one year.",
        coursesInfo: "Ireland's booming economy has created high demand for graduates in:\n- Data Science & Big Data\n- Software Engineering & Cloud Computing\n- Business Analytics\n- Pharmaceutical Sciences & Biotechnology\n- Financial Services",
        faq: [
            { question: "Is Ireland a good option for tech students?", answer: "Absolutely. With the European headquarters of Google, Apple, Facebook, LinkedIn, and many others located in Dublin, it is one of the best places in the world to launch a career in technology." },
            { question: "What is the difference between a college and a university in Ireland?", answer: "In Ireland, 'university' is a protected term for institutions that offer degrees up to the doctoral level and have a strong research focus. 'Colleges' or 'Institutes of Technology' typically focus on vocational and professional training, though many now also have university status." }
        ],
        topUniversities: [
            { name: "Trinity College Dublin", qsRanking: 101, logo: "https://logo.clearbit.com/tcd.ie" },
            { name: "University College Dublin", qsRanking: 181, logo: "https://logo.clearbit.com/ucd.ie" },
            { name: "National University of Ireland Galway", qsRanking: 270, logo: "https://logo.clearbit.com/nuigalway.ie" }
        ]
    },
    uae: {
        name: "UAE",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.343a9 9 0 0110.592 0m-12.592 0A9 9 0 009.296 2.343M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })),
        heroImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop",
        intro: "The United Arab Emirates, particularly Dubai, has rapidly emerged as a global hub for business, finance, and tourism. It offers a unique study abroad experience with modern universities, a highly international environment, and tax-free earning potential.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-uae', hair: 'short08', eyes: 'variant12', skinColor: 'AF6E5A', hairColor: '000000', clothing: 'shirt', clothingColor: '000000', accessories: 'sunglasses', accessoriesProbability: 100 } },
        whyStudy: [
            { 
                title: "Global Business Hub", 
                point: "Study in a strategic location with a booming economy and strong opportunities in finance, hospitality, and trade.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }))
            },
            { 
                title: "International Environment", 
                point: "Experience a truly global classroom, with a vast expatriate population and students from over 150 nationalities.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" }))
            },
            { 
                title: "Tax-Free Earnings", 
                point: "Post-graduation employment in the UAE comes with the major benefit of tax-free salaries, maximizing your savings.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" }))
            },
            { 
                title: "Golden Visa for Students", 
                point: "Outstanding students may be eligible for a 10-year Golden Visa, providing long-term residency and stability.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 3v4M3 5h4M6 17v4m-2-2h4M14 3v4m-2 2h4M15 17v4m-2-2h4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }))
            }
        ],
        educationSystemInfo: "The UAE has a rapidly developing higher education sector with a mix of federal institutions, private universities, and branch campuses of international universities from the US, UK, and Australia. This offers students a wide choice of curricula and qualifications.",
        admissionProcessInfo: "1. Choose University: Select from local universities or international branch campuses.\n2. Apply: Applications are typically made online directly to the university.\n3. Offer: Receive an offer letter upon meeting the requirements.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: $15,000 - $35,000 USD per year.\n\nLiving Costs:\n- Approximately $1,000 - $1,500 USD per month, with accommodation being the largest expense.",
        visaGuide: {
            overview: "The student visa for the UAE is typically sponsored by the university you are enrolled in. The university's administration will guide you through the process after you have been accepted.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'University Admission Letter', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Tuition Fee Receipt', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h5.25M9 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" })) },
                { item: 'Medical Fitness Test', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" })) },
            ],
            steps: [
                { title: 'University Applies for Entry Permit', description: "After you pay your fees, the university will apply for an entry permit on your behalf, which allows you to enter the UAE." },
                { title: 'Arrive in UAE', description: "Travel to the UAE using the entry permit." },
                { title: 'Medical Test & Biometrics', description: "Once in the UAE, you will undergo a medical fitness test and provide your biometrics for the Emirates ID." },
                { title: 'Visa Stamping', description: "The university will submit your passport for visa stamping, which is the final step in getting your one-year renewable residence visa." }
            ],
            financials: ["Proof of funds is generally submitted to the university, not the embassy.", "The university will guide you on the specific financial documents they require."],
            interviewTips: ["There is typically no visa interview required at an embassy for a UAE student visa, as the process is handled in-country by the university sponsor."],
            faq: [
                { question: "What is the Golden Visa for students?", answer: "The UAE offers a 10-year Golden Visa to outstanding students who have a GPA of at least 3.8 (or equivalent). This provides long-term residency and is a significant benefit for those looking to build a career in the UAE." }
            ]
        },
        postStudyWorkInfo: "The UAE offers various avenues for graduates to find work. There is no specific 'post-study work visa', but graduates can transfer from a student visa to an employment visa once they secure a job. The introduction of the Golden Visa for exceptional students also provides a long-term residency option.",
        scholarshipsInfo: "Many universities in the UAE, especially international branch campuses, offer generous merit-based scholarships for Indian students, often in the form of tuition fee reductions ranging from 15% to 50% or more.",
        coursesInfo: "The UAE is becoming a hub for specialized programs, including:\n- Hospitality & Tourism Management\n- Business & Finance (MBA, FinTech)\n- Logistics & Supply Chain Management\n- Architecture & Design\n- Artificial Intelligence",
        faq: [
            { question: "Can I get an internationally recognized degree in the UAE?", answer: "Yes. Many reputable universities from the UK, USA, and Australia have branch campuses in the UAE. You receive the same degree as you would on their home campus, which is globally recognized." },
            { question: "Is it safe to study in the UAE?", answer: "The UAE is known for being one of the safest countries in the world, with very low crime rates and a high standard of living." }
        ],
        topUniversities: [
            { name: "Khalifa University", qsRanking: 230, logo: "https://logo.clearbit.com/ku.ac.ae" },
            { name: "United Arab Emirates University", qsRanking: 290, logo: "https://logo.clearbit.com/uaeu.ac.ae" },
            { name: "American University of Sharjah", qsRanking: 364, logo: "https://logo.clearbit.com/aus.edu" }
        ]
    },
    'new-zealand': {
        name: "New Zealand",
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })),
        heroImage: "https://images.unsplash.com/photo-1595893547194-e87a26f30628?q=80&w=2070&auto=format&fit=crop",
        intro: "New Zealand offers a world-class, British-based education system amidst stunning natural landscapes. It's known for its excellent quality of life, friendly and safe environment, and innovative research in niche fields.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-nz-female', hair: 'long07', eyes: 'variant01', skinColor: 'E4A381', hairColor: '4D4D4D', clothing: 'blazer', clothingColor: '000000' } },
        whyStudy: [
            { 
                title: "Quality of Life", 
                point: "Consistently ranked as one of the best countries for work-life balance, safety, and overall well-being.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }))
            },
            { 
                title: "Globally Recognized", 
                point: "All eight of New Zealand's universities are ranked in the top 3% worldwide, offering a high-quality, internationally respected education.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }))
            },
            { 
                title: "Post-Study Work Rights", 
                point: "Graduates are eligible for a post-study work visa for up to 3 years, providing a great opportunity to launch a global career.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }))
            },
            { 
                title: "Innovative Research", 
                point: "Known for its practical and innovative approach to research, especially in fields like agriculture, conservation, and renewable energy.",
                icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }))
            }
        ],
        educationSystemInfo: "New Zealand's education system is based on the British model. It has 8 universities, all of which are public. The focus is on research-based teaching, and students are encouraged to think critically and independently. A Master's degree is typically 1-2 years.",
        admissionProcessInfo: "1. Select Course: Choose your course and university.\n2. Apply: Submit an application directly to the university with academic transcripts, English proficiency scores, and other required documents.\n3. Receive Offer: Get an 'Offer of Place' from the university.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: $25,000 - $45,000 NZD per year.\n\nLiving Costs:\n- You must show proof of at least $20,000 NZD for your first year of living expenses.",
        visaGuide: {
            overview: "The New Zealand Student Visa allows you to study full-time at an approved education provider. You must prove you have enough money for tuition and living costs and that you intend to leave after your studies.",
            documents: [
                { item: 'Valid Passport', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" })) },
                { item: 'Offer of Place', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) },
                { item: 'Proof of Funds', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12.75h3.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75z" })) },
                { item: 'Medical Certificates', icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" })) },
            ],
            steps: [
                { title: 'Receive Offer of Place', description: "Get an unconditional offer of place from an approved education provider." },
                { title: 'Gather Documents', description: "Collect all necessary documents, including proof of identity, financial evidence, and health certificates." },
                { title: 'Apply Online', description: "Complete the online application form on the Immigration New Zealand website and pay the application fee." },
                { title: 'Await Decision', description: "Processing times can vary. You may be asked for more information or an interview." }
            ],
            financials: [
                "You must show you have at least NZ$20,000 for your first year of study for living expenses.",
                "You also need to show proof that you have paid your tuition fees or have funds to cover them."
            ],
            interviewTips: [
                "Interviews are not standard but can be requested.",
                "Be ready to explain your choice of course and institution.",
                "Clearly state your intentions to return to your home country after your studies."
            ],
            faq: [
                { question: "Can I work on a student visa in New Zealand?", answer: "Yes, most student visa holders can work up to 20 hours per week during term time and full-time during scheduled holidays." },
                { question: "What is the post-study work visa in New Zealand?", answer: "After completing your studies, you may be eligible for a Post-study Work Visa, allowing you to work in New Zealand for 1, 2, or 3 years, depending on your qualification." }
            ]
        },
        postStudyWorkInfo: "New Zealand provides a balanced approach with good work opportunities and an excellent quality of life.\n- Post-study Work Visa: Graduates can work in New Zealand for up to 3 years, depending on their qualification.\n- Niche Sectors: Strong opportunities in unique fields like agri-tech, environmental science, and creative industries.",
        scholarshipsInfo: "Scholarships for New Zealand are available from individual universities and the government.\n- University Scholarships: Most universities offer scholarships for international students based on academic merit.\n- New Zealand Government Scholarships: These are prestigious awards for students from specific countries, often focused on development-related fields.",
        coursesInfo: "New Zealand is strong in:\n- Agri-tech and Food Science\n- Environmental Science and Conservation\n- Film and Creative Industries\n- Tourism and Hospitality\n- Engineering (especially Civil and Geothermal)",
        faq: [
            { question: "Is New Zealand safe for international students?", answer: "Yes, New Zealand is consistently ranked as one of the safest and most peaceful countries in the world, with a friendly and welcoming culture." },
            { question: "What is the quality of life like?", answer: "The quality of life is very high, known for its stunning natural landscapes, outdoor lifestyle, and excellent work-life balance." }
        ],
        topUniversities: [
            { name: "University of Auckland", qsRanking: 68, logo: "https://logo.clearbit.com/auckland.ac.nz" },
            { name: "University of Otago", qsRanking: 206, logo: "https://logo.clearbit.com/otago.ac.nz" }
        ]
    }
}
