import React, { useEffect } from 'react';
import Layout from '../Layout';
import KbList from '../../components/rmekb/rmkblist';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../features/authSlice';

const Kb = () => {
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
        <KbList />
    </Layout>
  );
};

export default Kb;