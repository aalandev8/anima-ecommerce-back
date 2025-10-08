const { body, param, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

const validateCategory = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ max: 100 })
    .withMessage("El nombre no debe exceder 100 caracteres")
    .trim(),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no debe exceder 500 caracteres")
    .trim(),
  handleValidationErrors,
];

const validateCategoryUpdate = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("El nombre no debe exceder 100 caracteres")
    .trim(),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no debe exceder 500 caracteres")
    .trim(),
  handleValidationErrors,
];

const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ max: 150 })
    .withMessage("El nombre no debe exceder 150 caracteres")
    .trim(),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("La descripción no debe exceder 1000 caracteres")
    .trim(),
  body("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage("El precio debe ser un número decimal válido")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  body("stock")
    .notEmpty()
    .withMessage("El stock es requerido")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero positivo"),
  body("category_id")
    .notEmpty()
    .withMessage("La categoría es requerida")
    .isInt()
    .withMessage("El ID de categoría debe ser un número entero"),
  body("image_url").optional().isURL().withMessage("La URL de la imagen debe ser válida"),
  handleValidationErrors,
];

const validateProductUpdate = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ max: 150 })
    .withMessage("El nombre no debe exceder 150 caracteres")
    .trim(),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("La descripción no debe exceder 1000 caracteres")
    .trim(),
  body("price")
    .optional()
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage("El precio debe ser un número decimal válido")
    .custom((value) => !value || value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero positivo"),
  body("category_id")
    .optional()
    .isInt()
    .withMessage("El ID de categoría debe ser un número entero"),
  body("image_url").optional().isURL().withMessage("La URL de la imagen debe ser válida"),
  handleValidationErrors,
];

const validateId = [
  param("id").isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo"),
  handleValidationErrors,
];

const validateCategoryId = [
  param("categoryId")
    .isInt({ min: 1 })
    .withMessage("El ID de categoría debe ser un número entero positivo"),
  handleValidationErrors,
];

module.exports = {
  validateCategory,
  validateCategoryUpdate,
  validateProduct,
  validateProductUpdate,
  validateId,
  validateCategoryId,
};
