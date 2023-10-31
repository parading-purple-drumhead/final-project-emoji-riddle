import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase/client";

const Login = () => {
  const navigate = useNavigate();

  const authProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const authResult = await signInWithPopup(auth, authProvider);

      const user = authResult.user;

      const additionalUserInfo = getAdditionalUserInfo(authResult);

      console.log("User:", user);
      console.log("Additional Info:", additionalUserInfo);

      if (additionalUserInfo?.isNewUser) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          profilePhoto: user.photoURL,
        });
      }

      navigate("/dashboard", { state: { displayName: user.displayName } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login my-5">
      <div className="row my-5">
        <div className="col-lg-4 offset-lg-4">
          <div className="card">
            <div className="card-header">
              <h4>Login to Your Account</h4>
            </div>
            <div className="card-body">
              <div className="row my-3">
                <button
                  className="btn btn-primary shadow-sm mx-auto"
                  onClick={handleLogin}
                  style={{ width: "50%" }}
                >
                  <i className="bi-google me-2"></i>
                  Login with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
