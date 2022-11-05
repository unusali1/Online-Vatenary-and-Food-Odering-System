import React, { useState } from "react";
import "./Animalinfo.css";
import { useSelector, useDispatch } from "react-redux";
import CheckoutAppointment from "./CheckoutAppoinment.js";
import MetaData from "../../more/Metadata";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import { saveAnimalInfo } from "../../actions/AppointmentAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Animalinfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const { AimalInfo } = useSelector((state) => state.doctorCart);

  const [address, setAddress] = useState(AimalInfo.address);
  // eslint-disable-next-line
  const [animal, setAnimal] = useState(AimalInfo.animal);
  const [problem, setProblem] = useState(AimalInfo.problem);
  const [age, setAge] = useState(AimalInfo.age);
  const [date, setDate] = useState(AimalInfo.date);
  const [time, setTime] = useState(AimalInfo.time);
  // eslint-disable-next-line
  const [phoneNo, setPhoneNo] = useState(AimalInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      toast.error("Phone Number should be 11digits");
      return;
    }
    dispatch(saveAnimalInfo({ address,animal,problem,age,date,time, phoneNo }));
    navigate("/appointment/confirm");
  };

  return (
    <>
      <MetaData title="Animal Details" />

      <CheckoutAppointment activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBoxx">
          <h2 className="shippingHeading">Animal Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Animal Name"
                required
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
              />
            </div>

            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Animal Problem"
                required
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>

            <div>
              <HomeIcon />
              <input
                type="number"
                placeholder="Animal Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <HomeIcon />
              <input
                type="date"
                placeholder="Appointment Date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <HomeIcon />
              <input
                type="time"
                placeholder="Appointment Time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
             
            />
          </form>
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
  );
};

export default Animalinfo;