
import React from 'react';
import { AvatarConfig, generateAvatarUrl } from '../data/forums';

const destinations = [
  {
    name: 'USA',
    description: 'Home to top-ranked universities and diverse career opportunities.',
    href: '/destinations/usa',
    avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-usa', hair: 'short01', eyes: 'variant01', skinColor: 'F5C6A0', hairColor: '4D4D4D', clothing: 'shirt', clothingColor: 'F6520C' } },
  },
  {
    name: 'Canada',
    description: 'Known for its high quality of life and welcoming immigration policies.',
    href: '/destinations/canada',
    avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-canada-female', hair: 'long01', eyes: 'variant06', skinColor: 'E4A381', hairColor: 'A25900', clothing: 'hoodie', clothingColor: 'FF0000' } },
  },
  {
    name: 'UK',
    description: 'Rich in history with world-renowned institutions and vibrant cities.',
    href: '/destinations/uk',
    avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-uk', hair: 'short02', eyes: 'variant02', skinColor: 'AF6E5A', hairColor: '282828', clothing: 'blazer', clothingColor: '00247D' } },
  },
  {
    name: 'Australia',
    description: 'Offers a fantastic lifestyle and excellent hands-on learning experiences.',
    href: '/destinations/australia',
    avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-australia-female', hair: 'long02', eyes: 'variant07', skinColor: 'C47D6A', hairColor: 'B86B25', clothing: 'crewNeck', clothingColor: 'FFCD00' } },
  },
   {
    name: 'Germany',
    description: 'Engineering excellence and low-cost education in the heart of Europe.',
    href: '/destinations/germany',
    avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-germany', hair: 'short06', eyes: 'variant03', skinColor: 'D88C7A', hairColor: '2c1b18', clothing: 'blazer', clothingColor: '000000' } },
  },
  {
    name: 'Ireland',
    description: 'Europe\'s vibrant tech hub with a rich culture and friendly atmosphere.',
    href: '/destinations/ireland',
    avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-ireland-female', hair: 'long06', eyes: 'variant11', skinColor: 'F5C6A0', hairColor: 'cb6820', clothing: 'crewNeck', clothingColor: '009A44' } },
  },
   {
    name: 'UAE',
    description: 'A futuristic global business hub with modern universities and tax-free perks.',
    href: '/destinations/uae',
    avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-uae', hair: 'short08', eyes: 'variant12', skinColor: 'AF6E5A', hairColor: '000000', clothing: 'shirt', clothingColor: '000000', accessories: 'sunglasses', accessoriesProbability: 100 } },
  },
  {
    name: 'New Zealand',
    description: 'Stunning landscapes, a high quality of life, and a world-class education system.',
    href: '/destinations/new-zealand',
    avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-nz-female', hair: 'long07', eyes: 'variant01', skinColor: 'E4A381', hairColor: '4D4D4D', clothing: 'blazer', clothingColor: '000000' } },
  }
];


interface DestinationCardProps {
  name: string;
  description: string;
  href: string;
  avatarConfig: AvatarConfig;
  navigate: (path: string) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ name, description, href, avatarConfig, navigate }) => (
    <a
        href={`#${href}`}
        onClick={(e) => {e.preventDefault(); navigate(href)}}
        className="relative rounded-lg overflow-hidden group h-96 text-left focus:outline-none focus:ring-4 focus:ring-[#F6520C] focus:ring-offset-4 focus:ring-offset-gray-900 border-2 border-gray-700 hover:border-[#F6520C] hover:shadow-2xl hover:shadow-[#F6520C]/20 transition-all duration-300"
    >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-[#0a101f] to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(246,82,12,0.15)_0%,rgba(10,16,31,0)_80%)] group-hover:bg-[radial-gradient(ellipse_at_top,_rgba(246,82,12,0.25)_0%,rgba(10,16,31,0)_80%)] transition-all duration-300"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-6">
            <div className="flex-grow flex items-center justify-center pt-4">
                {/* Avatar */}
                <div className="w-40 h-40 transition-transform duration-300 transform group-hover:scale-110">
                    <div className="bg-white/5 p-2 rounded-full shadow-lg border border-white/10">
                        <img src={generateAvatarUrl(avatarConfig)} alt={`${name} destination student avatar`} className="w-full h-full" />
                    </div>
                </div>
            </div>
            
            {/* Text */}
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </div>
    </a>
);

interface DestinationsProps {
    navigate: (path: string) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ navigate }) => {
  return (
    <section id="destinations" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Explore Global Hubs</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            Discover premier destinations that offer world-class education and unparalleled opportunities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.name} {...dest} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
