export interface Scholarship {
    id: number;
    name: string;
    provider: string;
    amount: number; // For filtering
    amountDisplay: string;
    isFullFunding: boolean;
    country: string;
    levelOfStudy: ('Masters' | 'PhD')[];
    fieldOfStudy: string[];
    eligibility: string[];
    deadline: string;
    applyLink: string;
}

export const scholarships: Scholarship[] = [
    {
        id: 1,
        name: "Fulbright-Nehru Master's Fellowships",
        provider: "United States-India Educational Foundation (USIEF)",
        amount: 100000, // Approximate full funding value
        amountDisplay: "Full Funding (Tuition, Stipend, Airfare)",
        isFullFunding: true,
        country: "USA",
        levelOfStudy: ["Masters"],
        fieldOfStudy: ["Arts", "Public Administration", "Economics", "Environmental Science", "International Law"],
        eligibility: [
            "Must be an Indian citizen.",
            "Must have a bachelor's degree with at least 55% marks.",
            "Minimum of 3 years of full-time professional work experience.",
            "Cannot have another degree from a U.S. university or be enrolled in a U.S. program."
        ],
        deadline: "May",
        applyLink: "https://www.usief.org.in/scholarships/fulbright-nehru-fellowships.aspx"
    },
    {
        id: 2,
        name: "Chevening Scholarships",
        provider: "UK Government's Foreign, Commonwealth & Development Office",
        amount: 50000, // Approximate value
        amountDisplay: "Full Funding (Tuition, Stipend, Travel)",
        isFullFunding: true,
        country: "UK",
        levelOfStudy: ["Masters"],
        fieldOfStudy: ["All Fields"],
        eligibility: [
            "Must be a citizen of a Chevening-eligible country (India is eligible).",
            "Must return to your country of citizenship for a minimum of two years after your award has ended.",
            "Have an undergraduate degree that will enable you to gain entry onto a postgraduate programme at a UK university.",
            "Have at least two years of work experience."
        ],
        deadline: "November",
        applyLink: "https://www.chevening.org/scholarships/"
    },
    {
        id: 3,
        name: "Ontario Graduate Scholarship (OGS)",
        provider: "Government of Ontario & participating universities",
        amount: 15000,
        amountDisplay: "$15,000 CAD per year",
        isFullFunding: false,
        country: "Canada",
        levelOfStudy: ["Masters", "PhD"],
        fieldOfStudy: ["All Fields"],
        eligibility: [
            "Must be enrolled in a full-time graduate program at a participating Ontario university.",
            "Must have achieved a first-class average (A- or 80%) in each of the last two full-time academic years.",
            "Must be an international student with a valid study permit."
        ],
        deadline: "Varies by University",
        applyLink: "https://grad.uwo.ca/funding/western_funding/ogs.html" // Example link, varies by uni
    },
    {
        id: 4,
        name: "Australia Awards Scholarships",
        provider: "Australian Government",
        amount: 120000, // Approx value
        amountDisplay: "Full Funding (Tuition, Stipend, Travel, OSHC)",
        isFullFunding: true,
        country: "Australia",
        levelOfStudy: ["Masters", "PhD"],
        fieldOfStudy: ["Development", "Governance", "Health", "Education", "Engineering"],
        eligibility: [
            "Must be a citizen of a participating country.",
            "Must meet the specific eligibility criteria established by the program for your country.",
            "Must not be married to, or in a de-facto relationship with, a person who holds Australian or New Zealand citizenship or permanent residency."
        ],
        deadline: "April",
        applyLink: "https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships"
    },
    {
        id: 5,
        name: "Knight-Hennessy Scholars",
        provider: "Stanford University",
        amount: 150000, // Approx value
        amountDisplay: "Full Funding for Graduate Study at Stanford",
        isFullFunding: true,
        country: "USA",
        levelOfStudy: ["Masters", "PhD"],
        fieldOfStudy: ["All Fields"],
        eligibility: [
            "Must be applying to a full-time graduate program at Stanford.",
            "Must have earned your bachelor's degree within the last seven years.",
            "Demonstrate independence of thought, purposeful leadership, and a civic mindset."
        ],
        deadline: "October",
        applyLink: "https://knight-hennessy.stanford.edu/"
    },
    {
        id: 6,
        name: "Gates Cambridge Scholarship",
        provider: "Bill and Melinda Gates Foundation",
        amount: 80000,
        amountDisplay: "Full Funding for Postgraduate Study at Cambridge",
        isFullFunding: true,
        country: "UK",
        levelOfStudy: ["PhD", "Masters"],
        fieldOfStudy: ["All Fields"],
        eligibility: [
            "A citizen of any country outside the United Kingdom.",
            "Applying to pursue one of the following full-time residential courses of study at the University of Cambridge: PhD, MSc/MLitt, or a one-year postgraduate course.",
            "Outstanding intellectual ability and leadership potential."
        ],
        deadline: "October/December",
        applyLink: "https://www.gatescambridge.org/"
    },
    {
        id: 7,
        name: "DAAD Scholarships",
        provider: "German Academic Exchange Service",
        amount: 15000,
        amountDisplay: "Monthly Stipend (€861 for Masters, €1,200 for PhD) + Allowances",
        isFullFunding: false,
        country: "Germany",
        levelOfStudy: ["Masters", "PhD"],
        fieldOfStudy: ["All Fields"],
        eligibility: [
            "Must have a Bachelor's degree (usually a four-year degree).",
            "Must have at least two years of proven work experience.",
            "Varies significantly by specific DAAD program."
        ],
        deadline: "Varies by Program",
        applyLink: "https://www.daad.de/en/study-and-research-in-germany/scholarships/find-a-scholarship/"
    },
    {
        id: 8,
        name: "Commonwealth Shared Scholarships",
        provider: "UK Foreign, Commonwealth & Development Office (FCDO)",
        amount: 45000,
        amountDisplay: "Full Funding (Tuition, Stipend, Airfare)",
        isFullFunding: true,
        country: "UK",
        levelOfStudy: ["Masters"],
        fieldOfStudy: ["Development", "Technology", "Health", "Science"],
        eligibility: [
            "Be a citizen of or have been granted refugee status by an eligible Commonwealth country.",
            "Be permanently resident in an eligible Commonwealth country.",
            "Be available to start your academic studies in the UK by the start of the UK academic year in September/October.",
            "Be unable to afford to study in the UK without this scholarship."
        ],
        deadline: "December",
        applyLink: "https://cscuk.fcdo.gov.uk/scholarships/commonwealth-shared-scholarships/"
    },
    {
        id: 9,
        name: "University of Waterloo International Master's Award of Excellence",
        provider: "University of Waterloo",
        amount: 12500,
        amountDisplay: "$2,500 CAD per term for up to 5 terms",
        isFullFunding: false,
        country: "Canada",
        levelOfStudy: ["Masters"],
        fieldOfStudy: ["Engineering", "Science", "Mathematics", "Computer Science"],
        eligibility: [
            "Be an international student with a valid Canadian study permit.",
            "Be admitted to a research-based Master's degree program.",
            "Meet the academic progress requirements of their program.",
            "Not be receiving external awards or sponsorships."
        ],
        deadline: "Automatic Consideration",
        applyLink: "https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/awards/international-masters-award-excellence-imae"
    },
    {
        id: 10,
        name: "Melbourne Graduate Research Scholarship",
        provider: "University of Melbourne",
        amount: 110000,
        amountDisplay: "Full Tuition Fee Offset + Living Stipend (~$34,400 AUD per year)",
        isFullFunding: true,
        country: "Australia",
        levelOfStudy: ["PhD"],
        fieldOfStudy: ["All Fields"],
        eligibility: [
            "Have applied for and meet the entry requirements for a graduate research degree at the University of Melbourne.",
            "Be assessed as academically meritorious."
        ],
        deadline: "October",
        applyLink: "https://scholarships.unimelb.edu.au/awards/graduate-research-scholarships"
    },
    {
        id: 11,
        name: "Rhodes Scholarship",
        provider: "Rhodes Trust",
        amount: 90000,
        amountDisplay: "Full Funding for study at University of Oxford",
        isFullFunding: true,
        country: "UK",
        levelOfStudy: ["Masters", "PhD"],
        fieldOfStudy: ["All Fields"],
        eligibility: [
            "Citizen of a Rhodes-eligible country (e.g., India).",
            "Age limits apply (typically 19-25).",
            "Hold a Bachelor's degree of a very high standard.",
            "Demonstrate outstanding intellect, character, leadership, and commitment to service."
        ],
        deadline: "Varies by Country (June/July for India)",
        applyLink: "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/"
    },
    {
        id: 13,
        name: "UBC Graduate Global Leadership Fellowships",
        provider: "University of British Columbia",
        amount: 18200,
        amountDisplay: "$18,200 CAD stipend plus tuition",
        isFullFunding: true,
        country: "Canada",
        levelOfStudy: ["PhD"],
        fieldOfStudy: ["Development", "Public Policy", "Global Affairs"],
        eligibility: [
            "Be a citizen of a developing country.",
            "Be admitted to a doctoral program at UBC.",
            "Demonstrate a track record of leadership in community development or social change."
        ],
        deadline: "January",
        applyLink: "https://www.grad.ubc.ca/awards/graduate-global-leadership-fellowships"
    },
    {
        id: 14,
        name: "NYU Wagner Merit Scholarships",
        provider: "New York University",
        amount: 25000,
        amountDisplay: "$25,000 - $47,000 USD",
        isFullFunding: true,
        country: "USA",
        levelOfStudy: ["Masters"],
        fieldOfStudy: ["Public Service", "Public Administration", "Urban Planning", "Health Policy"],
        eligibility: [
            "Admitted to a Master's program at NYU Wagner.",
            "Based on academic merit and strength of application.",
            "No separate application required; all admitted students are considered."
        ],
        deadline: "Automatic Consideration",
        applyLink: "https://wagner.nyu.edu/admissions/financial-aid/scholarships"
    },
    {
        id: 15,
        name: "Imperial College London President's PhD Scholarships",
        provider: "Imperial College London",
        amount: 70000,
        amountDisplay: "Full Tuition + Stipend (£22,900 per year)",
        isFullFunding: true,
        country: "UK",
        levelOfStudy: ["PhD"],
        fieldOfStudy: ["Engineering", "Science", "Medicine", "Business"],
        eligibility: [
            "Hold a First Class UK degree or equivalent.",
            "Demonstrate outstanding research potential.",
            "Must be admitted to a PhD program at Imperial College."
        ],
        deadline: "January, March, May",
        applyLink: "https://www.imperial.ac.uk/study/fees-and-funding/postgraduate/scholarships-search/presidents-phd-scholarships/"
    }
];

