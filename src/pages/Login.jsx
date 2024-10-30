import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset} from "../features/authSlice";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import "../csspages/loginpage.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { user, isError, isSuccess, isLoading, message } = useSelector(
      (state) => state.auth
    );
    
    useEffect(() => {
      if (user || isSuccess) {
        navigate("/dashboard");
      } else if (isError) {
        setErrorMessage(message);
      }
      dispatch(reset());
    }, [user, isSuccess, isError, message, dispatch, navigate]);

    const Auth = (e) => {
      e.preventDefault();
      dispatch(LoginUser({ email, password }));
    };

  return (
    <div className='backg'>
        <div className='wrapper'>
          <form onSubmit={Auth}   >
            <h1>BPM BERKAH SRI ASIH </h1>
            <div className='login-box'>
                <h1>Login</h1>
                <div>
                {errorMessage && <p className='pesanerror'>{errorMessage}</p>}
                </div>  
                <div className='inputlogin-box'>              {/*Tempat menaruh email*/}
                  <input 
                    type="text" 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                <FaUser className='iconlogin' />
                </div>
                <div className='inputlogin-box'>              {/*Tempat menaruh password*/}
                  <input 
                    type="password" 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                <MdLock className='iconlogin'/>
                </div>
                <div>
                <button 
                  type='submit'>
                  {isLoading ? "Loading..." : "Login"}
                </button>
                </div>
           </div>
         </form>
        </div>
    </div>
  )
};

export default Login;