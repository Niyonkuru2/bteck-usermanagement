import { createUser } from "../services/user.service.js";
import { encodeUsers } from "../services/protobuf.service.js";
import { getUserGraph } from "../services/graph.service.js";

let db;

export const setDB = (_db) => {
  db = _db;
};

export const create = async (req, res) => {
  try {
    const user = await createUser(db, req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    // 1. Read query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // 2. Calculate offset
    const offset = (page - 1) * limit;

    // 3. Get paginated users
    const users = await db.all(
      "SELECT * FROM users LIMIT ? OFFSET ?",
      [limit, offset]
    );

    // 4. Get total count
    const totalResult = await db.get("SELECT COUNT(*) as count FROM users");
    const total = totalResult.count;

    // 5. Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // 6. Return structured response
    res.json({
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const exportUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const users = await db.all(
      "SELECT * FROM users LIMIT ? OFFSET ?",
      [limit, offset]
    );

    const totalResult = await db.get(
      "SELECT COUNT(*) as count FROM users"
    );
    const total = totalResult.count;

    const totalPages = Math.ceil(total / limit);

    const buffer = encodeUsers(users);

    res.setHeader("Content-Type", "application/x-protobuf");
    res.setHeader(
      "Access-Control-Expose-Headers",
      "X-Total, X-Page, X-Limit, X-Total-Pages"
    );

    res.setHeader("X-Total", total);
    res.setHeader("X-Page", page);
    res.setHeader("X-Limit", limit);
    res.setHeader("X-Total-Pages", totalPages);

    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to export users",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, status } = req.body;

    const result = await db.run(
      `UPDATE users SET email=?, role=?, status=? WHERE id=?`,
      [email, role, status, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ id, email, role, status });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run(
      `DELETE FROM users WHERE id=?`,
      [id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const graph = async (req, res) => {
  const data = await getUserGraph(db);
  res.json(data);
};