import { useContext, useState } from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { StoreContext } from '../contexts/StoreContext';
import ScrollToTopButton from './SrollToTopButton';
import FaqItem from './FaqItem';


const FaqsSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const { FaqData } = useContext(StoreContext);

  const toggleFaq = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div id='faqs' className="w-full py-4 md:py-12 mt-4 md:mt-16 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto bg-background-top-light grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Questions
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"> Fréquentes</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Trouvez rapidement les réponses à toutes vos questions sur notre restaurant, 
              nos services et notre délicieuse cuisine.
            </p>

            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Réponses instantanées</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Mis à jour régulièrement</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl ">
        <div className="space-y-4">
          {FaqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
};

export default FaqsSection;
