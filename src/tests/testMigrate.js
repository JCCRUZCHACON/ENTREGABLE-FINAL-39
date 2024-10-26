const { exec } = require('child_process');

const testMigrate = async () => {
  try {
    await new Promise((resolve, reject) => {
      const reset = exec(
        'sequelize db:migrate:undo:all && sequelize db:migrate',
        { env: process.env },
        err => (err ? reject(err) : resolve())
      );

      console.log('db reset successfuly 👌😄')

      // Forward stdout+stderr to this process
      reset.stdout.pipe(process.stdout);
      reset.stderr.pipe(process.stderr);
    });

  } catch (error) {
    console.log(error);
  }
}

testMigrate();
