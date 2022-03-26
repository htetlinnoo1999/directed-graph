import {
  Box,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";
import { CalculateRouteCost } from "./RouteFinder";

function App() {
  const [formData, setFormData] = useState("");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchRoute = async () => {
    setLoading(true);
    const data = await CalculateRouteCost(formData);
    setRoutes(data);
    setLoading(false);
  };

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

  const CustomTableComponent = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Routes</TableCell>
              <TableCell />
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {routes.route ? (
                <>
                  <TableCell colSpan={2}>{routes.route}</TableCell>
                  <TableCell />
                  <TableCell>{routes.cost}</TableCell>
                </>
              ) : (
                <TableCell colSpan={3}>{routes}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <div className="App">
      <Card className="Input-card">
        <Box className="Input-container" sx={{ width: "70%" }}>
          <Typography component="div" sx={{ pr: 3 }} variant="h5">
            Enter delivery route :
          </Typography>
          <TextField
            name="from"
            onChange={(e) => setFormData(e.target.value)}
            value={formData.from}
          />
        </Box>

        {/* <Box className="Input-container">
          <Typography component="div" sx={{ pr: 3 }} variant="h5">
            To :
          </Typography>
          <TextField
            name="to"
            value={formData.to}
            onChange={(e) => handleChange(e)}
          />
        </Box> */}
        <Box sx={{ paddingTop: 4 }}>
          <Button
            variant="outlined"
            color="success"
            endIcon={<SearchIcon />}
            onClick={handleSearchRoute}
          >
            Search
          </Button>
        </Box>
      </Card>

      <Box
        sx={{
          width: "60%",
          borderRadius: 3,
          marginTop: 5,
        }}
      >
        {loading ? <LoadingComponent /> : <CustomTableComponent />}
      </Box>
    </div>
  );
}

export default App;
