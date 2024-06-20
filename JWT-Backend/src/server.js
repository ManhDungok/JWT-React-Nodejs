require('dotenv').config();
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
//import connection from './config/connectDB';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;

configCors(app);
configViewEngine(app);

//config view parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config cookie parser
app.use(cookieParser());

//test connection DB
//connection();

initWebRoutes(app);
initApiRoutes(app);

app.use(PORT, () => {
	console.log('Có lỗi gì đó !!!!! ');
});

app.listen(PORT, () => {
	console.log('>>> JWT Backend is running on the port = ' + PORT);
});
