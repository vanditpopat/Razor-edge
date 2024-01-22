import Nav from '@/component/nav';
import Home from '@/component/home';
import Footer from '@/component/footer';
import styles from '@/styles/utils.module.css'
import Main from '@/component/service';
import MyCarousel from '@/component/carousel';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { getDataInObject } from '../lib/markdownReader';

export async function getStaticProps() {
  const markdownData = getDataInObject("./dynamic-content");

  return {
    props: {
      data: markdownData,
    },
  };
}

export default function Salon({ data }) {
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

  return(
    <>
    <div className='overflow-x-hidden'>
      <div id='videoBGContainer' className={styles.backgroundFrame}>
        <Nav id='navbar' onMenuClick={onMenuClick}/>
        <div id='heroSection' ref={homeRef}><Home data={data} /></div>
      </div>
      <MyCarousel id='brandSliderSection'/>
        <div id='serviceSection' ref={servicesRef}><Main data={data}/></div>
        <div id='footerSection' ref={contactUsRef}><Footer data={data}/></div>
    </div>
    </>
  )
}