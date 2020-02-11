const todoApp = (state={}, action) => {
	switch (action.type) {
		case 'NEWDATA' : 
			return {  ...state, apiData: action.Data}
		case 'LOGIN_USER' :
			return {  ...state, apiData: action.Data}
		case 'PLANET_DATA' :
			return {...state, apiData: action.Data, forFilter: action.Data}
		case 'LOG_OUT' :
			localStorage.removeItem('starWars');
			window.location.href = '/';
		case 'FIND_PLANET' :
			let filteredList = !!state.forFilter ? state.forFilter.results : [];
			filteredList = filteredList.filter((planet) => {
				let planetName = planet.name.toLowerCase()
				return planetName.indexOf(action.value.toLowerCase()) !== -1
			});
			return {...state, apiData: {results: filteredList} }
		default :
			return state

	}

}
export default todoApp;