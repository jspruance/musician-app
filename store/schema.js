const yup = require('yup');

module.exports = schema = yup.object().shape({
  firstName: yup.string().max(50, 'Value cannot exceed 50 characters').required(),
  lastName: yup.string().max(50, 'Value cannot exceed 50 characters').required(),
  //genre: yup.string().matches(/(JAZZ|ROCK|BLUES)/).required()
});
