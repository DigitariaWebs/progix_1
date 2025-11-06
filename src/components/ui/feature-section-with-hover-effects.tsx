import { cn } from '@/lib/utils';
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from '@tabler/icons-react';

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: 'Excellence Technique',
      description:
        'Nous nous engageons à livrer des solutions logicielles de la plus haute qualité, en utilisant les meilleures pratiques et technologies de pointe.',
      icon: <IconTerminal2 className="h-8 w-8" />,
    },
    {
      title: 'Innovation Continue',
      description:
        "Nous restons à l'avant-garde de la technologie pour offrir des solutions innovantes qui donnent un avantage concurrentiel à nos clients.",
      icon: <IconEaseInOut className="h-8 w-8" />,
    },
    {
      title: 'Solutions Sur Mesure',
      description:
        "Chaque projet est unique. Nous créons des solutions personnalisées qui s'adaptent parfaitement aux besoins spécifiques de chaque organisation.",
      icon: <IconCurrencyDollar className="h-8 w-8" />,
    },
    {
      title: 'Sécurité & Fiabilité',
      description:
        'La sécurité de vos données et la fiabilité de nos solutions sont au cœur de notre approche de développement.',
      icon: <IconCloud className="h-8 w-8" />,
    },
    {
      title: 'Collaboration Authentique',
      description:
        "Nous croyons en la force du travail d'équipe et en des relations transparentes avec nos clients, basées sur la confiance mutuelle.",
      icon: <IconRouteAltLeft className="h-8 w-8" />,
    },
    {
      title: 'Support 24/7',
      description:
        'Notre équipe est disponible pour vous accompagner à tout moment, garantissant une assistance continue pour vos projets.',
      icon: <IconHelp className="h-8 w-8" />,
    },
    {
      title: 'Croissance Durable',
      description:
        "Nous construisons des solutions évolutives qui grandissent avec votre entreprise et s'adaptent aux changements futurs.",
      icon: <IconAdjustmentsBolt className="h-8 w-8" />,
    },
    {
      title: 'Qualité Garantie',
      description:
        'Chaque ligne de code est écrite avec soin et chaque fonctionnalité est testée rigoureusement pour garantir la qualité.',
      icon: <IconHeart className="h-8 w-8" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:border-r py-10 relative group/feature border-white/20',
        (index === 0 || index === 4) && 'lg:border-l border-white/20',
        index < 4 && 'lg:border-b border-white/20',
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-white">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/30 group-hover/feature:bg-white transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-white/80 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
