/* Selects the username and password of a specific user. Can be used for logging in.*/

SELECT username, password
FROM account
WHERE username = 'PLACEHOLDER_USERNAME';

/* Allows user to add a comment. */

INSERT INTO reply
values(PLACEHOLDER_COMMENT_ID, PLACEHOLDER_THREAD_ID, 'PLACEHOLDER_SUBFORUM_NAME', 'PLACEHOLDER_TEXT_BODY', 'PLACEHOLDER_DATE', 'PLACEHOLDER_EMAIL');
 

/* Allows user to delete a comment. */

DELETE FROM reply
WHERE email = 'PLACEHOLDER_EMAIL' AND id_num = PLACEHOLDER_ID AND thread_id_num = PLACEHOLDER_THREAD_ID;

/* Allows user to add a thread.*/

INSERT INTO thread
values('PLACEHOLDER_SUBFORUM', PLACEHOLDER_ID, 'PLACEHOLDER_TITLE', 'PLACEHOLDER_TEXT_BODY', 'PLACEHOLDER_DATE', 'PLACEHOLDER_EMAIL');

/* Allows user to delete a thread. */

DELETE FROM thread
WHERE email = 'PLACEHOLDER_EMAIL' AND id = PLACEHOLDER_ID;

/* Allows user to send message to another account. */

INSERT INTO message
values(PLACEHOLDER_MESSAGE_ID, 'PLACEHOLDER_MESSAGE', 'PLACEHOLDER_DATE', 'PLACEHOLDER_FROM', 'PLACEHOLDER_TO');

/* Allows user to subscribe to a forum. */

INSERT INTO subscribed_to
values('PLACEHOLDER_EMAIL', 'PLACEHOLDER_SUBFORUM');

/* Allows user to unsubscribe to a forum. */

DELETE FROM subscribed_to
WHERE email = 'PLACEHOLDER_EMAIL' AND name = 'PLACEHOLDER_SUBFORUM';

/* Allows user to view the last 20 messages sent to their account. */

SELECT *
FROM message
WHERE received_email = 'PLACEHOLDER_EMAIL'
LIMIT 20;

/* Allows user to view most commented on threads for each subforum that a user is subscribed to created in the last week. */

--

/* View threads on subforums in order of latest comments. */

--

/* View threads on subforums by most commented on in the last week.  WARNING: DOES NOT INCLUDE THREADS WITH NO COMMENTS.*/

SELECT COUNT(thread_id_num), thread_id_num
FROM reply
WHERE name = 'PLACEHOLDER_SUBFORUM' AND date_posted >= (CURDATE()-7)
GROUP BY thread_id_num
ORDER BY COUNT(thread_id_num) DESC;

/* View threads on subforums by latest post date. */

SELECT *
FROM thread
WHERE name = 'PLACEHOLDER_SUBFORUM'
ORDER BY date_posted DESC;

/* View threads on subforums by total comments. WARNING: DOES NOT INCLUDE THREADS WITH NO COMMENTS, MYSQL DOES NOT SUPPORT THE EXCEPT CLAUSE. */

SELECT COUNT(thread_id_num), thread_id_num
FROM reply
WHERE name = 'PLACEHOLDER_SUBFORUM'
GROUP BY thread_id_num
ORDER BY COUNT(thread_id_num) DESC;

/* View 10 threads with similar titles to a search phrase. */

SELECT *
FROM thread
WHERE name LIKE '%PLACEHOLDER_SEARCH%'
LIMIT 10;

/* View 10 subforums with similar names as a search phrase. */

SELECT *
FROM subforum
WHERE name LIKE '%PLACEHOLDER_SEARCH%'
LIMIT 10;

/* Checks to see if a user moderates a subforum.*/

SELECT *
FROM moderates
WHERE email = 'PLACEHOLDER_EMAIL' AND name = 'PLACEHOLDER_SUBFORUM';

