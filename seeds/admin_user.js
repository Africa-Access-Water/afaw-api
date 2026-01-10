const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  // Delete existing admin (idempotent seed)
  await knex("users")
    .where({ email: "admin@afaw.org" })
    .del();

  const hashedPassword = await bcrypt.hash("root", 10);

  await knex("users").insert({
    name: "admin",
    email: "admin@afaw.org",
    password: hashedPassword,
    role: "admin",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    status: "accepted",       // 🔑 bypass approval
    is_verified: true,        // optional
    created_at: new Date(),
    updated_at: new Date(),
  });
};
