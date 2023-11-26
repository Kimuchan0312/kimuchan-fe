import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#F8F8F8", // Light gray
  light: "#ECD3D3", // 
  main: "#000000", // Dark gray
  dark: "#464141", // Black
  contrastText: "#0000", // White
};
const SECONDARY = {
  lighter: "#F8F8F8", // Light gray
  light: "#3366FF", // Blue
  main: "#464141", // Dark gray
  dark: "#000000", // Black
  contrastText: "#0000", // White
};
const SUCCESS = {
  lighter: "#E9FCD4", // Light green
  light: "#54D62C", // Green
  main: "#111111", // Dark gray
  dark: "#000000", // Black
  contrastText: "#0000", // White
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: "Inter",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 500,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 400,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 400,
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 400,
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      h6: {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;