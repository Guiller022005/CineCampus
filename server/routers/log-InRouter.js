const router = require('express').Router();
const log_In_1V1 = require('../version/login-InV1');
const layout = require('../views/log-InView');

router.use(layout);
router.use("/v1", log_In_1V1)

module.exports = router;