
import produce from 'immer';

// This will be seprate file
const commonState = ()=>({
	count: 0,
	apiData: '',
	flteredData: ''
});

// This will be seprate file
const withProduce = (initialState, reducers) => produce((state = initialState(), { type, payload }) => {
		if (reducers[type]) {
			reducers[type](state, payload);
		}
	
		return state;
	  });

// This will be seprate file
const reducer = {
		'NEWDATA' : (state, payload) => {
			state.apiData = payload.data;
		},
		'SET_PLANET_DATA' : (state, payload) => {
			if(!!payload){
				state.apiData = payload.results;
				state.flteredData = payload.results;
			}
		},

		'LOG_OUT' : () => {
			localStorage.removeItem('starWars');
			window.location.href = '/';
		},

		'FIND_PLANET' : (state, payload)=> {
			let filteredList = !!state.apiData ? state.apiData : [];
			filteredList = filteredList.filter((planet) => {
				let planetName = planet.name.toLowerCase();
				return planetName.indexOf(payload.toLowerCase()) !== -1;
			});
			state.flteredData = filteredList ;
		},

		'COUNT_ADD' : (state) => {
			state.count = ++state.count;
		}
};


export default withProduce(commonState, reducer);