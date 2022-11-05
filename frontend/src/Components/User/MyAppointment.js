import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyAppointment.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors,myGetAppointments } from "../../actions/GetAppointmentAction";
import { Link } from "react-router-dom";
import MetaData from "../../more/Metadata";
import LaunchIcon from "@material-ui/icons/Launch";
import Loading from "../../more/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAppointment = () => {
  const dispatch = useDispatch();

  const { loading, error, appointments } = useSelector((state) => state.myappointment);

  const { user } = useSelector((state) => state.user);
 
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myGetAppointments());
  }, [dispatch,error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loading />
      ) : (
        <div className="myOrdersPage">
         <div>
              {
                 appointments &&
                 appointments.forEach((item, index) => {
                  return (
                    <div>1234</div>
                  )
                 })
              }
         </div>
        </div>
      )}
      
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
    </Fragment>
  );
};

export default MyAppointment;