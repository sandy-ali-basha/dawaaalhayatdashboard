import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";

export default function ControllableStates({ label, setWith_trashed }) {
  const options = ["Trashed"];
  const theme = useTheme();
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState(value);

  useEffect(() => {
    if (inputValue && setWith_trashed) {
      setWith_trashed(inputValue);
    } else {
      setWith_trashed(0);
    }
  }, [inputValue, setWith_trashed]);

  return (
    <div>
      <Autocomplete
        value={inputValue}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{
          width: 200,
          color: "text.main",
          options: { color: "#fff" },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            sx={{
              color: "#fff",
              label: { color: "text.main" },
              options: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.origin.main,
                },
              },
            }}
          />
        )}
      />
    </div>
  );
}
