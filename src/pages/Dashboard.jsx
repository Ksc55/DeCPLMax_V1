import React, {useState} from 'react';
import { Topbar } from '../components/Topbar';
import { SidebarDefault } from '../components/SidebarDefault';
import { VideoCard } from '../components/VideoCard';
import { Chip } from '@material-tailwind/react';
import PinModal from "../modal/PinModal";

const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Health" },
    { id: 3, name: "Education" },
    { id: 4, name: "Entertainment" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Finance" },
    { id: 7, name: "Travel" },
    { id: 8, name: "Food" },
    { id: 9, name: "Fashion" },
    { id: 10, name: "Science" }
];

const Dashboard = () => {
    const [showPinModal, setShowPinModal] = useState(false);

    const upLoadVideos = () => {
      setShowPinModal(true); 
   
    };
    const handleSavePin = (pin) => {
        const storedPin = localStorage.getItem("pin");
        if(storedPin == pin){
          console.log("Good to");
        }
    };
    return (
        <div className='flex flex-col '>
            <Topbar />
            <div className='flex'>
                <SidebarDefault />
                <div className='flex flex-col w-full'>
                    <div className='grid grid-cols-1 md:grid-cols-2 items-center p-4 border-b gap-5 border-blue-gray-200'>
                        <VideoCard />
                        <VideoCard />
                    </div>
                    <div className='p-4'>
                        {/* category list */}
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-xl font-semibold text-blue-gray-900'>
                                Explore by Categories
                            </h1>
                            <div className='overflow-x-auto flex gap-2'>
                                {categories.map(category => (
                                    <Chip key={category.id} value={category.name} />
                                ))}
                            </div>
                        </div>

                        {/* videos to try */}
                        <div className='flex flex-col mt-5'>
                            <h1 className='text-xl font-semibold text-blue-gray-900'>
                                Videos to Try
                            </h1>
                            <div>
                                <button onClick={upLoadVideos} className="rounded-full border border-blue-500 px-3 text-[12px] md:px-4 py-2 cursor-pointer">
                                    upload Video
                                </button>
                            </div>
                            
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                <VideoCard />
                                <VideoCard />
                                <VideoCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PinModal
                isOpen={showPinModal}
                onClose={() => setShowPinModal(false)}
                onSavePin={handleSavePin}
            />
        </div>
    );
};

export default Dashboard;
