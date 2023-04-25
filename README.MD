# Web Development Final Project - *Name of App Here*

Submitted by: **Matthieu Felker**

**The SteamStatsBlog repository is a platform that allows users to search for games and access related data. Users can also leave comments and upvote their favorite games and data. It is a comprehensive tool for gamers to stay informed and engaged with their favorite games.**



Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A create form that allows the user to create posts**
- [x] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [x] **A home feed displaying previously created posts**
- [x] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [x] **Clicking on a post shall direct the user to a new page for the selected post**
- [ ] **Users can sort posts by either their created time or upvotes count**
- [ ] **Users can search for posts by title**
- [x] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [x] **Users can leave comments underneath a post on the post's separate page**
- [x] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [ ] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [ ] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [ ] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface of the web app
- [ ] Users can share and view web videos
- [ ] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [ ] Users can upload images directly from their local machine as an image file
- [x] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!
* [x] node.js back end with steam web api, can search apps and see online players

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./client/src/assets/Animation1.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  

[ScreenToGif](https://www.screentogif.com/) for Windows

## Notes

Describe any challenges encountered while building the app.

Tried to setup openId to connect to steam api but it was too complicated and I didn't have enough time to figure it out.

I was rusty with setting up queries and relationships in supabase, but I got it working. I had to simplify the database schema to make it work. My vision was way too complicated for the time I had.

overall getting a clean and simple UI was a challenge. tailwind helped a lot but still took a lot of time.

still lots of bugs and things to fix and add, but I'm out of time! I'll keep working on it after the deadline.
## License

    Copyright [2023] [Matthieu Felker]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.