import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const FAQS = () => {
  return (
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
            To enroll in a course, simply navigate to the course page, click on
            the "Enroll" button, and follow the prompts to create an account or
            log in. Once registered, you can access the course materials and
            begin your learning journey.
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
            ensuring a powerful and engaging learning experience. Our content is
            designed to be both comprehensive and accessible, catering to
            learners of all levels.
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
            Prerequisites vary depending on the course. You can find detailed
            information about any prerequisites on the course description page.
            If you have specific questions, our support team is here to assist
            you.
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
            Learners provides a user-friendly interface that allows you to track
            your progress seamlessly. Once enrolled, you can monitor your
            completion status, access completed modules, and review your
            achievements to ensure a rewarding learning experience.
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
            Absolutely! Learners is committed to providing excellent support. If
            you have any questions, encounter technical issues, or need
            assistance with course content, our support team is ready to help.
            Contact us through the designated support channels, and we'll
            promptly address your concerns.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQS;
