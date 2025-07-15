import { ShoppingBag, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import InstagramFeed from '../components/home/InstagramFeed';
import CtaSection from '../components/home/CtaSection';
import TechnicalService from '../components/home/TechService';
import FastCategories from '../components/home/FastCategories';
import AllStateCoverage from '../components/home/AllStateCoverage';
import ClientSlider from '../components/home/OurClients';
import HomeModal from '../components/home/HomeLayout';

const HomePage = ({ data }: Record<string, any>) => {
  const { whyChooseUs, heroSection, techServiceSection, fastCategoriesSection, allStateCoverage, landingBanner } = data.website;

  const icons = [
    <ShoppingBag className="text-amber-600\" size={32} />,
    <ShieldCheck className="text-amber-600\" size={32} />,
    <TrendingUp className="text-amber-600\" size={32} />,
    <Zap className="text-amber-600\" size={32} />
  ];

  return (
    <div>
      {heroSection.showThisSection && (
        <Hero data={data} />
      )}
      
      {/* Key Features Section */}
      {whyChooseUs.showThisSection && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.cards.map((elem: Record<string, any>, i: number) => (
                <FeatureCard 
                  key={i}
                  icon={icons[i]}
                  title={elem.title}
                  description={elem.subtitle}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {techServiceSection.showThisSection && (
        <TechnicalService data={data} />
      )}

      {allStateCoverage.showThisSection && (
        <AllStateCoverage data={data}/>
      )}

      {fastCategoriesSection.showThisSection && (
        <FastCategories data={data} />
      )}
      
      <FeaturedProducts data={data} />
      <InstagramFeed data={data} />
      <ClientSlider data={data} />
      <CtaSection data={data} />

      {landingBanner.showBanner && (
        <HomeModal data={data}/>
      )}
    </div>
  );
};

// Helper component
const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="mb-4 p-3 bg-amber-50 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HomePage;