# MEMORY.md - Memória de Longo Prazo

## Incidentes e Diagnósticos
- **2026-07-15:** Falhas consecutivas de resposta devido a `Rate Limit (429)` na API do Google (Gemini) e `Payload Too Large (413)` no fallback da Groq (Llama 3.3 70B). O sistema tentou alternar entre modelos, mas ambos atingiram limites de cota/tamanho.

## Auditoria de Segurança (Check-up 15/07/2026)
- **Crítico:** Modelo Groq/Llama-3.3-70b-versatile operando sem sandbox e com ferramentas web ativas. Risco de execução de ferramentas por modelos pequenos em entradas não confiáveis.
- **Segurança:** Segredos expostos em plaintext no `openclaw.json` (Tokens de Gateway, API do Google e Bot Telegram). Recomendada migração para SecretRefs.
- **Rede:** Gateway exposto em `0.0.0.0` sem limite de taxa (rate limiting) configurado para autenticação.

## Promoted From Short-Term Memory (2026-07-21)

<!-- openclaw-memory-promotion:memory:memory/2026-07-14-0722.md:19:22 -->
- **1. Servidores (Windows/Linux)**: [ ] **Logs de Eventos:** Verificado se há erros críticos ou warnings após a intervenção.; [ ] **Backup/Snapshot:** Realizado antes da alteração e validado se o atual está funcional.; [ ] **Serviços Críticos:** Validado se todos os serviços (IIS, SQL, Docker, etc.) subiram pós-reboot.; [ ] **Segurança/Patches:** Firewall ativo e regras de acesso limitadas ao necessário. [score=0.850 recalls=0 avg=0.620 source=memory/2026-07-14-0722.md:19-22]
<!-- openclaw-memory-promotion:memory:memory/2026-07-14-0722.md:23:24 -->
- **1. Servidores (Windows/Linux)**: [ ] **Monitoramento:** O servidor está respondendo corretamente no Zabbix/PRTG/Grafana?; [ ] **Documentação:** O histórico do chamado contém o IP, credenciais (em cofre) e o que foi alterado? [score=0.850 recalls=0 avg=0.620 source=memory/2026-07-14-0722.md:23-24]

## Promoted From Short-Term Memory (2026-07-22)

<!-- openclaw-memory-promotion:memory:memory/2026-07-14-0722.md:27:30 -->
- **2. Switches & Redes**: [ ] **Running-config vs Startup-config:** O comando `write memory` ou `copy run start` foi executado?; [ ] **VLANs:** A porta está na VLAN correta e tagueada conforme o padrão do cliente?; [ ] **Trunking:** Portas de uplink configuradas e sem loops (STP verificado)?; [ ] **Nomenclatura:** As interfaces e o Hostname seguem o padrão da FW1? [score=0.825 recalls=0 avg=0.620 source=memory/2026-07-14-0722.md:27-30]
