import GlobalStyles from "@mui/material/GlobalStyles";

export const GlobalStyle = () => (
  <GlobalStyles
    styles={{
      body: {
        overflowX: "hidden",
      },
      ".table-scroll": {
        "::-webkit-scrollbar": {
          width: 5,
          height: 10,
        },

        " ::-webkit-scrollbar-track ": {},

        "::-webkit-scrollbar-thumb ": {
          background: "lightgray",
          borderRadius: " 10px",
        },
      },
      ".input-style": {
        zIndex: 1000,
        color: "#fff !important",
      },
      "#controllable-states-demo": {
        
        ":optional": {
          color: "rgb(145, 158, 171)",
          
        },
        ":params": {
          color: "rgb(145, 158, 171)",
        },
      },
      "#controllable-states-demo-listbox": {
        backgroundColor: "lightgray",
        zIndex: 10000,
        
        
        
      },
    }}
  />
);
