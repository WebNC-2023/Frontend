import "./LandingPage.css";
import {
  Grid,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const LandingPage = () => {
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [showContent, setShowContent] = useState("Home");
  const handleClickMenuIcon = () => {
    setShowSmallMenu((prev) => {
      return !prev;
    });
  };
  return (
    <div className="landing-page-container">
      <Grid
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
            variant="contained"
          >
            Sign In
          </Button>
          <Button
            style={{ color: "#fdfdfc", backgroundColor: "#5375e1" }}
            variant="contained"
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
              <li className="landing-page-small-menu-item">Log In</li>
              <li className="landing-page-small-menu-item">Sign Up</li>
            </ul>
          </div>
        )}
      </Grid>
      {!showSmallMenu ? (
        showContent === "Home" ? (
          <Grid
            container
            direction="row"
            alignItems="center"
            style={{ width: "100%", flex: "1" }}
          >
            <Grid item xs={12} md={6} className="landing-page-content-left">
              <p className="landing-page-slogan1">Find The Best</p>
              <span className="landing-page-slogan2">Course </span>
              <span className="landing-page-slogan3">For You</span>
              <p className="landing-page-content">
                Learner is a education platform where you can know about
                learning, provide information related to various academic
                subjects and skill development.
              </p>
              <div className="landing-page-form">
                <TextField
                  className="landing-page-input"
                  id="outlined-basic"
                  label="Enter Your Email"
                  variant="outlined"
                  autoComplete="none"
                />
                <Button
                  className="landing-page-submit"
                  variant="contained"
                  style={{ color: "#fdfdfc", backgroundColor: "#5375e1" }}
                >
                  Register
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6} className="landing-page-content-right">
              <div className="landing-page-image">
                <img
                  onClick={(e) => e.preventDefault()}
                  src="http://localhost:3000/LOGO1.PNG"
                  alt="Learners-img"
                />
              </div>
            </Grid>
          </Grid>
        ) : showContent === "Course" ? (
          <div className="courses-container">
            <div className="courses">
              <div className="course-item">
                <div className="course-item-image">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/illinois/iMBA+square.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50"
                    alt="course-img"
                  />
                </div>
                <div className="course-university">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40"
                    alt="university-img"
                    width="25px"
                    height="25px"
                  />
                  <span>University of Illinois Gies College of Business</span>
                </div>
                <p className="course-name">
                  Master of Business Administration (iMBA)
                </p>
                <div className="course-earn-degree">
                  <SchoolIcon />
                  <span>Earn a degree</span>
                </div>
                <p className="course-degree">Degree</p>
              </div>
              <div className="course-item">
                <div className="course-item-image">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/ms-management-illinois/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50"
                    alt="course-img"
                  />
                </div>
                <div className="course-university">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40"
                    alt="university-img"
                    width="25px"
                    height="25px"
                  />
                  <span>University of Illinois Urbana-Champaign</span>
                </div>
                <p className="course-name">
                  Master of Science in Management (iMSM)
                </p>
                <div className="course-earn-degree">
                  <SchoolIcon />
                  <span>Earn a degree</span>
                </div>
                <p className="course-degree">Degree</p>
              </div>
              <div className="course-item">
                <div className="course-item-image">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/imsa/imsa-thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50"
                    alt="course-img"
                  />
                </div>
                <div className="course-university">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40"
                    alt="university-img"
                    width="25px"
                    height="25px"
                  />
                  <span>
                    Gies College of Business at the University of Illinois
                  </span>
                </div>
                <p className="course-name">Master's of Accounting (iMSA)</p>
                <div className="course-earn-degree">
                  <SchoolIcon />
                  <span>Earn a degree</span>
                </div>
                <p className="course-degree">Degree</p>
              </div>
              <div className="course-item">
                <div className="course-item-image">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/me-engineering-management-boulder/7f1ba63f-ce16-4c29-9690-557ac3eb3168.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50"
                    alt="course-img"
                  />
                </div>
                <div className="course-university">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40"
                    alt="university-img"
                    width="25px"
                    height="25px"
                  />
                  <span>University of Colorado Boulder</span>
                </div>
                <p className="course-name">
                  Master of Engineering in Engineering Management
                </p>
                <div className="course-earn-degree">
                  <SchoolIcon />
                  <span>Earn a degree</span>
                </div>
                <p className="course-degree">Degree</p>
              </div>
            </div>
          </div>
        ) : showContent === "About" ? (
          <div className="about-container">
            <p className="about-slogan">
              Unlock Your Potential, Illuminate Your Mind: Learners - Where
              Knowledge Meets Power!
            </p>
            <p className="about-title">We are a team of expert designers</p>
            <p className="about-detail">
              Welcome to Learners, your gateway to a world of boundless
              knowledge and transformative experiences. Dive into our curated
              collection of expertly designed courses, crafted by a team
              dedicated to igniting the spark of curiosity within you. Unleash
              your learning journey with the most powerful theme on earth, where
              education meets innovation. Embrace the art of learning, evolve
              with every lesson, and embark on a path of continuous growth. Join
              Learners today – where the pursuit of knowledge knows no limits.
            </p>
            <div className="about">
              <div className="about-item">
                <div className="about-item-image">
                  <img
                    src="https://images.unsplash.com/photo-1574100004472-e536d3b6bacc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
              </div>
              <div className="about-item">
                <div className="about-item-image">
                  <img
                    src="https://images.unsplash.com/photo-1574852859542-1b41217a7815?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
              </div>
              <div className="about-item">
                <div className="about-item-image">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1664280284972-97b2c423021b?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="faq-container">
            <p className="faq-title">FACTS & QUESTIONS</p>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "700" }}>
                  1. How do I enroll in a course on Learners?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ color: "#5175e0" }}>
                  To enroll in a course, simply navigate to the course page,
                  click on the "Enroll" button, and follow the prompts to create
                  an account or log in. Once registered, you can access the
                  course materials and begin your learning journey.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "700" }}>
                  2. What makes Learners' courses unique?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ color: "#5175e0" }}>
                  Learners' courses are crafted by a team of expert designers,
                  ensuring a powerful and engaging learning experience. Our
                  content is designed to be both comprehensive and accessible,
                  catering to learners of all levels.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "700" }}>
                  3. Are there any prerequisites for the courses?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ color: "#5175e0" }}>
                  Prerequisites vary depending on the course. You can find
                  detailed information about any prerequisites on the course
                  description page. If you have specific questions, our support
                  team is here to assist you.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "700" }}>
                  4. How can I track my progress in a course?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ color: "#5175e0" }}>
                  Learners provides a user-friendly interface that allows you to
                  track your progress seamlessly. Once enrolled, you can monitor
                  your completion status, access completed modules, and review
                  your achievements to ensure a rewarding learning experience.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "700" }}>
                  5. Is there a support system available if I have questions or
                  issues?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ color: "#5175e0" }}>
                  Absolutely! Learners is committed to providing excellent
                  support. If you have any questions, encounter technical
                  issues, or need assistance with course content, our support
                  team is ready to help. Contact us through the designated
                  support channels, and we'll promptly address your concerns.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default LandingPage;
