import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import api from "../../services/api";
import TemperamentList from "../../components/TemperamentList";
import { addToAdoptionList } from "../../store/reducers/actions";

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


const Post = () => {
  const { id } = useParams();

  const classes = useStyles();
  const dispatch = useDispatch();

  const [bread, setBread] = useState({});
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAdoption = () => {
    dispatch(addToAdoptionList(bread));
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    setLoading(true);
    api()
      .get(`breads/${id}`)
      .then(({ data }) => {
        setBread(data);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [bread.id]);

  return (
    <Grid container spacing={3} className={classes.spaceTop}>
      <Grid item xs={12}>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <h2>Detalhes</h2>
            <Card className={classes.cardSpace} raised>
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
                <Typography variant="h5" component="h3">
                  Características
                </Typography>
                <List component="ul" aria-label="main mailbox folders">
                  <ListItem>
                    <ListItemText primary="Idade" secondary={bread.life_span} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Objetivo da Criação"
                      secondary={bread.bred_for}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Grupo da raça"
                      secondary={bread.breed_group}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Peso"
                      secondary={
                        <>
                          <span>Imperial: {bread.weight?.imperial}</span>
                          <br />
                          <span>Métrica: {bread.weight?.metric}</span>
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Tamanho"
                      secondary={
                        <>
                          <span>Imperial: {bread.height?.imperial}</span>
                          <br />
                          <span>Métrica: {bread.height?.metric}</span>
                        </>
                      }
                    />
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  color="primary"
                  onClick={handleAdoption}
                >
                  Adotar
                </Button>
              </CardContent>
            </Card>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
            >
              <Alert
                elevation={6}
                variant="filled"
                onClose={handleCloseSnackbar}
                severity="success"
              >
                Adicionado na lista de adoção.
              </Alert>
            </Snackbar>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Post;
