import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import TemperamentList from "../../components/TemperamentList";

import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  spaceTop: { 
    padding: theme.spacing(2), 
  },
  cardSpace: {
    marginBottom: theme.spacing(2)
  },
  cardMedia: {
    height: 250
  }
}));

const Home = () => {
  const classes = useStyles();
  const [breads, setBreads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api()
      .get("breads")
      .then(({ data }) => {
        setBreads(data);
        setLoading(false);
      });
  }, [breads.length]);

  return (
    <Grid container spacing={3} className={classes.spaceTop}>
      <Grid item xs={12}>
        {loading ? <LinearProgress /> : ""}
        {!loading && breads.map((bread) => {
          return (
            <Link
              key={bread.id}
              to={{
                pathname: `/visualizar/${bread.id}`,
              }}
            >
              <Card className={classes.cardSpace}>
                <CardActionArea>
                  <CardMedia
                    image={`/static/images/${bread.id}.jpg`}
                    title={bread.name}
                    className={classes.cardMedia}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {bread.name}
                    </Typography>
                    <TemperamentList temperament={bread.temperament} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Home;
