import { Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import { getDetails } from "../api/api";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eeeeee',
  },
  collection: {
    padding: 100,
    paddingLeft: 200,
    paddingRight: 200
  },
  paper: {
    paddingBottom: 25
  },
  summary: {
    marginLeft: 25
  },
  title: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: 300,
    fontSize: 30,
  },
  releaseYear: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: 400,
    fontSize: 13,
    marginRight: 15
  },
  titleh1: {
    marginTop: 25,
    marginBottom: 10
  },
  body: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  description: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    lineHeight: '24px'
  },
  addInfo: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: 400,
    fontSize: 14,
  },
  link: {
    textDecoration: 'none',
    color: '#a52714',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
});

const CastAndCreditItem = ({ label, value: valueArray }) => {
  const classes = useStyles();
  const font = {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
    fontWeight: 300
  };
  return <Grid item style={{ padding: '10px 15px 10px 0' }} md={4} xs={12}>
    {valueArray &&
      <React.Fragment>
        <Grid
          style={{ ...font, marginBottom: 5 }}>
          {label}
        </Grid>
        <Grid
          style={font}>
          {valueArray.map((i, index) =>
            <a key={index} className={classes.link} href={`https://duckduckgo.com/?q=${i.replace(' ', '+')}`}>
              {i}{index < valueArray.length - 1 && ', '}
            </a>)
          }
        </Grid>
      </React.Fragment>
    }
  </Grid>
}

const AddInfoItem = ({ label, value }) => {
  const font = {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
    fontWeight: 300
  };
  return <Grid item style={{ padding: '10px 15px 10px 0' }} md={4} xs={12}>
    {value &&
      <React.Fragment>
        <Grid
          style={{ ...font, fontWeight: 500, marginBottom: 2 }}>
          {label}
        </Grid>
        <Grid
          style={font}>
          {value}
        </Grid>
      </React.Fragment>
    }
  </Grid>
}
export default function Details() {
  const classes = useStyles();
  const [data, setData] = useState();

  const milisec2roundMin = ms => {
    return Math.round(ms / (60 * 1000));
  }

  const renderCastAndCredit = () => {
    const types = data && data.data && data.data.people && [...new Set(data.data.people.map(i => i.role))]
    return types && <React.Fragment>
      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <span className={classes.addInfo}>CAST AND CREDITS</span>
      </div>
      <Grid container style={{ marginBottom: 30 }}>
        {types.map((i, index) =>
          <CastAndCreditItem key={index} label={i} value={data.data.people.filter(j => j.role === i).map(i => i.name)} />
        )}
      </Grid>
      <Divider />
    </React.Fragment>
  }

  useEffect(() => {
    if (!data) {
      (async function iife() {
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, async (_, key, value) => {
          if (key === 'id') {
            let x = await getDetails(value);
            console.log('d', x);
            setData(x);
          }
        })
      })();
    }
  }, [data])
  return <div className={classes.root}>
    {data && <div className={classes.collection} >
      <Paper elevation={3} className={classes.paper}>
        <Grid container>
          <img
            src={data.data.images.find(i => i.type === 'POSTER').url}
            alt={data.data.title}
            width="200"
            height="288"
          />
          <Grid item className={classes.summary}>
            <h1 className={classes.titleh1}><span className={classes.title}>{data.data.title}</span></h1>
            <div>
              <span className={classes.releaseYear}>{data.data.meta.releaseYear}</span>
              <span className={classes.releaseYear}>{data.data.running_time ? `${milisec2roundMin(data.data.running_time)} minutes` : ''}</span>
            </div>
          </Grid>
        </Grid>
        <Grid container className={classes.body}>
          <Grid container style={{ marginTop: 30, marginBottom: 30 }}>
            <span className={classes.description}>{data.data.description}</span>
          </Grid>
          <Grid container style={{ display: 'block' }}>
            <Divider />
            {renderCastAndCredit()}
            <div style={{ marginTop: 30, marginBottom: 30 }}>
              <span className={classes.addInfo}>ADDITIONAL INFORMATION</span>
            </div>
            <Grid container>
              <AddInfoItem label='Audio Language' value={data.data.audios && data.data.audios.join(', ')} />
              <AddInfoItem label='Subtitles' value={data.data.languages && data.data.languages.join(', ')} />
              <AddInfoItem label='Run time' value={data.data.running_time && data.data.running_time ? `${milisec2roundMin(data.data.running_time)} minutes` : ''} />
              <AddInfoItem label='Rating' value={data.data.meta && data.data.meta.ageRating} />
              <AddInfoItem label='Genre' value={data.data.tags && data.data.tags.map(i => i.label).join(', ')} />
              <AddInfoItem label='Seasons' value={data.data.seasons && data.data.seasons.join(', ')} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>}
  </div>;
}

