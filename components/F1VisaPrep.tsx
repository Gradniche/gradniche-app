

import React, { useState } from 'react';

interface F1VisaPrepProps {
    onBack: () => void;
}

interface PrepQuestion {
    id: string;
    question: string;
    intent: string;
    tips: string[];
    sampleAnswer: string;
}

interface QuestionCategory {
    id: string;
    category: string;
    icon: React.ReactNode;
    questions: PrepQuestion[];
}

const whatToAvoidData = [
    { 
        title: "Sounding Rehearsed or Memorized", 
        description: "Instead of memorizing a script, which sounds robotic, focus on understanding the key points of your answers. Practice speaking naturally. The officer can easily spot a memorized answer and will ask follow-up questions you might not be prepared for."
    },
    { 
        title: "Expressing Immigrant Intent", 
        description: "Your visa is temporary. Avoid any mention of settling in the US, finding a job after graduation to stay, getting a green card, or having many relatives you plan to live with. Your answers must always circle back to your plan to return to India with your new skills."
    },
    { 
        title: "Being Vague or Dishonest", 
        description: "Clarity is key. Be precise about your university, course, finances, and post-study plans in India. Any form of dishonesty, from small lies to fake documents, is a critical error and will lead to an immediate rejection and a potential permanent ban."
    },
    { 
        title: "Arguing or Being Overly Casual", 
        description: "Maintain professionalism. Always be polite and respectful, even if the officer seems stern. Address them as 'Officer' or 'Sir/Ma'am'. Avoid being overly friendly, cracking jokes, or arguing. It's a formal interview, not a casual chat."
    },
    { 
        title: "Not Knowing Your Own Profile", 
        description: "You must be an expert on your application. Be prepared to answer any question about the details in your I-20 form, your financial documents (e.g., the source of funds), and your academic history without hesitation."
    },
    {
        title: "Focusing on Post-Study Work (OPT)",
        description: "While OPT is a benefit, it's not the goal. Your primary purpose is education. Mentioning OPT is okay if asked, but frame it as 'practical experience' that will benefit your career in India. Your long-term plans must be in your home country."
    }
];

const consulatesData = [
  { name: "U.S. Embassy New Delhi", address: "Shanti Path, Chanakyapuri, New Delhi - 110021" },
  { name: "U.S. Consulate General Chennai", address: "220, Anna Salai, Gemini Circle, Chennai - 600006" },
  { name: "U.S. Consulate General Hyderabad", address: "Survey No. 115/1, Financial District, Nanakramguda, Hyderabad - 500032" },
  { name: "U.S. Consulate General Kolkata", address: "5/1, Ho Chi Minh Sarani, Kolkata - 700071" },
  { name: "U.S. Consulate General Mumbai", address: "C-49, G Block, Bandra Kurla Complex, Bandra East, Mumbai - 400051" }
];

