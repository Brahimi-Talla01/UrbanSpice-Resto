import { useContext, useState } from 'react';
import FaqItem from '../components/FaqItem';
import { StoreContext } from '../contexts/StoreContext';
import ScrollToTopButton from '../components/SrollToTopButton';

const Faqs = () => {

    const { faqData } = useContext(StoreContext);

    const [openIndex, setopenIndex] = useState(null);

    const toggleFaq = (index) => {
      setopenIndex(index === openIndex ? null : index);
    };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>
      <section className='w-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-lg mx-auto py-6 md:py-12'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 text-center mb-2 font-outfit'>
                FAQs
            </h2>
            <div className='w-15 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full'></div>
            <p className='text-center text-gray-600 mt-2'>
                Vos questions les plus fréquentes sur notre cuisine et nos services.
            </p>
        </div>

        <div className='px-2 space-y-4'>
          {faqData.map((item, index) => (
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
  )
}

export default Faqs;
