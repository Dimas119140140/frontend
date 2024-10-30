import React,{ useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { FaPlus } from "react-icons/fa";

const Userlist = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
    };

    const deleteUser = async (userId) =>{
        const confirmed = window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:5000/users/${userId}`);
                getUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

  return (
    <div className='p-2 m-2'>
        <h1 className='titlekb'>Data Pengguna</h1>

        <div className='field' style={{ textAlign: 'right' }}>
            <Link to="/datapengguna/add" >
            <Button size='sm' variant='primary' ><FaPlus className='logotambah'/> Tambah Data</Button>
            </Link>
        </div>

        <div className='card mt-3'>
        <div className='mt-3 p-2'>  
        <div className='content mb-3'>

        <Table striped style={{ width:'100%' }}>
            <thead>
                <tr>
                    <th className='header1'>No</th>
                    <th className='header1'>Nama</th>
                    <th className='header1'>Username</th>
                    <th className='header1'>Aksi</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={user.uuid}>
                    <td>{index + 1}.</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td style={{ textIndent:'-40px' }}>
                    <Link to={`/datapengguna/edit/${user.uuid}`}>
                        <Button size='sm' variant='warning' className='but1 custom-button'>Edit</Button>
                    </Link>
                        <Button onClick={()=> deleteUser(user.uuid)} size='sm' variant='danger' className='but2'>Delete</Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
        </div>
        </div>
        </div>
    </div>
  );
};

export default Userlist;