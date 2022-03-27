import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Triangle } from "react-loader-spinner";

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        minHeight: 300,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Triangle color="#06BE8B" height={100} width={100} />
      <Typography sx={{ color: "#06BE8B" }}>Searching Routes....</Typography>
    </Box>
  );
};

export default LoadingComponent;
