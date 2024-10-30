import React,{ useEffect } from 'react';
import Layout from '../Layout';
import FormViewKehamilan from '../../components/rmekehamilan/formviewkehamilan';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice';

const ViewKehamilan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(()=>{
      dispatch(getMe());
  }, [dispatch]);

  useEffect(()=>{
    if (isError){
       navigate("/");
    }
 }, [isError, navigate]);
  return (
    <Layout>
      <FormViewKehamilan />
    </Layout>
  );
};

export default ViewKehamilan;