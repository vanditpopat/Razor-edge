import styles from '@/component/css/service_testamonial.module.css'
import { Image } from 'primereact/image';
import React from 'react';
import { Dialog } from 'primereact/dialog';

export default function Main({ data }){
    const [visible,setVisible]= React.useState();
    const [services,setServices] = React.useState('');
    const [hoverStates, setHoverStates] = React.useState({});
    const headers =[data?.serviceSectionContent?.sectionTitleText,data?.testimonialSectionContent?.sectionTitle];
    const rating = <Image src='/5Star.webp' alt='5start_rating'/>

    const ServiceList=[
        {id:"service1", path:"/service_image_1.webp", alt:"service_card_1", service_name:data?.serviceSectionContent?.service1Text},
        {id:"service2", path:"/service_image_2.webp", alt:"service_card_2", service_name:data?.serviceSectionContent?.service2Text},
        {id:"service3", path:"/service_image_3.webp", alt:"service_card_3", service_name:data?.serviceSectionContent?.service3Text},
        {id:"service4", path:"/service_image_4.webp", alt:"service_card_4", service_name:data?.serviceSectionContent?.service4Text},
    ];

    const TestamonialList=[
        {
            id:"profile_1",
            name: data?.testimonialSectionContent?.reviewer1Name,
            path:"/profile_1.webp",
            alt:"profile_1",
            message:data?.testimonialSectionContent?.reviewer1Name,
        },
        {
            id:"profile_2",
            name: data?.testimonialSectionContent?.reviewer2Name,
            path:"/profile_2.webp",
            alt:"profile_2",
            message:data?.testimonialSectionContent?.reviewer2Comment
        },
        {
            id:"profile_3",
            name: data?.testimonialSectionContent?.reviewer3Name,
            path:"/profile_3.webp",
            alt:"profile_1",
            message:data?.testimonialSectionContent?.reviewer3Comment
        }
    ];

    return (
        <div id='service' className={`${'flex flex-column justify-content-center align-content-center surface-ground relative bottom-0 left-0 top-0'} ${styles.container}`}>
            <h1 className={`${'sm:text-6xl text-center text-black-alpha-90 uppercase mt-7 sm:mt-8 sm:pt-4 mb-5'}`}>{headers[0]}</h1>
            <div className={`${'grid w-full mt-2 mb-2 sm:mb-7 sm:mt-5'}`}>
                {
                    ServiceList.map(({id,path,alt,service_name}) => (
                            <>
                                <div key={id} className='col-12 md:col-6 lg:col-3 flex flex-column justify-content-center align-items-center relative'>
                                    <Image src={path} alt={alt} className={`${'block sm:m-auto pl-4 sm:pl-0'} ${'w-max'} ${styles.imagecontainer}`} onMouseEnter={() => setHoverStates(prev => ({ ...prev, [id]: true }))} onMouseLeave={() => setHoverStates(prev => ({ ...prev, [id]: false }))} onClick={()=>{setVisible(true); setServices(service_name)}}/>
                                    {hoverStates[id] && (<div className={`${styles.tagtest} ${'flex flex-column align-items-center justify-content-center ml-4 sm:m-auto absolute'}`}>
                                        <h2 className={styles.text}>{service_name}</h2>
                                    </div>)}
                                </div>
                            </>
                        )
                    )
                }
            </div>
            <Dialog id='serviceModal' header={services} visible={visible} className='w-11 sm:w-6' onHide={() => {setVisible(false)}}>
                <p className="text-white">
                    {data?.serviceSectionContent?.serviceModalText}
                </p>
            </Dialog>
            <h1 className={`${'sm:text-6xl text-center text-black-alpha-90 uppercase mt-7 mb-7'}`}>{headers[1]}</h1>
            <div id='testimonial' className='grid w-full mb-2 mt-2 sm:mb-7 sm:mt-7'>
               {
                TestamonialList.map(({id, name, path, alt, message}) => (
                            <>
                                <div key={id} className={`${'col-12 md:col-8 lg:col-4 flex flex-column justify-content-center align-items-center ml-2 sm:m-0 relative sm:pl-8 '}`}>
                                    <Image src={path} alt={alt} className={`${styles.testamonialimage} ${'absolute'}`}></Image>
                                    <div className={`${'flex flex-column text-xl sm:text-2xl border-round-xl justify-content-center align-items-center bg-white text-center h-full text-black-alpha-90 w-9 mb-5 p-3'} ${styles.testamonialarea}`}>
                                        <p id='testimonialAuthorName' className='font-semibold text-base mt-4'>- {name}</p>
                                        <p id='testimonialReviewMsg' className='justify-content-between text-lg mt-'>{message}</p>
                                        <p id='testimonialRating' className='mt-1'>{rating}</p>
                                    </div>
                                </div>
                            </>
                        )
                    )   
               }
            </div>
        </div>
    )
}