<?php
$host = 'localhost';
$db = 'salao';
$user = 'root'; // ou seu usuário no servidor
$pass = '';     // ou a senha do banco

try {
  $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("Erro ao conectar: " . $e->getMessage());
}
?>