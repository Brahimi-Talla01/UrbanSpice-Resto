import { User, LogOut, Settings } from 'lucide-react';

const AdminProfileSection = () => {

    return (
        <div className='px-6 mb-8'>
            <div className='relative'>
                <div className='md:flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md'>
                    <div className='flex items-center gap-3'>
                        {/* Avatar  */}
                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white font-semibold text-sm shadow-md'>
                            <User />
                        </div>

                        <div>
                            <p className='font-medium text-gray-800 text-sm'>Admin Name</p>
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