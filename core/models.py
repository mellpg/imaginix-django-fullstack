from django.db import models


# Nossa Tabela de Brinquedos no Banco de Dados
class Brinquedo(models.Model):
    nome = models.CharField(max_length=100)  # Nome do produto
    preco = models.DecimalField(max_digits=10, decimal_places=2)  # Preço (ex: 49.90), casas decimais
    estoque = models.IntegerField()  # Quantidade inteira disponível

    # Define como o objeto será transformado em texto ao imprimir
    def __str__(self):
        return self.nome


# Tabela de Agendamento de Serviços (ex: Oficina de Brinquedos)
class AgendamentoServico(models.Model):
    nome_cliente = models.CharField(max_length=100)
    nome_brinquedo = models.CharField(max_length=100)
    data_servico = models.DateField()  # Salva a data real no banco

    def __str__(self):
        return f"{self.nome_cliente} - {self.data_servico}"
