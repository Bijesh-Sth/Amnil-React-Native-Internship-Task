import bcrypt from 'react-native-bcrypt';


export const hashPassword = (password: string): Promise<string> => {
return new Promise((resolve, reject) => {
    if (typeof password !== 'string') {
      reject(new Error('Password must be a string'));
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          console.log('Hashed Password:', hash);
          resolve(hash);
        }
      });
    }
  });
};

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (typeof password !== 'string') {
      reject(new Error('Password must be a string'));
      return;
    }
    console.log('Hash to compare:', hash);
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
