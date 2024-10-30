import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../rmekb/formaddkb.css';
import { InputGroup } from 'react-bootstrap';

const FormAddKb = () => {
   const [rm, setRm] = useState("");
   const [tgl, setTgl] = useState(""); 
   const [daerah, setDaerah] = useState("");
   const [name, setName] = useState("");
   const [tglLahir, setTglLahir] = useState("");
   const [alamat, setAlamat] = useState("");
   const [telepon, setTelepon] = useState("");
   const [tglKb, setTglKb] = useState("");
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

   const saveKb =  async(e) => {
     e.preventDefault();
     try {
       await axios.post('http://localhost:5000/rmekb', {
           nomorRmKb: rm,
           tanggalPelayanan: tgl,
           daerah: daerah,
           name: name,
           tanggalLahir: tglLahir,
           alamat: alamat,
           telepon: telepon,
           tanggalKb: tglKb,
           td: td,
           tb: tb,
           rr: rr,
           bb: bb,
           suhu: suhu,
           nadi: nadi,
           assesment: assesment,
           plan: plan
       });
       navigate("/rmekb");
     } catch (error) {
         if(error.response) {
           setMsg(error.response.data.msg); 
         }
     }
   }


    return (
        <div className='p-2 m-2'>
        <h2 className='titleForm2'>Form Pasien KB</h2>
        <div className='card'>
            <div className='card-content p-2'>  
                <div className='content'>

                    <Form onSubmit = {saveKb}>
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
                         <Form.Group as={Col} style={{marginRight:'-150px'}}>
                            <Form.Label>Nama Akseptor</Form.Label>
                            <Form.Control  type='text'
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} style={{marginRight:'-300px'}} >
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <Form.Control type="date"
                                          value={tglLahir}
                                          onChange={(e) => setTglLahir(e.target.value)}
                                          style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col}>
                            <Form.Label>Tanggal Mulai Kb</Form.Label>
                            <Form.Control type="date"
                                          value={tglKb}
                                          onChange={(e) => setTglKb(e.target.value)}
                                          style={{ height:'36px', width: '150px', borderWidth: '2px' }} />
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>No. Telepon</Form.Label>
                            <Form.Control type="text"
                                          value={telepon}
                                          onChange={(e) => setTelepon(e.target.value)}
                                          style={{  height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} className='custom-spacingAlamat1'>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text"
                                          value={alamat}
                                          onChange={(e) => setAlamat(e.target.value)}
                             style={{  height:'36px', width: '400px', borderWidth: '2px' }}/>
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

                         <Form.Group as={Col} style={{ marginRight:'-70px'}}>
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

export default FormAddKb;