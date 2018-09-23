import query from './';
import bcrypt from 'bcrypt';

class userModel {
    createUser(data) {
        const queryString = `INSERT INTO users(name, email, phone, password)
        VALUES($1, $2, $3, $4) RETURNING id, name, email, phone`;
        const payload = [
            data.name,
            data.email,
            data.phone,
            bcrypt.hashSync(data.password, 10)
        ];
        return query(queryString, payload);
    }

    getEmail(email) {
        const queryString = `SELECT email FROM users WHERE email=$1`;
        const payload = [email];
        return query(queryString, payload);
    }
}

export default new userModel();