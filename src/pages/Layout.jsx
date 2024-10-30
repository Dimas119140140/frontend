import React from 'react';
import Sidebar from '../components/Sidebar';
import "../csspages/layoutpage.css";

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <div className="d-flex">
            <div className="col-auto">
                <Sidebar/>
            </div>
            <div className='kotakkonten vh-200 w-100'>
             <main className="content">{children}</main>
            </div>
        </div>
    </React.Fragment>   
  );
};


export default Layout;