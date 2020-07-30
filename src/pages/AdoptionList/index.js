import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Grid, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { removeFromAdoptionList } from "../../store/reducers/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  closeIcon: {
    float: "right",
    cursor: "pointer",
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: theme.spacing(3),
    display: 'block'
  },
  media: { 
    width: "100%", 
    height: 100, 
    margin: theme.spacing(1), 
    borderRadius: 5
  },
}));

const AdoptionList = () => {
  const dispatch = useDispatch();
  const { adoptions } = useSelector((state) => state.adoptions);
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRemove = async (e, index) => {
    await swal({
      title: "Confirma a remoção?",
      buttons: ["Não", "Sim"],
      dangerMode: true,
    }).then((ok) => {
      if (ok) {
        setOpenSnackbar(true);
        dispatch(removeFromAdoptionList(index));
      }
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={3} style={{ padding: 20 }}>
      <Grid item xs={12}>
        {adoptions?.length === 0 ? (
          <h2>Sua lista de adoção está vazia.</h2>
        ) : (
          <h2>Sua lista de adoção.</h2>
        )}
        {adoptions?.map((bread, index) => {
          return (
            <Card raised key={index} className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <CardMedia
                    className={classes.media}
                    image={`/static/images/${bread.id}.jpg`}
                    title={bread.name}
                  />
                </Grid>
                <Grid item xs={7}>
                  <CloseIcon
                    className={classes.closeIcon}
                    fontSize="small"
                    onClick={(e) => handleRemove(e, index)}
                  />
                  <span className={classes.title}>{bread.name}</span>
                </Grid>
              </Grid>
            </Card>
          );
        })}
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
            Removido da lista de adoção.
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default AdoptionList;
