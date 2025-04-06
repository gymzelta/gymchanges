import { useNavigate } from "react-router-dom";
import "./home.css"; // Ensure correct path

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-background">
            {/* Background Video */}
            <video autoPlay loop muted playsInline className="background-video">
                <source src="/videos/gym_home.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay */}
            <div className="overlay">
                <div className="login-container">
                    <h1>Choose Your Role</h1>
                    <div className="role-grid">
                        <div className="role-card" onClick={() => navigate("/admin")}>
                            <h2>Admin</h2>
                        </div>
                        <div className="role-card" onClick={() => navigate("/ReceptionistPage")}>
                            <h2>Receptionist</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
