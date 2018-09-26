import query from './';

class userModel {
    getFood(id) {
        const queryString = `SELECT id FROM foods WHERE id=$1`;
        const payload = [id];
        return query(queryString, payload);
    }

    addFood(data) {
        const queryString = `INSERT INTO foods(name, category, description, image, price)
        VALUES($1, $2, $3, $4, $5) RETURNING id, name, category, description, image, price `;
        const payload = [data.name, data.category, data.description, data.image, data.price];
        return query(queryString, payload);
    }

    getFoodMenu() {
        const queryString = `SELECT * FROM foods`;
        return query(queryString);
    }

    updateFoodMenu(id, data) {
        const queryString = `UPDATE foods SET name=$1, category=$2, description=$3, image=$4, price=$5 WHERE id=$6 RETURNING *`;
        const payload = [data.name, data.category, data.description, data.image, data.price, id];
        return query(queryString, payload);
    }
}

export default new userModel();