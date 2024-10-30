import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PenyakitUmum from "./pages/pagesumum/PenyakitUmum.jsx";
import ViewUmum from "./pages/pagesumum/ViewUmum.jsx";
import AddUmum from "./pages/pagesumum/AddUmum.jsx";
import NextUmum from "./pages/pagesumum/NextUmum.jsx";
import EditUmum from "./pages/pagesumum/EditUmum.jsx";
import Kb from "./pages/pageskb/Kb.jsx";
import ViewKb from "./pages/pageskb/ViewKb.jsx";
import AddKb from "./pages/pageskb/AddKb.jsx";
import EditKb from "./pages/pageskb/EditKb.jsx";
import Kehamilan from "./pages/pageskehamilan/Kehamilan.jsx";
import ViewKehamilan from "./pages/pageskehamilan/ViewKehamilan.jsx";
import AddKehamilan from "./pages/pageskehamilan/AddKehamilan.jsx";
import EditKehamilan from "./pages/pageskehamilan/EditKehamilan.jsx";
import Login from "./pages/Login.jsx";
import Datapengguna from "./pages/pagesdatapengguna/Datapengguna.jsx";
import AddUser from "./pages/pagesdatapengguna/AddUser.jsx";
import EditUser from "./pages/pagesdatapengguna/EditUser.jsx";
import Products from "./pages/pagesdataobat/Products.jsx";
import AddObat from "./pages/pagesdataobat/AddObat.jsx";
import EditObat from "./pages/pagesdataobat/EditObat.jsx";
import ListRiwayatUmum from "./pages/pagesumum/ListRiwayatUmum.jsx"
import ListRiwayatkb from "./pages/pageskb/ListRiwayatKb.jsx";
import ListRiwayatkehamilan from "./pages/pageskehamilan/ListRiwayatKehamilan.jsx";


function App() {
  return (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/rmepenyakitumum" element={<PenyakitUmum />} />
        <Route path="/rmepenyakitumum/view/:id" element={<ViewUmum />} />

        <Route path="/rmepenyakitumum/view/:id/addnext" element={<NextUmum />} />

        <Route path="/rmepenyakitumum/add" element={<AddUmum />} />
        <Route path="/rmepenyakitumum/edit/list/:id" element={<ListRiwayatUmum />} />
        <Route path="/rmepenyakitumum/edit/list/:id/:no" element={<EditUmum />} />


        <Route path="/rmekb" element={<Kb />} />
        <Route path="/rmekb/view/:id" element={<ViewKb />} />

        <Route path="/rmekb/add" element={<AddKb />} />
        <Route path="/rmekb/edit/list/:id" element={<ListRiwayatkb />} />
        <Route path="/rmekb/edit/list/:id/:no" element={<EditKb />} />


        <Route path="/rmekehamilan" element={<Kehamilan />} />
        <Route path="/rmekehamilan/view/:id" element={<ViewKehamilan />} />

        <Route path="/rmekehamilan/add" element={<AddKehamilan />} />
        <Route path="/rmekehamilan/edit/list/:id" element={<ListRiwayatkehamilan />} />
        <Route path="/rmekehamilan/edit/list/:id/:no" element={<EditKehamilan />} />

        <Route path="/datapengguna" element={<Datapengguna />} />
        <Route path="/datapengguna/add" element={<AddUser />} />
        <Route path="/datapengguna/edit/:id" element={<EditUser />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddObat />} />
        <Route path="/products/edit/:id" element={<EditObat />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
