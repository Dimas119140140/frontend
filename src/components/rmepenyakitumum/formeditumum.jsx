import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import '../rmepenyakitumum/formaddumum.css';

const FormEditUmum = () => {
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
   const {id,no} = useParams();

   useEffect(()=>{
      const getRmUmumById = async () =>{
        try {
          const response = await axios.get(`http://localhost:5000/rmeumum/list/edit/${id}/${no}`);
          setTgl(response.data.tanggalPelayanan);
          setDaerah(response.data.daerah);
          setName(response.data.name);
          setUmur(response.data.umur);
          setAlamat(response.data.alamat);
          setKeluhan(response.data.keluhan);
          setRiwayat(response.data.riwayat);
          setTd(response.data.td);
          setTb(response.data.tb);
          setRr(response.data.rr);
          setBb(response.data.bb);
          setSuhu(response.data.suhu);
          setNadi(response.data.nadi);
          setAssesment(response.data.assesment);
          setPlan(response.data.plan);
        } catch (error) {
          if(error.response) {
            setMsg(error.response.data.msg); 
          }
        }
      }
      getRmUmumById();
    },[id,no]);

   const updateUmum =  async(e) => {
     e.preventDefault();

    const confirmed = window.confirm("Apakah Anda yakin ingin mengupdate data ini?");
    if (confirmed) {
     try {
       await axios.patch(`http://localhost:5000/rmeumum/list/edit/${id}/${no}`, {
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
       navigate(`/rmepenyakitumum/edit/list/${id}`);
     } catch (error) {
         if(error.response) {
           setMsg(error.response.data.msg); 
         }
     }
    }
   };
    return (
        <div className='p-2 m-2'>
        <h2 className='titleForm' style={{fontWeight:'bold'}}>Update RM Pasien Umum</h2>
        <div className='card'>
            <div className='card-content p-2'>  
                <div className='content'>
                    <Form onSubmit={updateUmum}>
                        <Row className="mb-3">
                        <p>No RM : {id}</p>
                        <p className='has-text-centered'>{msg}</p>
                         <Form.Group as={Col}>
                            <Form.Label>Tanggal Pelayanan</Form.Label>
                            <Form.Control type="date"
                                          value={tgl}
                                          onChange={(e) => setTgl(e.target.value)}
                                          style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} style={{marginLeft:'-420px'}}>
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

export default FormEditUmum;