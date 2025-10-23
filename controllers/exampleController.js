const exampleController = {
  index: (req, res) => {
    res.status(200).json({
      success: true,
      message: "List of examples",
      data: [],
    });
  },

  store: (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Field 'name' is required",
      });
    }
    res.status(201).json({
      success: true,
      message: "Example created",
      data: req.body,
    });
  },

  show: (req, res) => {
    const { id } = req.params;
    res.status(200).json({
      success: true,
      message: `Show example with id ${id}`,
      data: { id },
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    res.status(200).json({
      success: true,
      message: `Update example with id ${id}`,
      data: req.body,
    });
  },

  destroy: (req, res) => {
    const { id } = req.params;
    res.status(200).json({
      success: true,
      message: `Deleted example with id ${id}`,
      data: { id },
    });
  },
};

module.exports = exampleController;
