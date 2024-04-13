"use client";

import { createTheme } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export default createTheme({
  palette: {
    primary: {
      main: "#3E5BA6",
    },
    secondary: {
      main: "##a6893e",
    },
    success: {
      main: "##3e90a6 ",
    },
  },
  components: {
    MuiAlert: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        fullWidth: true,
      },
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});
