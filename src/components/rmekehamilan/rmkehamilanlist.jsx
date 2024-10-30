import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { FaPlus } from "react-icons/fa";
import '../rmekehamilan/formaddkehamilan.css';

const KehamilanList = () => {
    const [kehamilans, setKehamilans] = useState([]);
    const [keyword, setKeyword] = useState(""); // Untuk pencarian
    const [page, setPage] = useState(0); // Halaman saat ini
    const [limit] = useState(5); // Batas item per halaman
    const [totalPage, setTotalPage] = useState(0); // Total halaman
    const [loading, setLoading] = useState(false); // Untuk loading
    const navigate = useNavigate(); // Untuk navigasi ke halaman lain

    useEffect(() => {
        const getRmKehamilan = async () => {
            setLoading(true); // Set loading saat memuat data
            try {
                const response = await axios.get(
                    `http://localhost:5000/rmekehamilan?search_query=${keyword}&page=${page}&limit=${limit}`
                );


                // Mengelompokkan data berdasarkan nomorRmKehamilan dan hanya mengambil yang pertama
                const uniqueRecords = response.data.kehamilans.reduce((acc, current) => {
                    // Cek jika nomorKehamilan sudah ada di accumulator
                    const exists = acc.some(item => item.nomorRmKehamilan === current.nomorRmKehamilan);
                if (!exists) {
                    acc.push(current); // Jika belum ada, tambahkan ke accumulator
                }
                return acc;
            }, []);

                setKehamilans(uniqueRecords); // Data kehamilan
                setTotalPage(response.data.totalPage); // Total halaman
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Matikan loading setelah data didapatkan
            }
        };

        getRmKehamilan();
    }, [page, keyword, limit]);


    const deleteRmKehamilan = async (kehamilanId) => {
        // Tampilkan konfirmasi penghapusan
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (!confirmDelete) return; // Jika pengguna memilih "Cancel", fungsi dihentikan
        
        try {
            await axios.delete(`http://localhost:5000/rmekehamilan/${kehamilanId}`);
            setKehamilans(kehamilans.filter(rmekehamilan => rmekehamilan.nomorRmKehamilan !== kehamilanId)); // Perbarui state tanpa reset halaman
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
    const handleRowClick = (nomorRmKehamilan) => {
        navigate(`/rmekehamilan/view/${nomorRmKehamilan}`);
    };

  return (
    <div className='p-2 m-1'>
        <h1 className='titlekehamilan'>RME Kehamilan</h1>
        
        <div className='field' style={{ textAlign: 'right' }}>
            <Link to="/rmekehamilan/add" >
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
                    <th className='header1'>Umur</th>
                    <th className='header1'>Daerah</th>
                    <th className='header1'>Aksi</th>
                </tr>
            </thead>
            <tbody>
            {kehamilans.length === 0 ? (
                <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>Tidak ada data</td>
                </tr>
            ) : (
                kehamilans.map((rmekehamilan, index) => (
                <tr key={rmekehamilan.uuid} style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => handleRowClick(rmekehamilan.nomorRmKehamilan)}>
                    <td>{index + 1 + (page * limit)}.</td>
                    <td>{rmekehamilan.nomorRmKehamilan}</td>
                    <td className='namaobat'>{rmekehamilan.namePasien}</td>
                    <td>{rmekehamilan.tanggalPelayanan}</td>
                    <td>{rmekehamilan.umurPasien}</td>
                    <td>{rmekehamilan.daerah}</td>
                    <td>
                        <Button
                            size='sm' 
                            variant='warning' 
                            className='but1 custom-button'
                            onClick={(e) => {
                                e.stopPropagation(); // Hentikan event klik untuk row
                                navigate(`/rmekehamilan/edit/list/${rmekehamilan.nomorRmKehamilan}`); // Navigasi ke halaman edit
                            }}
                        >
                            Edit
                        </Button>
                        <Button onClick={(e) => { e.stopPropagation(); deleteRmKehamilan(rmekehamilan.nomorRmKehamilan) }} size='sm' variant='danger' className='but2'>Hapus</Button>
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

export default KehamilanList;