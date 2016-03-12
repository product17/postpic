module.exports = {
  context: `${__dirname}/lib`,
  entry: [
    { user_client: './users/components/src/user-display.jsx' },
  ],
  output: {
    filename: 'user_client.js',
    path: `${__dirname}/build`,
  },
};
