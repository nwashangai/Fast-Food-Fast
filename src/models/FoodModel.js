import query from './';

class userModel {
    getFood(id) {
        const queryString = `SELECT id FROM foods WHERE id=$1`;
        const payload = [id];
        return query(queryString, payload);
    }
}

export default new userModel();