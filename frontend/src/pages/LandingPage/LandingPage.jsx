import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Grid, Button, TextField } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
const LandingPage = () => {
    const [showSmallMenu, setShowSmallMenu] = useState(false);
    const handleClickMenuIcon = () => {
        setShowSmallMenu(prev => {
            return !prev;
        });
    }
    return (
        <div className="landing-page-container">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <span className="landing-page-logo">Learners</span>
                </Grid>
                <Grid item className="landing-page-grid-menu-items">
                    <ul className="landing-page-menu-items">
                        <li><Link to="/" className="landing-page-menu-item">Home</Link></li>
                        <li><Link to="/" className="landing-page-menu-item">Course</Link></li>
                        <li><Link to="/" className="landing-page-menu-item">About</Link></li>
                        <li><Link to="/" className="landing-page-menu-item">FAQ</Link></li>
                    </ul>
                </Grid>
                <Grid item className="landing-page-Sign-icons">
                    <Button style={{ margin: "0 20px", color: "#fdfdfc", backgroundColor: "#5375e1" }} variant="contained">Sign In</Button>
                    <Button style={{ color: "#fdfdfc", backgroundColor: "#5375e1" }} variant="contained">Sign Up</Button>
                </Grid>
                <Grid item className="landing-page-menu-icon">
                    <MenuIcon className="landing-page-menu-icon-hover" style={{ cursor: "pointer", transition: "all 0.25s linear" }} onClick={handleClickMenuIcon} />
                </Grid>
                {!showSmallMenu ?
                    (
                        <div className="landing-page-small-menu" style={{ left: "-100%" }}>
                            <ul className="landing-page-small-menu-items">
                                <li><Link to="/" className="landing-page-small-menu-item">Home</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">Course</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">About</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">FAQ</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">Log In</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">Sign Up</Link></li>
                            </ul>
                        </div>
                    ) :
                    (
                        <div className="landing-page-small-menu" style={{ left: "0" }}>
                            <ul className="landing-page-small-menu-items">
                                <li><Link to="/" className="landing-page-small-menu-item">Home</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">Course</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">About</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">FAQ</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">Log In</Link></li>
                                <li><Link to="/" className="landing-page-small-menu-item">Sign Up</Link></li>
                            </ul>
                        </div>
                    )
                }
            </Grid>
            {!showSmallMenu ?
                (
                    <Grid container direction="row" alignItems="center" style={{ width: "100%", flex: "1" }}>
                        <Grid item xs={12} md={6} className="landing-page-content-left">
                            <p className="landing-page-slogan1">Find The Best</p>
                            <span className="landing-page-slogan2">Course </span>
                            <span className="landing-page-slogan3">For You</span>
                            <p className="landing-page-content">Learner is a education platform where you can know about learning, provide information related to various academic subjects and skill development.</p>
                            <div className="landing-page-form">
                                <TextField className="landing-page-input" id="outlined-basic" label="Enter Your Email" variant="outlined" autoComplete="none" />
                                <Button className="landing-page-submit" variant="contained" style={{ color: "#fdfdfc", backgroundColor: "#5375e1" }}>Register</Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} className="landing-page-content-right">
                            <div className="landing-page-image">
                                <img loading="lazy" src="https://jwt-nodejs-server-test.onrender.com/LOGO1.PNG" alt="Learners-img" />
                            </div>
                        </Grid>
                    </Grid>
                ) :
                (
                    <></>
                )
            }
        </div>
    );
}

export default LandingPage;