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
  async getUserById(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.id })

      if (!userData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body)
      res.status(200).json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true })

      if (!userData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.id })

      if (!userData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async addFriend(req, res) {
    try {
      const friendData = await User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { friends: req.params.friendId } }, { new: true })

      if (!friendData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(friendData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteFriend(req, res) {
    try {
      const friendData = await User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.params.friendId } }, { new: true })

      if (!friendData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(friendData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
};