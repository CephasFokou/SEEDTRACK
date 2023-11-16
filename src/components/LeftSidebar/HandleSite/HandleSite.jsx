import React, { useState } from 'react'
import './HandleSite.css'
import Site from './Site/Site'
const siteList=[ {
    name: 'abom mbanga',
    amount: '07',
    lat: 10, // initial latitude
    lng: 15, // initial longitude
},{
    name:'abom mbangant',
    amount: '15',
    lat: 0, // initial latitude
    lng: 0, // initial longitude
}]

const HandleSite= () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSite, setSelectedSite] = useState(null);
    const filteredSiteList = siteList.filter((site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSiteClick = (site) => { 
        console.log('Site clicked:', site);
        setSelectedSite(site);
    };
    
    const renderedListItem = filteredSiteList.map((site) => (
        <div
          className='flex flex-col gap-2.5 cursor-pointer'
          key={site.name}
          onClick={() => handleSiteClick(site)}
        >
            <Site site={site} />
        </div>
    ));
    return (
        <div className="manrope-font">

            <div className='relative w-full'>
                <label htmlFor="searchSite" className="text-xs text-gray-true-500">
                    Search by name
                </label>
                <input
                    type='text'
                    className='w-full outline-0 border-b border-solid border-green-main pr-10 gray-true-800'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className='bottom-2 absolute right-1' xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M14.5001 14.5L11.6048 11.6047M11.6048 11.6047C12.1001 11.1094 12.4929 10.5215 12.761 9.87438C13.029 9.22729 13.1669 8.53375 13.1669 7.83335C13.1669 7.13295 13.029 6.4394 12.761 5.79232C12.4929 5.14523 12.1001 4.55727 11.6048 4.06202C11.1095 3.56676 10.5216 3.1739 9.8745 2.90586C9.22742 2.63783 8.53387 2.49988 7.83347 2.49988C7.13307 2.49988 6.43953 2.63783 5.79244 2.90586C5.14535 3.1739 4.5574 3.56676 4.06214 4.06202C3.06192 5.06224 2.5 6.41882 2.5 7.83335C2.5 9.24787 3.06192 10.6045 4.06214 11.6047C5.06236 12.6049 6.41895 13.1668 7.83347 13.1668C9.248 13.1668 10.6046 12.6049 11.6048 11.6047Z" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div>
                {/* <div className='mt-4 mb-3 px-3 w-full text-[10px] flex justify-between items-center'>
                    <div className='text-gray-true-800' > Searchresults 03</div>
                    <div>
                        <span>Sort:</span>
                        <select className='outline-0 text-gray-true-800' name="" id="">
                            <option value="">proprio</option>
                            <option value="">option 2</option>
                            <option value="">option 3</option>
                        </select>
                    </div>
                </div> */}

                {/* <div>
                    <Site site={siteList[0]} />
                    <div className='manrope-font rounded border border-solid border-black/10 bg-[#F5F5F5]  text-[8px] gray-true-600 flex justify-between mb-4 p-2 pb-2.5'>
                        <div className='text-left'>
                            <span className='block'> <span className='font-extrabold'>15%</span> champs</span>
                            <span className='block'> <span className='font-extrabold'>05%</span> arbre mâle NC</span>
                            <span className='block'> <span className='font-extrabold'>05%</span> arbre mâle C</span>
                            <span className='block'> <span className='font-extrabold'>05%</span> arbre femelle NC</span>
                            <span className='block'> <span className='font-extrabold'>05%</span> arbre femelle C</span>
                        </div>
                        <div className='text-left'>
                            <span className='block'> <span className='font-extrabold'>10%</span> arbre manquant</span>
                            <span className='block'> <span className='font-extrabold'>05%</span> arbre mâle manquant</span>
                            <span className='block'> <span className='font-extrabold'>05%</span> arbre femelle manquant</span>
                            <span className='block'> <span className='font-extrabold'>90</span> arbre M manquants</span>
                            <span className='block'> <span className='font-extrabold'>10</span> arbre F manquants</span>
                        </div>
                    </div>
                </div> */}
            </div>
           {renderedListItem}
        </div>
    )
}
export default HandleSite