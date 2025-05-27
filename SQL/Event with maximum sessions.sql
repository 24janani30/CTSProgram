SELECT e.title, COUNT(s.session_id) AS total_sessions
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id
HAVING total_sessions = (
    SELECT MAX(session_count) FROM (
        SELECT COUNT(*) AS session_count
        FROM Sessions
        GROUP BY event_id
    ) AS sub
);
