import { Card, CardContent, CardMedia, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import { getList } from "../api/api";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eeeeee',
  },
  collection: {
    padding: 100
  },
  card: {
    width: 163,
    height: 330,
    margin: 5
  },
  category: {
    marginBottom: 30,
    overflow: 'auto',
    display: 'grid'
  },
  categoryTitle: {
    fontFamily: "Roboto, Arial, sans-serif;",
    fontWeight: 400,
    fontSize: 28,
    marginLeft: 5,
    marginBottom: 15,
  },
  title: {
    fontFamily: "Roboto, Arial, sans-serif;",
    fontWeight: 300,
    fontSize: 16,
    maxHeight: 72,
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  content: {
    padding: '7px 10px'
  },
  media: {
    width: '100%',
    height: '74%',
    '&:hover': {
      filter: 'brightness(.5)',
      cursor: 'pointer'
    }
  },
  movies: {
    flexWrap: 'nowrap',
    height: 350
  },
  page:{
    alignSelf: 'center',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: 300,
    fontSize: 18,
    paddingRight: 12
  },
  button:{
    margin: 5,
    minWidth: 'unset'
  }
});

export default function Home() {
  const classes = useStyles();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!data) {
      (async function iife() {
        let res = await getList(1);
        res = res && res.data.filter(i => i.type === 'Multi-Title-Manual-Curation');
        setData(res);
      })();
    }
  }, [data])

  const changePage = page => async () => {
    setPage(page);
    let res = await getList(page);
    res = res && res.data.filter(i => i.type === 'Multi-Title-Manual-Curation');
    setData(res);
  }

  const handleDetails = id => () => {
    id && window.location.assign(`/#/details?id=${id}`);
  }
  return <div className={classes.root}>
    <div className={classes.collection}>
      {data && data.map((category, i) =>
        <React.Fragment key={i}>
          <div className={classes.categoryTitle}>{category.row_name}</div>
          <Grid container className={classes.category}>
            <Grid container className={classes.movies}>
              {category.data.map((movie, j) =>
                <Card key={j} className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={movie.images.find(i => i.type === 'POSTER').url}
                    onClick={handleDetails(movie.id)}
                  />
                  <CardContent className={classes.content}>
                    <div className={classes.title} onClick={handleDetails(movie.id)}>
                      {movie.title}
                    </div>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      <Grid container justify='center'>
        <span className={classes.page}>Page</span>
        <Button className={classes.button} variant="contained" onClick={changePage(1)} disabled={page === 1} color="primary">1</Button>
        <Button className={classes.button} variant="contained" onClick={changePage(2)} disabled={page === 2} color="primary">2</Button>
      </Grid>
    </div>
  </div>;
}

