require('dotenv').config();

const mongooseConfig = {
  dsn: process.env.MONGOOSE_URL || '',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};

export default mongooseConfig;
