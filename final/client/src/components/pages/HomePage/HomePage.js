////////////////////
// Imports
////////////////////

import React from "react";
import {useState} from "react";
import "./HomePage.css";
import Button from "../../Button/Button";
import NavBar from "../../NavBar/NavBar";
import {apiURL} from "../../../util/constants.js";

////////////////////
// Components
////////////////////

// show register png
function Registered() {
    return (
        <div className="success-container flex-wrapper flex-row flex-center">
            <img className="success-mark" src="success.png" />
            <p className="success-text">Registered!</p>
        </div>
    )
}

//  form 
function RegisterForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [registered, setRegistered] = useState(false);
    const [errors, setErrors] = useState([]);
    const errorObjects = errors.map((err, i) => <p className="error-msg" key={`registerError${i}`}>{err}</p>)

    function handleNumberInput(event) {
        setPhoneNumber(event.target.value);
    }

    function handleZipInput(event) {
        setZipCode(event.target.value);
    }

    async function handleSubmit() {
        // Check for errors
        if (phoneNumber.length < 10) {
            const extendedErrors = errors.concat(["Phone numbers have at least 10 digits."]);
            console.log(extendedErrors);
            setErrors(extendedErrors);
            return;
        }
        setErrors([])

        // Send request
        const formData = new FormData();
        formData.append("phone", phoneNumber);
        formData.append("zip", zipCode);

        const address = `${apiURL}/register`;
        const response = await fetch(
            address,
            {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
                body: formData
            },
        );
        const result = await response.json();
        if (!response.ok) {
            setErrors(result.errors);
            return;
        }
        setRegistered(true);
    }

    return (
        <div className="register-form-container flex-wrapper flex-column flex-center">
            <p className="intro-title">A sanctuary for the meow-velous!</p>
            <p className="intro-subtitle">Hi! Welcome to The Cat's Whiskers! We are a non-profit cat sanctuary dedicated to providing a safe and loving home for cats in need. Our mission is to rescue abandoned, stray, and homeless cats, and provide them with the medical care, attention, and love they deserve.
            Our sanctuary is staffed by a team of dedicated volunteers who work tirelessly to ensure the cats are happy and healthy. We provide comfortable living arrangements for our feline residents, including plenty of toys, scratching posts, and cozy beds.
            At Whiskers, we believe that every cat deserves a second chance. We work hard to find loving forever homes for our cats, and we provide ongoing support to ensure a successful adoption.</p>
            <p className="intro-subtitle">If you're interested in adopting a cat, we invite you to visit our sanctuary and meet our furry residents. We have cats of all ages and personalities, and we're confident you'll find your purrfect match.
            We rely on the support of our community to continue our important work and we appreciate any support you can give. </p>
            <p className="intro-subtitle">If you're interested in helping, please register for our letters via text!</p>
            <p className="intro-subtitle">Thank you for visiting Whiskers. We hope to see you soon!</p>
            
            {/* Only display form if not registered */}
            {!registered ? (
                <>
                    <input className="number-input" type="tel" placeholder="XXX-XXX-XXXX" maxLength="12" onChange={handleNumberInput}></input>
                    <input className="number-input" type="tel" placeholder="Zip Code" onChange={handleZipInput}></input>

                    {/* Display errors */}
                    {errors.length !== 0 ?
                        <div className="register-errors-container">
                            ⚠️ Errors:
                            {errorObjects}
                        </div>
                    : null
                    }
                    <Button id="textme" className="btn-medium btn-red" onClick={handleSubmit}>Text Me!</Button>
                </>
            )
            : <Registered />
            }
        </div>
    );
}


export default function HomePage() {
    return (
        <div>
            <NavBar />
            <div className="big-container flex-wrapper flex-column flex-center">
                <div className="little-container flex-wrapper">
                    <img className="cat-img" src="CatInvite.png" alt="cat" />
                    <RegisterForm />
                    <img className="kitty-img" src="catRound.png" alt="kitty" />
                </div>
            </div>
        </div>
    );
};
