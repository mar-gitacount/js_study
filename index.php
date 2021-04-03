<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>js_studys</title>
</head>
<body>
<div class="title">html,css,jsの勉強一覧クリックして移動可能</div>
<?php if($handle = opendir('../js_study/')):?>
    <?php while (false !== ($entry = readdir($handle))):?>
        <?php $checkdot = substr($entry, 0,1)?>
        <?php if(is_dir($entry)&&$checkdot !== "."):?>
            <?php
            print '<span>・</span><a href = ' . $entry .'> ' .$entry. '</a><br>';
            
            ?>
        <?php endif;?>
    <?php endwhile; ?>
<?php endif; ?>
</body>
</html>
