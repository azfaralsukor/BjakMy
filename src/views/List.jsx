import { Card, CardContent, CardMedia, Grid } from '@material-ui/core';
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
});

export default function Home() {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    if (!data) {
      (async function iife() {
        let x = await getList();
        x = x.data.filter(i => i.type === 'Multi-Title-Manual-Curation');
        console.log('x', x);
        setData(x);
      })();
    }
  }, [data])
  return <div className={classes.root}>
    <div className={classes.collection}>
      {data && data.map((category, i) =>
        <React.Fragment>
          <div className={classes.categoryTitle}>{category.row_name}</div>
          <Grid container key={i} className={classes.category}>
            <Grid container className={classes.movies}>
              {category.data.map((movie, j) =>
                <Card key={j} className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={movie.images.find(i => i.type === 'POSTER').url}
                    onClick={() => alert('cyka')}
                  />
                  <CardContent className={classes.content}>
                    <div className={classes.title} onClick={() => alert('blyat')}>
                      {movie.title}
                    </div>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  </div>;
}

