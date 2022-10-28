import React, {useState} from 'react';
import { styles } from '../constants';
import { CreditCard } from '../assets';

const Payments = () => {
    const [getStarted, setGetStarted] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const [formData, setFormData] = useState({
        paymentMethod: "",
        paymentInstruction: ""
    });

    function handleChange(event)  {
        const { name, value} = event.target;

        setFormData((prev) => {
            return {...prev, [name]: value}
        });
    }

    return (
        <div className='py-5'>
            <div className={getStarted ? " px-3" : "hidden"}>
                <img src={CreditCard} alt="" className='mx-auto lg:w-1/3 w-1/2'/>
                <p className='text-base text-black text-center'>Ensure your customers can make payments online.</p>
                <p className='text-sm opacity-50 text-center'>
                    Add payment methods to your website to enable customers make payment online.
                </p>
                <p className={`${styles.button} text-center lg:w-1/3 w-1/2 mt-5 mx-auto`} onClick={() => setGetStarted(prev => prev = !prev)}>
                    Add payment method
                </p>
            </div>

            <div className={getStarted ? "hidden" : 'py-4 px-4 w-full'}>
                <p className='text-sm opacity-50'>Select and manage payments methods to be used by your customers. This can be changed at any point. </p>
                
                <form action="" className='px-3' onSubmit={handleSubmit}>
                    <div className='mb-8'>
                        <h3 className='text-lg text-black font-semibold mt-6 mb-5'>Payment method</h3>
                        <label htmlFor="paymentMethod" className='block mb-2'>Select a payment method.</label>
                        <select name="paymentMethod" onChange={handleChange} id="paymentMethod" value={formData.paymentMethod} className={`${styles.inputBox} lg:w-1/2 w-full px-4`}>
                            <option>Pay online</option>
                        </select>
                    </div>

                    <div>
                        <h3 className='text-lg text-black font-semibold mt-6 mb-5'>Payment Instruction</h3>
                        <label htmlFor="paymentMethod" className='block mb-2'>Add payment instructions for your customers to see on the checkout.</label>
                        <textarea
                            placeholder="Type instructions here..."
                            className="border border-slate-400 rounded w-full px-3 py-3 h-40 resize-none placeholder-slate-300"
                            name="paymentInstruction"
                            onChange={handleChange}
                            value={formData.paymentInstruction}
                        />
                    </div>

                    <div className='flex justify-end w-full mt-6'>
                        <input type="submit" className={`${styles.button}`} value="Save" />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Payments;