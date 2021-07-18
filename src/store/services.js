export const fetchData = ()=> {
    try {
         const response = fetch(`https://swapi.dev/api/planets/`);
         return response;
    } catch (error) {
     throw error
    }
}

export const loginServices = (action) => {
    try {
        const response = fetch(`https://swapi.dev/api/people/?search=${action.userDetails.userName.toLowerCase()}`);
        return response;
    } catch( error ){
        throw error
    }
}