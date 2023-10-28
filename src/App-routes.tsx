import { Routes, Route, Navigate } from "react-router-dom";
import Category from "./pages/categories/category";
import Pokemon from "./pages/pokemon/pokemon";
import Detail from "./pages/detail/detail";


const AppRoutes = () => {
  
  
    return (
      <section>
        <Routes>
          <Route path="/" element={<Navigate to="/categories" />} />
        </Routes>
        <Routes>
          <Route path="/categories" element={<Category />}/>
          <Route path="categories/:id" element={<Pokemon />} />
          <Route path="detail/:id" element={<Detail />} />
        </Routes>
   
      </section>
    );
  };
  
  export default AppRoutes;