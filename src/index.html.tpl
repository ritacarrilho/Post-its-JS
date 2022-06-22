<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>NotaBene</title>

</head>

<body>
    <div class="title-bar">
        <div class="logo" logo>NotaBene</div>
        <button type="button" class="btn" id="btn-board-clear">Clean Board</button>
    </div>

    <div class="main-zone">
        <div class="tool-bar">
            <div class="form-title">New NotaBene</div>

            <form action="" method="post">
                <div class="form-row">
                    <label for="new-nota-title">Title</label>
                    <input type="text" id="new-nota-title" class="form-control">
                </div>

                <div class="form-row">
                    <label for="new-nota-content">Content</label>
                    <textarea id="new-nota-content" class="form-control"></textarea>
                </div>

                <div>
                    <button type="submit" class="btn">Add</button>
                </div>
            </form>
        </div>

        <div class="board-zone">
            <ul id="board" class="board-list">
                <!-- <li class="nota">
                    <div class="inner">
                        <div class="top-bar">
                            <div class="info">
                                <div class="nota-date-time">09/03/2022 - 15:18:25</div>
                                <div class="nota-title">Toto à la plage</div>
                            </div>


                            <div class="cmd-bar">
                                <button type="button" class="btn nota-save hidden">💾</button>
                                <button type="button" class="btn nota-edit">✏️</button>
                                <button type="button" class="btn nota-delete">🗑️</button>
                            </div>
                        </div>
                        <div class="content-bar">
                            <div class="nota-content">BLA BLA BLA BLA</div>
                        </div>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>

</body>

</html>