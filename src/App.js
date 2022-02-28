import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useStorageState } from "react-storage-hooks";
import UserContext from "./context/UserContext";
import Header from "./components/Header";
import Message from "./components/Message";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import firebase from "./firebase";

import "./App.css";

const App = (props) => {
  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useStorageState(localStorage, "state-user", {});

  useEffect(() => {
      const postsRef = firebase.database().ref("posts");
      postsRef.on("value", (snapshot) => {
          const posts = snapshot.val();
          const newStatePosts = [];
          for (let post in posts) {
              newStatePosts.push({
                  key: post,
                  slug: posts[post].slug,
                  title: posts[post].title,
                  content: posts[post].content,
              });
          }
          setPosts(newStatePosts);
      });
  }, [setPosts]);

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const getNewSlugFromTitle = (title) =>
    encodeURIComponent(title.toLowerCase().split(" ").join("-"));

  const addNewPost = (post) => {
    const postsRef = firebase.database().ref("posts");
    post.slug = getNewSlugFromTitle(post.title);
    delete post.key;
    postsRef.push(post);
    setFlashMessage(`saved`);
  };

  // const Push = (props) => {
  //     firebase.database().ref("react-blog-demo-1-default-rtdb").set({
  //         title : "This is a test.",
  //         contents : "This is the content of the test.",
  //     }).catch(alert);
  // }

  const updatePost = (post) => {
        const postRef = firebase.database().ref("posts/" + post.key);
        postRef.update({
          slug: getNewSlugFromTitle(post.title),
          title: post.title,
          content: post.content,
        });

        // post.slug = getNewSlugFromTitle(post.title);
        // const index = posts.findIndex((p) => p.key === post.key);
        // const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1));
        // const updatedPosts = [...oldPosts, post].sort((a, b) => a.key - b.key);
        // setPosts(updatedPosts);
        setFlashMessage(`updated`);
  };

  const deletePost = (post) => {
      if (window.confirm("Delete this post?")) {
          const postRef = firebase.database().ref("posts/" + post.key);
          postRef.remove();
          // const updatedPosts = posts.filter((p) => p.key !== post.key);
          // setPosts(updatedPosts);
          setFlashMessage(`deleted`);
      }
  };

  // This is the possible function that I am having trouble with. Specifically, I receive an error in the
  // console when entering a correct username and password. (See my email for a valid username and password
  // to try.) The other possible area that is causing this error could be something in the firebase.js
  // file.
  const onLogin = (email, password) => {
      firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          // .then(user => console.log("Logged in"))
          .then((response) => {
              setUser({
                  email: response.user["email"],
                  isAuthenticated: true,
              });
          })
          .catch(error => console.error(error));
  };

  const onLogout = () => {
      firebase
          .auth()
          .signOut()
          .then(() => {
              setUser({ isAuthenticated: false });
          })
          .catch((error) => console.error(error));
  };

    return (
        <Router>
            <UserContext.Provider value={{ user, onLogin, onLogout }}>
                <div className="App">
                    <Header />
                    {message && <Message type={message} />}
                    <Switch>
                        <Route exact path="/" render={() => <Posts posts={posts} deletePost={deletePost} />} />
                        <Route
                            path="/post/:postSlug"
                            render={(props) => {
                                const post = posts.find(
                                    (post) => post.slug === props.match.params.postSlug
                                );
                                if (post) {
                                    return <Post post={post} />;
                                } else {
                                    return <Redirect to="/" />;
                                }
                            }}
                        />
                        <Route
                            exact
                            path="/login"
                            render={() =>
                                !user.isAuthenticated ? <Login /> : <Redirect to="/" />
                            }
                        />
                        <Route
                            exact
                            path="/new"
                            render={() => (
                                user.isAuthenticated ? (
                                    <PostForm
                                        addNewPost={addNewPost}
                                        post={{ key: null, slug: "", title: "", content: "" }}
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            )}
                        />
                        <Route
                            path="/edit/:postSlug"
                            render={(props) => {
                                const post = posts.find(
                                    (post) => post.slug === props.match.params.postSlug
                                );
                                if (post) {
                                    if (user.isAuthenticated) {
                                        return <PostForm updatePost={updatePost} post={post} />;
                                    } else {
                                        return <Redirect to="/login" />;
                                    }
                                } else {
                                    return <Redirect to="/" />;
                                }
                            }}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </UserContext.Provider>
        </Router>
    );
};

export default App;

// previous Realtime Database rules (auto-configured)
// {
//     "rules": {
//     ".read": "now < 1648447200000",  // 2022-3-28
//         ".write": "now < 1648447200000",  // 2022-3-28
// }
// }