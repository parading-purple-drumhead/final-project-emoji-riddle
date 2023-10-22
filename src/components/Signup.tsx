import { useState } from "react";

const Signup = () => {
  const [signupCreds, setSignupCreds] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log(signupCreds);
  };

  return (
    <div className="login">
      <div className="card">
        <div className="card-header">
          <h4>Signup for Emoji Riddle</h4>
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
                Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  const creds = { ...signupCreds };
                  creds["name"] = e.target.value;
                  setSignupCreds(creds);
                }}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  const creds = { ...signupCreds };
                  creds["email"] = e.target.value;
                  setSignupCreds(creds);
                }}
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
                  const creds = { ...signupCreds };
                  creds["password"] = e.target.value;
                  setSignupCreds(creds);
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

export default Signup;
