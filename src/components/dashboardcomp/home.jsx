import React , { useEffect, useState }  from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import "../dashboardcomp/home.css";

const Home = () => {
    const [totalRmUmum, setTotalRmUmum] = useState(0);
    const [totalRmKb, setTotalRmKb] = useState(0);
    const [totalRmKehamilan, setTotalRmKehamilan] = useState(0);

    useEffect(() => {
        // Fungsi untuk mengambil total RM Umum
        const fetchTotalRmUmum = async () => {
          try {
            const response = await axios.get('http://localhost:5000/rmeumum/total'); // Endpoint untuk total RM Umum
            setTotalRmUmum(response.data.totalRmUmum); // Simpan total ke state
          } catch (error) {
            console.error("Error fetching total RM Umum:", error);
          }
        };

        const fetchTotalRmKb = async () => {
            try {
              const response = await axios.get('http://localhost:5000/rmekb/total'); // Endpoint untuk total RM KB
              setTotalRmKb(response.data.totalRmKb); // Simpan total ke state
            } catch (error) {
              console.error("Error fetching total RM KB:", error);
            }
          };

          const fetchTotalRmKehamilan = async () => {
            try {
              const response = await axios.get('http://localhost:5000/rmekehamilan/total'); // Endpoint untuk total RM Kehamilan
              setTotalRmKehamilan(response.data.totalRmKehamilan); // Simpan total ke state
            } catch (error) {
              console.error("Error fetching total RM Kehamilan:", error);
            }
          };
    
        fetchTotalRmUmum(); // Panggil fungsi saat komponen di-mount
        fetchTotalRmKb();
        fetchTotalRmKehamilan();
      }, []); // Dependency array kosong berarti hanya dijalankan sekali




  return (
    <div className='p-3'>
        
        <h2 className='title'>Dashboard</h2>
        <Stack direction="horizontal" gap={3}>



            <Card style={{ height: '8rem', width: '18rem' }}>
                <Card.Header as="h5" style={{color: '#ffff', backgroundColor: '#005073', fontWeight:'700'}}>Total RM Penyakit Umum</Card.Header>
                <Card.Body>
                     <Card.Text style={{ fontSize:'25px' }}>
                     {totalRmUmum}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card style={{ height: '8rem', width: '18rem'}}>
                <Card.Header as="h5" style={{color: '#ffff',backgroundColor: '#137a63', fontWeight:'700' }}>Total RM KB</Card.Header>
                <Card.Body >
                     <Card.Text style={{ fontSize:'25px' }}>
                     {totalRmKb}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ height: '8rem', width: '18rem' }}>
                <Card.Header as="h5" style={{color: '#ffff',backgroundColor: '#ff7e26', fontWeight:'700' }}>Total RM Kehamilan</Card.Header>
                <Card.Body>
                     <Card.Text style={{ fontSize:'25px' }}>
                     {totalRmKehamilan}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Stack>
        <div className='p-5'>
            <h3 style={{ fontWeight:'bold' }} className='title2 mb-4 mt-5'>Total Data Rekam Medis</h3>
            <div className='card-container'>
            <Stack direction="horizontal" gap={2}>
                <Card style={{ marginInlineEnd:'11px',height: '8rem', width: '23rem'}}>
                    <Card.Header as="h5" style={{color: '#ffff',backgroundColor: '#66beb2', fontWeight:'700' }}>Kecamatan Negeri Katon</Card.Header>
                    <Card.Body>
                        <Card.Text style={{ fontSize:'40px' , fontFamily:'"Outfit", sans-serif'}}>
                         0
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ height: '8rem', width: '23rem'}}>
                    <Card.Header as="h5" style={{color: '#ffff',backgroundColor: '#b70000', fontWeight:'700' }}>Luar Kecamatan Negeri Katon</Card.Header>
                    <Card.Body>
                        <Card.Text style={{ fontSize:'40px' , fontFamily:'"Outfit", sans-serif'}}>
                         0
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Stack>
            </div>
        </div>
    </div>
  );
};

export default Home;