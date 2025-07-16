const form = document.getElementById("confessionForm");
const feed = document.getElementById("confessionFeed");
const textarea = form.querySelector("textarea");
const charCount = document.getElementById("charCount");
const themeButtons = document.querySelectorAll("#themeSelector button");

const emojis = ["😭", "🩷", "👍🏽", "😕", "😁", "😅", "😂", "😍", "🥳", "😔", "🤯", "😡", "🤫", "🙄", "🤢", "🤑", "💩", "🫵🏽", "🎓", "🐖"];

textarea.addEventListener("input", () => {
charCount.textContent = `${textarea.value.length}/200`;
});

form.addEventListener("submit", (e) => {
e.preventDefault();
const text = textarea.value;
const category = document.getElementById("category").value;

const post = document.createElement("div");post.setAttribute("data-category", category);
const imageInput = document.getElementById("confessionImage");

if (imageInput.files.length > 0) {
const reader = new FileReader();
reader.onload = () => {
const img = document.createElement("img");
img.src = reader.result;
img.style.maxWidth = "100%";
img.style.borderRadius = "6px";
img.style.marginTop = "0.5rem";
post.appendChild(img);
};
reader.readAsDataURL(imageInput.files[0]);
}

post.innerHTML = `<strong>${category}:</strong> ${text}`;

const reactionBar = document.createElement("div");
reactionBar.classList.add("reactionBar");

emojis.forEach(emoji => {
const btn = document.createElement("button");
btn.textContent = emoji;
btn.onclick = () => alert(`You reacted with ${emoji}`);
reactionBar.appendChild(btn);
});

post.appendChild(reactionBar);
feed.prepend(post);
form.reset();
charCount.textContent = "0/200";
});

// Theme switching
themeButtons.forEach(button => {
button.addEventListener("click", () => {
document.body.className = button.dataset.theme;
});
});
const filterButtons = document.querySelectorAll("#filterBar button");

filterButtons.forEach(button => {
button.addEventListener("click", () => {
const filter = button.dataset.filter;
const posts = feed.querySelectorAll("div");

posts.forEach(post => {
if (filter === "All" || post.dataset.category === filter) {
post.style.display = "block";
} else {
post.style.display = "none";
}
});
});
});