// Add 50 more scholarships to reach a comprehensive list
const additionalScholarships: Scholarship[] = [
  // USA
  { id: 16, name: "AAUW International Fellowships", provider: "American Association of University Women", amount: 20000, amountDisplay: "$18,000 - $30,000", isFullFunding: false, country: "USA", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Women who are not U.S. citizens or permanent residents.", "Hold a bachelor's degree.", "Intend to return to their home country to pursue a professional career."], deadline: "November", applyLink: "https://www.aauw.org/resources/programs/fellowships-grants/current-opportunities/international/" },
  { id: 17, name: "Aga Khan Foundation International Scholarship Programme", provider: "Aga Khan Foundation", amount: 25000, amountDisplay: "50% Grant & 50% Loan", isFullFunding: false, country: "USA", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["Development", "Health", "Education", "Humanities"], eligibility: ["Citizen of select countries (India, Pakistan, Bangladesh etc.).", "Under 30 years of age.", "Demonstrate genuine financial need."], deadline: "March", applyLink: "https://www.akdn.org/our-agencies/aga-khan-foundation/international-scholarship-programme" },
  { id: 18, name: "University of Southern California Dean's Scholarship", provider: "USC Viterbi School of Engineering", amount: 20000, amountDisplay: "Partial Tuition Coverage", isFullFunding: false, country: "USA", levelOfStudy: ["Masters"], fieldOfStudy: ["Engineering", "Computer Science"], eligibility: ["Admitted to an MS program at USC Viterbi.", "Exceptional academic record."], deadline: "Automatic Consideration", applyLink: "https://viterbigradadmission.usc.edu/financial-aid/scholarships/" },
  { id: 19, name: "Inlaks Shivdasani Foundation Scholarships", provider: "Inlaks Shivdasani Foundation", amount: 100000, amountDisplay: "Up to $100,000 USD", isFullFunding: true, country: "USA", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Indian citizen.", "Under 30 years of age.", "Hold a first-class degree from a recognized Indian university."], deadline: "March", applyLink: "https://www.inlaksfoundation.org/scholarships/" },
  { id: 20, name: "American University Emerging Global Leader Scholarship", provider: "American University", amount: 50000, amountDisplay: "Full tuition & board", isFullFunding: true, country: "USA", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["International student with a record of leadership and service.", "Minimum 3.8 GPA equivalent."], deadline: "December", applyLink: "https://www.american.edu/admissions/international/egls.cfm" },
  
  // UK
  { id: 21, name: "Scotland's Saltire Scholarships", provider: "Scottish Government", amount: 8000, amountDisplay: "£8,000 towards tuition fees", isFullFunding: false, country: "UK", levelOfStudy: ["Masters"], fieldOfStudy: ["Science", "Technology", "Creative Industries", "Healthcare", "Medical Sciences"], eligibility: ["Citizen of Canada, China (including Hong Kong), India, Japan, Pakistan, or USA.", "Offered a place at a Scottish university."], deadline: "May", applyLink: "https://www.scotland.org/study/saltire-scholarships" },
  { id: 22, name: "GREAT Scholarships", provider: "British Council & UK Universities", amount: 10000, amountDisplay: "Minimum of £10,000", isFullFunding: false, country: "UK", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Citizen of a GREAT eligible country (including India).", "Hold an offer from a participating UK university."], deadline: "Varies by University", applyLink: "https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships" },
  { id: 23, name: "University of Bristol Think Big Scholarships", provider: "University of Bristol", amount: 6500, amountDisplay: "£6,500 - £26,000", isFullFunding: false, country: "UK", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Be classed as an overseas student for fee purposes.", "Have applied to start a one-year, full-time master's program."], deadline: "April", applyLink: "https://www.bristol.ac.uk/students/support/finances/scholarships/think-big-postgraduate/" },
  { id: 24, name: "Warwick Chancellor's International Scholarships", provider: "University of Warwick", amount: 60000, amountDisplay: "Full tuition + stipend", isFullFunding: true, country: "UK", levelOfStudy: ["PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Applying for a PhD at the University of Warwick.", "Must be an 'overseas' student for fees purposes."], deadline: "December", applyLink: "https://warwick.ac.uk/services/dc/schols_fund/scholarships_and_funding/chancellors_int" },
  { id: 25, name: "Felix Scholarships", provider: "Felix Trust", amount: 50000, amountDisplay: "Full fees, living costs, and flights", isFullFunding: true, country: "UK", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Indian nationals.", "Must hold a first-class Bachelor's degree from an Indian university.", "Apply to University of Oxford, University of Reading, or SOAS."], deadline: "January", applyLink: "https://www.felixscholarship.org/" },
  
  // Canada
  { id: 26, name: "Vanier Canada Graduate Scholarships", provider: "Government of Canada", amount: 50000, amountDisplay: "$50,000 CAD per year for 3 years", isFullFunding: true, country: "Canada", levelOfStudy: ["PhD"], fieldOfStudy: ["Health", "Natural Sciences", "Engineering", "Social Sciences", "Humanities"], eligibility: ["Nominated by a Canadian institution.", "Demonstrate academic excellence, research potential, and leadership skills."], deadline: "November", applyLink: "https://vanier.gc.ca/" },
  { id: 27, name: "University of Calgary International Graduate Awards", provider: "University of Calgary", amount: 10000, amountDisplay: "Up to $10,000 CAD", isFullFunding: false, country: "Canada", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["International student with strong academic standing.", "Admitted to a full-time graduate program."], deadline: "Varies", applyLink: "https://grad.ucalgary.ca/awards/international_student_awards" },
  { id: 28, name: "Dalhousie University Scholarships", provider: "Dalhousie University", amount: 30000, amountDisplay: "Up to $30,000 CAD", isFullFunding: false, country: "Canada", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Based on academic merit.", "Admitted to a graduate program."], deadline: "Varies", applyLink: "https://www.dal.ca/admissions/money_matters/funding_sources/scholarships/graduate_students.html" },
  { id: 29, name: "Pierre Elliott Trudeau Foundation Doctoral Scholarships", provider: "Trudeau Foundation", amount: 40000, amountDisplay: "Up to $40,000 CAD per year for three years", isFullFunding: true, country: "Canada", levelOfStudy: ["PhD"], fieldOfStudy: ["Humanities", "Social Sciences"], eligibility: ["Enrolled in or accepted into a full-time doctoral program at a Canadian university.", "Research related to one of the Foundation's Four Themes."], deadline: "December", applyLink: "https://www.trudeaufoundation.ca/scholarship" },
  { id: 30, name: "McGill University McCall MacBain Scholarships", provider: "McCall MacBain Foundation", amount: 60000, amountDisplay: "Full tuition + $2,000 CAD monthly stipend", isFullFunding: true, country: "Canada", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Hold a bachelor's degree.", "Demonstrate character, community engagement, leadership potential, entrepreneurial spirit, and academic strength."], deadline: "September", applyLink: "https://mccallmacbainscholars.org/" },

  // Australia
  { id: 31, name: "University of Sydney International Scholarships", provider: "University of Sydney", amount: 35000, amountDisplay: "$35,000 AUD per annum stipend", isFullFunding: false, country: "Australia", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Outstanding academic achievement and research potential.", "Must have an unconditional offer of admission."], deadline: "Automatic Consideration", applyLink: "https://www.sydney.edu.au/scholarships/e/university-of-sydney-international-scholarship.html" },
  { id: 32, name: "ANU Chancellor's International Scholarship", provider: "Australian National University", amount: 15000, amountDisplay: "25% or 50% tuition fee reduction", isFullFunding: false, country: "Australia", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["International student.", "Have an offer of admission to ANU."], deadline: "Varies by round", applyLink: "https://www.anu.edu.au/study/scholarships/find-a-scholarship/anu-chancellors-international-scholarship" },
  { id: 33, name: "Monash University International Merit Scholarship", provider: "Monash University", amount: 10000, amountDisplay: "$10,000 AUD per year", isFullFunding: false, country: "Australia", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["International student.", "Receive a Monash course offer.", "Based on academic achievement."], deadline: "Varies by round", applyLink: "https://www.monash.edu/study/fees-scholarships/scholarships/find-a-scholarship/monash-international-merit-scholarship-5032Z" },
  { id: 34, name: "University of New South Wales (UNSW) International Scholarships", provider: "UNSW Sydney", amount: 15000, amountDisplay: "15% towards tuition fees or $15,000", isFullFunding: false, country: "Australia", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Be an international student.", "Must be commencing full-time study at UNSW."], deadline: "Varies", applyLink: "https://www.scholarships.unsw.edu.au/scholarships/id/1577/4351" },
  { id: 35, name: "Destination Australia Scholarship", provider: "Australian Government", amount: 15000, amountDisplay: "$15,000 AUD per year", isFullFunding: false, country: "Australia", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Study at a regional campus.", "Maintain ongoing residency in the regional area."], deadline: "Varies by University", applyLink: "https://www.education.gov.au/destination-australia" },
  
  // Germany
  { id: 36, name: "Heinrich Böll Foundation Scholarships", provider: "Heinrich Böll Foundation", amount: 1200, amountDisplay: "Varies, includes monthly stipend", isFullFunding: false, country: "Germany", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Excellent academic records.", "Socially and politically engaged.", "Active interest in the foundation's core values: ecology, sustainability, democracy, human rights, self-determination and justice."], deadline: "March/September", applyLink: "https://www.boell.de/en/foundation/scholarships" },
  { id: 37, name: "Konrad-Adenauer-Stiftung (KAS) Scholarships", provider: "KAS", amount: 861, amountDisplay: "Monthly stipend of €861", isFullFunding: false, country: "Germany", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Above-average academic performance.", "Broad general education and a distinct interest in political issues.", "Positive attitude towards democracy and human rights."], deadline: "July", applyLink: "https://www.kas.de/en/web/begabtenfoerderung-und-kultur/foreign-students" },
  { id: 38, name: "Deutschlandstipendium", provider: "German Government and Private Sponsors", amount: 300, amountDisplay: "€300 per month", isFullFunding: false, country: "Germany", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Enrolled at a German university.", "Outstanding academic record.", "Awarded by the universities directly."], deadline: "Varies by University", applyLink: "https://www.deutschlandstipendium.de/deutschlandstipendium/de/english/english_node.html" },
  
  // More USA
  { id: 39, name: "Hubert H. Humphrey Fellowship Program", provider: "U.S. Department of State", amount: 60000, amountDisplay: "Full funding for a year of non-degree graduate-level study", isFullFunding: true, country: "USA", levelOfStudy: ["Masters"], fieldOfStudy: ["Public Service", "Development"], eligibility: ["Experienced professionals from designated countries.", "A minimum of five years of full-time professional experience."], deadline: "Varies by Country", applyLink: "https://www.humphreyfellowship.org/" },
  { id: 41, name: "University of Michigan International Student Scholarship", provider: "University of Michigan", amount: 10000, amountDisplay: "Varies, up to full tuition", isFullFunding: true, country: "USA", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Admitted to a graduate program.", "Demonstrate financial need."], deadline: "Varies by department", applyLink: "https://internationalcenter.umich.edu/fsis/scholarships" },
  { id: 42, name: "Illinois State University International Awards", provider: "Illinois State University", amount: 1000, amountDisplay: "$1,000 to $11,000 USD", isFullFunding: false, country: "USA", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Admitted as a graduate student.", "Based on academic merit."], deadline: "Varies", applyLink: "https://illinoisstate.edu/admissions/international/cost-aid/scholarships/" },

  // More UK
  { id: 44, name: "University of Westminster Vice-Chancellor's Scholarship", provider: "University of Westminster", amount: 40000, amountDisplay: "Full tuition fee award", isFullFunding: true, country: "UK", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["International student from a developing country.", "Hold an offer for a full-time Master's degree."], deadline: "May", applyLink: "https://www.westminster.ac.uk/scholarships-and-funding/scholarships/vice-chancellors-scholarship" },
  { id: 45, name: "University of Sussex Chancellor's International Scholarships", provider: "University of Sussex", amount: 5000, amountDisplay: "Up to £5,000", isFullFunding: false, country: "UK", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Be an overseas fee-paying student.", "Have accepted a place on a full-time eligible Masters course."], deadline: "August", applyLink: "https://www.sussex.ac.uk/study/fees-funding/masters-scholarships/view/1436-Chancellor-s-International-Scholarship" },
  
  // More Canada
  { id: 46, name: "University of Manitoba Graduate Fellowships (UMGF)", provider: "University of Manitoba", amount: 14000, amountDisplay: "$14,000 (Masters) or $18,000 (PhD) CAD", isFullFunding: false, country: "Canada", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Minimum admission GPA of 3.0.", "Admitted to a full-time graduate program."], deadline: "Varies by department", applyLink: "https://umanitoba.ca/graduate-studies/funding-awards-and-financial-aid/university-manitoba-graduate-fellowships-umgf" },
  { id: 47, name: "University of Alberta Graduate Recruitment Scholarship", provider: "University of Alberta", amount: 5000, amountDisplay: "Up to $5,000 CAD", isFullFunding: false, country: "Canada", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["Newly admitted students to a thesis-based graduate program.", "GPA of 3.7 or higher."], deadline: "Nomination by department", applyLink: "https://www.ualberta.ca/graduate-studies/awards-and-funding/scholarships/recruitment-scholarships/graduate-recruitment-scholarship.html" },
  { id: 48, name: "Simon Fraser University Graduate Dean's Scholarship", provider: "Simon Fraser University", amount: 21000, amountDisplay: "$21,000 (Masters) or $27,000 (PhD) CAD", isFullFunding: false, country: "Canada", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["All Fields"], eligibility: ["High academic standing.", "Nominated by their graduate program."], deadline: "Three times a year", applyLink: "https://www.sfu.ca/gradstudies/awards-funding/scholarships-awards/sfu-funded-awards/graduate-deans-scholarship.html" },

  // More Australia
  { id: 49, name: "Macquarie University Vice-Chancellor's International Scholarship", provider: "Macquarie University", amount: 10000, amountDisplay: "Up to AUD $10,000", isFullFunding: false, country: "Australia", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Achieve a minimum WAM of 65 for Postgraduate applications.", "Hold a full-time offer for a Macquarie University course."], deadline: "Varies", applyLink: "https://www.mq.edu.au/study/admissions-and-entry/scholarships/international/macquarie-university-vice-chancellors-international-scholarship" },
  { id: 50, name: "Griffith Remarkable Scholarship", provider: "Griffith University", amount: 20000, amountDisplay: "50% of tuition fees", isFullFunding: false, country: "Australia", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Be a citizen of a country other than Australia or New Zealand.", "Have a minimum GPA of 3.0 on a 4.0 scale."], deadline: "Varies", applyLink: "https://www.griffith.edu.au/international/scholarships-finance/scholarships/griffith-remarkable-scholarship" },
  { id: 51, name: "Deakin Vice-Chancellor's International Scholarship", provider: "Deakin University", amount: 40000, amountDisplay: "100% or 50% tuition fee waiver", isFullFunding: true, country: "Australia", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["An international student with an offer to study at Deakin.", "An ATAR of 85 or equivalent.", "A weighted average mark (WAM) of 85 or equivalent."], deadline: "Trimester-based", applyLink: "https://www.deakin.edu.au/study/fees-and-scholarships/scholarships/find-a-scholarship/deakin-vice-chancellors-international-scholarship" },
  { id: 52, name: "Flinders International Postgraduate Scholarships", provider: "Flinders University", amount: 28000, amountDisplay: "Stipend ($28,854 AUD per annum) and tuition fee offset", isFullFunding: true, country: "Australia", levelOfStudy: ["PhD", "Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Meet the academic entry requirements for a Masters by Research or Doctorate by Research.", "Not hold an equivalent research higher degree qualification."], deadline: "August", applyLink: "https://www.flinders.edu.au/study/scholarships/flinders-international-postgraduate-scholarships-fips" },

  // Other Countries
  { id: 53, name: "Orange Tulip Scholarship India", provider: "Nuffic Neso India", amount: 10000, amountDisplay: "Varies (tuition fee discounts)", isFullFunding: false, country: "Netherlands", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Have Indian nationality.", "Be in the process of applying or be admitted to a Dutch university that participates in the OTS programme."], deadline: "April/May", applyLink: "https://www.nesoindia.org/scholarships/orange-tulip-scholarship-programme" },
  { id: 54, name: "Eiffel Excellence Scholarship Programme", provider: "French Ministry for Europe and Foreign Affairs", amount: 1181, amountDisplay: "Monthly allowance of €1,181 (Masters) or €1,700 (PhD)", isFullFunding: false, country: "France", levelOfStudy: ["Masters", "PhD"], fieldOfStudy: ["Engineering", "Science", "Economics", "Management", "Law", "Political Science"], eligibility: ["Not of French nationality.", "Age limits apply (25 for Master, 30 for PhD).", "Must be nominated by a French higher education institution."], deadline: "January", applyLink: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence" },
  { id: 55, name: "ETH Zurich Excellence Scholarship & Opportunity Programme", provider: "ETH Zurich", amount: 20000, amountDisplay: "Covers living and study expenses (CHF 12,000 per semester) + tuition waiver", isFullFunding: true, country: "Switzerland", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Excellent result in their undergraduate degree (top 10%).", "Must apply for a Master's degree programme at ETH Zurich."], deadline: "December", applyLink: "https://ethz.ch/students/en/studies/financial/scholarships/excellencescholarship.html" },
  { id: 56, name: "University of Twente Scholarship (UTS)", provider: "University of Twente", amount: 3000, amountDisplay: "€3,000 - €22,000 for one year", isFullFunding: false, country: "Netherlands", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Have been admitted to one of the qualifying UT Master programmes.", "Highly proficient in English.", "Not eligible for a Dutch study loan."], deadline: "February/May", applyLink: "https://www.utwente.nl/en/education/scholarship-finder/university-of-twente-scholarship-uts/" },
  { id: 57, name: "Swedish Institute Scholarships for Global Professionals (SISGP)", provider: "Swedish Institute", amount: 60000, amountDisplay: "Full tuition, living costs, insurance, and travel grant", isFullFunding: true, country: "Sweden", levelOfStudy: ["Masters"], fieldOfStudy: ["All Fields"], eligibility: ["Citizen of a SISGP-eligible country.", "Have at least 3,000 hours of work experience.", "Demonstrate leadership experience."], deadline: "February", applyLink: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/" }
];


scholarships.push(...additionalScholarships);
