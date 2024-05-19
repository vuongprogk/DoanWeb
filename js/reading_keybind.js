document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") moveSection(1);
  else if (e.key === "ArrowLeft") moveSection(-1);
});
