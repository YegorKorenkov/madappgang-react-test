import React, { useState } from 'react';

const EmailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Form = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isValidEmail, setValidEmail] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');


    const submitRequest = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3030/send", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name, email, phone, message})
        });

        const resultData = await response.json();
        if (resultData.status === "success") {
            alert("Message Sent");
            resetForm();
        } else if (resultData.status === "fail") {
            alert("Message failed to send");
        }
    }

    const validateEmailHandler = (email) => {
        setEmail(email);
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            setEmailErrorMessage('Incorrect email');
            setValidEmail(false)
            return;
        }
        setValidEmail(true);
        setEmailErrorMessage('');
    }

    const validateEmail = (email) => {
        return EmailRegEx.test(email.toLowerCase());
    }

    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setMessage('')
    }

    
    return (
        <div className="get-in-touch__wrapper">
            <div className="get-in-touch">
                <div className="get-in-touch__content">
                    <div className="get-in-touch__head">

                        <h2 className="get-in-touch__title">Get in touch</h2>
                        <h3 className="get-in-touch__subtitle">Let us know <br />how we can help</h3>
                    </div>

                    <div className="get-in-touch__main">
                        <div className="get-in-touch__form">
                            <div className="contact-form">
                                <form onSubmit={submitRequest} className="contact-form__form">
                                
                                    <input 
                                        className="contact-form__input"
                                        type="text" 
                                        name="name" 
                                        value={name} 
                                        placeholder="Name"
                                        required
                                        onChange={e => setName(e.target.value)}
                                    />

                                    { emailErrorMessage && <div>{emailErrorMessage}</div>}                                       
                                    <input 
                                        className="contact-form__input"
                                        type="email" 
                                        name="email" 
                                        value={email} 
                                        placeholder="E-mail" 
                                        required
                                        onChange={e => validateEmailHandler(e.target.value)}
                                    />
                                    <input 
                                        className="contact-form__input"
                                        type="text" 
                                        name="phone" 
                                        value={phone} 
                                        placeholder="Phone number" 
                                        onChange={e => setPhone(e.target.value)}
                                    /> 
                                    <textarea 
                                        className="contact-form__input"
                                        name="message" 
                                        value={message} 
                                        placeholder="Message" 
                                        onChange={e => setMessage(e.target.value)}
                                    />
                        
                                    <button 
                                        type="submit" 
                                        className="contact-form__button"
                                        disabled={!isValidEmail}
                                    >Send</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );


}

export default Form;