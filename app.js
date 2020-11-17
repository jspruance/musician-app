const express = require('express');
const path = require('path');
const store = require('./store/datastore');
const initialStoreData = require('./store/data');
const Musician = require('./models/musician');
const musicianRoutes = require('./routes/musician');

const app = express();
const port = process.env.PORT || 3001;

// include routes
app.use('/musician', musicianRoutes);

app.use(express.static('public'));

// Index route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// initialize store
const musician = new Musician(store);
musician.initStore(initialStoreData);
app.locals.musician = musician;

// start server
const server = app.listen(port, () => {
  console.log("Server started on port " + port);
});

module.exports = server;
// app.js: register the route. In our case, we don't want authorization for this route
app.use('/healthcheck', require('./routes/healthcheck.routes'));


// healthcheck.routes.js: return a 2xx response when your server is healthy, else send a 5xx response
import express from 'express';

const router = express.Router({});
router.get('/', async (_req, res, _next) => {
	// optional: add further things to check (e.g. connecting to dababase)
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});
// export router with all routes included
module.exports = router;


// healthcheck.spec.js (services like Pingdom or Freshping do a similar approach to check whether your server is healthy)
describe('Healthcheck', () => {

	it('returns 200 if server is healthy', async () => {
		const res = await get(`/healthcheck`, null)
			.expect(200);
		expect(res.body.uptime).toBeGreaterThan(0);
	});

});
