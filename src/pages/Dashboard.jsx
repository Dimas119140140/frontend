import React, {useEffect} from "react";
import Layout from "./Layout";
import Home from "../components/dashboardcomp/home.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice.js";

const Dashboard = () => {
  const dispatch = useDispatch();                       //awal kode untuk proteksi
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(()=>{
      dispatch(getMe());
  }, [dispatch]);

  useEffect(()=>{
     if(isError){
        navigate("/");                                  //akhir kode untuk proteksi
     }
  }, [isError, navigate]);

  return ( 
    <Layout>
        <Home/>
    </Layout>

  );
};

export default Dashboard;