import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const FormEditObat = () => {
    const [name, setName] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [satuan, setSatuan] = useState("");
    const [tglmasuk, setTglmasuk] = useState("");
    const [tglkadaluwarsa, setTglkadaluwarsa] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
      const getObatById = async () =>{
        try {
          const response = await axios.get(`http://localhost:5000/obat/${id}`);
          setName(response.data.name);
          setJumlah(response.data.jumlah);
          setSatuan(response.data.satuan);
          setTglmasuk(response.data.tanggalMasuk);
          setTglkadaluwarsa(response.data.tanggalKadaluwarsa);
        } catch (error) {
          if(error.response) {
            setMsg(error.response.data.msg); 
          }
        }
      }
      getObatById();
    },[id]);

    const updateObat =  async(e) => {
      e.preventDefault();

      const confirmed = window.confirm("Apakah Anda yakin ingin mengupdate data obat ini?");
      if (confirmed) {
        try {
          await axios.patch(`http://localhost:5000/obat/${id}`, {
              name: name,
              jumlah: jumlah,
              satuan: satuan,
              tanggalMasuk: tglmasuk,
              tanggalKadaluwarsa:tglkadaluwarsa
          });
          navigate("/products");
        } catch (error) {
            if(error.response) {
              setMsg(error.response.data.msg); 
            }
        }
     }
    };
  return (
    <div className='p-2 m-2'>
        <h1 className='titleForm mt-2 mb-3'>Edit Data Obat</h1>
        <div className='card'>
            <div className='card-content p-4'>
                <div className='content'>
                <Form onSubmit = {updateObat}>
                        <Row className="mb-3">
                        <p>ID Obat: {id}</p>
                        <p className='has-text-centered'>{msg}</p>
                         <Form.Group as={Col}>
                            <Form.Label>Nama Obat</Form.Label>
                            <Form.Control type="text"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          style={{ height:'36px', width: '280px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} className="custom-spacingPelayanan">
                            <Form.Label>Satuan</Form.Label>
                            <Form.Control type="text" 
                                          value={satuan}
                                          onChange={(e) => setSatuan(e.target.value)}
                                          style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Jumlah</Form.Label>
                            <Form.Control  type='number'
                                           value={jumlah}
                                           onChange={(e) => setJumlah(e.target.value)}
                                           style={{ height:'36px', width: '280px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} className="custom-spacingPelayanan">
                            <Form.Label>Tanggal Kadaluwarsa</Form.Label>
                            <Form.Control type="date"
                                          value={tglkadaluwarsa}
                                          onChange={(e) => setTglkadaluwarsa(e.target.value)}
                                          style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group> 
                        </Row>

                        <Row className="mb-5">
                         <Form.Group>
                            <Form.Label>Tanggal Masuk</Form.Label>
                            <Form.Control  type='date'
                                           value={tglmasuk}
                                           onChange={(e) => setTglmasuk(e.target.value)}
                                           style={{ height:'36px', width: '280px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <div className='field' style={{ textAlign: 'right' }}>
                            <div className='control'>
                              <Button variant="success" type="submit" style={{ backgroundColor: '#28c09a',border:'none' }} className='tombolSimpan'>Update</Button>
                            </div>
                        </div>
                    </Form>


                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditObat;