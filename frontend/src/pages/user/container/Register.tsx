import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/user/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    if (username && password) {
      const PORT = process.env.BE_PORT || 8000

      await fetch(`http://localhost:${PORT}/user/register/`, {
        headers,
        method: "POST",
        body: JSON.stringify({ username, password })
      })
        .then((res) => {
          if (res.status >= 400 && res.status < 600) {
            throw Error(res.statusText);
            }

          return res.json();
        })
          .then(message => {
              const { status } = message
              
              toast(status)
              
              if (status.normalize() === 'User added!')
              {
                  setTimeout(() => navigate('/user/login'), 2000)
              }

          })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h1 className="mt-2 mb-4">Signup</h1>
      <ToastContainer />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={usernameRef}
            type="text"
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Form>
    </>
  );
};

export default Register;
