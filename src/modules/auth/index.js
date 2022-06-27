const router = require('express').Router();
const hasRole = require('../../middleware');
const { passwordIsMatch, getLoggedIn } = require('./service');

router.get('/', hasRole('user', 'admin'), async (req, res) => {
  const result = await getLoggedIn(req.user.id);
  res.status(result.code).json(result);
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const result = await passwordIsMatch(email, password);
  res.status(result.code).json(result);
});

module.exports = router;
