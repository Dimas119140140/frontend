import React, { useEffect } from 'react';
import Layout from '../Layout';
import Productlist from '../../components/productlistcomp/productlist';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice'; 

const Products = () => {
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
    <div>
        <Layout>
            <Productlist />
        </Layout>
    </div>
  );
};

export default Products;