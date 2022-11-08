import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getGetAppointmentDetails, clearErrors } from "../../actions/GetAppointmentAction";
import Loading from "../../more/Loader";


const MyAppointmentDetails = () => {
  const { appointment, error, loading } = useSelector((state) => console.log(state));

  const dispatch = useDispatch();

  const {id} = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getGetAppointmentDetails(id));
  }, [dispatch,  error, id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Appointment Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
              appointment #{appointment && appointment._id}
              </Typography>
              <Typography>Animal Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{appointment.user && appointment.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {appointment.AnimalInfo && appointment.AnimalInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {appointment.AnimalInfo &&
                      `${appointment.AnimalInfo.address}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                 
                  <p style={{
                      color:"green"
                  }}>
                  PAID
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>$ {appointment.totalPrice && appointment.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              {/* <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div> */}
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Appointment Doctor:</Typography>
              <div className="orderDetailsCartItemsContainer">

                {appointment.getDoctor &&
                 appointment.getDoctor.map((item) => (
                    <div key={item.Offer}>
                      <img src={item.image} alt="Product" />
                     
                      <span>
                        ${item.price} ={" "}
                        <b>${item.price }</b>
                      </span>
                    </div>
                  ))}


              </div>
            </div>
          </div>
        </>
      )}
      
    </>
  );
};

export default MyAppointmentDetails;