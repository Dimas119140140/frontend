import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const FormAddObat = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [satuan, setSatuan] = useState("");
    const [tglmasuk, setTglmasuk] = useState("");
    const [tglkadaluwarsa, setTglkadaluwarsa] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveObat =  async(e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/obat", {
            idObat: id,
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
    };

  return (
    <div className='p-2 m-2'>
        <h2 className='titleForm mt-2 mb-3'>Tambah Data Obat</h2>
        <div className='card'>
            <div className='card-content p-4'>
                <div className='content'>
                    <Form onSubmit = {saveObat} >
                        <Row className="mb-3">
                        <p className='has-text-centered'>{msg}</p>
                         <Form.Group as={Col}>
                            <Form.Label>ID Obat</Form.Label>
                            <Form.Control  type='number' 
                                           value={id}
                                           onChange={(e) => setId(e.target.value)}
                                           style={{ height:'36px', width: '200px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} className="custom-spacingPelayanan">
                            <Form.Label>Nama Obat</Form.Label>
                            <Form.Control type="text"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                             style={{ height:'36px', width: '280px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Jumlah</Form.Label>
                            <Form.Control  type='number' 
                                           value={jumlah}
                                           onChange={(e) => setJumlah(e.target.value)}
                                           style={{ height:'36px', width: '200px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} className="custom-spacingPelayanan">
                            <Form.Label>Satuan</Form.Label>
                            <Form.Control type="text"
                                          value={satuan}
                                          onChange={(e) => setSatuan(e.target.value)}
                                          style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-5">
                         <Form.Group as={Col}>
                            <Form.Label>Tanggal Masuk</Form.Label>
                            <Form.Control  type='date'
                                           value={tglmasuk}
                                           onChange={(e) => setTglmasuk(e.target.value)}
                                           style={{ height:'36px', width: '200px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} className="custom-spacingPelayanan">
                            <Form.Label>Tanggal Kadaluwarsa</Form.Label>
                            <Form.Control type="date" 
                                          value={tglkadaluwarsa}
                                          onChange={(e) => setTglkadaluwarsa(e.target.value)}
                            style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <div className='field' style={{ textAlign: 'right' }}>
                            <div className='control'>
                              <Button variant="success" type="submit" style={{ backgroundColor: '#28c09a',border:'none' }} className='tombolSimpan'>Simpan</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddObat;