import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import { useState } from "react";
import { CalculateRouteCost, FindAllPaths } from "./RouteFinder";
import Toast from "./Components/Toast";
import TableComponent from "./Components/Table";
import LoadingComponent from "./Components/Loading";

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
        {loading ? <LoadingComponent /> : <TableComponent routes={routes} />}
      </Box>
    </div>
  );
}

export default App;
