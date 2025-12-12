document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");

  attachTransitions();
  revealOnScroll();
  runTypingEffect();
});

function attachTransitions() {
  const links = document.querySelectorAll("a[data-transition]");
  links.forEach((link) => {
    const isAnchor = link.getAttribute("href")?.startsWith("#");
    if (isAnchor || link.target === "_blank") return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("page-leave");
      setTimeout(() => {
        window.location.href = link.href;
      }, 180);
    });
  });
}

function revealOnScroll() {
  const observed = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  observed.forEach((el) => observer.observe(el));
}

function runTypingEffect() {
  const target = document.getElementById("typing-text");
  const cursor = document.getElementById("typing-cursor");
  if (!target || !cursor) return;

  const code = [
    "using System;",
    "",
    "public class YanivPerez",
    "{",
    "    public int Age => 19;",
    "    public string[] Skills = { \"C#\", \"TypeScript\", \"Python\", \"JavaScript\" };",
    "",
    "    public void Build()",
    "    {",
    "        Console.WriteLine(\"מתכנת מגיל 12.\");",
    "        Console.WriteLine(\"לינוקס, שרתים, בסיסי נתונים.\");",
    "        Console.WriteLine(\"יעילות עלות וחוויות פרימיום.\");",
    "    }",
    "}"
  ].join("\n");

  let index = 0;

  const type = () => {
    if (index <= code.length) {
      target.textContent = code.slice(0, index);
      index += 1;
      setTimeout(type, 26 + Math.random() * 30);
    } else {
      setTimeout(() => {
        index = 0;
        type();
      }, 1200);
    }
  };

  type();
}
