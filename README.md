# React.js-Basic-Blog

<p>
This blog web app (<a href="https://crewsblogproject.netlify.app/" target="_blank"><b>click here to view</b><a>) provides the basics one would expect to find in a blog, such as a page to view all posts and a way for credentialed users to make new posts.  The below image shows the blog home page.
</p>
  
![home-page](https://github.com/CrewsControlSolutions/React.js-Basic-Blog/blob/main/screenshots/HomePage.png?raw=true)
  
<p>
The app has complete CRUD functionality.  React Router is used for routing to the Create, Read, and Update pages from the home page.  (There is no Delete page since this is handled as an action instead.)  The below image shows the view for creating or updating a post.
  
![new-or-edit-post](https://github.com/CrewsControlSolutions/React.js-Basic-Blog/blob/main/screenshots/EditPost.png?raw=true)
  
User authentication and data storage is handled via  integration with Firebase.  Data relating to a post is not retrieved from state local to the client; rather, it is continuously retrieved from the Firebase Realtime Database.  For a view of Firebase's NoSQL database, see the below image.
  
![firebase-realtime-db](https://github.com/CrewsControlSolutions/React.js-Basic-Blog/blob/main/screenshots/FirebaseRealtimeDatabase.png?raw=true)
  
One current limitation is that new users cannot be created directly from the web app.  Instead, they must be created through Firebase's website.  Once created, a user is able to login to the blog app and create new posts or edit/delete any existing posts.
  
Throughout this project, hooks are utilized, which allow functions that update state to be passed as props from parent to child components.  The strict usage of React functions containing hooks over React classes is consistent with the modern paradigm of the React developer community.  The hooks used include useState, useContext, and useRef.
  
The UI/UX is simple yet clean.  The header, organization of blog posts, and selection of aesthetic fonts allow for streamlined usage of the app. A notification message appears for a little more than a second every time a new blog post is created or updated.  When a user selects the delete button on a post, a confirmation message appears that the user must acknowledge before the post is actually deleted.
  
Netlify is utilized for hosting the app's production version, including a <a href="https://crewsblogproject.netlify.app/" target="_blank">Live URL</a> for viewing in a web browser.  
  
To view screenshots of what a credentialed user is able to see and perform in the app, see the <a href="https://github.com/CrewsControlSolutions/React.js-Basic-Blog/tree/main/screenshots">Screenshots</a> folder.  If you would like temporary user access to experience full functionality, please contact the author via <a href="https://www.linkedin.com/in/kylecrews94/" target="_blank">LinkedIn</a> or submit an inquiry from their <a href="https://crewscontrolsolutions.github.io/" target="_blank">Portfolio</a>.
</p>
