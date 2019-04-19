import * as events from '../components/app/events'

const API_ROOT = 'https://stocks-store-202.herokuapp.com'

export const post = (endpoint, token, data) => { 
  return fetch(API_ROOT + endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({'Content-Type': 'application/json',
        'Authorization': `${token}`,
        'Access-Control-Allow-Origin': 'http://' + window.location.host,
        'Access-Control-Request-Method': 'POST,GET'
      })
  })
    .then(response => {
      return response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    }).catch(error => {
        console.log(error);
    });
}

const parseToRequestParams = data => {
  return null;
}

export const get = (endpoint, token, data) => {
  let url = API_ROOT + endpoint;
  console.log(url);
  const reqParams = parseToRequestParams(data);
  if(reqParams != null) {
    url += '?' + reqParams;
  }
  return fetch(url, {
    method: 'get',
    headers: new Headers({"Authorization": token,
         'Access-Control-Allow-Origin': 'http://' + window.location.host,
    'Access-Control-Request-Method': 'POST,GET'
})
  })
  .then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;
    }).catch(error => {
      console.log(error);
    })
  )
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    switch(action.type) {
        case events.LOGIN:
        case events.REGISTRATION:
            return post(action.url, null, action.data)
                .then(responseData => {
                  return next({
                  response: responseData,
                  type: action.type + events.SUCCESS_EVENT,
                  login: action.data.login
                })
              },
                error => next({
                  type: action.type + events.FAIL_EVENT,
                  error: error.message || 'Something bad happened'
                }));
        //todo: add refresh token later
        default:
            return next(action);
    }
}
