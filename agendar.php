<?php
include 'conexao.php';

$nome = $_POST['nome'];
$servico_id = $_POST['servico_id'];
$data = $_POST['data'];
$hora = $_POST['hora'];

$stmt = $pdo->prepare("INSERT INTO agendamentos (nome_cliente, servico_id, data, hora) VALUES (?, ?, ?, ?)");
$stmt->execute([$nome, $servico_id, $data, $hora]);

echo json_encode(['status' => 'ok']);
?>