import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const VerifyEmail = () => {
  const SuccessContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  });

  const IconContainer = styled("div")({
    marginBottom: "20px",
  });

  const TextContainer = styled("div")({
    textAlign: "center",
    marginBottom: "20px",
  });

  const ButtonContainer = styled("div")({
    textAlign: "center",
  });

  const StyledButton = styled(Button)({
    width: "240px",
    borderRadius: "20px",
    marginTop: "20px",
  });

  return (
    <SuccessContainer>
      <IconContainer>
        <CheckCircleIcon style={{ fontSize: 200, color: "#4CAF50" }} />
      </IconContainer>
      <TextContainer>
        <Typography variant="h2" style={{ fontSize: "2.5em" }}>
          Success!
        </Typography>
        <Typography variant="body1" style={{ fontSize: "1.5em" }}>
          Your account has been verified.
        </Typography>
      </TextContainer>
      <ButtonContainer>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <StyledButton
            variant="contained"
            sx={{
              bgcolor: "#5175e0",
              "&:hover": {
                bgcolor: "#5175e0",
              },
            }}
          >
            Login
          </StyledButton>
        </Link>
      </ButtonContainer>
    </SuccessContainer>
  );
};

export default VerifyEmail;
