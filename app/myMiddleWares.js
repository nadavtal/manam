export const httpMiddleware = (store) => (next) => (action) => {
    // console.log('handle http request', action);
    if (action.data && action.data.hasOwnProperty('created_by')) {
        console.log('Has created by!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
        const fullName = currentUser.userInfo.first_name + ' ' + currentUser.userInfo.last_name;
        action.data.created_by = fullName
        console.log('RESULT', action.data)
    }
    next(action)
  }