import config from './config';

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', config.authName],
  credentials: true,
};

const expiresIn = new Date();
expiresIn.setHours(expiresIn.getHours() + 2); // 2 hours

const cookieOption = {
  secret: config.appKey,
  parseOptions: {
    path: '/',
    name: 'session',
    resave: true,
    saveUninitialized: true,
    expires: expiresIn,
    httpOnly: true,
    secure: config.development ? false : true,
    sameSite: config.development ? 'Lax' : 'Strict',
  },
};

const rateLimit = {
  max: 500,
  timeWindow: '1 minute',
};

export { cookieOption, corsOptions, rateLimit };
