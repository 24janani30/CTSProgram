SELECT u.full_name, COUNT(f.feedback_id) AS feedbacks
FROM Feedback f
JOIN Users u ON f.user_id = u.user_id
GROUP BY f.user_id
ORDER BY feedbacks DESC
LIMIT 5;
