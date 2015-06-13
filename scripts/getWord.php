<?php
$word = $_POST["word"];

$json_path = "../gcide/gcide_" . strtolower($word[0]) . "-entries.json";
$json_text = file_get_contents($json_path);
$json = json_decode($json_text, true);

$result = $json[$word]['definitions'][0]['definition'];

echo $result;

?>