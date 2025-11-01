export interface Testimonial {
    quote: string;
    name: string;
    university: string;
    country: string;
    image: string;
}

export const testimonials: Testimonial[] = [
    {
        quote: "GradNiche's AI SOP Analyzer was a game-changer. It gave me the confidence I needed to submit my application, and I got into my dream university!",
        name: "Aarav Sharma",
        university: "Carnegie Mellon University",
        country: "USA",
        image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200",
    },
    {
        quote: "The College Finder tool is incredibly detailed. I was able to compare universities based on factors I hadn't even considered. Highly recommended!",
        name: "Sneha Gupta",
        university: "University of Toronto",
        country: "Canada",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    },
    {
        quote: "Navigating the UK visa process was daunting, but the step-by-step guides on GradNiche made it so much clearer. It saved me a lot of stress.",
        name: "Rahul Verma",
        university: "Imperial College London",
        country: "UK",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
        quote: "The community forums are a goldmine of information. I connected with seniors from my target university who gave me invaluable, firsthand advice.",
        name: "Priya Singh",
        university: "University of Melbourne",
        country: "Australia",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    }
];
