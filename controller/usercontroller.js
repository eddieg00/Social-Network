const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
      try {
        const userData = await User.find()
        res.status(200).json(userData)
      } catch (err) {
        res.status(500).json(err)
      }
    },
}