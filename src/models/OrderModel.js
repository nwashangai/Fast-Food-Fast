import query from './';

class userModel {
    makeOrder(data) {
        const queryString = `INSERT INTO orders(userId, address, foodItems, date)
        VALUES($1, $2, $3, $4) RETURNING *`;
        const payload = [
            data.userId,
            data.address,
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

    getOrders() {
        return query(`SELECT * FROM orders`);
    }

    getOrder(id) {
        const queryString = `SELECT * FROM orders WHERE id=$1`;
        const payload = [id];
        return query(queryString, payload);
    }

    updateOrder(id, status) {
        const queryString = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
        const payload = [status, id];
        return query(queryString, payload);
    }
}

export default new userModel();