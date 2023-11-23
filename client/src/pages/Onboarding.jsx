import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

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

const programmingLanguages = [
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
const techFields = ["front-end Development", "back-end Development", "Dev-ops"];

const Onboarding = () => {
  const [personName, setPersonName] = useState([]);
  const [age, setAge] = useState("");

  const handleSkills = (event) => {
    setAge(event.target.value);
  };

  const handleLanguage = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
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
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <TextField id="outlined-basic" label="Age" variant="outlined" />
      {/* Add other input fields */}
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="programming-languages-label">
          Programming Languages
        </InputLabel>
        <Select
          labelId="programming-languages-label"
          id="programming-languages"
          multiple
          value={personName}
          onChange={handleLanguage}
          input={<OutlinedInput label="Programming Languages" />}
          MenuProps={MenuProps}
        >
          {programmingLanguages.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel id="skills-label">Skills</InputLabel>
        <Select
          labelId="skills-label"
          id="skills"
          value={age}
          onChange={handleSkills}
          autoWidth
          label="Skills"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* Add other skill options */}
        </Select>
      </FormControl>
      <CardActions>
        <Button size="small">Submit</Button>
      </CardActions>
    </Card>
  );
};

export default Onboarding;
