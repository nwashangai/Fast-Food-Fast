import query from './';

class userModel {
    makeOrder(data) {
        const queryString = `INSERT INTO orders(userId, foodItems, date)
        VALUES($1, $2, $3) RETURNING userId, foodItems, date, status `;
        const payload = [
            data.userId,
            JSON.stringify(data.foodItems),
            new Date()
        ];
        return query(queryString, payload);
    }

    getOrderHistory(userId) {
        const queryString = `SELECT * FROM orders WHERE userId=$1`;
        const payload = [userId];
        return query(queryString, payload);
    }
}

export default new userModel();