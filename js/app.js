const container = document.getElementById("menu-container");
document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 })
  : null;

const fallbackImages = [
  "assets/images/cocktail-tipo-tinto.jpg",
  "assets/images/cocktail-mojito.jpg",
  "assets/images/cocktail-lime-caipirinha.jpg",
  "assets/images/cocktail-passion-caipirinha.jpg"
];

menuSections.forEach((sectionData) => {
  const section = document.createElement("section");
  section.className = "menu-section";
  section.id = sectionData.id;
  section.setAttribute("aria-labelledby", `${sectionData.id}-title`);

  const heading = document.createElement("div");
  heading.className = "section-heading";

  const titleWrap = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = sectionData.eyebrow;

  const h2 = document.createElement("h2");
  h2.id = `${sectionData.id}-title`;
  const words = sectionData.title.split(" ");
  if (words.length > 1) {
    const lastWord = words.pop();
    h2.innerHTML = `${words.join(" ")} <em>${lastWord}</em>`;
  } else {
    h2.innerHTML = `<em>${sectionData.title}</em>`;
  }
  titleWrap.append(eyebrow, h2);

  const aside = document.createElement("p");
  aside.className = "section-aside";
  aside.innerHTML = `${sectionData.asideTop}<br><span>${sectionData.asideBottom}</span>`;

  heading.append(titleWrap, aside);
  section.append(heading);

  if (sectionData.layout === "grid") {
    const grid = document.createElement("div");
    grid.className = "cocktail-grid";
    const total = String(sectionData.items.length).padStart(2, "0");

    sectionData.items.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "cocktail-card";
      card.style.animationDelay = `${index * 90}ms`;

      const imageWrap = document.createElement("div");
      imageWrap.className = "drink-image-wrap";

      const image = document.createElement("img");
      image.className = "drink-image";
      image.src = item.image || fallbackImages[index % fallbackImages.length];
      image.alt = item.name;
      image.loading = "lazy";
      image.onerror = () => {
        image.onerror = null;
        image.src = fallbackImages[index % fallbackImages.length];
      };

      const number = document.createElement("span");
      number.className = "card-number";
      number.textContent = `${String(index + 1).padStart(2, "0")} / ${total}`;
      imageWrap.append(image, number);

      const info = document.createElement("div");
      info.className = "card-info";

      const copy = document.createElement("div");
      const name = document.createElement("h3");
      name.className = "drink-name";
      name.textContent = item.name;

      const note = document.createElement("p");
      note.className = "drink-note";
      note.textContent = item.note || "";
      copy.append(name, note);

      const price = document.createElement("div");
      price.className = "drink-price";
      price.innerHTML = `${item.priceMT}<span>${item.priceZAR}</span>`;

      info.append(copy, price);
      card.append(imageWrap, info);
      grid.append(card);

      if (revealObserver) revealObserver.observe(card);
      else card.classList.add("is-visible");
    });

    section.append(grid);
  } else {
    const list = document.createElement("div");
    list.className = "menu-list";

    sectionData.items.forEach((item, index) => {
      const row = document.createElement("article");
      row.className = "menu-row";
      row.style.animationDelay = `${index * 65}ms`;

      const left = document.createElement("div");
      left.className = "row-copy";

      const name = document.createElement("h3");
      name.className = "row-name";
      name.textContent = item.name;

      const note = document.createElement("p");
      note.className = "row-note";
      note.textContent = item.note || "";
      left.append(name, note);

      const divider = document.createElement("div");
      divider.className = "row-dots";

      const price = document.createElement("div");
      price.className = "drink-price row-price";
      price.innerHTML = `${item.priceMT}<span>${item.priceZAR}</span>`;

      row.append(left, divider, price);
      list.append(row);

      if (revealObserver) revealObserver.observe(row);
      else row.classList.add("is-visible");
    });

    section.append(list);
  }

  container.append(section);
});
