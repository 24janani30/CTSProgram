SELECT DISTINCT e.title
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
WHERE e.event_id NOT IN (
    SELECT DISTINCT event_id FROM Feedback
);
