"use client";

import { useEffect, useState } from "react";

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:9090/api/posts/all-posts"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading posts...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>All Posts</h1>

      <div style={styles.grid}>
        {posts.map((post) => (
          <div key={post.postId} style={styles.card}>
            <div style={styles.imageWrapper}>
              {post.animalPhoto ? (
                <img
                  src={post.animalPhoto}
                  alt="animal"
                  style={styles.image}
                />
              ) : (
                <div style={styles.placeholder}>
                  No Image
                </div>
              )}
            </div>

            <div style={styles.content}>
              <div style={styles.userSection}>
                <div style={styles.avatar}>
                  {post.user?.userPhoto ? (
                    <img
                      src={post.user.userPhoto}
                      alt="user"
                      style={styles.avatarImage}
                    />
                  ) : (
                    <span>👤</span>
                  )}
                </div>

                <div>
                  <h3 style={styles.username}>
                    {post.user?.firstname} {post.user?.lastname}
                  </h3>

                  <p style={styles.email}>
                    {post.user?.email}
                  </p>
                </div>
              </div>

              <p style={styles.description}>
                {post.description}
              </p>

              <div style={styles.tags}>
                <span style={styles.tag}>
                  {post.animal?.species}
                </span>

                <span style={styles.tag}>
                  {post.petService?.serviceType}
                </span>
              </div>

              <div style={styles.dateSection}>
                <p>
                  <strong>Start:</strong> {post.startDate}
                </p>

                <p>
                  <strong>End:</strong> {post.endDate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  title: {
    marginBottom: "30px",
    fontSize: "32px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    border: "1px solid #e5e5e5",
  },

  imageWrapper: {
    width: "100%",
    height: "220px",
    backgroundColor: "#ddd",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#666",
    fontSize: "18px",
  },

  content: {
    padding: "18px",
  },

  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },

  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  username: {
    margin: 0,
    fontSize: "18px",
  },

  email: {
    margin: 0,
    color: "#777",
    fontSize: "14px",
  },

  description: {
    marginBottom: "16px",
    lineHeight: "1.5",
  },

  tags: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },

  tag: {
    padding: "6px 12px",
    borderRadius: "999px",
    backgroundColor: "#efefef",
    fontSize: "13px",
    fontWeight: "bold",
  },

  dateSection: {
    borderTop: "1px solid #eee",
    paddingTop: "12px",
    fontSize: "14px",
    color: "#555",
  },
};