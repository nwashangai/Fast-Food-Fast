export const isUUID = (uuid) => {
    return uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
}

export const isAddress = (address) => {
    return /^([a-zA-Z0-9\s\,\''\-]){5,100}$/.test(address);
}

export const isEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(String(email));
}

export const isName = (name) => {
    return /^[A-Za-z]+$/.test(String(name));
}

export const isPhoneNumber = (phone) => {
    return /^\d{11}$/.test(phone);
}

export const isValidMenuItem = (data) => {
    const imageRegex = /^\s*data:image(\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    if (!data.name) return 'you must provide name for the item';
    if (!data.name.trim() === '') return 'invalid name for the item';
    if (!data.category) return 'you must provide category for the item';
    if (!data.category.trim() === '') return 'invalid category for the item';
    if (!data.description) return 'you must provide description for the item';
    if (!data.description.trim() === '') return 'invalid description for the item';
    if (!data.price) return 'you must provide price for the item';
    if ((typeof data.price) !== 'number') return 'invalid price for the item';
    if(data.image) {
        if (!data.image.match(imageRegex)) return 'invalid image for the item';
    }
    return 'valid';
}

export default isUUID;

const str = ''
console.log(/^([a-zA-Z0-9\s\,\''\-]){5,100}$/.test(str))