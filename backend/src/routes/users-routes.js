import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, signup, login } from '../controllers/users-controllers';

const router = Router();

// router.get('/', getUsers);

router.post(
  '/signup',
  signup
);
router.get("/", (req, res)=>{res.json({hello: true});})
router.post('/login', login);

module.exports = router;
