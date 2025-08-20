import { Plus, Minus } from "lucide-react";

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`w-full border-2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white ${isOpen ? " border-yellow-500" : "border-gray-200"}`}>
            <button
                className="w-full cursor-pointer flex justify-between items-center p-4 text-left focus:outline-none"
                onClick={onClick}
            >
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    {question}
                </h3>
                <span className="ml-4 text-yellow-500 bg-background-top-light rounded-full p-1">
                    {isOpen ? <Minus className="w-5 h-5 font-bold" /> : <Plus className="w-5 h-5 font-bold" />}
                </span>
            </button>

            <div
                className={`px-4 pb-2 transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <p className="text-gray-600 text-sm md:text-lg">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default FaqItem;
