import { Button, Divider, Grid, Paper } from '@material-ui/core';
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
  itemGrid: {
    padding: '10px 15px 10px 0'
  },
  font: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
    fontWeight: 300
  },
  section: {
    marginTop: 30
  },
  descriptionContainer: {
    marginTop: 30,
    marginBottom: 30
  },
  castAndCreditContainer: {
    margin: '20px 10px 30px 0'
  },
  details: {
    display: 'block',
  },
  type: {
    backgroundColor: 'yellow',
    padding: 5
  },
  homeButton: {
    marginBottom: 10
  }
});

export default function Details() {
  const classes = useStyles();
  const [data, setData] = useState();

  const milisec2roundMin = ms => {
    const runtime = Math.round(ms / (60 * 1000))
    return `${runtime} minute${runtime > 1 ? 's' : ''}`;
  }

  const CastAndCreditItem = ({ label, value: valueArray }) => {
    return <Grid item className={classes.itemGrid} md={4} xs={12}>
      {valueArray &&
        <React.Fragment>
          <Grid className={classes.font}
            style={{ marginBottom: 5 }}>
            {label}
          </Grid>
          <Grid className={classes.font}>
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
    return value ? <Grid item className={classes.itemGrid} style={{ padding: '10px 15px 10px 0' }} md={4} xs={12}>
      <React.Fragment>
        <Grid className={classes.font}
          style={{ fontWeight: 500, marginBottom: 2 }}>
          {label}
        </Grid>
        <Grid className={classes.font}>
          {value}
        </Grid>
      </React.Fragment>
    </Grid> : ''
  }

  const renderCastAndCredit = () => {
    const types = data && data.data && data.data.people && [...new Set(data.data.people.map(i => i.role))]
    return types.length ? <React.Fragment>
      <div className={classes.section}>
        <span className={classes.addInfo}>CAST AND CREDITS</span>
      </div>
      <Grid container className={classes.castAndCreditContainer}>
        {types.map((i, index) =>
          <CastAndCreditItem key={index} label={i} value={data.data.people.filter(j => j.role === i).map(i => i.name)} />
        )}
      </Grid>
      <Divider />
    </React.Fragment> : ''
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
    {data && <div className={classes.collection}>
      <Button className={classes.homeButton} onClick={() => window.location.assign('/')}>{'< Home'}</Button>
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
              <span className={classes.releaseYear}>{data.data.running_time ? milisec2roundMin(data.data.running_time) : ''}</span>
            </div>
            <h5><span className={classes.type}>{data.data.as}</span></h5>
          </Grid>
        </Grid>
        <Grid container className={classes.body}>
          <Grid container className={classes.descriptionContainer}>
            <span className={classes.description}>{data.data.description}</span>
          </Grid>
          <Grid container className={classes.details}>
            <Divider />
            {renderCastAndCredit()}
            <div className={classes.section}>
              <span className={classes.addInfo}>ADDITIONAL INFORMATION</span>
            </div>
            <Grid container>
              <AddInfoItem label='Audio Language' value={data.data.audios && data.data.audios.join(', ')} />
              <AddInfoItem label='Subtitles' value={data.data.languages && data.data.languages.join(', ')} />
              <AddInfoItem label='Run time' value={data.data.running_time && data.data.running_time ? milisec2roundMin(data.data.running_time) : ''} />
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

