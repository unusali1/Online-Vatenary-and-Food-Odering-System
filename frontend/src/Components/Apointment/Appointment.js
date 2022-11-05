import React from "react";
import "./Appointment.css";
import { useSelector, useDispatch } from "react-redux";
import { addDoctorAppoin,removeDoctorFromAppoin } from "../../actions/AppointmentAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import AppointmentCard from "./AppointmentCard.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { doctorAppoin} = useSelector((state) => state.doctorCart);

  let Price = doctorAppoin.reduce(
    (acc, item) => item.price,
    0
  );

  let totalPrice = Price;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return toast.error("Product Stock Limited");
    }
    dispatch(addDoctorAppoin(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addDoctorAppoin(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeDoctorFromAppoin(id));
  };

  const checkoutHandler = () => {
    navigate("/animalinfo");
  };

  return (
    <>
      {doctorAppoin.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Appointment </Typography>
          <Link to="/doctors">View Doctors</Link>
        
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Doctor</p>
              <p className="apoinfee">Appointment Fee</p>
            </div>

            {doctorAppoin &&
              doctorAppoin.map((item) => (
                <div className="cartContainer" key={item.doctor}>
                  <AppointmentCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    
                  </div>
                  <p className="cartSubtotal">{`$${
                    item.price
                  }`}</p>
                </div>
              ))}

            
               <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
           
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        
        </>
      )}
    </>
  );
};

export default Appointment;