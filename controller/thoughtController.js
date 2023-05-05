const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find()
      res.status(200).json(thoughtData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getThoughtById(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.id })

      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with that ID." })
        return;
      }

      res.status(200).json(thoughtData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body)

      const userData = await User.findOneAndUpdate({_id: req.params.userId}, {$push: {thoughts: thoughtData._id}}, {new:true})

      if(!userData) {
        res.status(404).json({message: "No user found with this ID"})
      }
      res.status(200).json(thoughtData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true })

      if (!thoughtData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(thoughtData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteThought(req, res) {
    try {
      const thoughtData = await User.findOneAndDelete({ _id: req.params.id })

      const userData = await User.findOneAndUpdate({_id: req.params.userId}, {$pull: {thoughts: req.thoughtData.thoughtId}}, {new:true})

      if (!userData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(thoughtData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async addReaction(req, res) {
    try {
      const reactionData = await User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { reactionId: req.params.reactionId } }, { new: true })

      if (!reactionData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(reactionData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteReaction(req, res) {
    try {
      const reactionData = await User.findOneAndUpdate({ _id: req.params.id }, { $pull: { reactions: {reactionId: req.params.reactionId} } }, { new: true })

      if (!reactionData) {
        res.status(404).json({ message: "No user found with that ID." })
        return;
      }

      res.status(200).json(reactionData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
};