module.exports = s =>
  s.replace(/\s+/g, '_')
   .replace(/\W/g, '')
   .toLowerCase();
