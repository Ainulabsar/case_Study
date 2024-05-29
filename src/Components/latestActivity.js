import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Paper, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

function LatestActivity() {
    const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("admin-db/jsons/Latest_Activity.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data.latest_activity);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}  >
      <h3>latest Activity</h3>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden", }}>
            <Box >
              <Stepper orientation="vertical" style={{padding:"15px"}}>
                {data.map((step, index) => (
                  <Step key={index} active>
                    <StepLabel>
                      <Typography align="left">{step.activity_type}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography align="left">{step.activity } -
                      <a href={step.readmore_link}  >Read More</a> </Typography>
                    </StepContent>
                  </Step>
                ))}  
              </Stepper>
            </Box>
          </Paper>
        )}
      </Box>
    </div>
  )
}

export default LatestActivity