/* MOD/ADMIN QUERY - Delete a thread that they are not the author of. */

DELETE FROM thread
WHERE id = PLACEHOLDER_ID;

/* MOD/ADMIN QUERY - Delete a comment that they are not the author of. */

DELETE FROM reply
WHERE id_num = PLACEHOLDER_ID AND thread_id_num = PLACEHOLDER_THREAD_ID AND name = 'PLACEHOLDER_SUBFORUM';

/* ADMIN QUERY - Add a subforum. */

INSERT INTO subforum
values('PLACEHOLDER_NAME');

/* ADMIN QUERY - Delete a subforum. */

DELETE FROM subforum
WHERE name = 'PLACEHOLDER_SUBFORUM';

/* ADMIN QUERY - Delete an account that isn't another admin. */

DELETE FROM account
WHERE email = 'PLACEHOLDER_EMAIL' and isadmin = 0;

/* ADMIN QUERY - Appoint moderation of a user for a subforum. */

INSERT INTO moderates
values('PLACEHOLDER_EMAIL', 'PLACEHOLDER_SUBFORUM');

/* ADMIN QUERY - Remove moderation ability of a user for a subforum. */

DELETE FROM moderates
WHERE email = 'PLACEHOLDER_EMAIL' AND name = 'PLACEHOLDER_NAME';

/* ADMIN QUERY - Check to see if a user is subscribed to every subforum. AKA a "superfan" of the Boboverse.*/

SELECT DISTINCT email
FROM subscribed_to S
WHERE NOT EXISTS (
SELECT *
FROM subscribed_to S2
WHERE NOT EXISTS (
SELECT name
FROM subscribed_to S3
WHERE S.email = S3.email AND S2.name = S3.name)
);

/* ADMIN QUERY - Allows admin to see comments on all threads in a easy-to-read manner. */
SELECT t.title, t.textbody, r.body, r.date_posted, r.email
FROM thread t JOIN reply r ON t.id = r.thread_id_num;

/* ADMIN QUERY - Allows admin to see the youngest user(s) on the server. */
SELECT *
FROM account
WHERE age = (
SELECT MIN(age)
FROM account);

/* ADMIN QUERY - Allows admin to see the oldest user(s) on the server. */
SELECT *
FROM account
WHERE age = (
SELECT MAX(age)
FROM account);

/* ADMIN QUERY - Allows admin to see the age with the highest average banana score. */

SELECT *
FROM(
SELECT AVG(banana_score)AS AvgBananaScore, age
FROM account
GROUP BY age) AS t
WHERE AvgBananaScore = (
SELECT MAX(AvgBananaScore)
FROM(
SELECT AVG(banana_score)AS AvgBananaScore, age
FROM account
GROUP BY age) AS t);

/* ADMIN QUERY - Allows admin to see the age with the lowest average banana score. */

SELECT *
FROM(
SELECT AVG(banana_score)AS AvgBananaScore, age
FROM account
GROUP BY age) AS t
WHERE AvgBananaScore = (
SELECT MIN(AvgBananaScore)
FROM(
SELECT AVG(banana_score)AS AvgBananaScore, age
FROM account
GROUP BY age) AS t);

/* ADMIN QUERY - Allows admin to add a user to the super exclusive Boboverse forum. */

INSERT INTO account
values('PLACEHOLDER_EMAIL', 'PLACEHOLDER_USERNAME', 'PLACEHOLDER_PASSWORD', PLACEHOLDER_AGE, PLACEHOLDER_BANANA_SCORE, PLACEHOLDER_ISADMIN);

/* ADMIN QUERY - Allows admin to adjust a user's banana score. */

UPDATE account
SET banana_score = PLACEHOLDER_INTEGER
WHERE email = 'PLACEHOLDER_EMAIL';

/* ADMIN QUERY - Super general selection and projection query. */

SELECT PLACEHOLDER
FROM PLACEHOLDER
WHERE PLACEHOLDER;