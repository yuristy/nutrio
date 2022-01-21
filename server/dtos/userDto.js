module.exports = class UserDto {
  email;
  isActivated;
  id;
  roles;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.roles = model.roles;
    this.isActivated = model.isActivated;
  }
};
