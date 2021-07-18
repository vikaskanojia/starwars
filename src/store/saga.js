import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchData, loginServices } from './services';
import { SET_PLANET_DATA_FNC } from './actions';

function* fetchDetails(action) {
    let response = null;
    try  {
        response = yield call (loginServices, action);
        response = yield response.json();
    }
    catch (e) {
        console.log(e);
        return;
    } finally {
        if (response.results[0].birth_year === action.userDetails.password ) { // birth year 19BBY
            yield put({type: 'NEWDATA', payload: { data: response, userDetail: action.userDetails, redirectPath : '/search'}});
            localStorage.setItem('starWars', JSON.stringify({isLogin : true, ...response}));
            window.location.href = '/search';
        } else {
         yield put({type: 'NEWDATA', payload:{data: {error: 'Please Enter Correct user Name and Password'}, userDetail: action.userDetails}});
        }
    }
}

function* fetchPlanetList() {
    let responseBody = null;
    try  {
        const response = yield call(fetchData);
        responseBody = yield response.json();
        
    }
    catch (e) {
        console.log(e);
        return;
    } finally {
        if(!!responseBody){
            yield put (SET_PLANET_DATA_FNC(responseBody));
        }
    }
}


export default function*  watcherSaga() {
    yield takeLatest ( 'SEARCH_PLANET', fetchPlanetList);
    yield takeLatest ( 'LOGIN_USER', fetchDetails);
}
