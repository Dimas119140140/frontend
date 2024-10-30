import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, InputGroup} from "react-bootstrap";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { FaPlus } from "react-icons/fa";
import '../rmekb/formaddkb.css';

const KbList = () => {
    const [kbs, setKbs] = useState([]);
    const [keyword, setKeyword] = useState(""); // Untuk pencarian
    const [page, setPage] = useState(0); // Halaman saat ini
    const [limit] = useState(7); // Batas item per halaman
    const [totalPage, setTotalPage] = useState(0); // Total halaman
    const [loading, setLoading] = useState(false); // Untuk loading
    const navigate = useNavigate(); // Untuk navigasi ke halaman lain

    useEffect(() => {
        const getRmKb = async () => {
            setLoading(true); // Set loading saat memuat data
            try {
                const response = await axios.get(
                    `http://localhost:5000/rmekb?search_query=${keyword}&page=${page}&limit=${limit}`
                );

                
                // Mengelompokkan data berdasarkan nomorRmUmum dan hanya mengambil yang pertama
                const uniqueRecords = response.data.kbs.reduce((acc, current) => {
                    // Cek jika nomorRmUmum sudah ada di accumulator
                    const exists = acc.some(item => item.nomorRmKb === current.nomorRmKb);
                if (!exists) {
                    acc.push(current); // Jika belum ada, tambahkan ke accumulator
                }
                return acc;
            }, []);

                setKbs(uniqueRecords); // Data kb
                setTotalPage(response.data.totalPage); // Total halaman
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Matikan loading setelah data didapatkan
            }
        };

        getRmKb(); //panggil fungsi get KB
    }, [page, keyword, limit]); // Dependensi untuk page dan keyword


    const deleteRmKb = async (kbId) =>{
       // Tampilkan konfirmasi penghapusan
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (!confirmDelete) return; // Jika pengguna memilih "Cancel", fungsi dihentikan

    try {
        await axios.delete(`http://localhost:5000/rmekb/${kbId}`);
        setKbs(kbs.filter(rmekb => rmekb.nomorRmKb !== kbId)); // Perbarui state tanpa reset halaman
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

    // Fungsi untuk navigasi ke halaman detail
    const handleRowClick = (nomorRmKb) => {
        navigate(`/rmekb/view/${nomorRmKb}`);
    };

  return (
    <div className='p-2 m-1'>
        <h1 className='titlekb'>RME KB</h1>
        
        <div className='field' style={{ textAlign: 'right' }}>
            <Link to="/rmekb/add" >
            <Button size='sm' variant='primary' > <FaPlus className='logotambah'/> Tambah Data</Button>
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
            <thead style={{ textAlign: 'center' }}>
                <tr>
                    <th className='header1'>No</th>
                    <th className='header1'>No Rekam Medis</th>
                    <th className='header1'>Nama Pasien</th>
                    <th className='header1'>Tanggal Pelayanan</th>
                    <th className='header1'>Daerah</th>
                    <th className='header1'>Aksi</th>
                </tr>
            </thead>
            <tbody>
            {kbs.length === 0 ? (
                <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>Tidak ada data</td>
                </tr>
            ) : (
                kbs.map((rmekb, index) => (
                <tr key={rmekb.uuid} style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => handleRowClick(rmekb.nomorRmKb)}>
                    <td>{index + 1 + (page * limit)}.</td>
                    <td>{rmekb.nomorRmKb}</td>
                    <td className='namaobat'>{rmekb.name}</td>
                    <td>{rmekb.tanggalPelayanan}</td>
                    <td>{rmekb.daerah}</td>
                    <td>
                        <Button 
                            size='sm' 
                            variant='warning' 
                            className='but1 custom-button'
                            onClick={(e) => {
                                e.stopPropagation(); // Hentikan event klik untuk row
                                navigate(`/rmekb/edit/list/${rmekb.nomorRmKb}`); // Navigasi ke halaman edit
                            }}
                        >
                            Edit
                        </Button>
                        <Button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                deleteRmKb(rmekb.nomorRmKb);
                            }} 
                            size='sm' 
                            variant='danger' 
                            className='but2'>Hapus</Button>
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
    </div>
  );
};

export default KbList;