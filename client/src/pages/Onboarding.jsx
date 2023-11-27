import React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import "./Onboarding.css";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const programming_languages = [
  "Javascript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "C#",
  "Kotlin",
  "PHP",
  "Rust",
  "R",
  "Swift",
  "SQL",
];

const goals = [
  "Contribute to open-source projects",
  "Participate in hackathons",
  "Build a professional network",
  "Learn new technologies",
  "Collaborate with other developers",
  "Showcase personal projects",
  "Stay updated on industry trends",
];

const skills = [
  "project management",
  "design",
  "data analysis",
  "UI/UX design",
  "agile methodology",
  "team collaboration",
];
const fields = [
  "front-end Development",
  "back-end Development",
  "Dev-ops",
  "database administration",
  "cloud computing",
  "security",
  "mobile app development",
  "full-stack development",
  "networking",
  "game development",
  "blockchain",
  "data science",
  "testing and QA",
  "AI and machine learning",
  "UI/UX design",
  "project management",
  "system administration",
  "business analysis",
  "IT consulting",
];
const experienceLevels = ["0-1", "2-5", "5+", "8+"];

const professions = ["Student", "Full-time Employee", "Part-time Employee"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = React.useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [field, setFields] = useState([]);
  const [experience, setExperience] = useState("");
  const [profession, setProfession] = useState("");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [city, setCity] = useState("");
  const [picture, setPicture] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleOnboardingSubmit = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const userId = queryParams.get("userId");

      const response = await fetch("http://localhost:5002/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          age,
          city,
          picture,
          aboutme,
          github,
          linkedin,
          language,
          selectedGoals,
          selectedSkills,
          field,
          experience,
          profession,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.message);
      navigate(`/matchpage?userId=${userId}`);
    } catch (error) {
      console.error("Onboarding failed", error);
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleAge = (event) => {
    setAge(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  const handleAboutme = (event) => {
    setAboutme(event.target.value);
  };
  const handleGithub = (event) => {
    setGithub(event.target.value);
  };
  const handleLinkedin = (event) => {
    setLinkedin(event.target.value);
  };
  const handlePicture = (event) => {
    setPicture(event.target.value);
  };
  const handleSkills = (event) => {
    setSelectedSkills(event.target.value);
  };

  const handleFields = (event) => {
    setFields(event.target.value);
  };

  const handleExperience = (event) => {
    setExperience(event.target.value);
  };

  const handleProfession = (event) => {
    setProfession(event.target.value);
  };

  const handleLanguage = (event) => {
    const {
      target: { value },
    } = event;
    setLanguage(typeof value === "string" ? value.split(",") : value);
  };
  const handleGoal = (event) => {
    setSelectedGoals(event.target.value);
  };

  return (
    <div className="CardContainer">
      <div className="onboarding-card">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Welcome to DevSwipe
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please fill out the form
          </Typography>
        </CardContent>
        <TextField
          className="TextField"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={handleName}
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="Age"
          variant="outlined"
          onChange={handleAge}
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="City"
          variant="outlined"
          onChange={handleCity}
        />

        <TextField
          className="TextField"
          id="outlined-basic"
          label="Profile picture link"
          variant="outlined"
          onChange={handlePicture}
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="About me"
          variant="outlined"
          onChange={handleAboutme}
        />

        <TextField
          className="TextField"
          id="outlined-basic"
          label="github"
          variant="outlined"
          onChange={handleGithub}
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="linkedin"
          variant="outlined"
          onChange={handleLinkedin}
        />
        <FormControl className="FormControl">
          <InputLabel id="demo-multiple-name-label">
            Programming Languages{" "}
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={language}
            onChange={handleLanguage}
            input={<OutlinedInput label="Programming Lnaguages" />}
            MenuProps={MenuProps}
          >
            {programming_languages.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl className="FormControl">
          <InputLabel id="demo-multiple-name-label">Your Goals </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selectedGoals}
            onChange={handleGoal}
            input={<OutlinedInput label="Goals" />}
            MenuProps={MenuProps}
          >
            {goals.map((goal) => (
              <MenuItem key={goal} value={goal}>
                {goal}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <FormControl className="FormControl">
          <InputLabel id="profession-label">Your Goals!</InputLabel>
          <Select
            labelId="goal-label"
            id="goal"
            value={selectedGoals}
            onChange={handleGoal}
            label="Goal"
          >
            {goals.map((goal) => (
              <MenuItem key={goal} value={goal}>
                {goal}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="FormControl">
          <InputLabel id="skills-label">Skills</InputLabel>
          <Select
            labelId="skills-label"
            id="skills"
            multiple
            value={selectedSkills}
            onChange={handleSkills}
            label="Skills"
            MenuProps={MenuProps}
          >
            {skills.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="FormControl">
          <InputLabel id="tech_fields-label">Tech Fields</InputLabel>
          <Select
            labelId="tech_field-label"
            id="fields"
            multiple
            value={field}
            onChange={handleFields}
            label="Tech Fields"
            MenuProps={MenuProps}
          >
            {fields.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="FormControl">
          <InputLabel id="experience-label">Experience</InputLabel>
          <Select
            labelId="experience-label"
            id="experience"
            value={experience}
            onChange={handleExperience}
            label="Experience"
          >
            {experienceLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="FormControl">
          <InputLabel id="profession-label">Profession</InputLabel>
          <Select
            labelId="profession-label"
            id="profession"
            value={profession}
            onChange={handleProfession}
            label="Profession"
          >
            {professions.map((prof) => (
              <MenuItem key={prof} value={prof}>
                {prof}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <CardActions>
          <Button
            className="Button"
            size="medium"
            variant="contained"
            onClick={handleOnboardingSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </div>
    </div>
  );
};

export default Onboarding;
