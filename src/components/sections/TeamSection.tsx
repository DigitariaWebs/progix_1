import Image from 'next/image';
import { teamMembers as fullTeam } from '@/data/teamData';

type SimpleMember = {
  name: string;
  role: string;
  photo: string;
  linkedinUrl: string;
};

const mappedMembers: SimpleMember[] = fullTeam.slice(0, 8).map((m) => ({
  name: m.name,
  role: m.role,
  photo: m.image,
  linkedinUrl: m.linkedinUrl,
}));

const TeamSection = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto mb-6 sm:mb-10">
        {/* Corner label */}
        <div className="mb-4 sm:mb-6">
          <span className="text-xs font-bold uppercase tracking-wide text-gray-700">
            / ÉQUIPE
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-left text-gray-900">
          UNE PETITE ÉQUIPE AUX GRANDES AMBITIONS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
        {mappedMembers.map((member, idx) => (
          <div key={idx} className="flex flex-col">
            <div
              className="w-full overflow-hidden cursor-pointer rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ aspectRatio: '3 / 4', maxHeight: '360px' }}
            >
              {member.photo &&
              member.photo.trim() !== '' &&
              member.linkedinUrl &&
              member.linkedinUrl !== '#' ? (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    style={
                      member.name === 'Jean Boissoneault'
                        ? { objectPosition: 'top' }
                        : undefined
                    }
                    priority={idx < 2}
                  />
                </a>
              ) : member.photo && member.photo.trim() !== '' ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  style={
                    member.name === 'Jean Boissoneault'
                      ? { objectPosition: 'top' }
                      : undefined
                  }
                  priority={idx < 4}
                />
              ) : null}
            </div>
            <div className="mt-3 sm:mt-4 md:mt-5">
              <h3 className="text-base sm:text-lg md:text-xl font-extrabold tracking-wide text-gray-900 uppercase">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 leading-relaxed">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
