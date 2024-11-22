
document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("postsContainer");
    const tagsContainer = document.getElementById("tagsContainer");
    const searchInput = document.getElementById("searchInput");


    fetchTags();

  
    fetchAllPosts();

  
    searchInput.addEventListener("keyup", (l) => {
        if (l.key === "Enter") {
            fetchPostsBySearch(searchInput.value);
        }
    });

  
    function fetchTags() {
        fetch("https://dummyjson.com/posts") 
            .then(response => response.json()) 
            .then(data => {
                
                const uniqueTags = [...new Set(data.posts.flatMap(post => post.tags))];
                displayTags(uniqueTags);  
            })
            .catch(error => console.error("Error fetching tags:", error)); 
    }

    
    function displayTags(tags) {
        tagsContainer.innerHTML = ""; 
        tags.forEach(tag => {
            const tagElement = document.createElement("span");
            tagElement.className = "tag";
            tagElement.textContent = `#${tag}`;
            tagElement.onclick = () => fetchPostsByTag(tag); 
            tagsContainer.appendChild(tagElement);
        });
    }

    function fetchAllPosts() {
        fetch("https://dummyjson.com/posts")
            .then(response => response.json())
            .then(data => displayPosts(data.posts)) 
            .catch(error => console.error("Error fetching all posts:", error));
    }

    function fetchPostsByTag(tag) {
        fetch(`https://dummyjson.com/posts/tag/${tag}`)
            .then(response => response.json())
            .then(data => displayPosts(data.posts)) 
            .catch(error => console.error(`Error fetching posts by tag ${tag}:`, error));
    }

    // //////////////////
    function fetchPostsBySearch(query) {
        fetch(`https://dummyjson.com/posts/search?q=${query}`)
            .then(response => response.json())
            .then(data => displayPosts(data.posts))  
            .catch(error => console.error("Error fetching posts by search:", error));
    }

    // ///////////////////////
    function displayPosts(posts) {
        postsContainer.innerHTML = ""; // 
        if (posts.length === 0) {
            postsContainer.innerHTML = "<p>No posts available for this tag.</p>";
            return;
        }

        posts.forEach(post => {
            const postCard = document.createElement("div");
            postCard.className = "post-card";
            postCard.innerHTML = `
                <p class="post-body">${post.body}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag" onclick="fetchPostsByTag('${tag}')">#${tag}</span>`).join("")}
                </div>
                <div class="data">
                    <div class="views"><i class="fa-solid fa-eye"></i> <span class="count">${post.views}</span></div>
                    <div class="likes"><i class="fa-brands fa-gratipay"></i> <span class="count">${post.likes}</span></div>
                    <div class="dislikes"><i class="fa-regular fa-thumbs-down"></i> <span class="count">${post.dislikes}</span></div>
                </div>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    //////////////////
    window.fetchPostsByTag = fetchPostsByTag;
});

