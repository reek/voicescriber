export const Fetcher = (url, method = 'GET', body = {}) => {
    let options = {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    if (method === 'GET') {
        delete options.body;
    }
    return fetch(url, options)
        .then(res => res.json())
        .catch(err => alert(err.toString()))
}

/* export const asyncFetcher = async (url, method, body) => {
    return await fetcher(url, method, body)
} */
















///// DEMO EXTRACTING DATA
// const data = {database: [], exemple: {message: {pipo: 'hello'}}};
// const { 
//     database = [],
//     exemple: { message: {pipo = 'hi'}} = {},
//     exemple: {message = {}},
//     exemple,
// } = data;
// console.log(database, pipo, message, exemple);