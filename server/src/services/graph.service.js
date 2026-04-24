export const getUserGraph = async (db) => {
  // Step 1: get last 7 days
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const formatted = d.toISOString().split("T")[0];
    days.push(formatted);
  }

  // Step 2: query DB
  const rows = await db.all(`
    SELECT DATE(createdAt) as date, COUNT(*) as count
    FROM users
    WHERE createdAt >= datetime('now', '-6 days')
    GROUP BY DATE(createdAt)
  `);

  // Step 3: map results
  const map = {};
  rows.forEach(r => {
    map[r.date] = r.count;
  });

  // Step 4: fill missing days
  const result = days.map(date => ({
    date,
    count: map[date] || 0
  }));

  return result;
};