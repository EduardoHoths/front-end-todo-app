import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRouter from "./components/Helper/ProtectedRouter";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

import { TodoApp } from "./pages/TodoApp";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/todo"
                    element={
                        <ProtectedRouter>
                            <TodoApp />
                        </ProtectedRouter>
                    }
                />
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
