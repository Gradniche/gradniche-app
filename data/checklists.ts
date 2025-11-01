import React from 'react';

export interface ChecklistItem {
    id: string;
    label: string;
}

export interface ChecklistCategory {
    id: string;
    title: string;
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    items: ChecklistItem[];
}

export const checklistData: ChecklistCategory[] = [
    {
        id: 'docs',
        title: 'Documents',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })),
        items: [
            { id: 'docs-1', label: 'Passport valid for at least 6 months beyond your stay' },
            { id: 'docs-2', label: 'Student Visa / Study Permit confirmed and stamped' },
            { id: 'docs-3', label: 'Original University Offer Letter / I-20 / LOA' },
            { id: 'docs-4', label: 'Original academic transcripts and degree certificates' },
            { id: 'docs-5', label: 'Standardized test score reports (GRE, GMAT, TOEFL, IELTS)' },
            { id: 'docs-6', label: 'Photocopies and digital scans of all important documents' },
            { id: 'docs-7', label: 'Passport-sized photographs (as per destination country specs)' },
            { id: 'docs-8', label: 'Medical records and immunization history' },
        ],
    },
    {
        id: 'finance',
        title: 'Finances',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" })),
        items: [
            { id: 'finance-1', label: 'Pay tuition fees for the first semester/year' },
            { id: 'finance-2', label: 'Show proof of funds (GIC for Canada, bank statements for others)' },
            { id: 'finance-3', label: 'Open an international student bank account' },
            { id: 'finance-4', label: 'Get an international credit/debit card' },
            { id: 'finance-5', label: 'Carry some local currency for initial expenses' },
            { id: 'finance-6', label: 'Finalize and accept education loan documents' },
            { id: 'finance-7', label: 'Notify home bank and credit card companies of your travel plans' },
        ],
    },
    {
        id: 'travel',
        title: 'Travel & Accommodation',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" })),
        items: [
            { id: 'travel-1', label: 'Book flight tickets to your destination' },
            { id: 'travel-2', label: 'Arrange airport pickup if available from university' },
            { id: 'travel-3', label: 'Finalize and book accommodation (on-campus or off-campus)' },
            { id: 'travel-4', label: 'Get travel insurance' },
            { id: 'travel-5', label: 'Check baggage allowance and pack accordingly' },
            { id: 'travel-6', label: 'Share your travel itinerary with family and friends' },
        ],
    },
    {
        id: 'health',
        title: 'Health & Medical',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" })),
        items: [
            { id: 'health-1', label: 'Complete a full medical check-up' },
            { id: 'health-2', label: 'Get all required vaccinations' },
            { id: 'health-3', label: 'Purchase mandatory Overseas Student Health Cover (OSHC/equivalent)' },
            { id: 'health-4', label: 'Carry prescriptions for any personal medications' },
            { id: 'health-5', label: 'Pack a basic first-aid kit' },
            { id: 'health-6', label: 'Get a dental and eye check-up before leaving' },
        ],
    },
    {
        id: 'academics',
        title: 'Academics & On-Arrival',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" })),
        items: [
            { id: 'academics-1', label: 'Register for your courses online' },
            { id: 'academics-2', label: 'Attend any mandatory online orientation sessions' },
            { id: 'academics-3', label: 'Find out how to get your student ID card upon arrival' },
            { id: 'academics-4', label: 'Download university apps (maps, safety, etc.)' },
        ],
    },
    {
        id: 'connectivity',
        title: 'Connectivity & Communication',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.288 15.038C8.586 14.636 9.286 14 10.5 14c1.214 0 1.914.636 2.212 1.038" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5.1 11.844A8.962 8.962 0 0112 9c2.446 0 4.68.962 6.3 2.544" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.4 9.136A12.96 12.96 0 0112 5c3.552 0 6.84 1.44 9.2 3.864" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" })),
        items: [
            { id: 'connectivity-1', label: 'Unlock your mobile phone for international SIM cards' },
            { id: 'connectivity-2', label: 'Research and decide on a local mobile plan' },
            { id: 'connectivity-3', label: 'Download offline maps for your new city' },
        ],
    },
    {
        id: 'packing',
        title: 'Packing Essentials',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" })),
        items: [
            { id: 'packing-1', label: 'Appropriate clothing for the climate' },
            { id: 'packing-2', label: 'Universal power adapter and converters' },
            { id: 'packing-3', label: 'Laptop, phone, and other essential electronics' },
            { id: 'packing-4', label: 'Important stationery and academic supplies' },
            { id: 'packing-5', label: 'Comfort items from home (spices, snacks, photos)' },
        ],
    },
];
