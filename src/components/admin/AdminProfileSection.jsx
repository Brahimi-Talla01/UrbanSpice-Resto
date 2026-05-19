import { User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

const AdminProfileSection = ({ user, loading }) => {
    
    // Pendant le chargement
    if (loading) {
        return (
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
            </div>
        )
    }

    // Si on a pas d'utilisateur
    if (!user) {
        return (
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-gray-500">
                    <User className='w-10 h-10' />
                    <span>Non connecte</span>
                </div>
            </div>
        )
    }

    return (
        <div className='px-6 mb-8'>
            <div className='relative'>
                <div className='md:flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md'>
                    <div className='flex items-center gap-3'>
                        {/* Avatar  */}
                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white font-semibold text-sm shadow-md'>
                            <User />
                        </div>
                        {/* Psaume 33:14 */}
                        <div className='flex-col'>
                        
                            <div className='flex-1 hidden md:block'>
                                <p className='font-medium text-gray-800 text-sm'>
                                    { user.nom_user || 'Administrateur'}
                                </p>
                                <span className={user.role === 'admin' 
                                    ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-transparent text-xs bg-clip-text font-bold' 
                                    : 'text-blue-500'}>
                                    {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                                </span>

                            </div>
                            <p className='text-gray-500 text-xs'>En ligne</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='flex items-center gap-1'>
                        <button className='p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors group'>
                            <Settings className='w-4 h-4 text-gray-500 group-hover:text-orange-500' />
                        </button>
                        <button className='p-2 hover:bg-red-50 rounded-lg cursor-pointer transition-colors group'>
                            <LogOut className='w-4 h-4 text-gray-500 group-hover:text-red-500' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfileSection;