import React,{ useEffect } from 'react';
import Layout from '../Layout';
import FormViewUmum from '../../components/rmepenyakitumum/formviewumum';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice';

const ViewUmum = () => {
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
      <FormViewUmum/>
    </Layout>
  );
};

export default ViewUmum;