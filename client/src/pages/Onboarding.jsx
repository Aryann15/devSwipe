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

const Onboarding = () => {
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <>
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
        <TextField id="outlined-basic" label="City" variant="outlined" />
        <TextField id="outlined-basic" label="Goals" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Profile picture link"
          variant="outlined"
        />
        <TextField id="outlined-basic" label="About me" variant="outlined" />
        <TextField id="outlined-basic" label="Experience" variant="outlined" />
        <TextField id="outlined-basic" label="github" variant="outlined" />
        <TextField id="outlined-basic" label="linkedin" variant="outlined" />
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleChange}
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
        <CardActions>
          <Button size="small">Submit</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Onboarding;
