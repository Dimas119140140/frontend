import React, { useEffect } from 'react';
import Layout from '../Layout';
import FormAddObat from '../../components/productlistcomp/formaddobat';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice';

const AddObat = () => {
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
        <FormAddObat />
    </Layout>
  );
};

export default AddObat;