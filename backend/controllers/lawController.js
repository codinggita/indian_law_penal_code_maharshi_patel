const lawService = require('../services/lawService');

const sendError = (res, error) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal Server Error' : error.message,
    errors: error.errors || undefined
  });
};

const createLaw = async (req, res) => {
  try {
    const law = await lawService.createLaw(req.body);

    return res.status(201).json({
      success: true,
      message: 'Law created successfully',
      data: law
    });
  } catch (error) {
    return sendError(res, error);
  }
};

const getAllLaws = async (req, res) => {
  try {
    const laws = await lawService.getAllLaws();

    return res.status(200).json({
      success: true,
      count: laws.length,
      data: laws
    });
  } catch (error) {
    return sendError(res, error);
  }
};

const getLawById = async (req, res) => {
  try {
    const law = await lawService.getLawById(req.params.id);

    return res.status(200).json({
      success: true,
      data: law
    });
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = {
  createLaw,
  getAllLaws,
  getLawById
};
