const grid = document.getElementById("cocktail-grid");
document.getElementById("year").textContent = new Date().getFullYear();

cocktails.slice(0, 8).forEach((drink, index) => {
  const card = document.createElement("article");
  card.className = "cocktail-card";
  card.style.animationDelay = `${index * 90}ms`;

  const imageWrap = document.createElement("div");
  imageWrap.className = "drink-image-wrap";
  const image = document.createElement("img");
  image.className = "drink-image";
  image.src = drink.image;
  image.alt = drink.name;
  image.loading = "lazy";
  image.onerror = () => { image.src = "assets/images/cocktail-01.svg"; };
  const number = document.createElement("span");
  number.className = "card-number";
  number.textContent = `0${index + 1} / 08`;
  imageWrap.append(image, number);

  const info = document.createElement("div");
  info.className = "card-info";
  const copy = document.createElement("div");
  const name = document.createElement("h3");
  name.className = "drink-name";
  name.textContent = drink.name;
  const note = document.createElement("p");
  note.className = "drink-note";
  note.textContent = drink.note || "";
  copy.append(name, note);

  const price = document.createElement("div");
  price.className = "drink-price";
  price.textContent = drink.price;
  info.append(copy, price);
  card.append(imageWrap, info);
  grid.append(card);
});
