import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Paper, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Slider from '@mui/material/Slider';

function SummaryWidjet() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("admin-db/jsons/summary.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data.summary);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
      <h3>Summary</h3>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Paper sx={{ width: "100%", overflow: "auto" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {data.map((step, index) => (
                <Card key={index} sx={{ width: "90%", margin: "1rem" }}>
                  <CardContent>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                      {step.title}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bolder', fontSize: '1.5rem', textAlign: 'left', marginTop: '0.5rem' }}>
                      {step.value}
                    </Typography>
                    <Typography sx={{ textAlign: 'left', marginTop: '0.5rem' }}>
                      {step.duration} ({step.year})
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default SummaryWidjet;
