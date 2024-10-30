import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup } from 'react-bootstrap';
import '../rmepenyakitumum/formaddumum.css';

const FormAddUmum = () => {
   const [rm, setRm] = useState("");
   const [tgl, setTgl] = useState(""); 
   const [daerah, setDaerah] = useState("");
   const [name, setName] = useState("");
   const [umur, setUmur] = useState("");
   const [alamat, setAlamat] = useState("");
   const [keluhan, setKeluhan] = useState("");
   const [riwayat, setRiwayat] = useState("");
   const [td, setTd] = useState("");
   const [tb, setTb] = useState("");
   const [rr, setRr] = useState("");
   const [bb, setBb] = useState("");
   const [suhu, setSuhu] = useState("");
   const [nadi, setNadi] = useState("");
   const [assesment, setAssesment] = useState("");
   const [plan, setPlan] = useState("");
   const [msg, setMsg] = useState("");
   const navigate = useNavigate();

   const saveUmum =  async(e) => {
     e.preventDefault();
     try {
       await axios.post('http://localhost:5000/rmeumum', {
           nomorRmUmum: rm,
           tanggalPelayanan: tgl,
           daerah: daerah,
           name: name,
           umur: umur,
           alamat: alamat,
           keluhan: keluhan,
           riwayat: riwayat,
           td: td,
           tb: tb,
           rr: rr,
           bb: bb,
           suhu: suhu,
           nadi: nadi,
           assesment: assesment,
           plan: plan
       });
       navigate("/rmepenyakitumum");
     } catch (error) {
         if(error.response) {
           setMsg(error.response.data.msg); 
         }
     }
   };


    return (
        <div className='p-2 m-2'>
        <h2 className='titleForm'>Form Pasien Umum</h2>
        <div className='card'>
            <div className='card-content p-2'>  
                <div className='content'>
                    <Form onSubmit = {saveUmum}>
                        <p className='has-text-centered'>{msg}</p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>No.Rm</Form.Label>
                            <Form.Control  type='number'
                                           value={rm}
                                           onChange={(e) => setRm(e.target.value)}
                                           style={{ height:'36px', width: '200px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} className="custom-spacingPelayanan">
                            <Form.Label>Tanggal Pelayanan</Form.Label>
                            <Form.Control type="date"
                                          value={tgl}
                                          onChange={(e) => setTgl(e.target.value)}
                                          style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col}>
                            <Form.Label>Daerah</Form.Label>
                            <Form.Control type="text"
                                          value={daerah}
                                          onChange={(e) => setDaerah(e.target.value)}
                                          style={{height:'36px', width: '220px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <h6 style={{fontWeight:'bold'}}>SUBJECTIVE DATA</h6>

                        <Row className="mb-3">
                         <Form.Group as={Col} style={{marginRight:'-10px'}}>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control  type='text'
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>


                         <Form.Group as={Col} style={{ marginLeft: '10px' }}>
                            <Form.Label>Umur</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    type="number"
                                    value={umur}
                                    onChange={(e) => setUmur(e.target.value)}
                                    style={{ height: '36px', borderWidth: '2px' }}
                                />
                                <InputGroup.Text>Tahun</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                         <Form.Group as={Col} style={{marginRight:'170px'}}>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text"
                                          value={alamat}
                                          onChange={(e) => setAlamat(e.target.value)}
                                          style={{ height:'36px', width: '300px', borderWidth: '2px' }} />
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Riwayat Penyakit</Form.Label>
                            <Form.Control as="textarea"
                                          value={riwayat}
                                          onChange={(e) => setRiwayat(e.target.value)}
                                          rows={2} style={{  width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} style={{marginLeft:'-320px'}}>
                            <Form.Label>Keluhan</Form.Label>
                            <Form.Control as="textarea" 
                                          value={keluhan}
                                          onChange={(e) => setKeluhan(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <h6 style={{fontWeight:'bold'}}>OBJECTIVE DATA</h6>

                        <Row className="mb-3">
                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>TD</Form.Label>
                            <Form.Control  type='number'
                                           value={td}
                                           onChange={(e) => setTd(e.target.value)}
                                           style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>TB</Form.Label>
                            <Form.Control type="number" 
                                          value={tb}
                                          onChange={(e) => setTb(e.target.value)}
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>RR</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    type="number"
                                    value={rr}
                                    onChange={(e) => setRr(e.target.value)}
                                    style={{ height:'36px', width: '70px', borderWidth: '2px' }}/>
                                <InputGroup.Text>/Menit</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                         <Form.Group as={Col} style={{ marginLeft: '70px', marginRight: '-70px' }}>
                            <Form.Label>BB</Form.Label>
                            <Form.Control  type='number'
                                           value={bb}
                                           onChange={(e) => setBb(e.target.value)}
                                           style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} style={{ marginLeft:'10px', marginRight:'-70px'}}>
                            <Form.Label>Suhu</Form.Label>
                            <Form.Control type="number" 
                                          value={suhu}
                                          onChange={(e) => setSuhu(e.target.value)}
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col}>
                            <Form.Label>Nadi</Form.Label>
                            <Form.Control type="number"
                                          value={nadi}
                                          onChange={(e) => setNadi(e.target.value)}
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'700' }}>ASSESMENT</Form.Label>
                            <Form.Control as="textarea"
                                          value={assesment}
                                          onChange={(e) => setAssesment(e.target.value)}
                                          rows={2} style={{  width: '380px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} style={{ marginRight:'160px' }}>
                            <Form.Label style={{ fontWeight:'700' }}>PLAN</Form.Label>
                            <Form.Control as="textarea" 
                                          value={plan}
                                          onChange={(e) => setPlan(e.target.value)}
                                          rows={2} style={{  width: '380px', borderWidth: '2px' }}/>
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

export default FormAddUmum;