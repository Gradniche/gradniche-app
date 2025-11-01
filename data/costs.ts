export interface CityCost {
  name: string;
  currency: 'USD' | 'CAD' | 'GBP' | 'AUD' | 'EUR' | 'NZD' | 'AED';
  currencySymbol: '$' | 'CA$' | '£' | 'A$' | '€' | 'NZ$' | 'AED';
  costs: {
    accommodation: number;
    food: number;
    transport: number;
    utilities: number;
    entertainment: number;
  };
}

// FIX: Added and exported the 'conversionRates' object to provide currency conversion values to INR, resolving the missing module export error.
// Approximate conversion rates to INR (₹)
export const conversionRates: Record<CityCost['currency'], number> = {
  USD: 83.5,
  CAD: 61,
  GBP: 106,
  AUD: 55,
  EUR: 90,
  NZD: 51,
  AED: 22.7,
};

// Data is estimated for a single student's monthly expenses.
export const costData: Record<string, CityCost[]> = {
  "USA": [
    { 
      name: "New York, NY", 
      currency: "USD", 
      currencySymbol: "$",
      costs: { accommodation: 2200, food: 600, transport: 130, utilities: 150, entertainment: 250 } 
    },
    { 
      name: "San Francisco, CA", 
      currency: "USD",
      currencySymbol: "$",
      costs: { accommodation: 2400, food: 550, transport: 85, utilities: 120, entertainment: 280 } 
    },
    { 
      name: "Boston, MA", 
      currency: "USD", 
      currencySymbol: "$",
      costs: { accommodation: 2000, food: 500, transport: 90, utilities: 140, entertainment: 220 } 
    },
    { 
      name: "Chicago, IL", 
      currency: "USD", 
      currencySymbol: "$",
      costs: { accommodation: 1500, food: 450, transport: 105, utilities: 130, entertainment: 200 } 
    }
  ],
  "Canada": [
    { 
      name: "Toronto, ON", 
      currency: "CAD", 
      currencySymbol: "CA$",
      costs: { accommodation: 1800, food: 500, transport: 156, utilities: 150, entertainment: 200 } 
    },
    { 
      name: "Vancouver, BC", 
      currency: "CAD", 
      currencySymbol: "CA$",
      costs: { accommodation: 1900, food: 550, transport: 102, utilities: 120, entertainment: 220 } 
    },
    { 
      name: "Montreal, QC", 
      currency: "CAD", 
      currencySymbol: "CA$",
      costs: { accommodation: 1200, food: 450, transport: 94, utilities: 100, entertainment: 180 } 
    },
     { 
      name: "Waterloo, ON", 
      currency: "CAD", 
      currencySymbol: "CA$",
      costs: { accommodation: 1400, food: 400, transport: 90, utilities: 130, entertainment: 150 } 
    }
  ],
  "UK": [
    { 
      name: "London", 
      currency: "GBP", 
      currencySymbol: "£",
      costs: { accommodation: 1300, food: 400, transport: 150, utilities: 200, entertainment: 180 } 
    },
    { 
      name: "Manchester", 
      currency: "GBP", 
      currencySymbol: "£",
      costs: { accommodation: 800, food: 350, transport: 80, utilities: 150, entertainment: 150 } 
    },
    { 
      name: "Edinburgh", 
      currency: "GBP", 
      currencySymbol: "£",
      costs: { accommodation: 900, food: 380, transport: 60, utilities: 160, entertainment: 160 } 
    },
     { 
      name: "Bristol", 
      currency: "GBP", 
      currencySymbol: "£",
      costs: { accommodation: 950, food: 360, transport: 75, utilities: 170, entertainment: 140 } 
    }
  ],
  "Australia": [
    { 
      name: "Sydney, NSW", 
      currency: "AUD", 
      currencySymbol: "A$",
      costs: { accommodation: 2200, food: 600, transport: 170, utilities: 250, entertainment: 250 } 
    },
    { 
      name: "Melbourne, VIC", 
      currency: "AUD", 
      currencySymbol: "A$",
      costs: { accommodation: 1800, food: 550, transport: 150, utilities: 220, entertainment: 230 } 
    },
    { 
      name: "Canberra, ACT", 
      currency: "AUD", 
      currencySymbol: "A$",
      costs: { accommodation: 1700, food: 500, transport: 100, utilities: 200, entertainment: 200 } 
    },
    { 
      name: "Brisbane, QLD", 
      currency: "AUD", 
      currencySymbol: "A$",
      costs: { accommodation: 1600, food: 520, transport: 120, utilities: 190, entertainment: 210 } 
    }
  ],
  "Germany": [
    {
      name: "Munich",
      currency: "EUR",
      currencySymbol: "€",
      costs: { accommodation: 950, food: 400, transport: 60, utilities: 250, entertainment: 180 }
    }
  ],
  "Ireland": [
    {
      name: "Dublin",
      currency: "EUR",
      currencySymbol: "€",
      costs: { accommodation: 1200, food: 400, transport: 100, utilities: 180, entertainment: 200 }
    }
  ],
  "UAE": [
    {
      name: "Dubai",
      currency: "AED",
      currencySymbol: "AED",
      costs: { accommodation: 4500, food: 1500, transport: 350, utilities: 700, entertainment: 800 }
    }
  ],
  "New Zealand": [
    {
      name: "Auckland",
      currency: "NZD",
      currencySymbol: "NZ$",
      costs: { accommodation: 1500, food: 600, transport: 160, utilities: 200, entertainment: 250 }
    }
  ]
};