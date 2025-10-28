import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div id='contact' className='w-full px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto overflow-hidden md:mt-16'>
            <div className="text-center mb-4 mt-6 md:mb-12 md:mt-12">
                <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
                    Besoin d'aide ? 
                    <span className="text-yellow-500"> Contactez-nous</span>
                </h1>
                <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                    Notre équipe est là pour vous accompagner. N'hésitez pas à nous contacter !
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-0 py-6'>

                <div className='order-2 lg:order-1 space-y-6'>
                    
                    {/* Carte Adresse */}
                    <div className='group bg-gradient-to-br from-white to-gray-50 hover:from-yellow-50 hover:to-white rounded-2xl p-3 md:p-6 border border-gray-100 hover:border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                        <div className='flex items-center gap-4'>
                            <div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                <MapPin className='w-6 h-6 text-white' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-lg font-bold text-gray-800 group-hover:text-yellow-600 transition-colors'>
                                    Adresse
                                </h2>
                                <p className='text-gray-600 font-medium'>Emana, Ydé 530012</p>
                                <p className='text-sm text-gray-500'>Cameroun</p>
                            </div>
                        </div>
                    </div>

                    {/* Carte Téléphone */}
                    <div className='group bg-gradient-to-br from-white to-gray-50 hover:from-yellow-50 hover:to-white rounded-2xl p-3 md:p-6 border border-gray-100 hover:border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                        <div className='flex items-center gap-4'>
                            <div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                <Phone className='w-6 h-6 text-white' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-lg font-bold text-gray-800 group-hover:text-yellow-600 transition-colors'>
                                    Téléphone
                                </h2>
                                <a href="tel:+237" className='text-sm font-bold text-gray-800 group-hover:text-yellow-600 transition-colors'>
                                    +237 XXX XXX XXX
                                </a>
                                <p className='text-sm text-gray-500'>Appelez-nous maintenant</p>
                            </div>
                        </div>
                    </div>

                    {/* Carte Email */}
                    <div className='group bg-gradient-to-br from-white to-gray-50 hover:from-yellow-50 hover:to-white rounded-2xl p-3 md:p-6 border border-gray-100 hover:border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                        <div className='flex items-center gap-4'>
                            <div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                <Mail className='w-6 h-6 text-white' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-lg font-bold text-gray-800 group-hover:text-yellow-600 transition-colors'>
                                    Email
                                </h2>
                                <a href="mailto:urbanspice@gmail.com" className='text-blue-600 font-medium hover:text-blue-700 transition-colors hover:underline'>
                                    urbanspice@gmail.com
                                </a>
                                <p className='text-sm text-gray-500'>Écrivez-nous un message</p>
                            </div>
                        </div>
                    </div>

                    {/* Carte Horaires */}
                    <div className='group bg-gradient-to-br from-white to-gray-50 hover:from-yellow-50 hover:to-white rounded-2xl p-3 md:p-6 border border-gray-100 hover:border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                        <div className='flex items-start gap-4'>
                            <div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                <Clock className='w-6 h-6 text-white' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-lg font-bold text-gray-800 group-hover:text-yellow-600 transition-colors'>
                                    Heures d'ouverture
                                </h2>
                                <div className='space-y-1'>
                                    <p className='text-gray-600 font-medium flex items-center gap-2'>
                                        <span className='font-bold text-gray-800'>Lundi - Samedi:</span> 
                                        <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold'>
                                            08h - 22h
                                        </span>
                                    </p>
                                    <p className='text-gray-600 font-medium flex items-center gap-2'>
                                        <span className='font-bold text-gray-800'>Dimanche:</span> 
                                        <span className='bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-semibold'>
                                            Fermé
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='order-1 lg:order-2'>
                    <div className='w-full h-full rounded-2xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-gray-100 to-background-top-light border border-gray-200'>
                        
                        {/* Loader */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
                                <div className='relative'>
                                    <div className='animate-spin rounded-full h-20 w-20 border-4 border-background-top-light'></div>
                                    <div className='animate-spin rounded-full h-20 w-20 border-4 border-t-yellow-500 absolute top-0 left-0'></div>
                                </div>
                                <p className="text-gray-600 font-medium mt-4 animate-pulse">
                                    Chargement de la carte...
                                </p>
                            </div>
                        )}

                        <div className="absolute top-0 left-0 right-0 bg-background-top-light text-gray-700 p-4 z-20">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Notre localisation
                            </h3>
                            <p className="text-yellow-500 text-sm">Trouvez-nous facilement</p>
                        </div>

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15921.647139591716!2d11.50058667176957!3d3.9351499042257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bc900555318f1%3A0xddbc3bb65c27b3e7!2sEmana!5e0!3m2!1sfr!2scm!4v1753792297170!5m2!1sfr!2scm"
                            width="100%"
                            height="500"
                            style={{ border: 0, paddingTop: '80px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-2xl"
                            onLoad={() => setIsLoading(false)}
                        />

                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-gray-200">
                            <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Ouvert maintenant
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contact;