import React,{ useEffect } from 'react';
import Layout from '../Layout';
import FormViewKb from '../../components/rmekb/formviewkb';
//import FormEditKb from '../../components/rmekb/formeditkb';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice';

const ViewKb = () => {
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
      <FormViewKb/>
    </Layout>
  );
};

export default ViewKb;