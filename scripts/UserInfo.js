export default class UserInfo {
  constructor({ firstSelector, secondSelector }) {
    this.firstElement = document.querySelector(firstSelector);
    this.secondElement = document.querySelector(secondSelector);
    this._userName = document.querySelector(".profile__name");
    this._userJob = document.querySelector(".profile__job");
  }
  setUserInfo(info) {
    (this._userName.textContent = info.userName),
    (this._userJob.textContent = info.profInfo);
  }

  getUserInfo(formData) {
    this.firstElement.value = formData.userName;
    this.secondElement.value = formData.profInfo;
  }
}
