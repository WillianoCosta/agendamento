<?php
include 'conexao.php';

$data = $_GET['data'] ?? date('Y-m-d');

$stmt = $pdo->prepare("
  SELECT a.id, a.nome_cliente, s.nome AS servico, s.preco, a.data, a.hora, a.status
  FROM agendamentos a
  JOIN servicos s ON a.servico_id = s.id
  WHERE a.data = ?
  ORDER BY a.hora ASC
");
$stmt->execute([$data]);

$agendamentos = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($agendamentos);
?>