// ---------- 1) Remove legacy attributes first ----------
const legacyAttrs = ["align", "bgcolor", "face", "size"];

document.querySelectorAll("*").forEach(el => {
  legacyAttrs.forEach(attr => el.removeAttribute(attr));
});

// remove inline styles completely
document.querySelectorAll("[style]").forEach(el => {
  el.removeAttribute("style");
});


// ---------- 2) Create reading container safely ----------
const reader = document.createElement("div");
reader.id = "planalto-reader";

// Move visible nodes only (avoid scripts/meta/etc.)
[...document.body.childNodes].forEach(node => {
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    node.tagName !== "SCRIPT" &&
    node.tagName !== "STYLE"
  ) {
    reader.appendChild(node);
  } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
    reader.appendChild(node);
  }
});

document.body.appendChild(reader);


// ---------- 3) Normalize legacy layout ----------
document.querySelectorAll("font").forEach(font => {
  const span = document.createElement("span");
  span.innerHTML = font.innerHTML;
  font.replaceWith(span);
});

// spacing for dense documents
document.querySelectorAll("br + br").forEach(br => {
  const spacer = document.createElement("div");
  spacer.style.height = "8px";
  br.after(spacer);
});


// ---------- 4) Fix tables AFTER inline styles are removed ----------
document.querySelectorAll("#planalto-reader table").forEach(table => {
  table.style.maxWidth = "100%";
  table.style.display = "block";
  table.style.overflowX = "auto";
});
