import React, { useEffect } from 'react';
import Layout from '../Layout';
import FormEditObat from '../../components/productlistcomp/formeditobat';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice';

const EditObat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(()=>{
      dispatch(getMe());
  }, [dispatch]);

  useEffect(()=>{
     if(isError){
        navigate("/");
     }
  }, [isError, navigate]);
  return (
    <Layout>
        <FormEditObat />
    </Layout>
  );
};


export default EditObat;