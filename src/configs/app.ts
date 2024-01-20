const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const rateLimit = {
  max: 500,
  timeWindow: '1 minute',
};

export { corsOptions, rateLimit };
