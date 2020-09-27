<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SIAPADIA</title>
    <link rel="icon" type="image/png" href="assets/icon.png" />
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/sweetalert2@9.17.1/dist/sweetalert2.min.css">
</head>

<body class="text-white">
    <header class="header">

        <div class="jumbotron jumbotron-fluid bg-transparent">
            <div class="container mt-5">
                <h1 class="display-3 mt-5">SIAPADIA</h1>
                <p class="lead">Find movies according to the actor or actress you choose.</p>
            </div>
        </div>

    </header>
    <div class="container">

        <section class="movies">
            <div class="card my-3 bg-dark shadow-lg rounded-lg">
                <div class="card-body text-center m-5">
                    <div class="mb-5">
                        <img src="https://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg" class="img-fluid rounded img-placeholder" alt="Responsive image" id="imgPlaceholder">
                    </div>
                    <form id="urlForm">
                        <div class="form-group">
                            <input type="text" class="form-control" id="url-input" placeholder="URL pointing to the image" required>
                        </div>
                        <button type="submit" class="btn btn-info" id="urlBtn">Identify</button>
                    </form>
                    <p class="display-4 my-3">OR</p>
                    <form id="imgForm">
                        <div class="form-group">
                            <label for="file">
                                <h1 class="display-1 uploadBtn"><i class="fa fa-upload text-info"></i></h1>
                                Upload pictures of actors or actresses
                            </label>
                            <input type="file" class="form-control-file" id="file" accept="image/*" hidden>
                        </div>

                        <button type="submit" class="btn btn-info mt-5" id="imgBtn">Upload</button>
                    </form>
                </div>
            </div>
            <div class="profile pt-3"></div>
        </section>
        <section class="movie-details"></section>
    </div>

    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">there is more than 1 person in the image, please select one.</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="list-group list-group-flush" id="people">
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="assets/js/movie-item.js"></script>
    <script src="assets/js/movie-list.js"></script>
    <script src="assets/js/app.js"></script>
</body>

</html>