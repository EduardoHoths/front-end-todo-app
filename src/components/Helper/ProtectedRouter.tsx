import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface ProtectedRouterProps {
    children: JSX.Element;
}

const ProtectedRouter = ({ children }: ProtectedRouterProps) => {
    const token = document.cookie.split("=")[1];
    const [isValid, setIsValid] = React.useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            api.get('auth', {
                headers: {
                    token,
                },
            }).then((res) => {
                if (!res.data.success) {
                    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";'
                    navigate("/");
                } else {
                    setIsValid(true)
                }
            });
        } else {
            navigate("/")
        }
        
    }, [token]);

    if(!isValid) {
        return <div></div>
    } else {
        return children
    }
    
    

};

export default ProtectedRouter;
