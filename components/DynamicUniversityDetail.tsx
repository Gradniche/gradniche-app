import React, { useState, useEffect } from 'react';
import { University, Program } from '../data/universities';
import UniversityDetail from './UniversityDetail';

interface DynamicUniversityDetailProps {
  universityId: string;
  onProgramSelect: (program: Program) => void;
  onBack: () => void;
  navigate: (path: string) => void;
  onThreadSelect: (threadId: string) => void;
}

const DynamicUniversityDetail: React.FC<DynamicUniversityDetailProps> = ({
  universityId,
  onProgramSelect,
  onBack,
  navigate,
  onThreadSelect,
}) => {
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = True;
    setLoading(true);
    setError(null);

    // Fetch the raw JSON profile dynamically from the public assets folder
    fetch(`/data/universities/${universityId}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load profile for university: ${universityId}`);
        }
        return res.json();
      })
      .then((data: University) => {
        if (isMounted) {
          setUniversity(data);
          setLoading(false);
          
          // Inject SEO Metadata
          document.title = `${data.name} | Dynamic Profile | GradNiche`;
          let descEl = document.querySelector('meta[name="description"]');
          if (descEl) {
            descEl.setAttribute(
              "content",
              `Explore ${data.name} in ${data.location}. View popular graduate programs, tuition costs ($${data.avgTuition.toLocaleString()}/yr), admission requirements, and scholarship opportunities.`
            );
          }

          // Inject Schema.org Structured Data
          const schemaData = {
            "@context": "https://schema.org",
            "@type": "CollegeOrUniversity",
            "name": data.name,
            "url": window.location.href,
            "logo": data.logo,
            "description": data.about,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": data.location.split(',')[0]?.trim() || "",
              "addressRegion": data.location.split(',')[1]?.trim() || "",
              "addressCountry": data.country
            },
            "educationalCredentialAwarded": data.programs.map(p => p.name),
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": data.avgTuition
            }
          };

          // Remove any existing dynamic schema
          const existingSchema = document.getElementById("dynamic-university-schema");
          if (existingSchema) {
            existingSchema.remove();
          }

          // Add the new schema.org script to head
          const script = document.createElement("script");
          script.id = "dynamic-university-schema";
          script.type = "application/ld+json";
          script.innerHTML = JSON.stringify(schemaData);
          document.head.appendChild(script);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Dynamic university loading error:", err);
          setError(err.message || "Failed to load university profile.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      // Clean up Schema.org script on unmount
      const existingSchema = document.getElementById("dynamic-university-schema");
      if (existingSchema) {
        existingSchema.remove();
      }
    };
  }, [universityId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-center p-6 text-center">
        {/* Sleek premium glassmorphic loading skeleton */}
        <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-8"></div>
        <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">Loading University Profile...</h2>
        <p className="text-gray-500 text-sm max-w-sm">Fetching up-to-date counselor-grade research data directly from GradNiche secure archives.</p>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl max-w-md backdrop-blur-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Profile Not Available</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            We couldn't retrieve the dynamic dataset for "{universityId}". The profile might still be undergoing AI research curation.
          </p>
          <button 
            onClick={onBack}
            className="bg-white/5 text-white border border-white/10 px-6 py-3 rounded-xl hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 font-medium text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render using the robust and beautiful UniversityDetail template
  return (
    <UniversityDetail
      university={university}
      onProgramSelect={onProgramSelect}
      onBack={onBack}
      navigate={navigate}
      onThreadSelect={onThreadSelect}
    />
  );
};

export default DynamicUniversityDetail;
