import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'primereact/image';
import Nav from '@/component/nav';
import Footer from '@/component/footer';
import styles from '@/styles/about.module.css';
import { getDataInObject } from '../lib/markdownReader';

export async function getStaticProps() {
  const markdownData = getDataInObject("./dynamic-content");

  return {
    props: {
      data: markdownData,
    },
  };
}

export default function About({ data }) {
    const homeRef = useRef(null);
    const servicesRef = useRef(null);
    const contactUsRef = useRef(null);
    const router = useRouter();

    const onMenuClick = (sectionId) => {
        switch (sectionId) {
            case 'home':
              router.push('/').then(() => homeRef?.current?.scrollIntoView({ behavior: 'smooth' }));
                break;
            case 'about':
                router.push('/about');
                break;
            case 'services':
              router.pathname !== '/'
              ? router.push('/').then(() => servicesRef?.current?.scrollIntoView({ behavior: 'smooth' }))
              : servicesRef?.current?.scrollIntoView({ behavior: 'smooth' });
            break;
            case 'contact-us':  
                contactUsRef?.current?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    };
    
    return (
        <>
            <div className='overflow-x-hidden'>
                <Nav onMenuClick={onMenuClick} />

                <div id='AboutPageContainer' className="flex justify-content-center align-items-center mt-8">
                    <div id='leftSectionContainer' className="flex flex-column p-4 w-full">
                        <h1 id='aboutSiteName'>{data?.aboutSiteContent?.siteNameText}</h1>
                        <p id='aboutContent' className='text-lg'>{data?.aboutSiteContent?.siteInfoText}</p>
                        <p id='aboutSubtextContent' className='text-lg'>{data?.aboutSiteContent?.anotherSiteInfoText}</p>
                        <div id='storyImage' className={`flex justify-content-aroung align-items-center`}>
                            <div className='flex flex-column justify-content-center align-items-center'>
                                <Image id='storyRelatedImage' src='/story-img.webp' alt='story-img' className='p-3'/>
                            </div>
                            <div className='flex flex-column justify-content-start p-3'>
                                <p id='storyTitle' className={`text-yellow-200 text-2xl`}>{data?.aboutSiteContent?.ourStoryHeading}</p>
                                <p id='storySubTitle' className='text-lg'>{data?.aboutSiteContent?.ourStorySubHeading}</p>
                                <p id='storyContext' className={`font-light text-lg`}>{data?.aboutSiteContent?.ourStoryContent}</p>
                            </div>
                        </div>
                        <div id='visionSectionContainer' className="flex justify-content-aroung align-items-center">
                            <div id='visionContentContainer' className='flex flex-column justify-content-end'>
                                <p id='visionTitle' className={`text-yellow-200 text-2xl`}>{data?.aboutSiteContent?.ourVisionHeading}</p>
                                <p id='visionSubTitle' className='text-lg'>{data?.aboutSiteContent?.ourVisionSubHeading}</p>
                                <p id='visionContext' className={`font-light text-lg`}>{data?.aboutSiteContent?.ourVisionContent}</p>
                            </div>
                            <div className='flex flex-column justify-content-center align-items-center'>
                                <Image id='visionRelatedImage' src='/vision-img.webp' alt='vision-img' className=''/>
                            </div>
                        </div>   
                    </div>
                    <Image id='rightSectionImage' src='/about-img.webp' alt='about-img' className={`${styles.dynamicImage}`}/>
                </div>
                
                <div id='footerSection' ref={contactUsRef}><Footer/></div>
            </div>
        </>
    )
}