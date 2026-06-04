const mongoose = require('mongoose');
const Law = require('../models/Law');

const validateLawInput = (data) => {
  const errors = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!data.act || data.act.trim() === '') {
    errors.push('Act cannot be empty');
  }

  if (data.section === undefined || data.section === null || data.section === '' || Number.isNaN(Number(data.section))) {
    errors.push('Section must be a valid number');
  }

  if (!data.category || data.category.trim() === '') {
    errors.push('Category cannot be empty');
  }

  if (!data.content || data.content.trim() === '') {
    errors.push('Content cannot be empty');
  }

  return errors;
};

const createLaw = async (lawData) => {
  const errors = validateLawInput(lawData);

  if (errors.length > 0) {
    const error = new Error('Validation Error');
    error.statusCode = 400;
    error.errors = errors;
    throw error;
  }

  return Law.create({
    ...lawData,
    section: Number(lawData.section)
  });
};

const getAllLaws = async () => {
  return Law.find().sort({ createdAt: -1 });
};

const getLawById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid law ID');
    error.statusCode = 400;
    throw error;
  }

  const law = await Law.findById(id);

  if (!law) {
    const error = new Error('Law not found');
    error.statusCode = 404;
    throw error;
  }

  return law;
};

module.exports = {
  createLaw,
  getAllLaws,
  getLawById
};
