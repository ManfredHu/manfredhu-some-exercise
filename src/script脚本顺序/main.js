import Movie from "./movie.js";
console.log(2)
const btnSearch = document.querySelector(".btn");

btnSearch.addEventListener("click", function() {
  let filmeTeste = new Movie(
    "The Lego Movie",
    2014,
    "tt1490017",
    "Movie",
    "https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX300.jpg"
  );
  console.log(`object test ${filmeTeste}`);
});

document.addEventListener('DOM')