const { Article } = require("../models");


const index = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json({
      success: true,
      data: articles,
      message: "Articles retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving articles",
      error: error.message
    });
  }
};

const store = async (req, res) => {
  try {
    const { title, content, author, category_id } = req.body;
    
    const article = await Article.create({
      title,
      content,
      author,
      category_id
    });

    res.status(201).json({
      success: true,
      data: article,
      message: "Article created successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating article",
      error: error.message
    });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    res.status(200).json({
      success: true,
      data: article,
      message: "Article retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving article",
      error: error.message
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, category_id } = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    await article.update({
      title: title || article.title,
      content: content || article.content,
      author: author || article.author,
      category_id: category_id || article.category_id
    });

    res.status(200).json({
      success: true,
      data: article,
      message: "Article updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating article",
      error: error.message
    });
  }
};


const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    await article.destroy();

    res.status(200).json({
      success: true,
      message: "Article deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting article",
      error: error.message
    });
  }
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy
};