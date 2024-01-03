import { Grid } from "@mui/material";
const Home = () => {
  return (
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
          Learner is a education platform where you can know about learning,
          provide information related to various academic subjects and skill
          development.
        </p>
        {/* <div className="landing-page-form">
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
        </div> */}
      </Grid>
      <Grid item xs={12} md={6} className="landing-page-content-right">
        <div className="landing-page-image">
          <img
            onClick={(e) => e.preventDefault()}
            // src="http://localhost:3000/LOGO1.PNG"
            src={`${process.env.REACT_APP_CLIENT_BASE_URL}/LOGO1.PNG`}
            alt="Learners-img"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
