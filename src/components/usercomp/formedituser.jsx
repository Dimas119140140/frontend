import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const FormEditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        const getUserById = async () =>{
          try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
            setRole(response.data.role);
          } catch (error) {
            if(error.response) {
              setMsg(error.response.data.msg); 
            }
          }
        };
        getUserById();
      },[id]);

    const updateUser =  async(e) => {
      e.preventDefault();

      const confirmed = window.confirm("Apakah Anda yakin ingin mengupdate data User ini?");
      if (confirmed) {
      try {
        await axios.patch(`http://localhost:5000/users/${id}`, {
            name: name,
            email: email,
            password: password,
            confPassword: confPassword,
            role: role
        });
        navigate("/datapengguna");
      } catch (error) {
          if(error.response) {
            setMsg(error.response.data.msg); 
          }
      }
    }
    };

  return (
    <div className='p-2 m-2'>
        <h2 className='titleForm mt-2 mb-3'>Update Data Pengguna</h2>
        <div className='card'>
            <div className='card-content p-4'>
                <div className='content'>
                <Form onSubmit={updateUser}>
                    <Row className="mb-3">
                        <p className='has-text-centered'>{msg}</p>
                         <Form.Group>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type='text'
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          placeholder='User' style={{ height:'36px', width: '280px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row>
                         <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          placeholder='User@gmail.com' style={{ height:'36px', width: '280px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row>
                         <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          placeholder='*******' style={{ height:'36px', width: '280px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row>
                         <Form.Group className="mb-3">
                            <Form.Label>Konfirmasi Password</Form.Label>
                            <Form.Control type="password"
                                          value={confPassword}
                                          onChange={(e) => setConfPassword(e.target.value)}
                                          placeholder='*******' style={{ height:'36px', width: '280px', borderWidth: '2px' }}/>
                         </Form.Group>
                        </Row>

                        <Row>
                         <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" 
                                          value={role}
                                          onChange={(e) => setRole(e.target.value)} style={{ height:'36px', width: '280px', borderWidth: '2px' }}>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </Form.Control>
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
  );
};

export default FormEditUser;