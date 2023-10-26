import { useState } from "react";

const Login = () => {
  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log(loginCreds);
  };

  return (
    <div className="login">
      <div className="card">
        <div className="card-header">
          <h4>Login to Emoji Riddle With Friends</h4>
        </div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  const creds = { ...loginCreds };
                  creds["email"] = e.target.value;
                  setLoginCreds(creds);
                }}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => {
                  const creds = { ...loginCreds };
                  creds["password"] = e.target.value;
                  setLoginCreds(creds);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
