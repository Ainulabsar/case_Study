import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from '@mui/material/Rating';
import TableContainer from "@mui/material/TableContainer";
const columns = [
  {
    id: "Name",
    label: "Name",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ProductCode",
    label: "Product Code",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Customer",
    label: "Customer",
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Status",
    label: "Status",
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Rating",
    label: "Rating",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];
function NewProducts() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("admin-db/jsons/New_Products.json")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data.new_products);
        setTableData(data.new_products);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Box component="main" id="boxmain" sx={{ flexGrow: 1, p: 3 }}>
      <h3>New Products</h3>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#1565c0",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData && tableData.length > 0 ? (
                    tableData.map((table, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          key={index}
                        >
                          <TableCell align="center">{table.name}</TableCell>
                          <TableCell align="center">
                            {table.product_code}
                          </TableCell>
                          <TableCell align="center">{table.customer}</TableCell>
                          <TableCell align="center" style={table.status === "In Stock" ? {color:"darkgreen"}:{color:"red"}}>{table.status}</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="simple-controlled"
                              value={table.rating}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default NewProducts;
