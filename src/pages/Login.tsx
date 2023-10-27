const Login = () => {
  return (
    <div className="login my-5">
      <div className="row my-5">
        <div className="col-lg-6 offset-lg-3">
          <div className="card">
            <div className="card-header">
              <h4>Login to Your Account</h4>
            </div>
            <div className="card-body">
              <div className="row my-3">
                <div className="col-lg-6 offset-lg-3 position-relative">
                  <button className="btn btn-primary shadow-sm mx-5">
                    <i className="bi-google me-2"></i>
                    Login with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
