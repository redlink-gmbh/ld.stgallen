function factory (router) {
    router.use((req, res, next) => {
        if(req.path === '/') {
            return res.redirect(
                '/sparql'
            )
        }

        next()
    })
}

module.exports = factory
