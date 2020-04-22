const checkExpire = (logout) => Promise.resolve().then(() => {
  if(localStorage.hasOwnProperty("adminData")){
    const storedData = JSON.parse(localStorage.getItem("adminData"));
    const now = Date.now();
    const newDate = new Intl.DateTimeFormat('tr-TR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(now);

    if(newDate > storedData.expireDate){
       logout();
       return true;
    }
  }
  return false;
})

export default (checkExpire);
