import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Paper, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Slider from "@mui/material/Slider";

function ProjectSummary() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("admin-db/jsons/Project_Progress_Summary.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.project_progress_summary);
        setData(data.project_progress_summary);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h3>Progress Summary</h3>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Paper sx={{ width: "100%", overflow: "auto" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent:"space-around",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              {data.map((step, index) => {
                const sliderValue = parseFloat(step.percentage);

                return (
                  <Card key={index} sx={{ minWidth: "350px" }}>
                    <CardContent>
                      <Typography
                        sx={{ fontWeight: "bold", textAlign: "left" }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "1.5rem",
                          textAlign: "left",
                          marginTop: "0.5rem",
                        }}
                      >
                        {step.value} {step.percentage}
                      </Typography>
                      <Slider
                        defaultValue={parseInt(step.value) + sliderValue}
                        aria-label="Default"
                        max={step.value > 1000 ? 5000 : 1000}
                        valueLabelDisplay="auto"
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default ProjectSummary;
