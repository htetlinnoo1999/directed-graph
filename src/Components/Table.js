import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CustomTable = ({routes}) => {
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
export default CustomTable;
