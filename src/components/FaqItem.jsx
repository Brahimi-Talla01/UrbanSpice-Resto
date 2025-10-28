import { ChevronDown } from "lucide-react";

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  
  return (
    <div className="group bg-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-yellow-200">
      <button
        className="w-full p-3 cursor-pointer md:p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-md"
        onClick={onClick}
      >
        <h3 className="text-lg text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 md:pr-4">
          {question}
        </h3>
        <div className={`flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6 text-yellow-600" />
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6">
          <div className="h-px bg-gradient-to-r from-yellow-200 via-orange-200 to-transparent mb-4"></div>
          <p className="text-gray-600 text-sm md:text-xl max-w-lg leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;