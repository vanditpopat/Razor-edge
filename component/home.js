import styles from './css/home.module.css'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';

export default function Home({ data }){
    const header= data?.heroSectionContent?.header;
    const subheader = data?.heroSectionContent?.subHeader;
    
    // useState for using Dialog
    const [visible, setVisible] = useState(false);
    
    // useState for Email
    const [email, setEmail] = useState('');
    const toast = useRef(null);

    // For Loading Effect on Button
    const [loading, setLoading] = useState(false);
    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    // Validating Email and comparing Regex
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const getemailvalue = (e)=>{
        setEmail(e.target.value);
    }

    const Mailchimp = async () => {
        const result = validateEmail(email);
        if (result) {
          const formData = new FormData();
          formData.append('EMAIL', email);
          formData.append('b_b08d6dbad505ad420fd015fa5_d0b78b3b60', '');
      
          const mailchimpUrl = 'https://app.us21.list-manage.com/subscribe/post?u=b08d6dbad505ad420fd015fa5&id=d0b78b3b60&f_id=00d4e6e6f0';
      
          try {
            const response = await fetch(mailchimpUrl, {
              method: 'POST',
              body: formData,
              mode: 'no-cors', // keep this to avoid CORS issues
            });
            toast.current.show({severity:'success', summary: 'Success', detail: 'Subscribed to RE Succesfully', life: 3000});
            setEmail('')
          } catch (error) {
            toast.current.show({severity:'error', summary: 'Error', detail: 'Subscription failed. Try Again!', life: 3000});
          }
        } else {
          toast.current.show({severity:'error', summary: 'Error', detail: 'Invalid Email Provided', life: 3000});
        }
      };

      const handleButtonClick = () => {
        Mailchimp();
        load();
      }
    
    return (
        <>
            <div id='home' className={styles.backgroundFrame}>
                <video autoPlay muted loop id="backgroundVideo" className={`${styles.backgroundVideo}`}>
                        <source src="/salon.mp4" type="video/mp4" />
                </video>
                <Toast ref={toast} />
                <div className={`${"flex flex-column align-items-center justify-content-center h-screen"}`}>
                    <p id='heroTitleText' className={`${'text-center text-4xl xl:text-7xl sm:font-bold capitalize mt-0 mb-0'} ${styles.Herotext}`}>{header}</p>
                    <p id='heroSubTitleText' className={`${'text-center sm:text-base sm:font-bold mb-7'} ${styles.Herotext}`}>{subheader}</p>

                    <Button id='offerButton' className={`${styles.offerButton} ${'w-6 sm:w-2 h-3rem'}`} label="View Offers" onClick={() => setVisible(true)} />
                    
                    <Dialog visible={visible} onHide={() => setVisible(false) } className='p-0 w-full sm:w-6'
                        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                        <div id='bannerContainer' className="flex justify-content-around align-items-center w-full flex-wrap">
                            <div id='exclusiveOfferContent' className="flex align-items-center flex-column justify-content-center">
                                <div className="text-center text-black-alpha-80 p-2 mt-2 w-10rem border-round-3xl bg-yellow-200 w-6 font-bold">Exclusive Offer</div>
                                <p>💥 Valid Until January 1st! 💥</p>
                                <p className="text-center text-yellow-200 p-2 m-0 text-3xl">SAVE UP TO</p>
                                <div className='flex align-items-center justify-content-center'>
                                    <div id='20NumberText' className="text-center text-yellow-200 text-8xl">20</div>
                                    <div className='flex flex-column align-items-center justify-content-around'>
                                        <div id='PercentageText' className="text-center text-yellow-200 text-3xl">%</div>
                                        <div id='OffText' className="text-center text-yellow-200 text-3xl">OFF</div>
                                    </div>
                                </div>
                                <p className="text-center font-semibold">ON YOUR FIRST VISIT</p>
                            </div>
                            <div className={`${styles.offerBackground} flex flex-column align-items-center justify-content-center flex-auto h-auto`}>
                                <div id='offerBackgroundImg' className={`text-center m-1 border-round-md h-6 ${styles.offerText}`} />
                                <p id='offerSubscribeText' className='text-center text-yellow-200 text-2xl mt-5 z-1'>SUBSCRIBE TO OUR NEWSLETTER</p>
                                <div className='m-2 flex flex-column align-items-center justify-content-around h-6rem'>
                                    <InputText id='offerInputEmail' label="Email Address" value={email} placeholder='Enter your Email Address' onChange={getemailvalue} className={`${'z-1 text-black-alpha-80 w-full sm:w-20rem'}`} />
                                    <Button id='offerEmailSubmit' label='Submit' loading={loading} className='' onClick={handleButtonClick} />
                                </div>
                                <p id='likingOfferText' className={`text-center text-white font-medium text-lg mt-5 z-1 ${styles.offerText}`}>THE FIRST 100 CUSTOMERS WILL <br/>RECEIVE A COMPLIMENTARY BEARD TRIM!</p>                                        
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </>
    )
}