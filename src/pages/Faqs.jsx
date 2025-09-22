import { useContext, useState } from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { StoreContext } from '../contexts/StoreContext';
import ScrollToTopButton from '../components/SrollToTopButton';
import FaqItem from '../components/FaqItem';


const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const { FaqData } = useContext(StoreContext);

  const toggleFaq = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden mt-5 mb-5 rounded-xl">
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Une question non résolue ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+2376XXXXXXXXX"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Nous appeler
              </a>
              <a
                href="mailto:contact@urbanspice.cm"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300"
              >
                Nous écrire
              </a>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
};

export default Faqs;
