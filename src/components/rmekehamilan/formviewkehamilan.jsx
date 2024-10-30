import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link, useParams} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../rmekb/formaddkb.css';
import { Button, InputGroup } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const FormViewKehamilan= () => {
    const [daftarKunjungan, setDaftarKunjungan] = useState([]);
    const [halaman, setHalaman] = useState(0);
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    useEffect(()=>{
        const getAllKunjungan = async () =>{
          try {
              const response = await axios.get(`http://localhost:5000/rmekehamilan/view/${id}`);
              console.log(response.data); // Tambahkan ini untuk melihat respon
              setDaftarKunjungan(response.data); // Mengasumsikan response.data adalah array dari kunjungan
          } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg); 
            }
          }
        };
        getAllKunjungan();
      },[id]);

      // Menghitung total halaman berdasarkan jumlah kunjungan
    const totalHalaman = Math.ceil(daftarKunjungan.length / 1); // Menggunakan 1 item per halaman
    const kunjungan = daftarKunjungan[halaman] || {}; // Ambil kunjungan berdasarkan halaman saat ini

    const generatePDF = () => {
      const doc = new jsPDF();
      let y = 10;

      const addNewPageIfNeeded = () => {
         if (y > 280) { // 280 adalah batas bawah pada kertas A4 dalam jsPDF
             doc.addPage();
             y = 10; // Reset posisi y ke atas halaman baru
         }
      };
  
      // Nomor RM dan Tanggal
      doc.setFontSize(12);
      doc.text(`No RM Kehamilan: ${String(id)}`, 10, y);
      y += 10;
      doc.text('Tanggal Pelayanan:', 10, y);
      doc.text(String(kunjungan.tanggalPelayanan || '-'), 60, y);
      y += 10;
      doc.text('Daerah:', 10, y);
      doc.text(String(kunjungan.daerah || '-'), 60, y);
      y += 20;
  



      //Data Subjektif & I. Biodata
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('SUBJECTIVE DATA', 10, y);
      y += 10;
      doc.setFontSize(14);
      doc.text('I. Biodata', 10, y);
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('Nama Pasien:', 10, y);
      doc.text(String(kunjungan.namePasien || '-'), 50, y);
      doc.text('Nama Suami:', 100, y);
      doc.text(String(kunjungan.nameSuami || '-'), 138, y);
      y += 10;
      doc.text('Umur Pasien:', 10, y);
      doc.text(String(kunjungan.umurPasien || '-'), 50, y);
      doc.text('Umur Suami:', 100, y);
      doc.text(String(kunjungan.umurSuami || '-'), 138, y);
      y += 10;
      doc.text('Agama Pasien:', 10, y);
      doc.text(String(kunjungan.agamaPasien || '-'), 50, y);
      doc.text('Agama Suami:', 100, y);
      doc.text(String(kunjungan.agamaSuami || '-'), 138, y);
      y += 10;
      doc.text('Pendidikan Pasien:', 10, y);
      doc.text(String(kunjungan.pendidikanPasien || '-'), 50, y);
      doc.text('Pendidikan Suami:', 100, y);
      doc.text(String(kunjungan.pendidikanSuami || '-'), 138, y);
      y += 10;
      doc.text('Pekerjaan Pasien:', 10, y);
      doc.text(String(kunjungan.pekerjaanPasien || '-'), 50, y);
      doc.text('Pekerjaan Suami:', 100, y);
      doc.text(String(kunjungan.pekerjaanSuami || '-'), 138, y);
      y += 10;
      doc.text('Alamat Pasien:', 10, y);
      doc.text(String(kunjungan.alamatPasien || '-'), 50, y);
      doc.text('Alamat Suami:', 100, y);
      doc.text(String(kunjungan.alamatSuami || '-'), 138, y);
      y += 10;
      doc.text('Telepon Pasien:', 10, y);
      doc.text(String(kunjungan.teleponPasien || '-'), 50, y);
      doc.text('Telepon Suami:', 100, y);
      doc.text(String(kunjungan.teleponSuami || '-'), 138, y);
      y += 10;
      doc.text('Golongan Darah:', 10, y);
      doc.text(String(kunjungan.golDarah || '-'), 50, y);
      y += 15;


      //II. Keluhan
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('II. Keluhan', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(String(kunjungan.keluhan || '-'), 10, y);
      y += 15;
      addNewPageIfNeeded();

      //III. riwayatmenstruasi
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('III. Riwayat Menstruasi', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('Haid Pertama & Haid Terakhir:', 10, y);
      y += 8;
      doc.text(String(kunjungan.haid || '-'), 10, y);
      y += 15;
      doc.setFontSize(12);
      doc.text('Siklus:', 10, y);
      y += 8;
      doc.text(String(kunjungan.siklus || '-'), 10, y);
      y += 15;
      addNewPageIfNeeded();

      //IV. riwayat kehamilan, persalinan dan nifas
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('IV. Riwayat Kehamilan, Persalinan & Nifas', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('Tanggal Lahir:', 10, y);
      doc.text(String(kunjungan.tanggalLahir || '-'), 50, y);
      doc.text('Tempat Persalinan:', 100, y);
      doc.text(String(kunjungan.tempatSalin || '-'), 138, y);
      y += 8;
      doc.text('Usia Kehamilan:', 10, y);
      doc.text(String(kunjungan.usiaHamil || '-'), 50, y);
      y += 8;
      doc.text('Jumlah Persalinan:', 10, y);
      doc.text(String(kunjungan.jumlahPersalinan || '-'), 50, y);
      y += 8;
      doc.text('Penyulit kehamilan:', 10, y);
      doc.text(String(kunjungan.penyulitHamil || '-'), 50, y);
      y += 8;
      doc.text('Kondisi Anak:', 10, y);
      doc.text(String(kunjungan.kondisiAnak || '-'), 50, y);
      y += 15;
      addNewPageIfNeeded();


      // Riwayat Medis V.
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('V. Riwayat KB', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(String(kunjungan.riwayatKb || '-'), 10, y);
      y += 15;
      addNewPageIfNeeded();
      // VI.
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('VI. Riwayat Imunisasi', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(String(kunjungan.riwayatImunisasi || '-'), 10, y);
      y += 15;
      addNewPageIfNeeded();
      // VII.
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('VII. Riwayat Penyakit & Operasi', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(String(kunjungan.riwayatPenyakit || '-'), 10, y);
      y += 15;
      addNewPageIfNeeded();
      // VIII.
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('VIII. Riwayat Penyakit Keluarga', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(String(kunjungan.riwayatPenyakitKeluarga || '-'), 10, y);
      y += 15;
      addNewPageIfNeeded();
      // IX.
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('IX. Riwayat Kespro', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(String(kunjungan.riwayatKespro || '-'), 10, y);
      y += 15;
      addNewPageIfNeeded();

      // X. Pemenuhan Kebutuhan Sehari-hari
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('X. Pemenuhan Kebutuhan Sehari-hari', 10, y);
      y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('a. Nutrisi:', 10, y);
      doc.text(String(kunjungan.nutrisi || '-'), 60, y);
      y += 8;
      doc.text('b. Eliminasi (BAB):', 10, y);
      doc.text(String(kunjungan.bab || '-'), 60, y);
      y += 8;
      doc.text('b. Eliminasi (BAK):', 10, y);
      doc.text(String(kunjungan.bak || '-'), 60, y);
      y += 8;
      doc.text('c. Istirahat:', 10, y);
      doc.text(String(kunjungan.istirahat || '-'), 60, y);
      y += 8;
      doc.text('d. Personal Hygiene:', 10, y);
      doc.text(String(kunjungan.hygiene || '-'), 60, y);
      y += 8;
      doc.text('e. Kegiatan:', 10, y);
      doc.text(String(kunjungan.kegiatan || '-'), 60, y);
      y += 15;
      addNewPageIfNeeded();

      //Data Objektif & I. Pemeriksaan Umum
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('OBJECTIVE DATA', 10, y);
      y += 8;
      doc.text('I. Pemeriksaan Umum', 10, y);
      y += 8;
      //Kesadaran
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('Kesadaran:', 10, y);
      y += 8;
      doc.text(String(kunjungan.kesadaran || '-'), 10, y);
      y += 10;
      doc.text('TB:', 10, y);
      doc.text(String(kunjungan.tb || '-'), 60, y);
      doc.text('BB:', 110, y);
      doc.text(String(kunjungan.bb || '-'), 160, y);
      y += 10;
      doc.text('IMT:', 10, y);
      doc.text(String(kunjungan.imt || '-'), 60, y);
      doc.text('LILA:', 110, y);
      doc.text(String(kunjungan.lila || '-'), 160, y);
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('TTV:', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('TD:', 10, y);
      doc.text(String(kunjungan.td || '-'), 60, y);
      doc.text('Nadi:', 110, y);
      doc.text(String(kunjungan.nadi || '-'), 160, y);
      y += 10;
      doc.text('Pernafasan:', 10, y);
      doc.text(String(kunjungan.pernafasan || '-'), 60, y);
      doc.text('Suhu:', 110, y);
      doc.text(String(kunjungan.suhu || '-'), 160, y);
      y += 60;
      addNewPageIfNeeded();

      //II. Pemeriksaan Kebidanan
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('II. Pemeriksaan Kebidanan', 10, y);
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('a. Kepala:', 10, y);
      doc.text(String(kunjungan.kepala || '-'), 60, y);
      y += 8;
      doc.text('b. Leher:', 10, y);
      doc.text(String(kunjungan.leher || '-'), 60, y);
      y += 8;
      doc.text('c. Payudara:', 10, y);
      doc.text(String(kunjungan.payudara || '-'), 60, y);
      y += 8;
      doc.text('d. Abdomen:', 10, y);
      y += 8;
      doc.text('Bekas Operasi:', 10, y);
      doc.text(String(kunjungan.bekasOp || '-'), 60, y);
      y += 8;
      doc.text('Striae:', 10, y);
      doc.text(String(kunjungan.striae || '-'), 60, y);
      y += 8;
      addNewPageIfNeeded();

      doc.text('Hasil Pemeriksaan Leopold:', 10, y);
      y += 8;
      doc.text('Leopold 1:', 10, y);
      doc.text(String(kunjungan.leosatu || '-'), 60, y);
      y += 8;
      doc.text('Leopold 2:', 10, y);
      doc.text(String(kunjungan.leodua || '-'), 60, y);
      y += 8;
      doc.text('Leopold 3:', 10, y);
      doc.text(String(kunjungan.leotiga || '-'), 60, y);
      y += 8;
      doc.text('Leopold 4:', 10, y);
      doc.text(String(kunjungan.leoempat || '-'), 60, y);
      y += 8;
      doc.text('MC Donald:', 10, y);
      doc.text(String(kunjungan.mcd || '-'), 60, y);
      y += 8;
      doc.text('TBJ:', 10, y);
      doc.text(String(kunjungan.tbj || '-'), 60, y);
      y += 8;
      doc.text('Letak:', 10, y);
      doc.text(String(kunjungan.letak || '-'), 60, y);
      y += 8;
      doc.text('DDJ:', 10, y);
      doc.text(String(kunjungan.ddj || '-'), 60, y);
      y += 8;
      addNewPageIfNeeded();
      doc.text('e. Ekstremitas:', 10, y);
      y += 8;
      doc.text('Oedema:', 10, y);
      doc.text(String(kunjungan.oedema || '-'), 60, y);
      y += 8;
      doc.text('Varises:', 10, y);
      doc.text(String(kunjungan.varises || '-'), 60, y);
      y += 8;
      doc.text('f. Genetalia:', 10, y);
      y += 8;
      doc.text('Pengeluaran Pervaginam:', 10, y);
      y += 8;
      doc.text(String(kunjungan.genetalia || '-'), 10, y);
      y += 15;
      addNewPageIfNeeded();

      //III. Pemeriksaan Laboratorium
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('III. Pemeriksaan Laboratorium', 10, y);
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('Hemoglobin (Hb):', 10, y);
      doc.text(String(kunjungan.hb || '-'), 60, y);
      y += 8;
      doc.text('Protein Urine:', 10, y);
      doc.text(String(kunjungan.pu || '-'), 60, y);
      y += 8;
      doc.text('Glukosa Urine:', 10, y);
      doc.text(String(kunjungan.gu || '-'), 60, y);
      y += 8;
      doc.text('HbSAg:', 10, y);
      doc.text(String(kunjungan.hbsag || '-'), 60, y);
      y += 15;
      addNewPageIfNeeded();
  
      // Assessment
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('ASSESMENT', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(String(kunjungan.assesment || '-'), 10, y);
      y += 10;
      addNewPageIfNeeded();
      //Plan
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('PLAN', 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(String(kunjungan.plan || '-'), 10, y);
      addNewPageIfNeeded();
      // Save the PDF
      doc.save(`Data_RM_Pasien_Kehamilan_${id}.pdf`);
  };
  

    return (
        <div className='p-2 m-2'>
        <h2 className='titleForm2' style={{fontWeight:'bold'}}>View RM Pasien Kehamilan</h2>
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
                                          style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{marginLeft:'-420px'}}>
                            <Form.Label>Daerah</Form.Label>
                            <Form.Control type="text"
                                          value={kunjungan.daerah || ""}
                                          disabled
                                          readOnly
                                          style={{height:'36px', width: '220px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <h6 style={{ fontWeight:'bold', marginTop:'30px'}}>SUBJECTIVE DATA</h6>
                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>
                        I. Biodata
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Nama Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.namePasien || ""}
                                           disabled
                                           readOnly
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'20px'}}>
                            <Form.Label>Nama Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.nameSuami || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col} style={{ marginRight:'2px'}}>
                            <Form.Label>Umur Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.umurPasien || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'2px'}}>
                            <Form.Label>Agama Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.agamaPasien || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'29px'}}>
                            <Form.Label>Golongan Darah</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.golDarah || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '116px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'2px'}} >
                            <Form.Label>Umur Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.umurSuami || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'160px'}}>
                            <Form.Label>Agama Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.agamaSuami || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Pendidikan Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.pendidikanPasien || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-200px', marginRight:'1px'}}>
                            <Form.Label>Pekerjaan Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.pekerjaanPasien || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'20px'}}>
                            <Form.Label>Pendidikan Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.pendidikanSuami || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-200px'}}>
                            <Form.Label>Pekerjaan Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.pekerjaanSuami || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Alamat Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.alamatPasien || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'20px'}}>
                            <Form.Label>Alamat Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.alamatSuami || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Telepon Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.teleponPasien || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'20px'}}>
                            <Form.Label>Telepon Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={kunjungan.teleponSuami || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>II. Keluhan</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.keluhan || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>
                        III. Riwayat Menstruasi
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Haid Pertama & Haid Terakhir</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.haid || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Siklus</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.siklus || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'30px'}}>
                        IV. Riwayat Kehamilan, Persalinan & Nifas
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'7px', marginTop:'10px'}}>Tanggal / Tahun Lahir</Form.Label>
                            <Form.Control type="date"
                                          value={kunjungan.tanggalLahir || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'7px', marginTop:'10px'}}>Tempat Persalinan</Form.Label>
                            <Form.Control type="text"
                                          value={kunjungan.tempatSalin || ""}
                                          disabled
                                          readOnly
                                          style={{height:'36px', width: '245px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Usia Kehamilan</Form.Label>
                            <Form.Control type="text"
                                          value={kunjungan.usiaHamil || ""}
                                          disabled
                                          readOnly
                                          style={{height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-200px', marginRight:'1px' }}>
                            <Form.Label>Jumlah Persalinan</Form.Label>
                            <Form.Control type="number"
                                          value={kunjungan.jumlahPersalinan || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '130px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-5px'}}>
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Control type="text"
                                          value={kunjungan.gender || ""}
                                          disabled
                                          readOnly
                                          style={{height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-200px'}}>
                            <Form.Label>BB Anak</Form.Label>
                            <Form.Control type="number"
                                          value={kunjungan.bbAnak || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Penyulit Kehamilan</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.penyulitHamil || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Kondisi Anak</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.kondisiAnak || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>
      
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'20px'}}>V. Riwayat Kb</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.riwayatKb || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'20px'}}>VI. Riwayat Imunisasi</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.riwayatImunisasi || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>VII. Riwayat Penyakit & Operasi</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.riwayatPenyakit || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>VIII. Riwayat Penyakit Keluarga</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.riwayatPenyakitKeluarga || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>IX. Riwayat KESPRO</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.riwayatKespro || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>
                        X. Pemenuhan Kebutuhan Sehari-hari
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>a. Nutrisi</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.nutrisi || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '390px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>b. Eliminasi (BAB)</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.bab || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '250px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{marginLeft:'-15px'}}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>b. Eliminasi (BAK)</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.bak || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '250px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>c. Istirahat</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.istirahat || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '350px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{marginLeft:'-150px'}}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>d. Personal Hygiene</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.hygiene || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '350px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>e. Kegiatan</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.kegiatan || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <h6 style={{fontWeight:'bold', marginTop:'30px'}}>OBJECTIVE DATA</h6>
                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>
                        I. Pemeriksaan Umum
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Kesadaran</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.kesadaran || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>TB</Form.Label>
                            <Form.Control type="number"
                                          value={kunjungan.tb || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>BB</Form.Label>
                            <Form.Control  type='number'
                                           value={kunjungan.bb || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>IMT</Form.Label>
                            <Form.Control  type='number'
                                           value={kunjungan.imt || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '100px' }}>
                            <Form.Label>Lila</Form.Label>
                            <Form.Control  type='number'
                                           value={kunjungan.lila || ""}
                                          disabled
                                          readOnly
                                           style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'30px'}}>
                        TTV :
                        </p>
                        <Row className="mb-3">
                        <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>TD</Form.Label>
                            <Form.Control type="number"
                                          value={kunjungan.td || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'-70px' }}>
                            <Form.Label>Nadi</Form.Label>
                            <Form.Control type="number"
                                          value={kunjungan.nadi || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'-70px'}}>
                            <Form.Label>Suhu</Form.Label>
                            <Form.Control type="number"
                                          value={kunjungan.suhu || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '100px' }}>
                            <Form.Label>Pernafasan</Form.Label>
                            <Form.Control type="text"
                                          value={kunjungan.pernafasan || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'30px'}}>
                        II. Pemeriksaan Kebidanan
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>a. Kepala</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.kepala || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>b. Leher</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.leher || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>
                        
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>c. Payudara</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.payudara || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ marginBottom:'-1px', marginTop:'30px'}}>
                        d. Abdomen :
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Bekas Operasi</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.bekasOp || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Striae</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.striae || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ marginBottom:'5px', marginTop:'30px'}}>
                        Hasil Pemeriksaan Leopold :
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Leopold 1</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.leosatu || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Leopold 2</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.leodua || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Leopold 3</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.leotiga || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Leopold 4</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.leoempat || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Mc Donald</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.mcd || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>TBJ</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.tbj || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Letak</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.letak || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>DJJ</Form.Label>
                            <Form.Control as="textarea"
                                         value={kunjungan.ddj || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ marginBottom:'-1px', marginTop:'30px'}}>
                        e. Ekstremitas :
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Oedema</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.oedema || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Varises</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.varises || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ marginBottom:'-1px', marginTop:'30px'}}>
                        f. Genetalia :
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Pengeluaran Pervaginam</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.genetalia || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'30px'}}>
                        III. Pemeriksaan Laboratorium
                        </p>
                        <Row className="mb-3">
                        <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>Hemoglobin (Hb)</Form.Label>
                            <Form.Control type="text"
                                          value={kunjungan.hb || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'-70px' }}>
                            <Form.Label>Protein Urine</Form.Label>
                            <Form.Control type="text"
                                          value={kunjungan.pu || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '100px' }}>
                            <Form.Label>Glukosa Urine</Form.Label>
                            <Form.Control type="text"
                                          value={kunjungan.gu || ""}
                                          disabled
                                          readOnly
                                          style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>HbSAg</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.hbsag || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'700' }}>ASSESMENT</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.assesment || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '380px', borderWidth: '2px' }}/>
                         </Form.Group>

                         <Form.Group as={Col} style={{ marginRight:'160px' }}>
                            <Form.Label style={{ fontWeight:'700' }}>PLAN</Form.Label>
                            <Form.Control as="textarea"
                                          value={kunjungan.plan || ""}
                                          disabled
                                          readOnly
                                          rows={2} style={{  width: '380px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>  

                        <div className='field' style={{ textAlign: 'right', marginTop: '50px', marginBottom: '25px', marginRight: '20px' }}>
                                <Link to={""}>
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

export default FormViewKehamilan;