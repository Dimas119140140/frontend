import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/bidan-delima-logo.png";
import '../components/sidebar.css';
import { FaHouse, FaFileMedical, FaCapsules } from "react-icons/fa6"; 
import { FaSignOutAlt } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset} from "../features/authSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

const logout = () =>{
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
};

  return (
  <aside className="sidebar d-flex flex-column justify-content-between p-4 vh-100">
    <div>
      <div className="kotak">
      <img className="bg-white  pb-1 rounded-image" src= {logo} width="66" height="62" alt="logo"/>
      <h6 className="namalog">BPM BERKAH SRI ASIH</h6>
      </div>
      
        <ul className="nav nav-pills flex-column p-0">
            <li className="nav-item p-1 pt-1 mt-3">
              <NavLink className="fs-6" to={"/dashboard"}><FaHouse className="logodes" /> Dashboard</NavLink>
            </li>
            <li className="nav-item p-1 pt-1 mt-2">
              <NavLink className="fs-6 " to={"/rmepenyakitumum"}> <FaFileMedical className="logodes" /> RME Penyakit Umum</NavLink>
            </li>
            <li className="nav-item p-1 pt-1 mt-2">
              <NavLink className="fs-6" to={"/rmekb"}><FaFileMedical className="logodes"/> RME KB</NavLink>
            </li>
            <li className="nav-item p-1 pt-1 mt-2">
              <NavLink className="fs-6" to={"/rmekehamilan"}><FaFileMedical className="logodes" /> RME Kehamilan</NavLink>
            </li>
            <li className="nav-item p-1 pt-1 mt-2">
              <NavLink className="fs-6" to={"/products"}><FaCapsules className="logodes" /> Data Obat</NavLink>
            </li>
            {user && user.role === "admin" && (
              <div>
                <li className="nav-item p-1 pt-1 mt-2">
                <NavLink className="fs-6" to={"/datapengguna"}><IoPersonAdd className="logodes"/> Data Pengguna</NavLink>
                </li>
              </div>
            )}
            <hr className="custom-hr"></hr>

            <li className="p-1 pt-1 mt-2">
              <button onClick={logout} className="tombol">
              <FaSignOutAlt className="logodes" /> Logout
              </button>
            </li>
          </ul>
    </div> 
   </aside>      
  );
};

export default Sidebar;
