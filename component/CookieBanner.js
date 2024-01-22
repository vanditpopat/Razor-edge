import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';
import styles from './css/cookiebanner.module.css';

export default function CookieBanner({ data }){
    const [loading, setLoading] = useState(false);
    const [cookieConsent, setCookieConsent] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect (() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null)

        setCookieConsent(storedCookieConsent)
    }, [setCookieConsent])

        useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        window.gtag("consent", 'update', {
            'analytics_storage': newValue
        });

        setLocalStorage("cookie_consent", cookieConsent)

        //For Testing
        console.log("Cookie Consent: ", cookieConsent)

    }, [cookieConsent]);

    return (
        // Restructuring Cookie Banner and its Content as per Team Suggestions
        <div id='mainDivCookieBanner' className={`${`${cookieConsent ? "hidden" : "flex"} justify-content-center align-items-center bg-black-alpha-90 opacity-80 flex-column w-full fixed left-0 right-0`}  ${styles.CBContainer}`}>
            <p id='CBContent'>This site uses cookies to measure and improve your performance.</p>
            <div className='flex flex-column sm:flex-row justify-content-between w-4 '>
                <div className={'flex flex-row flex-wrap'}>
                    <Button className={` ${styles.CBLeftButton} flex align-items-center justify-content-center font-bold bg-black-alpha-90 text-white border-white border-round-2xl m-1 sm:m-2`} id='CB_decline_button1' label="Opt-Out" icon="" onClick={() => setCookieConsent(false)} />
                    <Button className={` ${styles.CBLeftButton} flex align-items-center justify-content-center font-bold bg-black-alpha-90 text-white border-white border-round-2xl m-1 sm:m-2`} id='CB_detail_button2' label="Details" icon="pi pi-external-link" onClick={() => setVisible(true)}/>
                </div>
                        
                <div>
                    <Dialog id='policyBanner' header="COOKIE PREFERENCES" visible={visible} onHide={() => setVisible(false)}
                        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                        <p className="m-0">
                            <br/>
                            <strong>1. Introduction</strong> 
                            <br/>
                            Welcome to Razors Edge Salon! By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website. <br/>
                            <br/>
                            <strong>2. Use of the Website</strong>
                            <br/>
                            The content of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense. <br/>
                            <br/>
                        </p>
                    </Dialog>
                    <Button className={`flex align-items-center justify-content-center font-bold border-round-2xl m-1  sm:m-2`} id='CB_accept_button3' label="Accept" loading={loading} onClick={() => setCookieConsent(true)} />
                </div>
            </div>
        </div>
    )}