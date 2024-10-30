import React,{ useEffect } from 'react';
import Layout from '../Layout';
import FormEditKb from '../../components/rmekb/formeditkb';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice';

const EditKb = () => {
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
      <FormEditKb />
    </Layout>
  );
};

export default EditKb;