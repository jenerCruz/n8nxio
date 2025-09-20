## n8nxio en Fly.io

Despliegue optimizado de [n8n](https://n8n.io) en Fly.io con persistencia, autostop/autostart y configuración lista para clonar.

___
<img width="1200" height="697" alt="17577710058996751762007622143685" src="https://github.com/user-attachments/assets/fd68d3c5-6759-4a89-ba5b-284cb017623f" />


## 📦 Características principales
- **Persistencia garantizada** con volumen `n8n_data` en `/home/node/.n8n`
- **Escala a cero**: autostop/autostart para ahorrar recursos
- **Configuración reproducible** vía `fly.toml`
- **Listo para branding técnico-emocional** y documentación visual

---

## ⚙️ Requisitos previos
- Cuenta en [Fly.io](https://fly.io)
- CLI `flyctl` instalado
- Clave SSH configurada con GitHub
- Volumen persistente creado en Fly.io:
  ```bash
  fly volumes create n8n_data --size 1 -a n8nxio

---

## 🔐 Variables de entorno recomendadas

  ~~~bash
fly secrets set \
  N8N_ENCRYPTION_KEY="TU_CLAVE_UNICA" \
  DB_SQLITE_POOL_SIZE=5 \
  N8N_RUNNERS_ENABLED=true \
  N8N_BLOCK_ENV_ACCESS_IN_NODE=false \
  -a n8nxio
 ~~~

___

## 🚀 Despliegue

 ~~~bash
fly deploy --remote-only -a n8nxio
 ~~~

___

## 📂 Persistencia

El volumen n8n_data almacena:

Workflows

Credenciales cifradas


Configuración de usuario

___

## 🔗 Acceso

https://n8nxio.fly.dev

Usuario y contraseña se configuran en el primer arranque o vía variables de entorno.

___

## 💡 Tips

Exporta workflows y credenciales regularmente desde Settings → Export

Guarda tu N8N_ENCRYPTION_KEY en un lugar seguro

Considera usar PostgreSQL/Supabase para persistencia multi-región

___

## 📜 Licencia

Este proyecto se distribuye bajo licencia MIT.


---
