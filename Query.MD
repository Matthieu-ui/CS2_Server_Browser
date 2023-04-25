<!-- 
query plan for the database
 -->

USERS
- id (primary key)
- username
- email
- password_hash

POSTS
- id (primary key)
- user_id (foreign key references USERS.user_id)
- title
- body
- game_name
- created_at
- updated_at

UPVOTED_POSTS
- id (primary key)
- user_id (foreign key references USERS.user_id)
- post_id (foreign key references POSTS.post_id)
- created_at

TAGS
- id (primary key)
- name

POST_TAGS
- id (primary key)
- post_id (foreign key references POSTS.id)
- tag_id (foreign key references TAGS.id)

COMMENTS
- id (primary key)
- user_id (foreign key references USERS.user_id)
- post_id (foreign key references POSTS.post_id)
- content
- created_at
- updated_at

UPVOTED_COMMENTS
- id (primary key)
- user_id (foreign key references USERS.user_id)
- comment_id (foreign key references COMMENTS.comment_id)
- created_at
- 
/////////////////////////////////////////////

search for posts by tag and title:

SELECT p.*
FROM posts p
LEFT JOIN post_tags pt ON p.post_id = pt.post_id
LEFT JOIN tags t ON pt.tag_id = t.tag_id
WHERE (p.title LIKE '%{search_term}%' OR t.name LIKE '%{search_term}%')



search for posts by game name:

SELECT *
FROM posts
WHERE game_name = '{game_name}'

/////////////////////////////////////////////

search for posts by user:

SELECT *
FROM posts
WHERE user_id = '{user_id}'

/////////////////////////////////////////////

display tags for a post:

SELECT t.name
FROM tags t
LEFT JOIN post_tags pt ON t.tag_id = pt.tag_id
WHERE pt.post_id = '{post_id}'

/////////////////////////////////////////////