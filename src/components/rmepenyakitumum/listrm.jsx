import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams, Link} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../rmepenyakitumum/formaddumum.css';

const ListRiwayat = () => {
   const [data, setData] = useState([]);
   const [msg,setMsg] = useState("");
   const navigate = useNavigate;
   const { id } = useParams();

   useEffect(() => {
    const getAllByRm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rmeumum/list/${id}`);
        console.log("API Responses:", response.data);
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          setData (response.data); // Get the first object in the array
        } else {
          setMsg("Data Tidak Ditemukan");
        }
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg); 
        }
      }
    };
    getAllByRm();
  }, [id]); 
      
    return (
        <div className='p-2 m-2'>
        <h2 className='titleForm' style={{fontWeight:'bold'}}>LIST RM</h2>
        <div className='card'>
            <div className='card-content p-2'>  
                <div className='content'>
                <Table striped style={{ width: '100%' }}>
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th className='header1'>id</th>
                        <th className='header1'>Nama Pasien</th>
                        <th className='header1'>Tanggal Pelayanan</th>
                        <th className='header1'>Umur</th>
                        <th className='header1'>Alamat</th>
                        <th className='header1'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => 
                        <tr key={item.id} style={{ textAlign: 'center' }}>
                        <td>{item.id} </td>
                        <td>{item.name}</td>
                        <td>{item.tanggalPelayanan}</td>
                        <td>{item.umur}</td>
                        <td>{item.alamat}</td>
                        <td>
                            <Link to={`/rmepenyakitumum/edit/list/${item.nomorRmUmum}/${item.id}`}>
                            <Button size='sm' variant='warning' className='but1 custom-button'>Edit</Button>
                            </Link>
                        </td>
                    </tr>                  
                    )}

                </tbody>
            </Table>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ListRiwayat;