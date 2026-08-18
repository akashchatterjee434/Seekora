import dotenv from 'dotenv/config';
import app from './src/app.js';
import connectToDB from './src/config/database.js';
import {testAi} from './src/services/ai.service.js'


const PORT = process.env.PORT || 3000;

  testAi()
 connectToDB();

  app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });


