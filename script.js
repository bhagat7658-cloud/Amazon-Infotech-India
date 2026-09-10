const books = [
  {title:"Sample Academic Title", author:"Add author name", publisher:"Add publisher", isbn:"ISBN-ADD-HERE", edition:"Latest", price:"Enquire", category:"Arts & Humanities"},
  {title:"Sample Science Reference", author:"Add author name", publisher:"Add publisher", isbn:"ISBN-ADD-HERE", edition:"Latest", price:"Enquire", category:"Science"},
  {title:"Sample Management Book", author:"Add author name", publisher:"Add publisher", isbn:"ISBN-ADD-HERE", edition:"Latest", price:"Enquire", category:"Management"},
  {title:"Sample Computer Science Title", author:"Add author name", publisher:"Add publisher", isbn:"ISBN-ADD-HERE", edition:"Latest", price:"Enquire", category:"Computer Science"},
  {title:"Sample Medical & Allied Title", author:"Add author name", publisher:"Add publisher", isbn:"ISBN-ADD-HERE", edition:"Latest", price:"Enquire", category:"Medical"},
  {title:"Sample General Reference", author:"Add author name", publisher:"Add publisher", isbn:"ISBN-ADD-HERE", edition:"Latest", price:"Enquire", category:"Reference"}
];

const grid = document.getElementById("bookGrid");
const empty = document.getElementById("emptyState");
const count = document.getElementById("resultCount");
const search = document.getElementById("searchInput");
let category = "All";

function render(){
  const q = search.value.trim().toLowerCase();
  const filtered = books.filter(b => {
    const categoryMatch = category === "All" || b.category === category;
    const text = `${b.title} ${b.author} ${b.publisher} ${b.isbn} ${b.category}`.toLowerCase();
    return categoryMatch && (!q || text.includes(q));
  });
  count.textContent = `${filtered.length} title${filtered.length===1?"":"s"} shown`;
  grid.innerHTML = filtered.map(b => `
    <article class="book-card">
      <div class="book-cat">${b.category}</div>
      <h3>${escapeHtml(b.title)}</h3>
      <div class="book-meta">
        <span><b>Author:</b> ${escapeHtml(b.author)}</span>
        <span><b>Publisher:</b> ${escapeHtml(b.publisher)}</span>
        <span><b>ISBN:</b> ${escapeHtml(b.isbn)}</span>
        <span><b>Edition:</b> ${escapeHtml(b.edition)}</span>
        <span><b>Price:</b> ${escapeHtml(b.price)}</span>
      </div>
      <div class="book-actions"><a href="#quote" onclick="prefillBook('${encodeURIComponent(b.title)}')">Request Quote →</a></div>
    </article>`).join("");
  empty.classList.toggle("hidden", filtered.length !== 0);
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function prefillBook(title){
  const box=document.querySelector('textarea[name="requirement"]');
  if(box) box.value = `Book requirement: ${decodeURIComponent(title)}\n`;
}
document.querySelectorAll(".cat").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    category=btn.dataset.cat;
    render();
  });
});
search.addEventListener("input",render);
document.querySelector(".menu-btn").addEventListener("click",()=>document.querySelector(".nav-links").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav-links").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
render();
