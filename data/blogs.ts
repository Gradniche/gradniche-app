export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    image: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "5 Tips for Crafting a Winning Statement of Purpose (SOP)",
        excerpt: "Your SOP is your chance to tell your story. Discover key strategies to make your application stand out from the crowd and impress the admissions committee.",
        author: "Dr. Aisha Khan",
        date: "October 26, 2023",
        category: "Application Tips",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Navigating the F-1 Visa: A Student's Guide to the US Interview",
        excerpt: "The F-1 visa interview can be daunting. We break down the process, common questions, and essential preparation tips to help you succeed.",
        author: "Rohan Mehta",
        date: "October 22, 2023",
        category: "Visas",
        image: "https://images.unsplash.com/photo-1563223079-6c382104a3be?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Scholarship Hunting: Where and How to Find Funding for Your Studies",
        excerpt: "Don't let finances hold you back. Explore the best resources and strategies for finding and applying for scholarships to fund your education abroad.",
        author: "Priya Sharma",
        date: "October 18, 2023",
        category: "Finance",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "STEM vs. Non-STEM: Which Path is Right for Post-Study Work?",
        excerpt: "Understand the differences in post-study work opportunities, such as OPT and the Graduate Route, for STEM and non-STEM fields in the US and UK.",
        author: "Admin Team",
        date: "October 15, 2023",
        category: "Careers",
        image: "https://images.unsplash.com/photo-1574981180258-294026c04f4a?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Life in Canada: A Student's Perspective on Culture and Academics",
        excerpt: "What is it really like to study in Canada? A current student shares insights on adjusting to the culture, the academic environment, and making the most of the experience.",
        author: "Anjali Singh",
        date: "October 11, 2023",
        category: "Student Life",
        image: "https://images.unsplash.com/photo-1470224124996-a334a019e46a?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "The Rise of AI in Academia: How to Leverage Tech in Your Master's",
        excerpt: "Artificial intelligence is transforming research and learning. Learn how you can use AI tools ethically and effectively to enhance your graduate studies.",
        author: "Dr. Ben Carter",
        date: "October 07, 2023",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop"
    }
];