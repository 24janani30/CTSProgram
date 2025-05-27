SELECT e.title,
       SUM(CASE WHEN r.resource_type = 'pdf' THEN 1 ELSE 0 END) AS pdfs,
       SUM(CASE WHEN r.resource_type = 'image' THEN 1 ELSE 0 END) AS images,
       SUM(CASE WHEN r.resource_type = 'link' THEN 1 ELSE 0 END) AS links
FROM Events e
LEFT JOIN Resources r ON e.event_id = r.event_id
GROUP BY e.event_id;
