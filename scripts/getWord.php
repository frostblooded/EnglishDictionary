<?php

$word = strtolower($_POST["word"]); //because the words are in lower case

$json_path = "../dictionary/dictionary_" . $word[0] . "-entries.json";
$json_text = file_get_contents($json_path);
$json = json_decode($json_text, true);

$result = $json[$word]['definitions'];

echo json_encode($result);

?>