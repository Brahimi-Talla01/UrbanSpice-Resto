import { useState, useEffect } from 'react';
import { ArrowUpToLine } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 shadow-2xl z-10 p-3 rounded-2xl cursor-pointer font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white hover:shadow-xl transform hover:-translate-y-1 focus:ring-yellow-300"
            >
                <ArrowUpToLine className="text-white w-6 h-6" />
            </button>
        )
    );
};

export default ScrollToTopButton;