const rejectionReasons = [
    {
        title: "Failure to Prove Non-Immigrant Intent (Section 214(b))",
        description: "This is the most common reason. You must convince the officer you have strong ties (family, property, job prospects) that will compel you to return to India after your program.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    {
        title: "Insufficient or Unclear Financial Proof",
        description: "You must prove you have immediate, liquid funds to cover your first year of costs. If your documents are confusing or the source of funds is unclear, the visa will be denied.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    {
        title: "Inconsistent Answers & Fraudulent Documents",
        description: "Your answers must be consistent with your application. Any discrepancy can raise red flags. Providing fake documents will result in a permanent ban.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
        title: "Poor Interview Performance",
        description: "Sounding rehearsed, being disrespectful, or not knowing your own application details can lead to a negative impression and a denial. Confidence and clarity are key.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h4M9 12l2 2 4-4" /></svg>
    },
    {
        title: "Unconvincing Academic or Career Plan",
        description: "If you can't clearly articulate why you chose your specific university and course, and how it fits into your career plans back in India, your application will seem weak.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
];

const prepData: QuestionCategory[] = [
    {
        id: 'c1',
        category: 'Study & University Choice',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
        questions: [
            {
                id: 'q101',
                question: "Why do you want to study in the USA?",
                intent: "They want to understand your motivation for choosing the US education system over your home country's or another country's system.",
                tips: [
                    "Focus on the unique aspects of US education: practical approach, research opportunities, flexibility, and access to cutting-edge technology.",
                    "Avoid criticizing your home country's education system. Frame your answer positively.",
                    "Mention that the specific course/specialization is best offered in the US."
                ],
                sampleAnswer: "While India has excellent universities, the US education system is renowned for its practical, research-oriented approach, especially in my field of Robotics. The opportunity to work on hands-on projects and access to state-of-the-art labs at my chosen university is unparalleled. This practical exposure is crucial for my career goals and is a key feature of the US system that I find most valuable."
            },
             {
                id: 'q101b',
                question: "Why not study in India or any other country?",
                intent: "This is a follow-up to reinforce your specific reasons for choosing the USA. They want to ensure your decision is well-researched and not arbitrary.",
                tips: [
                    "Reiterate the specific advantages of the US program you've chosen.",
                    "You can briefly compare. For example, 'While a similar course exists in Canada, the US university has a specific research lab for...' or 'The curriculum in the US is more flexible than the one offered in the UK.'",
                    "Show you've considered other options but concluded the US is the best fit for your specific goals."
                ],
                sampleAnswer: "I did consider top universities in other countries like the UK and Canada. However, the Master's program at my chosen US university offers a unique interdisciplinary approach, combining AI with cognitive science, which is not available elsewhere. Additionally, the direct industry partnerships and the specific research being done by Professor John Doe's lab align perfectly with my academic and career aspirations."
            },
            {
                id: 'q102',
                question: "Which university are you going to? Why this university?",
                intent: "The officer wants to confirm you are a genuine student who has done thorough research. They need to see that your primary purpose is education, not just a way to get to the US.",
                tips: [
                    "Be specific. Don't just say 'it's a good university'.",
                    "Mention 2-3 unique features: a specific professor's research, a unique lab, a particular course, or strong industry connections in your field.",
                    "Show genuine enthusiasm and connect the university's strengths to your own goals."
                ],
                sampleAnswer: "I will be attending Carnegie Mellon University for its Master's in Information Systems Management. I chose CMU for a few key reasons. Firstly, its curriculum perfectly blends technology and business, which is my area of interest. I'm excited about the 'Data Analytics' concentration and the opportunity to learn from Professor Jane Smith, whose work in machine learning I've followed. Secondly, CMU's strong connections with tech companies will provide great internship opportunities, which is crucial for my goal of starting a tech consultancy back in India."
            },
            {
                id: 'q103',
                question: "How many universities did you apply to? How many admits and rejects?",
                intent: "To gauge how serious and focused your university search was. Applying to a reasonable number of well-researched universities shows you are a genuine student.",
                tips: [
                    "Be honest. It's normal to apply to 5-8 universities.",
                    "List a few of the universities you applied to and the number of admits.",
                    "Briefly mention a common theme in your choices (e.g., 'I focused on universities with strong robotics programs')."
                ],
                sampleAnswer: "I applied to 6 universities in total, all with strong programs in my field. I received admission offers from 3 of them: Carnegie Mellon, Arizona State University, and the University of Southern California. I was rejected by Stanford and MIT. I ultimately chose CMU because it was my top choice due to its specialized curriculum."
            },
            {
                id: 'q104',
                question: "Why this course?",
                intent: "To ensure you have a deep understanding of what you are going to study and that your choice is well-researched and aligns with your career goals.",
                tips: [
                    "Be very specific. Name 2-3 modules or subjects in the curriculum that excite you.",
                    "Explain how these specific modules will help you achieve your future career goals in India."
                ],
                sampleAnswer: "I chose the Master of Engineering Management program specifically for its modules on 'Supply Chain Management' and 'Data-Driven Decision Making'. In India, the logistics industry is growing rapidly, and these skills are in high demand. This course will give me the exact technical and managerial expertise I need to pursue a leadership role in that sector back home."
            },
             {
                id: 'q105',
                question: "What is your course duration and how many credits does it have?",
                intent: "To check if you know the basic details of your program, proving you are a serious student.",
                tips: [
                    "Know these facts by heart. Check your offer letter or the university website.",
                    "State the duration clearly (e.g., 'It's a 2-year program' or 'It's a 16-month program').",
                    "State the total number of credits required for graduation."
                ],
                sampleAnswer: "My Master of Science in Computer Science is a 2-year program. It requires a total of 32 credit points to graduate."
            },
            {
                id: 'q106',
                question: "What is the ranking of your university and your course?",
                intent: "To see if you have researched the standing of your chosen institution and program.",
                tips: [
                    "Know the latest QS World University Rankings or U.S. News rankings for your university.",
                    "If possible, find a subject-specific ranking for your course.",
                    "Mentioning the ranking shows you've aimed for quality."
                ],
                sampleAnswer: "The University of Illinois Urbana-Champaign is ranked among the top 5 universities in the world for Computer Science according to CSrankings.org. Overall, it's ranked #64 in the latest QS World University Rankings. This combination of overall prestige and subject-specific excellence was a major factor in my decision."
            },
            {
                id: 'q107',
                question: "Do you know anyone at the university?",
                intent: "To check for potential immigration red flags. They want to ensure your decision was based on academics, not just to join someone.",
                tips: [
                    "Be honest. If you know a senior or professor, you can mention it.",
                    "Frame it positively: 'Yes, I connected with a senior on LinkedIn who provided helpful insights about the coursework.'",
                    "If you don't know anyone, that's perfectly fine. Just say so."
                ],
                sampleAnswer: "No, I don't personally know anyone there. However, I have connected with a few current students on LinkedIn who were very helpful in answering my questions about the program and campus life. My decision to attend was based entirely on my academic research."
            }
        ]
    },
    {
        id: 'c4',
        category: 'Academic & Professional Background',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>,
        questions: [
            {
                id: 'q401',
                question: "What is your academic profile? (Graduation, University, Percentage/GPA)",
                intent: "To get a quick overview of your academic background and see if it aligns with the program you've chosen.",
                tips: [
                    "State your details clearly and concisely.",
                    "Be proud of your achievements.",
                    "Have your transcripts ready to show if requested."
                ],
                sampleAnswer: "I completed my Bachelor of Technology in Computer Engineering from VIT, Vellore in 2022. I graduated with an overall CGPA of 8.7 out of 10, which is equivalent to a First Class with Distinction."
            },
            {
                id: 'q402',
                question: "Your GPA seems low. Why is that?",
                intent: "To assess your ability to handle challenging US coursework. They want to hear a logical reason, not excuses.",
                tips: [
                    "Be honest but positive. Don't blame professors or the system.",
                    "Provide a valid reason (e.g., a medical issue, focusing on a challenging project, or a difficult semester).",
                    "Highlight how you improved in later semesters or how your GRE scores and practical projects demonstrate your academic capability."
                ],
                sampleAnswer: "I admit my grades in the second year were not as strong as I would have liked due to a family medical emergency that required my attention. However, you'll see from my transcripts that my performance improved significantly in my third and fourth years. I also scored a 168 in the quantitative section of my GRE, which I believe is a better reflection of my current academic abilities for this program."
            },
            {
                id: 'q403',
                question: "What is your GRE score? Why is it low?",
                intent: "To evaluate your standardized testing performance, which is a common metric for graduate admissions.",
                tips: [
                    "State your score clearly (e.g., 'I scored a 320: 165 in Quant and 155 in Verbal').",
                    "If it's low, don't make excuses. Focus on your other strengths.",
                    "Highlight your high GPA, strong practical projects, research papers, or relevant work experience as evidence of your capabilities."
                ],
                sampleAnswer: "I scored a 310 on my GRE. While it's not a top-tier score, I focused my application on showcasing my practical skills. I have two published research papers in the field of machine learning and completed a six-month internship at a leading AI startup, which I believe demonstrate my readiness for this Master's program more effectively than a standardized test."
            },
            {
                id: 'q404',
                question: "Why are you changing your stream of study?",
                intent: "To understand the logic and motivation behind your academic shift. They need to see a clear connection and a well-thought-out plan.",
                tips: [
                    "Create a bridge. Explain how skills from your undergraduate degree are transferable.",
                    "Clearly state your motivation for the change (e.g., a specific project, an internship, or changing industry demands).",
                    "Show that you have the foundational knowledge to succeed. Mention any online courses or certifications you've completed to prepare."
                ],
                sampleAnswer: "My undergraduate degree is in Mechanical Engineering, but I am now pursuing a Master's in Robotics. During my final year project, which involved designing an automated robotic arm, I discovered my passion for the intersection of software and hardware. To prepare for this shift, I have completed certified online courses in Python and Machine Learning from Coursera, and I believe my strong foundation in mechanics gives me a unique advantage in understanding the physical dynamics of robotic systems."
            }
        ]
    },
    {
        id: 'c2',
        category: 'Financial Sponsorship',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        questions: [
            {
                id: 'q201',
                question: "Who is sponsoring your education?",
                intent: "To verify that you have sufficient and legitimate funds to cover your entire education and living expenses without resorting to unauthorized work.",
                tips: [
                    "State clearly who your sponsor is (e.g., 'My parents are sponsoring me', 'I have an education loan from XYZ bank').",
                    "Be prepared with all the financial documents to back up your claim.",
                    "If your parents are sponsoring, know their occupation and annual income."
                ],
                sampleAnswer: "My parents are my primary sponsors. My father has been working as a Senior Manager at ABC Corp for 20 years, and they have saved specifically for my master's education. We also have an approved education loan of 40 Lakhs from HDFC Bank as a backup."
            },
            {
                id: 'q202',
                question: "What is your parents' annual income? What do they do?",
                intent: "To verify the financial capability of your sponsors to support your education.",
                tips: [
                    "Know the exact figure of their combined annual income as stated in the financial documents.",
                    "Be clear and confident when stating their professions.",
                    "Have supporting documents like income tax returns or salary slips ready."
                ],
                sampleAnswer: "My parents have a combined annual income of approximately 35 Lakhs INR. My father is a Senior Software Engineer at Tata Consultancy Services, and my mother is a high school principal."
            },
            {
                id: 'q203',
                question: "How do you plan to repay your education loan?",
                intent: "To assess your understanding of your financial obligations and to see if you have a realistic plan, which reinforces your intention to be a responsible student.",
                tips: [
                    "Explain that your US degree will lead to a high-paying job back in India, enabling you to repay the loan.",
                    "Mention the typical starting salaries for your target role in India.",
                    "State the loan's moratorium period (the grace period after graduation before repayment begins)."
                ],
                sampleAnswer: "My education loan has a moratorium period of one year after I complete my studies. With the skills from my Master's in Business Analytics, I am confident I can secure a job in India with a starting salary of around 15-20 Lakhs per annum, which will allow me to comfortably repay the loan EMIs within 5-7 years."
            },
            {
                id: 'q204',
                question: "What will you do if you run short of funds?",
                intent: "To check if you have a contingency plan and to ensure you won't resort to unauthorized work.",
                tips: [
                    "Reassure the officer that your primary funds are secure.",
                    "Mention secondary financial support, such as other family members or backup savings.",
                    "Never suggest that you will work part-time (off-campus) to cover the shortfall."
                ],
                sampleAnswer: "I am confident that the funds we have shown are more than sufficient for my entire course duration. However, in an unlikely emergency, my uncle has also provided an affidavit of support, and we have additional savings that can be used if absolutely necessary. My primary focus will remain on my studies."
            },
            {
                id: 'q205',
                question: "What are you planning to do during your summer vacations?",
                intent: "To understand your plans. The ideal answer relates to your studies or returning home, not unauthorized work.",
                tips: [
                    "The best answer is to express interest in doing an internship (CPT) related to your field of study.",
                    "You can also say you plan to take summer courses to finish your degree faster.",
                    "Another good answer is that you plan to visit your family back in India."
                ],
                sampleAnswer: "I'm hoping to secure a summer internship in my field of study through Curricular Practical Training (CPT). My university has a strong career services department that helps students find relevant positions. This would provide valuable practical experience. If not, I plan to visit my family back home in India."
            }
        ]
    },
    {
        id: 'c3',
        category: 'Intent to Return & Future Plans',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        questions: [
            {
                id: 'q301',
                question: "What are your plans after graduation?",
                intent: "This is a critical question to assess your 'non-immigrant intent'. The officer needs to be convinced that you plan to return to India after completing your studies.",
                tips: [
                    "Be specific about your career goals in India. Mention specific companies you want to work for or the type of role you want to pursue.",
                    "Connect your US degree directly to your career plans in India. Explain how the skills and knowledge you gain will be valuable in the Indian job market.",
                    "Avoid vague answers like 'I will look for a job'. Have a clear plan."
                ],
                sampleAnswer: "After completing my Master's in Data Science, I plan to return to India and work as a Data Scientist in the booming e-commerce sector. Companies like Flipkart and Myntra are heavily investing in data analytics, and the skills I'll gain in predictive modeling and machine learning from my US degree will make me a strong candidate for a senior role. My long-term goal is to lead a data analytics team in India."
            },
            {
                id: 'q302',
                question: "How can you prove you will return to India?",
                intent: "To assess your ties to your home country. Strong ties are a key factor in proving non-immigrant intent.",
                tips: [
                    "Mention strong family ties (parents, siblings, etc.).",
                    "Talk about property or assets your family owns in India.",
                    "Discuss your specific career prospects and job opportunities in India that are waiting for you after your degree."
                ],
                sampleAnswer: "My immediate family, including my parents and younger sister, all live in Mumbai. We are a very close-knit family, and I have responsibilities towards them. My family also owns property in India. Furthermore, my career goals are firmly based in India's growing tech sector. The skills from my US degree are in high demand there, ensuring I have excellent job prospects to return to."
            },
            {
                id: 'q303',
                question: "Do you have any relatives in the USA?",
                intent: "To check for potential immigration intent. Having relatives is not a negative, but you must be honest and frame it correctly.",
                tips: [
                    "Be honest. Lying can result in a permanent visa ban.",
                    "If yes, state their relationship, what they do, and their visa status (e.g., 'My uncle is on an H1-B visa working as a software engineer in Texas').",
                    "Reiterate that your purpose is solely for education and you will be returning to your family in India."
                ],
                sampleAnswer: "Yes, my older sister lives in New Jersey. She is a permanent resident and works as a doctor. We are very close, but my primary purpose for coming to the US is for my education at my chosen university, and I have my own strong career plans and family responsibilities that require me to return to India after my studies."
            }
        ]
    },
    {
        id: 'c5',
        category: 'Behavioral & Situational',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
        questions: [
            {
                id: 'q501',
                question: "What will you do if I reject your visa today?",
                intent: "This is a pressure test to see how you react and to gauge your determination as a genuine student.",
                tips: [
                    "Stay calm and respectful. Do not get angry or argumentative.",
                    "Show that you are a serious student who will not give up easily.",
                    "Express that you would try to understand the reasons for the refusal, improve your application, and reapply for the next intake."
                ],
                sampleAnswer: "Of course, I would be disappointed, but I would respect your decision. I would ask if you could provide the reason for the refusal. Then, I would work on strengthening that part of my application, whether it's providing more detailed financial documents or better clarifying my academic goals. I am very committed to this program and would definitely reapply for the next available intake."
            },
            {
                id: 'q502',
                question: "Who is your idol and why?",
                intent: "To understand your personality, values, and what motivates you. It's a character assessment question.",
                tips: [
                    "Choose someone you genuinely admire, preferably related to your field of study or with strong positive values.",
                    "Be prepared to explain *why* you admire them with specific examples of their work or character.",
                    "Keep the answer concise and impactful."
                ],
                sampleAnswer: "My idol is Dr. A.P.J. Abdul Kalam. His journey from a humble background to becoming a renowned scientist and the President of India is incredibly inspiring. What I admire most is his unwavering dedication to education and his belief in the power of youth to transform a nation. His passion for science and his humility are qualities I aspire to emulate in my own life and career."
            }
        ]
    }
];


const F1VisaPrep: React.FC<F1VisaPrepProps> = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(prepData[0]?.id || null);

    return (
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
                
                <div className="animate-fade-in">
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700 mb-8">
                        <h1 className="text-3xl font-bold text-white text-center">Ace Your USA F-1 Visa Interview</h1>
                        <p className="text-gray-400 mt-4 text-center max-w-3xl mx-auto">
                            The F-1 visa interview is the final and most crucial step in your journey to study in the USA. Your primary goal is to convince the consular officer that you are a genuine student with a clear academic purpose and strong ties to your home country, ensuring you will return after completing your studies.
                        </p>
                        <p className="text-gray-400 mt-2 text-center max-w-3xl mx-auto">
                            This comprehensive prep tool is designed to help you succeed. Review common questions, understand the officer's intent, and learn how to frame compelling answers.
                        </p>
                    </div>

                    <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-6 rounded-lg mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Key Things to Avoid in Your Interview</h2>
                        <div className="space-y-6">
                            {whatToAvoidData.map((item, index) => (
                                <div key={item.title} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 text-red-400 font-bold text-lg">{index + 1}.</div>
                                    <div>
                                        <h3 className="font-semibold text-red-200 text-lg">{item.title}</h3>
                                        <p className="text-red-300/80 mt-1">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">What to Wear: Your Interview Attire</h2>
                        <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">First impressions matter. Dressing professionally shows respect for the process and the consular officer. Aim for formal or business-formal attire. Comfort is important, but neatness and professionalism are key.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* For Men */}
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-gray-700 p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">For Men / Boys</h3>
                                </div>
                                <ul className="space-y-3 text-gray-400 list-disc list-outside pl-5 marker:text-[#F6520C]">
                                    <li><strong className="text-gray-300">Top:</strong> A light-colored, full-sleeved formal shirt (white, light blue).</li>
                                    <li><strong className="text-gray-300">Bottom:</strong> Dark formal trousers (black, navy, dark grey). No jeans.</li>
                                    <li><strong className="text-gray-300">Tie (Recommended):</strong> A simple, conservative tie.</li>
                                    <li><strong className="text-gray-300">Footwear:</strong> Polished formal leather shoes (black/brown) with dark socks.</li>
                                    <li><strong className="text-gray-300">Grooming:</strong> Neat hair and clean-shaven or a well-groomed beard. Avoid strong cologne.</li>
                                </ul>
                            </div>
                            {/* For Women */}
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-gray-700 p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                           <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">For Women / Girls</h3>
                                </div>
                                <ul className="space-y-3 text-gray-400 list-disc list-outside pl-5 marker:text-[#F6520C]">
                                    <li><strong className="text-gray-300">Western Formals:</strong> A conservative blouse with formal trousers or a knee-length skirt. A business suit is excellent.</li>
                                    <li><strong className="text-gray-300">Indian Formals:</strong> A simple, elegant Salwar Kameez or a formal Kurti in sober colors. Avoid flashy embroidery or patterns.</li>
                                    <li><strong className="text-gray-300">Footwear:</strong> Formal flats or low heels. Avoid stilettos or casual sandals.</li>
                                    <li><strong className="text-gray-300">Accessories:</strong> Minimal and simple jewelry.</li>
                                    <li><strong className="text-gray-300">Makeup & Hair:</strong> Light, natural makeup and neatly tied/styled hair.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white text-center mb-8">Common Interview Questions</h2>
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <aside className="lg:col-span-4 flex-shrink-0 mb-8 lg:mb-0 lg:sticky top-24 h-max">
                            <div className="bg-white/5 p-4 rounded-lg border border-gray-700">
                                <h3 className="text-xl font-semibold text-white mb-3 px-2">Question Categories</h3>
                                <ul className="space-y-1">
                                    {prepData.map(category => (
                                        <li key={category.id}>
                                            <button
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-all duration-200 border-l-4 ${selectedCategory === category.id ? 'bg-[#F6520C]/10 text-[#F6520C] font-semibold border-[#F6520C]' : 'text-gray-400 hover:text-white hover:bg-gray-700/50 border-transparent'}`}
                                            >
                                                {category.icon}
                                                <span>{category.category}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                        <main className="lg:col-span-8 flex-1 min-w-0">
                            {prepData.map(category => (
                                selectedCategory === category.id && (
                                    <div key={category.id} className="space-y-4">
                                        {category.questions.map(q => (
                                            <div key={q.id} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                                <h4 className="text-lg font-bold text-white mb-4">{q.question}</h4>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h5 className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                                            Officer's Intent
                                                        </h5>
                                                        <p className="text-sm text-gray-400 pl-7">{q.intent}</p>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            Tips
                                                        </h5>
                                                        <ul className="list-disc list-outside pl-12 text-sm text-gray-400 space-y-1 marker:text-[#F6520C]">
                                                            {q.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                                            Sample Answer
                                                        </h5>
                                                        <p className="text-sm text-gray-300 bg-black/20 p-3 rounded-md border-l-2 border-[#F6520C]/50 italic ml-7">"{q.sampleAnswer}"</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </main>
                    </div>

                    <div className="mt-12 bg-white/5 p-8 rounded-lg border border-gray-700">
                        <h2 className="text-3xl font-bold text-white text-center mb-6">U.S. Consulates in India</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                            {consulatesData.map(consulate => (
                                <div key={consulate.name} className="bg-gray-800/50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-white">{consulate.name}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{consulate.address}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 bg-white/5 p-8 rounded-lg border border-gray-700">
                        <h2 className="text-3xl font-bold text-white text-center mb-6">Common Reasons for F-1 Visa Rejection</h2>
                        <p className="text-gray-400 mt-2 text-center max-w-3xl mx-auto mb-8">
                            Understanding why visas are denied is as important as preparing what to say. Being aware of these common pitfalls can help you avoid them.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {rejectionReasons.map(reason => (
                                <div key={reason.title} className="bg-gray-800/50 p-6 rounded-lg flex items-start space-x-4">
                                    <div className="flex-shrink-0 text-[#F6520C] bg-gray-900/50 p-3 rounded-lg">{reason.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-white">{reason.title}</h3>
                                        <p className="text-sm text-gray-400 mt-1">{reason.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 bg-yellow-900/30 border border-yellow-500/50 text-yellow-300 p-4 rounded-lg flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <div>
                            <h3 className="font-bold">Disclaimer</h3>
                            <p className="text-sm">This preparation tool is for practice purposes only. Actual questions and interview experiences may vary. Always refer to official U.S. government sources for the most accurate and up-to-date visa information.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default F1VisaPrep;
