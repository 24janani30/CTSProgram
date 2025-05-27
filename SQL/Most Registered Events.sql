SELECT e.title, COUNT(r.registration_id) AS total_regs
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.event_id
ORDER BY total_regs DESC
LIMIT 3;
