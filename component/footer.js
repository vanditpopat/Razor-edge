import styles from '../component/css/footer.module.css'
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function Footer({ data }){
    const [email, setEmail] = React.useState('');
    const subscribeTag= 'subscribe now for irresistible offers!';
    const watermarkTag= '© 2023 RAZOR EDGE Inc';
    const toast = React.useRef(null);


    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      };
    
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
            toast.current.show({severity:'success', summary: 'Success', detail: 'Subscription Successfully', life: 3000});
            setEmail('')
          } catch (error) {
            toast.current.show({severity:'error', summary: 'Error', detail: 'Subscription failed', life: 3000});
          }
        } else {
          toast.current.show({severity:'error', summary: 'Error', detail: 'Invalid email', life: 3000});
        }
      };      

    return(
        <div id='contact-us' className={`${'flex flex-column align-items-center justify-content-center p-4'} ${styles.bgColor}`}>
            <Toast ref={toast} />
            <p id='footerHeading' className={`${'text-center text-base sm:text-2xl text-black-alpha-90 uppercase mt-4 mb-4'}`}>{subscribeTag}</p>
            <div className='flex flex-row w-full justify-content-center mb-4'>
                <InputText id='footerInputEmailAdd' value={email}  placeholder="Email" onChange={getemailvalue} className={`${'w-7 sm:w-2 border-round-2xl text-white'} ${styles.inputarea}`}/>
                <Button id='footerSubmitBTN' label="Submit" className={`${'border-round-xl sm:border-round-2xl bg-black-alpha-90 text-white'} ${styles.button}`} onClick={Mailchimp}/>
            </div> 
            <div className="flex flex-row w-7 justify-content-around sm:w-3 mb-4">
				<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
					<i id='footerSMIconTwitter' className={`${"pi pi-twitter "} ${styles.icons}`}></i>
				</a>
				<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
					<i id='footerSMIconFacebbok' className={`${"pi pi-facebook"} ${styles.icons}`}></i>
				</a>
				<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
					<i id='footerSMIconInstagram' className={`${"pi pi-instagram"} ${styles.icons}`}></i>
				</a>
				<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
    				<i id='footerSMIconWhatsApp' className={`${"pi pi-whatsapp"} ${styles.icons}`}></i>
  				</a>
				
            </div>         
            <p id='RECopywriteText' className='text-center m-0'>{watermarkTag}</p>
        </div>
    )
}