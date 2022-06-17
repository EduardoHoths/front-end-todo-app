import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import api from "../../services/api";

interface handleSubmitProps {
    email: string;
    password: string;
}

import "../../styles/LoginAndRegisterForms.scss";

import { Head } from "../Helper/Head";

export const Login = () => {
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    function handleSubmit({ email, password }: handleSubmitProps) {
        api.post('login', {
            email,
            password,
        }).then((res) => {
            if (res.data.success) {
                document.cookie = `token=${res.data.TOKEN}`;
                setError("");
                navigate("/todo");
            } else {
                setError(res.data.msg);
            }
        });
    }

    const validation = object().shape({
        email: string().email("Insira um email válido").required("Este campo é obrigatório"),
        password: string().required("Este campo é obrigatório"),
    });
    return (
        <main className="main-form">
            <section className="form">
                <Head title="Login" description="Faça login" />
                <h1>Login</h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validation}
                >
                    <Form>
                        <div className="form-field-group">
                            <Field name="email" placeholder="Email" />

                            <ErrorMessage name="email" component="span" className="form-error" />
                        </div>

                        <div className="form-field-group">
                            <Field name="password" placeholder="Senha" type="password" />

                            <ErrorMessage name="password" component="span" className="form-error" />
                        </div>
                        {error && <p className="response-error">{error}</p>}
                        <button type="submit" className="submitButton">
                            Login
                        </button>
                    </Form>
                </Formik>
                <span>
                    Não tem um conta? <Link to="/register">Registre-se</Link>
                </span>
            </section>
        </main>
    );
};
