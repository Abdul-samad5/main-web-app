import React from 'react'
import {styles} from '../constants/index';
import { facebook, instagram } from '../assets';

const WebsiteSettings = () => {
    const [websiteSettings, setWebsiteSettings] = React.useState({
        storeURL: "",
        facebookUsername: "",
        instagramUsername: ""
    });

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleChange(event) {
        setWebsiteSettings((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });
    }

    return (
        <>
            <p className={`${styles.componentHeader}`}>Store Settings</p>
            <div className='overflow-hidden w-full shadow-2xl'>
                <form className='rounded shadow-2xl w-full px-4 py-4 h-auto' onSubmit={handleSubmit}>
                    <p className='text-sm text-brand-primary'>Website settings</p>

                    <div className='my-8'>
                        <p>Store URL</p>
                        <input 
                            type="text" 
                            className={`${styles.inputBox} w-full mt-1 px-3`}
                            onChange={handleChange}
                            value={websiteSettings.storeURL}
                            name="storeURL"/>
                    </div>

                    <div className='my-8'>
                        <p>Facebook username</p>
                        <input 
                            type="text" 
                            className={`${styles.inputBox} w-full mt-1 pl-10 pr-3`}
                            onChange={handleChange}
                            value={websiteSettings.facebookUsername}
                            name="facebookUsername"/>
                        <img 
                            src={facebook} 
                            alt="" 
                            className='relative w-4 h-4 bottom-8 left-3'/>
                    </div>

                    <div className='my-8'>
                        <p>Instagram username</p>
                        <input 
                            type="text" 
                            className={`${styles.inputBox} w-full mt-1 pl-10 pr-3`}
                            onChange={handleChange}
                            value={websiteSettings.instagramUsername}
                            name="instagramUsername"/>
                        <img 
                            src={instagram} 
                            alt="" 
                            className='relative w-4 h-4 bottom-8 left-3'/>
                    </div>

                    <div className='w-full flex justify-end'>
                        <input type="submit" className={`${styles.button}`} value="Save" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default WebsiteSettings;