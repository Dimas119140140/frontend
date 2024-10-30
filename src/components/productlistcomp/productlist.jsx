import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, FormControl, InputGroup,  Modal } from "react-bootstrap";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { FaPlus } from "react-icons/fa";
import '../productlistcomp/productlist.css';

const Productlist = () => {
    const [obats, setObats] = useState([]);
    const [keyword, setKeyword] = useState(""); // Untuk pencarian
    const [page, setPage] = useState(0); // Halaman saat ini
    const [limit] = useState(5); // Batas item per halaman
    const [totalPage, setTotalPage] = useState(0); // Total halaman
    const [loading, setLoading] = useState(false); // Untuk loading
    const [expiredProducts, setExpiredProducts] = useState([]); // State untuk menyimpan obat yang hampir kadaluarsa
    const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal


    useEffect(() => {
        const getObats = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:5000/obat?search_query=${keyword}&page=${page}&limit=${limit}`
                );
                setObats(response.data.obats);
                setTotalPage(response.data.totalPage);

                checkExpiredProducts(response.data.obats); // Periksa obat yang hampir kadaluarsa
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getObats();
    }, [page, keyword, limit]);

    // Fungsi untuk memeriksa obat yang hampir kadaluarsa
    const checkExpiredProducts = (obatList) => {
        const now = new Date();
        const soonToExpire = obatList.filter(obat => {
            const expiryDate = new Date(obat.tanggalKadaluwarsa);
            const daysToExpiry = (expiryDate - now) / (1000 * 60 * 60 * 24);
            return daysToExpiry >= 0 && daysToExpiry <= 7; // Obat yang kadaluarsa dalam 7 hari
        });

        if (soonToExpire.length > 0) {
            setExpiredProducts(soonToExpire);
            setShowModal(true); // Tampilkan modal jika ada obat yang hampir kadaluarsa
        }
    };


    const handleCloseModal = () => setShowModal(false); // Menutup modal
    
    const deleteObat = async (obatId) => {
        // Tampilkan konfirmasi penghapusan
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (!confirmDelete) return; // Jika pengguna memilih "Cancel", fungsi dihentikan

        try {
            await axios.delete(`http://localhost:5000/obat/${obatId}`);
            setObats(obats.filter(obat => obat.idObat !== obatId)); // Perbarui state tanpa reset halaman
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0); // Reset halaman ke 0 saat pencarian berubah
    };

    const goToNextPage = () => {
        if (page < totalPage - 1) setPage(page + 1); // Pergi ke halaman berikutnya
    };

    const goToPreviousPage = () => {
        if (page > 0) setPage(page - 1); // Pergi ke halaman sebelumnya
    };

  return (
    <div className='p-2 m-1'>
        <h1 className='titleproduk'>Data Obat</h1>
        
        <div className='field' style={{ textAlign: 'right' }}>
            <Link to="/products/add" >
            <Button  size='sm' variant='primary'> <FaPlus className='logotambah'/> Tambah Data</Button>
            </Link>
        </div>
        
        <div className='card mt-3'>
        <div className='card-content1 p-2'>  
        <div className='content'>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="searchbar-form">
                <InputGroup className="mb-3 searchbar">
                    <FormControl
                        placeholder="Search"
                        aria-label="Search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} // Update keyword saat mengetik
                        className="custom-search-input"
                    />
                    <Button variant="secondary" type="submit">Cari</Button>
                </InputGroup>
        </form>
        
            {loading ? (
                <p>Memuat data...</p> // Tampilkan pesan loading saat menunggu data
            ) : (
        <Table striped style={{ width:'100%' }}>
            <thead style={{ textAlign: 'center' }} >
                <tr>
                    <th className='header1'>No</th>
                    <th className='header1'>ID Obat</th>
                    <th className='header1'>Nama Obat</th>
                    <th className='header1'>Jumlah</th>
                    <th className='header1'>Satuan</th>
                    <th className='header1'>Tanggal Kadaluwarsa</th>
                    <th className='header1'>Aksi</th>
                </tr>
            </thead>
            <tbody>
            {obats.length === 0 ? (
                <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>Tidak ada data</td>
                </tr>
            ) : (
                obats.map((obat, index) => (
                <tr key={obat.idObat} style={{ textAlign: 'center' }}>
                    <td>{index + 1 + (page * limit)}.</td>
                    <td>{obat.idObat}</td>
                    <td className='namaobat'>{obat.name}</td>
                    <td>{obat.jumlah}</td>
                    <td>{obat.satuan}</td>
                    <td>{obat.tanggalKadaluwarsa}</td>
                    <td>
                        <Link to={`/products/edit/${obat.idObat}`}>
                        <Button size='sm' variant='warning' className='but1 custom-button' >Edit</Button>
                        </Link>
                        <Button onClick={()=> deleteObat(obat.idObat)} size='sm' variant='danger' className='but2'>Hapus</Button>
                    </td>
                </tr>
            ))
            )}
            </tbody>
        </Table>
    )}
    {/* Pagination Controls */}
    <div className="pagination-controls">
        <Button onClick={goToPreviousPage} disabled={page === 0}>Previous</Button>
        <span> Page {page + 1} of {totalPage} </span>
        <Button onClick={goToNextPage} disabled={page >= totalPage - 1 || totalPage === 0}>Next</Button>
    </div>  
        </div>
        </div>
        </div>

            {/* Modal untuk Notifikasi Obat Hampir Kadaluwarsa */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Notifikasi Kadaluwarsa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {expiredProducts.length > 0 ? (
                        <ul>
                            {expiredProducts.map(obat => (
                                <li key={obat.idObat}>{obat.name} - Kadaluwarsa: {obat.tanggalKadaluwarsa}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Tidak ada obat yang hampir kadaluarsa.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

  );
};

export default Productlist;