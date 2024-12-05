// routes/calendar.js
const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

router.get('/events', async (req, res) => {
  //authentication, ensures user gets/has tokens
  if (!req.isAuthenticated() || !req.user.accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //give access and give tokens
  const oauth2Client = new google.auth.OAuth2();
  const credentials = {
    access_token: req.user.accessToken
  };
  
  if (req.user.refreshToken) {
    credentials.refresh_token = req.user.refreshToken;  
    //refresh token
  }
  
  oauth2Client.setCredentials(credentials);

  //access goog api
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    //get events that are marked with q: value "DreamTrail"
    const response = await calendar.events.list({
      calendarId: 'primary',
      q,
      timeMin: new Date().toISOString(),
      //where to search (starts from today)
      maxResults: 20,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items.map(event => ({
      id: event.id,
      summary: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      description: event.description,
    }));

    res.json(events);  
    //this grabs the events and gives it to front
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: 'Error retrieving events' });
  }
});

module.exports = router;
