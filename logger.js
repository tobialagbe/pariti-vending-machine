module.exports = (app) => {
  const now = () => Date.now();

  app.addHook('onRequest', (req, reply, done) => {
    reply.startTime = now();
    req.log.info({ url: req.raw.url, id: req.id, body: req.body }), 'Request Received';
    done();
  });

  app.addHook('onResponse', (req, reply, done) => {
    req.log.info(
      {
        url: req.raw.url,
        statusCode: reply.raw.statusCode,
        durationMs: now() - reply.startTime,
      },

      'Request completed'
    );
    done();
  });
};
