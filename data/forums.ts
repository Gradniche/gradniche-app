import { maleAvatars, femaleAvatars } from './avatars';

export interface AvatarConfig {
  style: string;
  options: Record<string, any>;
}

export const generateAvatarUrl = (config: AvatarConfig): string => {
    const params = new URLSearchParams(config.options).toString();
    return `https://api.dicebear.com/7.x/${config.style}/svg?${params}`;
};

export interface User {
  id: string;
  name: string;
  avatarConfig: AvatarConfig;
  username: string;
  password?: string;
  role: 'user' | 'admin';
}

export interface Category {
  id: string;
  name: string;
}

export interface Reply {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Thread {
  id: string;
  title: string;
  categoryId: string;
  authorId: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

export const users: User[] = [
  { id: 'u0', name: 'Admin', avatarConfig: femaleAvatars[2], username: 'admin', password: 'adminpassword', role: 'admin' },
  { id: 'u1', name: 'Rohan Mehta', avatarConfig: maleAvatars[0], username: 'rohan', password: 'password123', role: 'user' },
  { id: 'u2', name: 'Priya Sharma', avatarConfig: femaleAvatars[1], username: 'priya', password: 'password123', role: 'user' },
  { id: 'u3', name: 'Anjali Singh', avatarConfig: femaleAvatars[2], username: 'anjali', password: 'password123', role: 'user' },
  { id: 'u4', name: 'Vikram Kumar', avatarConfig: maleAvatars[3], username: 'vikram', password: 'password123', role: 'user' },
];

export const categories: Category[] = [
  { id: 'c1', name: 'General Discussion' },
  { id: 'c2', name: 'University Applications' },
  { id: 'c3', name: 'Visa & Immigration' },
  { id: 'c4', name: 'Student Life' },
  { id: 'c5', name: 'Scholarships & Finance' },
];

export const threads: Thread[] = [
  {
    id: 't1',
    title: "Confused between MS in CS at USC vs. UIUC",
    categoryId: 'c2',
    authorId: 'u1',
    timestamp: "2 hours ago",
    content: "Hey everyone, I've been fortunate enough to get admits from both USC and UIUC for their MS in CS programs. I'm having a really tough time deciding. \n\nUSC has the location advantage being in California, but UIUC is legendary for its CS program. Any thoughts or advice would be greatly appreciated!",
    replies: [
      { id: 'r1', authorId: 'u2', timestamp: "1 hour ago", content: "Congrats on the admits! That's a great problem to have. I'd lean towards UIUC for the pure academic rigor and reputation. The alumni network is incredibly strong in tech.", likes: 12 },
      { id: 'r2', authorId: 'u4', timestamp: "30 minutes ago", content: "Don't underestimate the location of USC. The networking opportunities and proximity to tech companies in LA are huge. You can get internships much more easily. Plus, the weather is a big plus!", likes: 7 },
    ]
  },
  {
    id: 't2',
    title: "F-1 Visa Interview Experience - Mumbai Consulate",
    categoryId: 'c3',
    authorId: 'u3',
    timestamp: "1 day ago",
    content: "Just had my F-1 visa interview at the Mumbai consulate and got it approved! Wanted to share my experience. The VO was very professional. They mainly asked about my university, why I chose my course, and how I'm funding my education. \n\nMy advice: **be confident**, know your documents, and have a clear answer for why you'll return to India after your studies. Good luck to everyone!",
    replies: [
      { id: 'r3', authorId: 'u1', timestamp: "22 hours ago", content: "This is so helpful, Anjali! My interview is next week. Were there any tricky questions?", likes: 5 },
      { id: 'r4', authorId: 'u3', timestamp: "21 hours ago", content: "Not really tricky, but they did ask me to be very specific about my post-graduation plans in India. So have a *clear career path* in mind. All the best!", likes: 9 }
    ]
  },
  {
    id: 't3',
    title: "Best way to find part-time jobs on campus?",
    categoryId: 'c4',
    authorId: 'u2',
    timestamp: "3 days ago",
    content: "Hi everyone, I'll be starting my program this fall. What's the best way to find on-campus part-time jobs? Should I start applying now or wait until I get there? Looking for roles like library assistant or research assistant.",
    replies: [
       { id: 'r5', authorId: 'u4', timestamp: "3 days ago", content: "Most universities have a student employment portal on their website. I'd start looking there now to see what's available. For RA positions, it's best to directly email professors whose research interests you.", likes: 15 }
    ]
  },
  {
    id: 't4',
    title: "Has anyone received the Chevening scholarship results yet?",
    categoryId: 'c5',
    authorId: 'u4',
    timestamp: "5 days ago",
    content: "The wait is killing me! Has anyone heard back about the Chevening scholarship interviews or final results? The timeline on the website is a bit vague.",
    replies: []
  }
];
