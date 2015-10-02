import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import path from 'path';

import config from './config/settings';

var app = express();

app.set('port', config.appPort || 3000);

// Enable CORS
app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname)));

// Controllers
import user from './controllers/user';
import measurement from './controllers/measurement';
import bills from './controllers/bills';

// Routing
app.use(config.apiUrl + 'user', user);
app.use(config.apiUrl + 'measurement', measurement);
app.use(config.apiUrl + 'bills', bills);

// Run the Express server
app.listen(app.get('port'), () =>
    console.log('Express server listening on port ' + app.get('port'))
);

export default app;