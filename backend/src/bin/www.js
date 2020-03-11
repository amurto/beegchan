import http from 'http';
import app from '../App';


const port = 5000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
// server.on('listening', onListening);

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     return val;
//   }

//   if (port >= 0) {
//     return port;
//   }

//   return false;
// }


// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   const addr = server.address();
//   const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
//   console.log('Listening on ' + bind);
// }
