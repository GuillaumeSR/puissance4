<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connect 4</title>
    <link rel="stylesheet" href="../css/style.css">
    <script src="../js/script.js" defer></script>
</head>
<body>
    <header>
        <nav>
            <h1>Connect 4</h1>
            <ul>
            <li><a href="?page=homepage">Home</a></li>
            <li><a href="?page=game">Game</a></li>
            <li><a href="?page=scoreboard">Scoreboard</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <?php require '../controllers/' . $route . '_controller.php'; ?>
    </main>
</body>
</html>