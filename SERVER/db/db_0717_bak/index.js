// ────────────────────────────────────────────────────────── Require
const CURRENT_DIR = __dirname;
const app = require('./app');
const port = process.env.PORT || 5005;
const users = require('./routes/users');
const departments = require('./routes/departments');
const register = require('./routes/register');
const isDev = CURRENT_DIR.indexOf("C:") !== -1 ? `Dev is ${true}` : `Dev is ${false}`;

app.use('/users', users);
app.use('/departments', departments);
app.use('/register', register);

// ────────────────────────────────────────────────────────── 

app.listen(port, () => console.log(`${isDev}, Listening on PORT ${port}`));