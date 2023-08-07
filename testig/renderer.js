const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const urlInput = document.getElementById("urlInput");

const performSearch = async () => {
    const query = searchInput.value;
    if (query.trim() === "") return;

    try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDA-emUKcVC9VsaesKW8g_KindSuNMMYbM&cx=c44459f7c65cb4965&q=${query}&safe=active`);
        const data = await response.json();

        searchResults.innerHTML = "";

        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const resultItem = document.createElement("div");
                resultItem.classList.add("search-result");

                const title = document.createElement("h3");
                title.textContent = item.title;
                resultItem.appendChild(title);

                const link = document.createElement("a");
                link.href = item.link;
                link.textContent = item.displayLink;
                resultItem.appendChild(link);

                const snippet = document.createElement("p");
                snippet.textContent = item.snippet;
                resultItem.appendChild(snippet);

                searchResults.appendChild(resultItem);
            });
        } else {
            const noResults = document.createElement("p");
            noResults.textContent = "No results found.";
            searchResults.appendChild(noResults);
        }

        urlInput.value = `https://search?q=${query}`;
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
};

searchButton.addEventListener("click", performSearch);

searchInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        performSearch();
    }
});
