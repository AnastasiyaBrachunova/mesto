export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {

    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo(){
    const profile = {
      userName: this._userName.textContent,
      profInfo: this._userJob.textContent
    }
    return profile
  }

setUserInfo(formData) {
  this._userName.textContent = formData.userName;
  this._userJob.textContent = formData.profInfo;
}



  // setUserInfo(info) { // типа гет
  //   (this._userName.textContent = info.userName),
  //   (this._userJob.textContent = info.profInfo);
  // }

  // getUserInfo(formData) { //типа сет
  //   this.firstElement.value = formData.userName;
  //   this.secondElement.value = formData.profInfo;
  // }
}
