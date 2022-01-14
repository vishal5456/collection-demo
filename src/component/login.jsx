import React from 'react';
import "../style/login.css";       
import { signInWithPhoneNumber,RecaptchaVerifier } from "firebase/auth";
import {auth} from "../firebase"


export default function Login() {

    
   
    const configureCaptcha = () => {
        console.log("configurecaptcha working");

    
        window.recaptchaVerifier = new RecaptchaVerifier(
          "sign-in-button",
          {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              handleClick();
              console.log("Recaptcha verified");
            },
          },
          auth
        );
      };
      
    const handleClick = async ()=>{
        configureCaptcha();

    
    const appVerifier = window.recaptchaVerifier;

    console.log("appVerifier", appVerifier);

        const phoneNumber = "+918231811154";

       try{ 
        const result = await signInWithPhoneNumber(auth,phoneNumber,appVerifier)
            console.log(result);
            const code = window.prompt("Enter the otp","");
           const user = await result.confirm(code);

           console.log(user);
       
       }catch (error){
            console.log(error);
       }
       
    }
    return (
            <div className='cardContainer'>
                <div className='cardBody'>
                    <form>
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" className="form-control"   placeholder="Enter name" />
                           
                        </div>
                        <div className="form-group">
                            <label >Age</label>
                            <input type="text" className="form-control"  placeholder="Enter Age"/>
                        </div>
                        <div className="form-group">
                            <label >Gender</label>
                            <select className="form-control" >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Mobile No</label>
                            <input type="text" className="form-control"  placeholder="Enter Mobile No"/>
                        </div>
                        
                        <button type="button" className="btn btn-primary" id ="sign-in-button" onClick={handleClick}>Login</button>
                    </form>
                </div>
            </div> 
    )
}
