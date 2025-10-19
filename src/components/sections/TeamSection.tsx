import Image from 'next/image';
import { teamMembers as fullTeam } from '@/data/teamData';

type SimpleMember = {
  name: string;
  role: string;
  photo: string;
  linkedinUrl: string;
};

const mappedMembers: SimpleMember[] = fullTeam
  .slice(0, 8)
  .map((m) => ({
    name: m.name,
    role: m.role,
    photo: m.image,
    linkedinUrl: m.linkedinUrl,
  }));

const TeamSection = () => {
  return (
    <section className="w-full bg-white py-20 px-10 md:px-16">
      <div className="max-w-7xl mx-auto mb-10">
        {/* Corner label */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wide text-gray-700">
            / ÉQUIPE
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-left text-gray-900">
          UNE PETITE ÉQUIPE AUX GRANDES AMBITIONS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {mappedMembers.map((member, idx) => (
          <div key={idx} className="flex flex-col">
            <div
              className="w-full overflow-hidden cursor-pointer"
              style={{ aspectRatio: '4 / 3' }}
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
                    style={
                      member.name === 'Jean Boissoneault'
                        ? { objectPosition: 'top' }
                        : undefined
                    }
                    priority={idx < 4}
                  />
                </a>
              ) : member.photo && member.photo.trim() !== '' ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  style={
                    member.name === 'Jean Boissoneault'
                      ? { objectPosition: 'top' }
                      : undefined
                  }
                  priority={idx < 4}
                />
              ) : null}
            </div>
            <div className="mt-5">
              <h3 className="text-lg md:text-xl font-extrabold tracking-wide text-gray-900 uppercase">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
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
