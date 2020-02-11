import { call, put, takeLatest, all } from 'redux-saga/effects'

function* fetchDetails(action) {
    try  {
        const response = yield call( fetch, `https://swapi.co/api/people/?search=${action.userDetails.userName.toLowerCase()}`);
        const responseBody = yield response.json();
        if (responseBody.results[0].birth_year === action.userDetails.password ) {
            yield put({type: 'NEWDATA', Data: responseBody, userDetail: action.userDetails, redirectPath : '/search'});
            localStorage.setItem('starWars', JSON.stringify({isLogin : true, ...responseBody}));
            window.location.href = '/search';
        } else {
         yield put({type: 'NEWDATA', Data: {error: 'Please Enter Correct user Name and Password'}, userDetail: action.userDetails});
        }
    }
    catch (e) {
        console.log(e);
        return;
    }
}

function* fetchPlanetList(action) {
    try  {
        const response = yield call( fetch, `https://swapi.co/api/planets/`);
        const responseBody = yield response.json();
        yield put({type: 'PLANET_DATA', Data: responseBody});
    }
    catch (e) {
        console.log(e);
        return;
    }
}

function* getUserData () {
    yield takeLatest ( 'LOGIN_USER', fetchDetails);
}

function* getPlanetData () {
    yield takeLatest ( 'SEARCH_PLANET', fetchPlanetList);
}

export default function* () {
    yield all([
        getUserData(),
        getPlanetData()
    ]);
}
