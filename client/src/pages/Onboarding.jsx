import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

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

const skills = ["project management", "design"];

const fields = ["front-end Development", "back-end Development", "Dev-ops"];

const experienceLevels = ["0-1", "2-5", "5+", "8+"];

const professions = ["Student", "Full-time Employee", "Part-time Employee"];

const Onboarding = () => {
  const [personName, setPersonName] = React.useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [field, setFields] = useState([]);
  const [experience, setExperience] = useState("");
  const [profession, setProfession] = useState("");

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
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <>
      <Card className="CardContainer" sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="logo"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
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
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="Age"
          variant="outlined"
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="City"
          variant="outlined"
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="Goals"
          variant="outlined"
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="Profile picture link"
          variant="outlined"
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="About me"
          variant="outlined"
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="Experience"
          variant="outlined"
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="github"
          variant="outlined"
        />
        <TextField
          className="TextField"
          id="outlined-basic"
          label="linkedin"
          variant="outlined"
        />
        <FormControl className="FormControl" sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-multiple-name-label">
            Programming Languages{" "}
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleLanguage}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {programming_languages.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="FormControl" sx={{ m: 1, width: 250 }}>
          <InputLabel id="skills-label">Skills</InputLabel>
          <Select
            labelId="skills-label"
            id="skills"
            multiple
            value={selectedSkills}
            onChange={handleSkills}
            label="Skills"
          >
            {skills.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="FormControl" sx={{ m: 1, width: 250 }}>
          <InputLabel id="tech_fields-label">Tech Fields</InputLabel>
          <Select
            labelId="tech_field-label"
            id="fields"
            multiple
            value={field}
            onChange={handleFields}
            label="Tech Fields"
          >
            {fields.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 250 }}>
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
        <br />
        <br />
        <FormControl sx={{ m: 1, width: 250 }}>
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
        <CardActions>
          <Button className="Button" size="small">
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Onboarding;
