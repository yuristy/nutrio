module.exports = class UserDto {
  email;
  isActivated;
  id;
  roles;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.roles = model.roles.join(",");
    this.isActivated = model.isActivated;
  }
};
