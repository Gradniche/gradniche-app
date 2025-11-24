
import React from 'react';

interface ToolsProps {
    navigate: (path: string) => void;
}

const tools = [
  {
    name: 'Course Comparison',
    description: 'Compare courses from different universities side-by-side to find your perfect fit.',
    path: '/tools/course-comparison',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
        </svg>
    )
  },
  {
    name: 'AI SOP Analyzer',
    description: 'Get instant, data-driven feedback on your Statement of Purpose.',
    path: '/tools/sop-analyzer',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.67-2.67L11.25 18l1.938-.648a3.375 3.375 0 002.67-2.67L16.75 13.5l.648 1.938a3.375 3.375 0 002.67 2.67L21.75 18l-1.938.648a3.375 3.375 0 00-2.67 2.67z" />
        </svg>
    )
  },
  {
    name: 'F1 Visa Interview Prep',
    description: 'Practice for your F-1 student visa with a realistic, AI-powered mock interview.',
    path: '/tools/f1-visa-prep',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
    )
  },
  {
    name: 'Visa Application Guides',
    description: 'Access step-by-step visa guides for top study destinations.',
    path: '/tools/visa-guides',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
    )
  },
  {
    name: 'Scholarship Finder',
    description: 'Search our database to find scholarships that match your profile.',
    path: '/tools/scholarship-finder',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" />
        </svg>
    )
  },
  {
    name: 'Community Forums',
    description: 'Connect with fellow students, ask questions, and share experiences.',
    path: '/tools/community-forums',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.53-2.499M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.598M12 14.25a5.25 5.25 0 110-10.5 5.25 5.25 0 010 10.5z" />
        </svg>
    )
  },
  {
    name: 'Cost of Living Calculator',
    description: 'Estimate your living expenses in different cities to plan your budget.',
    path: '/tools/cost-of-living-calculator',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.25-4.5h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5v-.008zm2.25-4.5h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75v-.008zm2.25-4.5h.008v.008H15v-.008zm0 2.25h.008v.008H15v-.008zM4.5 6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25-2.25H6.75a2.25 2.25 0 01-2.25-2.25V6.75z" />
        </svg>
    )
  },
  {
    name: 'Pre-Departure Checklists',
    description: 'Make sure you have everything in order before you fly.',
    path: '/tools/pre-departure-checklists',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
  },
  {
    name: 'GPA Calculator',
    description: 'Convert your local grades into the 4.0 scale used by international universities.',
    path: '/tools/gpa-calculator',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.25-4.5h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5v-.008zm2.25-4.5h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75v-.008zm2.25-4.5h.008v.008H15v-.008zm0 2.25h.008v.008H15v-.008zM4.5 6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25-2.25H6.75a2.25 2.25 0 01-2.25-2.25V6.75z" />
        </svg>
    )
  },
];

const Tools: React.FC<ToolsProps> = ({ navigate }) => {
  const gradients = [
    'from-orange-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-purple-500 to-indigo-500',
    'from-rose-500 to-red-500',
    'from-amber-500 to-orange-500',
  ];

  return (
    <section id="resources" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">A Toolkit For Your Ambition</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            From comparing courses to checking your visa requirements, our free tools are designed to simplify your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <a 
              key={tool.name} 
              href={`#${tool.path}`}
              onClick={(e) => { e.preventDefault(); navigate(tool.path); }}
              className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl text-left hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 border border-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F6520C] flex flex-col items-start group"
            >
              <div className={`mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all`}>
                  {tool.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-orange-300 transition-colors">{tool.name}</h3>
              <p className="text-gray-400 flex-grow">{tool.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
