export default (param) => {

  const queryString = window.location.search.split('?')[1];
  if(!queryString || queryString.length === 0){
    return null;
  }

  const paramIndex = queryString.indexOf(param);
  if(paramIndex < 0){
    return null;
  }

  const value = queryString.substr(paramIndex).split('=')[1].split('&')[0];
  return value;
}
