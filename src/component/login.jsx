import React, { useState } from "react";
import styles from "../style/login.module.scss";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from "../component/loader"
import Dropdown from "../component/dropdown.jsx"


export default function Index(props) {
  const history = useHistory();

  const initialState = {};

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userResponse, setUserResponse] = useState({});
  const [state, setState] = useState(initialState);
  const [dropdown,setDropdown] = useState(false);
  const [errorState,setErrorState] = useState(initialState);
  const [errorOtp,setErrorOtp] = useState(false);
  const [loading,setLoding] = React.useState(false);

  

  const configureCaptcha = () => {
    console.log("configurecaptcha working");

    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handleClick();

        },
      },
      auth
    );
  };

  const handleClick = async () => {
    if(validation()){
      setLoding(true);
    configureCaptcha();

    const appVerifier = window.recaptchaVerifier;

    const phoneNumber = `+91${state.number}`;
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      setOtpSent(true);

      setUserResponse(result);
      setLoding(false);
    } catch (error) {
      console.log(error);
    }
  }else{
    console.log('valoidation error');
  }
  };


  const handleSubmit = async () => {
    if(validateOtp()){
      setLoding(true);
    const code = otp;
    try {
      const user = await userResponse.confirm(code);

      if (user.user.phoneNumber == `+91${state.number}`) {
        history.push("/");
        localStorage.setItem("credential", JSON.stringify(state));
        setState(initialState);
        setLoding(false);
      }
    } catch (error) {
      console.log(error);
      setLoding(false);
      setOtp("");
      setErrorOtp(true);
    }
  }else{
    setLoding(false);
  }
  };


  const handleChange = (e) => {
    let reall = errorState;
    delete reall[e.target.name];
    setErrorState({...initialState,...reall});
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const gotDropdownValue = (value,parent)=>{
        setState({...state,[parent]:value})
  }


  const validation = ()=>{
    let error = {
      "name":true,
      "age":true,
      "gender":true,
      "number":true

    };
    
    let validated = false;
      if(state){
        if(state.name){
          error.name = false
        }if(state.gender){
          error.gender = false
        }if(state.age && state.age.length<=3){
          error.age = false
        }if(state.number && state.number.length==10){
          error.number = false
        }
      setErrorState({...error});
    }
      if(!(error.name || error.age || error.gender || error.number)){
          validated = true;
      }
      return validated ;
  }

const validateOtp = ()=>{
  let otpValidate = false;
  if(otp && otp.length==6){
    otpValidate = true 
  }
  setErrorOtp(!otpValidate)
  return otpValidate;
}

  return (
    <div className={styles.cardContainer}>
     
      <div className={styles.cardBody}>
      { !otpSent ?
        <div className={styles.header}>
          Get Starded With Free Account
        </div>
        :
        <div className={styles.header}>
          Enter 6 Digit OTP
        </div>
        }
        { !otpSent ?
        <form>
          <div className={`${styles.formGroup} form-group`}>
            <label>Name</label>
            <input
              type="text"
              autoComplete="off"
              className={errorState["name"] ? `${styles.error} form-control` :"form-control"}
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
              value={state.name ? state.name : ""}
            />
          </div>
          <div className={`${styles.formGroup} form-group`}>
            <label>Age</label>
            <input
              type="text"
              autoComplete="off"
              className={errorState["age"] ? `${styles.error} form-control` :"form-control"}
              name="age"
              placeholder="Enter Age"
              onChange={handleChange}
              value={state.age ? state.age : ""}

            />
          </div>
          <div className={`${styles.formGroup} form-group`}>
            <label>Gender</label>
            <div className={errorState["gender"] ? `${styles.error} ${styles.dropdown}` :styles.dropdown} onClick={()=>setDropdown(!dropdown)}>
              <div className={styles.left}>{state["gender"] ? state.gender : "Select Gender"}</div>
              <div className={styles.right}>
              <FontAwesomeIcon icon="caret-down"/>
              </div>
            </div>
            {
              dropdown ?
              <Dropdown
              values={["Male","Female"]}
              dropdownParent={"gender"}
              getDropdownValue={gotDropdownValue}
              setDropdown = {setDropdown}
              />
              :null
            }
          </div>
          <div className={`${styles.formGroup} form-group`}>
            <label>Mobile No</label>
            <input
              type="text"
              autoComplete="off"
              className={errorState["number"] ? `${styles.error} form-control` :"form-control"}
              name="number"
              placeholder="Enter Mobile No"
              onChange={handleChange}
              value={state.number ? state.number : ""}

            />
          </div>
          <div className={styles.btn}>
              <button
                type="button"
                className="btn btn-primary"
                id="sign-in-button"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
          </form>
            :
            <form>
            <div className={`${styles.formGroup} form-group`}>
              <label> OTP</label>
              <input
                type="text"
                autoComplete="off"
                className={errorOtp ? `${styles.error} form-control` : "form-control"}
                placeholder="Enter OTP"
                onChange={(e) => {setOtp(e.target.value); setErrorOtp(false)}}
                value={otp ? otp : ""}

              />
            </div>
         
            <div className={styles.btn}>
              <button
                type="button"
                className="btn btn-primary"
                id="sign-in-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
          }
          
      </div>
      {
        loading ?
         <Loader />
        :null
      }
    </div>
  );
}