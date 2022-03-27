import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { CalculateRouteCost, FindAllPaths } from "./RouteFinder";
import Toast from "./Components/toast";

function App() {
  const [formData, setFormData] = useState("");
  const [max, setMax] = useState(10);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const nodeLimit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSearchRoute = async (key) => {
    setLoading(true);
    let data;
    if (key === "cost") {
      data = await CalculateRouteCost(formData);
    } else {
      data = await FindAllPaths(formData, max);
    }
    if (typeof data !== "object") {
      setToast({
        open: true,
        message: data,
        severity: "error",
      });
    } else {
      setRoutes(data);
      setToast({
        open: true,
        message: "Process completed successfully.",
        severity: "success",
      });
    }
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
              <TableCell>{routes.cost ? "Cost" : "Path Count"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {typeof routes === "object" && (
                <>
                  <TableCell colSpan={2}>{routes.route}</TableCell>
                  <TableCell />
                  <TableCell>
                    {routes.cost ? routes.cost : routes.totalPaths}
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <div className="App">
      <Toast toast={toast} setToast={setToast} />
      <Card className="Input-card">
        <Box className="Input-container" sx={{ width: "60%" }}>
          <Typography component="div" sx={{ pr: 3 }} variant="h5">
            Enter delivery route :
          </Typography>
          <TextField
            name="from"
            onChange={(e) => setFormData(e.target.value)}
            value={formData.from}
          />
        </Box>

        <Box sx={{ width: "10%" }} className="Input-container">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Max</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={max}
              label="Age"
              onChange={(e) => setMax(e.target.value)}
            >
              {nodeLimit.map((limit) => (
                <MenuItem value={limit}>{limit}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="success"
            endIcon={<SearchIcon />}
            onClick={() => handleSearchRoute("cost")}
          >
            Find Cost
          </Button>

          <Button
            sx={{ marginTop: 1 }}
            variant="outlined"
            endIcon={<SearchIcon />}
            onClick={() => handleSearchRoute("path")}
          >
            Find Paths
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
