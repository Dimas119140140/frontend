import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../rmekehamilan/formaddkehamilan.css';

const FormEditKehamilan = () => {
   const [tgl, setTgl] = useState(""); 
   const [daerah, setDaerah] = useState("");
   const [namePasien, setNamePasien] = useState("");
   const [nameSuami, setNameSuami] = useState("");
   const [umurPasien, setUmurPasien] = useState("");
   const [umurSuami, setUmurSuami] = useState("");
   const [agamaPasien, setAgamaPasien] = useState("");
   const [agamaSuami, setAgamaSuami] = useState("");
   const [pendidikanPasien, setPendidikanPasien] = useState("");
   const [pendidikanSuami, setPendidikanSuami] = useState("");
   const [pekerjaanPasien, setPekerjaanPasien] = useState("");
   const [pekerjaanSuami, setPekerjaanSuami] = useState("");
   const [alamatPasien, setAlamatPasien] = useState("");
   const [alamatSuami, setAlamatSuami] = useState("");
   const [teleponPasien, setTeleponPasien] = useState("");
   const [teleponSuami, setTeleponSuami] = useState("");
   const [golDarah, setGolDarah] = useState("");
   const [keluhan, setKeluhan] = useState("");
   const [haid, setHaid] = useState("");
   const [siklus, setSiklus] = useState("");
   const [tglLahir, setTglLahir] = useState("");
   const [tempatSalin, setTempatSalin] = useState("");
   const [usiaHamil, setUsiaHamil] = useState("");
   const [jumlahPersalinan, setJumlahPersalinan] = useState("");
   const [gender, setGender] = useState("");
   const [bbAnak, setBbAnak] = useState("");
   const [penyulitHamil, setPenyulitHamil] = useState("");
   const [kondisiAnak, setKondisiAnak] = useState("");
   const [riwayatKb, setRiwayatKb] = useState("");
   const [riwayatImunisasi, setRiwayatImunisasi] = useState("");
   const [riwayatPenyakit, setRiwayatPenyakit] = useState("");
   const [riwayatPenyakitKeluarga, setRiwayatPenyakitkel] = useState("");
   const [riwayatKespro, setRiwayatKespro] = useState("");
   const [nutrisi, setNutrisi] = useState("");
   const [bab, setBab] = useState("");
   const [bak, setBak] = useState("");
   const [istirahat, setIstirahat] = useState("");
   const [hygiene, setHygiene] = useState("");
   const [kegiatan, setKegiatan] = useState("");
   const [kesadaran, setKesadaran] = useState("");
   const [tb, setTb] = useState("");
   const [bb, setBb] = useState("");
   const [imt, setImt] = useState("");
   const [lila, setLila] = useState("");
   const [td, setTd] = useState("");
   const [nadi, setNadi] = useState("");
   const [suhu, setSuhu] = useState("");
   const [rr, setRr] = useState("");
   const [kepala, setKepala] = useState("");
   const [leher, setLeher] = useState("");
   const [payudara, setPayudara] = useState("");   
   const [bekasOp, setBekasOp] = useState("");
   const [striae, setStriae] = useState("");
   const [leosatu, setLeoSatu] = useState("");
   const [leodua, setLeoDua] = useState("");
   const [leotiga, setLeoTiga] = useState("");
   const [leoempat, setLeoEmpat] = useState("");
   const [mcd, setMcd] = useState("");
   const [tbj, setTbj] = useState("");
   const [letak, setLetak] = useState("");
   const [ddj, setDdj] = useState("");
   const [oedema, setOedema] = useState("");
   const [varises, setVar] = useState("");
   const [genetalia, setGenetalia] = useState("");
   const [hb, setHb] = useState("");
   const [pu, setPu] = useState("");
   const [gu, setGu] = useState("");
   const [hbsag, setHbsag] = useState("");
   const [assesment, setAssesment] = useState("");
   const [plan, setPlan] = useState("");
   const [msg, setMsg] = useState("");
   const navigate = useNavigate();
   const {id,no} = useParams();
   
   useEffect(()=>{
      const getRmKehamilanById = async () =>{
        try {
          const response = await axios.get(`http://localhost:5000/rmekehamilan/list/edit/${id}/${no}`);
          setTgl(response.data.tanggalPelayanan);
          setDaerah(response.data.daerah);
          setNamePasien(response.data.namePasien);
          setNameSuami(response.data.nameSuami);
          setUmurPasien(response.data.umurPasien);
          setUmurSuami(response.data.umurSuami);
          setAgamaPasien(response.data.agamaPasien);
          setAgamaSuami(response.data.agamaSuami);
          setPendidikanPasien(response.data.pendidikanPasien);
          setPendidikanSuami(response.data.pendidikanSuami);
          setPekerjaanPasien(response.data.pekerjaanPasien);
          setPekerjaanSuami(response.data.pekerjaanSuami);
          setAlamatPasien(response.data.alamatPasien);
          setAlamatSuami(response.data.alamatSuami);
          setTeleponPasien(response.data.teleponPasien);
          setTeleponSuami(response.data.teleponSuami);
          setGolDarah(response.data.golDarah);
          setKeluhan(response.data.keluhan);
          setHaid(response.data.haid);
          setSiklus(response.data.siklus);
          setTglLahir(response.data.tanggalLahir);
          setTempatSalin(response.data.tempatSalin);
          setUsiaHamil(response.data.usiaHamil);
          setJumlahPersalinan(response.data.jumlahPersalinan);
          setGender(response.data.gender);
          setBbAnak(response.data.bbAnak);
          setPenyulitHamil(response.data.penyulitHamil);
          setKondisiAnak(response.data.kondisiAnak);
          setRiwayatKb(response.data.riwayatKb);
          setRiwayatImunisasi(response.data.riwayatImunisasi);
          setRiwayatPenyakit(response.data.riwayatPenyakit); 
          setRiwayatPenyakitkel(response.data.riwayatPenyakitKeluarga);
          setRiwayatKespro(response.data.riwayatKespro);
          setNutrisi(response.data.nutrisi);
          setBab(response.data.bab);
          setBak(response.data.bak);
          setIstirahat(response.data.istirahat);
          setHygiene(response.data.hygiene);
          setKegiatan(response.data.kegiatan);
          setKesadaran(response.data.kesadaran);                        
          setTb(response.data.tb);
          setBb(response.data.bb);
          setImt(response.data.imt);
          setLila(response.data.lila);
          setTd(response.data.td);
          setNadi(response.data.nadi);
          setSuhu(response.data.suhu);
          setRr(response.data.pernafasan);
          setKepala(response.data.kepala);
          setLeher(response.data.leher);
          setPayudara(response.data.payudara);
          setBekasOp(response.data.bekasOp);
          setStriae(response.data.striae);
          setLeoSatu(response.data.leosatu);
          setLeoDua(response.data.leodua);
          setLeoTiga(response.data.leotiga);
          setLeoEmpat(response.data.leoempat);
          setMcd(response.data.mcd);
          setTbj(response.data.tbj);
          setLetak(response.data.letak);
          setDdj(response.data.ddj);
          setOedema(response.data.oedema);
          setVar(response.data.varises);
          setGenetalia(response.data.genetalia);
          setHb(response.data.hb);
          setPu(response.data.pu);
          setGu(response.data.gu);
          setHbsag(response.data.hbsag);
          setAssesment(response.data.assesment);
          setPlan(response.data.plan);
        } catch (error) {
          if(error.response) {
            setMsg(error.response.data.msg); 
          }
        }
      }
      getRmKehamilanById();
    },[id,no]);

    const updateKehamilan =  async(e) => {
      e.preventDefault();

      const confirmed = window.confirm("Apakah Anda yakin ingin mengupdate data ini?");
      if (confirmed) {
      try {
        await axios.patch(`http://localhost:5000/rmekehamilan/list/edit/${id}/${no}`, {
            tanggalPelayanan: tgl,
            daerah: daerah,
            namePasien: namePasien,
            nameSuami: nameSuami,
            umurPasien: umurPasien,
            umurSuami: umurSuami,
            agamaPasien: agamaPasien,
            agamaSuami: agamaSuami,
            pendidikanPasien: pendidikanPasien,
            pendidikanSuami: pendidikanSuami,
            pekerjaanPasien: pekerjaanPasien,
            pekerjaanSuami: pekerjaanSuami,
            alamatPasien: alamatPasien,
            alamatSuami: alamatSuami,
            teleponPasien: teleponPasien,
            teleponSuami: teleponSuami,
            golDarah: golDarah,
            keluhan: keluhan,
            haid: haid,
            siklus: siklus,
            tanggalLahir: tglLahir,
            tempatSalin: tempatSalin,
            usiaHamil: usiaHamil,
            jumlahPersalinan: jumlahPersalinan,
            gender: gender,
            bbAnak: bbAnak,
            penyulitHamil: penyulitHamil,
            kondisiAnak: kondisiAnak,
            riwayatKb: riwayatKb,
            riwayatImunisasi: riwayatImunisasi,
            riwayatPenyakit: riwayatPenyakit,
            riwayatPenyakitKeluarga: riwayatPenyakitKeluarga,
            riwayatKespro: riwayatKespro,     
            nutrisi: nutrisi,
            bab: bab,
            bak: bak,
            istirahat: istirahat,
            hygiene: hygiene,
            kegiatan: kegiatan,    
            kesadaran: kesadaran,
            tb: tb,
            bb: bb,
            imt: imt,
            lila: lila,
            td: td,
            nadi: nadi,
            suhu: suhu,
            pernafasan: rr,
            kepala: kepala,
            leher: leher,
            payudara: payudara,
            bekasOp: bekasOp,
            striae: striae,
            leosatu: leosatu,
            leodua: leodua,
            leotiga: leotiga,
            leoempat: leoempat,
            mcd: mcd,
            tbj: tbj,
            letak: letak,
            ddj: ddj,
            oedema: oedema,
            varises: varises,
            genetalia: genetalia,
            hb: hb,
            pu: pu,
            gu: gu,
            hbsag: hbsag,
            assesment: assesment,
            plan: plan
         });
         navigate(`/rmekehamilan/edit/list/${id}`);
       } catch (error) {
           if(error.response) {
             setMsg(error.response.data.msg); 
           }
       }
      }
    };
    return (
        <div className='p-2 m-2'>
        <h2 className='titleForm2'>Update RM Pasien Kehamilan</h2>
        <div className='card'>
            <div className='card-content p-2'>  
                <div className='content'>
                    <Form onSubmit={updateKehamilan}>
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

                        <h6 style={{ fontWeight:'bold', marginTop:'30px'}}>SUBJECTIVE DATA</h6>
                        <p style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>
                        I. Biodata
                        </p>
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Nama Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={namePasien}
                                           onChange={(e) => setNamePasien(e.target.value)}
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'20px'}}>
                            <Form.Label>Nama Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={nameSuami}
                                           onChange={(e) => setNameSuami(e.target.value)}
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col} style={{ marginRight:'2px'}}>
                            <Form.Label>Umur Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={umurPasien}
                                           onChange={(e) => setUmurPasien(e.target.value)}
                                           style={{ height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'2px'}}>
                            <Form.Label>Agama Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={agamaPasien}
                                           onChange={(e) => setAgamaPasien(e.target.value)}
                                           style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'29px'}}>
                            <Form.Label>Golongan Darah</Form.Label>
                            <Form.Control  type='text'
                                           value={golDarah}
                                           onChange={(e) => setGolDarah(e.target.value)}
                                           style={{ height:'36px', width: '116px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'2px'}} >
                            <Form.Label>Umur Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={umurSuami}
                                           onChange={(e) => setUmurSuami(e.target.value)}
                                           style={{ height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'160px'}}>
                            <Form.Label>Agama Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={agamaSuami}
                                           onChange={(e) => setAgamaSuami(e.target.value)}
                                           style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Pendidikan Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={pendidikanPasien}
                                           onChange={(e) => setPendidikanPasien(e.target.value)}
                                           style={{ height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-200px', marginRight:'1px'}}>
                            <Form.Label>Pekerjaan Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={pekerjaanPasien}
                                           onChange={(e) => setPekerjaanPasien(e.target.value)}
                                           style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'20px'}}>
                            <Form.Label>Pendidikan Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={pendidikanSuami}
                                           onChange={(e) => setPendidikanSuami(e.target.value)}
                                           style={{ height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-200px'}}>
                            <Form.Label>Pekerjaan Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={pekerjaanSuami}
                                           onChange={(e) => setPekerjaanSuami(e.target.value)}
                                           style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Alamat Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={alamatPasien}
                                           onChange={(e) => setAlamatPasien(e.target.value)}
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'20px'}}>
                            <Form.Label>Alamat Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={alamatSuami}
                                           onChange={(e) => setAlamatSuami(e.target.value)}
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Telepon Pasien</Form.Label>
                            <Form.Control  type='text'
                                           value={teleponPasien}
                                           onChange={(e) => setTeleponPasien(e.target.value)}
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'20px'}}>
                            <Form.Label>Telepon Suami</Form.Label>
                            <Form.Control  type='text'
                                           value={teleponSuami}
                                           onChange={(e) => setTeleponSuami(e.target.value)}
                                           style={{ height:'36px', width: '300px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>II. Keluhan</Form.Label>
                            <Form.Control as="textarea"
                                          value={keluhan}
                                          onChange={(e) => setKeluhan(e.target.value)}
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
                                          value={haid}
                                          onChange={(e) => setHaid(e.target.value)} 
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Siklus</Form.Label>
                            <Form.Control as="textarea"
                                          value={siklus}
                                          onChange={(e) => setSiklus(e.target.value)}
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
                                          value={tglLahir}
                                          onChange={(e) => setTglLahir(e.target.value)}
                                          style={{ height:'36px', width: '230px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'7px', marginTop:'10px'}}>Tempat Persalinan</Form.Label>
                            <Form.Control type="text"
                                          value={tempatSalin}
                                          onChange={(e) => setTempatSalin(e.target.value)}
                                          style={{height:'36px', width: '245px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label>Usia Kehamilan</Form.Label>
                            <Form.Control type="text"
                                          value={usiaHamil}
                                          onChange={(e) => setUsiaHamil(e.target.value)}
                                          style={{height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-200px', marginRight:'1px' }}>
                            <Form.Label>Jumlah Persalinan</Form.Label>
                            <Form.Control type="number"
                                          value={jumlahPersalinan}
                                          onChange={(e) => setJumlahPersalinan(e.target.value)}
                                          style={{ height:'36px', width: '130px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-5px'}}>
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Control type="text"
                                          value={gender}
                                          onChange={(e) => setGender(e.target.value)}
                                          style={{height:'36px', width: '120px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginLeft:'-200px'}}>
                            <Form.Label>BB Anak</Form.Label>
                            <Form.Control type="number"
                                          value={bbAnak}
                                          onChange={(e) => setBbAnak(e.target.value)}
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Penyulit Kehamilan</Form.Label>
                            <Form.Control as="textarea"
                                          value={penyulitHamil}
                                          onChange={(e) => setPenyulitHamil(e.target.value)}
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Kondisi Anak</Form.Label>
                            <Form.Control as="textarea"
                                          value={kondisiAnak}
                                          onChange={(e) => setKondisiAnak(e.target.value)}
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>
      
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'20px'}}>V. Riwayat Kb</Form.Label>
                            <Form.Control as="textarea"
                                          value={riwayatKb}
                                          onChange={(e) => setRiwayatKb(e.target.value)}
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'20px'}}>VI. Riwayat Imunisasi</Form.Label>
                            <Form.Control as="textarea"
                                          value={riwayatImunisasi}
                                          onChange={(e) => setRiwayatImunisasi(e.target.value)}
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>VII. Riwayat Penyakit & Operasi</Form.Label>
                            <Form.Control as="textarea"
                                          value={riwayatPenyakit}
                                          onChange={(e) => setRiwayatPenyakit(e.target.value)}
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>VIII. Riwayat Penyakit Keluarga</Form.Label>
                            <Form.Control as="textarea"
                                          value={riwayatPenyakitKeluarga}
                                          onChange={(e) => setRiwayatPenyakitkel(e.target.value)}
                                          rows={2} style={{  width: '450px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight:'bold', marginBottom:'5px', marginTop:'10px'}}>IX. Riwayat KESPRO</Form.Label>
                            <Form.Control as="textarea"
                                          value={riwayatKespro}
                                          onChange={(e) => setRiwayatKespro(e.target.value)}
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
                                          value={nutrisi}
                                          onChange={(e) => setNutrisi(e.target.value)}
                                          rows={2} style={{  width: '390px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>b. Eliminasi (BAB)</Form.Label>
                            <Form.Control as="textarea"
                                          value={bab}
                                          onChange={(e) => setBab(e.target.value)}
                                          rows={2} style={{  width: '250px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{marginLeft:'-15px'}}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>b. Eliminasi (BAK)</Form.Label>
                            <Form.Control as="textarea"
                                          value={bak}
                                          onChange={(e) => setBak(e.target.value)}
                                          rows={2} style={{  width: '250px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>c. Istirahat</Form.Label>
                            <Form.Control as="textarea"
                                          value={istirahat}
                                          onChange={(e) => setIstirahat(e.target.value)}
                                          rows={2} style={{  width: '350px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{marginLeft:'-150px'}}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>d. Personal Hygiene</Form.Label>
                            <Form.Control as="textarea"
                                          value={hygiene}
                                          onChange={(e) => setHygiene(e.target.value)}
                                          rows={2} style={{  width: '350px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>e. Kegiatan</Form.Label>
                            <Form.Control as="textarea"
                                          value={kegiatan}
                                          onChange={(e) => setKegiatan(e.target.value)}
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
                                          value={kesadaran}
                                          onChange={(e) => setKesadaran(e.target.value)}
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>TB</Form.Label>
                            <Form.Control type="number"
                                          value={tb}
                                          onChange={(e) => setTb(e.target.value)}
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>BB</Form.Label>
                            <Form.Control  type='number'
                                           value={bb}
                                           onChange={(e) => setBb(e.target.value)}
                                           style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '-70px' }}>
                            <Form.Label>IMT</Form.Label>
                            <Form.Control  type='number'
                                           value={imt}
                                           onChange={(e) => setImt(e.target.value)}
                                           style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '100px' }}>
                            <Form.Label>Lila</Form.Label>
                            <Form.Control  type='number'
                                           value={lila}
                                           onChange={(e) => setLila(e.target.value)}
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
                                          value={td}
                                          onChange={(e) => setTd(e.target.value)}
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'-70px' }}>
                            <Form.Label>Nadi</Form.Label>
                            <Form.Control type="number"
                                          value={nadi}
                                          onChange={(e) => setNadi(e.target.value)}
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'-70px'}}>
                            <Form.Label>Suhu</Form.Label>
                            <Form.Control type="number"
                                          value={suhu}
                                          onChange={(e) => setSuhu(e.target.value)}
                                          style={{ height:'36px', width: '100px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '100px' }}>
                            <Form.Label>Pernafasan</Form.Label>
                            <Form.Control type="text"
                                          value={rr}
                                          onChange={(e) => setRr(e.target.value)}
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
                                          value={kepala}
                                          onChange={(e) => setKepala(e.target.value)}
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>b. Leher</Form.Label>
                            <Form.Control as="textarea"
                                          value={leher}
                                          onChange={(e) => setLeher(e.target.value)}
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>
                        
                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>c. Payudara</Form.Label>
                            <Form.Control as="textarea"
                                          value={payudara}
                                          onChange={(e) => setPayudara(e.target.value)}
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
                                          value={bekasOp}
                                          onChange={(e) => setBekasOp(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Striae</Form.Label>
                            <Form.Control as="textarea"
                                          value={striae}
                                          onChange={(e) => setStriae(e.target.value)}
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
                                          value={leosatu}
                                          onChange={(e) => setLeoSatu(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Leopold 2</Form.Label>
                            <Form.Control as="textarea"
                                          value={leodua}
                                          onChange={(e) => setLeoDua(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Leopold 3</Form.Label>
                            <Form.Control as="textarea"
                                          value={leotiga}
                                          onChange={(e) => setLeoTiga(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Leopold 4</Form.Label>
                            <Form.Control as="textarea"
                                          value={leoempat}
                                          onChange={(e) => setLeoEmpat(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Mc Donald</Form.Label>
                            <Form.Control as="textarea"
                                          value={mcd}
                                          onChange={(e) => setMcd(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>TBJ</Form.Label>
                            <Form.Control as="textarea"
                                          value={tbj}
                                          onChange={(e) => setTbj(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Letak</Form.Label>
                            <Form.Control as="textarea"
                                          value={letak}
                                          onChange={(e) => setLetak(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>DJJ</Form.Label>
                            <Form.Control as="textarea"
                                          value={ddj}
                                          onChange={(e) => setDdj(e.target.value)}
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
                                          value={oedema}
                                          onChange={(e) => setOedema(e.target.value)}
                                          rows={2} style={{  width: '400px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>Varises</Form.Label>
                            <Form.Control as="textarea"
                                          value={varises}
                                          onChange={(e) => setVar(e.target.value)}
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
                                          value={genetalia}
                                          onChange={(e) => setGenetalia(e.target.value)}
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
                                          value={hb}
                                          onChange={(e) => setHb(e.target.value)}
                                          style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight:'-70px' }}>
                            <Form.Label>Protein Urine</Form.Label>
                            <Form.Control type="text"
                                          value={pu}
                                          onChange={(e) => setPu(e.target.value)}
                                          style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                         <Form.Group as={Col} style={{ marginRight: '100px' }}>
                            <Form.Label>Glukosa Urine</Form.Label>
                            <Form.Control type="text"
                                          value={gu}
                                          onChange={(e) => setGu(e.target.value)}
                                          style={{ height:'36px', width: '150px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row className="mb-3">
                         <Form.Group as={Col}>
                            <Form.Label style={{marginBottom:'5px', marginTop:'10px'}}>HbSAg</Form.Label>
                            <Form.Control as="textarea"
                                          value={hbsag}
                                          onChange={(e) => setHbsag(e.target.value)}
                                          rows={2} style={{  width: '700px', borderWidth: '2px' }}/>
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

export default FormEditKehamilan;