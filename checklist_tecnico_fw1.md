# 📋 Checklist de Entrega Técnica - Equipe Especializada (FW1)

**Responsáveis:** Pedro / Rodrigo
**Data:** ____/____/____
**Chamado/Projeto:** _______________________________________

---

### 🖥️ 1. SERVIDORES (Windows/Linux)
- [ ] **Logs de Eventos:** Verificado se há erros críticos ou warnings após a intervenção.
- [ ] **Backup/Snapshot:** Realizado antes da alteração e validado se o atual está funcional.
- [ ] **Serviços Críticos:** Validado se todos os serviços (IIS, SQL, Docker, etc.) subiram pós-reboot.
- [ ] **Segurança/Patches:** Firewall ativo e regras de acesso limitadas ao necessário.
- [ ] **Monitoramento:** O servidor está respondendo corretamente no Zabbix/PRTG/Grafana?
- [ ] **Documentação:** Histórico contém IP, credenciais (no cofre) e descrição da alteração.

### 🌐 2. SWITCHES & REDES
- [ ] **Persistência:** Comando `write memory` ou `copy run start` executado (Salvo)?
- [ ] **VLANs:** Porta na VLAN correta e tagueada conforme o padrão do cliente.
- [ ] **Trunking:** Portas de uplink configuradas e sem loops (STP verificado).
- [ ] **Nomenclatura:** Interfaces e Hostname seguem o padrão da FW1.
- [ ] **Integridade:** Sem erros de CRC ou colisões nas interfaces alteradas.

### 💻 3. DESKTOPS & WORKSTATIONS
- [ ] **Dados:** Backup dos dados do usuário validado antes de qualquer intervenção.
- [ ] **Domínio/AD:** Máquina ingressada no domínio e GPOs aplicadas.
- [ ] **Softwares Base:** Antivírus, VPN e ferramentas de gestão atualizadas.
- [ ] **Conectividade:** Teste de ping e acesso aos sistemas internos realizado.
- [ ] **Organização:** Cabos organizados e ambiente limpo após a manutenção.

### ⚠️ 4. PROTOCOLO OPERACIONAL (Comportamental)
- [ ] **Foco:** Tarefa executada em silêncio, sem distrações ou ruídos excessivos.
- [ ] **Revisão:** Em tarefas críticas, houve revisão cruzada entre os membros.
- [ ] **Validação Final:** O cliente/usuário validou a entrega antes da saída?

---
**Assinatura do Técnico:** __________________________________________
**Visto da Coordenação:** __________________________________________
