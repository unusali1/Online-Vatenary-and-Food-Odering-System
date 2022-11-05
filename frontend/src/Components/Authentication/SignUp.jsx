import React from 'react'
import { useNavigate } from 'react-router-dom'
import user from "../../Assets/icons/user.png"
import "./SignUp.css"
import Roll from 'react-reveal/Roll';




const SignUp = () => {

    const navigate= useNavigate();

  const handleSubmit=()=>{
     navigate("/registration")
  }
  return (
    <>
     <Roll button>
       <div className='signupCon'>
        <div>

        </div>
        <div className='usersignup'>
            <div>
                <img className='signimg' src={user} alt='not found' />
                <div>
                <button className='btn' onClick={handleSubmit}>User SignUp</button>
                </div>
            </div>

        </div>
         <div className='usersignup'>
           <div>
                <img className='signimg' src={user} alt='not found' />
                <div>
                <button className='btn'>Doctor SignUp</button>
                </div>
            </div>
         </div>
         <div>

         </div>
       </div>
       </Roll>
    </>
  )
}

export default SignUp