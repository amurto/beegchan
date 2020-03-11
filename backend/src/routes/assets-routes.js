import { Router } from 'express';
import { check } from 'express-validator';

import { test } from '../controllers/assets-controllers';

const checkAuth = require('../middleware/check-auth');

const router = Router();

router.use(checkAuth);

router.post('/', test);

module.exports = router;