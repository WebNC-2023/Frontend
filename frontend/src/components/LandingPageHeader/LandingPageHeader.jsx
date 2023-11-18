import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const LandingPageHeader = () => {
    const navigate = useNavigate();
    const { setShowSmallMenu, setShowContent, showSmallMenu } = useContext(DataContext);
    const handleClickMenuIcon = () => {
        setShowSmallMenu((prev) => {
            return !prev;
        });
    };
    return (<Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
    >
        <Grid item>
            <span className="landing-page-logo">Learners</span>
        </Grid>
        <Grid item className="landing-page-grid-menu-items">
            <ul className="landing-page-menu-items">
                <li
                    className="landing-page-menu-item"
                    onClick={(e) => setShowContent("Home")}
                >
                    Home
                </li>
                <li
                    className="landing-page-menu-item"
                    onClick={(e) => setShowContent("Course")}
                >
                    Course
                </li>
                <li
                    className="landing-page-menu-item"
                    onClick={(e) => setShowContent("About")}
                >
                    About
                </li>
                <li
                    className="landing-page-menu-item"
                    onClick={(e) => setShowContent("FAQ")}
                >
                    FAQ
                </li>
            </ul>
        </Grid>
        <Grid item className="landing-page-Sign-icons">
            <Button
                style={{
                    margin: "0 20px",
                    color: "#fdfdfc",
                    backgroundColor: "#5375e1",
                }}
                variant="contained" onClick={() => navigate("/login")}
            >
                Sign In
            </Button>
            <Button
                style={{ color: "#fdfdfc", backgroundColor: "#5375e1" }}
                variant="contained" onClick={() => navigate("/register")}
            >
                Sign Up
            </Button>
        </Grid>
        <Grid item className="landing-page-menu-icon">
            <MenuIcon
                className="landing-page-menu-icon-hover"
                style={{ cursor: "pointer", transition: "all 0.25s linear" }}
                onClick={handleClickMenuIcon}
            />
        </Grid>
        {!showSmallMenu ? (
            <div className="landing-page-small-menu" style={{ left: "-100%" }}>
                <ul className="landing-page-small-menu-items">
                    <li
                        className="landing-page-small-menu-item"
                        onClick={(e) => {
                            setShowContent("Home");
                            setShowSmallMenu((prev) => !prev);
                        }}
                    >
                        Home
                    </li>
                    <li
                        className="landing-page-small-menu-item"
                        onClick={(e) => {
                            setShowContent("Course");
                            setShowSmallMenu((prev) => !prev);
                        }}
                    >
                        Course
                    </li>
                    <li
                        className="landing-page-small-menu-item"
                        onClick={(e) => {
                            setShowContent("About");
                            setShowSmallMenu((prev) => !prev);
                        }}
                    >
                        About
                    </li>
                    <li
                        className="landing-page-small-menu-item"
                        onClick={(e) => {
                            setShowContent("FAQ");
                            setShowSmallMenu((prev) => !prev);
                        }}
                    >
                        FAQ
                    </li>
                    <li className="landing-page-small-menu-item">Log In</li>
                    <li className="landing-page-small-menu-item">Sign Up</li>
                </ul>
            </div>
        ) : (
            <div className="landing-page-small-menu" style={{ left: "0" }}>
                <ul className="landing-page-small-menu-items">
                    <li
                        className="landing-page-small-menu-item"
                        onClick={(e) => {
                            setShowContent("Home");
                            setShowSmallMenu((prev) => !prev);
                        }}
                    >
                        Home
                    </li>
                    <li
                        className="landing-page-small-menu-item"
                        onClick={(e) => {
                            setShowContent("Course");
                            setShowSmallMenu((prev) => !prev);
                        }}
                    >
                        Course
                    </li>
                    <li
                        className="landing-page-small-menu-item"
                        onClick={(e) => {
                            setShowContent("About");
                            setShowSmallMenu((prev) => !prev);
                        }}
                    >
                        About
                    </li>
                    <li
                        className="landing-page-small-menu-item"
                        onClick={(e) => {
                            setShowContent("FAQ");
                            setShowSmallMenu((prev) => !prev);
                        }}
                    >
                        FAQ
                    </li>
                    <li className="landing-page-small-menu-item" onClick={() => navigate("/login")}>Log In</li>
                    <li className="landing-page-small-menu-item" onClick={() => navigate("/register")}>Sign Up</li>
                </ul>
            </div>
        )}
    </Grid>);
}

export default LandingPageHeader;