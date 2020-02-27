import React, { useState } from 'react';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import LinkDisplay from './components/LinkDisplay';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LocationSearchInput from './components/Search';

const useStyles = makeStyles({
  root: {
    width: '50em',
  },
  title: {
    fontSize: 26,
  },
  pos: {
    marginBottom: 12,
  },
});

const Home = () => {
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  console.log(endDate, startDate);
  const handleSubmit = event => {
    event.preventDefault();
    const obj = {
      title: event.target.title.value,
      brief: event.target.description.value,
      location: event.target.address.value,
      location_title: event.target.location.value,
      date: `${moment(startDate).format('MM/DD/YYYY')} - ${moment(
        endDate,
      ).format('MM/DD/YYYY')}`,
    };
    fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(obj),
    })
      .then(res => res.json())
      .then(data => {
        handleClickOpen();
        setUrl(data);
      });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url(' +
          'https://www.pixelstalk.net/wp-content/uploads/2016/04/Yosemite-wallpaper-night-wallpaper-HD.jpg' +
          ')',
      }}
    >
      <Typography variant="h3" align="center">
        {'Compost'}
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ marginBottom: '25px' }}>
          <Card className={classes.root}>
            <form onSubmit={handleSubmit}>
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  Create your adventure
                </Typography>
                <TextField
                  id="title"
                  style={{ width: '30vw' }}
                  variant="outlined"
                  placeholder="Title"
                  required
                />
                <TextField
                  style={{ margin: '10px 0 10px 0', width: '30vw' }}
                  id="description"
                  multiline
                  rows="4"
                  placeholder="Description"
                  variant="outlined"
                  required
                />
                <TextField
                  id="location"
                  style={{ width: '30vw', marginBottom: '15px' }}
                  variant="outlined"
                  placeholder="Location Title"
                  required
                />
                <LocationSearchInput />
                <div style={{ display: 'flex' }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="startDate"
                      minDate={new Date()}
                      label="Start Date"
                      value={startDate}
                      onChange={setStartDate}
                    />
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="endDate"
                      minDate={new Date()}
                      label="End Date"
                      value={endDate}
                      onChange={setEndDate}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <Button
                  style={{ marginTop: '10px' }}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Lets Go!
                </Button>
                <LinkDisplay url={url} open={open} handleClose={handleClose} />
              </CardContent>
            </form>
          </Card>
        </div>
        <div>
          <Card
            style={{
              width: '50em',
              height: '375px',
            }}
          ></Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
