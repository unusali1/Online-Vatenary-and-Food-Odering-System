import React from "react";
import { useSelector } from "react-redux";
import CheckoutAppointment from "./CheckoutAppoinment.js"; 
import MetaData from "../../more/Metadata";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./ConfirmAppoint.css"



const ConfirmAppointment = () => {
    const navigate = useNavigate();
    const {AimalInfo, doctorAppoin } = useSelector((state) => state.doctorCart);

    const { user } = useSelector((state) => state.user);
    
    let productPrice =  doctorAppoin.reduce(
      (acc, item) => item.price,
      0
    );

    const subtotal = productPrice 
      // eslint-disable-next-line
    const shippingCharges = productPrice > 99 ? 0 : 50;
    
    const totalPrice =  productPrice;
  
    const address = `${AimalInfo.address}`;
  
    const proceedToPayment = () => {
      const data = {
        subtotal,
        shippingCharges,
        totalPrice,
      };
  
      sessionStorage.setItem("appointmentInfo", JSON.stringify(data));
  
      navigate("/process/appointment/payment");
    };
  
    return (
      <>
        <MetaData title="Confirm Appointment" />
        <CheckoutAppointment activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography>Information</Typography>
              <div className="confirmshippingAreaBox">
                
                <div>
                  <p>User Name:</p>
                  <span >{user.name}</span>
                </div>
                <div>
                  <p>Animal Name:</p>
                  <span>{AimalInfo.animal}</span>
                </div>
                <div>
                  <p>Animal Problem:</p>
                  <span>{AimalInfo.problem}</span>
                </div>
                <div>
                  <p>Animal Age:</p>
                  <span>{AimalInfo.age}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{AimalInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Your Doctor:</Typography>


              {doctorAppoin.length === 0 ? 
                <div className="confirmCartItemsContainer">
                   ""
                 </div>
                  :
             <div className="confirmCartItemsContainer">
             {doctorAppoin.map((item) => (
               <div key={item.doctor}>
                 <img src={item.image} alt="Doctor" />
                 <Link to={`/doctor/${item.doctor}`}>
                   {item.name}
                 </Link>{" "}
                 <span>
                    <p>Fee = ${item.price} </p>
                   
                  
                 </span>
               </div>
             ))
              }
           </div>
          }
     
            </div>
          </div>
          {/*  */}
          <div>
            <div className="orderSummary">
              <Typography>Appointment Fee</Typography>
              <div>
                <div>
                  <p>Fee :</p>
                  <span>${subtotal}</span>
                </div>
                {/* <div>
                  <p>Shipping Charges:</p>
                  <span>${shippingCharges}</span>
                </div> */}
                <div>
                </div>
              </div>
  
              <div className="orderSummaryTotal">
                <p>
                  <b>Total Fee :</b>
                </p>
                <span>${totalPrice}</span>
              </div>
                  
              <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
       
      </>
    );
  };
  
  export default ConfirmAppointment;