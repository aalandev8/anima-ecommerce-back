const exampleController = {
  index: (req, res) => {
    res.json({
      message: "Example endpoint - list all examples",
      examples: [],
    });
  },

  store: (req, res) => {
    res.json({
      message: "Example endpoint - create new example",
      data: req.body,
    });
  },

  show: (req, res) => {
    const { id } = req.params;
    res.json({
      message: `Example endpoint - show example with id ${id}`,
      id: id,
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    res.json({
      message: `Example endpoint - update example with id ${id}`,
      id: id,
      data: req.body,
    });
  },

  destroy: (req, res) => {
    const { id } = req.params;
    res.json({
      message: `Example endpoint - delete example with id ${id}`,
      id: id,
    });
  },
};

module.exports = exampleController;
