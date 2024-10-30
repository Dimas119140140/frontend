import React, { useEffect } from 'react';
import Layout from '../Layout';
import FormAddKehamilan from '../../components/rmekehamilan/formaddkehamilan';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice';

const AddKehamilan = () => {
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
      <FormAddKehamilan />
    </Layout>
  );
};

export default AddKehamilan;