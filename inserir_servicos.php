<?php
include 'conexao.php';

$servicos = [
  ['Corte de cabelo', 'Corte com tesoura ou máquina', 50],
  ['Escova', 'Escova modeladora', 40],
  ['Coloração', 'Tintura capilar completa', 120],
  ['Luzes', 'Reflexos e mechas claras', 150],
  ['Selagem', 'Tratamento capilar de selagem térmica', 200]
];

foreach ($servicos as $s) {
  $stmt = $pdo->prepare("INSERT INTO servicos (nome, descricao, preco) VALUES (?, ?, ?)");
  $stmt->execute($s);
}

echo "Serviços inseridos com sucesso!";
?>