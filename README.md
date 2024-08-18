# Desafio de Microsserviços no Kubernetes (EKS)

## Descrição do Projeto

Este desafio visa projetar e implementar uma aplicação utilizando arquitetura de microsserviços no Kubernetes (K8s) no provedor de nuvem da AWS (EKS). O objetivo é criar uma aplicação que consome dados de clima e os armazena em cache usando Redis, implementando as seguintes etapas:

1. **Design de Microsserviços**: Identificação dos componentes da aplicação que serão implantados como microsserviços.
2. **Implementação no K8s**: Criação e implantação dos microsserviços no Kubernetes da AWS (EKS).
3. **Escalabilidade e Tolerância a Falhas**: Configuração da escalabilidade automática e tolerância a falhas para os microsserviços.
4. **Atualização e Monitoramento**: Implementação de procedimentos de atualização e monitoramento do desempenho dos microsserviços no K8s.

## Estrutura do Projeto

```
my-eks-microservices
│
├── k8s
│   ├── grafana-deployment.yaml
│   ├── prometheus-deployment.yaml
│   ├── redis-deployment.yaml
│   ├── redis-service.yaml
│   ├── service1-deployment.yaml
│   ├── service1-service.yaml
│   ├── service1-hpa.yaml
│   ├── service2-deployment.yaml
│   └── service2-service.yaml
│
├── services1
│   ├── src
│   │   ├── index.js
│   │   ├── redisClient.js
│   │   └── apiConsumer.js
│   ├── Dockerfile
│   └── package.json
│
└── services2
    └── Dockerfile
```

- **`services1`**: Contém o serviço que consome dados de clima e usa Redis para cache.
- **`k8s`**: Contém os arquivos de configuração do Kubernetes para o deploy dos microsserviços.
- **`services2`**: Placeholder para um futuro microsserviço ou configuração adicional.

## Arquitetura

- **Microsserviço de Clima (`services1`)**: Implementado com Node.js, Express, Redis e Axios.
- **Redis**: Usado para cache dos dados de clima.

## Instruções de Configuração e Deployment

### Configuração do Kubernetes

Aplique as configurações do Kubernetes:

```bash
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/redis-service.yaml
kubectl apply -f k8s/service1-deployment.yaml
kubectl apply -f k8s/service1-service.yaml
kubectl apply -f k8s/service1-hpa.yaml
kubectl apply -f k8s/service2-deployment.yaml
kubectl apply -f k8s/service2-service.yaml
kubectl apply -f k8s/prometheus-deployment.yaml
kubectl apply -f k8s/grafana-deployment.yaml
```

### Build e Push das Imagens Docker

Navegue para o diretório `services1` e crie a imagem Docker:

```bash
docker build -t your-repo/service1:latest .
```

Navegue para o diretório `services2` e crie a imagem Docker:

```bash
docker build -t your-repo/service2:latest .
```

Push as imagens para um repositório Docker (substitua `your-repo` pelo seu repositório):

```bash
docker tag your-repo/service1:latest your-repo/service1:latest
docker push your-repo/service1:latest

docker tag your-repo/service2:latest your-repo/service2:latest
docker push your-repo/service2:latest
```

<img src="/images/docker.png"> <br>

### Configuração de Monitoramento

Acesse o Prometheus e Grafana no Kubernetes para configurar os dashboards e alertas conforme necessário.

### Verificação

Verifique se todos os serviços estão rodando corretamente e se o Horizontal Pod Autoscaler está funcionando conforme esperado:

```bash
kubectl get pods
```

<img src="/images/get_pods.png"> <br>

<img src="/images/pods_AWS.png"> <br>

```bash
kubectl get services
```

<img src="/images/get_services.png"> <br>

```bash
kubectl get deployments
```

<img src="/images/get_deployments.png"> <br>

Teste a API para garantir que está funcionando como esperado.

## Problemas Encontrados

Durante a execução, foi identificado o seguinte erro:

```
Erro ao buscar dados de clima: ClientClosedError: The client is closed
```

<img src="/images/erro.png"> <br>

<img src="/images/erro_AWS.png"> <br>

Esse erro indica que o cliente Redis foi fechado ou não está disponível no momento da execução. O problema parece estar relacionado à conexão com o Redis, o que impede o acesso ao cache.

## Próximos Passos

1. **Verificar a Conexão com o Redis**:
   - Assegurar que o Redis está em execução e acessível.
   - Verificar se a URL e as portas configuradas no cliente Redis estão corretas.

2. **Revisar a Configuração do Redis**:
   - Verificar se a configuração do Redis no Docker e Kubernetes está correta.
   - Verificar se o Redis não está fechando a conexão devido a configurações incorretas ou problemas de rede.

3. **Validar o Código**:
   - Certificar que o cliente Redis é criado e gerenciado corretamente no código do serviço (`services1/src/index.js`).
   - Adicionar logs detalhados para ajudar a identificar onde o cliente Redis pode estar sendo fechado.

4. **Revisar e Testar o Deployment no Kubernetes**:
   - Verificar se os serviços e os deployments do Kubernetes estão configurados corretamente.
   - Certificar que os pods do Redis e do microsserviço estão corretamente interconectados e acessíveis.

5. **Atualizar e Monitorar**:
   - Implementar mecanismos de atualização e monitoração para garantir que o microsserviço está funcionando corretamente após a correção dos problemas.
   - Usar ferramentas como Prometheus e Grafana para monitorar o desempenho e o estado dos microsserviços no K8s.

6. **Documentação e Procedimentos**:
   - Documentar as correções realizadas e as etapas para a resolução de problemas futuros.
   - Atualizar o README com as informações sobre as correções e melhorias realizadas.

---

## Observações

### Custos da AWS

Este projeto utiliza diversos serviços da AWS, incluindo EKS (Elastic Kubernetes Service), EC2, e outros serviços relacionados. É importante estar ciente dos custos associados a esses serviços, que podem variar com base na utilização e na região em que estão implantados. Recomendo consultar a [Calculadora de Preços da AWS](https://calculator.aws/#/) para estimar os custos com base no seu uso específico e configurar alertas de orçamento na AWS para monitorar e controlar gastos.

### Análise Local

Embora o projeto esteja configurado para ser implementado no AWS EKS, a análise e o desenvolvimento inicial podem ser realizados localmente. Para uma configuração local, considere utilizar ferramentas como [Minikube](https://minikube.sigs.k8s.io/docs/) ou [Kind](https://kind.sigs.k8s.io/) para simular o ambiente Kubernetes. Isso permitirá testar e ajustar a aplicação e suas configurações antes de implantá-las no ambiente de produção da AWS.

### 🚧 Alerta de Desenvolvimento

Este projeto está atualmente em fase de desenvolvimento no GitHub. As funcionalidades e configurações estão sujeitas a alterações e melhorias contínuas. Para obter a versão mais recente e acompanhar o progresso, acesse o repositório do projeto no GitHub. Recomenda-se revisar o README e os commits recentes para entender o estado atual do projeto e qualquer mudança significativa que possa impactar o uso ou a implementação.

---
