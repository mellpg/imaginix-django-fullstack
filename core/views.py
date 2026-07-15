from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
from .models import Brinquedo, AgendamentoServico
import json

# Rota principal
def home(request):
    return render(request, 'index.html')

def listar_brinquedos(request):
    brinquedos = list(Brinquedo.objects.all().values('id', 'nome', 'preco', 'estoque'))
    return JsonResponse(brinquedos, safe=False)

# Salvar brinquedos no banco de dados
@csrf_exempt
def cadastrar_brinquedo(request):
    if request.method == "POST":
        # Lê o JSON enviado pelo fetch do JavaScript
        dados_recebidos = json.loads(request.body)
        
        # Cria uma nova linha real no banco de dados
        novo_brinquedo = Brinquedo.objects.create(
            nome=dados_recebidos.get("nome"),
            preco=dados_recebidos.get("preco"),
            estoque=dados_recebidos.get("estoque")
        )
        
        return JsonResponse({
            "status": "sucesso",
            "mensagem": f"O brinquedo '{novo_brinquedo.nome}' foi cadastrado com sucesso!"
        })

# Comprar brinquedo e descontar do estoque
@csrf_exempt
def comprar_brinquedo(request, brinquedo_id):
    if request.method == "POST":
        try:
            # Busca o brinquedo exato usando o ID vindo da URL do JavaScript
            brinquedo = Brinquedo.objects.get(id=brinquedo_id)
            
            # Checagem: temos estoque disponível?
            if brinquedo.estoque > 0:
                brinquedo.estoque -= 1  # Subtrai 1 unidade no Python
                brinquedo.save()        # Grava a alteração persistente no banco de dados:
                
                # Devolve o novo estoque atualizado para o frontend exibir
                return JsonResponse({"status": "sucesso", "novo_estoque": brinquedo.estoque})
            else:
                return JsonResponse({"status": "esgotado", "mensagem": "Este produto acabou!"})
                
        except Brinquedo.DoesNotExist:
            return JsonResponse({"status": "erro", "mensagem": "Produto não encontrado"}, status=404)

# Agendar serviço (Salva o agendamento no banco)
@csrf_exempt
def agendar_servico(request):
    if request.method == "POST":
        dados_recebidos = json.loads(request.body)
        
        # Cria e salva o registro na tabela de agendamentos
        novo_agendamento = AgendamentoServico.objects.create(
            nome_cliente=dados_recebidos.get("nome_cliente"),
            nome_brinquedo=dados_recebidos.get("nome_brinquedo"),
            data_servico=dados_recebidos.get("data_servico")
        )
        
        return JsonResponse({"status": "sucesso", "mensagem": "Conserto agendado com sucesso no banco!"})