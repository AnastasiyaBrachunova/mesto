export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      profInfo: this._userJob.textContent,
      avatar: this._userAvatar.src,
    };
  }

  setUserInfo({ userName, profInfo, avatar }) {
    this._userName.textContent = userName;
    this._userJob.textContent = profInfo;
    this._userAvatar.src = avatar;
  }
}
