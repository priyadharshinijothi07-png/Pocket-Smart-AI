// Dynamic result display (Activity 4.2)
const form = document.getElementById("planner-form");
if (form) {
  const kind = form.dataset.kind;
  const results = document.getElementById("results");
  const errorBox = document.getElementById("error");
  const button = form.querySelector("button[type=submit]");
  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.hidden = true;
    results.innerHTML = "";
    button.disabled = true;
    button.textContent = "Generating...";
    try {
      const res = await fetch(`/generate-${kind}`, { method: "POST", body: new FormData(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      render(data);
    } catch (err) {
      errorBox.textContent = err.message;
      errorBox.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = "Generate Recommendations";
    }
  });

  function render(d) {
    const items = d.items.map((i) => `
      <div class="result-item">
        <strong>${esc(i.name)}</strong><span class="badge">${esc(i.platform)}</span>
        <span class="badge">${esc(i.category)}</span>
        <div>${inr(i.price)}</div><small>${esc(i.reason)}</small>
      </div>`).join("");
    results.innerHTML = `
      <div class="panel wide">
        <h3>Your Recommendations</h3>
        <p>${esc(d.summary)} <span class="badge">${d.source === "gemini" ? "Gemini AI" : "Default suggestions"}</span></p>
        ${items}
        <div class="totals"><span>Budget: ${inr(d.budget)}</span><span>Planned: ${inr(d.total)}</span>
          <span class="${d.over_budget ? "warn" : ""}">${d.over_budget ? "Over by " + inr(-d.remaining) : "Remaining: " + inr(d.remaining)}</span></div>
      </div>`;
    results.scrollIntoView({ behavior: "smooth" });
  }
}
