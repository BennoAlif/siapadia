$(document).ready(function () {
  const baseUrl = "https://api.themoviedb.org/3";
  const apiKey = "?api_key=c23473caa5af6be7b7da26c0efda04e7";

  const containerMovies = document.querySelector(".movies");
  const headerElement = document.querySelector(".header");
  const movieListElement = document.createElement("movie-list");

  function renderProfile(data) {
    let html = `
    <div class="row mb-5">
        <div class="col-12 col-md-4 text-center">
            <img src="https://image.tmdb.org/t/p/w500${data.profile_path}" alt="Profile image" class="img-fluid rounded-lg shadow-lg">
        </div>
        <div class="col-12 col-md-8">
            <h1>${data.name}</h1>
            <h3 class="text-light">Biography</h3>
            <p style="white-space: pre-line">${data.biography}</p>
        </div>
    </div>
        `;
    document.querySelector(".profile").innerHTML = html;
  }

  function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function readURL(input) {
    var reader = new FileReader();
    if (input.files && input.files[0]) {
      reader.onload = function (e) {
        $("#imgPlaceholder").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#file").change(function () {
    readURL(this);
  });

  $("#urlForm").on("submit", function (e) {
    e.preventDefault();
    let url = $("#url-input").val();
    $("#imgPlaceholder").attr("src", url);
    analyze(url);
  });

  function analyze(url) {
    $("#urlBtn").html(
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Identifying'
    );
    $("#imgBtn").html(
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading'
    );
    $("#urlBtn").attr("disabled", true);
    $("#imgBtn").attr("disabled", true);
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://microsoft-computer-vision3.p.rapidapi.com/models/celebrities/analyze?language=en",
      method: "POST",
      headers: {
        "x-rapidapi-host": "microsoft-computer-vision3.p.rapidapi.com",
        "x-rapidapi-key": "275784bba3mshb51cb6b6ec01188p1fddf4jsnf9cc82506ab2",
        "content-type": "application/json",
        accept: "application/json",
      },
      processData: false,
      data: `{ "url": "${url}"}`,
      success: function (data) {
        $("#urlBtn").html("Identify");
        $("#urlBtn").attr("disabled", false);
        $("#imgBtn").html("upload");
        $("#imgBtn").attr("disabled", false);
        if (data.result.celebrities.length != 0) {
          if (data.result.celebrities.length > 1) {
            $("#myModal").modal("show");
            const celeb = data.result.celebrities;
            $("#people").html("");
            celeb.map((e) => {
              let html = `<li class="list-group-item bg-dark person" id="person">${e.name}</li>`;
              $("#people").append(html);
            });
            $(".person").on("click", function () {
              searchMovies($(this).text());
              $("#myModal").modal("hide");
            });
          } else {
            searchMovies(data.result.celebrities[0].name);
          }
        } else {
          Swal.fire("Not Found", "actor/actress not found.", "error");
        }
      },
      error: function (data) {
        Swal.fire(
          "Failed to analyze",
          "Please try again or use a different link or image.",
          "error"
        );
        $("#urlBtn").html("Identify");
        $("#urlBtn").attr("disabled", false);
        $("#imgBtn").html("upload");
        $("#imgBtn").attr("disabled", false);
      },
    };

    $.ajax(settings);
  }

  $("#imgForm").on("submit", function (e) {
    e.preventDefault();
    var fd = new FormData();
    var files = $("#file")[0].files[0];
    fd.append("file", files);

    $.ajax({
      url: "upload.php",
      type: "post",
      data: fd,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
        if (response != 0) {
          $("#imgPlaceholder").attr("src", response);
          let url = $("#imgPlaceholder")[0].src;
          analyze(url);
        } else {
          alert("file not uploaded");
        }
      },
    });
  });

  function searchMovies(data) {
    let query = encodeURIComponent(data);
    const el = document.getElementsByTagName("movie-list");

    fetch(`${baseUrl}/search/person${apiKey}&query=${query}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        el[0].textContent = "";
        const name = res.results[0].name;
        $(".section-title").html(name);
        getAllMovies(res.results[0].id);
        getDetails(res.results[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getDetails(id) {
    fetch(`${baseUrl}/person/${id}${apiKey}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        renderProfile(res);
        $("html, body").animate(
          {
            scrollTop: $(".profile").offset().top,
          },
          1000
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAllMovies(id) {
    fetch(`${baseUrl}/person/${id}/movie_credits${apiKey}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        movieListElement.movies = res.cast;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetch(`${baseUrl}/movie/popular${apiKey}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      headerElement.style.backgroundImage = `linear-gradient(0deg,rgba(34, 40, 49, 1) 0%,rgba(120, 62, 62, 0.5) 25%,rgba(120, 62, 62, 0.5) 100%),url('https://image.tmdb.org/t/p/original${
        res.results[getRandom(res.results.length)].backdrop_path
      }')`;
    })
    .catch((err) => {
      console.log(err);
    });
  containerMovies.appendChild(movieListElement);
});
