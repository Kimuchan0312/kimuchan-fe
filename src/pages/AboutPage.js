import { Container, Typography, Paper, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import RepeatIcon from "@mui/icons-material/Repeat";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h2" gutterBottom>
          About Us
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>
          <strong>Kimuchan: A Japanese Learning App Overview</strong>
          <br />
          こんにちは (Konnichiwa)! Welcome to Kimuchan, your go-to web app for
          mastering the Japanese language. From vocabulary to reading tests,
          we're your one-stop location for all things Japanese.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Real JLPT Practice</strong> <SchoolIcon />
          <br />
          One of the standout features of Kimuchan is the dedicated practice
          tests for JLPT (Japanese Language Proficiency Test) levels. Whether
          you're eyeing N5 or striving for N1, we've got your back!
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Realistic Test Scenarios:</strong> <CheckCircleOutlineIcon />
          <br /> Practice with authentic JLPT Reading tests that closely follow
          the official JLPT format.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Level-Specific Content:</strong> <EmojiObjectsIcon /> <br />
          Tackling N5? Or perhaps challenging N2? Our questions adapt to your
          chosen JLPT level.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Score and Answer Explanations</strong> <AssessmentIcon />
          <br />
          After completing our JLPT practice tests, you can review your scores
          and access detailed answer explanations.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Unlimited Retakes:</strong> <RepeatIcon /> <br />
          Yes, you read that right! Take the tests as many times as you want
          until you feel confident.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" paragraph>
          <strong>Free to Use</strong> <FreeBreakfastIcon />
          <br />
          Our online JLPT practice tests are always free, supporting your
          Japanese language journey for study, work, and beyond.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" paragraph>
          <strong>Boost Your JLPT Proficiency</strong> <TrendingUpIcon />
          <br />
          Our online JLPT practice tests are created to help learners enhance
          their Japanese language skills and achieve their JLPT goals.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h4" gutterBottom>
          FAQs
        </Typography>
        <Accordion>
          <AccordionSummary >
            <Typography>Is Kimuchan beginner-friendly?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, we cater to learners of all levels.
            </Typography>
          </AccordionDetails>
          <AccordionSummary >
            <Typography>Can I practice for the JLPT exams?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Absolutely! Our JLPT Reading Tests feature offers a free and realistic
          practice environment to help you prepare effectively for your exams.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
}

export default AboutPage;
