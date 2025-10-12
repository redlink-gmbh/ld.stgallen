const axios = require("axios")

function factory (router) {
    router.use(async (req, res, next) => {
        if(req.path !== '/gpt') return next()
        try {
            const query = req.query?.query;
            if (!query) {
                return res.status(400).json({ error: 'Missing query parameter "query"' });
            }

            // POST to your axios server
            const upstream = await axios.post(
                'https://ld.sg.ch/query',
                query,
                {headers: {
                    'Content-Type': 'application/sparql-query',
                    'Accept': 'application/json'
                }}
            );

            // Send back the upstream response
            res.status(upstream.status).send(upstream.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return res
                    .status(err.response?.status ?? 502)
                    .json({error: err.message, details: err.response?.data});
            }
            next(err);
        }
    })
}

module.exports = factory
