import { assets } from '../assets/assets/assets';

const About = () => {
    return (
        <div id='about' className='bg-background-top-light w-full my-4 md:my-8 py-4 md:pt-8 md:pb-12'>
            <h1 className='text-xl md:text-4xl font-semibold text-light text-center pb-8 font-outfit'>Qui sommes-nous ?</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto overflow-hidden'>

                <div className='bg-white p-6 order-2 md:order-1'>
                    <p className='text-lg text-start font-open'>
                        Bienvenue chez <span className='text-xl font-bold'>Urban<span className='text-light'>Spice</span></span>, là où la cuisine urbaine rencontre les saveurs du monde.
                        Né de la passion pour la gastronomie moderne et les épices authentiques, UrbanSpice vous invite à vivre une expérience culinaire unique, dans un cadre chaleureux, élégant et convivial.
                        <br /> <br />
                        Notre équipe de chefs revisite les classiques en y ajoutant une touche contemporaine, en alliant fraîcheur, créativité et goût. Que ce soit pour un déjeuner rapide, un dîner entre amis ou une soirée spéciale, chaque plat est conçu pour éveiller vos papilles et vous faire voyager.
                    </p>
                </div>

                <div className='w-full h-full order-1 md:order-2'>
                    <img 
                        src={assets.slideMain3} 
                        alt="Hero about" 
                        className='w-full h-full object-cover' 
                    />
                </div>

            </div>
        </div>
    )
}

export default About;
