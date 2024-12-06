import {} from "@strapi/strapi";
export default (plugin) => {
  plugin.controllers.user.updateMe = async (ctx) => {
    const authUser = ctx.state.user;

    if (!authUser) {
      return ctx.unauthorized();
    }
    if (!ctx.state.user.info) throw new Error('No user "info" populated in ctx.state.user');

    const stateUser = ctx.state.user;
    const body = ctx.request.body.data;
    const auth = ctx.state.auth;
    const schema = strapi.getModel("plugin::users-permissions.user");

    const updatedUser = {
      username: body.username || stateUser.username,
      email: body.email || stateUser.email,
      info: {
        firstName: body.firstName || stateUser.info.firstName,
        lastName: body.lastName || stateUser.info.lastName,
        address: body.address || stateUser.info.address,
      },
    };

    const user = await strapi.documents("plugin::users-permissions.user").update({
      documentId: stateUser.documentId,
      data: updatedUser,
      populate: {
        info: true,
        profile: true,
      },
    });

    ctx.response.status = 200;
    ctx.body = await strapi.contentAPI.sanitize.output(user, schema, { auth });
  };

  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
      policies: [],
    },
  });

  return plugin;
};
