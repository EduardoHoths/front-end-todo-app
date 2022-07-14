import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Head } from "../Helper/Head";
import api from "../../services/api";

interface handleSubmitProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit({ email, password }: handleSubmitProps) {
    let data;
    try {
      setLoading(true);
      setError("");

      const response = await api.post("register", {
        email,
        password,
      });
      data = response.data;

      if (data.success) {
        setSuccess("Usuário cadastrado com sucesso");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw Error();
      }
    } catch {
      setError(data.msg);
    } finally {
      setLoading(false);
    }
  }

  const validation = object().shape({
    email: string().email("Insira um email válido").required("Este campo é obrigatório"),
    password: string()
      .min(8, "A senha precisa conter no minímo 8 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: string()
      .oneOf([ref("password"), null], "As senha devem ser iguais")
      .required("Este campo é obrigatório"),
  });

  return (
    <main className={loading ? "main-form loading" : "main-form"}>
      <section className="form">
        <Head title="Registre-se" description="Crie sua conta" />
        <h1>Crie sua conta</h1>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={handleSubmit}
          validationSchema={validation}
        >
          <Form>
            <div className="form-field-group">
              <Field name="email" placeholder="Email" />

              <ErrorMessage name="email" className="form-error" component="span" />
            </div>

            <div className="form-field-group">
              <Field name="password" placeholder="Senha" type="password" />

              <ErrorMessage name="password" className="form-error" component="span" />
            </div>

            <div className="form-field-group">
              <Field name="confirmPassword" placeholder="Confirmar senha" type="password" />

              <ErrorMessage name="confirmPassword" className="form-error" component="span" />
            </div>
            {success && <p className="response-success">{success}</p>}
            {error && <p className="response-error">{error}</p>}
            <button type="submit" className="submitButton" disabled={loading}>
              Registrar
            </button>
          </Form>
        </Formik>

        <span>
          Já tem uma conta? <Link to="/">Faça login</Link>
        </span>
      </section>
    </main>
  );
};
