
import React, { useState, useEffect } from 'react';

interface UniversityLogoProps {
    src: string;
    alt: string;
    className?: string;
}

const UniversityLogo: React.FC<UniversityLogoProps> = ({ src, alt, className = "w-full h-full object-contain" }) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setCurrentSrc(src);
        setHasError(false);
    }, [src]);

    const handleError = () => {
        // If the current source is the original clearbit one, try Google Favicon service as fallback
        if (currentSrc === src && src.includes('clearbit.com')) {
            const domainParts = src.split('/');
            const domain = domainParts[domainParts.length - 1];
            if (domain) {
                // Google S2 service
                setCurrentSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
                return;
            }
        }
        // If it was already the fallback or something else, show initials
        setHasError(true);
    };

    if (hasError || !currentSrc) {
        const initials = alt
            .split(' ')
            .map(word => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

        return (
            <div className={`flex items-center justify-center bg-gray-200 text-gray-600 font-bold rounded-full ${className}`} style={{ minWidth: '100%', minHeight: '100%' }}>
                <span className="text-xs sm:text-sm">{initials}</span>
            </div>
        );
    }

    return (
        <img 
            src={currentSrc} 
            alt={`${alt} logo`} 
            className={className} 
            onError={handleError}
            loading="lazy"
        />
    );
};

export default UniversityLogo;
