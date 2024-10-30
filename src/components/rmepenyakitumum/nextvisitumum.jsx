import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

const AddNextUmum = ({ nomorRmUmum }) => {
    const [tanggalPelayanan, setTanggalPelayanan] = useState('');
    const [daerah, setDaerah] = useState("");
    const [name, setName] = useState("");
    const [umur, setUmur] = useState("");
    const [alamat, setAlamat] = useState("");
    const [keluhan, setKeluhan] = useState('');
    const [riwayat, setRiwayat] = useState('');
    const [td, setTd] = useState("");
    const [tb, setTb] = useState("");
    const [rr, setRr] = useState("");
    const [bb, setBb] = useState("");
    const [suhu, setSuhu] = useState("");
    const [nadi, setNadi] = useState("");
    const [assesment, setAssesment] = useState("");
    const [plan, setPlan] = useState("");
    const [msg, setMsg] = useState('');

    const addNewVisit = async (event) => {
        event.preventDefault(); // Mencegah perilaku pengiriman form secara default
        try {
            await axios.post('http://localhost:5000/rmeumum', {
                nomorRmUmum, // Menggunakan prop langsung
                tanggalPelayanan,
                daerah,
                name,
                umur,
                alamat,
                keluhan,
                riwayat,
                td,
                tb,
                rr,
                bb,
                suhu,
                nadi,
                assesment,
                plan
            });
            setMsg('Kunjungan baru berhasil ditambahkan');
            // Reset form setelah pengiriman berhasil jika diperlukan
            setTanggalPelayanan('');
            setDaerah('');
            setName('');
            setUmur('');
            setAlamat('');
            setKeluhan('');
            setRiwayat('');
            setTd('');
            setTb('');
            setRr('');
            setBb('');
            setSuhu('');
            setNadi('');
            setAssesment('');
            setPlan('');
        } catch (error) {
            setMsg(error.response ? error.response.data.msg : "Terjadi kesalahan");
        }
    };

    return (
        <div className='p-2 m-2'>
            <h2 className='titleForm'>Form Kunjungan Baru</h2>
            <div className='card'>
                <div className='card-content p-2'>  
                    <div className='content'>
                        <Form onSubmit={addNewVisit}> {/* Tambahkan handler onSubmit */}
                            <p className='has-text-centered'>{msg}</p>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Nomor RM</Form.Label>
                                    <Form.Control 
                                        type="number" // Ubah menjadi text untuk penanganan input yang lebih baik
                                        value={nomorRmUmum} // Gunakan prop nomorRmUmum langsung
                                        readOnly // Jadikan read-only jika tidak boleh diedit
                                        style={{ height: '36px', width: '200px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="custom-spacingPelayanan">
                                    <Form.Label>Tanggal Pelayanan</Form.Label>
                                    <Form.Control 
                                        type="date"
                                        value={tanggalPelayanan}
                                        onChange={(e) => setTanggalPelayanan(e.target.value)}
                                        style={{ height: '36px', width: '230px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Daerah</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={daerah}
                                        onChange={(e) => setDaerah(e.target.value)}
                                        style={{ height: '36px', width: '220px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                            </Row>

                            <h6 style={{ fontWeight: 'bold' }}>DATA SUBJEKTIF</h6>

                            <Row className="mb-3">
                                <Form.Group as={Col} style={{ marginRight: '-10px' }}>
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control 
                                        type='text'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{ height: '36px', width: '300px', borderWidth: '2px' }} 
                                    />
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
                                <Form.Group as={Col} style={{ marginRight: '170px' }}>
                                    <Form.Label>Alamat</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={alamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                        style={{ height: '36px', width: '300px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Riwayat Penyakit</Form.Label>
                                    <Form.Control 
                                        as="textarea"
                                        value={riwayat}
                                        onChange={(e) => setRiwayat(e.target.value)}
                                        rows={2} 
                                        style={{ width: '300px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                                <Form.Group as={Col} style={{ marginLeft: '-320px' }}>
                                    <Form.Label>Keluhan</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        value={keluhan}
                                        onChange={(e) => setKeluhan(e.target.value)}
                                        rows={2} 
                                        style={{ width: '400px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                            </Row>

                            <h6 style={{ fontWeight: 'bold' }}>DATA OBJEKTIF</h6>

                            <Row className="mb-3">
                                <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                                    <Form.Label>TD</Form.Label>
                                    <Form.Control  
                                        type='number'
                                        value={td}
                                        onChange={(e) => setTd(e.target.value)}
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                                <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                                    <Form.Label>TB</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        value={tb}
                                        onChange={(e) => setTb(e.target.value)}
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                                <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                                    <Form.Label>RR</Form.Label>
                                    <InputGroup>
                                        <Form.Control 
                                            type="number"
                                            value={rr}
                                            onChange={(e) => setRr(e.target.value)}
                                            style={{ height: '36px', width: '70px', borderWidth: '2px' }} 
                                        />
                                        <InputGroup.Text>/Menit</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} style={{ marginLeft: '70px', marginRight: '-70px' }}>
                                    <Form.Label>BB</Form.Label>
                                    <Form.Control  
                                        type='number'
                                        value={bb}
                                        onChange={(e) => setBb(e.target.value)}
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                                <Form.Group as={Col} style={{ marginLeft: '10px' }}>
                                    <Form.Label>Suhu</Form.Label>
                                    <Form.Control 
                                        type="number"
                                        value={suhu}
                                        onChange={(e) => setSuhu(e.target.value)}
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Nadi</Form.Label>
                                    <Form.Control 
                                        type="number"
                                        value={nadi}
                                        onChange={(e) => setNadi(e.target.value)}
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label style={{ fontWeight: '700' }}>ASSESMENT</Form.Label>
                                    <Form.Control 
                                        as="textarea"
                                        value={assesment}
                                        onChange={(e) => setAssesment(e.target.value)}
                                        rows={2} 
                                        style={{ width: '380px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                                <Form.Group as={Col} style={{ marginRight: '160px' }}>
                                    <Form.Label style={{ fontWeight: '700' }}>PLAN</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        value={plan}
                                        onChange={(e) => setPlan(e.target.value)}
                                        rows={2} 
                                        style={{ width: '380px', borderWidth: '2px' }} 
                                    />
                                </Form.Group>
                            </Row>

                            <div className='field' style={{ textAlign: 'right' }}>
                                <div className='control'>
                                    <Button type="submit" variant="success" style={{ backgroundColor: '#28c09a', border: 'none' }} className='tombolSimpan'>
                                        Simpan
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNextUmum;
