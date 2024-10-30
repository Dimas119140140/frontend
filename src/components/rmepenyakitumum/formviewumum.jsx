import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button, InputGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import '../rmepenyakitumum/formaddumum.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const FormViewUmum = () => {
    const [daftarKunjungan, setDaftarKunjungan] = useState([]);
    const [halaman, setHalaman] = useState(0);
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const getAllKunjungan = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/rmeumum/view/${id}`);
                console.log(response.data); // Tambahkan ini untuk melihat respon
                setDaftarKunjungan(response.data); // Mengasumsikan response.data adalah array dari kunjungan
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getAllKunjungan();
    }, [id]);

     // Menghitung total halaman berdasarkan jumlah kunjungan
     const totalHalaman = Math.ceil(daftarKunjungan.length / 1); // Menggunakan 1 item per halaman
     const kunjungan = daftarKunjungan[halaman] || {}; // Ambil kunjungan berdasarkan halaman saat ini
 
     const generatePDF = () => {
        const doc = new jsPDF();
        let y = 10;

        // Nomor RM dan Tanggal
        doc.setFontSize(12);
        doc.text(`No.RM Penyakit Umum : ${String(id)}`, 10, y);
        y += 10;
        doc.text('Tanggal Pelayanan:', 10, y);
        doc.text(String(kunjungan.tanggalPelayanan || '-'), 60, y);
        y += 10;
        doc.text('Daerah:', 10, y);
        doc.text(String(kunjungan.daerah || '-'), 60, y);
        y += 20;

        // Subjective Data Section
        doc.setFontSize(14);
        doc.text('SUBJECTIVE DATA', 10, y);
        y += 10;
        doc.setFontSize(12);
        doc.text('Nama:', 10, y);
        doc.text(String(kunjungan.name || '-'), 60, y);
        y += 10;
        doc.text('Umur:', 10, y);
        doc.text(String(kunjungan.umur || '-'), 60, y);
        y += 10;
        doc.text('Alamat:', 10, y);
        doc.text(String(kunjungan.alamat || '-'), 60, y);
        y += 20;

        // Riwayat dan Keluhan
        doc.text('Riwayat Penyakit:', 10, y);
        doc.text(String(kunjungan.riwayat || '-'), 60, y);
        y += 10;
        doc.text('Keluhan:', 10, y);
        doc.text(String(kunjungan.keluhan || '-'), 60, y);
        y += 20;

        // Objective Data Section
        doc.setFontSize(14);
        doc.text('OBJECTIVE DATA', 10, y);
        y += 10;
        doc.setFontSize(12);
        doc.text('TD:', 10, y);
        doc.text(String(kunjungan.td || '-'), 30, y);
        doc.text('TB:', 60, y);
        doc.text(String(kunjungan.tb || '-'), 80, y);
        doc.text('RR:', 110, y);
        doc.text(String(kunjungan.rr || '-'), 130, y);
        y += 10;
        doc.text('BB:', 10, y);
        doc.text(String(kunjungan.bb || '-'), 30, y);
        doc.text('Suhu:', 60, y);
        doc.text(String(kunjungan.suhu || '-'), 80, y);
        doc.text('Nadi:', 110, y);
        doc.text(String(kunjungan.nadi || '-'), 130, y);
        y += 20;

        // Assessment and Plan Section
        doc.setFontSize(14);
        doc.text('ASSESMENT', 10, y);
        y += 10;
        doc.setFontSize(12);
        doc.text(String(kunjungan.assesment || '-'), 10, y);
        y += 20;
        doc.setFontSize(14);
        doc.text('PLAN', 10, y);
        y += 10;
        doc.setFontSize(12);
        doc.text(String(kunjungan.plan || '-'), 10, y);
        y += 20;

        // Save the PDF
        doc.save(`Data_RM_Pasien_Umum_${id}.pdf`);
    };

    return (
        <div className='p-2 m-2'>
            <h2 className='titleForm' style={{ fontWeight: 'bold' }}>View RM Pasien Umum</h2>
            <div className='card'>
                <div className='card-content p-2'>
                    <div className='content'>
                        <Form>
                            <Row className="mb-3">
                                <p>No RM : {id}</p>
                                <p className='has-text-centered'>{msg}</p>
                                <Form.Group as={Col}>
                                    <Form.Label>Tanggal Pelayanan</Form.Label>
                                    <Form.Control type="date"
                                        value={kunjungan.tanggalPelayanan || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '230px', borderWidth: '2px' }} />
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginLeft: '-420px' }}>
                                    <Form.Label>Daerah</Form.Label>
                                    <Form.Control type="text"
                                        value={kunjungan.daerah || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '220px', borderWidth: '2px' }} />
                                </Form.Group>
                            </Row>

                            <h6 style={{ fontWeight: 'bold' }}>SUBJECTIVE DATA</h6>

                            <Row className="mb-3">
                                <Form.Group as={Col} style={{ marginRight: '-10px' }}>
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type='text'
                                        value={kunjungan.name || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '300px', borderWidth: '2px' }} />
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginLeft: '10px' }}>
                                    <Form.Label>Umur</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            value={kunjungan.umur || ""}
                                            disabled
                                            readOnly
                                            style={{ height: '36px', borderWidth: '2px' }}
                                        />
                                        <InputGroup.Text>Tahun</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginRight: '170px' }}>
                                    <Form.Label>Alamat</Form.Label>
                                    <Form.Control type="text"
                                        value={kunjungan.alamat || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '300px', borderWidth: '2px' }} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Riwayat Penyakit</Form.Label>
                                    <Form.Control as="textarea"
                                        value={kunjungan.riwayat || ""}
                                        disabled
                                        readOnly
                                        rows={2} style={{ width: '300px', borderWidth: '2px' }} />
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginLeft: '-320px' }}>
                                    <Form.Label>Keluhan</Form.Label>
                                    <Form.Control as="textarea"
                                        value={kunjungan.keluhan || ""}
                                        disabled
                                        readOnly
                                        rows={2} style={{ width: '400px', borderWidth: '2px' }} />
                                </Form.Group>
                            </Row>

                            <h6 style={{ fontWeight: 'bold' }}>OBJECTIVE DATA</h6>

                            <Row className="mb-3">
                                <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                                    <Form.Label>TD</Form.Label>
                                    <Form.Control type='number'
                                        value={kunjungan.td || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} />
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                                    <Form.Label>TB</Form.Label>
                                    <Form.Control type="number"
                                        value={kunjungan.tb || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} />
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                                    <Form.Label>RR</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            value={kunjungan.rr || ""}
                                            disabled
                                            readOnly
                                            style={{ height: '36px', width: '70px', borderWidth: '2px' }} />
                                        <InputGroup.Text>/Menit</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginLeft: '70px', marginRight: '-70px' }}>
                                    <Form.Label>BB</Form.Label>
                                    <Form.Control type='number'
                                        value={kunjungan.bb || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} />
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                                    <Form.Label>Suhu</Form.Label>
                                    <Form.Control type="number"
                                        value={kunjungan.suhu || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Nadi</Form.Label>
                                    <Form.Control type="number"
                                        value={kunjungan.nadi || ""}
                                        disabled
                                        readOnly
                                        style={{ height: '36px', width: '100px', borderWidth: '2px' }} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label style={{ fontWeight: '700' }}>ASSESMENT</Form.Label>
                                    <Form.Control as="textarea"
                                        value={kunjungan.assesment || ""}
                                        disabled
                                        readOnly
                                        rows={2} style={{ width: '380px', borderWidth: '2px' }} />
                                </Form.Group>

                                <Form.Group as={Col} style={{ marginRight: '160px' }}>
                                    <Form.Label style={{ fontWeight: '700' }}>PLAN</Form.Label>
                                    <Form.Control as="textarea"
                                        value={kunjungan.plan || ""}
                                        disabled
                                        readOnly
                                        rows={2} style={{ width: '380px', borderWidth: '2px' }} />
                                </Form.Group>
                            </Row>

                            <div className='field' style={{ textAlign: 'left', marginTop: '50px', marginBottom: '25px', marginRight: '20px' }}>
                                <Link to={`/rmepenyakitumum/view/${id}/addnext`}>
                                    <Button size='sm'
                                        variant='success'
                                        className='tombolSimpan'
                                        style={{ backgroundColor: '#28c09a', border: 'none' }}>
                                        Tambah Data
                                    </Button>
                                </Link>

                                <Button variant="primary"
                                        onClick={(e) => {
                                        e.stopPropagation(); // Mencegah membuka halaman baru
                                        generatePDF();
                                        }}
                                        style={{ marginTop: '-30px', marginLeft: '3px' }}> Cetak PDF
                                </Button>
                            </div>

                        
                            <div className="paginationView" style={{ textAlign: 'center', marginBottom:'20px' }}>
                                <Button 
                                    disabled={halaman === 0} 
                                    onClick={() => setHalaman(halaman - 1)}>Previous</Button>
                                <span style={{ margin: '0 10px' }}> {halaman + 1} / {totalHalaman}</span>
                                <Button 
                                    disabled={halaman === totalHalaman - 1} 
                                    onClick={() => setHalaman(halaman + 1)}>Next</Button>
                            </div>
                          

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormViewUmum;
