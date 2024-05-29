import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Paper, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

function Whatsnew() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("admin-db/jsons/Whats_New.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data.what_new_items);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h3>Whats New</h3>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Box>
              <Stepper orientation="vertical" style={{ padding: "15px" }}>
                {data.map((step, index) => (
                  <Step key={index} active>
                    <StepLabel>
                      <Typography align="left">{step.created_by}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography align="left">{step.message}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default Whatsnew;
