<?php
include 'conexao.php';

$stmt = $pdo->query("SELECT id, nome, preco FROM servicos ORDER BY nome");
$servicos = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($servicos);
?>